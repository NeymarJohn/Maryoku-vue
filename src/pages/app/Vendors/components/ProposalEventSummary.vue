<template>
  <div class="proposal-event-summary-wrapper">
    <template v-if="isEdit"></template>
    <template v-else>
      <div class="event-summary-wrapper">
        <div class="with-bkimg" :style="vendor.images ? `background-image:url(${vendor.images[0]})` : ''">
          <div class="summary-cont">
            <div class="upper">
              <h3>{{ title }}</h3>
              <div class="warning-days" v-if="warning">
                <img :src="`${iconUrl}Asset 575.svg`" /> This proposal is 2 days before the original date
              </div>
            </div>
            <ul>
              <li>
                <span>Name</span>
                <p>{{ event.title }}</p>
              </li>
              <li>
                <span>Date</span>
                <p>{{ $dateUtil.formatScheduleDay(event.eventStartMillis, "MM.DD.YY") }}</p>
              </li>
              <li>
                <span>Guest Arrival Time</span>
                <p>{{ event.arrival }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="event-summary-body">
          <div class="cover-letter font-bold-extra mb-50">
            <h4 class="font-bold-extra text-transform-uppercase">Dear {{ event.owner.displayName }},</h4>
            <textarea v-model="personalMessage"> </textarea>
          </div>

          <div class="vision-section">
            <div class="font-size-22 font-bold-extra mt-30 mb-20">
              <img :src="`${$iconURL}Vendor+Landing+Page/Asset+491.svg`" class="page-icon" />
              Our vision for your event
            </div>
            <div>
              {{ eventVision }}
            </div>
          </div>
          <div class="font-bold mb-10">Some references to the experience you will get from us</div>
          <proposal-inspirational-photos class="mb-60"></proposal-inspirational-photos>
          <md-button class="md-simple edit-btn md-red mb-30" @click="savedItModal = true">
            About us
            <md-icon>navigate_next</md-icon>
          </md-button>
          <div class="contact-cont">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <img :src="`${iconUrl}Asset 593.svg`" />
                <span>{{ vendor.vendorMainEmail }}</span>
              </li>
              <li>
                <img :src="`${iconUrl}Asset 573.svg`" />
                <span>{{ vendor.vendorAddressLine1 }}</span>
              </li>
              <li v-if="vendor.vendorMainPhoneNumber">
                <img :src="`${iconUrl}Asset 591.svg`" />
                <span>{{ vendor.vendorMainPhoneNumber }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="pricing-cont">
        <div class="title">
          <h4><img :src="`${iconUrl}Asset 576.svg`" />Pricing & Details</h4>
          <p>*Work only with our catering</p>
        </div>
        <p>What would you like to take from our suggested services?</p>
        <proposal-pricing-item
          :iconUrl="iconUrl"
          :categoryIcon="`${iconUrl}Asset 614.svg`"
          :itemType="`price`"
          :requirements="proposalRequest.requirements"
          :category="c"
          v-for="(c, cIndex) in categories"
          :key="cIndex"
        />
        <proposal-pricing-item :iconUrl="iconUrl" :itemType="`bundle`" />
        <proposal-pricing-item :iconUrl="iconUrl" :itemType="`total`" :requirements="proposalRequest.requirements" />
      </div>
      <div class="policy-cont">
        <div class="title">
          <h4><img :src="`${iconUrl}Asset 594.svg`" /> Our Policy</h4>
          <p>
            <img
              :src="`${iconUrl}Group 5280 (5).svg`"
              @mouseover="considerUpdate = true"
              @mouseleave="considerUpdate = false"
            />
            Consider update
          </p>
          <div class="consider-update" v-if="considerUpdate">
            <h3>Consider Update!</h3>
            <p>
              If the addiiontal services you've added require additional policy changes-this is the tame to add those!
            </p>
          </div>
        </div>
        <div class="policy-wrapper">
          <div class="policy mb-50">
            <div class="mb-10" v-for="(policy, index) in vendor.yesRules" :key="index">
              <span class="font-bold" style="width: 50%; display: inline-block">{{ policy.name }}</span>
              <img :src="`${$iconURL}Vendor Signup/Group 5479 (2).svg`" class="label-icon" />
            </div>
            <div class="mb-10" v-for="(policy, index) in vendor.noRules" :key="index">
              <span class="font-bold" style="min-width: 50%; display: inline-block">{{ policy.name }}</span>
              <img :src="`${$iconURL}Vendor Signup/Group 5489 (4).svg`" class="label-icon" />
            </div>
          </div>
          <div class="cancellation">
            <h5 class="subtitle">Our cancellation approach</h5>
            <div id="Policy">
              <div class="rules">
                <div class="rules">
                  <div class="rule" v-for="(policy, yIndex) in cancellationData" :key="yIndex">
                    <div class="item">{{ policy.notice }}</div>
                    <div class="item">{{ policy.vendorPayout }}</div>
                    <div class="item">{{ policy.cancellationFee }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cancellation">
            <h5 class="subtitle">Our Policy</h5>
            <div id="Policy">
              <div class="rules">
                <div class="rules">
                  <div class="rule" v-for="(policy, yIndex) in validPolicy" :key="yIndex">
                    <div class="item">{{ policy.name }}</div>
                    <div class="item" v-if="policy.type === 'MultiSelection'">
                      <span class="mr-10" v-for="(v, vIndex) in policy.value" :key="`policy-${vIndex}`">{{
                        `${v}${vIndex == policy.value.length - 1 ? "" : ","}`
                      }}</span>
                    </div>
                    <div class="item" v-else-if="policy.type === 'Including'">
                      <span class="mr-10" v-if="policy.value"> Yes </span>
                      <span class="mr-10" v-if="!policy.value && policy.cost"> {{ `$ ${policy.cost}` }} </span>
                    </div>
                    <div class="item" v-else>
                      <span v-if="policy.type === Number && !policy.isPercentage">$</span>
                      <span v-if="policy.value === true">Yes</span>
                      <span v-else>{{ policy.value }}</span>
                      <span v-if="policy.isPercentage">%</span>
                      <span class="ml-50" v-if="policy.hasOwnProperty('attendees')">
                        {{ policy.attendees }} attendees
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="not-allowed" v-if="vendor.vendorCategories[0] == 'venuerental'">
                <h5>We don't allow these 3rd party vendor:</h5>
                <p>{{ mergeStringItems(vendor.notAllowed) }}</p>
              </div>
              <div class="dont-work">
                <h5>We don't work on:</h5>
                <div class="item" v-if="mergeStringItems(vendor.selectedWeekdays)">
                  <img :src="`${$iconURL}Vendor Signup/Group 5489 (4).svg`" />
                  {{ mergeStringItems(vendor.selectedWeekdays) }}
                </div>
                <div class="item" v-for="(d, dIndex) in vendor.exDonts" :key="dIndex">
                  <img :src="`${$iconURL}Vendor Signup/Group 5489 (4).svg`" />
                  {{ d.holiday }}
                </div>
                <div class="item" v-if="vendor.dontWorkDays">
                  <img :src="`${$iconURL}Vendor Signup/Group 5489 (4).svg`" />
                  {{ dontWorkDays() }}
                </div>
                <div class="item" v-if="vendor.dontWorkTime">
                  <img :src="`${$iconURL}Vendor Signup/Group 5489 (4).svg`" />
                  {{ dontWorkTime() }}
                </div>
              </div>
            </div>

            <div class="signature-wrapper">
              <div class="half-side">
                <h6>{{ vendor.companyName }}</h6>
                <div class="signature-client">
                  <template v-if="vendor.signature == null">
                    <div class="card red-border">
                      <div class="upload-cont">
                        <a class @click="uploadVendorSignature">
                          <img
                            :src="`https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/Asset 559.svg`"
                          />
                          Choose File
                        </a>
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
              </div>
              <div class="half-side">
                <h6>Client</h6>
                <div class="signature-client signature-bidder"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import ProposalPricingItem from "./ProposalPricingItem.vue";
import Vendors from "@/models/Vendors";
import vueSignature from "vue-signature";
import ProposalInspirationalPhotos from "./ProposalInspirationalPhotos.vue";
import ProposalPricingSummary from "./ProposalPricingSummary.vue";

export default {
  name: "proposal-event-summary",
  components: {
    ProposalPricingItem,
    ProposalInspirationalPhotos,
    vueSignature,
    ProposalPricingSummary,
  },
  props: {
    title: String,
    eventData: Object,
    isEdit: Boolean,
    iconUrl: String,
    itemType: String,
    services: Array,
  },
  data() {
    return {
      currentTab: 1,
      savedItModal: false,
      isTimeUp: false,
      hover: false,
      considerUpdate: false,
      warning: false,
      categories: [],
      cancellationData: [
        {
          notice: "Cancellation on the day of the Event",
          vendorPayout: "Full payment",
          cancellationFee: "Full Payment-no refund will be given",
        },
        {
          notice: "Cancellation less than a week prior of the Event but not on the day of the Event",
          vendorPayout: "80% payment",
          cancellationFee: "Full Payment-no refund will be given",
        },
        {
          notice: "Cancellation less than two weeks prior of the Event bu more than one week prior to the Event",
          vendorPayout: "60% payment",
          cancellationFee: "80% Payment(20% refunded to Planner)",
        },
        {
          notice: "Cancellation more than two weeks prior to the Event",
          vendorPayout: "15% payment equivalent to down payment",
          cancellationFee: "Down payment will not be refunded",
        },
      ],
    };
  },
  methods: {
    hideModal() {
      this.savedItModal = false;
    },
    mouseOver() {
      this.hover = true;
    },
    mouseLeave() {
      this.hover = false;
    },
    uploadVendorSignature(imageId = null, attachmentType = null) {
      this.$refs.signatureFile.click();
    },
    onVendorImageFilePicked(event) {
      let file = event.target.files || event.dataTransfer.files;

      if (!file.length) {
        return;
      }

      if (file[0].size <= 5000000) {
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
          this.$root.$emit("update-proposal-value", "signature", e.target.result);
        }
      };
      reader.readAsDataURL(file);
    },
    save() {
      let _this = this;
      let jpeg = _this.$refs.signature.save("image/jpeg");
      this.$root.$emit("update-proposal-value", "signature", jpeg);
      console.log(this.vendor);
    },
    clear() {
      let _this = this;
      _this.$refs.signature.clear();
    },
    removeSignature() {},
    getServices(category) {
      if (this.tableCategory === "cost") return this.$store.state.vendorProposal.proposalCostServices[category];
      else if (this.tableCategory === "included")
        return this.$store.state.vendorProposal.proposalIncludedServices[category];
      else if (this.tableCategory === "extra") return this.$store.state.vendorProposal.proposalExtraServices[category];
    },
    flatDeep(arr, d = 1) {
      return d > 0
        ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? this.flatDeep(val, d - 1) : val), [])
        : arr.slice();
    },
    servicesByCategory(category) {
      const services = this.services.filter((s) => s.name == category);

      if (services.length > 0) {
        return this.flatDeep(
          services[0].categories.map((s) => s.subCategories.map((sc) => sc.items.map((dd) => dd.name))),
          Infinity,
        );
      } else {
        return [];
      }
    },
    selectedServices() {
      return this.event.components.filter((item) => this.categories.includes(item.componentId));
    },
    mergeStringItems(items) {
      let naItems = "";
      _.each(items, (n) => {
        if (n.constructor.name == "Object") {
          naItems += `${this.capitalize(n.name)}s, `;
        } else {
          naItems += `${this.capitalize(n)}s, `;
        }
      });
      naItems = naItems.substring(0, naItems.length - 2);
      return "All " + naItems;
    },
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    dontWorkDays() {
      let selectedDates = "";
      _.each(this.vendor.dontWorkDays, (s) => {
        selectedDates += `${s.date}, `;
      });
      selectedDates = selectedDates.substring(0, selectedDates.length - 2);
      return selectedDates;
    },
    dontWorkTime() {
      return `${this.vendor.dontWorkTime.startTime.hh}:${this.vendor.dontWorkTime.startTime.mm}:${this.vendor.dontWorkTime.amPack.start} ~ ${this.vendor.dontWorkTime.endTime.hh}:${this.vendor.dontWorkTime.endTime.mm}:${this.vendor.dontWorkTime.amPack.end}`;
    },
  },
  created() {
    console.log(this.vendor);
  },
  mounted() {
    this.savedItModal = false;
    this.isTimeUp = true;
    this.categories.push(this.vendor.vendorCategory);
    this.additionalServices.forEach((service) => {
      this.categories.push(service);
    });
  },
  computed: {
    personalMessage: {
      get() {
        return this.$store.state.vendorProposal.personalMessage;
      },
      set(value) {
        this.$store.commit("vendorProposal/setValue", { key: "personalMessage", value });
      },
    },
    eventVision() {
      return this.$store.state.vendorProposal.eventVision;
    },
    vendor() {
      return this.$store.state.vendorProposal.vendor;
    },
    proposalRequest() {
      return this.$store.state.vendorProposal.proposalRequest;
    },
    event() {
      if (this.proposalRequest) return this.proposalRequest.eventData;
      return null;
    },
    additionalServices() {
      return this.$store.state.vendorProposal.additionalServices;
    },
    extraServices() {
      return this.event.components.filter((item) => item.componentId !== "unexpected");
    },
    step() {
      return this.$store.state.vendorProposal.wizardStep;
    },
    validPolicy() {
      if (this.vendor.policies)
        return this.vendor.policies.filter((item) => item.value || (item.type === "Including" && item.cost));
      return null;
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.proposal-event-summary-wrapper {
  border-radius: 3px;
  background-color: #f5f5f5;
  font-family: "Manrope-Regular", sans-serif;
  padding: 0 60px;
  margin-top: 50px;
  color: #050505;

  .tabs-cont {
    display: flex;
    justify-content: flex-start;
    position: relative;
    text-align: center;
    margin: 0 -60px;
    border-radius: 3px;

    .tab-item {
      flex: 1;
      font-size: 22px;
      padding: 27px 0 32px 0;
      border: solid 3px #818080;
      cursor: pointer;

      span {
        color: #050505;
        font-weight: normal;
      }

      &:first-child {
        border-right: none;
      }
      &.active {
        border-top: solid 5px #f51355;
        span {
          color: #f51355;
          font-weight: 800;
        }
      }
    }
  }
  .event-summary-wrapper {
    margin: 0 -60px;
    background-color: #ffffff;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);

    .with-bkimg {
      background-image: url("https://static-maryoku.s3.amazonaws.com/storage/img/sidebar-2.jpg");
      min-height: 540px;

      .summary-cont {
        padding: 60px;
        background: rgba(255, 255, 255, 0.7);

        .upper {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          h3 {
            font-size: 22px;
            font-weight: 800;
            margin: 0;
            margin-right: 36px;
          }
          .warning-days {
            padding: 12px 28px;
            background-color: #ffe5ec;
            display: inline-block;
            font-size: 14px;

            img {
              width: 27px;
              height: 27px;
              margin-right: 12px;
            }
          }
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;

          li {
            padding: 0 95px;
            border-right: 1px solid #818080;
            font-size: 16px;

            span {
              font-weight: 800;
              color: #818080;
            }
            p {
              margin: 0;
              margin-top: 13px;
              font-weight: normal;
            }

            &:first-child {
              padding-left: 0;
            }
            &:last-child {
              border: none;
            }
          }
        }
      }
    }
    .event-summary-body {
      padding: 60px;
      .cover-letter {
        h4 {
          font-size: 30px;
          margin: 0;
          padding-bottom: 25px;
        }
        textarea {
          height: 170px;
          padding: 30px;
        }
        p {
          margin: 0;
          font-size: 14px;

          strong {
            text-transform: capitalize;
            font-weight: 800;
          }
        }
        span {
          display: inline-block;
          font-weight: 800;
          padding-top: 36px;
          padding-bottom: 60px;
          font-size: 16px;
          color: #f51355;
          text-transform: capitalize;
          cursor: pointer;
          i {
            color: #f51355;
          }
        }
      }
      .vision-section {
        margin-bottom: 50px;
        word-break: break-word;
      }
      .contact-cont {
        margin-top: 30px;
        h4 {
          font-size: 22px;
          font-weight: 800;
          margin: 0;
        }
        ul {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
          margin-top: 20px;
          li {
            font-size: 16px;
            margin-right: 55px;

            span {
              text-decoration: underline;
            }

            img {
              width: 26px;
              height: 26px;
              margin-right: 14px;
            }

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }

      .image-slider {
        padding-left: 60px;
        display: flex;
        overflow: hidden;

        .item {
          margin-right: 30px;
          width: 300px;
          min-width: 300px;
          max-height: 177px;

          &:last-child {
            margin-right: 0;
          }
        }
        a.more {
          cursor: pointer;
          position: absolute;
          background: white;
          border-radius: 20px;
          margin-top: 75px;
        }
      }

      .check-list-wrapper {
        padding: 0 60px;
        h4 {
          font-size: 22px;
          font-weight: 800;
          margin: 0;
          margin-top: 40px;
          margin-bottom: 30px;
          text-transform: capitalize;
        }
        ul {
          padding: 0;
          list-style: none;
          -webkit-column-count: 3;
          -moz-column-count: 3;
          column-count: 3;
          li {
            margin-bottom: 33px;

            i {
              color: #f51355;
              font-size: 22px;
              margin-right: 22px;
            }
          }
        }
      }
    }
  }

  .pricing-cont {
    margin: 0 -60px;
    padding: 60px 0;

    .title {
      display: flex;
      align-items: flex-end;
      background-color: #f5f5f5;
      padding-top: 23px;
      padding-bottom: 0px;

      h4 {
        font-size: 22px;
        font-weight: 800;
        margin: 0;
        margin-right: 10px;

        img {
          width: 22px;
          height: 22px;
          margin-right: 5px;
        }
      }
      p {
        font-size: 16px;
        margin: 0;
        color: #f51355;
      }
    }
    p {
      font-size: 16px;
      font-weight: normal;
      margin-top: 14px;
      margin-bottom: 30px;
    }
  }

  .policy-cont {
    padding: 20px 0;
    margin: 0 -60px;

    .title {
      img {
        width: 30px;
        margin-right: 1rem;
      }
      font: 800 30px Manrope-Regular, sans-serif;
    }
    .rules {
      margin: 3rem 0;
      .rule {
        padding: 2rem 2rem 2rem 0;
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
        display: flex;
        img {
          width: 21px;
          margin-right: 1rem;
        }
      }
    }
    .title {
      display: flex;
      align-items: center;
      padding-bottom: 30px;
      position: relative;

      h4 {
        margin: 0;
        font-size: 30px;
        font-weight: 800;
        margin-right: 30px;

        img {
          width: 30px;
          margin-right: 16px;
        }
      }
      p {
        img {
          width: 27px;
          margin-right: 12px;
        }
      }
      .consider-update {
        position: absolute;
        background-color: #ffedb7;
        padding: 0px 15px 15px 15px;
        color: #050505;
        font-size: 14px;
        left: 180px;
        top: 70px;
        max-width: 350px;
        text-align: center;

        h3 {
          font-size: 20px;
          font-weight: 800;
        }
        p {
          font-size: 16px;
        }
        &::after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          top: 4px;
          left: 70px;
          box-sizing: border-box;

          border: 12px solid black;
          border-color: transparent transparent #ffedb7 #ffedb7;

          transform-origin: 0 0;
          transform: rotate(135deg);
        }
      }
    }
    .policy-wrapper {
      background: #ffffff;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
      padding: 60px;

      .condition {
        h6 {
          margin: 0;
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 8px;
          text-transform: none;
        }
        p {
          margin: 0;
          margin-bottom: 60px;
        }
      }
      .cancellation {
        h5.subtitle {
          margin: 0;
          padding: 15px 53px 20px 55px;
          margin-left: -60px;
          background-color: #ededed;
          display: inline-block;
          font-size: 20px;
          font-weight: 800;
          text-transform: none;
        }
        h6 {
          font-size: 20px;
          font-weight: 800;
          margin-top: 30px;
          margin-bottom: 8px;
          text-transform: none;
        }
        p {
          font-size: 16px;
          margin: 0;
        }
        .semi-column {
          display: flex;
          margin-top: 35px;

          p {
            flex: 1;
            margin: 0;
            font-size: 16px;
            strong {
              font-size: 20px;
              font-weight: 800;
            }
          }
        }
        .additional {
          margin-top: 60px;

          h6 {
            font-size: 16px;
            font-weight: 800;
          }
          p {
            margin-top: 13px;
            font-size: 16px;
          }
        }
        .signature-wrapper {
          display: grid;
          grid-gap: 20%;
          grid-template-columns: 40% 40%;
          padding-top: 60px;

          .half-side {
            text-align: center;
            h6 {
              text-transform: capitalize;
              text-decoration: underline;
              font-size: 16px;
              font-weight: 800;
              margin: 0;
            }

            .signature-client {
              margin-top: 23px;
              min-width: 350px;
              min-height: 270px;
              border: 1px dashed #f51355 !important;
              border-radius: 3px;
            }

            &:first-child {
              h6 {
                text-align: left;
              }
            }

            .upload-cont {
              a {
                margin: 0.5rem auto;
                display: inline-block;
                font: 800 14px Manrope-Regular, sans-serif;
                border: 1px solid #f51355;
                padding: 0.5rem;
                color: #f51355;
                cursor: pointer;
                img {
                  width: 10px;
                }
              }
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
        }
      }
    }
  }
  .hide {
    display: none !important;
  }
}
</style>