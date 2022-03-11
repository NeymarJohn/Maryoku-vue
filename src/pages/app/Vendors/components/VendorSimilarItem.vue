<template>
  <div>
    <div class="card-wrapper">
      <md-card v-for="(item, index) in similarItems" :key="index" :value="item">
        <md-card-media>
          <img :src="item.image">
        </md-card-media>

        <md-card-header>
          <md-avatar>
            <md-icon>fullscreen</md-icon>
          </md-avatar>

          <div class="md-title">
            {{ item.title }}
          </div>
          <div class="md-subhead">
            <label
              v-for="(rating, ratingIndex) in ratings"
              :key="ratingIndex"
              class="star-rating__star"
              :class="{ 'is-selected': true }"
            >★</label>
            {{ item.score }}
          </div>
        </md-card-header>
      </md-card>
    </div>
    <a class="more">Show more</a>
  </div>
</template>
<script>
import VueElementLoading from "vue-element-loading";

export default {
  name: "VendorSimilarItem",
  components: {
    VueElementLoading,
  },
  props: {
    similarItems: Array,
    ratings: Array,
  },
  data: () => ({
    isLoading: true,
  }),
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.isLoading = false;
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: row wrap;

  .md-card {
    width: 30%;
    margin-right: 2em;

    .md-card-media {
      width: 80%;
      margin: 0 auto;
      margin-top: -2em;
    }

    @media (max-width: $screen-sm-min) {
      margin-right: 0;
      width: 100%;
    }
  }
  a.more {
    color: $purple-500;
  }
}
</style>
