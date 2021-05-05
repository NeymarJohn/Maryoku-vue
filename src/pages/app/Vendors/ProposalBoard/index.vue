<template>
  <div class="vendor-proposal-board p-60">
    <div class="font-size-22 font-bold">
      <img src="/static/icons/vendor/proposal-active.svg" class="mr-10" /> Proposal Dashboard
    </div>
    <div class="font-bold mt-40 mb-20">New opportunities:</div>
    <carousel
      :items="4"
      :margin="25"
      :dots="false"
      :number="2"
      :nav="false"
      v-if="proposalRequests.length > 0"
      class="proposal-requests"
    >
      <template slot="prev">
        <button class="nav-left nav-btn">
          <span><md-icon class="color-vendor">arrow_back</md-icon></span>
        </button>
      </template>
      <proposal-request-card
        class="carousel-item"
        v-for="proposalRequest in proposalRequests"
        :key="proposalRequest.id"
        :proposalRequest="proposalRequest"
      >
      </proposal-request-card>
      <template slot="next">
        <button class="nav-right nav-btn">
          <md-icon class="color-vendor">arrow_forward</md-icon>
        </button>
      </template>
    </carousel>
    <hr class="m-60" />
    <div class="proposals-table">
      <div class="font-bold">All my proposals:</div>
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
            <img src="/static/icons/vendor/proposalBoard/filter-top3.svg" />Made Top 3
          </span>
        </md-button>
        <md-button class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20">
          <span class="color-black-middle">
            <img src="/static/icons/vendor/proposalBoard/filter-reject.svg" />Lost Bids
          </span>
        </md-button>
      </div>
      <div class="sort-bar mt-30">
        <span class="font-size-20 font-bold color-red" style="color: #0fac4c">{{ pagination.total }} Proposals:</span>
        <span class="sort-item" :class="{ selected: this.sortFields['dateOfEvent'] }" @click="sort('dateOfEvent')"
          >Date of event
          <md-icon class="color-black" v-if="this.sortFields['dateOfEvent'] === 'desc'">keyboard_arrow_down</md-icon>
          <md-icon class="color-black" v-if="this.sortFields['dateOfEvent'] === 'asc'">keyboard_arrow_up</md-icon>
        </span>
        <span class="sort-item" :class="{ selected: this.sortFields['dateOfModify'] }" @click="sort('dateOfModify')"
          >Date of modify
          <md-icon class="color-black" v-if="this.sortFields['dateOfModify'] === 'desc'">keyboard_arrow_down</md-icon>
          <md-icon class="color-black" v-if="this.sortFields['dateOfModify'] === 'asc'"
            >keyboard_arrow_up</md-icon
          ></span
        >
        <span class="sort-item" :class="{ selected: this.sortFields['status'] }" @click="sort('status')"
          >Status
          <md-icon class="color-black" v-if="this.sortFields['status'] === 'desc'">keyboard_arrow_down</md-icon>
          <md-icon class="color-black" v-if="this.sortFields['status'] === 'asc'">keyboard_arrow_up</md-icon>
        </span>
        <span class="sort-item" :class="{ selected: this.sortFields['update'] }" @click="sort('update')"
          >Update
          <md-icon class="color-black" v-if="this.sortFields['update'] === 'desc'">keyboard_arrow_down</md-icon>
          <md-icon class="color-black" v-if="this.sortFields['update'] === 'asc'">keyboard_arrow_up</md-icon>
        </span>
        <span></span>
        <span></span>
      </div>
      <div class="propsoals-list mt-30">
        <div class="md-layout">
          <div class="md-layout-item md-size-75">
            <div class="white-card md-20 proposal-list">
              <proposal-list-item class="row" v-for="proposal in proposals" :key="proposal.id"></proposal-list-item>
            </div>
          </div>
          <div class="md-layout-item md-size-25">
            <div class="white-card p-50" style="height: 100%">
              <div style="margin: 0 -15px">
                <pie-chart
                  :chartData="chartData"
                  :columns="1"
                  :options="{
                    width: 150,
                    height: 200,
                    strokWidth: 40,
                    direction: 'row',
                  }"
                ></pie-chart>
              </div>
              <div class="color-brown d-flex align-center">
                <span class="mr-20" style="font-size: 56px">30%</span>
                <span class="font-size-22">Winning rate</span>
              </div>
              <div class="font-size-20 mt-50">
                You won <span class="font-bold">40 of 120</span> Proposals you applied to
              </div>
              <hr class="mt-50 mb-50" />
              <div class="tips">
                <div class="d-flex mb-30 align-center">
                  <div class="flex-1"><img :src="`${$iconURL}common/light.svg`" class="label-icon" /></div>
                  <div class="ml-10">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</div>
                </div>
                <div class="d-flex align-center">
                  <div class="flex-1"><img :src="`${$iconURL}common/light.svg`" class="label-icon" /></div>
                  <div class="ml-10">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-size-75">
          <div class="text-center">
            <table-pagination
              v-if="pagination.pageCount"
              class="mt-30"
              :pageCount="pagination.pageCount"
              :clickHandler="gotoPage"
            ></table-pagination>
          </div>
        </div>
        <div class="md-layout-item md-size-25"></div>
      </div>
    </div>
  </div>
</template>
<script>
import TablePagination from "@/components/TablePagination.vue";
import ProposalListItem from "../components/ProposalListItem.vue";
import ProposalRequestCard from "../components/ProposalRequestCard";
import ProposalRequest from "@/models/ProposalRequest";
import Proposal from "@/models/Proposal";
import Vendor from "@/models/Vendors";
import carousel from "vue-owl-carousel";
import PieChart from "@/components/Chart/PieChart.vue";
export default {
  components: {
    ProposalRequestCard,
    ProposalListItem,
    TablePagination,
    carousel,
    PieChart,
  },
  data() {
    return {
      proposalRequests: [],
      proposals: [1, 2, 3, 4],
      chartData: [
        { title: "Application", value: 12, color: "#b7b5b5" },
        { title: "Winning", value: 3, color: "#2cde6b" },
      ],
      pagination: {
        total: 0,
        pageCount: 0,
        page: 0,
        limit: 5,
      },
      sortFields: {},
    };
  },
  created() {
    this.getData();
    this.getProposal();
  },
  methods: {
    getData() {
      new ProposalRequest()
        .for(new Vendor({ id: this.vendorData.id }))
        .get()
        .then((proposalRequests) => {
          this.proposalRequests = proposalRequests;
        });
    },
    getProposal() {
      const { pagination } = this;
      this.proposals = [1, 2, 2, 3];
      // new Proposal()
      //   .for(new Vendor({ id: this.vendorData.id }))
      //   .page(pagination.page)
      //   .limit(pagination.limit)
      //   .get()
      //   .then((res) => {
      //     const data = res[0];
      //     // this.proposals = data.items;
      //     // this.pagination.total = data.total;
      //     // this.pagination.pageCount = Math.ceil(data.total / this.pagination.limit);
      //   });
    },
    gotoPage(selectedPage) {
      console.log(selectedPage);
      this.pagination.page = selectedPage;
      this.getProposal();
    },
    sort(sortField) {
      if (!this.sortFields[sortField]) {
        this.$set(this.sortFields, sortField, "desc");
      } else {
        this.sortFields[sortField] = this.sortFields[sortField] === "desc" ? "asc" : "desc";
      }
    },
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
  },
  watch: {
    vendorData(newValue, oldValue) {
      this.getData();
    },
  },
};
</script>
<style lang="scss" scoped>
.vendor-proposal-board {
  .proposal-requests {
    display: flex;
    position: relative;
    margin: 0 -50px;
    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      z-index: 10;
      width: 33px;
      height: 33px;
      background-color: white;
      border: none;
      border-radius: 50%;
      box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.16);
      cursor: pointer;
      &.nav-left {
        left: 10px;
      }
      &.nav-right {
        right: 10px;
      }
    }
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
    .sort-item {
      cursor: pointer;
      color: #707070;
      &.selected {
        color: #050505;
        font-weight: bold;
      }
    }
  }
  .tips {
    img {
      height: 20px;
    }
  }
}
</style>