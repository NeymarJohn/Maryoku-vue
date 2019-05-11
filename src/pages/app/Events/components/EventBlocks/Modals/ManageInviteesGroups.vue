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
                                <md-button class="md-info" @click="removeMember">Remove</md-button>
                                <md-button class="md-info" @click="addMember">Add</md-button>
                            </div>
                        </md-card-header>
                        <md-card-content>
                            <ul class="members-list" v-if="!adding">
                                <li class="member-item" v-for="(item,index) in members" :key="index">
                                    <md-checkbox v-model="item.selected" class="member-checkbox"></md-checkbox>
                                    <div class="member-name">{{item.name}}</div>
                                    <div class="member-email">{{item.email}}</div>
                                </li>
                            </ul>
                            <div class="adding-members" v-else-if="adding">
                                <md-field class="md-layout-item" >
                                    <label>Add User Name</label>
                                    <md-input type="email" v-model="newUser"></md-input>
                                </md-field>
                                <md-field class="md-layout-item" >
                                    <label>Add Email Address</label>
                                    <md-input type="email" v-model="newValue" ></md-input>
                                </md-field>
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

    import swal from "sweetalert2";
    import {error} from 'util';
    import moment from 'moment';
    import _ from 'underscore';

    export default {
        components: {
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
            newValue : ''

        }),

        created() {

        },
        mounted() {

        },
        methods: {
            addMember() {

                if ( this.adding && this.newUser && this.newValue) {
                    this.members.push({
                        name : this.newUser,
                        email : this.newValue,
                    });
                    this.newUser = this.newValue = '';
                }

                this.adding = !this.adding;

            },
            removeMember () {

                this.members = _.reject(this.members,function(member){return member.selected == true;})
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
