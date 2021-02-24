<template>
  <div class="white-card mt-20 additional-requirements" v-if="specialRequirements.length > 0">
    <div class="p-40">
      <div>
        <img :src="`${$iconURL}Submit+Proposal/Group+8840.svg`" />
        <span class="font-size-30 font-bold">Additional requests from the client</span>
      </div>
      <div>
        {{ this.proposalRequest.requirement.note }}
      </div>
    </div>
    <!-- <hr /> -->
    <div
      class="pb-40 pr-40 pl-40"
      v-for="requirement in specialRequirements"
      :key="requirement.item"
      :class="{ 'd-none': getSelectedOption(requirement.options).length == 0 }"
    >
      <div
        class="d-flex align-center"
        v-if="requirement.groupSizes && requirement.groupSizes.findIndex((item) => item.selected) >= 0"
      >
        <div class="font-size-22 font-bold">
          <img :src="`${$iconURL}Vendor Signup/Group 5479 (2).svg`" class="page-icon" />
          Group Work Planned
        </div>
        <div class="group-card">
          <span class="">Group size:</span>
          <img :src="`${$iconURL}common/users-gray.svg`" class="page-icon ml-10" />
          <div class="font-size-30 ml-10" style="padding: 5px">
            {{ requirement.groupSizes.find((item) => item.selected).item }}
          </div>
          <div class="font-size-22 ml-10">people</div>
        </div>
      </div>
      <hr style="background-color: #ececec" />
      <div class="mt-30">
        <img :src="`${$iconURL}Submit+Proposal/request arrangement.png`" />
        <span class="font-size-30 font-bold">
          {{ requirement.item || requirement.subCategory }}
        </span>
      </div>
      <div class="d-flex align-center mt-40" v-if="requirement.item == 'Sitting arrangement'" style="flex-flow: wrap">
        <div class="d-flex mb-30">
          <template v-for="(sit, index) in requirement.options">
            <div
              v-if="sit.selected"
              :key="`sitarrangement-${index}`"
              class="d-flex flex-column justify-content-between seat-type"
            >
              <div>'{{ sit.item }}'</div>
              <div><img :src="`${$iconURL}Requirements/${sit.icon}`" /></div>
            </div>
          </template>
          <template v-for="suggestedSeating in suggestedNewSeatings">
            <div
              :key="`sitarrangement-${index}`"
              class="d-flex flex-column justify-content-between seat-type suggested-seat"
            >
              <div>{{ suggestedSeating }}</div>
            </div>
          </template>
        </div>
        <md-button
          class="md-simple md-outlined md-red maryoku-btn"
          @click="editingNewSeating = true"
          v-if="!editingNewSeating"
        >
          Suggest new seating arrangement
        </md-button>
        <div v-else>
          <textarea v-model="newSeatingSuggest"></textarea>
          <md-button class="maryoku-btn md-red" @click="saveNewSeating">Save</md-button>
          <md-button class="md-simple maryoku-btn md-black" @click="editingNewSeating = false">Cancel</md-button>
        </div>
      </div>
      <div v-else class="align-center mt-40" :class="{ 'd-none': getSelectedOption(requirement.options).length == 0 }">
        <div v-for="option in getSelectedOption(requirement.options)" :key="option.name" class="ml-20">
          {{ option.name }}
        </div>
      </div>
    </div>
    <div class="p-40" style="background-color: #ffd9e4">
      <md-checkbox v-model="agreeTerms">I read this section & I agree</md-checkbox>
    </div>
  </div>
  <div v-else></div>
</template>
<script>
export default {
  data() {
    return {
      agreeTerms: false,
      newSeatingSuggest: "",
      editingNewSeating: false,
    };
  },
  created() {},
  methods: {
    getSelectedOption(options) {
      return options.filter((it) => it.selected);
    },
    saveNewSeating() {
      if (this.newSeatingSuggest.trim()) {
        let suggestedNewSeatings = this.$store.state.vendorProposal.suggestedNewSeatings;
        if (!suggestedNewSeatings) suggestedNewSeatings = [];
        suggestedNewSeatings.push(this.newSeatingSuggest);
        this.$store.commit("vendorProposal/setValue", { key: "suggestedNewSeatings", value: suggestedNewSeatings });
        this.editingNewSeating = false;
        this.newSeatingSuggest = "";
      }
    },
  },
  computed: {
    proposalRequest() {
      return this.$store.state.vendorProposal.proposalRequest;
    },
    specialRequirements() {
      return this.$store.state.vendorProposal.proposalRequest.requirements.filter(
        (item) => item.category == "special" && item.isSelected,
      );
    },
    suggestedNewSeatings() {
      return this.$store.state.vendorProposal.suggestedNewSeatings;
    },
  },
};
</script>
<style lang="scss" scoped>
.additional-requirements {
  .seat-type {
    margin-right: 30px;
    position: relative;
    padding: 10px;
    &.suggested-seat {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &::after {
      content: "Or";
      position: absolute;
      left: 100%;
      top: 50%;
    }
    &:last-child::after {
      content: "";
      display: none !important;
    }
  }
  .group-card {
    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: center;
    // border: solid 1px #707070;
    margin-left: 20px;
    padding-left: 20px;
    border-left: solid 1px #ececec;
  }
}
</style>