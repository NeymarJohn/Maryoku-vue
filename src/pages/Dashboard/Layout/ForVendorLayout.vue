<template>
  <div class="for-vendors-layout-wrapper">
    <section class="header-wrapper">
      <div class="vendors-header">
        <ul>
          <li class="logo">
            <a href="https://www.maryoku.com"><img src="https://www.maryoku.com/img/maryoku-logo.png"/></a>
          </li>
          <li>
            ABOUT US
          </li>
        </ul>
      </div>
      <p>
        Get your the best jobs
      </p>
      <div class="pull-top-right">
        <vendor-bid-time-counter
          :days="4" 
          :hours="0" 
          :minutes="0" 
          :seconds="0"
        />
      </div>
    </section>
    <div class="banner">
      <h3>
        Congratulations!
      </h3>
      <p>
        We found you could fit perfectly for our event with your <strong>Venue & Catering</strong> services.
      </p>
      <button type="submit" class="submit">Submit Now</button>
    </div>
    <router-view></router-view>
    <section class="footer-wrapper">
      <div class="vendors-footer">
        <ul>
          <li class="logo">
            <a href="https://www.maryoku.com"><img src="https://www.maryoku.com/img/maryoku-logo.png"/></a>
          </li>
          <li>
            <p>
              Who are we and why are we great?
            </p>
          </li>
          <li>
            <span class="lt">></span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from '@/models/Calendar';
  import CalendarEvent from '@/models/CalendarEvent';

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
      UserMenu
    },
    data() {
      return {
      }
    },
    methods: {
    },
    created(){
    },
    mounted() {
    },
    computed:{
    }
  };
</script>
<style lang="scss" scoped>
  .for-vendors-layout-wrapper {
    margin-top: -20px;
    font-family: Manrope;
    background-color: #f5f5f5;
    overflow: hidden;

    section.header-wrapper {
      color: #ffffff;
      position: absolute;
      padding: 54.5px 64px;
      width: 100%;
      ul {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0;

        li {
          font-size: 22px;
          font-weight: 800;
          padding-left: 2rem;

          &.logo {
            padding-left: 0;
            padding-right: 2rem;
            border-right: 3px solid #ffffff;
          }
        }
      }
      p {
        font-size: 20px;
      }
      .pull-top-right {
        position: absolute;
        right: 117.6px;
        top: 1em;
      }
    }
    section.footer-wrapper {
      background-color: #404040;
      min-height: 110px;

      .vendors-footer{
        ul {
          list-style: none;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          position: relative;
          padding: 0;
          margin: 0;
          top: 30px;
          left: 2.5rem;

          li {
            padding-right: 20px;
            p {
              font-size: 16px;
              color: #ffffff;
            }
            span.lt {
              padding: 8px 12px;
              color: #f51355;
              width: 37px;
              height: 37px;
              font-weight: 900;
              background-color: #ffffff;
              border-radius: 50%;
            }
          }
        } 
      }
    }
    .banner {
      background-image: url('http://static.maryoku.com/storage/img/lock.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      text-align: center;
      padding: 230px 0;
      color: #ffffff;

      h3 {
        font-size: 60px;
        font-weight: bold;
      }
      p {
        font-size: 22px;
        font-weight: 500;
        line-height: 1.95;
        max-width: 566px;
        margin: 0 auto;

        strong {
          font-size: 26px;
          font-weight: 800;
        }
      }
      .submit {
        margin-top: 1rem;
        background-color: #f51355;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        border: none;
        font-size: 20px;
        font-weight: 800;
        color: #ffffff;
        min-width: 382px;
        padding: 20px 0;
        cursor: pointer;
      }
    }
  }
</style>
