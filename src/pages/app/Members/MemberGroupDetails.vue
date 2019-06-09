<template>
  <div class="md-layout member-group-details" v-if="groupData">
    <div class="md-layout-item">
      <md-card style="height: 83vmin;">
        <md-card-header class="md-card-header-text md-card-header-warning">
          <div class="card-text">
            <h4 class="title" style="color: white;">
              {{groupData ? groupData.name : ''}}
              <small style="display: block;">Details</small>
            </h4>
          </div>
          <md-button class="md-info md-sm pull-right" style="margin: 16px 6px;" @click="inviteMembers" :disabled="working || noActions">Invite Members</md-button>
        </md-card-header>
        <md-card-content>
          <vue-element-loading :active="working" spinner="ring" color="#FF547C" />

          <div class="md-layout md-gutter" style="margin: 0;">

            <div class="md-layout-item md-size-100" v-if="groupData.id !== 'all'">
              <md-field style="border: none;">
                <multiselect :reset-after="true" @select="selectMember" :close-on-select="false" :preserve-search="true" placeholder="Search members" label="emailAddress" track-by="id" :searchable="true" :options="availableMembers" :multiple="true" >
                  <template slot="option" slot-scope="props">
                    <div class="md-menu-item" v-if="props.option.firstName || props.option.lastName">
                      {{ props.option.firstName }} {{ props.option.lastName }} <span class="text-gray">&nbsp;({{ props.option.emailAddress }})</span>
                    </div>
                    <div class="md-menu-item" v-else>
                      {{ props.option.emailAddress }}
                    </div>
                  </template>
                  <template slot="tag" slot-scope="{option}">
                    <span style="display: none;"></span>
                  </template>
                  <template slot="noOptions">
                    All the available members are selected.
                  </template>
                </multiselect>
              </md-field>
            </div>

            <div class="md-layout-item md-size-100" style="margin-top: 8px;" v-if="groupData.members.length">

              <md-table :md-fixed-header="true" :md-height="550" :md-card="false" v-model="groupData.members" class="table-striped table-hover">
                <md-table-row slot="md-table-row" slot-scope="{ item }" :key="item.id">
                  <md-table-cell md-label="First Name">
                    <label-edit tabindex="2" empty="" :scope="item" :text="item.firstName" field-name="firstName" @text-updated-blur="memberDetailsChanged" @text-updated-enter="memberDetailsChanged"></label-edit>
                  </md-table-cell>
                  <md-table-cell md-label="Last Name">
                    <label-edit tabindex="2" empty="" :scope="item" :text="item.lastName" field-name="lastName" @text-updated-blur="memberDetailsChanged" @text-updated-enter="memberDetailsChanged"></label-edit>
                  </md-table-cell>
                  <md-table-cell md-label="Email Address" style="max-width: 120px;">
                    <label-edit tabindex="1" :scope="item" :text="item.emailAddress" field-name="emailAddress" @text-updated-blur="memberDetailsChanged" @text-updated-enter="memberDetailsChanged"></label-edit>
                  </md-table-cell>
                  <md-table-cell md-label="Groups">
                    <drop-down direction="down">
                      <md-button slot="title" class="groups-button md-simple md-rounded dropdown-toggle" style="width: auto;" data-toggle="dropdown">
                        {{item.groups.length}} groups
                      </md-button>
                      <ul class="dropdown-menu">
                        <li v-for="group in item.groups" @click="selectGroup(group)"><a href="javascript:void(null);">{{group.name}}</a></li>
                      </ul>
                    </drop-down>
                  </md-table-cell>
                  <md-table-cell md-label="Role">
                    {{availableRoleIdToTitle(item.role)}}
                  </md-table-cell>
                  <md-table-cell md-label="Permissions" style="white-space: normal; word-wrap: break-word;">
                    <div v-if="item.permissions">
                      {{item.permissions.split(',').length}}
                      <md-tooltip md-direction="bottom">{{permissionTitles(item.permissions)}}</md-tooltip>
                    </div>
                  </md-table-cell>
                  <md-table-cell md-label="" style="width: 20%;" class="text-right">
                    <div style="white-space: nowrap;">
                      <md-button tabindex="4" class="md-success md-sm" style="width: auto;" :disabled="noActions" @click="saveMember(item)" v-if="item.id === 'new'">
                        Save
                      </md-button>
                      <md-button tabindex="5" class="md-danger md-simple md-sm" style="width: auto;" @click="cancelAddMember(item)" v-if="item.id === 'new'">
                        Cancel
                      </md-button>
                    </div>
                    <md-button class="md-danger md-round md-just-icon" :disabled="noActions" @click="removeMember(item)" v-if="item.id !== 'new'">
                      <md-icon>delete</md-icon>
                      <md-tooltip md-direction="bottom">Remove from this group</md-tooltip>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>

            </div>
            <div class="md-layout-item md-size-100 text-center" style="margin-top: 8px;" v-if="!groupData.members.length">
              <md-icon>arrow_upward</md-icon>
              <h4>Search members and add them to this group</h4>
            </div>
          </div>

          <div v-if="!groupData">
            Select group to see its details
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
  import TeamMember from '@/models/TeamMembers';
  import Team from '@/models/Teams';
  import LabelEdit from '@/components/LabelEdit';
  import _  from 'underscore';
  import swal from "sweetalert2";
  import MemberEditorPanel from './MemberEditorPanel';

  export default {
    name: 'member-group-details',
    components: { LabelEdit, MemberEditorPanel },
    props: {
      groupData: {
        type: Object
      },
      allMembers: Array,
      rolesList: Array,
      permissionsList: Array
    },
    data(){
      return {
        working: false,
        noActions: false,
        availableMembers: []
      };
    },
    mounted(){
      if (!this.groupData){
        this.working = true;
      }
    },
    methods: {
      refreshList(force){
        this.working = false;
        this.updateAvailableMembers();
      },
      inviteMembers(){
        window.currentPanel = this.$showPanel({
          component: MemberEditorPanel,
          cssClass: "md-layout-item md-size-40 transition36 ",
          openOn: "right",
          props: {
            team: this.groupData,
            teamMember: { id: 'new', permissions: []},
            permissionsList: this.permissionsList,
            rolesList: this.rolesList
          }
        });
        this.$root.$on("member-added",(item)=>{
          if (this.groupData.id ==='all'){
            this.groupData.members.unshift(item);
            this.saveGroup();
          }
        });
      },
      addMember(){
        if (this.groupData.members.length && this.groupData.members[0].id === 'new') return;

        this.groupData.members.unshift({id:'new',firstName:null,lastName:null,emailAddress: null});
      },
      cancelAddMember(){
        if (this.groupData.members.length && this.groupData.members[0].id !== 'new') return;

        this.groupData.members.shift();
      },
      saveMember(item){
        this.noActions = true;
        if (item.id === 'new'){
          item.id = null;
          delete item['id'];
          alert(JSON.stringify(this.groupData));
          new TeamMember(item).for(new Team(this.groupData)).save().then(res=>{
            this.groupData.members.shift();
            this.groupData.members.push(res);
            this.saveGroup();
            this.updateAvailableMembers();
            this.noActions = false;
          });
        } else {
          new TeamMember(item).save().then(res=>{
            this.groupData.members.push(res);
            this.saveGroup();
            this.updateAvailableMembers();
            this.noActions = false;
          });
        }
      },
      removeMember(item){

        swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(async result => {
          if (result.value) {
            this.noActions = true;
            if (this.groupData.id === 'all'){ // Delete this team member
              new TeamMember(item).delete().then(res=>{
                let index = _.findIndex(this.groupData.members,(i)=>{return i.id === item.id});
                this.groupData.members.splice(index,1);
                this.$emit('group-member-removed', item);
                this.saveGroup();
                this.updateAvailableMembers();
                this.noActions = false;
              });
            } else { // Remove from this group
              new TeamMember(item).for(new Team(this.groupData)).delete().then(res=>{
                let index = _.findIndex(this.groupData.members,(i)=>{return i.id === item.id});
                this.groupData.members.splice(index,1);
                this.saveGroup();
                this.updateAvailableMembers();
                this.noActions = false;
              });
            }
          }
        });
      },
      selectMember(item){
        this.saveMember(item);
      },
      saveGroup(){
        this.$emit('group-members-changed', this.groupData);
      },
      selectGroup(group){
        this.$emit('group-selected', group);
      },
      memberDetailsChanged(val, fieldName, item) {
        item[fieldName] = val;
        new TeamMember(item).save().then(res=>{
          this.saveGroup();
          this.noActions = false;
        });
      },
      updateAvailableMembers(){
        this.availableMembers = _.filter(this.allMembers,(i)=>{ return  !_.findWhere(this.groupData.members,{id: i.id} )});
      },
      availableRoleIdToTitle(roleId){
        let role = _.findWhere(this.rolesList, {id: roleId});
        return role ? role.title : roleId;
      },
      permissionTitles(permissions){
        let permissionsArray = permissions ? permissions.split(",") : [];
        let permissionsTitles = [];

        permissionsArray.forEach((permission)=>{
          let availablePermission = _.findWhere(this.permissionsList, {id: permission});
          if (availablePermission) {
            permissionsTitles.push(availablePermission.title);
          }
        });

        return permissionsTitles.join(", ");
      }
    },
    watch: {
      groupData(newVal, oldVal){
        if (this.groupData) {
          if (!this.groupData.members) {
            this.groupData.members = [];
          }
          this.refreshList(false);
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/md/_colors.scss';

</style>
