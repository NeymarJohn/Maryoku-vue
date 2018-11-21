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
          <div class="table table-stats text-right">
            <div class="text-right">
              <md-button class="md-rose text-rose" @click="openInviteModal">
                <md-icon>person_add</md-icon>
                Invite
              </md-button>
              <md-button class="md-rose">
                <md-icon>share</md-icon>
                Share
              </md-button>
            </div>
          </div>
          <md-table v-model="teamRecords" table-header-color="rose" class="table-striped table-hover">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
              <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
              <md-table-cell md-label="Role">{{ item.role }}</md-table-cell>
              <md-table-cell md-label="Permissions">{{ item.permissions }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
      </md-card>
    </div>
    <invite-modal ref="inviteModal"></invite-modal>
  </div>
</template>

<script>
  import InviteModal from './InviteModal';

  export default {
    components: {
      InviteModal
    },
    data() {
      return {
        teamRecords: [
          {
            id: 1,
            name: "First Name Last Name",
            email: "contact@somecompany.com",
            role: "Event Participant",
            permissions: "View, Vote"
          },
        ]
      }
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
