<template>
    <md-card class="personal-management">
        <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
        <md-card-header class="md-card-header-icon md-card-header-warning">
            <div class="card-icon">
                <md-icon>mail_outline</md-icon>
            </div>
            <h4 class="title2">Proposal Management</h4>
        </md-card-header>
        <md-card-content class="md-layout personal-management_items">

            <div class="md-layout-item md-size-50">
                <md-card class="personal-management_item">
                    <md-card-header class="md-card-header-text card-success card-header">
                        <md-card-header-text>
                            <div class="md-title">Venue</div>
                            <div class="md-actions">
                                <md-button class="md-button md-dense md-sm ">
                                    <md-icon>attach_file</md-icon>
                                </md-button>
                                <md-button class="md-button md-dense md-sm ">
                                    <md-icon>sms</md-icon>
                                </md-button>
                                <md-button class="md-button md-dense md-sm">
                                    <md-icon>delete_outline</md-icon>
                                </md-button>
                            </div>
                        </md-card-header-text>
                    </md-card-header>

                    <md-card-content>
                        <div class="item-content">
                            <div class="personals-number"> 4 Personals</div>
                            <ul class="item-info">
                                <li>
                                    <div class="">Allocated Budget</div>
                                    <div>$12,000</div>
                                </li>
                                <li>
                                    <div class="">Best Proposal</div>
                                    <div>$13,000</div>
                                </li>
                            </ul>
                        </div>
                    </md-card-content>

                    <md-card-actions md-alignment="center">
                        <md-button>Manage Personals</md-button>
                    </md-card-actions>
                </md-card>

            </div>
            <div class="md-layout-item md-size-50">
                <md-card class="personal-management_item">
                    <md-card-header class="md-card-header-text card-info card-header">
                        <md-card-header-text>
                            <div class="md-title">Venue</div>
                            <div class="md-actions">
                                <md-button class="md-button md-dense md-sm ">
                                    <md-icon>attach_file</md-icon>
                                </md-button>
                                <md-button class="md-button md-dense md-sm ">
                                    <md-icon>sms</md-icon>
                                </md-button>
                                <md-button class="md-button md-dense md-sm">
                                    <md-icon>delete_outline</md-icon>
                                </md-button>
                            </div>
                        </md-card-header-text>
                    </md-card-header>

                    <md-card-content>
                        <div class="item-content">
                            <div class="personals-number"> 4 Personals</div>
                            <ul class="item-info">
                                <li>
                                    <div class="">Allocated Budget</div>
                                    <div>$12,000</div>
                                </li>
                                <li>
                                    <div class="">Best Proposal</div>
                                    <div>$13,000</div>
                                </li>
                            </ul>
                        </div>
                    </md-card-content>

                    <md-card-actions md-alignment="center">
                        <md-button>Manage Personals</md-button>
                    </md-card-actions>
                </md-card>

            </div>

            <!-- Add Block -->
            <div class="md-layout-item md-size-50">
                <md-card class="personal-management_add-block">
                    <md-card-content>
                        <md-icon>add</md-icon>
                        <div>Add building block</div>
                    </md-card-content>
                </md-card>

            </div>
            <!-- ./Add Block -->

        </md-card-content>

        <div class="personal-management_keys">
            <ul class="keys_list">
                <li class="list-item item-success">
                    Products
                </li>
                <li class="list-item item-warning">
                    Services
                </li>
                <li class="list-item item-info">
                    Content
                </li>
                <li class="list-item item-rose">
                    Space
                </li>
                <li class="list-item item-default">
                    Catering
                </li>
            </ul>
        </div>
    </md-card>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from "@/models/Calendar"
  import EventComponent from "@/models/EventComponent";
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';

  export default {
    name: 'event-building-blocks',
    components: {
        VueElementLoading,
    },
    props: {
        event: Object
    },
    data: () => ({
        auth: auth,
        isLoading:true,
    }),
    methods: {

    },
    created() {
      
    },
    mounted() {
        this.isLoading = false;
    }
  }
</script>
<style lang="scss">
    .mt-auto {
        margin-top: auto;
    }
    .light-theme {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .md-list {
            flex-direction: column;
            justify-content: flex-end;
        }
        .md-tab {
            padding-top: 0;
            .md-list {
                padding-top: 0;
                flex-wrap: wrap;
            }
        }
        .md-list.md-theme-default .md-list-item-container:not(.md-list-item-default):not([disabled]):hover {
            background: none;
        }
        .md-list-item-content{
            font-size: 12.5px;
            color: #6a6869;
            cursor: pointer;
            flex-direction: column;
            .image-block {
                margin-bottom: 10px;
            }
        }
        .md-content {
            width: 100%;
        }
        .md-button {
            height: 50px;
            color:#3c4858!important;
            i,
            &:hover,
            &:hover i,
            &:focus,
            &:focus i,
            &:active,
            &:active i,
            &:active:focus,
            &:active:focus i,
            &:active:hover{  
              color:#3c4858!important;
            }
            .caret{
                width: auto;
                min-width: 0;
                margin-right: 0;
                margin-left: auto;
            }
            .md-ripple {
                padding: 0!important;
                .md-button-content {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 100%;
                    height:100%;
                    .item {
                        display: flex;
                        align-items: center;
                        padding: 13px;
                        width: 100%;
                        text-align: left;
                        background-color: rgba($color: #000000, $alpha: 0.05)!important;    
                        &.selected{
                            background-color: #ffd966!important;
                        }
                    }
                }
            }
        }
        .md-list {
            display: flex;
            flex-direction: row;
        }
        .md-tabs-navigation {
            flex-direction: column;
            margin: 0;
            padding: 0;
            margin-right: 5%;
            overflow: hidden; 
            box-shadow:none;
            -webkit-box-shadow:none;
            min-width: 230px;
            max-width: 230px;
            margin-left: 0!important;
            flex: 1 1 230px;
        }
    }
</style>
