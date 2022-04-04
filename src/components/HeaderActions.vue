<template>
  <div class="header-actions" :class="className">
    <ul class="list-style-none">
      <template>
        <div class="drop-down-action" :style="{alignItems: positioning}">
          <div>
            <li
              class="md-small-hide"
            >
              <md-button
                v-if="isCommentMode"
                class="md-simple md-just-icon hide-long-button"
                @click="click('comment')"
              >
                <div class="show-circle-for-img">
                  <img class="show-svg-icon-long-button" src="../../static/icons/icon-comment.svg">
                </div>
                <div class="show-comments-text">
                  Hide comments
                </div>
              </md-button>
              <md-button
                v-else
                class="md-simple md-just-icon hide-long-button active"
                @click="click('comment')"
              >
                <div class="d-flex show-comment-wrapper">
                  <div class="hide-comments-text"
                       :style="customStyles.showCommentsText ? customStyles.showCommentsText : {}"
                  >
                    Show comments
                  </div>
                  <div class="hide-circle-for-img"
                       :style="customStyles.marginForCircle ? customStyles.marginForCircle : {marginLeft: '10px'}"
                  >
                    <img class="hide-svg-icon-long-button" src="../../static/icons/icon-comment.svg">
                  </div>
                </div>
              </md-button>
            </li>
          </div>
          <drop-down v-if="showMenu" class="d-inline-block">
            <button class="more-button md-simple" data-toggle="dropdown">
              <md-icon class="font-size-40">
                more_vert
              </md-icon>
            </button>
            <ul class="dropdown-width dropdown-menu dropdown-other dropdown-menu-right ">
              <li v-for="(action, j) in actions"
                  v-show="action.key === 'share' || action.key === 'download'|| action.key === 'comment'"
                  :key="j"
                  :class="{'md-small-hide':action.key !== 'share'}"
              >
                <div class="other-name" @click="click(action.key)">
                  <img class="svg-icon-header-action" :src="`${$iconURL}${action.icon}`">
                  &nbsp;&nbsp;
                  <span>
                    {{ action.title }}
                  </span>
                </div>
              </li>
            </ul>
          </drop-down>
        </div>
      </template>
    </ul>
    <sharing-modal
      v-if="isSharing"
      :page="page"
      @share="shareLink"
      @cancel="isSharing = false"
    />
  </div>
</template>
<script>
import SharingModal from "@/components/Modals/SharingModal";
import { HeaderActions } from "@/constants/tabs";
import { mapActions } from "vuex";

export default {
  name: "HeaderActions",
  components: {
    SharingModal,
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    hideDownload: {
      type: Boolean,
      default: false,
    },
    hideShare: {
      type: Boolean,
      default: false,
    },
    requirement: {
      type: Boolean,
      default: false,
    },
    proposalUnviewed: {
      type: Boolean,
      default: false,
    },
    cartCount: {
      type: Number,
      default: 0,
    },
    anyLiked: {
      type: Boolean,
      default: false,
    },
    page: {
      type: String,
      default: "event",
    },
    customStyles: {
      type: Object,
      default: () => ({}),
    },
    showMenu: {
      type: Boolean,
      default: true,
    },
    positioning: {
      type: String,
      default: "center",
    },
  },
  data() {
    return {
      isCommentMode: false,
      isSharing: false,
    };
  },
  computed: {
    actions() {
      HeaderActions
        .filter((action) => {
          return action.key === "share" || action.key === "download" || action.key === "comment";
        })
        .forEach((element) => {
          if (element.key === "download") {
            element.title = "Download";
          } else if (element.key === "share") {
            element.title = "Create link";
          }
        });
      return HeaderActions;
    },
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
    showCommentPanel() {
      return this.$store.state.eventPlan ? this.$store.state.eventPlan.showCommentPanel : false;
    },
  },
  created() {
    const tenantId = this.$authService.resolveTenantId();
  },
  methods: {
    ...mapActions("eventPlan", ["toggleCommentMode"]),
    click(key) {
      if (key === "download") {
        this.$emit("export", { type: "pdf" });
      } else if (key === "share") {
        this.isSharing = !this.isSharing;
      } else if (key === "comment") {
        this.isCommentMode = !this.isCommentMode;
        this.$emit("toggleCommentMode", this.isCommentMode);
        this.toggleCommentMode(this.isCommentMode);
      }
    },
    shareLink(args) {
      this.$emit("share", {
        ...args, cb: params => {
          this.isSharing = false;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.adaptive-button {
  height: 48px;
  width: 48px;
}

.show-long-button {
  width: 214px;
  height: 56px;
  border-radius: 30px;
  border: solid 1px #ffc001;
  background-color: #f5f5f5;
}

.hide-long-button {
  width: 214px;
  height: 56px;
  border-radius: 30px;
  border: solid 1px #ffc001;
}

.hide-long-button .active {
  background-color: #ffc001 !important;
}

.hide-comments-text {
  color: white;
  margin-left: 3px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.34px;
  text-align: center;
  text-transform: none;
  flex-grow: 1;
}

.show-comments-text {
  padding-left: 10px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.34px;
  text-align: center;
  text-transform: none;
  color: #4e4e4e;
}

.show-circle-for-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: -7px;
  background-color: #ffc001;
}

.hide-circle-for-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
}

.d-flex {
  align-items: center;
}

.svg-icon-header-action {
  width: 22px !important;
  margin-left: 2px;
}

.hide-svg-icon-long-button {
  filter: invert(30%) sepia(26%) saturate(4932%) hue-rotate(4deg) brightness(109%) contrast(105%);
  width: 32px !important;
  height: 32px !important;
}

.show-svg-icon-long-button {
  width: 32px !important;
  height: 32px !important;
}

.svg-icon-more-header-action {
  width: 8px;
  height: 40px;
  margin-left: 5px;
}

.dropdown-menu li a:hover, .dropdown-menu li a:focus, .dropdown-menu li a:active {
  background-color: #ffedb7 !important;
  color: #000 !important;
}

.dropdown-width {
  // width: max-content;
}

.category-list {
  border-bottom: 2px ridge;
  cursor: pointer;

  img {
    width: 30px;
  }

  .category-heading {
    padding: 10px 1.5rem;
    margin: 0 5px;
  }

  .category-item {
    // display: flow-root;
    .category-name {
      float: left;
    }
  }
}

.svg-icon-header {
  width: 50px !important;
}

.like-dot {
  width: 20px;
  height: 20px;
  margin: 37px 34px 57px 13px;
  padding: 3px 11px 3px 10px;
  background-color: #ffc001;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  border-radius: 50%;
  position: absolute;
}

.cart-dot {
  width: 22px;
  height: 22px;
  margin: 0px 0px 0px -22px;
  padding: 0px 0px 0px 7px;
  background-color: #ffc001;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  border-radius: 50%;
  position: absolute;
}

.drop-down-action {
  display: flex;

  .more-button {
    cursor: pointer;
    background: none;
    border: none;
  }

  .dropdown-menu {
    .other-name {
      cursor: pointer;
      padding: 5px 0px;
    }
  }
}
</style>
