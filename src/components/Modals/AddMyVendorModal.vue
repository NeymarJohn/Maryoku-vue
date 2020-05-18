<template>
  <modal class="add-vendor-model">
    <template slot="header">
      <div class="maryoku-modal-header">
        <h2>Add my vendor</h2>
        <div class="header-description">So we could add it to your plan</div>
      </div>
    </template>
    <template slot="body">
      <div class="md-layout maryoku-modal-body">
        <div class="md-layout-item md-size-100 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black mt-40">Name</label>
          <maryoku-input inputStyle="normal" v-model="editingVendor.vendorDisplayName"></maryoku-input>
        </div>
        <div class="md-layout-item md-size-50 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black">Price of the serivce</label>
          <maryoku-input inputStyle="budget" v-model="editingVendor.cost"></maryoku-input>
        </div>
        <div class="md-layout-item md-size-100 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black">Location</label>
          <maryoku-input inputStyle="location" v-model="editingVendor.vendorAddressLine1"></maryoku-input>
        </div>
        <div class="md-layout-item md-size-50 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black">Phone</label>
          <maryoku-input
            inputStyle="phone"
            type="phonenumber"
            v-model="editingVendor.vendorMainPhoneNumber"
          ></maryoku-input>
        </div>
        <div class="md-layout-item md-size-100 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black">Email</label>
          <maryoku-input inputStyle="email" type="email" v-model="editingVendor.vendorMainEmail"></maryoku-input>
        </div>
        <div class="md-layout-item md-size-100 form-group maryoku-field">
          <label class="font-size-16 font-bold-extra color-black">Attach Proposal</label>
          <label class="upload-section" v-if="!editingVendor.attachment">
            <label
              class="md-rose md-outline md-simple md-sm attachment upload-button"
              for="file"
              style="cursor:pointer"
            >
              <md-icon>attachment</md-icon>Choose file(10MB)
            </label>

            Or
            <div style="color: #818080">Drag your file here</div>
            <div>
              <span
                v-for="(file, index) in currentAttachments"
                :key="index"
                class="attachment-link"
              >
                {{ file.name}}
                <span @click="removeSelectedAttachment(index)">
                  <md-icon class="remove-attachment">close</md-icon>
                </span>
              </span>
            </div>
            <input
              style="display: none"
              id="file"
              name="attachment"
              type="file"
              multiple="multiple"
              @change="onFileChange"
            />
          </label>
          <div v-else class="attchment-item">
            {{editingVendor.attachment.name}}
            <button @click="editingVendor.attachment=null">
              <md-icon class="color-white">close</md-icon>
            </button>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button
        class="md-button md-black md-simple md-theme-default"
        @click="remindLater"
      >Remind Me Later</md-button>
      <md-button class="md-red md-bold add-category-btn" @click="updateMyVendor">Update Vendor</md-button>
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
    value: [Number]
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
    onFileChange(e) {
      let files = event.target.files || event.dataTransfer.files;
      this.editingVendor.attachment = files[0];
    },
    updateMyVendor() {
      this.$emit("updateVendor", this.editingVendor);
    }
  }
};
</script>
<style lang="scss" scoped>
.maryoku-modal-body {
  padding: 0 5px;
}
</style>