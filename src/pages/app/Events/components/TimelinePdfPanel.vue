<template>
  <div class="timeline-items-list">
    <div class="timeline-items-list__item" v-for="(scheduleDate, dateIndex) in timelineDates" :key="scheduleDate.date">
      <div class="item-header mb-20">
        <div class="header-title font-size-14 color-gray text-transform-capitalize">
          <div class="time-line-edit d-flex justify-content-center align-center">
            <label style="white-space: nowrap; padding-right: 10px">Day {{ numberToWord(dateIndex + 1) }}</label>
            <div>
              {{ $dateUtil.formatScheduleDay(scheduleDate.date, "MM/DD/YY") }}
            </div>
          </div>
        </div>
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
  margin: 40px;
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
      &:before {
        content: " ";
        position: absolute;
        top: 16px;
        border: 0.5px solid #a0a0a0;
        left: 0px;
        width: 100%;
      }

      .header-title {
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        top: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        background-color: #f5f5f5;
      }
      .header-actions {
        position: absolute;
        right: -5px;
        top: 5px;
        background-color: #f5f5f5;
        padding-left: 10px;
        .md-button {
          margin: 0;
          width: auto;
          height: auto;
          min-width: auto;
          .md-ripple {
            padding: 0 !important;
            .md-icon {
              font-size: 22px !important;
            }
          }
        }
      }
    }
    .time-line-edit {
      max-width: 180px;
      margin: auto;
      background: #f5f5f5;
      font-size: 16px;
      font-family: "Manrope-ExtraBold";
      .md-input {
        font-size: 14px;
        padding: 0;
        padding-left: 10px;
        margin: 0;
        font-weight: 800;
        -webkit-text-fill-color: #a0a0a0 !important;
        color: #a0a0a0 !important;
        border: none;
      }
      .md-icon,
      .md-icon-button {
        display: none;
      }
      .md-datepicker {
        margin-left: -180px !important;
        opacity: 0;
        &:before,
        &:after {
          width: calc(100% - 0px);
          margin-left: 0;
          display: none;
        }
      }
      .md-field {
        margin: 0px;
        padding: 0;
      }
    }
  }
}
</style>