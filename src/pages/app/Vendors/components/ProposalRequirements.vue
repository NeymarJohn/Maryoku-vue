<template>
  <div class="collapse-panel white-card card proposal-bid">
    <div class="collapse-panel-header" @click="isExpanded = !isExpanded">
      <div class="d-flex align-center justify-content-between">
        <div class="text-cont d-flex">
          <h3 class="title font-bold">
            <img :src="`${$iconURL}NewSubmitPorposal/${icon}`" class="page-icon mr-10" />
            {{ label }}
          </h3>
        </div>
        <div class="action">
          <md-icon style="color: #a0a0a0; font-size: 30px !important" v-if="isExpanded">keyboard_arrow_right</md-icon>
          <md-icon style="color: #a0a0a0; font-size: 30px !important" v-else>keyboard_arrow_down</md-icon>
        </div>
      </div>
      <div>
        {{ description }}
      </div>
    </div>
    <div class="collapse-panel-content" v-if="isExpanded">
      <proposal-add-item-form></proposal-add-item-form>
      <proposal-service-table
        :category="vendor.eventCategory.key"
        :tableCategory="tableCategory"
      ></proposal-service-table>
    </div>
  </div>
</template>
<script>
import ProposalAddItemForm from "./ProposalAddItemForm.vue";
import ProposalServiceTable from "./ProposalServiceTable";

export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    hasCategoryHeader: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    description: String,
    tableCategory: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      category: "",
      isExpanded: false,
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
    ProposalAddItemForm,
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
  hr {
    background-color: #dddddd;
    margin: 0 40px;
  }
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