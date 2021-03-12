<template>
  <div class="service-content">
    <div><img class="service-image" :src="vendorData.vendorImages[0]" /></div>
    <div class="p-50">
      <div class="font-size-16 font-bold">About Our Venue</div>
      <div class="mt-20 about-service">{{ vendorData.about.category }}</div>
    </div>
    <div class="pr-50 pl-50">
      <label>Attachments</label>
      <attachment-item
        v-for="attachment in attachments"
        :key="attachment.name"
        :attachment="attachment"
        class="attachment"
      ></attachment-item>
    </div>
    <starting-fee-table :items="startingFeeItems"></starting-fee-table>
    <extra-pay-table :items="extraPayItems"></extra-pay-table>
    <policy></policy>
    <price-policy></price-policy>
  </div>
</template>
<script>
import AttachmentItem from "../../components/AttachmentItem.vue";
import StartingFeeTable from "./StartingFeeTable.vue";
import ExtraPayTable from "./ExtraPayTable.vue";
import Policy from "./Policy.vue";
import PricePolicy from "./PricePolicy.vue";
import _ from "underscore";
export default {
  components: {
    StartingFeeTable,
    ExtraPayTable,
    Policy,
    PricePolicy,
    AttachmentItem,
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
    startingFeeItems() {
      let startingFeeItems = [];
      console.log(this.vendorData.services);
      _.each(this.vendorData.services, (item) => {
        if (item.checked && item.hasOwnProperty("included") && item.included) {
          startingFeeItems.push(item);
        }
      });
      return startingFeeItems;
    },
    extraPayItems() {
      let extraPayItems = [];
      _.each(this.vendorData.services, (item) => {
        if (item.checked && item.hasOwnProperty("included") && !item.included) {
          extraPayItems.push(item);
        }
      });
      return extraPayItems;
    },
  },
  data() {
    return {
      attachments: [
        { name: "Kosher Certitifcate", isRequired: true, fileName: "Kosher_certificate.pdf" },
        { name: "Legal Requirements", isRequired: true, fileName: "Legal_certificate.pdf" },
        { name: "Menu", isRequired: true, fileName: "Menu_2020.pdf" },
        { name: "Other", isRequired: false, fileName: "" },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.service-content {
  .service-image {
    max-height: 360px;
    object-fit: cover;
    width: 100%;
  }
  .about-service {
    max-width: 650px;
  }
  .attachment:not(:last-child) {
    border-bottom: solid 2px #dbdbdb;
  }
}
</style>