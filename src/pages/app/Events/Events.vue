<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
    <div class="md-layout-item md-size-25">

    </div>
    <div class="md-layout-item md-size-75 block-flex">
      <div class="md-layout-item md-size-75"></div>
      <div class="md-layout-item md-size-25">
        <md-button class="button-event-creatig" @click="openEventModal()">Create New Event</md-button>
      </div>
    </div>
    
    <event-modal @refresh-events="refreshEvents" ref="eventModal"></event-modal>
  </div>
</template>

<script>
//MAIN MODULES
import ChartComponent from "@/components/Cards/ChartComponent";
import auth from "@/auth";
import moment from "moment";
import VueElementLoading from "vue-element-loading";
import { mapMutations } from "vuex";
import EventPlannerVuexModule from "./EventPlanner.vuex";

//COMPONENTS
import { AnimatedNumber } from "@/components";
import Icon from "@/components/Icon/Icon.vue";
import EventModal from "./EventModal/";

export default {
  components: {
    VueElementLoading,
    ChartComponent,
    AnimatedNumber,
    Icon,
    EventModal
  },

  data() {
    return {
      auth: auth,
      product3: "static/img/shutterstock_289440710.png",
      recentEvents: [],
      upcomingEvents: [],
      isLoading: false,
      footerLink: [
        { title: "HOME" },
        { title: "COMPANY" },
        { title: "PORTFOLIO" },
        { title: "BLOG" }
      ]
    };
  },
  created() {
    this.$store.registerModule("EventPlannerVuex", EventPlannerVuexModule);
  },
  computed: {
    pieChart() {
      return {
        data: {
          labels: [" ", " "], // should be empty to remove text from chart
          series: ["100", "70"]
        },
        options: {
          padding: 0,
          height: 120,
          donut: true,
          donutWidth: 12
        }
      };
    }
  },
  methods: {
    ...mapMutations("EventPlannerVuex", [
      "setEventModal",
      "setEditMode",
      "setModalSubmitTitle",
      "setEventModalAndEventData",
      "setNumberOfParticipants"
    ]),
    openEventModal() {
      this.setEventModal({ showModal: true });
      this.setModalSubmitTitle("Save");
      this.setEditMode({ editMode: false });
    },
  }
};
</script>

<style lang="scss">
.percentage {
  padding-bottom: 8px;
  padding-left: 5px;
  grid-column: 1;
  grid-row: 1;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(33, 201, 152, 0.8);
}
.logo-block {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 15px;
  margin: -20px 0px 20px 0px;
  .event-planer-logo {
    background: #eb3e79;
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    .company-logo {
      color: white !important;
    }
  }
  .event-title {
    font-family: "Roboto";
    font-size: 18px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
}
.control-main-block {
  display: flex;
  justify-content: center;
  .company-logo-block {
    border: 2px solid #8b8b8b;
    padding: 7px;
    border-radius: 50%;
    margin: 0px 5px;
  }
}
.title-text {
  font-family: "Roboto";
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: normal;
  text-align: left;
  color: #959595;
}
.title-budget-main {
  font-family: "Roboto";
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
}
.title-budget-prise {
  color: rgba(33, 200, 152, 0.8) !important;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
}
.block-flex {
  display: flex;
}
.footer-link-button .md-ripple {
  color: #89229b;
  background-color: rgba(240, 240, 240, 1);
}
.copyright {
  color: #9c27b0;
}
.copyright-block {
  justify-content: space-between;
}
</style>
