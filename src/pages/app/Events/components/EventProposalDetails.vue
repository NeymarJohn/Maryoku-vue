<template>
    <div class="proposal-page_details">
        <side-bar :event="calendarEvent">
        </side-bar>
        <!-- Event Header -->
        <div class="event-page-header with-bg d-flex justify-content-between">
            <div class="header-main-actions">
                <md-button class="md-default md-simple">back</md-button>
                <md-button class="md-rose">Request Proposal</md-button>

            </div>
            <div class="header-actions">
                <ul>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 9.svg`"></a></li>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 5.svg`"></a></li>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 8.svg`"></a></li>
                </ul>
            </div>
        </div>

        <div class="proposal-page_header d-flex justify-content-start">
            <div class="vendor-title"><a href="javascript:void(0)">Relish Caterers & Venues</a> Proposal</div>
        </div>
        <div class="proposal-content">
            <div class="proposal-header" style="background : url('https://bit.ly/392ygCu') center center no-repeat;">
                <div class="event-info">
                    <div class="section-header d-flex justify-content-start">
                        <h3>Event Information & Details</h3> <div class="alert alert-danger"> This proposal is 2 days before your original date </div>
                    </div>
                    <ul class="event-details">
                        <li class="event-details__item">
                            <label>Name</label>
                            <div class="info-text">March Madness event</div>
                        </li>
                        <li class="event-details__item">
                            <label>Date</label>
                            <div class="info-text">December 25,2019</div>
                        </li>
                        <li class="event-details__item">
                            <label>Guest Arrival Time</label>
                            <div class="info-text">11:00 AM</div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="proposal-body">
                <h1>Dear Rachel, </h1>
                <p>
                     Relish caterers & venues is pleased to provide you with the attached catering proposal for your , which is currently scheduled to be held
                    on  at . We understand that this is a very important occasion and we  are committed to giving our utmost attention to make this a very
                    memorable and stress free day. Thank you for the opportunity to provide you with this catering proposal. We very much look forward to  the
                    opportunity to work with you and to make this occasion a momentous one.
                    <br>
                    <br>
                    Sincerely,
                    <span class="proposal-title">Relish caterers & venues</span>
                </p>

                <md-button class="md-rose md-raised md-outline"> More About Us </md-button>



                <carousel :items="3" :margin="25" :dots="false" :nav="false" class="proposal-images">

                    <template slot="prev"><span class="prev"> <md-icon>keyboard_arrow_left</md-icon> </span></template>

                    <div class="item" style="background: url('https://placeimg.com/200/200/any?1') center center no-repeat; ">

                    </div>
                    <div class="item" style="background: url('https://placeimg.com/200/200/any?2') center center no-repeat; ">

                    </div>
                    <div class="item" style="background: url('https://placeimg.com/200/200/any?3') center center no-repeat; ">

                    </div>
                    <div class="item" style="background: url('https://placeimg.com/200/200/any?4') center center no-repeat; ">

                    </div>

                    <template slot="next"><span class="next"> <md-icon>keyboard_arrow_right</md-icon> </span></template>

                </carousel>



                <div class="proposal-includes">

                    <div class="proposal-includes__title">
                        What Do We Include In This Proposal?
                    </div>
                    <div class="proposal-includes__item">
                        <img :src="`${menuIconsURL}Group 1014.svg`"> Set up
                    </div>
                    <div class="proposal-includes__item">
                        <img :src="`${menuIconsURL}Group 1014.svg`"> Set up
                    </div>
                    <div class="proposal-includes__item">
                        <img :src="`${menuIconsURL}Group 1014.svg`"> Set up
                    </div>
                    <div class="proposal-includes__item">
                        <img :src="`${menuIconsURL}Group 1014.svg`"> Set up
                    </div>
                    <div class="proposal-includes__item">
                        <img :src="`${menuIconsURL}Group 1014.svg`"> Set up
                    </div>
                    <div class="proposal-includes__item">
                        <img :src="`${menuIconsURL}Group 1014.svg`"> Set up
                    </div>
                </div>

            </div>

            <div class="proposal-section pricing-section">
                <div class="proposal-section__title">
                    Pricing
                </div>

                <table class="pricing-section__table">
                    <tbody>
                    <tr class="element-block">
                        <td class="element-title">Venue</td>
                        <td class="element-value">$400.00</td>
                        <td class="view-element"><md-button class="md-just-icon md-rose md-outline"><md-icon>keyboard_arrow_right</md-icon></md-button></td>
                    </tr>
                    <tr class="element-block">
                        <td class="element-title">Venue</td>
                        <td class="element-value">$400.00</td>
                        <td class="view-element"><md-button class="md-just-icon md-rose md-outline"><md-icon>keyboard_arrow_right</md-icon></md-button></td>
                    </tr>
                    <tr class="taxes">
                        <td>Taxes <span class="taxes-value">18%</span></td>
                        <td>$200.00</td>
                        <td></td>
                    </tr>
                    <tr class="total">
                        <td>Total</td>
                        <td>$1,600.00</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>


            <div class="proposal-section pricing-section">
                <div class="proposal-section__title">
                    Attachments
                </div>

                <ul class="attachments-list_items">
                    <li class="attachments-list_item">
                        <a href=""></a>
                    </li>
                </ul>


            </div>


        </div>


    </div>
</template>

<script>

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
    import ProposalRequest from '@/models/ProposalRequest';
    import Vendors from '@/models/Vendors';

    import carousel from 'vue-owl-carousel'


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

    import NewEventBuildingBlocks from './NewEventBuildingBlocks';
    import EditEventBlocksBudget from './EditEventBlocksBudget';

    //COMPONENTS

    import SideBar from '../../../../components/SidebarPlugin/NewSideBar';
    import SidebarItem from '../../../../components/SidebarPlugin/NewSidebarItem.vue';
    import ProgressSidebar from './progressSidebar';
    import _ from 'underscore'

    export default {
        components: {
            Tabs,
            NewEventBuildingBlocks,
            ChartComponent,
            ChartCard,
            SideBar,
            SidebarItem,
            Modal,
            EditEventBlocksBudget,
            carousel
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

        },
        mounted () {
            let _self = this
            this.isLoading = true;

            this.getEvent();

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
                    let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                    let event = new CalendarEvent({id: this.$route.params.id});

                    console.log(this.$auth.user.defaultCalendarId);

                    new EventComponent().for(calendar, event).get().then(resp =>{
                        // this.selectedBlock = _.findWhere(resp,{ proposals[0].id : this.$route.params.proposalId});

                        // _.each(resp,function (vendor) {
                        //     console.log(vendor);
                        //
                        // })


                    })
                }.bind(this))



                // ProposalRequest.find(this.$route.params.proposalId)
                //     .then(resp => {
                //         console.log('ProposalRequest', resp)
                //
                //         // this.$set(this, 'proposalRequest', resp)
                //         //
                //         // if (!this.gotProposals) {
                //         //     this.getProposals(resp.vendorId)
                //         //     this.gotProposals = true
                //         // } else {
                //         //     this.isLoading = false
                //         // }
                //         //
                //         // this.proposalRequestRequirements = _.chain(resp.requirements)
                //         //     .groupBy('requirementPriority')
                //         //     .map(function (value, key) {
                //         //         return {
                //         //             title: key,
                //         //             requirements: value
                //         //         }
                //         //     })
                //         //     .value()
                //     })
                //     .catch(error => {
                //         console.log(' error here   -->>>  ', error)
                //     })
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

