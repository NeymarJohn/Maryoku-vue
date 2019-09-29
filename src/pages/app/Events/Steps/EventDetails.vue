<template>
    <div class="md-layout">
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
        <div class="md-card">
            <div class="md-card-content">
                <div class="md-layout">
                    <div class="md-layout-item md-size-55">
                        <md-field class="required" :class="[{'md-error': errors.has('title')}]">
                            <label>Event Title</label>
                            <md-input
                                v-model="title"
                                data-vv-name="title"
                                v-validate= "modelValidations.title"
                                required
                            ></md-input>
                            <span class="md-error" v-if="errors.has('title')">The event title is required</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-15">
                        <md-field class="required" :class="[{'md-error': errors.has('numberOfParticipants')}]">
                            <label>Guest Count</label>
                            <md-input
                                v-model="eventData.numberOfParticipants"
                                data-vv-name="numberOfParticipants"
                                v-validate= "modelValidations.numberOfParticipants"
                                required
                            ></md-input>
                            <span class="md-error" v-if="errors.has('numberOfParticipants')">The Guest Count is required</span>

                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-15">
                        <md-field class="required" :class="[{'md-error': errors.has('budget')}]">
                            <label>Budget</label>
                            <md-input
                                v-model="eventData.budget"
                                data-vv-name="budget"
                                v-validate= "modelValidations.budget"
                                required
                            ></md-input>
                            <span class="md-error" v-if="errors.has('budget')">The Budget is required</span>

                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-15">
                        <md-field class="required">
                            <label>Per Guest</label>
                            <md-input v-model="eventData.budgetPerPerson"></md-input>
                        </md-field>
                    </div>
                </div>

                <!-- Event Types list-->
                <div class="md-layout event-types-list" style="margin-top : 1em;">
                    <div class="md-layout-item md-size-40 required" :class="{'has-error': !guestType && validating }">
                        <label class="bold">
                            Select Event Type
                        </label>
                        <br>
                        <span class="md-error" v-if="!eventType && validating">The Event Type Is Required</span>

                        <div class="list-container">
                            <md-field style="margin-top: 0; margin-bottom : 2em;">
                                <md-select v-model="eventType">
                                    <md-option v-for="(type,index) in eventTypes" :key="index"  :value="type.id">{{ type.item }}</md-option>
                                </md-select>
                            </md-field>
<!--                            <div v-for="type in eventTypes"-->
<!--                                 :key="type.item" class="list-item"-->
<!--                                 :class="{'active': isTypeSelected(type.id) }"-->
<!--                                 @click="selectEventType(type)"-->
<!--                            >-->
<!--                                <div class="list-item&#45;&#45;icon">-->
<!--                                    <md-icon v-if="isTypeSelected(type.id)" class="checked-item">check</md-icon>-->
<!--                                </div>-->
<!--                                <div class="list-item&#45;&#45;title">-->
<!--                                    {{ type.item }}-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>
                    </div>
                </div>
                <!-- ./Event Types list-->

                <!-- Guest Types list-->
                <div class="md-layout event-types-list">
                    <div class="md-layout-item md-size-100 required" :class="{'has-error': !guestType && validating }">
                        <label class="bold">
                            Select Guest Type
                        </label>
                        <br>
                        <span class="md-error" v-if="!guestType && validating">The Guest Type Is Required</span>

                        <div class="list-container">
                            <div v-for="type in InviteeTypes"
                                 :key="type" class="list-item"
                                 :class="{'active': isGuestTypeSelected(type) }"
                                 @click="selectGuestType(type)"
                            >
                                <div class="list-item--icon">
                                    <md-icon v-if="isGuestTypeSelected(type)" class="checked-item">check</md-icon>
                                </div>
                                <div class="list-item--title">
                                    {{ type }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ./Guest Types list-->

                <!-- Event fields section -->
                <div class="md-layout">
                    <div class="md-layout-item md-size-25">
                        <md-autocomplete v-model="eventData.occasion"
                                         data-vv-name="occasion"
                                         :md-options="occasionsList"
                                         @md-opened="mdOpened"
                                         class="change-icon-order select-with-icon mb16"
                                         :class="[{'md-error': errors.has('occasion')}]" value="">
                            <label>Occasion</label>
                            <span class="md-error" v-if="errors.has('occasion')">This field is required</span>
                        </md-autocomplete>
                    </div>
                    <div class="md-layout-item md-size-25">
                        <md-field>
                            <label>City</label>
                            <md-input v-model="eventData.city"></md-input>
                        </md-field>
                    </div>
                </div>
                <div class="md-layout">
                    <div class="md-layout-item md-size-50 required">
                        <md-datepicker
                            :class="[{'md-error': (eventData.date && $refs.datePicker && !$refs.datePicker.$el.classList.contains('md-has-value') )}]"
                            v-model="eventData.date"
                            data-vv-name="date"
                            ref="datePicker"
                            v-validate= "modelValidations.date"
                            required>
                            <label >Date</label>
                        </md-datepicker>

                        <md-checkbox v-model="flexibleDate" @change="switchDateRequired">I'm flexible around the selected date</md-checkbox>

                    </div>
                </div>
                <div class="md-layout">
                    <div class="md-layout-item md-size-25">
                        <md-field class="required" :class="[{'md-error': errors.has('time')}]">
                            <label>Start Time</label>
                            <md-select
                                v-model="eventData.time"
                                v-validate= "modelValidations.time"
                                data-vv-name="time"
                                required>
                                <md-option v-for="hour in hoursArray"
                                           :key="hour"
                                           :value="hour">
                                    {{ hour }}
                                </md-option>
                            </md-select>

                            <span class="md-error" v-if="errors.has('time')">The start time is required</span>

                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-25">
                        <md-field class="required" :class="[{'md-error': errors.has('duration')}]">
                            <label>Duration</label>
                            <md-select
                                v-model="eventData.duration"
                                v-validate= "modelValidations.duration"
                                data-vv-name="duration"
                                       required>
                                <md-option v-for="hour in durationArray"
                                           :key="hour"
                                           :value="hour">
                                    {{ hour + ' hours' }}
                                </md-option>
                            </md-select>
                            <span class="md-error" v-if="errors.has('duration')">The duration is required</span>

                        </md-field>

                    </div>
                </div>
                <!-- ./Event fields section -->

                <div class="md-layout">
                    <div class="md-layout-item md-size-100 text-right">
                        <br>
                        <md-button class="md-default">Cancel</md-button>
                        <md-button class="md-primary" @click="validateAndSubmit">Continue</md-button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import EventComponent from '@/models/EventComponent'
    import CalendarEvent from '@/models/CalendarEvent';
    import Calendar from "@/models/Calendar";
    import VueElementLoading from 'vue-element-loading';
    import Occasion from "@/models/Occasion";
    import AnnualPlannerVuexModule from '../../AnnualPlanner/AnnualPlanner.vuex';
    import moment from 'moment';
    import _ from "underscore";
    import swal from "sweetalert2";


    export default {
        name: "get-started-step",
        components: {
            VueElementLoading
        },
        methods: {
            ...mapMutations('AnnualPlannerVuex', ['resetForm', 'setEventModal', 'setEventProperty']),
            selectEventType(type) {
                console.log(type);
                this.eventType = type;
            },
            isTypeSelected(id) {
                return this.eventType;
            },
            selectGuestType(type) {
                this.guestType = type;
            },
            isGuestTypeSelected(guest) {
                return this.guestType === guest;
            },
            validateDate() {
                return this.$refs.datePicker.$el.classList.contains('md-has-value')
            },
            validateAndSubmit () {

                // this.$emit('goToNextPage');
                //  return;
                this.cerrors = {};
                this.validating = true;

                this.$validator.validateAll().then(isValid => {
                    if (isValid) {
                        //this.$parent.isLoading = true;
                        this.createEvent()

                    } else {
                        this.showNotify();
                    }

                });

                if ( !this.eventType || !this.guestType ) {

                } else {



                    //this.$emit('goToNextPage');
                }


            },
            getOccasionList() {
                if ( this.$auth.user.defaultCalendarId ) {
                    let _calendar = new Calendar({id: this.$auth.user.defaultCalendarId});

                    new Occasion().for(_calendar).get()
                        .then(resp =>{
                            this.occasionsList = resp.map((val) => val.title);
                            this.occasionsForCategory = resp.map((val)=>{return {value: val.title, category: val.category}});
                        })
                        .catch(error =>{
                            console.log('error =>> ', error);
                        });
                }
            },
            mdOpened:function() {
                this.eventData.occasion += " ";
                this.eventData.occasion = this.eventData.occasion.substring(0, this.eventData.occasion.length -1)
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
            getEventStartInMillis() {
                if (this.eventData.date && this.eventData.time) {
                    let eventStartTime = new Date(this.eventData.date).getTime() + (this.convertHoursToMillis(moment(this.eventData.time, 'HH:mm a').format('H')));
                    return eventStartTime;
                }
            },
            getEventEndInMillis() {
                if (this.eventData.date && this.eventData.time && this.eventData.duration) {
                    let eventEndTime = this.getEventStartInMillis() + this.convertDurationToMillis(this.eventData.duration);
                    return eventEndTime;
                }
            },
            convertHoursToMillis(hours) {
                return hours * 60 * 60 * 1000;
            },
            convertDurationToMillis(hours) {
                return hours * 60 * 60 * 1000;
            },

            createEvent() {
                let vm = this;


                setTimeout(()=>{
                    let calendarId = this.$auth.user.defaultCalendarId;
                    let _calendar = new Calendar({ id: calendarId});
                    let catObject = _.find(this.occasionsForCategory, (el => el.value === this.eventData.occasion)) || {category: "CompanyDays"};
                    this.category = catObject.category;

                    let newEvent = new CalendarEvent({
                        calendar: {id: calendarId},
                        title: this.eventData.title,
                        occasion: this.eventData.occasion,
                        eventStartMillis: this.getEventStartInMillis(),
                        eventEndMillis: this.getEventEndInMillis(),
                        numberOfParticipants: this.eventData.numberOfParticipants,
                        budgetPerPerson: this.eventData.budgetPerPerson,
                        status: 'draft',
                        currency: 'USD',
                        eventType: this.eventType,
                        participantsType: this.guestType,
                        category: catObject.category, //!this.eventData.editable ? 'Holidays' : 'CompanyDays',
                        editable: true,
                        city: this.eventType.city,
                        //  participantsType: 'Test', // HARDCODED, REMOVE AFTER BACK WILL FIX API,
                    }).for(_calendar).save().then(response => {
                        console.log('new event => ' , response);
                        //this.$parent.isLoading = false;
                        vm.$emit('goToNextPage');

                    })
                        .catch((error) => {
                            console.log(error);
                            this.working = false;
                            //this.$parent.isLoading = false;
                        });
                },100);
            },
            switchDateRequired() {
                this.modelValidations.date.required = !this.flexibleDate;
            }

        },
        data () {
            return {
                isLoading: true,
                event: null,
                calendar: null,
                eventType : null,
                category : '',
                InviteeTypes: ["Guests Only","Guests and spouse","Guests and families", "Guests siblings"],
                guestType : null,
                hoursArray: [],
                durationArray: [...Array(12).keys()].map(x =>  ++x),
                flexibleDate : false,
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
                    category: {
                        required: true,
                    },
                    budget : {
                        required: true
                    },
                    guestType : {
                        required : true
                    }
                },
                occasionsList: [],
                occasionsForCategory: [],
                dateValid: true,
                validating : false
            }
        },
        created(){

            this.$store.registerModule('AnnualPlannerVuex', AnnualPlannerVuexModule);
            this.getOccasionList();
            this.$store.dispatch("event/getEventTypes", {data: this.$auth.user.defaultCalendarId, ctx: this});

            [...Array(12).keys()].map(x => x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined);
            [...Array(12).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`));
            [...Array(8).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 AM`) : this.hoursArray.push(`${x}:00 AM`));

            this.hoursArray.push();
        },
        mounted () {
            this.isLoading = false;
            let vm = this;

            // vm.$auth.currentUser(vm, true, ()=> {
            //
            //     Promise.all([
            //         CalendarEvent.find(vm.$route.params.id),
            //         EventComponent.get()
            //     ]).then(([event, components]) => {
            //         vm.calendar = new Calendar({id: vm.$auth.user.defaultCalendarId});
            //         vm.event = event.for(vm.calendar);
            //
            //         vm.isLoading = false;
            //     });
            // });


        },
        computed : {
            ...mapState('AnnualPlannerVuex', [
                'eventData'
            ]),
            ...mapGetters({
                eventTypes: 'event/getEventTypesList',
            }),
            dateFormat: {
                get () {
                    return this.$material.locale.dateFormat
                },
                set (val) {
                    this.$material.locale.dateFormat = val
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
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/md/_variables.scss";

    .list-container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
        margin-bottom: 20px;
        flex-direction: row;

        .list-item {
            border-radius: 4px;
            cursor: pointer;
            width : 120px;
            text-align: center;
            margin-right : 10px;
            position: relative;

            &.active {
                .list-item--icon {
                    background: $brand-primary;
                    border-color: $brand-primary;
                    .md-icon-font {
                        color: white;
                        content: "check";
                    }

                    .checked-item {
                        position: absolute;
                        right : 5px;
                        top : 5px;
                    }
                }
            }
        }

        .list-item--title {
            margin-top: 5px;
        }

        .list-item--icon {
            width : 120px;
            height : 120px;
            border: 1px solid #e0e0e0;
            text-align: center;
            border-radius: 2px;
        }
    }

</style>
