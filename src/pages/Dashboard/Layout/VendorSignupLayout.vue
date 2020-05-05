<template>
  <div class="vendor-signup-layout-wrapper">
    <router-view></router-view>
    <section class="footer-wrapper">
      <a class="approve">
        Approve & Begin
      </a>
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
        iconsUrl: 'http://static.maryoku.com/storage/icons/Vendor%20Landing%20Page/'
      }
    },
    methods: {
      goTo (router) {
        this.$router.push(router)
      }
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
  .vendor-signup-layout-wrapper {
    background-color: #f3f7fd;
    section.footer-wrapper {
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 33px 168px;
      background-color: #ffffff;
      border-radius: 3px;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
      text-align: right;

      a {
        display: inline-block;
        padding: 17px 55px;
        cursor: pointer;
        border-radius: 3px;
        font-size: 20px;
        font-weight: 800;
        display: inline-block;
        min-width: 268px;
        text-align: center;

        &.approve {
          border: 1px solid #f51355;
          color: #ffffff;
          background-color: #f51355;

          &:hover {
            color: #dddddd!important;
          }
        }
      }
    }
  }
</style>
