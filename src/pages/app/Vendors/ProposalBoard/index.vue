<template>
  <div class="vendor-proposal-board p-40">
    <loader :active="loading" height="100%"/>
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
        @dismiss="dismiss"
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
            <span v-if="tab.key == 'all'" class="ml-5" :class="tab.class">({{pagination.total}})</span>
            <span v-else class="ml-5" :class="tab.class">({{pagination[tab.key]}})</span>
          </div>
        </md-button>
      </div>
      <div class="mt-30">
          <span class="font-size-16 font-bold"
                :class="!proposals.length ? 'color-minus' : 'color-won'"
          >
              {{ proposals.length }} Proposals:</span></div>
      <div class="md-layout mt-10">
        <div class="md-layout-item md-size-75 p-0">
          <div class="sort-bar px-40">
            <span v-for="it in proposalHeaders"
                  class="sort-item"
                  :class="{selected: it.key && sortFields['sort'] == it.key, 'text-center': it.key == 'update'}"
                  @click="selectSort(it.key)">
              {{it.title}}
              <md-icon v-if="it.key && it.key != 'update' && sortFields['sort'] == it.key" class="color-black">
                  {{ sortFields['order'] == 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</md-icon>
              <md-icon v-if="it.key && it.key != 'update' && sortFields['sort'] != it.key" class="color-black-middle">
                  keyboard_arrow_down
              </md-icon>
            </span>
          </div>
          <div v-if="!loading" class="propsoals-list">
            <div class="white-card md-20 proposal-list">
                <proposal-list-item
                    v-for="proposal in proposals"
                    :proposal="proposal"
                    :key="proposal.id"
                    class="row"
                    @action="handleProposal"
                ></proposal-list-item>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-size-25 mt-50">
            <div class="white-card p-30">
                <div style="margin: 0 -15px">
                    <pie-chart
                        :chartData="chartData"
                        :columns="1"
                        :options="{
                width: 130,
                height: 180,
                strokWidth: 30,
                direction: 'row',
              }"
                    ></pie-chart>
                </div>
                <div class="px-30">
                    <div class="color-won d-flex align-center">
                        <span class="mr-20 font-size-50">30%</span>
                        <span class="font-size-18">Winning rate</span>
                    </div>
                    <div class="font-size-16 mt-50">
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
                    <md-button class="mt-10 md-simple md-vendor px-0">
                        More Insights
                        <md-icon class="color-vendor">keyboard_arrow_down</md-icon>
                    </md-button>
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
    <modal v-if="showProposalDetail" container-class="modal-container-wizard lg" @close="showProposalDetail=false">
        <template slot="body">
            <proposal-content :vendorProposal="selectedProposal" />
        </template>
    </modal>
  </div>
</template>
<script>
import ProposalListItem from "../components/ProposalListItem.vue";
import ProposalRequestCard from "../components/ProposalRequestCard";
import ProposalRequest from "@/models/ProposalRequest";
import Proposal from "@/models/Proposal";
import Vendor from "@/models/Vendors";
import carousel from "vue-owl-carousel";
import {Loader, TablePagination, PieChart, Modal} from "@/components";
import ProposalContent from "./detail";
export default {
  components: {
    ProposalRequestCard,
    ProposalListItem,
    TablePagination,
    carousel,
    PieChart,
    Loader,
    Modal,
    ProposalContent,
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
          {key: 'date', title: 'Date'},
          {key: 'cost', title: 'Proposal Value'},
          {key: 'modified', title: 'Modified'},
          {key: 'status', title: 'Status'},
          {key: 'owner', title: 'Owner'},
          {key: 'update', title: 'Update', class: 'text-center'},
          {key: '', title: ''},
      ],
      proposals: [],
      chartData: [
        { title: "Application", value: 12, color: "#b7b5b5" },
        { title: "Winning", value: 3, color: "#2cde6b" },
      ],
      tab: 'all',
      showProposalDetail: false,
      selectedProposal: null,
      pagination: {
        total: 0,
        won: 0,
        draft: 0,
        pending: 0,
        top: 0,
        lost: 0,
        pageCount: 0,
        page: 0,
        limit: 5,
      },
      sortFields: {sort: '', order: ''},
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
        // this.proposalRequests = await new ProposalRequest().for(new Vendor({ id: this.vendorData.id })).get();
        let proposalRequests = await new ProposalRequest().for(new Vendor({ id: '60758222cfefec2676a0853d' })).get();
        this.proposalRequests = proposalRequests.filter(p => p.remainingTime);
    },
    async getProposal() {
      const { pagination } = this;
      const params = {status: this.tab, ...this.sortFields};
      const res = await new Proposal()
        // .for(new Vendor({ id: this.vendorData.id }))
        .for(new Vendor({ id: '60462793cfefec258a35e874' }))
        .page(pagination.page)
        .limit(pagination.limit)
        .params(params)
        .get();
      const data = res[0];
      console.log('proposals', res)
      this.proposals = data.items;
      this.pagination.total = data.total;
      this.proposalTabs.map(t => {
        if (data.hasOwnProperty(t.key)) this.pagination[t.key] = data[t.key];
      })
      this.pagination.pageCount = Math.ceil(data.total / this.pagination.limit);
    },
    gotoPage(selectedPage) {
      console.log(selectedPage);
      this.pagination.page = selectedPage;
      this.getProposal();
    },
    async selectTab(tab){
      this.loading = true;
      this.tab = tab;
      await this.getProposal();
      this.loading = false;
    },
    async selectSort(sortField) {
      console.log(sortField);
      if (!sortField || sortField == 'update') return;
      this.loading = true;
      if (this.sortFields.sort !== sortField) {
        this.$set(this.sortFields, 'sort', sortField);
          this.$set(this.sortFields, 'order', 'asc');
      } else {
        this.sortFields['order'] = this.sortFields['order'] === "desc" ? "asc" : "desc";
      }
      await this.getProposal();
      this.loading = false;
    },
    dismiss(id){
      let proposalRequests = this.proposalRequests.filter(p => {
          return p.id !== id;
      });
      this.proposalRequests = proposalRequests;
      // setTimeout(_ => {
      //     this.proposalRequests = proposalRequests;
      // }, 5)

      this.$forceUpdate();
    },
    handleProposal(action, id){
      console.log('proposal.handle', action, id);
      if (action === 'show') {
          this.selectedProposal = this.proposals.find(it => it.id == id);
          this.showProposalDetail = true;
      }
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
  updated(){
    // remove empty item in proposal-request carousel
    $('.owl-item').each(function (el) {
      if($(this).text().length === 0) $(this).remove();
    })
  }
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
    height: 50px;
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
