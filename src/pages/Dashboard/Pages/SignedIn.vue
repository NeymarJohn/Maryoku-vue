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
  import SockJS from 'sockjs-client'; //NEW: SockJS & Stomp instead of socket.io
  import Stomp from 'stompjs';

  export default {
    components: {

    },
    methods: {
    },
    created() {
      const that = this;
      const givenToken = that.$route.query.token;
      that.auth.setToken(givenToken);
      that.auth.setHeaders(this);
      that.auth.currentUser(that, true, function() {

        /*const socket = new SockJS(`${process.env.SERVER_URL}/stomp`);
        const client = Stomp.over(socket);

        client.connect({}, () => {
          client.subscribe(`/topic/${that.auth.user.id}`, () => {
            alert('Your session timed out.');
            that.auth.logout(that);
          });
        }, (error) => {
          console.error('unable to connect : ' + error);
        });*/

        let me = that.auth.user.me;
        if (!me.customer.onboarded){
          that.$router.push({path: '/company-form'});
        } else if (!me.onboarded) {
          that.$router.push({path: '/me-form'});
        } else {
          that.$router.push({ path: '/' });          
        }
      });
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
