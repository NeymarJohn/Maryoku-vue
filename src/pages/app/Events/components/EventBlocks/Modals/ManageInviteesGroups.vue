<template>
    <div class="manage-groups-panel">
        <div class="md-layout" style="max-height: 100vh;">
            <div class="md-layout-item md-size-100">
                <h4>Manage Group : <b>Top Management</b>
                </h4>
            </div>
            <div class="md-layout">
                <div class="md-layout-item md-size-100">
                    <h5>Add members to '<span>Top Management</span>' group manually
                    <br>
                    or <md-button class="md-simple md-info upload-members-btn">Upload members from file</md-button>
                    </h5>
                </div>
                <div class="md-layout-item md-size-100">
                    <md-card>
                        <md-card-header class="md-card-header-text">
                            <h4 class="title2">Member List</h4>
                            <div class="card-actions pull-right">
                                <!--<md-button class="md-info" @click="removeMember">Remove</md-button>-->
                                <md-button class="md-info md-sm" @click="addMember">Create Group</md-button>
                            </div>
                        </md-card-header>
                        <md-card-content>
                            <!-- Groups -->
                            <div class="group" v-for="(group,index) in groups" :key="index" v-if="!adding">
                                <h4>
                                    <label-edit :text="group.title"  :field-name="index"  @text-updated-blur="groupTitleChanged" @text-updated-enter="groupTitleChanged"></label-edit>
                                </h4>

                                <div class="card-actions pull-right">
                                    <md-button class="md-danger md-sm md-just-icon md-simple" @click="removeGroup(group.id)"><md-icon>delete_outline</md-icon></md-button>
                                    <md-button class="md-success md-sm md-just-icon md-simple" @click="addInvitee(group)"><md-icon>group_add</md-icon></md-button>
                                </div>
                                <ul class="members-list">
                                    <li class="member-item" v-for="(item,index) in group.invitees" :key="index">
                                        <md-checkbox v-model="item.selected" class="member-checkbox"></md-checkbox>
                                        <div class="member-name">{{item.fullName}}</div>
                                        <div class="member-email">{{item.emailAddress}}</div>
                                    </li>
                                </ul>

                            </div>
                            <!-- ./Groups -->
                            <!--<ul class="members-list" v-if="!adding">-->
                                <!--<li class="member-item" v-for="(item,index) in members" :key="index">-->
                                    <!--<md-checkbox v-model="item.selected" class="member-checkbox"></md-checkbox>-->
                                    <!--<div class="member-name">{{item.name}}</div>-->
                                    <!--<div class="member-email">{{item.email}}</div>-->
                                <!--</li>-->
                            <!--</ul>-->

                            <div class="adding-members" v-if="adding">
                                <h5>Add invitee to {{selectedGroup.title}}</h5>
                                <md-field class="md-layout-item" >
                                    <label>User Name</label>
                                    <md-input type="email" v-model="newUser"></md-input>
                                </md-field>
                                <md-field class="md-layout-item" >
                                    <label>Email Address</label>
                                    <md-input type="email" v-model="newValue" ></md-input>
                                </md-field>
                                <div>
                                    <md-button class="md-info md-sm" @click="saveInvitee">Save</md-button>
                                    <md-button class="md-default md-sm" @click="cancel">Cancel</md-button>
                                </div>
                            </div>

                        </md-card-content>
                    </md-card>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import auth from '@/auth';
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import CalendarEvent from '@/models/CalendarEvent';
    import EventPageHeaderImage from '@/models/EventPageHeaderImage';
    import {Modal} from "@/components";
    import Calendar from "@/models/Calendar";
    import EventComponent from "@/models/EventComponent";
    import EventInviteeGroup from "@/models/EventInviteeGroup";
    import EventInvitee from '@/models/EventInvitee';
    import {LabelEdit} from '@/components';

    import swal from "sweetalert2";
    import {error} from 'util';
    import moment from 'moment';
    import _ from 'underscore';

    export default {
        components: {
            LabelEdit
        },
        props: {

        },
        data: () => ({
            auth: auth,
            isLoaded : false,
            membersList : [],
            members : [],
            adding : false,
            newUser : '',
            newValue : '',
            groups : [],
            selectedGroup : null

        }),

        created() {

        },
        mounted() {

            new EventInvitee().get()
                .then(resp => {

                    console.log('All EventInvitee =>',resp);

                })
                .catch(error=>{
                    console.log(error);
                })


            this.getGroups()

        },
        methods: {
            getGroups(){
                new EventInviteeGroup().get()
                    .then(resp => {
                        console.log('EventInviteeGroup =>',resp);
                        this.groups  = resp;

                        resp.forEach(item => {

                            let group = new EventInviteeGroup({id : item.id});
                            new EventInvitee().for(group).get()
                                .then(resp => {

                                    console.log('EventInvitee =>',resp);

                                })
                                .catch(error=>{
                                    console.log(error);
                                })

                        })
                    })
                    .catch(error=>{
                        console.log(error);
                    })
            },
            addMember() {
                let newGroup = {
                    title:"New Group",

                }
                new EventInviteeGroup(newGroup).save()
                    .then(resp => {
                        console.log('group created =>',resp);
                        this.getGroups();
                    })
                    .catch(error=>{
                        console.log(error);
                    })

            },
            removeMember () {

                this.members = _.reject(this.members,function(member){return member.selected == true;})
            },
            addInvitee(group) {

                this.selectedGroup = group;

                this.adding = true;
                this.$forceUpdate();


            },
            cancel(){
                this.adding = false;
            },
            saveInvitee() {

                let invitee = {
                    fullName:this.newUser,
                    emailAddress:this.newValue
                }

                new EventInvitee(invitee).for(this.selectedGroup).save()
                    .then(resp => {

                        console.log('save =>',resp);
                        this.adding = false;
                        this.getGroups();


                    })
                    .catch(error=>{
                        console.log(error);
                    })
            },
            groupTitleChanged(val,index) {

                let group = new EventInviteeGroup({id : this.groups[index].id});

                group.title = val;

                group.save()
                    .then(resp => {
                        console.log('saved');
                    })
                    .catch(error=>{
                        console.log(error);
                    })
            },
            removeGroup(id) {

                swal({
                    title: "Are you sure?",
                    text: `You won't be able to revert this!`,
                    showCancelButton: true,
                    confirmButtonClass: "md-button md-success",
                    cancelButtonClass: "md-button md-danger",
                    confirmButtonText: "Yes, delete it!",
                    buttonsStyling: false
                }).then(result => {
                    if (result.value) {
                        let group = new EventInviteeGroup({id : id});

                        group.delete()
                            .then(resp => {
                                console.log('deleted');

                                this.$notify({
                                    message: 'Group removed successfully!',
                                    horizontalAlign: 'center',
                                    verticalAlign: 'top',
                                    type: 'success',
                                });

                                this.getGroups();

                            })
                            .catch(error=>{
                                console.log(error);
                            })
                    }
                });


            }

        },
        computed: {
        }
    };
</script>
<style lang="scss" scope>
    .md-datepicker {
        .md-icon.md-date-icon {
            display: none;
            & ~ label {
                left: 0;
            }
        }
        input {
            margin-left: 0 !important;
        }
        &.md-field::before,
        &.md-field::after {
            width: 100%;
        }
    }

    .md-field > .md-icon ~ .md-input {
        margin: 0;
    }
</style>
<style lang="scss">
    .modal-z-index {
        z-index: 5;
    }

    .large-z-index {
        z-index: 6;
        position: relative;
    }

    .move-center {
        margin: 0 auto !important;;
    }

    .move-left {
        margin-left: 0 !important;
        margin-right: auto !important;
    }

    .move-right {
        margin-right: 0 !important;
        margin-left: auto !important;
    }

    .text-center {
        text-align: center;
    }

    .d-flex {
        display: flex;
    }

    .items-center-v {
        align-items: center;
    }

    .items-center-g {
        justify-content: center;
    }

    .justify-beetwen {
        justify-content: space-between
    }

    .md-field .md-error {
        text-align: left;
    }

    .swal2-container {
        z-index: 10000;
    }
</style>
