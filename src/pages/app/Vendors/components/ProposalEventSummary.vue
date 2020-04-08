<template>
  <div class="proposal-event-summary-wrapper">
    <template v-if="isEdit">
    </template>
    <template v-else>
      <div class="summary-cont">
        <h3>{{title}}</h3>
        <ul>
          <li>
            <span>Name</span>
            <p>{{eventData.name}}</p>
          </li>
          <li>
            <span>Date</span>
            <p>{{eventData.date}}</p>
          </li>
          <li>
            <span>Guest Arrival Time</span>
            <p>{{eventData.arrival_time}}</p>
          </li>
        </ul>
      </div>
      <!-- Tabs -->
      <div class="tabs-cont">
        <div class="tab-item"
          :class="[{'active': currentTab == 1}]"
          v-on:click="currentTab = 1">
          <span class="capitalize">Venue & Catering Proposal</span>
        </div>
        <div class="tab-item"
          :class="[{'active': currentTab == 2}]"
          v-on:click="currentTab = 2">
          <span class="capitalize">DJ proposal</span>
        </div>
      </div>
      <div class="tab-wrapper">
        <img src="http://static.maryoku.com/storage/img/sidebar-2.jpg"/>
        <div class="cover-letter">
          <h4>
            Dear Rachel,
          </h4>
          <p @mouseover="mouseOver()" @mouseleave="mouseLeave()">
            Relish caters & venus is pleased to provide you with the attached catering proposal for you, which is currently scheduled to be held on at.
            <br/>
            Sincerely,
            <strong>Relish cateres & venues</strong>
          </p>
          <span @click="savedItModal=true">
            More about us <md-icon>navigate_next</md-icon>
          </span>
        </div>
        <div class="image-slider">
          <img class="item" src="http://static.maryoku.com/storage/img/sidebar-2.jpg">
          <img class="item" src="http://static.maryoku.com/storage/img/sidebar-2.jpg">
          <img class="item" src="http://static.maryoku.com/storage/img/sidebar-2.jpg">
          <img class="item" src="http://static.maryoku.com/storage/img/sidebar-2.jpg">
          <a class="more">
            <md-icon>keyboard_arrow_right</md-icon>
          </a>
        </div>
        <div class="check-list-wrapper">
          <h4>What do we inlcude in this proposal?</h4>
          <ul>
            <li>
              <md-icon>check_circle</md-icon> Set up
            </li>
            <li>
              <md-icon>check_circle</md-icon> Clean up
            </li>
            <li>
              <md-icon>check_circle</md-icon> In-house bar services
            </li>
            <li>
              <md-icon>check_circle</md-icon> Tables
            </li>
            <li>
              <md-icon>check_circle</md-icon> Set up
            </li>
            <li>
              <md-icon>check_circle</md-icon> Clean up
            </li>
            <li>
              <md-icon>check_circle</md-icon> In-house bar services
            </li>
            <li>
              <md-icon>check_circle</md-icon> Tables
            </li>
            <li>
              <md-icon>check_circle</md-icon> Set up
            </li>
          </ul>
        </div>
      </div>
      <div class="pricing-cont">
        <div class="title">
          <h4>Pricing</h4>
          <p>*We work only with our catering</p>
        </div>
        <proposal-pricing-items></proposal-pricing-items>
      </div>
      <div class="attachments-cont">
        <h4>Attachments</h4>
        <div class="files-cont">
          <div class="item">
            <md-icon>attach_file</md-icon> Kosher_certificate.pdf
          </div>
          <div class="item">
            <md-icon>attach_file</md-icon> Kosher_certificate.pdf
          </div>
          <div class="item">
            <md-icon>attach_file</md-icon> Kosher_certificate.pdf
          </div>
        </div>
      </div>
      <div class="policy-cont">
        <div class="condition">
          <h4><md-icon>warning</md-icon>Our Policy</h4>
          <h6>We charge deposite is:</h6>
          <p>50% of the total event</p>
        </div>
        <div class="cancellation">
          <h5 class="subtitle">Our cancellation approach</h5>
          <h6>We allow free cancellation until:</h6>
          <p>
            30 days before the event
          </p>
          <div class="semi-column">
            <p><strong>If</strong> the client cancel the vent after 3 weeks before the event</p>
            <p><strong>If</strong> the client cancel the vent after 3 weeks before the event</p>
          </div>
          <div class="semi-column">
            <p><strong>Than</strong> the client will pay full deposite</p>
            <p><strong>Than</strong> the client will pay full deposite</p>
          </div>
          <div class="additional">
            <h6>Additional</h6>
            <p>
              Lorem
            </p>
          </div>
          <div class="signature-wrapper">
            <div class="half-side">
              <h6>Relish caterers & venues</h6>
              <div class="signature-client signature-bidder">
                
              </div>
            </div>
            <div class="half-side">
              <h6>Client</h6>
              <div class="signature-client">

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contact-cont">
        <h4>Contact Us</h4>
        <ul>
          <li>
            <md-icon>email</md-icon> <span>Relish@venue@hotmail.com</span>
          </li>
          <li>
            <md-icon>location_on</md-icon> <span>Relish@venue@hotmail.com</span>
          </li>
          <li>
            <md-icon>call</md-icon> <span>Relish@venue@hotmail.com</span>
          </li>
        </ul>
      </div>
    </template>
    <modal v-if="savedItModal" class="saved-it-modal">
      <template slot="header">
        <div class="saved-it-modal__header">
          <h3 v-if="isTimeUp">Time Is Up!</h3>
          <h3 v-else>Saved It!</h3>
          <div v-if="isTimeUp" class="header-description">
            The deadline for submitting this prposal has passed. But no worries! We weill be with you soon with the next one.
          </div>
          <div v-else class="header-description">
            You can return to it till the deadline!
          </div>
        </div>
        <button class="close" @click="hideModal()">
          <md-icon>clear</md-icon>
        </button>
      </template>
      <template slot="body">
        <div class="saved-it-modal__body">
          <div v-if="isTimeUp" class="time-cont">
            <vendor-bid-time-counter
              :days="0" 
              :hours="0" 
              :minutes="0" 
              :seconds="0"
            />
          </div>
          <div v-else class="time-cont">
            <vendor-bid-time-counter
              :days="4" 
              :hours="0" 
              :minutes="0" 
              :seconds="0"
            />
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="saved-it-modal__footer">
          <button v-if="isTimeUp" class="cool" @click="hideModal()">Ok, Thanks</button>
          <button v-else class="cool" @click="hideModal()">Cool, Thanks</button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
  import ProposalPricingItems from './ProposalPricingItems.vue'
  import VendorBidTimeCounter from "@/pages/app/Vendors/components/VendorBidTimeCounter.vue"
  import { Modal } from '@/components'

  export default {
    name: 'proposal-event-summary',
    components: {
      ProposalPricingItems,
      VendorBidTimeCounter,
      Modal
    },
    props: {
      title: String, 
      eventData: Object,
      isEdit: Boolean,
    },
    data () {
      return {
        currentTab: 1,
        savedItModal: false,
        isTimeUp: false,
        hover: false,
      }
    },
    methods: {
      hideModal() {
        this.savedItModal = false
      },
      mouseOver() {
        this.hover = true
      },
      mouseLeave() {
        this.hover= false
      }
    },
    created() {
    },
    mounted() {
      this.savedItModal = false
      this.isTimeUp = true
    },
    computed: {
    },
    watch: {
    }
  }
</script>
<style lang="scss" scoped>
  .proposal-event-summary-wrapper {
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    font-family: 'Manrope-Regular', sans-serif;
    padding: 0 60px;
    margin-top: 50px;
    color: #050505;

    .summary-cont {
      padding: 60px 0;

      h3 {
        font-size: 22px;
        font-weight: 800;
        margin: 0;
        margin-bottom: 30px;
      } 
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;

        li {
          padding: 0 95px;
          border-right: 1px solid #818080;
          font-size: 16px;

          span {
            font-weight: 800;
            color: #818080;
          }
          p {
            margin: 0;
            margin-top: 13px;
            font-weight: normal;
          }

          &:first-child {
            padding-left: 0;
          }
          &:last-child {
            border: none;
          }
        }
      }
    }

    .tabs-cont {
      display: flex;
      justify-content: flex-start;
      position: relative;
      text-align: center;
      margin: 0 -60px;
      border-radius: 3px;

      .tab-item {
        flex: 1;
        font-size: 22px;
        padding: 27px 0 32px 0;
        border: solid 3px #818080;
        cursor: pointer;

        span {
          color: #050505;
          font-weight: normal;
        }

        &:first-child {
          border-right: none;
        }
        &.active {
          border-top: solid 5px #f51355;
          span {
            color: #f51355;
            font-weight: 800;
          }
        }
      }
    }
    .tab-wrapper {
      padding-bottom: 27px;
      margin: 0 -60px;

      img {
        width: calc(100% + 120px);
        max-height: 300px;
      }

      .cover-letter {
        padding: 0 60px;
        h4 {
          font-size: 30px;
          font-weight: 800;
          margin: 0;
          padding-top: 60px;
          padding-bottom: 25px;
        }
        p {
          margin: 0;
          font-size: 14px;

          strong {
            font-weight: 800;
          }

          &:hover {
            border: 1px solid black;
          }
        }
        span {
          display: inline-block;
          font-weight: 800;
          padding-top: 36px;
          padding-bottom: 20px;
          font-size: 16px;
          color: #f51355;
          text-transform: capitalize;
          cursor: pointer;
          i {
            color: #f51355;
          }
        }
      }

      .image-slider {
        padding-left: 60px;
        display: flex;
        overflow: hidden;

        .item {
          margin-right: 30px;
          width: 300px;
          min-width: 300px;
          max-height: 177px;

          &:last-child {
            margin-right: 0;
          }
        }
        a.more {
          cursor: pointer;
          position: absolute;
          background: white;
          border-radius: 20px;
          margin-top: 75px;
        }
      }

      .check-list-wrapper {
        padding: 0 60px;
        h4 {
          font-size: 22px;
          font-weight: 800;
          margin: 0;
          margin-top: 40px;
          margin-bottom: 30px;
          text-transform: capitalize;
        }
        ul {
          padding: 0;
          list-style: none;
          -webkit-column-count: 3;
          -moz-column-count: 3;
          column-count: 3;
          li {
            margin-bottom: 33px;

            i {
              color: #f51355;
              font-size: 22px;
              margin-right: 22px;
            }
          }
        }
      }
    }

    .pricing-cont {
      padding: 60px 0;
      border-top: 1px solid #818080;
      .title {
        display: flex;
        align-items: flex-end;
        h4 {
          font-size: 22px;
          font-weight: 800;
          margin: 0;
          margin-right: 27px;
        }
        p {
          font-size: 16px;
          margin: 0;
        }
      }
    }

    .attachments-cont {
      padding: 60px 0;
      border-top: 1px solid #818080;
      h4 {
        font-size: 22px;
        font-weight: 800;
        margin: 0;
        margin-bottom: 30px;
      }
      .files-cont {
        display: flex;
        .item {
          border: 1px solid #f51355;
          color: #f51355;
          border-radius: 3px;
          font-size: 16px;
          padding: 18px 30px;
          margin-right: 40px;

          i {
            color: #f51355;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    .policy-cont {
      border-top: 1px solid #818080;
      padding: 60px 0;
      .condition {
        h4 {
          margin: 0;
          font-size: 30px;
          font-weight: 800;
          margin-bottom: 45px;
        }
        h6 {
          margin: 0;
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 8px;
          text-transform: none;
        }
        p {
          margin: 0;
          margin-bottom: 60px;
        }
      }
      .cancellation {
        h5.subtitle {
          margin: 0;
          padding: 15px 53px 20px 55px;
          margin-left: -60px;
          background-color: #ededed;
          display: inline-block;
          font-size: 20px;
          font-weight: 800;
          text-transform: none;
        }
        h6 {
          font-size: 20px;
          font-weight: 800;
          margin-top: 30px;
          margin-bottom: 8px;
          text-transform: none;
        }
        p {
          font-size: 16px;
          margin: 0;
        }
        .semi-column {
          display: flex;
          margin-top: 35px;
          
          p {
            flex: 1;
            margin: 0;
            font-size: 16px;
            strong {
              font-size: 20px;
              font-weight: 800;
            }
          }
        }
        .additional {
          margin-top: 60px;

          h6 {
            font-size: 16px;
            font-weight: 800;
          }
          p {
            margin-top: 13px;
            font-size: 16px;
          }
        }
        .signature-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-top: 60px;

          .half-side {
            text-align: center;
            h6 {
              text-decoration: underline;
              font-size: 16px;
              font-weight: 800;
              margin: 0;
            }

            .signature-client {
              margin-top: 23px;
              min-width: 350px;
              min-height: 120px;
              border: dashed 1px #050505;
              border-radius: 3px;
            }

            &:first-child {
              h6 {
                text-align: left;
              }
            }
          }
        }
      }
    }

    .contact-cont {
      padding: 60px 0;
      border-top: 1px solid #818080;

      h4 {
        font-size: 22px;
        font-weight: 800;
        margin: 0;
      }
      ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
        margin-top: 20px;

        li {
          font-size: 16px;
          margin-right: 50px;

          span {
            text-decoration: underline;
          }

          i {
            color: #a0a0a0;
            margin-right: 14px;
          }
        }
      }
    }

    .saved-it-modal {
      &__header {
        width: 100%;
        padding: 55px 31px 24px 31px;
        text-align: center;
        h3 {
          font-size: 30px;
          font-weight: bold;
          color: #f51355;
        }
        .header-description {
          font-size: 20px;
          color: #050505;
        }
        & + .close {
          background: transparent;
          border: none;
          position: absolute;
          top: 61px;
          right: 60px;
          color: #050505;
          cursor: pointer;
        }
      }
      &__body {
        .time-cont {
          max-width: 320px;
          margin: 0 auto;
        }
      }
      &__footer {
        padding: 10px 40px 40px 40px;
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
    }
    .hide-full {
      font-size: 16px;
      font-weight: 800;
      color: #f51355;
      cursor: pointer;

      i {
        color: #f51355;
      }
    }
  }  
</style>