<template>
  <div class="md-layout show-page">
    <div class="md-layout-item md-size-100">
      <md-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <h3 class="md-title">Invite co-producers to help you with this event</h3>
          </div>
          <div class="md-toolbar-section-end">
            <md-button class="md-just-icon md-simple md-toolbar-toggle">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </md-button>

            <div class="md-collapse">
              <md-list>
                <md-list-item>
                  <md-button @click="editEvent()" class="md-success clickable-button">Edit</md-button>
                </md-list-item>
              </md-list>
            </div>
          </div>
        </div>
      </md-toolbar>
    </div>

    <div class="md-layout-item md-size-100 gallery-z-index">
      <md-card class="md-layout-item md-size-100 event-form-padding">
        <form class="md-layout">
          <md-card class="md-layout-item md-size-50 md-small-size-100 gallery-z-index">

            <md-field>
              <md-icon class="md-accent">home</md-icon>
              <label>Event Name: {{ event.title }}</label>
            </md-field>

            <md-field class="select-with-icon">
              <md-icon class="md-accent">local_bar</md-icon>
              <label>Occasion: {{ event.occasion }}</label>
            </md-field>

            <div style="display: flex;"> <!-- md-layout brokes the design -->
              <div class="md-layout-item md-small-size-100 disabled-datepicker" style="padding-left: 0;">
                <md-datepicker>
                  <label>Date: {{ event.eventStartMillis | formatDate }}</label>
                </md-datepicker>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field class="select-with-icon">
                  <md-icon class="md-accent">query_builder</md-icon>
                  <label>Time: {{ event.eventStartMillis | formatTime }}</label>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100" style="padding-right: 0;">
                <md-field class="select-with-icon">
                  <md-icon class="md-accent">hourglass_empty</md-icon>
                  <label>Event duration in hours: {{ convertMillisToHours(event.eventEndMillis - event.eventStartMillis) }}</label>
                </md-field>
              </div>
            </div>

            <md-field>
              <md-icon class="md-accent">person</md-icon>
              <label>Number of Participants: {{ event.numberOfParticipants }}</label>
            </md-field>

            <md-field>
              <md-icon class="md-accent">location_on</md-icon>
              <label>Location: {{ event.location }}</label>
            </md-field>

            <div class="file-input" v-for="(imageItem, index) in galleryImages" :key="'image-file-input-'+index">
              <div class="image-container" @click="openGallery(index)">
                <img :src="imageItem" />
              </div>
            </div>

            <LightBox :images="galleryImages"
                      ref="lightbox"
                      :show-light-box="false">
            </LightBox>

          </md-card>


          <div class="md-layout-item md-size-50 md-small-size-100">
            <div class="event-status-field static">
              <div class="md-layout">
                <label class="md-layout-item md-size-100 md-form-label">
                  Status: {{ event.status }}
                </label>
              </div>
            </div>

            <chart-card
                v-if="event.totalBudget && spentBudget > -1"
                :chart-data="pieChart.data"
                :chart-options="pieChart.options"
                chart-type="Pie"
                header-icon
                chart-inside-content>
              <template slot="footer">
                <div class="md-layout">
                  <div class="md-layout-item">
                    <i class="fa fa-circle text-info"></i> Remaining Budget (${{ event.totalBudget - spentBudget }})
                  </div>
                  <div class="md-layout-item">
                    <i class="fa fa-circle text-danger"></i> Spent Budget (${{ spentBudget }})
                  </div>
                  <div class="md-layout-item md-size-100" v-if="spentBudget > event.totalBudget">
                    <div class="warning text-warning">Budget is exceeded. You should either increase total budget or update costs</div>
                  </div>

                  <md-field style="margin: 20px 0 10px;">
                    <md-icon class="md-accent">attach_money</md-icon>
                    <label>Total Budget: ${{ event.totalBudget }}</label>
                  </md-field>
                </div>
              </template>
            </chart-card>
          </div>
        </form>
      </md-card>
    </div>
  </div>
</template>
<script>

  import {
    ChartCard,
  } from "@/components";
  import CalendarEvent from '@/models/CalendarEvent';
  import CalendarEventImage from '@/models/CalendarEventImage';
  import Calendar from '@/models/Calendar';
  import moment from 'moment';
  import Vue from 'vue';
  import LightBox from 'vue-image-lightbox'

  export default {
    name: 'event-info',
    components: {
      ChartCard,
      LightBox,
    },
    props: {
      event: Object
    },

    data: () => ({

    }),
    computed: {
      galleryImages() {
        let _this = this;
        if (this.event.images) {
          this.event.images.forEach(function (imgId) {
            Calendar.get().then((calendars) => {
              calendars[0].calendarEvents().get().then(editedEvents => {
                let editedEvent = editedEvents.find(e => { return e.id = _this.$route.params.id; })

                let images = editedEvent.images().custom(`${process.env.SERVER_URL}/1/calendars/${calendars[0].id}/events/${editedEvent.id}/images/${imgId.id}`).get().then(v => {
                  console.log(v);
                });
              });
            });
          });
        }

        return this.event.images ? this.event.images.map((val) => { return {'src': val, 'thumb': val}}) : [];
      },
      spentBudget() {
        let totalSpent = 0;

        if (this.event.components) {
          this.event.components.forEach(function(component) {
            if (component.vendors) {
              component.vendors.forEach(function (val) {
                totalSpent += val.cost;
              });
            }
          })
        }
        return totalSpent;
      },
      pieChart() {
        return {
          data: {
            labels: [" ", " "], // should be empty to remove text from chart
            series: [(this.event.totalBudget - this.spentBudget) / this.event.totalBudget, this.spentBudget / this.event.totalBudget]
          },
          options: {
            height: "230px"
          }
        }
      },
    },
    methods: {
      convertHoursToMillis(hours) {
        return hours * 60 * 60 * 1000;
      },
      convertMillisToHours(millis) {
        return millis / 3600000
      },
      editEvent() {
        this.$router.push({ path: `/events/${this.$route.params.id}/edit` });
      },
      openGallery(index) {
        this.$refs.lightbox.showImage(index)
      },
    },
  filters: {
      formatDate: function (date) {
        return moment(date).format('YYYY-MM-DD');
      },
      formatTime: function(date) {
        return moment(date).format('HH:mm');
      }
    }
  }
</script>

<style lang="scss">
  @import 'vue-image-lightbox/dist/vue-image-lightbox.min.css';

  .event-status-field {
    position: absolute;
    right: 31px;
    top: 10px;

    &.static {
      top: 10px;
    }

    label {
      font-weight: 400;
      position: relative;
      top: 2px;
    }
    .md-layout {
      align-items: center;
    }
  }
  .event-form-padding {
    padding-top: 20px;
  }
  .md-datepicker .md-icon.md-theme-default.md-icon-image svg {
    fill: #ff5252;
  }
  .clickable-button {
    pointer-events: all;
  }
  .show-page {
    .md-field .md-icon {
      margin-left: 0;

      &::after {
        display: none;
      }
    }
  }
  .disabled-datepicker {
    pointer-events: none;

    .md-button {
      display: none;
    }
  }
  .gallery-z-index {
    z-index: 500;
  }
</style>
