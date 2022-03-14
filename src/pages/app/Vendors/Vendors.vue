<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-50">
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-warning">
          <div class="card-text">
            <h4 class="title" style="color: white">
              Vendors Pool
            </h4>
            <div class="ct-label">
              See all vendors uploaded below
            </div>
          </div>
          <div class="table table-stats vendors-actions-list">
            <md-button name="vendors-add-vendor" class="vendors-add-vendor md-info" @click="openInviteModal">
              Add Vendor
            </md-button>
            <md-button name="vendors-upload-vendors" class="vendors-upload-vendors md-info" @click="openUploadModal">
              Upload Excel File
            </md-button>
          </div>
        </md-card-header>
        <md-switch
          v-model="myVendors"
          class="md-switch-info pull-right text-right"
          style="padding: 0; margin: 12px"
          @change="fetchData(1)"
        >
          My vendors
        </md-switch>
        <md-card-content style="min-height: 60px">
          <Loader :active="loadingData" page="vendor" />
          <vendors-table
            v-if="vendorsList"
            ref="VendorsTable"
            :tooltip-models="tooltipModels"
            :vendors-list="vendorsList"
            :fetch-vendors="fetchData"
            mode="listing"
            :building-blocks-list="buildingBlocksList"
            @select-vendor="onSelectVendor"
            @close-vendor="onCloseVendorForm"
          />
          <md-card-actions v-if="pagination.limit < pagination.total" md-alignment="space-between">
            <div class="">
              <p class="card-category">
                Showing {{ pagination.from }} to
                {{ numberOfRecords }} of
                {{ pagination.total }} records
              </p>
            </div>
            <pagination
              v-model="pagination.page"
              class="pagination-no-border pagination-info"
              :per-page="pagination.limit"
              :total="pagination.total"
              @input="pageChanged($event)"
            />
          </md-card-actions>
        </md-card-content>
      </md-card>
    </div>
    <div v-if="vendor_selected || add_vendor" class="md-layout-item md-size-50">
      <company-form
        :categories.sync="buildingBlocksList"
        :selected_vendor="selected_vendor"
        :creation_mode="add_vendor"
        @vendorCreated="fetchData(1)"
        @selectVendor="onSelectVendor"
      />
    </div>
    <create-modal ref="inviteModal" @vendorCreated="fetchData(1)" />
    <upload-modal ref="uploadModal" @vendorImported="fetchData(1)" />
  </div>
</template>

<script>
import CreateModal from "./CreateModal";
import { mapMutations } from "vuex";
import VendorsTable from "./Table/vendorsList";
import companyForm from "./Form/companyForm.vue";
import UploadModal from "./ImportVendors";
import { Loader, Pagination } from "@/components";
import Vendors from "@/models/Vendors";
import EventComponent from "@/models/EventComponent";
import { paginationMixins } from "@/mixins";

export default {
  components: {
    CreateModal,
    "vendors-table": VendorsTable,
    Loader,
    UploadModal,
    Pagination,
    companyForm,
  },
  mixins: [paginationMixins],
  data() {
    return {
      // auth: auth,
      vendorsList: [],
      tooltipModels: [],
      loadingData: true,
      importClicked: false,
      tableHidden: true,
      selected_vendor: {},
      add_vendor: false,
      vendor_selected: false,
      buildingBlocksList: [],
      myVendors: false,
    };
  },
  computed: {
    numberOfRecords() {
      return this.pagination.limit < this.pagination.total ? this.pagination.limit : this.pagination.total;
    }
  },
  created() {
    this.$auth.currentUser(
      this,
      true,
      function () {
        this.fetchData(0);
      }.bind(this),
    );
  },
  methods: {
    ...mapMutations("vendors", ["resetForm"]),

    fetchData(page, catId = "") {
      this.loadingData = true;

      new EventComponent().get().then((res) => {
        let list = [];
        res.forEach((parentBuildingBlock) => {
          /* parentBuildingBlock.childComponents.forEach((bb)=>{
              list.push({id: bb.id, value: bb.title});
          }); */
          list.push({
            id: parentBuildingBlock.id,
            value: parentBuildingBlock.value,
          });
        });
        this.buildingBlocksList = list;
      });

      Vendors.page(page)
        .limit(this.pagination.limit)
        .params({
          vendorCategory: catId,
          shared: !this.myVendors,
        })
        .get()
        .then(
          (vendors) => {
            this.vendorsList = vendors[0].results;

            this.updatePagination(vendors[0].model);
            this.loadingData = false;

            this.vendorsList.map((item, index) => {
              this.tooltipModels.push({
                value: false,
                textarea: "",
                rankingParameters: [
                  {
                    name: "Overal Experience",
                    parameterName: "overal_experience",
                    value: "",
                  },
                  {
                    name: "Cleanliness and Maintenance",
                    parameterName: "cleanliness_and_maintenance",
                    value: "",
                  },
                  {
                    name: "Accuracy",
                    parameterName: "accuracy",
                    value: "",
                  },
                  {
                    name: "Value for money",
                    parameterName: "value_for_money",
                    value: "",
                  },
                  {
                    name: "Service",
                    parameterName: "service",
                    value: "",
                  },
                  {
                    name: "Location & Parking",
                    parameterName: "location_parking",
                    value: "",
                  },
                ],
              });
            });
          },
          (error) => {
            console.error(error);
          },
        );
    },
    openInviteModal() {
      //        this.$refs.inviteModal.toggleModal(true);
      //        this.resetForm();
      this.$set(this, "vendor_selected", false);
      this.$set(this, "selected_vendor", {});
      this.$set(this, "add_vendor", true);
      this.$refs.VendorsTable.resetSelectedVendor({});
    },
    openUploadModal() {
      this.$refs.uploadModal.toggleModal(true);
    },
    onSelectVendor(data) {
      this.$set(this, "vendor_selected", true);
      this.$set(this, "selected_vendor", data);
      this.$set(this, "add_vendor", false);
    },
    onCloseVendorForm(data) {
      this.$set(this, "vendor_selected", false);
      this.$set(this, "selected_vendor", {});
      this.$set(this, "add_vendor", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.md-table-head-label {
  font-weight: 500;
}
</style>
