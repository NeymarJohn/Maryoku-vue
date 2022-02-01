<template>
  <modal class="proposal-graph-modal">
    <template slot="header">
      <div class="graph-close-button">
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
          <md-icon>clear</md-icon>
        </md-button>
      </div>
      <div class="two-columns">
        <div>
          <div class="title-header-modal">Overview Hot Activity</div>
          <div class="info_proposal">
            <span>March Madness </span>
            <span class="info-proposal-divider"><span class="info-proposal-divider-item"></span></span>
            <span>23/12/21</span>
            <span class="info-proposal-divider"><span class="info-proposal-divider-item"></span></span>
            <span>$ 2,200</span>
          </div>
        </div>
        <div></div>
      </div>
    </template>
    <template slot="body">
    <div class="send-message-block">
      <img :src="`${$iconURL}common/hint.svg`" class="mr-10 send-message-img" />
      <span>Increased interest of the planner in your proposal, a higher trend in the last week </span>
      <md-button class="md-button md-vendor md-maryoku  md-theme-default graph-button">Send Message</md-button>
    </div>
    </template>
  </modal>
</template>

<script>
import { Modal } from "@/components";

export default {
  name: "ProposalGraphModal",
  components: {
    Modal,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>

</style>
