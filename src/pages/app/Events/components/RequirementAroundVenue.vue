<template>
  <div class="special-request-section">
    <div class="font-size-22 font-bold">
      <md-checkbox class="md-checkbox-circle md-red" v-model="selected">Around The Venue</md-checkbox>
    </div>
    <span
      class="special-request-section-description"
    >Which elements are important for you to have around the venue?</span>
    <div class="special-request-section-options mt-30">
      <md-checkbox class="md-simple md-red" v-model="value" value="Parking">
        <div class="checkbox-label-wrapper">
          <img :src="`${$iconURL}Requirements/park-dark.svg`" />
          Parking
        </div>
      </md-checkbox>
      <md-checkbox class="md-simple md-red" v-model="value" value="Restaurant">
        <div class="checkbox-label-wrapper">
          <img :src="`${$iconURL}Requirements/restaurant-dark.svg`" />
          Restaurant
        </div>
      </md-checkbox>
      <md-checkbox class="md-simple md-red" v-model="value" value="Shopping center">
        <div class="checkbox-label-wrapper">
          <img :src="`${$iconURL}Requirements/shopping-center-dark.svg`" />
          Shopping center
        </div>
      </md-checkbox>
      <md-checkbox class="md-simple md-red" v-model="value" value="Hotel">
        <div class="checkbox-label-wrapper">
          <img :src="`${$iconURL}Requirements/hotel-dark.svg`" />
          Hotel
        </div>
      </md-checkbox>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  data() {
    return {
      value: "",
      selected: true,
    };
  },
};
</script>