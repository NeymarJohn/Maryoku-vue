<template>
     <md-table
            @md-selected="onSelect"
            v-model="teamMembers"
            table-header-color="rose"
            class="table-striped table-hover">
    <div class="grid-col pad-20" slot="md-table-alternate-header" slot-scope="{ count }">
      <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

      <div class="md-toolbar-section-end">
        <md-button @click.native="openPopup()" class="delete-btn md-info md-just-icon md-round">
          <md-icon>edit</md-icon>
        </md-button>
        <md-button @click.native="deleteAllTeamMember()" class="delete-btn md-primary md-just-icon md-round">
          <md-icon>delete</md-icon>
        </md-button>
      </div>
    </div>
    <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
        <div class="popup-box"  v-click-outside="closePopup" v-if="openPopover" md-direction="left">
          <div class="header-position">
            <h3 class="title">Tagging</h3>
            <button class="btn-position" @click="closePopup">X</button>
          </div>
          <div class="md-layout-item md-size-100 md-small-size-100">
            <div class="md-layout-item">

            </div>

          </div>
          <div class="popup-footer">
            <md-button class="move-left md-rose md-simple" @click="closePopup">Close</md-button>
            <md-button class="btn-success md-success">Submit</md-button>
          </div>
        </div>
      <md-table-cell md-label="Name">{{ item.firstName }} {{item.lastName}}</md-table-cell>
      <md-table-cell md-label="Email">{{ item.emailAddress }}</md-table-cell>
      <md-table-cell md-label="Role">{{ availableRoleIdToTitle(item.role) }}</md-table-cell>
      <md-table-cell md-label="Permissions">{{ permissionTitles(item.permissions) }}</md-table-cell>
      <md-table-cell md-label="Actions">
        <md-button @click.native="toggleEditModal(true, item)" class="md-info md-just-icon md-round">
          <md-icon>edit</md-icon>
        </md-button>
        <md-button v-if="currentUserId !== item.id" class="md-primary md-icon-button md-round" @click="deleteTeamMember(item)">
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
  import auth from '@/auth';
  import _ from 'underscore';

  export default {
    components: {
      Modal,
      SimpleWizard,
      WizardTab
    },
    props: {
      currentUserId: String,
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
      },
      availableRoles: Array,
      availablePermissions: Array
    },
    data() {
      return {
        auth: auth,
        selected: [],
        hideBtn: false,
        openPopover: false
      }
    },
    methods: {
      ...mapActions('teamVuex', ['setInviteModalAndTeamMember']),
      onSelect (items) {
        this.selected = items
      },
      closePopup(){
        this.openPopover = false;
      },
      openPopup(){
        this.openPopover = true;
      },
      getAlternateLabel (count) {
        let plural = ''

        if (count > 1) {
          plural = 's'
        }

        return `${count} User${plural} selected`
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
      changeRollAndPermission(){

      },
      deleteTeamMember(teamMember){
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
            let notifySuccessMessage = 'Team member deleted successfully!';

            this.deleteMember(this.teamMembers.findIndex(obj => obj.id === teamMember.id), teamMember);
            this.$emit("membersRefresh");

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
      deleteAllTeamMember(teamMember){
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
            let notifySuccessMessage = 'Team member deleted successfully!';

            this.selected.forEach((item, index) => {
              this.deleteMember(index, item);
            })

            this.$emit("membersRefresh");

            this.$notify(
              {
                message: 'Team members deleted successfully!',
                horizontalAlign: 'center',
                verticalAlign: 'top',
                type: 'success'
              })

            this.selected = [];
          }
        })
      },
      deleteMember(teamMemberIndex, teamMember) {
        /*let team = await Teams.first();
        let member = await new TeamMembers().for(team).find(teamMember.id);

        member.for(team).delete().then(response => {
          let teamMemberIndex = this.teamMembers.findIndex(obj => obj.id === teamMember.id)
          this.teamMembers.splice(teamMemberIndex)
        }).catch(error => {
          console.log(error)
        });*/

        new TeamMembers(teamMember).for(new Teams({id: this.auth.user.defaultGroupId})).delete().then(res=>{
          this.teamMembers.splice(teamMemberIndex);
        }).catch(error => {
          console.log(error);
        });
      },
      availableRoleIdToTitle(roleId){
        let role = _.findWhere(this.availableRoles, {id: roleId});
        return role ? role.title : roleId;
      },
      permissionTitles(permissions){
        let permissionsArray = permissions ? permissions.split(",") : [];
        let permissionsTitles = [];

        permissionsArray.forEach((permission)=>{
          let availablePermission = _.findWhere(this.availablePermissions, {it: permission});
          if (availablePermission) {
            permissionsTitles.push(availablePermission.title);
          }
        });

        return permissionsTitles.join(", ");
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
  /*.delete-btn{
    padding: 5px;
    height: 27px;
    min-width: 27px;
    width: 27px;
    line-height: 27px;
  }*/
.popup-box{
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  right: 145px;
  z-index: 9999;
  width: 360px;
  position: absolute;
  background: white;
  border:1px solid rgba(0, 0, 0, 0.14);
}
</style>
