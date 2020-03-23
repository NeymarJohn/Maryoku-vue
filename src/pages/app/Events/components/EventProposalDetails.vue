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

        <template v-if="vendorProposal.vendor">
            <div class="proposal-page_header d-flex justify-content-start">
                <div class="vendor-title"><a href="javascript:void(0)">{{vendorProposal.vendor.vendorDisplayName}}</a> Proposal</div>
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
                                <div class="info-text">{{event.title}}</div>
                            </li>
                            <li class="event-details__item">
                                <label>Date</label>
                                <div class="info-text">{{event.eventStartMillis | formatDate}}</div>
                            </li>
                            <li class="event-details__item">
                                <label>Guest Arrival Time</label>
                                <div class="info-text">{{event.eventStartMillis | formatTime}}</div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="proposal-body">
                    <h1>Dear Rachel, </h1>
                    <p>
                         {{vendorProposal.proposals[0].personalMessage}}
                        <br>
                        <br>
                        Sincerely,
                        <span class="proposal-title">{{vendorProposal.vendor.vendorDisplayName}}</span>
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
                        <template v-if="vendorProposal.proposals[0].included.length">
                            <div class="proposal-includes__item" v-for="(item,index) in vendorProposal.proposals[0].included" :key="index">
                                <img :src="`${menuIconsURL}Group 1014.svg`"> {{item.requirementTitle}}
                            </div>
                        </template>

                    </div>

                </div>

                <div class="proposal-section pricing-section">
                    <div class="proposal-section__title">
                        Pricing <small>*We work only with our catering</small>
                    </div>

                    <table class="pricing-section__table">
                        <tbody>
                        <template v-if="extraMissingRequirements.length">
                            <tr class="element-block" v-for="(item,index) in extraMissingRequirements" :key="index">
                                <td class="element-title">{{item.requirementTitle}}</td>
                                <td class="element-value">${{item.price | withComma}}</td>
                                <td class="view-element"><md-button class="md-just-icon md-rose md-outline"><md-icon>keyboard_arrow_right</md-icon></md-button></td>
                            </tr>
                        </template>
<!--                        <tr class="element-block bundle-offer">-->
<!--                            <td class="element-title">Bundle Offer <span class="discount-percentage">15%</span> <span class="bundle-title">Venue + Catering</span> </td>-->
<!--                            <td class="element-value"><div class="original-price">$1,200.00</div><div class="new-price">$1,100.00</div></td>-->
<!--                            <td class="view-element"></td>-->
<!--                        </tr>-->
                        <tr class="taxes">
                            <td>Taxes <span class="taxes-value">18%</span></td>
                            <td>${{(extraTotal * .18) | withComma}}</td>
                            <td></td>
                        </tr>
                        <tr class="total">
                            <td>Total</td>
                            <td>${{(extraTotal + extraTotal * .18) | withComma}}</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>


                <div class="proposal-section attachments-section">
                    <div class="proposal-section__title">
                        Attachments
                    </div>

                    <ul class="attachments-list_items">
                        <li class="attachments-list_item">
                            <a href="">Kosher_certificate.pdf</a>
                        </li>
                        <li class="attachments-list_item">
                            <a href="">Kosher_certificate.pdf</a>
                        </li>
                        <li class="attachments-list_item">
                            <a href="">Kosher_certificate.pdf</a>
                        </li>
                    </ul>


                </div>

                <div class="proposal-section policy-section">
                    <div class="proposal-section__title">
                        Our Policy
                    </div>

                    <div class="proposal-section__subtitle">
                        <div class="subtitle">Are deposit is:</div>
                        <div class="desc">50% of the total event</div>
                    </div>

                    <div class="side-label">
                        <div class="label-value">Our cancellation approach</div>
                    </div>


                    <div class="proposal-section__subtitle">
                        <div class="subtitle">We allow free cancellation until:</div>
                        <div class="desc">30 days before the event</div>
                    </div>

                    <div class="policies-list">
                        <div class="policies-list__item">
                            <b>If</b> the client cancel the event after 3 weeks before the event
                        </div>
                        <div class="policies-list__item">
                            <b>Than</b> the client will pay full deposit
                        </div>
                        <div class="policies-list__item">
                            <b>If</b> the client cancel the event after two weeks before the event
                        </div>
                        <div class="policies-list__item">
                            <b>Than</b> the client will pay full price
                        </div>
                    </div>

                    <div class="additional-info">
                        <div class="additional-info__title">Additional</div>
                        <div class="additional-info__content">
                            {{vendorProposal.proposals[0].candellationPolicy}}
                        </div>
                    </div>


                    <div class="signature-section">
                        <div class="signature-section__vendor">
                            {{vendorProposal.vendor.vendorDisplayName}}
                        </div>
                        <div class="signature-section__image">
                            <img src="https://bit.ly/3doZIxt">
                        </div>
                    </div>

                </div>

                <div class="proposal-section contact-section">
                    <div class="proposal-section__title">
                        Contact Us
                    </div>

                    <ul class="contact-list_items d-flex justify-content-start">
                        <li class="contact-list_item" v-if="vendorProposal.vendor.vendorMainEmail">
                            <a href=""><img :src="`${menuIconsURL}Group 1014.svg`"> {{vendorProposal.vendor.vendorMainEmail}}</a>
                        </li>
                        <li class="contact-list_item" v-if="vendorProposal.vendor.vendorAddressLine1">
                            <a href=""><img :src="`${menuIconsURL}Group 1014.svg`"> {{vendorProposal.vendor.vendorAddressLine1}} {{vendorProposal.vendor.vendorAddressLine2}}</a>
                        </li>
                        <li class="contact-list_item" v-if="vendorProposal.vendor.vendorMainPhoneNumber">
                            <a href=""><img :src="`${menuIconsURL}Group 1014.svg`"> {{vendorProposal.vendor.vendorMainPhoneNumber}}</a>
                        </li>
                    </ul>
                </div>
            </div>


            <div class="proposal-footer">
                <div class="footer-title">End</div>
                <md-button class="md-rose md-simple back-to-top"> <md-icon>expand_less</md-icon> Back to top </md-button>
            </div>
        </template>


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
    import _ from "underscore";

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
    import EventComponentVendor from '@/models/EventComponentVendor'
    //COMPONENTS

    import SideBar from '../../../../components/SidebarPlugin/NewSideBar';
    import SidebarItem from '../../../../components/SidebarPlugin/NewSidebarItem.vue';
    import ProgressSidebar from './progressSidebar';

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
                isLoading: false,
                event: {
                    statistics: {}
                },
                routeName: null,
                budgetPerEmployee: 0,
                menuIconsURL: 'http://static.maryoku.com/storage/icons/menu%20_%20checklist/SVG/',
                iconsURL : 'http://static.maryoku.com/storage/icons/Event%20Page/',
                vendorProposal : {},
                extraTotal : 0
            }
        },
        created () {

        },
        mounted () {
            let _self = this
            this.isLoading = true;

            this.$auth.currentUser(this, true, function () {
                let _calendar = new Calendar({id: this.$auth.user.defaultCalendarId})

                _calendar.calendarEvents().find(this.$route.params.id).then(event => {
                    this.event = event

                    this.getEvent();


                    console.log(event)
                })
            }.bind(this))




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


                let vm = this;
                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
                let event = new CalendarEvent({id: this.event.id})
                let selected_block = new EventComponent({id: this.$route.params.vendorId})

                new EventComponentVendor().for(calendar, event, selected_block).get()
                    .then(resp => {

                        vm.vendorProposal = _.find(resp,function (vendor) {
                            if ( vendor.proposals[0] && vendor.proposals[0].id === vm.$route.params.proposalId ) {
                                return vendor;
                            }
                        });

                        let extras = _.union(this.vendorProposal.proposals[0].extras, this.vendorProposal.proposals[0].missing);

                        _.each(extras,function(item){
                            vm.extraTotal+=item.price;
                        })

                    })
                    .catch(error => {
                        this.isLoading = false
                        console.log('EventComponentVendor error =>', error)
                    })






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
            },
            extraMissingRequirements () {
                return _.union(this.vendorProposal.proposals[0].extras, this.vendorProposal.proposals[0].missing)
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

