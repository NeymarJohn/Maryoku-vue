<template>
  <div class="for-proposals-layout-wrapper">
    <section class="header-wrapper">
      <div class="proposal-banner">
        <h2>march madness</h2>
      </div>
      <div class="summary-cont">
        <ul>
          <li><i class="material-icons">event</i> December 25, 2019</li>
          <li><i class="material-icons">location_on</i> San Diego</li>
          <li><i class="material-icons">supervised_user_circle</i> 2,034 Guests</li>
          <li><i class="material-icons">alarm</i> 6 Hours</li>
          <li><i class="material-icons">wb_sunny</i> Day Time event</li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div class="a-right">
          <a class="see-full" @click="fullDetailsModal=true">See Full Details<md-icon>keyboard_arrow_right</md-icon></a>
        </div>
        <div class="pull-bottom-right">
          <vendor-bid-time-counter
            :days="4" 
            :hours="0" 
            :minutes="0" 
            :seconds="0"
          />
        </div>
      </div>
    </section>
    <div class="main-cont">
      <router-view></router-view>
    </div>
    <section class="footer-wrapper">
      <div class="prev-cont">
        <md-icon>navigate_before</md-icon> Back
      </div>
      <div class="next-cont">
        <span>You can return to it till the deadline!</span>
        <a class="save" @click="saveProposal()"><md-icon>save</md-icon> Save for later</a>
        <a class="next">Next</a>
      </div>
    </section>
    <modal v-if="fullDetailsModal" class="full-details-modal">
      <template slot="header">
        <div class="full-details-modal__header">
          <div class="header-description">
            Lorem 
          </div>
        </div>
        <button class="close" @click="hideModal()">
          <md-icon>clear</md-icon>
        </button>
      </template>
      <template slot="body">
        <div class="full-details-modal__body">
          <ul>
            <li>
              <md-icon>calendar_today</md-icon> <span><strong>Date:</strong> December 25-26, 2019</span>
            </li>
            <li>
              <md-icon>access_time</md-icon> <span><strong>Time:</strong> December 25-26, 2019</span>
            </li>
            <li>
              <md-icon>location_on</md-icon> <span><strong>Address:</strong> December 25-26, 2019</span>
            </li>
            <li>
              <md-icon>people</md-icon> <span><strong>Guests:</strong> December 25-26, 2019</span>
            </li>
            <li>
              <md-icon>outlined_flag</md-icon> <span><strong>Type:</strong> December 25-26, 2019</span>
            </li>
            <li>
              <md-icon>person_add</md-icon> <span><strong>Invited:</strong> December 25-26, 2019</span>
            </li>
          </ul>
        </div>
      </template>
      <template slot="footer">
        <div class="full-details-modal__footer">
          <a class="see-full" @click="hideModal()">Hide Full Details<md-icon>keyboard_arrow_up</md-icon></a>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from '@/models/Calendar';
  import CalendarEvent from '@/models/CalendarEvent';
  import { Modal } from '@/components'

  import TopNavbar from "./TopNavbar.vue";
  import ContentFooter from "./ContentFooter.vue";
  import MobileMenu from "./Extra/MobileMenu.vue";
  import UserMenu from "./Extra/UserMenu.vue";
  import ForVendors from "@/pages/app/Vendors/ForVendors.vue"
  import VendorBidTimeCounter from "@/pages/app/Vendors/components/VendorBidTimeCounter.vue"

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      MobileMenu,
      VendorBidTimeCounter,
      UserMenu,
      Modal
    },
    data() {
      return {
        fullDetailsModal: false,
      }
    },
    methods: {
      hideModal() {
        this.fullDetailsModal = false
      },
      saveProposal() {
        console.log(this.step)
      }
    },
    created(){
    },
    mounted() {
      this.fullDetailsModal = false
    },
    computed:{
    }
  };
</script>
<style lang="scss" scoped>
  .for-proposals-layout-wrapper {
    font-family: 'Manrope-Regular',sans-serif;
    overflow: hidden;
    background: #f5f5f5;

    section.header-wrapper {
      background-color: #ffffff;
      position: absolute;
      width: 100%;
      border-radius: 3px;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);

      .proposal-banner {
        background-image: url('http://static.maryoku.com/storage/img/lock.jpg');
        clip-path: circle(111% at 0% 50%);
        shape-outside: circle(111% at 0% 50%) border-box;
        width: 450px;
        background-size: cover;
        background-repeat: no-repeat;
        display: block;
        float: left;
        padding: 94px 0;

        h2 {
          font-size: 50px;
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.77);
          font-family: Cooperative;
          font-size: 50px;
          text-transform: uppercase;
          color: #ffffff;
          margin: 0;
        }
      }
      .summary-cont {
        font-family: 'Manrope-Regular', sans-serif;
        width: calc( 100% - 454px );
        display: inline-block;
        padding-top: 67px;
        padding-left: 41px;

        ul {
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0;
          margin: 0;
          color: #050505;

          li {
            font-size: 20px;
            font-weight: bold;
            padding-right: 2rem;
            display: flex;
            
            i {
              color: #818080;
              padding-right: 8px;
            }
          }
        }
        p {
          font-size: 16px;
          font-weight: normal;
          color: #050505;
          max-width: 990px;
        }
        .a-right {
          text-align: right;
          max-width: 990px;

          i {
            position: relative;
            top: -1px;
          }
        }
        .pull-bottom-right {
          position: absolute;
          right: 64px;
          bottom: 0;
        }
      }
    }
    .main-cont {
      margin-top: 263px;
      width: 100%;
    }
    section.footer-wrapper {
      padding: 33px 63px 34px 64px;
      background-color: #ffffff;
      border-radius: 3px;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;

      .prev-cont {
        font-size: 16px;
        font-weight: 800;
        cursor: pointer;
      }
      .next-cont {
        span {
          font-size: 14px;
          font-weight: normal;
          margin-right: 41px;
        }
        a {
          padding: 18px 49px;
          cursor: pointer;
          border-radius: 3px;
          font-size: 20px;
          font-weight: 800;
          display: inline-block;
          min-width: 268px;
          text-align: center;

          &.save {
            border: 1px solid #f51355;
            color: #f51355;
            margin-right: 41px;

            i {
              color: #f51355!important;
            }
          }
          &.next {
            background: #d5d5d5;
            color: #ffffff;

            &:hover {
              color: #050505;
            }
          }
        }
      }
    }
    .full-details-modal {
      &__header {
        width: 100%;
        padding: 55px 295px 24px 31px;
        .header-description {
          font-size: 16px;
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
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          padding-bottom: 26px;

          li {
            padding-left: 31px;
            text-align: left;
            margin-bottom: 50px;

            span {
              font-size: 20px;
              strong {
                font-weight: bold;
              }
            }

            i {
              font-size: 18px!important;
              margin-right: 26px;
              position: relative;
              top: -3px;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      &__footer {
        padding: 10px 40px 40px 40px;
      }
    }
    .see-full {
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
