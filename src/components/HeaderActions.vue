<template>
  <div class="header-actions">
    <ul>
      <li>
        <md-button class="md-simple md-just-icon"><img :src="`${$iconURL}common/download-dark.svg`" /></md-button>
      </li>
      <li>
        <md-button class="md-simple md-just-icon">
          <img :src="`${$iconURL}common/share-dark.svg`" @click="toggleSharingMode" />
        </md-button>
      </li>
      <li>
        <md-button class="md-simple md-just-icon" :class="{active:isCommentMode}" @click="toggleCommentMode">
          <img :src="`${$iconURL}common/message-dark.svg`" />
        </md-button>
      </li>
    </ul>
    <sharing-Modal v-if="isSharing"></sharing-Modal>
  </div>
</template>
<script>
import SharingModal from '@/components/Modals/SharingModal'
export default {
  name:"header-actions",
  components: {
    SharingModal,
  },
  data() {
    return {
      isCommentMode: false,
      isSharing:false
    }
  },
  methods: {
    toggleCommentMode() {
      this.isCommentMode = !this.isCommentMode
      this.$emit("toggleCommentMode", this.isCommentMode)
    },
    toggleSharingMode() {
      this.isSharing = !this.isSharing
    }
  },
}
</script>