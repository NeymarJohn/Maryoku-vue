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
                    Accept Proposal <small></small>
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
                                        <div class="md-title">{{proposal.vendor.vendorDisplayName}}</div>
                                        <div class="star-rating">
                                            <label class="star-rating__star"
                                                   v-for="rating in ratings"
                                                   :class="{'is-selected' : ((proposal.vendor.rank >= rating) && proposal.vendor.rank != null)}"
                                            >
                                                <input class="star-rating star-rating__checkbox" type="radio"
                                                       >★</label>
                                        </div>
                                    </div>
                                    <div class="header-actions">
                                        <md-button class="md-danger" @click="acceptProposal(false)" v-if="proposalAccepted">UNDO ACCEPT THIS PROPOSAL</md-button>
                                        <md-button class="md-primary" @click="acceptProposal(true)" v-if="!proposalAccepted">I ACCEPT THIS PROPOSAL</md-button>
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
                                                            <div class="details-desc">{{selectedBlock.category}}</div>
                                                        </li>
                                                        <li>
                                                            <div class="details-label">Event</div>
                                                            <div class="details-desc">{{event.title}}, {{event.eventEndMillis}}</div>
                                                        </li>
                                                        <li>
                                                            <div class="details-label">Payment Method</div>
                                                            <div class="details-desc">Wiretransfer</div>
                                                        </li>
                                                        <li>
                                                            <div class="details-label">Cancellation Policy</div>
                                                            <div class="details-desc">{{proposal.candellationPolicy}} <md-button class="md-rose md-sm md-simple no-uppercase">(Learn more)</md-button></div>
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
                                                            <div class="cost-value">${{(proposal.cost+ proposal.cost*0.03).toFixed(2)}}</div>
                                                        </div>
                                                    </div>

                                                    <div class="payment-details">
                                                        <ul class="payment-details_list-items" v-if="proposal.costBreakdown" >
                                                            <li v-for="(item,index) in proposal.costBreakdown">
                                                                <div class="details-title">{{ item.service }}</div>
                                                                <div class="details-cost">{{item.cost.toFixed(2)}}</div>
                                                            </li>
                                                            <li>
                                                                <div class="details-title">Upfront payment, service fee and tax (3%)</div>
                                                                <div class="details-cost">${{(proposal.cost*0.03).toFixed(2)}}</div>
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
                                        <md-button class="md-primary">PAY NOW (${{(proposal.cost+ proposal.cost*0.03).toFixed(2)}})</md-button>
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
                                                            <div class="cost-value">${{(proposal.cost).toFixed(2)}}</div>
                                                        </div>
                                                    </div>

                                                    <div class="payment-details">
                                                        <ul class="payment-details_list-items fee-tax-items">
                                                            <li class="fee-tax">
                                                                <div class="details-title">Upfront payment, service fee and tax (3%)</div>
                                                                <div class="details-cost">${{(proposal.cost*0.03).toFixed(2)}}</div>
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
    import EventComponentProposal from '@/models/EventComponentProposal';


    export default {
        components: {
            VueElementLoading,
            Tabs,
            EventBlockRequirements
        },
        props: {
            event: Object,
            selectedBlock : Object,
            proposal : Object,
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
            feedbackRating : 3,
            proposalAccepted : false
        }),

        created() {

        },
        mounted() {
            console.log(this.event);
            console.log(this.selectedBlock);
            console.log(this.proposal);

            EventComponentProposal.find(this.proposal.id)
                .then(resp => {

                    this.proposal.accepted = resp.accepted;
                    console.log('EventComponentProposal => ',resp);
                })
                .catch(error => {
                    console.log(' error here   -->>>  ', error)
                })

            this.proposalAccepted = this.proposal.accepted;

        },
        methods: {

            closePanel(){
                this.$emit("closePanel");
            },
            getDate (eventStartMillis) {
                let x = new Date(eventStartMillis)
                return moment(x).format('MMMM D, YYYY')
            },
            acceptProposal(boolean) {

                console.log(boolean);

                let proposal = new EventComponentProposal({id : this.proposal.id});

                proposal.accepted = boolean;

                this.proposalAccepted = boolean;


                // proposal.aboutUsMessage = this.proposal.aboutUsMessage;
                // proposal.attachements = this.proposal.attachements;
                // proposal.candellationPolicy = this.proposal.candellationPolicy;
                // proposal.cons = this.proposal.cons;
                // proposal.cost = this.proposal.cost;
                // proposal.costBreakdown = this.proposal.costBreakdown;
                // proposal.costPerGuest = this.proposal.costPerGuest;
                // proposal.dateCreated = this.proposal.dateCreated;
                // proposal.extras = this.proposal.extras;
                // proposal.included = this.proposal.included;
                // proposal.lastUpdated = this.proposal.lastUpdated;
                // proposal.missing = this.proposal.missing;
                // proposal.notes  = this.proposal.notes;
                // proposal.percentRequirements = this.proposal.percentRequirements;
                // proposal.personalMessage = this.proposal.personalMessage;
                // proposal.pros = this.proposal.pros;
                // proposal.validUntil = this.proposal.validUntil;
                // proposal.vendor = this.proposal.vendor;
                // proposal.vendorId = this.proposal.vendorId;

                proposal.save().then((resp)=>{
                    console.log(resp);
                }).catch((error)=>{
                    console.log(error);
                })

            }
        },
        computed: {

        }
    };
</script>
