<template>
    <div class="event-blocks-comparison-panel" style="height: 100%;">
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" background-color="#eee"/>
        <!-- Selected Proposals list -->

        <div class="selected-proposals-list" style="height: 100%;" v-if="selectedBlock.proposals && selectedBlock.proposals.length > 0">

            <table style="width: 100%; height: 100%;" cellspacing="0" colpadding="0">
                <tr>
                    <td class="comparison-cell category-outer-cell"></td>
                    <td class="comparison-cell outer-cell" style="padding: 4px 24px;">
                        <multiselect v-model="selectedBlock.proposalComparison[0]" style="height: 0;" track-by="id" label="vendor.vendorDisplayName" placeholder="Select proposal" :searchable="false" :allow-empty="true" :options="selectedBlock.proposals"></multiselect>
                        <div class="spacer"></div>
                        <md-button class="md-danger md-sm" @click="viewProposal(selectedBlock.proposalComparison[0])">View Proposal</md-button>
                        <h4 style="font-weight: 500;">${{getProposalPrice(selectedBlock.proposalComparison[0])}}</h4>
                    </td>
                    <td class="comparison-cell outer-cell" style="padding: 4px 24px;">
                        <multiselect v-model="selectedBlock.proposalComparison[1]" style="height: 0;" track-by="vendor.vendorDisplayName" label="vendor.vendorDisplayName" placeholder="Select proposal" :searchable="false" :allow-empty="true" :options="selectedBlock.proposals"></multiselect>
                        <div class="spacer"></div>
                        <md-button class="md-danger md-sm" @click="viewProposal(selectedBlock.proposalComparison[1])">View Proposal</md-button>
                        <h4 style="font-weight: 500;">${{getProposalPrice(selectedBlock.proposalComparison[1])}}</h4>
                    </td>
                    <td class="comparison-cell outer-cell" style="padding: 4px 24px;">
                        <multiselect v-model="selectedBlock.proposalComparison[2]" style="height: 0;" track-by="vendor.vendorDisplayName" label="vendor.vendorDisplayName" placeholder="Select proposal" :searchable="false" :allow-empty="true" :options="selectedBlock.proposals"></multiselect>
                        <div class="spacer"></div>
                        <md-button class="md-danger md-sm" @click="viewProposal(selectedBlock.proposalComparison[2])">View Proposal</md-button>
                        <h4 style="font-weight: 500;">${{getProposalPrice(selectedBlock.proposalComparison[2])}}</h4>
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
                                                ${{getProposalPrice(selectedBlock.proposalComparison[0])}}
                                            </h5>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <h5 class="title" style="font-weight: 400; font-size: 14px;">
                                                ${{getProposalPrice(selectedBlock.proposalComparison[1])}}
                                            </h5>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <h5 class="title" style="font-weight: 400; font-size: 14px;">
                                                ${{getProposalPrice(selectedBlock.proposalComparison[2])}}
                                            </h5>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="comparison-cell category">
                                            <h6 class="title">Per guest</h6>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <h5 class="title" style="font-weight: 400; font-size: 14px;">
                                                ${{getProposalPricePerGuest(selectedBlock.proposalComparison[0]) | numeral('0,0')}}
                                            </h5>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <h5 class="title" style="font-weight: 400; font-size: 14px;">
                                                ${{getProposalPricePerGuest(selectedBlock.proposalComparison[1]) | numeral('0,0')}}
                                            </h5>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <h5 class="title" style="font-weight: 400; font-size: 14px;">
                                                ${{getProposalPricePerGuest(selectedBlock.proposalComparison[2]) | numeral('0,0')}}
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
                                            <md-icon v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison[1],requirement.id).missing">close</md-icon>
                                            <span v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison[1],requirement.id).extra">${{getProposalRequirementFulfillment(selectedBlock.proposalComparison[1],requirement.id).price}}</span>
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
                                        <td class="comparison-cell proposal">***** (12)</td>
                                        <td class="comparison-cell proposal">**** (9)</td>
                                        <td class="comparison-cell proposal">***** (1)</td>
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
                                                We charge a fee out of the total amount depending on the time of the cancellation notice.
                                                +30 days before: 1%
                                                30 to week before: 2.5%
                                                Week to 2 days before: 5%
                                                Day of the event: 60%
                                            </p>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <p>
                                                The cancellation fees are set by the cancellation period.
                                                3%: Up to 2 days before the event.
                                                40%: same day notice
                                            </p>
                                        </td>
                                        <td class="comparison-cell proposal">
                                            <p>
                                                You can cancel for free up to 2 days before the event. Cancelling on the same day will be 5% of the total transaction fee.
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
  import VueElementLoading from 'vue-element-loading'
  import _ from 'underscore'
  import numeral from 'numeral'

  export default {
    name: 'event-block-proposal-vendors',
    components: {
      VueElementLoading,
    },
    props: {
      selectedBlock : Object,
      event : Object,
      blockVendors : Array,

    },
    data: () => ({
      isLoading:false,
      ratings: [1, 2, 3, 4, 5],

      proposalsById: {},
      requirementsById: {},

    }),
    methods: {
      getProposalPrice(proposalId){
        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById) {
            return proposalById.cost  | numeral('0,0.0');
          }
        }
        return 0.0;
      },
      getProposalPricePerGuest(proposalId){
        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById && proposalById.cost) {
            return (proposalById.cost / this.event.numberOfParticipants)  | numeral('0,0.0');
          }
        }
        return 0.0;
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
        return "0/0";
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
      proposalSelectedInSlot(idx) {
        return !!this.selectedBlock.proposalComparison[idx];
      },
      populateProposals(){
        console.log("EventBlockComparison: ");

        _.each(this.selectedBlock.proposals,(item)=>{
          this.proposalsById[item.id] = item;

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
      }
    },
    created(title, proposal) {

    },
    mounted() {
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
