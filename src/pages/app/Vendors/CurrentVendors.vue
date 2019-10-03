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

    <!-- Tabs -->
    <div class="tabs-container">
      <div class="tab-item" :class="[{'visited': currentTab > 1}, {'active': currentTab == 1}]" v-on:click="currentTab = 1">
        Food
      </div>
      <div class="tab-item" :class="[{'visited': currentTab > 2}, {'active': currentTab == 2}]" v-on:click="currentTab = 2">
        Venue
      </div>
    </div>

    <!-- Tab contents -->
    <div class="md-layout tab-wrapper bg-white">
      <div class="md-layout-item">
        <div class="tab-content">
          <div v-if="currentTab == 1">
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>timeline</md-icon>
                <h4>
                  Capacity
                </h4>
              </div>
              <div class="tab-item-content-body">
                <div class="icon-text-vertical">
                  <md-icon>insert_chart</md-icon>
                  <h5>
                    200
                  </h5>
                  <span>
                    Standing
                  </span>
                </div>
                <div class="icon-text-vertical">
                  <md-icon>insert_chart</md-icon>
                  <h5>
                    30
                  </h5>
                  <span>
                    Seated
                  </span>
                </div>
                <div class="icon-text-vertical">
                  <md-icon>insert_chart</md-icon>
                  <h5>
                    300 m2
                  </h5>
                  <span>
                    Floor Area
                  </span>
                </div>
              </div>
            </div>
            <div class="divider">
            </div>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>timeline</md-icon>
                <h4>
                  Services Offered by This Vendor
                </h4>
              </div>
              <div class="tab-item-content-body">
              </div>
            </div>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>timeline</md-icon>
                <h4>
                  Pricing and Rules
                </h4>
              </div>
              <div class="tab-item-content-body">
              </div>
            </div>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>timeline</md-icon>
                <h4>
                  Similar Proposals Made by Vendor
                </h4>
              </div>
              <div class="tab-item-content-body">
              </div>
            </div>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>timeline</md-icon>
                <h4>
                  Feedbacks
                </h4>
              </div>
              <div class="tab-item-content-body">
              </div>
            </div>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>timeline</md-icon>
                <h4>
                  Payment Terms
                </h4>
              </div>
              <div class="tab-item-content-body">
              </div>
            </div>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>timeline</md-icon>
                <h4>
                  Cancellations Policy - Strict
                </h4>
              </div>
              <div class="tab-item-content-body">
              </div>
            </div>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>timeline</md-icon>
                <h4>
                  Similar Vendors
                </h4>
              </div>
              <div class="tab-item-content-body">
              </div>
            </div>
          </div>
          <div v-if="currentTab == 2">
            Venue
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
        currentTab: 1,
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
<style lang="scss" scoped>
  @import "@/assets/scss/md/_variables.scss";
  @import "@/assets/scss/md/_colors.scss";
  .tabs-container {
    display: flex;
    justify-content: flex-start;
    position: relative;
    text-align: center;
    margin-top: 15px;
    z-index: 999;

    .tab-item {
      padding: 20px 0;
      position: relative;
      width: 240px;
      background: #e3e3e3;
      color : #b6b6b6;
      font-weight: 500;
      font-size: 18px;

      &:first-child {
        border-radius: 5px 0 0 5px;
        margin-left: 2em;

        @media (max-width: $screen-sm-min) {
          margin-left: 0;
        }
      }

      &:last-child {
        border-radius: 0 5px 5px 0;
      }

      &.active {
        //color: $brand-primary;
        background: $brand-warning;
        color : $white-color;

        span {
          border-color : #fff;
        }

        &:before {
          border-color: $brand-primary;
          background: $brand-primary;
        }
      }
    }
  }

  .tab-wrapper {
    padding: 2em 2em 4em 2em;
    position: relative;
    top: -2em;

    .tab-content {
      padding-top: 2em;

      .tab-item-content {
        .tab-item-content-title {
          display: flex;
          i {
            display: block;
            margin-right: .5em;
            color: $purple-500;
          }
          h4 {
            flex: 1;
            font-weight: 400;
          }
        }
        .tab-item-content-body {
          display: flex;

          .icon-text-vertical {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 2em;

            i {
              font-size: 36px!important;
            }

            h5 {
              font-weight: 600;
              margin: 1em 0 5px 0;
            }
          }
        }
      }

      .divider {
        background: #f9f9f9;
        height: 2px;
        margin: 2em 0;
        
        @media (max-width: $screen-sm-min) {
          padding: 1em;
        }
      }
    }

    @media (max-width: $screen-sm-min) {
      padding: 1em;
      top: 0;
    }
  }
</style>