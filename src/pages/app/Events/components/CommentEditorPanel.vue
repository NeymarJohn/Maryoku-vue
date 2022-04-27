<template>
  <div class="click-capture" @click="addFromEvent( $event )">
    <comment-circle-button
      v-for="(item, index) in unresolvedComponents"
      :key="index"
      class="item"
      :style="getCirclePosition(item)"
      :comment-component="item"
      :selected-component="selectedCommentComponent"
      @save="saveComment"
      @show="showComments"
      @toggleEditPane="toggleEditPane"
      @onDropped="movedCommentComponent"
      @onDragginStart="isDragging=true"
      @dragging="draggingButton"
    />

    <!-- Comments List -->
    <transition name="fade">
      <div
        v-if="isOpenCommentListsPane"
        class="comments-list"
        :style="panelPosition"
        @click="paneClick($event)"
      >
        <div style="height:40px; margin-right:25px" class="text-right">
          <md-button class="md-simple md-just-icon md-round md-black font-size-30" @click="closeCommentListPane">
            <md-icon class="font-size-30">
              clear
            </md-icon>
          </md-button>
        </div>
        <div>
          <div v-if="selectedCommentComponent && selectedCommentComponent.comments">
            <comment-item
              v-if="mainComment"
              :comment="mainComment"
              :proposal="proposal"
              :is-editing="editingCommentId == mainComment.id"
              :is-main="true"
              :is-vendor="isVendor"
              :replies="replies.length"
              @updateCommentViewed="updateCommentViewed"
              @updateComment="updateComment"
              @resolve="resolveCommentComponent"
              @favorite="markAsFavorite"
              @delete="deleteComment"
            />
            <comment-item
              v-for="(comment) in replies"
              :key="comment.id"
              :comment="comment"
              :is-main="false"
              :is-vendor="isVendor"
              @updateCommentViewed="updateCommentViewed"
              @updateComment="updateComment"
              @resolve="resolveCommentComponent"
              @favorite="markAsFavorite"
              @delete="deleteComment"
            />
          </div>

          <div class="form-group position-relative reply-form" :class="{'main-form':!(selectedCommentComponent && selectedCommentComponent.length) }">
            <fade-transition v-if="showAddress">
              <md-card class="position-absolute notification-card">
                <md-card-content class="d-flex align-center position-relative p-10">
                  <md-menu md-size="medium" class="action-menu">
                    <md-menu-item v-for="c in customers" :key="c.id" @click="toAddress(c)">
                      {{ c.name }}
                    </md-menu-item>
                  </md-menu>
                </md-card-content>
              </md-card>
            </fade-transition>
            <textarea
              ref="commentEditor"
              v-model="editingComment"
              rows="4"
              class="form-control comment-editor"
              placeholder="Write reply here"
              @input="getMessage"
            />
            <img :src="`${this.$iconURL}comments/SVG/editor-dark.svg`" class="text-icon icon-mention">
            <div class="footer">
              <md-button class="md-simple normal-btn md-button-cancel" @click="closeCommentListPane">
                Cancel
              </md-button>
              <button
                class="md-simple md-black normal-btn md-button-submit"
                @click="saveComment($event, 'reply')"
              >
                <span class="md-button-submit-text">
                  Submit
                </span>
                <span class="md-button-submit-icon">
                  <md-icon>keyboard_arrow_right</md-icon>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- <div v-if="isOpenCommentListsPane" :class="{mask:isOpenCommentListsPane}" /> -->
    <div v-if="isOpenCommentListsPane" :class="[isOpenCommentListsPane ? 'mask' : '', stringRoute.includes('vendor/inbox/proposal') ? 'vendorMask' : '']" />
  </div>
  <!-- End Comments List -->
</template>
<script>
import { mapActions } from "vuex";
import CommentCircleButton from "./CommentCircleButton";
import EventCommentComponent from "@/models/EventCommentComponent";
import { getReq } from "@/utils/token";
import { FadeTransition } from "vue2-transitions";
import CommentItem from "./CommentItem";

export default {
  components: {
    CommentCircleButton,
    FadeTransition,
    CommentItem,
  },
  props:{
    commentComponents:{
      type: Array,
      required: true,
    },
    proposal:{
      type: Object,
      default: () => {}
    },
    url:{
      type: String,
      default: ""
    },
    ignoreXOffset:{
      type: Number,
      default:0
    },
    isVendor:{
      type: Boolean,
      required: false,
      default:false
    },
  },
  data() {
    let updatedCommentComponents = JSON.parse(JSON.stringify(this.commentComponents));
    return {
      items: [],
      mostRecentClickCoordinates: null,
      selectedComponentIndex: -1,
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
      isFavorite: false,
      showAddress: false,
      customers: [],
      selectedCustomer: null,
      updatedCommentComponents: updatedCommentComponents,
      stringRoute: this.$route.path,
    };
  },
  computed: {
    selectedCommentComponent() {
      return this.updatedCommentComponents[this.selectedComponentIndex];
    },
    mainComment() {
      if (this.updatedCommentComponents[this.selectedComponentIndex].comments) {
        return this.updatedCommentComponents[this.selectedComponentIndex].comments[0];
      }
      return {};
    },
    replies() {
      if (this.updatedCommentComponents[this.selectedComponentIndex].comments) {
        return this.updatedCommentComponents[this.selectedComponentIndex].comments.filter((item, index)=>index>0);
      }
      return [];
    },
    unresolvedComponents() {
      return this.updatedCommentComponents.filter(item => !item.isResolved && item.comments && item.comments.length);
    }
  },
  watch:{
    commentComponents(newVal) {
      this.updatedCommentComponents = JSON.parse(JSON.stringify(newVal));
    },
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
      "deleteCommentAction",
      "markAsRead"
    ]),
    selectItem(event, item) {
      
      item.isEditing = !item.isEditing;
      event.stopPropagation();
    },
    showComments(commentComponent) {
      if (this.isOpenCommentListsPane) return;
      this.comments = commentComponent.comments;
      this.selectedComponentIndex = this.updatedCommentComponents.findIndex(item=>item.index === commentComponent.index);
      this.setEditPanePosition(commentComponent.positionX, commentComponent.positionY );
      this.isOpenCommentListsPane = true;
    },

    setEditPanePosition(x, y) {
      const deviceWidth = $(".click-capture").width();

      if(x > deviceWidth){
        x = deviceWidth - 20;
      }

      let circleWidth = 25;
      let circleHeight = 20;

      let editorWidth = 550;

      if (x + editorWidth + circleWidth > deviceWidth) {
        x = x - editorWidth - circleWidth;
      }else{
        x += circleWidth;
      }

      y -= circleHeight;

      this.panelPosition = {left: `${x}px`, top: `${y}px`};
    },
    toggleEditPane(commentComponent, isEditing) {
      if (isEditing) {
        this.showComments(commentComponent);
      } else {
        // this.selectedCommentComponent = null;
      }
      this.isOpenCommentListsPane = isEditing;
      this.markAsRead({proposal:this.proposal,commentComponent});
    },
    clearStatus() {
      if (this.selectedComponentIndex >=0 ) {

        if (!(this.updatedCommentComponents[this.selectedComponentIndex] && this.updatedCommentComponents[this.selectedComponentIndex].comments) || this.updatedCommentComponents[this.selectedComponentIndex].comments.length === 0 ) {
          this.updatedCommentComponents.splice(this.selectedComponentIndex, 1);
        }
      }
      this.isCommentEditing = false;
      this.isOpenCommentListsPane = false;
      this.selectedComponentIndex = -1;
      this.hoveredComponent = null;
      this.comments = [];
    },
    addFromEvent(event) {
      if (this.isOpenCommentListsPane) {
        this.clearStatus();
        return;
      }
      var element = document.querySelector(".click-capture");
      var top = element.offsetTop;
      const maxIndex = this.updatedCommentComponents
        ? this.updatedCommentComponents.reduce((index, item) => {
            if (item.index > index) index = item.index;
            return index;
          }, 0)
        : 0;
        let letfOffset = $(".click-capture").offset().left;
        let topOffset = $(".click-capture").offset().top;
      const newComentComponent = {
        dateTime: Date.now(),
        positionX: event.clientX - letfOffset,
        positionY: event.clientY - topOffset + window.scrollY,
        index: maxIndex + 1,
        isEditing: false,
        url: this.url ? this.url : this.$route.path,
      };
      this.updatedCommentComponents = this.updatedCommentComponents.concat([newComentComponent]);
      this.selectedComponentIndex = this.updatedCommentComponents.length - 1;
      this.setEditPanePosition(event.clientX - letfOffset, event.clientY - topOffset + window.scrollY );
      this.openEditor();
      this.mostRecentClickCoordinates = {
        x: event.clientX,
        y: event.clientY
      };
      event.stopPropagation();
    },
    closeCommentListPane() {
      this.clearStatus();
    },
    openEditor() {
      this.isOpenCommentListsPane = true;
      setTimeout(()=>{
        this.$refs.commentEditor.focus();
      }, 100);
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
    async saveComment(event, type) {
      let selectedComponent = this.updatedCommentComponents[this.selectedComponentIndex];
      const comment = {
        eventCommentComponent: { id: selectedComponent.id },
        description: this.editingComment,
        parentId: this.mainComment ? this.mainComment.id : null,
        email: this.selectedCustomer ? this.selectedCustomer.email : null,
        viewed: this.isVendor
      };
      this.$emit("saveComment", {component: selectedComponent, comment, index: this.selectedComponentIndex});

      this.editingComment = "";
      event.stopPropagation();
    },
    resolveCommentComponent() {
      this.editingCommentId = "";
        const commentComponent = new EventCommentComponent({
            id: this.hoveredComponent.id,
            isResolved: true
        });
      this.$emit("updateCommentComponent", commentComponent);

      this.isOpenCommentListsPane = false;
    },
    editComment(comment) {
      this.isEditing = true;
      this.editingCommentId = comment.id;
    },
    markAsFavorite(comment, isFavorite) {
      const hoveredComponent = this.updatedCommentComponents[this.selectedComponentIndex];
      comment.eventCommentComponent.id = hoveredComponent.id;

      if (isFavorite) {
        if (!comment.favoriteUsers) comment.favoriteUsers = [];
        comment.favoriteUsers.push(this.$store.state.auth.user.id);
        comment.myFavorite = true;
      } else {
        const index = comment.favoriteUsers.findIndex(
          item => item? item.id === this.$store.state.auth.user.id:false
        );
        comment.favoriteUsers.splice(index, 1);
        comment.myFavorite = false;
      }
      const selectedComponent = this.updatedCommentComponents[this.selectedComponentIndex];
      const commentIndex = hoveredComponent.comments.findIndex(item=>item.id===comment.id);
      this.updatedCommentComponents[this.selectedComponentIndex].comments[commentIndex] = comment;
      this.$emit("updateComment", {...comment, eventCommentComponent: new EventCommentComponent({id: selectedComponent.id})});
    },
    deleteComment(comment) {
      this.$emit("deleteComment", {comment, index:this.selectedComponentIndex} );
    },
    updateComment(comment) {
      this.editingCommentId = "";
      const selectedComponent = this.updatedCommentComponents[this.selectedComponentIndex];
      this.$emit("updateComment", {...comment, eventCommentComponent: new EventCommentComponent({ id: selectedComponent.id })});
    },
    updateCommentViewed(comment) {
      this.editingCommentId = "";
      const selectedComponent = this.updatedCommentComponents[this.selectedComponentIndex];
      this.$emit("updateComment", { ...comment, eventCommentComponent: new EventCommentComponent({ id: selectedComponent.id }) });
    },
    movedCommentComponent(movedCommentComponent) {
      const commentComponent = new EventCommentComponent({
        id: movedCommentComponent.id,
        positionX: movedCommentComponent.positionX,
        positionY: movedCommentComponent.positionY
      });
      this.$emit("updateCommentComponent", commentComponent);
      this.isOpenCommentListsPane = false;
    },
    draggingButton(component, position) {
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
    },
    async getMessage(e){
      if(e.data === "@"){
        let userId = this.$store.state.auth.user.id;
        let proposalId = this.$route.params.proposalId;

        let res = await getReq(`/1/searchCustomer?proposalId=${proposalId}&userId=${userId}`);
        this.customers = res.data;

        this.showAddress = true;
      }
    },
    toAddress(customer){

      this.selectedCustomer = customer;
      let queryArray = this.editingComment.split("@");
      queryArray[1] = customer.name;

      this.editingComment = queryArray.join("@") + " ";
      this.showAddress = false;
    },
    getCirclePosition(item){

      if(item.positionX > $(".click-capture").width()){
        item.positionX = $(".click-capture").width() - 20;
      }
      return {left: `${item.positionX}px`, top: `${item.positionY}px`};
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
  margin-left: -65px;
  background-color: rgba(0, 0, 0, 0.08);
}

.vendorMask {
  width: 100vw;
  top: 0;
  height: 100vh;
  position: fixed;
  margin-left: 0px;
  background-color: rgba(0, 0, 0, 0.08);
}

.click-capture {
  bottom: 0px;
  left: 0px;
  position: absolute;
  right: 0;
  top: 100px;
  // Since clicking around the document will often lead to text-selection, let's just
  // remove the ability to select text in this demo.
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  z-index: 4999;
}
.event-plan .click-capture {
  //left: 400px;
}
.comments-list {
  position: absolute;
  width: 550px;
  min-height: 210px;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background: white;
  z-index: 10;
  padding: 0px 0px 10px;
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
    padding: 17px 13px 17px 19px;
    border: solid 1px #707070;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: 20px 0;
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
  .main-form {
    padding-left: 25px;
  }
  .text-icon {
    position: absolute;
    right: 37px;
    top: 35px;
    width: 20px;
  }
  .md-button-cancel {
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #050505 !important;
  }
  .md-button-submit {
    display: flex;
    text-align: center;
    padding: 0;
    border: none;
    outline: none;
    border-radius: 2px;
    background: #641856;
    cursor: pointer;

    .md-button-submit-text {
      align-self: center;
      padding: 5px 10px;
      font-size: 16px;
      font-weight: 800;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: #fff;
    }

    .md-button-submit-icon {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 5px 10px;
      border-radius: 2px;
      background-color: #741e64;
      i {
        color: #fff;
      }
    }
  }
  .font-size-30 {
    font-size: 30px !important;
  }
}
</style>
