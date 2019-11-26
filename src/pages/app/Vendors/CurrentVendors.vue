<template>
  <div class="vendor-details">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>
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
        <md-button class="md-default btn-photos">
          <md-icon>photo</md-icon>
          view photos
        </md-button>
      </div>
    </div>
    <div class="md-layout bg-white">
      <div class="md-layout-item">
        <div class="title-cont">
          <div class="title-child">
            <img v-if="isVendorLogo" :src="isVendorLogo">
            <div v-else class="default-text-logo">
              {{logoText}}
            </div>
          </div>
          <div class="title-child">
            <h3>
              {{vendor.vendorDisplayName}}
            </h3>
            <span class="address">
              <i class="fa fa-map-marker-alt"></i>
              {{vendor.vendorAddressLine1}}
            </span>
            <br class="hidden-lg hidden-md"/>
            <div class="hor-divider">
              <label
                class="star-rating__star"
                v-for="(rating, ratingIndex) in ratings"
                :key="ratingIndex"
                :class="{'is-selected' : true}"
              >★</label>
              {{vendor.avgScore}}
            </div>
            <br class="hidden-lg hidden-md"/>
            <a class="favorite">
              <md-icon>favorite_border</md-icon> add to favorites
            </a>
          </div>
        </div>
      </div>
      <div class="md-layout-item button-group text-right">
        <md-button class="md-success md-lg">
          Contact Vendor
        </md-button>
        <md-button class="md-danger md-lg">
          Create Brief Ask for Proposal
        </md-button>
        <h4>
          Avg. Response Time: {{vendor.rank}}
        </h4>
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
      <div class="tab-item" 
        :class="[{'visited': currentTab > 1}, {'active': currentTab == 1}]" 
        v-on:click="currentTab = 1">
        <span class="capitalize">{{vendor.vendorCategory}}</span>
      </div>
      <!-- <div class="tab-item" :class="[{'visited': currentTab > 2}, {'active': currentTab == 2}]" v-on:click="currentTab = 2">
        Venue
      </div> -->
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
                <div class="icon-text-vertical" v-for="(item, index) in capacities" :value="item" :key="index">
                  <md-icon>{{item.icon}}</md-icon>
                  <h5>
                    {{item.value}}
                  </h5>
                  <span>
                    {{item.key}}
                  </span>
                </div>
              </div>
            </div>
            <md-divider></md-divider>
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
                    <md-icon>restaurant</md-icon> <strong class="capitalize">{{vendor.vendorCategory}}</strong>
                  </li>
                  <li>
                    <br/>
                  </li>
                  <li class="normal" v-for="(item, index) of checkListItems" :key='index' :value="item">
                    <md-icon>check</md-icon> {{item}}
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
                    <div class="note-item" v-for="(item, index) in attachments" :key="index" :value="item">
                      <md-icon>picture_as_pdf</md-icon> {{item}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <md-divider></md-divider>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>menu_book</md-icon>
                <h4>
                  Pricing and Rules
                </h4>
              </div>
              <div class="tab-item-content-body">
                <div class="text-vertical" v-for="(item,index) of pricesAndRules" :key='index' :value="item">
                  <h5>
                    ${{item.price}}
                  </h5>
                  <span>
                    {{item.description}}
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
            <md-divider></md-divider>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>dehaze</md-icon>
                <h4>
                  Similar Proposals Made by Vendor
                </h4>
              </div>
              <div class="tab-item-content-body">
                <vendor-similar-proposals :proposals="proposals" :ratings="ratings"></vendor-similar-proposals>
              </div>
            </div>
            <md-divider></md-divider>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>edit</md-icon>
                <h4>
                  Feedbacks
                  <label
                    class="star-rating__star"
                    v-for="(rating, ratingIndex) in ratings"
                    :key="ratingIndex"
                    :class="{'is-selected' : true}"
                  >★</label>
                </h4>
              </div>
              <div class="tab-item-content-body">
                <vendor-feedbacks :feedbacks="feedbacks" :ratings="ratings"></vendor-feedbacks>
              </div>
            </div>
            <md-divider></md-divider>
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
            <md-divider></md-divider>
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
            <md-divider></md-divider>
            <div class="tab-item-content">
              <div class="tab-item-content-title">
                <md-icon>flip_to_back</md-icon>
                <h4>
                  Similar Vendors
                </h4>
              </div>
              <div class="tab-item-content-body">
                <vendor-similar-item :similarItems="similarItems" :ratings="ratings"></vendor-similar-item>
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
  import VendorSimilarProposals from './components/VendorSimilarProposals.vue'
  import VendorFeedbacks from './components/VendorFeedbacks.vue'
  import VendorSimilarItem from './components/VendorSimilarItem.vue'

  export default {
    components: {
      VueElementLoading,
      VendorSimilarProposals,
      VendorSimilarItem,
      VendorFeedbacks,
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
        isLoading: true,
        vendor: {statistics: {}},
        isVendorLogo: null,
        vendorProperties: {},
        bgImages : [
          '/static/img/lock.jpg',
          '/static/img/login.jpg',
          '/static/img/register.jpg',
          '/static/img/bg-pricing.jpg',
          '/static/img/bg3.jpg',
        ],
        capacities: [
          { icon: 'people', value: '200', key: 'Standing' },
          { icon: 'airline_seat_recline_extra', value: '30', key: 'Seated' },
          { icon: 'fullscreen', value: '300 m2', key: 'Floor Area' },
        ],
        pricesAndRules: [
          { price: '41', description: 'Price / person' },
          { price: '74', description: 'Price / hour' },
          { price: '25', description: 'Daliy rent' },
          { price: '78', description: 'Minimum spend' },
          { price: '50', description: 'Reservation fee' },
          { price: '12', description: 'Cleaning fee' }
        ],
        checkListItems: [
          'Catering via venue',
          'Own food allowed',
          'Alchol license',
          'own beverages allowed',
          'Meeting Catering'
        ],
        attachments: [
          'Food menu Option 1',
          'Food menu Option 2',
          'Food menu Option Insurance Certificate',
          'Food menu Other Business Indication'
        ],
        proposals: [
          {
            image: '/static/img/shutterstock_289440710.png', 
            price: '258', 
            username: 'Jane Bloom, Facebook',
            title: 'Halloween Company Party',
            description: 'Corporate Guests 500 Guests',
            date: 'Feburary',
            status: 'In the same price range'
          },
          {
            image: '/static/img/shutterstock_289440710.png', 
            price: '7845', 
            username: 'Jane Bloom, Facebook',
            title: 'Halloween Company Party',
            description: 'Corporate Guests 500 Guests',
            date: 'Feburary',
            status: 'In the same price range'
          },
          {
            image: '/static/img/shutterstock_289440710.png', 
            price: '455122', 
            username: 'Jane Bloom, Facebook',
            title: 'Halloween Company Party',
            description: 'Corporate Guests 500 Guests',
            date: 'Feburary',
            status: 'In the same price range'
          },
        ],
        feedbacks: [
          {image: '/static/img/shutterstock_289440710.png', username: 'Jane Bloom, Facebook', date: '2017/12/29', score: '5', message: 'A 50% deposit will be due on or before 18/1/20.'},
          {image: '/static/img/shutterstock_289440710.png', username: 'Leonard Parker', date: '2017/12/29', score: '4', message: 'A 50% deposit will be due on or before 18/1/20.'},
          {image: '/static/img/shutterstock_289440710.png', username: 'Alex Marlon', date: '2017/12/29', score: '3', message: 'A 50% deposit will be due on or before 18/1/20.'}
        ],
        similarItems: [
          {image: '/static/img/shutterstock_289440710.png', thumbnail: 'thumbnail', score: '5', title: 'title'},
          {image: '/static/img/shutterstock_289440710.png', thumbnail: 'thumbnail', score: '5', title: 'title'},
        ],
        ratings: [1,2,3,4,5],
        currentTab: 1,
        routeName: null
      }
    },
    created () {
      this.routeName = this.$route.name;
    },
    mounted () {
      let _self = this
      this.isLoading = false;

      this.getVendor()
      this.getVendorProposals(this.$route.params.id)
    },
    methods: {
      getVendor() {
        this.$auth.currentUser(this, true, function () {
          Vendors.find(this.$route.params.id).then(vendor => {
            this.vendor = vendor
            this.isLoading = false
          })
        }.bind(this))
      },
      getVendorProposals(id) {
        this.isLoading = true;
        new Vendors({id}).proposalRequests().first().then(proposals => {
          console.log('proposals', proposals);
          this.proposals = proposals.vendorProposals;
          this.isLoading = false;
        });
      }
    },
    computed: {
      logoText: function () {
        if (!this.vendor.vendorDisplayName) {
          return null
        } else {
          const titleWords = this.vendor.vendorDisplayName.split(' ')
          if (titleWords.length > 1 && titleWords[titleWords.length-1].length > 0) {
            return titleWords[0].charAt(0) + titleWords[titleWords.length-1].charAt(0)
          } else {
            return titleWords[0].charAt(0)
          }
        }
      }
    },
    filters: {
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/md/_variables.scss";
  @import "@/assets/scss/md/_colors.scss";
  .md-layout {
    &.bg-white {
      background: #fff;

      .text-group {
        color: red;
        padding: 2em 1em;
      }

      .button-group {
        .md-success {
          margin-right: 1em;

          @media (max-width: $screen-sm-min) {
            display: flex;
          }
        }
        h4 {
          color: #45cdde;
          font-size: 12px;
          font-weight: 600;
          padding-right: 24em;
          margin-top: .5em;
          width: 100%;
          @media (max-width: $screen-sm-min) {
            padding: 0;
          }
        }
        @media (max-width: $screen-sm-min) {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
      }

      .title-cont {
        display: flex;

        .title-child {
          padding: 0 1em;
          img, .default-text-logo {
            width: 120px;
            height: 120px;
            position: relative;
            top: -2rem;
          }
          .default-text-logo {
            border: 3px solid #ffffff;
            border-radius: 3px;
            background-color: #999999;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
          }
          .address {
            font-size: 12px;
            i {
              font-size: 14px!important;
              padding-right: 4px;
              color: $grey-400;
            }
          }
          label {
            font-size: 12px;
          }
          .favorite {
            i {
              font-size: 12px!important;
              color: $purple-500!important;
            }
            font-size: 12px;
            text-transform: capitalize;
          }
        }
      }
    }
  }
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
            margin-top: 0;
            margin-right: .5em;
            color: $purple-500;
          }
          h4 {
            flex: 1;
            font-weight: 400;
            margin-top: 0;
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
            background: $grey-100;
            flex-basis: 100%;
            border: 1;
            border: 1px solid $grey-300;
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

      .md-divider {
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
  .capitalize {
    text-transform: capitalize;
  }
  .hor-divider {
    border-left: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
    margin: 0 .5em;
    padding: 0 .5em;
    display: inline-block;

    @media (max-width: $screen-sm-min) {
      border: none;
    }
  }
</style>