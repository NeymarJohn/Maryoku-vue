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
                        <div class="md-layout-item md-size-70">
                            <md-card style="height: 73vmin;">
                                <md-card-header class="md-card-header-text md-card-header-warning clear-margins">
                                    <!--<div class="card-text">
                                        <h4 class="title" style="color: white;">
                                            Event invitees {{eventInvitees.length ? `(${eventInvitees.length})` : ''}}
                                        </h4>
                                    </div>-->
                                    <!--<md-button class="md-purple md-sm pull-right md-icon-button" style="margin-top: 16px; margin-right: 12px;" @click="refreshList(true)" :disabled="working || noActions">
                                        <md-icon style="font-size: 11px;padding:0; margin: 0; height: 15px;">refresh</md-icon>
                                    </md-button>-->
                                    <md-button class="md-success md-sm pull-right" style="margin-top: 16px; margin-right: 12px;"  :disabled="working || noActions">Create new group</md-button>
                                </md-card-header>
                                <md-card-content class="clear-margins">
                                    <vue-element-loading :active="working" spinner="ring" color="#FF547C"/>
                                    <div class="md-layout md-gutter" style="margin: 0;">

                                        <div class="md-layout-item md-size-100">
                                            <md-field style="border: none;" class="clear-margins">
                                                <multiselect :reset-after="true" @select="selectMember" :close-on-select="false" :preserve-search="true" placeholder="" label="emailAddress" track-by="id" :searchable="true" :options="allOptions" :multiple="true" >
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

                                            <md-table class="text-left table-striped table-hover">
                                                <tr class="md-table-row md-table-head-container">
                                                    <th class="md-table-head" style="width: 50%;">Group</th>
                                                    <th class="md-table-head" style="width: 25%;">Invited</th>
                                                    <th class="md-table-head" style="width: 24%;">RSVP</th>
                                                    <th class="md-table-head" style="width: 1%;"></th>
                                                </tr>
                                                <template v-for="item in groups">
                                                    <tr class="md-table-row"  @click="expandGroup(item)">
                                                        <td class="md-table-cell">{{item.name}}</td>
                                                        <td class="md-table-cell">8</td>
                                                        <td class="md-table-cell">25% (4)</td>
                                                        <td class="md-table-cell"><md-icon>arrow_drop_down</md-icon></td>
                                                    </tr>
                                                    <template v-for="member in item.members" v-if="item.expanded">
                                                    <tr class="md-table-row">
                                                        <td class="md-table-cell">{{member.emailAddress}}</td>
                                                    </tr>
                                                    </template>
                                                </template>
                                            </md-table>

                                            <!--<md-table :md-fixed-header="true" :md-height="480" :md-card="false" v-model="groups" class="text-left table-striped table-hover">
                                                <md-table-row @click="expandGroup(item)" slot="md-table-row" slot-scope="{ item }" :key="item.id">
                                                    <md-table-cell md-label="Group">
                                                        {{item.name}}

                                                        <md-table v-if="item.expanded">
                                                            <md-table-row slot="md-table-row">
                                                                <md-table-cell>abc</md-table-cell>
                                                            </md-table-row>
                                                        </md-table>

                                                    </md-table-cell>
                                                    <md-table-cell md-label="Expanded" >
                                                        {{item.expanded}}
                                                    </md-table-cell>
                                                    <md-table-cell md-label="Invited" >
                                                        8
                                                    </md-table-cell>
                                                    <md-table-cell md-label="RSVP" md-numeric >
                                                        25% (4)
                                                    </md-table-cell>
                                                    <md-table-cell md-label="" class="text-right" md-numeric >
                                                        <md-icon>arrow_drop_down</md-icon>
                                                    </md-table-cell>
                                                </md-table-row>
                                            </md-table>-->

                                            <md-table style="display: none;" :md-fixed-header="true" :md-height="480" :md-card="false" v-model="eventInvitees" class="table-striped table-hover">
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
                                                    <md-table-cell md-label="groups">
                                                        {{item.person.groups.length}}
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
                        <div class="md-layout-item md-size-30">
                            <md-card class="md-card-plain">
                                <md-card-content>
                                    <h4>8 Invitees | 25% RSVP</h4>
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
    import { NavTabs, Tabs } from '@/components';
    import _  from 'underscore';

    export default {
        name: 'event-invitees',
        components: {
            VueElementLoading,
            LabelEdit,
            InteractionsList,
            NavTabs
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
            groups: []
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
                this.eventInvitees.forEach((invitee)=>{
                    let personGroups = invitee.person.groups;
                    personGroups.forEach((personGroup)=>{
                        personGroup.expanded = false;
                        let group = _.findWhere(this.groups, {id: personGroup.id});
                        if (!group){
                            if (!group.members){
                                group.members = [];
                            }
                            group.members.push(invitee);
                        } else {
                            if (!group.members){
                                group.members = [];
                            }
                            group.members.push(invitee);
                            this.groups.push(personGroup);
                        }
                    });
                });
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
