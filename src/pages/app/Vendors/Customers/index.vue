<template>
  <div class="vendor-customer-board p-40">
    <loader :active="loading" :isFullScreen="true" />
    <div class="font-size-22 font-bold d-flex align-center">
      <img :src="`${$iconURL}CustomerList/group-19735.svg`" class="mr-10" /> CUSTOMERS
      <md-button class="ml-auto md-simple md-black md-maryoku mr-15">Import Customers List</md-button>
      <md-button class="md-vendor md-maryoku mr-15" @click="createNewCustomer">Add New Customers</md-button>
    </div>
    <div class="customer-table pl-50">
      <div class="md-layout mt-10">
        <div class="md-layout-item md-size-70 pr-30 d-flex flex-column">
          <div class="filter-bar mt-30 mb-20">
            <md-button
              v-for="tab in customerTabs"
              :key="tab.key"
              class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20"
              @click="selectTab(tab.value)"
            >
              <div class="d-flex align-center px-30 py-10 font-size-16" :class="tab.class">
                <img
                    class="mr-10"
                    :src="`${$iconURL}${tab.icon}`"
                    width="24px"
                />
                {{ tab.title }}
                <span v-if="tab.key == 'all'" class="ml-5" :class="tab.class">({{ pagination.total }})</span>
                <span v-else class="ml-5" :class="tab.class">({{ pagination[tab.key] }})</span>
              </div>
            </md-button>
          </div>
          <div class="sort-bar px-40">
            <span
              v-for="it in customerHeaders"
              class="sort-item font-size-16"
            >
              {{ it.title }}
<!--              <md-icon v-if="it.key && it.key != 'update' && sortFields['sort'] == it.key" class="color-black">-->
<!--                {{ sortFields["order"] == "asc" ? "keyboard_arrow_up" : "keyboard_arrow_down" }}</md-icon-->
<!--              >-->
<!--              <md-icon v-if="it.key && it.key != 'update' && sortFields['sort'] != it.key" class="color-black-middle">-->
<!--                keyboard_arrow_down-->
<!--              </md-icon>-->
            </span>
          </div>
          <div v-if="!loading">
            <div class="md-20 customer-list">
              <template v-for="(object, key) in customerObject">
                  <div class="customer-mark font-size-20 font-bold-extra mb-1">{{object.group.toUpperCase()}}</div>
                  <vsa-list>
                      <customer-list-item
                          v-for="customer in object.children"
                          :customer="customer"
                          :sort-fields="sortFields"
                          :key="customer.id"
                          class="row"
                          @customerAction="handleCustomer"
                          @proposalAction="handleProposal"
                          @click="selectCustomer(customer)"
                      ></customer-list-item>
                  </vsa-list>

              </template>
            </div>
          </div>
          <div v-if="customers.length < 2" class="my-auto d-flex flex-column align-center">
            <img class="mb-0" :src="`${iconUrl}CustomerList/group-19735.svg`" width="30px"/>
            <p class="text-transform-uppercase font-size-14">No More CUSTOMERS To Show</p>
            <md-button class="md-vendor" @click="createNewCustomer">Add New CUSTOMERS</md-button>
          </div>
        </div>
        <div class="md-layout-item md-size-30 mt-30">
          <insight
            :total="pagination.total"
            :won="0"
          ></insight>
        </div>
      </div>
<!--      <div class="md-layout">-->
<!--        <div class="md-layout-item md-size-75">-->
<!--          <div class="text-center">-->
<!--            <table-pagination-->
<!--              v-if="pagination.pageCount"-->
<!--              class="mt-30"-->
<!--              :pageCount="pagination.pageCount"-->
<!--              :clickHandler="gotoPage"-->
<!--            ></table-pagination>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="md-layout-item md-size-25"></div>-->
<!--      </div>-->
    </div>
      <modal v-if="showProposalDetail" container-class="modal-container-wizard lg">
          <template slot="body">
              <proposal-content
                  :vendorProposal="selectedProposal" @close="showProposalDetail = false" />
          </template>
      </modal>
      <modal v-if="showNewCustomerModal" container-class="modal-container customer-form bg-white">
          <template slot="body">
              <customer-form
                  :customer="selectedCustomer"
                  @save="saveCustomer" @close="showNewCustomerModal = false" />
          </template>
      </modal>
  </div>
</template>
<script>
import Customer from "@/models/Customer"
import ProposalListItem from "../components/ProposalListItem.vue";
import carousel from "vue-owl-carousel";
import { Loader, TablePagination, Modal } from "@/components";
import _ from "underscore";
const CustomerListItem = () => import("../components/CustomerListItem");
const ProposalContent = () => import("../components/ProposalDetail");
const CustomerForm = () => import("./CustomerForm");
import { VsaList } from "vue-simple-accordion";
const Insight = () => import("./insight");

export default {
  components: {
    ProposalListItem,
    TablePagination,
    CustomerListItem,
    ProposalContent,
    CustomerForm,
    VsaList,
    carousel,
    Loader,
    Modal,
    Insight,
  },
  data() {
    return {
      loading: true,
      iconUrl: `${this.$iconURL}`,
      customerTabs: [
        { key: "all", value: 0, title: "All customers", icon: "Group 19735.svg", class: "color-purple" },
        { key: "returning", value: 1, title: "Returning", icon: "Path 3984.svg", class: "color-black-middle" },
        { key: "new", value: 2, title: "New", icon: "Group 19776.svg", class:"color-black-middle" },
        { key: "potential", value: 3, title: "Potential", icon: "Group 19780.svg", class: "color-blue" },
      ],
      customerHeaders: [
        { key: "", title: "" },
        { key: "name", title: "Name" },
        { key: "ein", title: "EIN" },
        { key: "incomes", title: "Incomes" },
        { key: "contact", title: "Contact" },
        { key: "bids", title: "Bids" },
        { key: "status", title: "Status" },
        { key: "", title: "" },
      ],
      tab: 0,
      showProposalDetail: false,
      selectedProposal: null,
      selectedCustomer: null,
      showNewCustomerModal: null,
      customerStatus:{
        show: 0,
        edit: 1,
        download: 2,
        delete: 3,
        negotiation: 4,
      },
      proposalStatus:{
          show: 0,
          edit: 1,
          download: 2,
          delete: 3,
          negotiation: 4,
          duplicate: 5,
          sort: 6,
      },
      pagination: {
        total: 0,
        returning: 0,
        new: 0,
        potential: 0,
        pageCount: 0,
        page: 0,
        limit: 6,
      },
      sortFields: { sort: "", order: "" },
    };
  },
  async mounted() {
    // console.log('mounted', this.vendorData.id);
    await this.init();
  },
  methods: {
    async getCustomer() {
      const { pagination } = this;
      const params = { status: this.tab, ...this.sortFields, customerType: 0 };
      const data = await this.$store.dispatch("vendorDashboard/getCustomers", {
        vendorId: this.vendorData.id,
        params
      });

      this.pagination.total = data.total;
      this.customerTabs.map((t) => {
        if (data.hasOwnProperty(t.key)) this.pagination[t.key] = data[t.key];
      });
      this.pagination.pageCount = Math.ceil(data.total / this.pagination.limit);
    },
    gotoPage(selectedPage) {
      console.log(selectedPage);
      this.pagination.page = selectedPage;
      this.getCustomer();
    },
    async selectTab(tab) {
      this.loading = true;
      this.tab = tab;
      await this.getCustomer();
      this.loading = false;
    },

    selectCustomer(customer){
      console.log('selectCustomer', customer);
      this.selectedCustomer = customer;
    },

    async handleCustomer(data) {
    },

    async handleProposal(data){
      console.log('handleProposal', data);

      if(data.action === this.proposalStatus.show){
        for(let i = 0; i < this.customers.length; i ++) {
            this.selectedProposal = this.customers[i].proposals.find(p => p.id === data.proposalId);

            if(this.selectedProposal){
                this.selectedProposal.proposalRequest = this.proposalRequests.find(it =>
                    it.id === this.selectedProposal.proposalRequestId);
                this.showProposalDetail = true;
                break;
            }
        }

      } else if (data.action === this.proposalStatus.download) {
        this.openNewTab(`https://api-dev.maryoku.com/1/proposal/${data.proposalId}/download`);
      } else if (data.action === this.proposalStatus.duplicate) {

      } else if (data.action === this.proposalStatus.sort) {
          this.loading = true;
          this.sortField = data.sortField;
          await this.getCustomer();
          this.loading = false;
      }

    },
    createNewCustomer() {
      this.showNewCustomerModal = true;
    },
    async saveCustomer(customer){
      console.log('saveCustomer', customer);
        if(customer.email && customer.companyName && customer.name){
            let customerInstance  = new Customer({...customer, vendorId: this.vendorData.id})
            await customerInstance.save();
            this.showNewCustomerModal = false;

            this.loading = true;
            await this.getCustomer()
            this.loading = false;
        }

    },
    openNewTab(link) {
      window.open(link, "_blank");
    },
    eventDate() {

    },
    isSocial() {

    },
    headerBackgroundImage() {
    },
    async init() {
      await this.getCustomer();
      this.loading = false;
    },
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
    customers(){
      return this.$store.state.vendorDashboard.customers;
    },
    proposalRequests(){
      return this.$store.state.vendorDashboard.proposalRequests;
    },
    customerObject(){
      if(!this.customers) return {}
      return this.customers.reduce((r, e) => {
          let group = e.companyName[0];
          if(!r[group]) r[group] = {group, children: [e]}
          else r[group].children.push(e);
          return r;
      }, {})
    },
    expiredTime(){
    },
  },
  watch: {
  },
  updated() {
    // remove empty item in proposal-request carousel
  },
};
</script>
<style lang="scss" scoped>
.vendor-customer-board {
  .sort-bar {
    height: 50px;
    display: grid;
    align-items: center;
      grid-template-columns: 7% 15% 15% 15% 15% 15% 10% 8%;
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
  .customer-mark:after{
    content:"";
    display: inline-block;
    height: 0.5em;
    vertical-align: bottom;
    width: 97%;
    margin-right: -95%;
    margin-left: 10px;
    border-top: 1px solid #707070;
  }
  .tips {
    img {
      height: 20px;
    }
  }
  .border-right{
   border-right: 1px solid #050505;
  }
}
.vsa-list {
    --vsa-heading-padding: 1rem 2.5rem;
    --vsa-content-padding: 1rem 2.5rem;
    border: none;
    .vsa-item {
        border: none;
        box-shadow: none;
    }
    /deep/ .vsa-item__heading {
        border: none;
        cursor: pointer;
        .vsa-item__trigger {
            background-color: white;
            border: none;
            color: black;
            box-shadow: none;
            padding: 0;
            width: 100%;
        }
    }
}
</style>
