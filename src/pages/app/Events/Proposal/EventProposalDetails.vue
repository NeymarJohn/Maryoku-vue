<template>
  <div class="proposal-page_details with-progress-bar">
    <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
    <div class="event-header d-flex justify-content-between">
      <div class="proposal-page_header text-transform-uppercase">
        <img :src="`${$iconURL}Budget+Elements/${vendorProposal.vendor.eventCategory.icon}`" />
        <a :href="`/#/vendors/${vendorProposal.vendor.id}/detail`" target="_blank">
          {{ vendorProposal.vendor.companyName }}
        </a>
        Proposal
      </div>
      <header-actions @toggleCommentMode="toggleCommentMode" @export="exportToPdf"></header-actions>
    </div>
    <div class="proposal-content">
      <div class="proposal-info">
        <div class="proposal-header" :style="`background: url('${headerBackgroundImage}') center center no-repeat`">
          <div class="event-info">
            <div class="section-header d-flex justify-content-start">
              <h3>Event Information & Details</h3>
              <div class="alert alert-danger" v-if="vendorProposal.suggestedTime">
                This proposal is 2 days before your original date
              </div>
            </div>
            <ul class="event-details">
              <li class="event-details__item">
                <label>Name</label>
                <div class="info-text">{{ eventData.title || eventData.concept.title }}</div>
              </li>
              <li class="event-details__item">
                <label>Date</label>
                <div class="info-text">
                  {{ eventData.eventStartMillis | formatDate }}
                </div>
              </li>
              <li class="event-details__item">
                <label>Guest Arrival Time</label>
                <div class="info-text">
                  {{ eventData.eventStartMillis | formatTime }}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="proposal-body">
          <h1 class="font-size-30">Dear {{ vendorProposal.vendor.vendorDisplayName }},</h1>
          <p>
            {{ vendorProposal.personalMessage }}

            <!-- <br />Sincerely,
            <span class="proposal-title">{{ vendorProposal.vendor.vendorDisplayName }}</span> -->
          </p>
          <div class="vision mt-30 font-size-22 mb-40">
            <div class="font-bold">
              <img :src="`${$iconURL}Vendor+Landing+Page/Asset+491.svg`" />
              Our vision for your event
            </div>
            <p class="mt-10">{{ vendorProposal.eventVision }}</p>
          </div>
          <div class="proposal-images mb-40">
            <div class="font-bold mb-10">Some references to the experience you will get from us</div>
            <carousel :items="4" :margin="25" :dots="false" :nav="false" class="proposal-images-carousel">
              <template slot="prev">
                <span class="prev handle-btn">
                  <md-icon>keyboard_arrow_left</md-icon>
                </span>
              </template>

              <div v-for="item in vendorProposal.inspirationalPhotos.filter((item) => !!item)" :key="item.url">
                <img class="item" :src="item.url" />
                <div class="mt-5">{{ item.caption }}</div>
              </div>
              <template slot="next">
                <span class="next handle-btn">
                  <md-icon>keyboard_arrow_right</md-icon>
                </span>
              </template>
            </carousel>
          </div>
          <div class="about-us mb-40">
            <md-button class="md-red edit-btn md-simple" @click="showAboutUs = !showAboutUs">
              <span class="color-red font-bold">
                About Us <md-icon class="color-red">keyboard_arrow_right</md-icon>
              </span>
            </md-button>
            <div class="about-content mt-10" v-if="showAboutUs">{{ vendorProposal.vendor.about.company }}</div>
          </div>
          <div class="contact-section mb-40">
            <div class="proposal-section__title font-size-22 font-bold-extra">Contact Us</div>
            <ul class="contact-list_items d-flex justify-content-start">
              <li class="contact-list_item" v-if="vendorProposal.vendor.vendorMainEmail">
                <a href>
                  <img :src="`${submitProposalIcon}Asset 286.svg`" />
                  {{ vendorProposal.vendor.vendorMainEmail }}
                </a>
              </li>
              <li class="contact-list_item" v-if="vendorProposal.vendor.vendorAddressLine1">
                <a href>
                  <img :src="`${submitProposalIcon}Asset 285.svg`" />
                  {{ vendorProposal.vendor.vendorAddressLine1 }}
                  {{ vendorProposal.vendor.vendorAddressLine2 }}
                </a>
              </li>
              <li class="contact-list_item" v-if="vendorProposal.vendor.vendorMainPhoneNumber">
                <a href>
                  <img :src="`${submitProposalIcon}Asset 284.svg`" />
                  {{ vendorProposal.vendor.vendorMainPhoneNumber }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="proposal-section pricing-section">
        <div class="proposal-section__title font-size-22 font-bold-extra">
          <img
            src="https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/SVG/Asset%2010.svg"
            width="15"
          />
          Pricing & Details
          <span class="font-regular font-size-16">*We work only with our catering</span>
        </div>
        <div class="mt-20">What would you like to take from our suggested services?</div>
        <div class="pricing-section__list">
          <div class="pricing-section__item element-block p-60 pt-40">
            <div class="d-flex justify-content-between align-center">
              <div class="item-info d-flex justify-content-start align-center">
                <div class="element-title">
                  <img :src="`${$iconURL}Budget+Elements/${vendorProposal.vendor.eventCategory.icon}`" />
                  {{ vendorProposal.vendor.eventCategory.fullTitle }}
                  <span class="element-duration">For Whole Event</span>
                </div>
              </div>
              <div class="item-pricing d-flex justify-content-end align-center">
                <div class="element-value" v-if="!expand">
                  <div class="element-price">${{ totalPrice | withComma }}</div>
                  <div class="discount-details" v-if="discount.percentage">
                    ({{ discount.percentage }}% off)
                    <span>${{ totalPrice | withComma }}</span>
                  </div>
                </div>
                <div class="view-element">
                  <md-button
                    class="md-just-icon md-simple md-red"
                    :class="{ expanded: expand }"
                    @click="expand = !expand"
                  >
                    <img :src="`${submitProposalIcon}Component 36.svg`" />
                  </md-button>
                </div>
              </div>
            </div>
            <!-- Expanded Section -->
            <div class="expanded-section" v-if="expand">
              <div
                class="loading"
                v-if="vendorProposal.attachements && vendorProposal.attachements.length && !fetchingAllAttachments"
              >
                Loading ...
              </div>

              <div class="element-pricing-table elements-list">
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>QTY</th>
                      <th>Price per unit</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(service, index) in costServices" :key="`cost-service-${index}`">
                      <td>{{ service.requirementTitle }}</td>
                      <td>{{ service.requirementValue }}</td>
                      <td>${{ service.price | withComma }}</td>
                      <td>${{ (service.requirementValue * service.price) | withComma }}</td>
                      <td class="element-actions"></td>
                    </tr>
                    <tr v-for="(service, index) in addedServices" :key="`added-service-${index}`">
                      <td><md-icon class="color-red">add_circle_outline</md-icon>{{ service.requirementTitle }}</td>
                      <td>{{ service.requirementValue }}</td>
                      <td>${{ service.price | withComma }}</td>
                      <td>${{ (service.requirementValue * service.price) | withComma }}</td>
                      <td class="element-actions">
                        <md-button class="md-simple edit-btn" @click="removeService(service)">
                          <img :src="`${$iconURL}common/trash-dark.svg`"
                        /></md-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="element-pricing-table taxes-list">
                <table>
                  <tbody>
                    <tr>
                      <td colspan="3">
                        <span class="taxes-title">Discount</span>
                        <span class="taxes-percentage">{{ discount.percentage }}%</span>
                      </td>
                      <td>-${{ discount.price }}</td>
                      <td class="element-actions">
                        <md-button class="md-simple md-just-icon">
                          <img :src="`${submitProposalIcon}Asset 311.svg`" />
                        </md-button>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3">
                        <span class="taxes-title">Taxes</span>
                        <span class="taxes-percentage">{{ tax.percentage }}%</span>
                      </td>
                      <td>${{ tax.price }}</td>
                      <td class="element-actions">
                        <md-button class="md-simple md-just-icon">
                          <img :src="`${submitProposalIcon}Asset 311.svg`" />
                        </md-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="element-pricing-table total-list">
                <table>
                  <tbody>
                    <tr>
                      <td colspan="3">
                        <b class="font-size-22">Total</b>
                        <div class="font-size-14" v-if="discount.percentage">Before discount</div>
                      </td>
                      <td class="element-value">
                        <div class="element-price">${{ totalPrice | withComma }}</div>
                        <div class="discount-details" v-if="discount.percentage">
                          ({{ discount.percentage }}% off)
                          <span>${{ totalPrice | withComma }}</span>
                        </div>
                      </td>
                      <td class="element-actions">
                        <md-button class="md-simple md-just-icon">
                          <img :src="`${submitProposalIcon}Asset 311.svg`" />
                        </md-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="proposal-includes">
                <div class="proposal-includes__title font-size-22">
                  <img
                    data-v-5af98ad9=""
                    :src="`${$iconURL}NewSubmitPorposal/includedPrice.png`"
                    class="page-icon mr-10"
                  />
                  What Do We Include In This Proposal?
                </div>
                <template v-if="includedServices.length">
                  <included-service-item
                    class="proposal-includes__item"
                    v-for="(item, index) in includedServices"
                    :item="item"
                    :key="index"
                  >
                    <!-- <div class="d-flex justify-content-between align-center">
                      <div class="item-title">
                        <img :src="`${submitProposalIcon}Group 4781.svg`" />
                        {{ item.requirementTitle }}
                      </div>
                      <div class="item-actions d-flex justify-content-end align-center">
                        {{ item.requirementValue }}
                        <md-button class="md-simple md-just-icon" @click="expandIncludedItem(item, index)">
                          <img :src="`${submitProposalIcon}Component 36.svg`" />
                        </md-button>
                      </div>
                    </div>

                    <div class="item-description" v-if="item.expanded">
                      {{ item.description }}
                    </div> -->
                  </included-service-item>
                </template>
              </div>

              <div class="extras-section" v-if="extraServices.length">
                <div class="extras-section__title">
                  <h3 class="font-size-22">
                    <img
                      src="https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/SVG/Asset%2010.svg"
                      width="12"
                    />
                    Extras
                  </h3>
                  <div class="extras-section__header">
                    <span>Would you like to upgrade & add one of these?</span>
                    <div class="text-center">QTY</div>
                    <div class="text-center">Price per unit</div>
                  </div>
                </div>
                <div class="extras-section__list">
                  <extra-service-item
                    class="extras-section__item"
                    v-for="(item, index) in extraServices.filter((item) => item.price)"
                    :key="`extra-service-item-${index}`"
                    :item="item"
                    @add="addExtraService(item)"
                  ></extra-service-item>
                </div>
              </div>

              <div class="proposal-section attachments-section" v-if="attachedFiles.length">
                <div class="proposal-section__title">Attachments</div>

                <ul class="attachments-list_items">
                  <li class="attachments-list_item" v-for="(item, index) in attachedFiles" :key="index">
                    <a target="_blank" :href="`${item.fullPath}`">
                      <md-icon>attach_file</md-icon>
                      {{ item.tag ? item.tag.replace(/_/g, " ") : `Attachment${index + 1}` }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- ./Expanded Section -->
          </div>
        </div>

        <!-- <table class="pricing-section__table">
          <tbody>
            <template v-if="extraMissingRequirements.length">
              <tr class="element-block" v-for="(item, index) in extraMissingRequirements" :key="index">
                <td class="select-item">
                  <input class="styled-checkbox" :id="`checkbox-${index}`" type="checkbox" :value="item.id" />
                  <label :for="`checkbox-${index}`"></label>
                </td>
                <td class="element-title">
                  {{ item.requirementTitle }}
                  <span class="element-duration">For Whole Event</span>
                </td>
                <td class="element-value">
                  <div class="element-price">${{ item.price | withComma }}</div>
                  <div class="discount-details">
                    (10% off)
                    <span>${{ item.price | withComma }}</span>
                  </div>
                </td>
                <td class="view-element">
                  <md-button class="md-just-icon md-red md-outline">
                    <img :src="`${submitProposalIcon}Component 36.svg`" />
                  </md-button>
                </td>
              </tr>
            </template>
            <tr class="taxes">
              <td colspan="2">
                Taxes
                <span class="taxes-value">{{ tax.percentage }}%</span>
              </td>
              <td>${{ tax.price | withComma }}</td>
              <td></td>
            </tr>
            <tr class="total">
              <td colspan="2">Total</td>
              <td>${{ totalPrice | withComma }}</td>
              <td></td>
            </tr>
          </tbody>
        </table> -->
      </div>

      <div class="proposal-section policy-section">
        <div class="proposal-section__title">
          <img :src="`${submitProposalIcon}Asset 287.svg`" width="20" /> Our Policy
        </div>

        <div class="policy-content">
          <div class="side-label">
            <div class="label-value">Our Policy</div>
          </div>
          <div class="rules">
            <div class="rule" v-for="(policy, yIndex) in validPolicy" :key="yIndex">
              <div class="item">{{ policy.name }}</div>
              <div class="item" v-if="policy.type === 'MultiSelection'">
                <span class="mr-10" v-for="(v, vIndex) in policy.value">{{
                  `${v}${vIndex == policy.value.length - 1 ? "" : ","}`
                }}</span>
              </div>
              <div class="item" v-else-if="policy.type === 'Including'">
                <span class="mr-10" v-if="policy.value"> Yes </span>
                <span class="mr-10" v-if="!policy.value && policy.cost"> {{ `$ ${policy.cost}` }} </span>
              </div>
              <div class="item text-right" v-else>
                <span v-if="policy.type === Number && !policy.isPercentage && policy.unit !== 'hour'">$</span>
                <span v-if="policy.type === Boolean">
                  <img
                    v-if="policy.value === true"
                    :src="`${$iconURL}Vendor Signup/Group 5479 (2).svg`"
                    class="page-icon"
                  />
                  <img v-else :src="`${$iconURL}Vendor Signup/Group 5489 (4).svg`" class="page-icon" />
                  <!-- {{ policy.value === true ? "Yes" : "No" }} -->
                </span>
                <span v-else>
                  <img
                    class="page-icon"
                    v-if="policy.value === true"
                    :src="`${$iconURL}Vendor Signup/Group 5479 (2).svg`"
                  />
                  <img
                    class="page-icon"
                    v-else-if="policy.value === false"
                    :src="`${$iconURL}Vendor Signup/Group 5489 (4).svg`"
                  />
                  <span v-else>{{ policy.value }}</span>
                </span>
                <span v-if="policy.unit === 'hour'">Hour{{ policy.value > 1 ? "s" : "" }}</span>
                <span v-if="policy.isPercentage">%</span>
                <span class="ml-50" v-if="policy.hasOwnProperty('attendees')"> {{ policy.attendees }} attendees </span>
              </div>
            </div>
          </div>
          <div class="side-label">
            <div class="label-value">Our cancellation approach</div>
          </div>

          <div class="proposal-section__subtitle">
            <div class="subtitle">We allow free cancellation until:</div>
            <div class="desc">30 days before the event</div>
          </div>

          <cancellation-policy></cancellation-policy>

          <div class="additional-info">
            <div class="additional-info__title">Additional</div>
            <div class="additional-info__content">
              {{ vendorProposal.candellationPolicy }}
            </div>
          </div>

          <div class="signature-section">
            <div class="signature-section__vendor">
              {{ vendorProposal.vendor.vendorDisplayName }}
            </div>
            <div class="signature-section__image">
              <img :src="vendorProposal.vendor.signature" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="book-proposal-form">
      <div class="form-title">
        Would You Like To Book
        <a href class="font-bold-extra">
          {{ vendorProposal.vendor.companyName }} </a
        >?
      </div>
      <div class="agree-checkbox" v-if="this.vendorProposal.suggestedTime">
        <md-checkbox v-model="acceptNewTimes">I agree to the new time of this proposal</md-checkbox>
        <div class="alert alert-danger">Please indicate that you accept the new time of this proposal</div>
      </div>
    </div>
    <div class="proposal-footer white-card d-flex justify-content-between">
      <div>
        <md-button @click="back" class="md-simple maryoku-btn md-black">
          <md-icon>arrow_back</md-icon>
          Back
        </md-button>
        <md-button @click="scrollToTop" class="md-button md-simple md-just-icon md-theme-default scroll-top-button">
          <img :src="`${$iconURL}Budget+Requirements/Asset+49.svg`" width="17" />
        </md-button>
      </div>
      <div>
        <md-menu md-size="medium" md-align-trigger md-direction="top-end" class="schedule-menu">
          <md-button md-menu-trigger class="md-simple maryoku-btn md-black">
            <span class="font-size-16"> Contact vendor </span>
          </md-button>
          <md-menu-content>
            <md-menu-item class="text-center" @click="negotiate">
              <span class="font-size-16 font-bold-extra"> Negotiate rate </span>
            </md-menu-item>
            <md-menu-item class="text-center" @click="askQuestion">
              <span class="font-size-16 font-bold-extra"> Ask question </span>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
        <md-button
          class="md-red maryoku-btn"
          @click="bookVendor"
          :disabled="this.vendorProposal.suggestedTime && !acceptNewTimes"
          >Book this vendor</md-button
        >
      </div>
    </div>
  </div>
</template>

<script>
//MAIN MODULES
import ChartComponent from "@/components/Cards/ChartComponent";
import CancellationPolicy from "@/components/CancellationPolicy";
import { ChartCard } from "@/components";

// import auth from '@/auth';
import moment from "moment";
import VueElementLoading from "vue-element-loading";
import CalendarEvent from "@/models/CalendarEvent";
import CalendarEventStatistics from "@/models/CalendarEventStatistics";
import ProposalRequest from "@/models/ProposalRequest";
import Vendors from "@/models/Vendors";
import _ from "underscore";

import carousel from "vue-owl-carousel";

import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

import { Tabs, Modal } from "@/components";

import EventBudgetVendors from "../components/EventBudgetVendors";
import EditEventBlocksBudget from "../components/EditEventBlocksBudget";
import EventComponentVendor from "@/models/EventComponentVendor";
//COMPONENTS

import SideBar from "@/components/SidebarPlugin/NewSideBar";
import SidebarItem from "@/components/SidebarPlugin/NewSidebarItem.vue";
import ProgressSidebar from "../components/progressSidebar";

import HeaderActions from "@/components/HeaderActions";
import CommentEditorPanel from "../components/CommentEditorPanel";
import Proposal from "@/models/Proposal";
import ExtraServiceItem from "./ExtraServiceItem";
import IncludedServiceItem from "./IncludedServiceItem.vue";
export default {
  components: {
    Tabs,
    EventBudgetVendors,
    ChartComponent,
    ChartCard,
    SideBar,
    SidebarItem,
    Modal,
    EditEventBlocksBudget,
    carousel,
    ProgressSidebar,
    HeaderActions,
    CommentEditorPanel,
    CancellationPolicy,
    ExtraServiceItem,
    IncludedServiceItem,
  },

  data() {
    return {
      // auth: auth,
      showCommentEditorPanel: false,
      calendarEvent: {},
      selectedComponents: [],
      currentTab: "blocks",
      eventId: null,
      isLoading: false,
      event: {
        statistics: {},
      },
      routeName: null,
      budgetPerEmployee: 0,
      menuIconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/menu%20_%20checklist/SVG/",
      iconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/Event%20Page/",
      submitProposalIcon: "https://static-maryoku.s3.amazonaws.com/storage/icons/Submit%20Proposal/",
      vendorProposal: {},
      extraTotal: 0,
      serverUrl: process.env.SERVER_URL,
      images: [],
      attachedFiles: [],
      fetchingAllAttachments: false,
      acceptNewTimes: false,
      expand: true,
      extraServices: [],
      showAboutUs: false,
      addedServices: [],
    };
  },
  created() {
    const proposalId = this.$route.params.proposalId;
    console.log(proposalId);
    Proposal.find(proposalId).then((proposal) => {
      this.vendorProposal = proposal;
      this.extraServices = this.vendorProposal.extraServices[this.vendorProposal.vendor.eventCategory.key];
    });
  },

  methods: {
    ...mapMutations("EventPlannerVuex", [
      "setEventModal",
      "setEditMode",
      "setModalSubmitTitle",
      "setEventModalAndEventData",
      "setNumberOfParticipants",
      "setEventData",
    ]),
    addExtraService(extraService) {
      const itemIndex = this.extraServices.findIndex((item) => item.requirementTitle === extraService.requirementTitle);
      console.log(itemIndex);
      if (itemIndex >= 0) {
        this.$set(this.extraServices[itemIndex], "added", true);
        this.addedServices.push(extraService);
      }
      this.extraServices = [...this.extraServices];
      this.$forceUpdate();
    },
    removeService(extraService) {
      const itemIndex = this.extraServices.findIndex((item) => item.requirementTitle === extraService.requirementTitle);
      const addedIndex = this.addedServices.findIndex(
        (item) => item.requirementTitle === extraService.requirementTitle,
      );
      console.log(itemIndex);
      if (itemIndex >= 0) {
        this.$set(this.extraServices[itemIndex], "added", false);
        this.addedServices.splice(addedIndex, 1);
      }
      this.extraServices = [...this.extraServices];
      this.$forceUpdate();
    },
    back() {
      this.$router.go(-1);
    },
    negotiate() {},
    askQuestion() {},
    bookVendor() {},
    getEvent() {},
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    getImages() {
      let vm = this;
      this.images = [];
      this.attachedFiles = [];

      this.vendorProposal.attachements.forEach((item, index) => {
        const fullPath = `${this.serverUrl}/1/proposal-requests/${vm.$route.params.proposalId}/files/${item.id}`;

        this.$http.get(fullPath, { headers: this.$auth.getAuthHeader() }).then((response) => {
          if (response && response.headers) {
            if (response.headers["content-type"].indexOf("image") > -1) {
              this.images.push({
                thumb: fullPath,
                src: fullPath,
                caption: "",
                srcset: "",
              });
            } else {
              this.attachedFiles.push({
                fullPath: fullPath,
                tag: item.tag,
                name: item.name,
              });
            }
          }

          if (index + 1 == vm.vendorProposal.attachements.length) {
            setTimeout(function () {
              vm.fetchingAllAttachments = true;
            }, 2000);
          }

          console.log("images ", this.images);
        });
      });
    },
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = mode;
    },
    exportToPdf() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
  computed: {
    ...mapState("event", ["eventData", "eventModalOpen", "modalTitle", "modalSubmitTitle", "editMode"]),
    ...mapGetters({
      components: "event/getComponentsList",
    }),
    extraMissingRequirements() {
      return _.union(this.vendorProposal.extras, this.vendorProposal.missing);
    },
    headerBackgroundImage() {
      if (this.vendorProposal.inspirationalPhotos && this.vendorProposal.inspirationalPhotos[0])
        return this.vendorProposal.inspirationalPhotos[0].url;
      if (this.vendorProposal.vendor.images && this.vendorProposal.vendor.images[0])
        return this.vendorProposal.vendor.images[0];
      if (this.vendorProposal.vendor.vendorImages && this.vendorProposal.vendor.vendorImages[0])
        return this.vendorProposal.vendor.vendorImages[0];
      return "";
    },
    discount() {
      if (!this.vendorProposal.discounts) return { percentage: 0, price: 0 };
      let discount = this.vendorProposal.discounts[this.vendorProposal.vendor.eventCategory.key];
      if (!discount) {
        discount = { price: 0, percentage: 0 };
      }
      console.log("discount", discount);
      return discount;
    },
    tax() {
      if (!this.vendorProposal.taxes) return { percentage: 0, price: 0 };
      let tax = this.vendorProposal.taxes[this.vendorProposal.vendor.eventCategory.key];
      if (!tax) {
        tax = { price: 0, percentage: 0 };
      }
      tax.price = Math.round((this.priceOfCostservices * tax.percentage) / 100);
      return tax;
    },
    costServices() {
      return this.vendorProposal.costServices[this.vendorProposal.vendor.eventCategory.key];
    },
    includedServices() {
      return this.vendorProposal.includedServices[this.vendorProposal.vendor.eventCategory.key];
    },

    priceOfCostservices() {
      if (this.costServices.length === 0) return 0;
      return (
        this.costServices.reduce((s, item) => {
          return s + item.requirementValue * item.price;
        }, 0) +
        this.addedServices.reduce((s, item) => {
          return s + item.requirementValue * item.price;
        }, 0)
      );
    },
    totalPrice() {
      return this.priceOfCostservices - this.discount.price + this.tax.price;
    },
    extraServicePrice() {
      return this.extraServices.reduce((s, item) => {
        return s + item.requirementValue * item.price;
      }, 0);
    },
    validPolicy() {
      if (this.vendorProposal.vendor.policies)
        return this.vendorProposal.vendor.policies.filter(
          (item) => item.hasOwnProperty("value") || (item.type === "Including" && item.cost),
        );
      return null;
    },
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format("MMM Do YYYY ");
    },
    formatTime: function (date) {
      return moment(date).format("h:00 A");
    },
    formatDuration: function (startDate, endDate) {
      return moment(endDate).diff(startDate, "hours");
    },
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.md-layout,
.md-layout-item {
  width: initial;
}

.tab-content {
  background-color: transparent !important;
}

.proposal-page {
  &_details {
    .alert-danger {
      background-color: #ffe5ec;
      font-size: 12px;
      color: #050505;
      margin-left: 1em;
      box-shadow: none;
      padding: 0.6em 1.4em;
      display: inline-block;
    }

    .proposal-content {
      margin: 0 2em;

      .proposal-info {
        background: #fff;
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
      }

      .proposal-header {
        background-size: cover !important;
        height: 500px;

        .event-info {
          background: rgba(255, 255, 255, 0.76);
          align-items: center;
          padding: 2.5em;

          h3 {
            margin: 0;
            font-size: 20px;
            font-weight: 800;
            color: #050505;
          }
        }
        .event-details {
          list-style: none;
          display: flex;
          flex-direction: row;
          margin: 0;
          padding: 0;

          &__item {
            font-size: 14px;

            &:not(:last-child) {
              border-right: 1px solid #818080;
              padding-right: 60px;
              margin-right: 60px;
            }

            label {
              font-weight: 800;
              color: #818080;
              margin-bottom: 1em;
            }
            .info-text {
              color: #050505;
            }
          }
        }
      }

      .md-rose {
        &.md-outline {
          background: none !important;
          border: none;
          box-shadow: none;
          min-width: auto;

          .md-ripple {
            color: #f51355;
            font-size: 14px;
            font-weight: 800;
            padding: 0 !important;
            text-transform: capitalize;

            .md-icon {
              color: #f51355 !important;
            }
          }
        }
      }

      .proposal-body {
        padding: 1em 2.5em;

        h1 {
          margin: 1em 0 0;
          font-size: 28px;
          font-weight: 800;
          color: #050505;
        }

        p {
          font-size: 14px;
          color: #050505;
          .proposal-title {
            font-weight: 800;
            display: block;
          }
        }

        .proposal-includes {
          margin: 3em 0;
          padding-right: 20%;
          &__title {
            margin-bottom: 1em;
          }
          &__item {
            display: inline-block;
            width: 29%;
            margin-bottom: 1.5em;

            img {
              width: 20px;
              margin-right: 1em;
            }
          }
        }
      }

      .proposal-section {
        &__title {
          font-size: 20px;
          font-weight: 800;
          color: #050505;
          img {
            margin-right: 0.2em;
          }

          small {
            margin-top: 0.5em;
            font-size: 14px;
            color: #050505;
            display: block;
          }
        }

        &.contact-section {
          border-top: 1px solid #808181;
          padding: 2em 2.5em;
        }
      }

      .pricing-section {
        margin-top: 4em;

        &__table,
        &__list {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 1em;

          margin-top: 1em;

          > tbody {
            tr {
              height: 90px !important;

              td {
                padding: 20px 25px;

                &:nth-child(3) {
                  text-align: right;
                }
              }
            }
          }

          //.item-info {
          //    width : 69%;
          //    display: inline-flex;
          //}
          //
          //.item-pricing {
          //    width : 30%;
          //    display: inline-flex;
          //    text-align: right;
          //}

          .element-block {
            color: #050505;
            border-radius: 3px 3px 0 0;
            box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
            background-color: #ffffff;
            margin-bottom: 1em;

            &.bundle-offer {
              background-color: #ffedb7;

              .discount-percentage {
                font-weight: normal;
                margin: 0 6px;
              }
              .bundle-title {
                font-size: 14px;
              }

              .original-price {
                font-size: 18px;
                font-weight: 500;
                color: #818080;
                text-decoration: line-through;
              }
              .new-price {
                font-size: 20px;
              }
            }

            .styled-checkbox {
              position: absolute; // take it out of document flow
              opacity: 0; // hide it

              & + label {
                position: relative;
                cursor: pointer;
                padding: 0;
              }

              // Box.
              & + label:before {
                content: "";
                margin-right: 10px;
                display: inline-block;
                vertical-align: text-top;
                width: 25px;
                height: 25px;
                background: white;
                border: 2px solid #a0a0a0;
                border-radius: 2px;
              }

              // Box hover
              &:hover + label:before {
                border-color: $rose;
              }

              // Box checked
              &:checked + label:before {
                border-color: $rose;
              }

              // Disabled state label.
              &:disabled + label {
                color: #b8b8b8;
                cursor: auto;
              }

              // Disabled box.
              &:disabled + label:before {
                box-shadow: none;
                background: #ddd;
              }

              // Checkmark. Could be replaced with an image
              &:checked + label:after {
                content: "";
                position: absolute;
                left: 7px;
                top: 12px;
                background: $rose;
                width: 2px;
                height: 2px;
                box-shadow: -2px 0 0 $rose, 2px 0 0 $rose, 4px 0 0 $rose, 4px -2px 0 $rose, 4px -4px 0 $rose,
                  4px -6px 0 $rose, 4px -8px 0 $rose, 4px -10px 0 $rose;
                transform: rotate(45deg);
              }
            }

            .select-item {
              margin-right: 1em;
            }

            .element-title {
              font-size: 28px;

              img {
                width: 30px;
                margin-right: 0.2em;
              }

              .element-duration {
                font-size: 18px;
                font-weight: normal;
                margin-left: 4em;
              }
            }

            .element-value {
              font-size: 18px;
              text-align: right;

              .discount-details {
                font-size: 12px;
                color: #707070;

                span {
                  text-decoration: line-through;
                  margin-left: 0.7em;
                  margin-top: 0.3em;
                  display: inline-block;
                }
              }
            }

            .view-element {
              margin-left: 1em;
              img {
                width: 13px;
              }

              .expanded {
                img {
                  transform: rotate(90deg);
                }
              }
            }

            .expanded-section {
              margin-top: 1em;

              .proposal-includes {
                padding-right: 20%;
                &__title {
                  font-size: 20px;
                  font-weight: 800;
                  color: #050505;
                  margin-bottom: 1em;
                }

                &__item {
                  &:not(:last-child) {
                    border-bottom: 1px solid #cccccc;
                  }
                  img {
                    width: 20px;
                    margin-right: 1em;
                  }
                  .item-actions {
                    img {
                      width: 6px;
                      margin: auto;
                    }
                  }

                  .item-description {
                    float: left;
                    font-weight: normal;
                    font-size: 12px;
                    width: 67%;
                    line-height: 1.71;
                  }
                }
              }

              .extras-section {
                margin-top: 5em;
                padding-right: 20%;
                position: relative;

                &:after {
                  content: " ";
                  position: absolute;
                  top: -2em;
                  left: -25px;
                  right: 0;
                  width: calc(100% + 50px);
                  background: #ccc;
                  height: 1px;
                }

                &__header {
                  display: grid;
                  grid-template-columns: 50% 15% 15% 15% 5%;
                }
                &__title {
                  margin-bottom: 1em;
                  h3 {
                    margin: 0 0 0.5em;
                    font-size: 20px;
                    font-weight: 800;
                  }

                  small {
                    font-size: 14px;
                  }
                }

                &__item:not(:last-child) {
                  border-bottom: 1px solid #ccc;
                }
              }
            }
          }

          .taxes {
            background-color: #e0e0e0;
            color: #818080;
            font-size: 14px;
          }

          .total {
            color: #fff;
            background-color: #424242;
            font-size: 18px;
            font-weight: bold;
          }

          .element-pricing-table {
            padding: 1.5em;
            font-family: "Manrope-Regular", sans-serif;

            &.elements-list {
              background: #f7f7f7;
              margin-bottom: -21px;

              th,
              td {
                font-size: 16px;
              }
              th {
                font-family: "Manrope-ExtraBold", sans-serif;
                padding-bottom: 15px;
              }

              tr {
                td {
                  font-weight: normal;
                  border-top: 1px solid #ddd;
                  padding: 21px 0;

                  &.element-actions {
                    .md-button {
                      visibility: hidden;
                    }
                  }
                }

                &:hover {
                  td {
                    font-weight: bold;

                    &.element-actions {
                      .md-button {
                        visibility: visible;
                      }
                    }
                  }
                }
              }
            }

            &.taxes-list {
              background: #ededed;
              color: #818080;
              padding: 0.6em 1.5em;
              border-top: 1px solid;
              tr {
                &:first-child {
                  td {
                    border-bottom: 1px solid;
                  }
                }
                td {
                  .taxes-title {
                    display: inline-block;
                    width: 90px;
                  }
                  .taxes-percentage {
                    margin-left: 1em;
                  }

                  &.element-actions {
                    .md-button {
                      visibility: hidden;
                    }
                  }
                }
              }
            }

            &.total-list {
              background: #404040;
              color: #fff;
              margin-bottom: 3em;

              td {
                .discount-details {
                  color: #fff !important;
                }
                small {
                  display: block;
                }
                &.element-actions {
                  .md-button {
                    visibility: hidden;
                  }
                }
              }
            }

            table {
              width: 100%;
              border-collapse: collapse;
              thead {
                text-align: left;
              }

              td,
              th {
                &:nth-last-child(2):not(:first-child),
                &:nth-last-child(3):not(:first-child),
                &:nth-last-child(4):not(:first-child) {
                  width: 150px;
                  text-align: center;
                }
                .md-button {
                  img {
                    width: 15px;
                  }
                }

                &.element-actions {
                  width: 20px;
                }

                &.element-value {
                  text-align: right !important;
                  padding-right: 44px;
                }
              }
            }
          }
        }

        &__item {
          padding: 40px 60px;
        }
      }

      .attachments-list {
        &_items {
          list-style: none;
          padding: 0;
          margin: 1.5em 0 0;
        }
        &_item {
          display: inline-block;
          &:not(:last-child) {
            margin-right: 1em;
          }

          a {
            border-radius: 3px;
            border: solid 1px #f51355;
            text-align: center;
            font-size: 14px;
            color: #f51355;
            display: inline-block;
            padding: 8px 20px;
            font-weight: 400;
            text-transform: capitalize;

            .md-icon {
              color: #f51355 !important;
              font-size: 18px !important;
            }
          }
        }
      }

      .policy-section {
        margin-top: 4em;

        .proposal-section__subtitle {
          color: #050505;
          margin: 1em auto;

          .subtitle {
            font-size: 18px;
            font-weight: 800;
          }

          .desc {
            font-size: 14px;
          }
        }

        .side-label {
          font-size: 18px;
          font-weight: 800;
          color: #050505;
          margin: 3em 0 1.5em;
          position: relative;

          &:before {
            content: " ";
            position: absolute;
            background-color: #ededed;
            width: 288px;
            height: 53px;
            top: -15px;
            left: -2.5em;
          }

          .label-value {
            position: relative;
            z-index: 999;
          }
        }

        .policy-content {
          margin-top: 1.5em;
          background: #fff;
          box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
          padding: 2em 2.5em;
        }
      }

      .policies-list {
        font-size: 14px;
        color: #050505;
        &__item {
          width: 42%;
          display: inline-block;
          margin-bottom: 1em;

          b {
            font-size: 18px;
            font-weight: 800;
          }
        }
      }

      .additional-info {
        margin-top: 1em;
        font-size: 14px;
        color: #050505;

        &__title {
          font-weight: 800;
          margin-bottom: 0.5em;
        }

        &__content {
          width: 59%;
        }
      }

      .signature-section {
        margin-top: 3em;

        &__vendor {
          font-size: 14px;
          font-weight: 800;
          color: #050505;
          text-decoration: underline;
        }
        &__image {
          img {
            width: 200px;
          }
        }
      }

      .contact-list {
        &_items {
          padding: 0;
          margin: 1em 0 0;
          list-style: none;
        }
        &_item {
          margin-right: 3em;
          a {
            color: #050505;
            text-decoration: underline;
            &:hover {
              color: #000;
            }
            img {
              width: 20px;
              margin-right: 1em;
            }
          }
        }
      }
    }
    .proposal-footer {
      text-align: center;
      padding: 40px;
    }
    .vision {
      img {
        width: 25px;
        margin-right: 10px;
      }
    }

    .proposal-images {
      &-carousel {
        position: relative;
        .handle-btn {
          background-color: white !important;
          height: 25px;
          width: 25px;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          &.next {
            right: 20px;
          }
          &.prev {
            left: 20px;
          }
        }
        .item {
          max-height: 200px;
          object-fit: cover;
          border-radius: 5px;
          overflow: hidden;
        }
      }
    }
    .back-btn {
      .md-ripple {
        color: #000;
        font-weight: 800;
        text-transform: capitalize;
      }
    }

    .book-proposal-form {
      padding: 2em;
      border-bottom: 1px solid #cfcfcf;

      .form-title {
        font-size: 28px;
        color: #050505;
        margin-bottom: 1em;

        a {
          color: #050505;
          text-decoration: underline;

          &:hover {
            color: #cd1047;
          }
        }
      }

      .agree-checkbox {
        position: relative;

        .alert-danger {
          position: absolute;
          left: -20px;
          top: 100%;
          margin: 0;
          padding: 0.6em 3em;

          &:after {
            bottom: 100%;
            left: 1.6em;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            border-bottom-color: #ffe5ec;
            border-width: 10px;
          }
        }
      }
    }
  }

  &_header {
    padding: 0.5em 1em;
    font-size: 30px;
    a {
      text-decoration: underline;
      font-weight: 800;
      font-size: 30px;
      color: #050505 !important;
      text-transform: capitalize;
    }

    img {
      width: 30px;
      margin-right: 0.5em;
    }
  }
}
</style>


