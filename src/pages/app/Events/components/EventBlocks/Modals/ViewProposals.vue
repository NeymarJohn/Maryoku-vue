<template>
    <div class="manage-proposals-panel">
        <div class="md-layout" style="max-height: 50vh;">
            <div class="md-layout-item md-size-5" style="padding: 0; margin: 0;">
                <h4 class="md-title">
                    <md-button @click="closePanel" class="md-button md-theme-default md-simple md-just-icon"><md-icon>arrow_back</md-icon></md-button>
                </h4>
            </div>
            <div class="md-layout-item md-size-95" style="max-height: 50vh;">
                <h4 class="md-title" style="margin-bottom: 0; line-height: 51px; text-transform: capitalize;">
                    Manage Proposals - {{selectedBlock.componentCategoryId}}
                </h4>

                <div class="tabs-section">
                    <tabs
                        :tab-name="['<span>'+requirementsLength+'</span> Requirements', '<span>' + selectedBlock.proposals.length + '</span> Proposals', '<span>0</span> Comparison', '<span>0</span> Winner']"
                        color-button="primary" ref="proposalsTabs">
                        <template slot="tab-pane-1" style="width: 100%;">
                            <event-block-requirements :event="event" :selectedBlock="selectedBlock" :predefinedRequirements="selectedBlock.predefinedRequirements"> </event-block-requirements>
                        </template>
                        <template slot="tab-pane-2" style="width: 100%;">
                            <div class="manage-proposals_proposals-list" v-if="filteredBlockVendors.length">
                                <h4>New or Updated</h4>

                                <div class="md-toolbar-section-start">
                                    <md-field>
                                        <md-input
                                            type="search"
                                            class="mb-3"
                                            clearable
                                            placeholder="Search vendors"
                                            v-model="searchQuery">
                                        </md-input>
                                    </md-field>
                                </div>


                                <div class="proposals-list_item" v-for="(item,index) in filteredBlockVendors" :key="index">
                                    <div class="proposal-info text-left">
                                        <div class="proposal-title-reviews">{{ item.vendor ? item.vendor.vendorDisplayName : 'No Vendor Title' }}
                                            <div class="star-rating">
                                                <label class="star-rating__star"
                                                       v-for="rating in ratings"
                                                       :class="{'is-selected' : ((item.vendor.rank >= rating) && item.vendor.rank != null)}"
                                                >
                                                    <input class="star-rating star-rating__checkbox" type="radio"
                                                           >★</label>
                                            </div>
                                        </div>
                                        <div class="proposal-property-list" style="display: none;">
                                            <ul class="list-items">
                                                <li> <md-icon>check</md-icon> Insurance</li>
                                                <li> <md-icon>attach_money</md-icon> Net +30</li>
                                            </ul>
                                        </div>
                                        <div class="proposal-benefits-list" style="display: none;">
                                            <ul class="list-items">
                                                <li> Price within budget,</li>
                                                <li> meets 90% of requirements,</li>
                                                <li> low cost per guest.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="proposal-actions text-right">
                                        <template v-if="item.proposals && item.proposals[0]">
                                            <md-button class="md-primary md-sm" v-if="item.proposals" @click="manageProposalsAccept(item.proposals[0])">Accept</md-button>
                                            <md-button class="md-rose md-sm"  v-if="item.proposals" @click="viewProposal(item.proposals[0])">View</md-button>
                                            <span class="cost">${{item.proposals[0].cost}}</span>
                                        </template>

                                        <md-button v-if="!sendingRfp && (item.rfpStatus === 'Ready to send' || item.rfpStatus == null)" class="md-primary md-sm" @click="sendVendor(item)">
                                            <md-icon>near_me</md-icon>
                                            Send RFP
                                        </md-button>
                                        <template v-else-if="item.rfpStatus === 'Sent' && !item.proposals.length">
                                            {{ `Request sent ` }} {{getProposalDate(item.rfpSentMillis)}}
                                        </template>
                                    </div>
                                </div>

                                <md-button class="md-default show-more-btn" v-if="selectedBlock.proposals.length"> Show more</md-button>
                            </div>


                            <manage-proposals-vendors :building-block.sync="selectedBlock" :event.sync="event"></manage-proposals-vendors>
                        </template>
                        <template slot="tab-pane-3" style="width: 100%;">
                            <div style="padding-left: 6px;">
                                When vendors submit their proposals you can compare them here.
                            </div>
                        </template>
                        <template slot="tab-pane-4" style="width: 100%;">
                            <div style="padding-left: 6px;">
                                Select a proposal as winning to view its details here.
                            </div>
                        </template>
                    </tabs>

                    <md-card class="allocated-budget" style="height: 45px;"> <md-card-content><span class="small" style="margin-top: -35px; margin-bottom: 12.5px;">Allocated Budget</span> <div class="budget">${{selectedBlock.allocatedBudget}}</div></md-card-content></md-card>
                </div>

                <div class="md-layout" style="overflow: auto; max-height: 80vh;" v-if="selectedBlock.proposals">

                    <md-card style="display: none;">

                        <md-card-header  class="md-card-header-text md-card-header-warning">
                            <div class="card-text">
                                <h4 class="title" style="color: white;">
                                    Manage Proposals
                                </h4>
                                <p class="category">Applicable vendors from your list</p>
                            </div>
                        </md-card-header>
                        <md-card-content>
                            <md-table v-if="isThereProposals()" v-model="selectedBlock.proposals" table-header-color="orange" class="vendors-table">
                                <md-table-row slot="md-table-row" slot-scope="{ item }" :key="selectedBlock.proposals.indexOf(item)"  class="vendors-table_item">
                                    <md-table-cell md-label="Proposals"  style="text-transform: capitalize;"> {{ item.vendor ? item.vendor.vendorDisplayName : 'No Vendor Title' }}</md-table-cell>
                                    <md-table-cell md-label="Price">
                                        ${{item.cost}}
                                    </md-table-cell>
                                    <md-table-cell md-label="Requirements">
                                        %{{item.percentRequirements}}
                                    </md-table-cell>
                                    <md-table-cell class="vendors-table_item-actions" >

                                        <md-button class="md-button md-success md-sm md-theme-default auto-width"  >
                                            View
                                        </md-button>

                                        <md-button  v-if="item.id != winnerId" class="md-button md-rose md-sm md-theme-default auto-width" @click="setAsWining(item)">
                                            Set as wining
                                        </md-button>
                                        <md-button  class="md-button md-success md-sm md-theme-default auto-width"  v-else>
                                            <span><md-icon>check</md-icon></span>Winner
                                        </md-button>
                                    </md-table-cell>

                                </md-table-row>
                            </md-table>
                            <template v-else>
                                <h5>No Proposals assigned</h5>
                            </template>
                        </md-card-content>

                    </md-card>

                </div>
            </div>
        </div>

    </div>
</template>
<script>
  // import auth from '@/auth';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import CalendarEvent from '@/models/CalendarEvent';
  import Calendar from "@/models/Calendar";
  import EventComponent from "@/models/EventComponent";
  import EventComponentVendor from "@/models/EventComponentVendor";
  import {Tabs} from '@/components'

  import swal from "sweetalert2";
  import {error} from 'util';
  import moment from 'moment';
  import VueElementLoading from 'vue-element-loading';
  import _ from "underscore";
  import ViewProposal from './ViewProposal.vue'
  import EventBlockRequirements from '../Modals/EventBlockRequirements.vue';
  import ManageProposalsAccept from '../Modals/ManageProposalsAccept.vue';
  import ManageProposalsVendors from './ManageProposalsVendors'


  export default {
    components: {
      ManageProposalsVendors,
      VueElementLoading,
      Tabs,
      EventBlockRequirements,
      ManageProposalsAccept
    },
    props: {
      event: Object,
      vendor : Object,
      selectedBlock : Object,
      winnerId : {
        type : String,
        default : null
      },
      tab: Number,
    },
    data: () => ({
      // auth: auth,
      isLoaded : false,
      proposalsToDisplay : 1,
      ratings: [1, 2, 3, 4, 5],
      requirementsLength : 0,
        blockVendors : [],
        sendingRfp: false,
        searchQuery: "",
        filteredBlockVendors : []

    }),

    created() {

    },
    mounted() {
      this.requirementsLength = this.selectedBlock.values.length;


      this.$nextTick(()=>{
        if (this.$refs.proposalsTabs) {
          this.$refs.proposalsTabs.$emit('event-planner-nav-switch-panel', this.tab)
        }
      });

      this.getBlockVendors();
    },
    methods: {

      closePanel(){
        this.$emit("closePanel", {a:'b'});
      },
      setAsWining (item) {

        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
        let event = new CalendarEvent({id: this.event.id})
        let selected_block = new EventComponent({id: this.selectedBlock.id})

        selected_block.calendarEvent = this.selectedBlock.calendarEvent;
        selected_block.componentId = this.selectedBlock.componentId;

        selected_block.winningProposalId = item.id;


        selected_block.for(calendar, event).save().then(resp => {

          this.isLoading = false
          this.$notify(
            {
              message: 'Budget modified successfully!',
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'success'
            })

          this.$root.$emit('RefreshStatistics');
          this.$root.$emit('refreshBuildingBlock');
          this.closePanel();

          this.$forceUpdate()
        })
          .catch(error => {
            console.log(error)
          })

      },
      viewAllProposals() {
        this.proposalsToDisplay  = this.selectedBlock.vendors.length;
      },
      getProposalDate(eventStartMillis) {

        let x = new Date(eventStartMillis);

        return x.getDate() + '-' + x.getMonth() + '-' + x.getFullYear();

      },
      isThereProposals() {
        return this.selectedBlock.proposals && this.selectedBlock.proposals.length;
      },
      viewProposal(proposal) {
        window.currentPanel = this.$showPanel({
          component: ViewProposal,
          cssClass: 'md-layout-item md-size-70 transition36',
          openOn: 'right',
          props: {event: this.event, proposal: proposal, selectedBlock : this.selectedBlock}
        })
      },
      manageProposalsAccept(proposal) {
        window.currentPanel = this.$showPanel({
          component: ManageProposalsAccept,
          cssClass: 'md-layout-item md-size-70 transition36 bg-grey',
          openOn: 'right',
          props: {event: this.event, selectedBlock: this.selectedBlock}
        })
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
                    this.filteredBlockVendors = this.blockVendors;


                    console.log('this.blockVendors => ', this.blockVendors);
                })
                .catch(error => {
                    this.isLoading = false;
                    console.log('EventComponentVendor error =>',error)

                })
        },
        sendVendor(item) {
            this.isLoading = true;

            let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.event.id});
            let selected_block = new EventComponent({id : this.selectedBlock.id});

            let vendor = new EventComponentVendor(item);

            vendor.id = item.id;
            vendor.cost = item.cost;
            vendor.vendor = item.vendor;
            vendor.vendorId = item.vendorId;
            vendor.rfpStatus = 'Sent';

            vendor.for(calendar, event, selected_block).save()
                .then(resp => {

                    this.getBlockVendors();

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
        filterVendors(){
            this.filteredBlockVendors = _.filter(this.blockVendors, (v)=>{
                return v.vendor.vendorDisplayName.toString().toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
            });
        },
    },
    computed: {

    },
      watch : {
          searchQuery(newVal, oldVal){
              this.filterVendors();
          },
      }
  };
</script>
