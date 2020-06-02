<template>
  <div class="header-actions">
    <ul>
      <li>
        <md-button class="md-simple md-just-icon"><img :src="`${$iconURL}common/download-dark.svg`" /></md-button>
      </li>
      <li>
        <md-button class="md-simple md-just-icon">
          <img :src="`${$iconURL}common/share-dark.svg`" />
        </md-button>
      </li>
      <li>
        <md-button class="md-simple md-just-icon" :class="{active:isCommentMode}" @click="toggleCommentMode">
          <img :src="`${$iconURL}common/message-dark.svg`" />
        </md-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:"header-actions",
  data() {
    return {
      isCommentMode: false
    }
  },
  methods: {
    toggleCommentMode() {
      this.isCommentMode = !this.isCommentMode
      this.$emit("toggleCommentMode", this.isCommentMode)
    }
  },
}
</script>