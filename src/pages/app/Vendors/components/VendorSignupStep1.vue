<template>
  <div class="vendor-signup-step1-wrapper">
    <div class="inside-container">
      <div class="left-side">
        <img :src="`${iconUrl}Group 5219 (2).svg`"/>
        <h2>ABOUT YOUR <br/>COMPANY</h2>
        <p>This part will appear on your business page</p>
        <h2>1/4</h2>
      </div>
      <div class="right-side">
        <div class="about-wrapper">
          <div class="title-cont">
            <div class="left">
              <h5><img :src="`${iconUrl}Asset 542.svg`"/> about your company</h5>
            </div>
          </div>
          <div class="card">
            <div class="field mb-50">
              <div class="title-cont">
                <div class="top">
                  <h5><img :src="`${iconUrl}Asset 542.svg`"/> about your company</h5>
                </div>
                <div class="bottom">
                  <p>Include history & background</p>
                </div>
              </div>
              <div class="main-cont">
                <textarea placeholder="Type 'About your company' here" rows="5"/>
              </div>
            </div>
            <div class="field mb-50">
              <div class="title-cont">
                <div class="top">
                  <h5><img :src="`${iconUrl}Asset 545.svg`"/> capacity</h5>
                </div>
                <div class="bottom">
                  <p>what is the range of people your place can host?</p>
                </div>
              </div>
              <div class="main-cont">
                <div class="suffix">
                  <input type="number" placeholder="1000"/>
                </div>
                <div class="arrow">
                  <img :src="`${iconUrl}Group 4585 (2).svg`"/>
                </div>
                <div class="suffix">
                  <input type="number" placeholder="2000"/>
                </div>
              </div>
            </div>
            <div class="field mb-50">
              <div class="title-cont">
                <div class="top">
                  <h5><img :src="`${iconUrl}Asset 543.svg`"/> about your venue</h5>
                </div>
                <div class="bottom">
                  <p>include facilities, style & common events you host</p>
                </div>
              </div>
              <div class="main-cont">
                <textarea placeholder="Type 'About your venue' here" rows="5"/>
              </div>
            </div>
            <div class="field">
              <div class="title-cont">
                <div class="top">
                  <h5><img :src="`${iconUrl}Group 1471 (2).svg`"/> about your catering</h5>
                </div>
                <div class="bottom">
                  <p>include genre, flexibility's catering </p>
                </div>
              </div>
              <div class="main-cont">
                <textarea placeholder="Type 'About your cuisine' here" rows="5"/>
              </div>
            </div>
          </div>
        </div>
        <div class="upload-wrapper">
          <div class="title-cont">
            <div class="left">
              <h5><img :src="`${iconUrl}art (2).svg`"/> upload photos</h5>
            </div>
            <div class="right">
              <p>(15 photos top, under 20KB)</p>
            </div>
          </div>
          <div class="card red-border">
            <div class="upload-cont">
              <a class=""><img :src="`${iconUrl}Asset 559.svg`"/> Choose File</a>
              <div class="or">Or</div>
              <span>Drag your file here</span>
            </div>
          </div>
        </div>
        <div class="signature-wrapper">
          <div class="title-cont">
            <div class="top">
              <h5>add signature</h5>
            </div>
            <div class="bottom">
              <p>drag your file or create a signature here</p>
            </div>
          </div>
          <div class="card red-border">
            <div class="upload-cont">
              <a class=""><img :src="`${iconUrl}Asset 559.svg`"/> Choose File</a>
              <div class="or">Or</div>
              <div class="sign-here">
                Sign Here
              </div>
            </div>
          </div>
        </div>
        <div class="social-wrapper">
          <div class="title-cont">
            <div class="left">
              <h5>social media</h5>
            </div>
            <div class="right">
              <p>suggested</p>
            </div>
          </div>
          <div class="card">
            <div class="field">
              <div class="label">
                <img :src="`${iconUrl}Asset 539.svg`"/>
                <span>website</span>
              </div>
              <input type="text" class="" placeholder="Paste link here"/>
            </div>
            <div class="field">
              <div class="label">
                <img :src="`${iconUrl}Asset 540.svg`" class="w-16"/>
                <span>facebook</span>
              </div>
              <input type="text" class="" placeholder="Paste link here"/>
            </div>
            <div class="field">
              <div class="label">
                <img :src="`${iconUrl}Group 4569 (2).svg`"/>
                <span>instagram</span>
              </div>
              <input type="text" class="" placeholder="Paste link here"/>
            </div>
            <h5>Other:</h5>
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
  name: 'vendor-signup-step1',
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
      socialMedia: {
        website: null, 
        facebook: null, 
        instagram: null, 
        youtube: null, 
        linkedin: null, 
        google: null, 
        pinterest: null, 
        foursuare: null, 
        reddit: null, 
        tiktok: null, 
      }
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
  .vendor-signup-step1-wrapper {
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
          h5 {
            font: 800 16px Manrope-Regular, sans-serif;
          }
          &.red-border {
            border: 1.5px dashed #f51355;

            .upload-cont {
              text-align: center;
              margin: -30px;
              a {
                display: inline-block;
                font: 800 14px Manrope-Regular, sans-serif;
                border: 1px solid #f51355;
                padding: .5rem;
                color: #f51355;
                cursor: pointer;
                margin-bottom: .5rem;

                img {
                  width: 10px;
                  margin-right: .5rem;
                }
              }
              span {
                color: #818080;
                font: normal 16px Manrope-Regular, sans-serif;
              }
              .sign-here {
                margin-top: 1rem;
                border: 1.5px dashed #f51355;
                font: normal 50px Manrope-Regular, sans-serif;
                color: #d5d5d5;
                padding: 5rem;
              }
            }
          }
        }
        .social-wrapper {
          
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
    textarea {
      resize: none;
      width: 75%;
      padding: 1.5rem 2rem;
      font-size: 16px;
    }
  }  
</style>
