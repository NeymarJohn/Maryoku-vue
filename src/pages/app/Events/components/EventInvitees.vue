<template>
  <div class="md-layout event-invitees">
    <vue-element-loading :active="working" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
    <div class="md-layout-item md-size-100">
      <md-card style="height: 83vmin;">
        <md-card-header class="md-card-header-text md-card-header-warning">
          <div class="card-text">
            <h4 class="title" style="color: white;">
              Event invitees ({{eventInvitees.length}})
            </h4>
          </div>
          <md-button class="md-purple md-sm pull-right md-icon-button" style="margin: 16px 6px;" @click="refreshList(true)" :disabled="working || noActions">
            <md-icon style="font-size: 11px;padding:0; margin: 0; height: 15px;">refresh</md-icon>
          </md-button>
          <md-button class="md-info md-sm pull-right" style="margin: 16px 6px;"  :disabled="working || noActions" @click="openInteractionsManagementPanel">Manage Interactions</md-button>
          <md-button class="md-success md-sm pull-right" style="margin: 16px 6px;"  :disabled="working || noActions">Invite more participants</md-button>
        </md-card-header>
        <md-card-content>
          <vue-element-loading :active="working" spinner="ring" color="#FF547C" />
          <div class="md-layout md-gutter" style="margin: 0;">

            <div class="md-layout-item md-size-100">
              <md-field style="border: none;">
                <multiselect :reset-after="true" @select="selectMember" :close-on-select="false" :preserve-search="true" placeholder="Search participants" label="emailAddress" track-by="id" :searchable="true" :options="allOptions" :multiple="true" >
                  <template slot="option" slot-scope="{option}">
                    <div v-if="option.type === 'group'">
                      <div class="md-menu-item members-group dropdown-with-icons">
                        {{option.name}} <span class="text-gray">&nbsp;({{ option.members ? option.members.length : 0 }})</span>
                      </div>
                    </div>
                    <div v-if="option.type === 'person'">
                      <div class="md-menu-item" v-if="option.firstName || option.lastName">
                        {{ option.firstName }} {{ option.lastName }} <span class="text-gray">&nbsp;({{ option.emailAddress }})</span>
                      </div>
                      <div class="md-menu-item" v-else>
                        {{ option.emailAddress }}
                      </div>
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
            <div class="md-layout-item md-size-100" v-if="eventInvitees.length">
              <md-table :md-fixed-header="true" :md-height="550" :md-card="false" v-model="eventInvitees" class="table-striped table-hover">
                <md-table-row slot="md-table-row" slot-scope="{ item }" :key="item.id">
                  <md-table-cell md-label="First Name">
                    <label-edit tabindex="2" empty="" :scope="item" :text="item.person.firstName" field-name="firstName" @text-updated-blur="memberDetailsChanged" @text-updated-enter="memberDetailsChanged"></label-edit>
                  </md-table-cell>
                  <md-table-cell md-label="Last Name">
                    <label-edit tabindex="2" empty="" :scope="item" :text="item.person.lastName" field-name="lastName" @text-updated-blur="memberDetailsChanged" @text-updated-enter="memberDetailsChanged"></label-edit>
                  </md-table-cell>
                  <md-table-cell md-label="Email Address" style="max-width: 120px;">
                    <label-edit tabindex="1" :scope="item" :text="item.person.emailAddress" field-name="emailAddress" @text-updated-blur="memberDetailsChanged" @text-updated-enter="memberDetailsChanged"></label-edit>
                  </md-table-cell>
                  <md-table-cell md-label="RSVP">
                    <md-icon class="text-gray" title="Not invited yet">help_outline</md-icon>
                    <!--<drop-down direction="down">
                      <md-button slot="title" class="groups-button md-simple md-rounded dropdown-toggle" style="width: auto;" data-toggle="dropdown">
                        {{item.person.groups.length}} groups
                      </md-button>
                      <ul class="dropdown-menu">
                        <li v-for="group in item.person.groups" @click="selectGroup(group)"><a href="javascript:void(null);">{{group.name}}</a></li>
                      </ul>
                    </drop-down>-->
                  </md-table-cell>
                  <md-table-cell md-label="" style="width: 20%;" class="text-right">
                    <md-button class="md-danger md-round md-just-icon" :disabled="noActions" @click="unselectMember(item)" v-if="item.id !== 'new'">
                      <md-icon>delete</md-icon>
                      <md-tooltip md-direction="bottom">Unselect from this event</md-tooltip>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </div>
            <div class="md-layout-item md-size-100 text-center" style="margin-top: 8px;" v-if="!eventInvitees.length">
              <md-icon>arrow_upward</md-icon>
              <h4>Search groups or members and invite them to this event</h4>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>

  import TeamMember from '@/models/TeamMembers';
  import Team from '@/models/Teams';
  import EventInvitee from '@/models/EventInvitee';
  import Calendar from '@/models/Calendar';
  import CalendarEvent from '@/models/CalendarEvent';

  import VueElementLoading from 'vue-element-loading';
  import LabelEdit from '@/components/LabelEdit';
  import InteractionsPanel from '@/pages/app/Events/components/EventBlocks/InteractionsPanel';
  import _  from 'underscore';

  export default {
    name: 'event-invitees',
    components: {
      VueElementLoading,
      LabelEdit,
      InteractionsPanel
    },
    props: {
      eventData: Object
    },
    data: () => ({

      working: false,
      noActions: false,
      availableTeams: [],
      availableMembers: [],
      allOptions: [],
      eventInvitees: [],
    }),
    methods: {
      refreshList(force){
        this.working = true;
        if (force){
          this.$ls.remove("teams");
          this.$ls.remove("teams.allMembers");
        }
        let tasks = [this.loadTeams(),this.loadAllMembers(), this.loadEventInvitees()];
        Promise.all(tasks).then(()=>{
          this.updateAllOptions();
          this.working = false;
        });
      },
      loadTeams(){
        let t;
        let teams = this.$ls.get("teams");
        if (!teams){
          t = new Team().get();
          t.then(res=>{
            this.availableTeams = res;
            this.availableTeams.unshift({id:'all', name: 'All members', builtIn: true});
            this.$ls.set("teams", this.availableTeams, 1000 * 60 * 10);
          });
        } else {
          t = new Promise((resolve,reject)=>{
            this.availableTeams = teams;
            resolve();
          })
        }
        return t;
      },
      loadAllMembers(){
        let m;
        let allMembers = this.$ls.get("teams.allMembers");
        if (!allMembers){
          m = new TeamMember().get();
          m.then(res => {
            this.$ls.set("teams.allMembers", res, 1000 * 60 * 10);
            this.availableMembers = res;
          });
        } else {
          m = new Promise((resolve, reject)=>{
            this.availableMembers = allMembers;
            resolve();
          });
        }
      },
      loadEventInvitees(){
        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
        let i = new EventInvitee().for(calendar, new CalendarEvent(this.eventData)).get();
        i.then(res=>{
          this.eventInvitees = res;
        });
        return i;
      },
      updateAllOptions(){
        this.allOptions = [...this.availableTeams,...this.availableMembers];
        this.allOptions = _.filter(this.allOptions,(i)=>{
          return  i.id !== 'all'  && -1 === _.findIndex(this.eventInvitees, (e)=>{
            return e.person.id === i.id
          })
        });
      },
      selectMember(item){
        let p;
        if (item.type === 'person'){
          p = this.selectSingleMember(item);
        } else if (item.type === 'group'){
          p = this.selectGroup(item);
        }
        p.then(()=>{
          this.working = false;
        });
      },
      selectGroup(item){
        return new Promise((resolve,reject)=>{
          let promises = [];
          item.members.forEach((member)=>{
            promises.push(this.selectSingleMember(member));
          });
          Promise.all(promises).then(()=>{
            this.updateAllOptions();
            resolve();
          });
        });
      },
      selectSingleMember(item){
        let i = new Promise((res,rej)=>{res();});
        let index = _.findIndex(this.eventInvitees, (e)=>{
          return e.person.id === item.id;
        });
        if (index === -1) {
          let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId });
          let calendarEvent = new CalendarEvent(this.eventData);
          i = new EventInvitee({ person: { id: item.id } }).for(calendar, calendarEvent).save();
          i.then(res => {
            this.eventInvitees.unshift(res.item);
            this.updateAllOptions();
          });
        }
        return i;
      },
      unselectMember(item){
        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
        let calendarEvent = new CalendarEvent(this.eventData);
        let i = new EventInvitee(item).for(calendar, calendarEvent).delete().then(res=>{
          let index = _.findIndex(this.eventInvitees, (e)=>{ return e.id === item.id});
          if (index > -1) {
            this.eventInvitees.splice(index, 1);
            this.updateAllOptions();
          }
        });
      },
      memberDetailsChanged(val, fieldName, item){

      },
      openInteractionsManagementPanel(){
        this.$router.push({name: "InviteesManagement", params : { id : this.eventData.id} });
        location.reload(); // TODO Remove this
      }
    },
    created() {
    },
    mounted() {
      this.working = true;
      this.$auth.currentUser(this, true, ()=>{
        if (this.eventData && this.eventData.id){
          this.refreshList(false);
        }
      });

    },
    computed: {},
    watch: {
      eventData(newVal, oldVal){
        if (this.eventData && this.eventData.id){
          this.refreshList(false);
        }
      }
    }
  }
</script>
<style lang="scss" scoped>

  .members-group {
    font-weight: 500;
    &:hover {
      .md-icon {
        color: white;
      }
    }
  }

  /*.multiselect__element {
    &:hover {
      .md-icon {
        color: white;
      }
    }
  }*/
</style>
