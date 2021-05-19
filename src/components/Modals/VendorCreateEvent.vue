<template>
  <modal class="vendor-create-event">
    <template slot="header">
      <div class="add-category-model__header">
        <h2 class="font-size-20 font-bold-extra">Give us a few details of the event</h2>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div>
        <div class="row">
          <p class="mb-5 text-left text-bold">Date Of The Event</p>
          <maryoku-input
            :value="date"
            class="form-input width-50"
            placeholder="Choose date…..."
            inputStyle="date"
            @change="changeDate"
          ></maryoku-input>
        </div>
        <div class="md-layout mt-30">
          <div class="md-layout-item md-size-50 p-0">
            <p class="mb-5 text-left text-bold">
              <img :src="`${iconUrl}Asset 522.svg`" class="mr-10" width="16" />From
            </p>
            <div class="event-time d-flex align-center">
              <vue-timepicker
                manual-input
                input-class="time-class"
                hide-dropdown
                format="hh:mm"
                v-model="startTime"
                hide-clear-button
              />
              <div class="am-field" @click="updateStartA()">
                <input type="text" v-model="amPack.start" readonly />
              </div>
            </div>
          </div>
          <div class="md-layout-item md-size-50 p-0">
            <p class="mb-5 text-left text-bold"><img class="mr-10" :src="`${iconUrl}Asset 522.svg`" width="16" />To</p>
            <div class="event-time d-flex align-center">
              <vue-timepicker
                manual-input
                input-class="time-class"
                hide-dropdown
                format="hh:mm"
                v-model="endTime"
                hide-clear-button
              />
              <div class="am-field" @click="updateEndA()">
                <input type="text" v-model="amPack.end" readonly />
              </div>
            </div>
          </div>
        </div>
        <div class="md-layout mt-30">
          <div class="md-layout-item md-size-50 p-0 text-left">
            <md-checkbox class="md-simple md-checkbox-circle md-vendor" v-model="selectedOption" value="customer_list">
              Selection from the customer list
            </md-checkbox>
          </div>
          <div class="md-layout-item md-size-50 p-0 text-left">
            <md-checkbox
              class="md-simple md-checkbox-circle md-vendor"
              v-model="selectedOption"
              value="unregister_customer"
            >
              Unregistered customer
            </md-checkbox>
          </div>
        </div>
        <div class="mt-30 text-left">
          <label>Company / Customer Name</label>
          <multiselect
            v-model="company"
            :options="['microsoft', 'amazon', 'google', 'stripe']"
            :close-on-select="true"
            :clear-on-select="true"
            placeholder=""
            class="width-50 mt-5 md-purple medium-selector"
          ></multiselect>
        </div>
        <div class="text-left mt-30">
          <label>Number of Guests</label>
          <maryoku-input
            class="width-50 mt-5 form-input"
            v-model="guests"
            inputStyle="users"
            placeholer="Type the amount of guests here..."
          ></maryoku-input>
        </div>
        <div class="text-left mt-30">
          <label>Event Location</label>
          <location-input
            v-model="location"
            class="width-50 mt-5"
            placeholder="Type city / region or specific address here…"
          ></location-input>
        </div>
        <div class="form-group text-left mt-30">
          <label>Link Proposal</label>
          <multiselect
            v-model="link_proposal"
            :options="['microsoft', 'amazon', 'google', 'stripe']"
            :close-on-select="true"
            :clear-on-select="true"
            placeholder=""
            class="width-50 mt-5 md-purple medium-selector"
          ></multiselect>
        </div>
        <div class="form-group text-left mt-30">
          <label>Upload proposal</label>
          <label class="upload-section mt-5" for="file">
            <md-button class="md-outlined md-simple md-vendor md-sm">
              <img
                class="mr-5"
                src="https://static-maryoku.s3.amazonaws.com/storage/icons/common/pin-dark.svg"
                width="15"
              />
              Attach file</md-button
            >
            <div>Or</div>
            <div class="note">Drag your file here</div>
          </label>
          <input style="display: none" id="file" name="attachment" type="file" @change />
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-default md-simple cancel-btn md-bold" @click="close">Cancel</md-button>
      <md-button class="md-vendor add-category-btn md-bold">Done</md-button>
    </template>
  </modal>
</template>
<script>
import { Modal, MaryokuInput, LocationInput } from "@/components";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
export default {
  components: {
    Modal,
    MaryokuInput,
    VueTimepicker,
    LocationInput,
  },
  props: {},
  data() {
    return {
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
      date: null,
      startTime: {
        hh: "12",
        mm: "00",
      },
      endTime: {
        hh: "12",
        mm: "00",
      },
      amPack: {
        start: "AM",
        end: "AM",
      },
      selectedOption: "customer_list",
      company: null,
      guests: null,
      location: null,
      link_proposal: null,
      attachment: null,
    };
  },
  methods: {
    updateStartA() {
      if (this.amPack.start == "AM") {
        this.amPack.start = "PM";
      } else {
        this.amPack.start = "AM";
      }
    },
    updateEndA() {
      if (this.amPack.end == "AM") {
        this.amPack.end = "PM";
      } else {
        this.amPack.end = "AM";
      }
    },
    changeDate() {
      console.log("changeDate");
    },
    close() {
      this.$emit("cancel");
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
.vendor-create-event {
  z-index: 40 !important;
}
.event-time {
  /deep/ .time-picker {
    width: unset;
    input {
      text-align: center;
      width: 110px;
      height: 45px;
      border-radius: 3px;
      font: normal 18px Manrope-Regular, sans-serif;
      border: solid 0.5px #bcbcbc !important;
    }
    .dropdown ul li:not([disabled]).active,
    .dropdown ul li:not([disabled]).active:hover,
    .dropdown ul li:not([disabled]).active:focus {
      background: #641856;
      color: #fff;
    }
  }

  .am-field {
    position: relative;
    cursor: pointer;

    &:before {
      position: absolute;
      content: ">";
      transform: translateX(50%) translateY(calc(100% + 1.2rem)) rotate(90deg);
      left: 40%;
      font-size: 20px;
      font-weight: 800;
    }
    input {
      width: 80px;
      height: 45px;
      cursor: pointer;
      border-radius: 3px;
      font: normal 18px Manrope-Regular, sans-serif;
      margin-left: 0.5rem;
      border: solid 0.5px #bcbcbc !important;
      text-align: center;
    }
  }
}
.upload-section {
  border-color: #641856 !important;
}
</style>
