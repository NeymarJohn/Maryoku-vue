<template>
  <div class="select-smile-rate-experience">
    <div
      v-for="(smile, index) in smiles"
      :key="index"
      :class="{
        'select-smile-rate-experience-item': true,
        'select-smile-rate-experience-item-active': value === smile.rate
      }"
      @click="selectSmile(smile.rate)"
    >
      <img
        :src="smile.url"
      >
      <span class="select-smile-rate-experience-item-status">
        {{ smile.status }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectSmileRateExperience",
  props: {
    value: {
      type: String,
      default: 0,
    }
  },
  data() {
    return {
      smiles: [
        { url: "static/img/smile-27727.png", rate: 1, status: "We're sad to hear that!" },
        { url: "static/img/smile-27728.png", rate: 2, status: "We're sad to hear that!" },
        { url: "static/img/smile-27730.png", rate: 3, status: "Thank you for your feedback" },
        { url: "static/img/smile-28046.png", rate: 4, status: "Enjoyable!" },
        { url: "static/img/smile-enjoyable.png", rate: 5, status: "Enjoyable!" },
      ]
    };
  },
  methods: {
    selectSmile(rate) {
      this.$emit("input", rate);
    }
  }
};
</script>

<style lang="scss" scoped>
.select-smile-rate-experience {
  display: flex;
  justify-content: center;
  padding: 0 20px;

  .select-smile-rate-experience-item {
    min-height: 172px;
    margin: 15px;

    .select-smile-rate-experience-item-status {
      max-width: 114px;
      display: none;
      margin-top: 5px;
      font-size: 12px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: center;
      color: #f51355;
    }

    &.select-smile-rate-experience-item-active .select-smile-rate-experience-item-status {
      display: block;
    }
  }
}
</style>
