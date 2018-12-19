<template>
  <div class="md-layout">

    <div class="md-layout-item md-size-100">

      <div class="event-form-padding">
        <form class="md-layout">
          <md-card class="md-layout-item md-size-100 padding-card">

            <div class="md-layout-item">
              <md-field :class="[{'md-error': errors.has('eventName')}]">
                <md-icon class="md-accent">home</md-icon>
                <label>Event Title</label>
                <md-input v-model="form.eventName"
                          data-vv-name="eventName"
                          v-validate= "modelValidations.eventName"
                          required/>
                <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
              </md-field>
            </div>

            <div class="md-layout">
              <div class="md-layout-item md-size-33 md-small-size-100">
                <md-datepicker
                    v-model="form.date"
                    data-vv-name="date"
                    ref="datePicker"
                    v-validate= "modelValidations.date"
                    required>
                  <label :class="[{'md-error': ($refs.datePicker && !$refs.datePicker.$el.classList.contains('md-has-value') )}]">Date</label>
                </md-datepicker>
                
                <div class="md-custom-error" v-if="($refs.datePicker && !$refs.datePicker.$el.classList.contains('md-has-value'))">The event date is required</div>
                
              </div>

              <div class="md-layout-item md-size-33 md-small-size-100">
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

              <div class="md-layout-item md-size-33 md-small-size-100">
                <md-field :class="[{'md-error': errors.has('duration')}]" class="select-with-icon">
                  <md-icon class="md-accent">hourglass_empty</md-icon>
                  <label>Duration in hr.</label>
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

            <div class="md-layout">
              <div class="md-layout-item md-size-33 md-small-size-100">
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
              </div>
              <div class="md-layout-item md-size-33 md-small-size-100">
                <md-field :class="[{'md-error': errors.has('participants')}]">
                  <md-icon class="md-accent">person</md-icon>
                  <label># of Participants</label>
                  <md-input type="text"
                            v-model="form.participants"
                            data-vv-name="participants"
                            v-validate= "modelValidations.participants"
                            required/>
                  <span class="md-error" v-if="errors.has('participants')">The event participants is required and should be in range of 1 - 10 000</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33 md-small-size-100">
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
              </div>
            </div>
          </md-card>


          <chart-card
              class="md-size-100 md-layout-item"
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
        </form>
      </div>
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
  import $ from 'jquery';
  import moment from 'moment';

  export default {
    name: 'event-header-form',
    components: {
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
      dateValid: true,
      isModalLoading: false,
      form: {
        eventName: "",
        occasion: "",
        date: new Date(),
        time: "",
        duration: "",
        participants: "",
        status: "draft",
        budget: "",
        location: "",
      },
      uploadedImages: [],

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
        this.validateDate();
        this.form = this.formData;
      }
    },
    mounted() {
      if (this.formData) {
        this.form = this.formData;
        this.form.date = moment()
        this.formData.date = new Date();
      }

      this.$root.$on('statusChange', (newStatus) => {
        this.form.status = newStatus;
      });

      this.$root.$on('submitForm', (images) => {
        this.validateEvent();
        this.uploadedImages = images;
      });
    },
    methods: {
      updateEvent() {
        let _calendar = new Calendar({id: this.$store.state.calendarId});
        let editedEvent = new CalendarEvent({id: this.event.id});

        editedEvent.title = this.form.eventName;
        editedEvent.eventStartMillis = this.getEventStartInMillis();
        editedEvent.eventEndMillis = this.getEventEndInMillis();
        editedEvent.location = this.form.location;
        editedEvent.occasion = this.form.occasion;
        editedEvent.numberOfParticipants = this.form.participants;
        editedEvent.totalBudget = this.form.budget
        editedEvent.status = this.form.status;
        editedEvent.currency = 'USD'; // HARDCODED, REMOVE AFTER BACK WILL FIX API
        editedEvent.participantsType = 'Test'; // HARDCODED, REMOVE AFTER BACK WILL FIX API,
        editedEvent.components = this.$store.state.eventData.components;

        editedEvent.for(_calendar).save().then(response => {
          this.$parent.isLoading = false;
          this.$router.push({path: '/events'});
        })
        .catch((error) => {
          console.log(error);
          this.$parent.isLoading = false;
        });

      },
      saveEvent() {
        let _calendar = new Calendar({ id: this.$store.state.calendarId });

        let newEvent = new CalendarEvent({
          calendar: {id: this.$store.state.calendarId},
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
        }).for(_calendar);

        newEvent.save().then(ev => {
          let images = this.uploadedImages.map((image) => {
            return new CalendarEventImage({featuredImageFile: image.src}).for(_calendar, ev).save();
          })
          Promise.all(images).then(values => {
            this.$parent.isLoading = false;
            this.$router.push({ path: '/events' });
          })
          .catch((error) => {
            console.log(error);
            this.$parent.isLoading = false;
          });
        })
        .catch((error) => {
          console.log(error);
          this.$parent.isLoading = false;
        });
      },
      createEvent() {
        if (this.$store.state.calendarId === null) {
          Calendar.get().then((calendars) => {
            this.$store.state.calendarId = calendars[0].id;
            this.saveEvent();
          })
          .catch((error) => {
            console.log(error);
            this.$parent.isLoading = false;
          });
        } else {
          this.saveEvent();
        }
      },
      validateDate() {
        return this.$refs.datePicker.$el.classList.contains('md-has-value')
      },
      validateEvent () {
        this.$validator.validateAll().then(isValid => {
          if ((this.dateValid = this.validateDate()) && isValid) {
            this.$parent.isLoading = true;
            this.$props.shouldUpdate ? this.updateEvent() : this.createEvent();
          } else {
            this.showNotify();
          }
        })
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
      showNotify() {
        this.$notify({
          message: 'Please, check all required fields',
          icon: "warning",
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: 'danger',
        });
      },
      calculateSpent() {
        if(this.spentBudget === 0 || this.spentBudget === NaN ) {
          return 0
        }
        return this.spentBudget;
      },
      calculateRemain() {
        if (this.form.budget === 0 || this.form.budget === NaN || this.form.budget === '') {
          return this.calculateSpent() > 0 ? 0 : 1;
        }
        if (this.spentBudget > this.form.budget) {
          return 0;
        }
        return this.form.budget - this.spentBudget;
      },
    },

    computed: {
      isDateValid() {
        this.form.date && this.validateDate();
      },
      spentBudget() {
        let totalSpent = 0;
        if (this.$store.state.eventData.components) {
          this.$store.state.eventData.components.forEach(function(component) {
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
    }
  }
</script>

<style lang="scss">
  .md-custom-error {
    opacity: 1;
    margin-bottom: 6px;
    color: red;
    margin-top: -11px;
    font-size: 12px;
  }


  .event-form-padding {
    margin-top: 0;

    .padding-card {
      padding-top: 15px;
      padding-bottom: 30px;
    }
  }
  .md-datepicker-dialog {
    height: 330px;
  }
  .md-datepicker {
    .md-icon.md-theme-default.md-icon-image svg {
      fill: #ff5252;
    }

    &.md-field::after {
      width: 100%;
    }
  }
  .clickable-button {
    pointer-events: all;
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

  .header-image-wrapper .file-input {
    margin-right: 10px;
  }
</style>
