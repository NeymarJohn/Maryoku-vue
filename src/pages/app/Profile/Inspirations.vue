<template>
  <div class="profile-inspirations white-card">
    <div>SAVED INSPIRATIONS</div>
    <tabs :tab-name="['My Concpets', 'Saved From Wall']" color-button="info" plain class="profile-container white-card">
      <template slot="tab-pane-1"> </template>
      <template slot="tab-pane-2"> Payment </template>
    </tabs>
  </div>
</template>
<script>
import { LabelEdit, Tabs } from "@/components";
export default {
  components: {
    Tabs,
  },
};
</script>
<style lang="scss" scoped>
</style>