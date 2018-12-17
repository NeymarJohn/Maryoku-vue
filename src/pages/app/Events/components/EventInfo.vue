<template>
  <div class="md-layout show-page">

    <div class="md-layout-item md-size-100 gallery-z-index">
      <md-card class="md-layout-item md-size-100 event-form-padding">
        <form class="md-layout">
          <md-card class="md-layout-item md-size-100 gallery-z-index">

            <div class="event-status-field static">
              <div class="md-layout">
                <label class="md-layout-item md-size-20 md-form-label">
                  Status:
                </label>
                <div class="md-layout-item">
                  <md-field>
                    <md-select v-model="event.status" name="event-status">
                      <md-option value="draft">Draft</md-option>
                      <md-option value="approved">Approved</md-option>
                      <md-option value="execution">Execution</md-option>
                      <md-option value="done">Done</md-option>
                    </md-select>
                  </md-field>
                </div>
              </div>
            </div>

            <md-field>
              <md-icon class="md-accent">home</md-icon>
              <label>Event Name: {{ event.title }}</label>
            </md-field>

            <md-field class="select-with-icon">
              <md-icon class="md-accent">local_bar</md-icon>
              <label>Occasion: {{ event.occasion }}</label>
            </md-field>

            <div class="md-layout">
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

            <div class="header-image-wrapper">
              <div class="file-input" v-for="(imageItem, index) in galleryImages" :key="'image-file-input-'+index">
                <div class="image-container" @click="openGallery(index)">
                  <img :src="imageItem.src" />
                </div>
              </div>
            </div>


            <LightBox :images="galleryImages"
                      ref="lightbox"
                      :show-light-box="false">
            </LightBox>

          </md-card>


          <chart-card
              class="md-size-100 md-layout-item"
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
  import LightBox from 'vue-image-lightbox';

  export default {
    name: 'event-info',
    components: {
      ChartCard,
      LightBox,
    },
    props: {
      event: Object
    },
    watch: {
      'event.status': { 
        handler: function(val, newVal) {
          if (newVal != '' && newVal != undefined) {
          this.updateEvent(newVal);
        }
        }
      }
    },
    data: () => ({
      galleryImages: []
    }),
    computed: {
      spentBudget() {
        let totalSpent = 0;

        if (this.event.components) {
          this.event.components.forEach(function(component) {
            if (component && component.vendors) {
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
    created() {
      let _this = this;
      Calendar.get().then((calendars) => {
          calendars[0].calendarEvents().custom(`${process.env.SERVER_URL}/1/calendars/${calendars[0].id}/events/${_this.$route.params.id}/images/`).get().then(images => {
            console.log(images);
            _this.galleryImages = images.map((image) => { return {'src': `${process.env.SERVER_URL}/${image.href}`, 'thumb': `${process.env.SERVER_URL}/${image.href}`}});
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    methods: {
      updateEvent(status) {
        Calendar.get().then(calendars => {
          if(calendars.length === 0 ) {
            return;
          }
          calendars[0].calendarEvents().get().then(editedEvents => {
            let editedEvent = editedEvents.find(e => { return e.id = this.$route.params.id; })
            editedEvent.status = status;
            editedEvent.save().then(response => {
            });
          })
          .catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      },

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
    right: -14px;
    top: 10px;

    &.static {
      top: -60px;
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
    margin-top: 0;
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
  .file-input {
    margin-right: 10px;
  }
</style>
