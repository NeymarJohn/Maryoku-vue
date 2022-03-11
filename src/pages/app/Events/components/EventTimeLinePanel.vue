<template>
  <div class="md-layout" style="max-height: 100vh">
    <div class="md-layout-item md-size-5" style="padding: 0; margin: 0">
      <h4 class="md-title">
        <md-button class="md-button md-theme-default md-simple md-just-icon" @click="closePanel">
          <md-icon>arrow_back</md-icon>
        </md-button>
      </h4>
    </div>
    <div class="md-layout-item md-size-95" style="max-height: 90vh">
      <h4 class="md-title" style="margin-bottom: 0; line-height: 51px">
        Timeline
      </h4>

      <div class="md-layout" style="overflow: auto; max-height: 90vh; margin-top: 24px">
        <div class="md-layout-item mx-auto">
          <event-time-line :event.sync="event" />
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
import Swal from "sweetalert2";
import { SlideYDownTransition } from "vue2-transitions";
import InputMask from "vue-input-mask";

import VueElementLoading from "vue-element-loading";
// import auth from '@/auth';
import EventTimeLine from "./EventTimeLine";
import draggable from "vuedraggable";
import { Drag, Drop } from "vue-drag-drop";
import _ from "underscore";

export default {
  name: "EventTimeLinePanel",
  components: {
    VueElementLoading,
    EventTimeLine,
    SlideYDownTransition,
    InputMask,
  },
  props: {
    event: Object,
  },
  data: () => ({
    // auth: auth,
    isLoading: true,
  }),
  watch: {},
  created() {},
  mounted() {},
  methods: {
    closePanel() {
      this.$emit("closePanel");
    },
  },
};
</script>
<style lang="scss">
</style>
