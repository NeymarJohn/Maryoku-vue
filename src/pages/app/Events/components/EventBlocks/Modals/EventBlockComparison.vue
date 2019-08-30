<template>
    <div class="event-blocks-comparison-panel">
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" background-color="#eee"/>
        <!-- Selected Proposals list -->

        <div class="selected-proposals-list" v-if="selectedProposals">

            <md-table>

            </md-table>
        </div>
        <!-- ./Selected Proposals list -->

        <!-- Proposal Services Information -->
        <div class="services-section text-left bg-white">
            <div class="service-item">
                <md-table>

                    <md-table-row class="selected-proposals-list">
                        <md-table-cell></md-table-cell>
                        <md-table-cell class="text-center selected_proposals_item"
                                       v-for="(proposal,index) in selectedProposals" :key="index">
                            <md-field v-if="proposal">
                                <label>Select Proposal</label>
                                <md-select  v-model="proposal.proposals[0].id" :name="'name_' + index" :key="index"
                                            @md-selected="selectProposal(proposal.proposals[0].id,index)"
                                            :multiple="false">
                                    <md-option v-for="(vendor,indx) in availableProposals"
                                               :value="vendor.proposals[0].id"
                                               :key="indx"
                                    >{{vendor.vendor.vendorDisplayName}}</md-option>
                                </md-select>
                            </md-field>


                            <!--                <md-field >-->
                            <!--                    <multiselect :reset-after="true" @select="selectMember"-->
                            <!--                                 :close-on-select="false"-->
                            <!--                                 :preserve-search="true"-->
                            <!--                                 placeholder="Search members"-->
                            <!--                                 label="emailAddress" track-by="id"-->
                            <!--                                 :searchable="true"-->
                            <!--                                 :options="availableProposals"-->
                            <!--                                 v-model="proposal.proposals[0].id"-->
                            <!--                                >-->
                            <!--                        <template slot="option" slot-scope="props">-->
                            <!--                            <div class="md-menu-item">-->
                            <!--                                {{ props.option.vendor.vendorDisplayName }}-->
                            <!--                            </div>-->
                            <!--                        </template>-->
                            <!--                        <template slot="tag" slot-scope="{option}">-->
                            <!--                            <span style="display: none;"></span>-->
                            <!--                        </template>-->
                            <!--                        <template slot="noOptions">-->
                            <!--                            All the available members are selected.-->
                            <!--                        </template>-->
                            <!--                    </multiselect>-->
                            <!--                </md-field>-->


                            <md-button class="md-rose md-sm view-proposal-btn"
                                       :class="{ disabled : !proposal.proposals[0] || proposal.proposals[0].cost === undefined }"
                                       @click="viewProposal(proposal.proposals[0])"> View Proposal </md-button>
                            <div class="proposal-cost" >${{proposal.proposals[0] && proposal.proposals[0].cost !== undefined ? proposal.proposals[0].cost : 0}}</div>
                        </md-table-cell>
                    </md-table-row>

                    <template v-if="proposalsData.services">
                        <md-table-row >
                            <h1 class="md-title">{{proposalsData.services.title}}</h1>
                        </md-table-row>
                        <md-table-row v-if="proposalsData.services.subtotal">
                            <md-table-cell>Subtotal</md-table-cell>
                            <md-table-cell class="text-center" v-for="(subtotal,index) in proposalsData.services.subtotal" :key="index">${{subtotal ? subtotal : 0}}</md-table-cell>
                            <md-table-cell v-for="(n,indx) in 3 - proposalsData.services.subtotal.length" :key="indx+2"></md-table-cell>
                        </md-table-row>
                        <md-table-row v-if="proposalsData.services.perGuest">
                            <md-table-cell>Per guest</md-table-cell>
                            <md-table-cell class="text-center" v-for="(perGuest,index) in proposalsData.services.perGuest" :key="index">${{perGuest ? perGuest : 0}}</md-table-cell>
                            <md-table-cell v-for="(n,indx) in 3 - proposalsData.services.perGuest.length" :key="indx+2"></md-table-cell>
                        </md-table-row>
                    </template>


                </md-table>
                <md-table v-if="proposalsData.requirements">
                    <md-table-toolbar>
                        <h1 class="md-subtitle ">Requirements</h1>
                    </md-table-toolbar>

                    <md-table-row v-if="proposalsData.services.perGuest"
                                  v-for="(item,index) in proposalsData.requirements" :key="index">
                        <md-table-cell>{{item}}</md-table-cell>
                        <md-table-cell class="text-center" v-for="(proposal,indx) in allProposals" :key="indx">{{checkRequirement(item,proposal)}}</md-table-cell>
                        <md-table-cell v-for="(n,indx) in 3 - allProposals.length" :key="indx+2"></md-table-cell>
                    </md-table-row>

                </md-table>
                <md-table v-if="proposalsData.included">
                    <md-table-toolbar>
                        <h1 class="md-subtitle">Included</h1>
                    </md-table-toolbar>
                    <md-table-row v-if="proposalsData.services.perGuest"
                                  v-for="(item,index) in proposalsData.included" :key="index">
                        <md-table-cell>{{item}}</md-table-cell>
                        <md-table-cell class="text-center" v-for="(proposal,indx) in allProposals" :key="indx">{{checkIncluded(item,proposal)}}</md-table-cell>
                        <md-table-cell v-for="(n,indx) in 3 - allProposals.length" :key="indx+2"></md-table-cell>
                    </md-table-row>

                </md-table>
            </div>
        </div>

        <div class="services-section text-left bg-white">
            <md-table v-if="proposalsRatings">
                <md-table-toolbar>
                    <h1 class="md-subtitle">Rating</h1>
                </md-table-toolbar>
                <md-table-row >
                    <md-table-cell>Score</md-table-cell>
                    <md-table-cell class="text-center" v-for="(rank,indx) in proposalsRatings" :key="indx">
                        <div class="star-rating">
                            <label class="star-rating__star"
                                   v-for="rating in ratings"
                                   :class="{'is-selected' : ((rank >= rating) && rank!= null)}"
                            >
                                <input class="star-rating star-rating__checkbox" type="radio"
                                >★</label>
                        </div>
                    </md-table-cell>
                    <md-table-cell v-for="(n,indx) in 3 - proposalsRatings.length" :key="indx+2"></md-table-cell>
                </md-table-row>
            </md-table>
        </div>

        <div class="services-section text-left bg-white">
            <md-table >
                <md-table-toolbar>
                    <h1 class="md-subtitle">Cancellation</h1>
                </md-table-toolbar>

                <md-table-row v-if="allProposals">
                    <md-table-cell>Policy</md-table-cell>
                    <md-table-cell class="text-center" v-for="(proposal,indx) in allProposals" :key="indx">
                        {{proposal.candellationPolicy}}
                    </md-table-cell>
                    <md-table-cell v-for="(n,indx) in 3 - getObjectSize(allProposals)" :key="indx+2"></md-table-cell>
                </md-table-row>

            </md-table>
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
            },{
                id : null,
                proposals : [{}]
            }
        ],
        proposalComparsion : [],
        proposalsData : {},
        allProposals : [],
        ratings: [1, 2, 3, 4, 5],
        proposalsRatings: [],
        selectedProposalsIds : [],
        proposalsOptions : []

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

                    vm.isLoading = false;

                })
                .catch(error => {
                    this.isLoading = false;
                    console.log('EventComponentVendor error =>',error)
                })
        },
        selectProposal(proposalId,index){
            let vm = this;

            _.map(vm.selectedProposalsIds,function(id,key){
                let proposal = _.find(vm.blockVendors, function(vendor) { return vendor.proposals && vendor.proposals[0] && vendor.proposals[0].id === id });
                vm.$set(vm.selectedProposals,key,proposal);
            });

            let i = _.indexOf( vm.selectedProposalsIds, proposalId );

            if ( i !== -1 ) {
                vm.selectedProposalsIds.splice( i, 1 );
            }
            let proposal = _.find(this.blockVendors, function(vendor) { return vendor.proposals && vendor.proposals[0] && vendor.proposals[0].id === proposalId });

            if ( proposal ) {
                vm.$set(vm.selectedProposals,index, proposal);

                vm.selectedProposalsIds.push(proposalId);

                setTimeout(()=>{
                    vm.categoriesProposalsData();

                },300)
            }

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

            //this.$emit('update-comparison',_.size(this.allProposals));


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
            window.currentPanel = this.$showPanel({
                component: ViewProposal,
                cssClass: 'md-layout-item md-size-70 transition36',
                openOn: 'right',
                props: {event: this.event, proposal: proposal, selectedBlock : this.selectedBlock}
            })
        },
        isSelected(proposalId){
            //let proposal = _.find(this.selectedProposals, function(vendor) { return vendor.id !== 0 && vendor.proposals[0] && vendor.proposals[0].id === proposalId });
            let vm = this;
            let check = false;

            let i = _.indexOf( vm.selectedProposalsIds, proposalId );

            if ( i !== -1 ) {
                //check = true;
            }

            return check;
        },
        selectMember(item){
         },
        getObjectSize(object) {
          return _.size(object);
        }
    },
    created(title, proposal) {

    },
    mounted() {
      let vm = this;


      this.getBlockVendors();
    },
    computed: {
        availableProposals(){
            let arr = _.filter(this.blockVendors,function(item){
                return item.proposals && item.proposals[0]
            })

            this.proposalsOptions[0] = arr;
            this.proposalsOptions[1] = arr;
            this.proposalsOptions[2] = arr;

            return _.filter(this.blockVendors,function(item){
                return item.proposals && item.proposals[0]
            })
        },
        availableProposals2(){
            return _.filter(this.blockVendors,function(item){
                return item.proposals && item.proposals[0]
            })
        }
    },
      watch : {

      }
  }
</script>
