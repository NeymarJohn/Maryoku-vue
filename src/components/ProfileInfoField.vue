<template>
  <div class="profile-info-field">
    <div class="d-flex justify-content-between">
      <div class="label">
        <img v-if="icon" :src="icon" class="label-icon" /><span>{{ fieldLabel }}</span>
      </div>
      <md-button class="md-simple edit-btn" :class="`${theme}`" @click="edit"> Edit</md-button>
    </div>
    <div v-if="description" class="mt-10 color-gray">{{ description }}</div>
    <div class="profile-field-value" v-if="isEditing">
      <template v-if="fieldName === 'password' || editor === 'password'">
        <input type="password" style="width: 100%" v-model="content" placeholder="New password" />
        <input type="password" style="width: 100%; margin-top: 20px" v-model="passwordConfirm" placeholder="Confirm " />
      </template>
      <vue-google-autocomplete
        v-else-if="editor === 'location'"
        :id="fieldName"
        ref="address"
        class="my-10 width-100 address"
        :placeholder="content ? content : 'Enter an an address, zipcode, or location'"
        v-on:placechanged="getAddressData"
      />
      <input v-else-if="editor === 'input'" type="text" style="width: 100%" v-model="content" />
      <textarea v-else style="width: 100%" v-model="content" rows="6"></textarea>
      <div class="text-right mt-10">
        <md-button class="md-simple maryoku-btn" :class="`${theme}`" @click="cancelEdit">Cancel</md-button>
        <md-button class="maryoku-btn" :class="`${theme}`" :disabled="!canSave" @click="saveField">Save</md-button>
      </div>
    </div>
    <div v-else class="profile-field-value">{{ fieldName === "password" ? "********" : defaultValue }}</div>
  </div>
</template>
<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  components: {
    VueGoogleAutocomplete,
  },
  props: {
    fieldName: {
      type: String,
      default: "",
    },
    fieldLabel: {
      type: String,
      default: "",
    },
    defaultValue: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "md-red",
    },
    editor: {
      type: String,
      default: "input",
    },
    description: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isEditing: false,
      content: "",
      passwordConfirm: "",
    };
  },
  created() {
    this.content = this.defaultValue;
  },
  methods: {
    edit() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      this.content = this.defaultValue;
    },
    saveField() {
      this.isEditing = false;
      this.$emit("save", { name: this.fieldName, value: this.content });
    },
    getAddressData: function (addressData, placeResultData, id) {
      this.content = `${addressData.route}, ${addressData.administrative_area_level_1}, ${addressData.country}`;
    },
  },
  computed: {
    canSave() {
      if (this.fieldName === "password") {
        return this.content && this.content === this.passwordConfirm;
      } else {
        return this.content;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-info-field {
  border-bottom: solid 1px #e0e0e0;
  padding: 35px 0;
  .label {
    img {
      margin-right: 20px;
    }
    span {
      font-weight: bold;
      font-size: 16px;
    }
  }
  .profile-field-value {
    font-size: 16px;
    margin-top: 10px;
    margin-right: 20%;
    line-height: 1.8em;
  }
}
</style>