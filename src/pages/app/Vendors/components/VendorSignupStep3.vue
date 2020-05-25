<template>
  <div class="vendor-signup-step3-wrapper">
    <div class="inside-container">
      <div class="left-side">
        <img :src="`${iconUrl}Group 5224 (2).svg`"/>
        <h2>DISCLAMER & <br/>POLICY</h2>
        <p>Those elements will automatically appear on your future proposal</p>
        <h2>3/4</h2>
      </div>
      <div class="right-side">
        <div class="policy-wrapper mb-50">
          <div class="title-cont">
            <div class="top">
              <h5><img :src="`${iconUrl}Asset 560.svg`"/> Policy</h5>
            </div>
            <div class="bottom">
              <p>Set venue rules for your guests</p>
            </div>
          </div>
          <div class="card">
            <v-signup-add-rules
              :comType="'rule'"
              :title="rulesDesc"
            />
          </div>
        </div>
        <div class="pricing-policy-wrapper mb-50">
          <div class="title-cont">
            <div class="top">
              <h5><img :src="`${iconUrl}Asset 536.svg`"/> pricing policy</h5>
            </div>
            <div class="bottom">
              <p>use the suggested element or add your own itmes to your disclaimer</p>
            </div>
          </div>
          <div class="card">
            <div class="field mb-50">
              <div class="label">
                <span>How much deposit do you charge?</span>
              </div>
              <input type="text" class="" placeholder="Like: 50% of the total event"/>
            </div>
            <div class="field ml-title">
              <h4>cancellation approach</h4>
            </div>
            <div class="field mb-50">
              <div class="label">
                <div class="title-cont">
                  <div class="left m-0">
                    <h5>cancellation is allowed until...?</h5>
                  </div>
                  <div class="right">
                    <p>(With full refund)</p>
                  </div>
                </div>
              </div>
              <input type="text" class="" placeholder="Like: 60 days prior to the start of the event..."/>
            </div>
            <div class="field mb-50">
              <v-signup-add-rules
                :comType="'policy'"
                :title="policyDesc"
              />
            </div>
            <div class="field mb-50">
              <div class="label">
                <div class="title-cont">
                  <div class="left m-0">
                    <h5>additional disclaimer</h5>
                  </div>
                  <div class="right">
                    <p>*suggested</p>
                  </div>
                </div>
              </div>
              <textarea placeholder="For example : A 50% deposite will be due on or befor eThe remaining balance will be collected a week prior to the event" rows="5"/>
            </div>
          </div>
        </div>
        <div class="3rd-party-vendor-wrapper mb-50">
          <div class="title-cont">
            <div class="top">
              <h5>3rd party vendor</h5>
            </div>
          </div>
          <div class="card">
            <div class="title-cont">
              <div class="left">
                <h5>do you allow 3rd party vendor?</h5>
              </div>
              <div class="right">
                <p>(this question is for venues only)</p>
              </div>
            </div>
            <div class="checks-cont">
              <div class="check-item" @click="allowThirdVendor = 0">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="allowThirdVendor == 0"/>
                <span class="unchecked" v-else></span>
                <span>Yes</span>
              </div>
              <div class="check-item" @click="allowThirdVendor = 1">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="allowThirdVendor == 1"/>
                <span class="unchecked" v-else></span>
                <span>No</span>
              </div>
              <div class="check-item" @click="allowThirdVendor = 2">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="allowThirdVendor == 2"/>
                <span class="unchecked" v-else></span>
                <span>Some</span>
              </div>
            </div>
            <div class="not-allow-cont" v-if="allowThirdVendor==2">
              <h4>Which of the vendors do you not allow to work in your venue?</h4>
              <div class="na-check-list">
                <ul>
                  <li v-for="(n, nIndex) in defNa.split(', ')" :key="nIndex" @click="updateNa(n)">
                    <img :src="`${iconUrl}Group 5489 (4).svg`" v-if="notAllowed.includes(n)"/>
                    <img :src="`${iconUrl}Rectangle 1245.svg`" v-else/>
                    {{n}}
                  </li>
                  <li v-if="notAllowed.includes('Other')">
                    <input type="text" placeholder="Type vendor category..."/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="social-wrapper">
          <div class="title-cont">
            <div class="top">
              <h5>blackout days</h5>
            </div>
          </div>
          <div class="card">
            <div class="title-cont">
              <div class="top">
                <h5>are there times when your don't work regularly?</h5>
              </div>
              <div class="bottom">
                <p>This way we kow not to send your irrelevant offers</p>
              </div>
            </div>
            <div class="checks-cont mt-2">
              <div class="check-item" @click="workAllDay = true">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="workAllDay"/>
                <span class="unchecked" v-else></span>
                <span>I work all the time</span>
              </div>
              <div class="check-item" @click="workAllDay = false">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="!workAllDay"/>
                <span class="unchecked" v-else></span>
                <span>There are times I don't work ></span>
              </div>
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
import VSignupAddRules from '@/components/Inputs/VSignupAddRules.vue'

export default {
  name: 'vendor-signup-step3',
  props: {
    categories: Array,
    icon: String,
  },
  components: {
    VueElementLoading,
    VendorServiceItem,
    VSignupAddRules
  },
  data() {
    return {
      vendor: null,
      iconUrl: 'http://static.maryoku.com/storage/icons/Vendor Signup/',
      allowThirdVendor: null,
      workAllDay: false,
      rulesDesc: {
        title: 'additional rules',
        placeholder: 'Event muse end before.. / Suitable for children (2-12 years)'
      },
      policyDesc: {
        title: 'Add steps to your cancellation approch:',
        subTitle: 'You can add more than one step',
        labels: {
          if: 'the client cancel the event after:',
          than: 'the client wil pay:',
        },
        placeholder: {
          if: 'Like two weeks before the event ',
          than: 'Like: 30% of deposit',
        },
      },
      notAllowed: [],
      isOtherNa: false,
      defNa: 'Catering, Dj, Photographer, Show / Performance, Flowers, Transporation, Decoration, Rentals, Favours & Gifts, Other'
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    updateNa(item) {
      if (this.notAllowed.includes(item)) {
        this.notAllowed = this.notAllowed.filter(n => n != item)
      } else {
        this.notAllowed.push(item)
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
  .vendor-signup-step3-wrapper {
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
          font-family: Manrope-Regular, sans-serif;
          color: #050505;
          background: #ffffff;
          -webkit-box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
          box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
          padding: 60px;
          margin-bottom: 2rem;

          .field {
            font: 800 16px Manrope-Regular, sans-serif;
            margin: 0 0 2rem 0;
            .label {
              margin-bottom: .5rem;
              img {
                width: 24px;
                margin-right: .5rem;
              }
              span {
                text-transform: capitalize;
              }
            }
            input {
              font-size: 16px;
              padding: 22px 30px;
              min-width: 75%;
              border: 1px solid #707070;
              border-radius: 0;
            }
            .main-cont {
              display: flex;
              align-items: center;

              .suffix {
                flex: 2;
                input {
                  padding-left: 45%;
                  width: 100%;
                }
                &:before {
                  position: absolute;
                  margin-top: 12px;
                  margin-left: 1.5rem;
                }
                &:first-child {
                  &:before {
                    content: 'Min'
                  }
                }
                &:last-child {
                  &:before {
                    content: 'Max'
                  }
                }
              }
              .arrow {
                flex: 1;
                text-align: center;
                img {
                  width: 3rem;
                }
              }
            }
          }
          .checks-cont {
            display: flex;
            justify-content: flex-start;
            .check-item {
              display: flex;
              align-items: center;
              margin-right: 5rem;
              cursor: pointer;

              img {
                width: 30px;
                height: 30px;
                margin-right: 14px;
              }
            }
            span {
              &.unchecked {
                display: inline-block;
                width: 30px;
                height: 30px;
                border: 1px solid #707070;
                border-radius: 50%;
                background: #ffffff;
                margin-right: 14px;
              }
            }
          }
          .not-allow-cont {
            margin-top: 3rem;
            h4 {
              font: bold 16px Manrope-Regular, sans-serif;
            }
            .na-check-list {
              ul {
                margin: 0;
                list-style: none;
                padding: 0;
                column-count: 4;
                li {
                  margin-bottom: 1rem;
                  cursor: pointer;
                  img {
                    width: 27px;
                    height: 27px;
                    margin-right: 1rem;
                  }
                  input {
                    font-size: 16px;
                    padding: 22px 30px;
                    min-width: 75%;
                    border: 1px solid #dddddd;
                    border-radius: 0;
                    margin-left: 3rem;
                  }
                }
              }
            }
          }
          h5 {
            font: 800 16px Manrope-Regular, sans-serif;
          } 
        }
      }
    }
    .title-cont {
      text-transform: capitalize;
      img {
        width: 24px;
        margin-right: .5rem;
      }
      h5 {
        font: 800 16px Manrope-Regular, sans-serif;
        margin: 0;
      }
      p {
        margin: 0;
        font: normal 14px Manrope-Regular, sans-serif;
      }
      .left, .right {
        margin: 0;
        display: inline-block;
      }
      .left {
        margin: 0 1rem 2rem 0;
      }
      .top, .bottom {
        margin-bottom: .5rem;
      }
    }
    .w-16 {
      width: 16px!important;
    }
    .mb-50 {
      margin-bottom: 3rem!important;
    }
    .m-0 {
      margin: 0!important;
    }
    .mt-2 {
      margin-top: 2rem;
    }
    .ml-title {
      padding: 1rem 0;
      background-color: #ededed;
      width: calc(75% + 60px);
      margin-left: -60px!important;
      padding-left: 60px;

      h4 {
        margin: 0;
        text-transform: capitalize;
        font: 800 16px Manrope-Regular, sans-serif;
      }
    }
    textarea {
      resize: none;
      width: 75%;
      padding: 1.5rem 2rem;
      font-size: 16px;
    }
  }  
</style>
