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
          <div class="about-cont">
            <div class="block">
              <span class="capacity"><img :src="`${iconUrl}Asset 545.svg`"/>Capacity</span>
              <span class="number">1000 <img :src="`${iconUrl}Group 4585 (2).svg`"/> 2000</span>
            </div>
            <div class="block">
              <div class="title lg">
                <img :src="`${iconUrl}Asset 563.svg`"/> ABOUT
              </div>
              <div class="desc">
                Lorem
              </div>
            </div>
            <div class="block">
              <div class="title">
                <img :src="`${iconUrl}Asset 543.svg`"/> About Our Venue
              </div>
              <div class="desc">
                Lorem
              </div>
            </div>
            <div class="block">
              <div class="title">
                <img :src="`${iconUrl}Group 1471 (2).svg`"/> About Our Cuisine
              </div>
              <div class="desc">
                Lorem
              </div>
            </div>
            <div class="contact-us">
              <h4>CONTACT US</h4>
              <div class="items">
                <div class="item">
                  <img :src="`${iconUrl}Asset 547.svg`"/> {{vendor.contact.email}}
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Asset 550.svg`"/> {{vendor.contact.address}}
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Asset 548.svg`"/> {{vendor.contact.phone}}
                </div>
              </div>
            </div>
            <div class="social">
              Website & social
              <div class="items">
                <div class="item">
                  <img :src="`${iconUrl}Asset 539.svg`"/> Website
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Group 4569 (2).svg`"/> Instagram
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Asset 540.svg`"/> Facebook
                </div>
              </div>
            </div>
          </div>
          <div class="fee-cont">
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
          </div>
          <div class="extra-cont">
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
          <div class="policy-cont">
            <div class="title">
              <img :src="`${iconUrl}Group 1471 (2).svg`"> OUR POLICY
            </div>
            <div class="rules">
              <div class="rule" v-for="(r, rIndex) in defRules.split(', ')" :key="rIndex">
                <div class="item">
                  {{r}}
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="vendor.yesRules.includes(r)"/>
                  <img :src="`${iconUrl}Group 5489 (3).svg`" v-else/>
                </div>
              </div>
            </div>
            <div class="not-allowed">
              <h5>We don't allow these 3rd party vendor:</h5>
              <p>
                {{defNa}}
              </p>
            </div>
            <div class="dont-work">
              <h5>We don't work on:</h5>
              <div class="item" v-for="(d, dIndex) in defRules.split(', ')" :key="dIndex">
                <img :src="`${iconUrl}Group 5489 (4).svg`"/>
                {{d}}
              </div>
            </div>
          </div>
          <div class="pricing-policy-cont">
            <div class="title">
              <img :src="`${iconUrl}Asset 560.svg`"> OUR PRICING POLICY
            </div>
            <div class="item">
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
            </div>
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

export default {
  name: 'vendor-signup-step4',
  props: {
    categories: Array,
    icon: String,
  },
  components: {
    VueElementLoading,
    VendorServiceItem
  },
  data() {
    return {
      vendor: {
        capacity: {
          low: null,
          hight: null,
        },
        about: {
          company: null, 
          venue: null, 
          cuisine: null,
        },
        contact: {
          email: 'venue@hotmail.com', 
          address: '575 Mission St. San Franciso CA 94105', 
          phone: '077-300283',
        },
        social: {
          website: null, 
          facebook: null, 
          instagram: null,
        },
        yesRules: [],
        policies: [],
      },
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
      expanded: false,
      iconUrl: 'http://static.maryoku.com/storage/icons/Vendor Signup/',
      defRules: 'Suitable for pets, Smoking allowed, Suitable for infants(Under 2 years), Dress code, Overtime Cost',
      defNa: 'Catering, Dj, Photographer, Show / Performance, Flowers, Transporation, Decoration, Rentals, Favours & Gifts, Other'
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    
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

          .about-cont {
            padding: 2rem 0;
            border-bottom: 1px solid #dddddd;

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
                  margin-right: 3rem;
                  font: bold 16px Manrope-Regular, sans-serif;
                  img {
                    width: 24px;
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
  }  
</style>
