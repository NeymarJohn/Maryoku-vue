<template>
  <div class="header-actions">
    <ul>
      <li v-if="!hideDownload">
        <md-button class="md-simple md-just-icon" id="download-button" @click="startDownload">
          <img :src="`${$iconURL}common/download-dark.svg`" />
        </md-button>
      </li>
      <li>
        <md-button class="md-simple md-just-icon" @click="toggleSharingMode" id="invite-button">
          <img :src="`${$iconURL}common/share-dark.svg`" />
        </md-button>
      </li>
      <li v-if="canComment">
        <md-button
          class="md-simple md-just-icon"
          :class="{ active: isCommentMode }"
          @click="toggleCommentMode"
          id="comment-button"
        >
          <img :src="`${$iconURL}common/message-dark.svg`" />
        </md-button>
      </li>
    </ul>
    <sharing-modal
        v-if="isSharing"
        :page="page"
        @share="shareLink"
        @cancel="isSharing = false"/>
  </div>
</template>
<script>
import SharingModal from "@/components/Modals/SharingModal";
export default {
  name: "header-actions",
  components: {
    SharingModal,
  },
  props: {
    hideDownload: {
      type: Boolean,
      default: false,
    },
    page: {
      type: String,
      default: 'event',
    }
  },
  data() {
    return {
      isCommentMode: false,
      isSharing: false,
    };
  },
  created() {
    const tenantId = this.$authService.resolveTenantId();
  },
  methods: {
    toggleCommentMode() {
      this.isCommentMode = !this.isCommentMode;
      this.$emit("toggleCommentMode", this.isCommentMode);
    },
    toggleSharingMode() {
      this.isSharing = !this.isSharing;
    },
    startDownload() {
      this.$emit("export", { type: "pdf" });
    },
    shareLink(args){
      this.$emit("share", args)
    }
  },
  computed: {
    permission() {
      try {
        return this.$store.state.event.eventData.permit;
      } catch (e) {
        return "edit";
      }
    },
    canComment() {
      return this.canEdit || this.permission === "comment";
    },
    canEdit() {
      return !this.permission || this.permission === "edit";
    },
  },
};
</script>
