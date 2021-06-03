<template>
  <div class="vendor-proposal-board p-40">
      <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          :filename="`proposal-${selectedProposal ? selectedProposal.id : ''}`"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="800px"
          :html-to-pdf-options="htmlToPdfOptions"
          ref="html2Pdf"
      >
        <section slot="pdf-content">
          <div class="p-20 pdf-content">
            <section style="position: relative;">
              <img src="https://maryoku.s3.amazonaws.com/proposal/inspirationalPhotos/6071631fcfefec2676a08362/photo-0.png" style="width:100%;height: 500px"/>
              <div class="p-4 position-absolute bg-custom-transparent" style="background: rgba(255, 255, 255,0.76);position: absolute;padding: 1.5rem !important;top:0;left:0;right:0;height: 100px">
                  <h3 class="font-weight-bold">Event Information  Details</h3>
                  <ul class="event-detail mt-3" style="list-style: none;display: flex;flex-direction: row;margin-top: 1rem !important">
                      <li class="border-line-end" style="border-right: 1px solid #818080;flex: 1;padding-right: 80px;padding-bottom: 10px;margin-right: 80px;">
                          <label class="font-weight-bold">Name</label>
                          <div>Event</div>
                      </li>
                      <li class="border-line-end" style="border-right: 1px solid #818080;flex: 1;padding-right: 80px;padding-bottom: 10px;margin-right: 80px;">
                          <label class="font-weight-bold">Date</label>
                          <div>Date</div>
                      </li>
                      <li class="" style="flex: 1;padding-right: 80px;padding-bottom: 10px;margin-right: 80px;">
                          <label class="font-weight-bold">Guest Arrival Time</label>
                          <div>Time</div>
                      </li>
                  </ul>
              </div>
            </section>
            <section class="px-4 py-2" style="padding-right: 1.5rem !important;padding-top: 0.5rem !important">
              <h1 class="font-weight-bold">Dear Man,</h1>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
              and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </p>
              <div class="my-4" style="margin-top: 1.5rem !important">
                <h3 class="font-weight-bold d-flex align-items-center" style="align-items: center;display: flex;">
                <img class="mr-2" src="https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor+Landing+Page/Asset+491.svg" width="30" style="margin-right: 0.5rem !important;"/>
                  Our vision for your event</h3>
                <p>nd web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites
                still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                (injected humour and the like).</p>
              </div>
              <div>
                <div class="font-weight-bold">Some references to the experience you will get from us</div>
                <ul class="proposal-images" style="list-style: none;display: flex;flex-direction: row;margin-top: 1rem !important">
                    <li style="flex: 1;width: 200px;height: 160px;margin-right: 20px;">
                        <img style="width: 100%;height: 100%;" src="https://maryoku.s3.amazonaws.com/proposal/inspirationalPhotos/60757eb2cfefec2676a084fe/photo-0.jpeg"/>
                    </li>
                    <li>
                        <img style="width: 100%;height: 100%;" src="https://maryoku.s3.amazonaws.com/proposal/inspirationalPhotos/60757eb2cfefec2676a084fe/photo-1.png"/>
                    </li>
                    <li>
                        <img style="width: 100%;height: 100%;" src="https://maryoku.s3.amazonaws.com/proposal/inspirationalPhotos/60757eb2cfefec2676a084fe/photo-2.png"/>
                    </li>
                </ul>
              </div>
              <div class="mt-4" style="margin-top: 1.5rem !important;">
                <h3 class="font-weight-bold custom-red" style="color: #f51355 !important;">About Us</h3>
                <p class="mt-2" style="margin-top: 0.5rem !important;">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>
              </div>
            </section>
          </div>
          <div class="html2pdf__page-break"></div>
          <div class="p-20 pdf-content">
            <section class="px-4 py-2 mt-4">
              <div class="d-flex align-items-center py-2">
                <img class="mr-2" src="https://static-maryoku.s3.amazonaws.com/storage/icons/Submit%20Proposal/Asset 287.svg" width="16"/>
                <h3 class="font-weight-bold m-0">Our Policy</h3>
              </div>
              <p>What would you like to take from our suggested services?</p>
            </section>
            <section class="px-4 py-2">
              <div class="d-flex align-items-center py-2">
                <img class="mr-2" src="https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/SVG/Asset%2010.svg" width="16"/>
                <h3 class="font-weight-bold m-0">Pricing  Details</h3>
              </div>
              <p></p>
            </section>
          </div>
        </section>
      </vue-html2pdf>
    <loader :active="loading" :isFullScreen="true"/>
    <div class="font-size-22 font-bold d-flex align-center">
      <img src="/static/icons/vendor/proposal-active.svg" class="mr-10" /> Proposal Board
      <md-button class="ml-auto md-vendor md-maryoku mr-15">Create New Proposal</md-button>
    </div>
    <div class="font-bold text-uppercase mt-30 mb-15">Opportunities</div>
    <carousel
      :items="4"
      :margin="25"
      :dots="false"
      :number="2"
      :nav="false"
      class="proposal-requests"
      v-if="proposalRequests.length"
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
        :proposal="getProposalWithRequestId(proposalRequest.id)"
        @dismiss="dismiss"
      >
      </proposal-request-card>
      <div v-if="proposalRequests.length < 4" class="white-card p-20 d-flex">
          <img class="mb-0" :src="`${iconUrl}vendordashboard/group-17116.png`" style="width: 55px;height: 55px">
          <div class="ml-15">
              <div class="font-size-18 font-bold text-uppercase color-vendor">No More Pending Proposals</div>
              <p class="my-10 font-size-14">You can increase your exposure to planners in a few simple steps</p>
              <div class="d-flex"><md-button class="md-simple ml-auto md-vendor md-outlined" style="height: 30px">Learn More</md-button></div>
          </div>
      </div>
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
        <div class="md-layout-item md-size-75 p-0 d-flex flex-column" style="background: rgba(255, 255, 255, 0.46)">
          <div class="sort-bar px-40" style="background: #f3f7fd">
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
          <div v-if="pagination.total < 4" class="my-auto d-flex flex-column align-center">
              <img class="mb-0" :src="`${iconUrl}vendordashboard/group-17116.png`">
              <p class="text-transform-uppercase font-size-14">No More Proposal To Show</p>
              <md-button class="md-vendor">Create New Proposal</md-button>
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
                    <md-button class="mt-10 md-simple md-vendor-text md-vendor px-0">
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
    <modal v-if="showProposalDetail" container-class="modal-container-wizard lg">
        <template slot="header">
            <md-button class="md-simple md-just-icon md-round modal-default-button" @click="showProposalDetail = false">
                <md-icon>clear</md-icon>
            </md-button>
        </template>
        <template slot="body">
            <proposal-content :vendorProposal="selectedProposal"/>
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
import PdfContent from "./pdfContent";
const VueHtml2pdf = () => import("vue-html2pdf");

export default {
  components: {
    ProposalRequestCard,
    ProposalListItem,
    TablePagination,
    ProposalContent,
    carousel,
    PieChart,
    Loader,
    Modal,
    VueHtml2pdf,
    PdfContent
  },
  data() {
    return {
      loading: true,
      iconUrl: `${this.$iconURL}`,
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
    // console.log('mounted', this.vendorData.id);
    if(this.vendorData){
        this.init();
    }

  },
  methods: {
    async getData() {
        let proposalRequests = await new ProposalRequest().for(new Vendor({ id: this.vendorData.id })).get();
        // let proposalRequests = await new ProposalRequest().for(new Vendor({ id: '60b636d7cfefec26397d2a7e' })).get();
        this.proposalRequests = proposalRequests.filter(p => p.remainingTime > 0 && p.declineMessage !== 'decline');
    },
    async getProposal() {
      const { pagination } = this;
      const params = {status: this.tab, ...this.sortFields};
      const res = await new Proposal()
        .for(new Vendor({ id: this.vendorData.id }))
        // .for(new Vendor({ id: '60758222cfefec2676a0853d' }))
        .page(pagination.page)
        .limit(pagination.limit)
        .params(params)
        .get();
      const data = res[0];
      this.proposals = data.items;
      this.proposals.map(it => console.log('proposal', it.proposalRequestId));
      this.pagination.total = data.total;
      this.proposalTabs.map(t => {
        if (data.hasOwnProperty(t.key)) this.pagination[t.key] = data[t.key];
      })
      this.pagination.pageCount = Math.ceil(data.total / this.pagination.limit);
    },
    getProposalWithRequestId(requestId){
        if (!this.proposals.length) return null;
        return this.proposals.find(p => p.proposalRequestId === requestId)
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
    async dismiss(id){
      const res = await new ProposalRequest({
          id,
          declineMessage: 'decline',
      }).save()
      console.log('updateReq', res);
      this.proposalRequests = this.proposalRequests.filter(p => {
          return p.id !== id;
      });
    },
    async handleProposal(action, id){
      this.selectedProposal = this.proposals.find(it => it.id == id);
      if (action === 'show') {
          this.showProposalDetail = true;

      } else if (action === 'edit') {
          // this.$router.push(`/vendors/${this.selectedProposal.vendor.id}/proposal-request/${this.selectedProposal.proposalRequest.id}/form/edit`);
          let routeData = this.$router.resolve({name: 'proposalEdit', params:{
              vendorId: this.selectedProposal.vendor.id, id: this.selectedProposal.proposalRequest.id, type: 'edit'}});
          window.open(routeData.href, '_blank');

      } else if (action === 'remove') {
        this.loading = true;
        const proposal = await Proposal.find(id)
        proposal.delete();
        this.proposals = this.proposals.filter(it => it.id !== id);

        this.$forceUpdate();
        this.loading = false;

      } else if (action === 'download') {
        this.$refs.html2Pdf.generatePdf();
        //this.downloadProposal(`https://api-dev.maryoku.com/1/proposal/${this.selectedProposal.id}/download`);
      }
    },
    downloadProposal(link){
      
        window.open(
            link,
            '_blank',
        )
    },
    async init() {
        await this.getData();
        await this.getProposal();
        this.loading = false;
    }
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
    htmlToPdfOptions () {
      return {
        margin: 0,
        image: {
            type: "jpeg",
            quality: 0.98,
        },
        filename: `proposal-${this.selectedProposal ? this.selectedProposal.id : ''}`,
        enableLinks: true,

        html2canvas: {
            scale: 1,
            useCORS: true,
        },

        jsPDF: {
            unit: "in",
            format: 'a4',
            orientation: 'portrait',
        },
      }
    },
  },
  watch: {
    vendorData(newValue, oldValue) {
      console.log('vendorData', newValue);
      this.init();
    },
    proposalRequests(newVal){
      console.log('proposalRequests.watch', newVal);
      this.$forceUpdate();
    }
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

.pdf-content {
    width: 100%;
    background: #fff;
}
</style>
