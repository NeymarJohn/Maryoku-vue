<template>
  <div class="card-section align-center">
    <div class="left">
      <img class="mr-30" :src="section.img_src"/>
      <div style="width: 40%">
        <h3 class="title"> {{ section.title }} </h3>

        <p class="content" v-if="section.created_at"> {{ section.created_at | formatDate }} </p>
        <p class="content" v-if="!isEdit && section.location"> {{ section.location }} </p>
        <p v-if="!isEdit && section.numberOfParticipants" class="content">{{ section.numberOfParticipants }} Guests</p>
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
                v-model="section.numberOfParticipants.toString()"
        ></maryoku-input>

        <multiselect
                v-if="isEdit && section.eventType"
                v-model="section.eventType"
                class="multiple-selection my-15"
                track-by="name"
                label="name"
                placeholder="Select one"
                :options="eventTypes" :searchable="false"
                :allow-empty="false">
          <template slot="singleLabel" slot-scope="{ option }">
            <span>{{ option.name }}</span>
          </template>
        </multiselect>

        <div v-if="isEdit && section.warning" class="warning">
          <img class="mr-10" :src="`${iconsUrl}Group 1175 (9).svg`" width="20" />
          {{ section.warning }}
        </div>
      </div>

      <div v-if="!isEdit && section.inOutDoor" class="value align-self-center"> {{section.inOutDoor}} </div>
      <div v-if="!isEdit && section.guestType" class="value align-self-center">{{section.guestType}}</div>
      <div v-if="!isEdit && section.occasion" class="value align-self-center">{{section.occasion}}</div>

      <div v-if="isEdit && section.created_at" class="value">
        <div class="picker-panel">

          <functional-calendar
                  :is-date-picker="true"
                  :change-month-function="true"
                  :change-year-function="true"
                  dateFormat="yyyy-mm-dd"
                  v-model="dateData"
          ></functional-calendar>
        </div>
      </div>

      <div v-if="isEdit && section.inOutDoor" class="value align-self-center">
          <md-radio v-model="section.inOutDoor" :value="'outdoors'">Outdoors event</md-radio>
          <md-radio v-model="section.inOutDoor" :value="'indoors'">Indoors event</md-radio>
      </div>

      <div v-if="isEdit && section.guestType" class="value">
        <h3>Who's invited</h3>
        <multiselect v-model="section.guestType"
                     class="multiple-selection"
                     track-by="name"
                     label="name"
                     placeholder="Select one"
                     :options="guestsTypes" :searchable="false"
                     :allow-empty="false">
          <template slot="singleLabel" slot-scope="{ option }">
            <span>{{ option.name }}</span>
          </template>
        </multiselect>
      </div>

      <div v-if="isEdit && section.hasOwnProperty('occasion')" class="value">
        <h3>Who's invited</h3>
        <multiselect v-model="section.occasion"
                     class="multiple-selection"
                     track-by="name"
                     label="name"
                     placeholder="Select one"
                     :options="occasions" :searchable="false"
                     :allow-empty="false">
          <template slot="singleLabel" slot-scope="{ option }">
            <span>{{ option.name }}</span>
          </template>
        </multiselect>
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
  .card-section {
    position: relative;
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    padding: 50px;
    margin: 20px 36px 0;
    display: flex;

    .left {
      width: 100%;

      img {
        max-width: 70px;
        max-height: 70px;
      }

      display: flex;

      h3.title {
        margin: 0;
        font: 800 24px Manrope-Regular, sans-serif;
      }

      p.content {
        font-size: 17px;
        margin: 10px 0;
      }

      .warning {
        max-width: 280px;
      }

      .value {
        margin-left: 50px;

        h3 {
          font: 800 24px Manrope-Regular, sans-serif;
          margin: 0 0 12px;
        }
        .picker-panel {
          padding: 0;
        }
      }
    }

    .right {
      position: absolute;
      top: 60px;
      right: 20px;
    }

  }
  .align-center {
    align-items: center;
  }

  .align-self-center {
    align-self: center;
  }
  .multiple-selection {
    width: 300px;
    display: inline-block;
    height: 50px;

    .multiselect__select {
      top: 15px;
    }

    .multiselect__tags {
      border: solid 0.5px #bcbcbc !important;
      height: 50px;
    }

    .multiselect__input {
      height: 30px;
      text-transform: capitalize;
    }

    .multiselect__placeholder {
      line-height: 20px;
    }
  }
</style>
<script>

import RequirementItemComment from "./RequirementItemComment";
import Multiselect from "vue-multiselect";
import HeaderActions from "@/components/HeaderActions";
import { LocationInput } from "@/components";
import { FunctionalCalendar } from "vue-functional-calendar";
import { MaryokuInput } from '@/components'
import moment from "moment";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
// import VSignupCategorySelector from "'@/components/Inputs/VSignupCategorySelector";

export default {
  name: "event-overview-section",
  components: {
    RequirementItemComment,
    Multiselect,
    HeaderActions,
    FunctionalCalendar,
    MaryokuInput,
    LocationInput,
    // VSignupCategorySelector,
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
        currentDate: new Date(),
        dateRange: {
          start: { date: false, dateTime: false, hour: "00", mintue: "00" },
          end: { date: false, dateTime: false, hour: "00", mintue: "00" },
        },
        selectedDate: new Date(),
        selectedDatesItem: "",
        selectedHour: "00",
        selectedMinute: "00",
        selectedDates: [],
      },
      location: null,
      inOutdoors: null,
      guestsTypes: [
        {
          value: "employees", name: "Employees"
        },
        {
          value: "employees-spouses", name: "Employees & Spouses"
        },
        {
          value: "families", name: "Familes"
        },
        {
          value: "business-associates", name: "Business Associates"
        },
        {
          value: "customers", name: "Customers"
        },
        {
          value: "board-members", name: "Board Members"
        },
      ],
      guestType: null,
      eventType: null,
      occasions: [
        {
          value: "National Day", name: "National Day", icon: "ballons-dark.svg"
        },
        {
          value: "Holiday", name: "Holiday", icon: "gift-dark.svg"
        },
        {
          value: "Milestone", name: "Milestone", icon: "flag-dark.svg"
        },
        {
          value: "Company Day", name: "Company Day", icon: "champaign-dark.svg"
        },
        {
          value: "Season", name: "Season", icon: "beach.svg"
        }],
      occasion: null,
    };
  },
  methods: {
    changeLocation(loc) {
      console.log("change.location", loc);
    },
  },
  watch: {
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format("MMMM DD, YYYY");
    },
    formatTime: function (date) {
      return moment(date).format("h:00 A");
    },
    formatDuration: function (startDate, endDate) {
      return moment(endDate).diff(startDate, "hours");
    },
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    },
  },
  computed:{
    ...mapGetters({
      eventTypes: "event/getEventTypesList",
    }),
    getFormattedDate() {
      if (!this.event) return "";
      return moment(new Date(this.event.eventPage.dateCreated)).format("DD MMM YYYY");
    },
  },
  mounted(){

  }
};
</script>
