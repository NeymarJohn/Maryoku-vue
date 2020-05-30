

<template>
  <div @click="addFromEvent( $event )" class="click-capture">
    <comment-circle-button
      class="item"
      v-for="(item, index) in commentComponents"
      :key="index"
      :style="{left: `${item.positionX}px`, top: `${item.positionY}px`}"
      :commentComponent="item"
      @save="saveComment"
      @show="showComments"
      @toggleEditPane="toggleEditPane"
    ></comment-circle-button>

    <!-- Editing Panel -->
    <div
      class="comments-list"
      v-if="isCommentEditing"
      @click="paneClick($event)"
      :style="{left: `${panelPosition.x}px`, top: `${panelPosition.y - 40}px`}"
    >
      <div>
        <div class="form-group">
          <textarea
            rows="4"
            class="form-control"
            placeholder="Write description here"
            v-model="editingComment"
          ></textarea>
        </div>
      </div>
      <div class="footer">
        <md-button class="md-simple normal-btn" @click="isCommentEditing=false">Cancel</md-button>
        <md-button class="md-simple md-black normal-btn" @click="saveComment($event)">Submit</md-button>
      </div>
    </div>
    <!-- End Editing Panel -->

    <!-- Comments List -->
    <div
      class="comments-list"
      v-if="isOpenCommentListsPane"
      @click="paneClick($event)"
      :style="{left: `${panelPosition.x}px`, top: `${panelPosition.y - 40}px`}"
    >
      <div>
        <div v-if="selectedCommentComponent.comments">
          <comment-item :comment="mainComment" v-if="mainComment"></comment-item>
          <div class="reply-dropdown">{{replies.length}} Replies</div>
        </div>
        <div class="comments-child">
          <comment-item v-for="(comment) in replies" :key="comment.id" :comment="comment"></comment-item>
        </div>
        <div class="form-group">
          <textarea
            rows="4"
            class="form-control"
            placeholder="Write description here"
            v-model="editingComment"
          ></textarea>
        </div>
      </div>
      <div class="footer">
        <md-button class="md-simple normal-btn" @click="isOpenCommentListsPane=false">Cancel</md-button>
        <md-button class="md-simple md-black normal-btn" @click="saveComment($event)">Submit</md-button>
      </div>
    </div>
  </div>
  <!-- End Comments List -->
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import CommentCircleButton from "./CommentCircleButton";
import EventComponent from "@/models/EventComponent";
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
      editingComment: "",
      panelPosition: {
        x: 0,
        y: 0
      },
      isCommentEditing: false,
      isOpenCommentListsPane: false
    };
  },
  computed: {
    ...mapState("event", ["commentComponents"]),
    mainComment() {
      if (
        !this.selectedCommentComponent.comments ||
        this.selectedCommentComponent.comments.length === 0
      )
        return null;
      return this.selectedCommentComponent.comments.find(
        item => !item.parentId
      );
    },
    replies() {
      if (
        !this.selectedCommentComponent.comments ||
        this.selectedCommentComponent.comments.length === 0
      )
        return [];
      return this.selectedCommentComponent.comments
        .filter(item => item.parentId)
        .sort((a, b) => b.dateCreated - a.dateCreated);
    }
  },
  methods: {
    ...mapActions("event", [
      "addCommentComponent",
      "getCommentsAction",
      "addComment"
    ]),
    selectItem(event, item) {
      item.isEditing = !item.isEditing;
      event.stopPropagation();
    },
    showComments(commentComponent) {
      console.log(commentComponent);
      this.getCommentsAction(commentComponent.id).then(comments=>{
        console.log(comments)
        this.selectedCommentComponent = commentComponent
        this.selectedCommentComponent.comments = comments
        if (!comments || comments.length === 0)
          return
        this.panelPosition = {
          x: this.selectedCommentComponent.positionX + 40,
          y: this.selectedCommentComponent.positionY
        };
        this.isOpenCommentListsPane = true;
      });

    },
    toggleEditPane(commentComponent, isEditing) {
      if (isEditing) {
        this.selectedCommentComponent = commentComponent
        this.panelPosition = {
          x: this.selectedCommentComponent.positionX + 40,
          y: this.selectedCommentComponent.positionY
        };
      } else this.selectedCommentComponent = null;
      this.isCommentEditing = isEditing;
    },
    addFromEvent(event) {
      if (this.isEditing) return;
      this.addCommentComponent({
        dateTime: Date.now(),
        positionX: event.clientX - 550,
        positionY: event.clientY - 100,
        index: this.commentComponents.length + 1,
        isEditing: false,
        componentId: this.$route.params.blockId,
        eventComponentInstance: new EventComponent({
          id: this.$route.params.blockId
        })
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
    saveComment(event) {
      console.log(this.selectedCommentComponent)
      const comment = {
        commentComponent: { id: this.selectedCommentComponent.id },
        description: this.editingComment,
        parentId: this.mainComment ? this.mainComment.id : null
      }
      this.addComment(comment)
      this.isOpenCommentListsPane = true
      this.isCommentEditing = false
      this.editingComment = ""
      event.stopPropagation()
    }
  },
  watch: {
    commentComponents: {
      handler: function (before, after) {
        console.log(after)
        this.selectedCommentComponent = after.find(item=>item.id === this.selectedCommentComponent.id)
      },
      deep: true
    }
  },
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
  background-color: #ffc001;
  border-radius: 50px 50px 50px 50px;
  flex: 0 0 auto;
  height: 50px;
  margin: 0px 12px 12px 0px;
  padding: 0px 0px 0px 0px;
  width: 50px;
  position: absolute;
  transform: translate(-50%, -50%);
  font-family: "Manrope-ExtraBold";
  color: white;
  font-size: 20px;
  // display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0 3px 17px 0 rgba(0, 0, 0, 0.15);
  }
  &.editing {
    background-color: white;
    box-shadow: 0 3px 17px 0 rgba(0, 0, 0, 0.15);
  }
}

.click-capture {
  bottom: 0px;
  cursor: pointer;
  left: 550px;
  position: fixed;
  right: 0;
  top: 100px;
  // Since clicking around the document will often lead to text-selection, let's just
  // remove the ability to select text in this demo.
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  z-index: 2;
}
.comments-list {
  position: absolute;
  width: 550px;
  min-height: 210px;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background: white;
  z-index: 10;
  padding: 25px 25px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .reply-dropdown {
    font-family: "Manrope-Bold";
    padding-left: 60px;
    font-size: 16px;
    color: #818080;
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
}
</style>