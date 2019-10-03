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
        <div class="banner-description">
          <div class="banner-description-title">
            <md-icon>view_list</md-icon>
            <h4>
              Description
            </h4>
          </div>
          <div class="banner-description-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div class="description">
          
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
                <md-icon>apartment</md-icon>
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
                <md-icon>check_circle</md-icon>
                <h4>
                  Services Offered by This Vendor
                </h4>
              </div>
              <div class="tab-item-content-body">
                <ul class="check-list">
                  <li>
                    <md-icon>restaurant</md-icon> <strong>Food</strong>
                  </li>
                  <li>
                    <br/>
                  </li>
                  <li class="normal">
                    <md-icon>check</md-icon> Catering via venue
                  </li>
                  <li class="normal">
                    <md-icon>check</md-icon> Own food allowed
                  </li>
                  <li class="normal">
                    <md-icon>check</md-icon> Alchol license
                  </li>
                  <li class="normal">
                    <md-icon>check</md-icon> own beverages allowed
                  </li>
                  <li class="normal">
                    <md-icon>check</md-icon> Meeting Catering
                  </li>
                  <li class="disabled">
                    <md-icon></md-icon> <span>Dinnerware</span>
                  </li>
                </ul>
                <div class="notes">
                  <div class="notes-title">
                    <h4>
                      Attachment
                    </h4>
                  </div>
                  <div class="notes-body">
                    <div class="note-item">
                      <md-icon>picture_as_pdf</md-icon> Food menu Option 1
                    </div>
                    <div class="note-item">
                      <md-icon>picture_as_pdf</md-icon> Food menu Option 2
                    </div>
                    <div class="note-item">
                      <md-icon>picture_as_pdf</md-icon> Food menu Option Insurance Certificate
                    </div>
                    <div class="note-item">
                      <md-icon>picture_as_pdf</md-icon> Food menu Other Business Indication
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divider">
            </div>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>menu_book</md-icon>
                <h4>
                  Pricing and Rules
                </h4>
              </div>
              <div class="tab-item-content-body">
                <div class="text-vertical">
                  <h5>
                    $41
                  </h5>
                  <span>
                    Price / person
                  </span>
                </div>
                <div class="text-vertical">
                  <h5>
                    $74
                  </h5>
                  <span>
                    Price / hour
                  </span>
                </div>
                <div class="text-vertical">
                  <h5>
                    $25
                  </h5>
                  <span>
                    Daliy rent
                  </span>
                </div>
                <div class="text-vertical">
                  <h5>
                    $78
                  </h5>
                  <span>
                    Minimum spend
                  </span>
                </div>
                <div class="text-vertical">
                  <h5>
                    $50
                  </h5>
                  <span>
                    Reservation fee
                  </span>
                </div>
                <div class="text-vertical">
                  <h5>
                    $12
                  </h5>
                  <span>
                    Cleaning fee
                  </span>
                </div>
                <div class="notes">
                  <div class="notes-title">
                    <h4>
                      Notes
                    </h4>
                  </div>
                  <div class="notes-body">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="divider">
            </div>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>dehaze</md-icon>
                <h4>
                  Similar Proposals Made by Vendor
                </h4>
              </div>
              <div class="tab-item-content-body">
              </div>
            </div>
            <div class="divider">
            </div>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>edit</md-icon>
                <h4>
                  Feedbacks
                </h4>
              </div>
              <div class="tab-item-content-body">
              </div>
            </div>
            <div class="divider">
            </div>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>credit_card</md-icon>
                <h4>
                  Payment Terms
                </h4>
              </div>
              <div class="tab-item-content-body">
                <p>
                  A 50% deposit will be due on or before 18/1/20. The remaining balance will b collected a week prior to the event. We accept all major credit cards and checks.
                </p>
              </div>
            </div>
            <div class="divider">
            </div>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>warning</md-icon>
                <h4>
                  Cancellations Policy - Strict
                </h4>
              </div>
              <div class="tab-item-content-body">
                <p>
                  Be due on or before 18/1/20. The remaining balance will be collected a week prior to the vent. We accept... <a class="more">Read more</a>
                </p>
              </div>
            </div>
            <div class="divider">
            </div>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>flip_to_back</md-icon>
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
  .banner-description {
    padding: 0 1em;
    .banner-description-title {
      display: flex;
      i {
        display: block;
        margin-right: .5em;
        color: $purple-500!important;
      }
      h4 {
        flex: 1;
        font-weight: 400;
      }
    }
  }
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
          flex-wrap: wrap;

          ul.check-list {
            flex-basis: 100%;
            list-style: none;
            padding: 0;
            margin: 0;

            li {
              i {
                color: $grey-500;
              }
            }
            li.normal {
              i {
                color: $pink-262;
              }
            }
            li.disabled {
              i {
                color: $grey-500;
              }
              span {
                color: #c2c2c2;
                text-decoration: line-through;
              }
            }
          }
          .notes {
            background: #f9f9f9;
            flex-basis: 100%;
            border: 1;
            border: 1px solid #e6e6e6;
            margin-top: 2em;
            padding: 1em 2em;

            .notes-title {
              h4 {
                margin-top: 0;
                font-weight: 600;
                font-size: 16px;
                margin-bottom: .5em;
              }
            }
            .notes-body {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              flex-flow: row wrap;
              
              .note-item {
                margin-right: 2em;
                width: 40%;
                color: $purple-500;
                i {
                  color: $purple-500;
                }

                @media (max-width: $screen-sm-min) {
                  margin-right: 0;
                  width: 100%;
                }
              }
            }
          }
          .text-vertical {
            width: 25%;
            text-align: center;

            h5 {
              font-weight: 600;
            }
            @media (max-width: $screen-sm-min) {
              margin-right: 0;
              width: 50%;
            }
          }
          .icon-text-vertical {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-right: 2em;

            i {
              font-size: 36px!important;
            }

            h5 {
              font-weight: 600;
              margin: 1em 0 5px 0;
            }

            @media (max-width: $screen-sm-min) {
              margin: 0;
              padding: 0;
              width: 33.33%;
            }
          }
          a.more {
            color: $purple-500;
          }
        }
      }

      .divider {
        background: #f9f9f9;
        height: 2px;
        margin: 2em 0;
        
        @media (max-width: $screen-sm-min) {
          margin: 1em 0;
        }
      }
    }

    @media (max-width: $screen-sm-min) {
      padding: 1em;
      top: 0;
    }
  }
</style>