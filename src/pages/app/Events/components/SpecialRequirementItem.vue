<template>
  <div class="special-requirement-accessibility mt-30">
    <div>
      <div class="font-size-22 font-bold">
        <md-checkbox class="md-red md-checkbox-circle" v-model="data.selected">{{ data.label }}</md-checkbox>
      </div>
      <div>{{ labels[data.type] }}</div>
    </div>
    <div class="mt-30 mb-20">
      <md-checkbox
              v-for="(item, index) in data.items"
              class="md-simple md-red"
              v-model="item.selected"
              :key="index"
              :value="item.isSelected">
                <div class="checkbox-label-wrapper">
                  <img :src="`${$iconURL}Requirements/${item.icon}.svg`" />
                  {{ item.item }}
                </div>
      </md-checkbox>
    </div>
  </div>
</template>
<script>

export default {
  name: "special-requirement-item",
  props:{
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selected: true,
      labels: {
        accessibility : "What kind of special attention do we need to know about?",
        around_the_venue: "Which elements are important for you to have around the venue?",
        around_the_space: "Which elements are important for you to have around the venue?",
        sitting_arrangement: "You may select up to 2 options and we will endeavor to incorporate them into your event. Please select up to 2 options",
        sustainability: "",
        dietary_constraints: "",
        other: "",
      }
    };
  },
  methods:{},
  mounted (){
    console.log('special.requirement.item', this.data);
  }
};
</script>
<style lang="scss" scoped>
</style>
