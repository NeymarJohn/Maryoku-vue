<template>
  <div class="card vendor-list-all">
    <loader :active="loading" is-full-screen/>
    <h1>All Vendors</h1>
    <md-button @click="exportXls" class="md-simple md-red maryoku-btn">Export XLSX</md-button>
    <md-table v-model="vendors" :md-sort.sync="currentSort" :md-sort-order.sync="currentSortOrder" :md-sort-fn="sort">
        <md-table-row>
            <md-table-head md-numeric>No</md-table-head>
            <md-table-head>Company Name</md-table-head>
            <md-table-head>URL</md-table-head>
            <md-table-head>User Name</md-table-head>
            <md-table-head>Business Catgory</md-table-head>
            <md-table-head>Email</md-table-head>
            <md-table-head>Address</md-table-head>
            <md-table-head>Proposals</md-table-head>
        </md-table-row>
      <template v-for="(item, index) in vendors">
        <md-table-row v-if="selectedIdx !== item.id" :key="item.id">
          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ index + 1 }}</md-table-cell>
<!--          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>-->
          <md-table-cell md-label="Company Name" md-sort-by="companyName">{{ item.companyName }} </md-table-cell>
          <md-table-cell md-label="URL" md-sort-by="url">
            <a :href="`${currentPath}/#/vendor/edit/${item.id}`" target="_blank">{{
              `${currentPath}/#/vendor/edit/${item.id}`
              }}</a>
            &emsp;<md-button
                  class="md-simple md-red edit-btn md-just-icon"
                  @click="copyUrl(`${currentPath}/#/vendor/edit/${item.id}`)"
                  v-clipboard:copy="`${currentPath}/#/vendor/edit/${item.id}`"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onCopyError"
          ><md-icon>content_copy</md-icon></md-button
          ></md-table-cell
          >
          <md-table-cell md-label="User Name" md-sort-by="vendorDisplayName">{{
            item.tenantUser ? item.tenantUser.username : ""
            }}</md-table-cell>
          <md-table-cell md-label="Business Category" md-sort-by="eventCategory.title">{{
            item.eventCategory ? item.eventCategory.title : ""
            }}</md-table-cell>
          <md-table-cell md-label="Main Email" md-sort-by="vendorMainEmail">{{ item.vendorMainEmail }}</md-table-cell>

          <md-table-cell md-label="Address" md-sort-by="vendorAddresses">{{
            item.vendorAddresses && item.vendorAddresses.length ? item.vendorAddresses[0] : ""
            }}</md-table-cell>
          <md-table-cell md-label="Proposals" md-sort-by="proposals">{{
                item.proposals
            }}</md-table-cell>
          <md-table-cell>
            <md-button class="md-icon-button md-simple collapse-button" @click="handleSelect(item)">
              <md-icon>{{`${selectedIdx !== item.id ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}`}} </md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>

        <template v-else>
          <md-table-row>
            <md-table-cell md-label="NO" md-sort-by="id" md-numeric>{{ index + 1 }}</md-table-cell>
            <md-table-cell md-label="Company Name" md-sort-by="companyName">{{ item.companyName }} </md-table-cell>
            <md-table-cell md-label="User Name" md-sort-by="vendorDisplayName">
            <a :href="`${currentPath}/#/vendor/edit/${item.id}`" target="_blank">{{
            `${currentPath}/#/vendor/edit/${item.id}`
            }}</a>
            &emsp;<md-button
            class="md-simple md-red edit-btn md-just-icon"
            @click="copyUrl(`${currentPath}/#/vendor/edit/${item.id}`)"
            v-clipboard:copy="`${currentPath}/#/vendor/edit/${item.id}`"
            v-clipboard:success="onCopy"
            v-clipboard:error="onCopyError"
            ><md-icon>content_copy</md-icon></md-button

            ></md-table-cell
            >
            <md-table-cell md-label="User Name" md-sort-by="vendorDisplayName">{{
            item.tenantUser ? item.tenantUser.username : ""
            }}</md-table-cell>
            <md-table-cell md-label="Business Category" md-sort-by="eventCategory.title">{{
            item.eventCategory ? item.eventCategory.title : ""
            }}</md-table-cell>
            <md-table-cell md-label="Main Email" md-sort-by="vendorMainEmail">{{ item.vendorMainEmail }}</md-table-cell>

            <md-table-cell md-label="Address" md-sort-by="vendorAddresses">{{
            item.vendorAddresses && item.vendorAddresses.length ? item.vendorAddresses[0] : ""
            }}</md-table-cell>
            <md-table-cell md-label="Proposals" md-sort-by="proposals">{{
              item.proposals
            }}</md-table-cell>
            <md-table-cell>
            <md-button class="md-icon-button md-simple collapse-button" @click="handleSelect(item)">
            <md-icon>{{`${selectedIdx !== item.id ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}`}} </md-icon>
            </md-button>
            </md-table-cell>
          </md-table-row>

          <tr class="md-table-row px-100" :key="item.id">
            <td colspan="9">
              <md-table class="px-100 proposal-bg">
                <md-table-row>
                  <md-table-head>Id</md-table-head>
                  <md-table-head>Event Name</md-table-head>
                  <md-table-head>Created</md-table-head>
                  <md-table-head>Cost</md-table-head>
                  <md-table-head>Updated</md-table-head>
                  <md-table-head>Status</md-table-head>
                  <md-table-head>Owner</md-table-head>
                  <md-table-head>score</md-table-head>
                </md-table-row>
                <md-table-row v-for="proposal in vendorProposals" :key="proposal.id">
                  <md-table-cell>{{proposal.id}}</md-table-cell>
                  <md-table-cell>
                    <div class="font-bold font-size-16" v-if="proposal.nonMaryoku && proposal.eventData && proposal.eventData.customer">
                      {{ proposal.eventData.customer.companyName }}
                    </div>
                    <div class="font-bold font-size-16" v-else-if="proposal.proposalRequest && proposal.proposalRequest.eventData.title">
                      {{ proposal.proposalRequest.eventData.title }}
                    </div>
                    <div class="font-bold font-size-16" v-else>New Event</div>
                  </md-table-cell>
                  <md-table-cell>{{ proposal.dateCreated | date("DD/MM/YYYY") }}</md-table-cell>
                  <md-table-cell>${{ proposal.cost | withComma }}</md-table-cell>
                  <md-table-cell>{{ proposal.lastUpdated | date("DD/MM/YYYY") }}</md-table-cell>
                  <md-table-cell><img class="ml-15" :src="getStatusIcon(proposal.status)" /></md-table-cell>
                  <md-table-cell>
                    <span v-if="proposal.proposalRequest && proposal.proposalRequest.eventData && proposal.proposalRequest.eventData.owner">
                      {{ proposal.proposalRequest.eventData.owner.name }}
                    </span>
                    <span v-else-if="proposal.eventData">
                      {{ proposal.eventData.customer ? proposal.eventData.customer.name : "" }}
                    </span>
                  </md-table-cell>
                  <md-table-cell><span v-if="proposal.score">{{proposal.score}}</span></md-table-cell>
                </md-table-row>
              </md-table>
            </td>
          </tr>
        </template>
      </template>
    </md-table>
    <md-dialog-alert :md-active.sync="showAlert" md-content="Copied vendor link!" md-confirm-text="Cool!" />
  </div>
</template>
<script>
import Vendor from "@/models/Vendors";
import Proposal from "@/models/Proposal";
import FileSaver from "file-saver";
import XLSX from "xlsx";

import { PROPOSAL_STATUS } from "@/constants/status";

const components = {
    Loader: () => import('@/components/loader/Loader.vue'),
    FadeTransition: () => import('vue2-transitions'),
    ProposalListItem: () => import('@/pages/app/Vendors/components/ProposalListItem'),
}


export default {
  components,
  data() {
    return {
      vendors: null,
      showAlert: false,
      currentPath: location.origin,
      loading: true,
      currentSort: 'name',
      currentSortOrder: 'asc',
      selectedIdx: null,
      sortFields: { sort: "", order: "" },
      vendorProposals: [],
      proposalHeaders: [
        { key: "number", title: "Number" },
        { key: "date", title: "Date" },
        { key: "event", title: "Event" },
        { key: "status", title: "Status" },
        { key: "cost", title: "Value" },
        { key: "owner", title: "Owner" },
        { key: "", title: "" },
      ],
    };
  },
  created() {
    new Vendor().get().then((vendors) => {
      console.log("vendors", vendors);
      this.vendors = vendors[0].results;
      this.loading = false;
    });
  },
  methods: {
    copyUrl(url) {},
    onCopy() {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    },
    onCopyError() {},
    exportXls() {
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      const exportVendors = [];
      this.vendors.forEach((item, index) => {
        exportVendors.push({
          number: index + 1,
          companyName: item.companyName,
          editUrl: `${this.currentPath}/#/vendor-signup/edit/${item.id}`,
          userName: item.vendorDisplayName,
          category: item.eventCategory ? item.eventCategory.title : "",
          email: item.vendorMainEmail,
          address: item.vendorAddresses[0],
          contactPerson: item.contactPerson,
        });
      });
      const ws = XLSX.utils.json_to_sheet(exportVendors);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "vendors.xlsx");
    },
    async handleSelect(item){
      console.log('handleSelect', item)
      if ( this.selectedIdx !== item.id) {
        this.loading = true;
        this.selectedIdx = item.id;

        let query = new Proposal().for(new Vendor({ id: item.id }));
        this.vendorProposals = await query.get();
        this.loading = false;
      } else {
        this.selectedIdx = null;
      }

    },
    async selectSort(sortField) {
      if (!sortField) return;

      if (this.sortFields.sort !== sortField) {
        this.$set(this.sortFields, "sort", sortField);
        this.$set(this.sortFields, "order", "asc");
      } else {
        this.sortFields["order"] = this.sortFields["order"] === "desc" ? "asc" : "desc";
      }
    },
    sort(value) {
        return value.sort((a, b) => {
            const sortBy = this.currentSort

            if (this.currentSortOrder === 'desc') {
                return a[sortBy].toString().localeCompare(b[sortBy].toString())
            }

            return b[sortBy].toString().localeCompare(a[sortBy].toString())
        })
    },
    getStatusIcon(status) {
      let path = "/static/icons/vendor/proposalBoard/";
      if ( status === PROPOSAL_STATUS.PENDING ) {
        return `${path}filter-pending.svg`;
      } else if ( status === PROPOSAL_STATUS.TOP3) {
        return `${path}filter-top3.svg`;
      } else if ( status === PROPOSAL_STATUS.LOST ) {
        return `${path}filter-reject.svg`;
      } else if ( status === PROPOSAL_STATUS.WON ) {
        return `${path}filter-won.svg`;
      } else {
        return `${path}filter-${status}.svg`;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.vendor-list-all {
  h1 {
    text-align: center;
  }
  table {
    padding: 30px;
    width: 100%;
    min-width: 1200px;
  }
  .proposal-bg{

    .md-table-content{
      background-color: rgba(255, 255, 255, 0.64) !important;
    }
  }
}
</style>
