<template>
  <modal class="add-vendor-modal">
    <template slot="header">
      <div class="maryoku-modal-header">
        <h2>Add my vendor</h2>
        <div class="header-description">
          So we could add it to your plan
        </div>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />
      <div class="md-layout maryoku-modal-body">
        <div class="md-layout-item md-size-100 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black mt-40">Name</label>
          <maryoku-input
            v-model="editingVendor.vendorDisplayName"
            v-validate.initial="modelValidations.vendorDisplayName"
            input-style="normal"
            name="vendorDisplayName"
          />
        </div>
        <div class="md-layout-item md-size-50 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black">Price of the serivce</label>
          <maryoku-input
            v-model="editingVendor.cost"
            v-validate.initial="modelValidations.cost"
            input-style="budget"
            name="cost"
          />
        </div>
        <div class="md-layout-item md-size-100 mb-30">
          <label class="font-size-16 font-bold-extra color-black">Location</label>
          <location-input
            v-model="editingVendor.vendorAddressLine1"
            v-validate.initial="modelValidations.vendorAddressLine1"
            name="vendorAddressLine1"
          />
        </div>
        <div class="md-layout-item md-size-50 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black">Phone</label>
          <maryoku-input
            v-model="editingVendor.vendorMainPhoneNumber"
            v-validate.initial="modelValidations.vendorMainPhoneNumber"
            input-style="phone"
            type="phonenumber"
            name="vendorMainPhoneNumber"
          />
        </div>
        <div class="md-layout-item md-size-100 form-group maryoku-field mb-30">
          <label class="font-size-16 font-bold-extra color-black">Email</label>
          <maryoku-input
            v-model="editingVendor.vendorMainEmail"
            v-validate.initial="modelValidations.vendorMainEmail"
            input-style="email"
            type="email"
            name="vendorMainEmail"
          />
        </div>
        <div class="md-layout-item md-size-100 form-group maryoku-field">
          <label class="font-size-16 font-bold-extra color-black">Attach Proposal</label>
          <label v-if="!editingVendor.attachment" class="upload-section">
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
              id="file"
              style="display: none"
              name="attachment"
              type="file"
              multiple="multiple"
              @change="onFileChange"
            >
          </label>
          <div v-else class="attchment-item">
            {{ editingVendor.attachment.name }}
            <button @click="editingVendor.attachment = null">
              <md-icon class="color-white">
                close
              </md-icon>
            </button>
          </div>
        </div>
        <div v-if="this.errorMessage" class="md-layout-item md-size-100 form-group maryoku-field mt-30">
          <div class="error-message">
            <img :src="`${$iconURL}Event Page/warning-circle-gray.svg`">
            {{ this.errorMessage }}
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-button md-black md-simple md-theme-default" @click="remindLater">
        Remind Me Later
      </md-button>
      <md-button class="md-red md-bold add-category-btn" :disabled="errors.all().length > 0" @click="updateMyVendor">
        Update Vendor
      </md-button>
    </template>
  </modal>
</template>

<script>
import { Modal, MaryokuInput, LocationInput } from "@/components";
import VueElementLoading from "vue-element-loading";
import CalendarEvent from "@/models/CalendarEvent";
import EventComponent from "@/models/EventComponent";
import EventComponentVendor from "@/models/EventComponentVendor";
export default {
  name: "AddVendorModal",
  components: {
    Modal,
    MaryokuInput,
    LocationInput,
    VueElementLoading,
  },
  props: {
    show: [Boolean],
    value: [Number],
    event: Object,
    selectedComponent: Object,
  },
  data: () => {
    return {
      selectedOption: "keep",
      location: "",
      currentAttachments: [],
      isLoading: false,
      isValid: false,
      errorMessage: "",
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
      close() {
          this.$emit("closeModal");
      },
    remindLater() {
      this.$emit("remindLater");
    },
    removeSelectedAttachment(index) {},
    onFileChange(event) {
      let files = event.target.files || event.dataTransfer.files;
      this.editingVendor.attachment = files[0];
    },
    async updateMyVendor() {
      let event = new CalendarEvent({ id: this.event.id });
      let selectedBlock = new EventComponent({ id: this.selectedComponent.id });
      const myVendor = { ...this.editingVendor, companyName: this.editingVendor.vendorDisplayName };

      myVendor.vendorCategory = this.selectedComponent.componentId;
      if (myVendor.attachment) {
        let formData = new FormData();
        formData.append("file", myVendor.attachment);
        formData.append("key", `eventvendor/attachment/${myVendor.attachment.name}`);

        const result = await this.$http.post(`${process.env.SERVER_URL}/uploadFile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        myVendor.attachments = [
          {
            originalName: myVendor.attachment.name,
            url: result.data.key,
            name: myVendor.attachment.name,
          },
        ];
      }

      // Add new Vendors
      new EventComponentVendor(myVendor)
        .save()
        .then((newVendor) => {
          this.isLoading = false;

          // Add new Vendors to component
          const eventComponentVendor = {
            vendorId: newVendor.item.id,
            cost: myVendor.cost,
            eventComponentInstance: this.selectedComponent,
            rfpStatus: new Date().getTime(),
            attachments: myVendor.attachments,
          };
          new EventComponentVendor(eventComponentVendor)
            .for(event, selectedBlock)
            .save()
            .then((result) => {
              this.errorMessage = "";
              this.$emit("updateVendor", { ...this.editingVendor, companyName: this.editingVendor.vendorDisplayName });
            });
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          if (error.response) {
            if (error.response.status === 422) {
              this.errorMessage = "This vendor alreday exists.";
            } else {
              this.errorMessage = "Your request is not succeeded. Please try later";
            }
          }
        });
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
.add-vendor-modal {
    overflow: hidden;

  .error-message {
    background-color: #ffe5ec;
    padding: 10px;
    img {
      width: 20px;
    }
  }
}
.maryoku-modal-body {
  padding: 0 5px;
}
</style>
