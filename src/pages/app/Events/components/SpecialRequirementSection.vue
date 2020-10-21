<template>
  <div class="requirement-section">
    <div class="d-flex align-start mb-30">
      <div class="d-flex align-center" style="min-width: 300px;">
        <img :src="`${$iconURL}Requirements/special-request-red.svg`" class="mr-20" />
        <div class="title">
          <div class="font-size-22 font-bold">Special Requests</div>
          <div class="mt-10">
            Would you like to add
            <br />one of those items?
          </div>
        </div>
      </div>

      <div>
        <template v-for="(property, index) in specialRequirements">
          <div
            class="additional-request-tag"
            :class="{selected:property.selected}"
            @click="setRequirement(index)"
            :key="index"
          >
            {{property.name}}
            <md-icon class="icon color-red">add_circle</md-icon>
          </div>
        </template>
      </div>
    </div>
    <requirement-accessibility v-if="specialRequirements[0].selected"></requirement-accessibility>
    <requirement-around-venue v-if="specialRequirements[1].selected"></requirement-around-venue>
    <requirement-sitting-arrangement v-if="specialRequirements[2].selected"></requirement-sitting-arrangement>
    <div class="special-request-section">
      <div class="font-bold mt-10">Anything Else?</div>

      <div class="mt-10">Get me a pink unicorn please.</div>
      <div class="special-request-section-options mt-10">
        <textarea placeholder="Type name of element here..."></textarea>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import RequirementAccessibility from "./RequirementAccessibility";
import RequirementAroundVenue from "./RequirementAroundVenue";
import RequirementSittingArrangement from "./RequirementSittingArrangement";
export default {
  components: {
    RequirementAccessibility,
    RequirementAroundVenue,
    RequirementSittingArrangement,
  },
  data() {
    return {
      specialRequirements: [
        { name: "Accessibility", selected: false },
        { name: "Around The Venue", selected: false },
        { name: "Sitting Arrangement", selected: false },
      ],
    };
  },
  methods: {
    setRequirement(index) {
      this.specialRequirements[index].selected = !this.specialRequirements[
        index
      ].selected;
      console.log(this.specialRequirements);
    },
  },
  computed: {
    selected() {
      const selectedStatus = {};
      this.specialRequirements.forEach((item) => {
        selectedStatus[item.name] = item.selectedAccessibility;
      }, {});
      console.log("asdf");
      return selectedStatus;
    },
  },
};
</script>