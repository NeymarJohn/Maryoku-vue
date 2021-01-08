<template>
  <div class="md-layout">
    <div class="md-layout-item" style="text-align: center" v-if="this.messageIndex < 0">
      <img src="/static/img/maryoku-loader.gif" />
      <!-- <img src="https://static-maryoku.s3.amazonaws.com/storage/img/calendar-loader-3.gif" class="text-center" style="width: 64px;"/> -->
      <h2 class="title text-center" slot="title" style="text-align: center">Hi there, one moment please ...</h2>
    </div>
    <div v-else class="md-layout-item font-size-30" style="text-align: center; color: #050505">
      {{ messages[messageIndex] }}
      <div class="mt-4rem">
        <md-button class="md-simple md-red normal-btn" @click="toCreateWorkspace">Create Worspace</md-button>
        <md-button class="md-simple md-red normal-btn" @click="toChooseWorkspace">Choose Workspace</md-button>
      </div>
    </div>
  </div>
</template>
<script>
// import auth from '@/auth';
import SockJS from "sockjs-client"; // NEW: SockJS & Stomp instead of socket.io
import Stomp from "stompjs";
import Model from "@/models/Model";
export default {
  components: {},
  methods: {
    toCreateWorkspace() {
      this.$router.push({ path: "/create-event-wizard" });
    },
    toChooseWorkspace() {
      this.$router.push({ path: "/choose-workspace" });
    },
  },
  created() {
    console.log("signedIn", this.$route.query.token);
    const givenToken = this.$route.query.token;
    this.$store.dispatch("auth/checkToken", givenToken).then(
      (tenantUser) => {
        const tenantId = this.$authService.resolveTenantId();
        this.$authService.setTenant(tenantId);
        if (tenantId.toLowerCase() === "default") {
          if (tenantUser.tenants && tenantUser.tenants.length > 0) {
            this.$router.push({ name: "ChooseWorkspace" });
          } else {
            this.$router.push({ path: "/create-event-wizard" });
          }
        } else {
          this.$gtm.trackEvent({
            event: "user_signed_in", // Event type [default = 'interaction'] (Optional)
            category: "Users",
            action: "signin",
            label: "User Signed In",
            value: this.$store.state.auth.user.email,
            noninteraction: false, // Optional
          });
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
          const firstEvent = this.$route.query.firstEvent;
          let redirectURL = this.$route.query.redirectURL;
          if (redirectURL) {
            redirectURL = atob(redirectURL);
            this.$router.push({ path: `${redirectURL}` });
          } else {
            this.$router.push({ path: "/events" });
          }
          // if (firstEvent) {
          //   // this.$router.push({ path: `/events/${firstEvent}/booking/budget` })
          //   this.$router.push({ path: '/events' })
          // } else if( redirectURL ) {
          //   redirectURL = atob(redirectURL)
          //   this.$router.push({ path: `${redirectURL}` })
          // } else {
          //   this.messageIndex = 0;
          //   // setTimeout(() => {
          //   //   this.$router.push({ path: '/choose-workspace' })

          //   // }, 5000);
          // }
        }
      },
      (error) => {
        this.loading = false;
        this.error = "Invalid email or wrong password, try again.";
      },
    );
  },
  data() {
    return {
      serverURL: process.env.SERVER_URL,
      messageIndex: -1,
      messages: [`Workspace does not exist, create your workspace.`],
    };
  },
};
</script>
<style>
</style>
