<template>
  <div class="white-card p-40">
    <loader :active="isLoading" is-full-screen page="vendor"></loader>
    <div class="font-size-30 font-bold">Tell us a little bit about the event</div>
    <div class="md-layout mt-30 selection-wrapper">
      <div class="md-layout-item md-size-50 p-0 text-left">
        <md-checkbox class="md-simple md-checkbox-circle md-vendor" v-model="isRegisteredCustomer" :value="true">
          Select from customer list
        </md-checkbox>
      </div>
      <div class="md-layout-item md-size-50 p-0 text-left">
        <md-checkbox class="md-simple md-checkbox-circle md-vendor" v-model="isRegisteredCustomer" :value="false">
          New customer
        </md-checkbox>
      </div>
    </div>
    <div class="mt-30 text-left">
      <label class="font-bold">Company / Customer Name</label>
      <autocomplete
        class="width-50 mt-5 md-purple medium-selector"
        placeholder="Type name of customer here..."
        :options="customers"
        :label="['companyName', 'name']"
        :selectedValue="selectedCustomer"
        @change="selectCustomer"
        @input="searchCustomer"
      ></autocomplete>
    </div>

    <div class="d-flex mt-40">
      <selectable-card
        label="Corporate Event"
        value="corporation"
        :selected="eventOption"
        :icon="`${$iconURL}VendorsProposalPage/Group 17122.svg`"
        theme="purple"
        @change="eventOption = 'corporation'"
      ></selectable-card>
      <selectable-card
        label="Social Event"
        value="social"
        :icon="`${$iconURL}VendorsProposalPage/Group 17394.svg`"
        :selected="eventOption"
        @change="eventOption = 'social'"
        theme="purple"
      ></selectable-card>
    </div>
    <div v-if="eventOption === 'corporation'" class="text-left mt-30">
      <label class="font-bold">Type of event:</label>
      <multiselect
        class="width-50 mt-5 form-input md-purple"
        v-model="eventType"
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
      <label class="font-bold">Number of guests</label>
      <maryoku-input
        class="width-50 mt-5 form-input"
        v-model="numberOfParticipants"
        inputStyle="users"
        placeholer="Type the amount of guests here..."
      ></maryoku-input>
    </div>
    <div class="text-left mt-30">
      <label class="font-bold">Event location</label>
      <div class="width-50 location-input">
        <location-input v-model="location"></location-input>
      </div>
    </div>

    <div class="row">
      <p class="mb-5 text-left text-bold">Date of the event</p>
      <maryoku-input
        :value="eventDate"
        class="form-input width-50"
        placeholder="Choose date…"
        inputStyle="date"
        v-model="eventDate"
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
    <modal v-if="showNewCustomerModal" container-class="modal-container customer-form bg-white">
      <template slot="body">
          <customer-form
              v-if="showNewCustomerModal"
              :vendorId="vendorData.id"
              :name="candidateName"
              @save="saveCustomer"
              @close="showNewCustomerModal = false" />
      </template>
    </modal>
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
// import AddNewCustomerModal from "./Modals/AddNewCustomer";
import { Modal } from "@/components";
import Customer from "@/models/Customer";
import Loader from "../../../../components/loader/index";
const CustomerForm = () => import("../Form/CustomerForm");

export default {
  components: {
      Loader,
    MaryokuInput,
    VueTimepicker,
    LocationInput,
    Autocomplete,
    VueGoogleAutocomplete,
    vueDropzone: vue2Dropzone,
    SelectableCard,
    CustomerForm,
    Modal,
  },
  props: {
    defaultData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
      date: null,
      isLoading: false,
      isRegisteredCustomer: true,
      guests: null,
      link_proposal: null,
      attachment: null,
      customers: [],
      fileUrl: null,
      fileName: null,
      candidateName: null,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 5,
        headers: { "My-Awesome-Header": "header value" },
      },
      eventOption: "corporation",
      showNewCustomerModal: false,
      selectedEventType: null,
    };
  },
  async created() {
    const vendorId = this.$route.params.vendorId;
    const customerId = this.$route.query.customerId;

    let res = await this.$http.get(`${process.env.SERVER_URL}/1/vendors/${vendorId}/customers?status=0&sort=&order=`);
      console.log("customer", res);
    this.customers = res.data.customers;
    if (customerId) {
      let customer = this.customers.find(it => it.id == customerId);
      let event = {...this.$store.state.proposalForNonMaryoku.eventData, customer}
        this.$store.commit("proposalForNonMaryoku/setValue", {
            key: "eventData",
            value: event,
        });
    }

    this.$store.dispatch("common/getEventTypes");
  },
  methods: {
    async saveCustomer(customer) {
      this.isLoading = true;
      this.showNewCustomerModal = false;
      let query  = new Customer({...customer, vendorId: this.vendorData.id, type: 1})
      let res = await query.save();

      this.customers.push(res);
      this.selectCustomer(res);
      this.$store.commit("proposalForNonMaryoku/setValue", {
        key: "customer",
        value: res,
      });

      this.isLoading = false;
    },
    searchCustomer(e){
      this.candidateName = e.target.value;
      let timeout = null;

      // show customer form modal if customer doesn't exist in search text
      let customers = this.customers.filter(c => c.name.toLowerCase().indexOf(this.candidateName.toLowerCase()) !== -1);
      console.log('search', this.customers, customers);
      if ( !customers.length && this.candidateName.length > 2) {
        timeout = setTimeout(_ => {
          this.showNewCustomerModal = true;
        }, 1000)
      } else {
        clearTimeout(timeout);
      }
    },
    selectCustomer(selectedCustomer) {
      this.selectedCustomer = selectedCustomer;
    },
    updateStartA() {
      console.log("updateStartA");
      if (this.amPack.start == "am") {
        this.amPack = { start: "pm", end: this.amPack.end };
      } else {
        this.amPack = { start: "am", end: this.amPack.end };
      }
      console.log("updateStartA", this.amPack);
    },
    updateEndA() {
      console.log("updateEndA");
      if (this.amPack.end == "am") {
        this.amPack = { start: this.amPack.start, end: "pm" };
      } else {
        this.amPack = { start: this.amPack.start, end: "am" };
      }
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
        eventType: this.eventType,
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
    getTimeFromFormat(date, time, a, format) {
      return moment(`${date} ${time.hh}:${time.mm} ${a}`, format).unix();
    },
  },
  computed: {
    vendorData() {
      return this.$store.state.proposalForNonMaryoku.vendor;
    },
    eventTypes() {
      return this.$store.state.common.eventTypes;
    },
    selectedCustomer: {
      get() {
        return this.$store.state.proposalForNonMaryoku.eventData.customer;
      },
      set(value) {
        this.$store.commit("proposalForNonMaryoku/setEventProperty", { key: "customer", value });
      },
    },
    eventType: {
      get() {
        return this.$store.state.proposalForNonMaryoku.eventData.eventType;
      },
      set(value) {
        this.$store.commit("proposalForNonMaryoku/setEventProperty", { key: "eventType", value });
      },
    },
    location: {
      get() {
        return this.$store.state.proposalForNonMaryoku.eventData.location;
      },
      set(value) {
        this.$store.commit("proposalForNonMaryoku/setEventProperty", { key: "location", value });
      },
    },
    numberOfParticipants: {
      get() {
        return this.$store.state.proposalForNonMaryoku.eventData.numberOfParticipants;
      },
      set(value) {
        this.$store.commit("proposalForNonMaryoku/setEventProperty", { key: "numberOfParticipants", value });
      },
    },
    eventDate: {
      get() {
        if (this.$store.state.proposalForNonMaryoku.eventData.startTime)
          return moment(this.$store.state.proposalForNonMaryoku.eventData.startTime * 1000).format("DD.MM.YYYY");
        else return null;
      },
      set(value) {
        this.$store.commit("proposalForNonMaryoku/setEventProperty", {
          key: "startTime",
          value: this.getTimeFromFormat(value, this.startTime, this.amPack.start, "DD.MM.YYYY hh:mm a"),
        });
        this.$store.commit("proposalForNonMaryoku/setEventProperty", {
          key: "endTime",
          value: this.getTimeFromFormat(value, this.endTime, this.amPack.end, "DD.MM.YYYY hh:mm a"),
        });
      },
    },
    startTime: {
      get() {
        if (this.$store.state.proposalForNonMaryoku.eventData.startTime)
          return {
            hh: moment(this.$store.state.proposalForNonMaryoku.eventData.startTime * 1000).format("hh"),
            mm: moment(this.$store.state.proposalForNonMaryoku.eventData.startTime * 1000).format("mm"),
          };
        else return { hh: "12", mm: "00" };
      },
      set(value) {
        this.$store.commit("proposalForNonMaryoku/setEventProperty", {
          key: "startTime",
          value: this.getTimeFromFormat(this.eventDate, value, this.amPack.start, "DD.MM.YYYY hh:mm a"),
        });
      },
    },
    endTime: {
      get() {
        if (this.$store.state.proposalForNonMaryoku.eventData.startTime)
          return {
            hh: moment(this.$store.state.proposalForNonMaryoku.eventData.endTime * 1000).format("hh"),
            mm: moment(this.$store.state.proposalForNonMaryoku.eventData.endTime * 1000).format("mm"),
          };
        else return { hh: "12", mm: "00" };
      },
      set(value) {
        this.$store.commit("proposalForNonMaryoku/setEventProperty", {
          key: "endTime",
          value: this.getTimeFromFormat(this.eventDate, value, this.amPack.end, "DD.MM.YYYY hh:mm a"),
        });
      },
    },
    amPack: {
      get() {
        if (
          this.$store.state.proposalForNonMaryoku.eventData.startTime &&
          this.$store.state.proposalForNonMaryoku.eventData.endTime
        )
          return {
            start: moment(this.$store.state.proposalForNonMaryoku.eventData.startTime * 1000).format("a"),
            end: moment(this.$store.state.proposalForNonMaryoku.eventData.endTime * 1000).format("a"),
          };
        else return { start: "am", end: "am" };
      },
      set(value) {
        if (
          this.$store.state.proposalForNonMaryoku.eventData.startTime &&
          this.$store.state.proposalForNonMaryoku.eventData.endTime
        ) {
          this.$store.commit("proposalForNonMaryoku/setEventProperty", {
            key: "startTime",
            value: this.getTimeFromFormat(this.eventDate, this.startTime, value.start, "DD.MM.YYYY hh:mm a"),
          });
          this.$store.commit("proposalForNonMaryoku/setEventProperty", {
            key: "endTime",
            value: this.getTimeFromFormat(this.eventDate, this.endTime, value.end, "DD.MM.YYYY hh:mm a"),
          });
        }
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
