<template>
  <modal class="sharing-model">
    <template slot="header">
      <div class="maryoku-modal-header">
        <h2>Share 'Venue Proposals' With Your Colleague</h2>
      </div>
    </template>
    <template slot="body">
      <div class="md-layout maryoku-modal-body">
        <div class="md-layout-item md-size-100 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black mt-40">Link sharing on</label>
          <div>
            <span style="padding-bottom: 10px">Anyone with this link </span>
            <md-button class="md-simple md-red edit-btn">Can view</md-button>
          </div>
          <maryoku-input inputStyle="normal" v-model="sharingLink" readonly></maryoku-input>
          <button type="button"
            v-clipboard:copy="sharingLink"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">Copy!</button>
        </div>
        <div class="md-layout-item md-size-100 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black">Invite People</label>
          <div>Email Address</div>
          <maryoku-input inputStyle="email" type="email" v-model="editingVendor.vendorMainEmail"></maryoku-input>
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button
        class="md-button md-black md-simple md-theme-default"
        @click="onCancel()"
      >Cancel</md-button>
      <md-button class="md-red md-bold add-category-btn" @click="updateMyVendor">Send</md-button>
    </template>
  </modal>
</template>

<script>
import { Modal, MaryokuInput } from "@/components";

export default {
  name: "add-vendor-modal",
  components: {
    Modal,
    MaryokuInput
  },
  props: {
    show: [Boolean],
    value: [Number],
    sharingLink: [String]
  },
  data: () => {
    return {
      selectedOption: "keep",
      location: "",
      currentAttachments: [],
      isLoading: false,
      editingVendor: {
        vendorDisplayName: "",
        cost: "",
        vendorAddressLine1: "",
        vendorMainPhoneNumber: "",
        vendorMainEmail: "",
        attachedProposal: "",
        attachment: null
      }
    };
  },
  methods: {
    selectOption() {
      this.$emit("select", this.selectedOption, this.value);
    },
    remindLater() {
      this.$emit("remindLater");
    },
    removeSelectedAttachment(index) {},
    onFileChange(event) {
      let files = event.target.files || event.dataTransfer.files;
      this.editingVendor.attachment = files[0];
    },
    updateMyVendor() {
      this.$emit("updateVendor", this.editingVendor);
    },
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function (e) {
      alert('Failed to copy texts')
    },
    onCancel: function(e) {
      this.$emit("cancel")
    }
  }
};
</script>
<style lang="scss" scoped>
.maryoku-modal-body {
  padding: 0 5px;
}
.add-category-btn {
  margin-right: 20px;
}
</style>