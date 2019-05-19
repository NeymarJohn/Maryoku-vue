<template>
  <div class="md-layout" style="max-height: 100vh;">
    <div class="md-layout-item md-size-5" style="padding: 0; margin: 0;">
      <h4 class="md-title">
        <md-button @click="closePanel" class="md-button md-theme-default md-simple md-just-icon"><md-icon>arrow_back</md-icon></md-button>
      </h4>
    </div>
    <div class="md-layout-item md-size-95" style="max-height: 90vh; ">
      <h4 class="md-title" style="margin-bottom: 0; line-height: 51px;">
        {{this.editMode ? "Edit Event" : "Create Event" }}
      </h4>

      <div class="md-layout" style="overflow: auto; max-height: 90vh; margin-top: 24px;">
        <div class="md-layout-item mx-auto">
          <form>
            <div class="md-layout mb16">
              <div class="md-layout-item md-size-100">
                <md-field :class="[{'md-error': errors.has('title')}]">
                  <label>Event title</label>
                  <md-input v-model="title"
                            data-vv-name="title"
                            v-validate= "modelValidations.title"
                            required
                            v-focus v-select-all
                  />
                  <span class="md-error" v-if="errors.has('title')">The event title is required</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-autocomplete v-model="occasion"
                                 data-vv-name="occasion"
                                 :md-options="occasionsList"
                                 @md-opened="mdOpened"
                                 class="change-icon-order select-with-icon mb16"
                                 :class="[{'md-error': errors.has('occasion')}]">
                  <label>Occasion</label>
                  <span class="md-error" v-if="errors.has('occasion')">This field is required</span>
                </md-autocomplete>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="[{'md-error': errors.has('eventType')}]" class="select-with-icon">
                  <label>Event Type</label>
                  <md-select v-model="eventType"
                             data-vv-name="eventType"
                             v-validate= "modelValidations.eventType"
                             required>
                    <md-option v-for="option in eventTypes"
                               :key="option.item"
                               :value="option.item">
                      {{ option.item }}
                    </md-option>
                  </md-select>
                  <span class="md-error" v-if="errors.has('eventType')">The event eventType is required</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="[{'md-error': errors.has('participantsType')}]" class="select-with-icon">
                  <label>Invitee Type</label>
                  <md-select v-model="participantsType"
                             data-vv-name="participantsType"
                             v-validate= "modelValidations.participantsType"
                             required>
                          <md-option v-for="(option, index) in InviteeTypes"
                               :key="index"
                               :value="option">
                      {{ option }}
                    </md-option>
                  </md-select>
                  <span class="md-error" v-if="errors.has('participantsType')">The event Invitee Type is required</span>
                </md-field>
              </div>
              <!--<div class="md-layout-item md-small-size-100">-->
                <!--<md-field :class="[{'md-error': errors.has('category')}]" class="select-with-icon">-->
                  <!--<label>Category</label>-->
                  <!--<md-select v-model="category"-->
                             <!--data-vv-name="category"-->
                             <!--v-validate= "modelValidations.category"-->
                             <!--required>-->
                    <!--<md-option v-for="option in categories"-->
                               <!--:key="option.id"-->
                               <!--:value="option.item">-->
                      <!--{{ option.item }}-->
                    <!--</md-option>-->
                  <!--</md-select>-->
                  <!--<span class="md-error" v-if="errors.has('category')">The event category is required</span>-->
                <!--</md-field>-->
              <!--</div>-->
            </div>
            <div class="md-layout mb16">
              <div class="md-layout-item md-size-100 md-small-size-100">
                <md-datepicker
                  v-model="date"
                  data-vv-name="date"
                  ref="datePicker"
                  v-validate= "modelValidations.date"
                  required>
                  <label :class="[{'md-error': ($refs.datePicker && !$refs.datePicker.$el.classList.contains('md-has-value') )}]">Date</label>
                </md-datepicker>
              </div>
            </div>
            <div class="md-layout mb16">
              <div class="md-layout-item md-size-50 md-small-size-100">
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

              <div class="md-layout-item md-size-50 md-small-size-100">
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
            <div class="md-layout mb16">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label>Budget Per Participant</label>
                  <md-input v-model="totalBudget"
                            data-vv-name="totalBudget"
                            v-validate= "modelValidations.statis"
                            required/>
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
              <div class="md-layout-item md-size-100" style="margin-top: 24px;">
                <div class="pull-right">
                  <md-button class="md-success" @click="validateEvent">
                    {{modalSubmitTitle}}
                  </md-button>

                  <md-button v-if="this.editMode" class="md-danger md-just-icon" @click="showDeleteAlert">
                    <md-icon class="md-theme-warning" style="font-size: 1.5rem !important;">delete </md-icon>
                  </md-button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import auth from '@/auth';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import CalendarEvent from '@/models/CalendarEvent';
  import Calendar from "@/models/Calendar"
  import swal from "sweetalert2";
  import { error } from 'util';
  import moment from 'moment';

  export default {
    props: {
      year: Number,
      month : Number,
      occasionsOptions: Array,
      currentEvent : {
        type : Object,
        default : null
      }
    },
    data: () => ({
      auth: auth,
      hoursArray: [],
      durationArray: [...Array(12).keys()].map(x =>  ++x),
      dateValid: true,
      editTitle: false,
      InviteeTypes: ["Employees Only","Employees and spouse","Employees and families", "Employees children"],
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
        eventType: {
          required: true,
        },
        participantsType: {
          required: true,
        },
        category: {
          required: true,
        },
      },
    }),

    created() {
      [...Array(12).keys()].map(x => x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined);
      [...Array(12).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`));
      [...Array(8).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 AM`) : this.hoursArray.push(`${x}:00 AM`));

      this.hoursArray.push();
    },
    computed: {
      ...mapState('AnnualPlannerVuex', [
        'eventData',
        'eventModalOpen',
        'modalTitle',
        'modalSubmitTitle',
        'editMode',
      ]),
      ...mapGetters({
        categories: 'event/getCategoriesList',
        currencies: 'event/getCurrenciesList',
        eventTypes: 'event/getEventTypesList'
      }),
      occasionsList: {
        get: function() {
          if (!this.occasionsOptions) {
            return [];
          }

          let occasionList = this.occasionsOptions.map((val) => val.value);

          if (this.occasionCache !== "") {
            occasionList.push(this.occasionCache)
          }

          return occasionList;
        }
      },
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
      occasionCache: {
        get() {
          return this.eventData.occasionCache
        },
        set(value) {
          this.setEventProperty({key: 'occasionCache', actualValue: value});
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
      participantsType: {
        get() {
          return this.eventData.participantsType
        },
        set(value) {
          this.setEventProperty({key: 'participantsType', actualValue: value});
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
      toogleTitle(){
        this.editTitle = !this.editTitle;
      },
      clearForm() {
        this.id = null;
        this.occasion = "";
        this.occasionCache = "";
        this.title = "New Event";
        this.date = null;
        this.time = "";
        this.duration = "";
        this.numberOfParticipants = "";
        this.status = "draft";
        this.totalBudget = "";
        this.currency = "";
        this.eventType = null;
        this.participantsType = null;
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
        let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});
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
        editedEvent.participantsType = this.participantsType;
        editedEvent.category = this.occasionsOptions[this.occasionsList.indexOf(this.occasion)].category;
       // editedEvent.participantsType = 'Test'; // HARDCODED, REMOVE AFTER BACK WILL FIX API,
        editedEvent.for(_calendar).save().then(response => {
          this.$parent.isLoading = false;
          this.closePanel();

          location.reload();
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

            let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.eventData.id});

            event.for(_calendar).delete().then(result => {
              this.$parent.isLoading = false;
              this.closePanel();
              this.refreshEvents();
            }).catch(() => {
              this.$parent.isLoading = false;
            });
          }
        });
      },
      createEvent() {
        let calendarId = this.auth.user.defaultCalendarId
        let _calendar = new Calendar({ id: calendarId});

        let newEvent = new CalendarEvent({
          calendar: {id: calendarId},
          title: this.title,
          occasion: this.occasion,
          eventStartMillis: this.getEventStartInMillis(),
          eventEndMillis: this.getEventEndInMillis(),
          numberOfParticipants: this.numberOfParticipants,
          totalBudget: this.totalBudget,
          status: this.eventData.status,
          currency: this.currency,
          eventType: this.eventType,
          participantsType: this.participantsType,
          category: this.occasionsOptions[this.occasionsList.indexOf(this.occasion)].category,
          edittable: true,
        //  participantsType: 'Test', // HARDCODED, REMOVE AFTER BACK WILL FIX API,
        }).for(_calendar).save().then(response => {
          console.log('new event => ' , response.id);
          this.$parent.isLoading = false;
          this.closePanel();
          //this.$emit("refresh-events");
          this.$router.push({ name: 'EditEvent', params: {id: response.id} })

        })
          .catch((error) => {
            console.log(error);
            this.$parent.isLoading = false;
          });
      },
      getEventStartInMillis() {
        if (this.date && this.time) {
          let eventStartTime = new Date(this.date).getTime() + (this.convertHoursToMillis(moment(this.time, 'HH:mm a').format('H')));
          return eventStartTime;
        }
      },
      getEventEndInMillis() {
        if (this.date && this.time && this.duration) {
          let eventEndTime = this.getEventStartInMillis() + this.convertDurationToMillis(this.duration);
          return eventEndTime;
        }
      },
      convertHoursToMillis(hours) {
        return hours * 60 * 60 * 1000;
      },
      convertDurationToMillis(hours) {
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
      mdOpened:function() {
        this.occasion += " ";
        this.occasion = this.occasion.substring(0, this.occasion.length -1)
      },
      openEventPlanner() {
        this.$router.push({ name: 'EditEvent', params: {id: this.id }});
      },
      closePanel(){
        this.setEventModal(false);
        this.editTitle = false;
        this.clearForm();
        this.$emit("closePanel");
      }
    },
    watch: {

      value(newValue, oldValue) {
        this.initAnimation(newValue, oldValue);
      }
    }
  };
</script>
<style lang="scss" scope>
  .md-datepicker {
    .md-icon.md-date-icon {
      display: none;
      &~label {
        left: 0;
      }
    }
    input {
      margin-left: 0 !important;
    }
    &.md-field::before,
    &.md-field::after {
      width: 100%;
    }
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
  .swal2-container {
    z-index: 10000;
  }
</style>

<!--<script>-->

<!--import {LabelEdit} from '@/components';-->
