<template>
    <div class="manage-proposals-panel">
        <div class="md-layout" style="max-height: 50vh;">
            <div class="md-layout-item md-size-5" style="padding: 0; margin: 0;">
                <h4 class="md-title">
                    <md-button @click="closePanel" class="md-button md-theme-default md-simple md-just-icon"><md-icon>arrow_back</md-icon></md-button>
                </h4>
            </div>
            <div class="md-layout-item md-size-95" style="max-height: 50vh;">
                <h4 class="md-title" style="margin-bottom: 0; line-height: 51px; text-transform: capitalize;">
                    Manage Proposals - {{selectedBlock.componentCategoryId}}
                </h4>

                <div class="tabs-section">
                    <tabs
                        :tab-name="['<span><i class=\'md-icon md-icon-font md-theme-default\'>check</i></span> Accept', '<span><i class=\'md-icon md-icon-font md-theme-default\'>attach_money</i></span> Pay']"
                        color-button="default"
                        >
                        <template slot="tab-pane-1" style="width: 100%;">

                            <md-card class="text-left acceptance-section">
                                <md-card-header class="acceptance-section-header">
                                    <div class="header-title">
                                        <div class="md-title">Moshe & sons food for events</div>
                                        <div class="star-rating">
                                            <label class="star-rating__star"
                                                   v-for="rating in ratings"
                                                   :class="{'is-selected' : ((feedbackRating >= rating) && feedbackRating != null)}"
                                            >
                                                <input class="star-rating star-rating__checkbox" type="radio"
                                                       v-model="feedbackRating">★</label>
                                        </div>
                                    </div>
                                    <div class="header-actions">
                                        <md-button class="md-primary">I ACCEPT THIS PROPOSAL</md-button>
                                    </div>
                                </md-card-header>
                                <md-card-content>
                                    <div class="md-layout">
                                        <div class="md-layout-item md-size-50">
                                            <md-card class="proposal-message">
                                                <md-card-content class="proposal-payments">
                                                    <ul class="proposal-payments-details">
                                                        <li>
                                                            <div class="details-label">Provided Service</div>
                                                            <div class="details-desc">Catering</div>
                                                        </li>
                                                        <li>
                                                            <div class="details-label">Event</div>
                                                            <div class="details-desc">End of the year party, Sep 19th 2019</div>
                                                        </li>
                                                        <li>
                                                            <div class="details-label">Payment Method</div>
                                                            <div class="details-desc">Wiretransfer</div>
                                                        </li>
                                                        <li>
                                                            <div class="details-label">Cancellation Policy</div>
                                                            <div class="details-desc">Strict <md-button class="md-rose md-sm md-simple no-uppercase">(Learn more)</md-button></div>
                                                        </li>
                                                    </ul>
                                                </md-card-content>
                                            </md-card>
                                        </div>
                                        <div class="md-layout-item md-size-50">
                                            <md-card class="cost-pros-cons-section">
                                                <md-card-content>
                                                    <div class="cost-info">
                                                        <div class="cost-info_desc full-width">
                                                            <div class="cost-label">Subtotal</div>
                                                            <div class="cost-value">$2,000</div>
                                                        </div>
                                                    </div>

                                                    <div class="payment-details">
                                                        <ul class="payment-details_list-items">
                                                            <li>
                                                                <div class="details-title">Now - Upfront payment, service fee and tax (3%)</div>
                                                                <div class="details-cost">$400</div>
                                                            </li>
                                                            <li>
                                                                <div class="details-title">Oct 2nd 2019</div>
                                                                <div class="details-cost">$1600</div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </md-card-content>
                                            </md-card>

                                            <div class="payment-policy">
                                                By accepting the proposal, you agree to its terms and cancellation policy. Not sure what’s included in this proposal? <md-button class="md-rose md-sm md-simple no-uppercase">Learn more</md-button>
                                            </div>

                                        </div>
                                    </div>
                                </md-card-content>
                            </md-card>

                        </template>
                        <template slot="tab-pane-2" style="width: 50%;">
                            <md-card class="text-left acceptance-section bank-account-details">
                                <md-card-header class="acceptance-section-header">
                                    <div class="header-title">
                                        <div class="md-title">Payment</div>
                                    </div>
                                    <div class="header-actions">
                                        <md-button class="md-primary">PAY NOW ($400)</md-button>
                                    </div>
                                </md-card-header>
                                <md-card-content>
                                    <div class="md-layout">
                                        <div class="md-layout-item md-size-100">
                                            <md-card class="cost-pros-cons-section">
                                                <md-card-content>
                                                    <div class="cost-info">
                                                        <div class="cost-info_desc full-width">
                                                            <div class="cost-label">Subtotal</div>
                                                            <div class="cost-value">$2,000</div>
                                                        </div>
                                                    </div>

                                                    <div class="payment-details">
                                                        <ul class="payment-details_list-items fee-tax-items">
                                                            <li class="fee-tax">
                                                                <div class="details-title">Upfront payment, service fee and tax (3%)</div>
                                                                <div class="details-cost">$400</div>
                                                            </li>
                                                        </ul>

                                                        <div class="form-section">
                                                            <div class="md-layout">
                                                                <div class="md-layout-item md-size-100">
                                                                    <h4 class="section-title">Bank Details</h4>
                                                                </div>
                                                                <div class="md-layout-item md-size-50">
                                                                    <md-field>
                                                                        <label>Swift / BIC</label>
                                                                        <md-input   type="text"></md-input>
                                                                    </md-field>
                                                                </div>
                                                                <div class="md-layout-item md-size-50">
                                                                    <md-field>
                                                                        <label>Bank Name</label>
                                                                        <md-input   type="text"></md-input>
                                                                    </md-field>
                                                                </div>
                                                                <div class="md-layout-item md-size-100">
                                                                    <md-field>
                                                                        <label>Address</label>
                                                                        <md-input   type="text"></md-input>
                                                                    </md-field>
                                                                </div>
                                                                <div class="md-layout-item md-size-33">
                                                                    <md-field>
                                                                        <label>City</label>
                                                                        <md-input   type="text"></md-input>
                                                                    </md-field>
                                                                </div>
                                                                <div class="md-layout-item md-size-33">
                                                                    <md-field>
                                                                        <label>State</label>
                                                                        <md-input   type="text"></md-input>
                                                                    </md-field>
                                                                </div>
                                                                <div class="md-layout-item md-size-33">
                                                                    <md-field>
                                                                        <label>Country</label>
                                                                        <md-input   type="text"></md-input>
                                                                    </md-field>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div class="form-section">
                                                            <div class="md-layout">
                                                                <div class="md-layout-item md-size-100">
                                                                    <h4 class="section-title">Your Details</h4>
                                                                </div>
                                                                <div class="md-layout-item md-size-50">
                                                                    <md-field>
                                                                        <label>Landline number</label>
                                                                        <md-input   type="text"></md-input>
                                                                    </md-field>
                                                                </div>
                                                                <div class="md-layout-item md-size-50">
                                                                    <md-field>
                                                                        <label>Mobile number</label>
                                                                        <md-input   type="text"></md-input>
                                                                    </md-field>
                                                                </div>

                                                                <div class="md-layout-item md-size-100">
                                                                    <md-checkbox class="md-info"    >Remember details for future payments</md-checkbox>

                                                                </div>





                                                            </div>
                                                        </div>

                                                    </div>
                                                </md-card-content>
                                            </md-card>

                                            <div class="payment-policy">
                                                By clicking pay now, you agree to pay the total amount shown, which includes tax and service Fee.
                                            </div>

                                        </div>
                                    </div>
                                </md-card-content>
                            </md-card>
                        </template>
                    </tabs>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    // import auth from '@/auth';
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import CalendarEvent from '@/models/CalendarEvent';
    import Calendar from "@/models/Calendar";
    import EventComponent from "@/models/EventComponent";
    import {Tabs} from '@/components'

    import swal from "sweetalert2";
    import {error} from 'util';
    import moment from 'moment';
    import VueElementLoading from 'vue-element-loading';
    import _ from "underscore";
    import ViewProposal from './ViewProposal.vue'
    import EventBlockRequirements from '../Modals/EventBlockRequirements.vue'


    export default {
        components: {
            VueElementLoading,
            Tabs,
            EventBlockRequirements
        },
        props: {
            event: Object,
            vendor : Object,
            selectedBlock : Object,
            winnerId : {
                type : String,
                default : null
            }
        },
        data: () => ({
            // auth: auth,
            isLoaded : false,
            proposalsToDisplay : 1,
            ratings: [1, 2, 3, 4, 5],
            feedbackRating : 3
        }),

        created() {
            console.log(this.selectedBlock.proposals);
        },
        mounted() {

        },
        methods: {

            closePanel(){
                this.$emit("closePanel");
            },
            setAsWining (item) {

              let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
              let event = new CalendarEvent({id: this.event.id})
              let selected_block = new EventComponent({id: this.selectedBlock.id})

              selected_block.calendarEvent = this.selectedBlock.calendarEvent;
              selected_block.componentId = this.selectedBlock.componentId;

              selected_block.winningProposalId = item.id;


              selected_block.for(calendar, event).save().then(resp => {

                this.isLoading = false
                this.$notify(
                  {
                    message: 'Budget modified successfully!',
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                    type: 'success'
                  })

                  this.$bus.$emit('RefreshStatistics');
                  this.$bus.$emit('refreshBuildingBlock');
                    this.closePanel();

                this.$forceUpdate()
              })
                .catch(error => {
                  console.log(error)
                })

            },
            viewAllProposals() {
                this.proposalsToDisplay  = this.selectedBlock.vendors.length;
            },
          getProposalDate(eventStartMillis) {

            let x = new Date(eventStartMillis);

            return x.getDate() + '-' + x.getMonth() + '-' + x.getFullYear();

          },
            isThereProposals() {
                return this.selectedBlock.proposals && this.selectedBlock.proposals.length;
            },
            viewProposal(proposal) {
                window.currentPanel = this.$showPanel({
                    component: ViewProposal,
                    cssClass: 'md-layout-item md-size-70 transition36',
                    openOn: 'right',
                    props: {event: this.event, proposal: proposal}
                })
            }
        },
        computed: {

        }
    };
</script>
