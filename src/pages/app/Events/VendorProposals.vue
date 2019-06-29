<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
    <div class="md-layout vendor-proposals">
        <div class="md-layout-item md-size-100">
            <h3 class="title">Vendor's Name</h3>
        </div>

        <div class="md-layout-item md-size-70">
            <!-- Event Information Card -->
            <md-card class="md-primary event-information-card">
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <h4 class="title">Event information</h4>
                        </div>
                        <div class="md-layout-item md-size-45">
                            <div class="info-item">
                                <div class="">
                                    <md-icon>calendar_today</md-icon>
                                    Start Date:
                                </div>
                                <div class="info-value">
                                    December 20,2019
                                </div>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-45">
                            <div class="info-item">
                                <div class="">
                                    <md-icon>place</md-icon>
                                    Location:
                                </div>
                                <div class="info-value">
                                    135 West street, New York
                                </div>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-45">
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
                        <div class="md-layout-item md-size-45">
                            <div class="info-item">
                                <div class="">
                                    <md-icon>person</md-icon>
                                    Participants:
                                </div>
                                <div class="info-value">
                                    74 + Spouses
                                </div>
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
                            <h4 class="title">Dietary Requirements</h4>
                        </div>

                        <div class="md-layout-item md-size-100">
                            <div class="vendor-proposals_requirements-list">
                                <div class="list-item md-layout" v-for="(item,index) in dietaryList" :key="index">
                                    <div class="requirement-title md-layout-item md-size-50">
                                        {{item.title}}: {{item.meals}} Meals
                                    </div>
                                    <div class="included-in-price md-layout-item md-size-25">

                                        <md-switch class="md-switch-rose switch-btn"  v-model="item.included_in_price"></md-switch>
                                        <label :for="`include-${index}`">Included in price</label>
                                    </div>
                                    <div class="actions-list md-layout-item md-size-25">
                                        <md-button class="md-rose md-simple"><md-icon>block</md-icon> Item not available</md-button>
                                        <md-button class="md-primary md-simple"><md-icon>comment</md-icon> Add Comment</md-button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="md-layout-item md-size-100">
                            <div class="vendor-proposals_cost-and-availability md-layout">
                                <div class="md-layout-item md-size-75">
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
                                <div class="md-layout-item md-size-25 availability-status">
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
            <md-card class="event-information-card">
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <h4 class="title">Must-Have Requirements</h4>
                        </div>

                        <div class="md-layout-item md-size-100">
                            <div class="vendor-proposals_requirements-list">
                                <div class="list-item md-layout" v-for="(item,index) in mustHaveList" :key="index">
                                    <div class="requirement-title md-layout-item md-size-50">
                                        {{item.title}}

                                        <div class="requirement-desc">
                                            {{item.desc}}

                                        </div>
                                    </div>
                                    <div class="included-in-price md-layout-item md-size-25">

                                        <md-switch class="md-switch-rose switch-btn"  v-model="item.included_in_price"></md-switch>
                                        <label :for="`include-${index}`">Included in price</label>
                                    </div>
                                    <div class="actions-list md-layout-item md-size-25">
                                        <md-button class="md-rose md-simple"><md-icon>block</md-icon> Item not available</md-button>
                                        <md-button class="md-primary md-simple"><md-icon>comment</md-icon> Add Comment</md-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <!-- ./Must-Have Requirements -->

            <!-- More Requirements -->
            <md-card class="event-information-card">
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <h4 class="title">More Requirements</h4>
                        </div>

                        <div class="md-layout-item md-size-100">
                            <div class="vendor-proposals_requirements-list">
                                <div class="list-item md-layout" v-for="(item,index) in moreList" :key="index">
                                    <div class="requirement-title md-layout-item md-size-50">
                                        {{item.title}}

                                        <div class="requirement-desc">
                                            {{item.desc}}

                                        </div>
                                    </div>
                                    <div class="included-in-price md-layout-item md-size-25">

                                        <md-switch class="md-switch-rose switch-btn"  v-model="item.included_in_price"></md-switch>
                                        <label :for="`include-${index}`">Included in price</label>
                                    </div>
                                    <div class="actions-list md-layout-item md-size-25">
                                        <md-button class="md-rose md-simple"><md-icon>block</md-icon> Item not available</md-button>
                                        <md-button class="md-primary md-simple"><md-icon>comment</md-icon> Add Comment</md-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <!-- ./More Requirements -->


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
                            <md-card v-for="(image,index) in vendorImages" :key="index" class="md-layout-item md-size-25">
                                <md-card-media>
                                    <div class="event-images_image-item" style="margin: auto;" :style="`background-image : url(`+`${serverUrl}/1/eventPageImages/${image.id}`+`)`" @click="previewImage(image.id)">
                                    </div>
                                    <md-button class="md-info md-sm delete-event-image" @click="removeEventImage(index)" v-if="!readonly">
                                        DELETE
                                    </md-button>
                                </md-card-media>
                            </md-card>

                            <md-card v-for="(n,index) in (3 - vendorImages.length)" :key="index + 1000"  class="md-layout-item md-size-33 default-image-box" :style="`cursor: pointer; background: url('/static/img/default${index+1}.jpg') center center no-repeat; background-size: cover;`">
                                <div class="" @click="uploadEventImage" style="color: black; text-shadow: 0 0 3px #fff; font-size: 18px; font-weight: 500;">
                                    <md-icon style="color: black; text-shadow: 0 0 3px #fff; font-size: 24px; font-weight: 500;">add_to_photos</md-icon>
                                    Add image
                                </div>
                            </md-card>

                            <div class="update-banner-form">
                                <input type="file" style="display: none;" ref="eventFile" accept="image/gif, image/jpg, image/png" @change="onEventFilePicked">
                            </div>


                            <div class="preview-image" v-if="imagePreview">
                                <md-button class="md-simple md-just-icon md-round" @click="closePreviewModal">
                                    <md-icon>clear</md-icon>
                                </md-button>
                                <img :src="`${serverUrl}/1/eventPageImages/${imagePreview}`" class="event-image-item">
                            </div>
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
                            <md-card v-for="(image,index) in vendorImages" :key="index" class="md-layout-item md-size-25">
                                <md-card-media>
                                    <div class="event-images_image-item" style="margin: auto;" :style="`background-image : url(`+`${serverUrl}/1/eventPageImages/${image.id}`+`)`" @click="previewImage(image.id)">
                                    </div>
                                    <md-button class="md-info md-sm delete-event-image" @click="removeEventImage(index)" v-if="!readonly">
                                        DELETE
                                    </md-button>
                                </md-card-media>
                            </md-card>

                            <md-card v-for="(n,index) in (3 - vendorImages.length)" :key="index + 1000"  class="md-layout-item md-size-33 default-image-box" :style="`cursor: pointer; background: url('/static/img/default${index+1}.jpg') center center no-repeat; background-size: cover;`">
                                <div class="" @click="uploadEventImage" style="color: black; text-shadow: 0 0 3px #fff; font-size: 18px; font-weight: 500;">
                                    <md-icon style="color: black; text-shadow: 0 0 3px #fff; font-size: 24px; font-weight: 500;">add_to_photos</md-icon>
                                    Add image
                                </div>
                            </md-card>

                            <div class="update-banner-form">
                                <input type="file" style="display: none;" ref="eventFile" accept="image/gif, image/jpg, image/png" @change="onEventFilePicked">
                            </div>


                            <div class="preview-image" v-if="imagePreview">
                                <md-button class="md-simple md-just-icon md-round" @click="closePreviewModal">
                                    <md-icon>clear</md-icon>
                                </md-button>
                                <img :src="`${serverUrl}/1/eventPageImages/${imagePreview}`" class="event-image-item">
                            </div>
                        </div>
                    </md-card-content>

                </md-card>
                <!-- ./Vendor images -->
            </div>



        </div>
        <div class="md-layout-item md-size-30">
            <md-card>
                <md-card-content >
                    Hello
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
            };
        },
        created(){


        },
        mounted() {


        },
        methods: {

            requirementCostChanges(val, index) {

            },
            uploadEventImage() {
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

                //this.isLoading = true;

                reader.onload = e => {

                    this.vendorImages.push({id: result.id});

                };

                reader.readAsDataURL(file);
            },

            removeEventImage(index){


            },
            previewImage(image){
                this.imagePreview = image;
            }
            ,
            closePreviewModal() {
                this.imagePreview = null;

            }
        },
        computed: {

        }
    };
</script>
