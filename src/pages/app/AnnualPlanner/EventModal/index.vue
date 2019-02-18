<template>
    <div>
        <div class="md-layout">
            <modal v-if="eventModalOpen">
                <template slot="header">
                    <div class="md-layout d-flex items-center-g">
                            <div class="md-layout-item md-size-auto md-small-size-100 d-flex items-center-v text-center">
                                <md-field v-show="this.editTitle" :class="[{'md-error': errors.has('eventName')}]">
                                  <label>Event title</label>
                                    <md-input v-model="eventName"
                                              data-vv-name="eventName"
                                              v-validate= "modelValidations.eventName"
                                    />
                                    <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
                                </md-field> 

                                <h4 class="modal-title" v-show="!this.editTitle">
                                  <span v-if="eventName">{{eventName}}</span>
                                </h4>
                                <md-button class="md-simple md-just-icon md-round fa fa-edit" @click="toogleTitle">
                                    <md-icon>edit</md-icon>
                                </md-button>
                            </div>
                    </div>                 
                    <md-button class="md-simple md-just-icon md-round modal-default-button" @click="closeModal">
                        <md-icon>clear</md-icon>
                    </md-button>
                </template>
                <template slot="body">
                    <form>
                        <div class="md-layout mt-15">
                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="[{'md-error': errors.has('occasion')}]" class="select-with-icon">
                                    <label>Occasion</label>
                                    <md-select v-model="occasion"
                                               data-vv-name="occasion"
                                               v-validate= "modelValidations.occasion"
                                    >
                                        <md-option v-for="option in occasionOptions"
                                                   :key="option.id"
                                                   :value="option.value">
                                            {{ option.value }}
                                        </md-option>
                                    </md-select>
                                    <span class="md-error" v-if="errors.has('occasion')">The event occasion is required</span>
                                </md-field>
                            </div>
                        </div>
                        <div class="md-layout mt-15">
                            <div class="md-layout-item md-small-size-100">
                                <md-datepicker
                                        v-model="date"
                                        data-vv-name="date"
                                        ref="datePicker"
                                        v-validate= "modelValidations.date"
                                >
                                    <label :class="[{'md-error': ($refs.datePicker && !$refs.datePicker.$el.classList.contains('md-has-value') )}]">Date</label>
                                </md-datepicker>
                            </div>
                        </div>
                        <div class="md-layout mt-15">
                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="[{'md-error': errors.has('time')}]" class="">
                                    <label>Start Time</label>
                                    <md-select v-model="time"
                                               data-vv-name="time"
                                               v-validate= "modelValidations.time"
                                    >
                                        <md-option v-for="hour in hoursArray"
                                                   :key="hour"
                                                   :value="hour">
                                            {{ hour }}
                                        </md-option>
                                    </md-select>
                                    <span class="md-error" v-if="errors.has('time')">The event time is required</span>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="[{'md-error': errors.has('duration')}]" class="">
                                    <label>Duration</label>
                                    <md-select v-model="duration"
                                               data-vv-name="duration"
                                               v-validate= "modelValidations.duration"
                                    >
                                        <md-option v-for="hour in durationArray"
                                                   :key="hour"
                                                   :value="hour">
                                            {{ hour + ' hours' }}
                                        </md-option>
                                    </md-select>
                                    <span class="md-error" v-if="errors.has('duration')">The event duration time is required</span>
                                </md-field>
                            </div>
                        </div>
                        <div class="md-layout mt-15">
                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="[{'md-error': errors.has('participants')}]">
                                    <label>Number of Participants</label>
                                    <md-input type="text"
                                              v-model="participants"
                                              data-vv-name="participants"
                                              v-validate= "modelValidations.participants"
                                    />
                                    <span class="md-error" v-if="errors.has('participants')">The event participants is required and should be in range of 1 - 10 000</span>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="[{'md-error': errors.has('budget')}]">
                                    <label>Budget</label>
                                    <md-input v-model="budget"
                                              data-vv-name="budget"
                                              v-validate= "modelValidations.budget"
                                    />
                                    <span class="md-error" v-if="errors.has('budget')">The event budget is required and should be in range of 1 - 1 000 000</span>
                                </md-field>
                            </div>
                        </div>
                        <div class="md-layout mt-15">
                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="[{'md-error': errors.has('currency')}]" class="select-with-icon">
                                    <label>Currency</label>
                                    <md-select v-model="currency"

                                               data-vv-name="currency"
                                               v-validate= "modelValidations.currency"
                                    >
                                        <md-option v-for="option in currenciesOptions"
                                                   :key="option.id"
                                                   :value="option.value">
                                            {{ option.value }}
                                        </md-option>
                                    </md-select>
                                    <span class="md-error" v-if="errors.has('currency')">The event currency is required</span>
                                </md-field>
                            </div>
                        </div>

                    </form>
                </template>
                <template slot="footer">
                    <md-button class="md-success move-center" @click="validateEvent">
                        {{modalSubmitTitle}}
                    </md-button>
                </template>
            </modal>
        </div>
    </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import CalendarEvent from '@/models/CalendarEvent';
  import Calendar from '@/models/Calendar';
  import {Modal} from "@/components";
import { error } from 'util';

  export default {
    components: {
      Modal,
    },
    props: {
      occasionOptions: Array,
      currenciesOptions: Array,
    },
    data: () => ({
      hoursArray: [...Array(24).keys()].map(x =>  x < 10 ? `0${x}:00`: `${x}:00`),
      durationArray: [...Array(12).keys()].map(x =>  ++x),
      dateValid: true,
      uploadedImages: [],
      editTitle: false,
      modelValidations: {
        eventName: {
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
        status: {
          required: true,
        },
        currency: {
          required: true,
        },
        budget: {
          required: true,
          min_value: 1,
          max_value: 1000000,
        },
      },
    }),

    created() {
    },
    computed: {
      ...mapState('AnnualPlannerVuex', [
        'eventData',
        'eventModalOpen',
        'modalTitle',
        'modalSubmitTitle',
        'editMode',
      ]),
      id: {
        get() {
          return this.eventData.id
        },
        set(value) {
          this.setEventProperty({key: 'id', actualValue: value});
        }
      },
      occasion: {
        get() {
          return this.eventData.occasion
        },
        set(value) {
          this.setEventProperty({key: 'occasion', actualValue: value});
        }
      },
      eventName: {
        get() {
          return this.eventData.eventName
        },
        set(value) {
          this.setEventProperty({key: 'eventName', actualValue: value});
        }
      },
      date: {
        get() {
          return this.eventData.date ? new Date(this.eventData.date) :  null
        },
        set(value) {
          this.setEventProperty({key: 'date', actualValue: value});
        }
      },
      time: {
        get() {
          return this.eventData.time ? this.eventData.time : ""
        },
        set(value) {
          this.setEventProperty({key: 'time', actualValue: value});
        }
      },
      duration: {
        get() {
          return this.eventData.duration;
        },
        set(value) {
          this.setEventProperty({key: 'duration', actualValue: value});
        }
      },
      participants: {
        get() {
          return this.eventData.participants
        },
        set(value) {
          this.setEventProperty({key: 'participants', actualValue: value});
        }
      },
      budget: {
        get() {
          return this.eventData.budget
        },
        set(value) {
          this.setEventProperty({key: 'budget', actualValue: value});
        }
      },
      currency: {
        get() {
          return this.eventData.currency
        },
        set(value) {
          this.setEventProperty({key: 'currency', actualValue: value});
        }
      },
      eventType: {
        get() {
          return this.eventData.eventType
        },
        set(value) {
          this.setEventProperty({key: 'eventType', actualValue: value});
        }
      },
    },
    mounted() {
      this.$root.$on('statusChange', (newStatus) => {
        this.status = newStatus;
      });

      this.$root.$on('submitForm', () => {
        this.validateEvent();
      });
    },
    methods: {
      ...mapMutations('AnnualPlannerVuex', ['resetForm', 'setEventModal', 'setEventProperty']),
      closeModal(){
        this.editTitle = false;
        this.clearForm();
        this.setEventModal(false);
      },
      toogleTitle(){
        this.editTitle = !this.editTitle;
      },
      clearForm() {
          this.id = null;
          this.occasion = null;
          this.eventName = "New Event";
          this.date = null;
          this.time = "";
          this.duration = "";
          this.participants = "";
          this.status = "draft";
          this.budget = "";
          this.currency = "";
          this.eventType = null;
      },
      getError(fieldName) {
        return this.errors.first(fieldName);
      },
      validateDate() {
        return this.$refs.datePicker.$el.classList.contains('md-has-value')
      },
      validateTitle() {
        if (!this.eventName) {
           this.editTitle = true;
        }
      },
      updateEvent() {
        let _calendar = new Calendar({id: this.$store.state.calendarId});
        let editedEvent = new CalendarEvent({id: this.eventData.id});

        editedEvent.title = this.eventName;
        editedEvent.occasion = this.occasion;
        editedEvent.eventStartMillis = this.getEventStartInMillis();
        editedEvent.eventEndMillis = this.getEventEndInMillis();
        editedEvent.numberOfParticipants = this.participants;
        editedEvent.totalBudget = this.budget;
        editedEvent.status = this.eventData.status;
        editedEvent.currency = this.currency;
        editedEvent.participantsType = 'Test'; // HARDCODED, REMOVE AFTER BACK WILL FIX API,

        editedEvent.for(_calendar).save().then(response => {
          this.$parent.isLoading = false;
          this.closeModal();
          this.$emit("refresh-events");
        })
          .catch((error) => {
            console.log(error);
            this.$parent.isLoading = false;
          });

      },
      createEvent() {
        Calendar.get().then((calendars) => {
          this.$store.state.calendarId = calendars[0].id;
          this.saveEvent();
        })
          .catch((error) => {
            console.log(error);
            this.$parent.isLoading = false;
          });
      },
      validateEvent() {
        this.validateTitle();
        this.$validator.validateAll().then(isValid => {
          if ((this.dateValid = this.validateDate()) && isValid) {
            
            this.$parent.isLoading = true;

            this.editMode ? this.updateEvent() : this.createEvent();
          } else {
            this.showNotify();
          }
        });
      },
      saveEvent() {
        let _calendar = new Calendar({ id: this.$store.state.calendarId });

        let newEvent = new CalendarEvent({
          calendar: {id: this.$store.state.calendarId},
          title: this.eventName,
          occasion: this.occasion,
          eventStartMillis: this.getEventStartInMillis(),
          eventEndMillis: this.getEventEndInMillis(),
          numberOfParticipants: this.participants,
          totalBudget: this.budget,
          status: this.eventData.status,
          currency: this.currency,
          eventType: this.eventType,
          edittable: true,
          participantsType: 'Test', // HARDCODED, REMOVE AFTER BACK WILL FIX API,
        }).for(_calendar).save().then(response => {
            this.$parent.isLoading = false;
            this.closeModal();
            this.$emit("refresh-events");
          })
            .catch((error) => {
              console.log(error);
              this.$parent.isLoading = false;
            });
      },
      getEventStartInMillis() {
        if (this.date && this.time) {
          let eventStartTime = new Date(this.date).getTime() + (this.convertHoursToMillis(+this.time.substring(0, 2)));
          return eventStartTime;
        }
      },
      getEventEndInMillis() {
        if (this.date && this.time && this.duration) {
          let eventEndTime = this.getEventStartInMillis() + this.convertHoursToMillis(this.duration);
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
    },
  };
</script>

<style lang="scss">
    .modal-container {
      max-width: 580px;
    }
    .modal-z-index {
        z-index: 5;
    }
    .large-z-index {
        z-index: 6;
        position: relative;
    }
    .move-center {
        margin: 0 auto!important;;
    }
    .text-center {
      text-align: center;
    }
    .d-flex {
      display: flex;
    }
    .items-center-v {
      align-items: center;
    }
    .items-center-g {
      justify-content: center;
    }
    .md-field .md-error {
      text-align: left;
    }
    .mt-15 {
      margin-bottom: 15px
    }
</style>
