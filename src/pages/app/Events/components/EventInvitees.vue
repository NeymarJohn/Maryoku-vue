<template>
    <div class="md-layout event-invitees">
        <div class="md-layout-item md-size-100">
            <nav-tabs
                :tab-name="['Invitees', 'Automated Interactions']"
                color-button="danger"
                plain>

                <!-- here you can add your content for tab-content -->
                <template slot="tab-pane-1">
                    <div class="md-layout">
                        <div class="md-layout-item md-medium-size-70 md-size-80">
                            <md-card style="height: auto;">
                                <md-card-header class="md-card-header-text md-card-header-warning clear-margins">
                                    <!--<div class="card-text">
                                        <h4 class="title" style="color: white;">
                                            Event invitees {{eventInvitees.length ? `(${eventInvitees.length})` : ''}}
                                        </h4>
                                    </div>-->
                                    <span class="pull-left" style="margin-top: 16px; margin-left: 12px;">
                                        <md-icon class="text-rose">near_me</md-icon> {{eventInvitees.length}}
                                    </span>
                                    <span class="pull-left" style="margin-top: 16px; margin-left: 12px;">
                                        <md-icon class="text-rose">check_circle</md-icon> 25%
                                    </span>
                                    <md-button class="md-purple md-sm pull-right md-icon-button" style="margin-top: 16px; margin-right: 12px;" @click="refreshList(true)" :disabled="working || noActions">
                                        <md-icon style="font-size: 11px;padding:0; margin: 0; height: 15px;">refresh</md-icon>
                                    </md-button>
                                    <md-button class="md-success md-sm pull-right" style="margin-top: 16px; margin-right: 12px;"  :disabled="working || noActions">Create new group</md-button>
                                </md-card-header>
                                <md-card-content class="">
                                    <vue-element-loading :active="working" spinner="ring" color="#FF547C"/>
                                    <div class="md-layout md-gutter" style="margin: 0;">

                                        <div class="md-layout-item md-size-100">
                                            <md-field style="border: none;" class="clear-margins">
                                                <multiselect :reset-after="true" @select="selectMember" :close-on-select="true" :preserve-search="true" placeholder="" label="emailAddress" track-by="id" :searchable="true" :options="allOptions" :multiple="true" >
                                                    <template slot="caret"><span></span></template>
                                                    <template slot="placeholder" class="text-center">
                                                        <md-icon>search</md-icon> Search groups and participants
                                                    </template>
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
                                                            <div class="md-menu-item" v-else-if="option.displayName">
                                                                {{ option.displayName }} <span class="text-gray">&nbsp;({{ option.emailAddress }})</span>
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

                                            <md-table class="text-left " v-model="groups" >
                                                <tr class="md-table-row md-table-head-container">
                                                    <th class="md-table-head" style="width: 50%;">Group</th>
                                                    <th class="md-table-head md-numeric md-xs" style="width: 25%;"><md-icon class="text-rose">near_me</md-icon></th>
                                                    <th class="md-table-head md-numeric" style="width: 24%;"><md-icon class="text-rose">check_circle</md-icon></th>
                                                    <th class="md-table-head" style="width: 1%;"></th>
                                                </tr>
                                                <template v-for="item in groups">
                                                    <tr class="md-table-row" style="cursor: pointer;"  @click="expandGroup(item)" :class="{'visible-row':item.expanded}">
                                                        <td class="md-table-cell">{{item.name}}</td>
                                                        <td class="md-table-cell md-numeric">{{item.members.length}}</td>
                                                        <td class="md-table-cell md-numeric">{{groupStats(item)}}</td>
                                                        <td class="md-table-cell">
                                                            <md-icon v-if="!item.expanded">arrow_drop_down</md-icon>
                                                            <md-icon v-if="item.expanded">arrow_drop_up</md-icon>
                                                        </td>
                                                    </tr>
                                                    <tr class="bg-white" v-if="item.expanded" :class="{'visible-row':item.expanded}">
                                                        <td class="md-table-cell text-center" colspan="4" style="max-width: 1px; padding: 24px;">
                                                            <event-invitee-group-details @unselect-member="unselectMember" :group.sync="item"></event-invitee-group-details>
                                                        </td>
                                                    </tr>
                                                </template>
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
                        <div class="md-layout-item md-medium-size-30 md-size-20">
                            <md-card class="md-card-plain">
                                <md-card-content>
                                    <div class="text-left">
                                        <h5>Invitation includes:</h5>
                                        <md-radio v-for="(option, index) in InviteeTypes" v-model="eventData.participantsType" :value="option">{{option}}</md-radio>
                                    </div>
                                </md-card-content>
                            </md-card>
                        </div>
                    </div>
                </template>
                <template slot="tab-pane-2">
                    <interactions-list :event-data.sync="eventData"></interactions-list>
                </template>
            </nav-tabs>
        </div>
    </div>
</template>
<script>

    import TeamMember from '@/models/TeamMember';
    import Team from '@/models/Team';
    import EventInvitee from '@/models/EventInvitee';
    import Calendar from '@/models/Calendar';
    import CalendarEvent from '@/models/CalendarEvent';

    import VueElementLoading from 'vue-element-loading';
    import LabelEdit from '@/components/LabelEdit';
    import InteractionsList from '@/pages/app/Events/components/EventBlocks/InteractionsList';
    import EventInviteeGroupDetails from '@/pages/app/Events/components/EventInviteeGroupDetails';
    import { NavTabs, Tabs } from '@/components';
    import _  from 'underscore';

    export default {
        name: 'event-invitees',
        components: {
            VueElementLoading,
            LabelEdit,
            InteractionsList,
            NavTabs,
            EventInviteeGroupDetails
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
            groups: [],
            InviteeTypes: ["Employees Only","Employees and spouse","Employees and families", "Employees children"],

        }),
        methods: {
            refreshList(force){
                this.working = true;
                if (force){
                    this.$ls.remove("teams");
                    this.$ls.remove("teams.allMembers");
                }
                let tasks = [this.loadTeams(force),this.loadAllMembers(force), this.loadEventInvitees(force)];
                Promise.all(tasks).then(()=>{
                    this.updateAllOptions();
                    this.updateGroups();
                    this.working = false;
                });
            },
            updateGroups(){
                let updatedGroups = [];
                let invitees = JSON.parse(JSON.stringify(this.eventInvitees));
                invitees.forEach((invitee)=>{
                    let personGroups = invitee.person.groups;
                    let personGroup;
                    if (personGroups.length > 0){
                        personGroup = personGroups[0];
                    } else {
                        personGroup = {id: 'unknown', name: 'Unknown'};
                    }

                    let group = _.findWhere(updatedGroups, {id: personGroup.id});
                    if (!group){
                        group = personGroup;
                        group.members = [];
                        group.members.push(invitee);
                        updatedGroups.push(group);
                    } else {
                        if (!group.members){
                            group.members = [];
                        }
                        group.members.push(invitee);
                    }
                });
                this.groups = updatedGroups;
            },
            loadTeams(force){
                let t = Team.fetch(this,force);
                t.then(teams=>{
                    this.availableTeams = teams;
                });
                return t;
            },
            loadAllMembers(force){
                let m = TeamMember.fetch(this, force);
                m.then(allMembers=>{
                    this.availableMembers = allMembers;
                });
                return m;
            },
            loadEventInvitees(force){
                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                let calendarEvent = new CalendarEvent(this.eventData);

                let e = EventInvitee.fetch(this, calendar, calendarEvent, force);
                e.then(invitees=>{
                    this.eventInvitees = invitees;
                });
                return e;
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
                this.working = true;
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
                        this.updateGroups();
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
                        this.updateGroups();
                    });
                }
                return i;
            },
            unselectMember(item){
                this.working = true;
                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                let calendarEvent = new CalendarEvent(this.eventData);
                let i = new EventInvitee(item).for(calendar, calendarEvent).delete().then(res=>{
                    let index = _.findIndex(this.eventInvitees, (e)=>{ return e.id === item.id});
                    if (index > -1) {
                        this.eventInvitees.splice(index, 1);
                        EventInvitee.saveInvitees(this, this.eventInvitees);
                        this.updateAllOptions();
                        this.updateGroups();
                        this.working = false;
                    }
                });
            },
            memberDetailsChanged(val, fieldName, item){

            },
            openInteractionsManagementPanel(){
                this.$router.push({name: "InviteesManagement", params : { id : this.eventData.id} });
                location.reload(); // TODO Remove this
            },
            expandGroup(item){
                if (item.expanded){
                    item.expanded = false;
                } else {
                    this.groups.forEach((g)=>{
                        g.expanded = false;
                    });
                    item.expanded = true;
                }
                this.$forceUpdate();
            },
            groupStats(group){
                return '0%'
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
        computed: {
        },
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
    @import '@/assets/scss/md/_colors.scss';
    .members-group {
        font-weight: 500;
        &:hover {
            .md-icon {
                color: white;
            }
        }
    }

    .visible-row {
        background-color: $grey-50 !important;
        font-weight: 500;
    }
    .not-visible-row {
        cursor: pointer;
    }
    /*.multiselect__element {
      &:hover {
        .md-icon {
          color: white;
        }
      }
    }*/
</style>
