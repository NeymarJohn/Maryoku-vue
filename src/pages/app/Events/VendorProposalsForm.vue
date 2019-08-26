<template>
    <div class="md-layout" >
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
        <div class="md-layout vendor-proposals" v-if="proposalRequest">
            <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; height: 100%; width: 100%; background-color: rgba(0,0,0,0); z-index: 9998;" v-if="proposalRequest.submitted"></div>
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
                <div class="alert alert-danger text-center" v-if="proposalRequest.submitted">
                    <h5 class="text-center clear-margins" style="z-index: 9999;">You already submitted this proposal, you cannot change it anymore.</h5>
                </div>
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
                                                <div class="text-gray">{{item.requirementComment}}</div>
                                            </blockquote>
                                            <blockquote v-else
                                                        style="background-color: #EEEEEE; border-left: 2px solid #aaaaaa; padding: 8px; margin-left: 0;">
                                                <span>Client requirement</span>
                                                <div class="text-gray">{{item.requirementComment}}</div>
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
                                        <div class="actions-list md-layout-item md-size-100 md-small-size-100" style="display: flex; justify-content: space-between;">
                                            <md-field>
                                                <label>Amount</label>
                                                <md-input type="number" v-model="item.requirementValue"
                                                          @blur="updateProposalRequest"></md-input>
                                            </md-field>
                                            <md-button class="md-success md-simple" v-if="!item.itemNotAvailable" @click="item.itemNotAvailable = !item.itemNotAvailable; updateProposalRequest();">
                                                <md-icon>check</md-icon>
                                                Mark as available
                                            </md-button>
                                            <md-button class="md-rose md-simple" v-if="item.itemNotAvailable" @click="item.itemNotAvailable = !item.itemNotAvailable; updateProposalRequest();">
                                                <md-icon>block</md-icon>
                                                Mark as not available
                                            </md-button>
                                            <md-button class="md-primary md-simple" v-if="!(item.comments && item.comments.length)"
                                                       @click="item.showCommentForm =  true; item.addedComment = false; $forceUpdate();">
                                                <md-icon>comment</md-icon>
                                                Add Comment
                                            </md-button>
                                            <div class="requirement-comment" v-if="item.comments && item.comments.length ">
                                                <md-icon>comment</md-icon>
                                                <label-edit :text="item.comments[0].commentText"
                                                            :field-name="item"
                                                            @text-updated-blur="setRequirementComment"
                                                            @text-updated-enter="setRequirementComment"></label-edit>
                                            </div>

                                            <template v-if="item.showCommentForm">
                                                <md-field class="full-width bordered-field">
                                                    <md-input v-model="item.tempComment" placeholder="Add your comment here, event producers can see these comments."
                                                              @keypress.enter="setRequirementComment(item.tempComment, item)" @blur="setRequirementComment(item.tempComment, item)"></md-input>
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

                            <h4  class="title" style="margin-bottom: 12px;">Proposal Attachments</h4>
                            <div class="md-layout">
                                <div class="md-layout-item md-size-20" v-for="(image,index) in proposalRequestImages" :key="index"  style="margin: 12px; " >
                                    <vue-element-loading :active="attachmentsLoadingCount > 0" spinner="ring" color="#FF547C"></vue-element-loading>
                                    <iframe seamless class="vendor-images-list_item" frameborder="0" @load="attachmentsLoadingCount--"
                                            :src="`${serverUrl}/1/proposal-requests/${proposalRequest.id}/files/${image.id}`" style="max-height: 18vmin;width: 100vw;">
                                        <md-button class="md-primary md-sm" @click="deleteImage(image.id,index)">
                                            delete
                                        </md-button>
                                    </iframe>
                                    <div class="text-center">
                                        <md-button style="margin-top: -25px;" class="md-xs md-round md-just-icon md-info" @click="openInNewTab(`${serverUrl}/1/proposal-requests/${proposalRequest.id}/files/${image.id}`)"><md-icon>visibility</md-icon></md-button>
                                        <md-button style="margin-top: -25px;" class="md-xs md-round md-just-icon md-danger" @click="deleteImage(image.id,index)"><md-icon>delete</md-icon></md-button>
                                    </div>
                                </div>

                                <div class="md-layout-item md-size-20" style="margin-top: auto; margin-bottom: auto; text-align: center;">
                                    <md-button class="md-primary md-sm md-just-icon md-round add-vendor-image"
                                               @click="uploadEventImage" style="margin-top: auto; margin-bottom: auto; text-align: center;">
                                        <md-icon>add</md-icon>
                                    </md-button>
                                    <input type="file" style="display: none;" ref="eventFile"
                                           accept="image/gif, image/jpg, image/png, application/text, application/pdf" @change="onEventFilePicked">
                                </div>
                            </div>

                            <h5  class="title" style="margin-bottom: 12px;">Additional documentation</h5>

                            <div class="">
                                <md-button class="md-primary md-sm add-vendor-image"
                                           @click="uploadEventImage">
                                    <md-icon>add</md-icon> Proof of Insurance
                                </md-button>

                                <md-button class="md-primary md-sm add-vendor-image"
                                           @click="uploadEventImage">
                                    <md-icon>add</md-icon> Liquor License
                                </md-button>

                                <md-button class="md-primary md-sm add-vendor-image"
                                           @click="uploadEventImage">
                                    <md-icon>add</md-icon> Caterer License
                                </md-button>
                            </div>
                            <!--<div class="md-layout">
                                <div class="md-layout-item md-size-100">
                                    <h4 class="title">Add Images</h4>
                                </div>
                            </div>
                            <div class="md-layout">
                                &lt;!&ndash; List Vendor Images &ndash;&gt;
                                <div class="vendor-images-list">
                                    <div class="vendor-images-list_item"
                                         v-for="(image,index) in proposalRequestImages" :key="index"
                                         :style="`background : url(${serverUrl}/1/proposal-requests/${proposalRequest.id}/images/${image.id}) center center no-repeat`"
                                    >
                                        <md-button class="md-primary md-sm" @click="deleteImage(image.id,index)">
                                            delete
                                        </md-button>
                                    </div>

                                    <iframe class="vendor-images-list_item" frameborder="0"
                                         v-for="(image,index) in proposalRequestImages" :key="index"
                                            :src="`${serverUrl}/1/proposal-requests/${proposalRequest.id}/images/${image.id}`"
                                    >
                                        <md-button class="md-primary md-sm" @click="deleteImage(image.id,index)">
                                            delete
                                        </md-button>
                                    </iframe>

                                    <md-button class="md-primary md-sm md-just-icon md-round add-vendor-image"
                                               @click="uploadEventImage">
                                        <md-icon>add</md-icon>
                                    </md-button>
                                    <input type="file" style="display: none;" ref="eventFile"
                                           accept="image/gif, image/jpg, image/png" @change="onEventFilePicked">
                                </div>
                                &lt;!&ndash; ./List Vendor Images &ndash;&gt;
                            </div>-->
                        </md-card-content>

                    </md-card>
                    <!-- ./Vendor images -->

                    <!-- Vendor images -->
                    <!--<md-card class="event-information-card vendor-attachments">

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

                    </md-card>-->
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

                        <div class="text-center">
                            <h5 class="clear-margins">Budget</h5>
                            <span class="text-gray">${{proposalRequest.bidRange.low}} - ${{proposalRequest.bidRange.high}}</span>
                        </div>

                        <div class="cost-average" v-if="proposalRequest.bidderRank > 1">
                            <div class="text-center small">Consider former proposals before placing your bid</div>
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
                            <div class="value-section user-offer-section ">
                                <div class="title">Your Offer</div>
                                <div class="cost text-right">${{totalOffer | numeral('0,0')}}</div>
                            </div>
                        </div>

                        <div class="bid-button">
                            <md-button class="md-success" @click="updateProposalRequest(true)" v-if="!proposalRequest.submitted">
                                Submit Proposal
                            </md-button>
                            <h6 class="text-primary text-center" v-else>Submitted {{dateSubmitted(proposalRequest)}}</h6>
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
  import ProposalRequestFile from '@/models/ProposalRequestFile'

  //COMPONENTS
  import Icon from '@/components/Icon/Icon.vue'
  import {Collapse, LabelEdit} from '@/components'

  import moment from 'moment'
  import swal from "sweetalert2";
  import ProposalRequestRequirement from '../../../models/ProposalRequestRequirement'

  export default {
    props: ['proposalRequestRequirements', 'proposalRequest'],
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
        available_to_deliver: true,
        vendorImages: [],
        serverUrl: process.env.SERVER_URL,
        imagePreview: null,
        // proposalRequest: null,
        // proposalRequestRequirements: [],
        proposalRequestImages: [],
        alretExceedPictureSize: false,
        proposalRequestComment: '',
        attachmentsLoadingCount: 0,
      }
    },
    created () {

    },
    mounted () {

      // this.isLoading = true;
      // ProposalRequest.find(this.$route.params.id)
      //   .then(resp => {
      //     this.$set(this, 'proposalRequest', resp)

      //     this.proposalRequestRequirements = _.chain(resp.requirements).groupBy('requirementPriority').map(function (value, key) {

      //       return {
      //         title: key,
      //         requirements: value
      //       }

      //     })
      //       .value();

      //     console.log(this.proposalRequest);
      //     this.isLoading = false;
      //   })
      //   .catch(error => {
      //     console.log(' error here   -->>>  ', error)
      //   })

      this.getImages();

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

        if (file[0].size <= 50000000) { // 5mb

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

          /*proposalRequest.id = this.proposalRequest.id;
          proposalRequest.insuranceDocument = e.target.result;*/

          return new ProposalRequestFile({vendorProposalFile: e.target.result, tag: 'insurance'}).for(proposalRequest).save().then(result => {
            this.isLoading = false
          })
            .catch((error) => {
              this.isLoading = false
              console.log('Error')
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
            this.$set(this, 'attachmentsLoadingCount', imagesList.length)
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
      updateProposalRequirementComment (val, index) {
        const proposalRequest = new ProposalRequest({id: this.$route.params.id})
        let dataToSend = {
          from: 'string',
          commentText: val
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
        if (this.proposalRequest.submitted) return;

        let proposalRequest = new ProposalRequest({id: this.$route.params.id});
        let _self = this;

        if ( submitted != null && submitted === true) {
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
        if (!this.proposalRequest.submitted){
          proposalRequest.submitted = submitted ? submitted : false
        }
        proposalRequest.personalMessage = this.proposalRequest.personalMessage
        proposalRequest.aboutUsMessage = this.proposalRequest.aboutUsMessage
        proposalRequest.updateOnOutbid = this.proposalRequest.updateOnOutbid
        proposalRequest.cancellationPolicy = this.proposalRequest.cancellationPolicy
        proposalRequest.depositCost = this.proposalRequest.depositCost
        proposalRequest.bid = this.totalOffer;

        proposalRequest.save()
          .then(res => {

            console.log('saved ', res)

            if ( submitted != null && submitted === true ) {

              swal({
                title: "Proposal Submitted",
                text: "Thank you for submitting your proposal.",
                type: "success",
                timer: 2000
              }).then( result => {
                document.location.reload();
              });

              _self.isLoading = false;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      openInNewTab(url){
        window.open(url, '_blank');
      },
      dateSubmitted(proposalRequest){
        return moment(proposalRequest.lastUpdated).fromNow();
      },
      setRequirementComment(val, item){
        console.log(`Setting comment ${val} to requirement id: ${item.id}`);
        item.showCommentForm =  false;
        item.addedComment = true;
        this.$forceUpdate();

        let comment = {commentText: val};

        if (item.comments && item.comments.length){
          comment = {id: item.comments[0].id,commentText: val, from: item.vendorId, threadId: this.proposalRequest.id};
        } else { // New Comment
          comment = {commentText: val, from: item.vendorId, threadId: this.proposalRequest.id};
        }

        new ProposalRequestComment(comment)
          .for(new ProposalRequest({id: this.proposalRequest.id}), new ProposalRequestRequirement({id: item.id}))
          .save().then(res=>{
          comment.id = res.item.id;
          item.comments = [comment];
        });
      }
    },
    computed: {
      totalOffer () {
        let total = parseInt(this.proposalRequest.requirementsCategoryCost);
          let vm = this;

        this.proposalRequest.requirements.map(function (item) {

            if (item.price) {
                if ( item.priceUnit === "total") {
                    total += parseInt(item.price)
                } else {
                    total += parseInt(item.price) * parseInt(vm.proposalRequest.eventData.numberOfParticipants)
                }
            }

        })
        return total
      },
      extraTotal () {
        let total = 0
          let vm = this;
        this.proposalRequest.requirements.map(function (item) {

            console.log(item);

          if (item.price) {
              if ( item.priceUnit === "total") {
                  total += parseInt(item.price)
              } else {
                  total += parseInt(item.price) * parseInt(vm.proposalRequest.eventData.numberOfParticipants)
              }
          }

        })
          this.$forceUpdate();
        return total
      }
    }
  }
</script>
