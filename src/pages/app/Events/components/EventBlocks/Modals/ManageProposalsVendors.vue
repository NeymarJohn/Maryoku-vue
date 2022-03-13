<template>
  <div class="md-layout" />
</template>
<script>
import EventComponentVendor from "@/models/EventComponentVendor";

export default {
  name: "ManageProposalsVendors",
  components: {},
  data() {
    return {
      isLoading: false,
      blockVendors: [],
      filteredBlockVendors: [],
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    getBuildingBlocksVendors() {
      new EventComponentVendor()
        .for(calendar, event, selected_block)
        .get()
        .then((resp) => {
          this.isLoading = false;
          this.blockVendors = resp;
          this.filteredBlockVendors = this.blockVendors;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log("EventComponentVendor error =>", error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
