<template>
  <div class="for-proposal-wrapper">
    <div class="md-layout justify-content-between">
      <div class="md-layout-item md-size-70">
        <proposal-steps 
          :categoryTitle="vendor.vendorCategory"
          :step="step"
        />
        <div class="step-wrapper" v-if="step < 2">
          <div class="proposal-add-personal-message-wrapper">
            <h3><img :src="`${iconUrl}Asset 611.svg`"/>Let's begin with a personal message</h3>
            <h4>
              Write something nice, we'll add it to the final proposal
            </h4>
            <textarea 
              rows="8" 
              placeholder="Type your message here" 
              v-model="proposalRequest.personalMessage"
              v-if="proposalRequest"
              @blur="updateProposalRequest()"
            />
            <span>Sincerely,</span>
            <p>Relish caterers & venues</p>
          </div>
          <proposal-item
            :category="`Venue Rental`"
            :services="servicesByCategory('venuerental')"
            :subTitle="`For Whole Event`"
            :img="`${iconUrl}Asset 614.svg`"
            :proposalRequest="proposalRequest"
            :step="step"
          />
        </div>
        <div class="step-wrapper" v-if="step == 2">
          <h3>
            Can you also provide these services for this event?
          </h3>
          <p>
            <img :src="`${iconUrl}Group 5280 (5).svg`"/>Did you know? Adding vendors gets your fair commission if they get picked!
          </p>
          <proposal-item
            :category="`Food & Beverage`"
            :services="servicesByCategory('foodandbeverage')"
            :isCollapsed="true"
            :isDropdown="true"
            :proposalRange="true"
            :img="getIconUrlByCategory('foodandbeverage')"
            :proposalRequest="proposalRequest"
            :step="step"
          />
          <proposal-item
            :category="`Design and Decor`"
            :services="servicesByCategory('decor')"
            :isCollapsed="true"
            :isDropdown="true"
            :proposalRange="true"
            :img="getIconUrlByCategory('decor')"
            :proposalRequest="proposalRequest"
            :step="step"
          />
          <proposal-item
            :category="`Guest Services & Staffing`"
            :services="servicesByCategory('corporatesocialresponsibility')"
            :isCollapsed="true"
            :isDropdown="true"
            :proposalRange="true"
            :img="getIconUrlByCategory('corporatesocialresponsibility')"
            :proposalRequest="proposalRequest"
            :step="step"
          />
          <refer-new-vendor/>
        </div>
        <div class="step-wrapper" v-if="step == 3">
          <proposal-event-summary
            :title="`Event Information & Details`"
            :eventData="event"
            :isEdit="false" 
            :iconUrl="iconUrl"
            :personalMessage="proposalRequest.personalMessage"
            :proposalRequest="proposalRequest"
            :services="services"
          />
        </div>
      </div>
      <div class="md-layout-item md-size-30 pos-relative">
        <proposal-budget-summary
          :bundleDiscount="true"
          :warning="true"
          :additional="true"
          :isEdit="true"
          :step="step"
          :proposalRequest="proposalRequest"
          :services="services"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import VendorService from '@/services/vendor.service'
import Vendors from '@/models/Vendors'
import ProposalRequest from '@/models/ProposalRequest'

//COMPONENTS
import Icon from '@/components/Icon/Icon.vue'
import ProposalBudgetSummary from './components/ProposalBudgetSummary.vue'
import ProposalSteps from './components/ProposalSteps.vue'
import ProposalItem from './components/ProposalItem.vue'
import ProposalAddFiles from './components/ProposalAddFiles.vue'
import ProposalTitleWithIcon from './components/ProposalTitleWithIcon.vue'
import ReferNewVendor from './components/ReferNewVendor.vue'
import ProposalEventSummary from './components/ProposalEventSummary.vue'

export default {
  components: {
    ProposalBudgetSummary,
    ProposalItem,
    ProposalSteps,
    ProposalAddFiles,
    ProposalTitleWithIcon,
    ProposalEventSummary,
    ReferNewVendor
  },
  data() {
    return {
      step: 0,
      proposalRequest: null,
      iconUrl: 'http://static.maryoku.com/storage/icons/NewSubmitPorposal/',
      services: null,
      iconsWithCategory: null,
      vendor: null,
    }
  },
  created() {
    
  },
  mounted () {
    this.services = VendorService.businessCategories()
    this.iconsWithCategory = VendorService.categoryNameWithIcons()

    this.step = 0
    this.event = {
      name: "March Madness event",
      date: "December 25, 2019",
      arrival_time: "11:00AM"
    }
    this.$root.$on('next-step-vendor-proposal', () => {
      console.log('next')

      if (this.step == 0) {
        this.step = 2
      } else if (this.step > -1 && this.step < 3) {
        this.step++
      }

      console.log('wrapperStep', this.step)
    })
    this.$root.$on('prev-step-vendor-proposal', () => {
      console.log('prev')

      if (this.step == 2) {
        this.step = 0
      } else if (this.step > 0) {
        this.step--
      } else {
        this.$router.push(`/vendors/${this.vendor.id}/proposal-request/${this.proposalRequest.id}`)
        this.$root.$emit('back-proposal-landing-page')
      }
      console.log('wrapperStep', this.step)
    })

    this.getVendor()
    this.getProposal(this.$route.params.id)
  },
  methods: {
    getVendor () {
      Vendors.find(this.$route.params.vendorId).then(vendor => {
        this.vendor = vendor
      })
    },
    getProposal (id) {
      ProposalRequest.find(id)
        .then(resp => {
          console.log('ProposalRequest:', resp)
          this.$set(this, 'proposalRequest', resp)

          this.proposalRequestRequirements = _.chain(resp.requirements)
            .groupBy('requirementPriority')
            .map(function (value, key) {
              return {
                title: key,
                requirements: value
              }
            })
            .value()
        })
        .catch(error => {
          console.log(' error ', error)
        })
      
      if (!this.proposalRequest) {
        this.proposalRequest = new ProposalRequest({id: this.$route.params.id})
        this.proposalRequest.bidRange = {low: 0, high: 0}
        this.proposalRequest.requirements = []
        this.proposalRequest.bidderRank = 1
        this.proposalRequest.eventData = {
          allocatedBudget: 0,
        }
      }
    },
    flatDeep(arr, d = 1) {
      return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? this.flatDeep(val, d - 1) : val), [])
                    : arr.slice();
    },
    servicesByCategory(category) {
      const services = this.services.filter( s => s.name == category)

      if (services.length > 0) {
        return this.flatDeep(
          services[0].categories.map(
            s => s.subCategories.map(
              sc => sc.items.map(dd => dd.name
            )
          )), Infinity
        )
      } else {
        return []
      }
    },
    getIconUrlByCategory(category) {
      return `http://static.maryoku.com/storage/icons/Budget Elements/${this.iconsWithCategory.filter( c => c.value == category)[0].icon}`
    },
    updateProposalRequest (submitted = null) {
      console.log(this.proposalRequest)
      if (this.proposalRequest.submitted) return

      // let proposalRequest = new ProposalRequest({ id: this.$route.params.id })
      // let _self = this

      // if (submitted != null && submitted === true) {
      //   _self.isLoading = true
      // }

      // proposalRequest.id = this.proposalRequest.id
      // proposalRequest.attachments = this.proposalRequest.attachments
      // proposalRequest.eventData = this.proposalRequest.eventData
      // proposalRequest.insuranceDocument = this.proposalRequest.insuranceDocument
      // proposalRequest.licenseDocument = this.proposalRequest.licenseDocument
      // proposalRequest.nudgeCount = this.proposalRequest.nudgeCount
      // proposalRequest.requirements = this.proposalRequest.requirements
      // proposalRequest.requirementsCategory = this.proposalRequest.requirementsCategory
      // proposalRequest.requirementsCategoryCost = this.proposalRequest.requirementsCategoryCost
      // if (!this.proposalRequest.submitted) {
      //   proposalRequest.submitted = submitted || false
      // }
      // proposalRequest.personalMessage = this.proposalRequest.personalMessage
      // proposalRequest.aboutUsMessage = this.proposalRequest.aboutUsMessage
      // proposalRequest.updateOnOutbid = this.proposalRequest.updateOnOutbid
      // proposalRequest.cancellationPolicy = this.proposalRequest.cancellationPolicy
      // proposalRequest.depositCost = this.proposalRequest.depositCost
      // proposalRequest.bid = this.totalOffer

      // proposalRequest
      //   .save()
      //   .then(res => {
      //     console.log('saved ', res)

      //     if (submitted != null && submitted === true) {
      //       swal({
      //         title: 'Proposal Submitted',
      //         text: 'Thank you for submitting your proposal.',
      //         type: 'success',
      //         timer: 2000
      //       }).then(result => {
      //         document.location.reload()
      //       })

      //       _self.isLoading = false
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },
  },
  computed: {
  },
  watch: {
  },
  filters: {
  },
};
</script>
<style lang="scss" scoped>
  .for-proposal-wrapper {
    background-color: #f5f5f5;
    padding: 64px 45px;
    color: #050505;

    .step-wrapper {
      .proposal-add-personal-message-wrapper {
        border-radius: 3px;
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        background-color: #ffffff;
        margin-top: 50px;
        padding: 40px 40px 40px 34px;
        font-family: 'Manrope-Regular', sans-serif;
        color: #050505;
      
        h3 {
          font-weight: 800;
          font-size: 30px;
          margin: 0 0 35px 0!important;

          img {
            width: 26px;
            margin-right: 15px;
          }
        }

        h4 {
          font-size: 16px;
          font-weight: 800;
          margin: 0;
          margin-bottom: 12px;
        }

        textarea {
          width: 100%;
          resize: none;
          font-size: 16px;
          border-radius: 3px;
          border: solid 0.5px #707070;
          padding: 21px 18px;
          margin-bottom: 15px;
        }
        span {
          font-size: 14px;
        }
        p {
          font-size: 14px;
          font-weight: 800;
          text-decoration: underline;
          margin: 0;
        }
      }
      h3 {
        font-size: 30px;
        font-weight: 800;
        margin-top: 3em;
        margin-bottom: 0.5em;
      }
      p {
        font-size: 14px;
        font-weight: normal;
        margin: 0;

        img {
          width: 27px;
          margin-right: 15px;
        }
      }
    }
    .pos-relative {
      position: relative;
    }
  }
</style>
