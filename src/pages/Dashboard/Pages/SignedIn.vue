<template>
  <div class="md-layout">
    <div class="md-layout-item" style="text-align: center;">
      <img src="static/img/calendar-loader-3.gif" class="text-center" style="width: 64px;"/>
      <h2 class="title text-center" slot="title" style="text-align: center;">
        Hi there, one moment please ...
      </h2>
    </div>
  </div>
</template>
<script>
import auth from "@/auth";
export default {
  components: {

  },
  methods: {
  },
  created() {
    const that = this;
    setTimeout(() => {
      const givenToken = that.$route.query.token;
      that.auth.setToken(givenToken);
      that.auth.setHeaders(this);
      that.auth.currentUser(that, true);
        this.$router.push({ path: '/' });
    },2500)
  },
  data() {
    return {
      serverURL: process.env.SERVER_URL,
      auth: auth
    };
  }
};
</script>
<style>
</style>
