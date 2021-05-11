<template>
  <div class="requirements-drawer">
    <div class="requirements-drawer-header">
      <div>
        <div>YOUR CHOICES</div>
        Our vendors will create proposals based on your choices, Caterogies that are missing those will be open to the
        vendors discretion
      </div>
      <progress-radial-bar></progress-radial-bar>
    </div>
    <div class="requirements-drawer-content">
      <collapse-panel>
        <template slot="header">
          <div class="d-flex align-center p-50 font-size-30 font-bold">Open ‘Save The Date’ Campaign</div>
        </template>
        <template slot="content"> Venue </template>
      </collapse-panel>
    </div>
  </div>
</template>
<script>
import CollapsePanel from "@/components/CollapsePanel.vue";
import ProgressRadialBar from "./components/ProgressRadialBar.vue";

export default {
  components: {
    ProgressRadialBar,
    CollapsePanel,
  },
};
</script>

<style scoped>
</style>