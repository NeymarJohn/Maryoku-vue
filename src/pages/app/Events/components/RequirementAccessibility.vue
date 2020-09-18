<template>
  <div class="special-requirement-accessibility mt-30">
    <div>
      <div class="font-size-22 font-bold">
        <md-checkbox class="md-red md-checkbox-circle" v-model="selected">Accessibility</md-checkbox>
      </div>
      <div>What kind of special attention do we need to know about?</div>
    </div>
    <div class="mt-30 mb-20">
      <md-checkbox class="md-simple md-red" v-model="value" value="Pregnant women">
        <div class="checkbox-label-wrapper">
          <img :src="`${$iconURL}Requirements/pregnant-women-dark.svg`" />
          Pregnant women
        </div>
      </md-checkbox>
      <md-checkbox class="md-simple md-red" v-model="value" value="Disabled people">
        <div class="checkbox-label-wrapper">
          <img :src="`${$iconURL}Requirements/disabled-person-dark.svg`" />
          Disabled people
        </div>
      </md-checkbox>
      <md-checkbox class="md-simple md-red" v-model="value" value="Elderly People">
        <div class="checkbox-label-wrapper">
          <img :src="`${$iconURL}Requirements/elderly-people-dark.svg`" />
          Elderly People
        </div>
      </md-checkbox>
    </div>
  </div>
</template>
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
<style lang="scss" scoped>
</style>