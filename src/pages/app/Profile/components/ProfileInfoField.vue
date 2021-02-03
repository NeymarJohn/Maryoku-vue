<template>
  <div class="profile-info-field">
    <div class="d-flex justify-content-between">
      <label
        ><img :src="icon" class="label-icon" /><span>{{ fieldLabel }}</span></label
      >
      <md-button class="md-simple edit-btn" @click="edit"> Edit</md-button>
    </div>
    <div class="profile-field-value" v-if="isEditing">
      <template v-if="fieldName === 'password'">
        <input type="password" style="width: 100%" v-model="content" placeholder="New password" />
        <input type="password" style="width: 100%; margin-top: 20px" v-model="passwordConfirm" placeholder="Confirm " />
        <div class="text-right mt-10">
          <md-button class="md-simple maryoku-btn" @click="cancelEdit">Cancel</md-button>
          <md-button class="maryoku-btn md-red" :disabled="!canSave" @click="saveField">Save</md-button>
        </div>
      </template>
      <template v-else>
        <input type="text" style="width: 100%" v-model="content" />
        <div class="text-right mt-10">
          <md-button class="md-simple maryoku-btn" @click="cancelEdit">Cancel</md-button>
          <md-button class="maryoku-btn md-red" :disabled="!canSave" @click="saveField">Save</md-button>
        </div>
      </template>
    </div>
    <div v-else class="profile-field-value">{{ fieldName === "password" ? "********" : defaultValue }}</div>
  </div>
</template>
<script>
export default {
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
  label {
    span {
      padding-left: 20px;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .profile-field-value {
    font-size: 16px;
    margin-top: 10px;
  }
}
</style>