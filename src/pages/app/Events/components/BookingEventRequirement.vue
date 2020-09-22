<template>
  <div v-if="selectedBlock" class="booking-event-requirement">
    <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
    <div class="booking-header md-layout-item md-size-100">
      <div class="d-flex justify-content-between">
        <div>
          <h3>
            <img
              :src="`${$iconURL}Budget+Elements/${selectedBlock.componentId}.svg`"
              style="width:30px; margin-right:0.5em"
              v-if="selectedBlock.componentId"
            />
            Let us know what you are looking for in a {{selectedBlock.title}}
          </h3>Our job is to bring you the most accurate offers for your event.
          <br />This is what we know about your event so far, let us know if there is anything we missed.
        </div>
        <header-actions @toggleCommentMode="toggleCommentMode" hideDownload></header-actions>
      </div>
    </div>

    <!-- Event Booking Items -->
    <div class="md-layout events-booking-items">
      <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />
      <div class="md-layout-item md-size-100">
        <div v-for="(category, index) in Object.keys(requirementProperties)" :key="index">
          <template v-if="category=='multi-selection'">
            <vendor-requirement-multiselect-panel
              v-for="(data, id) in requirementProperties[category]"
              :key="id"
              :data="data"
              :currentComponent="selectedBlock"
            ></vendor-requirement-multiselect-panel>
          </template>
          <!-- <div class="requirement-section" v-else-if="category=='special'">
            <div class="d-flex align-start">
              <div class="d-flex align-center" style="min-width: 400px;">
                <img :src="`${$iconURL}Requirements/special-request-red.svg`" class="mr-20" />
                <div class="title">
                  <div class="font-size-22 font-bold">Special Requests</div>Tell us what you need, and we'll find vendors that can deliver!
                </div>
              </div>

              <div>
                <div
                  class="additional-request-tag"
                  v-for="(property, index) in requirementProperties[category].filter(item=>!item.isSelected)"
                  :key="index"
                  @click="addRequirement(category, property)"
                >
                  {{property.item}}
                  <md-icon class="icon color-red">add_circle</md-icon>
                </div>
              </div>
            </div>
            <div
              class="md-layout mt-50"
              v-for="(property, index) in requirementProperties[category].filter(item=>item.isSelected)"
              :key="index"
            >
              <div class="md-layout-item md-size-40 mx-auto pl-0">
                <label>Name of item</label>
                <maryoku-input class="mt-20" v-model="property.item"></maryoku-input>
              </div>
              <div class="md-layout-item md-size-20 mx-auto">
                <label>Is this</label>
                <div>
                  <md-checkbox
                    class="md-simple md-checkbox-circle md-red"
                    v-model="property.mustHave"
                    :value="true"
                  >
                    <span class="font-size-16">Mandatory</span>
                  </md-checkbox>
                  <md-checkbox
                    class="md-simple md-checkbox-circle md-red"
                    v-model="property.mustHave"
                    :value="false"
                  >
                    <span class="font-size-16">Nice To Have</span>
                  </md-checkbox>
                </div>
              </div>
              <div class="md-layout-item md-size-40 mx-auto pr-0">
                <label>Notes</label>
                <maryoku-textarea class="mt-20" v-model="editingSpecialRequest.notes" size="narrow"></maryoku-textarea>
              </div>
              <div class="md-layout-item md-size-100 mx-auto pr-0 text-right mt-30 mb-30">
                <md-button
                  class="md-simple md-red maryoku-btn"
                  @click="removeRequirement(category, property)"
                >Clear</md-button>
                <md-button class="md-red maryoku-btn" @click="addNewRequirement">Add</md-button>
              </div>
            </div>
            <div
              class="special-request-section d-flex"
              v-for="item in specialRequests"
              :key="item.name"
            >
              <div class="flex-1 font-size-16 font-bold">{{item.name}}</div>
              <div class="flex-1">
                <span v-if="item.isMandatory">
                  <img :src="`${$iconURL}Requirements/check-red.svg`" class="mr-10" />Mandatory
                </span>
              </div>
              <div class="flex-1">{{item.notes}}</div>
              <div class="flex-1 text-right">
                <md-button class="md-icon-button md-simple">
                  <img :src="`${$iconURL}Requirements/edit-dark.svg`" />
                </md-button>
                <md-button class="md-icon-button md-simple">
                  <img :src="`${$iconURL}Requirements/delete-dark.svg`" />
                </md-button>
              </div>
            </div>
            <div class="special-request-section">
              <div class="font-bold">Anything Else?</div>

              <div>Tell us what else you would love to receive in the proposals we'll send you</div>
              <div class="special-request-section-options">
                <textarea placeholder="Type name of element here..."></textarea>
              </div>
            </div>
          </div>-->
          <special-requirement-section v-else-if="category=='special'"></special-requirement-section>
          <div class="requirement-section" v-else>
            <table class="requirement-section-table">
              <thead>
                <tr>
                  <th>
                    <span class="section-title">
                      <img
                        :src="`${$iconURL}Requirements/${category}.svg`"
                        class="mr-20"
                        style="width:60px"
                      />
                      {{category}}
                    </span>
                  </th>
                  <th>How Many?</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="requirement-item"
                  v-for="(property, index) in requirementProperties[category].filter(item=>item.isSelected)"
                  :key="index"
                >
                  <td>
                    <div style="padding: 10px 0px">{{property.item}}</div>
                    <template v-if="property.type==='single-selection'">
                      <multiselect
                        v-model="property.selectedOption"
                        :options="property.options"
                        :close-on-select="true"
                        :clear-on-select="true"
                        tag-placeholder="Add this as new tag"
                        placeholder="Type to search category"
                        class="multiple-selection small-selector"
                        @select="checkAffectedItems(property)"
                      ></multiselect>
                    </template>
                  </td>
                  <td>
                    <div v-if="property.type==='single-selection'" style="padding: 10px 0px">&nbsp;</div>
                    <template v-if="property.qtyEnabled">
                      <input class="quantity-input" type="number" v-model="property.defaultQty" />
                      <span v-if="property.hint">
                        <img :src="`${$iconURL}Event%20Page/light.svg`" width="20" />
                        <md-tooltip md-direction="bottom">{{property.hint}}</md-tooltip>
                      </span>
                    </template>
                  </td>
                  <td>
                    <div v-if="property.type==='single-selection'" style="padding: 10px 0px">&nbsp;</div>
                    <div>
                      <md-button
                        class="md-icon-button md-simple requirement-action"
                        v-if="property.qtyEnabled"
                      >
                        <img :src="`${$iconURL}Requirements/edit-dark.svg`" width="20" />
                      </md-button>
                      <md-button
                        class="md-icon-button md-simple requirement-action"
                        @click="removeRequirement(category, property)"
                      >
                        <img :src="`${$iconURL}Requirements/delete-dark.svg`" width="20" />
                      </md-button>
                    </div>
                  </td>
                  <td>
                    <div v-if="property.type==='single-selection'" style="padding: 10px 0px">&nbsp;</div>
                    <div class="condition">
                      <md-checkbox
                        class="md-simple md-checkbox-circle md-red"
                        v-model="property.mustHave"
                        :value="true"
                      >Must Have</md-checkbox>
                      <md-checkbox
                        class="md-simple md-checkbox-circle md-red"
                        v-model="property.mustHave"
                        :value="false"
                      >Nice To Have</md-checkbox>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="additional-request">
              <div class="additional-request-description">
                <h4>Additional Requests</h4>
                <div>Would you like to add one of those items?</div>
              </div>
              <div>
                <div
                  class="additional-request-tag"
                  v-for="(property, index) in requirementProperties[category].filter(item=>!item.isSelected)"
                  :key="index"
                  @click="addRequirement(category, property)"
                >
                  {{property.item}}
                  <md-icon class="icon color-red">add_circle</md-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ./Event Booking Items -->

    <div class="booking-section__actions">
      <div>
        <md-button class="md-bold add-category-btn md-black md-simple">
          <md-icon>arrow_back</md-icon>Back
        </md-button>
        <md-button class="md-simple md-just-icon md-black">
          <md-icon style="font-size: 40px">expand_less</md-icon>
        </md-button>
      </div>
      <div>
        <md-button class="md-bold add-category-btn md-black md-simple">Revert To Original</md-button>
        <md-button
          class="md-red md-bold add-category-btn"
          @click="findVendors"
        >Find my perfect vendor</md-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import moment from "moment";
import InputMask from "vue-input-mask";
import VueElementLoading from "vue-element-loading";
import _ from "underscore";
import Multiselect from "vue-multiselect";
import MaryokuInput from "@/components/Inputs/MaryokuInput.vue";
import MaryokuTextarea from "@/components/Inputs/MaryokuTextarea.vue";

import { postReq, getReq } from "@/utils/token";
import { Modal } from "@/components";
import EventChangeProposalModal from "@/components/Modals/EventChangeProposalModal";
import HeaderActions from "@/components/HeaderActions";
import CommentEditorPanel from "./CommentEditorPanel";

import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import EventComponent from "@/models/EventComponent";
import VendorRequirementMultiselectPanel from "./VendorRequirementMultiselectPanel";
import SpecialRequirementSection from "./SpecialRequirementSection";

export default {
  name: "booking-event-requirement",
  components: {
    VueElementLoading,
    InputMask,
    Modal,
    EventChangeProposalModal,
    HeaderActions,
    CommentEditorPanel,
    Multiselect,
    MaryokuInput,
    MaryokuTextarea,
    VendorRequirementMultiselectPanel,
    SpecialRequirementSection,
  },
  props: {
    component: {
      type: Object,
      default: {},
    },
  },
  data: () => ({
    // auth: auth,
    calendar: null,
    isLoading: true,
    event: {},
    blockVendors: null,
    selectedBlock: {},
    proposals: [],
    showCommentEditorPanel: false,
    blockId: "",
    value: "",
    requirementProperties: {},
    editingSpecialRequest: {
      name: "",
      isMandatory: false,
      notes: "",
    },
    specialRequests: [],
  }),
  methods: {
    ...mapMutations("event", ["setEventData"]),
    ...mapActions("comment", ["getCommentComponents"]),
    ...mapActions("vendor", ["fetchAllProperties"]),
    addRequirement(category, property) {
      const index = this.requirementProperties[category].findIndex(
        (it) => it.item == property.item,
      );
      this.requirementProperties[category][index].isSelected = true;
      this.requirementProperties = { ...this.requirementProperties };
      // this.$forceUpdate();
    },
    removeRequirement(category, property) {
      const index = this.requirementProperties[category].findIndex(
        (it) => it.item == property.item,
      );
      this.requirementProperties[category][index].isSelected = false;
      this.requirementProperties = { ...this.requirementProperties };
      // this.$forceUpdate();
    },
    setProperties() {
      this.selectedBlock = this.component;
      const event = this.event;
      if (!this.selectedBlock.componentId) return;
      this.$http
        .get(
          `${process.env.SERVER_URL}/1/vendor/property/${this.selectedBlock.componentId}/${this.event.id}`,
        )
        .then((res) => {
          this.isLoading = false;
          const requirements = res.data;
          for (let category in requirements) {
            for (let itemIndex in requirements[category]) {
              if (requirements[category][itemIndex].defaultQtyScript)
                requirements[category][itemIndex].defaultQty = eval(
                  requirements[category][itemIndex].defaultQtyScript,
                );
              // requirements[category][itemIndex].isSelected = eval(requirements[category][itemIndex].isSelected)
            }
          }

          this.requirementProperties = requirements;
        })
        .catch((e) => {
          this.isLoading = false;
        });
    },
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = mode;
    },
    fetchData() {
      this.blockId = this.component.componentId; //this.$route.params.blockId
      this.event = this.$store.state.event.eventData;
      this.getCommentComponents(this.blockId);
      this.setProperties();
    },
    findVendors() {
      postReq("/1/vendors/setting-requirements", {
        vendorCategory: "foodandbeverage",
        expiredBusinessTime: moment(new Date()).add(5, "days").valueOf(),
        settingsJsonData: JSON.stringify(this.requirementProperties),
        eventComponentInstance: new EventComponent({ id: this.blockId }),
      }).then((res) => {
        this.$emit("setRequirements", res);
      });
    },
    addNewRequirement() {
      this.specialRequests = [
        ...this.addNewRequirement,
        this.editingSpecialRequest,
      ];
    },
    checkAffectedItems(property) {
      // waitign for updating model
      setTimeout(() => {
        if (property.affectedKeys) {
          for (var i in property.affectedKeys) {
            const cateogry = property.affectedKeys[i].category;
            const key = property.affectedKeys[i].key;
            const index = this.requirementProperties[cateogry].findIndex(
              (item) => item.key === key,
            );
            if (index >= 0) {
              const requirements = this.requirementProperties;
              const event = this.event;
              const defaultValue = eval(
                this.requirementProperties[cateogry][index].defaultQtyScript,
              );
              this.requirementProperties[cateogry][
                index
              ].defaultQty = defaultValue;
            }
          }
        }
      }, 500);
    },
  },
  created() {
    this.calendar = new Calendar({
      id: this.$store.state.auth.user.profile.defaultCalendarId,
    });
  },
  mounted() {
    this.isLoading = true;
    if (this.eventData.id) {
      this.fetchData();
    }
  },
  watch: {
    eventData(newVal, oldVal) {
      if (newVal.id) {
        this.fetchData();
      }
    },
    component(newVal, oldVal) {
      if (newVal.componentId) {
        this.fetchData();
      }
    },
    // '$route': 'fetchData'
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
  computed: {
    ...mapState("event", ["eventData"]),
  },
};
</script>
<style lang="scss">
.booking-event-requirement {
  width: 100%;
  .section-title {
    font-size: 22px;
    font-family: "Manrope-ExtraBold";
  }
  .requirement-item {
    .requirement-action {
      opacity: 0;
    }
    &:hover {
      .requirement-action {
        opacity: 1;
      }
      .condition {
        opacity: 0.4;
      }
    }
  }
  .requirement-section {
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    padding: 60px;
    margin: 20px 0px;
    &-table {
      border-spacing: 0px;
      th {
        text-align: left;
      }
      width: 100%;
      td,
      th {
        padding: 24px 0;
      }
      tbody {
        td {
          border-top: solid 2px #dbdbdb !important;
          // border: 1px solid black;
          border-collapse: collapse;
        }
      }
      .quantity-input {
        height: 47px;
        box-shadow: none;
        border: solid 0.5px #818080;
        font-family: "Manrope-regular";
        font-size: 16px;
      }
    }
  }
  .booking-section__actions {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 1.9em;
    background: white;
  }
  .additional-request {
    border-top: solid 2px #dbdbdb !important;
    display: flex;
    align-items: flex-start;
    padding-top: 30px;
    &-description {
      min-width: 350px;
    }
    h4 {
      margin-top: 5px;
      margin-bottom: 10px;
      font-family: "Manrope-Bold";
    }
  }
  .additional-request-tag {
    margin-left: 20px;
    margin-bottom: 10px;
    border: solid 1px #f51355;
    height: 50px;
    border-radius: 25px;
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    font-family: "Manrope-Bold";
    color: #f51355 !important;
    cursor: pointer;
    &.selected {
      border: solid 1px #a0a0a0;
      color: #a0a0a0 !important;
      .icon {
        color: #a0a0a0 !important;
        transform: rotate(45deg);
      }
    }
    .icon {
      margin-left: 10px;
      color: #f51355 !important;
      font-size: 30px !important;
    }
  }
  .special-request-header {
    display: flex;
    align-items: center;
    .title {
      margin-left: 20px;
      margin-right: 40px;
    }
  }
  .special-request-section {
    padding: 30px 0;
    border-top: solid 1px #b7b7b7;
  }
  .checkbox-label-wrapper {
    img {
      margin-top: -5px;
    }
    margin-left: 10px;
    margin-right: 50px;
  }
  textarea {
    width: 100%;
    resize: none;
    padding: 20px;
    border: solid 1px #a0a0a0;
    border-radius: 3px;
  }
  .multiple-selection {
    width: 300px;
    display: inline-block;
    height: 50px;
    .multiselect__select {
      top: 15px;
    }
    .multiselect__tags {
      height: 50px;
      .multiselect__single {
        line-height: 30px;
      }
    }
    .multiselect__input {
      height: 30px;
      text-transform: capitalize;
    }
    .multiselect__placeholder {
      line-height: 20px;
    }
  }
}
</style>
