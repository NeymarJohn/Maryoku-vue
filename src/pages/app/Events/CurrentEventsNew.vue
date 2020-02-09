<template>
    <div class="edit-event-details">
        <!-- Event Header -->
        <div class="event-header d-flex justify-content-between">
            <div class="header-title">
                <h3> <img src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2010.svg" width="15"> Budget</h3>
            </div>
            <div class="header-actions">
                <ul>
                    <li><a href=""><i class="fa fa-download"></i></a></li>
                    <li><a href=""><i class="fa fa-download"></i></a></li>
                    <li><a href=""><i class="fa fa-download"></i></a></li>
                </ul>
            </div>
        </div>

        <div class="md-layout justify-content-between">
            <div class="md-layout-item md-size-60">

                <div class="card-section">
                    <div class="section-header">
                        Overview
                    </div>
                    <div class="budget-list d-flex justify-content-between">
                        <div class="budget-list__item">
                            <div class="label-title">Budget</div>
                            <div class="budget-value">${{calendarEvent.totalBudget}}</div>
                            <a href="">Edit</a>
                        </div>
                        <div class="budget-list__item">
                            <div class="label-title">User</div>
                            <div class="budget-value">${{calendarEvent.budgetPerPerson}}</div>
                            <div class="percent">50%</div>
                        </div>
                        <div class="budget-list__item">
                            <div class="label-title">Remaining</div>
                            <div class="budget-value">${{totalRemainingBudget}}</div>
                            <div class="percent">42%</div>
                        </div>
                    </div>
                </div>

                <div class="card-section saved-budget text-center">
                    So far you saved : <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+25.png" width="15"> <b>$100</b>
                </div>

            </div>
            <div class="md-layout-item  md-size-40">
                <div class="card-section">
                </div>
            </div>
        </div>



        <div class="md-layout justify-content-between">
            <div class="md-layout-item md-size-40">

                <div class="card-section">
                    <div class="section-header">
                        Expenses
                    </div>

                    <div>

                        <chart-card
                            header-animation="false"
                            :chart-data="pieChart.data"
                            :chart-options="pieChart.options"
                            chart-type="Pie"
                            header-icon
                            chart-inside-content
                            background-color="green">
                            <template slot="footer">
                                <div class="md-layout">
                                    <div class="md-layout-item md-size-100">
                                        <h6 class="category">Legend</h6>
                                    </div>
                                    <div class="md-layout-item">
                                        <i class="fa fa-circle text-info"></i> Apple
                                        <i class="fa fa-circle text-warning"></i> Samsung
                                        <i class="fa fa-circle text-danger"></i> Windows Phone
                                    </div>
                                </div>
                            </template>
                        </chart-card>

                    </div>

                </div>

            </div>
            <div class="md-layout-item  md-size-60">
                <div class="event-blocks-table">
                    <tabs
                        :tab-name="['<img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+26.png\'> Total', ' <img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+28.png\'> Per Guest']"
                    >
                        <!-- here you can add your content for tab-content -->
                        <template slot="tab-pane-1">
                            <new-event-building-blocks :event.sync="event" :event-components="selectedComponents" type="total"></new-event-building-blocks>
                        </template>
                        <template slot="tab-pane-2">
                            <new-event-building-blocks :event.sync="event" :event-components="selectedComponents" type="perGuest"></new-event-building-blocks>
                        </template>
                    </tabs>
                </div>
            </div>
        </div>


        <upload-vendors-modal ref="uploadModal"></upload-vendors-modal>



    </div>

</template>

<script>

    import EventModal from './EventModal/'
    import EventPlannerVuexModule from './EventPlanner.vuex'

    //MAIN MODULES
    import ChartComponent from '@/components/Cards/ChartComponent'

    import { ChartCard } from "@/components";


    // import auth from '@/auth';
    import moment from 'moment'
    import VueElementLoading from 'vue-element-loading'
    import Calendar from '@/models/Calendar'
    import CalendarEvent from '@/models/CalendarEvent'
    import CalendarEventStatistics from '@/models/CalendarEventStatistics'
    import EventComponent from '@/models/EventComponent'
    import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';

    import { Tabs } from "@/components";
    import NewEventBuildingBlocks from './components/NewEventBuildingBlocks'

    //COMPONENTS

    import UploadVendorsModal from '../Vendors/ImportVendors';


    export default {
        components: {
            Tabs,
            NewEventBuildingBlocks,
            ChartComponent,
            ChartCard,
            UploadVendorsModal
        },

        data () {
            return {
                // auth: auth,
                calendarEvent: {},
                selectedComponents: [],
                currentTab: 'blocks',
                eventId: null,
                percentage: 0,
                totalRemainingBudget: 0,
                remainingBudgetPerEmployee: 0,
                seriesData: [],
                isLoading: false,
                event: {statistics: {}},
                routeName: null,
                budgetPerEmployee: 0,
                activeTab : 0,
                eventBlocksList : [
                    {
                        block : 'venue',
                        color : '#641956'
                    },
                    {
                        block : 'Catering',
                        color : '#F3423A'
                    },
                    {
                        block : 'DJ',
                        color : '#FE537A'
                    },
                    {
                        block : 'Transportation',
                        color : '#0FAC4C'
                    },
                    {
                        block : 'Photography',
                        color : '#FFC001'
                    },
                    {
                        block : 'Decoration',
                        color : '#00BFD2'
                    },
                    {
                        block : 'Band',
                        color : '#43536A'
                    },
                    {
                        block : 'Favours & Gifts',
                        color : '#8CB9B4'
                    },
                    {
                        block : 'Unexpected',
                        color : '#24C796'
                    }
                ]
            }
        },
        created () {
            this.routeName = this.$route.name;
        },
        mounted () {
            let _self = this
            this.isLoading = true;

            this.getEvent()
            const tab = this.$route.query.t || 0;
            if (this.$refs.eventPlannerTabs) {
                this.$refs.eventPlannerTabs.$emit('event-planner-nav-switch-panel', tab);
            }

            if (this.components.length === 0) {
                this.$store.dispatch('event/getComponents', this)
                this.$store.dispatch('event/getCategories', {data: this.$auth.user.defaultCalendarId, ctx: this})
                this.$store.dispatch('event/getEventTypes', {data: this.$auth.user.defaultCalendarId, ctx: this})
                this.$store.dispatch('event/getCurrencies', this)
                this.$store.dispatch('event/getEventThemes', this);
            }

            this.$root.$on('calendar-refresh-events',()=>{
                console.log('i am here');
                this.getEvent();
            })
        },
        methods: {
            ...mapMutations('EventPlannerVuex', [
                'setEventModal',
                'setEditMode',
                'setModalSubmitTitle',
                'setEventModalAndEventData',
                'setNumberOfParticipants',
                'setEventData'
            ]),
            getEvent () {
                this.$auth.currentUser(this, true, function () {
                    let _calendar = new Calendar({id: this.$auth.user.defaultCalendarId})

                    _calendar.calendarEvents().find(this.$route.params.id).then(event => {

                        this.event = event
                        this.eventId = event.id
                        this.calendarEvent = event
                        new EventComponent().for(_calendar, event).get().then(components =>{
                            this.event.components = components;
                            this.selectedComponents = components;
                        });

                        console.log(this.calendarEvent);

                        this.getCalendarEventStatistics(event)

                        this.$root.$emit('set-title', this.event, this.routeName === 'EditBuildingBlocks', this.routeName === 'InviteesManagement' || this.routeName === 'EventInvitees')
                        this.isLoading = false;
                        console.log(event);
                    })
                }.bind(this))
            },
            selectServices(){
                this.$refs.eventPlannerTabs.$emit("event-planner-nav-switch-panel", 1);
            },
            selectTimeline(){
                this.$root.$emit("event-planner-nav-switch-panel", 2);
            },
            selectInviteesManagement(){
                this.$root.$emit("event-planner-nav-switch-panel", 3);
            },
            selectEventPage(){
                this.$root.$emit("event-planner-nav-switch-panel", 4);
            },
            selectTab (tab) {
                this.currentTab = tab
            },
            selectedTab (tab) {
                return this.currentTab === tab
            },
            resetTab () {
                this.currentTab = null
            },
            openEventModal () {
                // window.currentPanel = this.$showPanel({
                //     component: EventSidePanel,
                //     cssClass: 'md-layout-item md-size-40 transition36 ',
                //     openOn: 'right',
                //     disableBgClick: true,
                //     props: {
                //         modalSubmitTitle: 'Save',
                //         editMode: true,
                //         sourceEventData: this.event
                //     }
                // })

                this.setEventData(this.event)
                this.setEventModal({showModal: true})
                this.setModalSubmitTitle('Save')
                this.setEditMode({editMode: true})
            },
            refreshEvents () {
                this.getCalendarEvents()
            },
            goToComponent (route) {
                this.$router.push({path: `/events/` + this.event.id + route})
                location.reload()
            },
            getCalendarEventStatistics (evt) {

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
                let event = new CalendarEvent({id: this.event.id})

                new CalendarEventStatistics().for(calendar, event).get()
                    .then(resp => {
                        this.totalRemainingBudget = (evt.budgetPerPerson * evt.numberOfParticipants) - resp[0].totalAllocatedBudget//evt.totalBudget - resp[0].totalAllocatedBudget;
                        this.remainingBudgetPerEmployee = this.totalRemainingBudget / evt.numberOfParticipants//evt.totalBudget - resp[0].totalAllocatedBudget;
                        this.percentage = 100 - ((resp[0].totalAllocatedBudget / (evt.budgetPerPerson * evt.numberOfParticipants)) * 100).toFixed(2)
                        this.seriesData = [20,30,50];

                        console.log('seriesData => ',this.seriesData);
                        this.budgetPerEmployee = evt.budgetPerPerson//this.totalRemainingBudget / evt.numberOfParticipants;
                        this.allocatedBudget = resp.totalAllocatedBudget
                        this.event.statistics['allocatedBudget'] = this.allocatedBudget
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            openUploadModal(){
                this.$refs.uploadModal.toggleModal(true);
            }
        },
        computed: {
            ...mapState('EventPlannerVuex', [
                'eventData',
                'eventModalOpen',
                'modalTitle',
                'modalSubmitTitle',
                'editMode'
            ]),
            ...mapGetters({
                components: 'event/getComponentsList'
            }),
            pieChart () {
                return {
                    data: {
                        labels: [' ', ' ',' '], // should be empty to remove text from chart
                        series: this.seriesData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ]
                    },
                    options: {
                        padding: 0,
                        height: 220,
                        donut: true,
                        donutWidth: 35,
                        animation : true
                    }
                }
            }
        },
        filters: {
            formatDate: function (date) {
                return moment(date).format('MMM Do YYYY ')
            },
            formatTime: function (date) {
                return moment(date).format('h:00 A')
            },
            formatDuration: function (startDate, endDate) {
                return moment(endDate).diff(startDate, 'hours')
            }
        },
        watch: {},
    }
</script>

<style scoped>
    .md-layout, .md-layout-item {
        width: initial;
    }

    .tab-content {
        background-color: transparent !important;
    }
</style>

