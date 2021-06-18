<template>
  <modal class="add-new-customer" containerClass="modal-container sm">
    <template slot="header">
      <div class="maryoku-modal-header">
        <h2>Customer information</h2>
      </div>
    </template>
    <template slot="body">
      <div class="text-left">
        <div class="mt-30 text-left">
          <label class="font-bold">Company Name</label>
          <maryoku-input inputStyle="company" class="width-80 mt-5 form-input" v-model="company"></maryoku-input>
        </div>
        <div class="mt-30 text-left">
          <label class="font-bold">Customer Name</label>
          <maryoku-input inputStyle="username" class="width-80 mt-5 form-input" v-model="customer"></maryoku-input>
        </div>
        <div class="mt-30 text-left">
          <label class="font-bold">Email</label>
          <maryoku-input inputStyle="email" class="width-80 mt-5 form-input" v-model="email"></maryoku-input>
        </div>
        <md-checkbox v-model="addToCustomerList" class="md-vendor">
          Add this customer to your regular customer list
        </md-checkbox>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-button md-black md-simple add-category-btn" @click="onCancel()">Cancel</md-button>
      <md-button class="md-vendor md-bold add-category-btn" @click="sendQuestion">Send</md-button>
    </template>
  </modal>
</template>

<script>
import { Modal, MaryokuInput } from "@/components";

export default {
  name: "sharing-modal",
  components: {
    Modal,
    MaryokuInput,
  },
  props: {
    show: [Boolean],
    value: [Number],
  },
  data: () => {
    return {
      company: null,
      customer: null,
      addToCustomerList: false,
      email: null,
    };
  },
  created() {},
  methods: {
    sendQuestion() {
      this.$emit("sendEmail", this.editingVendor);
    },

    onCancel: function (e) {
      this.$emit("cancel");
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
.add-new-customer {
  .sharelink {
    input.sharing {
      padding-right: 60px !important;
      height: 60px;
    }
  }
  .form-input {
    width: 80%;
  }
}
</style>