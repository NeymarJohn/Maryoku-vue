<template>
  <div class="for-vendor-wrapper">
    <h4>
      So what are the details?
    </h4>
    <div class="main-cont">
      <h3>march madness event</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <div class="summary-cont">
        <ul>
          <li><i class="material-icons">event</i> <br/><br/> December 25, 2019</li>
          <li><i class="material-icons">wb_sunny</i> <br/><br/> Day Time event</li>
          <li><i class="material-icons">alarm</i> <br/><br/> 6 Hours</li>
          <li><i class="material-icons">supervised_user_circle</i> <br/><br/> 2,034 Guests</li>
          <li><i class="material-icons">location_on</i> <br/><br/> San Diego</li>
        </ul>
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
      <p>
        You're the <strong>4th</strong> catering & venue <strong>bidder</strong>
      </p>
    </div>
    <div class="action-cont">
      <a class="another-date" @click="showChooseDateModal()">Suggest Another Date</a>
      <button class="no" @click="showNotBiddingModal">
        Thank You, But No.
      </button>
      <button class="yes">
        Submit Proposal
      </button>
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
          category: "Venue", 
          budget: 1100
        },
        {
          category: "Catering", 
          budget: 1300
        }
      ],
      notBiddingModal: false,
      chooseDateModal: false,
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
    max-width: 80%;
    margin: -64px auto 0 auto;
    padding: 83px 114px;
    
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

      h3 {
        margin: 0;
        text-transform: uppercase;
        font-family: 'Cooperative';
      }
      p {
        font-size: 16px;
        max-width: 80%;
      }
      .summary-cont {
        ul {
          display: flex;
          list-style: none;
          padding: 0;
          justify-content: center;
          align-items: center;
          margin: 3rem 0;
          li {
            flex: 1;
            border-right: 1px solid #707070;
            border-radius: 3px;
            text-align: center;
            padding: 1rem;
            font-size: 22px;
            font-weight: 800;

            i {
              font-size: 36px;
            }

            &:last-child {
              border: none;
            }
          }
        }
      }
    }

    .rank-cont {
      color: #050505;
      padding: 5em 0 0 0;
      h3 {
        font-size: 40px;
        font-weight: bold;
        line-height: 1.68;
        margin: 0;
      }
      p {
        font-size: 22px;
        font-weight: 400;
        list-style: 1.32;
        strong {
          font-weight: 800;
        }
      }
    }
    
    .action-cont {
      text-align: right;
      padding: 6em 0;
      .another-date {
        font-size: 20px;
        color: #f51355;
        font-weight: 800;
        text-decoration: underline;
        cursor: pointer;
        padding: 0 2rem;
        margin-right: 23px;
      }
      .no {
        min-width: 382px;
        padding: 20px 0;
        color: #f51355;
        font-size: 20px;
        font-weight: 800;
        border-radius: 3px;
        border: 1px solid #f51355;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        margin-right: 23px;
        cursor: pointer;
      }
      .yes {
        min-width: 382px;
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
