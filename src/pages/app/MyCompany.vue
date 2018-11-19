<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-50 md-medium-size-100">
      <tabs
        :tab-name="['Home', 'Settings']"
        :tab-icon="['dashboard', 'schedule']"
        flex-column
        nav-pills-icons
        color-button="rose">

        <!-- here you can add your content for tab-content -->
        <template slot="tab-pane-1">
          Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
          <br><br>
          Dramatically visualize customer directed convergence without revolutionary ROI. Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
        </template>
        <template slot="tab-pane-2">
          Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
          <br><br>
          Dramatically maintain clicks-and-mortar solutions without functional solutions.
        </template>
      </tabs>
    </div>
  </div>
</template>

<script>
  import { Tabs } from "@/components";

export default {
  components: {
    Tabs,
  },
  data() {
    return {};
  }
};
</script>
