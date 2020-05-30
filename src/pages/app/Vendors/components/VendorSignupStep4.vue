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
                  <img :src="`${iconUrl}Asset 547.svg`"/> Website
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Asset 550.svg`"/> Instagram
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Asset 548.svg`"/> Facebook
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
          <div class="pricing-cont">
          </div>
          <div class="rules-cont">
          </div>
          <div class="policy-cont">
            <div class="title">
              <img :src="`${iconUrl}Asset 560.svg`"> OUR POLICY
            </div>
            <div class="rules">
              <div class="rule" v-for="(r, rIndex) in defRules.split(', ')" :key="rIndex">
                <div class="item">
                  {{r}}
                </div>
                <div class="item">
                  <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="yesRules.includes(r)"/>
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
      vendor: null,
      iconUrl: 'http://static.maryoku.com/storage/icons/Vendor Signup/',
      yesRules: [],
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
                  flex: 1;
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
  }  
</style>
