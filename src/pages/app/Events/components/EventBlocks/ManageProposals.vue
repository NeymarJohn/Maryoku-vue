<template>
    <div>
        <md-card>
            <md-card-header class="md-card-header-text md-card-header-warning">

                <div class="card-text">
                    <h4 class="title" style="color: white;">Manage Vendor's proposals</h4>
                    <div class="ct-label">Applicable vendors from your list</div>
                </div>

                <div class="header-actions pull-right" style="margin-top : 1em;">
                    <md-button class="md-info" v-if="!selectedBlock.vendors.length" @click="openUploadModal">
                        Add Vendors
                    </md-button>
                    <md-button class="md-default" v-if="!selectedBlock.vendors.length">
                        Send
                    </md-button>
                </div>

            </md-card-header>

            <md-card-content style="min-height: 60px;">

                <md-table  v-if="selectedBlock.vendors.length" v-model="selectedBlock.vendors" table-header-color="orange" >
                    <md-table-row slot="md-table-row" slot-scope="{ item }" :key="proposals.indexOf(item)"   >
                        <md-table-cell md-label="Vendor Name"  > {{ item.title }}</md-table-cell>
                        <md-table-cell md-label="People">
                            ${{item.price}}
                        </md-table-cell>
                        <md-table-cell md-label="Average Score">
                            {{item.requirements}}%
                        </md-table-cell>
                        <md-table-cell class="vendors-table_item-actions">
                            <md-button class="md-button md-info md-sm md-theme-default auto-width md-just-icon" >
                                VIEW
                            </md-button>
                            <md-button class="md-button md-info md-sm md-theme-default auto-width md-just-icon">
                                SET AS WINNING PROPOSAL
                            </md-button>
                        </md-table-cell>
                    </md-table-row>
                </md-table>

                <template v-if="!selectedBlock.vendors.length">
                    <h5>Your vendors list is empty</h5>
                    <p>import your vendors and refresh this page after you're done</p>
                </template>


            </md-card-content>

            <md-card-actions md-alignment="right" v-if="selectedBlock.vendors.length">
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


  export default {
    name: 'event-blocks',
    components: {
        VueElementLoading,
        UploadVendorsModal
    },
    props: {
        selectedBlock : Object
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
        ]
    }),
    methods: {
        openUploadModal(){
            this.$refs.uploadModal.toggleModal(true);
        }

    },
    created() {
      console.log('selectedBlock ', this.selectedBlock);
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
