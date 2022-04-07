import { mapActions } from "vuex";

export default {
  data() {
    return {
      commentComponents: []
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
      if (!component.comments || !component.comments.length) {
        const savedComponent = await this.addCommentComponent(component);
        this.commentComponents[index] = savedComponent;
        comment.commentComponent = comment.eventCommentComponent;
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
    async updateComment(comment) {
      await this.updateCommentAction(comment);
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
    // this.commentComponents = await this.getCommentComponents(this.url ? this.url : this.$route.path);
    console.log("*******************" + this.$route.path);
    let url = this.$route.path;
    url = url.split("/");
    url = "/proposals/" + url[url.length - 1];
    this.commentComponents = await this.getCommentComponents(this.url ? this.url : url);
  },
};
