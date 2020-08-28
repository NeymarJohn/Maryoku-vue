<template>
  <div class="d-flex mt-50">
    <div class="feedback-message">
      <div class="font-size-20 font-bold mb-20">
        <img v-if="icon" :src="`${$iconURL}Budget+Elements/${icon}.svg`"/>
        {{question}}</div>
      <div>
        <maryoku-textarea></maryoku-textarea>
      </div>
    </div>
    <div class="ml-50 mr-50">
      <div class="font-size-14 mb-20 font-bold">Rank Your Total Experience</div>
      <star-rating :border-width="0" :star-size="30" :show-rating="false" @rating-selected="setRating" ></star-rating>
      <div class="font-size-12 mt-10">Very good</div>
    </div>
    <md-switch class="below-label large-switch">Hide this question</md-switch>
  </div>
</template>
<script>
import MaryokuTextarea from '@/components/Inputs/MaryokuTextarea'
import StarRating from 'vue-star-rating'

export default {
  components: {
    MaryokuTextarea,
    StarRating
  },
  props: {
    question: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      rating: 0
    }
  },
  methods: {
    setRating(rating) {
      this.rating = rating
    }
  },
}
</script>
<style lang="scss" scoped>
.feedback-message {
  img {
    width: 30px;
  }
}
</style>