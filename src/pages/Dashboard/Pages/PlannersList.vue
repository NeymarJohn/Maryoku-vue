<template>
  <div class="card planner-list-all">
    <loader :active="loading" is-full-screen />
    <h1>All planners</h1>
    <md-table v-model="planners" :md-sort.sync="sortFields.sort" :md-sort-order.sync="sortFields.order" :md-sort-fn="sort">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <md-button class="md-simple md-red maryoku-btn" @click="exportXls">
            Export XLSX
          </md-button>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input v-model="search" placeholder="Search by name..." @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>
          {{ pagination.limit * (pagination.page - 1) + getIndex(item) + 1 }}
        </md-table-cell>
        <md-table-cell md-label="Company" md-sort-by="companyName">
          {{ item.company }}
        </md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">
          {{
            item.name
          }}
        </md-table-cell>
        <md-table-cell md-label="email" md-sort-by="email">
          {{
            item.email
          }}
        </md-table-cell>
        <md-table-cell md-label="Count" md-sort-by="events">
          {{
            item.events
          }}
        </md-table-cell>
        <md-table-cell>
          <md-button class="md-icon-button md-simple collapse-button" @click="handleSelect(item)">
            <md-icon>{{ `${selectedIdx !== item.id ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}` }} </md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <div class="d-flex align-center">
      <div class="ml-auto font-size-14">
        Planners per page
      </div>
      <md-field class="w-max-80 ml-10">
        <md-select id="PlannerPerPage" v-model="pagination.limit" name="PlannerPerPage" @md-selected="updatePagination">
          <md-option :value="10">
            10
          </md-option>
          <md-option :value="25">
            25
          </md-option>
          <md-option :value="50">
            50
          </md-option>
          <md-option :value="100">
            100
          </md-option>
        </md-select>
      </md-field>
      <div>
        {{ pageNumber }}
      </div>
      <md-button class="md-icon-button md-simple collapse-button ml-10" @click="preview">
        <md-icon>keyboard_arrow_left</md-icon>
      </md-button>
      <md-button class="md-icon-button md-simple collapse-button" @click="next">
        <md-icon>keyboard_arrow_right</md-icon>
      </md-button>
    </div>
    <md-dialog-alert :md-active.sync="showAlert" md-content="Copied planner link!" md-confirm-text="Cool!" />
    <Modal v-if="showPlannerTable" container-class="modal-container no-header no-footer">
      <template slot="body">
        <EventsTable :events="plannerEvents" @close="closeModal()" />
      </template>
    </Modal>
  </div>
</template>
<script>
import Planner from "@/models/Planners";
import Event from "@/models/Event";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { VENDOR_PAGE_PAGINATION } from "@/constants/pagination";
import { PROPOSAL_STATUS } from "@/constants/status";

const components = {
    Loader: () => import("@/components/loader/Loader.vue"),
    Modal: () => import("@/components/Modal.vue"),
    EventsTable: () => import("./components/EventsTable.vue"),
    FadeTransition: () => import("vue2-transitions"),
    ProposalListItem: () => import("@/pages/app/Vendors/components/ProposalListItem"),
};


export default {
  components : {...components},
  data() {
    return {
      planners: [],
      showAlert: false,
      currentPath: location.origin,
      loading: true,
      search: "",
      selectedIdx: null,
      pagination: VENDOR_PAGE_PAGINATION,
      sortFields: { sort: "name", order: "asc" },
      plannerEvents: [],
      showPlannerTable: false,
    };
  },
  computed: {
    pageNumber() {
      return `${this.pagination.limit * (this.pagination.page - 1) + 1} - ${this.pagination.limit * this.pagination.page < this.pagination.total ?
          this.pagination.limit * this.pagination.page : this.pagination.total} of ${this.pagination.total}`; 
    }
  },
  async created() {
      if(this.$store.state.auth.user){
          this.$store.dispatch("auth/checkToken", this.$store.state.auth.user.access_token).then(user => {
              console.log("user", user);
          });
      }
      this.planners = await this.getPlanners();
  },
  methods: {
    async getPlanners() {
      this.loading = true;

      let query = new Planner();
      query.page(this.pagination.page).limit(this.pagination.limit);
      query.params({...this.sortFields, q: this.search.toLowerCase()});
      let res = await query.get();

      Object.keys(this.pagination).forEach(key => {
          this.pagination[key] = parseInt(res[0].model[key]);
      });
      this.loading = false;

      return res[0].results;
    },
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

      const exportplanners = [];
      this.planners.forEach((item, index) => {
        exportplanners.push({
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
      const ws = XLSX.utils.json_to_sheet(exportplanners);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "planners.xlsx");
    },
    async handleSelect(item){
      if ( this.selectedIdx !== item.id) {
        this.loading = true;
        this.selectedIdx = item.id;

        let query = new Event().for(new Planner({ id: item.id }));
        this.plannerEvents = await query.get();
        console.log("res", this.plannerEvents);
        this.showPlannerTable = true;
        this.loading = false;
      } else {
        this.selectedIdx = null;
      }

    },
    async searchOnTable() {
        this.pagination.page = 1;
        this.planners = await this.getPlanners();
    },
    async updatePagination(){
        this.planners = await this.getPlanners();
    },
    async next(){
        if (this.pagination.total < (this.pagination.page) * this.pagination.limit) return;
        this.pagination.page += 1;
        this.planners = await this.getPlanners();
    },
    async preview() {
        if (this.pagination.page === 1) return;
        this.pagination.page -= 1;
        this.planners = await this.getPlanners();
    },
    async sort(value) {
        console.log("sort", this.sortFields);
        this.pagination.page = 1;
        this.planners = await this.getPlanners();
    },
    getIndex (item){
        return this.planners.findIndex(v => v.id === item.id);
    },
    closeModal () {
        this.showPlannerTable = false;
        this.selectedIdx = null;
    }
  },
};
</script>
<style lang="scss" scoped>
.planner-list-all {
  h1 {
    text-align: center;
  }
  table {
    padding: 30px;
    width: 100%;
    min-width: 1200px;
  }
  .event-bg{

    .md-table-content{
      background-color: rgba(255, 255, 255, 0.64) !important;
    }
  }
}
</style>
