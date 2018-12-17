<template>
  <div class="md-layout show-page">

    <div class="md-layout-item md-size-100 gallery-z-index">

      <div class="event-status-field">
        <label>Status: </label>
        <md-field class="status-select">
          <md-select v-model="event.status" name="event-status">
            <md-option value="draft">Draft</md-option>
            <md-option value="approved">Approved</md-option>
            <md-option value="execution">Execution</md-option>
            <md-option value="done">Done</md-option>
          </md-select>
        </md-field>


        <md-button native-type="submit" @click="openImageGallery" class="md-success">
          Image Gallery
          <span class="badge md-round md-info" v-if="uploadedImages.length">{{ uploadedImages.length }}</span>
        </md-button>
        <md-button @click="editEvent()" class="md-success">
          Edit event
        </md-button>
      </div>

      <div class="event-form-padding">
        <form class="md-layout">
          <md-card class="md-layout-item md-size-100 gallery-z-index padding-card">

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <md-icon class="md-accent">home</md-icon>
                <label>Event Name: {{ event.title }}</label>
              </md-field>
            </div>

            <div class="md-layout">
              <div class="md-layout-item md-size-33 md-small-size-100 disabled-datepicker">
                <md-datepicker>
                  <label>Date: {{ event.eventStartMillis | formatDate }}</label>
                </md-datepicker>
              </div>

              <div class="md-layout-item md-size-33 md-small-size-100">
                <md-field class="select-with-icon">
                  <md-icon class="md-accent">query_builder</md-icon>
                  <label>Time: {{ event.eventStartMillis | formatTime }}</label>
                </md-field>
              </div>

              <div class="md-layout-item md-size-33 md-small-size-100">
                <md-field class="select-with-icon">
                  <md-icon class="md-accent">hourglass_empty</md-icon>
                  <label>Event duration in hours: {{ convertMillisToHours(event.eventEndMillis - event.eventStartMillis) }}</label>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item md-size-33 md-small-size-100">
                <md-field class="select-with-icon">
                  <md-icon class="md-accent">local_bar</md-icon>
                  <label>Occasion: {{ event.occasion }}</label>
                </md-field>
              </div>

              <div class="md-layout-item md-size-33 md-small-size-100">
                <md-field>
                  <md-icon class="md-accent">person</md-icon>
                  <label>Number of Participants: {{ event.numberOfParticipants }}</label>
                </md-field>
              </div>

              <div class="md-layout-item md-size-33 md-small-size-100">
                <md-field>
                  <md-icon class="md-accent">location_on</md-icon>
                  <label>Location: {{ event.location }}</label>
                </md-field>
              </div>
            </div>
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
      </div>
    </div>

    <event-gallery-modal ref="galleryModal"
                         :isModalLoading="isModalLoading"
                         :uploadedImages="uploadedImages">
    </event-gallery-modal>
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
  import EventGalleryModal from './EventGalleryModal';

  export default {
    name: 'event-info',
    components: {
      ChartCard,
      EventGalleryModal,
    },
    props: {
      event: Object
    },
    watch: {
      'event.status': {
        handler: function(newVal) {
          if (newVal != '' && newVal != undefined) {
          return this.updateEvent(newVal);
        }
        }
      }
    },
    data: () => ({
      uploadedImages: [],
      isModalLoading: false,
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
            series: [this.calculateRemain(), this.calculateSpent()]
          },
          options: {
            height: "230px"
          }
        }
      },
    },
    created() {
      let _this = this;
      this.isModalLoading = true;
      

        Calendar.get().then((calendars) => {
          calendars[0].calendarEvents().custom(`${process.env.SERVER_URL}/1/calendars/${calendars[0].id}/events/${_this.$route.params.id}/images/`).get().then(images => {
            _this.uploadedImages = images.map((image) => { return {'src': `${process.env.SERVER_URL}/${image.href}`, 'thumb': `${process.env.SERVER_URL}/${image.href}`}});
            this.isModalLoading = false;
          })
          .catch((error) => {
            this.isModalLoading = false;
            console.log(error);
          });
        })
        .catch((error) => {
          this.isModalLoading = false;
          console.log(error);
        })
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

      calculateSpent() {
        if(this.spentBudget === 0 || this.spentBudget === NaN ) {
          return 0
        }
        return this.spentBudget;
      },
      calculateRemain() {
        if (this.event.totalBudget === 0 || this.event.totalBudget === NaN || this.event.totalBudget === '' || this.event.totalBudget === undefined) {
          return this.calculateSpent() > 0 ? 0 : 1;
        }
        if (this.spentBudget > this.event.totalBudget) {
          return 0;
        }
        return this.event.totalBudget - this.spentBudget;
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
      openImageGallery() {
        this.$refs.galleryModal.toggleModal(true);
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
    display: flex;
    align-items: center;
    text-align: right;
    justify-content: flex-end;
    margin-top: 1px;
    margin-bottom: 8px;

    label {
      font-weight: 400;
      position: relative;
      top: 2px;
    }
    .md-layout {
      align-items: center;
    }
    .status-select {
      max-width: 150px;
      margin-left: 10px;
      margin-right: 20px;
    }
    .md-button {
      margin: 0 5px;

      &:last-child {
        margin-right: 0;
      }
    }
    .badge {
      top: -2px;
      margin-left: 4px;
      position: relative;
      background: #FF547C;
      border-radius: 50%;
      padding: 0;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
  }

  .event-form-padding {
    margin-top: 0;

    .padding-card {
      padding-top: 15px;
      padding-bottom: 30px;
    }
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

    .padding-card {
      .md-field::after {
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
