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
          <span class="color-black-middle">
            <img src="/static/icons/vendor/proposalBoard/filter-all.svg" />All Proposal
          </span>
        </md-button>
        <md-button class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20">
          <span class="color-black-middle"><img src="/static/icons/vendor/proposalBoard/filter-won.svg" />I won</span>
        </md-button>
        <md-button class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20">
          <span class="color-black-middle">
            <img src="/static/icons/vendor/proposalBoard/filter-draft.svg" />Drafts
          </span>
        </md-button>
        <md-button class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20">
          <span class="color-black-middle">
            <img src="/static/icons/vendor/proposalBoard/filter-pending.svg" />Pending
          </span>
        </md-button>
        <md-button class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20">
          <span class="color-black-middle">
            <img src="/static/icons/vendor/proposalBoard/filter-top3.svg" />Got to Top3
          </span>
        </md-button>
        <md-button class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20">
          <span class="color-black-middle">
            <img src="/static/icons/vendor/proposalBoard/filter-reject.svg" />Didn't get
          </span>
        </md-button>
      </div>
      <div class="sort-bar mt-30">
        <span class="font-size-20 font-bold color-red" style="color: #0fac4c">23 Proposals:</span>
        <span>Date of event</span>
        <span>Date of modify</span>
        <span>Status</span>
        <span>Update</span>
        <span></span>
        <span></span>
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
            <div class="white-card p-50" style="height: 100%">
              <div class="color-brown d-flex align-center">
                <span class="mr-20" style="font-size: 56px">30%</span>
                <span class="font-size-22">Winning rate</span>
              </div>
              <div class="font-size-20 mt-50">
                You won <span class="font-bold">40 of 120</span> Proposals you applied to
              </div>
              <hr class="mt-50 mb-50" />
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-size-75">
          <div class="text-center">
            <table-pagination :pageCount="12"></table-pagination>
          </div>
        </div>
        <div class="md-layout-item md-size-25"></div>
      </div>
    </div>
  </div>
</template>
<script>
import TablePagination from "../../../../components/TablePagination.vue";
import ProposalListItem from "../components/ProposalListItem.vue";
import ProposalRequestCard from "../components/ProposalRequestCard";
export default {
  components: {
    ProposalRequestCard,
    ProposalListItem,
    TablePagination,
  },
};
</script>
<style lang="scss" scoped>
.vendor-proposal-board {
  .proposal-requests {
    display: flex;
  }
  .filter-button {
    .color-black-middle {
      display: flex;
      align-items: center;
      padding: 4px 15px;
      img {
        margin-right: 10px;
      }
    }
  }
  .proposal-list {
    margin-left: -15px;
    .proposal-list-item:not(:last-child) {
      border-bottom: solid 1px #dbdbdb;
    }
  }
  .sort-bar {
    width: 75%;
    padding-right: 120px;
    display: grid;
    align-items: center;
    grid-template-columns: 150px 20% 20% 15% 20% 20% 30px;
  }
}
</style>