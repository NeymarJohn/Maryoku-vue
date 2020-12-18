<template>
  <div class>
    <div class="container">
      <div class="title">
        <span class="step">1/5</span>
        <br />WHEN IS THE BIG DAY?
      </div>
      <div class="event-date event-basic-info">
        <div class="date-picker picker-panel">
          <div class="d-flex pl-10 justify-content-center">
            <img :src="`${$iconURL}Event Page/calendar-dark.svg`" width="21px" />
            <span class="date-string">{{ getFormattedDate }}</span>
          </div>
          <div>
            <functional-calendar
              :is-date-range="true"
              :change-month-function="true"
              :change-year-function="true"
              dateFormat="yyyy-mm-dd"
              v-model="dateData"
            ></functional-calendar>
          </div>
        </div>
      </div>
    </div>
    <wizard-status-bar :currentStep="1" @next="goToNext" @skip="skip" @back="back"></wizard-status-bar>
  </div>
</template>

<script>
import WizardStatusBar from "./componenets/WizardStatusBar";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import Vue from "vue";
import vSelect from "vue-select";
import { FunctionalCalendar } from "vue-functional-calendar";
import moment from "moment";
import { extendMoment } from "moment-range";

export default {
  components: {
    WizardStatusBar,
    FunctionalCalendar,
  },
  methods: {
    ...mapMutations("PublicEventPlanner", ["setEventProperty", "setCurrentStep"]),
    goToNext() {
      if (this.dateData.dateRange.start.date) {
        console.log(this.dateData);
        this.setEventProperty({
          key: "eventStartMillis",
          actualValue: new Date(this.dateData.dateRange.start.date).getTime(),
        });
        this.setEventProperty({
          key: "eventEndMillis",
          actualValue: new Date(this.dateData.dateRange.end.date).getTime(),
        });

        const extendedMoment = extendMoment(moment);
        const start = new Date(this.dateData.dateRange.start.date);
        const end = new Date(this.dateData.dateRange.end.date);
        const range = extendedMoment.range(moment(start), moment(end));

        const dateList = Array.from(range.by("day")).map((m) => m.format("YYYY-MM-DD"));
        const timelineDates = [];
        dateList.forEach((d) => {
          timelineDates.push({
            date: d,
            templates: ["registration", "activity", "meal", "activity", "summary"],
            status: "editing",
          });
        });
        this.setEventProperty({
          key: "timeline",
          actualValue: {
            dateList: dateList,
            mode: "template", // default
            status: "editing",
          },
        });
        this.setEventProperty({
          key: "timelineDates",
          actualValue: timelineDates,
        });
        this.setEventProperty({ key: "dateData", actualValue: this.dateData });
        this.$router.push({ path: `/event-wizard-flexibility` });
      }
    },
    skip() {
      this.$router.push({ path: `/event-wizard-flexibility` });
    },
    back() {
      this.$router.push({ path: `/create-event-wizard` });
    },
    validateDate() {
      return this.$refs.datePicker.$el.classList.contains("md-has-value");
    },
    validateAndSubmit() {
      // this.$emit('goToNextPage');
      //  return;
      let vm = this;

      this.cerrors = {};
      this.validating = true;

      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          // this.$parent.isLoading = true;

          if (this.eventId) {
            vm.updateEvent();
          } else {
            vm.createEvent();
          }
        } else {
          this.showNotify();
        }
      });

      if (!this.eventType) {
      } else {
        // this.$emit('goToNextPage');
      }
    },
    showNotify() {
      this.$notify({
        message: "Please, check all required fields",
        icon: "warning",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "danger",
      });
    },
  },
  data() {
    return {
      dateData: {
        currentDate: new Date(),
        dateRange: {
          start: { date: false, dateTime: false, hour: "00", mintue: "00" },
          end: { date: false, dateTime: false, hour: "00", mintue: "00" },
        },
        selectedDate: new Date(),
        selectedDatesItem: "",
        selectedHour: "00",
        selectedMinute: "00",
        selectedDates: [],
      },
    };
  },
  created() {
    if (this.publicEventData.dateData) {
      this.dateData = this.publicEventData.dateData;
    }
    // if (this.publicEventData.eventStartMillis) {
    //   this.dateData.selectedDate =  new Date(this.publicEventData.eventStartMillis)
    // }
  },
  computed: {
    ...mapState("PublicEventPlanner", ["publicEventData"]),
    getFormattedDate() {
      console.log("object");
      if (!this.dateData.selectedDate) return "";
      return moment(new Date(this.dateData.selectedDate)).format("dddd, MMM DD, YYYY");
    },
  },
  watch: {
    dateData(newValue, oldValue) {
      console.log(newValue);
    },
  },
};
</script>
<style lang="scss">
.event-date.event-basic-info {
  width: 450px;
  max-width: 100%;
  margin: 20px auto 0;
  padding: 0;
  min-height: 500px;
  position: relative;
  padding-top: 30px;
  .vfc-calendar .vfc-content {
    width: 330px;
    margin: auto;
  }
  .vfc-space-between {
    margin-top: 10px !important;
  }
  .vfc-separately-navigation-buttons div {
    // margin: 20px 50px !important;
  }
  .vfc-navigation-buttons div .vfc-arrow-left,
  .vfc-separately-navigation-buttons div .vfc-arrow-left {
    width: 11px !important;
    height: 11px !important;
    border-top: 3px solid !important;
    border-left: 3px solid !important;
    border-radius: 1px;
  }
  .vfc-navigation-buttons div .vfc-arrow-right,
  .vfc-separately-navigation-buttons div .vfc-arrow-right {
    width: 11px !important;
    height: 11px !important;
    border-top: 3px solid !important;
    border-right: 3px solid !important;
    border-radius: 1px;
  }
  .vfc-day .vfc-base-start,
  .vfc-base-end {
    background-color: #f51355 !important;
  }
  span.vfc-span-day {
    color: #43425d !important;
    width: 36px !important;
    line-height: 36px !important;
    &.vfc-today {
      color: #f51355 !important;
    }
  }
  span.vfc-span-day.vfc-marked,
  .vfc-today.vfc-marked {
    color: white !important;

    &:not(.vfc-start-marked):not(.vfc-end-marked):before {
      background-color: #f51355 !important;
    }
  }

  span.vfc-span-day.vfc-hide {
    color: white !important;
  }
  .picker-panel {
    display: block;
    position: relative;
    padding: 40px 10px 0px;
    border: solid 1px #bec0c2;
    border-radius: 3px;
    margin: auto;
    height: max-content;
  }
  .title {
    font-family: "Manrope-Bold";
    font-size: 40px;
    text-align: center;
    line-height: 1.2em;
    margin: 20px;
  }
  .date-string {
    padding-left: 10px;
  }
  .vfc-main-container {
    margin: auto;
  }
}
</style>
