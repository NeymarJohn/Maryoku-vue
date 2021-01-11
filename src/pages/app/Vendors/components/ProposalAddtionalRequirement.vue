<template>
  <div class="white-card mt-40 additional-requirements">
    <div class="p-40">
      <div>
        <img :src="`${$iconURL}Submit+Proposal/Group+8840.svg`" />
        <span class="font-size-30 font-bold">Additional requests from the client</span>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus
      </div>
    </div>
    <hr />
    <div
      class="p-40"
      v-for="requirement in specialRequirements"
      :key="requirement.item"
      :class="{ 'd-none': getSelectedOption(requirement.options).length == 0 }"
    >
      <div>
        <img :src="`${$iconURL}Submit+Proposal/request arrangement.png`" />
        <span class="font-size-30 font-bold"
          >The client has requested these {{ requirement.item || requirement.subCategory }}, can you deliver?</span
        >
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
        </div>
        <div style="margin-left: 80px" v-if="requirement.groupSizes.findIndex((item) => item.selected) >= 0">
          <div class="font-size-22 font-bold mb-20">
            <img :src="`${$iconURL}Vendor Signup/Group 5479 (2).svg`" class="page-icon" />
            Group Work Planned
          </div>
          <div class="text-center">
            <div class="mb-10">Group size:</div>
            <div class="group-card">
              <img :src="`${$iconURL}common/users-gray.svg`" class="page-icon" />
              <div class="font-size-30" style="padding: 20px">
                {{ requirement.groupSizes.find((item) => item.selected).item }}
              </div>
              <div class="font-size-22">people</div>
            </div>
          </div>
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
</template>
<script>
export default {
  data() {
    return {
      agreeTerms: false,
    };
  },
  created() {
    console.log("specialRequirements", this.specialRequirements);
  },
  methods: {
    getSelectedOption(options) {
      return options.filter((it) => it.selected);
    },
  },
  computed: {
    specialRequirements() {
      return this.$store.state.vendorProposal.proposalRequest.requirements.filter(
        (item) => item.category == "special" && item.isSelected,
      );
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: solid 1px #707070;
    border-radius: 3px;
    width: 160px;
    height: 160px;
    margin: auto;
  }
}
</style>