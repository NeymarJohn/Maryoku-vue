<template>
  <div class="proposal-request-card white-card p-20">
    <div class="d-flex align-center">
      <div class="font-size-14 font-bold py-10 mr-10" style="min-height: 44px">
        <template v-if="proposalRequest.eventData.concept">{{ proposalRequest.eventData.concept.name }}</template>
        <template v-else-if="proposalRequest.eventData">{{ proposalRequest.eventData.title }}</template>
      </div>
      <div class="font-size-14">
        {{ $dateUtil.formatScheduleDay(proposalRequest.eventData.eventStartMillis, "MM/DD/YY") }}
      </div>
      <span class="color-yellow-dark d-flex align-center font-size-12 ml-auto">
        <img src="/static/icons/vendor/timer-yellow.svg" class="mr-10" style="width: 20px"/>{{ getLeftDays() }} Days
        Left
      </span>
    </div>
    <div class="d-flex align-center justify-content-start font-size-14"
    >$ {{ (proposalRequest.componentInstance ? proposalRequest.componentInstance.allocatedBudget : '') | withComma }}
        <md-icon class="color-black ml-5">keyboard_arrow_down</md-icon>
    </div>
    <div class="d-flex align-end">
      <md-button class="md-simple md-vendor md-vendor-text" style="margin-left: -15px;width: 20px; height: 30px" @click="dismiss(proposalRequest.id)">
          Dismiss
      </md-button>
      <div class="ml-auto">
          <div v-if="proposal">
              <div v-if="proposal.status === 'save'">
                  <div class="font-size-14"><span class="font-bold color-vendor">60%</span> completed</div>
                  <md-progress-bar class="md-thin md-vendor" md-mode="determinate" :md-value="60"></md-progress-bar>
              </div>
              <div v-if="proposal.status === 'submit'">
                  <a class="color-red text-decoration-none cursor-pointer font-size-14">Negotiation Request</a>
              </div>
          </div>
          <div v-else class="new color-vendor font-size-14 ml-auto">
              New
          </div>
          <md-button class="md-vendor" @click="gotoProposalRequest" style="height: 30px">
              {{!proposal ? 'Apply' : proposal.status === 'save' ? 'Finish' : 'Make Changes'}}
          </md-button>
      </div>

    </div>
  </div>
</template>
<script>
import TimelineEmpty from "../../Events/components/TimelineEmpty";
export default {
    components: {TimelineEmpty},
    props: {
    proposalRequest: {
      type: Object,
      default: () => {},
    },
    proposal: {
      type: Object,
      default: null,
    }
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
    dismiss(id){
      this.$emit('dismiss', id);
    }
  },
};
</script>
<style lang="scss" scoped>
.proposal-request-card {
  display: inline-block;
  width: 100%;
}
.new {
    padding: 0px 10px;
    border: 1px solid rgba(125, 40, 109, 0.62);
    border-radius: 30px;
    background-color: #d7c4d4;
    width: fit-content;
}
</style>
