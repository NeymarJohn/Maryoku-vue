<template>
  <div class="card-section align-center">
    <div class="left">
      <img class="mr-30" :src="section.img_src"/>
      <div class="mr-30" style="width: 30%">
        <h3 class="title"> {{ section.title }} </h3>

        <p class="content" v-if="section.started_at && section.started_at !== section.ended_at"> {{ section.started_at | formatDate }} ~ {{ section.ended_at | formatDate }}</p>
        <p class="content" v-if="section.started_at && section.started_at === section.ended_at"> {{ section.started_at | formatDate }} </p>
        <p class="content" v-if="!isEdit && section.location"> {{ section.location }} </p>
        <p v-if="!isEdit && section.numberOfParticipants" class="content">{{ section.numberOfParticipants }}
          Guests</p>
        <p v-if="!isEdit && section.eventType" class="content">{{ section.eventType }}</p>

        <location-input v-if="isEdit && section.hasOwnProperty('location')"
                        v-model="section.location"
                        placeholder="Type city / region or specific address here…"
                        class="my-10"
                        @change="changeLocation">
        </location-input>

        <maryoku-input
                v-if="isEdit && section.hasOwnProperty('numberOfParticipants')"
                class="form-input my-10"
                placeholder="Type number…..."
                inputStyle="users"
                @change="guestNumberChange"
                :value="section.numberOfParticipants.toString()"
        ></maryoku-input>

        <category-selector
                v-if="isEdit && section.hasOwnProperty('eventType')"
                :value="section.eventType"
                :categories="eventTypes"
                trackBy="name"
                class="my-10"
                @change="eventTypeChange"
        ></category-selector>

        <div v-if="isEdit && section.warning" class="warning">
          <img class="mr-10" :src="`${iconsUrl}Group 1175 (9).svg`" width="20" />
          {{ section.warning }}
        </div>
      </div>

      <div v-if="!isEdit && section.hasOwnProperty('inOutDoor')" class="value align-self-center d-flex">
        <img v-if="this.section.inOutDoor" :src="getIconUrl(section.inOutDoor)">
        {{ inOutDoorValue}} </div>
      <div v-if="!isEdit && section.hasOwnProperty('guestType')" class="value align-self-center d-flex">
        <img v-if="this.section.guestType" :src="getIconUrl('guestType')">
        {{section.guestType}}</div>
      <div v-if="!isEdit && section.hasOwnProperty('occasion')" class="value align-self-center d-flex">
        <img v-if="this.section.occasion" :src="getIconUrl('occasion')">
        {{section.occasion}}</div>

      <div v-if="isEdit && section.hasOwnProperty('started_at') && section.hasOwnProperty('ended_at')" class="value">
        <div class="picker-panel">

          <functional-calendar
                  :is-date-range="true"
                  :change-month-function="true"
                  :change-year-function="true"
                  @dayClicked="changeDate"
                  dateFormat="yyyy-mm-dd"
                  v-model="dateData"
          ></functional-calendar>
          <md-checkbox
                  v-model="section.more_one_day"
                  value="more_one_day"
          >
            More than one day event
          </md-checkbox>
        </div>
      </div>

      <div v-if="isEdit && section.inOutDoor" class="value align-self-center">
          <md-radio
                  v-for="(item, index) in inOutDoorTypes"
                  v-model="section.inOutDoor"
                  @change="inOutDoorChange"
                  :key="index"
                  :value="item.value">
            <div class="checkbox-label-wrapper">
              <img :src="getIconUrl(item.value)">
              {{ item.label }}
            </div>
            </md-radio>
      </div>

      <div v-if="isEdit && section.hasOwnProperty('guestType')" class="value">
        <h3>Who's invited</h3>
        <category-selector
                :value="section.guestType"
                column="2"
                :categories="guestsTypes"
                :additional="additional"
                trackBy="name"
                @change="guestTypeChange"
                @input="inputQuestType"
        ></category-selector>
      </div>

      <div v-if="isEdit && section.hasOwnProperty('occasion')" class="value">
        <h3>Celebrating</h3>
        <category-selector
                :value="section.occasion"
                :categories="occasions"
                trackBy="name"
                @change="occasionChange"
        ></category-selector>

          <HolidayInput
                  v-if="section.occasion === 'Holiday'"
                  :value="section.holiday"
                  :options="holidays"
                  @change="holidayChange"
          >
          </HolidayInput>
      </div>
    </div>
    <div class="right">
      <md-button class="md-simple" @click="isEdit = !isEdit">
        <md-icon style="font-size: 40px!important;"> {{ isEdit ? 'keyboard_arrow_down' : 'keyboard_arrow_right' }} </md-icon>
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
  name: "event-overview-section",
  components: {
    RequirementItemComment,
    Multiselect,
    HeaderActions,
    FunctionalCalendar,
    MaryokuInput,
    LocationInput,
    HolidayInput,
    CategorySelector
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
      dateData: {
        currentDate: null,
        dateRange: {
          start: {
            date: moment(this.section.started_at).format('YYYY-MM-DD'),
            dateTime: false,
            hour: "00",
            mintue: "00" },
          end: {
            date: moment(this.section.ended_at).format('YYYY-MM-DD'),
            dateTime: false,
            hour: "00",
            mintue: "00" },
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
        {label: 'Outdoors event', value: 'outdoors', icon: 'outdoors'},
        {label: 'Indoors event', value: 'indoors', icon: 'indoors'},
        {label: 'Virtual event', value: 'virtual', icon: 'virtual'},
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
        }],
      occasion: null,
      holidays: [],
    };
  },
  methods: {
    getIconUrl(name){
      if (name === 'outdoors') {
        return `${this.$secondIconURL}Event%20Page/botanical%20(1).svg`
      } else if (name === 'indoors') {
        return `${this.$iconURL}Requirements/All%20indoor.svg`
      } else if (name === 'guestType') {
        return `${this.$secondIconURL}Event%20Page/Path%204858.svg`
      } else if (name === 'occasion') {
        return `${this.$secondIconURL}Event%20Page/Path%204856.svg`
      } else if (name === 'virtual') {
        return `${this.$secondIconURL}Creation/group-11232.svg`
      }
    },
    changeLocation(loc) {
      // console.log("change.location", loc);
      if (!loc) return;
      this.$emit('change', {location: loc});
    },
    inOutDoorChange() {
      // console.log('inOutDoorChange', this.section.inOutDoor);
      this.$emit('change', {inOutDoor: this.section.inOutDoor});
    },
    guestNumberChange(e){
      this.$emit('change', {numberOfParticipants: parseInt(e) });
    },
    inputQuestType(e){
      // console.log('inputQuestType', e);
    },
    guestTypeChange(e) {
      // console.log('guestTypeChange', e);
      this.$emit('change', {guestType: e});
    },
    eventTypeChange(e){
      // console.log('eventTypeChange', e);
      this.$emit('change', {eventType: e});
    },
    occasionChange(e){
      // console.log('occasionChange', e);
      this.$emit('change', {occasion: e});
    },
    holidayChange(e){
      // console.log('holidayChange', e);
      this.$emit('change', {holiday: e});
    },
    changeDate(e){
      this.dateClick = !this.dateClick;

      if(this.dateClick) {
        this.started_at = e.date;
      }

      if(!this.dateClick) {
        this.ended_at = e.date;

        const extendedMoment = extendMoment(moment);
        const start = new Date(this.started_at);
        const end = new Date(this.ended_at);
        const range = extendedMoment.range(moment(start), moment(end));

        const dateList = Array.from(range.by("day")).map((m) => m.format("YYYY-MM-DD"));
        let timelineDates = [];
        dateList.forEach((d) => {
          timelineDates.push({
            date: d,
            templates: timelineTempates,
            status: "editing",
          });
        });

        this.$emit('change', {
          dateData: {
            started_at: this.started_at,
            ended_at: this.ended_at,
          },
          timeline:{
            dateList: dateList,
            mode: "template", // default
            status: "editing",
          },
          timelineDates
        })
      }

    },
    init: async function(){
      console.log('init', this.dateData);
      // get holidays from server
      if ( !this.holidays.length && this.section.key === 'event_type') {
        let res = await this.$http.get(`${process.env.SERVER_URL}/1/holidays`);

        res.data.map(rel => {
          let options = [];
          rel.holidays.map(h => {
            options.push(h.holiday);
          })
          this.holidays.push({name: rel.name, options});
        });
      }

      this.eventTypes = this.eventTypesList.map(it => {
        return {name: it.name, value: it.name, icon: `${this.$iconURL}Onboarding/${it.key}.svg` };
      });
    },
    renderCalendar(){
      let start_day = moment(this.section.started_at).
      $('.vfc-day').each(function (index, day) {

      });
    }
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format("MMMM DD, YYYY");
    },
  },
  computed:{
    ...mapGetters({
      eventTypesList: "event/getEventTypesList",
    }),
    inOutDoorValue(){
      let inOutDoor = this.inOutDoorTypes.find(it => it.value === this.section.inOutDoor);
      return inOutDoor ? inOutDoor['label'] : '';
    },
  },
  mounted(){
    this.init();
  },
  updated(){
    this.renderCalendar();
  },
  watch:{
    section:{
      handler(newVal){
        if (newVal) this.init();
      },
      deep: true,
    }
  }
};
</script>
