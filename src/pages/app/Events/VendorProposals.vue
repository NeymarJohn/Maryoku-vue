<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
    <div class="md-layout vendor-proposals" v-if="proposalRequest">
        <div class="md-layout-item md-size-100">
            <h3 class="title">Vendor's Name</h3>
        </div>

        <div class="md-layout-item md-size-70 md-small-size-100">
            <!-- Event Information Card -->
            <md-card class="event-information-card">
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <h4 class="title">Event information</h4>
                        </div>
                        <div class="md-layout-item md-size-25 md-small-size-100">
                            <div class="info-item">
                                <div class="info-label">
                                    Start Date:
                                </div>
                                <div class="info-value">
                                    {{getEventDate(proposalRequest.eventData.eventStartMillis)}}
                                </div>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-25 md-small-size-100">
                            <div class="info-item">
                                <div class="info-label">
                                    Location:
                                </div>
                                <div class="info-value">
                                    {{proposalRequest.eventData.location}}
                                </div>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-25 md-small-size-100">
                            <div class="info-item">
                                <div class="info-label">
                                    Time & Duration:
                                </div>
                                <div class="info-value">
                                    10:00 AM - 6 Hours
                                </div>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-25 md-small-size-100">
                            <div class="info-item">
                                <div class="info-label">
                                    Participants:
                                </div>
                                <div class="info-value">
                                    {{proposalRequest.eventData.numberOfParticipants}} + {{proposalRequest.eventData.participantsType}}
                                </div>
                            </div>
                        </div>

                        <div class="md-layout-item md-size-100">
                            <div class="proposal-description">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </div>
                            <div class="show-more-button">
                                <md-button class="md-primary md-sm md-simple">Show me another event</md-button>
                            </div>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <!-- ./Event Information Card -->

            <!-- Dietary requirements -->
            <md-card class="event-information-card">
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <h4 class="title">Elements in this proposal (2)</h4>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            </p>
                        </div>

                        <div class="md-layout-item md-size-100">
                            <div class="vendor-proposals_requirements-list">
                                <div class="list-item md-layout item-title"  >
                                    <div class="requirement-title md-layout-item md-size-65 md-small-size-100">
                                        Venue
                                    </div>
                                    <div class="md-layout-item md-size-35 md-small-size-100 text-right item-cost-desc">
                                        <span>Per guest $45</span>
                                        <md-field class="with-bg">
                                            <span class="md-prefix">$</span>
                                            <md-input v-model="initial"></md-input>
                                        </md-field>
                                    </div>
                                </div>
                                <div class="list-item md-layout" v-for="(item,index) in dietaryList" :key="index">
                                    <div class="requirement-title md-layout-item md-size-50 md-small-size-100">
                                        {{item.title}}: {{item.meals}} Meals
                                    </div>
                                    <div class="included-in-price md-layout-item md-size-50 md-small-size-100 text-right item-cost-desc">
                                        <template v-if="!item.included_in_price">
                                            <md-field >
                                                <md-select v-model="initial">
                                                    <md-option>Per Guest</md-option>
                                                </md-select>
                                            </md-field>
                                            <md-field class="with-bg">
                                                <span class="md-prefix">$</span>
                                                <md-input v-model="initial"></md-input>
                                            </md-field>
                                        </template>


                                        <md-switch class="md-switch-rose switch-btn"  v-model="item.included_in_price"></md-switch>
                                        <label :for="`include-${index}`">Included in price</label>
                                    </div>
                                    <div class="actions-list md-layout-item md-size-100 md-small-size-100">
                                        <md-field >
                                            <label>Amount</label>
                                            <md-input type="number"></md-input>
                                        </md-field>
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
                <md-card class="event-information-card" v-for="(item,index) in proposalRequestRequirements" :key="index">
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-size-100">
                                <h4 class="title">{{item.title}} Requirements</h4>
                            </div>

                            <div class="md-layout-item md-size-100">
                                <div class="vendor-proposals_requirements-list">
                                    <div class="list-item md-layout" v-for="(requirement,index) in item.requirements" :key="index">
                                        <div class="requirement-title md-layout-item md-size-75 md-small-size-100">
                                            {{requirement.requirementTitle}}

                                            <div class="requirement-desc" style="display: none;">
                                                {{requirement.requirementValue}}
                                            </div>
                                        </div>
                                        <div class="included-in-price md-layout-item md-size-25 md-small-size-100">

                                            <md-switch class="md-switch-rose switch-btn"  v-model="requirement.includedInPrice"></md-switch>
                                            <label :for="`include-${index}`">Included in price</label>
                                        </div>
                                        <div class="actions-list md-layout-item md-size-100 md-small-size-100">
                                            <md-field >
                                                <label>Amount</label>
                                                <md-input type="number" v-model="requirement.requirementValue"></md-input>
                                            </md-field>
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
                                     v-for="(image,index) in proposalRequestImages" :key="index"
                                    :style="`background : url(${serverUrl}/1/proposal-requests/${proposalRequest.id}/images/${image.id}) center center no-repeat`"
                                >
                                    <md-button class="md-primary md-sm" @click="deleteImage(image.id,index)">delete</md-button>
                                </div>

                                <md-button class="md-primary md-sm md-just-icon md-round add-vendor-image" @click="uploadEventImage" ><md-icon>add</md-icon></md-button>
                                <input type="file" style="display: none;" ref="eventFile" accept="image/gif, image/jpg, image/png" @change="onEventFilePicked">
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
                        <div class="value-section upgrades-section ">
                            <div class="title">Upgrades</div>
                            <div class="cost text-right">$23</div>
                        </div>
                        <div class="value-section upgrades-section is-bold">
                            <div class="title">Extra</div>
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
    import ProposalRequestImage from '@/models/ProposalRequestImage';


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
                proposalRequestRequirements : [],
                proposalRequestImages : [],
                alretExceedPictureSize : false
            };
        },
        created(){

             ProposalRequest.find(this.$route.params.id)
                .then(resp => {
                    this.$set(this,'proposalRequest',resp);

                    this.proposalRequestRequirements = _.chain(resp.requirements).groupBy('requirementPriority').map(function(value, key) {

                        return {
                            title: key,
                            requirements: value
                        }


                    })
                        .value();

                    console.log(this.proposalRequest);

                })
                .catch(error=>{
                    console.log(' error here   -->>>  ',error);
                })

            this.getImages();


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

            },
            uploadEventImage(imageId = null) {
                this.selectedImage = typeof imageId != 'object' ? imageId : null;
                this.$refs.eventFile.click();
            },

            onEventFilePicked(event) {
                let file = event.target.files || event.dataTransfer.files;
                if (!file.length) {
                    return;
                }

                if (file[0].size <= 5000000){ // 5mb

                    this.createImage(file[0]);

                } else {

                    this.alretExceedPictureSize = true
                    this.$notify(
                        {
                            message: "You've Uploaded an Image that Exceed the allowed size, try small one!",
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'warning'
                        })

                }

            },
            createImage(file, type) {
                let reader = new FileReader();
                let vm = this;

                this.isLoading = true;

                reader.onload = e => {

                    const proposalRequest = new ProposalRequest({id: this.proposalRequest.id});

                    return new ProposalRequestImage({vendorProposalFile : e.target.result}).for(proposalRequest).save().then(result => {

                        console.log('i am here' , result);
                        this.isLoading = false;
                        this.proposalRequestImages.push({id : result.id});

                    })
                        .catch((error) => {
                            this.isLoading = false;
                            console.log('Error');
                            console.log(error);
                        });
                };
                reader.readAsDataURL(file);
            },
            getImages() {

                const proposalRequest = new ProposalRequest({id: this.$route.params.id});

                new ProposalRequestImage().for(proposalRequest).get()
                    .then(imagesList => {
                        this.$set(this,'proposalRequestImages',imagesList);
                        console.log('proposalRequestImages => ',imagesList)
                    })
                    .catch((error) => {
                        console.log(' ProposalRequestImage Error');


                        console.log(error);
                    });
            },
            deleteImage(imageId,index) {
                const proposalRequest = new ProposalRequest({id: this.$route.params.id});

                this.isLoading = true;

                return new ProposalRequestImage({id : imageId}).for(proposalRequest).delete().then(result => {

                    this.proposalRequestImages.splice(index,1);
                    this.isLoading = false;
                })
                    .catch((error) => {
                        this.isLoading = false;

                        console.log(error);
                    });

            }
        },
        computed: {

        }
    };
</script>
