<template>
  <div class="attachment-tag-list">
    <div class="attachment-tag" v-for="(attachment, index) in attachments" :key="index">
      <img :src="`${$iconURL}common/pin-red.svg`" />
      {{ attachment.name }}
      <md-button class="md-simple md-white edit-btn" @click="remove(attachment, index)">
        <img :src="`${$iconURL}common/trash-dark.svg`" />
      </md-button>
    </div>
    <div class="attachment-tag add" @click="addNew">
      <md-icon class="color-red">add</md-icon>
      Add Another
    </div>
    <input
      type="file"
      class="d-none"
      ref="legalDocument"
      accept="application/text, application/pdf"
      @change="onFilePicked"
    />
  </div>
</template>
<script>
export default {
  props: {
    defaultValue: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      attachments: [],
    };
  },
  created() {
    this.attachments = this.defaultValue || [];
  },
  methods: {
    addNew() {
      this.$refs.legalDocument.click();
    },
    onFilePicked(event) {
      let file = event.target.files || event.dataTransfer.files;
      if (!file.length) {
        return;
      }
      this.attachments.push({
        name: file[0].name,
        isLoading: true,
      });
      this.$emit("add", file[0]);
    },
    remove(item, index) {
      this.attachments.splice(index, 1);
      this.$emit("remove");
    },
  },
  watch: {
    attachments(newValue, oldValue) {
      this.attachments = newValue;
    },
  },
};
</script>
<style lang="scss" scoped>
.attachment-tag-list {
  .attachment-tag {
    padding: 17px 27.3px 18px 29px;
    border-radius: 3px;
    border: solid 1px #f51355;
    color: #f51355;
    background-color: #ffffff;
    margin-right: 40px;
    margin-bottom: 20px;
    display: inline-block;
    button {
      opacity: 0;
      img {
        width: 20px;
        height: 22px;
      }
    }
    &:hover {
      button {
        opacity: 1;
      }
    }
    &.add {
      border: dashed 1px #f51355;
      cursor: pointer;
    }
  }
}
</style>