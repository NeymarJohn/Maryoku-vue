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
          <team-table :team-id="team.id" :teamMembers="teamMembers" @membersRefresh="fetchData(1)"></team-table>
          <md-card-actions md-alignment="space-between">
            <div class="">
              <p class="card-category">Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} entries</p>
            </div>
            <pagination class="pagination-no-border pagination-success"
                        @input="pageChanged($event)"
                        v-model="pagination.page"
                        :per-page="pagination.limit"
                        :total="pagination.total">
            </pagination>
          </md-card-actions>
        </md-card-content>
      </md-card>
    </div>
    <invite-modal @membersRefresh="fetchData(1)" :team="team" ref="inviteModal"></invite-modal>
  </div>
</template>

<script>
  import auth from '@/auth';
  import InviteModal from './InviteModal/';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import TeamTable from './Table';
  import Teams from "@/models/Teams";
  import teamVuexModule from './team.vuex'
  import VueElementLoading from 'vue-element-loading';
  import { Pagination } from "@/components";
  import { paginationMixin } from '@/mixins/pagination';
  export default {
    components: {
      InviteModal,
      'team-table': TeamTable,
      VueElementLoading,
      Pagination
    },
    mixins: [paginationMixin],
    data() {
      return {
        auth:auth,
        team: {},
        teamMembers: [],
        teamMembersLoading: true,
      }
    },
    created() {
      this.$store.registerModule('teamVuex', teamVuexModule);

      this.auth.currentUser(this, true, function(){
        this.fetchData(1);
      }.bind(this));
    },
    destroyed() {
      this.$store.unregisterModule('teamVuex');
    },
    methods: {
      ...mapMutations('teamVuex', ['resetForm', 'setInviteModal', 'setEditMode', 'setModalTitle']),
      fetchData(page){
        this.teamMembersLoading = true;
        /*Teams.get().then(teams => {
          this.team = teams[0];
          teams[0].members().get().then(members => {
            this.teamMembers = members;
            this.teamMembersLoading = false;
          });
        }, (error) => {
          console.log(error)
        });*/
        new Teams({id: this.auth.user.defaultGroupId}).members().page(page)
          .limit(this.pagination.limit).get().then(members => {
          console.log(members);
          this.teamMembers = members[0].results;
          this.updatePagination(members[0].model)
          this.teamMembersLoading = false;
        });
      },

      openInviteModal(){
        this.setInviteModal({ showModal: true })
        this.setEditMode({editMode: false})
        this.setModalTitle('Invite your Team')
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
