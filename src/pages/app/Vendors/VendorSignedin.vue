<template>
  <div class="md-layout">
    <div class="md-layout-item" style="text-align: center">
      <img src="/static/img/maryoku-loader.gif">
      <h2 slot="title" class="title text-center" style="text-align: center">
        Hi there, one moment please ...
      </h2>
    </div>
  </div>
</template>
<script>
import eventService from "@/services/event.service";
import Vendors from "@/models/Vendors";
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
    const vendorId = this.$route.query.vendorId;
    this.$store.dispatch("auth/checkToken", givenToken).then(
      (tenantUser) => {
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
        // SET VENDOR Tenant
        if (vendorId) {
            new Vendors({ id: vendorId, tenantUser: { id: tenantUser.id }, isEditing: false }).save().then(res => {
                this.$router.push("/vendor/profile/settings");
            });
            return;
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
        this.$router.push("/vendor/profile/settings");
      },
      (error) => {
        this.loading = false;
        this.error = "Invalid email or wrong password, try again.";
      },
    );
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
