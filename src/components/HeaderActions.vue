<template>
  <div class="header-actions" :class="className">
    <ul class="d-flex list-style-none">
      <template >
          <template v-if="requirement">
            <li v-for="(singleAction, i) in requirementActions" v-if="singleAction.key === 'like' || singleAction.key === 'cart'  || singleAction.key === 'comment' && canComment"
                :class="{'md-small-hide':singleAction.key !== 'like'}"
                :key="i"
            >
                <md-button
                    class="md-simple md-just-icon adaptive-button"
                    :class="{active: singleAction.key === 'comment' && isCommentMode}"
                    @click="click(singleAction.key)">
                    <img class="svg-icon-header" :src="`${$iconURL}${singleAction.icon}`" />
                    <span v-if="singleAction.key === 'like'" :class="{'like-dot': proposalUnviewed ==true}"></span>
                    <span v-if="singleAction.key === 'cart'" :class="'cart-dot'">1</span>
                </md-button>
            </li>
          </template>
          <template v-else>
            <li v-for="(action, j) in actions" v-if="action.key === 'share' && !hideShare || action.key === 'download' && !hideDownload || action.key === 'comment' && canComment"
                :class="{'md-small-hide':action.key !== 'share'}"
                :key="j"
            >
                <md-button
                    class="md-simple md-just-icon adaptive-button"
                    :class="{active: action.key === 'comment' && isCommentMode}"
                    @click="click(action.key)">
                    <img class="svg-icon-header-action" :src="`${$iconURL}${action.icon}`" />
                </md-button>
            </li>
          </template >
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
            <div class="hide-comments-text">Hide comments</div>
          </md-button>
          <md-button
            v-else
            class="md-simple md-just-icon show-long-button"
            @click="click('comment')">
            <div class="show-comments-text" :style="customStyles.showCommentsText ? customStyles.showCommentsText : {}">Show comments</div>
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
import { HeaderActions, HeaderActionsRequirements, HeaderActionsDropdown } from "@/constants/tabs";

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
    requirement: {
      type: Boolean,
      default: false,
    },
    proposalUnviewed: {
      type: Boolean,
      default: false,
    },
    page: {
      type: String,
      default: 'event',
    },
    customStyles: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      actions: HeaderActions,
      requirementActions: HeaderActionsRequirements,
      dropdownActions: HeaderActionsDropdown,
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
.hide-comments-text{
  padding-left: 10px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.34px;
  text-align: center;
  text-transform: none;
  color: #f51355;
}
.show-comments-text{
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
.svg-icon-more-header-action {
  width: 8px;
  height: 40px;
  margin-left: 5px;
}
    .dropdown-menu li a:hover, .dropdown-menu li a:focus, .dropdown-menu li a:active {
        background-color: #ffedb7 !important;
        color: #000 !important;
    }
    .dropdown-width{
        // width: max-content;
    }
    .category-list{
        border-bottom: 2px ridge;
        cursor: pointer;
        img {
            width: 30px;
        }
        .category-heading{
            padding: 10px 1.5rem;
            margin: 0 5px;
        }
        .category-item{
            // display: flow-root;
            .category-name{
                float: left;
            }
        }
    }
    .svg-icon-header{
        width: 30px !important;
    }

    .like-dot {
        width: 20px;
        height: 20px;
        margin: 37px 34px 57px 13px;
        padding: 3px 11px 3px 10px;
        background-color: #f51355;
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
        width: 28px;
        height: 28px;
        margin: 37px 34px 57px 13px;
        padding: 3px 11px 3px 10px;
        background-color: #f51355;
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

</style>
