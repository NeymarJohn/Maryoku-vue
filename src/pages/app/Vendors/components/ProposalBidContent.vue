<template>
  <div class="propsal-bid-content">
    <proposal-requirements
      label="Cost Requirements"
      key="cost"
      tableCategory="cost"
      :hasCategoryHeader="true"
      icon="Group+10662.svg"
      description="Mandatory elements to involve in proposals are in the table, you can add more here:"
    />
    <proposal-requirements
      tableCategory="included"
      label="Included in Price"
      icon="includedPrice.png"
      description="(from your “included in price” items)"
      key="included"
    />
    <proposal-requirements
      tableCategory="extra"
      label="Offered Extras"
      icon="cost-requirements.png"
      description="What elements would you like to suggest to the client with extra pay? "
      key="extra"
    />
    <proposal-upload-legal></proposal-upload-legal>
  </div>
</template>
<script>
import ProposalUploadLegal from "./ProposalUploadLegal";
import ProposalRequirements from "./ProposalRequirements.vue";
export default {
  components: {
    ProposalUploadLegal,
    ProposalRequirements,
  },
};
</script>
<style lang="scss" scoped>
</style>