<template>
    <div>
        <md-card >
            <md-card-header class="md-card-header-text md-card-header-warning">

                <div class="card-text">
                    <h4 class="title" style="color: white;">Manage Vendor's proposals</h4>
                    <div class="ct-label">Applicable vendors from your list</div>
                </div>

                <div class="header-actions pull-right" style="margin-top : 1em;">
                    <md-button class="md-info"   @click="manageBlockVendors">
                        Add Vendors
                    </md-button>
                    <md-button class="md-default"  >
                        Send
                    </md-button>
                </div>

            </md-card-header>

            <md-card-content style="min-height: 60px;">


                <md-table  v-if="vendorsList" v-model="vendorsList"  table-header-color="orange" class="vendors-table">
                    <md-table-row slot="md-table-row" slot-scope="{ item }" :key="vendorsList.indexOf(item)"   >
                        <md-table-cell md-label="Vendor Name"  > {{ item.name }}</md-table-cell>
                        <md-table-cell md-label="Recommended by">
                            <img :src="item.company_logo" width="20" style="width: 100px !important;">
                        </md-table-cell>
                        <md-table-cell md-label="Inquiry Sent">
                            {{item.inquiry_sent}}
                        </md-table-cell>
                        <md-table-cell md-label="Last Proposal"  > {{ item.last_proposal }}</md-table-cell>
                        <md-table-cell class="vendors-table_item-actions">
                            <md-button v-if="!item.is_sent" class="md-button md-info md-sm md-theme-default auto-width md-just-icon" >
                                View Proposals
                            </md-button>
                            <md-button v-else="item.is_sent" class="md-button md-default md-sm md-theme-default auto-width md-just-icon">
                                Inquiry Sent
                            </md-button>
                        </md-table-cell>
                    </md-table-row>

                </md-table>

                <template v-if="!vendorsList">
                    <h5>Your vendors list is empty</h5>
                    <p>import your vendors and refresh this page after you're done</p>
                </template>


            </md-card-content>

            <md-card-actions md-alignment="right" v-if="selectedBlock.vendors">
                <md-button class="md-info" >
                    Compare proposals
                </md-button>
                <md-button class="md-info">
                    Give me proposals
                </md-button>
            </md-card-actions>
        </md-card>

        <upload-vendors-modal ref="uploadModal"></upload-vendors-modal>
    </div>

</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from "@/models/Calendar"
  import EventComponent from "@/models/EventComponent";
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';

  import UploadVendorsModal from '../../../Vendors/ImportVendors';
  import ManageBlockVendors from './Modals/ManageBlockVendors.vue';


  export default {
    name: 'event-blocks',
    components: {
        VueElementLoading,
        UploadVendorsModal,
        ManageBlockVendors
    },
    props: {
        selectedBlock : Object,
        event : Object
    },
    data: () => ({
        auth: auth,
        isLoading:true,
        proposals : [
            {
                title : 'Dakota Rice',
                price : '1,901',
                requirements : 98
            },
            {
                title : 'Dakota Rice',
                price : '1,901',
                requirements : 98
            }
        ],
        vendorsList : [
            {
                id : 1123487654,
                name : "Pete's Coffee",
                company_logo : 'https://bit.ly/2Qcsg27',
                inquiry_sent : '11/1/2019',
                last_proposal : '11/17/2019 08:30',
                is_sent : false
            },
            {
                id : 45665445667,
                name : "Mash",
                company_logo : 'https://bit.ly/2Qcsg27',
                inquiry_sent : '11/2/2019',
                last_proposal : '11/14/2019 08:30',
                is_sent : false
            },
            {
                id : 1233214567,
                name : "Hotel California",
                company_logo : 'https://bit.ly/2Qcsg27',
                inquiry_sent : '11/2/2019',
                last_proposal : '11/14/2019 08:30',
                is_sent : true
            }
        ]
    }),
    methods: {
        openUploadModal(){
            this.$refs.uploadModal.toggleModal(true);
        },
        manageBlockVendors() {
            window.currentPanel = this.$showPanel({
                component: ManageBlockVendors,
                cssClass: 'md-layout-item md-size-55 transition36 bg-grey',
                openOn: 'right',
                props: {event : this.event, selectedBlock : this.selectedBlock}
            });
        }

    },
    created() {
        console.log('Selected Block => ', this.selectedBlock);
    },
    mounted() {
        this.isLoading = false;
    },
    computed: {

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
