<template>
  <div class="vendor-proposal-board p-60">
    <div class="text-transform-uppercase font-size-22 font-bold">
      <img src="/static/icons/vendor/proposal-active.svg" class="mr-10" /> PROPOSALS BOARD
    </div>
    <div class="font-bold mt-40 mb-20">New opportunities:</div>
    <div class="proposal-requests">
      <proposal-request-card></proposal-request-card>
      <proposal-request-card></proposal-request-card>
      <proposal-request-card></proposal-request-card>
      <proposal-request-card></proposal-request-card>
    </div>
    <hr class="m-60" />
    <div class="proposals-table">
      <div class="font-bold">Your proposal:</div>
      <div class="filter-bar mt-30">
        <md-button class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20">
          <span class="color-black-middle">All Proposal</span>
        </md-button>
        <md-button class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20">
          <span class="color-black-middle">I won</span>
        </md-button>
        <md-button class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20">
          <span class="color-black-middle">Drafts</span>
        </md-button>
        <md-button class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20">
          <span class="color-black-middle">Pending</span>
        </md-button>
        <md-button class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20">
          <span class="color-black-middle">Got to Top3</span>
        </md-button>
        <md-button class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20">
          <span class="color-black-middle">Didn't get</span>
        </md-button>
      </div>
      <div class="sort-bar mt-30">
        <span class="font-size-20 font-bold color-red" style="color: #0fac4c">23 Proposals:</span>
        <span>Date of event</span>
        <span>Date of modify</span>
        <span>Status</span>
        <span>Update</span>
      </div>
      <div class="propsoals-list mt-30">
        <div class="md-layout">
          <div class="md-layout-item md-size-75">
            <div class="white-card md-20 proposal-list">
              <proposal-list-item class="row"></proposal-list-item>
              <proposal-list-item class="row"></proposal-list-item>
              <proposal-list-item class="row"></proposal-list-item>
              <proposal-list-item class="row"></proposal-list-item>
              <proposal-list-item class="row"></proposal-list-item>
              <proposal-list-item class="row"></proposal-list-item>
            </div>
          </div>
          <div class="md-layout-item md-size-25">
            <div class="white-card" style="height: 100%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProposalListItem from "../components/ProposalListItem.vue";
import ProposalRequestCard from "../components/ProposalRequestCard";
export default {
  components: {
    ProposalRequestCard,
    ProposalListItem,
  },
};
</script>
<style lang="scss" scoped>
.vendor-proposal-board {
  .proposal-requests {
    display: flex;
  }
  .proposal-list {
    margin-left: -15px;
    .proposal-list-item:not(:last-child) {
      border-bottom: solid 1px #dbdbdb;
    }
  }
}
</style>