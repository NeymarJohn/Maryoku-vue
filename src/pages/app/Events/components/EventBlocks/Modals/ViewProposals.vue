<template>
    <div class="adding-building-blocks-panel">
        <div class="md-layout" style="max-height: 50vh;">
            <div class="md-layout-item md-size-5" style="padding: 0; margin: 0;">
                <h4 class="md-title">
                    <md-button @click="closePanel" class="md-button md-theme-default md-simple md-just-icon"><md-icon>arrow_back</md-icon></md-button>
                </h4>
            </div>
            <div class="md-layout-item md-size-95" style="max-height: 50vh;">
                <h4 class="md-title" style="margin-bottom: 0; line-height: 51px;">
                    Proposals List
                </h4>

                <div class="md-layout" style="overflow: auto; max-height: 80vh;">

                    <div class="proposal-item md-layout-item md-size-100" v-for="(proposal,index) in selectedBlock.vendors" :key="index" v-if="proposalsToDisplay >= index+1">
                        <h4 class="proposal-title"> {{proposal.vendor.vendorDisplayName}} </h4>
                        <md-card>
                            <md-card-content>
                                <md-table v-model="proposal.proposals" table-header-color="blue" class="vendors-table">
                                    <md-table-row slot="md-table-row" slot-scope="{ item }" :key="proposal.proposals.indexOf(item)"  class="vendors-table_item">
                                        <md-table-cell md-label="Time Stamp"  > {{ getProposalDate(item.dateCreated) }}</md-table-cell>
                                        <md-table-cell md-label="Total Bid">
                                            ${{item.cost}}
                                        </md-table-cell>
                                        <md-table-cell md-label="Alignment With Requirements">
                                            {{item.alignment_with_requirements}}
                                        </md-table-cell>
                                        <md-table-cell class="vendors-table_item-actions" >
                                            <md-button  v-if="item.id != winnerId" class="md-button md-rose md-sm md-theme-default auto-width" @click="setAsWining(item)">
                                                Set as wining
                                            </md-button>
                                            <md-button  class="md-button md-success md-sm md-theme-default auto-width"  v-else>
                                                <span><md-icon>check</md-icon></span>Winner
                                            </md-button>
                                        </md-table-cell>

                                    </md-table-row>
                                </md-table>
                            </md-card-content>

                        </md-card>
                    </div>


                    <div class="md-layout-item md-size-100 proposals-actions">
                        <md-button class="md-info"> compare proposals </md-button>
                        <md-button class="md-default" @click="viewAllProposals" v-if="proposalsToDisplay == 1"> View all proposals </md-button>
                    </div>


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

    import swal from "sweetalert2";
    import {error} from 'util';
    import moment from 'moment';
    import VueElementLoading from 'vue-element-loading';
    import _ from "underscore";

    export default {
        components: {
            VueElementLoading,
        },
        props: {
            event: Object,
            vendor : Object,
            selectedBlock : Object,
            winnerId : {
                type : String,
                default : null
            }
        },
        data: () => ({
            // auth: auth,
            isLoaded : false,
            proposals : [
                {
                    title : "Pete's Coffee Proposal",
                    list : [
                        {
                            time_stamp : '11/14/2019',
                            total_bid : '910',
                            alignment_with_requirements : 'high'
                        },
                        {
                            time_stamp : '11/14/2019',
                            total_bid : '910',
                            alignment_with_requirements : 'high'
                        }
                    ]
                },
                {
                    title : "Hotel California",
                    list : [
                        {
                            time_stamp : '11/14/2019',
                            total_bid : '910',
                            alignment_with_requirements : 'high'
                        },
                        {
                            time_stamp : '11/14/2019',
                            total_bid : '910',
                            alignment_with_requirements : 'high'
                        }
                    ]
                }
            ],
            proposalsToDisplay : 1,
        }),

        created() {
        },
        mounted() {


        },
        methods: {

            closePanel(){
                this.$emit("closePanel");
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

                this.$bus.$emit('RefreshStatistics')

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
        },
        computed: {

        }
    };
</script>
