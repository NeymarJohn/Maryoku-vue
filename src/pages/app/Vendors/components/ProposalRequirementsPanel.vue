<template>
  <collapse-panel class="white-card proposal-requirements-panel">
    <template slot="header">
      <div class="d-flex align-center p-30">
        <img :src="`${$iconURL}Requirements/special-request-red.svg`" />
        <div class="font-size-22 font-bold-extra color-black ml-10">Requirements <br />from the planner</div>
      </div>
    </template>
    <template slot="content">
      <div class="savedate-analytics-content p-30 pt-0-i">
        <div
          v-for="(requirementCategory, index) in Object.keys(requirementsData)"
          :key="`requirement-category-${index}`"
        >
          <template v-if="requirementCategory === 'multi-selection'"> </template>
          <div v-else class="category-section">
            <div class="color-dark-gray text-transform-capitalize">{{ requirementCategory }}</div>
            <div class="requirement-grid">
              <div
                class="d-flex requirement-item"
                v-for="requirementItem in requirementsData[requirementCategory]"
                :key="requirementItem.item"
              >
                <div class="checkmark"></div>
                <div class="d-inline-block">{{ requirementItem.item || requirementItem.subCategory }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="addtional-requests">
          <div class="font-bold">Addtional Requests</div>
          <div>
            {{ proposalRequest.requirement.note }}
          </div>
        </div>
        <md-button class="md-outlined md-red md-simple maryoku-btn width-100">
          <img src="/static/icons/chart-red.svg" class="page-icon mr-10" />
          Questions? Send a question to planner
        </md-button>
      </div>
    </template>
  </collapse-panel>
</template>
<script>
import CollapsePanel from "../../Campaign/CollapsePanel.vue";
export default {
  components: { CollapsePanel },
  computed: {
    requirementsData() {
      try {
        return JSON.parse(this.$store.state.vendorProposal.proposalRequest.requirement.settingsJsonData);
      } catch (e) {
        return [];
      }
    },
    proposalRequest() {
      return this.$store.state.vendorProposal.proposalRequest;
    },
    additionalNote() {
      try {
        return this.$store.state.vendorProposal.proposalRequest.requirement.note;
      } catch (e) {
        return "";
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
  .category-section {
    padding: 30px 0;
    border-top: solid 1px #a0a0a0;
    .requirement-grid {
      display: grid;
      grid-template-columns: repeat(3, 33.33%);
      .requirement-item {
        margin-top: 20px;
        text-transform: capitalize;
        padding-right: 15px;
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
        border: solid #f51355;
        border-width: 0 3px 3px 0;
        border-radius: 1px;

        /*Rotate the L 45 degrees to turn it into a checkmark*/
        transform: rotate(45deg);
      }
    }
  }
}
</style>