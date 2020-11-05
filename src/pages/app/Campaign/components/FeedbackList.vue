<template>
  <div class="feedback-list">
    <feedback-answer
      v-for="(question, index) in feedbackQuestions"
      :key="index"
      :data="question"
      class="mb-20"
    ></feedback-answer>
  </div>
</template>
<script>
import FeedbackAnswer from "./FeedbackAnswer";
export default {
  data() {
    return {
      feedbackQuestions: [],
    };
  },
  components: {
    FeedbackAnswer,
  },
  created() {
    this.feedbackQuestions = [
      {
        question: "What did you like or dislike about this event?",
        label: "General",
        showQuestion: true,
        rank: 0,
        icon: "",
      },
    ];
    this.event.components
      .sort((a, b) => {
        return a.order - b.order;
      })
      .forEach((service) => {
        if (service.eventCategory.type == "service") {
          this.feedbackQuestions.push({
            question: `How Was The ${service.eventCategory.fullTitle}?`,
            showQuestion: true,
            label: service.eventCategory.fullTitle,
            rank: 0,
            icon: service.eventCategory.icon,
          });
        }
      });
  },
  computed: {
    event() {
      return this.$store.state.event.eventData;
    },
    campaignData() {
      return this.$store.state.campaign.FEEDBACK;
    },
    campaignTitle() {
      return this.$store.state.campaign.FEEDBACK ? this.$store.state.campaign.FEEDBACK.title : "Event Name";
    },
  },
};
</script>
<style lang="scss" scoped>
</style>