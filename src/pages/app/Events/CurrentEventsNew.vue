<template>
    <div class="edit-event-details">
        <side-bar :event="calendarEvent">
        </side-bar>
        <!-- Event Header -->
        <div class="event-header d-flex justify-content-between">
            <div class="header-title">
                <h3><img src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2010.svg" width="15">
                    Budget</h3>
            </div>
            <div class="header-actions">
                <ul>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 9.svg`"></a></li>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 5.svg`"></a></li>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 8.svg`"></a></li>
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
                            <div class="budget-value">${{calendarEvent.totalBudget | withComma}}</div>
                            <md-button class="md-rose md-simple md-sm edit-budget" @click="showBudgetModal = true">Edit</md-button>
                        </div>
                        <div class="budget-list__item">
                            <div class="label-title">Used</div>
                            <div class="budget-value">${{calendarEvent.totalBudget - totalRemainingBudget | withComma}}</div>
                            <div class="percent">{{ (( calendarEvent.totalBudget - totalRemainingBudget ) * 100 / calendarEvent.totalBudget).toFixed(1)}}  %</div>
                        </div>
                        <div class="budget-list__item">
                            <div class="label-title">Remaining</div>
                            <div class="budget-value">${{totalRemainingBudget | withComma}}</div>
                            <div class="percent">{{ ((totalRemainingBudget * 100) / calendarEvent.totalBudget).toFixed(1) }}%</div>
                        </div>
                    </div>
                </div>
                <div class="card-section saved-budget text-center">
                    So far you saved : <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+25.png"
                                            width="15"> <b>$100</b>
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
                        <pie-chart-round
                            :event.sync="event"
                            :items="selectedComponents">
                        </pie-chart-round>
                    </div>
                </div>
            </div>
            <div class="md-layout-item  md-size-60" style="padding-right: 30px;">
                <div class="event-blocks-table">
                    <tabs
                        :tab-name="['<img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+26.png\'> Total', ' <img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+28.png\'> Per Guest']"
                    >
                        <!-- here you can add your content for tab-content -->
                        <template slot="tab-pane-1">
                            <new-event-building-blocks :event.sync="event" :event-components="selectedComponents"
                                                       type="total"></new-event-building-blocks>
                        </template>
                        <template slot="tab-pane-2">
                            <new-event-building-blocks :event.sync="event" :event-components="selectedComponents"
                                                       type="perGuest"></new-event-building-blocks>
                        </template>
                    </tabs>
                </div>
            </div>
        </div>
        <upload-vendors-modal ref="uploadModal"></upload-vendors-modal>



        <modal v-if="showBudgetModal"  class="add-category-model">
            <template slot="header">
                <div class="add-category-model__header">
                    <h2 class="black">  What is your new budget?</h2>
                    <div class="header-description">  <img :src="`${iconsURL}Asset 150.svg`" width="20"> Increasing your budget to $ {{calendarEvent.totalBudget | withComma}} or more will allow you to get a videographer</div>
                </div>
                <md-button class="md-simple md-just-icon md-round modal-default-button" @click="showBudgetModal = false">
                    <md-icon>clear</md-icon>
                </md-button>
            </template>
            <template slot="body">
                <div class="md-layout justify-content-center">

                    <div class="md-layout-item md-size-60 margin-bottom justify-content-center">
                        <div class="form-group with-icon budget-field">
                            <div class="input-icon">
                                <img :src="`${iconsURL}Group 3090.svg`" width="20">
                            </div>
                            <input type="text" class="form-control"  v-model="newBudget">
                        </div>

                        <div class="label-item label-success text-center" v-if="newBudget && newBudget > calendarEvent.totalBudget">
                            <h4>
                                Fantastic!
                            </h4>
                            <p>
                                This budget is {{ 100 - parseInt( calendarEvent.totalBudget * 100 / newBudget)  }}% higher than average, your event is going to be wild!

                            </p>
                        </div>

                        <div class="label-item label-warning text-center" v-if="newBudget && newBudget < calendarEvent.totalBudget">
                            <p>
                                <img :src="`${iconsURL}Group 1175.svg`" width="20"> This budget is {{ 100 - parseInt( newBudget * 100 / calendarEvent.totalBudget)  }}% lower than average for this type of event
                            </p>
                        </div>
                    </div>
                </div>

            </template>
            <template slot="footer">
                <md-button class="md-default md-simple cancel-btn" @click="showBudgetModal = false">
                    Cancel
                </md-button>
                <md-button class="md-rose add-category-btn " :class="{ 'disabled' : !newBudget }" @click="updateBudget">
                    Save
                </md-button>
            </template>
        </modal>

        <modal v-if="budgetConfirmationModal"  class="add-category-model">
            <template slot="header">
                <div class="add-category-model__header">
                    <h2 class="black">  Are you sure?</h2>
                    <div class="header-description">  <img :src="`${iconsURL}Asset 150.svg`" width="20"> Decreasing your budget may cause program changes</div>
                </div>
                <md-button class="md-simple md-just-icon md-round modal-default-button" @click="budgetConfirmationModal = false">
                    <md-icon>clear</md-icon>
                </md-button>
            </template>
            <template slot="body">

            </template>
            <template slot="footer">
                <md-button class="md-rose md-outline md-simple cancel-btn" @click="budgetConfirmationModal = false">
                    Yes I’m sure
                </md-button>
                <md-button class="md-rose add-category-btn " :class="{ 'disabled' : !newBudget }" @click="updateBudget">
                    No, take me back
                </md-button>
            </template>
        </modal>


        <modal v-if="editBudgetElementsModal"  class="add-category-model edit-elements-budget-modal">
            <template slot="header">
                <div class="add-category-model__header">
                    <h2 class="black">  Edit budget per category</h2>
                </div>
                <md-button class="md-simple md-just-icon md-round modal-default-button" @click="editBudgetElementsModal = false">
                    <md-icon>clear</md-icon>
                </md-button>
            </template>
            <template slot="body">
                <div class="event-blocks-table edit-elements-budget-table">
                    <tabs
                        :tab-name="['<img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+26.png\'> Total', ' <img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+28.png\'> Per Guest']"
                    >
                        <!-- here you can add your content for tab-content -->
                        <template slot="tab-pane-1">
                            <edit-event-blocks-budget :event.sync="event" :event-components="selectedComponents"
                                                       type="total"></edit-event-blocks-budget>
                        </template>
                        <template slot="tab-pane-2">
                            <edit-event-blocks-budget :event.sync="event" :event-components="selectedComponents"
                                                       type="perGuest"></edit-event-blocks-budget>
                        </template>
                    </tabs>
                </div>

            </template>
            <template slot="footer">
                <md-button class="md-default md-simple cancel-btn" @click="editBudgetElementsModal = false">
                    Cancel
                </md-button>
                <md-button class="md-rose add-category-btn " @click="updateBudget">
                    Save
                </md-button>
            </template>
        </modal>


    </div>
</template>

<script>
    import EventModal from './EventModal/'
    import EventPlannerVuexModule from './EventPlanner.vuex'

    //MAIN MODULES
    import ChartComponent from '@/components/Cards/ChartComponent'

    import {
        ChartCard
    } from '@/components'

    // import auth from '@/auth';
    import moment from 'moment'
    import VueElementLoading from 'vue-element-loading'
    import Calendar from '@/models/Calendar'
    import CalendarEvent from '@/models/CalendarEvent'
    import CalendarEventStatistics from '@/models/CalendarEventStatistics'
    import EventComponent from '@/models/EventComponent'
    import {
        mapState,
        mapMutations,
        mapGetters,
        mapActions
    } from 'vuex'

    import {
        Tabs,
        Modal
    } from '@/components'
    import NewEventBuildingBlocks from './components/NewEventBuildingBlocks';
    import EditEventBlocksBudget from './components/EditEventBlocksBudget';

    //COMPONENTS
    import UploadVendorsModal from '../Vendors/ImportVendors'

    import SideBar from '../../../components/SidebarPlugin/NewSideBar'
    import SidebarItem from '../../../components/SidebarPlugin/NewSidebarItem.vue'
    import PieChartRound from './components/PieChartRound.vue'

    export default {
        components: {
            Tabs,
            NewEventBuildingBlocks,
            ChartComponent,
            ChartCard,
            UploadVendorsModal,
            SideBar,
            SidebarItem,
            PieChartRound,
            Modal,
            EditEventBlocksBudget
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
                usedBudget : 0,
                remainingBudgetPerEmployee: 0,
                seriesData: [],
                isLoading: false,
                event: {
                    statistics: {}
                },
                routeName: null,
                budgetPerEmployee: 0,
                activeTab: 0,
                totalBudget: 0,
                menuIconsURL: 'http://static.maryoku.com/storage/icons/menu%20_%20checklist/SVG/',
                iconsURL : 'http://static.maryoku.com/storage/icons/Event%20Page/',
                showBudgetModal : false,
                budgetConfirmationModal : false,
                newBudget : null,
                editBudgetElementsModal : false
            }
        },
        created () {
            this.routeName = this.$route.name
        },
        mounted () {
            let _self = this
            this.isLoading = true

            this.getEvent()
            const tab = this.$route.query.t || 0
            if (this.$refs.eventPlannerTabs) {
                this.$refs.eventPlannerTabs.$emit('event-planner-nav-switch-panel', tab)
            }

            if (this.components.length === 0) {
                this.$store.dispatch('event/getComponents', this)
                this.$store.dispatch('event/getCategories', {
                    data: this.$auth.user.defaultCalendarId,
                    ctx: this
                })
                this.$store.dispatch('event/getEventTypes', {
                    data: this.$auth.user.defaultCalendarId,
                    ctx: this
                })
                this.$store.dispatch('event/getCurrencies', this)
                this.$store.dispatch('event/getEventThemes', this)
            }

            this.$root.$on('calendar-refresh-events', () => {
                console.log('i am here')
                this.getEvent()
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
                    let _calendar = new Calendar({
                        id: this.$auth.user.defaultCalendarId
                    })

                    _calendar.calendarEvents().find(this.$route.params.id).then(event => {

                        this.event = event
                        this.eventId = event.id
                        this.calendarEvent = event
                        new EventComponent().for(_calendar, event).get().then(components => {
                            this.event.components = components
                            this.selectedComponents = components
                            this.seriesData = components
                        })
                        this.getCalendarEventStatistics(event)

                        this.$root.$emit('set-title', this.event, this.routeName === 'EditBuildingBlocks', this.routeName === 'InviteesManagement' || this.routeName === 'EventInvitees')
                        this.isLoading = false
                        console.log(event)
                    })
                }.bind(this))
            },
            selectServices () {
                this.$refs.eventPlannerTabs.$emit('event-planner-nav-switch-panel', 1)
            },
            selectTimeline () {
                this.$root.$emit('event-planner-nav-switch-panel', 2)
            },
            selectInviteesManagement () {
                this.$root.$emit('event-planner-nav-switch-panel', 3)
            },
            selectEventPage () {
                this.$root.$emit('event-planner-nav-switch-panel', 4)
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
                this.setEventModal({
                    showModal: true
                })
                this.setModalSubmitTitle('Save')
                this.setEditMode({
                    editMode: true
                })
            },
            refreshEvents () {
                this.getCalendarEvents()
            },
            goToComponent (route) {
                this.$router.push({
                    path: `/events/` + this.event.id + route
                })
                location.reload()
            },
            getCalendarEventStatistics (evt) {
                let calendar = new Calendar({
                    id: this.$auth.user.defaultCalendarId
                })
                let event = new CalendarEvent({
                    id: this.event.id
                })

                new CalendarEventStatistics().for(calendar, event).get()
                    .then(resp => {
                        this.totalRemainingBudget = (evt.budgetPerPerson * evt.numberOfParticipants) - resp[0].totalAllocatedBudget //evt.totalBudget - resp[0].totalAllocatedBudget;
                        this.remainingBudgetPerEmployee = this.totalRemainingBudget / evt.numberOfParticipants //evt.totalBudget - resp[0].totalAllocatedBudget;
                        this.percentage = 100 - ((resp[0].totalAllocatedBudget / (evt.budgetPerPerson * evt.numberOfParticipants)) * 100).toFixed(2)

                        this.budgetPerEmployee = evt.budgetPerPerson //this.totalRemainingBudget / evt.numberOfParticipants;
                        this.allocatedBudget = resp.totalAllocatedBudget
                        this.event.statistics['allocatedBudget'] = this.allocatedBudget
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            openUploadModal () {
                this.$refs.uploadModal.toggleModal(true)
            },
            updateBudget () {



                let _calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                let editedEvent = new CalendarEvent({id: this.event.id});

                editedEvent = this.event;
                editedEvent.totalBudget = this.newBudget;

                console.log(editedEvent);

                editedEvent.for(_calendar).save().then(response => {

                    this.showBudgetModal = false;
                    this.getCalendarEventStatistics();


                })
                    .catch((error) => {
                        console.log(error);

                    });



                if (this.newBudget < this.calendarEvent.totalBudget) {

                } else {

                }
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
                        labels: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], // should be empty to remove text from chart
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
                        donutWidth: 45,
                        animation: true
                    }
                }
            },
            categoryItems () {
                return {
                    data: this.seriesData
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
            },
            withComma (amount) {
                return amount ? amount.toLocaleString() : 0
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

