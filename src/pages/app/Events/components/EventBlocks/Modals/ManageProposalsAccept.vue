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
                        :tab-name="['<span><i class=\'md-icon md-icon-font md-theme-default\'>check</i></span> Accept', '<span><i class=\'md-icon md-icon-font md-theme-default\'>attach_money</i></span> Pay']"
                        color-button="default"
                        >
                        <template slot="tab-pane-1" style="width: 100%;">

                            <md-card class="text-left">
                                <md-card-header>
                                    <div class="md-title">Moshe & sons food for events</div>
                                </md-card-header>
                                <md-card-content>
                                    <div class="md-layout-item">
                                        Hello
                                    </div>
                                </md-card-content>
                            </md-card>

                        </template>
                        <template slot="tab-pane-2" style="width: 100%;">

                        </template>
                    </tabs>
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
    import {Tabs} from '@/components'

    import swal from "sweetalert2";
    import {error} from 'util';
    import moment from 'moment';
    import VueElementLoading from 'vue-element-loading';
    import _ from "underscore";
    import ViewProposal from './ViewProposal.vue'
    import EventBlockRequirements from '../Modals/EventBlockRequirements.vue'


    export default {
        components: {
            VueElementLoading,
            Tabs,
            EventBlockRequirements
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
            ratings: [1, 2, 3, 4, 5],
        }),

        created() {
            console.log(this.selectedBlock.proposals);
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
                  this.$bus.$emit('refreshBuildingBlock');
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
                    props: {event: this.event, proposal: proposal}
                })
            }
        },
        computed: {

        }
    };
</script>
