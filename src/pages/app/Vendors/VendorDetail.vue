<template>
  <div class="vendor-detail-page">
    <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
    <div class="vendor-detail-header">
      <div class="vendor-detail-title">
        <span style="vertical-align: middle" class="font-size-40 font-bold">{{ vendor.companyName }}</span>
        <span style="vertical-align: middle" class="ml-10">
          <md-icon style="color: #ffc001">star</md-icon> {{ vendor.rank }}
          <span class="color-gray ml-10">(no reviews)</span>
          <span class="color-red font-bold ml-20"> This vendor didn't any event yet!</span>
        </span>
      </div>
      <div class="vendor-detail-basic">
        <span>{{ vendor.vendorMainEmail }}</span>
        <span>{{ vendor.vendorAddressLine1 }}</span>
        <span>{{ vendor.vendorMainPhoneNumber }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Vendors from "@/models/Vendors";
import CommentEditorPanel from "@/pages/app/Events/components/CommentEditorPanel";
export default {
  components: {
    CommentEditorPanel,
  },
  data() {
    return {
      showCommentEditorPanel: false,
      vendor: {},
    };
  },
  created() {
    this.getVendorData();
  },
  methods: {
    getVendorData() {
      const vendorId = this.$route.params.id;
      Vendors.find(vendorId).then((res) => {
        console.log("vendor", res);
        this.vendor = res;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.vendor-detail-page {
  .vendor-detail-header {
    background-color: #FFF;
    padding: 60px 60px 60px 120px;
  }
}
</style>