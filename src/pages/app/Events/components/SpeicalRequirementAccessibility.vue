<template>
  <div class="special-requirement-accessibility">
    <md-checkbox class="md-simple md-red" v-model="value" value="obj1">
      <div class="checkbox-label-wrapper">
        <img :src="`${$iconURL}Requirements/pregnant-women-dark.svg`" />
        Pregnant women
      </div>
    </md-checkbox>
    <md-checkbox class="md-simple md-red" v-model="value" value="obj1">
      <div class="checkbox-label-wrapper">
        <img :src="`${$iconURL}Requirements/disabled-person-dark.svg`" />
        Disabled people
      </div>
    </md-checkbox>
    <md-checkbox class="md-simple md-red" v-model="value" value="obj1">
      <div class="checkbox-label-wrapper">
        <img :src="`${$iconURL}Requirements/elderly-people-dark.svg`" />
        Elderly People
      </div>
    </md-checkbox>
    <md-checkbox
      class="md-simple md-checkbox-circle md-red"
      v-model="editingSpecialRequest.isMandatory"
      :value="true"
    >
      <span class="font-size-16">Mandatory</span>
    </md-checkbox>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
</style>