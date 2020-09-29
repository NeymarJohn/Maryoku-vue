<template>
  <div class="d-flex campaign-title-editor font-size-60 font-bold-extra" v-if="!isEditing">
    {{content}}
    <md-button class="md-simple md-icon-button edit-btn" @click="isEditing=true">
      <img :src="`${$iconURL}Campaign/edit-dark.svg`" style="width: 20px; margin-left:20px;"/>
    </md-button>
  </div>
  <div class="d-flex campaign-title-editor" v-else>
    <input 
      v-model="content" 
      class="font-size-60 font-bold-extra " 
      :class="{isEditing:isEditing}" 
      v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}" />
    <md-button class="md-simple md-icon-button edit-btn" @click="changeText">
      <img :src="`${$iconURL}Campaign/Group 1908.svg`" style="width: 20px; margin-left:20px;"/>
    </md-button>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      content: this.value,
      isEditing: false
    }
  },
  methods: {
    changeText(e) {
      console.log(this.content)
      this.$emit("change", this.content)
      this.isEditing = false;
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.content = newValue
    }
  },
}
</script>
<style lang="scss" scoped>
.campaign-title-editor {
  input {
    padding: 0;
    color: #050505;
    width: max-content;
    border: none;
    box-shadow: none;
    &.isEditing {
      border: solid 1px #a0a0a0;
    }
  }
}
</style>