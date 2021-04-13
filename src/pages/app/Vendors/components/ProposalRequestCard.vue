<template>
  <div class="proposal-request-card white-card p-30">
    <div class="d-flex justify-content-between">
      <div class="font-size-20 font-bold">
        <div>{{ proposalRequest.eventData.concept.name || proposalRequest.eventData.title }}</div>
        <div class="font-size-16">
          {{ $dateUtil.formatScheduleDay(proposalRequest.eventData.eventStartMillis, "MM/DD/YY") }}
        </div>
      </div>

      <div class="color-yellow-dark font-bold d-flex align-start">
        <img src="/static/icons/vendor/timer-yellow.svg" class="mr-10" style="width: 20px" />{{ getLeftDays() }} Days
        Left
      </div>
    </div>
    <div class="mt-20">${{ proposalRequest.componentInstance.allocatedBudget | withComma }}</div>
    <div class="mt-30 d-flex justify-content-between align-end">
      <div class="flex-1">
        <div class="mb-10"><span class="font-bold color-vendor">60%</span> completed</div>
        <md-progress-bar class="md-thin md-vendor mr-50" md-mode="determinate" :md-value="60"></md-progress-bar>
      </div>
      <md-button class="md-simple md-outlined md-vendor maryoku-btn" @click="gotoProposalRequest">Finish</md-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    proposalRequest: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    gotoProposalRequest() {
      const tenantId = this.$authService.resolveTenantId();
      let link = "";
      if (tenantId === "DEFAULT") {
        link = `${this.proposalRequest.tenant}.${document.location.host}/#/vendors/${this.proposalRequest.vendorId}/proposal-request/${this.proposalRequest.id}`;
      } else {
        link = `${this.proposalRequest.tenant}.${document.location.host.replace(`${tenantId}.`, "")}/#/vendros/${
          this.proposalRequest.vendor.id
        }/proposal-request/${this.proposalRequest.id}`;
      }
      var win = window.open(`${document.location.protocol}//${link}`, "_blank");
      win.focus();
    },
    getLeftDays() {
      let diffSeconds = (this.proposalRequest.expiredTime - new Date().getTime()) / 1000;
      const hours = diffSeconds / 3600;
      const days = Math.round(hours / 24);
      return days;
    },
  },
};
</script>
<style lang="scss" scoped>
.proposal-request-card {
  margin-right: 15px;
  margin: 30px 15px;
  display: inline-block;
  width: 100%;
}
</style>