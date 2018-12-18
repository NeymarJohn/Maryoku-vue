<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <div class="table table-stats text-right">
        <div class="text-right">
          <md-button class="md-success" @click="openInviteModal">
            <md-icon>person_add</md-icon>
            Invite
          </md-button>
        </div>
      </div>
      <md-card>
        <md-card-content style="min-height: 60px;">
          <vue-element-loading :active="teamMembersLoading" spinner="ring" color="#FF547C"/>
          <team-table @memberDeleted="fetchTeam" :team-id="team.id" :teamMembers="teamMembers"></team-table>
        </md-card-content>
      </md-card>
    </div>
    <invite-modal @memberCreated="fetchTeam" :team="team" ref="inviteModal"></invite-modal>
  </div>
</template>

<script>
  import InviteModal from './InviteModal/';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import TeamTable from './Table';
  import Teams from "@/models/Teams";
  import VueElementLoading from 'vue-element-loading';
  export default {
    components: {
      InviteModal,
      'team-table': TeamTable,
      VueElementLoading
    },
    data() {
      return {
        team: {},
        teamMembers: [],
        teamMembersLoading: true,
      }
    },
    created() {
      this.fetchTeam();
    },
    methods: {
      ...mapMutations('teamVuex', ['resetForm']),
      fetchTeam(){
        this.teamMembersLoading = true;
        Teams.get().then(teams => {
          this.team = teams[0];
          teams[0].members().get().then(members => {
            this.teamMembers = members;
            this.teamMembersLoading = false;
          });
        }, (error) => {
          console.log(error)
        });
      },
      openInviteModal(){
        this.$refs.inviteModal.toggleModal(true);
        this.resetForm();
      }
    }
  };
</script>
<style >
  .md-table-head-label {
    font-weight: 500;
  }
</style>
