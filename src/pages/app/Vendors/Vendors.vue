<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-50">
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-warning">

          <div class="card-text">
            <h4 class="title" style="color: white;">Vendors List</h4>
            <div class="ct-label">See all vendors uploaded below</div>
          </div>

          <div class="table table-stats text-right vendors-actions-list">
            <md-button class="md-default text-rose" @click="openInviteModal">
              Add Vendor
            </md-button>
            <md-button @click="openUploadModal" class="md-default">
              Upload Excel File
            </md-button>
          </div>

        </md-card-header>
        <md-card-content style="min-height: 60px;">
          <vue-element-loading :active="loadingData" spinner="ring" color="#FF547C"/>

          <vendors-table
                  :tooltipModels="tooltipModels"
                  @select-vendor="onSelectVendor"
                  :vendorsList="vendorsList">

          </vendors-table>
          <md-card-actions md-alignment="space-between">
            <div class="">
              <p class="card-category">Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} entries</p>
            </div>
            <pagination class="pagination-no-border pagination-success"
                        @input="pageChanged($event)"
                        v-model="pagination.page"
                        :per-page="pagination.limit"
                        :total="pagination.total">
            </pagination>
          </md-card-actions>

        </md-card-content>
      </md-card>
    </div>

    <div class="md-layout-item md-size-50" v-if="vendor_selected">
      <company-form :selected_vendor="selected_vendor"></company-form>
    </div>
    <create-modal @vendorCreated="fetchData(1)"  ref="inviteModal"></create-modal>
    <upload-modal @vendorImported="fetchData(1)"  ref="uploadModal"></upload-modal>
    </div>
</template>

<script>
  import CreateModal from './CreateModal';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import VendorsTable from './Table/vendorsList.vue';
  import companyForm from './Form/companyForm.vue';
  import UploadModal from './ImportVendors';
  import { Pagination } from "@/components"
  import Vendors from "@/models/Vendors";
  import VendorCategories from "@/models/VendorCategories";
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';
  import { paginationMixin } from '@/mixins/pagination'


  export default {
    components: {
      CreateModal,
      'vendors-table': VendorsTable,
      VueElementLoading,
      UploadModal,
      Pagination,
        companyForm
    },
    mixins: [paginationMixin],
    data() {
      return {
        auth: auth,
        vendorsList: [],
        tooltipModels: [],
        loadingData: true,
        importClicked: false,
        tableHidden: true,
        selected_vendor : {},
          vendor_selected : false
      }
    },
    created() {
      this.auth.currentUser(this, true, function(){
        this.fetchData(1);
      }.bind(this));
    },
    methods: {
      ...mapMutations('vendors', ['resetForm']),

      fetchData(page) {
        this.loadingData = true;

        Vendors.page(page)
          .limit(this.pagination.limit)
          .get().then(vendors => {

              console.log('vendors => ', vendors);

          this.vendorsList = vendors[0].results;

          this.updatePagination(vendors[0].model)
          this.loadingData = false;

          this.vendorsList.map((item, index) => {
            this.tooltipModels.push({
              value: false,
              textarea: '',
              rankingParameters: [
                {
                  name: 'Overal Experience',
                  parameterName: 'overal_experience',
                  value: ''
                },
                {
                  name: 'Cleanliness and Maintenance',
                  parameterName: 'cleanliness_and_maintenance',
                  value: ''

                },
                {
                  name: 'Accuracy',
                  parameterName: 'accuracy',
                  value: ''

                },
                {
                  name: 'Value for money',
                  parameterName: 'value_for_money',
                  value: ''

                }, {
                  name: 'Service',
                  parameterName: 'service',
                  value: ''

                },
                {
                  name: 'Location & Parking',
                  parameterName: 'location_parking',
                  value: ''

                },


              ],

            })
          });
        }, (error) => {
          console.log(error)
        });
      },
      openInviteModal(){
        this.$refs.inviteModal.toggleModal(true);
        this.resetForm();
      },
      openUploadModal(){
        this.$refs.uploadModal.toggleModal(true);
      }
      ,onSelectVendor(data) {
          this.$set(this,'vendor_selected',true);
          this.$set(this,'selected_vendor',data);
        }
      }
  };
</script>
<style lang="scss" scoped>
  .md-table-head-label {
    font-weight: 500;
  }
</style>
