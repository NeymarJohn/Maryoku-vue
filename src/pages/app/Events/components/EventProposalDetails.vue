<template>
  <div class="proposal-page_details with-progress-bar">
    <side-bar :event="calendarEvent"></side-bar>

    <progress-sidebar></progress-sidebar>
    <!-- Event Header -->
    <div class="event-page-header with-bg d-flex justify-content-between">
      <div class="header-main-actions">
        <md-button class="md-rose">Book This Vendor</md-button>
        <md-button class="md-default md-simple">Request Changes</md-button>
        <md-button class="md-default md-simple">Negotiate Rate</md-button>
      </div>
      <div class="header-actions">
        <ul>
          <li>
            <a href>
              <img :src="`${menuIconsURL}Asset 9.svg`" />
            </a>
          </li>
          <li>
            <a href>
              <img :src="`${menuIconsURL}Asset 5.svg`" />
            </a>
          </li>
          <li>
            <a href>
              <img :src="`${menuIconsURL}Asset 8.svg`" />
            </a>
          </li>
        </ul>
      </div>
    </div>

    <template v-if="vendorProposal.vendor">
      <div class="back-button-section">
        <md-button class="md-default md-simple back-btn">Back</md-button>
      </div>
      <div class="proposal-page_header d-flex justify-content-start">
        <div class="vendor-title">
          <img :src="`${submitProposalIcon}Asset 307.svg`" />
          <a href="javascript:void(0)">{{
            vendorProposal.vendor.vendorDisplayName
          }}</a>
          Proposal
        </div>
      </div>
      <div class="proposal-content">
        <div class="proposal-info">
          <div
            class="proposal-header"
            style="
              background: url('https://bit.ly/392ygCu') center center no-repeat;
            "
          >
            <div class="event-info">
              <div class="section-header d-flex justify-content-start">
                <h3>Event Information & Details</h3>
                <div class="alert alert-danger">
                  This proposal is 2 days before your original date
                </div>
              </div>
              <ul class="event-details">
                <li class="event-details__item">
                  <label>Name</label>
                  <div class="info-text">{{ event.title }}</div>
                </li>
                <li class="event-details__item">
                  <label>Date</label>
                  <div class="info-text">
                    {{ event.eventStartMillis | formatDate }}
                  </div>
                </li>
                <li class="event-details__item">
                  <label>Guest Arrival Time</label>
                  <div class="info-text">
                    {{ event.eventStartMillis | formatTime }}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="proposal-body">
            <h1>Dear Rachel,</h1>
            <p>
              {{ vendorProposal.proposals[0].personalMessage }}
              <br />
              <br />Sincerely,
              <span class="proposal-title">{{
                vendorProposal.vendor.vendorDisplayName
              }}</span>
            </p>

            <md-button class="md-rose md-raised md-outline"
              >More About Us</md-button
            >

            <!--                    <div class="loading" v-if="vendorProposal.proposals[0].attachements.length && !fetchingAllAttachments">-->
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
            <!--                        <template v-if="vendorProposal.proposals[0].included.length">-->
            <!--                            <div class="proposal-includes__item" v-for="(item,index) in vendorProposal.proposals[0].included" :key="index">-->
            <!--                                <img :src="`${submitProposalIcon}Group 4781.svg`"> {{item.requirementTitle}}-->
            <!--                            </div>-->
            <!--                        </template>-->

            <!--                    </div>-->
          </div>

          <div class="proposal-section contact-section">
            <div class="proposal-section__title">Contact Us</div>

            <ul class="contact-list_items d-flex justify-content-start">
              <li
                class="contact-list_item"
                v-if="vendorProposal.vendor.vendorMainEmail"
              >
                <a href>
                  <img :src="`${submitProposalIcon}Asset 286.svg`" />
                  {{ vendorProposal.vendor.vendorMainEmail }}
                </a>
              </li>
              <li
                class="contact-list_item"
                v-if="vendorProposal.vendor.vendorAddressLine1"
              >
                <a href>
                  <img :src="`${submitProposalIcon}Asset 285.svg`" />
                  {{ vendorProposal.vendor.vendorAddressLine1 }}
                  {{ vendorProposal.vendor.vendorAddressLine2 }}
                </a>
              </li>
              <li
                class="contact-list_item"
                v-if="vendorProposal.vendor.vendorMainPhoneNumber"
              >
                <a href>
                  <img :src="`${submitProposalIcon}Asset 284.svg`" />
                  {{ vendorProposal.vendor.vendorMainPhoneNumber }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="proposal-section pricing-section">
          <div class="proposal-section__title">
            <img
              src="https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/SVG/Asset%2010.svg"
              width="12"
            />
            Pricing & Details
            <small>*We work only with our catering</small>
          </div>

          <div class="pricing-section__list">
            <div class="pricing-section__item element-block">
              <div class="d-flex justify-content-between align-center">
                <div
                  class="item-info d-flex justify-content-start align-center"
                >
                  <div class="select-item">
                    <input
                      class="styled-checkbox"
                      :id="`checkbox-1`"
                      type="checkbox"
                    />
                    <label :for="`checkbox-1`"></label>
                  </div>
                  <div class="element-title">
                    <img :src="`${submitProposalIcon}Asset 308.svg`" /> Venue
                    <span class="element-duration">For Whole Event</span>
                  </div>
                </div>
                <div
                  class="item-pricing d-flex justify-content-end align-center"
                >
                  <div class="element-value">
                    <div class="element-price">${{ 800 | withComma }}</div>
                    <div class="discount-details">
                      (10% off)
                      <span>${{ 1100 | withComma }}</span>
                    </div>
                  </div>
                  <div class="view-element">
                    <md-button
                      class="md-just-icon md-red md-outline"
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
                  v-if="
                    vendorProposal.proposals[0].attachements.length &&
                    !fetchingAllAttachments
                  "
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
                          <b>Total</b>
                          <small class="small-label">Before discount</small>
                        </td>
                        <td class="element-value">
                          <div class="element-price">
                            ${{ 2800 | withComma }}
                          </div>
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
                  <div class="proposal-includes__title">
                    What Do We Include In This Proposal?
                  </div>
                  <template v-if="dummyIncluded.length">
                    <div
                      class="proposal-includes__item"
                      v-for="(item, index) in dummyIncluded"
                      :key="index"
                    >
                      <div class="d-flex justify-content-between align-center">
                        <div class="item-title">
                          <img :src="`${submitProposalIcon}Group 4781.svg`" />
                          {{ item.title }}
                        </div>
                        <div
                          class="item-actions d-flex justify-content-end align-center"
                        >
                          <input v-model="item.qty" placeholder="QTY" />
                          <md-button
                            class="md-simple md-just-icon"
                            @click="expandIncludedItem(item, index)"
                          >
                            <img
                              :src="`${submitProposalIcon}Component 36.svg`"
                            />
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
                    <div
                      class="extras-section__item"
                      v-for="(item, index) in dummyExtras"
                      :key="index"
                    >
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
                          <md-button v-else class="md-rose md-sm">
                            <md-icon>add_circle_outline</md-icon>add
                          </md-button>
                        </div>
                        <div
                          class="item-actions"
                          :class="{ expanded: item.expand }"
                        >
                          <md-button
                            class="md-small md-simple md-just-icon expand-extra-item"
                            @click="expandExtra(item, index)"
                          >
                            <img
                              :src="`${submitProposalIcon}Component 36.svg`"
                            />
                          </md-button>
                        </div>
                      </div>

                      <div class="item-description" v-if="item.expanded">
                        {{ item.description }}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="proposal-section attachments-section"
                  v-if="attachedFiles.length"
                >
                  <div class="proposal-section__title">Attachments</div>

                  <ul class="attachments-list_items">
                    <li
                      class="attachments-list_item"
                      v-for="(item, index) in attachedFiles"
                      :key="index"
                    >
                      <a target="_blank" :href="`${item.fullPath}`">
                        <md-icon>attach_file</md-icon>
                        {{
                          item.tag
                            ? item.tag.replace(/_/g, " ")
                            : `Attachment${index + 1}`
                        }}
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
                <tr
                  class="element-block"
                  v-for="(item, index) in extraMissingRequirements"
                  :key="index"
                >
                  <td class="select-item">
                    <input
                      class="styled-checkbox"
                      :id="`checkbox-${index}`"
                      type="checkbox"
                      :value="item.id"
                    />
                    <label :for="`checkbox-${index}`"></label>
                  </td>
                  <td class="element-title">
                    {{ item.requirementTitle }}
                    <span class="element-duration">For Whole Event</span>
                  </td>
                  <td class="element-value">
                    <div class="element-price">
                      ${{ item.price | withComma }}
                    </div>
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
            <img :src="`${submitProposalIcon}Asset 287.svg`" width="20" /> Our
            Policy
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
              <div class="policies-list__item">
                <b>If</b> the client cancel the event after 3 weeks before the
                event
              </div>
              <div class="policies-list__item">
                <b>Then</b> the client will pay full deposit
              </div>
              <div class="policies-list__item">
                <b>If</b> the client cancel the event after two weeks before the
                event
              </div>
              <div class="policies-list__item">
                <b>Then</b> the client will pay full price
              </div>
            </div>

            <div class="additional-info">
              <div class="additional-info__title">Additional</div>
              <div class="additional-info__content">
                {{ vendorProposal.proposals[0].candellationPolicy }}
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
          <md-checkbox v-model="acceptNewTimes"
            >I agree to the new time of this proposal</md-checkbox
          >
          <div class="alert alert-danger">
            Please indicate that you accept the new time of this proposal
          </div>
        </div>

        <div class="form-actions text-right">
          <md-button class="md-rose md-simple">
            <md-icon>keyboard_arrow_left</md-icon>Back to other proposals
          </md-button>
          <md-button class="md-rose md-outline">Request Changes</md-button>
          <md-button class="md-rose">Book this vendor</md-button>
        </div>
      </div>

      <div class="proposal-footer">
        <div class="footer-title">End</div>
        <md-button class="md-rose md-simple back-to-top">
          <md-icon>expand_less</md-icon>Back to top
        </md-button>
      </div>
    </template>
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
  },

  data() {
    return {
      // auth: auth,
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
      menuIconsURL:
        "https://static-maryoku.s3.amazonaws.com/storage/icons/menu%20_%20checklist/SVG/",
      iconsURL:
        "https://static-maryoku.s3.amazonaws.com/storage/icons/Event%20Page/",
      submitProposalIcon:
        "https://static-maryoku.s3.amazonaws.com/storage/icons/Submit%20Proposal/",
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
  created() {},
  mounted() {
    let _self = this;
    this.isLoading = true;

    this.$auth.currentUser(
      this,
      true,
      function () {
        let _calendar = new Calendar({ id: this.$auth.user.defaultCalendarId });

        _calendar
          .calendarEvents()
          .find(this.$route.params.id)
          .then((event) => {
            this.event = event;

            this.getEvent();
          });
      }.bind(this),
    );
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
    getEvent() {
      let vm = this;
      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId });
      let event = new CalendarEvent({ id: this.event.id });
      let selected_block = new EventComponent({
        id: this.$route.params.vendorId,
      });

      new EventComponentVendor()
        .for(calendar, event, selected_block)
        .get()
        .then((resp) => {
          vm.vendorProposal = _.find(resp, function (vendor) {
            if (
              vendor.proposals[0] &&
              vendor.proposals[0].id === vm.$route.params.proposalId
            ) {
              return vendor;
            }
          });

          let extras = _.union(
            this.vendorProposal.proposals[0].extras,
            this.vendorProposal.proposals[0].missing,
          );

          _.each(extras, function (item) {
            vm.extraTotal += item.price;
          });

          vm.getImages();

          console.log("extras => ", extras);
        })
        .catch((error) => {
          this.isLoading = false;
          console.log("EventComponentVendor error =>", error);
        });
    },
    getImages() {
      let vm = this;
      this.images = [];
      this.attachedFiles = [];

      this.vendorProposal.proposals[0].attachements.forEach((item, index) => {
        const fullPath = `${this.serverUrl}/1/proposal-requests/${vm.$route.params.proposalId}/files/${item.id}`;

        this.$http
          .get(fullPath, { headers: this.$auth.getAuthHeader() })
          .then((response) => {
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

            if (
              index + 1 ==
              vm.vendorProposal.proposals[0].attachements.length
            ) {
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
  },
  computed: {
    ...mapState("EventPlannerVuex", [
      "eventData",
      "eventModalOpen",
      "modalTitle",
      "modalSubmitTitle",
      "editMode",
    ]),
    ...mapGetters({
      components: "event/getComponentsList",
    }),
    pieChart() {
      return {
        data: {
          labels: [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "], // should be empty to remove text from chart
          series: this.seriesData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
        },
        options: {
          padding: 0,
          height: 220,
          donut: true,
          donutWidth: 45,
          animation: true,
        },
      };
    },
    categoryItems() {
      return {
        data: this.seriesData,
      };
    },
    extraMissingRequirements() {
      return _.union(
        this.vendorProposal.proposals[0].extras,
        this.vendorProposal.proposals[0].missing,
      );
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

<style scoped>
.md-layout,
.md-layout-item {
  width: initial;
}

.tab-content {
  background-color: transparent !important;
}
</style>

