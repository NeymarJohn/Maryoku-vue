<template>
  <div class="special-requirement-accessibility mt-30">
    <div>
      <div class="font-size-22 font-bold">
        <md-checkbox class="md-red md-checkbox-circle" v-model="data.selected" @change="handleCategory">{{ data.label }}</md-checkbox>
      </div>
      <div>{{ labels[data.type] }}</div>
    </div>
    <div class="mt-30 mb-20">
      <md-checkbox
              v-for="(item, index) in data.items"
              class="md-simple md-red"
              v-model="item.selected"
              :key="index"
              @change="handleItem(index)"
      >
                <div class="checkbox-label-wrapper">
                  <img :src="getIcon(item.item)"/>
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
    index: {
      type: Number,
      required: true,
    }
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
  methods:{
    getIcon(name){
      let icon = null;
      if ( name === 'All Indoor' ) {
        icon = 'Requirements/All indoor.svg';
      } else if ( name === 'Pregnant women' ) {
        icon = 'Requirements/pregnant-women-dark.svg';
      } else if ( name === 'All Outdoor' ) {
        icon = 'Requirements/All outdoor.svg';
      } else if ( name === 'Accessible Bathrooms' ) {
        icon = 'Requirements/Accessible bathroom.svg';
      } else if ( name === 'Accessibility for people with disabilities' ) {
        icon = 'Requirements/Accessible for people with disabilities.svg';
      } else if ( name === 'Hotel accommodations within walking distance' ) {
        icon = 'Requirements/disabled-person-dark.svg';
      } else if ( name === 'Shopping centers' ) {
        icon = 'Requirements/pregnant-women-dark.svg';
      }
      return `${this.$iconURL}${icon}`;
    },
    handleCategory(){
      this.data.items.map(item => {
        item.selected = false;
      })
    },
    handleItem(idx){
      this.data.items[idx].isSelected = !this.data.items[idx].isSelected;
      this.$emit('change', this.index);
    }
  },
  mounted (){}
};
</script>
<style lang="scss" scoped>
</style>
