<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-rose">
          <!--<div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">To Do Today</h4>-->
        </md-card-header>
        <md-card-content>
          <vue-element-loading :active="teamMembersLoading" spinner="bar-fade-scale" color="#FF547C"/>
          <div class="table table-stats text-right">
            <div class="text-right">
              <md-button class="md-rose text-rose" @click="openInviteModal">
                <md-icon>add</md-icon>
                Create New
              </md-button>
              <md-button class="md-rose">
                <md-icon>cloud_upload</md-icon>
                Upload Vendors
              </md-button>
            </div>
          </div>
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
  import Vendors from "@/models/Vendors";
  import VueElementLoading from 'vue-element-loading';
  export default {
    components: {
      CreateModal,
      'vendors-table': VendorsTable,
      VueElementLoading
    },
    data() {
      return {
        vendorsList: [],
        teamMembersLoading: true,
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
