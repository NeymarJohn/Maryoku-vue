<template>
  <div class="card vendor-list-all">
    <loader :active="loading" is-full-screen/>
    <h1>All Vendors</h1>
    <md-button @click="exportXls" class="md-simple md-red maryoku-btn">Export XLSX</md-button>
    <md-table v-model="vendors" :md-sort.sync="currentSort" :md-sort-order.sync="currentSortOrder" :md-sort-fn="sort">

      <template slot="md-table-row" slot-scope="{ item }">
        <md-table-row :key="item.id">
          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ getIndex(item) + 1 }}</md-table-cell>
<!--          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>-->
          <md-table-cell md-label="Company" md-sort-by="companyName">{{ item.companyName }} </md-table-cell>
          <md-table-cell md-label="URL" md-sort-by="url">
            <div class="d-flex align-center">
                <a :href="`${currentPath}/#/vendor/edit/${item.id}`" target="_blank" class="mr-10">{{ item.id }}</a>
                <md-button
                class="md-simple md-red edit-btn md-just-icon"
                @click="copyUrl(`${currentPath}/#/vendor/edit/${item.id}`)"
                v-clipboard:copy="`${currentPath}/#/vendor/edit/${item.id}`"
                v-clipboard:success="onCopy"
                v-clipboard:error="onCopyError"
            ><md-icon>content_copy</md-icon></md-button>
            </div>
            </md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="vendorDisplayName">{{
            item.tenantUser ? item.tenantUser.username : ""
            }}</md-table-cell>
          <md-table-cell md-label="Category" md-sort-by="eventCategory.title">{{
            item.eventCategory ? item.eventCategory.title : ""
            }}</md-table-cell>
          <md-table-cell md-label="Email" md-sort-by="vendorMainEmail">{{ item.vendorMainEmail }}</md-table-cell>

          <md-table-cell md-label="Address" md-sort-by="vendorAddresses">{{
            item.vendorAddresses && item.vendorAddresses.length ? item.vendorAddresses[0] : ""
            }}</md-table-cell>
          <md-table-cell md-label="Count" md-sort-by="proposals">{{
                item.proposals
            }}</md-table-cell>
          <md-table-cell>
            <md-button class="md-icon-button md-simple collapse-button" @click="handleSelect(item)">
              <md-icon>{{`${selectedIdx !== item.id ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}`}} </md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>

<!--        <md-table-row class="md-table-row px-100" v-if="selectedIdx === item.id">-->
<!--              <md-table-cell colspan="9">-->
<!--               -->
<!--              </md-table-cell>-->
<!--        </md-table-row>-->
      </template>
    </md-table>
    <md-dialog-alert :md-active.sync="showAlert" md-content="Copied vendor link!" md-confirm-text="Cool!" />
    <Modal containerClass="modal-container no-header no-footer" v-if="showProposalTable">
      <template slot="body">
        <ProposalTable :proposals="vendorProposals" @close="closeModal()"></ProposalTable>
      </template>
    </Modal>
  </div>
</template>
<script>
import Vendor from "@/models/Vendors";
import Proposal from "@/models/Proposal";
import FileSaver from "file-saver";
import XLSX from "xlsx";
const ProposalTable = () => import('./components/ProposalTable')

const components = {
    Loader: () => import('@/components/loader/Loader.vue'),
    Modal: () => import('@/components/Modal.vue'),
    FadeTransition: () => import('vue2-transitions'),
    ProposalListItem: () => import('@/pages/app/Vendors/components/ProposalListItem'),
}


export default {
  components : {...components, ProposalTable},
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
      showProposalTable: false,
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
        this.showProposalTable = true;
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
    getIndex (item){
        return this.vendors.findIndex(v => v.id === item.id);
    },
    closeModal () {
        this.showProposalTable = false;
        this.selectedIdx = null;
    }
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
