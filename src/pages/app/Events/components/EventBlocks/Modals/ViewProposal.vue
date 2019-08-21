<template>
    <div class="manage-proposals-panel">
        <div class="md-layout" style="max-height: 50vh;" v-if="vendorProposal && vendorInfo">
            <div class="md-layout-item md-size-5" style="padding: 0; margin: 0;">
                <h4 class="md-title">
                    <md-button @click="closePanel" class="md-button md-theme-default md-simple md-just-icon">
                        <md-icon>arrow_back</md-icon>
                    </md-button>
                </h4>
            </div>
            <div class="md-layout-item md-size-95" style="max-height: 50vh;">

                <div class="title-section">
                    <h4 class="md-title" style="margin-bottom: 0; line-height: 51px; text-transform: capitalize;">
                        {{vendorInfo.vendorDisplayName}}
                    </h4>
                    <div class="star-rating">
                        <label class="star-rating__star"
                               v-for="rating in ratings"
                               :class="{'is-selected' : ((vendorInfo.rank >= rating) && vendorInfo.rank != null)}"
                        >
                            <input class="star-rating star-rating__checkbox" type="radio"
                                    >★</label>
                    </div>

                    <div class="actions-list">
                        <md-button class="md-rose md-sm md-simple no-uppercase">
                            <md-icon>compare</md-icon> Add to compare
                        </md-button>
                        <md-button class="md-rose md-sm bold no-uppercase" @click="manageProposalsAccept(proposal)">
                            Accept proposal
                        </md-button>
                    </div>
                </div>

            </div>

            <div class="md-layout">
                <div class="md-layout-item md-size-5"></div>

                <div class="md-layout-item md-size-50">
                    <md-card class="proposal-message">
                        <md-card-content>
                            <p v-html="vendorProposal.personalMessage">
                                <!-- Personal Message -->
                            </p>
                            <div class="signature" style="display: none;">
                                Thanks,
                                <br>
                                {{vendorInfo.vendorDisplayName}}
                            </div>
                            <div class="attachments-list">
                                <h6>Attachments</h6>
                                <ul class="attachments-list_items">
                                    <li v-for="(item,index) in vendorProposal.attachements" :key="index">
                                        <a target="_blank" :href="`${serverUrl}/1/proposal-requests/${proposal.id}/files/${item}`"> <md-icon>attach_file</md-icon> Attachment {{index+1}} </a>
                                    </li>
                                </ul>
                            </div>
                        </md-card-content>

                    </md-card>
                </div>
                <div class="md-layout-item md-size-45">
                    <md-card class="cost-pros-cons-section">
                        <md-card-content>
                            <div class="cost-info">
                                <div class="cost-info_desc">
                                    <div class="cost-label">Cost per guest</div>
                                    <div class="cost-value">${{vendorProposal.costPerGuest}}</div>
                                </div>
                                <div class="cost-info_desc">
                                    <div class="cost-label">Subtotal</div>
                                    <div class="cost-value">${{vendorProposal.cost}}</div>
                                </div>
                            </div>

                            <div class="proposal-pros-cons">
                                <div class="section-content pros-section">
                                    <md-icon class="thumb-up">thumb_up_alt</md-icon>
                                    <ul class="list-items">
                                        <li v-for="(item,index) in vendorProposal.pros" :key="index">{{item}}</li>
                                    </ul>
                                </div>
                                <div class="section-content cons-section">
                                    <md-icon class="thumb-down">thumb_down_alt</md-icon>
                                    <ul class="list-items">
                                        <li v-for="(item,index) in vendorProposal.cons" :key="index">{{item}}</li>

                                    </ul>
                                </div>
                            </div>

                            <div class="need-help-section text-center">
                                <h6>Need help or modifications?</h6>
                                <md-button class="md-rose md-simple md-sm no-uppercase" @click="tooltipActive = !tooltipActive">
                                    Contact {{vendorInfo.contactPerson ? vendorInfo.contactPerson : vendorInfo.vendorDisplayName}}
                                </md-button>
                                <md-tooltip :md-active.sync="tooltipActive">{{vendorInfo.vendorMainEmail}} </md-tooltip>
                            </div>
                        </md-card-content>
                    </md-card>

                </div>


                <div class="md-layout-item md-size-5"></div>
                <div class="md-layout-item md-size-95">
                    <div class="section-title">
                        <h3>Included</h3>
                    </div>
                    <ul class="included-list">
                        <li v-for="(item,index) in vendorProposal.included" :key="index" v-if="item.requirementTitle">
                            <md-icon>check</md-icon> {{item.requirementTitle}}
                        </li>
                    </ul>
                </div>

                <template v-if="extraMissingRequirements.length">
                    <div class="md-layout-item md-size-5"></div>
                    <div class="md-layout-item md-size-95">
                        <div class="section-title">
                            <h3>Waiting for your approval ({{extraMissingRequirements.length}})</h3>
                        </div>
                        <ul class="proposals-waiting-approval">
                            <li v-for="(item,index) in extraMissingRequirements" :key="index">
                                <div class="proposal-info">
                                    <div class="proposal-title">{{item.requirementValue}}x {{item.requirementTitle}} <small style="display: none;">(Suggested by vendor)</small></div>
                                    <div class="proposal-desc" v-for="(comment,index) in item.comments" :key="index">{{comment.commentText}} <md-button v-if="comment.commentText.length > 300" class="md-primary md-simple md-sm read-more no-uppercase">Read more</md-button></div>
                                </div>
                                <div class="proposal-actions">
                                    <md-button v-if="!item.itemNotAvailable" class="md-rose">Add (${{item.price}})</md-button>
                                    <md-button v-else class="md-success">Got it</md-button>

                                </div>
                            </li>
                        </ul>
                    </div>
                </template>

                <div class="md-layout-item md-size-5"></div>
                <div class="md-layout-item md-size-95 cost-breakdown-notes">
                    <div class="section-title">
                        <h3>Cost Breakdown</h3>
                    </div>
                    <div class="cost-breakdown-notes-sections">
                        <div class="section-content cost-breakdown-section">
                            <div class="section-content">
                                <md-table v-model="vendorProposal.costBreakdown" class="table-plaint">
                                    <md-table-row slot="md-table-row" slot-scope="{ item }"  :class="{disabled : item.perGuest == 'N/A'}" >
                                        <md-table-cell md-label="Service" style="text-transform: capitalize;">{{ item.service }}</md-table-cell>
                                        <md-table-cell md-label="Per guest">
                                            <template v-if="item.perGuest == 'N/A'">{{item.perGuest}}</template>
                                            <template v-else>${{ item.perGuest }}</template>
                                        </md-table-cell>
                                        <md-table-cell class="cost-cell" md-label="Cost" :class="getAlignClasses(item)">${{ item.cost }}</md-table-cell>
                                    </md-table-row>
                                </md-table>
                                <div class="table table-stats table-striped">
                                    <div class="td-price">
                                        <div class="td-total">
                                            Subtotal
                                        </div>
                                        <span class="td-value">
                                        ${{vendorProposal.cost}}
                                    </span>
                                    </div>
                                    <div class="td-price">
                                        <div class="td-total">
                                            Tax (3%)
                                        </div>
                                        <span class="td-value">
                                        ${{vendorProposal.cost*0.03}}
                                    </span>
                                    </div>
                                    <div class="td-price bold">
                                        <div class="td-total">
                                            Total
                                        </div>
                                        <span class="td-value">
                                        ${{vendorProposal.cost + vendorProposal.cost*0.03}}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section-content notes-section">
                            <div>
                                <h4>Notes</h4>
                                <p v-for="(note,index) in vendorProposal.notes">
                                    {{note}}
                                </p>
                            </div>

                            <p class="danger-label">
                                This offer is valid till {{getDate(vendorProposal.validUntil)}}.

                            </p>
                        </div>
                    </div>

                </div>

                <div class="md-layout-item md-size-5"></div>

                <div class="md-layout-item md-size-95 gallery-section">
                    <div class="section-title">
                        <h3>Why Us?</h3>
                    </div>

                    <md-button class="md-default view-images no-uppercase" @click="view()">View Images</md-button>

                    <ul class="images-list">
                        <li class="image-item" v-for="(item,index) in vendorProposal.attachements" :key="index">
                            <div :style="`width : 320px; height : 320px; background : url(${serverUrl}/1/proposal-requests/${proposal.id}/files/${item}) center center no-repeat ; background-size : cover;`"></div>
                        </li>
                    </ul>

                    <LightBox  v-if="viewImages" :images="images"></LightBox>

                </div>

                <div class="md-layout-item md-size-5" style="display: none;"></div>

                <div class="md-layout-item md-size-95 feedback-section " style="display: none;">
                    <div class="section-title">
                        <h5>Feedback</h5>
                        <div class="review-count">(2)</div>
                    </div>

                    <ul class="feedback-list-items">
                        <li class="feedback-item">
                            <div class="item-thumbnail">
                                J
                            </div>
                            <div class="item-info">
                                <div class="item-name">
                                    <h5>Jane Bloom, Facebook</h5>
                                    <div class="star-rating">
                                        <label class="star-rating__star"
                                               v-for="rating in ratings"
                                               :class="{'is-selected' : ((feedbackRating >= rating) && feedbackRating != null)}"
                                        >
                                            <input class="star-rating star-rating__checkbox" type="radio"
                                                   v-model="feedbackRating">★</label>
                                    </div>
                                </div>
                                <div class="item-body">
                                    <p>
                                        A 50% deposit will be due on or before 18/1/20. The remaining balance will be collected a week prior to the event. We accept all major credit cards and checks.
                                    </p>
                                    <p>
                                        The estimated amount above is not a fixed amount and is subject to change based on actual charges and final guest counts and any additional charges approved by the Client.
                                    </p>
                                </div>
                                <div class="date">
                                    Dec 29, 2017
                                </div>
                            </div>
                        </li>
                        <li class="feedback-item">
                            <div class="item-thumbnail">
                                J
                            </div>
                            <div class="item-info">
                                <div class="item-name">
                                    <h5>Jane Bloom, Facebook</h5>
                                    <div class="star-rating">
                                        <label class="star-rating__star"
                                               v-for="rating in ratings"
                                               :class="{'is-selected' : ((feedbackRating >= rating) && feedbackRating != null)}"
                                        >
                                            <input class="star-rating star-rating__checkbox" type="radio"
                                                   v-model="feedbackRating">★</label>
                                    </div>
                                </div>
                                <div class="item-body">
                                    <p>
                                        A 50% deposit will be due on or before 18/1/20. The remaining balance will be collected a week prior to the event. We accept all major credit cards and checks.
                                    </p>
                                    <p>
                                        The estimated amount above is not a fixed amount and is subject to change based on actual charges and final guest counts and any additional charges approved by the Client.
                                    </p>
                                </div>
                                <div class="date">
                                    Dec 29, 2017
                                </div>
                            </div>
                        </li>
                    </ul>

                    <md-button class="md-rose md-sm md-simple"> show more <md-icon>add</md-icon></md-button>
                </div>

                <div class="md-layout-item md-size-5" ></div>
                <div class="md-layout-item md-size-95">
                    <ul class="proposal-summary">
                        <li style="display: none;">
                            <div class="proposal-info">
                                <div class="proposal-title">Payment & cost <span><md-icon>attach_money</md-icon> Net +30</span></div>
                                <div class="proposal-desc">A 50% deposit will be due on or before 18/1/20. The remaining balance will be collected a week prior to the.. <md-button class="md-primary md-simple md-sm read-more no-uppercase">Read more</md-button></div>
                            </div>
                        </li>

                        <li style="display: none;">
                            <div class="proposal-info">
                                <div class="proposal-title">Payment & cost <span><md-icon>attach_money</md-icon> Net +30</span></div>
                                <div class="proposal-desc">A 50% deposit will be due on or before 18/1/20. The remaining balance will be collected a week prior to the.. <md-button class="md-primary md-simple md-sm read-more no-uppercase">Read more</md-button></div>
                            </div>
                        </li>

                        <li>
                            <div class="proposal-info about-us">
                                <div class="proposal-title">About us</div>
                                <div class="proposal-desc">{{vendorProposal.aboutUsMessage}}</div>
                            </div>
                            <div class="attachments-list" style="display: none;">
                                <ul class="attachments-list_items">
                                    <li><a href=""> <md-icon>attach_file</md-icon> Insurance certificate </a></li>
                                    <li><a href=""> <md-icon>attach_file</md-icon> Other business indication </a></li>
                                </ul>
                            </div>
                        </li>

                    </ul>
                </div>

            </div>

        </div>

    </div>
</template>
<script>
    // import auth from '@/auth';
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    import CalendarEvent from '@/models/CalendarEvent'
    import Calendar from '@/models/Calendar'
    import EventComponent from '@/models/EventComponent'

    import swal from 'sweetalert2'
    import {error} from 'util'
    import moment from 'moment'
    import VueElementLoading from 'vue-element-loading'
    import _ from 'underscore';

    import LightBox from 'vue-image-lightbox';
    import ManageProposalsAccept from '../Modals/ManageProposalsAccept.vue';
    import ProposalRequest from '@/models/ProposalRequest';
    import EventComponentProposal from '@/models/EventComponentProposal';


    export default {
        components: {
            VueElementLoading,LightBox, ManageProposalsAccept
        },
        props: {
            event: Object,
            proposal: Object,
            selectedBlock : Object
        },
        data: () => ({
            // auth: auth,
            isLoaded: false,
            ratings: [1, 2, 3, 4, 5],
            images : [],
            viewImages : false,
            feedbackRating : 3,
            vendorProposal : null,
            vendorInfo : null,
            serverUrl: process.env.SERVER_URL,
            tooltipActive: false,

        }),
        created () {
            console.log(this.proposal);

            this.$set(this,'vendorProposal',this.proposal)
            this.$set(this,'vendorInfo',this.proposal.vendor);
        },
        mounted () {

        },
        methods: {

            closePanel () {
                this.$emit('closePanel')
            },
            getProposalDate (eventStartMillis) {

                let x = new Date(eventStartMillis)

                return x.getDate() + '-' + x.getMonth() + '-' + x.getFullYear()

            },
            getAlignClasses: ({ id }) => ({
                "text-right": id
            }),
            view(){
                if ( this.viewImages ) {
                    this.viewImages = false;

                    setTimeout(()=>{this.viewImages = true;},100);

                } else {
                    this.viewImages = true;
                }
            },
            manageProposalsAccept(proposal) {
                window.currentPanel = this.$showPanel({
                    component: ManageProposalsAccept,
                    cssClass: 'md-layout-item md-size-70 transition36 bg-grey',
                    openOn: 'right',
                    props: {event: this.event, selectedBlock: this.selectedBlock}
                })
            },
            getDate (eventStartMillis) {
                let x = new Date(eventStartMillis)
                return moment(x).format('MMMM D, YYYY')
            }
        },
        computed: {
            extraMissingRequirements(){
                return _.union(this.vendorProposal.extras,this.vendorProposal.missing)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .text-right /deep/ .md-table-cell-container {
        display: flex;
        justify-content: flex-end;
    }
    .md-table /deep/ .md-table-head:last-child {
        text-align: right;
    }

    .table-stats {
        display: flex;
        align-items: center;
        text-align: right;
        flex-flow: row wrap;

        .td-price {
            .td-total {
                display: inline-flex;
                margin-right: 20px;

            }
            .td-value {
                width: 91px;
                display: inline-block;
                text-align: left;
            }
        }

        &.table-striped .td-price {
            border-bottom: 0;
            color: #000;
        }

        .td-price {
            font-size: 14px;
            font-weight: 400;

            &.bold {
                font-weight: bold;
            }
        }

        .td-price,
        > div {
            flex: 0 0 100%;
            padding: 4px 8px;
        }
    }

    .table-shopping /deep/ .md-table-head:nth-child(5),
    .table-shopping /deep/ .md-table-head:nth-child(7),
    .table-shopping /deep/ .md-table-head:nth-child(6) {
        text-align: right;
    }
</style>
