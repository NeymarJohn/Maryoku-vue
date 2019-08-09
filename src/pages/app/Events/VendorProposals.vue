<template>
    <div class="md-layout">
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
        <div class="md-layout vendor-proposals" v-if="proposalRequest">
            <div class="md-layout-item md-size-100">
                <h5><a href="">
                    <small>
                        <md-icon>keyboard_backspace</md-icon>
                        I'd like to see other requests
                    </small>
                </a></h5>
            </div>
            <div class="md-layout-item md-size-100">
                <h3 class="title" style="font-weight: bold;">Submit your proposal</h3>
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
                                        Time & Duration:
                                    </div>
                                    <div class="info-value">
                                        {{getEventTime(proposalRequest.eventData.eventStartMillis)}} -
                                        {{getEventDuration(proposalRequest.eventData.eventStartMillis,
                                        proposalRequest.eventData.eventEndMillis)}}
                                    </div>
                                </div>
                            </div>
                            <div class="md-layout-item md-size-25 md-small-size-100">
                                <div class="info-item">
                                    <div class="info-label">
                                        Location:
                                    </div>
                                    <div class="info-value">
                                        {{proposalRequest.eventData.location || '-'}}
                                    </div>
                                </div>
                            </div>
                            <div class="md-layout-item md-size-25 md-small-size-100">
                                <div class="info-item">
                                    <div class="info-label">
                                        Participants:
                                    </div>
                                    <div class="info-value">
                                        {{proposalRequest.eventData.numberOfParticipants}}
                                        <small>({{proposalRequest.eventData.participantsType}})</small>
                                    </div>
                                </div>
                            </div>

                            <div class="md-layout-item md-size-100">
                                <div class="proposal-description">
                                    {{proposalRequest.description}}
                                </div>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
                <!-- ./Event Information Card -->

                <!-- Dietary requirements -->
                <md-card class="event-information-card ">
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-size-100">
                                <h4 class="title">{{proposalRequest.requirements.length}} Elements in this proposal</h4>
                            </div>

                            <div class="md-layout-item md-size-100">
                                <div class="vendor-proposals_requirements-list">
                                    <div class="list-item md-layout item-title">
                                        <div class="requirement-title md-layout-item md-size-65 md-small-size-100">
                                            {{proposalRequest.requirementsCategory}}
                                            ({{proposalRequest.requirements.length}})
                                        </div>
                                        <div
                                            class="md-layout-item md-size-35 md-small-size-100 text-right item-cost-desc">
                                            <span>Per guest ${{(proposalRequest.requirementsCategoryCost / proposalRequest.eventData.numberOfParticipants).toFixed(2) | numeral('0,0') }}</span>
                                            <md-field class="with-bg">
                                                <span class="md-prefix">$</span>
                                                <md-input v-model="proposalRequest.requirementsCategoryCost"
                                                          @blur="updateProposalRequest"></md-input>
                                            </md-field>
                                        </div>
                                    </div>
                                    <div class="list-item md-layout"
                                         v-for="(item,index) in proposalRequest.requirements" :key="index">
                                        <div class="requirement-title md-layout-item md-size-50 md-small-size-100">
                                            <span v-if="item.requirementValue">{{item.requirementValue}} x </span>
                                            {{item.requirementTitle}}
                                            <blockquote v-if="item.requirementMandatory"
                                                        style="background-color: #EEEEEE; border-left: 2px solid #aaaaaa; padding: 8px; margin-left: 0;">
                                                <span>Client <strong>must-have</strong> requirement</span>
                                                <div v-if="item.requirementValue">
                                                    <span class="text-gray">{{item.requirementComment}}</span>
                                                </div>
                                            </blockquote>
                                            <blockquote v-else
                                                        style="background-color: #EEEEEE; border-left: 2px solid #aaaaaa; padding: 8px; margin-left: 0;">
                                                <span>Client requirement</span>
                                                <span class="text-gray">{{item.requirementComment}}</span>
                                            </blockquote>
                                        </div>
                                        <div
                                            class="included-in-price md-layout-item md-size-50 md-small-size-100 text-right item-cost-desc">
                                            <template v-if="!item.includedInPrice">
                                                <md-field>
                                                    <md-select v-model="item.priceUnit" @change="updateProposalRequest">
                                                        <md-option value="per guest">Per Guest</md-option>
                                                        <md-option value="total">Total</md-option>
                                                    </md-select>
                                                </md-field>
                                                <md-field class="with-bg">
                                                    <span class="md-prefix">$</span>
                                                    <md-input v-model="item.price"
                                                              @blur="updateProposalRequest"></md-input>
                                                </md-field>
                                            </template>


                                            <md-switch class="md-switch-rose switch-btn"
                                                       v-model="item.includedInPrice"></md-switch>
                                            <label :for="`include-${index}`">Included in price</label>
                                        </div>
                                        <div class="actions-list md-layout-item md-size-100 md-small-size-100">
                                            <md-field>
                                                <label>Amount</label>
                                                <md-input type="number" v-model="item.requirementValue"
                                                          @blur="updateProposalRequest"></md-input>
                                            </md-field>
                                            <md-button class="md-rose md-simple" v-if="item.itemNotAvailable">
                                                <md-icon>block</md-icon>
                                                Item not available
                                            </md-button>
                                            <md-button class="md-primary md-simple" v-if="!item.requirementComment || !item.addedComment"
                                                       @click="item.showCommentForm =  true; item.addedComment = false; $forceUpdate();">
                                                <md-icon>comment</md-icon>
                                                Add Comment
                                            </md-button>
                                            <div class="requirement-comment" v-if="item.requirementComment && item.addedComment">
                                                <md-icon>comment</md-icon>
                                                <label-edit :text="item.proposalRequestRequirementComment"
                                                            @text-updated-blur="updateProposalRequest"
                                                            @text-updated-enter="updateProposalRequest"></label-edit>
                                            </div>

                                            <template v-if="item.showCommentForm">
                                                <md-field class="full-width bordered-field">
                                                    <md-input v-model="item.requirementComment" placeholder="add your comment here"
                                                              @blur="updateProposalRequest(); item.showCommentForm =  false; item.addedComment = true; $forceUpdate();"></md-input>
                                                </md-field>
                                            </template>

                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
                <!-- ./Dietary requirements -->


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
                                        <md-button class="md-primary md-sm" @click="deleteImage(image.id,index)">
                                            delete
                                        </md-button>
                                    </div>

                                    <md-button class="md-primary md-sm md-just-icon md-round add-vendor-image"
                                               @click="uploadEventImage">
                                        <md-icon>add</md-icon>
                                    </md-button>
                                    <input type="file" style="display: none;" ref="eventFile"
                                           accept="image/gif, image/jpg, image/png" @change="onEventFilePicked">
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
                                    <div class="vendor-attachments-list_item">
                                        <md-button class="md-primary md-sm md-just-icon md-round add-vendor-image"
                                                   @click="uploadInsurancePapers">
                                            <md-icon>add</md-icon>
                                        </md-button>
                                        <input type="file" style="display: none;" ref="InsurancePapers"
                                               @change="onInsurancePapersPicked">
                                        <div class="attachment-placeholder">Add <br>Insurance Papers</div>
                                    </div>
                                    <div class="vendor-attachments-list_item">
                                        <md-button class="md-primary md-sm md-just-icon md-round add-vendor-image"
                                                   @click="uploadLicense">
                                            <md-icon>add</md-icon>
                                        </md-button>
                                        <input type="file" style="display: none;" ref="license"
                                               @change="onLicensePicked">
                                        <div class="attachment-placeholder">Add <br>License</div>
                                    </div>
                                    <div class="vendor-attachments-list_item">
                                        <md-button class="md-primary md-sm md-just-icon md-round add-vendor-image">
                                            <md-icon>add</md-icon>
                                        </md-button>
                                        <div class="attachment-placeholder">Upload Other Documents</div>
                                    </div>
                                </div>
                            </div>
                        </md-card-content>

                    </md-card>
                    <!-- ./Vendor images -->
                </div>


                <!-- More Requirements -->
                <md-card class="event-information-card terms-section">
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-size-100">
                                <h4 class="title">Terms</h4>
                            </div>
                            <div class="md-layout-item md-size-50 terms-form">
                                <h5>Cancellation policy</h5>

                                <div class="notes-section">
                                    <md-field>
                                        <md-textarea rows="5" v-model="proposalRequest.cancellationPolicy"
                                                     @blur="updateProposalRequest()"></md-textarea>
                                    </md-field>
                                </div>

                            </div>
                            <div class="md-layout-item md-size-10"></div>
                            <div class="terms-form md-layout-item md-size-40">
                                <h5>Deposit Cost</h5>
                                <div class="payments-notes-fields">
                                    <md-field class="with-bg">
                                        <label></label>
                                        <span class="md-prefix">$</span>
                                        <md-input v-model="proposalRequest.depositCost" @blur="updateProposalRequest()"></md-input>
                                    </md-field>
                                </div>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
                <!-- ./More Requirements -->

                <!-- More Requirements -->
                <md-card class="event-information-card notes-section">
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-size-100">
                                <h4 class="title">Personal Message</h4>
                                <span class="text-gray">A personal message from you can increase your chances of winning.</span>
                            </div>

                            <div class="md-layout-item md-size-100">
                                <md-field>
                                    <md-textarea rows="5" v-model="proposalRequest.personalMessage"
                                                 @blur="updateProposalRequest()"></md-textarea>
                                </md-field>
                            </div>

                        </div>
                    </md-card-content>
                </md-card>

                <md-card class="event-information-card notes-section">
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-size-100">
                                <h4 class="title">About Us</h4>
                                <span class="text-gray">Let your clients know more about your business, what should they pick you? What makes your proposal unique?</span>
                            </div>

                            <div class="md-layout-item md-size-100">
                                <md-field>
                                    <md-textarea rows="5" v-model="proposalRequest.aboutUsMessage"
                                                 @blur="updateProposalRequest()"></md-textarea>
                                </md-field>
                            </div>

                        </div>
                    </md-card-content>
                </md-card>
                <!-- ./More Requirements -->

            </div>
            <div class="md-layout-item md-size-30 md-small-size-100">
                <md-card class="bid-section" style="position: fixed; width: 27%;">
                    <md-card-content>

                        <h3 class="text-center">You're the {{proposalRequest.bidderRank | numeral('Oo')}} bidder</h3>
                        <p class="text-center">Consider former proposals before placing your bid</p>

                        <div class="cost-average">
                            <div class="cost-average_item">
                                <h5 class="">Lowest</h5>
                                <div class="cost">${{proposalRequest.bidRange.low | numeral('0,0')}}</div>
                            </div>
                            <div class="cost-average_item arrow-item">
                                <md-icon>arrow_right_alt</md-icon>
                            </div>
                            <div class="cost-average_item">
                                <h5 class="">Highest</h5>
                                <div class="cost">${{proposalRequest.bidRange.high | numeral('0,0')}}</div>
                            </div>
                        </div>

                        <div class="update-checkbox">
                            <md-checkbox class="md-success" v-model="proposalRequest.updateOnOutbid"
                                         @change="updateProposalRequest()">Update me if someone outbids my offer
                            </md-checkbox>
                        </div>

                        <div class="offer-value">
                            <div class="value-section upgrades-section ">
                                <div class="title" style="text-transform: capitalize;">
                                    {{proposalRequest.requirementsCategory}}
                                </div>
                                <div class="cost text-right">${{proposalRequest.requirementsCategoryCost |
                                    numeral('0,0')}}
                                </div>
                            </div>
                            <div class="value-section upgrades-section ">
                                <div class="title" style="text-transform: capitalize;">
                                    Extra
                                </div>
                                <div class="cost text-right">${{extraTotal | numeral('0,0')}}</div>
                            </div>
                            <div class="value-section upgrades-section ">
                                <div class="title" style="text-transform: capitalize;">
                                    Deposit
                                </div>
                                <div class="cost text-right">${{proposalRequest.depositCost | numeral('0,0')}}</div>
                            </div>
                            <div class="value-section user-offer-section ">
                                <div class="title">Your Offer</div>
                                <div class="cost text-right">${{totalOffer | numeral('0,0')}}</div>
                            </div>
                        </div>

                        <div class="bid-button">
                            <md-button class="md-success" @click="updateProposalRequest(true)">
                                Submit Proposal
                            </md-button>
                        </div>

                        <div class="payment-policy text-center">
                            By submitting a proposal you agree to our <a href="https://www.262days.com/terms"
                                                                         target="_blank">Terms of Service</a> and <a
                            href="https://www.262days.com/privacy" target="_blank">Privacy Policy</a>.
                        </div>

                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    //MAIN MODULES
    import ChartComponent from '@/components/Cards/ChartComponent'
    import VueElementLoading from 'vue-element-loading'
    import ProposalRequest from '@/models/ProposalRequest'
    import ProposalRequestComment from '@/models/ProposalRequestComment'
    import ProposalRequestImage from '@/models/ProposalRequestImage'

    //COMPONENTS
    import Icon from '@/components/Icon/Icon.vue'
    import {Collapse, LabelEdit} from '@/components'

    import moment from 'moment'

    export default {
        components: {
            VueElementLoading,
            Icon,
            Collapse,
            LabelEdit
        },

        data () {
            return {
                // auth: auth,
                calendarEvent: {},
                isLoading: false,
                readonly: true,
                isMobile: window.innerWidth <= 500 ? true : false,
                dietaryList: [
                    {
                        id: 1,
                        title: 'Kosher',
                        meals: 4,
                        included_in_price: true,
                        available: false,
                        comments: []
                    },
                    {
                        id: 2,
                        title: 'Vegan',
                        meals: 12,
                        included_in_price: true,
                        available: false,
                        comments: []
                    },
                    {
                        id: 3,
                        title: 'Vegetarian',
                        meals: 5,
                        included_in_price: true,
                        available: false,
                        comments: []
                    }
                ],
                available_to_deliver: true,
                mustHaveList: [
                    {
                        id: 1,
                        title: 'Event Coordinator',
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. minim veniam, quis nostrud exercitation ullamco laboris',
                        included_in_price: true,
                        available: false,
                        comments: []
                    },
                    {
                        id: 2,
                        title: 'Main Venue',
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. minim veniam, quis nostrud exercitation ullamco laboris',
                        included_in_price: true,
                        available: false,
                        comments: []
                    },
                    {
                        id: 3,
                        title: 'Transportation',
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. minim veniam, quis nostrud exercitation ullamco laboris',
                        included_in_price: true,
                        available: false,
                        comments: []
                    }
                ],
                moreList: [
                    {
                        id: 1,
                        title: 'Waiters',
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. minim veniam, quis nostrud exercitation ullamco laboris',
                        included_in_price: true,
                        available: false,
                        comments: []
                    },
                    {
                        id: 2,
                        title: 'Main Chef',
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. minim veniam, quis nostrud exercitation ullamco laboris',
                        included_in_price: true,
                        available: false,
                        comments: []
                    },
                    {
                        id: 3,
                        title: 'Food Menu',
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. minim veniam, quis nostrud exercitation ullamco laboris',
                        included_in_price: true,
                        available: false,
                        comments: []
                    }
                ],
                vendorImages: [],
                serverUrl: process.env.SERVER_URL,
                imagePreview: null,
                proposalRequest: null,
                proposalRequestRequirements: [],
                proposalRequestImages: [],
                alretExceedPictureSize: false,
                proposalRequestComment: ''
            }
        },
        created () {

            ProposalRequest.find(this.$route.params.id)
                .then(resp => {
                    this.$set(this, 'proposalRequest', resp)

                    this.proposalRequestRequirements = _.chain(resp.requirements).groupBy('requirementPriority').map(function (value, key) {

                        return {
                            title: key,
                            requirements: value
                        }

                    })
                        .value()

                    console.log(this.proposalRequest)

                })
                .catch(error => {
                    console.log(' error here   -->>>  ', error)
                })

            this.getImages()

            // ProposalRequestComment.find(this.$route.params.id)
            //     .then(resp => {
            //         console.log(' Response2   -->>>  ',resp);
            //     })
            //     .catch(error=>{
            //         console.log(error);
            //     })

        },
        mounted () {

            this.$notify(
                {
                    message: "You've submitted the proposal successfully",
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                    type: 'success'
                })

        },
        methods: {

            requirementCostChanges (val, index) {

            },
            getEventDate (eventStartMillis) {
                let x = new Date(eventStartMillis)
                return moment(x).format('MMMM D, YYYY')
            },
            getEventTime (eventStartMillis) {
                let x = new Date(eventStartMillis)
                return moment(x).format('hh:mm A')
            },
            getEventDuration (eventStartMillis, eventEndMillis) {
                return moment.duration(eventEndMillis - eventStartMillis).humanize()

            },
            uploadEventImage (imageId = null) {
                this.selectedImage = typeof imageId != 'object' ? imageId : null
                this.$refs.eventFile.click()
            },

            onEventFilePicked (event) {
                let file = event.target.files || event.dataTransfer.files
                if (!file.length) {
                    return
                }

                if (file[0].size <= 5000000) { // 5mb

                    this.createImage(file[0])

                } else {

                    this.alretExceedPictureSize = true
                    this.$notify(
                        {
                            message: 'You\'ve Uploaded an Image that Exceed the allowed size, try small one!',
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'warning'
                        })

                }

            },
            createImage (file, type) {
                let reader = new FileReader()
                let vm = this

                this.isLoading = true

                reader.onload = e => {

                    const proposalRequest = new ProposalRequest({id: this.proposalRequest.id})

                    return new ProposalRequestImage({vendorProposalFile: e.target.result}).for(proposalRequest).save().then(result => {
                        this.isLoading = false
                        this.proposalRequestImages.push({id: result.id})

                    })
                        .catch((error) => {
                            this.isLoading = false
                            console.log('Error')
                            console.log(error)
                        })
                }
                reader.readAsDataURL(file)
            },


            uploadInsurancePapers (imageId = null) {
                this.selectedImage = typeof imageId != 'object' ? imageId : null
                this.$refs.InsurancePapers.click()
            },
            onInsurancePapersPicked (event) {
                let file = event.target.files || event.dataTransfer.files
                if (!file.length) {
                    return
                }

                if (file[0].size <= 5000000) { // 5mb

                    this.createInsurancePapers(file[0])

                } else {

                    this.alretExceedPictureSize = true
                    this.$notify(
                        {
                            message: 'You\'ve Uploaded an Image that Exceed the allowed size, try small one!',
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'warning'
                        })

                }
            },
            createInsurancePapers (file, type) {
                let reader = new FileReader()
                let vm = this

                //this.isLoading = true

                reader.onload = e => {

                    let  proposalRequest = new ProposalRequest({id: vm.$route.params.id})

                    proposalRequest.id = this.proposalRequest.id;
                    proposalRequest.insuranceDocument = e.target.result;

                    return proposalRequest.save()
                        .then(res => {
                            console.log('saved ', res)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
                reader.readAsDataURL(file)
            },

            uploadLicense (imageId = null) {
                this.selectedImage = typeof imageId != 'object' ? imageId : null
                this.$refs.license.click()
            },
            onLicensePicked (event) {
                let file = event.target.files || event.dataTransfer.files
                if (!file.length) {
                    return
                }

                if (file[0].size <= 5000000) { // 5mb

                    this.createLicense(file[0])

                } else {

                    this.alretExceedPictureSize = true
                    this.$notify(
                        {
                            message: 'You\'ve Uploaded an Image that Exceed the allowed size, try small one!',
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'warning'
                        })

                }
            },
            createLicense (file, type) {
                let reader = new FileReader()
                let vm = this

                //this.isLoading = true

                reader.onload = e => {

                    console.log('createLicense');

                    let  proposalRequest = new ProposalRequest({id: vm.$route.params.id})

                    proposalRequest.id = this.proposalRequest.id;
                    proposalRequest.licenseDocument = e.target.result;

                    return proposalRequest.save()
                        .then(res => {

                            console.log('saved ', res)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
                reader.readAsDataURL(file)
            },



            getImages () {

                const proposalRequest = new ProposalRequest({id: this.$route.params.id})

                new ProposalRequestImage().for(proposalRequest).get()
                    .then(imagesList => {
                        this.$set(this, 'proposalRequestImages', imagesList)
                        console.log('proposalRequestImages => ', imagesList)
                    })
                    .catch((error) => {
                        console.log(' ProposalRequestImage Error')

                        console.log(error)
                    })
            },
            deleteImage (imageId, index) {
                const proposalRequest = new ProposalRequest({id: this.$route.params.id})

                this.isLoading = true

                return new ProposalRequestImage({id: imageId}).for(proposalRequest).delete().then(result => {

                    this.proposalRequestImages.splice(index, 1)
                    this.isLoading = false
                })
                    .catch((error) => {
                        this.isLoading = false

                        console.log(error)
                    })

            },
            updateProposalComment () {
                const proposalRequest = new ProposalRequest({id: this.$route.params.id})
                let dataToSend = {
                    from: 'string',
                    commentText: this.proposalRequestComment
                }

                return new ProposalRequestComment(dataToSend)
                    .for(proposalRequest).save()
                    .then(result => {
                        console.log(result)
                    })
                    .catch((error) => {
                        this.isLoading = false

                        console.log(error)
                    })

            },
            updateProposalRequest (submitted = null) {
                let proposalRequest = new ProposalRequest({id: this.$route.params.id});
                let _self = this;

                if ( submitted ) {
                    _self.isLoading = true;
                }


                proposalRequest.id = this.proposalRequest.id
                proposalRequest.requirementsCategoryCost = this.proposalRequest.requirementsCategoryCost
                proposalRequest.attachments = this.proposalRequest.attachments
                proposalRequest.eventData = this.proposalRequest.eventData
                proposalRequest.insuranceDocument = this.proposalRequest.insuranceDocument
                proposalRequest.licenseDocument = this.proposalRequest.licenseDocument
                proposalRequest.nudgeCount = this.proposalRequest.nudgeCount
                proposalRequest.requirements = this.proposalRequest.requirements
                proposalRequest.requirementsCategory = this.proposalRequest.requirementsCategory
                proposalRequest.requirementsCategoryCost = this.proposalRequest.requirementsCategoryCost
                proposalRequest.submitted = submitted ? submitted : false
                proposalRequest.personalMessage = this.proposalRequest.personalMessage
                proposalRequest.aboutUsMessage = this.proposalRequest.aboutUsMessage
                proposalRequest.updateOnOutbid = this.proposalRequest.updateOnOutbid
                proposalRequest.cancellationPolicy = this.proposalRequest.cancellationPolicy
                proposalRequest.depositCost = this.proposalRequest.depositCost

                proposalRequest.save()
                    .then(res => {

                        console.log('saved ', res)

                        if ( submitted ) {

                            _self.$notify(
                                {
                                    message: "You've submitted the proposal successfully",
                                    horizontalAlign: 'center',
                                    verticalAlign: 'top',
                                    type: 'success'
                                })

                            _self.isLoading = false;

                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        computed: {
            totalOffer () {
                let total = parseInt(this.proposalRequest.requirementsCategoryCost) + parseInt(this.proposalRequest.depositCost);

                this.proposalRequest.requirements.map(function (item) {

                    if (item.price) {
                        total += parseInt(item.price)
                    }

                })
                return total
            },
            extraTotal () {
                let total = 0
                this.proposalRequest.requirements.map(function (item) {

                    if (item.price) {
                        total += parseInt(item.price)
                    }

                })
                return total
            }
        }
    }
</script>
