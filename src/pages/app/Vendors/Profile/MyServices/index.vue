<template>
  <div v-if="vendorData" class="my-service white-card">

    <div class="tabs-list">
      <span v-show="selectedIndex > 0" class="arrow prev" @click="prev()">
        <md-icon>keyboard_arrow_left</md-icon>
      </span>
      <md-tabs ref="tabsCont" class="service-tabs" @md-changed="tabChange">
        <template slot="md-tab" slot-scope="{ tab }">
            <div class="d-flex align-center color-black">
                <img
                    v-if="tab.data.img"
                    class="mr-10"
                    :src="tab.data.img"
                    width="24px"
                />
                <md-icon v-if="tab.data.icon" class="font-size-30 mr-5" style="color: purple!important">add</md-icon>
                <span class="text-capitalize" :class="tab.data.icon ? `color-purple`:`color-black`">{{ tab.label }}</span>
            </div>
        </template>
        <md-tab
            id="0"
            :md-label="getServiceCategory(vendorData.vendorCategories[0]).title"
            :md-template-data="{ img: `${$iconURL}Budget Elements/${getServiceCategory(vendorData.vendorCategories[0]).icon}`}"
        >
        </md-tab>
        <md-tab v-for="(service, index) in vendorData.secondaryServices" :id="`${index + 1}`" :key="`tab-${index}`"
                :md-label="getServiceCategory(service.vendorCategory).title"
                :md-template-data="{ img: `${$iconURL}Budget Elements/${getServiceCategory(service.vendorCategory).icon}`}"
        ></md-tab>
        <md-tab id="add"
                md-label="Sign new service"
                :md-template-data="{icon: 'add'}"
        >
        </md-tab>
      </md-tabs>
      <span v-show="selectedIndex <  (vendorData.secondaryServices.length)" class="arrow next" @click="next()">
        <md-icon>keyboard_arrow_right</md-icon>
      </span>
    </div>

    <service-content
      :key="getSelectedServiceCategory().key"
      :service-category="getSelectedServiceCategory()"
    />
  </div>
</template>
<script>
import ServiceContent from "./ServiceContent";
export default {
  components: {
    ServiceContent,
  },
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
    tabChange(tab){
        if (tab === "add") {
            this.startAddNewService();
            return;
        }
        this.selectedIndex = parseInt(tab);
    },
    getSelectedServiceCategory(index) {
      if (!this.vendorData.vendorCategories || !this.vendorData.vendorCategories.length) return {};
      if (this.selectedIndex === 0) {
        return this.getServiceCategory(this.vendorData.vendorCategories[0]);
      } else {
        return this.getServiceCategory(this.vendorData.secondaryServices[this.selectedIndex - 1].vendorCategory);
      }
    },
    prev() {
      const ww = (1 + this.vendorData.secondaryServices.length) * 300;
      const sw = this.$refs.tabsCont.clientWidth;
      if (ww / sw > 2) {
          this.tabSlidePos += 300 * 4;
      } else if (ww / sw > 1) {
          this.tabSlidePos += (ww % sw) + 60;
      } else {
          this.tabSlidePos;
      }

      if (this.selectedIndex - 1 === 0) {
          this.tabSlidePos = 0;
      } else {
          this.tabSlidePos = -($(".md-tabs-navigation").find(".md-button")[this.selectedIndex - 1].offsetLeft);
          $(".md-tabs-navigation").attr("style", `left: ${this.tabSlidePos}px`);
      }
      this.selectedIndex -= 1;
    },
    next() {
      const ww = (1 + this.vendorData.secondaryServices.length) * 300;
      const sw = this.$refs.tabsCont.clientWidth;
      if (ww / sw > 2) {
          this.tabSlidePos -= 300 * 4;
      } else if (ww / sw > 1) {
          this.tabSlidePos -= (ww % sw) + 60;
      } else {
          this.tabSlidePos;
      }

      this.tabSlidePos = -($(".md-tabs-navigation").find(".md-button")[this.selectedIndex + 1].offsetLeft);
      console.log('next', $(".md-tabs-navigation").find(".md-button"));
      $(".md-tabs-navigation").attr("style", `left: ${this.tabSlidePos}px`);
      this.selectedIndex += 1;
    },
  },
};
</script>
<style lang="scss" scoped>
.my-service {
    .tabs-list {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        position: relative;
    }
    span.arrow {
        cursor: pointer;
        position: absolute;
        width: 28px;
        height: 28px;
        background-color: #ffffff;
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        border-radius: 50%;
        text-align: center;
        font-weight: 800;
        z-index: 99;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        &.prev {
            left: 20px;
        }
        &.next {
            right: 20px;
        }
    }
}
</style>
