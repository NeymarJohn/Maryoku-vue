<template>
  <modal class="sync-calendar-modal">
    <template slot="header">
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div>
        <div>Choose your email account:</div>
        <div class="mt-30">
          <md-radio v-model="emailAccount" class="mr-60 md-purple" value="google">
            <img :src="`${$iconURL}common/google.svg`" style="margin-top: -10px; width: 40px" />
          </md-radio>
          <md-radio v-model="emailAccount" value="outlook" class="md-purple">
            <img :src="`${$iconURL}common/outlook.svg`" style="margin-top: -10px; width: 40px" />
          </md-radio>
        </div>
        <md-button class="md-outlined md-simple md-vendor mt-20 sync_button" @click="syncCalendar">Sync</md-button>
      </div>
    </template>
    <template slot="footer"> </template>
  </modal>
</template>
<script>
import { Modal, MaryokuInput } from "@/components";
import { convertTimezoneName } from "@/utils/helperFunction";
import moment from "moment-timezone";
import { addOutlookCalendarEvent } from "@/auth/msAuth.js";

// Client ID and API key from the Developer Console
const CLIENT_ID = "1016422269325-8bhm78m73gebu9k38nj61nr2246r1a1h.apps.googleusercontent.com";
const API_KEY = "AIzaSyC4qrUfpIKpm5yZ1p7wGJAxa77PJwlgKD8";
// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export default {
  components: {
    Modal,
    MaryokuInput,
  },
  props: {
    screen: {
      type: Number,
      default: 1,
    },
    campaign: {
      type: Object,
      default: () => {},
    },
    events: [Array],
  },
  created() {
    this.api = gapi;
    this.initClient();
  },
  data() {
    return {
      showZoomLink: false,
      showCalendar: false,
      emailAccount: "outlook",
      authorized: false,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    setRsvpToZoom() {
      this.$emit("setRSVP");
    },
    initClient() {
      let vm = this;

      vm.api.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then((_) => {
          // Listen for sign-in state changes.
          vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
        });
    },

    handleGoogleAuthClick() {
      Promise.resolve(this.api.auth2.getAuthInstance().signIn()).then((_) => {
        this.authorized = true;
        this.events.forEach((e) => {
          var event = {
            summary: e.customer.name,
            location: e.location,
            description: "",
            start: {
              dateTime: moment(eval.startTime).toDate(),
              timeZone: "GTM",
            },
            end: {
              dateTime: moment(e.endTime).toDate(),
              timeZone: "GTM",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          const vm = this;
          request.execute(function (event) {
            console.log(event.htmlLink);
          });
        });
      });
    },
    handleMsAuthClick() {
      this.events.forEach((e) => {
        let newEvent = {
          subject: e.customer.name,
          start: {
            dateTime: moment(e.startTime).toDate(),
            timeZone: "GMT",
          },
          end: {
            dateTime: moment(e.startTime).toDate(),
            timeZone: "GMT",
          },
        };
        const vm = this;
        addOutlookCalendarEvent(newEvent)
          .then(() => {})
          .catch((error) => {});
      });
    },
    syncCalendar() {
      if (this.emailAccount === "google") {
        this.handleGoogleAuthClick();
      } else if (this.emailAccount === "outlook") {
        this.handleMsAuthClick();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.sync-calendar-modal {
  .header-text {
    line-height: 1.5em;
  }
  .sync_button {
    width: 250px;
    height: 50px;
    border: solid 1px #641856;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  }
}
</style>