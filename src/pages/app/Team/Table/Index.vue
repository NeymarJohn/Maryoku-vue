<template>
  <md-table v-model="teamMembers" table-header-color="rose" class="table-striped table-hover">
    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell md-label="Name">{{ item.firstName }} {{item.lastName}}</md-table-cell>
      <md-table-cell md-label="Email">{{ item.emailAddress }}</md-table-cell>
      <md-table-cell md-label="Role">{{ item.role }}</md-table-cell>
      <md-table-cell md-label="Permissions">{{ item.permissions }}</md-table-cell>
      <md-table-cell md-label="Actions">
        <md-button v-if="currentUserId !== item.id" class="md-raised md-primary md-icon-button" @click.native="deleteTeamMember(item)">
          <md-icon>delete</md-icon>
          <md-tooltip md-direction="top">Delete</md-tooltip>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
  import {Modal, SimpleWizard, WizardTab} from "@/components";
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import swal from "sweetalert2";
  import Teams from "@/models/Teams";
  import TeamMembers from "@/models/TeamMembers";
  import indexVuexModule from "@/store/index";

  export default {
    components: {
      Modal,
      SimpleWizard,
      WizardTab
    },
    props: {
      teamId: {
        type: String
      },
      teamMembers: {
        type: Array,
        default: () => {
          return {};
        }
      },
      item: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        inviteModalOpen: false,
        hideBtn: false,
        currentUserId: indexVuexModule.state.currentUser.id,
      }
    },
    methods: {
      noticeModalHide: function () {
        this.inviteModalOpen = false;
      },
      toggleModal: function (show) {
        this.inviteModalOpen = show;
      },
      validateStep(ref) {
        return this.$refs[ref].validate();
      },
      onStepValidated(validated, model) {
        this.wizardModel = {...this.wizardModel, ...model};
      },
      wizardComplete() {
        swal("Good job!", "You clicked the finish button!", "success");
      },
      async deleteTeam(id){
        let team = await Teams.first(id);
        team.delete();
        let teamIndex = this.teamMembers.findIndex(obj => obj.id === id)

        this.teamMembers.splice(teamIndex, 1)

      },
      async deleteTeamMember(teamMember){
        swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.value) {

            teamMember.delete();
            this.$emit("memberDeleted");
            let teamMemberIndex = this.teamMembers.findIndex(obj => obj.id === teamMember.id)
            this.teamMembers.splice(teamMemberIndex, 1)

            this.$notify(
              {
                message: 'Team member deleted successfully!',
                horizontalAlign: 'center',
                verticalAlign: 'top',
                type: 'success'
              })
          }
        })
      }
    }
  };
</script>
<style>

</style>
