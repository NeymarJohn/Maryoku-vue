<template>
  <modal class="sync-calendar-modal">
    <template slot="header">
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div>
        <img :src="`${$iconURL}common/sync-calendar-purple.svg`" />
        <div class="font-size-30 font-bold mt-20">Calendar Sync</div>
        <div class="mt-20">Select the calendar you want to sync with</div>
        <div class="mt-30 d-flex justify-content-center mb-30">
          <div
            @click="emailAccount = 'google'"
            class="calendar-selector mr-40"
            :class="{ active: emailAccount === 'google' }"
          >
            <div>
              <img :src="`${$iconURL}common/google.svg`" style="margin-top: -10px; width: 40px" />
              <div class="font-bold mt-20">Google</div>
            </div>
          </div>
          <div
            @click="emailAccount = 'outlook'"
            class="calendar-selector"
            :class="{ active: emailAccount === 'outlook' }"
          >
            <div>
              <img :src="`${$iconURL}common/outlook.svg`" style="margin-top: -10px; width: 40px" />
              <div class="font-bold mt-20">Outlook</div>
            </div>
          </div>
        </div>
        <div class="text-left tips">
          <div class="mb-20 d-flex">
            <img :src="`${$iconURL}common/hint.svg`" class="mr-10" />
            <div>Sync any changes including adding, updating and deleting from your Calendar to Maryoku Calendar.</div>
          </div>
          <div class="d-flex">
            <img :src="`${$iconURL}common/hint.svg`" class="mr-10" />
            <div>
              Sync is one-way - any changes you make to your Marioko calendar will not appear in your other calendars
            </div>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-simple md-vendor mt-20" @click="close">Cancel</md-button>
      <md-button class="md-vendor mt-20 sync_button" @click="syncCalendar">Sync</md-button></template
    >
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
  .tips {
    max-width: 500px;
  }
  .calendar-selector {
    background-color: #f3f7fd;
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    &.active {
      background-color: #641856;
      color: white;
    }
  }
}
</style>