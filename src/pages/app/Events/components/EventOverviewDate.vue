<template>
  <div class="card-section align-center">
    <input type="hidden" :value="month">
    <input type="hidden" :value="year">
    <div class="left">
      <img class="mr-30" :src="section.img_src" />
      <div class="mr-30" style="width: 30%">
        <h3 class="title">{{ section.title }}</h3>

        <p class="content" v-if="section.started_at && section.started_at !== section.ended_at">
          {{ section.started_at | formatDate }} ~ {{ section.ended_at | formatDate }}
        </p>
        <p class="content" v-if="section.started_at && section.started_at === section.ended_at">
          {{ section.started_at | formatDate }}
        </p>

        <div v-if="isEdit && section.warning" class="warning">
          <img class="mr-10" :src="`${iconsUrl}Group 1175 (9).svg`" width="20" />
          {{ section.warning }}
        </div>
      </div>

      <div v-if="isEdit && section.hasOwnProperty('started_at') && section.hasOwnProperty('ended_at')" class="value">
        <div class="picker-panel">
          <functional-calendar
            ref="Calendar"
            :is-date-range="true"
            :change-month-function="true"
            :change-year-function="true"
            :markedDateRange="markedDates"
            @dayClicked="changeDate($event)"
            @changedMonth="changeMonth($event)"
            @changedYear="changeYear($event)"
            :date-format="'yyyy-mm-dd'"
            v-model="dateData"
          ></functional-calendar>

          <md-checkbox v-model="section.more_one_day" value="more_one_day"> More than one day event </md-checkbox>
        </div>
      </div>


    </div>
    <div class="right">
      <md-button class="md-simple" @click="isEdit = !isEdit">
        <md-icon style="font-size: 40px !important">
          {{ isEdit ? "keyboard_arrow_down" : "keyboard_arrow_right" }}
        </md-icon>
      </md-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import RequirementItemComment from "./RequirementItemComment";
import Multiselect from "vue-multiselect";
import HeaderActions from "@/components/HeaderActions";
import { MaryokuInput, LocationInput, HolidayInput } from "@/components";
import { FunctionalCalendar } from "vue-functional-calendar";
import moment from "moment";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import CategorySelector from "@/components/Inputs/CategorySelector";
import swal from "sweetalert2";
import { extendMoment } from "moment-range";
import { timelineTempates } from "@/constants/event.js";

export default {
  name: "event-overview-date",
  components: {
    FunctionalCalendar,
  },
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      iconsUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewLandingPage/",
      additional: true,
      markedDates: {},
      dateData: {
        currentDate: null,
        dateRange: {
          start: {
            date: '',
            // date: null,
            dateTime: false,
            hour: "00",
            mintue: "00",
          },
          end: {
            date: '',
            // date: null,
            dateTime: false,
            hour: "00",
            mintue: "00",
          },
        },
        selectedDate: null,
        selectedDatesItem: "",
        selectedHour: "00",
        selectedMinute: "00",
        selectedDates: [],
      },
      dateRange: {},
      started_at: null,
      dateClick: false,
      day: null,
      ended_at: null,
      month: moment(Date.now()).month(),
      year: moment(Date.now()).year(),
    };
  },
  methods: {
    changeMonth(e){
        // console.log('markedDates', this.markedDates)
        this.month = moment(e).month();
        this.year = moment(e).year();
    },
      changeYear(e){
          this.year = moment(e).year();
          this.month = moment(e).month();
      },
    changeDate(e) {
      console.log("changeDate", e, this.dateData);
      this.dateClick = !this.dateClick;

      if (this.dateClick) {
        this.started_at = e.date;
        this.day = e.day;
        this.$forceUpdate();
      }

      if (!this.dateClick) {
        this.ended_at = e.date;
        if (this.day > e.day) {
            this.ended_at = this.started_at;
            this.started_at = e.date;
        }
        const extendedMoment = extendMoment(moment);
        const start = new Date(this.started_at);
        const end = new Date(this.ended_at);
        const range = extendedMoment.range(moment(start), moment(end));

        const dateList = Array.from(range.by("day")).map((m) => m.format("YYYY-MM-DD"));
        const currentTimelineDates = this.section.timelineDates;
        const newTimelineDates = currentTimelineDates.map((item, index) => {
          if (dateList[index]) item.date = dateList[index];
          return item;
        });
        this.markedDates = {};
        this.$emit("change", {
          dateData: {
            started_at: this.started_at,
            ended_at: this.ended_at,
          },
          timeline: {
            dateList: dateList,
            mode: "template", // default
            status: "editing",
          },
          timelineDates: newTimelineDates,
        });
      }
    },
    init: async function () {
        if (this.section.started_at && this.section.ended_at) {
          this.markedDates = {
            start: moment(this.section.started_at).format("YYYY-MM-DD"),
            end: moment(this.section.ended_at).format("YYYY-MM-DD"),
          };
        }
    },
    resetCalendar(){
        $(".vfc-day").each(function (index, day) {
            $(day).find("div.vfc-base-start").remove();
            $(day).find("div.vfc-base-end").remove();
            $(day).find("span.vfc-span-day").removeClass('vfc-marked vfc-start-marked vfc-end-marked');
        })
    },
    renderCalendar() {
      let started_date = moment(this.section.started_at).date();
      let ended_date = moment(this.section.ended_at).date();

      console.log('renderCalendar', this.month)
      $(".vfc-day").each(function (index, day) {
        let el = $(day).find("span.vfc-span-day");

        // don't check the same day of next month
        if($(day).find("span.vfc-span-day").hasClass('vfc-hide')) return;

        if (el.text() <= ended_date && el.text() >= started_date) {
          el.addClass("vfc-marked");
        } else {
          el.removeClass("vfc-marked");
          el.removeClass("vfc-start-marked");
          el.removeClass("vfc-end-marked");
          $(day).find("div.vfc-base-start").remove();
          $(day).find("div.vfc-base-end").remove();
        }

        if (started_date === ended_date) {
          el.addClass("vfc-end-marked");
        } else if (el.text() == started_date) {
          el.addClass("vfc-start-marked");
          if (!$(day).find("div.vfc-base-start").length) $(day).prepend("<div class='vfc-base-start'></div>");
        } else if (el.text() == ended_date) {
          if (el.text() == started_date) {
            el.addClass("vfc-start-marked");
            if (!$(day).find("div.vfc-base-start").length) $(day).prepend("<div class='vfc-base-start'></div>");
          } else if (el.text() == ended_date) {
            el.addClass("vfc-end-marked");
            if (!$(day).find("div.vfc-base-end").length) $(day).prepend("<div class='vfc-base-end'></div>");
          } else {
            el.removeClass("vfc-start-marked");
            el.removeClass("vfc-end-marked");
            $(day).find("div.vfc-base-start").remove();
            $(day).find("div.vfc-base-end").remove();
          }
        }
      });
    },
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format("MMMM DD, YYYY");
    },
  },
  mounted() {
    this.init();
  },
  updated() {
    let year = moment(this.section.started_at).year();
    let month = moment(this.section.started_at).month();

    if (this.year === year && this.month === month) {
        this.renderCalendar();
    } else {
        this.resetCalendar();
    }

  },
  watch: {
    section: {
      handler(newVal) {
        this.markedDates = {};
        if (newVal) this.init();
      },
      deep: true,
    },
  },
};
</script>
