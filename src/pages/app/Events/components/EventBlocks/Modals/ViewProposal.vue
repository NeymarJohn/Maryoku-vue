<template>
    <div class="manage-proposals-panel">
        <div class="md-layout" style="max-height: 50vh;">
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
                        Proposal Title
                    </h4>
                    <div class="star-rating">
                        <label class="star-rating__star"
                               v-for="rating in ratings"
                               :class="{'is-selected' : ((proposal.cost >= rating) && proposal.cost != null)}"
                        >
                            <input class="star-rating star-rating__checkbox" type="radio"
                                   v-model="proposal.coste">★</label>
                    </div>

                    <div class="actions-list">
                        <md-button class="md-rose md-sm md-simple no-uppercase">
                            <md-icon>compare</md-icon> Add to compare
                        </md-button>
                        <md-button class="md-rose md-sm bold no-uppercase">
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
                            <h4>Dear Rachel</h4>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
<br>
                                Thanks,
<br>
                                Peter Luger
                            </p>
                            <div class="attachments-list">
                                <h6>Attachments</h6>
                                <ul class="attachments-list_items">
                                    <li><a href=""> <md-icon>attach_file</md-icon>Food Menu </a></li>
                                    <li><a href=""> <md-icon>attach_file</md-icon>Food Menu </a></li>
                                    <li><a href=""> <md-icon>attach_file</md-icon>Food Menu </a></li>
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
                                    <div class="cost-value">$4</div>
                                </div>
                                <div class="cost-info_desc">
                                    <div class="cost-label">Subtotal</div>
                                    <div class="cost-value">$2,000</div>
                                </div>
                            </div>

                            <div class="proposal-pros-cons">
                                <div class="section-content pros-section">
                                    <md-icon>thumb_up_alt</md-icon>
                                    <ul class="list-items">
                                        <li>Price within budget</li>
                                        <li>Meets 90% of rqmts.</li>
                                        <li>Low cost per guest</li>
                                        <li>Very responsive</li>
                                    </ul>
                                </div>
                                <div class="section-content cons-section">
                                    <md-icon>thumb_down_alt</md-icon>
                                    <ul class="list-items">
                                        <li>2 needed upgrades</li>
                                        <li>Strict cancellation policy</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="need-help-section text-center">
                                <h6>Need help or modifications?</h6>
                                <md-button class="md-rose md-simple md-sm no-uppercase">
                                    Contact Peter
                                    <md-tooltip>Email </md-tooltip>
                                </md-button>
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
                        <li> <md-icon>check</md-icon> Plateware</li>
                        <li> <md-icon>check</md-icon> Plateware</li>
                        <li> <md-icon>check</md-icon> Plateware</li>
                        <li> <md-icon>check</md-icon> Plateware</li>
                        <li> <md-icon>check</md-icon> Plateware</li>
                        <li> <md-icon>check</md-icon> Plateware</li>
                    </ul>
                </div>

                <div class="md-layout-item md-size-5"></div>
                <div class="md-layout-item md-size-95">
                    <div class="section-title">
                        <h3>Waiting for your approval (2)</h3>
                    </div>
                    <ul class="proposals-waiting-approval">
                        <li>
                            <div class="proposal-info">
                                <div class="proposal-title">4x Kosher meals <small>(Suggested by vendor)</small></div>
                                <div class="proposal-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. <md-button class="md-primary md-simple md-sm read-more no-uppercase">Read more</md-button></div>
                            </div>
                            <div class="proposal-actions">
                                <md-button class="md-primary md-sm">Add ($220)</md-button>
                            </div>
                        </li>

                        <li>
                            <div class="proposal-info">
                                <div class="proposal-title">3x Lactose free meals</div>
                                <div class="proposal-desc"><div class="not-available-alert">The item is not available</div></div>
                            </div>
                            <div class="proposal-actions">
                                <md-button class="md-warning md-sm">Got it <md-icon>check</md-icon></md-button>
                            </div>
                        </li>

                    </ul>
                </div>



                <div class="md-layout-item md-size-5"></div>
                <div class="md-layout-item md-size-95 cost-breakdown-notes">
                    <div class="section-content cost-breakdown-section">
                        <h4>Cost breakdown</h4>

                        <div class="section-content">
                            <md-table v-model="cost_breakdown" class="table-plaint">
                                <md-table-row slot="md-table-row" slot-scope="{ item }"  >
                                    <md-table-cell md-label="Service">{{ item.service }}</md-table-cell>
                                    <md-table-cell md-label="Per guest">${{ item.per_guest }}</md-table-cell>
                                    <md-table-cell class="cost-cell" md-label="Cost" :class="getAlignClasses(item)">${{ item.cost }}</md-table-cell>
                                </md-table-row>
                            </md-table>
                            <div class="table table-stats table-striped">
                                <div class="td-price">
                                    <div class="td-total">
                                        Subtotal
                                    </div>
                                    <span class="td-value">
                                        $1940
                                    </span>
                                </div>
                                <div class="td-price">
                                    <div class="td-total">
                                        Tax (3%)
                                    </div>
                                    <span class="td-value">
                                        $60
                                    </span>
                                </div>
                                <div class="td-price bold">
                                    <div class="td-total">
                                        Total
                                    </div>
                                    <span class="td-value">
                                        $2000
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section-content notes-section">
                        <h4>Notes</h4>
                        <p>
                            Minimum no. of invitees: 180, cost per each extra invitee: $40.
                        </p>
                        <p>
                            This offer is valid till July 1st 2019.

                        </p>
                    </div>
                </div>


                <div class="md-layout-item md-size-5"></div>

                <div class="md-layout-item md-size-95 gallery-section">
                    <div class="section-title">
                        <h3>Why Us?</h3>
                    </div>

                    <md-button class="md-default view-images no-uppercase" @click="view()">View Images</md-button>

                    <ul class="images-list">
                        <li class="image-item">
                            <div style="width : 320px; height : 320px; background : url(https://i.kinja-img.com/gawker-media/image/upload/s--vHt6tbFa--/c_scale,f_auto,fl_progressive,q_80,w_800/xjmx1csashjww8j8jwyh.jpg) center center no-repeat ; background-size : cover;"></div>
                        </li>
                        <li class="image-item">
                            <div style="width : 320px; height : 320px; background : url(https://cdn.jamieoliver.com/home/wp-content/uploads/2016/06/2.jpg) center center no-repeat ; background-size : cover;"></div>
                        </li>
                        <li class="image-item">
                            <div style="width : 320px; height : 320px; background : url(https://i.kinja-img.com/gawker-media/image/upload/s--vHt6tbFa--/c_scale,f_auto,fl_progressive,q_80,w_800/xjmx1csashjww8j8jwyh.jpg) center center no-repeat ; background-size : cover;"></div>
                        </li>
                        <li class="image-item">
                            <div style="width : 320px; height : 320px; background : url(https://cdn.jamieoliver.com/home/wp-content/uploads/2016/06/2.jpg) center center no-repeat ; background-size : cover;"></div>
                        </li>
                    </ul>

                    <LightBox  v-if="viewImages" :images="images"></LightBox>

                </div>


                <div class="md-layout-item md-size-5"></div>

                <div class="md-layout-item md-size-95 feedback-section">
                    <div class="section-title">
                        <h5>Feedback</h5>
                        <div class="star-rating">
                            <label class="star-rating__star"
                                   v-for="rating in ratings"
                                   :class="{'is-selected' : ((feedbackRating >= rating) && feedbackRating != null)}"
                            >
                                <input class="star-rating star-rating__checkbox" type="radio"
                                       v-model="feedbackRating">★</label>
                        </div>
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




                <div class="md-layout-item md-size-5"></div>
                <div class="md-layout-item md-size-95">
                    <ul class="proposal-summary">
                        <li>
                            <div class="proposal-info">
                                <div class="proposal-title">Payment & cost <span><md-icon>attach_money</md-icon> Net +30</span></div>
                                <div class="proposal-desc">A 50% deposit will be due on or before 18/1/20. The remaining balance will be collected a week prior to the.. <md-button class="md-primary md-simple md-sm read-more no-uppercase">Read more</md-button></div>
                            </div>
                        </li>

                        <li>
                            <div class="proposal-info">
                                <div class="proposal-title">Payment & cost <span><md-icon>attach_money</md-icon> Net +30</span></div>
                                <div class="proposal-desc">A 50% deposit will be due on or before 18/1/20. The remaining balance will be collected a week prior to the.. <md-button class="md-primary md-simple md-sm read-more no-uppercase">Read more</md-button></div>
                            </div>
                        </li>

                        <li>
                            <div class="proposal-info about-us">
                                <div class="proposal-title">About us</div>
                                <div class="proposal-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                            </div>
                            <div class="attachments-list">
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


    export default {
        components: {
            VueElementLoading,LightBox
        },
        props: {
            event: Object,
            proposal: Object,
        },
        data: () => ({
            // auth: auth,
            isLoaded: false,
            ratings: [1, 2, 3, 4, 5],
            cost_breakdown : [
                {
                    id : 123123123,
                    service : 'Carting',
                    per_guest : 3.88,
                    cost : 1940
                }
            ],
            images : [
                {
                    thumb: 'https://i.kinja-img.com/gawker-media/image/upload/s--vHt6tbFa--/c_scale,f_auto,fl_progressive,q_80,w_800/xjmx1csashjww8j8jwyh.jpg',
                    src: 'https://i.kinja-img.com/gawker-media/image/upload/s--vHt6tbFa--/c_scale,f_auto,fl_progressive,q_80,w_800/xjmx1csashjww8j8jwyh.jpg',
                    caption: 'caption to display. receive <html> <b>tag</b>', // Optional
                    srcset: 'https://i.kinja-img.com/gawker-media/image/upload/s--vHt6tbFa--/c_scale,f_auto,fl_progressive,q_80,w_800/xjmx1csashjww8j8jwyh.jpg' // Optional for displaying responsive images
                },
                {
                    thumb: 'https://cdn.jamieoliver.com/home/wp-content/uploads/2016/06/2.jpg',
                    src: 'https://cdn.jamieoliver.com/home/wp-content/uploads/2016/06/2.jpg',
                    caption: 'caption to display. receive <html> <b>tag</b>', // Optional
                    srcset: 'https://cdn.jamieoliver.com/home/wp-content/uploads/2016/06/2.jpg' // Optional for displaying responsive images
                }
            ],
            viewImages : false,
            feedbackRating : 3
        }),

        created () {

            console.log(this.proposal);

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
                console.log('i am here')
                if ( this.viewImages ) {
                    console.log('true');
                    this.viewImages = false;

                    setTimeout(()=>{this.viewImages = true;},100);

                } else {
                    console.log('false');
                    this.viewImages = true;
                }
            }
        },
        computed: {}
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
