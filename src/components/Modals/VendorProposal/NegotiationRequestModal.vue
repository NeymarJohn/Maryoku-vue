<template>
  <modal class="negotiation-modal" containerClass="modal-container lg">
    <template slot="header">
      <div>
        <div class="font-size-30 font-bold header-text">Negotiate rate for Relish caterers & venues</div>
        <div class="mt-10">
          Submit the hourly or fixed rate below that you’d like to propose to Relish caterers & venues
        </div>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="text-left">
        <label class="font-bold">Negotiate By:</label>
        <div class="text-left">
          <md-radio v-model="remindTimeOption" value="today">Fixed Rate</md-radio>
          <md-radio v-model="remindTimeOption" value="tomorrow">By Guest Rate</md-radio>
        </div>
        <br />
        <label class="font-bold pb-10 d-inline-block">Your Rate</label>
        <maryoku-input inputStyle="budget"></maryoku-input>
        <br />
        <label class="font-bold pb-10 d-inline-block">Add Comment</label>
        <textarea> </textarea>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-black md-simple" @click="close"> Cancel </md-button>
      <md-button class="md-red md-bold reminder-button" @click="setRemind" :disabled="!canSetReminder">
        Update Vendor
      </md-button>
    </template>
  </modal>
</template>
<script>
import { Modal, MaryokuInput } from "@/components";
import moment from "moment";
import Reminder from "@/models/Reminder";
import TimePicker from "@/components/Inputs/TimePicker";
import WarningMessage from "@/components/WarningMessage";
export default {
  components: {
    Modal,
    MaryokuInput,
    TimePicker,
    WarningMessage,
  },
  props: {
    rsvpRequest: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      screen: 2,
      remindingEmail: "",
      remindingPhone: "",
      remindTimeOption: "today",
      remindTime: "tomorrow",
      selectedDays: 1,
      days: [
        { id: "1", title: "Tomorrow" },
        { id: "2", title: "2 days later" },
        { id: "3", title: "3 days later" },
        { id: "4", title: "4 days later" },
      ],
    };
  },
  created() {
    this.remindingEmail = this.rsvpRequest.email;
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
    setRemind() {
      this.$emit("save");
      // let remindingTime = 0;
      // if (this.remindTime === "week") {
      //   remindingTime = moment(new Date()).add(1, "week").valueOf();
      // } else if (this.remindTime === "tomorrow") {
      //   remindingTime = moment(new Date()).add(1, "day").valueOf();
      // } else if (this.remindTime === "tonight") {
      //   remindingTime = moment(new Date()).hours(21).valueOf();
      //   if (remindingTime < new Date().getTime()) {
      //     remindingTime = moment(new Date()).add(1, "hour").valueOf();
      //   }
      // }
      // const remindingData = {
      //   reminder: this.remindTimeOption,
      //   phoneNumber: this.remindingPhone,
      //   email: this.remindingEmail,
      //   remindingTime: remindingTime,
      //   type: "rsvp",
      //   emailParams: {
      //     guestName: this.remindingEmail,
      //     eventDate: this.$dateUtil.formatScheduleDay(this.rsvpRequest.event.eventStartMillis, "MMM DD, YYYY"),
      //     plannerName: this.rsvpRequest.event.owner.display,
      //   },
      //   emailTransactionId: this.rsvpRequest.emailTransactionId,
      //   phoneTransactionId: this.rsvpRequest.phoneTransactionId,
      // };
      // new Reminder(remindingData).save().then((res) => {
      //   this.$emit("setRemind", res);
      //   this.screen = 3;
      // });
    },
  },
  computed: {
    canSetReminder() {
      return this.remindTimeOption;
    },
  },
};
</script>
<style lang="scss" scoped>
.reminder-time-modal {
  .options-list {
    display: flex;
  }
  .time-selector {
    max-width: 500px;
  }
}
@media only screen and (max-width: 959px) {
  .reminder-time-modal {
    .header-text {
      line-height: 1.2em;
      font-size: 24px !important;
      margin-bottom: 30px;
    }
    .maryoku_input {
      width: 100%;
    }
    .options-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      margin-top: 20px;
      .option-card {
        margin: 10px 10px;
        width: 100px;
        height: 100px;
        padding: 10px;
        font-size: 14px;
        img {
          width: 20px !important;
        }
      }
    }
    .reminder-button {
      width: 100%;
    }
  }
}
</style>