<template>
  <div class="service-content">
    <div><img class="service-image" :src="serviceData.images[0] || vendorData.images[0]" /></div>
    <div class="p-50">
      <div class="font-size-16 font-bold d-flex justify-content-between align-center">
        <div>
          <img :src="`${$iconURL}Budget Elements/${serviceCategory.icon}`" class="page-icon mr-10" />
          About Our {{ serviceCategory.title }}
        </div>
        <md-button class="md-vendor maryoku-btn" @click="gotoEditingService">Edit Service</md-button>
      </div>
      <div class="mt-20 about-service">{{ vendorData.about.category }}</div>
    </div>
    <div class="pr-50 pl-50">
      <label>Attachments</label>
      <attachment-item
        v-for="attachment in attachments"
        :key="attachment.name"
        :attachment="attachment"
        :vendor="vendorData"
        class="attachment"
        @uploaded="setAttachment"
        @remove="removeAttachment"
      >
      </attachment-item>
    </div>
    <vendor-images-list :images="serviceData.images"></vendor-images-list>
    <starting-fee-table class="mt-30" :items="startingFeeItems"></starting-fee-table>
    <extra-pay-table :items="extraPayItems"></extra-pay-table>
    <policy :serviceCategory="serviceData.vendorCategory"></policy>
    <price-policy :serviceCategory="serviceData.vendorCategory"></price-policy>
  </div>
</template>
<script>
import AttachmentItem from "../../components/AttachmentItem.vue";
import VendorImagesList from "../../components/VendorImagesList.vue";
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
    VendorImagesList,
  },
  props: {
    serviceCategory: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
    serviceData() {
      if (this.serviceCategory.key === this.vendorData.vendorCategory) {
        return this.vendorData;
      } else {
        return this.vendorData.secondaryServices.find((service) => service.vendorCategory === this.serviceCategory.key);
      }
    },
    startingFeeItems() {
      let startingFeeItems = [];
      console.log(this.serviceData.services);
      _.each(this.serviceData.services, (item) => {
        if (item.checked && item.hasOwnProperty("included") && item.included) {
          startingFeeItems.push(item);
        }
      });
      return startingFeeItems;
    },
    extraPayItems() {
      let extraPayItems = [];
      _.each(this.serviceData.services, (item) => {
        if (item.checked && item.hasOwnProperty("included") && !item.included) {
          item.value = Number(item.value);
          extraPayItems.push(item);
        }
      });
      return extraPayItems;
    },
    attachments() {
      if (this.serviceData.attachments && this.serviceData.attachments.length > 0) return this.serviceData.attachments;
      if (this.vendorData.eventCategory.legalDocuments) {
        return this.vendorData.eventCategory.legalDocuments.map((legal) => {
          return {
            name: legal,
            isRequired:
              this.vendorData.eventCategory.mandatoryLegalDocs &&
              this.vendorData.eventCategory.mandatoryLegalDocs.findIndex((item) => item === legal) >= 0,
            fileName: "",
          };
        });
      }
      return [];
    },
  },
  data() {
    return {
      // attachments: [
      //   { name: "Kosher Certitifcate", isRequired: true, fileName: "Kosher_certificate.pdf" },
      //   { name: "Legal Requirements", isRequired: true, fileName: "Legal_certificate.pdf" },
      //   { name: "Menu", isRequired: true, fileName: "Menu_2020.pdf" },
      //   { name: "Other", isRequired: false, fileName: "" },
      // ],
    };
  },
  methods: {
    setAttachment(attachment) {
      const defaultAttachments = this.attachments;
      const currentIndex = defaultAttachments.findIndex((a) => a.name === attachment.name);
      defaultAttachments[currentIndex] = attachment;
      let updateData = { attachments: defaultAttachments, id: this.vendorData.id };
      this.$store.dispatch("vendor/updateProfile", updateData);
    },
    removeAttachment(attachment) {
      const defaultAttachments = this.attachments;
      const currentIndex = defaultAttachments.findIndex((a) => a.name === attachment.name);
      defaultAttachments[currentIndex].fileName = "";
      defaultAttachments[currentIndex].url = "";
      let updateData = { attachments: defaultAttachments, id: this.vendorData.id };
      this.$store.dispatch("vendor/updateProfile", updateData);
    },
    gotoEditingService() {
      if (this.serviceCategory.key === this.vendorData.vendorCategory) {
        this.$router.push(`/vendor/edit/${this.vendorData.id}`);
      } else {
        this.$router.push(`/vendor/${this.vendorData.id}/service/edit/${this.serviceData.id}`);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.service-content {
  overflow: hidden;
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