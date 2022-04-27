<template>
  <div class="feedback-message-successful-logo">
    <img width="75" height="78" :src="`${$iconURL}FeedbackForm/Group 28058.svg`">
    <h3><slot>The feedback was sent successfully!</slot></h3>
  </div>
</template>
<style scoped lang="scss">
    .feedback-message-successful-logo {
      display: flex;
      align-items: center;
      margin-left: 100px;

      h3 {
        width: 200px;
        margin-left: 40px;
        line-height: 1.55;
        font-size: 22px;
        font-weight: bold;
        color: #f51355;
      }
    }
</style>
