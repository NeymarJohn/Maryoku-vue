import {mapActions} from "vuex";
import EventCommentComponent from "@/models/EventCommentComponent";
import EventComment from "@/models/EventComment";

export default {
    data(){
        return {
            commentComponents: [],
            // isOpenCommentListsPane: false,
        }
    },
    methods:{
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
        async saveComment({component, comment, index}) {
            console.log('saveComment', component, comment, index);
            if(!component.comments || component.comments.length){
                const savedComponent = await this.addCommentComponent(component);
                this.commentComponents[index] = savedComponent;
            }

            const addedComment = await this.addComment(comment);
            if (!addedComment.favoriteUsers) addedComment.favoriteUsers = []
            if (!this.commentComponents[index].comments) {
              this.commentComponents[index].comments = []
            }
            this.commentComponents[index].comments.push(addedComment)
            this.commentComponents = this.commentComponents.slice(0)
        },
        async updateComment({comment, component}){
            new EventComment(comment)
                .for(component)
                .save()
                .then(() => {

                });
        },
        async updateCommentComponent(component) {
            this.editingCommentId = "";
            await this.updateCommentComponent(component);
        },
        deleteComment({comment, index}) {
            this.deleteCommentAction(comment)
                .then(() => {
                    const commentIndex = this.commentComponents[index].comments.findIndex(item=>item.id == comment.id)
                    this.commentComponents[index].comments.splice(commentIndex, 1)
                })
                .catch(()=>{
                    const commentIndex = this.commentComponents[index].comments.findIndex(item=>item.id == comment.id)
                    this.commentComponents[this.index].comments.splice(commentIndex, 1)
                });
        },
    },
    created(){
        console.log('comment.mixin.created');
        this.getCommentComponents(this.$route.path).then(commentComponents => {
            this.commentComponents = commentComponents
        });
    }
}
