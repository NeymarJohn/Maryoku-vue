<template>
  <div class="md-layout" style="max-height: 100vh;">
    <vue-element-loading :active="working" spinner="ring" color="#FF547C" />
    <div class="md-layout-item md-size-5" style="padding: 0; margin: 0;">
      <h4 class="md-title">
        <md-button class="md-button md-theme-default md-simple md-just-icon" @click="closePanel">
          <md-icon>arrow_back</md-icon>
        </md-button>
      </h4>
    </div>
    <div class="md-layout-item md-size-95" style="max-height: 90vh; ">
      <h4 class="md-title" style="margin-bottom: 0; line-height: 51px;">
        Manage Interactions
      </h4>

      <div class="md-layout" style="overflow: auto; max-height: 90vh; margin-top: 24px;">
        <div class="md-layout-item mx-auto">
          <interactions-list :event-data.sync="eventData" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import VueElementLoading from "vue-element-loading";
import EventInteraction from "@/models/EventInteraction";

import InteractionsList from "./InteractionsList";

export default {
  name: "InterctionsPanel",
  components: {
    VueElementLoading,
    InteractionsList
  },
  props: {
    eventData: Object
  },
  data: () => ({

    working: true
  }),
  computed: {},
  watch: {
  },
  created () {
  },
  mounted () {
    this.working = false;
  },
  methods: {
    closePanel () {
      this.$emit("closePanel");
    }
  }
};
</script>
