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
        <div class="comment-item-content">
          {{comment.description}}
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
  }
}
 
</style>