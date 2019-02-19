<template>
    <div>
        <div class="md-layout">
            <modal v-if="eventModalOpen">
                <template slot="header">
                    <div class="md-layout d-flex items-center-g">
                            <div class="md-layout-item md-size-auto md-small-size-100 d-flex items-center-v text-center">
                                <md-field v-show="this.editTitle" :class="[{'md-error': errors.has('title')}]">
                                  <label>Event title</label>
                                    <md-input v-model="title"
                                              data-vv-name="title"
                                              v-validate= "modelValidations.title"
                                              required
                                    />
                                    <span class="md-error" v-if="errors.has('title')">The event title is required</span>
                                </md-field>

                                <h4 class="modal-title" v-show="!this.editTitle">
                                  <span v-if="title">{{title}}</span>
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
                                        <md-option v-for="option in occasionsOptions"
                                                   :key="option.value"
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
                                <md-field :class="[{'md-error': errors.has('eventType')}]" class="select-with-icon">
                                    <label>Event Type</label>
                                    <md-select v-model="eventType"
                                               data-vv-name="eventType"
                                               v-validate= "modelValidations.eventType"
                                               required
                                    >
                                        <md-option v-for="option in eventTypesOptions"
                                                   :key="option.item"
                                                   :value="option.item">
                                            {{ option.item }}
                                        </md-option>
                                    </md-select>
                                    <span class="md-error" v-if="errors.has('eventType')">The event eventType is required</span>
                                </md-field>
                            </div>
                              <div class="md-layout-item md-small-size-100">
                                <md-field :class="[{'md-error': errors.has('category')}]" class="select-with-icon">
                                    <label>Category</label>
                                    <md-select v-model="category"
                                               data-vv-name="category"
                                               v-validate= "modelValidations.category"
                                               required
                                    >
                                        <md-option v-for="option in categoriesOptions"
                                                   :key="option.id"
                                                   :value="option.item">
                                            {{ option.item }}
                                        </md-option>
                                    </md-select>
                                    <span class="md-error" v-if="errors.has('category')">The event category is required</span>
                                </md-field>
                            </div>
                        </div>
                        <div class="md-layout mt-15">


                        </div>
                        <div class="md-layout mt-15">
                          <div class="md-layout-item md-size-33 md-small-size-100">
                            <md-datepicker
                              v-model="date"
                              data-vv-name="date"
                              ref="datePicker"
                              v-validate= "modelValidations.date"
                              required>
                              <label :class="[{'md-error': ($refs.datePicker && !$refs.datePicker.$el.classList.contains('md-has-value') )}]">Date</label>
                            </md-datepicker>
                          </div>
                            <div class="md-layout-item md-size-33 md-small-size-100">
                                <md-field :class="[{'md-error': errors.has('time')}]" class="">
                                    <label>Start Time</label>
                                    <md-select v-model="time"
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
                                <md-field :class="[{'md-error': errors.has('duration')}]" class="">
                                    <label>Duration</label>
                                    <md-select v-model="duration"
                                               data-vv-name="duration"
                                               v-validate= "modelValidations.duration"
                                               required>
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
                                <md-field :class="[{'md-error': errors.has('totalBudget')}]">
                                    <label>Budget</label>
                                    <md-input v-model="totalBudget"
                                              data-vv-name="totalBudget"
                                              v-validate= "modelValidations.totalBudget"
                                              required/>
                                    <span class="md-error" v-if="errors.has('totalBudget')">The event budget is required and should be in range of 1 - 1 000 000</span>
                                </md-field>
                            </div>
                          <div class="md-layout-item md-small-size-100">
                            <md-field :class="[{'md-error': errors.has('numberOfParticipants')}]">
                              <label>Number of Participants</label>
                              <md-input type="text"
                                        v-model="numberOfParticipants"
                                        data-vv-name="numberOfParticipants"
                                        v-validate= "modelValidations.numberOfParticipants"
                                        required/>
                              <span class="md-error" v-if="errors.has('numberOfParticipants')">The event participants is required and should be in range of 1 - 10 000</span>
                            </md-field>
                          </div>
                            <!--<div class="md-layout-item md-small-size-100">
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
                            </div>-->
                        </div>

                    </form>
                </template>
                <template slot="footer">
                     <md-button v-if="this.editMode" class="md-simple move-left md-just-icon" @click="showDeleteAlert">
                        <md-icon class="md-theme-warning" style="font-size: 1.5rem !important;">delete </md-icon>
                    </md-button>

                    <md-button class="md-success move-right" @click="validateEvent">
                        {{modalSubmitTitle}}
                    </md-button>
                </template>
            </modal>
        </div>
    </div>
</template>
<script>
  import auth from '@/auth';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import CalendarEvent from '@/models/CalendarEvent';
  import {Modal} from "@/components";
  import Calendar from "@/models/Calendar"
  import swal from "sweetalert2";
  import { error } from 'util';

  export default {
    components: {
      Modal,
    },
    props: {
      year: Number,
      month : Number,
      occasionsOptions: Array,
      currenciesOptions:Array,
      categoriesOptions:Array,
      eventTypesOptions:Array,
    },
    data: () => ({
      auth: auth,
      hoursArray: [],
      durationArray: [...Array(12).keys()].map(x =>  ++x),
      dateValid: true,
      editTitle: false,
      modelValidations: {
        title: {
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
        numberOfParticipants: {
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
        totalBudget: {
          required: true,
          min_value: 1,
          max_value: 1000000,
        },
      },
    }),

    created() {
      [...Array(12).keys()].map(x =>  this.hoursArray.push(`${x}:00 AM`));
      [...Array(12).keys()].map(x =>  x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`));
      this.hoursArray.push()
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
          return this.eventData.id;
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
      title: {
        get() {
          return this.eventData.title
        },
        set(value) {
          this.setEventProperty({key: 'title', actualValue: value});
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
      numberOfParticipants: {
        get() {
          return this.eventData.numberOfParticipants
        },
        set(value) {
          this.setEventProperty({key: 'numberOfParticipants', actualValue: value});
        }
      },
      totalBudget: {
        get() {
          return this.eventData.totalBudget
        },
        set(value) {
          this.setEventProperty({key: 'totalBudget', actualValue: value});
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
      category: {
        get() {
          return this.eventData.category
        },
        set(value) {
          this.setEventProperty({key: 'category', actualValue: value});
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
        this.setEventModal(false);
        this.editTitle = false;
        this.clearForm();
      },
      toogleTitle(){
        this.editTitle = !this.editTitle;
      },
      clearForm() {
          this.id = null;
          this.occasion = null;
          this.title = "New Event";
          this.date = null;
          this.time = "";
          this.duration = "";
          this.numberOfParticipants = "";
          this.status = "draft";
          this.totalBudget = "";
          this.currency = "";
          this.eventType = null;
          this.category = null;
      },
      getError(fieldName) {
        return this.errors.first(fieldName);
      },
      validateDate() {
        return this.$refs.datePicker.$el.classList.contains('md-has-value')
      },
      validateTitle() {
        if (!this.title) {
           this.editTitle = true;
        }
      },
      updateEvent() {
        let _calendar = new Calendar({id: this.$store.state.event.calendarId});
        let editedEvent = new CalendarEvent({id: this.eventData.id});

        editedEvent.title = this.title;
        editedEvent.occasion = this.occasion;
        editedEvent.eventStartMillis = this.getEventStartInMillis();
        editedEvent.eventEndMillis = this.getEventEndInMillis();
        editedEvent.numberOfParticipants = this.numberOfParticipants;
        editedEvent.totalBudget = this.totalBudget;
        editedEvent.status = this.eventData.status;
        editedEvent.currency = this.currency;
        editedEvent.eventType = this.eventType;
        editedEvent.category = this.category;
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
            this.setEventModal(false);
            this.editMode ? this.updateEvent() : this.createEvent();
          } else {
            this.showNotify();
          }
        });
      },
      showDeleteAlert(e, ev) {
        const _this = this;
        e.stopPropagation();
        swal({
          title: "Are you sure?",
          text: `You won't be able to revert this!`,
          showCancelButton: true,
          confirmButtonClass: "md-button md-success",
          cancelButtonClass: "md-button md-danger",
          confirmButtonText: "Yes, delete it!",
          buttonsStyling: false
        }).then(result => {
          if (result.value) {
            this.$parent.isLoading = true;

            let _calendar = new Calendar({id: this.$store.state.event.calendarId});
            let event = new CalendarEvent({id: this.eventData.id});

            event.for(_calendar).delete().then(result => {
              this.$parent.isLoading = false;
              this.closeModal();
              this.$emit("refresh-events");
            }).catch(() => {
              this.$parent.isLoading = false;
            });
          }
        });
      },
      saveEvent() {
        let _calendar = new Calendar({ id: this.$store.state.calendarId });

        let newEvent = new CalendarEvent({
          calendar: {id: this.$store.state.calendarId},
          title: this.title,
          occasion: this.occasion,
          eventStartMillis: this.getEventStartInMillis(),
          eventEndMillis: this.getEventEndInMillis(),
          numberOfParticipants: this.numberOfParticipants,
          totalBudget: this.totalBudget,
          status: this.eventData.status,
          currency: this.currency,
          eventType: this.eventType,
          category: this.category,
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
    watch: {
    }
  };
</script>
<style lang="scss" scope>
  .md-datepicker i{
    display: none;
  }
  .md-field.md-form-group:after,
  .md-field.md-form-group:before,
  .md-field.md-datepicker:after,
  .md-field.md-datepicker:before {
    width: 100%;
  }
  .md-field>.md-icon~label {
    left: 0;
  }
  .md-field>.md-icon~.md-input {
    margin: 0;
  }
  .modal-container {
    max-width: 570px;
  }
</style>
<style lang="scss">
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
    .move-left {
      margin-left: 0!important;
      margin-right: auto!important;
    }
    .move-right {
      margin-right: 0!important;
      margin-left: auto!important;
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
    .justify-beetwen {
      justify-content: space-between
    }
    .md-field .md-error {
      text-align: left;
    }
    .mt-15 {
      margin-bottom: 15px
    }
    .swal2-container {
      z-index: 9999;
    }
</style>
