<template>
    <div>
        <div class="md-layout">
            <modal v-if="eventModalOpen">
                <template slot="header">
                    <h4 class="modal-title">Create new Event</h4>
                    <md-button class="md-simple md-just-icon md-round modal-default-button" @click="closeModal">
                        <md-icon>clear</md-icon>
                    </md-button>
                </template>
                <template slot="body">
                    <form>

                        <div class="md-layout">
                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="[{'md-error': errors.has('eventName')}]">
                                    <label>Event Title</label>
                                    <md-input v-model="form.eventName"
                                              data-vv-name="eventName"
                                              v-validate= "modelValidations.eventName"
                                    />
                                    <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
                                </md-field>
                            </div>
                        </div>
                        <div class="md-layout">
                            <div class="md-layout-item md-small-size-100">
                                <md-datepicker
                                        v-model="form.date"
                                        data-vv-name="date"
                                        ref="datePicker"
                                        v-validate= "modelValidations.date"
                                >
                                    <label :class="[{'md-error': ($refs.datePicker && !$refs.datePicker.$el.classList.contains('md-has-value') )}]">Date</label>
                                </md-datepicker>
                            </div>
                        </div>
                        <div class="md-layout">
                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="[{'md-error': errors.has('time')}]" class="">
                                    <label>Start Time</label>
                                    <md-select v-model="form.time"
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
                                    <md-select v-model="form.duration"
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

                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="[{'md-error': errors.has('participants')}]">
                                    <label>Number of Participants</label>
                                    <md-input type="text"
                                              v-model="form.participants"
                                              data-vv-name="participants"
                                              v-validate= "modelValidations.participants"
                                    />
                                    <span class="md-error" v-if="errors.has('participants')">The event participants is required and should be in range of 1 - 10 000</span>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="[{'md-error': errors.has('location')}]">
                                    <label>Geography</label>
                                    <md-input type="text"
                                              v-model="form.location"
                                              data-vv-name="location"
                                              v-validate= "modelValidations.location"
                                    />
                                    <span class="md-error" v-if="errors.has('location')">The location is required</span>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="[{'md-error': errors.has('budget')}]">
                                    <label>Budget</label>
                                    <md-input v-model="form.budget"
                                              data-vv-name="budget"
                                              v-validate= "modelValidations.budget"
                                    />
                                    <span class="md-error" v-if="errors.has('budget')">The event budget is required and should be in range of 1 - 1 000 000</span>
                                </md-field>
                            </div>
                        </div>

                    </form>
                </template>
                <template slot="footer">
                    <md-button class="md-primary" @click="validateModalForm">
                        Save
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
  import moment from 'moment';

  export default {
    components: {
      Modal,
    },
    props: {
      formData: Object,
      selectedDate: String,
      shouldUpdate: Boolean,
    },
    data: () => ({
      hoursArray: [...Array(24).keys()].map(x =>  x < 10 ? `0${x}:00`: `${x}:00`),
      durationArray: [...Array(12).keys()].map(x =>  ++x),
      dateValid: true,
      form: {
        eventName: "",
        date: null,
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
    created() {
    },
    computed: {
      ...mapState('AnnualPlannerVuex', [
        'eventModalOpen',
        'modalTitle',
        'editMode',
      ])
    },
    mounted() {
      if (this.formData) {
        this.form = this.formData;
        this.form.date = moment(this.formData.eventStartInMillis);
        this.formData.date = new Date(this.formData.eventStartInMillis);
      }

      this.$root.$on('statusChange', (newStatus) => {
        this.form.status = newStatus;
      });

      this.$root.$on('submitForm', () => {
        this.validateEvent();
      });
    },
    methods: {
      ...mapMutations('AnnualPlannerVuex', ['resetForm', 'setEventModal']),
      closeModal(){
        this.setEventModal(false);
      },
      clearForm() {
        this.form = {
          id: null,
          eventName: "",
          date: null,
          time: "",
          duration: "",
          participants: "",
          status: "draft",
          budget: "",
          location: "",
        };
      },
      toggleModal: function (show) {
        this.setEventModal(show);
      },
      getError(fieldName) {
        return this.errors.first(fieldName);
      },
      validateDate() {
        return this.$refs.datePicker.$el.classList.contains('md-has-value')
      },
      updateEvent() {
        let _calendar = new Calendar({id: this.$store.state.calendarId});
        let editedEvent = new CalendarEvent({id: this.event.id});

        editedEvent.title = this.form.eventName;
        editedEvent.eventStartMillis = this.getEventStartInMillis();
        editedEvent.eventEndMillis = this.getEventEndInMillis();
        editedEvent.location = this.form.location;
        editedEvent.numberOfParticipants = this.form.participants;
        editedEvent.totalBudget = this.form.budget;
        editedEvent.status = this.form.status;
        editedEvent.currency = 'USD'; // HARDCODED, REMOVE AFTER BACK WILL FIX API
        editedEvent.participantsType = 'Test'; // HARDCODED, REMOVE AFTER BACK WILL FIX API,

        editedEvent.for(_calendar).save().then(response => {
          this.$parent.isLoading = false;
          this.$router.push({path: '/events'});
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
      validateModalForm() {
        this.$validator.validateAll().then(isValid => {
          if ((this.dateValid = this.validateDate()) && isValid) {
            this.$parent.isLoading = true;

            this.$props.shouldUpdate ? this.updateEvent() : this.createEvent();
          } else {
            this.showNotify();
          }
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
          numberOfParticipants: this.form.participants,
          totalBudget: this.form.budget,
          status: this.form.status,
          currency: 'USD', // HARDCODED, REMOVE AFTER BACK WILL FIX API
          participantsType: 'Test', // HARDCODED, REMOVE AFTER BACK WILL FIX API,
        }).for(_calendar);

        newEvent.save();

        this.clearForm();
        this.closeModal();
        this.$parent.isLoading = false;
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
        return 0;
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
        max-width: 700px;
    }
    .modal-z-index {
        z-index: 5;
    }
    .large-z-index {
        z-index: 6;
        position: relative;
    }
</style>
