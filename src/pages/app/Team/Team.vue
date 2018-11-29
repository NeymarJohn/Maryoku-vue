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
          <team-table :teamRecords="teamRecords"></team-table>
        </md-card-content>
      </md-card>
    </div>
    <invite-modal ref="inviteModal"></invite-modal>
  </div>
</template>

<script>
  import InviteModal from './InviteModal/';
  import TeamTable from './Table';
  import Teams from 'src/models/Teams';

  export default {
    components: {
      InviteModal,
      'team-table': TeamTable
    },
    data() {
      return {
        teamRecords: []
      }
    },
    methods: {
      openInviteModal(){
        this.$refs.inviteModal.toggleModal(true);
      }
    },
    async mounted()
    {
      let teams = await Teams.get();
      this.teamRecords = await teams[0].members().get();

    }
  };
</script>
<style >
  .md-table-head-label {
    font-weight: 500;
  }
</style>
