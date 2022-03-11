<template>
  <div v-if="groupData" class="md-layout member-group-details">
    <div class="md-layout-item">
      <md-card style="height: auto">
        <md-card-header class="md-card-header-text md-card-header-warning">
          <div class="card-text">
            <h4 class="title" style="color: white">
              {{ groupData ? groupData.name : "" }}
              <small style="display: block">Details</small>
            </h4>
          </div>
          <md-button
            class="md-info md-sm pull-right"
            style="margin: 16px 6px"
            :disabled="working || noActions"
            @click="inviteMembers"
          >
            Invite Members
          </md-button>
          <md-button
            class="md-purple md-sm pull-right"
            style="margin: 16px 6px"
            :disabled="working || noActions"
            @click="uploadMembers"
          >
            Import from spreadsheet
          </md-button>
        </md-card-header>
        <md-card-content>
          <vue-element-loading :active="working" spinner="ring" color="#FF547C" />

          <div class="md-layout md-gutter" style="margin: 0">
            <div v-if="groupData.id !== 'all'" class="md-layout-item md-size-100">
              <md-field style="border: none">
                <multiselect
                  :reset-after="true"
                  :close-on-select="false"
                  :preserve-search="true"
                  placeholder="Search members"
                  label="emailAddress"
                  track-by="id"
                  :searchable="true"
                  :options="availableMembers"
                  :multiple="true"
                  @select="selectMember"
                >
                  <template slot="option" slot-scope="props">
                    <div v-if="props.option.firstName || props.option.lastName" class="md-menu-item">
                      {{ props.option.firstName }} {{ props.option.lastName }}
                      <span class="text-gray">&nbsp;({{ props.option.emailAddress }})</span>
                    </div>
                    <div v-else class="md-menu-item">
                      {{ props.option.emailAddress }}
                    </div>
                  </template>
                  <template slot="tag" slot-scope="{ option }">
                    <span style="display: none" />
                  </template>
                  <template slot="noOptions">
                    All the available members are selected.
                  </template>
                </multiselect>
              </md-field>
            </div>

            <div v-if="groupData.members.length" class="md-layout-item md-size-100" style="margin-top: 8px">
              <md-table
                v-model="groupData.members"
                :md-fixed-header="false"
                :md-height="groupData.id === 'all' ? 550 : 480"
                :md-card="false"
                class="table-striped table-hover"
              >
                <md-table-row slot="md-table-row" :key="item.id" slot-scope="{ item }">
                  <!--<md-table-cell md-label="First Name">
                                        <label-edit tabindex="2" empty="" :scope="item" :text="item.firstName" field-name="firstName" @text-updated-blur="memberDetailsChanged" @text-updated-enter="memberDetailsChanged"></label-edit>
                                        {{item.firstName}}
                                    </md-table-cell>-->
                  <md-table-cell md-label="Name">
                    <!--<label-edit tabindex="2" empty="" :scope="item" :text="item.lastName" field-name="lastName" @text-updated-blur="memberDetailsChanged" @text-updated-enter="memberDetailsChanged"></label-edit>-->
                    {{ item.displayName }}
                  </md-table-cell>
                  <md-table-cell md-label="Email Address" style="max-width: 120px">
                    <!--<label-edit tabindex="1" :scope="item" :text="item.emailAddress" field-name="emailAddress" @text-updated-blur="memberDetailsChanged" @text-updated-enter="memberDetailsChanged"></label-edit>-->
                    {{ item.emailAddress }}
                  </md-table-cell>
                  <md-table-cell md-label="Groups">
                    <!--<drop-down direction="down" :hover="true">
                                            <md-button slot="title" class="groups-button md-simple md-rounded dropdown-toggle" style="width: auto;" data-toggle="dropdown">
                                                {{item.groups.length}} groups
                                            </md-button>
                                            <ul class="dropdown-menu">
                                                <li v-for="group in item.groups" @click="selectGroup(group)"><a href="javascript:void(null);">{{group.name}}</a></li>
                                            </ul>
                                        </drop-down>-->
                    {{ item.groups.length }} groups
                  </md-table-cell>
                  <md-table-cell md-label="Role">
                    {{ availableRoleIdToTitle(item.role) }}
                  </md-table-cell>
                  <md-table-cell md-label="" style="white-space: nowrap; width: 20%" class="text-right">
                    <div style="white-space: nowrap">
                      <md-button
                        v-if="item.id === 'new'"
                        tabindex="4"
                        class="md-success md-sm"
                        style="width: auto"
                        :disabled="noActions"
                        @click="saveMember(item)"
                      >
                        Save
                      </md-button>
                      <md-button
                        v-if="item.id === 'new'"
                        tabindex="5"
                        class="md-danger md-simple md-sm"
                        style="width: auto"
                        @click="cancelAddMember(item)"
                      >
                        Cancel
                      </md-button>
                    </div>
                    <md-button
                      v-if="item.id !== 'new'"
                      class="md-warning md-round md-just-icon"
                      :disabled="noActions"
                      @click="editMember(item)"
                    >
                      <md-icon>edit</md-icon>
                    </md-button>
                    <md-button
                      v-if="item.id !== 'new'"
                      class="md-danger md-round md-just-icon"
                      :disabled="noActions"
                      @click="removeMember(item)"
                    >
                      <md-icon>delete</md-icon>
                      <md-tooltip md-direction="bottom">
                        Remove from this group
                      </md-tooltip>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </div>
            <div
              v-if="!groupData.members.length"
              class="md-layout-item md-size-100 text-center"
              style="margin-top: 8px"
            >
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

    <import-members-panel ref="importModalOpen" />
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import TeamMember from "@/models/TeamMember";
import Team from "@/models/Team";
import LabelEdit from "@/components/LabelEdit";
import _ from "underscore";
import Swal from "sweetalert2";
import MemberEditorPanel from "./MemberEditorPanel";
import ImportMembersPanel from "./ImportMembersPanel";

export default {
  name: "MemberGroupDetails",
  components: { LabelEdit, MemberEditorPanel, ImportMembersPanel },
  props: {
    groupData: {
      type: Object,
    },
    allMembers: Array,
    rolesList: Array,
    permissionsList: Array,
    groupsList: Array,
  },
  data() {
    return {
      working: false,
      noActions: false,
      availableMembers: [],
    };
  },
  mounted() {
    if (!this.groupData) {
      this.working = true;
    }
  },
  methods: {
    ...mapMutations("teams", ["setImportModal"]),
    refreshList(force) {
      this.working = false;
      this.updateAvailableMembers();
    },
    inviteMembers() {
      let groupsWithoutAll = _.filter(this.groupsList, (g) => {
        return g.id !== "all";
      });
      let groups = [];

      if (this.groupData.id !== "all") {
        groups.push(this.groupData);
      } else if (groupsWithoutAll.length > 0) {
        groups.push(groupsWithoutAll[0]);
      }

      window.currentPanel = this.$showPanel({
        component: MemberEditorPanel,
        cssClass: "md-layout-item md-size-40 transition36 ",
        openOn: "right",
        props: {
          team: this.groupData,
          teamMember: { id: "new", permissions: "view", role: "employee", groups: groups },
          permissionsList: this.permissionsList,
          rolesList: this.rolesList,
          groupsList: groupsWithoutAll,
        },
      });
      this.$root.$on("member-added", (item) => {
        if (this.groupData.id === "all") {
          this.groupData.members.unshift(item);
          this.saveGroup();
        }
        this.$emit("group-member-removed", item);
      });
    },
    editMember(member) {
      let groupsWithoutAll = _.filter(this.groupsList, (g) => {
        return g.id !== "all";
      });
      window.currentPanel = this.$showPanel({
        component: MemberEditorPanel,
        cssClass: "md-layout-item md-size-40 transition36 ",
        openOn: "right",
        props: {
          team: this.groupData,
          teamMember: member,
          editMode: true,
          permissionsList: this.permissionsList,
          rolesList: this.rolesList,
          groupsList: groupsWithoutAll,
        },
      });
    },
    uploadMembers() {
      this.$refs.importModalOpen.toggleModal(true);
      // window.currentPanel = this.$showPanel({
      //     component: ImportMembersPanel,
      //     cssClass: "md-layout-item md-size-100 h65 transition36",
      //     openOn: "bottom",
      //     props: {
      //
      //     }
      // });
    },
    addMember() {
      if (this.groupData.members.length && this.groupData.members[0].id === "new") return;

      this.groupData.members.unshift({ id: "new", firstName: null, lastName: null, emailAddress: null });
    },
    cancelAddMember() {
      if (this.groupData.members.length && this.groupData.members[0].id !== "new") return;

      this.groupData.members.shift();
    },
    saveMember(item) {
      this.noActions = true;
      if (item.id === "new") {
        item.id = null;
        delete item["id"];

        new TeamMember(item)
          .for(new Team(this.groupData))
          .save()
          .then((res) => {
            this.groupData.members.shift();
            this.groupData.members.push(res);
            this.saveGroup();
            this.updateAvailableMembers();
            this.noActions = false;
          });
      } else {
        new TeamMember(item).save().then((res) => {
          this.groupData.members.push(res);
          this.saveGroup();
          this.updateAvailableMembers();
          this.noActions = false;
        });
      }
    },
    removeMember(item) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonClass: "md-button md-success confirm-btn-bg btn-fill",
        cancelButtonClass: "md-button md-danger cancel-btn-bg btn-fill",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.value) {
          this.noActions = true;
          if (this.groupData.id === "all") {
            // Delete this team member
            new TeamMember(item).delete().then((res) => {
              let index = _.findIndex(this.groupData.members, (i) => {
                return i.id === item.id;
              });
              this.groupData.members.splice(index, 1);
              this.$emit("group-member-removed", item);
              this.saveGroup();
              this.updateAvailableMembers();
              this.working = true;
              this.noActions = false;
            });
          } else {
            // Remove from this group
            new TeamMember(item)
              .for(new Team(this.groupData))
              .delete()
              .then((res) => {
                let index = _.findIndex(this.groupData.members, (i) => {
                  return i.id === item.id;
                });
                this.groupData.members.splice(index, 1);
                this.$emit("group-member-removed", item);
                this.saveGroup();
                this.updateAvailableMembers();
                this.noActions = false;
              });
          }
        }
      });
    },
    selectMember(item) {
      this.saveMember(item);
    },
    saveGroup() {
      this.$emit("group-members-changed", this.groupData);
    },
    selectGroup(group) {
      this.$emit("group-selected", group);
    },
    memberDetailsChanged(val, fieldName, item) {
      item[fieldName] = val;
      new TeamMember(item).save().then((res) => {
        this.saveGroup();
        this.noActions = false;
      });
    },
    updateAvailableMembers() {
      this.availableMembers = _.filter(this.allMembers, (i) => {
        return !_.findWhere(this.groupData.members, { id: i.id });
      });
    },
    availableRoleIdToTitle(roleId) {
      let role = _.findWhere(this.rolesList, { id: roleId });
      return role ? role.title : roleId;
    },
    permissionTitles(permissions) {
      let permissionsArray = permissions ? permissions.split(",") : [];
      let permissionsTitles = [];

      permissionsArray.forEach((permission) => {
        let availablePermission = _.findWhere(this.permissionsList, { id: permission });
        if (availablePermission) {
          permissionsTitles.push(availablePermission.title);
        }
      });

      return permissionsTitles.join(", ");
    },
  },
  watch: {
    groupData(newVal, oldVal) {
      if (this.groupData) {
        if (!this.groupData.members) {
          this.groupData.members = [];
        }
        this.refreshList(false);
      }
    },
  },
  computed: {
    ...mapState("teamVuex", ["importModalOpen"]),
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/md/_colors.scss";
</style>
