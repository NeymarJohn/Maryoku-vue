<template>
  <div class="comment-item" :class="{child: !isMain}">
    <div class="d-flex justify-content-between">
      <div class="comment-item-avatar">
        <Avartar v-if="comment.planner && comment.planner.name"
                 :name="comment.planner.name"
        />
        <Avartar v-else-if="comment.customer && comment.customer.name"
                 :name="comment.customer.name"
        />
        <img v-else-if="!comment.customer && !comment.planner " class="user-avatar"
             :src="`${$iconURL}comments/SVG/user-dark.svg`" width="33px"
        >
      </div>
      <div class="comment-item-description">
        <div v-if="comment.planner">
          {{ comment.planner.name }}
        </div>
        <div v-if="comment.customer">
          {{ comment.customer.name }}
        </div>
        <div class="post-date">
          <timeago :datetime="comment.dateCreated" />
        </div>
        <div v-if="!isEditing" class="comment-item-content">
          {{ comment.description }}
        </div>
        <div v-else class="comment-item-content">
          <div class="form-group">
            <textarea
              v-model="editingDescription"
              rows="4"
              class="form-control"
              placeholder="Write your comment here"
            />
          </div>
          <div class="text-right">
            <md-button class="md-simple normal-btn" @click="cancelEditing()">
              Cancel
            </md-button>
            <md-button class="md-simple md-black normal-btn" @click="updateComment()">
              Submit
            </md-button>
          </div>
        </div>
        <div class="reply-dropdown d-flex justify-content-between">
          <span v-if="isMain">{{ replies }} Replies</span>
          <span v-if="comment.favoriteUsers && comment.favoriteUsers.length>0">
            <img
              :src="`${$iconURL}comments/SVG/heart-gray.svg`"
              class="comment-actions-icon"
              width="25px"
            >
            {{ comment.favoriteUsers.length }}
          </span>
          <span v-else />
          <div class="comment-actions">
            <md-button
              class="edit-btn md-simple md-black comment-action-btn"
              @click="resolveCommentComonent(comment)"
            >
              Resolve
            </md-button>
            <md-button
              class="edit-btn md-simple comment-action-btn"
              @click="editComment(comment)"
            >
              <img
                :src="`${$iconURL}comments/SVG/edit-dark.svg`"
                width="25px"
                class="comment-actions-icon"
              >
            </md-button>
            <md-button class="edit-btn md-simple comment-action-btn">
              <img
                v-if="!myFavorite"
                :src="`${$iconURL}comments/SVG/heart-dark.svg`"
                class="comment-actions-icon"
                @click="markAsFavorite(comment, true)"
              >
              <img
                v-if="myFavorite"
                :src="`${$iconURL}comments/SVG/heart-yellow.svg`"
                class="comment-actions-icon"
                @click="markAsFavorite(comment, false)"
              >
            </md-button>
            <md-button class="edit-btn md-simple comment-action-btn">
              <img
                class="comment-actions-icon trash"
                :src="`${$iconURL}comments/SVG/trash-dark.svg`"
                @click="deleteComment(comment)"
              >
            </md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Avartar from "@/components/Avartar.vue";

export default {
  name: "CommentItem",
  components: {
    Avartar,
  },
  props: {
    comment: {
      type: Object
    },
    proposal: {
      type: Object
    },
    replies: {
      type: Number
    },
    isMain: {
      type: Boolean
    }
  },
  data() {
    return {
      editingDescription: this.comment.description,
      isEditing:false,
      user: this.$store.state.auth.user
    };
  },
  computed: {
    getTimeDiffString() {},
    myFavorite() {
      if (!this.comment.favoriteUsers) return false;
      if (this.comment.favoriteUsers.findIndex(userId => userId === this.user.id) < 0) {
        return false;
      }
      return true;
    }
  },
  methods: {
    cancelEditing() {
      this.editingDescription = this.comment.description;
      this.isEditing = false;
    },
    updateComment() {
      this.comment.description = this.editingDescription;
      this.isEditing = false;
      this.$emit("updateComment", this.comment);
    },
    resolveCommentComonent(comment) {
      this.$emit("resolve", comment);
    },
    editComment(comment) {
      this.isEditing = true;
    },
    markAsFavorite(comment, isFavorite) {
      this.$emit("favorite", comment, isFavorite);
    },
    deleteComment(comment) {
      this.$emit("delete", comment);
    },
  }
};
</script>
<style lang="scss" scoped>
.comment-item {
  margin: 0px;
  padding: 0px 30px 10px;
  & > div {
    padding-top: 20px;
  }
  &:hover {
    background-color: #EEEEEE;
    .comment-actions {
      opacity: 1;;
    }
  }

  &.child {
    & > div {
      border-top: solid 1px #cecece;
      padding-top: 20px;
      padding-left: 10px
    }
    padding-left:60px;
  }
  &-avatar {
    min-width: 40px;
  }
  .user-avatar {
    border-radius: 50%;
    margin-right: 10px;
  }
  .comment-item-description {
    color: black !important;
    flex-grow: 1;
  }
  .post-date {
    font-family: "Manrope-Regular";
    font-size: 14px;
    color: #a0a0a0 !important;
  }
  .comment-item-content {
    font-family: "Manrope-Regular";
    font-size: 16px;
    word-break:break-word;
    textarea {
      width: 100%;
      resize: none;
    }
  }
  textarea {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    border: solid 1px #989898;
    background-image: none;
    padding: 10px;
  }
  .comment-actions {
    color: black;
    opacity: 0;
    .comment-action-btn {
      margin: 0 5px !important;
    }
    &-icon {
      width: 30px;
      height: 30px;
      &.trash {
        padding: 5px 5px 5px 0px;
      }
    }
  }
  .reply-dropdown {
    font-family: "Manrope-Bold";
    margin-top: 20px;
    padding-left: 0px;
    font-size: 16px;
    color: #818080;
  }
}
</style>
