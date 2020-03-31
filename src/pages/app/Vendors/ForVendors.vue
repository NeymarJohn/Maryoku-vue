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
          </p>
        </div>
        <div class="right-side">
          <div class="summary-cont">
            <ul>
              <li><img :src="`${iconsUrl}Asset 268.svg`"> <strong>Date:</strong>December 25, 2019</li>
              <li><img :src="`${iconsUrl}Asset 278.svg`"> <strong>Time:</strong>10:00AM - 4:00PM</li>
              <li><img :src="`${iconsUrl}Asset 271.svg`"> <strong>Address:</strong>575 Mission St. San Franciso, CA 94105</li>
              <li><img :src="`${iconsUrl}Asset 270.svg`"> <strong>Guests:</strong>2,034</li>
              <li><img :src="`${iconsUrl}Asset 262.svg`"> <strong>Type:</strong>Establishment / Activity day</li>
              <li><img :src="`${iconsUrl}Asset 262.svg`"> <strong>Invited:</strong>Employees + Partners</li>
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
        :items="vendors"
      ></vendor-budget-list>
    </div>
    <div class="rank-cont">
      <h3>
        Would you like to submit your bid?
      </h3>
      <md-checkbox class="check-condition" v-model="isAgree">
        <span class="regular">I accept <span class="condition">Maryoku's Terms & Conditions</span></span>
      </md-checkbox>
    </div>
    <div class="action-cont">
      <!-- <a class="another-date" @click="showChooseDateModal()">Suggest Another Date</a> -->
      <button class="no" @click="showNotBiddingModal">
        Thank You, But No.
      </button>
      <button class="no no-border" @click="showNotBiddingModal">
        Refer Another Vendor <img :src="`${iconsUrl}Asset 268.svg`">
      </button>
      <div class="with-description">
        <p>
          You're the 4th catering & venue bidder
        </p>
        <button class="yes">
          Submit Proposal
        </button>
      </div>
    </div>
    <modal v-if="notBiddingModal" class="not-bidding-modal">
      <template slot="header">
        <div class="not-bidding-modal__header">
          <h3>
            We are sorry to hear you're not bidding,<br/>
            and would love to know, what's the reason?
          </h3>
          <div class="header-description">
            You can choose more than one
          </div>
        </div>
        <button class="close" @click="hideModal()">
          <md-icon>clear</md-icon>
        </button>
      </template>
      <template slot="body">
        <div class="not-bidding-modal__body">
          <ul>
            <li>
              <md-checkbox class="md-warning">
                I'm fully booked around the date of the event
              </md-checkbox>
              <a class="another-date" @click="showChooseDateModal()">Suggest Another Date</a>
            </li>
            <li>
              <md-checkbox class="md-warning">
                I'm way out of your budget
              </md-checkbox>
            </li>
            <li>
              <md-checkbox class="md-warning">
                I don't think my services are compatible to your requirements
              </md-checkbox>
            </li>
            <li>
              <md-checkbox class="md-warning">
                Other
              </md-checkbox>
            </li>
          </ul>
          <textarea rows="4" type="text" class="form-control" placeholder="Type your reason here..."></textarea>
        </div>
      </template>
      <template slot="footer">
        <div class="not-bidding-modal__footer">
          <button class="cancel" @click="hideModal()">Cancel</button>
          <button class="send">Send</button>
        </div>
      </template>
    </modal>
    <modal v-if="chooseDateModal" class="choose-date-modal">
      <template slot="header">
        <div class="choose-date-modal__header">
          <h3>
            What is our new time suggestion?
          </h3>
          <div class="header-description">
            A new time suggestion would be possible up to three days before or after the original event
          </div>
        </div>
        <button class="close" @click="hideModal()">
          <md-icon>clear</md-icon>
        </button>
      </template>
      <template slot="body">
        <div class="choose-date-modal__body">
          <md-datepicker
            ref="datePicker"
            v-validate= ""
          >
          </md-datepicker>
        </div>
      </template>
      <template slot="footer">
        <div class="choose-date-modal__footer">
          <button class="cancel" @click="hideModal()">Cancel</button>
          <button class="send">Suggest Date</button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import moment from 'moment'
import VueElementLoading from 'vue-element-loading'
import Vendors from '@/models/Vendors'
import VendorPropertyField from './VendorPropertyField'

//COMPONENTS
import Icon from '@/components/Icon/Icon.vue'
import VendorBudgetList from './components/VendorBudgetList.vue'
import { Modal } from '@/components'

export default {
  components: {
    Modal,
    VueElementLoading,
    VendorBudgetList
  },
  data() {
    return {
      vendors: [
        {
          img: "http://static.maryoku.com/storage/icons/Vendor%20Landing%20Page/Asset 275.svg",
          category: "Venue", 
          budget: 1100
        },
        {
          img: "http://static.maryoku.com/storage/icons/Vendor%20Landing%20Page/Asset 274.svg",
          category: "Catering", 
          budget: 1300
        }
      ],
      notBiddingModal: false,
      chooseDateModal: false,
      iconsUrl: 'http://static.maryoku.com/storage/icons/Vendor%20Landing%20Page/',
      isAgree: false,
      // http://static.maryoku.com/storage/icons/Vendor/Landing%20page/Asset 500.svg
    }
  },
  created() {
    this.$auth.currentUser(this, true, function () {
    }.bind(this));
  },
  methods: {
    hideModal() {
      this.chooseDateModal = false
      this.notBiddingModal = false
    },
    showNotBiddingModal() {
      this.hideModal()
      this.notBiddingModal = true
    },
    showChooseDateModal() {
      this.hideModal()
      this.chooseDateModal = true
    }
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
  .for-vendor-wrapper {
    background-color: #ffffff;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    max-width: calc(100% - 128px);
    margin: -64px auto 0 auto;
    padding: 83px 114px;
    font-family: 'Manrope-Regular', sans-serif;
    
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

        img {
          padding-left: 19px;
          width: 36px;
        }
      }
      .no-border {
        border: none!important;
      }
      .with-description {
        display: inline-block;
        text-align: center;
        p {
          font-size: 22px;
          margin-bottom: 31px;
        }
        .yes {
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

    .not-bidding-modal {
      &__header {
        width: 100%;
        padding: 40px 40px 0;
        h3 {
          font-size: 30px;
          color: #050505;
          line-height: 1.53;
          margin: 0;
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
            &:first-child {
              display: flex;
              align-items: center;
              .another-date {
                font-size: 16px;
                color: #f51355;
                font-weight: 800;
                text-decoration: underline;
                cursor: pointer;
                padding: 0 2rem;
                margin-right: 23px;
              }
            }
          }
        }
        textarea {
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
          color: #050505;
          line-height: 1.53;
          margin: 0;
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
  }
</style>
