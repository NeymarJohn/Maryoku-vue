<template>
  <modal class="rsvp-modal">
    <template slot="header">
      <div class="">
        <img :src="`${$iconURL}RSVP/Group 9565.svg`" class="mr-30" style="margin-top: -10px" />
        <span class="font-size-30 font-bold-extra">CELEBRATE WITH US VIRTUALLY ON ZOOM</span>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="text-left">
        <div class="information-section">
          <div class="mb-20">
            <img :src="`${$iconURL}RSVP/Path+251.svg`" class="mr-10" />
            <span class="font-bold font-size-20">Join Zoom Event</span>
          </div>
          <div>Just fill & approve, We will add event to your calendar & Remind you before</div>
        </div>
        <div class="d-flex user-info">
          <div class="text-left flex-1 input-wrapper mr-10">
            <label class="font-bold">Name</label>
            <maryoku-input
              v-model="name"
              v-validate.initial="validations.name"
              inputStyle="username"
              placeholder="Type your name here..."
            ></maryoku-input>
          </div>
          <div class="text-left flex-1 input-wrapper">
            <label class="font-bold">Email</label>
            <maryoku-input
              v-model="email"
              v-validate.initial="validations.email"
              inputStyle="email"
              placeholder="Type email address here..."
            ></maryoku-input>
          </div>
        </div>
        <!-- <md-checkbox v-model="approveAccessCalendar"
          ><span :class="{ 'font-bold': approveAccessCalendar }">I approve access to my calendar</span></md-checkbox
        >
        <div v-if="approveAccessCalendar" class="calendar-type">
          <img :src="`${$iconURL}RSVP/Group 9278.svg`" />
          <md-radio v-model="calendarType" value="outlook">Outlook</md-radio>
          <md-radio v-model="calendarType" value="gmail">Gmail</md-radio>
        </div> -->
      </div>
    </template>
    <template slot="footer">
      <div class="text-center w-100">
        <md-button class="md-red md-bold" @click="setRsvpToZoom" :disabled="!canSet">RSVP TO ZOOM</md-button>
      </div>
    </template>
  </modal>
</template>
<script>
import { Modal, MaryokuInput } from "@/components";
import CalendarEvent from "@/models/CalendarEvent";
export default {
  props: {
    campaign: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Modal,
    MaryokuInput,
  },
  data() {
    return {
      name: "",
      email: "",
      approveAccessCalendar: false,
      calendarType: "outlook",
      validations: {
        name: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    setRsvpToZoom() {
      const guests = [
        {
          name: this.name,
          email: this.email,
          guestNumber: 1,
          isMainGuest: true,
          event: new CalendarEvent({ id: this.campaign.event.id }),
        },
      ];
      this.$emit("setRsvp", { name: this.name, responseEmail: this.email, guests });
    },
  },
  computed: {
    canSet() {
      return this.errors.items.length == 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.user-info {
  padding: 30px 0;
  .input-wrapper {
    width: 50%;
    &:first-child {
      padding-right: 35px;
    }
  }
}
.calendar-type {
  padding-left: 45px;
  img {
    margin-top: -45px;
    margin-right: 20px;
  }
}
</style>