<template>
  <div v-if="!isEditing" class="d-flex align-center campaign-title-editor">
    <span>{{ content }}</span>
    <div>
      <img class="icon-edit-dark" :src="`${$iconURL}common/edit-dark.svg`" @click="isEditing = true">
    </div>
  </div>
  <div v-else class="d-flex campaign-title-editor">
    <input
      v-model="content"
      v-autowidth="{ maxWidth: '960px', minWidth: '20px', comfortZone: 0 }"
      class=""
      :class="{ isEditing: isEditing }"
    >
    <md-button class="md-simple maryoku-btn md-black" @click="cancel">
      Cancel
    </md-button>
    <md-button class="maryoku-btn md-red" @click="changeText">
      Save
    </md-button>
  </div>
</template>
<script>
export default {
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
    padding-top: 5px;
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
}
.icon-edit-dark {
    width: 24px;
    height: 24px;
    align-self: flex-end;
    margin-left: 20px;
    &:hover{
        cursor: pointer;
    }

}
</style>
