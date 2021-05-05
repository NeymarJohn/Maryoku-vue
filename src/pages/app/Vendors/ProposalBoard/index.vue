<template>
  <div class="vendor-proposal-board px-40 pt-60">
    <vue-element-loading :active="loading" spinner="ring" color="#FF547C"></vue-element-loading>
    <div class="font-size-22 font-bold">
      <img src="/static/icons/vendor/proposal-active.svg" class="mr-10" /> Proposal Dashboard
    </div>
    <div class="font-bold text-uppercase mt-30 mb-15">Pending Proposals</div>
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
    <hr class="my-40 color-vendor" />
    <div class="proposals-table">
      <div class="font-bold">All proposals:</div>
      <div class="filter-bar mt-30">
        <md-button v-for="tab in proposalTabs"
                   :key="tab.key"
                   class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20"
                   @click="selectTab(tab.key)"
        >
          <div class="d-flex align-center px-20 py-10 font-size-16" :class="tab.class">
            <img class="mr-10" :src="`/static/icons/vendor/proposalBoard/${tab.icon}`" style="width: 20px; height: 20px"/>
            {{tab.title}}
            <span v-if="proposals.length && getProposalNumber(tab.key)" class="ml-5" :class="tab.class">({{getProposalNumber(tab.key)}})</span>
          </div>
        </md-button>
      </div>
      <div class="mt-20">
          <span class="font-size-16 font-bold"
                :class="!proposals.length ? 'color-minus' : 'color-won'"
          >
              {{ pagination.total }} Proposals:</span></div>
      <div class="md-layout">
        <div class="md-layout-item md-size-75 p-0">
          <div class="sort-bar px-40 mt-20">
            <span v-for="it in proposalHeaders" class="sort-item" :class="{selected: it.key && sortFields[it.key]}" @click="sort(it.key)">
              {{it.title}}
              <md-icon v-if="sortFields[it.key] === 'desc'" class="color-black">keyboard_arrow_down</md-icon>
              <md-icon v-if="sortFields[it.key] === 'asc'" class="color-black">keyboard_arrow_up</md-icon>
            </span>
          </div>
          <div v-if="!loading" class="propsoals-list mt-10">
            <div class="white-card md-20 proposal-list">
                <proposal-list-item class="row" v-for="proposal in proposals" :proposal="proposal" :key="proposal.id"></proposal-list-item>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-size-25 mt-50">
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
import VueElementLoading from 'vue-element-loading'
export default {
  components: {
    ProposalRequestCard,
    ProposalListItem,
    TablePagination,
    carousel,
    PieChart,
    VueElementLoading,
  },
  data() {
    return {
      loading: true,
      proposalRequests: [],
      proposalTabs: [
          {key: 'all', title: 'All Proposal', icon: 'proposal-active.svg', class: 'color-vendor'},
          {key: 'won', title: 'I won', icon: 'filter-won.svg', class: 'color-won'},
          {key: 'draft', title: 'Drafts', icon: 'filter-draft.svg'},
          {key: 'pending', title: 'Pending', icon: 'filter-pending.svg'},
          {key: 'top', title: 'Made Top3', icon: 'filter-top3.svg'},
          {key: 'lost', title: 'Lost Bids', icon: 'filter-reject.svg'},
      ],
      proposalHeaders: [
          {key: '', title: ''},
          {key: 'name', title: 'Name'},
          {key: 'Date', title: 'Date'},
          {key: 'proposalValue', title: 'Proposal Value'},
          {key: 'modified', title: 'Modified'},
          {key: 'status', title: 'Status'},
          {key: 'owner', title: 'Owner'},
          {key: 'update', title: 'Update'},
          {key: '', title: ''},
      ],
      proposals: [],
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
  async mounted() {
    console.log('mounted', this.vendorData);
    await this.getData();
    await this.getProposal();
    this.loading = false;
  },
  methods: {
    async getData() {
        this.proposalRequests = await new ProposalRequest().for(new Vendor({ id: this.vendorData.id })).get();
    },
    async getProposal() {
      const { pagination } = this;

      const res = await new Proposal()
        // .for(new Vendor({ id: this.vendorData.id }))
        .for(new Vendor({ id: '5fb50750cfefec7cb434ac7d' }))
        .page(pagination.page)
        .limit(pagination.limit)
        .get();
      const data = res[0];
      console.log('proposals', res)
      this.proposals = data.items;
      this.pagination.total = data.total;
      this.pagination.pageCount = Math.ceil(data.total / this.pagination.limit);
    },
    gotoPage(selectedPage) {
      console.log(selectedPage);
      this.pagination.page = selectedPage;
      this.getProposal();
    },
    selectTab(tab){
      console.log('select.tab', tab);
    },
    sort(sortField) {
      if (!this.sortFields[sortField]) {
        this.$set(this.sortFields, sortField, "desc");
      } else {
        this.sortFields[sortField] = this.sortFields[sortField] === "desc" ? "asc" : "desc";
      }
    },
    getProposalNumber(key){
      if (key == 'all') {
        return this.proposals.length;
      }
      return null;
    }
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
  .proposal-list {
    .proposal-list-item:not(:last-child) {
      border-bottom: solid 1px #dbdbdb;
    }
  }
  .sort-bar {
    display: grid;
    align-items: center;
    grid-template-columns: 5% 20% 10% 15% 10% 10% 10% 15% 5%;
    .sort-item {
      cursor: pointer;
      color: #707070;
      font-size: 14px;
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
