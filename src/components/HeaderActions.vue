<template>
  <div class="header-actions" :class="className">
    <ul class="d-flex list-style-none">
      <template >
        <li v-for="action in actions" v-if="action.key === 'share' && !hideShare || action.key === 'download' && !hideDownload || action.key === 'comment' && canComment"
            :class="{'md-small-hide':action.key !== 'share'}"
        >
          <md-button
            class="md-simple md-just-icon adaptive-button"
            :class="{active: action.key === 'comment' && isCommentMode}"
            @click="click(action.key)">
            <img class="svg-icon-header-action" :src="`${$iconURL}${action.icon}`" />
          </md-button>
        </li>
        <li
          class="md-small-hide"
        >
          <md-button
            v-if="isCommentMode"
            class="md-simple md-just-icon hide-long-button"
            @click="click('comment')">
            <div class="hide-circle-for-img">
              <img class="hide-svg-icon-long-button" src="static/icons/hide-comments.svg" />
            </div>
            <div class="comments-text">Hide comments</div>
          </md-button>
          <md-button
            v-else
            class="md-simple md-just-icon show-long-button"
            @click="click('comment')">
            <div class="comments-text">Show comments</div>
            <div class="show-circle-for-img">
              <img class="show-svg-icon-long-button" src="static/icons/show-comments.svg" />
            </div>
          </md-button>
        </li>
      </template>
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
import { HeaderActions } from "@/constants/tabs";

export default {
  name: "header-actions",
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
    hideShare: {
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
      actions: HeaderActions,
      isCommentMode: false,
      isSharing: false,
    };
  },
  created() {
    const tenantId = this.$authService.resolveTenantId();
  },
  methods: {
    click(key) {
      console.log('action', key);
      if (key === 'download') {
        this.$emit("export", { type: "pdf" });
      } else if (key === 'share') {
        this.isSharing = !this.isSharing;
      } else if (key === 'comment') {
        this.isCommentMode = !this.isCommentMode;
        this.$emit("toggleCommentMode", this.isCommentMode);
      }
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

<style lang="scss" scoped>
.adaptive-button{
  height: 48px;
  width: 48px;
}

.show-long-button{
  width: 214px;
  height: 56px;
  border-radius: 30px;
  border: solid 1px #f51355;

}
.hide-long-button{
  width: 214px;
  height: 56px;
  border-radius: 30px;
  background-color: #ffe5ec!important;
  &:focus {
    background-color: #ffe5ec!important;
  }
}
.comments-text{
  padding-left: 10px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.34px;
  text-align: center;
  text-transform: none;
  color: #f51355;
}
.show-circle-for-img{
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-left: 10px;
  background-color: #ffe5ec;
}
.hide-circle-for-img{
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: #f51355;
}
.d-flex{
  align-items: center;
}

.svg-icon-header-action{
  width: 22px !important;
  margin-left: 2px;
}

.hide-svg-icon-long-button{
  width: 28px !important;
  margin-left: 2px;
  margin-top: 5px;
}
.show-svg-icon-long-button{
  width: 28px !important;
  margin-left: 2px;
  margin-top: 5px;
}


</style>
