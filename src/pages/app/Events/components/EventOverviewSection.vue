<template>
  <div class="card-section align-center">
    <div class="left">
      <img class="mr-30" :src="section.img_src"/>
      <div class="mr-30" style="width: 30%">
        <h3 class="title"> {{ section.title }} </h3>

        <p class="content" v-if="section.created_at"> {{ section.created_at | formatDate }} </p>
        <p class="content" v-if="!isEdit && section.location"> {{ section.location }} </p>
        <p v-if="!isEdit && section.numberOfParticipants" class="content">{{ section.numberOfParticipants }}
          Guests</p>
        <p v-if="!isEdit && section.eventType" class="content">{{ section.eventType }}</p>

        <location-input v-if="isEdit && section.location"
                        v-model="section.location"
                        placeholder="Type city / region or specific address here…"
                        class="my-10"
                        @change="changeLocation">
        </location-input>

        <maryoku-input
                v-if="isEdit && section.numberOfParticipants"
                class="form-input my-10"
                placeholder="Type number…..."
                inputStyle="users"
                @change="guestNumberChange"
                v-model="section.numberOfParticipants.toString()"
        ></maryoku-input>

        <category-selector
                v-if="isEdit && section.eventType"
                :value="section.eventType"
                :categories="eventTypes"
                class="my-10"
                @change="eventTypeChange"
        ></category-selector>

        <div v-if="isEdit && section.warning" class="warning">
          <img class="mr-10" :src="`${iconsUrl}Group 1175 (9).svg`" width="20" />
          {{ section.warning }}
        </div>
      </div>

      <div v-if="!isEdit && section.hasOwnProperty('inOutDoor')" class="value align-self-center d-flex">
        <img :src="getIconUrl('Requirements/All indoor.svg')">
        {{ inOutDoorValue}} </div>
      <div v-if="!isEdit && section.hasOwnProperty('guestType')" class="value align-self-center d-flex">
        <img :src="getIconUrl('Requirements/All indoor.svg')">
        {{section.guestType}}</div>
      <div v-if="!isEdit && section.hasOwnProperty('occasion')" class="value align-self-center d-flex">
        <img :src="getIconUrl('Requirements/All indoor.svg')">
        {{section.occasion}}</div>

      <div v-if="isEdit && section.hasOwnProperty('created_at')" class="value">
        <div class="picker-panel">

          <functional-calendar
                  :is-date-picker="true"
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
                  v-model="section.inOutDoor"
                  @change="inOutDoorChange"
                  :value="'outdoors'">
            <div class="checkbox-label-wrapper">
              <img :src="getIconUrl('Requirements/Accessibility+Sustainability+and+Inclusion/Green policy.svg')">
              Outdoors event
            </div>
            </md-radio>

          <md-radio
                  v-model="section.inOutDoor"
                  @change="inOutDoorChange"
                  :value="'indoors'">
            <div class="checkbox-label-wrapper">
              <img :src="getIconUrl('Requirements/All indoor.svg')">
              Indoors event
            </div>
          </md-radio>
      </div>

      <div v-if="isEdit && section.hasOwnProperty('guestType')" class="value">
        <h3>Who's invited</h3>
        <category-selector
                :value="section.guestType"
                :categories="guestsTypes"
                @change="guestTypeChange"
        ></category-selector>
      </div>

      <div v-if="isEdit && section.hasOwnProperty('occasion')" class="value">
        <h3>Celebrating</h3>
        <category-selector
                :value="section.occasion"
                :categories="occasions"
                @change="occasionChange"
        ></category-selector>

          <!--<HolidayInput-->
                  <!--:value="''"-->
                  <!--@change="holidayChange"-->
          <!--&gt;-->
          <!--</HolidayInput>-->
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
      dateData: {
        currentDate: null,
        dateRange: {
          start: { date: false, dateTime: false, hour: "00", mintue: "00" },
          end: { date: false, dateTime: false, hour: "00", mintue: "00" },
        },
        selectedDate: null,
        selectedDatesItem: "",
        selectedHour: "00",
        selectedMinute: "00",
        selectedDates: [],
      },
      location: null,
      inOutdoors: null,
      guestsTypes: [
        {
          value: "employees",
          name: "Employees",
          icon: `${this.$iconURL}Onboarding/employee-dark.svg`,
        },
        {
          value: "employees-spouses",
          name: "Employees & Spouses",
          icon: `${this.$iconURL}Onboarding/employees-spouses-dark.svg`,
        },
        {
          value: "families",
          name: "Familes",
          icon: `${this.$iconURL}Onboarding/families-dark.svg`,
        },
        {
          value: "business-associates",
          name: "Business Associates",
          icon: `${this.$iconURL}Onboarding/business-associates-dark.svg`,
        },
        {
          value: "customers",
          name: "Customers",
          icon: `${this.$iconURL}Onboarding/customers-dark.svg`,
        },
        {
          value: "board-members",
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

    };
  },
  methods: {
    getIconUrl(name){
      return `${this.$iconURL}${name}`
    },
    changeLocation(loc) {
      console.log("change.location", loc);
      this.$emit('change', {location: e});
    },
    inOutDoorChange() {
      this.$emit('change', {inOutDoor: this.section.inOutDoor});
    },
    guestNumberChange(){
      this.$emit('change', {numberOfParticipants: this.section.numberOfParticipants});
    },
    guestTypeChange(e) {
      console.log('guestTypeChange', e);
      this.$emit('change', {guestType: e});
    },
    eventTypeChange(e){
      console.log('eventTypeChange', e);
      this.$emit('change', {eventType: e});
    },
    occasionChange(e){
      console.log('occasionChange', e);
      this.$emit('change', {occasion: e});
    },
    holidayChange(e){
      console.log('holidayChange', e);
      this.$emit('change', {holiday: e});
    },
    changeDate(e){
      console.log("changeDate", e, this.dateData);
      this.$emit('change', {created_at: new Date(this.dateData.selectedDate)});
    },
    init(){
      this.$store.dispatch("event/getEventTypes", {
        data: this.$store.state.auth.user.profile.defaultCalendarId,
        ctx: this,
      });

      if(this.section.hasOwnProperty('created_at')){
        this.dateData.currentDate = new Date(this.section.created_at);
        this.dateData.selectedDate = moment(this.section.created_at).format('YYYY-MM-DD');
      }

      this.eventTypes = this.eventTypesList.map(it => {
        return {name: it.name, value: it.key, icon: `${this.$iconURL}Onboarding/${it.key}.svg` };
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
      return this.section.inOutDoor === 'indoors' ? 'Indoors Event' : 'Outdoors Event';
    },
    guestTypeValue(){
      return this.guestsTypes.find(it => it.value === this.section.guestType).name;
    },
    occasionValue(){
      return this.occasions.find(it => it.value === this.section.occasion).name;
    },
  },
  mounted(){
    this.init();
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
