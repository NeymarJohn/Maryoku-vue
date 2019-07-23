<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
    <div class="md-layout vendor-proposals" v-if="proposalRequest">
        <div class="md-layout-item md-size-100">
            <h3 class="title">Vendor's Name</h3>
        </div>

        <div class="md-layout-item md-size-70 md-small-size-100">
            <!-- Event Information Card -->
            <md-card class="md-primary event-information-card">
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <h4 class="title">Event information</h4>
                        </div>
                        <div class="md-layout-item md-size-45 md-small-size-100">
                            <div class="info-item">
                                <div class="">
                                    <md-icon>calendar_today</md-icon>
                                    Start Date:
                                </div>
                                <div class="info-value">
                                    {{getEventDate(proposalRequest.eventData.eventStartMillis)}}
                                </div>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-45 md-small-size-100">
                            <div class="info-item">
                                <div class="">
                                    <md-icon>place</md-icon>
                                    Location:
                                </div>
                                <div class="info-value">
                                    {{proposalRequest.eventData.location}}
                                </div>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-45 md-small-size-100">
                            <div class="info-item">
                                <div class="">
                                    <md-icon>history</md-icon>
                                    Time & Duration:
                                </div>
                                <div class="info-value">
                                    10:00 AM - 6 Hours
                                </div>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-45 md-small-size-100">
                            <div class="info-item">
                                <div class="">
                                    <md-icon>person</md-icon>
                                    Participants:
                                </div>
                                <div class="info-value">
                                    {{proposalRequest.eventData.numberOfParticipants}} + {{proposalRequest.eventData.participantsType}}
                                </div>
                            </div>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <!-- ./Event Information Card -->

            <!-- Dietary requirements -->
            <md-card class="event-information-card" style="display: none;">
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <h4 class="title">Dietary Requirements</h4>
                        </div>

                        <div class="md-layout-item md-size-100">
                            <div class="vendor-proposals_requirements-list">
                                <div class="list-item md-layout" v-for="(item,index) in dietaryList" :key="index">
                                    <div class="requirement-title md-layout-item md-size-50 md-small-size-100">
                                        {{item.title}}: {{item.meals}} Meals
                                    </div>
                                    <div class="included-in-price md-layout-item md-size-25 md-small-size-40">

                                        <md-switch class="md-switch-rose switch-btn"  v-model="item.included_in_price"></md-switch>
                                        <label :for="`include-${index}`">Included in price</label>
                                    </div>
                                    <div class="actions-list md-layout-item md-size-25 md-small-size-60">
                                        <md-button class="md-rose md-simple"><md-icon>block</md-icon> Item not available</md-button>
                                        <md-button class="md-primary md-simple"><md-icon>comment</md-icon> Add Comment</md-button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="md-layout-item md-size-100">
                            <div class="vendor-proposals_cost-and-availability md-layout">
                                <div class="md-layout-item md-size-75 md-small-size-100">
                                    <div class="items-costs-list">
                                        <div class="item-cost" v-for="(item,index) in dietaryList" :key="index">
                                            <div class="item-cost_title">
                                                {{item.meals}} {{item.title}}
                                            </div>
                                            <div class="item-cost_cost-value">
                                                <span>Cost</span>
                                                <div class="input-field">
                                                    <span class="dollar-sign">$</span>
                                                    <label-edit :text="item.cost ? item.cost.toString() : ''"
                                                                :field-name="item.id.toString()"
                                                                @text-updated-blur="requirementCostChanges"
                                                                @text-updated-enter="requirementCostChanges"></label-edit>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="md-layout-item md-size-25 md-small-size-100 availability-status">
                                    <div>
                                        <md-radio v-model="available_to_deliver" :value="true"
                                                     :id="`available-1`" class="md-success"></md-radio>
                                        <!--<label style=" margin:  14px 16px 14px 0" :for="`include-${index}`">Include a link to the <a :href="`/#/events/${eventData ? eventData.id : ''}/public`">event public page</a>?</label>-->
                                        <label :for="`available-1`">Available for Delivery</label>
                                    </div>
                                    <div>
                                        <md-radio v-model="available_to_deliver" :value="false"
                                                  :id="`available-2`"></md-radio>
                                        <!--<label style=" margin:  14px 16px 14px 0" :for="`include-${index}`">Include a link to the <a :href="`/#/events/${eventData ? eventData.id : ''}/public`">event public page</a>?</label>-->
                                        <label :for="`available-2`">Not Available</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <!-- ./Dietary requirements -->

            <!-- Must-Have Requirements -->
            <template v-if="proposalRequestRequirements.length">
                <md-card class="event-information-card" v-for="(item,index) in proposalRequestRequirements">
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-size-100">
                                <h4 class="title">{{item.title}} Requirements</h4>
                            </div>

                            <div class="md-layout-item md-size-100">
                                <div class="vendor-proposals_requirements-list">
                                    <div class="list-item md-layout" v-for="(requirement,index) in item.requirements" :key="index">
                                        <div class="requirement-title md-layout-item md-size-50 md-small-size-100">
                                            {{requirement.requirementTitle}}

                                            <div class="requirement-desc">
                                                {{requirement.requirementValue}}

                                            </div>
                                        </div>
                                        <div class="included-in-price md-layout-item md-size-25 md-small-size-40">

                                            <md-switch class="md-switch-rose switch-btn"  v-model="requirement.includedInPrice"></md-switch>
                                            <label :for="`include-${index}`">Included in price</label>
                                        </div>
                                        <div class="actions-list md-layout-item md-size-25 md-small-size-60">
                                            <md-button class="md-rose md-simple" v-if="!requirement.itemNotAvailable"><md-icon>block</md-icon> Item not available</md-button>
                                            <md-button class="md-primary md-simple"><md-icon>comment</md-icon> Add Comment</md-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
            </template>

            <!-- ./Must-Have Requirements -->


            <div class="vendor-images-attachments">

                <!-- Vendor images -->
                <md-card class="event-information-card vendor-images">

                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-size-100">
                                <h4 class="title">Add Images</h4>
                            </div>
                        </div>
                        <div class="md-layout">
                            <!-- List Vendor Images -->
                            <div class="vendor-images-list">
                                <div class="vendor-images-list_item"
                                    :style="`background : url(https://bit.ly/2TWGILO) center center no-repeat`"
                                >
                                    <md-button class="md-primary md-sm">delete</md-button>
                                </div>

                                <div class="vendor-images-list_item"
                                     :style="`background : url(https://bit.ly/2TWGILO) center center no-repeat`"
                                >
                                    <md-button class="md-primary md-sm">delete</md-button>
                                </div>

                                <md-button class="md-primary md-sm md-just-icon md-round add-vendor-image"><md-icon>add</md-icon></md-button>
                            </div>
                            <!-- ./List Vendor Images -->
                        </div>
                    </md-card-content>

                </md-card>
                <!-- ./Vendor images -->

                <!-- Vendor images -->
                <md-card class="event-information-card vendor-attachments">

                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-size-100">
                                <h4 class="title">Add Attachments</h4>
                            </div>
                        </div>
                        <div class="md-layout">
                            <div class="vendor-attachments-list">
                                <div  class="vendor-attachments-list_item">
                                    <md-button class="md-primary md-sm md-just-icon md-round add-vendor-image"><md-icon>add</md-icon></md-button>
                                    <div class="attachment-placeholder">Add <br>Insurance Papers </div>
                                </div>
                                <div  class="vendor-attachments-list_item">
                                    <md-button class="md-primary md-sm md-just-icon md-round add-vendor-image"><md-icon>add</md-icon></md-button>
                                    <div class="attachment-placeholder">Add <br>License </div>
                                </div>
                                <div  class="vendor-attachments-list_item">
                                    <md-button class="md-primary md-sm md-just-icon md-round add-vendor-image"><md-icon>add</md-icon></md-button>
                                    <div class="attachment-placeholder">Upload Other Documents </div>
                                </div>
                            </div>
                        </div>
                    </md-card-content>

                </md-card>
                <!-- ./Vendor images -->
            </div>



            <!-- More Requirements -->
            <md-card class="event-information-card notes-section">
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <h4 class="title">Notes</h4>
                        </div>

                        <div class="md-layout-item md-size-100">
                            <md-field>
                                <md-textarea rows="5"></md-textarea>
                            </md-field>
                            <md-button class="md-primary pull-right md-sm">Save</md-button>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <!-- ./More Requirements -->




        </div>
        <div class="md-layout-item md-size-30 md-small-size-100">
            <md-card class="bid-section">
                <md-card-content >

                    <h3 class="text-center">You’re the {{proposalRequest.bidderRank}}th bidder</h3>
                    <p class="text-center">Consider former proposals before placing your bid</p>

                    <div class="cost-average">
                        <div class="cost-average_item">
                            <h5 class="">Lowest</h5>
                            <div class="cost">${{proposalRequest.bidRange.low}}</div>
                        </div>
                        <div class="cost-average_item arrow-item">
                            <md-icon>arrow_right_alt</md-icon>
                        </div>
                        <div class="cost-average_item">
                            <h5 class="">Highest</h5>
                            <div class="cost">${{proposalRequest.bidRange.high}}</div>
                        </div>
                    </div>

                    <div class="update-checkbox">
                        <md-checkbox class="md-success">Update me if someone outbids my offer</md-checkbox>
                    </div>

                    <div class="offer-value">
                        <div class="value-section upgrades-section ">
                            <div class="title">Upgrades</div>
                            <div class="cost text-right">$23</div>
                        </div>
                        <div class="value-section user-offer-section ">
                            <div class="title">Your Offer</div>
                            <div class="cost text-right">$5000</div>
                        </div>
                    </div>

                    <div class="bid-button">
                        <md-button class="md-success">
                            Place Bid
                        </md-button>
                    </div>
                    <div class="show-more-button">
                        <md-button class="md-primary md-sm md-simple">Show me another event</md-button>
                    </div>

                </md-card-content>
            </md-card>
        </div>
    </div>
  </div>
</template>

<script>
    //MAIN MODULES
    import ChartComponent from "@/components/Cards/ChartComponent";
    import VueElementLoading from "vue-element-loading";
    import ProposalRequest from '@/models/ProposalRequest';
    import ProposalRequestComment from '@/models/ProposalRequestComment';


    //COMPONENTS
    import Icon from "@/components/Icon/Icon.vue";
    import { Collapse, LabelEdit } from "@/components";

    export default {
        components: {
            VueElementLoading,
            Icon,
            Collapse,
            LabelEdit
        },

        data() {
            return {
                // auth: auth,
                calendarEvent: {},
                isLoading: false,
                readonly : true,
                isMobile : window.innerWidth <= 500 ? true : false,
                dietaryList : [
                    {
                        id : 1,
                        title : 'Kosher',
                        meals : 4,
                        included_in_price : true,
                        available : false,
                        comments : []
                    },
                    {
                        id : 2,
                        title : 'Vegan',
                        meals : 12,
                        included_in_price : true,
                        available : false,
                        comments : []
                    },
                    {
                        id : 3,
                        title : 'Vegetarian',
                        meals : 5,
                        included_in_price : true,
                        available : false,
                        comments : []
                    }
                ],
                available_to_deliver : true,
                mustHaveList : [
                    {
                        id : 1,
                        title : 'Event Coordinator',
                        desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. minim veniam, quis nostrud exercitation ullamco laboris',
                        included_in_price : true,
                        available : false,
                        comments : []
                    },
                    {
                        id : 2,
                        title : 'Main Venue',
                        desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. minim veniam, quis nostrud exercitation ullamco laboris',
                        included_in_price : true,
                        available : false,
                        comments : []
                    },
                    {
                        id : 3,
                        title : 'Transportation',
                        desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. minim veniam, quis nostrud exercitation ullamco laboris',
                        included_in_price : true,
                        available : false,
                        comments : []
                    }
                ],
                moreList : [
                    {
                        id : 1,
                        title : 'Waiters',
                        desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. minim veniam, quis nostrud exercitation ullamco laboris',
                        included_in_price : true,
                        available : false,
                        comments : []
                    },
                    {
                        id : 2,
                        title : 'Main Chef',
                        desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. minim veniam, quis nostrud exercitation ullamco laboris',
                        included_in_price : true,
                        available : false,
                        comments : []
                    },
                    {
                        id : 3,
                        title : 'Food Menu',
                        desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. minim veniam, quis nostrud exercitation ullamco laboris',
                        included_in_price : true,
                        available : false,
                        comments : []
                    }
                ],
                vendorImages : [],
                serverUrl: process.env.SERVER_URL,
                imagePreview : null,
                proposalRequest : null,
                proposalRequestRequirements : []
            };
        },
        created(){

             ProposalRequest.find(this.$route.params.id)
                .then(resp => {
                    console.log(' Response   -->>>  ',resp);
                    this.$set(this,'proposalRequest',resp);

                    this.proposalRequestRequirements = _.chain(resp.requirements).groupBy('requirementPriority').map(function(value, key) {

                        return {
                            title: key,
                            requirements: value
                        }


                    })
                        .value();

                    console.log(this.proposalRequestRequirements);

                })
                .catch(error=>{
                    console.log(' error   -->>>  ',error);
                })


            // ProposalRequestComment.find(this.$route.params.id)
            //     .then(resp => {
            //         console.log(' Response2   -->>>  ',resp);
            //     })
            //     .catch(error=>{
            //         console.log(error);
            //     })

        },
        mounted() {




        },
        methods: {

            requirementCostChanges(val, index) {

            },
            getEventDate(eventStartMillis) {

                let x = new Date(eventStartMillis);

                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];

                return monthNames[x.getMonth()]+ ' ' + x.getDate() +  ',' + x.getFullYear();

            }
        },
        computed: {

        }
    };
</script>
