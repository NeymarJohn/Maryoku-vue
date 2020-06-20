<template>
  <div class="vendor-signup-step4-wrapper">
    <div class="inside-container">
      <div class="left-side">
        <img :src="`${iconUrl}Group 5225 (2).svg`"/>
        <h2>SUMMARY</h2>
        <p>This is a summary of your company's info which we'll use in future proposal creating</p>
        <h2>4/4</h2>
      </div>
      <div class="right-side">
        <div class="card">
          <div class="tabs">
            <div 
              class="tab" 
              :class="{'active': t == activeTab}" 
              v-for="(t, tIndex) in tabs" 
              :key="tIndex"
              @click="goToSection(t)"
            >
              {{t}}
            </div>
          </div>
          <div class="banner">
            <img :src="vendor.images[0]" v-if="vendor.images.length > 0"/>
            <!-- <img :src="vendor.coverPhoto" v-if="vendor.coverPhoto"/> -->
            <!-- <img src="http://static.maryoku.com/storage/img/sidebar-2.jpg" v-else/> -->
          </div>
          <div class="about-cont" id="About">
            <div class="block">
              <span class="capacity"><img :src="`${iconUrl}Asset 545.svg`"/>Capacity</span>
              <span class="number">{{vendor.capacity.low}} <img :src="`${iconUrl}Group 4585 (2).svg`"/> {{vendor.capacity.high}}</span>
            </div>
            <div class="block">
              <div class="title lg">
                <img :src="`${iconUrl}Asset 563.svg`"/> ABOUT
              </div>
              <div class="desc">
                {{vendor.about.company}}
              </div>
            </div>
            <div class="block">
              <div class="title">
                <img :src="`${$iconURL}Budget Elements/${getCategoryIconByValue(vendor.vendorCategory)}`"/> About Our {{getCategoryNameByValue(vendor.vendorCategory)}}
              </div>
              <div class="desc">
                {{vendor.about.category}}
              </div>
            </div>
            <!-- <div class="block">
              <div class="title">
                <img :src="`${iconUrl}Group 1471 (2).svg`"/> About Our Cuisine
              </div>
              <div class="desc">
                Lorem
              </div>
            </div> -->
            <div class="images">
              <span class="prev" @click="prev()" v-if="imageSlidePos < 0">
                <md-icon>keyboard_arrow_left</md-icon>
              </span>
              <div class="cont" :style="{'left': `${imageSlidePos}px`}" ref="imagesCont">
                <img :src="img" v-for="(img, ind) in vendor.images" :key="ind" @click="view()"/>
              </div>
              <span class="next" @click="next()" v-if="imageSlidePos >= 0">
                <md-icon>keyboard_arrow_right</md-icon>
              </span>
              <LightBox
                v-if="getGalleryImages().length > 0"
                :images="getGalleryImages()"
                ref="lightbox"
                :show-light-box="false"
              />
            </div>
            <div class="contact-us" id="Contact">
              <h4>CONTACT US</h4>
              <div class="items">
                <div class="item">
                  <img :src="`${iconUrl}Asset 547.svg`"/> {{vendor.email}}
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Asset 550.svg`"/> {{vendor.address}}
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Asset 548.svg`"/> {{vendor.phone}}
                </div>
              </div>
            </div>
            <div class="social" v-if="isSocial()">
              Website & social
              <div class="items">
                <div class="item" v-for="(s, sIndex) in socialMediaBlocks" :key="sIndex" :class="{'mr-3': vendor.social[s.name]}">
                  <template v-if="vendor.social[s.name]">
                    <img :src="`${iconUrl}${s.icon}`"/> {{vendor.social[s.name]}}
                  </template>
                </div>
                <!-- <div class="item" v-if="vendor.social.website">
                  <img :src="`${iconUrl}Asset 539.svg`"/> {{vendor.social.website}}
                </div>
                <div class="item" v-if="vendor.social.instagram">
                  <img :src="`${iconUrl}Group 4569 (2).svg`"/> {{vendor.social.instagram}}
                </div>
                <div class="item" v-if="vendor.social.facebook">
                  <img :src="`${iconUrl}Asset 540.svg`"/> {{vendor.social.facebook}}
                </div> -->
              </div>
            </div>
          </div>
          <!-- <div class="fee-cont" id="Pricing">
            <div class="title">
              <h3><img :src="`${iconUrl}Asset 562.svg`"/> ELEMENTS IN STARTING FEE</h3>
            </div>
            <div class="cblock">
              <div class="cheader">
                <img :src="`${iconUrl}Asset 543.svg`"/>Venue
              </div>
              <div class="citems">
                <div class="citem" v-for="(fv, fvIndex) in feeVenues" :key="fvIndex">
                  <img :src="`${iconUrl}Group 5479 (2).svg`"/>
                  <span class="value">{{fv.value}}</span>
                  <span class="qty">{{fv.qty}}</span>
                  <img :src="`http://static.maryoku.com/storage/icons/NewSubmitPorposal/Group 4770 (2).svg`"/>
                </div>
              </div>
            </div>
            <div class="cblock">
              <div class="cheader">
                <img :src="`${iconUrl}Group 1471 (2).svg`"/>Catering
              </div>
              <div class="citems">
                
              </div>
            </div>
          </div> -->
          <div class="extra-cont" id="Pricing">
            <div class="title">
              <h3><img :src="`${iconUrl}Asset 526.svg`"/>WITH EXTRA PAY</h3>
            </div>
            <div class="cblock">
              <div class="cheader">
                <img :src="`${iconUrl}Asset 543.svg`"/>Venue
              </div>
              <div class="citems">
                <div class="citem">
                  <div class="collapsed" @click="expanded=!expanded">
                    <div class="col">
                      Lorem
                    </div>
                    <div class="col">
                      2
                    </div>
                    <div class="col">
                      +$100.00
                    </div>
                    <div class="col">
                      <img :class="{'rotate-90': expanded}" :src="`http://static.maryoku.com/storage/icons/NewSubmitPorposal/Group 4770 (2).svg`"/>
                    </div>
                  </div>
                  <div class="expanded" v-if="expanded">
                    Lorem ipsum
                  </div>
                </div>
              </div>
            </div>
            <div class="cblock">
              <div class="cheader">
                <img :src="`${iconUrl}Group 1471 (2).svg`"/>Catering
              </div>
              <div class="citems">
                <div class="citem">
                  <div class="collapsed" @click="expanded=!expanded">
                    <div class="col">
                      Lorem
                    </div>
                    <div class="col">
                      2
                    </div>
                    <div class="col">
                      +$100.00
                    </div>
                    <div class="col">
                      <img :class="{'rotate-90': expanded}" :src="`http://static.maryoku.com/storage/icons/NewSubmitPorposal/Group 4770 (2).svg`"/>
                    </div>
                  </div>
                  <div class="expanded" v-if="expanded">
                    Lorem ipsum
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="policy-cont" id="Policy">
            <div class="title">
              <img :src="`${iconUrl}Group 1471 (2).svg`"> OUR POLICY
            </div>
            <div class="rules">
              <div class="rule" v-for="(y, yIndex) in vendor.yesRules" :key="yIndex">
                <div class="item">
                  {{y.name}}
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="vendor.yesRules.includes(y)"/>
                </div>
              </div>
              <div class="rule" v-for="(n, nIndex) in vendor.noRules" :key="nIndex">
                <div class="item">
                  {{n.name}}
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Group 5489 (4).svg`" v-if="vendor.noRules.includes(n)"/>
                </div>
              </div>
            </div>
            <div class="not-allowed" v-if="vendor.vendorCategory == 'venuerental'">
              <h5>We don't allow these 3rd party vendor:</h5>
              <p>
                {{mergeStringItems(vendor.notAllowed)}}
              </p>
            </div>
            <div class="dont-work">
              <h5>We don't work on:</h5>
              <div class="item" v-if="mergeStringItems(vendor.selectedWeekdays)">
                <img :src="`${iconUrl}Group 5489 (4).svg`"/>
                {{mergeStringItems(vendor.selectedWeekdays)}}
              </div>
              <div class="item" v-for="(d, dIndex) in vendor.exDonts" :key="dIndex">
                <img :src="`${iconUrl}Group 5489 (4).svg`"/>
                {{d}}
              </div>
              <div class="item" v-if="vendor.dontWorkDays">
                <img :src="`${iconUrl}Group 5489 (4).svg`"/>
                {{dontWorkDays()}}
              </div>
              <div class="item" v-if="vendor.dontWorkTime">
                <img :src="`${iconUrl}Group 5489 (4).svg`"/>
                {{dontWorkTime()}}
              </div>
            </div>
          </div>
          <div class="pricing-policy-cont" id="Rules">
            <div class="title">
              <img :src="`${iconUrl}Asset 560.svg`"> OUR PRICING POLICY
            </div>
            <div class="rules">
              <div class="rule" v-for="(y, yIndex) in vendor.yesPolicies" :key="yIndex">
                <div class="item">
                  {{y.name}}
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="vendor.yesPolicies.includes(y)"/>
                </div>
              </div>
              <div class="rule" v-for="(n, nIndex) in vendor.noPolicies" :key="nIndex">
                <div class="item">
                  {{n.name}}
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Group 5489 (4).svg`" v-if="vendor.noPolicies.includes(n)"/>
                </div>
              </div>
            </div>
            <!-- <div class="item">
              <h5>We charge deposit of:</h5>
              <p>
                50% of the total event
              </p>
            </div>
            <div class="item lb">
              <h5>Our cancellation approach</h5>
            </div>
            <div class="item">
              <h5>We allow free cancellation until:</h5>
              <p>
                30 days before the event
              </p>
              <div class="ifthan-cont">
                <div class="ifthan">
                  <b>If</b> the client cancel the event
                </div>
                <div class="ifthan">
                  <b>Than</b> the client will pay full deposit
                </div>
              </div>
            </div>
            <div class="item">
              <h6>Additional:</h6>
              <p>
                Lorem
              </p>
            </div> -->
            <div class="item">
              <h6 class="underline">Relish caterers & venues:</h6>
            </div>
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
import VendorServiceItem from './VendorServiceItem.vue'
import LightBox from 'vue-image-lightbox'
import carousel from 'vue-owl-carousel'

export default {
  name: 'vendor-signup-step4',
  props: {
    categories: Array,
    icon: String,
    vendor: Object,
  },
  components: {
    VueElementLoading,
    VendorServiceItem,
    LightBox,
    carousel
  },
  data() {
    return {
      tabs: ['About', 'Pricing', 'Rules', 'Policy', 'Contact'],
      socialMediaBlocks: [
        {
          name: 'website',
          icon: 'Asset 539.svg',
        },
        {
          name: 'facebook',
          icon: 'Asset 540.svg',
        },
        {
          name: 'instagram',
          icon: 'Group 4569 (2).svg',
        },
        {
          name: 'youtube', 
          icon: 'Asset 540.svg',
        },
        {
          name: 'linkedin', 
          icon: 'Asset 540.svg',
        },
        {
          name: 'google', 
          icon: 'Asset 540.svg',
        },
        {
          name: 'pinterest', 
          icon: 'Asset 540.svg',
        },
        {
          name: 'foursuare', 
          icon: 'Asset 540.svg',
        },
        {
          name: 'reddit', 
          icon: 'Asset 540.svg',
        },
        {
          name: 'tiktok', 
          icon: 'Asset 540.svg',
        },
      ],
      activeTab: 'About',
      feeVenues: [
        {
          value: 'Set up',
          qty: null
        },
        {
          value: 'In-house bar services',
          qty: 1
        }
      ],
      feeCatering: [
        {
          value: 'Set up',
          qty: null
        },
        {
          value: 'In-house bar services',
          qty: 2
        }
      ],
      imageSlidePos: 0,
      expanded: false,
      iconUrl: 'http://static.maryoku.com/storage/icons/Vendor Signup/',
      defRules: 'Suitable for pets, Smoking allowed, Suitable for infants(Under 2 years), Dress code, Overtime Cost',
      defNa: 'Catering, Dj, Photographer, Show / Performance, Flowers, Transporation, Decoration, Rentals, Favours & Gifts, Other',
      categoryNames: [
        {
          name: 'Venue Rental',
          value: 'venuerental',
          icon: 'venuerental.svg'
        },
        {
          name: 'Food & Beverage',
          value: 'foodandbeverage',
          icon: 'foodandbeverage.svg'
        },
        {
          name: 'Design and Decor',
          value: 'decor',
          icon: 'decor.svg'
        },
        {
          name: 'Guest Services & Staffing',
          value: 'corporatesocialresponsibility',
          icon: 'corporatesocialresponsibility.svg'
        },
        {
          name: 'Signage / Printing',
          value: 'signageprinting',
          icon: 'signageprinting.svg'
        },
        {
          name: 'Advertising and Promotion',
          value: 'advertising-promotion',
          icon: 'advertising-promotion.svg'
        },
        {
          name: 'AV / Staging',
          value: 'audiovisualstagingservices',
          icon: 'audiovisualstagingservices.svg'
        },
        {
          name: 'Swags',
          value: 'swags',
          icon: 'swags.svg'
        },
        {
          name: 'Shipping',
          value: 'shipping',
          icon: 'shipping.svg'
        },
        {
          name: 'Transportation & Tour operator',
          value: 'transportation',
          icon: 'transportation.svg'
        },
        {
          name: 'Entertainment',
          value: 'entertainment',
          icon: 'entertainment.svg'
        },
        {
          name: 'Administration',
          value: 'administration',
          icon: 'administration.svg'
        },
        {
          name: 'Security',
          value: 'securityservices',
          icon: 'securityservices.svg'
        },
        {
          name: 'Technology',
          value: 'technologyservices',
          icon: 'technologyservices.svg'
        },
        {
          name: 'Videography and Photography',
          value: 'videographyandphotography',
          icon: 'videographyandphotography.svg'
        },
        {
          name: 'Equipment Rental',
          value: 'equipmentrentals',
          icon: 'equipmentrentals.svg'
        }
      ],
    }
  },
  created() {
    
  },
  mounted() {
  },
  methods: {
    isSocial() {
      let isBlank = true

      _.each(this.vendor.social, s => {
        isBlank &= s === null
      })

      return !isBlank
    },
    prev() {
      const ww = this.vendor.images.length * 320
      const sw = this.$refs.imagesCont.clientWidth
      if ( ww / sw > 2 ) {
        this.imageSlidePos += 320 * 4
      } else if ( ww / sw > 1 ) {
        this.imageSlidePos += ww % sw + 60
      } else {
        this.imageSlidePos
      }
      console.log(this.imageSlidePos)
    },
    next () {
      const ww = this.vendor.images.length * 320
      const sw = this.$refs.imagesCont.clientWidth
      if ( ww / sw > 2 ) {
        this.imageSlidePos -= 320 * 4
      } else if ( ww / sw > 1 ) {
        this.imageSlidePos -= ww % sw + 60
      } else {
        this.imageSlidePos
      }
      console.log(this.imageSlidePos)
    },
    goToSection(item) {
      this.activeTab = item
      const theElement = document.getElementById(item)
      const y = theElement.getBoundingClientRect().top + window.pageYOffset
      const yOffset = -50
      window.scrollTo({
        top: y + yOffset,
        behavior: 'smooth'
      }) 
    },
    getCategoryIconByValue(value) {
      return this.categoryNames.filter( c => c.value == value)[0].icon
    },
    getCategoryNameByValue(value) {
      return this.categoryNames.filter( c => c.value == value)[0].name
    },
    mergeStringItems(items) {
      let naItems = ''
      _.each(items, n => {
        naItems += `${this.capitalize(n)}, `
      })
      naItems = naItems.substring(0, naItems.length - 2)
      return naItems
    },
    dontWorkDays() {
      return `${this.vendor.dontWorkDays.dateRange.start.date} ~ ${this.vendor.dontWorkDays.dateRange.end.date}`
    },
    dontWorkTime() {
      return `${this.vendor.dontWorkTime.startTime.hh}:${this.vendor.dontWorkTime.startTime.mm}:${this.vendor.dontWorkTime.amPack.start} ~ ${this.vendor.dontWorkTime.endTime.hh}:${this.vendor.dontWorkTime.endTime.mm}:${this.vendor.dontWorkTime.amPack.end}`
    },
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    getGalleryImages: function () {
      let temp = []

      if (this.vendor.images.length > 0) {
        this.vendor.images.forEach(item => {
          temp.push({
            thumb: item,
            src: item,
            caption: 'test',
          })
        })
        return temp
      } else {
        return []
      }
    },
    view() {
      if (this.$refs.lightbox) {
        this.$refs.lightbox.showImage(0)
      }
    }
  },
  computed: {
    
  },
  filters: {
  },
  watch: {
  }
};
</script>
<style lang="scss" scoped>
  .vendor-signup-step4-wrapper {
    font-family: Manrope-Regular, sans-serif;

    .inside-container {
      display: flex;
      color: #050505;

      .left-side {
        flex: 1;
        margin-right: 122px;

        img {
          width: 92.5px;
        }
        h4 {
          margin: 36px 0 11px 0;
          font: 800 20px Manrope-Regular, sans-serif;
        }
        p {
          margin: 0;
          padding: 0;
          font: normal 16px Manrope-Regular, sans-serif;
        }
        h2 {
          margin: 30px 0;
          font: 800 40px Manrope-Regular, sans-serif;
        }
        h3 {
          margin: 0;
          color: #f51355;
          font: bold 20px Manrope-Regular, sans-serif;
        }
      }
      .right-side {
        flex: 3;

        .card {
          padding: 30px 60px 60px 60px;
          background-color: #ffffff;
          box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);

          .tabs {
            display: flex;
            margin: -30px -60px;
            .tab {
              padding: 1rem 2rem;
              border-right: 1px solid #818080;
              cursor: pointer;

              &.active {
                border-top: 5px solid #f51355;
                font: bold 16px Manrope-Regular, sans-serif;
              }
            }
          }
          .banner {
            margin: 30px -60px calc(30px - 2rem) -60px;
            padding-bottom: 2rem;
            img {
              width: 100%;
              height: 460px;
            }
          }
          .about-cont {
            padding: 2rem 0;
            // border-bottom: 1px solid #dddddd;

            .block {
              span {
                &.capacity {
                  margin-right: 2rem;
                  font: bold 16px Manrope-Regular, sans-serif;
                  img {
                    width: 26px;
                    margin-right: 1rem;
                  }
                }
                &.number {
                  font: normal 16px Manrope-Regular, sans-serif;
                  img {
                    width: 40px;
                    margin: 0 1rem;
                  }
                }
              }
              .title {
                margin: 2rem 0 1rem 0;
                img {
                  width: 20px;
                  margin-right: 1rem;
                }
                font: 800 16px Manrope-Regular, sans-serif;
                &.lg {
                  img {
                    width: 50px;
                    margin-left: -10px;
                  }
                  font: 800 30px Manrope-Regular, sans-serif;
                }
              }
              .desc {
                font: normal 16px Manrope-Regular, sans-serif;
                width: 60%;
              }
            }
            .images {
              display: block;
              overflow: hidden;
              padding: 2rem 0;
              white-space: nowrap;
              position: relative;
              margin-right: -60px;

              span {
                cursor: pointer;
                position: absolute;
                width: 28px;
                height: 28px;
                background-color: #ffffff;
                box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
                border-radius: 50%;
                text-align: center;
                font-weight: 800;
                z-index: 99;
                top: 50%;
                transform: translateY(-50%);

                &.prev {
                  left: 0;
                }
                &.next {
                  right: 60px;
                }
              }
              .cont {
                position: relative;
                img {
                  width: 300px;
                  height: 177px;
                  margin-right: 2rem;
                  cursor: zoom-in;
                }
              }
            }
            .contact-us {
              padding: 2rem 0;
              border-bottom: 1px solid #dddddd;
              h4 {
                margin: 0;
                font: 800 30px Manrope-Regular, sans-serif;
              }
              .items {
                display: flex;
                white-space: nowrap;
                margin-top: 2rem;

                .item {
                  margin-right: 3rem;
                  font: normal 16px Manrope-Regular, sans-serif;
                  text-decoration: underline;
                  img {
                    width: 24px;
                    height: 24px;
                    margin-right: 1rem;
                  }
                }
              }
            }
            .social {
              padding: 2rem 0;
              .items{
                display: flex;
                white-space: nowrap;
                margin-top: 2rem;

                .item {
                  font: bold 16px Manrope-Regular, sans-serif;
                  img {
                    width: 24px;
                    height: 24px;
                    margin-right: 1rem;
                  }
                }
              }
            }
          }
          .fee-cont {
            .title {
              margin: 2rem 0;
              h3 {
                margin: 0;
                font: 800 30px Manrope-Regular, sans-serif;
                img {
                  width: 24px;
                  margin-right: 1rem;
                }
              }
            }
            .cblock {
              .cheader {
                display: flex;
                padding: 1rem 0 1rem 60px;
                background: #ededed;
                margin: 0 -60px;
                width: 100%;
                font: bold 16px Manrope-Regular, sans-serif;

                img {
                  width: 24px;
                  margin-right: 1rem;
                }
              }
              .citems {
                width: calc(100% - 4rem);
                display: flex;
                .citem {
                  border-bottom: 1px solid #dddddd;
                  padding: 2rem 0;
                  display: flex;
                  width: 50%;

                  img {
                    width: 20px;

                    &:first-child {
                      margin-right: 1rem;
                    }
                  }
                  span {
                    flex: 1;
                    display: inline-block;
                    &.value {
                      font: 800 16px Manrope-Regular, sans-serif;
                    }
                    &.qty {
                      font: normal 16px Manrope-Regular, sans-serif;
                    }
                  }
                  &:nth-child(2n+1) {
                    margin-right: 1rem;
                  }
                }
              }
            }
          }
          .extra-cont {
            .title {
              margin: 2rem 0;
              h3 {
                font: 800 30px Manrope-Regular, sans-serif;
                margin: 0;
                img {
                  width: 20px;
                  margin-right: 1rem;
                }
              }
            }
            .cblock {
              .cheader {
                display: flex;
                padding: 1rem 0 1rem 60px;
                background: #ededed;
                margin: 0 -60px;
                width: calc(100% - 5rem);
                font: bold 16px Manrope-Regular, sans-serif;

                img {
                  width: 24px;
                  margin-right: 1rem;
                }
              }
              .citems {
                .citem {
                  width: calc(100% - 5rem - 60px);
                  border-bottom: 1px solid #dddddd;
                  cursor: pointer;

                  .collapsed {
                    display: flex;
                    padding: 2rem 0;
                    .col {
                      flex: 1;
                      width: 20px;

                      img {
                        width: 20px;
                      }
                      &:first-child {
                        flex: 2;
                        font: bold 16px Manrope-Regular, sans-serif;
                      }
                      &:last-child {
                        text-align: right;
                      }
                    }
                  }
                  .expanded {
                    font: normal 14px Manrope-Regular, sans-serif;
                    padding-bottom: 1rem;
                  }
                }
              }
            }
          }
          .policy-cont {
            border-top: 1px solid #dddddd;
            border-bottom: 1px solid #dddddd;
            padding: 2rem 60px;
            margin: auto -60px;

            .title  {
              img {
                width: 30px;
                margin-right: 1rem;
              }
              font: 800 30px Manrope-Regular, sans-serif;
            }
            .rules {
              margin: 3rem 0;
              .rule {
                padding: 2rem 0;
                border-bottom: 1px solid #dddddd;
                font: 600 16px Manrope-Regular, sans-serif;
                display: flex;
                align-items: center;

                .item {
                  flex: 1;

                  img {
                    width: 30px;
                  }
                }
                &:first-child {
                  border-top: 1px solid #dddddd;
                }
              }
            }
            .not-allowed {
              h5 {
                font: 800 20px Manrope-Regular, sans-serif;
              }
              p {
                font: normal 16px Manrope-Regular, sans-serif;
              }
            }
            .dont-work {
              h5 {
                font: 800 20px Manrope-Regular, sans-serif;
              }
              .item {
                margin-bottom: 1rem;
                img {
                  width: 21px;
                  margin-right: 1rem;
                }
              }
            }
          }
          .pricing-policy-cont {
            margin-top: 2rem;
            .title {
              margin-bottom: 2rem;
              img {
                width: 30px;
                margin-right: 1rem;
              }
              font: 800 30px Manrope-Regular, sans-serif;
            }
            .rules {
              margin: 3rem 0;
              .rule {
                padding: 2rem 0;
                border-bottom: 1px solid #dddddd;
                font: 600 16px Manrope-Regular, sans-serif;
                display: flex;
                align-items: center;

                .item {
                  flex: 1;

                  img {
                    width: 30px;
                  }
                }
                &:first-child {
                  border-top: 1px solid #dddddd;
                }
              }
            }
            .item {
              padding: 1rem 0;
              h5 {
                margin: 0;
                font: 800 20px Manrope-Regular, sans-serif;
              }
              h6 {
                margin: 0;
                font: 800 16px Manrope-Regular, sans-serif;
                text-transform: initial;

                &.underline {
                  text-decoration: underline;
                }
              }
              p {
                font: normal 16px Manrope-Regular, sans-serif;
              }
              .ifthan-cont {
                display: flex;
                .ifthan {
                  flex: 1;
                  b {
                    font: 800 20px Manrope-Regular, sans-serif;
                  }
                }
              }
              &.lb {
                background-color: #ededed;
                margin: 2rem 0 1rem -60px;
                padding-left: 60px;
                width: 80%;
              }
            }
          }
        }
      }
    }
    .rotate-90 {
      transform: rotate(90deg);
    }
    .mr-3 {
      margin-right: 3rem;
    }
  }  
</style>
