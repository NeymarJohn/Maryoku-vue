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

                <div class="md-layout" style="overflow: auto; max-height: 80vh;" v-if="selectedBlock.proposals">

                    <md-card>

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

                                        <md-button class="md-button md-success md-sm md-theme-default auto-width" >
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


                    <div class="md-layout-item md-size-100 proposals-actions" v-if="isThereProposals()">
                        <md-button class="md-info"> compare proposals </md-button>
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

                  this.$bus.$emit('RefreshStatistics');
                  this.$bus.$emit('BlockAdded');
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
            }
        },
        computed: {

        }
    };
</script>
