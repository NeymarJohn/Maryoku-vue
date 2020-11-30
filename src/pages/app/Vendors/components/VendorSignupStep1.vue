<template>
  <div class="vendor-signup-step1-wrapper">
    <div class="inside-container">
      <div class="left-side">
        <img :src="`${iconUrl}Group 5219 (2).svg`" />
        <h2>
          ABOUT YOUR
          <br />COMPANY
        </h2>
        <p>This your chance to Impress! All information will appear on your business page</p>
        <h2>1/5</h2>
      </div>
      <div class="right-side">
        <div class="about-wrapper">
          <div class="title-cont">
            <div class="left">
              <h5><img :src="`${iconUrl}Asset 542.svg`" /> Tell us about your business</h5>
            </div>
          </div>
          <div class="card">
            <div class="field mb-50">
              <div class="title-cont">
                <div class="top">
                  <h5><img :src="`${iconUrl}Asset 542.svg`" /> Tell us about your business</h5>
                </div>
                <div class="bottom">
                  <p>Include history & background</p>
                </div>
              </div>
              <div class="main-cont">
                <textarea
                  placeholder="Type 'about your business' here"
                  rows="5"
                  @blur="updateVendor($event, 'about.company')"
                  v-model="vendor.about.company"
                />
              </div>
            </div>
            <div class="field mb-50">
              <div class="title-cont">
                <div class="top">
                  <h5>
                    <img :src="`${iconUrl}Asset 543.svg`" />
                    about your {{ getCategoryNameByValue(vendor.vendorCategories[0]) }}
                  </h5>
                </div>
                <div class="bottom">
                  <p>Tell us why your service is the best choice, what makes it special</p>
                </div>
              </div>
              <div class="main-cont">
                <textarea
                  :placeholder="`Type 'About your ${getCategoryNameByValue(vendor.vendorCategories[0])}' here`"
                  rows="5"
                  @blur="updateVendor($event, 'about.category')"
                  v-model="vendor.about.category"
                />
              </div>
            </div>
            <div class="field mb-50">
              <vendor-checkbox
                v-if="
                  vendor.vendorCategories &&
                  companyServices.filter((cs) => cs.name == vendor.vendorCategories[0]) &&
                  companyServices.filter((cs) => cs.name == vendor.vendorCategories[0]).length > 0
                "
                :item="companyServices.filter((cs) => cs.name == vendor.vendorCategories[0])[0]"
                :label="`Company Serivces`"
                v-model="companyServices.filter((cs) => cs.name == vendor.vendorCategories[0])[0].value"
              />
            </div>
            <div class="field mb-50">
              <div class="title-cont">
                <div class="top">
                  <h5><img :src="`${iconUrl}Asset 545.svg`" /> capacity</h5>
                </div>
                <div class="bottom">
                  <p>How many guests can you acommodate?</p>
                </div>
              </div>
              <div class="main-cont">
                <div class="suffix">
                  <input
                    type="number"
                    placeholder="100"
                    v-model="vendor.capacity.low"
                    min="100"
                    max="1000"
                    @change="updateVendor($event, 'capacity.low')"
                  />
                </div>
                <div class="arrow">
                  <img :src="`${iconUrl}Group 4585 (2).svg`" />
                </div>
                <div class="suffix">
                  <input
                    type="number"
                    placeholder="1000"
                    v-model="vendor.capacity.high"
                    min="100"
                    max="1000"
                    @change="updateVendor($event, 'capacity.high')"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="field">
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
            </div>-->
          </div>
        </div>
        <div class="upload-wrapper" :class="{ 'mi-margin': vendor.images && vendor.images.length > 0 }">
          <div class="title-cont">
            <div class="left">
              <h5><img :src="`${iconUrl}art (2).svg`" /> Upload your best images</h5>
            </div>
            <div class="right">
              <p>(15 photos top, under 5MB)</p>
            </div>
          </div>
          <template v-if="!vendor.images || vendor.images.length == 0">
            <div class="card red-border">
              <div class="upload-cont">
                <a class @click="uploadVendorImage"> <img :src="`${iconUrl}Asset 559.svg`" /> Choose File </a>
                <div class="or">Or</div>
                <span>Drag and drop photos</span>
                <input
                  type="file"
                  class="hide"
                  ref="imageFile"
                  accept="image/gif, image/jpg, image/png"
                  @change="onVendorImageFilePicked"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <!-- <img :src="img" v-for="(img, index) in vendor.images" :key="index"> -->
            <div class="images-wrapper">
              <div
                class="box item2"
                :style="`
                  background-image: url(${vendor.images[0]});
                  background-size: cover;
                  background-size: 100% 100%;`"
              >
                <img
                  :src="`${iconUrl}Asset 528.svg`"
                  v-if="vendor.images[0]"
                  @click="removeVendorImage(vendor.images[0])"
                />
              </div>
              <div
                class="box item"
                :class="{ 'no-image': !vendor.images[1] }"
                :style="`
                  background-image: url(${vendor.images[1]});
                  background-size: cover;
                  background-size: 100% 100%;`"
              >
                <img
                  :src="`${iconUrl}Asset 528.svg`"
                  v-if="vendor.images[1]"
                  @click="removeVendorImage(vendor.images[1])"
                />
              </div>
              <div
                class="box item"
                :class="{ 'no-image': !vendor.images[2] }"
                :style="`
                  background-image: url(${vendor.images[2]});
                  background-size: cover;
                  background-size: 100% 100%;`"
              >
                <img
                  :src="`${iconUrl}Asset 528.svg`"
                  v-if="vendor.images[2]"
                  @click="removeVendorImage(vendor.images[2])"
                />
              </div>
              <div
                class="box item"
                :class="{ 'no-image': !vendor.images[3] }"
                :style="`
                  background-image: url(${vendor.images[3]});
                  background-size: cover;
                  background-size: 100% 100%;`"
              >
                <img
                  :src="`${iconUrl}Asset 528.svg`"
                  v-if="vendor.images[3]"
                  @click="removeVendorImage(vendor.images[3])"
                />
              </div>
              <div class="box item add-more" @click="uploadVendorImage">
                <img :src="`${iconUrl}Group 6501.svg`" />
                <br />
                <span>Add more</span>
                <input
                  type="file"
                  class="hide"
                  ref="imageFile"
                  accept="image/gif, image/jpg, image/png"
                  @change="onVendorImageFilePicked"
                />
              </div>
            </div>
          </template>
        </div>
        <div class="signature-wrapper">
          <div class="title-cont">
            <div class="top">
              <h5>add signature</h5>
            </div>
            <div class="bottom">
              <p>We just need your signature and that's it</p>
            </div>
          </div>
          <template v-if="vendor.signature == null">
            <div class="card red-border">
              <div class="upload-cont">
                <a class @click="uploadVendorSignature"> <img :src="`${iconUrl}Asset 559.svg`" /> Choose File </a>
                <div class="or">Or</div>
                <div class="sign-here">
                  <vueSignature ref="signature" :sigOption="option" :w="'100%'" :h="'100%'" />
                  <button class="save" @click="save">Save</button>
                  <button class="clear" @click="clear">Clear</button>
                </div>
                <input
                  type="file"
                  class="hide"
                  ref="signatureFile"
                  name="vendorSignature"
                  accept="image/gif, image/jpg, image/png"
                  @change="onVendorImageFilePicked"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <div
              class
              :style="`
                background-image: url(${vendor.signature});width: 100%;
                background-position: center;
                background-repeat: no-repeat;
                height: 162px;
                background-size: contain;
              `"
            />
            <!-- <img :src="vendor.signature"/> -->
            <img
              class="remove"
              :src="`${iconUrl}Asset 529.svg`"
              v-if="vendor.signature"
              @click="removeSignature(vendor.signature)"
            />
          </template>
        </div>
        <div class="social-wrapper">
          <div class="title-cont">
            <div class="top">
              <h5>Online Presence</h5>
              <!-- <p>suggested</p> -->
            </div>
            <div class="bottom">
              <p>*Constumers tend to better trust brands after viewing them online</p>
            </div>
          </div>
          <div class="card">
            <div class="field">
              <div class="label">
                <img :src="`${iconUrl}Asset 539.svg`" />
                <span>website</span>
              </div>
              <input
                type="text"
                placeholder="Paste link here"
                @change="updateVendor($event, 'social.website')"
                v-model="vendor.social.website"
              />
            </div>
            <div class="field">
              <div class="label">
                <img :src="`${iconUrl}Asset 540.svg`" class="w-16" />
                <span>facebook</span>
              </div>
              <input
                type="text"
                placeholder="Paste link here"
                @change="updateVendor($event, 'social.facebook')"
                v-model="vendor.social.facebook"
              />
            </div>
            <div class="field">
              <div class="label">
                <img :src="`${iconUrl}Group 4569 (2).svg`" />
                <span>instagram</span>
              </div>
              <input
                type="text"
                placeholder="Paste link here"
                @change="updateVendor($event, 'social.instagram')"
                v-model="vendor.social.instagram"
              />
            </div>
            <h5>Other:</h5>
            <div class="social-item" v-for="(s, sIndex) in defSocialMedia" :key="sIndex">
              <div @click="updateSocialMedia(s)">
                <img :src="`${iconUrl}Group 6258.svg`" v-if="socialMedia.includes(s) || vendor.social[s]" />
                <img :src="`${iconUrl}Rectangle 1245.svg`" v-else />
                {{ s }}
                <br />
              </div>
              <input
                type="text"
                placeholder="Paste link here"
                :class="{ 'red-border': vendor.social[s] == null || !reg.test(vendor.social[s]) }"
                v-model="vendor.social[s]"
                v-if="socialMedia.includes(s) || vendor.social[s]"
                v-on:blur="checkBlank"
                @change="updateVendor($event, `social.${s}`)"
                @keyup="checkBlank"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import VueElementLoading from "vue-element-loading";
import Vendors from "@/models/Vendors";

//COMPONENTS
import Icon from "@/components/Icon/Icon.vue";
import VendorServiceItem from "./VendorServiceItem.vue";
import VendorCheckbox from "./VendorCheckbox.vue";
import vueSignature from "vue-signature";
import S3Service from "@/services/s3.service";
import { makeid } from "@/utils/helperFunction";

export default {
  name: "vendor-signup-step1",
  props: {
    categories: Array,
    generalInfos: Array,
    companyServices: Array,
    vendor: Object,
  },
  components: {
    VueElementLoading,
    VendorCheckbox,
    VendorServiceItem,
    vueSignature,
  },
  data() {
    return {
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
      socialMedia: [],
      defSocialMedia: ["youtube", "linkedin", "google", "pinterest", "foursuare", "reddit", "tiktok"],
      reg: /^(ftp|http|https):\/\/[^ "]+$/,
      min: Number,
      max: Number,
      categoryNames: [
        {
          name: "Venue Rental",
          value: "venuerental",
        },
        {
          name: "Food & Beverage",
          value: "foodandbeverage",
        },
        {
          name: "Design and Decor",
          value: "decor",
        },
        {
          name: "Guest Services & Staffing",
          value: "corporatesocialresponsibility",
        },
        {
          name: "Signage / Printing",
          value: "signageprinting",
        },
        {
          name: "Advertising and Promotion",
          value: "advertising-promotion",
        },
        {
          name: "AV / Staging",
          value: "audiovisualstagingservices",
        },
        {
          name: "Swags",
          value: "swags",
        },
        {
          name: "Shipping",
          value: "shipping",
        },
        {
          name: "Transportation & Tour operator",
          value: "transportation",
        },
        {
          name: "Entertainment",
          value: "entertainment",
        },
        {
          name: "Administration",
          value: "administration",
        },
        {
          name: "Security",
          value: "securityservices",
        },
        {
          name: "Technology",
          value: "technologyservices",
        },
        {
          name: "Videography and Photography",
          value: "videographyandphotography",
        },
        {
          name: "Equipment Rental",
          value: "equipmentrentals",
        },
      ],
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)",
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    updateSocialMedia(item) {
      if (this.socialMedia.includes(item)) {
        this.socialMedia = this.socialMedia.filter((s) => s != item);
      } else {
        this.socialMedia.push(item);
      }
    },
    uploadVendorImage(imageId = null, attachmentType = null) {
      this.$refs.imageFile.click();
    },
    uploadVendorSignature(imageId = null, attachmentType = null) {
      this.$refs.signatureFile.click();
    },
    onVendorImageFilePicked(event) {
      let file = event.target.files || event.dataTransfer.files;

      if (!file.length) {
        return;
      }
      if (file[0].size <= 5 * 1024 * 1024) {
        // 5mb
        if (event.target.name == "vendorSignature") {
          this.createImage(file[0], "vendorSignature");
        } else {
          this.createImage(file[0]);
        }
      } else {
        this.$notify({
          message: "You've Uploaded an Image that Exceed the allowed size, try small one!",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
      }
    },
    createImage(file, type) {
      let reader = new FileReader();
      let vm = this;

      this.isLoading = true;

      reader.onload = (e) => {
        if (type == "vendorSignature") {
          const fileId = `${new Date().getTime()}_${makeid()}`;
          S3Service.fileUpload(file, fileId, "vendor/signatures").then((uploadedName) => {
            this.$root.$emit(
              "update-vendor-value",
              "signature",
              `https://maryoku.s3.amazonaws.com/vendor/signatures/${uploadedName}`,
            );
          });
          this.$root.$emit("update-vendor-value", "signature", e.target.result);
        } else {
          const fileId = `${new Date().getTime()}_${makeid()}`;
          const currentIndex = this.vendor.images.length;
          S3Service.fileUpload(file, fileId, "vendor/cover-images").then((uploadedName) => {
            this.$root.$emit("update-vendor-value", "vendorImages", {
              index: currentIndex,
              data: `https://maryoku.s3.amazonaws.com/vendor/cover-images/${uploadedName}`,
            });
          });
          this.$root.$emit("update-vendor-value", "images", {
            index: currentIndex,
            data: e.target.result,
          });
        }
      };
      reader.readAsDataURL(file);
    },
    removeVendorImage(image) {
      this.$root.$emit("update-vendor-value", "removeImage", image);
    },
    getCategoryNameByValue(value) {
      return this.categoryNames.filter((c) => c.value == value)[0].name;
    },
    checkBlank(e) {
      if (!e.target.value || !this.reg.test(e.target.value)) {
        e.target.style.border = "1px solid #ff0000";
      } else {
        e.target.style.border = "1px solid #707070";
      }
    },
    updateVendor(event, fieldName) {
      this.$root.$emit("update-vendor-value", fieldName, event.target.value);
    },
    save() {
      let _this = this;
      // let png = _this.$refs.signature.save()
      let jpeg = _this.$refs.signature.save("image/jpeg");
      // let svg = _this.$refs.signature.save('image/svg+xml')
      this.$root.$emit("update-vendor-value", "signature", jpeg);
      console.log(this.vendor);
    },
    clear() {
      let _this = this;
      _this.$refs.signature.clear();
    },
    removeSignature() {
      this.$root.$emit("update-vendor-value", "signature", null);
    },
  },
  computed: {},
  filters: {},
  watch: {},
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
            margin-bottom: 0.5rem;
            img {
              width: 24px;
              margin-right: 0.5rem;
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
                  content: "Min";
                }
              }
              &:last-child {
                &:before {
                  content: "Max";
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
        .social-item {
          cursor: pointer;
          font: normal 16px Manrope-Regular, sans-serif;
          text-transform: capitalize;
          margin-bottom: 2rem;

          img {
            width: 27px;
            height: 27px;
            margin-right: 1rem;
          }
          input {
            margin: 1rem 0 0 3rem;
            font-size: 16px;
            padding: 22px 30px;
            min-width: calc(75% - 3rem);
            border: 1px solid #707070;
            border-radius: 0;
          }
        }
        h5 {
          font: 800 16px Manrope-Regular, sans-serif;
        }
        &.red-border {
          border: 2px dashed #f51355;

          .upload-cont {
            text-align: center;
            margin: -30px;
            a {
              display: inline-block;
              font: 800 14px Manrope-Regular, sans-serif;
              border: 1px solid #f51355;
              padding: 0.5rem;
              color: #f51355;
              cursor: pointer;
              margin-bottom: 0.5rem;

              img {
                width: 10px;
                margin-right: 0.5rem;
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
            }
          }
        }
      }
    }
  }
  .title-cont {
    text-transform: capitalize;
    img {
      width: 24px;
      margin-right: 0.5rem;
    }
    h5 {
      font: 800 16px Manrope-Regular, sans-serif;
      margin: 0;
    }
    p {
      margin: 0;
      font: normal 14px Manrope-Regular, sans-serif;
    }
    .left,
    .right {
      margin: 0;
      display: inline-block;
    }
    .left {
      margin: 0 1rem 2rem 0;
    }
    .top,
    .bottom {
      margin-bottom: 0.5rem;
    }
  }
  .w-16 {
    width: 16px !important;
  }
  .mb-50 {
    margin-bottom: 3rem !important;
  }
  .mi-margin {
    margin: 0 -1rem;
    .title-cont {
      margin: 0 1rem;
    }
  }
  .images-wrapper {
    margin: 0 0 20px 0;
    width: 100%;
    height: 400px;
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: repeat(2, 200px);
    justify-content: center;
    align-content: end;

    .box {
      margin: 1rem;
    }

    .item2 {
      img {
        width: 24px;
        cursor: pointer;
        position: relative;
        left: 90%;
        top: 80%;
      }
    }

    .item {
      img {
        width: 24px;
        cursor: pointer;
        position: relative;
        left: 80%;
        top: 60%;
      }
    }

    .no-image {
      border: dashed 1px #f51355;
      background-color: #ffffff;
    }

    .item2 {
      grid-column: 1 / 3;
      grid-row: 1 / 4;
    }
    .add-more {
      text-align: center;
      padding: 3rem;
      border: dashed 1px #f51355;
      background-color: #ffffff;
      cursor: pointer;
      font: normal 15px Manrope-Regular, sans-serif;
      img {
        width: 24px;
        position: unset;
        padding-bottom: 1rem;
      }
    }
  }
  .signature-wrapper {
    padding-bottom: 2rem;
    position: relative;

    .upload-cont {
      .sign-here {
        .save,
        .clear {
          background-color: #ffffff;
          font: 800 14px Manrope-Regular, sans-serif;
          border: 1px solid #f51355;
          padding: 0.5rem;
          color: #f51355;
          cursor: pointer;
          margin-bottom: 0.5rem;
        }
      }
    }

    img {
      width: 100%;
      max-height: 162px;

      &.remove {
        width: 18px;
        cursor: pointer;
        position: absolute;
        right: 1rem;
        bottom: 3rem;
      }
    }
  }
  textarea {
    resize: none;
    width: 75%;
    padding: 1.5rem 2rem;
    font-size: 16px;
  }
  .hide {
    display: none !important;
  }
  .red-border {
    border: 1px solid #f51355 !important;
  }
}
</style>
