<template>
  <div class="md-layout">
    <div class="md-layout-item" style="text-align: center;">
      <img src="static/img/calendar-loader-3.gif" class="text-center" style="width: 64px;"/>
      <h2 class="title text-center" slot="title" style="text-align: center;">
        One moment please ...
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
      this.auth.logout(this);
    },1500)
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
