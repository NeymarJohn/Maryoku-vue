<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <div class="table table-stats text-right">
        <div class="text-right">
          <md-button class="md-success text-rose" @click="openInviteModal">
            <md-icon>add</md-icon>
            Create New
          </md-button>
          <md-button @click="openUploadModal" class="md-success">
            <md-icon>cloud_upload</md-icon>
            Upload Vendors
          </md-button>
        </div>
      </div>
      <md-card>
        <md-card-content style="min-height: 60px;">
          <vue-element-loading :active="teamMembersLoading" spinner="ring" color="#FF547C"/>

          <vendors-table
                  :tooltipModels="tooltipModels"
                  :vendorsList="vendorsList">

          </vendors-table>
          <md-card-actions md-alignment="space-between">
            <div class="">
              <p class="card-category">Showing {{ pagination.currentPage }} to {{ pagination.currentPage + 1 }} of {{ pagination.total }} entries</p>
            </div>
            <pagination class="pagination-no-border pagination-success"
                        v-model="pagination.currentPage"
                        :per-page="pagination.perPage"
                        :total="pagination.total">
            </pagination>
          </md-card-actions>

        </md-card-content>
      </md-card>
    </div>
    <create-modal @vendorCreated="fetch"  ref="inviteModal"></create-modal>
    <upload-modal @vendorImported="fetch"  ref="uploadModal"></upload-modal>
    </div>
</template>

<script>
  import CreateModal from './CreateModal';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import VendorsTable from './Table';
  import UploadModal from './ImportVendors';
  import { Pagination } from "@/components"
  import Vendors from "@/models/Vendors";
  import VendorCategories from "@/models/VendorCategories";
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';
  import PaginationConstants from '@/constants/pagination'


  export default {
    components: {
      CreateModal,
      'vendors-table': VendorsTable,
      VueElementLoading,
      UploadModal,
      Pagination
    },
    data() {
      return {
        auth: auth,
        vendorsList: [],
        tooltipModels: [],
        teamMembersLoading: true,
        importClicked: false,
        tableHidden: true,
        pagination: {
          perPage: PaginationConstants.VENDORS_PER_PAGE,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0
        },
      }
    },
    created() {
      this.auth.currentUser(this, true, function(){
        this.fetch();
      }.bind(this));
    },
    methods: {
      ...mapMutations('vendors', ['resetForm']),
      fetch() {
        Vendors.page(1)
          .limit(this.pagination.perPage)
          .get().then(vendors => {
          this.vendorsList = vendors;
          this.teamMembersLoading = false;
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
      }
  };
</script>
<style >
  .md-table-head-label {
    font-weight: 500;
  }
</style>
