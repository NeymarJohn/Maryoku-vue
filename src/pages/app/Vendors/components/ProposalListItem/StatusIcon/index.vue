<template>
  <div style="position: relative" class="status-icon-block">
    <img class="ml-15" :src="src"/>
    <div class="tooltip-icon-body" v-if="status === 0 && lastUpdated">
      {{
        'Last changed on ' + new Date(+lastUpdated).toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        })
      }}
    </div>
  </div>
</template>
<style scoped lang="scss">
.tooltip-icon-body {
  display: none;
  position: absolute;
  font-size: 1rem;
  max-width: 324.8px;
  width: max-content;
  left: -150px;
  z-index: 1;
  padding: 2em;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.19);
  background-color: rgb(255, 255, 255);
  margin-top: 1.5em;
  &::before {
    content: "";
    position: absolute;
    width: 1.5em;
    height: 1.5em;
    margin-left: 7.9em;
    background-color: transparent;
    margin-top: -3.25em;
    border-left: 1.25em solid transparent;
    border-right: 1.25em solid transparent;
    border-bottom: 2em solid rgba(255, 255, 255, 0.85);
  }
}
.status-icon-block:hover .tooltip-icon-body{
  display: block;
}
</style>
<script>
import { PROPOSAL_STATUS } from "@/constants/status";
const path = (iconName) => `/static/icons/vendor/proposalBoard/filter-${iconName}.svg`;
export default {
  props: {
    status: {
      type     : Number,
      required : true,
    },
    lastUpdated: {
      type   : Number,
      default: () => 0,
    }
  },
  computed: {
    src () {
      switch (this.status) {
        case PROPOSAL_STATUS.DRAFT   : return `${this.$iconURL}VendorsProposalPage/path-14945.svg`;
        case PROPOSAL_STATUS.PENDING : return path("pending");
        case PROPOSAL_STATUS.TOP3    : return path("top3");
        case PROPOSAL_STATUS.LOST    : return path("reject");
        case PROPOSAL_STATUS.CANCEL  : return path("won");
        default                      : return path(status);
      }
    }
  }
};
</script>
