<template>
  <div class="vendor-details">
    <div class="md-layout">
      <div class="md-layout-item image-list-container no-padding">
        <div class="img-cont big-img-cont">
          <img :src="bgImages[0]">
        </div>
        <div class="img-cont thumb-img-cont">
          <img :src="bgImages[1]">
          <img :src="bgImages[2]">
          <img :src="bgImages[3]">
          <img :src="bgImages[4]">
        </div>
      </div>
    </div>
    <div class="md-layout bg-white">
      <div class="md-layout-item">
        <div class="title-cont">
          <div class="title-child">
            <img :src="bgImages[1]">
          </div>
          <div class="title-child">
            <h3>
              {{vendor.vendorDisplayName}}
            </h3>
            {{vendor.vendorAddressLine1}}
            {{vendor.avgScore}}
          </div>
        </div>
      </div>
      <div class="md-layout-item text-right">
        <md-button class="md-success">
          Contact Vendor
        </md-button>
        <md-button class="md-danger">
          Create Brief Ask for Proposal
        </md-button>
      </div>
    </div>
    <div class="md-layout bg-white">
      <div class="md-layout-item">
        <div class="description">
          <h4>
            <md-icon>view_list</md-icon> Description
          </h4>
          <p>
            Lorem
          </p>
        </div>
        <div class="text-group">
          <div class="">
            <span>
              Past Events With the Vendor: {{vendor.voters}}
            </span>
          </div>
          <div class="">
            <span>
              Past Proposals Sent by the Vendor: {{vendor.rank}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import VueElementLoading from 'vue-element-loading'
  import Vendors from '@/models/Vendors'

  //COMPONENTS
  import Icon from '@/components/Icon/Icon.vue'

  export default {
    components: {
      VueElementLoading,
      Icon,
    },
    props: {
      item: {
        type: Object,
        default: () => {
          return {};
        }
      },
    },
    data () {
      return {
        vendorId: null,
        isLoading: false,
        vendor: {statistics: {}},
        bgImages : [
          '/static/img/lock.jpg',
          '/static/img/login.jpg',
          '/static/img/register.jpg',
          '/static/img/bg-pricing.jpg',
          '/static/img/bg3.jpg',
        ],
        routeName: null
      }
    },
    created () {
      this.routeName = this.$route.name;
    },
    mounted () {
      let _self = this
      this.isLoading = true;

      this.getVendor()
    },
    methods: {
      getVendor () {
        this.$auth.currentUser(this, true, function () {
          Vendors.find(this.$route.params.id).then(vendor => {
            this.vendor = vendor
            this.isLoading = false;
          })
        }.bind(this))
      }
    },
    computed: {
    },
    filters: {
    },
    watch: {},
  }
</script>
