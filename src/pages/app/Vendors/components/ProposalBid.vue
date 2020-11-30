<template>
  <div class="collapse-panel card proposal-bid">
    <div class="collapse-panel-header d-flex align-center justify-content-between" @click="isExpanded = !isExpanded">
      <div class="text-cont d-flex">
        <h3 class="title font-bold">
          <img :src="`${$iconURL}NewSubmitPorposal/Asset 614.svg`" class="page-icon mr-10" />
          {{ categoryName }}
        </h3>
        <h5 v-if="isExpanded" class="ml-10">For Whole Event</h5>
      </div>
      <div class="action">
        <img v-if="isExpanded" :src="`${$iconURL}NewSubmitPorposal/Group 3671 (2).svg`" class="label-icon" />
        <img v-else :src="`${$iconURL}NewSubmitPorposal/Asset 567.svg`" class="label-icon" />
      </div>
    </div>
    <div class="collapse-panel-content" v-if="isExpanded">
      <proposal-service-table :category="vendor.eventCategory.key"></proposal-service-table>
    </div>
  </div>
</template>
<script>
import ProposalServiceTable from "./ProposalServiceTable";

export default {
  data() {
    return {
      category: "",
      isExpanded: true,
      files: [],
    };
  },
  methods: {
    toggle() {
      this.isExpanded = !this.isExpanded;
    },
    getFileByTag(tag) {
      const file = this.files.filter((f) => f.tag == tag);
      if (file.length > 0) {
        return file[0].filename;
      } else {
        return null;
      }
    },
  },
  components: {
    ProposalServiceTable,
  },
  computed: {
    categoryName() {
      return this.$store.state.vendorProposal.vendor.eventCategory.fullTitle;
    },
    vendor() {
      return this.$store.state.vendorProposal.vendor;
    },
  },
};
</script>
<style lang="scss" scoped>
.proposal-bid {
  margin-top: 50px;
}
.collapse-panel {
  background-color: white;
  .collapse-panel-header {
    position: relative;

    padding: 20px 40px;
    .collapse-button {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      .icon {
        font-size: 35px !important;
      }
    }
  }
  .collapse-panel-content {
    padding: 0px 34px 34px;
  }
}
</style>