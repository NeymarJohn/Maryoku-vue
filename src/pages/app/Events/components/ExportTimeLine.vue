<template>
  <div class="md-layout timeline-section export-section" ref="content">
    <div class="event-page-header md-layout-item md-size-100 with-bg">
      <div class="header-main-actions">
        <img src="https://static-maryoku.s3.amazonaws.com/storage/maryoku+-+logo+dark%402x.png" width="150" />
      </div>
      <div class="header-actions">
        <ul class="d-flex align-center">
          <li>
            <md-button class="md-default md-small md-simple" @click="print">Print</md-button>
          </li>
          <li>
            <a href="javascript:void(0)" @click="download">
              <img :src="`${menuIconsURL}Asset 9.svg`" />
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="md-layout-item md-xlarge-size-90 md-large-size-90 md-small-size-90 time-line-section mx-auto">
      <div class="timeline-section-title"><img :src="`${newTimeLineIconsURL}timeline-title.svg`" />Timeline</div>

      <div class="timeline-items-list">
        <div class="timeline-items-list__item" v-for="(timelineItem, indx) in timeline" :key="indx">
          <div class="item-header">
            <div class="header-title">Day {{ numberToWord(indx + 1) }} {{ timelineItem.date }}</div>
          </div>

          <div
            v-for="(item, index) in timelineItem.items"
            :key="index"
            class="time-line-blocks_selected-items_item time-line-item"
          >
            <img class="time-line-blocks_icon" :src="`${newTimeLineIconsURL}${item.icon.toLowerCase()}-circle.svg`" />

            <md-card
              class="block-info"
              :style="`border : 1px dashed ` + item.color + `;background : none !important;    box-shadow: none;`"
            >
              <vue-element-loading :active.sync="item.isItemLoading" spinner="ring" color="#FF547C" />
              <md-card-content style="min-height: 80px">
                <div class="item-title-and-time">
                  <span class="item-time">{{ item.startTime }} - {{ item.endTime }}</span>
                  <span class="item-title" style="font-weight: 500; display: inline-block" v-if="item.title">{{
                    item.title
                  }}</span>
                  <p class="item-desc">{{ item.description }}</p>
                  <div class="location" style="display: none">
                    <md-icon>place</md-icon>1419 Westwood Blvd Los Angeles | CA 90024-4911
                  </div>
                  <div class="attachment" style="display: none">
                    <a href> <md-icon>attachment</md-icon>file name </a>
                  </div>
                  <md-button class="md-simple timeline-action">
                    <img :src="`${timelineIconsURL}Asset 48.svg`" width="20" /> Go To Proposal
                  </md-button>
                  <br />
                  <md-button class="md-simple timeline-action">
                    <img :src="`${timelineIconsURL}Asset 47.svg`" width="20" /> Contact Vendor
                  </md-button>
                </div>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import EventComponent from "@/models/EventComponent";
import EventTimelineItem from "@/models/EventTimelineItem";
import moment from "moment";
import swal from "sweetalert2";
import { SlideYDownTransition } from "vue2-transitions";
import InputMask from "vue-input-mask";

import VueElementLoading from "vue-element-loading";
// import auth from '@/auth';
import EventBlocks from "../components/NewEventBlocks";
import draggable from "vuedraggable";
import { Drag, Drop } from "vue-drag-drop";
import _ from "underscore";

import SideBar from "../../../../components/SidebarPlugin/NewSideBar";
import SidebarItem from "../../../../components/SidebarPlugin/NewSidebarItem.vue";
import ProgressSidebar from "./progressSidebar";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  name: "export-time-line",
  components: {
    VueElementLoading,
    EventBlocks,
    draggable,
    Drag,
    Drop,
    SlideYDownTransition,
    InputMask,
    SideBar,
    SidebarItem,
    ProgressSidebar,
  },
  props: {
    // event: Object,
    // eventComponents: [Array, Function]
  },
  data: () => ({
    // auth: auth,
    isLoading: true,
    timelineItems: [],
    hoursArray: [],
    disabledDragging: false,
    timelineAttachment: null,
    timelineIconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/timeline/svg/",
    menuIconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/menu%20_%20checklist/SVG/",
    event: {},
    newTimeLineIconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/Timeline-New/",
    timeline: [
      {
        date: "20/04/2020",
        items: [],
        itemDay: null,
      },
    ],
    a: [
      "",
      "one ",
      "two ",
      "three ",
      "four ",
      "five ",
      "six ",
      "seven ",
      "eight ",
      "nine ",
      "ten ",
      "eleven ",
      "twelve ",
      "thirteen ",
      "fourteen ",
      "fifteen ",
      "sixteen ",
      "seventeen ",
      "eighteen ",
      "nineteen ",
    ],
    b: ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
  }),
  methods: {
    download() {
      const doc = new jsPDF();
      /** WITH CSS */
      var canvasElement = document.createElement("canvas");
      canvasElement.height = 500;
      canvasElement.width = 1000;

      html2canvas(this.$refs.content, { canvas: canvasElement }).then(function (canvas) {
        const img = canvas.toDataURL("image/jpeg", 0.8);
        doc.addImage(img, "JPEG", 1, 1);
        doc.save("sample.pdf");
      });
    },
    print() {
      window.print();
    },
    getTimelineItems() {
      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId });
      let event = new CalendarEvent({ id: this.event.id });

      new EventTimelineItem()
        .for(calendar, event)
        .get()
        .then((res) => {
          this.timelineItems = _.sortBy(res, function (item) {
            return item.order;
          });

          this.timeline[0].items = _.sortBy(res, function (item) {
            return item.order;
          });
          this.isLoading = false;
          this.timelineItems.forEach((item) => {
            item.isItemLoading = false;
          });

          this.timeline[0].items.forEach((item) => {
            item.isItemLoading = false;
          });
          this.event.timelineItems = this.timelineItems;
          this.$root.$emit("timeline-updated", this.timelineItems);
        });
    },
    formatDate(date) {
      return moment(date).format("MM/DD/YY");
    },
    numberToWord(num) {
      let vm = this;

      if ((num = num.toString()).length > 9) return "overflow";
      let n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return;
      var str = "";
      str += n[1] != 0 ? (vm.a[Number(n[1])] || vm.b[n[1][0]] + " " + vm.a[n[1][1]]) + "crore " : "";
      str += n[2] != 0 ? (vm.a[Number(n[2])] || vm.b[n[2][0]] + " " + vm.a[n[2][1]]) + "lakh " : "";
      str += n[3] != 0 ? (vm.a[Number(n[3])] || vm.b[n[3][0]] + " " + vm.a[n[3][1]]) + "thousand " : "";
      str += n[4] != 0 ? (vm.a[Number(n[4])] || vm.b[n[4][0]] + " " + vm.a[n[4][1]]) + "hundred " : "";
      str += n[5] != 0 ? (str != "" ? "and " : "") + (vm.a[Number(n[5])] || vm.b[n[5][0]] + " " + vm.a[n[5][1]]) : "";
      return str;
    },
  },
  created() {
    [...Array(12).keys()].map((x) => (x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined));
    [...Array(12).keys()].map((x) => (x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`)));
    [...Array(8).keys()].map((x) => (x === 0 ? this.hoursArray.push(`12:00 AM`) : this.hoursArray.push(`${x}:00 AM`)));

    this.hoursArray.push();

    this.$auth.currentUser(
      this,
      true,
      function () {
        let _calendar = new Calendar({ id: this.$auth.user.defaultCalendarId });

        _calendar
          .calendarEvents()
          .find(this.$route.params.id)
          .then((event) => {
            this.event = event;

            this.timeline[0].date = this.formatDate(this.event.eventStartMillis);
            this.timeline[0].itemDay = this.event.eventStartMillis;

            this.getTimelineItems();

            new EventComponent()
              .for(_calendar, event)
              .get()
              .then((components) => {
                this.event.components = components;
                this.selectedComponents = components;
              });
          });
      }.bind(this),
    );
  },
  mounted() {
    this.isLoading = true;
    // if (this.event && this.event.id){
    //     this.$root.$emit("set-title",this.event, this.routeName === 'EditBuildingBlocks',true);
    //     this.getTimelineItems();
    // }
  },
  watch: {
    event(newVal, oldVal) {
      this.$root.$emit("set-title", this.event, this.routeName === "EditBuildingBlocks", true);
      this.getTimelineItems();
    },
  },
};
</script>
<style lang="scss">
</style>
