<template>
  <div class="proposal-request-card white-card p-20">
    <div class="d-flex align-center">
      <div class="font-size-14 font-bold py-10 mr-10">
        {{ proposalRequest.eventData.concept.name || proposalRequest.eventData.title }}
      </div>
      <div class="font-size-14">
        {{ $dateUtil.formatScheduleDay(proposalRequest.eventData.eventStartMillis, "MM/DD/YY") }}
      </div>
      <span class="color-yellow-dark d-flex align-center font-size-12 ml-auto">
        <img src="/static/icons/vendor/timer-yellow.svg" class="mr-10" style="width: 20px"/>{{ getLeftDays() }} Days
        Left
      </span>
    </div>
    <div class="d-flex align-center justify-content-start mt-5 font-size-14">$ {{ proposalRequest.componentInstance.allocatedBudget | withComma }}
        <md-icon class="color-black ml-5">keyboard_arrow_down</md-icon>
    </div>
    <div class="mt-20 d-flex align-end">
      <span class="font-size-14 color-vendor font-bold">
          Dismiss
      </span>
      <div class="ml-auto">
          <div class="font-size-14"><span class="font-bold color-vendor">60%</span> completed</div>
          <md-progress-bar class="md-thin md-vendor" md-mode="determinate" :md-value="60"></md-progress-bar>
          <md-button class="md-simple md-outlined md-vendor" @click="gotoProposalRequest">Complete</md-button>
      </div>

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
      console.log('proposal.request', this.proposalRequest);
      let link = "";
      if (tenantId === "DEFAULT") {
        link = `${this.proposalRequest.tenant}.${document.location.host}/#/vendors/${this.proposalRequest.vendorId}/proposal-request/${this.proposalRequest.id}`;
      } else {
        link = `${this.proposalRequest.tenant}.${document.location.host.replace(`${tenantId}.`, "")}/#/vendors/${
          this.proposalRequest.vendorId
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
  display: inline-block;
  width: 100%;
}
</style>
