<template>
    <div class="event-blocks-comparison-panel" style="height: 100%;">
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" background-color="#eee"/>
        <!-- Selected Proposals list -->

        <div class="selected-proposals-list" style="height: 100%;" v-if="selectedBlock.proposals && selectedBlock.proposals.length > 0">

            <table style="width: 100%; height: 100%;" cellspacing="0" colpadding="0">
                <tr>
                    <td class="comparison-cell category-outer-cell"></td>
                    <td class="comparison-cell outer-cell" style="padding: 4px 24px;">
                        <multiselect v-model="selectedBlock.proposalComparison[0]" @select="addToCompare" @remove="removeFromCompare" style="height: 0;" track-by="id" label="name" placeholder="Select proposal" :searchable="false" :allow-empty="true" :options="availableProposals" selectLabel="" deselectLabel="" selectedLabel="" ></multiselect>
                        <div class="spacer"></div>
                        <md-button class="md-danger md-sm" @click="viewProposal(selectedBlock.proposalComparison[0])">View Proposal</md-button>
                        <h4 style="font-weight: 500; min-height: 24px;">{{getProposalPrice(selectedBlock.proposalComparison[0])}}</h4>
                    </td>
                    <td class="comparison-cell outer-cell" style="padding: 4px 24px;">
                        <multiselect v-model="selectedBlock.proposalComparison[1]" @select="addToCompare" @remove="removeFromCompare"  style="height: 0;" track-by="id" label="name" placeholder="Select proposal" :searchable="false" :allow-empty="true" :options="availableProposals"  selectLabel="" deselectLabel="" selectedLabel="" ></multiselect>
                        <div class="spacer"></div>
                        <md-button class="md-danger md-sm" @click="viewProposal(selectedBlock.proposalComparison[1])">View Proposal</md-button>
                        <h4 style="font-weight: 500; min-height: 24px;">{{getProposalPrice(selectedBlock.proposalComparison[1])}}</h4>
                    </td>
                    <td class="comparison-cell outer-cell" style="padding: 4px 24px;">
                        <multiselect v-model="selectedBlock.proposalComparison[2]" @select="addToCompare" @remove="removeFromCompare"  style="height: 0;" track-by="id" label="name" placeholder="Select proposal" :searchable="false" :allow-empty="true" :options="availableProposals"  selectLabel="" deselectLabel="" selectedLabel="" ></multiselect>
                        <div class="spacer"></div>
                        <md-button class="md-danger md-sm" @click="viewProposal(selectedBlock.proposalComparison[2])">View Proposal</md-button>
                        <h4 style="font-weight: 500; min-height: 24px;">{{getProposalPrice(selectedBlock.proposalComparison[2])}}</h4>
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        <md-card class="clear-margins" style="padding: 18px !important;">
                            <md-card-header class="md-card-header-text text-left">
                                <h5 class="title">{{this.selectedBlock.category}}</h5>
                            </md-card-header>
                            <md-card-content style="margin-top: 8px;">
                                <table style="width: 100%; height: 100%;">
                                    <tr>
                                        <td class="comparison-cell category">
                                            <h6 class="title">Subtotal</h6>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <h5 class="title" style="font-weight: 400; font-size: 14px;">
                                                {{getProposalPrice(selectedBlock.proposalComparison[0])}}
                                            </h5>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <h5 class="title" style="font-weight: 400; font-size: 14px;">
                                                {{getProposalPrice(selectedBlock.proposalComparison[1])}}
                                            </h5>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <h5 class="title" style="font-weight: 400; font-size: 14px;">
                                                {{getProposalPrice(selectedBlock.proposalComparison[2])}}
                                            </h5>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="comparison-cell category">
                                            <h6 class="title">Per guest</h6>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <h5 class="title" style="font-weight: 400; font-size: 14px;">
                                                {{getProposalPricePerGuest(selectedBlock.proposalComparison[0])}}
                                            </h5>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <h5 class="title" style="font-weight: 400; font-size: 14px;">
                                                {{getProposalPricePerGuest(selectedBlock.proposalComparison[1])}}
                                            </h5>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <h5 class="title" style="font-weight: 400; font-size: 14px;">
                                                {{getProposalPricePerGuest(selectedBlock.proposalComparison[2])}}
                                            </h5>
                                        </td>
                                    </tr>
                                    <tr><td colspan="4" class="spacer"></td></tr>
                                    <tr>
                                        <td class="comparison-cell category border-bottom">
                                            <h6 class="title">Requirements</h6>
                                        </td>
                                        <td class="comparison-cell proposal border-bottom">
                                            {{getProposalRequirementsFulfilled(selectedBlock.proposalComparison[0])}}
                                        </td>
                                        <td class="comparison-cell proposal border-bottom">
                                            {{getProposalRequirementsFulfilled(selectedBlock.proposalComparison[1])}}
                                        </td>
                                        <td class="comparison-cell proposal border-bottom">
                                            {{getProposalRequirementsFulfilled(selectedBlock.proposalComparison[2])}}
                                        </td>
                                    </tr>
                                    <tr v-for="(requirement, index) in selectedBlock.values">
                                        <td class="comparison-cell category">
                                            <h6 class="title small" v-tooltip="requirement.comment">
                                                {{requirement.title}}
                                            </h6>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <md-icon v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison[0],requirement.id).included">check</md-icon>
                                            <md-icon v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison[0],requirement.id).missing">close</md-icon>
                                            <span v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison[0],requirement.id).extra">${{getProposalRequirementFulfillment(selectedBlock.proposalComparison[0],requirement.id).price}}</span>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <md-icon v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison[1],requirement.id).included">check</md-icon>
                                            <md-icon v-else-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison[1],requirement.id).missing">close</md-icon>
                                            <span v-else-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison[1],requirement.id).extra">${{getProposalRequirementFulfillment(selectedBlock.proposalComparison[1],requirement.id).price}}</span>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <md-icon v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison[2],requirement.id).included">check</md-icon>
                                            <md-icon v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison[2],requirement.id).missing">close</md-icon>
                                            <span v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison[2],requirement.id).extra">${{getProposalRequirementFulfillment(selectedBlock.proposalComparison[2],requirement.id).price}}</span>
                                        </td>
                                    </tr>
                                </table>

                            </md-card-content>
                        </md-card>
                    </td>
                </tr>
                <tr><td colspan="4" class="spacer"></td></tr>
                <tr>
                    <td colspan="4">
                        <md-card class="clear-margins" style="padding: 18px !important;">
                            <md-card-header class="md-card-header-text text-left">
                                <h5 class="title">Rating</h5>
                            </md-card-header>
                            <md-card-content>
                                <table style="width: 100%; height: 100%;">
                                    <tr >
                                        <td class="comparison-cell category">
                                            <h6 class="title small">Score</h6>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <div class="star-rating" v-if="selectedBlock.proposalComparison[0]">
                                                <label class="star-rating__star"
                                                       v-for="rating in ratings"
                                                       :class="{'is-selected' : ((getProposalRating(selectedBlock.proposalComparison[0]) >= rating) && getProposalRating(selectedBlock.proposalComparison[0]) != null)}">
                                                    <input class="star-rating star-rating__checkbox" type="radio">★</label>
                                                <span class="small">(0)</span>
                                            </div>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <div class="star-rating" v-if="selectedBlock.proposalComparison[1]">
                                                <label class="star-rating__star"
                                                       v-for="rating in ratings"
                                                       :class="{'is-selected' : ((getProposalRating(selectedBlock.proposalComparison[1]) >= rating) && getProposalRating(selectedBlock.proposalComparison[1]) != null)}">
                                                    <input class="star-rating star-rating__checkbox" type="radio">★</label>
                                                <span class="small">(0)</span>
                                            </div>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <div class="star-rating" v-if="selectedBlock.proposalComparison[2]">
                                                <label class="star-rating__star"
                                                       v-for="rating in ratings"
                                                       :class="{'is-selected' : ((getProposalRating(selectedBlock.proposalComparison[2]) >= rating) && getProposalRating(selectedBlock.proposalComparison[2]) != null)}">
                                                    <input class="star-rating star-rating__checkbox" type="radio">★</label>
                                                <span class="small">(0)</span>
                                            </div>

                                        </td>
                                    </tr>
                                </table>

                            </md-card-content>
                        </md-card>
                    </td>
                </tr>
                <tr><td colspan="4" class="spacer"></td></tr>
                <tr>
                    <td colspan="4">
                        <md-card class="clear-margins" style="padding: 18px !important;">
                            <md-card-header class="md-card-header-text text-left">
                                <h5 class="title">Cancellation</h5>
                            </md-card-header>
                            <md-card-content>
                                <table style="width: 100%; height: 100%;">
                                    <tr >
                                        <td class="comparison-cell category">
                                            <h6 class="title small">Policy</h6>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <p>
                                                {{getProposalCancellationPolicy(selectedBlock.proposalComparison[0])}}
                                            </p>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <p>
                                                {{getProposalCancellationPolicy(selectedBlock.proposalComparison[1])}}
                                            </p>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <p>
                                                {{getProposalCancellationPolicy(selectedBlock.proposalComparison[2])}}
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                            </md-card-content>
                        </md-card>
                    </td>
                </tr>
                <tr><td colspan="4" class="spacer"></td> </tr>
                <tr>
                    <td class="comparison-cell category-outer-cell"></td>
                    <td class="comparison-cell outer-cell">
                        <md-button class="md-danger md-sm">View Proposal</md-button>
                        <h4 style="font-weight: 500;">$1,000</h4>
                    </td>
                    <td class="comparison-cell outer-cell">
                        <md-button class="md-danger md-sm">View Proposal</md-button>
                        <h4 style="font-weight: 500;">$1,000</h4>
                    </td>
                    <td class="comparison-cell outer-cell">
                        <md-button class="md-danger md-sm">View Proposal</md-button>
                        <h4 style="font-weight: 500;">$1,000</h4>
                    </td>
                </tr>
            </table>
        </div>
    </div>

</template>
<script>

  import Calendar from "@/models/Calendar";
  import CalendarEvent from "@/models/CalendarEvent";
  import EventComponent from "@/models/EventComponent";

  import ViewProposal from './ViewProposal.vue';
  import VueElementLoading from 'vue-element-loading';
  import _ from 'underscore';
  import numeral from 'numeral';

  export default {
    name: 'event-block-proposal-vendors',
    components: {
      VueElementLoading,
      ViewProposal
    },
    props: {
      selectedBlock : Object,
      event : Object,
      blockVendors : Array,

    },
    data: () => ({
      isLoading:false,
      ratings: [1, 2, 3, 4, 5],
      availableProposals: [],
      proposalsById: {},
      requirementsById: {},

    }),
    methods: {
      getProposalPrice(proposalId){
        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById) {
            return `$${proposalById.cost  | numeral('0,0.0')}`;
          }
        }
        return "";
      },
      getProposalPricePerGuest(proposalId){
        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById && proposalById.cost) {
            return `$${(proposalById.cost / this.event.numberOfParticipants)  | numeral('0,0.0')}`;
          }
        }
        return "";
      },
      getProposalRequirementsFulfilled(proposalId){
        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById && proposalById.cost) {
            let fulfilled = proposalById.included.length + proposalById.extras.length;
            let total = fulfilled + proposalById.missing.length;
            return `${fulfilled} / ${total}`;
          }
        }
        return "";
      },
      getProposalRequirementFulfillment(proposalId, requirementId){
        if (proposalId && requirementId) {
          let requirementById = this.requirementsById[`${proposalId}__${requirementId}`]
          if (requirementById){
            return requirementById;
          }
        }
        return {id: null, included: false, missing: false, extra: false, price: null};
      },
      getProposalRating(proposalId){
        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById ) {
            return `${JSON.stringify(proposalById.vendor.rank)}`;
          }
        }
        return "";
      },
      getProposalCancellationPolicy(proposalId){
        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById ) {
            return proposalById.candellationPolicy;
          }
        }
        return "";
      },
      getProposalValidUntil(proposalId){
        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById ) {
            return proposalById.validUntil;
          }
        }
        return "";
      },
      proposalSelectedInSlot(idx) {
        return !!this.selectedBlock.proposalComparison[idx];
      },
      populateProposals(){
        console.log("EventBlockComparison: ");

        _.each(this.selectedBlock.proposals,(item)=>{
          this.proposalsById[item.id] = item;
          this.availableProposals.push(item.id);

          _.each(item.included, (included)=>{
            this.requirementsById[`${item.id}__${included.requirementId}`] = { id: included.requirementId, included: true, missing: false, extra: false, price: null};
          });

          _.each(item.extras, (extra)=>{
            this.requirementsById[`${item.id}__${extra.requirementId}`] = { id: extra.requirementId, included: false, missing: false, extra: true, price: extra.price};
          });

          _.each(item.missing, (missing)=>{
            this.requirementsById[`${item.id}__${missing.requirementId}`] = { id: missing.requirementId, included: false, missing: true, extra: false, price: null};
          });
        });

        console.log(this.proposalsById);
        console.log(this.requirementsById);
        console.log(this.selectedBlock.values);

        this.$forceUpdate();
      },
      viewProposal(proposal) {
        if (proposal) {
          window.currentPanel = this.$showPanel({
            component: ViewProposal,
            cssClass: 'md-layout-item md-size-65 transition36 bg-white',
            openOn: 'right',
            props: {event: this.event, proposal: this.proposalsById[proposal], selectedBlock: this.selectedBlock}
          });
        }
      },
      addToCompare(proposalItem) {
        let proposalId = proposalItem.id;
        if ( this.selectedBlock.proposalComparison.length < 3 ) {
          this.selectedBlock.proposalComparison.push(proposalId);
        } else {
          this.selectedBlock.proposalComparison.splice(0,1);
          this.selectedBlock.proposalComparison.push(proposalId);
        }

        this.updateEventComponent();
      },
      removeFromCompare(proposalItem) {
        let proposalId = proposalItem.id;
        let i = _.indexOf( this.selectedBlock.proposalComparison, proposalId );

        if ( i !== -1 ) {
          this.selectedBlock.proposalComparison.splice( i, 1 );
        }
        this.updateEventComponent();
        this.$emit('update-comparison',this.selectedBlock.proposalComparison.length);
      },
      updateEventComponent() {
        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
        let event = new CalendarEvent({id: this.event.id});
        let selected_block = new EventComponent({id : this.selectedBlock.id});

        selected_block.proposalComparison = this.selectedBlock.proposalComparison;
        selected_block.for(calendar, event).save()
          .then(resp => {

          })
          .catch(error => {
            console.log('EventComponentVendor error =>',error)
          })
      }
    },
    created(title, proposal) {

    },
    mounted() {
      alert(JSON.stringify(this.selectedBlock.proposalComparison));
      this.populateProposals();
      //this.getBlockVendors();
    },
    computed: {

    },
    watch : {
      selectedBlock(newVal, oldVal) {
        this.populateProposals();
      }
    }
  }
</script>
<style lang="scss" scoped>

    .comparison-cell {
        border: 1px solid transparent;
        padding: 0;
        margin: 0;
        vertical-align: middle;

        &.category {
            width: 19%;
            max-width: 19%;
            min-width: 19%;
            text-align: left;
            padding: 8px 16px;

            .title {
                text-transform: none !important;
                font-size: 14px;
            }
            background-color: #fafafa;

        }

        &.category-outer-cell {
            width: 19%;
            max-width: 19%;
            min-width: 19%;
            text-align: left;
            padding: 8px 16px;

            .title {
                text-transform: none !important;
                font-size: 14px;
            }

        }

        &.border-bottom {
            border-bottom: 1px solid #ddd;
        }

        &.proposal {
            width: 27%;
            max-width: 27%;
            min-width: 27%;
            background-color: #fafafa;
        }

        &.outer-cell {
            width: 27%;
            max-width: 27%;
            min-width: 27%;
        }
    }

    .spacer {
        height: 24px;
    }
</style>
