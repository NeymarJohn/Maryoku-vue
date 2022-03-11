<template>
  <div class="md-layout" style="height: 98vh; max-height: 98vh; overflow: hidden">
    <vue-element-loading :active="working" spinner="ring" color="#FF547C" />
    <div class="md-layout-item md-size-5" style="padding: 0; margin: 0;">
      <h4 class="md-title">
        <md-button class="md-button md-theme-default md-simple md-just-icon" @click="closePanel">
          <md-icon>arrow_back</md-icon>
        </md-button>
      </h4>
    </div>
    <div class="md-layout-item md-size-95" style="height: 90vh; max-height: 90vh; ">
      <h4 class="md-title" style="margin-bottom: 0; line-height: 51px;">
        Vendors Pool
      </h4>
      <div class="md-layout" style="overflow: auto; height: 90vh; max-height: 90vh; margin-top: 14px;">
        <div class="md-layout-item mx-auto">
          <vendors-pool :in-panel="true" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueElementLoading from "vue-element-loading";
import VendorsPool from "./VendorsPool";

export default {
  name: "VendorsPoolPanel",
  components: {
    VueElementLoading,
    VendorsPool
  },
  data () {
    return {
      working: false
    };
  },
  computed: {},
  watch: {},
  mounted () {

  },
  methods: {
    closePanel () {
      this.$emit("closePanel");
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
