<template>
  <div class="proposal-page_details with-progress-bar">
    <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
    <div class="event-header d-flex justify-content-between">
      <div class="proposal-page_header text-transform-uppercase">
        <img :src="`${$iconURL}Budget+Elements/${vendorProposal.vendor.eventCategory.icon}`" />
        <a href="javascript:void(0)">{{ vendorProposal.vendor.vendorDisplayName }}</a>
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
              <div class="alert alert-danger">This proposal is 2 days before your original date</div>
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
          <h1>Dear Rachel,</h1>
          <p>
            {{ vendorProposal.personalMessage }}
            <br />
            <br />Sincerely,
            <span class="proposal-title">{{ vendorProposal.vendor.vendorDisplayName }}</span>
          </p>

          <md-button class="md-rose md-raised md-outline">More About Us</md-button>

          <!--                    <div class="loading" v-if="vendorProposal.attachements.length && !fetchingAllAttachments">-->
          <!--                        Loading ...-->
          <!--                    </div>-->

          <!--                    <carousel :items="3" :margin="25" :dots="false" :nav="false" class="proposal-images" v-if="fetchingAllAttachments">-->

          <!--                        <template slot="prev"><span class="prev"> <md-icon>keyboard_arrow_left</md-icon> </span></template>-->

          <!--                        <div class="item"-->
          <!--                             v-for="(item,index) in images" :key="index"-->
          <!--                             :style="`background: url(${item.src}) center center no-repeat; `">-->

          <!--                        </div>-->

          <!--                        <template slot="next"><span class="next"> <md-icon>keyboard_arrow_right</md-icon> </span></template>-->

          <!--                    </carousel>-->

          <!--                    <div class="proposal-includes">-->

          <!--                        <div class="proposal-includes__title">-->
          <!--                            What Do We Include In This Proposal?-->
          <!--                        </div>-->
          <!--                        <template v-if="vendorProposal.included.length">-->
          <!--                            <div class="proposal-includes__item" v-for="(item,index) in vendorProposal.included" :key="index">-->
          <!--                                <img :src="`${submitProposalIcon}Group 4781.svg`"> {{item.requirementTitle}}-->
          <!--                            </div>-->
          <!--                        </template>-->

          <!--                    </div>-->
        </div>

        <div class="proposal-section contact-section">
          <div class="proposal-section__title">Contact Us</div>

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
                <!-- <div class="select-item">
                  <input class="styled-checkbox" :id="`checkbox-1`" type="checkbox" />
                  <label :for="`checkbox-1`"></label>
                </div> -->
                <div class="element-title">
                  <img :src="`${$iconURL}Budget+Elements/${vendorProposal.vendor.eventCategory.icon}`" />
                  {{ vendorProposal.vendor.eventCategory.fullTitle }}
                  <span class="element-duration">For Whole Event</span>
                </div>
              </div>
              <div class="item-pricing d-flex justify-content-end align-center">
                <div class="element-value">
                  <div class="element-price">${{ 800 | withComma }}</div>
                  <div class="discount-details">
                    (10% off)
                    <span>${{ 1100 | withComma }}</span>
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

              <carousel
                :items="3"
                :margin="25"
                :dots="false"
                :nav="false"
                class="proposal-images"
                v-if="fetchingAllAttachments"
              >
                <template slot="prev">
                  <span class="prev">
                    <md-icon>keyboard_arrow_left</md-icon>
                  </span>
                </template>

                <div
                  class="item"
                  v-for="(item, index) in images"
                  :key="index"
                  :style="`background: url(${item.src}) center center no-repeat; `"
                ></div>

                <template slot="next">
                  <span class="next">
                    <md-icon>keyboard_arrow_right</md-icon>
                  </span>
                </template>
              </carousel>

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
                    <tr>
                      <td>Tables and chairs</td>
                      <td>300</td>
                      <td>$40.00</td>
                      <td>$120.00</td>
                      <td class="element-actions">
                        <md-button class="md-simple md-just-icon">
                          <img :src="`${submitProposalIcon}Asset 311.svg`" />
                        </md-button>
                      </td>
                    </tr>
                    <tr>
                      <td>Dance floor</td>
                      <td>2</td>
                      <td>$100.00</td>
                      <td>$120.00</td>
                      <td class="element-actions">
                        <md-button class="md-simple md-just-icon">
                          <img :src="`${submitProposalIcon}Asset 311.svg`" />
                        </md-button>
                      </td>
                    </tr>
                    <tr>
                      <td>Plateware</td>
                      <td>2</td>
                      <td>$100.00</td>
                      <td class="last-value">$120.00</td>
                      <td class="element-actions">
                        <md-button class="md-simple md-just-icon">
                          <img :src="`${submitProposalIcon}Asset 311.svg`" />
                        </md-button>
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
                        <span class="taxes-percentage">10%</span>
                      </td>
                      <td>-$160.00</td>
                      <td class="element-actions">
                        <md-button class="md-simple md-just-icon">
                          <img :src="`${submitProposalIcon}Asset 311.svg`" />
                        </md-button>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3">
                        <span class="taxes-title">Taxes</span>
                        <span class="taxes-percentage">18%</span>
                      </td>
                      <td>$200.00</td>
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
                        <div class="font-size-14">Before discount</div>
                      </td>
                      <td class="element-value">
                        <div class="element-price">${{ 2800 | withComma }}</div>
                        <div class="discount-details">
                          (10% off)
                          <span>${{ 2900 | withComma }}</span>
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
                <template v-if="dummyIncluded.length">
                  <div class="proposal-includes__item" v-for="(item, index) in dummyIncluded" :key="index">
                    <div class="d-flex justify-content-between align-center">
                      <div class="item-title">
                        <img :src="`${submitProposalIcon}Group 4781.svg`" />
                        {{ item.title }}
                      </div>
                      <div class="item-actions d-flex justify-content-end align-center">
                        <input v-model="item.qty" placeholder="QTY" />
                        <md-button class="md-simple md-just-icon" @click="expandIncludedItem(item, index)">
                          <img :src="`${submitProposalIcon}Component 36.svg`" />
                        </md-button>
                      </div>
                    </div>

                    <div class="item-description" v-if="item.expanded">
                      {{ item.description }}
                    </div>
                  </div>
                </template>
              </div>

              <div class="extras-section" v-if="dummyExtras.length">
                <div class="extras-section__title">
                  <h3>
                    <img
                      src="https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/SVG/Asset%2010.svg"
                      width="12"
                    />
                    Extras
                  </h3>
                  <small>Wold you like to upgrade & add one of those?</small>
                </div>
                <div class="extras-section__list">
                  <div class="extras-section__item" v-for="(item, index) in dummyExtras" :key="index">
                    <div class="d-flex justify-content-between align-center">
                      <div class="item-title">{{ item.title }}</div>
                      <div class="item-qty text-center">
                        <input v-model="item.qty" placeholder="QTY" />
                      </div>
                      <div class="item-price text-center">
                        {{ item.price }}
                      </div>
                      <div class="item-added text-center">
                        <template v-if="item.added">
                          <div class="added-label">
                            <img
                              src="https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/png/Asset+31.png"
                              width="20"
                            />
                            added
                          </div>
                        </template>
                        <md-button v-else class="md-rose md-sm"> <md-icon>add_circle_outline</md-icon>add </md-button>
                      </div>
                      <div class="item-actions" :class="{ expanded: item.expand }">
                        <md-button
                          class="md-small md-simple md-just-icon expand-extra-item"
                          @click="expandExtra(item, index)"
                        >
                          <img :src="`${submitProposalIcon}Component 36.svg`" />
                        </md-button>
                      </div>
                    </div>

                    <div class="item-description" v-if="item.expanded">
                      {{ item.description }}
                    </div>
                  </div>
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

        <table class="pricing-section__table">
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
            <!--                        <tr class="element-block bundle-offer">-->
            <!--                            <td class="element-title">Bundle Offer <span class="discount-percentage">15%</span> <span class="bundle-title">Venue + Catering</span> </td>-->
            <!--                            <td class="element-value"><div class="original-price">$1,200.00</div><div class="new-price">$1,100.00</div></td>-->
            <!--                            <td class="view-element"></td>-->
            <!--                        </tr>-->
            <tr class="taxes">
              <td colspan="2">
                Taxes
                <span class="taxes-value">18%</span>
              </td>
              <td>${{ (extraTotal * 0.18) | withComma }}</td>
              <td></td>
            </tr>
            <tr class="total">
              <td colspan="2">Total</td>
              <td>${{ (extraTotal + extraTotal * 0.18) | withComma }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="proposal-section policy-section">
        <div class="proposal-section__title">
          <img :src="`${submitProposalIcon}Asset 287.svg`" width="20" /> Our Policy
        </div>

        <div class="policy-content">
          <div class="proposal-section__subtitle">
            <div class="subtitle">Are deposit is:</div>
            <div class="desc">50% of the total event</div>
          </div>

          <div class="side-label">
            <div class="label-value">Our cancellation approach</div>
          </div>

          <div class="proposal-section__subtitle">
            <div class="subtitle">We allow free cancellation until:</div>
            <div class="desc">30 days before the event</div>
          </div>

          <div class="policies-list">
            <div class="policies-list__item"><b>If</b> the client cancel the event after 3 weeks before the event</div>
            <div class="policies-list__item"><b>Then</b> the client will pay full deposit</div>
            <div class="policies-list__item">
              <b>If</b> the client cancel the event after two weeks before the event
            </div>
            <div class="policies-list__item"><b>Then</b> the client will pay full price</div>
          </div>

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
              <img src="https://bit.ly/3doZIxt" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="book-proposal-form">
      <div class="form-title">
        Would you like to book
        <a href>Relish caterers & venues</a>?
      </div>
      <div class="agree-checkbox">
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
        <md-button class="md-red maryoku-btn" @click="bookVendor">Book this vendor</md-button>
      </div>
    </div>
  </div>
</template>

<script>
//MAIN MODULES
import ChartComponent from "@/components/Cards/ChartComponent";

import { ChartCard } from "@/components";

// import auth from '@/auth';
import moment from "moment";
import VueElementLoading from "vue-element-loading";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import CalendarEventStatistics from "@/models/CalendarEventStatistics";
import EventComponent from "@/models/EventComponent";
import ProposalRequest from "@/models/ProposalRequest";
import Vendors from "@/models/Vendors";
import _ from "underscore";

import carousel from "vue-owl-carousel";

import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

import { Tabs, Modal } from "@/components";

import EventBudgetVendors from "./EventBudgetVendors";
import EditEventBlocksBudget from "./EditEventBlocksBudget";
import EventComponentVendor from "@/models/EventComponentVendor";
//COMPONENTS

import SideBar from "../../../../components/SidebarPlugin/NewSideBar";
import SidebarItem from "../../../../components/SidebarPlugin/NewSidebarItem.vue";
import ProgressSidebar from "./progressSidebar";

import HeaderActions from "@/components/HeaderActions";
import CommentEditorPanel from "./CommentEditorPanel";
import Proposal from "@/models/Proposal";
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
      dummyIncluded: [
        {
          title: "Set up",
          qty: null,
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
        },
        {
          title: "In-house bar services",
          qty: null,
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
        },
        {
          title: "In-house bar services",
          qty: null,
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
        },
        {
          title: "Glassware",
          qty: null,
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
        },
        {
          title: "Linens",
          qty: null,
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
        },
      ],
      dummyExtras: [
        {
          title: "Sound equipment",
          qty: null,
          price: 100,
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
          added: false,
        },
        {
          title: "Lorem ipsum dolor sit amet",
          qty: null,
          price: 100,
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
          added: false,
        },
        {
          title: "Lorem ipsum dolor sit amet",
          qty: null,
          price: 100,
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
          added: false,
        },
        {
          title: "Lorem ipsum dolor sit amet",
          qty: null,
          price: 100,
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
          added: true,
        },
        {
          title: "Lorem ipsum dolor sit amet",
          qty: null,
          price: 100,
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
          added: true,
        },
      ],
    };
  },
  created() {
    const proposalId = this.$route.params.proposalId;
    console.log(proposalId);
    Proposal.find(proposalId).then((proposal) => {
      this.vendorProposal = proposal;
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
    expandIncludedItem(item, index) {
      if (this.dummyIncluded[index].expanded) {
        this.dummyIncluded[index].expanded = false;
      } else {
        this.dummyIncluded[index].expanded = true;
      }

      this.$forceUpdate();
    },
    expandExtra(item, index) {
      if (this.dummyExtras[index].expanded) {
        this.dummyExtras[index].expanded = false;
      } else {
        this.dummyExtras[index].expanded = true;
      }

      this.$forceUpdate();
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
            font-weight: 800;
            color: #050505;
            border-radius: 3px 3px 0 0;
            box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
            background-color: #ffffff;
            margin-bottom: 1em;

            .proposal-images {
              position: relative;

              margin: 1em 0;

              .owl-carousel {
                .item {
                  height: 177px;
                  border-radius: 3px;
                  background-size: cover !important;
                }
              }

              .prev,
              .next {
                width: 28px;
                height: 28px;
                background-color: #ffffff;
                position: absolute;
                top: 40%;
                z-index: 99999999;
                border-radius: 50%;
                text-align: center;
              }

              .prev {
                left: 1em;
              }

              .next {
                right: 1em;
              }
            }

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
                &__title {
                  font-size: 20px;
                  font-weight: 800;
                  color: #050505;
                  margin-bottom: 1em;
                }

                &__item {
                  font-size: 14px;
                  color: #050505;
                  display: inline-block;
                  width: 43%;
                  border-bottom: 1px solid #cccccc;
                  padding-bottom: 0.5em;

                  &:nth-child(odd) {
                  }

                  &:nth-child(even) {
                    margin-right: 14%;
                  }

                  img {
                    width: 20px;
                    margin-right: 1em;
                  }

                  .item-actions {
                    input {
                      box-shadow: none;
                      border-radius: 0;
                      width: 30px;
                      padding: 0;
                      font-size: 14px;
                      margin-right: 1.4em;
                      text-align: center;
                    }

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

                &__list {
                }

                &__item {
                  font-size: 14px;
                  border-bottom: 1px solid #ccc;
                  padding: 0.2em;

                  .item {
                    &-title {
                      width: 40%;
                    }

                    $cellsWidth: 70px;
                    &-qty {
                      width: $cellsWidth;
                      input {
                        box-shadow: none;
                        border-radius: 0;
                        width: 30px;
                        padding: 0;
                        font-size: 14px;
                        margin-right: 1.4em;
                        text-align: center;
                      }
                    }
                    &-price {
                      font-weight: normal;
                      width: $cellsWidth;
                    }
                    &-added {
                      width: $cellsWidth;

                      .added-label {
                        font-weight: normal;
                        text-transform: capitalize;
                        img {
                          margin-right: 0.4em;
                        }
                      }

                      .md-rose {
                        .md-ripple {
                          background: $rose !important;
                          text-transform: capitalize;
                          font-size: 14px;
                          font-weight: bold;
                        }
                      }
                    }
                    &-actions {
                      width: 30px;

                      img {
                        width: 6px;
                      }

                      &.expanded {
                        img {
                          transform: rotate(90deg);
                        }
                      }
                    }

                    &-description {
                      font-weight: normal;
                      font-size: 12px;
                      width: 40%;
                      margin-bottom: 0.5em;
                    }
                  }
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
            font-size: 14px;
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
        font-weight: 800;
        color: #050505;
        margin-bottom: 1em;

        a {
          color: #f51355;
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


