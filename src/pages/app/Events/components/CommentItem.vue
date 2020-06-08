<template>
  <div class="comment-item">
    <div class="d-flex justify-content-between " >
      <div>
        <img class="user-avatar" :src="`${$iconURL}Notes/users-dark.svg`" width="33px">
      </div>
      <div class="comment-item-description">
        <div>{{comment.author.displayName}}</div>
        <div class="post-date"> 
          <timeago :datetime="comment.dateCreated"></timeago>
        </div>
        <div class="comment-item-content" v-if="!isEditing">
          {{comment.description}}
        </div>
        <div class="comment-item-content" v-else>
          <textarea v-model="editingDescription"></textarea>
          <div class="text-right">
            <md-button class="md-simple normal-btn" @click="cancelEditing()" >Cancel</md-button>
            <md-button class="md-simple md-black normal-btn" @click="updateComment()" >Save</md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "comment-item",
  props: {
    comment: {
      type: Object,
    },
    isEditing : {
      type: Boolean
    }
  },
  data() {
    return {
      editingDescription: this.comment.description
    }
  },
  methods: {
    cancelEditing() {
      this.editingDescription = this.comment.description
      this.$emit("cancelUpdate");
    },
    updateComment() {
      this.comment.description = this.editingDescription
      this.$emit("updateComment", this.comment)
    }
  },
  computed: {
    getTimeDiffString() {
    }
  },
}
</script>
<style lang="scss" scoped>
.comment-item{ 
  margin: 20px 0 30px;
  padding-top: 20px;
  padding-left: 10px;
 .user-avatar {
    border: solid 2px black;
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
    textarea {
      width: 100%;
      resize: none;
    }
  }
}
 
</style>