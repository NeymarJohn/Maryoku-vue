<template>
  <div class="my-service white-card">
    <div class="services-header">
      <div class="service-tab-item active">Venue</div>
      <div class="service-tab-item">Catering</div>
      <div class="service-tab-item">Sign new service</div>
    </div>
    <service-content></service-content>
  </div>
</template>
<script>
import VueElementLoading from "vue-element-loading";
import { LabelEdit, Tabs } from "@/components";
import { mapGetters } from "vuex";
import ServiceContent from "./ServiceContent";
export default {
  components: {
    VueElementLoading,
    LabelEdit,
    Tabs,
    ServiceContent,
    // ProfileDetails,
    // Permissions,
  },
  data() {
    return {
      // auth: auth,
      userInfo: { role: "guest" },
      isLoading: false,
    };
  },

  mounted() {
    this.isLoading = true;
  },
  methods: {
    closePanel() {
      this.$emit("closePanel");
    },
  },
};
</script>
<style lang="scss" scoped>
.my-service {
  .services-header {
    height: 90px;
    display: flex;
    .service-tab-item {
      width: 250px;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:not(:last-child) {
        border-right: 1px solid #050505;
      }
      &.active {
        border-bottom: solid 5px #641856;
        font-weight: bold;
      }
    }
  }
}
</style>
