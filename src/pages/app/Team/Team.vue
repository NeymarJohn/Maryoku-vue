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
          <team-table :teamMembers="teamMembers"></team-table>
        </md-card-content>
      </md-card>
    </div>
    <invite-modal ref="inviteModal"></invite-modal>
  </div>
</template>

<script>
  import InviteModal from './InviteModal/';
  import TeamTable from './Table';
  import Teams from "@/models/Teams";


  export default {
    components: {
      InviteModal,
      'team-table': TeamTable
    },
    data() {
      return {
          teamMembers: [
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
      created() {
         Teams.get().then(teams => {
           console.log(teams);
           teams[0].members().get().then(members => {
             console.log(members);
             this.teamMembers = members;
           });
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
