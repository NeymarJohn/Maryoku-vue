<template>
    <div class="adding-building-blocks-panel">
        <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
        <div class="md-layout" >

            <div class="md-layout-item md-size-100">
                <h4 class="md-title" style="margin-bottom: 0; line-height: 51px;">
                    <md-button @click="closePanel" class="md-button md-theme-default md-simple md-just-icon"><md-icon>arrow_back</md-icon></md-button>
                    Proposals List

                    <div class="header-actions pull-right">
                        <md-button class="md-info" @click="manageBlockVendors">
                            Add Vendors
                        </md-button>
                        <md-button class="md-default"  >
                            Send
                        </md-button>
                    </div>

                </h4>
            </div>

            <md-card v-if="blockVendors.length">
                <md-card-content>
                    <md-table  v-if="blockVendors" v-model="blockVendors"  table-header-color="orange" class="vendors-table">
                        <md-table-row slot="md-table-row" slot-scope="{ item }" :key="blockVendors.indexOf(item)"   >
                            <md-table-cell md-label="Vendor Name"  > {{ item.vendor.vendorDisplayName }}</md-table-cell>
                            <md-table-cell md-label="Recommended by">
                                <img :src="`https://bit.ly/2Qcsg27`" width="20" style="width: 100px !important;">
                            </md-table-cell>
                            <md-table-cell md-label="Inquiry Sent">
                                {{ `11/1/2019` }}
                            </md-table-cell>
                            <md-table-cell md-label="Last Proposal"  > {{ `11/17/2019 08:30` }}</md-table-cell>
                            <md-table-cell class="vendors-table_item-actions">
                                <md-button v-if="true" class="md-button md-info md-sm md-theme-default auto-width md-just-icon" @click="viewProposals(item)">
                                    View Proposals
                                </md-button>
                                <md-button v-if="true" class="md-button md-default md-sm md-theme-default auto-width md-just-icon">
                                    Inquiry Sent
                                </md-button>
                            </md-table-cell>
                        </md-table-row>

                    </md-table>
                </md-card-content>
            </md-card>


            <template v-if="!blockVendors.length">
                <md-card >
                    <md-card-content>
                        <h5 >Your vendors list is empty</h5>
                        <p >import your vendors and refresh this page after you're done</p>
                    </md-card-content>
                </md-card>

            </template>

            <div class="pull-right" v-if="blockVendors.length">
                <md-button class="md-info" >
                    Compare proposals
                </md-button>
                <md-button class="md-info">
                    Give me proposals
                </md-button>
            </div>
        </div>

        <upload-vendors-modal ref="uploadModal"></upload-vendors-modal>
    </div>

</template>
<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import Calendar from "@/models/Calendar";
    import CalendarEvent from "@/models/CalendarEvent";
    import EventComponent from "@/models/EventComponent";
    import EventComponentVendor from "@/models/EventComponentVendor";
    import VueElementLoading from 'vue-element-loading';
    import auth from '@/auth';

    import UploadVendorsModal from '../../../../Vendors/ImportVendors';
    import ManageBlockVendors from './ManageBlockVendors.vue';
    import ViewProposals from "./ViewProposals.vue";
    import MdCardContent from "../../../../../../../node_modules/vue-material/src/components/MdCard/MdCardContent/MdCardContent.vue";

    export default {
        name: 'event-blocks',
        components: {
            MdCardContent,
            VueElementLoading,
            UploadVendorsModal,
            ManageBlockVendors,
            ViewProposals
        },
        props: {
            selectedBlock : Object,
            event : Object
        },
        data: () => ({
            auth: auth,
            isLoading:true,
            blockVendors : []
        }),
        methods: {
            openUploadModal(){
                this.$refs.uploadModal.toggleModal(true);
            },
            closePanel(){
                this.$emit("closePanel");
            },
            manageBlockVendors() {
                window.currentPanel = this.$showPanel({
                    component: ManageBlockVendors,
                    cssClass: 'md-layout-item md-size-55 transition36 bg-grey',
                    openOn: 'right',
                    props: {event : this.event, selectedBlock : this.selectedBlock}
                });
            },
            getBlockVendors() {

                this.isLoading = true;

                let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id : this.selectedBlock.id});

                new EventComponentVendor().for(calendar, event, selected_block).get()
                    .then(resp => {
                        this.isLoading = false;

                        this.blockVendors = resp;
                    })
                    .catch(error => {
                        this.isLoading = false;

                        console.log('EventComponentVendor error =>',error)

                    })
            },
            viewProposals(item) {
                window.currentPanel = this.$showPanel({
                    component: ViewProposals,
                    cssClass: 'md-layout-item md-size-45 transition36 bg-grey',
                    openOn: 'right',
                    props: {event : this.event, vendor : item}
                });
            }

        },
        created() {
        },
        mounted() {
            this.isLoading = false;
            this.getBlockVendors();

            this.$bus.$on('VendorAdded',()=>{
                this.getBlockVendors();
            });

        },
        computed: {

        }
    }
</script>
