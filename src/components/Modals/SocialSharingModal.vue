<template>
  <modal class="sharing-model">
    <template slot="header">
      <div class="maryoku-modal-header text-center" style="width: 100%">
        <img :src="`${$iconURL}Share/Group+7309.svg`" class="mb-20" />
        <div class="font-size-30 font-bold text-center">Share It!</div>
        <div>Invite people to this event!</div>
      </div>
    </template>
    <template slot="body">
      <div class="md-layout maryoku-modal-body">
        <div class="md-layout-item md-size-100 form-group maryoku-field mb-30">
          <sharing-button-group class="sharing-button-group-wrapper" :copyLink="false"></sharing-button-group>
          <maryoku-input inputStyle="sharing" v-model="shareLink" readonly class="sharelink"></maryoku-input>
        </div>
      </div>
    </template>
    <template slot="footer">
      <template v-if="emails.length > 0">
        <md-button class="md-button md-black md-simple add-category-btn" @click="onCancel()">Cancel</md-button>
        <md-button class="md-red md-bold add-category-btn" @click="sendEmail">Send</md-button>
      </template>
      <template v-else>
        <md-button class="md-red md-bold add-category-btn" @click="onCancel()">Done</md-button>
      </template>
    </template>
  </modal>
</template>

<script>
import { Modal, MaryokuInput } from "@/components";
import SharingRoleOptions from "@/components/SharingRoleOptions";
import InputTag from "vue-input-tag";
import SharingButtonGroup from "@/pages/app/Campaign/components/SharingButtonGroup.vue";

export default {
  name: "sharing-modal",
  components: {
    Modal,
    MaryokuInput,
    SharingRoleOptions,
    InputTag,
    SharingButtonGroup,
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
      emails: [],
      message: "",
      isLoading: false,
      showLinkRoleEditor: false,
      showEmailRoleEditor: false,
      isSendingMessage: false,
      shareLink: "",
      role: "view",
      editingVendor: {
        vendorDisplayName: "",
        cost: "",
        vendorAddressLine1: "",
        vendorMainPhoneNumber: "",
        vendorMainEmail: "",
        attachedProposal: "",
        attachment: null,
      },
      statusMessage: "",
    };
  },
  created() {
    this.generateShareLink();
  },
  methods: {
    generateShareLink() {
      this.shareLink = window.location.href;
      return this.shareLink;
    },
    selectOption() {
      this.$emit("select", this.selectedOption, this.value);
    },
    remindLater() {
      this.$emit("remindLater");
    },
    removeSelectedAttachment(index) {},
    sendEmail() {
      this.$emit("sendEmail", this.editingVendor);
      this.$http
        .post(
          `${process.env.SERVER_URL}/1/eventShare`,
          {
            emails: this.emails,
            message: this.message,
            link: this.generateShareLink(),
            eventId: this.$route.params.id,
          },
          { headers: this.$auth.getAuthHeader() },
        )
        .then((res) => {
          if (res.data.status) {
            this.statusMessage = "We have sent an email to the invited users.";
          } else {
            this.statusMessage = "Something is wrong. Please try again later.";
          }
        });
    },

    onCancel: function (e) {
      this.$emit("cancel");
    },
    setRole(role) {
      this.role = role;
      this.showLinkRoleEditor = false;
      this.generateShareLink();
    },
  },
};
</script>
<style lang="scss" scoped>
.maryoku-modal-body {
  padding: 0 5px;
}
.add-category-btn {
  margin-right: 20px;
}
.sharing-role {
  margin-left: 10px;
  align-items: center;
}
.email-role-button {
  border: solid 1px #ffa4bc;
  margin-left: 15px;
  border-radius: 3px;
  max-height: 56px;
}
.spacer {
  border-bottom: solid 1px #dddddd;
  width: 100%;
  margin: 30px 15px;
}
.vue-input-tag-wrapper {
  .new-tag {
    box-shadow: none !important;
  }
}
textarea {
  padding: 20px 20px !important;
  min-height: 100px !important;
}
.checkbox-wrapper {
  min-width: 165px;
  margin-left: 10px;
}
.sharing-model {
  .sharelink {
    input.sharing {
      padding-right: 60px !important;
      height: 60px;
    }
  }
  .sharing-button-group-wrapper {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>