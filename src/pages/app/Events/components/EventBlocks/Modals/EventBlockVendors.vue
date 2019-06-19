<template>
    <div class="adding-building-blocks-panel">
        <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
        <div class="md-layout" >

            <div class="md-layout-item md-size-100">
                <h4 class="md-title" style="margin-bottom: 0; line-height: 51px;">
                    <md-button @click="closePanel" class="md-button md-theme-default md-simple md-just-icon"><md-icon>arrow_back</md-icon></md-button>
                    Vendors List

                    <div class="header-actions pull-right">
<!--                        <md-button class="md-info" @click="manageBlockVendors">-->
<!--                            Manage Vendors-->
<!--                        </md-button>-->
                        <md-button class="md-info">
                            Manage Vendors
                        </md-button>
                        <md-button class="md-default event-building-blocks-proposals-send"  >
                            <md-icon style="margin-right : 0.2em;margin-left: -0.5em;">near_me</md-icon> Send All
                        </md-button>
                    </div>

                </h4>
            </div>

            <div class="md-layout-item md-size-100">
                <md-card>

                    <md-card-header  class="md-card-header-text md-card-header-warning">
                        <div class="card-text">
                            <h4 class="title" style="color: white;">
                                Manage Block Vendors
                            </h4>
                        </div>
                        <div class="header-actions pull-right" style="margin-top:0.5em;">
                            <md-button class="md-info event-building-blocks-upload-vendors-button"   @click="openUploadModal">
                                compare proposals
                            </md-button>
                        </div>
                    </md-card-header>

                    <md-card-content>

                        <md-table  v-if="blockVendors" v-model="blockVendors"  table-header-color="orange" class="vendors-table">
                            <md-table-row slot="md-table-row" slot-scope="{ item }" :key="blockVendors.indexOf(item)"   >
                                <md-table-cell md-label="Vendor Name"  > {{ item.vendor ? item.vendor.vendorDisplayName : 'No Title'}}</md-table-cell>
                                <md-table-cell md-label="Rank">
                                    <vue-stars
                                        :name="item.id"
                                        active-color="#ffdd00"
                                        inactive-color="#999999"
                                        shadow-color="#ffff00"
                                        hover-color="#dddd00"
                                        :max="5"
                                        :value="item.vendor.rank"
                                        :readonly="false"
                                        char="★"
                                        inactive-char=""
                                        class="disabled"/>
                                </md-table-cell>
                                <md-table-cell md-label="Inquiry Status">
                                    <template v-if="item.status == 'Ready to send'"
                                    >
                                        {{ `Ready to send` }}
                                    </template>
                                    <template v-else-if="item.status == 'Sent'">
                                        {{ `Sent on ` }} {{getVendorDate(item.vendor.dateCreated)}}
                                    </template>
                                    <template v-else-if="item.status == 'Ready to send'"></template>
                                </md-table-cell>
                                <md-table-cell class="vendors-table_item-actions">

                                    <md-button class="md-rose md-just-icon md-round" @click="onRemoveVendor(item)">
                                        <md-icon>remove</md-icon>
                                    </md-button>

                                    <md-button class="md-primary md-just-icon md-round md-simple" style="font-size: 20px;" @click="sendVendor(item)">
                                        <md-icon>near_me</md-icon>
                                    </md-button>

<!--                                    <md-button v-if="true" class="md-button md-info md-sm md-theme-default auto-width md-just-icon" @click="viewProposals(item)">-->
<!--                                        View Proposals-->
<!--                                    </md-button>-->
<!--                                    <md-button v-if="true" class="md-button md-default md-sm md-theme-default auto-width md-just-icon">-->
<!--                                        Inquiry Sent-->
<!--                                    </md-button>-->


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

            <div class="md-layout-item md-size-50">

                <!-- View proposals for selected vendor -->
                <md-card v-if="selectedVendor && selectedVendor.vendor">
                    <md-card-header  class="md-card-header-text md-card-header-warning">
                        <div class="card-text">
                            <h4 class="title" style="color: white;">
                                {{selectedVendor.vendor.vendorDisplayName}}'s Proposals
                            </h4>
                        </div>
                    </md-card-header>
                    <md-card-content>
                        <!--<md-table v-model="proposals" table-header-color="blue" class="vendors-table">-->
                            <!--<md-table-row slot="md-table-row" slot-scope="{ item }" :key="proposal.indexOf(item)"  class="vendors-table_item">-->
                                <!--<md-table-cell md-label="Time Stamp"  > {{   }}</md-table-cell>-->
                                <!--<md-table-cell md-label="Total Bid">-->
                                    <!--${{item.cost}}-->
                                <!--</md-table-cell>-->
                                <!--<md-table-cell md-label="Alignment With Requirements">-->
                                    <!--{{item.alignment_with_requirements}}-->
                                <!--</md-table-cell>-->

                            <!--</md-table-row>-->
                        <!--</md-table>-->
                    </md-card-content>
                </md-card>


                <!-- Add vendors -->
                <md-card v-if="addingVendors">
                    <md-card-header  class="md-card-header-text md-card-header-warning">
                        <div class="card-text">
                            <h4 class="title" style="color: white;">
                                Manage Block Vendors
                            </h4>
                        </div>
                        <div class="header-actions pull-right" style="margin-top:0.5em;">
                            <md-button class="md-info event-building-blocks-upload-vendors-button"   @click="openUploadModal">
                                Upload Vendors
                            </md-button>
                        </div>
                    </md-card-header>
                    <md-card-content>
                        <vendors-table
                                v-if="vendorsList"
                                :tooltipModels="tooltipModels"
                                @add-vendor="onSelectVendor"
                                @remove-vendor="onRemoveVendor"
                                :vendorsList="vendorsList"
                                :selectedBlock="selectedBlock"
                                :event="event"
                                mode="manageBlock"
                                ref="VendorsTable">

                        </vendors-table>

                        <md-card-actions md-alignment="space-between" v-if="pagination.limit < pagination.total">
                            <div class="">
                                <p class="card-category">Showing {{ pagination.from }} to {{ pagination.limit < pagination.total ? pagination.limit : pagination.total }} of {{ pagination.total }} records</p>
                            </div>
                            <pagination class="pagination-no-border pagination-info"
                                        @input="pageChanged($event)"
                                        v-model="pagination.page"
                                        :per-page="pagination.limit"
                                        :total="pagination.total">
                            </pagination>
                        </md-card-actions>
                    </md-card-content>
                </md-card>
            </div>


        </div>

        <upload-vendors-modal ref="uploadModal"></upload-vendors-modal>
    </div>

</template>
<script>
    import swal from "sweetalert2";
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import Calendar from "@/models/Calendar";
    import CalendarEvent from "@/models/CalendarEvent";
    import EventComponent from "@/models/EventComponent";
    import Vendors from "@/models/Vendors";
    import EventComponentVendor from "@/models/EventComponentVendor";
    import VueElementLoading from 'vue-element-loading';
    import { paginationMixin } from '@/mixins/pagination'
    import { Pagination } from "@/components"

    // import auth from '@/auth';

    import UploadVendorsModal from '../../../../Vendors/ImportVendors';
    import ManageBlockVendors from './ManageBlockVendors.vue';
    import ViewProposals from "./ViewProposals.vue";
    import MdCardContent from "../../../../../../../node_modules/vue-material/src/components/MdCard/MdCardContent/MdCardContent.vue";
    import MdCardHeader from "../../../../../../../node_modules/vue-material/src/components/MdCard/MdCardHeader/MdCardHeader.vue";
    import VendorsTable from '../../../../Vendors/Table/vendorsList';

    export default {
        name: 'event-blocks',
        components: {
            MdCardHeader,
            MdCardContent,
            VueElementLoading,
            UploadVendorsModal,
            ManageBlockVendors,
            ViewProposals,
            VendorsTable,
            Pagination
        },
        props: {
            selectedBlock : Object,
            event : Object,
            caseStatus : {
                type : String,
                default : null
            }
        },
        data: () => ({
            // auth: auth,
            isLoading:true,
            loadingData : false,
            blockVendors : [],
            selectedVendor : null,
            addingVendors : false,
            vendorsList : null,
            pagination : {
                limit : 10,
                total : 0,
                page : 1
            },
            tooltipModels: [],
        }),
        methods: {
            openUploadModal(){
                this.$refs.uploadModal.toggleModal(true);
            },
            closePanel(){
                this.$emit("closePanel");
                this.$bus.$emit('BlockAdded');
            },
            manageBlockVendors() {
                this.addingVendors = true;
                this.selectedVendor = null;
            },
            getBlockVendors() {

                this.isLoading = true;

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id : this.selectedBlock.id});

                new EventComponentVendor().for(calendar, event, selected_block).get()
                    .then(resp => {
                        this.isLoading = false;
                        this.blockVendors = resp;
                        console.log(this.blockVendors);
                    })
                    .catch(error => {
                        this.isLoading = false;

                        console.log('EventComponentVendor error =>',error)

                    })
            },
            viewProposals(item) {
                this.selectedVendor = item;
                this.addingVendors = false;
            },
            onSelectVendor(data) {
                this.isLoading = true;

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id : this.selectedBlock.id});

                let vendor = {};
                vendor.vendorId = data.id;

                new EventComponentVendor(vendor).for(calendar, event, selected_block).save()
                    .then(resp => {

                        this.isLoading = false;
                        this.$bus.$emit('VendorAdded');
                        this.fetchData(0);

                        this.$notify(
                            {
                                message: 'Vendor added successfully',
                                horizontalAlign: 'center',
                                verticalAlign: 'top',
                                type: 'success'
                            })

                        this.$forceUpdate();

                    })
                    .catch(error => {
                        this.isLoading = false;
                        console.log('EventComponentVendor error =>',error);

                        this.$notify(
                            {
                                message: 'Error while trying to add vendor, try again!',
                                horizontalAlign: 'center',
                                verticalAlign: 'top',
                                type: 'danger'
                            })

                    })

            },
            onRemoveVendor(data){
                swal({
                    title: 'Are you sure you want to delete this vendor?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(async (result) => {
                    if (result.value) {
                        this.isLoading = true;

                        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                        let event = new CalendarEvent({id: this.event.id});
                        let selected_block = new EventComponent({id : this.selectedBlock.id});

                        let vendor = new EventComponentVendor({id : data.id});

                        vendor.for(calendar, event, selected_block).delete()
                            .then(resp => {
                                this.isLoading = false;
                                this.$bus.$emit('VendorAdded');
                                this.fetchData(0);
                                this.$notify(
                                    {
                                        message: 'Vendor deleted successfully',
                                        horizontalAlign: 'center',
                                        verticalAlign: 'top',
                                        type: 'success'
                                    })

                            })
                            .catch(error => {

                                this.isLoading = false;
                                this.$notify(
                                    {
                                        message: 'Error while trying to delete vendor, try again!',
                                        horizontalAlign: 'center',
                                        verticalAlign: 'top',
                                        type: 'danger'
                                    })

                            })

                    }
                })


            },
            fetchData(page) {
                this.loadingData = true;
                this.isLoading = true;

                Vendors.page(page)
                    .limit(this.pagination.limit)
                    .get().then(vendors => {

                    this.isLoading = false;

                    this.vendorsList = vendors[0].results;
                    this.pagination.total = this.vendorsList.length;

                    this.updatePagination(vendors[0].model);
                    this.loadingData = false;
                    this.vendorsList.map((item, index) => {
                        this.tooltipModels.push({
                            value: false,
                            textarea: '',
                            rankingParameters: [
                                {
                                    name: 'Overal Experience',
                                    parameterName: 'overal_experience',
                                    value: ''
                                },
                                {
                                    name: 'Cleanliness and Maintenance',
                                    parameterName: 'cleanliness_and_maintenance',
                                    value: ''

                                },
                                {
                                    name: 'Accuracy',
                                    parameterName: 'accuracy',
                                    value: ''

                                },
                                {
                                    name: 'Value for money',
                                    parameterName: 'value_for_money',
                                    value: ''

                                }, {
                                    name: 'Service',
                                    parameterName: 'service',
                                    value: ''

                                },
                                {
                                    name: 'Location & Parking',
                                    parameterName: 'location_parking',
                                    value: ''

                                },

                            ],

                        })
                    });

                }, (error) => {
                    console.log(error)
                });
            },
            getVendorDate(eventStartMillis) {

                let x = new Date(eventStartMillis);

                return x.getDate() + '-' + x.getMonth() + '-' + x.getFullYear();

            },
            sendVendor(item) {
                console.log(item);

                this.isLoading = true;

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id : this.selectedBlock.id});

                let vendor = new EventComponentVendor({id: item.id});

                vendor.status = 'Sent';

                vendor.for(calendar, event, selected_block).save()
                    .then(resp => {

                        this.isLoading = false;

                        this.$notify(
                            {
                                message: 'Vendor Sent successfully',
                                horizontalAlign: 'center',
                                verticalAlign: 'top',
                                type: 'success'
                            })

                        this.$forceUpdate();

                    })
                    .catch(error => {
                        this.isLoading = false;
                        console.log('EventComponentVendor error =>',error);

                        this.$notify(
                            {
                                message: 'Error while trying to add vendor, try again!',
                                horizontalAlign: 'center',
                                verticalAlign: 'top',
                                type: 'danger'
                            })

                    })
            }

        },
        created() {
            if ( this.caseStatus == 'get-offers' ) {
                this.addingVendors = true;
            }

            this.$auth.currentUser(this, true, function(){
                this.fetchData(0);
            }.bind(this));
        },
        mounted() {
            this.isLoading = false;
            this.getBlockVendors();
            console.log(this.selectedBlock);

            this.$bus.$on('VendorAdded',()=>{
                this.getBlockVendors();
            });
        },
        computed: {

        }
    }
</script>
