<template>
  <div class="md-layout">
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
                  <i class="material-icons">add</i>
                  <p class="hidden-lg hidden-md">Invite</p>
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

            <md-field :class="[{'md-error': errors.has('eventName')}]">
              <md-icon class="md-accent">home</md-icon>
              <label>Event Name</label>
              <md-input v-model="form.eventName"
                        data-vv-name="eventName"
                        v-validate= "modelValidations.eventName"
                        required/>
              <span class="md-error" v-if="errors.has('eventName')">The event name is required</span>
            </md-field>

            <md-field :class="[{'md-error': errors.has('occasion')}]" class="select-with-icon">
              <md-icon class="md-accent">local_bar</md-icon>
              <label>Occasion</label>
              <md-select v-model="form.occasion"

                         data-vv-name="occasion"
                         v-validate= "modelValidations.occasion"
                         required>
                <md-option v-for="option in occasionOptions"
                           :key="option.id"
                           :value="option.value">
                  {{ option.value }}
                </md-option>
              </md-select>
              <span class="md-error" v-if="errors.has('occasion')">The event occasion is required</span>
            </md-field>

            <div style="display: flex;"> <!-- md-layout brokes the design -->
              <div class="md-layout-item md-small-size-100" style="padding-left: 0;">
                <md-datepicker
                    v-model="form.date"
                    data-vv-name="date"
                    v-validate= "modelValidations.date"
                    required>
                  <label>Date</label>
                </md-datepicker>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="[{'md-error': errors.has('time')}]" class="select-with-icon">
                  <md-icon class="md-accent">query_builder</md-icon>
                  <label>Time</label>
                  <md-select v-model="form.time"
                             data-vv-name="time"
                             v-validate= "modelValidations.time"
                             required>
                    <md-option v-for="hour in hoursArray"
                               :key="hour"
                               :value="hour">
                      {{ hour }}
                    </md-option>
                  </md-select>
                  <span class="md-error" v-if="errors.has('time')">The event time is required</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100" style="padding-right: 0;">
                <md-field :class="[{'md-error': errors.has('duration')}]" class="select-with-icon">
                  <md-icon class="md-accent">hourglass_empty</md-icon>
                  <label>Event duration in hours</label>
                  <md-select v-model="form.duration"
                             data-vv-name="duration"
                             v-validate= "modelValidations.duration"
                             required>
                    <md-option v-for="hour in durationArray"
                               :key="hour"
                               :value="hour">
                      {{ hour }}
                    </md-option>
                  </md-select>
                  <span class="md-error" v-if="errors.has('duration')">The event duration time is required</span>
                </md-field>
              </div>
            </div>

            <md-field :class="[{'md-error': errors.has('participants')}]">
              <md-icon class="md-accent">person</md-icon>
              <label>Number of Participants</label>
              <md-input type="text"
                        v-model="form.participants"
                        data-vv-name="participants"
                        v-validate= "modelValidations.participants"
                        required/>
              <span class="md-error" v-if="errors.has('participants')">The event participants is required and should be in range of 1 - 10 000</span>
            </md-field>

            <md-field :class="[{'md-error': errors.has('location')}]">
              <md-icon class="md-accent">location_on</md-icon>
              <label>Location</label>
              <md-input type="text"
                        v-model="form.location"
                        data-vv-name="location"
                        v-validate= "modelValidations.location"
                        required/>
              <span class="md-error" v-if="errors.has('location')">The location is required</span>
            </md-field>

            <div class="header-image-wrapper">
              <h4 class="card-title">Choose Event Image</h4>

              <div class="file-input" v-for="(imageItem, index) in uploadedImages" :key="'image-'+index">
                <div class="image-container" @click="openGallery(index)">
                  <img :src="imageItem" />
                </div>
                <div class="button-container">
                  <md-button class="md-danger md-round" @click="removeImage(index)"><i class="fa fa-times"></i>Remove</md-button>
                  <!--<md-button class="md-success md-round md-fileinput">
                    <template>Change</template>
                    <input type="file" @change="onFileChange($event, index)">
                  </md-button>-->
                </div>
              </div>

              <div class="file-input">
                <div class="image-container">
                  <img :src="regularImg" title="">
                </div>

                <div class="button-container">
                  <md-button class="md-success md-round md-fileinput">
                    <template>Add image</template>
                    <input type="file" @change="onFileChange($event)">
                  </md-button>
                </div>
              </div>
            </div>
            <LightBox :images="galleryImages"
                      ref="lightbox"
                      :show-light-box="false">
            </LightBox>

          </md-card>


          <div class="md-layout-item md-size-50 md-small-size-100">
            <div class="event-status-field dynamic">
              <div class="md-layout">
                <label class="md-layout-item md-size-20 md-form-label">
                  Status:
                </label>
                <div class="md-layout-item">
                  <md-field>
                    <md-select v-model="form.status" name="event-status">
                      <md-option value="draft">Draft</md-option>
                      <md-option value="approved">Approved</md-option>
                      <md-option value="execution">Execution</md-option>
                      <md-option value="done">Done</md-option>
                    </md-select>
                  </md-field>
                </div>
              </div>
            </div>

            <chart-card
                :chart-data="pieChart.data"
                :chart-options="pieChart.options"
                chart-type="Pie"
                header-icon
                chart-inside-content>
              <template slot="footer">
                <div class="md-layout">
                  <div class="md-layout-item">
                    <i class="fa fa-circle text-info"></i> Remaining Budget (${{ form.budget - spentBudget }})
                  </div>
                  <div class="md-layout-item">
                    <i class="fa fa-circle text-danger"></i> Spent Budget (${{ spentBudget }})
                  </div>
                  <div class="md-layout-item md-size-100" v-if="spentBudget > form.budget">
                    <div class="warning text-warning">Budget is exceeded. You should either increase total budget or update costs</div>
                  </div>

                  <md-field :class="[{'md-error': errors.has('budget')}]" style="margin: 20px 0 10px;">
                    <md-icon class="md-accent">attach_money</md-icon>
                    <label>Total Budget</label>
                    <md-input v-model="form.budget"
                              data-vv-name="budget"
                              v-validate= "modelValidations.budget"
                              required/>
                    <span class="md-error" v-if="errors.has('budget')">The event budget is required and should be in range of 1 - 1 000 000</span>
                  </md-field>
                </div>
              </template>
            </chart-card>
          </div>
          <md-card-actions class="text-center">
            <md-button native-type="submit" @click.native.prevent="validateEvent" class="md-success">
              {{ formData !== null ? 'Edit': 'Create' }} event
            </md-button>
          </md-card-actions>
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
  import Vue from 'vue';
  import LightBox from 'vue-image-lightbox'

  export default {
    name: 'event-header-form',
    components: {
      LightBox,
      ChartCard,
    },
    props: {
      occasionOptions: Array,
      formData: Object,
      shouldUpdate: Boolean,
      event: Object,
    },

    data: () => ({
      hoursArray: [...Array(24).keys()].map(x =>  x < 10 ? `0${x}:00`: `${x}:00`),
      durationArray: [...Array(12).keys()].map(x =>  ++x),

      form: {
        eventName: "",
        occasion: "",
        date: "",
        time: "",
        duration: "",
        participants: "",
        status: "draft",
        budget: "",
        location: "",
      },
      uploadedImages: [],
      regularImg: "static/img/image_placeholder.jpg",

      modelValidations: {
        eventName: {
          required: true,
        },
        occasion: {
          required: true,
        },
        date: {
          required: true,
        },
        time: {
          required: true,
        },
        duration: {
          required: true,
        },
        participants: {
          required: true,
          min_value: 1,
          max_value: 10000,
        },
        location: {
          required: true,
        },
        status: {
          required: true,
        },
        budget: {
          required: true,
          min_value: 1,
          max_value: 1000000,
        },
      },
    }),
    watch: {
      formData() {
        this.form = this.formData;
      }
    },
    mounted() {
      console.log(this.$route.name);
      if (this.formData) {
        this.form = this.formData;
      }
    },
    methods: {
      updateEvent() {
        Calendar.get().then(calendars => {
          if(calendars.length === 0 ) {
            return;
          }
          calendars[0].calendarEvents().get().then(editedEvents => {
            let editedEvent = editedEvents.find(e => { return e.id = this.$route.params.id; })
            editedEvent.title = this.form.eventName;
            editedEvent.eventStartMillis =this.getEventStartInMillis();
            editedEvent.eventEndMillis = this.getEventEndInMillis();
            editedEvent.location = this.form.location;
            editedEvent.occasion = this.form.occasion;
            editedEvent.numberOfParticipants = this.form.participants;
            editedEvent.totalBudget = this.form.budget
            editedEvent.status = this.form.status;
            editedEvent.currency = 'USD'; // HARDCODED, REMOVE AFTER BACK WILL FIX API
            editedEvent.participantsType = 'Test'; // HARDCODED, REMOVE AFTER BACK WILL FIX API,
            editedEvent.components = this.$store.state.eventData.components;
            editedEvent.save().then(response => {
              this.$parent.isLoading = false;
              this.$router.push({ path: '/events' });
            });
          });
        })
      },
      createEvent() {
        Calendar.get().then((calendars) => {
              let newEvent = new CalendarEvent({
                calendar: {id: calendars[0].id},
                title: this.form.eventName,
                eventStartMillis: this.getEventStartInMillis(),
                eventEndMillis: this.getEventEndInMillis(),
                location: this.form.location,
                occasion: this.form.occasion,
                numberOfParticipants: this.form.participants,
                totalBudget: this.form.budget,
                status: this.form.status,
                currency: 'USD', // HARDCODED, REMOVE AFTER BACK WILL FIX API
                participantsType: 'Test', // HARDCODED, REMOVE AFTER BACK WILL FIX API,
                components: this.$store.state.eventData.components,
              }).for(calendars[0]);

              newEvent.save().then(ev => {
                let images = this.uploadedImages.map((image) => {
                  return new CalendarEventImage({featuredImageFile: image}).for(calendars[0], ev).save();
                })
                Promise.all(images).then(values => {
                  this.$parent.isLoading = false;
                  this.$router.push({ path: '/events' });

                });
              })
            });
      },
      validateEvent () {
        this.$validator.validateAll().then(isValid => {
          if (isValid) {
            this.$parent.isLoading = true;
            this.$props.shouldUpdate ? this.updateEvent() : this.createEvent();
          }
        });
      },
      getEventStartInMillis() {
        if (this.form.date && this.form.time) {
          let eventStartTime = new Date(this.form.date).getTime() + (this.convertHoursToMillis(+this.form.time.substring(0, 2)));
          return eventStartTime;
        }
      },
      getEventEndInMillis() {
        if (this.form.date && this.form.time && this.form.duration) {
          let eventEndTime = this.getEventStartInMillis() + this.convertHoursToMillis(this.form.duration);
          return eventEndTime;
        }
      },
      convertHoursToMillis(hours) {
        return hours * 60 * 60 * 1000;
      },
      editEvent() {
        this.$parent.readOnly = false;
        this.$router.push({ path: `/events/${this.$route.params.id}/edit` });
      },
      onFileChange(e, index) {
        let files = e.target.files || e.dataTransfer.files;

        if (!files.length) return;
        this.createImage(files[0], index);
      },
      createImage(file, index) {
        let reader = new FileReader();
        let _this = this;

        reader.onload = e => {
          if (index === undefined) {
            _this.uploadedImages.push(e.target.result);
          } else {
            Vue.set(_this.uploadedImages, index, e.target.result);
          }
        };
        reader.readAsDataURL(file);
      },
      removeImage: function(index) {
        this.uploadedImages.splice(index, 1);
        console.log(this.uploadedImages);
      },
      openGallery(index) {
        this.$refs.lightbox.showImage(index)
      },
    },
    computed: {
      spentBudget() {
        let totalSpent = 0;
        if (this.$store.state.eventData.components) {
          this.$store.state.eventData.components.forEach(function(component) {
            if (component.vendors) {
              component.vendors.forEach(function (val) {
                totalSpent += val.cost;
              });
            }
          })
        }
        console.log(totalSpent);
        return totalSpent;
      },
      pieChart() {
        return {
          data: {
            labels: [" ", " "], // should be empty to remove text from chart
            series: [(this.form.budget - this.spentBudget) / this.form.budget, this.spentBudget / this.form.budget]
          },
          options: {
            height: "230px"
          }
        }
      },
      galleryImages() {
        return this.uploadedImages.map((val) => { return {'src': val, 'thumb': val}})
      },
    }
  }
</script>

<style lang="scss">
  @import 'vue-image-lightbox/dist/vue-image-lightbox.min.css';

  .event-status-field {
    position: absolute;
    right: 31px;
    top: -10px;

    &.dynamic {
      top: -10px;
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
  .header-image-wrapper {
    margin-bottom: 20px;
  }
  .file-input {
    margin-bottom: 15px;
  }
  .image-container {
    text-align: center;

    img {
      width: auto;
      max-height: 150px;
    }
  }
  .gallery-z-index {
    z-index: 500;
  }
</style>
