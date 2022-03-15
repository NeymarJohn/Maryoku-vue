<template>
  <start-modal container-class="event-icons-modal bg-white">
    <template slot="header">
      <div class="md-layout">
        <div class="md-layout-item pl-0 md-size-90">
          <div style="">
            <h1 class="title">
              Select an icon
            </h1>
            <span class="subtitle">Icons are made to visually identify the events, only you see them.</span>
          </div>
        </div>
        <div class="md-layout-item pl-0 md-size-10">
          <div>
            <md-button
              class=" md-simple text-decoration-none cursor-pointer "
              style="margin-top: -20px;
"
              @click="close()"
            >
              <md-icon>close</md-icon>
            </md-button>
          </div>
        </div>
      </div>
    </template>
    <template slot="body">
      <div>
        <div class="md-layout">
          <div v-for="(item, index) in icons" :key="index" class="event-logo" :class="{selected: selectedIcon === index}" @click="selectIcon(index)">
            <div v-if="selectedIcon === index" class="choose-item" />
            <img
              :src="`${$iconURL}CalendarIcons/${icons[index]}`"
              style="  width: 27.1px;
              height: 31.1px;
              object-fit: contain;
             "
            >
          </div>
        </div>
        <div class="d-flex justify-content-end mt-50 mr-20">
          <md-button class=" md-simple  text-decoration-none  " @click="cancel()">
            <span style="color: black">Cancel</span>
          </md-button>
          <md-button class="md-vendor add-category-btn md-bold pa-20" :disabled="selectedIcon === null" @click="saveIcon()">
            Select Icon
          </md-button>
        </div>
      </div>
    </template>
    <template slot="footer" />
  </start-modal>
</template>

<script>
import StartModal from "@/components/StartModal.vue";
import {eventIcons} from "@/constants/event";

export default {
  components: {
    StartModal,
  },
  props: {
    eventId: {
      type: String,
      default: ""
    },
    events: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    selectedIcon: null,
    icons: eventIcons,
  }),
  mounted() {
    this.selectedIcon = null;
  },

  methods: {
    close() {
      this.$emit("cancel");
    },

    saveIcon() {
      this.$emit("iconSelected", {iconId: this.selectedIcon, eventId: this.eventId});
      this.close();
    },

    cancel() {
      this.selectedIcon = null;
    },

    selectIcon(item) {
      this.selectedIcon = item;
    },
  },
};
</script>


<style scoped>
.selected {
  position: relative;
  border:1px solid #641856;
  border-radius: 50%;
  width: 41px !important;
  height: 41px !important;


}
.choose-item {
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  top: 0px;
  right: 2px;
  background-color: #f51355;
}

.event-logo {
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  width: 41px !important;
  height: 41px !important;
  min-width: 41px;
  border-radius: 50%;
  cursor: pointer;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 14px;
}
.event-logo1 {
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  width: 41px !important;
  height: 41px !important;
  min-width: 41px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 7px;
}

.title {
  width: 205px;
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #050505;
}

.subtitle {
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #050505;
}

h2 {
  font-size: 16px;
  margin: 0px 5px;
}
</style>
