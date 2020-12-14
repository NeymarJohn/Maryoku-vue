<template>
  <modal class="add-vendor-model">
    <template slot="header">
      <div class="maryoku-modal-header">
        <h2>Add my vendor</h2>
        <div class="header-description">So we could add it to your plan</div>
      </div>
    </template>
    <template slot="body">
      <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />
      <div class="md-layout maryoku-modal-body">
        <div class="md-layout-item md-size-100 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black mt-40">Name</label>
          <maryoku-input
            inputStyle="normal"
            name="vendorDisplayName"
            v-model="editingVendor.vendorDisplayName"
            v-validate.initial="modelValidations.vendorDisplayName"
          ></maryoku-input>
        </div>
        <div class="md-layout-item md-size-50 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black">Price of the serivce</label>
          <maryoku-input
            inputStyle="budget"
            name="cost"
            v-model="editingVendor.cost"
            v-validate.initial="modelValidations.cost"
          ></maryoku-input>
        </div>
        <div class="md-layout-item md-size-100 mb-30">
          <label class="font-size-16 font-bold-extra color-black">Location</label>
          <location-input
            name="vendorAddressLine1"
            v-model="editingVendor.vendorAddressLine1"
            v-validate.initial="modelValidations.vendorAddressLine1"
          >
          </location-input>
        </div>
        <div class="md-layout-item md-size-50 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black">Phone</label>
          <maryoku-input
            inputStyle="phone"
            type="phonenumber"
            name="vendorMainPhoneNumber"
            v-model="editingVendor.vendorMainPhoneNumber"
            v-validate.initial="modelValidations.vendorMainPhoneNumber"
          ></maryoku-input>
        </div>
        <div class="md-layout-item md-size-100 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black">Email</label>
          <maryoku-input
            inputStyle="email"
            type="email"
            name="vendorMainEmail"
            v-model="editingVendor.vendorMainEmail"
            v-validate.initial="modelValidations.vendorMainEmail"
          ></maryoku-input>
        </div>
        <div class="md-layout-item md-size-100 form-group maryoku-field">
          <label class="font-size-16 font-bold-extra color-black">Attach Proposal</label>
          <label class="upload-section" v-if="!editingVendor.attachment">
            <label
              class="md-rose md-outline md-simple md-sm attachment upload-button"
              for="file"
              style="cursor: pointer"
            >
              <md-icon>attachment</md-icon>Choose file(10MB)
            </label>

            Or
            <div style="color: #818080">Drag your file here</div>
            <div>
              <span v-for="(file, index) in currentAttachments" :key="index" class="attachment-link">
                {{ file.name }}
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
            {{ editingVendor.attachment.name }}
            <button @click="editingVendor.attachment = null">
              <md-icon class="color-white">close</md-icon>
            </button>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-button md-black md-simple md-theme-default" @click="remindLater">Remind Me Later</md-button>
      <md-button class="md-red md-bold add-category-btn" :disabled="errors.all().length > 0" @click="updateMyVendor"
        >Update Vendor</md-button
      >
    </template>
  </modal>
</template>

<script>
import { Modal, MaryokuInput, LocationInput } from "@/components";
import VueElementLoading from "vue-element-loading";

export default {
  name: "add-vendor-modal",
  components: {
    Modal,
    MaryokuInput,
    LocationInput,
    VueElementLoading,
  },
  props: {
    show: [Boolean],
    value: [Number],
  },
  data: () => {
    return {
      selectedOption: "keep",
      location: "",
      currentAttachments: [],
      isLoading: false,
      isValid: false,
      editingVendor: {
        vendorDisplayName: "",
        cost: "",
        vendorAddressLine1: "",
        vendorMainPhoneNumber: "",
        vendorMainEmail: "",
        attachedProposal: "",
        attachment: null,
      },
      modelValidations: {
        vendorDisplayName: {
          required: true,
        },
        vendorMainEmail: {
          required: true,
          email: true,
        },
        vendorAddressLine1: {
          required: true,
        },
        vendorMainPhoneNumber: {
          required: true,
          numeric: true,
        },
      },
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
      this.isLoading = true;
      this.$emit("updateVendor", { ...this.editingVendor, companyName: this.editingVendor.vendorDisplayName });
    },
    validate() {
      this.$validator
        .validateAll()
        .then((isValid) => {
          this.isValid = true;
        })
        .catch((err) => {
          this.isValid = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.maryoku-modal-body {
  padding: 0 5px;
}
</style>