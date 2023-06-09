<template>
  <div class="d-flex mt-50 feedback-question" :class="{ isHidden: !data.showQuestion }">
    <div class="feedback-rating ml-50 mr-50">
      <div class="d-flex">
        <img
          v-if="data.icon"
          class="icon-question"
          :src="`${$iconURL}Budget+Elements/${data.icon}`"
        >
        <img
          v-else
          class="icon-question"
          src="https://static-maryoku.s3.amazonaws.com/storage/icons/Campaign/path-13703.svg"
        >
        <div class="font-size-20 ml-10 mb-20 font-bold">
          {{ data.label }}
        </div>
      </div>
      <star-rating
        v-if="!disabled"
        v-model="data.rank"
        :border-width="0"
        :star-size="30"
        :show-rating="false"
        @rating-selected="setRating"
      />
      <star-rating v-else :border-width="0" :star-size="30" :show-rating="false" read-only />
      <span v-if="data.errors && data.errors.rank" class="d-block text-danger mt-10">
        {{ data.errors.rank }}
      </span>
      <div v-else class="font-size-15 mt-10 text-transform-capitalize">
        {{ rankLabel }}
      </div>
    </div>
    <div class="feedback-message">
      <div class="font-size-20 font-bold mb-20">
        {{ data.question }}
      </div>
      <div>
        <maryoku-textarea v-model="data.comment" size="narrow" :placeholder="placeholder" :disabled="disabled" />
      </div>
      <span v-if="data.errors && data.errors.comment" class="d-block text-danger mt-10">
        {{ data.errors.comment }}
      </span>
    </div>
    <md-switch v-if="showSwitch" v-model="data.showQuestion" class="feedback-btn-switch section below-label large-switch md-switch-rose" :value="true">
      <span v-if="data.showQuestion">Hide this question</span>
      <span v-if="!data.showQuestion">Show this question</span>
    </md-switch>
  </div>
</template>
<script>
import MaryokuTextarea from "@/components/Inputs/MaryokuTextarea";
import StarRating from "vue-star-rating";

export default {
  components: {
    MaryokuTextarea,
    StarRating,
  },
  props: {
    icon: {
      type: String,
      default: "",
    },
    feedbackData: {
      type: Object,
      default: {},
    },
    placeholder: {
      type: String,
      default: "",
    },
    showSwitch: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      data: {},
    };
  },
  computed: {
    rankLabel() {
      if (this.data.rank) {
        switch (this.data.rank) {
          case 1:
            return "Poor";
          case 2:
            return "Okay";
          case 3:
            return "Good";
          case 4:
            return "Very Good";
          case 5:
            return "Amazing!";
        }
      }
      return "";
    },
  },
  watch: {
    data: {
      handler: function (newValue, oldValue) {
        this.$emit("change", newValue);
      },
      deep: true,
    },
  },
  created() {
    this.data = this.feedbackData;
  },
  methods: {
    setRating(rating) {
      this.rating = rating;
    },
  },
};
</script>
<style lang="scss" scoped>
.feedback-question {
  &.isHidden {
    opacity: 0.5;
  }

  .feedback-rating {
    flex-grow: 1;

    .icon-question {
      width: 25px;
      height: 25px;
    }
  }

  .feedback-message {
    width: 40%;

    img {
      width: 30px;
    }
  }

  .feedback-btn-switch {
    margin-left: 30px;
    align-self: flex-end;
  }
}
</style>
