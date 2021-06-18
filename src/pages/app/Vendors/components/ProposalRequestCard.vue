<template>
  <div class="proposal-request-card white-card p-20" :class="{ 'vendor-dashboard': type === 'dashboard' }">
    <div class="d-flex align-center">
      <div class="font-bold py-10" :class="getFontSize('title')" style="min-height: 44px">
        <template v-if="proposalRequest.eventData.concept">{{ proposalRequest.eventData.concept.name }}</template>
        <template v-else-if="proposalRequest.eventData">{{ proposalRequest.eventData.title }}</template>
      </div>
      <md-button class="md-icon-button md-simple" @click="expanded = !expanded">
        <md-icon class="color-black ml-5">keyboard_arrow_right</md-icon></md-button
      >
      <span class="color-yellow-dark d-flex align-center ml-auto whitspace-nowrap" :class="getFontSize('expiredDate')">
        <img :src="`${iconUrl}VendorsProposalPage/Group 6370.svg`" class="mr-10" style="width: 20px" />{{
          getLeftDays()
        }}
        Days Left
      </span>
    </div>
    <div class="d-flex align-center justify-content-start" :class="getFontSize('title')">
      <div class="pr-10 mr-10 font-bold" style="border-right: 1px solid rgba(0, 0, 0, 0.2)">
        {{ $dateUtil.formatScheduleDay(proposalRequest.eventData.eventStartMillis, "MM/DD/YY") }}
      </div>
      $ {{ (proposalRequest.componentInstance ? proposalRequest.componentInstance.allocatedBudget : "") | withComma }}
    </div>
    <div v-if="expanded" :class="getFontSize('title')">
      <div class="d-flex align-center mt-1">
        <div class="width-50 d-flex align-center">
          <img class="mr-10" :src="`${iconUrl}Onboarding/Group%204458.svg`" style="width: 18px" />
          {{ proposalRequest.eventData.dateCreated | date("MM/DD/YY") }}
        </div>
        <div class="width-50 d-flex align-center">
          <img class="mr-10" :src="`${iconUrl}VendorsProposalPage/group-4341.svg`" style="width: 18px" />
          {{ proposalRequest.eventData.location }}
        </div>
      </div>
      <div class="d-flex align-center mt-1 mb-1">
        <div class="width-50 d-flex align-center">
          <img class="mr-10" :src="`${iconUrl}VendorsProposalPage/group-4392.svg`" style="width: 18px" /> 11:00 AM ~
          4:00PM
        </div>
        <div class="width-50 d-flex align-center">
          <img class="mr-10" :src="`${iconUrl}VendorsProposalPage/group-3485.svg`" style="width: 18px" />
          {{ proposalRequest.eventData.numberOfParticipants | withComma(Number) }}
        </div>
      </div>
    </div>
    <div class="d-flex align-end">
       <md-button
        class="md-simple md-vendor md-vendor-text"
        style="margin-left: -15px; width: 20px; height: 30px"
        @click="dismiss(proposalRequest.id)"
      >
        Dismiss
      </md-button>
      <div class="ml-auto">
        <div v-if="proposal">
          <div v-if="proposal.status === 'draft'">
            <div class="font-size-14">
              <span class="font-bold color-vendor">{{ progress }} %</span> completed
            </div>
            <md-progress-bar class="md-thin md-vendor" md-mode="determinate" :md-value="progress"></md-progress-bar>
          </div>

        <md-button class="md-vendor" @click="gotoProposalRequest" style="height: 30px">
          {{ !proposal ? "Apply" : proposal.status === "draft" ? "Complete" : "Make Changes" }}
        </md-button>
        </div>
        <div v-else class="new color-vendor font-size-14 ml-auto">New</div>
      </div>
    </div>
  </div>
</template>
<script>
import TimelineEmpty from "../../Events/components/TimelineEmpty";
export default {
  components: { TimelineEmpty },
  props: {
    proposalRequest: {
      type: Object,
      default: () => {},
    },
    proposal: {
      type: Object,
      default: null,
    },
    size: {
      type: Number,
      default: 1,
    },
    type: {
      type: String,
      default: "proposal",
    },
  },
  data() {
    return {
      iconUrl: `${this.$iconURL}`,
      expanded: false,
    };
  },
  computed: {
    progress() {
      if (!this.proposal || !this.proposal.step) return 10;
      return Math.floor(((this.proposal.step - 1) / 3) * 100);
    },
  },
  methods: {
    gotoProposalRequest() {
      const tenantId = this.$authService.resolveTenantId();
      console.log("proposal.request", this.proposalRequest);
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
    dismiss(id) {
      this.$emit("dismiss", id);
    },
    getFontSize(type) {
      if (type === "title") {
        return this.size === 1 ? "font-size-14" : "font-size-20";
      } else if (type === "expiredDate") {
        return this.size === 1 ? "font-size-12" : "font-size-16";
      }
    },
  },
  mounted() {
    console.log("proposal.card", this.vendor, this.proposal);
  },
};
</script>
<style lang="scss" scoped>
.proposal-request-card {
  display: inline-block;
  width: 100%;
  &.vendor-dashboard {
    min-height: 200px;
  }
}
.new {
  padding: 0px 10px;
  border: 1px solid rgba(125, 40, 109, 0.62);
  border-radius: 30px;
  background-color: #d7c4d4;
  width: fit-content;
}
</style>
