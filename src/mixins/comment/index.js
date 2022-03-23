import { mapActions } from "vuex";

export default {
  data() {
    return {
      commentComponents: []
      // isOpenCommentListsPane: false,
    };
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
      "getCommentsProposalsByVendor"
    ]),
    async saveComment({ component, comment, index }) {
      console.log("saveComment", comment);
      if (!component.comments || !component.comments.length) {
        const savedComponent = await this.addCommentComponent(component);
        this.commentComponents[index] = savedComponent;
        comment.commentComponent.id = savedComponent.id;
      }

      const addedComment = await this.addComment(comment);
      if (!addedComment.favoriteUsers) addedComment.favoriteUsers = [];
      if (!this.commentComponents[index].comments) {
        this.commentComponents[index].comments = [];
      }
      this.commentComponents[index].comments.push(addedComment);
      this.commentComponents = this.commentComponents.slice(0);
    },
    async updateComment({ comment, component }) {
      console.log("comment.updateCommentAction", comment, component);
      let updatedComment = await this.updateCommentAction(comment);
      console.log("updateComment", updatedComment);
    },
    async updateMixinCommentComponent(component) {
      await this.updateCommentComponent(component);
    },
    async deleteComment({ comment, index }) {
      let res = await this.deleteCommentAction(comment);
      let comments = [...this.commentComponents];
      comments[index].comments = comments[index].comments.filter((item) => item.id !== res.id);
      this.commentComponents = comments;
    }
  },
  computed: {
    commentError() {
      return this.$store.state.comment.error;
    }
  },
  async created() {
    console.log("comment.mixin.created", this.url);
    this.commentComponents = await this.getCommentComponents(this.url ? this.url : this.$route.path);
  }
};
