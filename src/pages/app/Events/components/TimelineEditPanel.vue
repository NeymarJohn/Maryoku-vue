<template>
  <div class="timeline-items-list">
    <div class="timeline-items-list__item" v-for="(scheduleDate, dateIndex) in timelineDates" :key="scheduleDate.date">
      <div class="item-header mb-20">
        <div class="header-title font-size-14 color-gray text-transform-capitalize">
          <div class="time-line-edit d-flex justify-content-center align-center">
            <label style="white-space: nowrap; padding-right: 10px">Day {{ numberToWord(dateIndex + 1) }}</label>
            <div>{{ scheduleDate.date }}</div>
            <md-datepicker
              :md-disabled-dates="getDisabledDates(dateIndex)"
              :md-closed="closeEditTimeline(dateIndex)"
              md-immediately
            ></md-datepicker>
          </div>
        </div>
        <div class="header-actions">
          <md-button
            class="md-default md-icon-button md-simple md-just-icon md-wrapper edit-btn"
            style="font-size: 26px !important"
            @click="addNewDateAfterCurrent(scheduleDate.date)"
          >
            <md-icon>add_circle</md-icon>
          </md-button>
          <md-button
            class="md-default md-simple md-just-icon md-wrapper edit-btn"
            style="font-size: 26px !important"
            @click="askRemoveTimelineItem(scheduleDate.date)"
          >
            <md-icon>delete_outline</md-icon>
          </md-button>
        </div>
      </div>

      <div
        v-for="(template, templateIndex) in scheduleDate.templates"
        :key="`${template.name}-${templateIndex}`"
        class="timeline-group-wrapper time-line-item"
      >
        <timeline-empty :index="templateIndex" :date="scheduleDate" v-if="templateIndex == 0"></timeline-empty>
        <timeline-template-container
          :template="template"
          :groupIndex="templateIndex"
          :timelineDate="{ dateIndex: dateIndex, ...scheduleDate }"
        ></timeline-template-container>
        <timeline-empty
          :index="templateIndex"
          :date="scheduleDate"
          @addSlot="addSlot(dateIndex, templateIndex + 1, ...arguments)"
        ></timeline-empty>
      </div>
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
    console.log(numberToWord);
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
  methods: {
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
    closeEditTimeline(index) {},
    addNewDateAfterCurrent(scheduleDate) {
      const currentDate = new moment(scheduleDate, "DD/MM/YY");
      const newData = moment(currentDate).add(1, "d");
      if (this.timelineItems[newData.format("DD/MM/YY")]) {
        swal({
          title: `Sorry you have timelins on ${newData.format("DD/MM/YY")}`,
          showCancelButton: false,
          confirmButtonClass: "md-button md-success",
          confirmButtonText: "Ok",
          buttonsStyling: false,
        })
          .then((result) => {
            if (result.value === true) {
              return;
            }
          })
          .catch((err) => {
            return;
          });
      } else {
        this.$set(this.timelineItems, newData.format("DD/MM/YY"), []);
        this.timelineDates.push(newData.format("DD/MM/YY"));
      }
    },
    askRemoveTimelineItem(scheduleDate) {
      this.deletingDate = scheduleDate;
      this.showDeleteConfirmModal = true;
    },
    handleDrop(index, data) {
      return;
      if (!this.canEdit) {
        swal({
          title: "Sorry, you can't edit timeline. ",
          showCancelButton: false,
          confirmButtonClass: "md-button md-success",
          confirmButtonText: "Ok, I got it",
          buttonsStyling: false,
        })
          .then((result) => {
            if (result.value === true) {
              return;
            }
          })
          .catch((err) => {});
        return;
      }
      if (data) {
        let block = Object.assign({}, data.block);
        block.id = new Date().getTime(); //add temp id
        block.mode = "edit";

        let startDate = new Date(this.timeline[index].itemDay);
        let endDate = new Date(this.timeline[index].itemDay);
        const timelineItemsCount = this.timeline[index].items.length;
        if (timelineItemsCount == 0) {
          if (this.eventData.eventDayPart == "evening") {
            startDate.setHours(19);
            endDate.setHours(20);
          } else {
            startDate.setHours(8);
            endDate.setHours(9);
          }
        } else {
          const prevItem = this.timeline[index].items[timelineItemsCount - 1];
          startDate.setHours(new Date(prevItem.endTime).getHours());
          endDate.setHours(new Date(prevItem.endTime).getHours() + 1);
        }

        block.startTime = startDate;
        block.endTime = endDate;

        block.title = block.buildingBlockType;
        block.startDuration = "am";
        block.endDuration = "am";
        block.attachmentName = "";
        block.isItemLoading = false;
        this.timeline[index].items.push(Object.assign({}, block));
        this.disabledDragging = true;
      } else {
        setTimeout(this.updateTimelineITemsOrder, 100);
      }
      setTimeout(() => {
        const scrollBtn = this.$refs.scrollBtn;
        if (scrollBtn) {
          scrollBtn.click();
        }
      }, 100);
    },
    addSlot(dateIndex, templateIndex, slotData) {
      console.log("dataeImdex0", dateIndex);
      console.log("template", templateIndex);
      const newTimelineItem = this.gettingSlotData(slotData, this.timelineDates[dateIndex].date);
      newTimelineItem.groupNumber = templateIndex;
      this.timelineDates[dateIndex].timelineItems.push(newTimelineItem);
      this.timelineDates[dateIndex].templates.splice(templateIndex, 0, { name: "test", type: "slot" });
    },

    gettingSlotData(data, scheduleDate) {
      let block = Object.assign({}, data.block);
      block.id = new Date().getTime(); //add temp id
      block.mode = "edit";

      let startDate = new Date(scheduleDate);
      let endDate = new Date(scheduleDate);
      // const timelineItemsCount = this.timeline[index].items.length;
      // if (timelineItemsCount == 0) {
      //   if (this.eventData.eventDayPart == "evening") {
      //     startDate.setHours(19);
      //     endDate.setHours(20);
      //   } else {
      //     startDate.setHours(8);
      //     endDate.setHours(9);
      //   }
      // } else {
      //   const prevItem = this.timeline[index].items[timelineItemsCount - 1];
      //   startDate.setHours(new Date(prevItem.endTime).getHours());
      //   endDate.setHours(new Date(prevItem.endTime).getHours() + 1);
      // }

      block.startTime = startDate;
      block.endTime = endDate;

      block.title = block.buildingBlockType;
      block.startDuration = "am";
      block.endDuration = "am";
      block.attachmentName = "";
      block.isItemLoading = false;
      return block;
    },
  },
};
</script>
<style lang="scss" scoped>
.timeline-items-list {
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
        transform: translateX(-50%);
        top: -6px;
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