<template>
  <div class="md-layout">
    <div v-if="messageIndex < 0" class="md-layout-item" style="text-align: center">
      <img src="/static/img/maryoku-loader.gif">
      <!-- <img src="https://static-maryoku.s3.amazonaws.com/storage/img/calendar-loader-3.gif" class="text-center" style="width: 64px;"/> -->
      <h2 slot="title" class="title text-center" style="text-align: center">
        Hi there, one moment please ...
      </h2>
    </div>
    <div v-else class="md-layout-item font-size-30" style="text-align: center; color: #050505">
      {{ messages[messageIndex] }}
      <div class="mt-4rem">
        <md-button class="md-simple md-red normal-btn" @click="toCreateWorkspace">
          Create Worspace
        </md-button>
        <md-button class="md-simple md-red normal-btn" @click="toChooseWorkspace">
          Choose Workspace
        </md-button>
      </div>
    </div>
  </div>
</template>
<script>
// import auth from '@/auth';
import eventService from "@/services/event.service";
import CalendarEvent from "@/models/CalendarEvent";
import { USER_TYPE } from "@/constants/user";

export default {
  components: {},
  data() {
    return {
      serverURL: process.env.SERVER_URL,
      messageIndex: -1,
      messages: ["Workspace does not exist, create your workspace."],
    };
  },
  async created() {
    const givenToken = this.$route.query.token;
    let tenantUser = await this.$store.dispatch("auth/checkToken", givenToken);
    const tenantId = this.$authService.resolveTenantId();
    this.$authService.setTenant(tenantId);

    // SET LIVE CHAT INFORMANTION
    if (process.env.NODE_ENV === "production") {
      try {
        window.heap.identify(this.$auth.user.email);
      } catch (e) {
        console.error(e);
      }
      try {
        this.$Tawk.$updateChatUser({
          name: this.$store.state.auth.user.displayName,
          email: this.$store.state.auth.user.email,
        });
      } catch (e) {
        console.error(e);
      }
    }

    /// SET GTM
    this.$gtm.trackEvent({
          event: "user_signed_in", // Event type [default = 'interaction'] (Optional)
          category: "Users",
          action: "signin",
          label: "User Signed In",
          value: this.$store.state.auth.user.email,
          noninteraction: false, // Optional
      });

    const action = this.$route.query.action;
    const eventData = localStorage.getItem("event");
    const noTenant = !tenantUser.tenants || tenantUser.tenants.length === 0;
    const isDefaultTenant = tenantId.toLowerCase() === "default";
    let redirectURL = this.$route.query.redirectURL;

    if (!tenantUser.currentUserType) {
      let userType = this.$route.query.userType;
      if(userType) {
        await this.$store.dispatch("auth/updateProfile", {
          id: tenantUser.id,
          currentUserType: userType,
        });
      }
    }

    if (tenantUser.currentUserType === USER_TYPE.GUEST) {
      let res = await this.$http.get(`${process.env.SERVER_URL}/1/events`, {
        params: {filters: {myEvents: true}},
      });
      let events = res.data;
      if (redirectURL) {
        this.$router.push({path: `${redirectURL}`, query: {redirect: true}});
      } else if (events.length > 0) {
        this.$router.push({path: `/user-events/${events[0].id}/booking/choose-vendor`});
      }
    }
    let tenantIdExt = this.$authService.resolveStaging();
    tenantIdExt = tenantIdExt ? `.${tenantIdExt}` : "";
    if (noTenant && !action) {
      // WHEN PLANNER STARTD BY SIGNIN
      this.$router.push({ path: `/create-event-wizard?action=${action}` });
    } else if (noTenant && action) {
      // WHEN PLANNER STAARTED BY CREATE EVENT
      this.$router.push({ path: `/create-workspace?action=${action}` });
    } else if (!noTenant && isDefaultTenant) {
      this.$router.push({ path: `/choose-workspace?action=${action}` });
    } else if (!noTenant && !isDefaultTenant && action) {
      eventService
              .saveEvent(eventData)
              .then((event) => {
                const callback = btoa(`events/${event.id}/booking/concept`);
                location.href = `${document.location.protocol}//${this.workspace || "preprod" }${tenantIdExt}.maryoku.com:${document.location.port}/#/signedin?token=${givenToken}&redirectURL=${callback}`;
              })
              .catch((err) => {
                console.error(err);
              });
    } else {
      let redirectURL = this.$route.query.redirectURL;
      if (redirectURL) {
        redirectURL = atob(redirectURL);
        this.$router.push({path: `${redirectURL}`});
      } else {
        if (tenantUser.currentUserType === USER_TYPE.PLANNER) { // get last event
          let events = await CalendarEvent.get();
          if (events.length > 0) {
            const gotoLink = eventService.getFirstTaskLink(events[0]);
            this.$router.push({path: gotoLink});
          } else this.$router.push({path: "/create-event-wizard"});
        } else if (tenantUser.currentUserType === USER_TYPE.GUEST) { // get last customer event
          let res = await this.$http.get(`${process.env.SERVER_URL}/1/events`, {
            params: {filters: {myEvents: true}},
          });
          let events = res.data;
          if (events.length > 0) {
            this.$router.push({path: `/user-events/${events[0].id}/booking/choose-vendor`});
          }
        }
      }
    }

  },
  methods: {
    toCreateWorkspace() {
      this.$router.push({ path: "/create-event-wizard" });
    },
    toChooseWorkspace() {
      this.$router.push({ path: "/choose-workspace" });
    },
  },
};
</script>
<style>
</style>
