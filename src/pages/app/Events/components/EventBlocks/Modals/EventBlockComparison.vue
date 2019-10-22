<template>
  <div  class="event-blocks-comparison-panel" style="height: 100%;">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" background-color="#eee"/>
    <!-- Selected Proposals list -->
    <!-- <div  class="selected-proposals-list" style="height: 100%;" v-if="selectedBlock.proposals && selectedBlock.proposals.length > 0"> -->
    <div  class="selected-proposals-list" style="height: 100%;">
      <table ref="content" style="width: 100%; height: 100%;" cellspacing="0" colpadding="0">
        <tr>
          <td class="comparison-cell category-outer-cell" style="vertical-align: top; padding : 0;">
          </td>
          <td class="comparison-cell outer-cell" style="padding: 4px 24px;">
            <multiselect id="0" 
              v-model="selectedBlock.proposalComparison1" 
              @select="addToCompare" 
              @remove="removeFromCompare" 
              style="height: 0;" 
              placeholder="Select proposal" 
              :searchable="false" 
              :allow-empty="true" 
              :options="selectableProposals" 
              selectLabel="" 
              deselectLabel="">
              <template slot="singleLabel" slot-scope="props">
                <span class="option__title">{{ getProposalName(props.option) }}</span>
              </template>
              <template slot="option" slot-scope="props">
                <div class="option__desc"><i class="fa fa-check" v-if="props.option === selectedBlock.proposalComparison1"></i> <span class="option__title">{{ getProposalName(props.option) }}</span></div>
              </template>
            </multiselect>
            <div class="spacer"></div>
            <md-button class="md-danger md-sm" @click="viewProposal(selectedBlock.proposalComparison1)">View Proposal</md-button>
            <h4 style="font-weight: 500; min-height: 24px;">{{getProposalPrice(selectedBlock.proposalComparison1)}}</h4>
          </td>
          <td class="comparison-cell outer-cell" style="padding: 4px 24px;">
            <multiselect id="1" 
              v-model="selectedBlock.proposalComparison2" 
              @select="addToCompare" 
              @remove="removeFromCompare" 
              style="height: 0;" 
              placeholder="Select proposal" 
              :searchable="false" 
              :allow-empty="true" 
              :options="selectableProposals" 
              selectLabel="" 
              deselectLabel="">
              <template slot="singleLabel" slot-scope="props">
                <span class="option__title">{{ getProposalName(props.option) }}</span>
              </template>
              <template slot="option" slot-scope="props">
                <div class="option__desc"><i class="fa fa-check" v-if="props.option === selectedBlock.proposalComparison1"></i> <span class="option__title">{{ getProposalName(props.option) }}</span></div>
              </template>
            </multiselect>
            <div class="spacer"></div>
            <md-button class="md-danger md-sm" @click="viewProposal(selectedBlock.proposalComparison2)">View Proposal</md-button>
            <h4 style="font-weight: 500; min-height: 24px;">{{getProposalPrice(selectedBlock.proposalComparison2)}}</h4>
          </td>
          <td class="comparison-cell outer-cell" style="padding: 4px 24px;">
            <multiselect id="2" v-model="selectedBlock.proposalComparison3" @select="addToCompare" @remove="removeFromCompare" style="height: 0;" placeholder="Select proposal" :searchable="false" :allow-empty="true" :options="selectableProposals" selectLabel="" deselectLabel="" selectedLabel="" >
              <template slot="singleLabel" slot-scope="props">
                <span class="option__title">{{ getProposalName(props.option) }}</span>
              </template>
              <template slot="option" slot-scope="props">
                <div class="option__desc"><i class="fa fa-check" v-if="props.option === selectedBlock.proposalComparison1"></i> <span class="option__title">{{ getProposalName(props.option) }}</span></div>
              </template>
            </multiselect>
            <div class="spacer"></div>
            <md-button class="md-danger md-sm" @click="viewProposal(selectedBlock.proposalComparison3)">View Proposal</md-button>
            <h4 style="font-weight: 500; min-height: 24px;">{{getProposalPrice(selectedBlock.proposalComparison3)}}</h4>
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
                        {{getProposalPrice(selectedBlock.proposalComparison1)}}
                      </h5>
                    </td>
                    <td class="comparison-cell proposal">
                      <h5 class="title" style="font-weight: 400; font-size: 14px;">
                        {{getProposalPrice(selectedBlock.proposalComparison2)}}
                      </h5>
                    </td>
                    <td class="comparison-cell proposal">
                      <h5 class="title" style="font-weight: 400; font-size: 14px;">
                        {{getProposalPrice(selectedBlock.proposalComparison3)}}
                      </h5>
                    </td>
                  </tr>
                  <tr>
                    <td class="comparison-cell category">
                      <h6 class="title">Per guest</h6>
                    </td>
                    <td class="comparison-cell proposal">
                      <h5 class="title" style="font-weight: 400; font-size: 14px;">
                        {{getProposalPricePerGuest(selectedBlock.proposalComparison1)}}
                      </h5>
                    </td>
                    <td class="comparison-cell proposal">
                      <h5 class="title" style="font-weight: 400; font-size: 14px;">
                        {{getProposalPricePerGuest(selectedBlock.proposalComparison2)}}
                      </h5>
                    </td>
                    <td class="comparison-cell proposal">
                      <h5 class="title" style="font-weight: 400; font-size: 14px;">
                        {{getProposalPricePerGuest(selectedBlock.proposalComparison3)}}
                      </h5>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4" class="spacer"></td>
                  </tr>
                  <tr>
                    <td class="comparison-cell category border-bottom">
                      <h6 class="title">Requirements</h6>
                    </td>
                    <td class="comparison-cell proposal border-bottom">
                      {{getProposalRequirementsFulfilled(selectedBlock.proposalComparison1)}}
                    </td>
                    <td class="comparison-cell proposal border-bottom">
                      {{getProposalRequirementsFulfilled(selectedBlock.proposalComparison2)}}
                    </td>
                    <td class="comparison-cell proposal border-bottom">
                      {{getProposalRequirementsFulfilled(selectedBlock.proposalComparison3)}}
                    </td>
                  </tr>
                  <tr v-for="(requirement, index) in selectedBlock.values">
                    <td class="comparison-cell category">
                      <h6 class="title small" v-tooltip="requirement.comment">
                        {{requirement.title}}
                      </h6>
                    </td>
                    <td class="comparison-cell proposal">
                      <md-icon v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison1,requirement.id).included">check</md-icon>
                      <md-icon v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison1,requirement.id).missing">close</md-icon>
                      <span v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison1,requirement.id).extra">${{getProposalRequirementFulfillment(selectedBlock.proposalComparison1,requirement.id).price}}</span>
                    </td>
                    <td class="comparison-cell proposal">
                      <md-icon v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison2,requirement.id).included">check</md-icon>
                      <md-icon v-else-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison2,requirement.id).missing">close</md-icon>
                      <span v-else-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison2,requirement.id).extra">${{getProposalRequirementFulfillment(selectedBlock.proposalComparison2,requirement.id).price}}</span>
                    </td>
                    <td class="comparison-cell proposal">
                      <md-icon v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison3,requirement.id).included">check</md-icon>
                      <md-icon v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison3,requirement.id).missing">close</md-icon>
                      <span v-if="getProposalRequirementFulfillment(selectedBlock.proposalComparison3,requirement.id).extra">${{getProposalRequirementFulfillment(selectedBlock.proposalComparison3,requirement.id).price}}</span>
                    </td>
                  </tr>
                </table>
              </md-card-content>
            </md-card>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="spacer"></td>
        </tr>
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
                      <div class="star-rating" v-if="selectedBlock.proposalComparison1">
                        <label class="star-rating__star"
                          v-for="rating in ratings"
                          :class="{'is-selected' : ((getProposalRating(selectedBlock.proposalComparison1) >= rating) && getProposalRating(selectedBlock.proposalComparison1) != null)}">
                        <input class="star-rating star-rating__checkbox" type="radio">★</label>
                        <span class="small">(0)</span>
                      </div>
                    </td>
                    <td class="comparison-cell proposal">
                      <div class="star-rating" v-if="selectedBlock.proposalComparison2">
                        <label class="star-rating__star"
                          v-for="rating in ratings"
                          :class="{'is-selected' : ((getProposalRating(selectedBlock.proposalComparison2) >= rating) && getProposalRating(selectedBlock.proposalComparison2) != null)}">
                        <input class="star-rating star-rating__checkbox" type="radio">★</label>
                        <span class="small">(0)</span>
                      </div>
                    </td>
                    <td class="comparison-cell proposal">
                      <div class="star-rating" v-if="selectedBlock.proposalComparison3">
                        <label class="star-rating__star"
                          v-for="rating in ratings"
                          :class="{'is-selected' : ((getProposalRating(selectedBlock.proposalComparison3) >= rating) && getProposalRating(selectedBlock.proposalComparison3) != null)}">
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
        <tr>
          <td colspan="4" class="spacer"></td>
        </tr>
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
                        {{getProposalCancellationPolicy(selectedBlock.proposalComparison1)}}
                      </p>
                    </td>
                    <td class="comparison-cell proposal">
                      <p>
                        {{getProposalCancellationPolicy(selectedBlock.proposalComparison2)}}
                      </p>
                    </td>
                    <td class="comparison-cell proposal">
                      <p>
                        {{getProposalCancellationPolicy(selectedBlock.proposalComparison3)}}
                      </p>
                    </td>
                  </tr>
                </table>
              </md-card-content>
            </md-card>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="spacer"></td>
        </tr>
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
  import Calendar from '@/models/Calendar';
  import CalendarEvent from '@/models/CalendarEvent';
  import EventComponent from '@/models/EventComponent';

  import ViewProposal from './ViewProposal.vue';
  import VueElementLoading from 'vue-element-loading';
  import _ from 'underscore';
  import numeral from 'numeral';

  import jsPDF from 'jspdf';
  import html2canvas from 'html2canvas';

  export default {
    name: 'event-block-proposal-vendors',
    components: {
      VueElementLoading,
      ViewProposal
    },
    props: {
      selectedBlock: Object,
      event: Object,
      blockVendors: Array,

    },
    data: () => ({
      isLoading: false,
      ratings: [1, 2, 3, 4, 5],
      selectableProposals: [],
      proposalsById: {},
      requirementsById: {},

    }),
    methods: {
      getProposalPrice(proposalId) {
        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById) {
            return `$${proposalById.cost  | numeral('0,0.0')}`;
          }
        }
        return "";
      },
      getProposalPricePerGuest(proposalId) {
        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById && proposalById.cost) {
            return `$${(proposalById.cost / this.event.numberOfParticipants)  | numeral('0,0.0')}`;
          }
        }
        return "";
      },
      getProposalRequirementsFulfilled(proposalId) {
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
      getProposalRequirementFulfillment(proposalId, requirementId) {
        if (proposalId && requirementId) {
          let requirementById = this.requirementsById[`${proposalId}__${requirementId}`]
          if (requirementById) {
            return requirementById;
          }
        }
        return {
          id: null,
          included: false,
          missing: false,
          extra: false,
          price: null
        };
      },
      getProposalRating(proposalId) {
        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById) {
            return `${JSON.stringify(proposalById.vendor.rank)}`;
          }
        }
        return "";
      },
      getProposalCancellationPolicy(proposalId) {
        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById) {
            return proposalById.candellationPolicy;
          }
        }
        return "";
      },
      getProposalValidUntil(proposalId) {
        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById) {
            return proposalById.validUntil;
          }
        }
        return "";
      },
      getProposalName(proposalId) {
        if (proposalId === "0") return "None";

        if (proposalId) {
          let proposalById = this.proposalsById[proposalId]
          if (proposalById) {
            return proposalById.vendor.vendorDisplayName;
          }
        }
        return "Unknown";
      },
      populateProposals() {
        console.log("EventBlockComparison: ");
        console.log(this.selectedBlock);

        _.each(this.selectedBlock.proposals, (item) => {
          this.proposalsById[item.id] = item;
          this.selectableProposals.push(item.id);

          _.each(item.included, (included) => {
            this.requirementsById[`${item.id}__${included.requirementId}`] = {
              id: included.requirementId,
              included: true,
              missing: false,
              extra: false,
              price: null
            };
          });

          _.each(item.extras, (extra) => {
            this.requirementsById[`${item.id}__${extra.requirementId}`] = {
              id: extra.requirementId,
              included: false,
              missing: false,
              extra: true,
              price: extra.price
            };
          });

          _.each(item.missing, (missing) => {
            this.requirementsById[`${item.id}__${missing.requirementId}`] = {
              id: missing.requirementId,
              included: false,
              missing: true,
              extra: false,
              price: null
            };
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
            props: {
              event: this.event,
              proposal: this.proposalsById[proposal],
              selectedBlock: this.selectedBlock
            }
          });
        }
      },
      addToCompare(proposalItem, idx) {
        /*if (proposalItem === "0"){
          this.selectedBlock.proposalComparison[Number(idx)] = null;
        } else {
          this.selectedBlock.proposalComparison[Number(idx)] = proposalItem;
          this.selectableProposals = ["0"];
          _.each(this.selectedBlock.proposals,(item)=> {
            if (_.indexOf(this.selectedBlock.proposalComparison, item.id) === -1) {
              this.selectableProposals.push(item.id);
            }
          });
        }*/
        switch (idx) {
          case 0:
            this.selectedBlock.proposalComparison1 = proposalItem;
            break;
          case 1:
            this.selectedBlock.proposalComparison2 = proposalItem;
            break;
          case 2:
            this.selectedBlock.proposalComparison3 = proposalItem;
            break;
        }
        this.updateEventComponent();
      },
      removeFromCompare(proposalItem, idx) {
        /*this.selectedBlock.proposalComparison[Number(idx)] = null;
        this.selectableProposals = ["0"];
        _.each(this.selectedBlock.proposals,(item)=> {
          if (_.indexOf(this.selectedBlock.proposalComparison, item.id) === -1) {
            this.selectableProposals.push(item.id);
          }
        });*/

        switch (idx) {
          case 0:
            this.selectedBlock.proposalComparison1 = null;
            break;
          case 1:
            this.selectedBlock.proposalComparison2 = null;
            break;
          case 2:
            this.selectedBlock.proposalComparison3 = null;
            break;
        }

        this.updateEventComponent();

        let count = 0;
        if (this.selectedBlock.proposalComparison1) {
          count++;
        }
        if (this.selectedBlock.proposalComparison2) {
          count++;
        }
        if (this.selectedBlock.proposalComparison3) {
          count++;
        }
        this.$emit('update-comparison', count);
      },
      updateEventComponent() {
        let calendar = new Calendar({
          id: this.$auth.user.defaultCalendarId
        });
        let event = new CalendarEvent({
          id: this.event.id
        });
        let selected_block = new EventComponent({
          id: this.selectedBlock.id
        });
        selected_block.proposalComparison1 = this.selectedBlock.proposalComparison1;
        selected_block.proposalComparison2 = this.selectedBlock.proposalComparison2;
        selected_block.proposalComparison3 = this.selectedBlock.proposalComparison3;
        selected_block.for(calendar, event).save()
          .then(resp => {
            console.log(resp);
            this.$forceUpdate();
          })
          .catch(error => {
            console.log('EventComponentVendor error =>', error)
            this.$forceUpdate();
          })
      },
      exportToPDF() {
        const doc = new jsPDF('p', 'mm', 'a3');
        /** WITH CSS */
        var canvasElement = document.createElement('canvas');
        html2canvas(this.$refs.content, {
          canvas: canvasElement,
          scale: 1
        }).then(function (canvas) {
          const img = canvas.toDataURL("image/png");

          doc.addImage(img, 'PNG', 20, -10);
          doc.save("sample.pdf");

        });


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
    watch: {
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
      width: 25%;
      max-width: 25%;
      min-width: 25%;
      text-align: left;
      padding: 8px 16px;
      .title {
        text-transform: none !important;
        font-size: 14px;
      }
      background-color: #fafafa;
    }
    &.category-outer-cell {
      width: 25%;
      max-width: 25%;
      min-width: 25%;
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
      width: 25%;
      max-width: 25%;
      min-width: 25%;
      background-color: #fafafa;
    }
    &.outer-cell {
      width: 25%;
      max-width: 25%;
      min-width: 25%;
    }
  }

  .spacer {
    height: 24px;
  }
</style>