<template>
  <drop
    @drop="handleDrop( ...arguments)"
    @dragenter="hadleDragEnter"
    @dragleave="handleDragLeave"
    style="height: 100%; min-height: 50px;"
    :data-index="index"
    class="timeline-template-drop"
  >
    <div class="timeline-template-item" :class="{dropping:isHover}">
      <div class="timeline-image" :style="hoverStyle">
        <img
          class="time-line-blocks_icon"
          v-if="item.status=='template'"
          :src="`${$iconURL}Timeline-New/templates/${item.icon.toLowerCase()}.svg`"
        />
        <img class="time-line-blocks_icon" v-else :src="`${$iconURL}Timeline-New/timegap.svg`" />
        <!-- <div class="timeline-image-mask"></div> -->
      </div>
      <div
        v-if="item.status=='template'"
        class="template-form ml-20"
        :class="`${item.group}`"
        :style="hoverStyle"
      >
        <span>{{item.title}}</span>
        <md-button class="md-icon-button md-simple close-btn" @click="remove">
          <md-icon class="close-icon">close</md-icon>
        </md-button>
        <!-- <div class="template-form-mask"></div> -->
      </div>
      <div
        v-if="item.status=='timegap'"
        class="template-form ml-20 text-center"
        :style="hoverStyle"
      >
        <div>*{{formatHour(item.timeGap.start)}}- {{formatHour(item.timeGap.end)}}</div>
        <div class="font-bold">Window Gap</div>
        <div>Drag A Time Slot To Complete Timeline</div>
        <md-button class="md-icon-button md-simple close-btn" @click="remove">
          <md-icon class="close-icon">close</md-icon>
        </md-button>
        <!-- <div class="template-form-mask"></div> -->
      </div>
    </div>
  </drop>
</template>
<script>
import { Drag, Drop } from "vue-drag-drop";
import { hexToRgbA } from "@/utils/helperFunction";
import moment from "moment";

export default {
  components: {
    Drop,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isHover: false,
      droppingBlock: {},
    };
  },
  methods: {
    remove() {
      this.$root.$emit("remove-template", {
        item: this.item,
        index: this.index,
      });
    },
    handleDrop() {
      this.$root.$emit("apply-template", {
        item: this.item,
        block: this.droppingBlock,
        index: this.index,
      });
    },
    hadleDragEnter(data) {
      console.log(data);
      console.log("started");
      this.droppingBlock = data.block;
      this.isHover = true;
    },
    handleDragLeave(data) {
      this.isHover = false;
    },
    formatHour(date) {
      return moment(new Date(Number(date))).format("hh:mm A");
    },
  },
  computed: {
    hoverStyle() {
      if (!this.isHover) {
        return "";
      }
      return `border-color: ${
        this.droppingBlock.color
      }; background-color: ${hexToRgbA(this.droppingBlock.color, 0.25)}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.timeline-template-drop {
}
.timeline-template-item {
  display: flex;
  margin: 10px 0px;
  .timeline-image {
    width: 60px;
    height: 60px;
    border: dashed 1px #908f8f;
    border-radius: 50%;
    padding: 15px;
    margin-top: 15px;
    img {
      margin: auto;
      width: 100%;
      height: 100%;
    }
    .timeline-image-mask {
      position: absolute;
    }
  }
  .template-form {
    position: relative;
    border: dashed 1px #908f8f;
    flex-grow: 1;
    padding: 40px 30px;
    &.activity {
      padding: 80px 30px;
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
  &.dropping {
    .timeline-image {
      border-style: solid;
      img {
        display: none;
      }
    }
    .template-form {
      border-style: solid;
      span,
      button {
        opacity: 0;
      }
    }
  }
}
</style>