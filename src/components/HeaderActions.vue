<template>
    <div class="header-actions" :class="className">
        <ul class="d-flex list-style-none">
            <li v-if="!hideDownload && !isMobile">
                <md-button class="md-simple md-just-icon" id="download-button" @click="startDownload">
                    <img :src="`${$iconURL}common/download-dark.svg`" />
                </md-button>
            </li>
            <li>
                <md-button class="md-simple md-just-icon" @click="toggleSharingMode" id="invite-button">
                    <img :src="`${$iconURL}common/share-dark.svg`" />
                </md-button>
            </li>
            <li v-if="canComment && !isMobile">
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
import { MobileMixins } from "@/mixins";
export default {
  name: "header-actions",
  mixins: [MobileMixins],
  components: {
    SharingModal,
  },
  props: {
    className: {
       type: String,
       default: '',
    },
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
      this.$emit("share", {...args, cb: params => {
          console.log('shareLink', params);
          this.isSharing = false;
        }})
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
