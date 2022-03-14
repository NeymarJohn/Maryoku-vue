<template>
  <div class="upcoming-event-list">
    <div v-for="event in events" :key="event.id" class="upcoming-event">
      <div class="event-logo" @click="show(event.id)">
        <img
          :src="`${$iconURL}CalendarIcons/${event.icon}`"
          style="  width: 27.1px;
             height: 31.1px;
             object-fit: contain;
             "
        >
      </div>

      <div class="event-detail flex-1">
        <div class="color-gray font-size-14">
          {{ getUpcomingPeriod(event.startTime) }}
        </div>
        <div v-if="event.customer" class="font-bold mb-10">
          {{ event.customer.name }} | {{ event.customer.email }}
        </div>
        <div>
          {{ event.companyName }} |

          <a :href="getProposalUrl(event.id)" class="color-purple" target="_blank">See proposal</a>
        </div>
      </div>
      <md-button class="md-simple md-icon-button" @click="selectEvent(event)">
        <md-icon class="color-black">
          east
        </md-icon>
      </md-button>
    </div>
  </div>
</template>
<script>

export default {
  components: {},
  props: {
    events: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  computed: {
    proposals() {
      return this.$store.state.vendorDashboard.proposals;
    },
  },
  mounted(){
    console.log(this.events);
  },
  methods: {
    getUpcomingPeriod(dateString) {
      const d = new Date(dateString);
      if (this.$dateUtil.isToday(d)) {
        return "Today";
      } else if (this.$dateUtil.isTomorrow(d)) {
        return "Tomorrow";
      } else if (this.$dateUtil.isThisWeek(d)) {
        return "This Week";
      }
      const days = this.$dateUtil.getLeftDays(d);
      return `Within ${days} days`;
    },
    selectEvent(event) {
      this.$emit("showEvent", event);
    },
    show(event) {
      this.$emit("show", event);
    },
    getProposalUrl(eventId) {
      console.log("proposalUrl", eventId, this.proposals.map(p => p));
      let proposal = this.proposals.find(p => p.nonMaryoku && p.eventData.id.toString() === eventId.toString());
      return proposal ? `${location.protocol}//${location.host}/#/unregistered/proposals/${proposal.id}` : null;
    },
  },
};
</script>
<style lang="scss" scoped>
.upcoming-event-list {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  &::before {
    content: "";
    position: absolute;
    left: 25px;
    height: 100%;
    border-left: dashed 1px #707070;
  }
  .upcoming-event {
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    .event-logo {
      box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.16);
      width: 50px !important;
      height: 50px !important;
      min-width: 50px;
      border-radius: 50%;
      cursor: pointer;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .event-detail {
      padding: 10px;
    }
  }
}
</style>
