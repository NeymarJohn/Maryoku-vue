<template>
    <div class="md-layout" style="overflow: hidden; height: 100%;">
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>
        <table style="width: 100%; height: 100%; padding-left: 15px;" >
            <tr style="height: 10%;">
                <td>
                    <table style="width: 100%; height: 100%;">
                        <tr>
                            <td style="width: 80%;min-width: 80%;max-width: 80%;padding-right: 15px;" colspan="2">
                                <filters-panel @filters-changed-event="refreshEvents"></filters-panel>
                            </td>
                            <td style="width: 20%;min-width: 20%;max-width: 20%; padding-left: 15px;">
                                <md-button class="md-success annual-planner-create-new-event-button" @click="openNewEventModal()" style="width: 100%; height: 100%; margin-left: -6px; margin-top: 5px; font-size: 21px; font-weight: 500; white-space: normal;">Create New Event</md-button>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr style="height: 90%;">
                <td>
                    <table style="width: 100%; height: 100%;">
                        <tr>
                            <td style="width: 20%; max-width: 20%; padding-right: 15px;">
                                <month-select-panel :current-year="currentYear" :current-month="currentMonth" :month-counts="monthCounts"></month-select-panel>
                            </td>
                            <td style="width: 60%;">
                                <table style="width: 100%; height: 100%;">
                                    <tr style="height: 95%;">
                                        <td style="padding-top: 15px; padding-right: 15px;">
                                            <md-card id="tour-step-2" style="margin: 0; height: 100%; overflow: auto;">
                                                <md-card-content style="height: 100%; text-align: center;">
                                                    <h3 class="text-gray annual-planner-month-title">{{currentMonthName}}</h3>
                                                    <table style="width: 100%; height: 90%; text-align: center;">
                                                        <tr>
                                                            <th class="text-gray" v-for="dayOfWeek in weekDays">{{dayOfWeek}}</th>
                                                        </tr>
                                                        <tr v-for="monthRow in monthRows">
                                                            <td v-for="monthDay in monthRow" style="width: 14.2%; min-width: 14.2%; max-width: 14.2%;" :class="{'calendar--today': monthDay.isToday}">
                                                                <template v-if="monthDay !== 0">
                                                                    <template v-if="monthDay.hasEvents">
                                                                        <!--<md-button v-if="monthDay.dayInMonth === 1" :ref="`month-day-${monthDay.dayInMonth}`" class="md-simple month-day-button md-just-icon md-round md-md">-->
                                                                        <!--{{monthDay.dayInMonth}}-->
                                                                        <!--</md-button>-->
                                                                        <md-button v-if="monthDay.events && monthDay.events.editables && monthDay.events.editables.length" @click="openEditEventModal(monthDay.events.editables[0])" :ref="`month-day-${monthDay.dayInMonth}`" class="md-just-icon md-round md-md" v-bind:style="`background-color: ${colorWithCategory(monthDay.events.editables[0].category)}`">
                                                                            {{monthDay.dayInMonth}}
                                                                            <span v-if="monthDay.events.editables.length > 1" class="count">
                                        {{monthDay.events.editables.length}}
                                      </span>
                                                                            <md-tooltip>
                                                                                <div v-for="item in monthDay.events.editables" :key="item.id" class="title text-left text-overflow" v-bind:style="`color: ${colorWithCategory(item.category)}`"><md-icon v-bind:style="`color: ${colorWithCategory(item.category)}`">event</md-icon> {{item.title}}</div>
                                                                            </md-tooltip>
                                                                        </md-button>
                                                                        <md-button v-else-if="monthDay.events && monthDay.events.nonEditables && monthDay.events.nonEditables.length" @click="openOccasionEventModal(monthDay.events.nonEditables[0])" :ref="`month-day-${monthDay.dayInMonth}`" class="month-day-button md-simple md-just-icon md-round md-md">
                                                                            {{monthDay.dayInMonth}}
                                                                            <span v-if="monthDay.events.nonEditables.length > 1" class="count">
                                        {{monthDay.events.nonEditables.length}}
                                      </span>
                                                                            <md-tooltip>
                                                                                <div v-for="item in monthDay.events.nonEditables" :key="item.id" class="title text-left text-gray"><md-icon class="text-gray">event</md-icon> {{item.title}}</div>
                                                                            </md-tooltip>
                                                                        </md-button>
                                                                    </template>
                                                                    <template v-else>
                                                                        <md-button :ref="`month-day-${monthDay.dayInMonth}`" @click="openNewEventModal(fullDateWithDay(monthDay.dayInMonth))" class="md-round  md-just-icon md-md" :class="{'md-white': !monthDay.isToday}">
                                                                            {{monthDay.dayInMonth}}
                                                                        </md-button>
                                                                    </template>
                                                                </template>
                                                                <template v-else>
                                                                    <md-button :ref="`month-day-${monthDay.dayInMonth}`" class="md-simple md-round  md-just-icon md-md" disabled="disabled"></md-button>
                                                                </template>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </md-card-content>
                                            </md-card>
                                        </td>
                                    </tr>

                                    <tr style="height: 5%;">
                                        <td style="padding-top: 15px; padding-right: 15px;">
                                            <md-card style="padding: 0; margin: 0; height: 100%; ">
                                                <md-card-content style="text-align: center;">
                                                    <md-button v-for="category in categories" class="md-simple md-xs" v-bind:style="`color: ${category.color} !important;`" :key="category.id">
                                                        <i class="fa fa-square" style="margin-right: 5px;" v-bind:style="`color: ${category.color} !important;`"></i> {{category.item}}
                                                    </md-button>
                                                </md-card-content>
                                            </md-card>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td style="width: 20%;max-width: 20%;">
                                <table style="width: 100%; height: 100%;">
                                    <tr style="height: 95%;">
                                        <td>
                                            <month-events-panel :open-edit-event-modal="openEditEventModal" :open-occasion-event-modal="openOccasionEventModal" :calendar-events="calendarEvents"></month-events-panel>
                                        </td>
                                    </tr>
                                    <tr style="height: 5%;">
                                        <td style="padding-top: 15px;">
                                            <md-button class="md-success md-sm" style="width: 99%; height: 100%; margin-top: 0; font-weight: 500;" @click="exportToExcel">Export To Excel</md-button>
                                            <md-button class="md-grey md-sm disabled" disabled="disabled" style="visibility: hidden; width: 99%; height: 45%; margin-top: 0; font-weight: 500;">Import Events</md-button>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    // import auth from '@/auth';
    import EventModal from './EventModal/';
    import VueElementLoading from 'vue-element-loading';
    import ChartComponent from '@/components/Cards/ChartComponent';
    import CalendarFiltersPanel from './CalendarFiltersPanel';
    import moment from 'moment';
    import CalendarEvent from '@/models/CalendarEvent';
    import Currency from "@/models/Currency";
    import Calendar from "@/models/Calendar";

    import {
        AnimatedNumber
    } from "@/components";

    import FiltersPanel from './FiltersPanel';
    import MonthSelectPanel from './MonthSelectPanel';
    import MonthEventsPanel from './MonthEventsPanel';
    import EventSidePanel from '../Events/EventSidePanel';
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import AnnualPlannerVuexModule from './AnnualPlanner.vuex';
import { log } from 'util';


    export default {
        name: 'calendar-panel',
        components: {
            MonthEventsPanel,
            MonthSelectPanel,
            FiltersPanel,
            VueElementLoading,
            ChartComponent,
            AnimatedNumber,
            CalendarFiltersPanel,
            EventModal
        },
        props: {
            month : {
                type: Number
            },
            year: {
                type: Number
            },
            dayInMonth: {
                type: String
            },
            firstDayOfTheWeek: {
                type: String
            },
            monthCounts: {
                type: Object
            },
        },
        data() {
            return {
                ready: false,
                // auth: auth,
                isLoading: true,
                monthRows: [],
                currentMonthName: '',
                currentMonth: 0,
                currentYear: 0,
                value: [1],
                multiple: true,
                calendarEvents: {},
                occasionsArray: [],
                holidaysSelectDisplayed: true,
                selectedCountries: true,
                selectedCategories: true,
                weekDays: [],
                queryInProgress: false,
            }
        },
        created() {
            this.$store.registerModule('AnnualPlannerVuex', AnnualPlannerVuexModule);
        },
        mounted(){
            this.ready = true;
            this.isLoading = true;
            this.weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        },
        methods: {
            ...mapMutations('AnnualPlannerVuex', ['setEventModal', 'setEditMode', 'setModalSubmitTitle', 'setEventModalAndEventData', 'setEventDate', 'setNumberOfParticipants']),
            ...mapActions('AnnualPlannerVuex', ['setEventModalAndEventData']),

            exportToExcel() {
                let calendarId = this.$auth.user.defaultCalendarId;

                window.open(
                    `${process.env.SERVER_URL}/1/calendars/${calendarId}/export/${this.year}`
                );
            },
            refreshEvents(){
                this.selectYearMonth(this.year, this.month);
                this.queryEvents();
                this.$emit("month-count");
            },
            selectYearMonth(year, month){
                let selectedMoment = moment().date(1).month(month-1).year(year);
                let currentMonth = selectedMoment.month();
                this.currentMonthName = selectedMoment.format('MMMM');
                this.currentMonth = currentMonth+1;
                this.currentYear = year;

                const filtersData = this.$store.state.AnnualPlannerVuex.filtersData;

                filtersData.year = parseInt(year);
                filtersData.month = parseInt(month);
                //console.log(`working with ${year} as year and ${month} as month, days in month: ${daysInMonth} , first date week day is: ${selectedMoment.weekday()}. `);
            },
            queryEvents() {
                if (this.queryInProgress) return;
                this.queryInProgress = true;
                setTimeout(()=>{
                    this.isLoading = true;
                    const storage = this.$store.state.AnnualPlannerVuex.filtersData;

                    let filters = { filters: {
                            year: storage.year,
                            month: storage.month,
                            holidays: this.holidaysSelectDisplayed ? storage.holidays : [],
                            countries: this.selectedCountries ? storage.countries : [],
                            categories: this.selectedCategories ? storage.categories : []
                        }};
                    let calendarId = this.$auth.user.defaultCalendarId;
                    this.$http.post(`${process.env.SERVER_URL}/1/calendars/${calendarId}/events?q=`, filters, { headers: this.$auth.getAuthHeader() })
                        .then((response) => {
                            let eventsMap = {};
                            let occasionsArray = [];
                            if (response.data.events) {
                                response.data.events.forEach(function(event){
                                    let eventStartMillis = event.eventStartMillis;
                                    let eventStartDate = new Date(eventStartMillis);
                                    let eventDateStamp = moment(eventStartDate).format('YYYYMMDD');
                                    if (eventsMap[eventDateStamp] === undefined){
                                        eventsMap[eventDateStamp] = {
                                            editables: [],
                                            nonEditables: []
                                        };
                                    }

                                    if (event.editable) {
                                        eventsMap[eventDateStamp].editables.push(new CalendarEvent(event));
                                    } else {
                                        eventsMap[eventDateStamp].nonEditables.push(new CalendarEvent(event));
                                        occasionsArray.push({id: event.eventStartMillis, value: event.title,  category: event.category});
                                    }
                                });
                            }

                            occasionsArray.sort(function(a, b){return a.id-b.id});
                            this.occasionsArray = occasionsArray;
                            this.calendarEvents = eventsMap;
                            this.generateRows(this.year, this.month);

                            this.isLoading = false;
                            this.queryInProgress = false;
                            this.ready = true;
                        }).catch((error) => {
                        console.log(error);
                    });
                }, 1500);
            },
            generateRows(year, month) {
                let selectedMoment = moment().date(1).month(month-1).year(year);

                let daysInMonth = selectedMoment.daysInMonth();
                let currentMonth = selectedMoment.month();
                let currentYear = selectedMoment.year();

                this.monthRows = [];
                let currentMoment = moment(selectedMoment);

                for (var rowIdx = 0; rowIdx < 6; rowIdx++){ // 5 rows
                    let row = [];
                    for (var dayIdx = 0; dayIdx < 7; dayIdx++) { // 7 days
                        let isToday = moment().isSame(currentMoment, 'day');
                        if (currentMoment.date() === 1 && currentMoment.month() === currentMonth && currentMoment.year() === currentYear) {
                            if (currentMoment.weekday() === dayIdx){
                                row.push({dayInMonth: currentMoment.date(), ...this.selectedDay(currentMoment), isToday});
                                currentMoment = currentMoment.add(1, 'day');
                            } else {
                                row.push(0);
                            }
                        } else if (this.selectedDay(currentMoment).hasEvents) {
                            row.push({dayInMonth: currentMoment.date(), hasEvents: true, events: this.selectedDay(currentMoment).events, isToday});
                            currentMoment = currentMoment.add(1, 'day');
                        } else if (currentMoment.date() <= daysInMonth && currentMoment.month() === currentMonth && currentMoment.year() === currentYear){
                            row.push({dayInMonth: currentMoment.date(), hasEvents: false, isToday});
                            currentMoment = currentMoment.add(1, 'day');
                        } else {
                            row.push(0);
                        }
                    }

                    this.monthRows.push(row);
                }
            },
            selectedDay(currentMoment) {
                let currentDay = moment(currentMoment).format('YYYYMMDD');
                let eventsMap = Object.keys(this.calendarEvents);
                let calendarEventsMap = {}

                if (eventsMap.includes(currentDay)) {
                    calendarEventsMap = {'hasEvents': true, 'events': this.calendarEvents[currentDay]}
                }

                return calendarEventsMap;
            },
            openEventSidePanel(options) {
                window.currentPanel = this.$showPanel({
                    component: EventSidePanel,
                    cssClass: 'md-layout-item md-size-40 transition36 ',
                    openOn: 'right',
                    disableBgClick: false,
                    props: {
                        modalSubmitTitle: options.modalSubmitTitle,
                        editMode: options.editMode,
                        sourceEventData: options.eventData,
                        refreshEvents: this.refreshEvents,
                        year: this.year,
                        month: this.month,
                        occasionsOptions: this.occasionsArray,
                        openInPlannerOption: options.editMode

                    }
                });
            },
            openNewEventModal(currentDate){
                this.setModalSubmitTitle('Save');
                this.setEditMode({ editMode: false });
                this.setNumberOfParticipants({numberOfParticipants: this.$auth.user.customer.numberOfEmployees});
                this.setEventDate({date: currentDate ? currentDate : null});
                this.openEventSidePanel({ modalSubmitTitle: 'Save', editMode: false, eventData: {eventStartMillis: currentDate ? currentDate.getTime() : new Date().getTime(), numberOfParticipants: this.$auth.user.customer.numberOfEmployees} })
            },
            openEditEventModal: function (item) {
                if (!item.editable){
                    item.occasion = item.title;
                }
                this.setEventModalAndEventData({eventData: item});
                this.setModalSubmitTitle('Save');
                this.openEventSidePanel({ modalSubmitTitle: 'Save', editMode: true, eventData: item })
            },
            openOccasionEventModal: function (item) {
                if (!item.editable){
                    item.occasion = item.title;
                }
                this.setEventModalAndEventData({eventData: item});
                this.setModalSubmitTitle('Save');
                this.openEventSidePanel({ modalSubmitTitle: 'Save', editMode: false, eventData: item })
            },
            fullDateWithDay(day) {
                return moment().date(day).month(this.month-1).year(this.year).toDate();
            },
            colorWithCategory(category) {
                let filterCategories = this.categories.filter(c => c.id === category);
                return filterCategories[0] != null ? `${filterCategories[0].color} !important;` : '';
            }
        },
        computed: {
            ...mapState('AnnualPlannerVuex', ['filtersData']),
            ...mapGetters({
                categories: 'event/getCategoriesList',
                customer:'user/getCustomer'
            }),
        },
        watch: {
            year(newVal, oldVal){
                this.selectYearMonth(this.year, this.month);
                this.queryEvents();
            },
            month(newVal, oldVal){
                this.selectYearMonth(this.year, this.month);
                this.queryEvents();
            },
        }
    };
</script>
<style lang="scss" >
    .md-button.md-just-icon {
        overflow: visible;
    }
    .md-simple.month-day-button {
        color: #000 !important;
        font-weight: bold;
        border: 1px dashed lightgray;
    }
    .md-button .md-button-content .count {
        position: absolute;
        top: -5px;
        right: -12px;
        min-width: 16px;
        border-radius: 8px;
        font-size: 10px;
        line-height: 16px;
        background-color: #FF547C;
        color: white;
    }
    .md-grey {
        background-color: #e0e0e0;
    }
    .vue-tooltip.tooltip-custom-non-editable {
        background-color: #fff;
        border: 1px solid #aaa;
        color: black;
        font-size: 14px;
        font-weight: 400;
    }

    .vue-tooltip.tooltip-custom-non-editable .tooltip-arrow {
        border-color: #aaa;
    }

    .vue-tooltip.tooltip-custom-editable {
        background-color: #fefefe;
        border: 1px solid #03a9f4;
        color: black;
        font-size: 14px;
        font-weight: 500;
    }

    .vue-tooltip.tooltip-custom-editable .tooltip-arrow {
        border-color: #03a9f4;
    }

    .text-overflow {
        max-width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .calendar--today {
        button {
            background-color: #ccc !important;
        }
    }
</style>
