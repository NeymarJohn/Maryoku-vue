<template>
  <div class="for-proposal-wrapper">
    <div class="md-layout justify-content-between">
      <div class="md-layout-item md-size-70">
        <proposal-steps :step="3"></proposal-steps>
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
import ProposalAddFiles from './components/ProposalAddFiles.vue'
import ProposalTitleWithIcon from './components/ProposalTitleWithIcon.vue'
import ProposalAddPersonalMessage from './components/ProposalAddPersonalMessage.vue'

export default {
  components: {
    ProposalBudgetSummary,
    ProposalSteps,
    ProposalAddFiles,
    ProposalTitleWithIcon,
    ProposalAddPersonalMessage
  },
  data() {
    return {
    }
  },
  created() {
    this.$auth.currentUser(this, true, function () {
    }.bind(this));
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
  }
</style>
