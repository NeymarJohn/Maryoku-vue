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
      :selectedComponet="selectedCommentComponent"
    ></comment-circle-button>

    <!-- Editing Panel -->
    <transition name="fade">
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
              placeholder="Write your comment here"
              v-model="editingComment"
            ></textarea>
          </div>
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
        <div>
          <div v-if="hoveredComponent.comments">
            <comment-item 
              v-if="mainComment" 
              :comment="mainComment" 
              :isEditing="editingCommentId == mainComment.id"
              @cancelUpdate="editingCommentId=''"
              @updateComment="updateComment"
            >
            </comment-item>
            <div class="reply-dropdown d-flex justify-content-between" >
              {{replies.length}} Replies
              <div class="comment-actions">
                <md-button class="edit-btn md-simple md-black comment-action-btn" @click="resolveCommentComonent()">
                  Resolve
                </md-button>
                <md-button class="edit-btn md-simple comment-action-btn" @click="editComment(mainComment)">
                  <img :src="`${$iconURL}comments/SVG/edit-dark.svg`" width="25px" />
                </md-button>
                <md-button class="edit-btn md-simple comment-action-btn">
                  <img :src="`${$iconURL}comments/SVG/heart-dark.svg`" v-if="!mainComment.myFavorite" width="30px" @click="markAsFavorite(mainComment)"/>
                  <img :src="`${$iconURL}comments/SVG/heart-yellow.svg`" v-if="mainComment.myFavorite" width="30px" @click="unMarkAsFavorite(mainComment)"/>
                </md-button>
                <md-button class="edit-btn md-simple comment-action-btn" >
                  <img class="trash" :src="`${$iconURL}Timeline-New/Trash.svg`" width="18px" @click="deleteComment(mainComment)" />
                </md-button>
              </div>
            </div>
          </div>
          <div class="comments-child">
            <comment-item v-for="(comment) in replies" :key="comment.id" :comment="comment"></comment-item>
          </div>
          <div class="form-group" style="padding-left: 40px">
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
          <md-button
            class="md-simple md-black normal-btn"
            @click="saveComment($event, 'reply')"
          >Submit</md-button>
        </div>
      </div>
    </transition>
    <div  :class="{mask:isOpenCommentListsPane}" v-if="isOpenCommentListsPane"></div>
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
      editingComment: "",
      panelPosition: {
        x: 0,
        y: 0
      },
      isCommentEditing: false,
      isOpenCommentListsPane: false,
      isExistingCommentEditing: false,
      isDragging:true,
      editingCommentId: ""
    };
  },
  computed: {
    ...mapState("comment", ["commentComponents"]),
    mainComment() {
      if (!this.hoveredComponent) return null;
      if (
        !this.hoveredComponent.comments ||
        this.hoveredComponent.comments.length === 0
      )
        return null;
      return this.hoveredComponent.comments.find(item => !item.parentId);
    },
    replies() {
      if (!this.hoveredComponent) return null;
      if (
        !this.hoveredComponent.comments ||
        this.hoveredComponent.comments.length === 0
      )
        return [];
      return this.hoveredComponent.comments
        .filter(item => item.parentId)
        .sort((a, b) => b.dateCreated - a.dateCreated);
    },
    unresolvedComponents() {
      return this.commentComponents.filter(item=>!item.isResolved)
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
      "updateComment",
      "addComment"
    ]),
    selectItem(event, item) {
      item.isEditing = !item.isEditing;
      event.stopPropagation();
    },
    showComments(commentComponent) {
      if (this.isCommentEditing || this.isOpenCommentListsPane) return;
      this.getCommentsAction(commentComponent.id).then(comments => {
        this.hoveredComponent = commentComponent;
        this.hoveredComponent.comments = comments;
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
    },
    addFromEvent(event) {
      if (this.isCommentEditing || this.isOpenCommentListsPane) {
        this.clearStatus();
        return;
      }
      var element = document.querySelector(".click-capture");
      var top = element.offsetTop;
      const maxIndex = this.commentComponents?this.commentComponents.reduce((index,item)=>{
        if (item.index > index) index = item.index
        return index
      }, 0)  : 0;

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
          this.hoveredComponent.comments = [addedComment].concat(
            this.hoveredComponent.comments
          );
        }
      });

      // this.isOpenCommentListsPane = true
      // this.isCommentEditing = false;
      // this.isOpenCommentListsPane = false;
      // this.selectedCommentComponent = null;
      this.clearStatus()
      this.editingComment = "";
      this.$forceUpdate();
      event.stopPropagation();
    },
    closeEditPanel() {
      this.isCommentEditing = false;
      this.selectedCommentComponent = null;
    },
    resolveCommentComonent() {
      this.editingCommentId = ""
      const commentComponent = new EventCommentComponent({id:this.hoveredComponent.id, isResolved: true})
      this.updateCommentComponent(commentComponent).then(()=>{
        this.isOpenCommentListsPane = false
      })
    },
    editComment(comment) {
      this.isEditing = true;
      this.editingCommentId = comment.id
    },
    markAsFavorite(comment) {
      const commentComponent = new EventCommentComponent({id: this.hoveredComponent.id})
      comment.eventCommentComponent.id = this.hoveredComponent.id
      if (!comment.favoriteUsers)  comment.favoriteUsers = []
      comment.favoriteUsers.push(this.$auth.user.id)
      comment.myFavorite = true
      this.updateComment(comment).then(()=>{
        this.isOpenCommentListsPane = false
      })
    },
    unMarkAsFavorite(comment){
      const commentComponent = new EventCommentComponent({id: this.hoveredComponent.id})
      comment.eventCommentComponent.id = this.hoveredComponent.id
      if (!comment.favoriteUsers)  comment.favoriteUsers = []
      const index =  comment.favoriteUsers.findIndex(item=> item.id == this.$auth.id)
      comment.favoriteUsers.splice(index, 1)
      comment.myFavorite = false
      this.updateComment(comment).then(()=>{
        this.isOpenCommentListsPane = false
      })
    },
    deleteComment(comment) {
      const commentComponent = new EventCommentComponent({id: this.hoveredComponent.id})
      this.deleteCommentComponent(commentComponent).then(()=>{
        this.isOpenCommentListsPane = false
      })
    },
    updateComment(comment) {
      this.editingCommentId = ""
      const commentComponent = new EventCommentComponent({id: this.hoveredComponent.id})
      new EventComment(comment)
        .for(commentComponent)
        .save()
        .then(()=>{
          console.log(comment)
        }) 
    },
    movedCommentComponent(movedCommentComponent) {
      const commentComponent = new EventCommentComponent({
        id:movedCommentComponent.id,
        positionX: movedCommentComponent.positionX,
        positionY: movedCommentComponent.positionY
      })
      this.updateCommentComponent(commentComponent).then(()=>{
        this.isOpenCommentListsPane = false
        // this.isCommentEditing = false
      })
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
  background-color: #ffc001;
  border-radius: 50px 50px 50px 50px;
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
  &:hover {
    box-shadow: 0 3px 17px 0 rgba(0, 0, 0, 0.15);
  }
  &.editing {
    background-color: white;
    box-shadow: 0 3px 17px 0 rgba(0, 0, 0, 0.15);
  }

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
  .comment-actions {
    color: black;
    .comment-action-btn {
      margin: 0 5px !important;
    }
  }

}
</style>