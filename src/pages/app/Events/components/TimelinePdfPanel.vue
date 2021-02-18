<template>
  <div class="timeline-items-list">
    <div class="timeline-items-header">
      <img src="/static/icons/timeline-title.png" /><span class="font-size-24">Timeline</span>
    </div>
    <div class="timeline-items-list__item" v-for="(scheduleDate, dateIndex) in timelineDates" :key="scheduleDate.date">
      <div class="item-header mb-20">
        <div class="header-line"></div>
        <div class="time-line-edit d-flex justify-content-center align-center">
          <label style="white-space: nowrap; padding-right: 10px">Day {{ numberToWord(dateIndex + 1) }}</label>
          <div>
            {{ $dateUtil.formatScheduleDay(scheduleDate.date, "MM/DD/YY") }}
          </div>
        </div>
        <div class="header-line"></div>
      </div>
      <timeline-item
        v-for="(timelineItem, index) in scheduleDate.timelineItems"
        :key="`timelineItem-${index}`"
        :item="timelineItem"
        :index="index"
        :timelineDate="scheduleDate"
        class="mt-10 mb-10 timeline-group-wrapper"
        @remove="removeItem"
        :editMode="false"
        cardStyle="outlined"
      ></timeline-item>
    </div>
  </div>
</template>
<script>
import { numberToWord } from "@/utils/helperFunction";
import { Drag, Drop } from "vue-drag-drop";
import TimelineTemplateItem from "./TimelineTemplateItem";
import TimelineItem from "./TimelineItem";
import TimelineEmpty from "./TimelineEmpty";
import TimelineTemplateContainer from "./TimelineTemplateContainer";
import TimelineGapModal from "../Modals/TimelineGapModal";
import EventTimelineDate from "@/models/EventTimelineDate";
import CalendarEvent from "@/models/CalendarEvent";
import moment from "moment";
import { timelineTempates } from "@/constants/event.js";
export default {
  name: "event-details-timeline",
  components: {
    Drop,
    TimelineTemplateItem,
    TimelineItem,
    TimelineEmpty,
    TimelineGapModal,
    TimelineTemplateContainer,
  },
  created() {
    this.$store.dispatch("event/getTimelineDates", this.event.id);
  },
  computed: {
    event() {
      return this.$store.state.event.eventData;
    },
    timelineDates() {
      if (this.event) {
        return this.event.timelineDates;
      }
      return [];
    },
  },
  data() {
    return {
      showDeleteConfirmModal: false,
    };
  },
  methods: {
    formatDate() {},
    numberToWord(num) {
      return numberToWord(num);
    },
    getDisabledDates(index) {
      const vm = this;
      const checkDate = function (date) {
        if (index == 0) {
          return false;
        }
        if (!vm.timeline[index + 1]) return date.getTime() <= new Date(this.timelineDates[index - 1]).getTime();
        return (
          date.getTime() <= new Date(this.timelineDates[index - 1]).getTime() ||
          date.getTime() >= new Date(this.timelineDates[index + 1]).getTime()
        );
      };
      return checkDate;
    },
    removeItem() {},
    removeTimelineItem() {
      const deletingDateIndedx = this.timelineDates.indexOf(this.deletingDate);
      this.timelineDates.splice(deletingDateIndedx, 1);
      this.showDeleteConfirmModal = false;
    },
    removeTemplate(dateIndex, templateIndex, template) {
      this.timelineDates[dateIndex].templates.splice(templateIndex, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.timeline-items-list {
  width: 700px;
  margin: 50px;
  .timeline-items-header {
    img {
      margin-right: 20px;
    }
    display: flex;
    align-items: center;
  }
  .timeline-group-wrapper {
    position: relative;
    &:not(:last-child)::before {
      content: "";
      position: absolute;
      border-left: dashed 1px #908f8f;
      height: 100%;
      top: 75px;
      left: 30px;
    }
  }
  margin-top: 1em;
  height: 100%;
  &__item {
    padding-bottom: 1em;
    .item-header {
      position: relative;
      text-align: center;
      min-height: 30px;
      display: flex;
      align-items: center;
      .header-line {
        position: relative;
        flex: 1;
        &:before {
          content: " ";
          position: absolute;
          border: 0.5px solid #a0a0a0;
          left: 0px;
          width: 100%;
        }
      }
    }
    .time-line-edit {
      max-width: 180px;
      margin: auto;
      font-size: 16px;
      font-family: "Manrope-ExtraBold";
      padding: 10px;
      color: #a0a0a0;
    }
  }
}
</style>