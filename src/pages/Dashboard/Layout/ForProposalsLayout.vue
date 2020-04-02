<template>
  <div class="for-proposals-layout-wrapper">
    <section class="header-wrapper">
      <div class="proposal-banner">
        <h2>march madness</h2>
        <h5>Microsoft marketing event</h5>
      </div>
      <div class="summary-cont">
        <ul>
          <li :class="[{'with-help': dateTooltip}]" @mouseover="dateTooltip=true" @mouseleave="dateTooltip=false">
            <img :src="`${proposalIconsUrl}Path 251 (2).svg`"/> December 25, 2019 <img v-if="dateTooltip" class="question" :src="`${landingIconsUrl}Group 1175 (10).svg`">
            <div class="date-tooltip" v-if="dateTooltip">
              <h3>Your Time Suggestion</h3>
              <p>Client will get this proposal with <br/> your new suggested date</p>
            </div>
          </li>
          <li><img :src="`${proposalIconsUrl}Group 6085 (2).svg`"/> 10:00AM - 4:00PM</li>
          <li><img :src="`${proposalIconsUrl}Asset 573.svg`"/> San Diego</li>
          <li><img :src="`${proposalIconsUrl}Asset 572.svg`"/> 2,034 </li>
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
      <div class="back-to-top">
        <span>END</span>
        <div class="row" @click="scrollToTop()">
          <md-icon>keyboard_arrow_up</md-icon> Back To Top
        </div>
      </div>
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
    <modal v-if="fullDetailsModal" class="full-details-modal" container-class="modal-container ml">
      <template slot="header">
        <div class="full-details-modal__header">
          <div class="header-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
              <img :src="`${landingIconsUrl}Path 251.svg`"> <span><strong>Date:</strong> December 25-26, 2019</span>
            </li>
            <li>
              <img :src="`${landingIconsUrl}Group 6085.svg`"> <span><strong>Time:</strong> 10:00AM - 4:00PM</span>
            </li>
            <li>
              <img :src="`${landingIconsUrl}Asset 506.svg`"> <span><strong>Address:</strong> Relish Caterers & Venues - 575 Mission St. San Francisco, CA 94105</span>
            </li>
            <li>
              <img :src="`${landingIconsUrl}Asset 505.svg`"> <span><strong>Guests:</strong> {{ 2034 | withComma }}</span>
            </li>
            <li>
              <img :src="`${landingIconsUrl}Path 1942.svg`"> <span><strong>Type:</strong> Establishment / Activity Day</span>
            </li>
            <li>
              <img :src="`${landingIconsUrl}Path 1383.svg`"> <span><strong>Invited:</strong> Employees + Partners</span>
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
        proposalIconsUrl: 'http://static.maryoku.com/storage/icons/NewSubmitPorposal/',
        landingIconsUrl: 'http://static.maryoku.com/storage/icons/NewLandingPage/',
        dateTooltip: false,
      }
    },
    methods: {
      hideModal() {
        this.fullDetailsModal = false
      },
      saveProposal() {
        console.log(this.step)
      },
      scrollToTop() {
        window.scrollTo(0,0);
      }
    },
    created(){
    },
    mounted() {
      this.fullDetailsModal = false
    },
    filters: {
      withComma (amount) {
        return amount ? amount.toLocaleString() : 0
      }
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
        background-size: cover;
        background-repeat: no-repeat;
        display: block;
        float: left;
        padding: 90px 96px;
        color: #ffffff;
        width: 495px;
        height: 273px;

        h2 {
          font-size: 50px;
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.77);
          font-family: 'Cooperative-Regular', sans-serif;
          font-size: 50px;
          text-transform: uppercase;
          margin: 0;
        }
        h5 {
          margin-top: 8px;
          margin-bottom: 0;
          font-family: 'Manrope-Regular', sans-serif;
          font-size: 20px;
          font-weight: bold;
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.77);
        }
      }
      .summary-cont {
        font-family: 'Manrope-Regular', sans-serif;
        width: calc( 100% - 454px );
        display: inline-block;
        padding-top: 47px;
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
            font-size: 16px;
            font-weight: bold;
            padding: 9px 25px;
            display: flex;
            margin-right: 40px;

            img {
              width: 20px;
              margin-right: 10px;
            }
            
            i {
              color: #818080;
              padding-right: 8px;
            }

            &.with-help {
              background: #ffedb7;
              cursor: pointer;

              img {
                &.question {
                  margin-left: 12px;
                  margin-right: 0;
                }
              }

              .date-tooltip {
                position: absolute;
                background-color: #ffedb7;
                padding: 24px 32px;
                color: #050505;
                font-size: 14px;
                margin-left: 140px;
                margin-top: 50px;
                text-align: center;

                h3 {
                  font-size: 20px;
                  font-weight: 800;
                  margin-top: 0;
                  margin-bottom: 17px;
                }
                p {
                  font-size: 16px;
                  margin: 0;
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

            &:last-child {
              margin-right: 0;
            }
          }
        }
        p {
          font-size: 16px;
          font-weight: normal;
          color: #050505;
          max-width: 990px;
          margin-top: 21px;
          margin-bottom: 26px;
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
      margin-bottom: 90px;
      width: 100%;

      .back-to-top {
        margin: 0 auto;
        margin-top: 36px;
        text-align: center;
        
        span {
          display: inline-block;
          color: #818080;
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 22px;
        }
        .row {
          cursor: pointer;
          font-size: 20px;
          font-weight: 800;
          color: #f51355;
          i {
            color: #f51355;
          }
        }
      }
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
          line-height: 1.69;
          max-width: 750px;
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

            strong {
              min-width: 86px;
              margin-right: 20px;
              display: inline-block;
            }

            img {
              width: 18px;
              margin-right: 26px;
            }

            span {
              font-size: 20px;
              strong {
                font-weight: bold;
              }
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
