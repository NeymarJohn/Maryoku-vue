<template>
  <div class="timeline-container">
    <timeline-item
      v-for="(item, index) in timelines"
      :key="index"
      :item="item"
      :index="index"
      class="mt-10 mb-10"
    ></timeline-item>
    <timelineline-empty v-if="timelines.length > 1"></timelineline-empty>
    <md-button class="md-icon-button md-simple close-btn" @click="remove">
      <md-icon class="close-icon">close</md-icon>
    </md-button>
  </div>
</template>
<script>
import TimelineItem from "./TimelineItem";
import TimelineEmpty from "./TimelineEmpty";
import TimelineTemplateItem from "./TimelineTemplateItem";
export default {
  components: {
    TimelineItem,
    TimelineTemplateItem,
    TimelineEmpty,
  },
  props: {
    timelines: {
      type: Array,
      default: () => [],
    },
    groupName: {
      type: String,
      default: "",
    },
  },
  computed: {
    isGroup() {
      return this.groupName.indexOf("timeline") < 0;
    },
  },
  methods: {
    remove() {},
  },
};
</script>
<style lang="scss" scoped>
.timeline-container {
  position: relative;
  &::before {
    content: "";
    border: dashed 1px #908f8f;
    position: absolute;
    width: calc(100% - 70px);
    height: 100%;
    margin-left: 70px;
  }
  .close-btn {
    position: absolute;
    right: 10px;
    top: 30px;
    .close-icon {
      font-size: 30px !important;
    }
  }
}
</style>