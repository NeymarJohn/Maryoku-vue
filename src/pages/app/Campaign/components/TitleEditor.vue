<template>
  <div v-if="!isEditing" class="d-flex campaign-title-editor">
    {{ content }}
    <EditBtn v-model="isEditing" />
  </div>
  <div v-else class="d-flex campaign-title-editor">
    <input
      v-model="content"
      v-autowidth="{ maxWidth: '960px', minWidth: '20px', comfortZone: 0 }"
      class=""
      :class="{ isEditing: isEditing }"
    >
    <SaveControls @cancel="cancel" @save="changeText" />
  </div>
</template>
<script>
export default {
  components: {
    EditBtn      : () => import("@/components/Button/Edit.vue"),
    SaveControls : () => import("@/components/Controls/Save.vue"),
  },
  props: {
    defaultValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      content: this.defaultValue,
      isEditing: false,
    };
  },
  watch: {
    defaultValue(newValue, oldValue) {
      console.log(newValue);
    },
  },
  methods: {
    changeText(e) {
      console.log(this.content);
      this.$emit("change", this.content);
      this.isEditing = false;
    },
    cancel() {
      this.content = this.defaultValue;
      this.isEditing = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.campaign-title-editor {
  height: 52px;
  align-items: center;
  button {
    margin-left: 10px !important;
  }
  input {
    padding: 0 10px;
    color: #050505;
    width: max-content;
    border: none;
    box-shadow: none;
    font-size: inherit;
    &.isEditing {
      border: solid 1px #a0a0a0;
    }
  }
  .btn-save {
    .md-ripple {
      width: auto;
      height: auto;
    }
  }
}
</style>
