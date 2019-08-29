<template>
    <div class="manage-proposals-panel">
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" background-color="#eee"/>

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

                <div class="tabs-section" v-if="!isLoading">
                    <tabs
                        :tab-name="['<span>'+requirementsLength+'</span> Requirements', '<span>' + selectedBlock.proposals.length + '</span> Proposals', '<span>'+comparisonsNumber+'</span> Comparison', '<span>0</span> Winner']"
                        color-button="primary" ref="proposalsTabs">
                        <template slot="tab-pane-1" style="width: 100%;">
                            <event-block-requirements :event="event" :selectedBlock="selectedBlock" :predefinedRequirements="selectedBlock.predefinedRequirements"> </event-block-requirements>
                        </template>
                        <template slot="tab-pane-2" style="width: 100%;">
                            <event-block-proposal-vendors :event="event"
                                :selectedBlock="selectedBlock"
                                @update-comparison="updateComparison"
                            ></event-block-proposal-vendors>
                        </template>
                        <template slot="tab-pane-3" style="width: 100%;">
                            <div style="padding-left: 6px;">
                                <event-block-comparison
                                    :event="event"
                                    :selectedBlock="selectedBlock"
                                ></event-block-comparison>
                            </div>
                        </template>
                        <template slot="tab-pane-4" style="width: 100%;">
                            <div style="padding-left: 6px;">
                                Select a proposal as winning to view its details here.
                            </div>
                        </template>
                    </tabs>

                    <md-card class="allocated-budget" style="height: 45px;"> <md-card-content><span class="small" style="margin-top: -35px; margin-bottom: 12.5px;">Allocated Budget</span> <div class="budget">${{selectedBlock.allocatedBudget ? selectedBlock.allocatedBudget : '0.0'}}</div></md-card-content></md-card>
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
  import EventBlockRequirements from '../Modals/EventBlockRequirements.vue';
  import EventBlockProposalVendors from '../Modals/EventBlockProposalVendors.vue';
  import EventBlockComparison from '../Modals/EventBlockComparison';



  export default {
    components: {
      VueElementLoading,
      Tabs,
      EventBlockRequirements,
      EventBlockProposalVendors,
      EventBlockComparison
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
        isLoading : false,
      proposalsToDisplay : 1,
      requirementsLength : 0,
        comparisonsNumber: 0

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
      isThereProposals() {
        return this.selectedBlock.proposals && this.selectedBlock.proposals.length;
      },
        updateComparison(item) {
            this.comparisonsNumber = item;

        }
    },
    computed: {
    },

  };
</script>
