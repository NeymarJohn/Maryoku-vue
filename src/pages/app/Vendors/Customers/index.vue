<template>
  <div class="vendor-customer-board p-40">
    <loader :active="loading" :isFullScreen="true" />
    <div class="font-size-22 font-bold d-flex align-center">
      <img :src="`${$iconURL}CustomerList/group-19735.svg`" class="mr-10" /> CUSTOMERS
      <md-button class="ml-auto md-simple md-black md-maryoku mr-15">Import Customers List</md-button>
      <md-button class="md-vendor md-maryoku mr-15" @click="createNewProposal">Add New Customers</md-button>
    </div>
    <div class="customer-table pl-50">
      <div class="md-layout mt-10">
        <div class="md-layout-item md-size-70 p-0 d-flex flex-column">
          <div class="filter-bar mt-30 mb-20">
            <md-button
              v-for="tab in customerTabs"
              :key="tab.key"
              class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20"
              @click="selectTab(tab.key)"
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
              :class="{ selected: it.key && sortFields['sort'] == it.key, 'text-center': it.key == 'update' }"
              @click="selectSort(it.key)"
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
            <div class="md-20 customer-list pr-30">
              <customer-list-item
                v-for="customer in customers"
                :customer="customer"
                :key="customer.id"
                class="row"
                @action="handleCustomer"
              ></customer-list-item>
            </div>
          </div>
<!--          <div v-if="this.customers.length < 4" class="my-auto d-flex flex-column align-center">-->
<!--            <img class="mb-0" :src="`${iconUrl}vendordashboard/group-17116.png`" />-->
<!--            <p class="text-transform-uppercase font-size-14">No More To Show</p>-->
<!--            <md-button class="md-vendor" @click="createNewProposal">Create New Proposal</md-button>-->
<!--          </div>-->
        </div>
        <div class="md-layout-item md-size-30 mt-30">
          <insight
            :total="pagination.total"
            :won="0"
          ></insight>
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
import ProposalListItem from "../components/ProposalListItem.vue";
import carousel from "vue-owl-carousel";
import { Loader, TablePagination, Modal } from "@/components";
import _ from "underscore";
const CustomerListItem = () => import("../components/CustomerListItem");
const Insight = () => import("./insight");

export default {
  components: {
    ProposalListItem,
    TablePagination,
    CustomerListItem,
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
        { key: "all", title: "All customers", icon: "Group 19735.svg", class: "color-black-middle" },
        { key: "returning", title: "Returning", icon: "Path 3984.svg", class: "color-black-middle" },
        { key: "new", title: "New", icon: "Group 19776.svg", class:"color-black-middle" },
        { key: "potential", title: "Potential", icon: "Group 19780.svg", class: "color-blue" },
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
      tab: "all",

      customerStatus:{
        show: 0,
        edit: 1,
        download: 2,
        delete: 3,
        negotiation: 4,
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
      const params = { status: this.tab, ...this.sortFields };
      const data = await this.$store.dispatch("vendorDashboard/getCustomers", this.vendorData.id);

      this.pagination.total = data.length;
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
    async selectSort(sortField) {

      // if (!sortField || sortField == "update") return;
      // this.loading = true;
      // if (this.sortFields.sort !== sortField) {
      //   this.$set(this.sortFields, "sort", sortField);
      //   this.$set(this.sortFields, "order", "asc");
      // } else {
      //   this.sortFields["order"] = this.sortFields["order"] === "desc" ? "asc" : "desc";
      // }
      // await this.getCustomer();
      // this.loading = false;
    },
    async handleCustomer(action, id) {

    },

    createNewProposal() {
      let routeData = this.$router.resolve({
        name: "outsideProposalCreate",
        params: {
          vendorId: this.vendorData.id,
        },
      });
      this.openNewTab(routeData.href);
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
  .customer-list {
    .customer-list-item:not(:last-child) {
      border-bottom: solid 1px #dbdbdb;
    }
  }
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
  .tips {
    img {
      height: 20px;
    }
  }
  .border-right{
   border-right: 1px solid #050505;
  }
}
</style>
