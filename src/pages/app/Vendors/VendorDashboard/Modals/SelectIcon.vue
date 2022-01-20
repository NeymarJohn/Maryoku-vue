<template>
  <start-modal container-class=" bg-white">
    <template slot="header">
      <div class="d-flex justify-content-betweeen">
        <div>
          <h1 class="title">
            Select an icon
          </h1>
          <span class="subtitle">Icons are made to visually identify the events, only you see them.</span>
        </div>

        <div
          style="margin-top: -25px ;
"
        >
          <md-button class=" md-simple text-decoration-none cursor-pointer " @click="close()"
            ><md-icon>close</md-icon></md-button
          >
        </div>
      </div>
    </template>
    <template slot="body">
      <div>
        <div
          class="md-layout 
            "
        >
          <div class="event-logo" v-for="(item, index) in icons" :key="index" @click="select = false">
            <img
              :src="`${$iconURL}CalendarIcons/${item}`"
              style="  width: 27.1px;
             height: 31.1px;
             object-fit: contain;
             "
            />
          </div>
        </div>
        <div class="d-flex justify-content-end my-10">
          <md-button class=" md-simple  text-decoration-none  ">
            <span style="color: black" @click="select = true">Cancel</span>
          </md-button>
          <md-button class="md-vendor add-category-btn md-bold pa-20" :disabled="select">Select Icon</md-button>
        </div>

        <div style="margin: 0px -40px">
          <hr />
        </div>
      </div>
      <div class="pl-10 py-3">
        <span>In use:</span>
      </div>
      <div>
        <div class="d-flex  align-center" v-for="(event, index) in events" :key="event.id">
          <div class="event-logo">
            <img
              :src="`${$iconURL}CalendarIcons/${eventIcon(index)}`"
              style="  width: 27.1px;
                 height: 31.1px;
                 object-fit: contain;
                   "
            />
          </div>
          <h2>
            <span style="font-weight: bold">{{ event.customer.name }}</span>
          </h2>
          <h2>{{ event.startTime | formatDate }}</h2>
          |
          <h2>{{ event.companyName }}</h2>
          |
          <h2>${{ event.totalBudget }}</h2>
        </div>
      </div>
    </template>
    <template slot="footer"> </template>
  </start-modal>
</template>
<script>
import StartModal from "@/components/StartModal.vue";
import moment from "moment";

export default {
  props: {
    events: {
      type: Array,
      default: [],
    },
  },
  components: {
    StartModal,
  },
  data: () => ({
    select: true,
    icons: [
      "Group 20904.svg",
      "Group 20909.svg",
      "Group 20912.svg",
      "Group 20915.svg",
      "Group 20918.svg",
      "Group 20919.svg",
      "Group 20922.svg",
      "Group 20925.svg",
      "Group 20928.svg",
      "Group 20929.svg",
      "Group 20932.svg",
      "Group 20935.svg",
      "Group 20936.svg",
      "Group 20941.svg",
      "Group 20944.svg",
      "Group 20951.svg",
      "Group 20954.svg",
      "Group 20957.svg",
      "Page-1.svg",
      "Page-1_2.svg",
      "Page-1_3.svg",
      "Page-1_4.svg",
      "Page-1_5.svg",
      "Page-1_6.svg",
      "Page-1_7.svg",
      "Page-1_8.svg",
      "Page-1_9.svg",
      "Page-1_10.svg",
    ],
  }),

  methods: {
    eventIcon(idx) {
      return this.icons[Math.ceil(Math.random() * 10 * idx) % this.icons.length];
    },
    close() {
      this.$emit("cancel");
    },
  },
  filters: {
    formatDate: function(date) {
      return moment(date).format("DD-MM-YYYY");
    },
  },
};
</script>

<style scoped>
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
  margin: 8px 7px;
}

.title {
  width: 205px;

  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #050505;
}

.subtitle {
  width: 596px;

  font-size: 16px;
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
