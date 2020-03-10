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
  .for-proposals-layout-wrapper {
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
        font-family: Manrope;
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
          max-width: 720px;
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
  }
</style>
