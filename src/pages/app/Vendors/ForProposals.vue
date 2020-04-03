<template>
  <div class="for-proposal-wrapper">
    <div class="md-layout justify-content-between">
      <div class="md-layout-item md-size-70">
        <proposal-steps :step="step"></proposal-steps>
        <div class="step-wrapper" v-if="step < 2">
          <proposal-add-personal-message
            :title="`Let's begin with a perosnal message`"
            :desc="`Write something nice, we'll add it to the final proposal`"
            :img="`${iconUrl}Asset 611.svg`"
          ></proposal-add-personal-message>
          <proposal-item
            :category="`Venue`"
            :subTitle="`For Whole Event`"
            :img="`${iconUrl}Asset 614.svg`"
            :step="step"
          >
          </proposal-item>
          <proposal-item
            :category="`Catering`"
            :subTitle="`9:00 AM - 12:00AM`"
            :img="`${iconUrl}Asset 615.svg`"
            :step="step"
          >
          </proposal-item>
        </div>
        <div class="step-wrapper" v-if="step == 2">
          <h3>
            Can you also provide these services for this event?
          </h3>
          <p>
            <img :src="`${iconUrl}Group 5280 (5).svg`"/>Did you know? Adding vendors gets your fair commission if they get picked!
          </p>
          <proposal-item
            :category="`Photographer`"
            :isCollapsed="true"
            :isDropdown="true"
            :proposalRange="false"
            :img="`${iconUrl}Asset 607.svg`"
            :step="step"
          >
          </proposal-item>
          <proposal-item
            :category="`Bar`"
            :isCollapsed="true"
            :isDropdown="true"
            :proposalRange="true"
            :img="`${iconUrl}Asset 606.svg`"
            :step="step"
          >
          </proposal-item>
          <proposal-item
            :category="`Dj`"
            :isCollapsed="true"
            :isDropdown="true"
            :proposalRange="true"
            :img="`${iconUrl}Asset 605.svg`"
            :step="step"
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
        <proposal-budget-summary
          :bundleDiscount="true"
          :warning="true"
          :additional="true"
          :isEdit="true"
        ></proposal-budget-summary>
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
      step: 0,
      iconUrl: 'http://static.maryoku.com/storage/icons/NewSubmitPorposal/',
    }
  },
  created() {
    this.$auth.currentUser(this, true, function () {
    }.bind(this));
  },
  mounted () {
    this.step = 1
    this.event = {
      name: "March Madness event",
      date: "December 25, 2019",
      arrival_time: "11:00AM"
    }
    this.$root.$on('next-step-vendor-proposal', () => {
      console.log('next')
      if (this.step == 1) {
        this.step = 2
      }
    })
    this.$root.$on('prev-step-vendor-proposal', () => {
      console.log('prev')
      if (this.step > 1) {
        this.step--
      }
    })
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

        img {
          width: 27px;
          margin-right: 15px;
        }
      }
    }
  }
</style>
