<template>
  <div @click="addFromEvent( $event )" class="click-capture">
    <comment-circle-button
      class="item"
      v-for="(item, index) in unresolvedComponents"
      :key="index"
      :style="{left: `${item.positionX}px`, top: `${item.positionY}px`}"
      :commentComponent="item"
      @save="saveComment"
      @show="showComments"
      @toggleEditPane="toggleEditPane"
      @onDropped="movedCommentComponent"
      @onDragginStart="isDragging=true"
      @dragging="draggingButton"
      :selectedComponet="selectedCommentComponent"
    ></comment-circle-button>

    <!-- Editing Panel -->
    <transition name="fade">
      <div
        class="comments-list comment-edit-pane"
        v-if="isCommentEditing"
        @click="paneClick($event)"
        :style="{left: `${panelPosition.x}px`, top: `${panelPosition.y - 40}px`}"
        ref="editingPanel"
      >
        <div>
          <div class="form-group">
            <textarea
              rows="4"
              class="form-control"
              placeholder="Write your comment here"
              v-model="editingComment"
            ></textarea>
          </div>
          <img :src="`${this.$iconURL}common/message-dark.svg`" class="text-icon" />
        </div>
        <div class="footer">
          <md-button class="md-simple normal-btn" @click="closeEditPanel">Cancel</md-button>
          <md-button class="md-simple md-black normal-btn" @click="saveComment($event)">Submit</md-button>
        </div>
      </div>
    </transition>
    <!-- End Editing Panel -->

    <!-- Comments List -->
    <transition name="fade">
      <div
        class="comments-list"
        v-if="isOpenCommentListsPane"
        @click="paneClick($event)"
        :style="{left: `${panelPosition.x}px`, top: `${panelPosition.y - 40}px`}"
      >
        <div style="height:40px; margin-right:25px" class="text-right">
          <md-button class="md-simple md-just-icon md-round md-black font-size-40" @click="isOpenCommentListsPane=false">
            <md-icon class="font-size-40">clear</md-icon>
          </md-button>
        </div>
        <div>
          <div v-if="hoveredComponent.comments">
            <comment-item
              v-if="mainComment"
              :comment="mainComment"
              :isEditing="editingCommentId == mainComment.id"
              :isMain="true"
              :replies="replies.length"
              @updateComment="updateComment"
              @resolve="resolveCommentComponent"
              @favorite="markAsFavorite"
              @delete="deleteComment"
            ></comment-item>
            <comment-item 
              v-for="(comment) in replies" 
              :key="comment.id" 
              :comment="comment" 
              :isMain="false"
              @updateComment="updateComment"
              @resolve="resolveCommentComponent"
              @favorite="markAsFavorite"
              @delete="deleteComment"
            ></comment-item>
          </div>
          <div class="form-group reply-form">
            <textarea
              rows="4"
              class="form-control"
              placeholder="Write reply here"
              v-model="editingComment"
            ></textarea>
            <img :src="`${this.$iconURL}common/message-dark.svg`" class="text-icon" />
            <div class="footer">
              <md-button class="md-simple normal-btn" @click="isOpenCommentListsPane=false">Cancel</md-button>
              <md-button
                class="md-simple md-black normal-btn"
                @click="saveComment($event, 'reply')"
              >Submit</md-button>
            </div>
          </div>
        </div>
       
      </div>
    </transition>
    <div :class="{mask:isOpenCommentListsPane}" v-if="isOpenCommentListsPane"></div>
  </div>
  <!-- End Comments List -->
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import CommentCircleButton from "./CommentCircleButton";
import EventCommentComponent from "@/models/EventCommentComponent";
import EventComment from "@/models/EventComment";
import CommentItem from "./CommentItem";

export default {
  components: {
    CommentCircleButton,
    CommentItem
  },
  data() {
    return {
      items: [],
      mostRecentClickCoordinates: null,
      selectedCommentComponent: null,
      hoveredComponent: null,
      comments: [],
      editingComment: "",
      panelPosition: {
        x: 0,
        y: 0
      },
      isCommentEditing: false,
      isOpenCommentListsPane: false,
      isExistingCommentEditing: false,
      isDragging: true,
      editingCommentId: "",
      isFavorite: false
    };
  },
  computed: {
    ...mapState("comment", ["commentComponents"]),
    mainComment() {
      if (!this.hoveredComponent) return null;
      if (!this.comments || this.comments.length === 0) return null;
      return this.comments.find(item => !item.parentId);
    },
    replies() {
      if (!this.hoveredComponent) return null;
      if (!this.comments || this.comments.length === 0) return [];
      return this.comments
        .filter(item => item.parentId)
        .sort((a, b) => b.dateCreated - a.dateCreated);
    },
    unresolvedComponents() {
      return this.commentComponents.filter(item => !item.isResolved);
    }
  },
  created() {
    this.getCommentComponents(this.$route.path);
  },
  methods: {
    ...mapActions("comment", [
      "getCommentComponents",
      "addCommentComponent",
      "deleteCommentComponent",
      "updateCommentComponent",
      "getCommentsAction",
      "updateCommentAction",
      "addComment",
      "deleteCommentAction"
    ]),
    selectItem(event, item) {
      item.isEditing = !item.isEditing;
      event.stopPropagation();
    },
    showComments(commentComponent) {
      if (this.isCommentEditing || this.isOpenCommentListsPane) return;
      this.getCommentsAction(commentComponent.id).then(comments => {
        this.hoveredComponent = commentComponent;
        this.comments = comments;
        this.comments = comments;
        if (!comments || comments.length === 0) return;

        const deviceWidth = window.innerWidth;
        if (this.hoveredComponent.positionX > deviceWidth - 600) {
          this.panelPosition = {
            x: this.hoveredComponent.positionX - 580,
            y: this.hoveredComponent.positionY
          };
        } else {
          this.panelPosition = {
            x: this.hoveredComponent.positionX + 40,
            y: this.hoveredComponent.positionY
          };
        }

        this.isOpenCommentListsPane = true;
      });
    },
    toggleEditPane(commentComponent, isEditing) {
      if (this.isOpenCommentListsPane) {
        this.isOpenCommentListsPane = false;
      }
      if (isEditing) {
        this.selectedCommentComponent = commentComponent;
        const deviceWidth = window.innerWidth;
        if (this.selectedCommentComponent.positionX < 600) {
          this.panelPosition = {
            x: this.selectedCommentComponent.positionX - 20,
            y: this.selectedCommentComponent.positionY + 80
          };
        } else {
          this.panelPosition = {
            x: this.selectedCommentComponent.positionX - 530,
            y: this.selectedCommentComponent.positionY + 80
          };
        }
        if (this.mainComment) {
          this.editingComment = this.mainComment.description;
        }
      } else {
        this.selectedCommentComponent = null;
      }
      this.isCommentEditing = isEditing;
    },
    clearStatus() {
      this.isCommentEditing = false;
      this.isOpenCommentListsPane = false;
      this.selectedCommentComponent = null;
      this.hoveredComponent = null;
      this.comments = [];
    },
    addFromEvent(event) {
      if (this.isCommentEditing || this.isOpenCommentListsPane) {
        this.clearStatus();
        return;
      }
      var element = document.querySelector(".click-capture");
      var top = element.offsetTop;
      const maxIndex = this.commentComponents
        ? this.commentComponents.reduce((index, item) => {
            if (item.index > index) index = item.index;
            return index;
          }, 0)
        : 0;

      this.addCommentComponent({
        dateTime: Date.now(),
        positionX: event.clientX - 80,
        positionY: event.clientY - 100 + window.scrollY,
        index: maxIndex + 1,
        isEditing: false,
        url: this.$route.path
      });
      this.mostRecentClickCoordinates = {
        x: event.clientX,
        y: event.clientY
      };
      event.stopPropagation();
    },
    enter(element) {
      var clickX = this.mostRecentClickCoordinates.x;
      var clickY = this.mostRecentClickCoordinates.y;
      var rect = element.getBoundingClientRect();
      var deltaX = clickX - rect.left - rect.width / 2;
      var deltaY = clickY - rect.top - rect.height / 2;
      element.style.transform = `translateX( ${deltaX}px ) translateY( ${deltaY}px )`;
      element.style.transition = "none";
      this.__force_paint__ = document.body.offsetHeight;
      element.style = null;
    },
    paneClick: function(event) {
      event.stopPropagation();
    },
    saveComment(event, type) {
      let selectedComponent = this.selectedCommentComponent;
      if (type == "reply") {
        selectedComponent = this.hoveredComponent;
      }
      const comment = {
        commentComponent: { id: selectedComponent.id },
        description: this.editingComment,
        parentId: this.mainComment ? this.mainComment.id : null
      };
      this.addComment(comment).then(addedComment => {
        if (type == "reply") {
          this.comments = [addedComment].concat(this.comments);
        }
      });

      // this.isOpenCommentListsPane = true
      // this.isCommentEditing = false;
      // this.isOpenCommentListsPane = false;
      // this.selectedCommentComponent = null;
      this.clearStatus();
      this.editingComment = "";
      this.$forceUpdate();
      event.stopPropagation();
    },
    closeEditPanel() {
      this.isCommentEditing = false;
      this.selectedCommentComponent = null;
    },
    resolveCommentComponent() {
      this.editingCommentId = "";
      const commentComponent = new EventCommentComponent({
        id: this.hoveredComponent.id,
        isResolved: true
      });
      this.updateCommentComponent(commentComponent).then(() => {
        this.isOpenCommentListsPane = false;
      });
    },
    editComment(comment) {
      this.isEditing = true;
      this.editingCommentId = comment.id;
    },
    markAsFavorite(comment, isFavorite) {
      const commentComponent = new EventCommentComponent({
        id: this.hoveredComponent.id
      });
      comment.eventCommentComponent.id = this.hoveredComponent.id;
      if (isFavorite) {
        if (!comment.favoriteUsers) comment.favoriteUsers = [];
        comment.favoriteUsers.push(this.$auth.user.id);
        comment.myFavorite = true;
      } else {
        const index = comment.favoriteUsers.findIndex(
          item => item.id == this.$auth.id
        );
        comment.favoriteUsers.splice(index, 1);
        comment.myFavorite = false;
      }
      this.updateComment(comment).then(() => {
        const index = this.comments.findIndex(item => item.id == comment.id);
        this.comments.splice(index, 1, comment);
        // this.isOpenCommentListsPane = false;
      });
    },

    deleteComment(comment) {
      this.deleteCommentAction(comment).then(() => {
        this.isOpenCommentListsPane = false;
      });
    },
    updateComment(comment) {
      this.editingCommentId = "";
      return new Promise((resolve, reject) => {
        const commentComponent = new EventCommentComponent({
          id: this.hoveredComponent.id
        });
        new EventComment(comment)
          .for(commentComponent)
          .save()
          .then(() => {
            console.log(comment);
          });
        resolve(comment);
      });
    },
    movedCommentComponent(movedCommentComponent) {
      const commentComponent = new EventCommentComponent({
        id: movedCommentComponent.id,
        positionX: movedCommentComponent.positionX,
        positionY: movedCommentComponent.positionY
      });
      this.updateCommentComponent(commentComponent).then(() => {
        this.isOpenCommentListsPane = false;
      });
    },
    draggingButton(component, position) {
      console.log(position);
      if (this.isCommentEditing && this.selectedCommentComponent) {
        if (position.x < 600) {
          this.$refs.editingPanel.style.left = `${position.x - 20}px`;
          this.$refs.editingPanel.style.top = `${position.y + 80}px`;
        } else {
          this.$refs.editingPanel.style.left = `${position.x - 530}px`;
          this.$refs.editingPanel.style.top = `${position.y + 80}px`;
        }
        this.$refs.editingPanel.style.left = `${this.panelPosition.x}px`;
        this.$refs.editingPanel.style.top = `${this.panelPosition.y}px`;

        if (this.mainComment) {
          this.editingComment = this.mainComment.description;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  &-enter {
    opacity: 0;
  }
  &-enter-active {
    transition-duration: 300ms, 200ms;
    transition-property: transform, opacity;
    transition-timing-function: ease;
  }
  &-enter-to {
    opacity: 1;
    transform: translateX(0px) translateY(0px);
  }
}
.items {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;
  width: 500px;
}

.item {
  flex: 0 0 auto;
  margin: 0px 12px 12px 0px;
  padding: 0px 0px 0px 0px;
  width: 38px;
  position: absolute;
  transform: translate(-50%, -50%);
  font-family: "Manrope-ExtraBold";
  color: white;
  font-size: 20px;
  // display: flex;
  justify-content: center;
  align-items: center;
  &.editing {
    background-color: white;
    box-shadow: 0 3px 17px 0 rgba(0, 0, 0, 0.15);
  }
  display: flex;
  align-items: center;
  justify-items: center;
}

.mask {
  width: 100vw;
  top: 0;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.08);
}

.click-capture {
  bottom: 0px;
  cursor: pointer;
  left: 0px;
  position: absolute;
  right: 0;
  top: 100px;
  overflow: hidden;
  // Since clicking around the document will often lead to text-selection, let's just
  // remove the ability to select text in this demo.
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  z-index: 999;
}
.comments-list {
  position: absolute;
  width: 550px;
  min-height: 210px;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background: white;
  z-index: 10;
  padding: 20px 0px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &.comment-edit-pane{
    padding: 20px 25px;
  }
  textarea {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    border: solid 1px #989898;
    background-image: none;
    padding: 10px;
  }
  .footer {
    text-align: right;
    width: 100%;
  }
  .comments-child {
    padding-left: 40px;
    max-height: 400px;
    overflow-y: auto;
    margin-bottom: 20px;
    & > div {
      border-top: solid 1px #cecece;
    }
  }
  .reply-form {
    padding-top: 20px;
    padding-left: 70px; 
    padding-right: 25px;
  }

  .text-icon {
    position: absolute;
    right: 30px;
    top: 30px;
    width: 20px;
  }
  .font-size-40 {
    font-size: 40px !important;
  }
}
</style>