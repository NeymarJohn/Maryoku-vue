<template>

  <md-table slot-scope="{ item }" @md-selected="onSelect" v-model="teamMembers" table-header-color="rose" class="table-striped table-hover">
    <div class="grid-col pad-20" slot="md-table-alternate-header" slot-scope="{ count }">
      <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

      <div class="md-toolbar-section-end">
        <md-button @click.native="deleteAllTeamMember(item)" class="delete-btn md-raised md-primary md-icon-button">
          <md-icon>delete</md-icon>
        </md-button>
      </div>
    </div>
    <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple">
      <md-table-cell md-label="Name">{{ item.firstName }} {{item.lastName}}</md-table-cell>
      <md-table-cell md-label="Email">{{ item.emailAddress }}</md-table-cell>
      <md-table-cell md-label="Role">{{ item.role }}</md-table-cell>
      <md-table-cell md-label="Permissions">{{ item.permissions }}</md-table-cell>
      <md-table-cell md-label="Actions">
        <md-button v-if="currentUserId !== item.id" class="md-raised md-primary md-icon-button" @click.native="deleteTeamMember(item)">
          <md-icon>delete</md-icon>
          <md-tooltip md-direction="top">Delete</md-tooltip>
        </md-button>
        <md-button @click.native="toggleEditModal(true, item)" class="md-raised md-primary md-icon-button">
          <md-icon>edit</md-icon>
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
        hideBtn: false,
        currentUserId: indexVuexModule.state.currentUser.id,
      }
    },
    methods: {
      ...mapActions('teamVuex', ['setInviteModalAndTeamMember']),
      onSelect (items) {
        this.selected = items
      },
      getAlternateLabel (count) {
        let plural = ''

        if (count > 1) {
          plural = 's'
        }

        return `${count} user${plural} selected`
      },
      toggleEditModal: function (show, item) {
        this.setInviteModalAndTeamMember({showModal: show, teamMember: item});
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
      },
      async deleteAllTeamMember(teamMember){
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
            this.teamMembers.splice(teamMemberIndex)

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
.pad-20{
  margin: 20px;
}
.md-table-alternate-header{
  position: relative;
}
  .delete-btn{
    padding: 5px;
    height: 27px;
    min-width: 27px;
    width: 27px;
    line-height: 27px;
  }
</style>
