<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <div class="table table-stats text-right">
        <div class="text-right">
          <md-button class="md-rose text-rose" @click="openInviteModal">
            <md-icon>add</md-icon>
            Create New
          </md-button>
          <md-button @click="$router.push({ path: 'import-vendors' });" class="md-rose">
            <md-icon>cloud_upload</md-icon>
            Upload Vendors
          </md-button>
        </div>
      </div>
      <md-card>
        <md-card-content>
          <vue-element-loading :active="teamMembersLoading" spinner="bar-fade-scale" color="#FF547C"/>

          <vendors-table :vendorsList="vendorsList"></vendors-table>
        </md-card-content>
      </md-card>
    </div>
    <create-modal  ref="inviteModal"></create-modal>
    </div>
</template>

<script>
  import CreateModal from './CreateModal/';
  import VendorsTable from './Table';
  import ImportVendors from './ImportVendors';
  import Vendors from "@/models/Vendors";
  import VueElementLoading from 'vue-element-loading';
  export default {
    components: {
      CreateModal,
      'vendors-table': VendorsTable,
      VueElementLoading,
      ImportVendors
    },
    data() {
      return {
        vendorsList: [],
        teamMembersLoading: true,
        importClicked: false,
        tableHidden: true
      }
    },
    created() {
      Vendors.get().then(vendors => {
        console.log(vendors)
        this.vendorsList = vendors;
        this.teamMembersLoading = false;
      }, (error) => {
        console.log(error)
      });

    },
    methods: {
      openInviteModal(){
        this.$refs.inviteModal.toggleModal(true);
      }
      }
  };
</script>
<style >
  .md-table-head-label {
    font-weight: 500;
  }
</style>
