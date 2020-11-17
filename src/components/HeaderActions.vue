<template>
  <div class="header-actions">
    <ul>
      <li v-if="!hideDownload">
        <md-button class="md-simple md-just-icon"><img :src="`${$iconURL}common/download-dark.svg`" /></md-button>
      </li>
      <li v-if="canEdit">
        <md-button class="md-simple md-just-icon" @click="toggleSharingMode" >
          <img :src="`${$iconURL}common/share-dark.svg`" />
        </md-button>
      </li>
      <li v-if="canComment">
        <md-button class="md-simple md-just-icon" :class="{active:isCommentMode}" @click="toggleCommentMode">
          <img :src="`${$iconURL}common/message-dark.svg`" />
        </md-button>
      </li>
    </ul>
    <sharing-Modal v-if="isSharing" @cancel="isSharing=false"></sharing-Modal>
  </div>
</template>
<script>
import SharingModal from '@/components/Modals/SharingModal'
export default {
  name:"header-actions",
  components: {
    SharingModal,
  },
  props: {
    hideDownload: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isCommentMode: false,
      isSharing:false,
      shareLink:""
    }
  },
  created () {
    const tenantId = this.$authService.resolveTenantId();
  },
  methods: {
    toggleCommentMode() {
      this.isCommentMode = !this.isCommentMode
      this.$emit("toggleCommentMode", this.isCommentMode)
    },
    toggleSharingMode() {
      this.isSharing = !this.isSharing
    },
    genearteShareLink() {
      this.shareLink = `${this.$authService.getAppUrl(tenantId)}/#/signup?invite=true&role=${this.role}&url=${this.$route.path}`;
      return this.shareLink
    }
  },
  computed: {
    permission() {
      try {
        return this.$store.state.event.eventData.permit 
      } catch(e) {
        return "edit"
      }
    },
    canComment() {
      return this.permission === 'edit' || this.permission === 'comment'
    },
    canEdit() {
      return this.permission === 'edit'
    }
  },
}
</script>