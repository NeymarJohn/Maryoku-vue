<template>
  <collapse-panel class="white-card proposal-requirements-panel" :spacing="20" v-if="!isLoading">
    <template slot="header">
      <div class="d-flex align-center p-30">
        <img :src="`${$iconURL}Requirements/special-request-red.svg`" />
        <div class="font-size-22 font-bold-extra color-black ml-10">Requirements <br />from the planner</div>
      </div>
    </template>
    <template slot="content">
      <div class="requirements-content p-30 pt-0-i" v-if="step <= 1">
        <div>
          <template v-for="types in requirementsData.types">
            <span class="type-tag" v-for="type in types" :key="type">{{ type }}</span>
          </template>
        </div>
        <template v-if="requirementsData.mainRequirements">
          <div
            v-for="(requirementCategory, index) in Object.keys(requirementsData.mainRequirements)"
            :key="`requirement-category-${index}`"
          >
            <template v-if="requirementCategory.toLowerCase() === 'special'">
              <div
                class="category-section"
                v-for="subCategory in selectedOptions(requirementsData.mainRequirements[requirementCategory])"
                :key="subCategory.subCategory"
              >
                <div class="color-dark-gray text-transform-capitalize">{{ subCategory.subCategory }}</div>
                <div class="requirement-grid">
                  <div
                    class="requirement-item"
                    v-for="requirementItem in subCategory.options.filter((item) => item.selected)"
                    :key="requirementItem.name"
                  >
                    <div class="checkmark"></div>
                    <div class="d-inline-block">{{ requirementItem.name }}</div>
                  </div>
                </div>
              </div>
            </template>
            <div
              v-else-if="
                requirementsData.mainRequirements[requirementCategory].filter((item) => item.selected).length > 0
              "
              class="category-section"
            >
              <div class="color-dark-gray text-transform-capitalize">{{ requirementCategory }}</div>
              <div class="requirement-grid">
                <div
                  class="requirement-item"
                  v-for="requirementItem in requirementsData.mainRequirements[requirementCategory].filter(
                    (item) => item.selected,
                  )"
                  :key="requirementItem.item"
                >
                  <div class="checkmark"></div>
                  <!-- {{ requirementItem }} -->
                  <div class="d-inline-block">
                    {{ requirementItem.item || requirementItem.subCategory }}
                    <span v-if="requirementItem.defaultQty">(X{{ requirementItem.defaultQty }})</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div v-else></div> -->
          </div>
        </template>

        <div class="addtional-requests">
          <div class="font-bold">Additional Requests</div>
          <div>
            {{ additionalNote }}
          </div>
        </div>
      </div>
      <div v-else>
        <div class="requirements-content p-30 pt-0-i">
          <div class="font-size-20 font-bold mb-20">
            {{ getCategoryFromId(secondaryRequirement.category).fullTitle }}
          </div>
          <div
            v-for="(requirementCategory, index) in Object.keys(secondaryRequirement.mainRequirements)"
            :key="`requirement-category-${index}`"
          >
            <template v-if="requirementCategory === 'multi-selection'"> </template>
            <template v-else-if="requirementCategory.toLowerCase() === 'special'">
              <div
                class="category-section"
                v-for="subCategory in selectedOptions(secondaryRequirement.mainRequirements[requirementCategory])"
                :key="subCategory.subCategory"
              >
                <div class="color-dark-gray text-transform-capitalize">{{ subCategory.subCategory }}</div>
                <div class="requirement-grid">
                  <div
                    class="requirement-item"
                    v-for="requirementItem in subCategory.options.filter((item) => item.selected)"
                    :key="requirementItem.name"
                  >
                    <div class="checkmark"></div>
                    <div class="d-inline-block">{{ requirementItem.name }}</div>
                  </div>
                </div>
              </div>
            </template>
            <div
              v-else-if="
                secondaryRequirement.mainRequirements[requirementCategory].filter((item) => item.selected).length > 0
              "
              class="category-section"
            >
              <div class="color-dark-gray text-transform-capitalize">{{ requirementCategory }}</div>
              <div class="requirement-grid">
                <div
                  class="requirement-item"
                  v-for="requirementItem in secondaryRequirement.mainRequirements[requirementCategory].filter(
                    (item) => item.selected,
                  )"
                  :key="requirementItem.item"
                >
                  <div class="checkmark"></div>
                  <!-- {{ requirementItem }} -->
                  <div class="d-inline-block">
                    {{ requirementItem.item || requirementItem.subCategory }}
                    <span v-if="requirementItem.defaultQty">(X{{ requirementItem.defaultQty }})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="addtional-requests">
            <div class="font-bold">Addtional Requests</div>
            <div>
              {{ additionalNote }}
            </div>
          </div>
        </div>
      </div>
      <div class="p-30">
        <md-button class="md-outlined md-vendor md-simple maryoku-btn width-100" @click="showQuestionModal = true">
          <img src="/static/icons/chart-red.svg" class="page-icon mr-10" />
          Questions? Send a question to planner
        </md-button>
        <question-modal v-if="showQuestionModal" @cancel="showQuestionModal = false"></question-modal>
      </div>
    </template>
  </collapse-panel>
  <div v-else></div>
</template>
<script>
import CollapsePanel from "../../Campaign/CollapsePanel.vue";
import CalendarEvent from "@/models/CalendarEvent";
import ProposalRequestRequirement from "@/models/ProposalRequestRequirement";
import QuestionModal from "./Modals/QuestionModal.vue";
export default {
  components: { CollapsePanel, QuestionModal },
  data() {
    return {
      additionalServiceRequirements: [],
      showQuestionModal: false,
      isLoading: true,
    };
  },
  methods: {
    selectedOptions(specialRequirements) {
      if (!specialRequirements) return [];
      return specialRequirements.filter(
        (item) =>
          item.subCategory.toLowerCase() !== "sitting arrangement" && item.options.some((option) => option.selected),
      );
    },
    getCategoryFromId(category) {
      return this.$store.state.common.serviceCategories.find((item) => item.key === category);
    },
  },
  created() {
    new ProposalRequestRequirement()
      .for(new CalendarEvent({ id: this.proposalRequest.eventData.id }))
      .get()
      .then((res) => {
        console.log(res);
        this.isLoading = false;
        this.additionalServiceRequirements = res;
      });
  },
  computed: {
    vendor() {
      return this.$store.state.vendorProposal.vendor;
    },
    requirementsData() {
      // console.log(this.allRequirements[this.vendor.eventCategory.key]);
      return this.allRequirements[this.vendor.eventCategory.key] || {};
      // return this.allRequirements;
    },
    secondaryRequirement() {
      return this.allRequirements[this.$store.state.vendorProposal.currentSecondaryService] || {};
    },
    allRequirements() {
      if (this.additionalServiceRequirements.length > 0) {
        const requirementsMap = this.additionalServiceRequirements.reduce((mapData, requirement, index) => {
          mapData[requirement.category] = requirement;
          return mapData;
        }, {});
        console.log("requiremetnsMap", requirementsMap);
        return requirementsMap;
      }
      return {};
    },
    proposalRequest() {
      return this.$store.state.vendorProposal.proposalRequest;
    },
    additionalNote() {
      try {
        return this.proposalRequest.plannerRequirement.additionalDescription;
      } catch (e) {
        return "";
      }
    },
    step() {
      try {
        return this.$store.state.vendorProposal.wizardStep;
      } catch (e) {
        return 0;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.proposal-requirements-panel {
  .addtional-requests {
    padding: 25px;
    background-color: #eaeaea;
    margin-bottom: 20px;
  }
  .type-tag {
    display: inline-block;
    border: solid 1px #641856;
    color: #641856;
    border-radius: 30px;
    padding: 5px 20px;
    margin: 0px 10px 10px 0;
  }
  .category-section {
    padding: 30px 0;
    border-top: solid 1px #a0a0a0;
    .requirement-grid {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      .requirement-item {
        margin-top: 20px;
        text-transform: capitalize;
        padding-right: 15px;
        min-width: 30%;
        display: inline-block;
      }
    }
    .checkmark {
      display: inline-block;
      margin-right: 5px;
      margin-top: 0.4em;
      &:after {
        /*Add another block-level blank space*/
        content: "";
        display: block;

        /*Make it a small rectangle so the border will create an L-shape*/
        width: 6px;
        height: 10px;

        /*Add a white border on the bottom and left, creating that 'L' */
        border: solid #641856;
        border-width: 0 3px 3px 0;
        border-radius: 1px;

        /*Rotate the L 45 degrees to turn it into a checkmark*/
        transform: rotate(45deg);
      }
    }
  }
}
</style>
