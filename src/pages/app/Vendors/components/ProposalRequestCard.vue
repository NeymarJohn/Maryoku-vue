<template>
  <div class="proposal-request-card white-card p-30">
    <div class="d-flex justify-content-between">
      <div class="font-size-20 font-bold">Frog Design | 23/12/21</div>
      <div class="color-yellow-dark font-bold">
        <img src="/static/icons/vendor/timer-yellow.svg" class="mr-10" />6 Days Left
      </div>
    </div>
    <div class="mt-20">$2,200</div>
    <div class="mt-30 d-flex justify-content-between align-end">
      <div class="flex-1">
        <div class="mb-10"><span class="font-bold color-vendor">60%</span> completed</div>
        <md-progress-bar class="md-thin md-vendor mr-50" md-mode="determinate" :md-value="60"></md-progress-bar>
      </div>
      <md-button class="md-simple md-outlined md-vendor maryoku-btn">Finish</md-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.proposal-request-card {
  margin-right: 15px;
  display: inline-block;
  width: 460px;
}
</style>