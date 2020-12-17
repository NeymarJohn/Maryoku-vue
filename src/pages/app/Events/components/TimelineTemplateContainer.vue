<template>
  <div class="timeline-template-container">
    <template v-if="hasTemplate">
      <template v-if="groupedItems.length > 0">
        <timeline-item
          v-for="(item, index) in groupedItems"
          :key="index"
          :item="item"
          :index="index"
          class="mt-10 mb-10"
        ></timeline-item>
      </template>
      <drop
        style="height: 100%; min-height: 50px"
        class="empty-template"
        @drop="handleDrop(groupedItems.length, ...arguments)"
        @dragenter="hadleDragEnter"
        @dragleave="handleDragLeave"
        :class="{ dropping: isHover }"
      >
        <div
          class="empty-template-icon"
          :style="hoverStyle"
          :class="{ hovering: isHover }"
          v-if="groupedItems.length == 0"
        >
          <img :src="`${$iconURL}Timeline-New/templates/${templateName}.svg`" />
        </div>

        <div class="empty-template-panel" :class="{ adding: groupedItems.length > 0 }" :style="hoverStyle">
          <span v-if="isEmpty">{{ templateName }}</span>
          <span v-else><md-icon>add</md-icon>{{ templateName }}</span>
        </div></drop
      >
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
import { Drag, Drop } from "vue-drag-drop";
import { hexToRgbA } from "@/utils/helperFunction";
import moment from "moment";
export default {
  components: {
    TimelineItem,
    TimelineTemplateItem,
    TimelineEmpty,
    Drop,
  },
  data() {
    return {
      isHover: false,
      timelineItems: [],
    };
  },
  props: {
    timelines: {
      type: Array,
      default: () => [],
    },
    templateName: [String],
    groupIndex: [Number],
    timelineDate: [Object],
  },
  computed: {
    event() {
      return this.$store.state.event.eventData;
    },
    hasTemplate() {
      return this.event.timeline.mode === "template";
    },
    hoverStyle() {
      if (!this.isHover) {
        return "";
      }
      return `border: solid 2px ${this.droppingBlock.color}; background-color: ${hexToRgbA(
        this.droppingBlock.color,
        0.25,
      )}`;
    },
    groupedItems() {
      return this.timelineItems.filter((item) => item.groupNumber == this.groupIndex);
    },
    isEmpty() {
      return this.groupedItems.length === 0;
    },
  },
  methods: {
    remove() {},
    hadleDragEnter(data) {
      console.log(data);
      console.log("started");
      this.droppingBlock = data.block;
      this.isHover = true;
    },
    handleDragLeave(data) {
      this.isHover = false;
    },
    handleDrop(index, droppedData) {
      let block = Object.assign({}, droppedData.block);
      block.mode = "edit";
      let startDate = new Date(this.timelineDate.date);
      let endDate = new Date(this.timelineDate.date);

      block.startTime = moment(`${this.timelineDate.date} 00:00 am`, "YYYY-MM-DD hh:mm a").valueOf();
      block.endTime = moment(`${this.timelineDate.date} 00:00 am`, "YYYY-MM-DD hh:mm a").valueOf();

      console.log(block);
      if (index == 0) {
        if (this.event.eventDayPart == "evening") {
          block.startTime = moment(`${this.timelineDate.date} 07:00 PM`, "YYYY-MM-DD hh:mm A").valueOf();
          block.endTime = moment(`${this.timelineDate.date} 08:00 PM`, "YYYY-MM-DD hh:mm A").valueOf();
        } else {
          block.startTime = moment(`${this.timelineDate.date} 08:00 AM`, "YYYY-MM-DD hh:mm A").valueOf();
          block.endTime = moment(`${this.timelineDate.date} 09:00 AM`, "YYYY-MM-DD hh:mm A").valueOf();
        }
      } else {
        const prevItem = this.groupedItems[index - 1];
        block.startTime = prevItem.endTime;
        block.endTime = prevItem.endTime + 3600 * 1000;
      }

      block.title = droppedData.block.buildingBlockType;
      block.startDuration = "am";
      block.endDuration = "am";
      block.attachmentName = "";
      block.isItemLoading = false;
      block.icon = droppedData.block.icon;
      block.date = this.timelineDate.date;
      block.groupNumber = this.groupIndex;
      console.log(block);
      console.log(this.timelineItems);
      this.isHover = false;
      this.timelineItems.push(block);
      console.log(this.timelineItems);
    },
  },
};
</script>
<style lang="scss" scoped>
.timeline-template-container {
  position: relative;
  .adding-slot {
    height: 100%;
    min-height: 50px;
    margin-left: 70px;
    text-align: center;
    color: #818080;
    text-transform: capitalize;
    font-weight: bold;
  }
  .empty-template {
    width: 100%;
    position: relative;
    .empty-template-icon {
      width: 50px;
      height: 50px;
      border: dashed 1px #908f8f;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .empty-template-panel {
      width: calc(100% - 70px);
      margin-left: 70px;
      padding: 30px;
      text-transform: capitalize;
      color: #818080;
      &.adding {
        text-align: center;
        padding: 10px;
      }
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