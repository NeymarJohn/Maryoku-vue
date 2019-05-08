<template>
    <div class="manage-groups-panel">
        <div class="md-layout" style="max-height: 100vh;">
            <div class="md-layout-item md-size-100">
                <h4>Manage Invitees Groups
                </h4>
            </div>
            <div class="md-layout">
                <div class="md-layout-item md-size-100">
                    <h5>Select existing group or </h5>
                </div>
                <div class="md-layout-item md-size-100">
                    <md-button class="md-success" @click="createGroup()"> Create New Group</md-button>
                </div>
                <div class="md-layout-item md-size-100">
                    <md-card>
                        <md-card-content>
                            <md-table v-model="tableDataPlain">
                                <md-table-row slot="md-table-row" slot-scope="{ item }">
                                    <md-table-cell md-label="ID" ><md-checkbox v-model="item.selected" @change="checkItem(item)"></md-checkbox></md-table-cell>
                                    <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                                    <md-table-cell md-label="Country">{{ item.members }} Member</md-table-cell>
                                </md-table-row>
                            </md-table>
                        </md-card-content>
                    </md-card>
                </div>

                <div class="md-layout-item md-size-100 text-right">
                    <md-button class="md-info">
                        Select
                    </md-button>
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

    export default {
        components: {
        },
        props: {

        },
        data: () => ({
            auth: auth,
            isLoaded : false,
            tableDataPlain: [
                {
                    id: 1,
                    name: "Top Management",
                    members : "12",
                    selected : true,
                },
                {
                    id: 2,
                    name: "Leading Forum",
                    members : "29",
                    selected : true,
                },
                {
                    id: 3,
                    name: "All Company",
                    members : "71",
                    selected : false,
                }
            ],

        }),

        created() {

        },
        mounted() {

        },
        methods: {
            createGroup() {

            },
            checkItem (group) {
                console.log(group);
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
