<template>
  <div class="for-vendor-wrapper">
    <h4>
      So what are the details?
    </h4>
    <div class="main-cont">
      <div class="one-row">
        <div class="left-side">
          <h3>march madness</h3>
          <h4>a microsoft marketing event</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            <br/>
            <br/>
          </p>
        </div>
        <div class="right-side">
          <div class="summary-cont">
            <ul>
              <li><img :src="`${iconsUrl}Path 251.svg`"> <strong>Date:</strong>{{ eventDate }}</li>
              <li><img :src="`${iconsUrl}Group 6085.svg`"> <strong>Time:</strong>{{ eventTime }}</li>
              <li><img :src="`${iconsUrl}Asset 506.svg`"> <strong>Address:</strong><span>{{ getLocation }}</span></li>
              <li><img :src="`${iconsUrl}Asset 505.svg`"> <strong>Guests:</strong>{{ proposalRequest ? proposalRequest.eventData.numberOfParticipants : '-' | withComma }}</li>
              <li><img :src="`${iconsUrl}Path 1942.svg`"> <strong>Type:</strong>{{ proposalRequest ? proposalRequest.eventData.occasion : '-'}}</li>
              <li><img :src="`${iconsUrl}Path 1383.svg`"> <strong>Invited:</strong>{{ proposalRequest ? proposalRequest.eventData.participantsType : '-'}}</li>
              <li>
                <div class="new-time">
                  Already Booked? <a @click="showChooseDateModal()">Suggest New time</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr/>
      <vendor-budget-list
        :title="`Budget`"
        :description="`Usually budget is flexible and could chane accordig to needs`"
        :category="proposalRequest ? proposalRequest.requirementsCategory : 'No Proposal Data'"
        :categoryCost="proposalRequest ? proposalRequest.requirementsCategoryCost : 0"
        :total="proposalRequest ? proposalRequest.depositCost : 0"
      ></vendor-budget-list>
    </div>
    <div class="rank-cont">
      <h3>
        Would you like to submit your bid?
      </h3>
      <md-checkbox class="check-condition" v-model="isAgree">
        <span class="regular" @mouseover="conditionTooltip=true" @mouseleave="conditionTooltip=false">
          I accept <span class="condition">Maryoku's Terms & Conditions</span>
        </span>
      </md-checkbox>
      <div class="condition-tooltip" v-if="conditionTooltip">
        <img :src="`${iconsUrl}Group 1175 (10).svg`"> Please indicate that you accept the Terms & Conditions
      </div>
    </div>
    <div class="action-cont">
      <button class="no" @click="showNotBiddingModal">
        Thank You, But No.
      </button>
      <button class="no no-border" @click="showReferModal">
        Refer Another Vendor 
        <div class="refer-tooltip" v-if="referTooltip">
          <h5>Refer a new vendor <br/>and get a commission!</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
        </div>
        <img 
          :src="`${iconsUrl}Group 5522.svg`" 
          @mouseover="referTooltip=true"
          @mouseleave="referTooltip=false"
        >
      </button>
      <div class="with-description">
        <p>
          You're the {{proposalRequest ? proposalRequest.bidderRank : '1' | numeral('Oo')}} catering & venue bidder
        </p>

        <button class="yes" @click="goTo(`/vendors/${vendor.id}/proposal-request/${proposalRequest.id}/form`)">
          Submit Proposal
        </button>
      </div>
    </div>
    <modal v-if="referModal" class="refer-vendor-modal" container-class="modal-container sl">
      <template slot="header">
        <div class="refer-vendor-modal__header">
          <h3>Refer a vendor</h3>
          <div class="header-description">
            <p>
              Add the vendor's info
            </p>
          </div>
        </div>
        <button class="close" @click="hideModal()">
          <img :src="`${iconsUrl}Group 3602.svg`"/>
        </button>
      </template>
      <template slot="body">
        <div class="refer-vendor-modal__body">
          <input-proposal-sub-item
            :title="`Vendor's Name`"
            :placeholder="`Type vendor's name here`"
            :style="`width: 100%`"
          />
          <input-proposal-sub-item
            :title="`Category`"
            :placeholder="``"
            :style="`width: 100%`"
            :img="`http://static.maryoku.com/storage/icons/NewSubmitPorposal/Component 36 (2).svg`"
            :items="categories"
          />
          <input-proposal-sub-item
            :title="`Email`"
            :placeholder="`Type your email address here`"
            :style="`width: 100%`"
            :img="`${iconsUrl}Asset 499.svg`"
          />
          <input-proposal-sub-item
            :title="`Link to Website`"
            :placeholder="`Paste link here`"
            :style="`width: 100%`"
            :img="`${iconsUrl}Asset 498.svg`"
          />
        </div>
      </template>
      <template slot="footer">
        <div class="refer-vendor-modal__footer">
          <a class="cancel" @click="hideModal()">Cancel</a>
          <a class="cool" @click="hideModal()">Refer</a>
        </div>
      </template>
    </modal>
    <modal v-if="notBiddingModal" class="not-bidding-modal" container-class="modal-container lg">
      <template slot="header">
        <div class="not-bidding-modal__header">
          <h3>
            <strong>We are sorry to hear you're not bidding,</strong><br/>
            and would love to know, <strong>what's the reason?</strong>
          </h3>
          <div class="header-description">
            You can choose more than one
          </div>
        </div>
        <button class="close" @click="hideModal()">
          <img :src="`${iconsUrl}Group 3602.svg`"/>
        </button>
      </template>
      <template slot="body">
        <div class="not-bidding-modal__body">
          <ul>
            <li>
              <md-checkbox 
                v-model="reasonIsDate" 
                :style="`border-color: ${reasonIsDate ? '#fc1355!important;' : 'inherit'}`"
              >
                <span class="colored" :class="[{'bold': reasonIsDate}]">I'm fully booked around the date of the event</span>
              </md-checkbox>
              <a class="another-date" @click="showChooseDateModal()" v-if="vendor.category == 'venue'">Suggest Another Date</a>
              <a class="another-date" @click="showChooseDateModal()" v-else>Suggest Another Time</a>
            </li>
            <li>
              <md-checkbox 
                v-model="reasonIsBudget"
                :style="`border-color: ${reasonIsBudget ? '#fc1355!important;' : 'inherit'}`"
              >
                <span class="colored" :class="[{'bold': reasonIsBudget}]">I'm way out of your budget</span>
              </md-checkbox>
            </li>
            <li>
              <md-checkbox 
                v-model="reasonIsService"
                :style="`border-color: ${reasonIsService ? '#fc1355!important;' : 'inherit'}`"
              >
                <span class="colored" :class="[{'bold': reasonIsService}]">I don't think my services are compatible to your requirements</span>
              </md-checkbox>
            </li>
            <li>
              <md-checkbox 
                v-model="reasonIsInfo"
                :style="`border-color: ${reasonIsInfo ? '#fc1355!important;' : 'inherit'}`"
              >
                <span class="colored" :class="[{'bold': reasonIsInfo}]">I don't enough information about the event</span>
              </md-checkbox>
            </li>
            <li>
              <md-checkbox 
                v-model="reasonIsOther"
                :style="`border-color: ${reasonIsOther ? '#fc1355!important;' : 'inherit'}`"
              >
                <span class="colored" :class="[{'bold': reasonIsOther}]">Other</span>
              </md-checkbox>
            </li>
          </ul>
          <textarea rows="4" type="text" class="form-control" placeholder="Type your reason here..."></textarea>
        </div>
      </template>
      <template slot="footer">
        <div class="not-bidding-modal__footer">
          <button class="cancel" @click="hideModal()">Cancel</button>
          <div class="refer-another-vendor-cont">
            <img class="hand" :src="`${iconsUrl}Group 5649 (2).svg`">
            <a @click="showReferModal()">Refer Another Vendor</a>
            <img class="question" :src="`${iconsUrl}Group 5522.svg`">
          </div>
          <button class="cool" @click="showSorryModal()">Send</button>
        </div>
      </template>
    </modal>
    <modal v-if="sorryModal" class="sorry-modal" container-class="modal-container lg">
      <template slot="header">
        <div class="sorry-modal__header">
          <div class="left-side">
            <img :src="`${iconsUrl}Group 5811.svg`">
          </div>
          <div class="right-side">
            <h3>
              We are sorry, but someone else got there <br/>before you and already won this bid
            </h3>
            <div class="header-description">
              But no worries! We will be with you soon with the next one
            </div>
          </div>
        </div>
        <button class="close" @click="hideModal()">
          <img :src="`${iconsUrl}Group 3602.svg`"/>
        </button>
      </template>
      <template slot="body">
        <div class="sorry-modal__body">
        </div>
      </template>
      <template slot="footer">
        <div class="sorry-modal__footer">
          <button class="cool" @click="hideModal()">OK, Thanks</button>
        </div>
      </template>
    </modal>
    <modal v-if="chooseDateModal" class="choose-date-modal" container-class="modal-container lg">
      <template slot="header">
        <div class="choose-date-modal__header">
          <h3>
            What is your new time suggestion?
          </h3>
          <div class="header-description">
            <img :src="`${iconsUrl}Group 1175 (9).svg`">
            A new time suggestion would be possible up to three days before or after the original event
          </div>
        </div>
        <button class="close" @click="hideModal()">
          <img :src="`${iconsUrl}Group 3602.svg`"/>
        </button>
      </template>
      <template slot="body">
        <div class="choose-date-modal__body">
          <div class="left-side">
          </div>
          <div class="right-side">
            <img :src="`${iconsUrl}Group 6085.svg`">
            <md-datepicker
              v-if="suggest"
              v-model="proposalRequest.suggestedDates"
              :md-disabled-dates="isDateDisabled"
            >
              <label>Alternative date</label>
            </md-datepicker>
            <div class="time" value="08:00">
              <span>08</span>
              <span>:</span>
              <span>00</span>
            </div>
            <div class="pm" >
              <span>AM</span>
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="choose-date-modal__footer">
          <button class="cancel" @click="hideModal()">Cancel</button>
          <button class="send" @click="suggestAnotherDay()">Create Proposal With This Time</button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import moment from 'moment'
import VueElementLoading from 'vue-element-loading'
import Vendors from '@/models/Vendors'
import ProposalRequest from '@/models/ProposalRequest'
import VendorPropertyField from './VendorPropertyField'
import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'

//COMPONENTS
import Icon from '@/components/Icon/Icon.vue'
import InputProposalSubItem from '@/components/Inputs/InputProposalSubItem.vue'
import VendorBudgetList from './components/VendorBudgetList.vue'
import { Modal } from '@/components'

export default {
  components: {
    Modal,
    VueElementLoading,
    InputProposalSubItem,
    VendorBudgetList
  },
  data() {
    return {
      vendor: null,
      category: null,
      notBiddingModal: false,
      chooseDateModal: false,
      referModal: false,
      sorryModal: false,
      reasonIsDate: false,
      reasonIsBudget: false,
      reasonIsService: false,
      reasonIsInfo: false,
      reasonIsOther: false,
      iconsUrl: 'http://static.maryoku.com/storage/icons/NewLandingPage/',
      isAgree: false,
      referTooltip: false,
      conditionTooltip: false,
      proposalRequestRequirements: [],
      proposals: [],
      proposalRequest: null,
      firstTime: false,
      suggest: false,
      categories: [
        'Equipment',
        'Staffing',
        'Services',
        'Amenities',
        'Accessibility',
        'Inclusions',
      ]
    }
  },
  created() {
    this.$auth.currentUser(this, true, function () {
    }.bind(this));
  },
  mounted() {
    this.getVendor()
    this.getProposal(this.$route.params.id)

    let _calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })

    let m = new CalendarEvent().for(_calendar).fetch(this, true)
    m.then(allEvents => {
      console.log(allEvents)
      this.upcomingEvents = allEvents
      this.isLoading = false
    })
  },
  methods: {
    goTo (router) {
      this.$router.push(router)
    },
    hideModal() {
      this.chooseDateModal = false
      this.notBiddingModal = false
      this.referModal = false
      this.sorryModal = false
    },
    showNotBiddingModal() {
      this.hideModal()
      this.notBiddingModal = true
    },
    showChooseDateModal() {
      this.hideModal()
      this.chooseDateModal = true
    },
    showReferModal() {
      this.hideModal()
      this.referModal = true
    },
    showSorryModal() {
      this.hideModal()
      this.sorryModal = true
    },
    getVendor () {
      Vendors.find(this.$route.params.vendorId).then(vendor => {
        this.vendor = vendor
      })
    },
    getProposals (id) {
      new Vendors({ id })
        .proposalRequests()
        .first()
        .then(proposals => {
          this.proposals = proposals.vendorProposals
          this.firstTime = proposals.firstTime
          console.log('vendorProposals', this.proposals)
        })
    },
    getProposal (id) {
      ProposalRequest.find(id)
        .then(resp => {
          console.log('ProposalRequest:', resp)
          this.$set(this, 'proposalRequest', resp)
          console.log(this.proposalRequest.eventData)

          this.proposalRequestRequirements = _.chain(resp.requirements)
            .groupBy('requirementPriority')
            .map(function (value, key) {
              return {
                title: key,
                requirements: value
              }
            })
            .value()
          
          console.log('proposalRequestRequirements', this.proposalRequestRequirements)
        })
        .catch(error => {
          console.log(' error ', error)
        })
    },
    isDateDisabled (date) {
      let startDate = new Date(this.proposalRequest.eventData.eventStartMillis)
      let endDate = new Date(this.proposalRequest.eventData.eventStartMillis)
      let numberOfDaysToAdd = 3
      startDate.setDate(startDate.getDate() - 4)
      endDate.setDate(endDate.getDate() + numberOfDaysToAdd)

      return !(date >= startDate && date <= endDate)
    },
    suggestAnotherDay () {
      this.suggest = true
      if (this.proposalRequest) {
        this.proposalRequest.suggestedDates = new Date(
          this.proposalRequest.eventData.eventStartMillis
        )
      }
      this.hideModal()
    }
  },
  computed: {
    eventDate () {
      if (!this.proposalRequest) return '-'

      let startDate = new Date(this.proposalRequest.eventData.eventStartMillis)
      let endDate = new Date(this.proposalRequest.eventData.eventEndMillis)
      return `${moment(startDate).format('MMM D, YYYY')} - ${moment(endDate).format('MMM D, YYYY')}`
    },
    eventTime () {
      if (!this.proposalRequest) return '-'

      let startDate = new Date(this.proposalRequest.eventData.eventStartMillis)
      let endDate = new Date(this.proposalRequest.eventData.eventEndMillis)
      return `${moment(startDate).format('hh:mmA')} - ${moment(endDate).format('hh:mmA')}`
    },
    getEventDuration () {
      return moment.duration(this.proposalRequest.eventData.eventEndMillis - this.proposalRequest.eventData.eventStartMillis).humanize()
    },
    getLocation () {
      if (this.proposalRequest) {
        return this.proposalRequest.eventData.location || '-'
      } else {
        return '-'
      }
    },
    getServiceCategory () {
      if (this.proposalRequest.requirementsCategory) {
        return this.proposalRequest.requirementsCategory
      } else {
        return this.vendorCategory
      }
    }
  },
  filters: {
    withComma (amount) {
      return amount ? amount.toLocaleString() : 0
    }
  },
  watch: {
  }
};
</script>
<style lang="scss" scoped>
  .for-vendor-wrapper {
    background-color: #ffffff;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    max-width: calc(100% - 128px);
    margin: -64px auto 0 auto;
    padding: 83px 114px;
    font-family: Manrope-Regular, sans-serif;

    h4 {
      margin: 0;
      font-size: 22px;
      color: #050505;
      font-weight: bold;
    }

    .main-cont {
      background-color: #f2f2f2;
      border: 1px solid #707070;
      border-radius: 3px;
      margin-top: 50px;
      padding: 60px;
      color: #050505;

      .one-row {
        display: flex;
        align-items: flex-start;

        .left-side {
          padding-right: 50px;
          border-right: 1px solid #050505;
          h3 {
            margin: 0;
            text-transform: uppercase;
            font-family: 'Cooperative-Regular', sans-serif;
            font-size: 44px;
            font-weight: normal;
          }
          h4 {
            margin: 0;
            text-transform: capitalize;
            font-size: 20px;
            margin-top: 19px;
            margin-bottom: 37px;
          }
          p {
            font-size: 16px;
            max-width: 426px;
            line-height: 1.69;
          }
        }
        .right-side {
          padding: 50px 80px 0px 76px;

          .summary-cont {
            ul {
              list-style: none;
              padding: 0;
              margin: 0;

              li {
                font-size: 20px;
                margin-bottom: 53px;

                img {
                  width: 15.4px;
                  height: 19.2px;
                  margin-right: 13px;
                }
                strong {
                  margin-right: 18px;
                  min-width: 86px;
                  display: inline-block;
                }
                .new-time {
                  background-color: #ffedb7;
                  padding: 23px 35px 22px 35px;
                  font-size: 16px;
                  font-weight: 800;
                  display: inline-block;

                  a {
                    margin-left: 15px;
                    cursor: pointer;
                    color: #f51355;
                  }
                }
                span {
                  max-width: 500px;
                  display: inline-block;
                  vertical-align: middle;
                }
              }
            }
          } 
        }
      }
    }

    .rank-cont {
      color: #050505;
      padding-top: 84px;
      h3 {
        font-size: 40px;
        font-weight: bold;
        line-height: 1.68;
        margin: 0;
        margin-bottom: 30px;
      }
      .check-condition {
        font-size: 20px;

        span.regular {
          padding-left: 14px;
          color: #050505;
        }

        span.condition {
          text-decoration: underline;
          font-weight: bold;
          color: #050505;
        }
      }
      .condition-tooltip {
        position: absolute;
        background-color: #ffedb7;
        padding: 18px 29px 18px 29px;
        color: #050505;
        font-size: 14px;
        margin-left: -40px;
        margin-top: 10px;
        img {
          margin-right: 12px;
          width: 27px;
        }
        &::after{
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          top: 4px;
          left: 70px;
          box-sizing: border-box;
          
          border: 12px solid black;
          border-color: transparent transparent #ffedb7 #ffedb7;
          
          transform-origin: 0 0;
          transform: rotate(135deg);
        }
      }
    }
    
    .action-cont {
      text-align: right;
      padding-top: 130px;
      .no {
        padding: 25px 75px;
        color: #f51355;
        font-size: 20px;
        font-weight: 800;
        border: none;
        cursor: pointer;
        border-right: 1px solid #707070;
        text-decoration: underline;
        background: transparent;
        font-family: Manrope-Regular, sans-serif;

        img {
          padding-left: 19px;
          width: 36px;
        }
      }
      .no-border {
        border: none!important;
      }
      .refer-tooltip {
        position: absolute;
        background-color: #ffedb7;
        max-width: 301px;
        padding: 26px 36px 36px 36px;
        color: #050505;
        margin-top: -260px;

        h5 {
          margin: 0;
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 22px;
          text-transform: capitalize;
        }
        p {
          font-size: 16px;
          font-weight: normal;
          line-break: 1.63;
        }
        &::after{
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          margin-left: -0.5em;
          bottom: -20px;
          left: 80%;
          box-sizing: border-box;
          
          border: 12px solid black;
          border-color: transparent transparent #ffedb7 #ffedb7;
          
          transform-origin: 0 0;
          transform: rotate(-45deg);
        }
      }
      .with-description {
        display: inline-block;
        text-align: center;
        p {
          font-size: 22px;
          margin-bottom: 31px;
        }
        .yes {
          font-family: Manrope-Regular,sans-serif;
          min-width: 473px;
          padding: 20px 0;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 0.42px;
          border: none;
          border-radius: 3px;
          color: #ffffff;
          background-color: #f51355;
          cursor: pointer;
        }
      }
    }

    .refer-vendor-modal {
      &__header {
        width: 100%;
        padding: 36px 36px 0;
        h3 {
          color: #050505;
          font-size: 30px;
          font-weight: 800;
          margin: 0;
        }
        .header-description {
          p {
            font-size: 16px;
            font-weight: normal;
            line-height: 1.29;
            margin-top: 8px;
            margin-bottom: 0;
          }
        }
        & + .close {
          background: transparent;
          border: none;
          position: absolute;
          top: 61px;
          right: 50px;
          color: #050505;
          cursor: pointer;
          img {
            width: 20px;
          }
        }
      }
      &__body {
        padding: 16px 40px 0 40px;

        .input-proposal-sub-item-wrapper {
          margin-bottom: 40px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      &__footer {
        width: 100%;
        text-align: right;
        margin: 0 36px;
        margin-top: -16px;
        padding: 63px 0px 40px 40px;
        .cancel {
          font-size: 16px;
          font-weight: bold;
          color: #050505;
          background-color: transparent;
          padding: 8px 36px;
          cursor: pointer;
          border: none;
        }
      }
    }

    .not-bidding-modal {
      font-family: Manrope-Regular,sans-serif;
      &__header {
        width: 100%;
        padding: 40px 40px 0;
        h3 {
          font-size: 30px;
          color: #050505;
          font-weight: normal;
          line-height: 1.53;
          margin: 0;
          strong {
            font-weight: bold;
          }
        }
        p {
          font-size: 14px;
          line-height: 1.29;
        }
        & + .close {
          background: transparent;
          border: none;
          position: absolute;
          top: 61px;
          right: 60px;
          color: #050505;
          cursor: pointer;
          img {
            width: 20px;
          }
        }
      }
      &__body {
        padding: 10px 40px;
        ul {
          padding: 0;
          margin: 0;
          list-style: none;
          text-align: left;

          li {
            span {
              &.colored {
                color: #050505;
                padding-left: 14px;
              }
              &.bold {
                font-weight: 800;
              }
            }
            &:first-child {
              display: flex;
              align-items: center;
              .another-date {
                font-size: 16px;
                color: #f51355;
                font-weight: 800;
                text-decoration: underline;
                cursor: pointer;
                padding-left: 18px;
                margin-right: 23px;
              }
            }
          }
        }
        textarea {
          font-family: Manrope-Regular,sans-serif;
          margin-left: 28px;
          margin-top: 1em;
          width: calc(100% - 28px);
          min-height: 8em;
          border-radius: 3px;
          border: solid 1px #707070;
          padding: 1rem;
        }
      }
      &__footer {
        padding: 10px 40px 40px 40px;
        display: flex;
        align-items: center;

        .cancel {
          font-size: 16px;
          font-weight: bold;
          color: #050505;
          background-color: transparent;
          padding: 8px 36px;
          cursor: pointer;
          border: none;
          border-right: 1px solid #707070;
        }
        .refer-another-vendor-cont {
          margin: 0 30px;
          .hand {
            width: 52px;
            margin-right: 14px;
          }
          .question {
            width: 27px;
            margin-left: 9px;
          }
          a {
            font-size: 16px;
            font-weight: 800;
            text-decoration: underline;
            cursor: pointer;
            color: #f51355;
          }
        }
        .send {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          background-color: #f51355;
          border-radius: 3px;
          padding: 8px 36px;
          cursor: pointer;
          border: none;
        }
      }
    }

    .sorry-modal {
      &__header {
        width: 100%;
        padding: 40px 40px 0;
        display: flex;

        .left-side {
          img {
            width: 92px;
            margin-right: 50px;
          }
        }

        .right-side {
          h3 {
            font-size: 30px;
            color: #f51355;
            font-weight: bold;
            line-height: 1.53;
            margin: 0;
          }
          .header-description {
            margin-top: 20px;
            font-size: 20px;
            line-height: 1.29;
          }
        }
        
        & + .close {
          background: transparent;
          border: none;
          position: absolute;
          top: 61px;
          right: 60px;
          color: #050505;
          cursor: pointer;
          img {
            width: 20px;
          }
        }
      }
      &__body {
        padding: 10px 40px;
      }
      &__footer {
        padding: 10px 40px 40px 40px;
        .cancel {
          font-size: 16px;
          font-weight: bold;
          color: #050505;
          background-color: transparent;
          padding: 8px 36px;
          cursor: pointer;
          border: none;
        }
        .send {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          background-color: #f51355;
          border-radius: 3px;
          padding: 8px 36px;
          cursor: pointer;
          border: none;
        }
      }
    }

    .choose-date-modal {
      &__header {
        width: 100%;
        padding: 40px 40px 0;
        h3 {
          font-size: 30px;
          font-weight: 800;
          color: #050505;
          line-height: 1.53;
          margin: 0;
        }
        .header-description {
          margin-top: 20px;
          font-size: 14px;
          img {
            width: 27px;
            margin-right: 15px;
          }
        }
        p {
          font-size: 14px;
          line-height: 1.29;
        }
        & + .close {
          background: transparent;
          border: none;
          position: absolute;
          top: 61px;
          right: 60px;
          color: #050505;
          cursor: pointer;
          img {
            width: 20px;
          }
        }
      }
      &__body {
        padding: 36px 40px;
        display: flex;
        justify-content: center;
        align-items: center;

        .left-side {
          margin-right: 60px;
        }
        .right-side {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 23px;
            margin-right: 24px;
          }
          .time {
            padding: 15px 32px;
            border-radius: 3px;
            font-size: 30px;
            border: solid 0.5px #707070;
            max-width: 183px;
            margin-right: 13px;
          }
          .pm {
            padding: 15px 24px;
            font-size: 30px;
            border-radius: 3px;
            border: solid 0.5px #707070;
          }
        }
      }
      &__footer {
        padding: 10px 40px 40px 40px;
        .cancel {
          font-size: 16px;
          font-weight: bold;
          color: #050505;
          background-color: transparent;
          padding: 8px 36px;
          cursor: pointer;
          border: none;
        }
        .send {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          background-color: #f51355;
          border-radius: 3px;
          padding: 8px 36px;
          cursor: pointer;
          border: none;
        }
      }
    }
    .cool {
      font-size: 16px;
      font-weight: 800;
      color: #ffffff;
      background-color: #f51355;
      border-radius: 3px;
      padding: 8px 36px;
      cursor: pointer;
      border: none;
      max-height: 44px;

      &:hover {
        color: #dddddd!important;
      }
    }
  }
</style>
