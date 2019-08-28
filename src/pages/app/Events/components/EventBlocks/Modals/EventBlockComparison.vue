<template>
    <div class="event-blocks-comparison-panel">
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"></vue-element-loading>
        <!-- Selected Proposals list -->
        <div class="selected-proposals-list">
            <div class="selected_proposals_item" v-for="(proposal,index) in selectedProposals" :key="index">
                <md-field v-if="proposal">
                    <label>Select Proposal</label>
                    <md-select v-model="proposal.proposals[0].id" v-on:md-selected="selectProposal(proposal.proposals[0].id,index)">
                        <md-option v-for="(vendor,index) in blockVendors"
                                   v-if="vendor.proposals && vendor.proposals[0]"
                                   :value="vendor.proposals[0].id"
                                   :key="index"
                                    >{{vendor.vendor.vendorDisplayName}}</md-option>
                    </md-select>
                </md-field>
                <md-button class="md-rose md-sm"
                           :class="{ disabled : !proposal.proposals[0] || proposal.proposals[0].cost === undefined }"
                           @click="viewProposal(proposal.proposals[0])"> View Proposal </md-button>
                <div class="proposal-cost" >${{proposal.proposals[0] && proposal.proposals[0].cost !== undefined ? proposal.proposals[0].cost : 0}}</div>
            </div>
        </div>
        <!-- ./Selected Proposals list -->

        <!-- Proposal Services Information -->
        <div class="services-section text-left bg-white" v-if="proposalsData.services">
            <div class="service-item">
                <div class="service-title">
                    <div class="title">{{proposalsData.services.title}}</div>
                </div>
                <div class="service-items">
                    <div class="items-list">
                        <div class="item-title">Subtotal</div>
                        <div class="item-value" v-for="(subtotal,index) in proposalsData.services.subtotal" :key="index">${{subtotal ? subtotal : 0}}</div>
                    </div>
                    <div class="items-list">
                        <div class="item-title">Per guest</div>
                        <div class="item-value" v-for="(perGuest,index) in proposalsData.services.perGuest" :key="index">${{perGuest ? perGuest : 0}}</div>

                    </div>
                </div>
            </div>
            <div class="service-item" v-if="proposalsData.requirements" >
                <div class="service-subtitle">
                    <div class="subtitle">Requirements</div>
                    <div class="item-value" v-for="(item,index) in allProposals" :key="index">{{item.extras.length + item.missing.length}}/{{item.included.length}}</div>
                </div>
                <div class="service-items">
                    <div class="items-list"  v-for="(item,index) in proposalsData.requirements" :key="index">
                        <div class="item-title">{{item}}</div>
                        <div class="item-value" v-for="(proposal,indx) in allProposals" :key="indx">{{checkRequirement(item,proposal)}}</div>
                    </div>
                </div>
            </div>


            <div class="service-item" v-if="proposalsData.included" >
                <div class="service-subtitle">
                    <div class="subtitle">Included</div>
                </div>
                <div class="service-items">
                    <div class="items-list"  v-for="(item,index) in proposalsData.included" :key="index">
                        <div class="item-title">{{item}}</div>
                        <div class="item-value" v-for="(proposal,indx) in allProposals" :key="indx">{{checkIncluded(item,proposal)}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="services-section text-left bg-white">
            <div class="service-item">
                <div class="service-title">
                    <div class="title">Rating</div>
                </div>
                <div class="service-items" v-if="proposalsRatings">
                    <div class="items-list">
                        <div class="item-title">Score</div>
                        <div class="item-value" v-for="(rank,indx) in proposalsRatings" :key="indx">
                            <div class="star-rating">
                                <label class="star-rating__star"
                                       v-for="rating in ratings"
                                       :class="{'is-selected' : ((rank >= rating) && rank!= null)}"
                                >
                                    <input class="star-rating star-rating__checkbox" type="radio"
                                    >★</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="services-section text-left bg-white">
            <div class="service-item">
                <div class="service-title">
                    <div class="title">Cancellation</div>
                </div>
                <div class="service-items">
                    <div class="items-list">
                        <div class="item-title">Policy</div>
                        <div class="item-value" v-for="(proposal,indx) in allProposals" :key="indx">
                            {{proposal.candellationPolicy}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ./Proposal Services Information -->
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
  import { paginationMixin } from '@/mixins/pagination';
  import { Pagination } from "@/components";
  import _ from 'underscore';
  import moment from 'moment';
  import ViewProposal from './ViewProposal.vue'

  // import auth from '@/auth';

  import MdCardContent from "../../../../../../../node_modules/vue-material/src/components/MdCard/MdCardContent/MdCardContent.vue";
  import MdCardHeader from "../../../../../../../node_modules/vue-material/src/components/MdCard/MdCardHeader/MdCardHeader.vue";

  export default {
    name: 'event-block-proposal-vendors',
    components: {
      MdCardHeader,
      MdCardContent,
      VueElementLoading,
      Pagination
    },
    props: {
      selectedBlock : Object,
      event : Object,
    },
    data: () => ({
      // auth: auth,
        noneProposalObject : {
            id: 0,
            proposals : [
                {
                    id : 0
                }
            ],
            vendor: {
                vendorDisplayName : 'None'
            },
        },
      isLoading:true,
        blockVendors : [],
        selectedProposals : [
            {
                id : null,
                proposals : [{}]
            },
            {
                id : null,
                proposals : [{}]
            },
            {
                id : null,
                proposals : [{}]
            }
        ],
        proposalComparsion : [],
        proposalsData : {},
        allProposals : [],
        ratings: [1, 2, 3, 4, 5],
        proposalsRatings: []

    }),
    methods: {
        getBlockVendors() {

            this.isLoading = true;

            let vm = this;


            let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.event.id});
            let selected_block = new EventComponent({id : this.selectedBlock.id});

            new EventComponentVendor().for(calendar, event, selected_block).get()
                .then(resp => {
                    this.isLoading = false;
                    this.blockVendors = resp;
                    this.blockVendors.unshift(this.noneProposalObject);
                    //console.log('blocks is ',resp);


                    if (vm.selectedBlock.proposalComparison.length ) {
                        vm.proposalComparsion = vm.selectedBlock.proposalComparison;
                        _.map(vm.selectedBlock.proposalComparison,function(id,key){

                            let proposal = _.find(vm.blockVendors, function(vendor) { return vendor.proposals && vendor.proposals[0] && vendor.proposals[0].id === id });
                            vm.$set(vm.selectedProposals,key,proposal);
                        });
                    }


                })
                .catch(error => {
                    this.isLoading = false;
                    console.log('EventComponentVendor error =>',error)
                })
        },
        selectProposal(proposalId,index){
            let vm = this;
            let proposal = _.find(this.blockVendors, function(vendor) { return vendor.proposals && vendor.proposals[0] && vendor.proposals[0].id === proposalId });

            if ( proposal ) {
                this.$set(this.selectedProposals,index, proposal);
                setTimeout(()=>{
                    vm.categoriesProposalsData();
                },300)
            }
        },
        getProposalCost(proposalId,index){
            let proposal = _.find(this.blockVendors, function(vendor) { return vendor.proposals && vendor.proposals[0] && vendor.proposals[0].id === proposalId });
            if ( proposal ) {

                //this.$set(this.selectedProposals,index, proposal.proposals[0]);
                //console.log('proposal => ',proposal.proposals[0]);
            }
            return proposal && proposal.proposals[0].id ? proposal.proposals[0].cost : 0;
        },
        categoriesProposalsData () {

            let vm = this;

            // get services

            vm.$set(vm.proposalsData,'services',{});
            vm.$set(vm.proposalsData.services,'subtotal',[]);
            vm.$set(vm.proposalsData.services,'perGuest',[]);
            vm.$set(vm.proposalsData,'included',[]);
            vm.$set(vm.proposalsData,'requirements',[]);


            vm.$set(vm,'allProposals',[]); // allProposals
            vm.$set(vm,'proposalsRatings',[]); // proposalsRatings

            _.map(this.selectedProposals,function(value,key){

                if ( value.proposals[0].id !== null && value.vendor) {
                    vm.allProposals.push(value.proposals[0]);
                    vm.proposalsRatings.push(value.vendor.rank);
                }
            });

            _.map(vm.allProposals,function(value,key){

                // get proposals services info
                if ( value.costBreakdown ) {

                    let costBreakdown = value.costBreakdown;

                    vm.$set(vm.proposalsData.services,'title',costBreakdown[0].service);

                    vm.proposalsData.services.subtotal.push(costBreakdown[0].cost);

                    vm.proposalsData.services.perGuest.push(costBreakdown[0].perGuest);
                }

                // get included
                if ( value.included ) {

                    let included = value.included;

                    _.map(included,function(item,index){
                        let title = item.requirementTitle;

                        if ( title  ) {
                            if ( !vm.proposalsData.included[title] ) {
                                vm.proposalsData.included.push(title);
                            }
                        }
                    })
                }

                if ( value.extras ) {

                    let extras = value.extras;

                    _.map(extras,function(item,index){
                        let title = item.requirementTitle;

                        if ( title  ) {
                            if ( !vm.proposalsData.requirements[title] ) {
                                vm.proposalsData.requirements.push(title);
                            }
                        }
                    })
                }

                if ( value.missing ) {

                    let missing = value.missing;

                    _.map(missing,function(item,index){
                        let title = item.requirementTitle;

                        if ( title  ) {
                            if ( !vm.proposalsData.requirements[title] ) {
                                vm.proposalsData.requirements.push(title);
                            }
                        }
                    })
                }

            });
        },
        checkIncluded(title, proposal) {

            let vm = this;
            let check = null;

            // get included
            if ( proposal.included ) {

                let included = proposal.included;
                check = _.find(included,function(obj) {return obj.requirementTitle === title});
            }
            return check ? check.requirementValue : 'X'
        },
        checkRequirement(title, proposal) {
            let vm = this;
            let check = null;
            let dataToReturn = 'X';

            console.log('proposal => ', proposal);

            // get included
            if ( proposal.extras ) {

                let included = proposal.extras;
                check = _.find(included,function(obj) {return obj.requirementTitle === title});
            }

            if ( !check ) {
                let included = proposal.missing;
                check = _.find(included,function(obj) {return obj.requirementTitle === title});
            }

            if ( check ) {

                if ( check.includedInPrice ) {
                    dataToReturn = 'Free'
                } else if ( check.itemNotAvailable ) {
                    dataToReturn = 'X'

                } else {
                    dataToReturn = check.price
                }
            }

            return dataToReturn
        },
        viewProposal(proposal) {
            console.log('proposal ', proposal);
            window.currentPanel = this.$showPanel({
                component: ViewProposal,
                cssClass: 'md-layout-item md-size-70 transition36',
                openOn: 'right',
                props: {event: this.event, proposal: proposal, selectedBlock : this.selectedBlock}
            })
        },
    },
    created(title, proposal) {

    },
    mounted() {
        let vm = this;


        this.getBlockVendors();
    },
    computed: {

    },
      watch : {

      }
  }
</script>
