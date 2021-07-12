<template>
  <div class="white-card p-40">
    <div class="font-size-30 font-bold">Give us a few details of the event for this proposal</div>

    <div class="md-layout mt-30 selection-wrapper">
      <div class="md-layout-item md-size-50 p-0 text-left">
        <md-checkbox class="md-simple md-checkbox-circle md-vendor" v-model="isRegisteredCustomer" :value="true">
          Selection from the customer list
        </md-checkbox>
      </div>
      <div class="md-layout-item md-size-50 p-0 text-left">
        <md-checkbox class="md-simple md-checkbox-circle md-vendor" v-model="isRegisteredCustomer" :value="false">
          Unregistered customer
        </md-checkbox>
      </div>
    </div>
    <div class="mt-30 text-left">
      <label class="font-bold">Company / Customer Name</label>
      <autocomplete
        class="width-50 mt-5 md-purple medium-selector"
        placeholder="Type name of customer here..."
        :options="customers"
        :label="['company', 'name']"
        :selectedValue="selectedCustomer"
        @change="selectCustomer"
      ></autocomplete>
    </div>

    <div class="d-flex mt-40">
      <selectable-card
        label="Corporation Event"
        value="corporation"
        :selected="eventType"
        :icon="`${$iconURL}VendorsProposalPage/Group 17122.svg`"
        theme="purple"
        @change="eventType = 'corporation'"
      ></selectable-card>
      <selectable-card
        label="Social Event"
        value="social"
        :icon="`${$iconURL}VendorsProposalPage/Group 17394.svg`"
        :selected="eventType"
        @change="eventType = 'social'"
        theme="purple"
      ></selectable-card>
    </div>
    <div class="text-left mt-30">
      <label class="font-bold">Type Of Event:</label>
      <multiselect
        v-if="eventType === 'corporation'"
        class="width-50 mt-5 form-input md-purple"
        v-model="selectedEventType"
        :options="eventTypes"
        :close-on-select="true"
        :clear-on-select="true"
        tag-placeholder="Add this as new tag"
        placeholder="Type to search category"
        label="name"
        track-by="key"
        :key="eventTypes.length"
      ></multiselect>
    </div>
    <div class="text-left mt-30">
      <label class="font-bold">Number of Guests</label>
      <maryoku-input
        class="width-50 mt-5 form-input"
        v-model="guests"
        inputStyle="users"
        placeholer="Type the amount of guests here..."
      ></maryoku-input>
    </div>
    <div class="text-left mt-30">
      <label class="font-bold">Event Location</label>
      <div class="width-50 location-input">
        <location-input v-model="location"></location-input>
      </div>
    </div>

    <div class="row">
      <p class="mb-5 text-left text-bold">Date Of The Event</p>
      <maryoku-input
        :value="date"
        class="form-input width-50"
        placeholder="Choose date…"
        inputStyle="date"
        v-model="date"
        theme="purple"
      ></maryoku-input>
    </div>
    <div class="md-layout mt-30 width-50">
      <div class="md-layout-item md-size-50 p-0">
        <p class="mb-5 text-left text-bold"><img :src="`${iconUrl}Asset 522.svg`" class="mr-10" width="16" />From</p>
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
    <add-new-customer-modal
      v-if="showNewCustomerModal"
      @cancel="showNewCustomerModal = false"
      @save="handleSaveCustomer"
    ></add-new-customer-modal>
  </div>
</template>
<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { MaryokuInput } from "@/components";
import LocationInput from "../VendorDashboard/LocationInput";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import UserEvent from "@/models/UserEvent";
import moment from "moment";
import Autocomplete from "@/components/Autocomplete";
import vue2Dropzone from "vue2-dropzone";
import S3Service from "@/services/s3.service";
import SelectableCard from "@/components/SelectableCard.vue";
import AddNewCustomerModal from "./Modals/AddNewCustomer";

export default {
  components: {
    MaryokuInput,
    VueTimepicker,
    LocationInput,
    Autocomplete,
    VueGoogleAutocomplete,
    vueDropzone: vue2Dropzone,
    SelectableCard,
    AddNewCustomerModal,
  },
  props: {
    defaultData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    const vendorId = this.$route.params.vendorId;
    this.$http.get(`${process.env.SERVER_URL}/1/userEventCustomers/${vendorId}`).then((res) => {
      this.customers = res.data;
    });
    this.$store.dispatch("common/getEventTypes");
  },
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
      isLoading: false,
      isRegisteredCustomer: true,
      guests: null,
      location: null,
      link_proposal: null,
      attachment: null,
      customers: [],
      fileUrl: null,
      fileName: null,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 5,
        headers: { "My-Awesome-Header": "header value" },
      },
      eventType: "corporation",
      showNewCustomerModal: false,
      selectedEventType: null,
    };
  },
  methods: {
    handleSaveCustomer(customer) {
      this.customers.push(customer);
      this.selectCustomer(customer);
      this.showNewCustomerModal = false;
    },
    selectCustomer(selectedCustomer) {
      this.selectedCustomer = selectedCustomer;
    },
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
    changeDate(date) {
      console.log("date", date);
      console.log("changeDate");
    },
    close() {
      this.$emit("cancel");
    },
    createEvent() {
      const startDate = moment(
        `${this.date} ${this.startTime.hh}:${this.startTime.mm} ${this.amPack.start}`,
        "DD.MM.YYYY hh:mm a",
      );
      const endDate = moment(
        `${this.date} ${this.endTime.hh}:${this.endTime.mm} ${this.amPack.end}`,
        "DD.MM.YYYY hh:mm a",
      );
      var dt = new Date();
      var tz = dt.getTimezoneOffset();
      const userEvent = {
        company: this.company,
        date: endDate.format("YYYY-MM-DD"),
        startTime: startDate,
        endTime: endDate,
        companyName: this.company,
        customerName: this.customer,
        email: this.email,
        guests: this.guests,
        location: this.location,
        timezone: tz,
        isRegisteredCustomer: this.isRegisteredCustomer,
        fileName: this.fileName,
        fileUrl: this.fileUrl,
      };
      if (this.selectedCustomer) {
        userEvent.customer = { id: this.selectedCustomer.id };
        userEvent.companyName = this.selectedCustomer.company;
      }
      new UserEvent(userEvent).save().then((res) => {
        this.$emit("save", res);
      });
    },
    getAddressData(addressData, placeResultData, id) {
      this.location = `${addressData.route}, ${addressData.administrative_area_level_1}, ${addressData.country}`;
    },
    async fileAdded(file) {
      const extension = file.type.split("/")[1];
      let fileName = new Date().getTime();
      this.fileName = file.name;
      let fileUrl = `https://maryoku.s3.amazonaws.com/events/proposal/${fileName}.${extension}`;

      S3Service.fileUpload(file, `${fileName}`, `events/proposal`).then((res) => {
        this.isLoading = false;
        this.fileUrl = fileUrl;
      });
    },
  },
  computed: {
    eventTypes() {
      return this.$store.state.common.eventTypes;
    },
    selectedCustomer: {
      get() {
        return this.$store.state.proposalForNonMaryoku.event.customer;
      },
      set(value) {
        this.$store.commit("proposalForNonMaryoku/setEventProperty", { key: "customer", value });
      },
    },
  },
  watch: {
    isRegisteredCustomer(newValue, oldValue) {
      if (!newValue) {
        this.showNewCustomerModal = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.vendor-create-event {
  z-index: 40 !important;
  .location-input {
    position: relative;
    img {
      width: 20px;
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
    }
    input {
      padding-left: 50px;
    }
  }
  /deep/ .picker-panel .purple span.vfc-span-day.vfc-today {
    background-color: transparent !important;
  }
  /deep/ .vfc-week .vfc-day span.vfc-span-day.vfc-hover:hover,
  .vfc-week .vfc-day span.vfc-span-day.vfc-hovered {
    background-color: #641856 !important;
    color: white !important;
    z-index: 100;
  }
}
.selection-wrapper {
  width: 70%;
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
