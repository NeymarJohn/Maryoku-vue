<template>
  <div class="timeline-template-container">
    <template v-if="hasTemplate">
      <div v-if="timelines.length > 0">
        <timeline-item
          v-for="(item, index) in timelines"
          :key="index"
          :item="item"
          :index="index"
          class="mt-10 mb-10"
        ></timeline-item>
        <timelineline-empty v-if="timelines.length > 1"></timelineline-empty>
      </div>
      <div class="empty-template" v-else>
        <div class="empty-template-icon"></div>
        {{ templateName }}
      </div>
    </template>
    <template v-else> </template>

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
    templateName: [String],
  },
  computed: {
    isGroup() {
      return this.groupName.indexOf("timeline") < 0;
    },
    event() {
      return this.$store.state.event.eventData;
    },
    hasTemplate() {
      return this.event.timeline.mode === "template";
    },
  },
  methods: {
    remove() {},
  },
};
</script>
<style lang="scss" scoped>
.timeline-template-container {
  position: relative;
  .empty-template {
    width: calc(100% - 70px);
    padding: 30px 0 30px 100px;
    text-transform: capitalize;
    color: #818080;
    position: relative;
    .empty-template-icon {
      width: 50px;
      height: 50px;
      border: dashed 1px #908f8f;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 10px;
    }
    // &::before {
    //   border-left: dashed 1px #908f8f;
    //   height: 100%;
    //   position: absolute;
    //   top: 0px;
    //   content: "";
    // }
  }
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