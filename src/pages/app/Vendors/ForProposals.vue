<template>
  <div class="for-proposal-wrapper">
    <div class="md-layout justify-content-between">
      <div class="md-layout-item md-size-70">
        <proposal-steps :step="step"></proposal-steps>
        <div class="step-wrapper" v-if="step < 2">
          <proposal-item
            :category="`Venue`"
          >
          </proposal-item>
          <proposal-title-with-icon
            :icon="`message`"
            :title="`Add Personal message`"
            :desc="`*suggested`"
          ></proposal-title-with-icon>
          <proposal-add-personal-message
            :desc="`Write something nice, we'll add it to the final proposal`"
          ></proposal-add-personal-message>
          <proposal-title-with-icon
            :icon="`attachment`"
            :title="`Add Files`"
            :desc="`First mandatory files, and than other`"
          ></proposal-title-with-icon>
          <proposal-add-files></proposal-add-files>
        </div>
        <div class="step-wrapper" v-if="step == 2">
          <h3>
            Can you also provide these services for this event?
          </h3>
          <p>
            Did you know? Adding vendors gets your fair commission if they get picked!
          </p>
          <proposal-item
            :category="`Photographer`"
            :isCollapsed="true"
            :isDropdown="true"
            :proposalRange="false"
          >
          </proposal-item>
          <proposal-item
            :category="`Bar`"
            :isCollapsed="true"
            :isDropdown="true"
            :proposalRange="true"
          >
          </proposal-item>
          <proposal-item
            :category="`Dj`"
            :isCollapsed="true"
            :isDropdown="true"
            :proposalRange="true"
          >
          </proposal-item>
          <refer-new-vendor></refer-new-vendor>
        </div>
        <div class="step-wrapper" v-if="step == 3">
          <proposal-event-summary
            :title="`Event Information & Details`"
            :eventData="event"
            :isEdit="false"
          >
          </proposal-event-summary>          
        </div>
      </div>
      <div class="md-layout-item md-size-30">
        <proposal-budget-summary></proposal-budget-summary>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Vendors from '@/models/Vendors'

//COMPONENTS
import Icon from '@/components/Icon/Icon.vue'
import ProposalBudgetSummary from './components/ProposalBudgetSummary.vue'
import ProposalSteps from './components/ProposalSteps.vue'
import ProposalItem from './components/ProposalItem.vue'
import ProposalAddFiles from './components/ProposalAddFiles.vue'
import ProposalTitleWithIcon from './components/ProposalTitleWithIcon.vue'
import ProposalAddPersonalMessage from './components/ProposalAddPersonalMessage.vue'
import ReferNewVendor from './components/ReferNewVendor.vue'
import ProposalEventSummary from './components/ProposalEventSummary.vue'

export default {
  components: {
    ProposalBudgetSummary,
    ProposalItem,
    ProposalSteps,
    ProposalAddFiles,
    ProposalTitleWithIcon,
    ProposalAddPersonalMessage,
    ProposalEventSummary,
    ReferNewVendor
  },
  data() {
    return {
      step: 0
    }
  },
  created() {
    this.$auth.currentUser(this, true, function () {
    }.bind(this));
  },
  mounted () {
    this.step = 3
    this.event = {
      name: "March Madness event",
      date: "December 25, 2019",
      arrival_time: "11:00AM"
    }
  },
  methods: {
    
  },
  computed: {
  },
  watch: {
  },
  filters: {
  },
};
</script>
<style lang="scss" scoped>
  .for-proposal-wrapper {
    background-color: #f5f5f5;
    padding: 64px 45px;
    color: #050505;

    .step-wrapper {
      h3 {
        font-size: 30px;
        font-weight: 800;
        margin-top: 3em;
        margin-bottom: 0.5em;
      }
      p {
        font-size: 14px;
        font-weight: normal;
        margin: 0;
      }
    }
  }
</style>
