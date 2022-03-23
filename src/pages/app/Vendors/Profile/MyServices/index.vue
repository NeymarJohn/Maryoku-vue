<template>
  <div v-if="vendorData" class="my-service white-card">
    <carousel :items="4" :margin="25" :dots="false" :number="2" :nav="false" class="services-header">
      <template slot="prev">
        <button class="nav-left nav-btn">
          <span><md-icon>arrow_left</md-icon></span>
        </button>
      </template>
      <div class="service-tab-item" :class="{ active: selectedIndex === 0 }" @click="selectService(0)">
        <img
          v-if="vendorData.vendorCategories"
          :src="`${$iconURL}Budget Elements/${getServiceCategory(vendorData.vendorCategories[0]).icon}`"
          class="page-icon mr-10"
        >
        {{ getServiceCategory(vendorData.vendorCategories[0]).title }}
      </div>
      <div
        v-for="(service, index) in vendorData.secondaryServices"
        :key="index"
        class="service-tab-item"
        :class="{ active: selectedIndex === index + 1 }"
        @click="selectService(index + 1)"
      >
        <img
          :src="`${$iconURL}Budget Elements/${getServiceCategory(service.vendorCategory).icon}`"
          class="page-icon mr-10"
        >
        {{ getServiceCategory(service.vendorCategory).title }}
      </div>
      <div class="service-tab-item font-size-16">
        <md-button class="maryoku-btn md-simple md-vendor" @click="startAddNewService">
          <md-icon class="color-purple font-size-30 mr-5">
            add
          </md-icon>
          Sign new service
        </md-button>
      </div>
      <template slot="next">
        <button class="nav-right nav-btn">
          <md-icon>
            arrow_right
          </md-icon>
        </button>
      </template>
    </carousel>

    <service-content
      :key="getSelectedServiceCategory().key"
      :service-category="getSelectedServiceCategory()"
    />
  </div>
</template>
<script>
const components = {
    ServiceContent: () => import("./ServiceContent.vue"),
    carousel: () => import("vue-owl-carousel"),
};

export default {
  components,
  data() {
    return {
      userInfo: { role: "guest" },
      isLoading: false,
      selectedIndex: 0,
      tabSlidePos: 0,
    };
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
    serviceCategories() {
      return this.$store.state.common.serviceCategories;
    },
  },
  mounted() {
    this.isLoading = true;
  },
  methods: {
    closePanel() {
      this.$emit("closePanel");
    },
    getServiceCategory(category) {
      return this.serviceCategories.find((item) => item.key === category) || {};
    },
    startAddNewService() {
      return this.$router.push(`/vendor/${this.vendorData.id}/service/add`);
    },
    getSelectedServiceCategory(index) {
      if (!this.vendorData.vendorCategories || !this.vendorData.vendorCategories.length) return {};
      if (this.selectedIndex === 0) {
        return this.getServiceCategory(this.vendorData.vendorCategories[0]);
      } else {
        return this.getServiceCategory(this.vendorData.secondaryServices[this.selectedIndex - 1].vendorCategory);
      }
    },
      selectService(index) {
          this.selectedIndex = index;
      },
  },
};
</script>
<style lang="scss" scoped>
.my-service {
    .services-header {
        display: flex;
        position: relative;

        .service-tab-item {
            min-width: 300px;
            height: 90px;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            cursor: pointer;
            &:not(:last-child) {
                border-right: 1px solid #050505;
            }
            &.active {
                border-bottom: solid 5px #641856;
                font-weight: bold;
                padding: 10px 20px;
            }
        }

        .nav-btn {
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            z-index: 10;
            width: 33px;
            height: 33px;
            background-color: white;
            border: none;
            border-radius: 50%;
            box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.16);
            cursor: pointer;
            &.nav-left {
                left: 10px;
            }
            &.nav-right {
                right: 10px;
            }
        }
    }


}
</style>
