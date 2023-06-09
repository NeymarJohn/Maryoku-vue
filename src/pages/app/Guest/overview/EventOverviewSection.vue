<template>
  <div class="card-section align-center">
    <div class="left">
      <img class="mr-30" :src="section.img_src">
      <div class="mr-30" style="width: 30%">
        <h3 class="title">
          {{ section.title }}
        </h3>

        <p v-if="!isEdit && section.location" class="content">
          {{ section.location }}
        </p>
        <p v-if="!isEdit && section.numberOfParticipants" class="content">
          {{ section.numberOfParticipants }} Guests
        </p>
        <p v-if="!isEdit && section.eventType" class="content">
          {{ section.eventType }}
        </p>

        <location-input
          v-if="isEdit && section.hasOwnProperty('location')"
          v-model="section.location"
          placeholder="Type city / region or specific address here…"
          class="my-10"
          @change="changeLocation"
        />

        <maryoku-input
          v-if="isEdit && section.hasOwnProperty('numberOfParticipants')"
          class="form-input my-10"
          placeholder="Type number…..."
          input-style="users"
          :value="section.numberOfParticipants.toString()"
          @change="guestNumberChange"
        />

        <category-selector
          v-if="isEdit && section.hasOwnProperty('eventType')"
          :value="section.eventType"
          :categories="eventTypes"
          track-by="name"
          class="my-10"
          @change="eventTypeChange"
        />

        <div v-if="isEdit && section.warning" class="warning">
          <img class="mr-10" :src="`${iconsUrl}Group 1175 (9).svg`" width="20">
          {{ section.warning }}
        </div>
      </div>

      <div v-if="!isEdit && section.inOutDoor && section.inOutDoor.length" class="value align-self-center d-flex">
        <div v-for="(item, index) in section.inOutDoor" :key="index" class="mr-50">
          <img :src="getIconUrl(item.toLowerCase())">
          {{ item.toLowerCase() }}
        </div>
      </div>
      <div v-if="!isEdit && section.hasOwnProperty('guestType')" class="value align-self-center d-flex">
        <img v-if="section.guestType" :src="getIconUrl('guestType')">
        {{ section.guestType }}
      </div>
      <div v-if="!isEdit && section.hasOwnProperty('occasion')" class="value align-self-center d-flex">
        <img v-if="section.occasion" :src="getIconUrl('occasion')">
        {{ section.occasion }}
      </div>
      <div v-if="isEdit && section.hasOwnProperty('inOutDoor')" class="value align-self-center">
        <md-checkbox
          v-for="(item, index) in inOutDoorTypes"
          :key="index"
          v-model="section.inOutDoor"
          class="md-checkbox-circle md-red"
          :value="item.value"
          @change="inOutDoorChange"
        >
          <div class="checkbox-label-wrapper">
            <img :src="getIconUrl(item.value)">
            {{ item.label }}
          </div>
        </md-checkbox>
      </div>

      <div v-if="isEdit && section.hasOwnProperty('guestType')" class="value">
        <h3>Who's invited</h3>
        <category-selector
          :value="section.guestType"
          column="2"
          :categories="guestsTypes"
          :additional="additional"
          track-by="name"
          @change="guestTypeChange"
          @input="inputQuestType"
        />
      </div>

      <div v-if="isEdit && section.hasOwnProperty('occasion')" class="value">
        <h3>Celebrating</h3>
        <category-selector
          :value="section.occasion"
          :categories="occasions"
          track-by="name"
          @change="occasionChange"
        />

        <HolidayInput
          v-if="section.occasion === 'Holiday'"
          :value="section.holiday"
          :options="holidays"
          @change="holidayChange"
        />
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
import { MaryokuInput, LocationInput, HolidayInput } from "@/components";
import moment from "moment";
import { mapGetters } from "vuex";
import CategorySelector from "@/components/Inputs/CategorySelector";

export default {
  name: "EventOverviewSection",
  components: {
    MaryokuInput,
    LocationInput,
    HolidayInput,
    CategorySelector,
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format("MMMM DD, YYYY");
    },
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
            date: moment(this.section.started_at).subtract(1, "days").format("YYYY-MM-DD"),
            // date: null,
            dateTime: false,
            hour: "00",
            mintue: "00",
          },
          end: {
            date: moment(this.section.ended_at).format("YYYY-MM-DD"),
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
      ended_at: null,
      location: null,
      inOutdoors: null,
      inOutDoorTypes: [
        { label: "Outdoors event", value: "outdoors", icon: "outdoors" },
        { label: "Indoors event", value: "indoors", icon: "indoors" },
        { label: "Virtual event", value: "virtual", icon: "virtual" },
      ],
      guestsTypes: [
        {
          value: "Employees",
          name: "Employees",
          icon: `${this.$iconURL}Onboarding/employees-dark.svg`,
        },
        {
          value: "Employees & Spouses",
          name: "Employees & Spouses",
          icon: `${this.$iconURL}Onboarding/employees-spouses-dark.svg`,
        },
        {
          value: "Familes",
          name: "Familes",
          icon: `${this.$iconURL}Onboarding/families-dark.svg`,
        },
        {
          value: "Business Associates",
          name: "Business Associates",
          icon: `${this.$iconURL}Onboarding/business-associates-dark.svg`,
        },
        {
          value: "Customers",
          name: "Customers",
          icon: `${this.$iconURL}Onboarding/customers-dark.svg`,
        },
        {
          value: "Board Members",
          name: "Board Members",
          icon: `${this.$iconURL}Onboarding/board-members-dark.svg`,
        },
      ],
      eventType: null,
      eventTypes: [],
      occasions: [
        {
          value: "National Day",
          name: "National Day",
          icon: `${this.$iconURL}Onboarding/ballons-dark.svg`,
        },
        {
          value: "Holiday",
          name: "Holiday",
          icon: `${this.$iconURL}Onboarding/gift-dark.svg`,
        },
        {
          value: "Milestone",
          name: "Milestone",
          icon: `${this.$iconURL}Onboarding/flag-dark.svg`,
        },
        {
          value: "Company Day",
          name: "Company Day",
          icon: `${this.$iconURL}Onboarding/champaign-dark.svg`,
        },
        {
          value: "Season",
          name: "Season",
          icon: `${this.$iconURL}Onboarding/beach.svg`,
        },
      ],
      occasion: null,
      holidays: [],
    };
  },

  computed: {
    ...mapGetters({
      eventTypesList: "event/getEventTypesList",
    }),
    inOutDoorValue() {
      let inOutDoor = this.inOutDoorTypes.find((it) => it.value === this.section.inOutDoor);
      return inOutDoor ? inOutDoor["label"] : "";
    },
  },
  watch: {
    section: {
      handler(newVal) {
        if (newVal) this.init();
      },
      deep: true,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    getIconUrl(name) {
      if (name === "outdoors") {
        return `${this.$secondIconURL}Event%20Page/botanical%20(1).svg`;
      } else if (name === "indoors") {
        return `${this.$iconURL}Requirements/All%20indoor.svg`;
      } else if (name === "guestType") {
        return `${this.$secondIconURL}Event%20Page/Path%204858.svg`;
      } else if (name === "occasion") {
        return `${this.$secondIconURL}Event%20Page/Path%204856.svg`;
      } else if (name === "virtual") {
        return `${this.$secondIconURL}Creation/group-11232.svg`;
      }
    },
    changeLocation(loc) {
      // console.log("change.location", loc);
      if (!loc) return;
      this.$emit("change", { location: loc });
    },
    inOutDoorChange() {
      this.$emit("change", { inOutDoor: this.section.inOutDoor });
    },
    guestNumberChange(e) {
      this.$emit("change", { numberOfParticipants: parseInt(e) });
    },
    inputQuestType(e) {
      // console.log('inputQuestType', e);
    },
    guestTypeChange(e) {
      // console.log('guestTypeChange', e);
      this.$emit("change", { guestType: e });
    },
    eventTypeChange(e) {
      // console.log('eventTypeChange', e);
      this.$emit("change", { eventType: e });
    },
    occasionChange(e) {
      // console.log('occasionChange', e);
      this.$emit("change", { occasion: e });
    },
    holidayChange(e) {
      // console.log('holidayChange', e);
      this.$emit("change", { holiday: e });
    },
    init: async function () {
      let religions = JSON.parse(localStorage.getItem("two62-app.holidays"));
      // get holidays from server
      if (this.section.key === "event_type" && (!this.holidays || !this.holidays.length)) {
        let res = await this.$http.get(`${process.env.SERVER_URL}/1/holidays`);
        localStorage.setItem("two62-app.holidays", JSON.stringify(res.data));
        religions = res.data;
      }

      religions.map((rel) => {
        let holidays = [];
        rel.holidays.map((h) => {
          holidays.push(h.holiday);
        });
        this.holidays.push({ name: rel.name, holidays });
      });

      this.eventTypes = this.eventTypesList.map((it) => {
        return { name: it.name, value: it.name, icon: `${this.$iconURL}Onboarding/${it.key}.svg` };
      });
    },
  },
};
</script>
