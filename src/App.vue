<template>
  <div>
    <slideout-panel></slideout-panel>
    <router-view></router-view>
  </div>
</template>

<script>
  import auth from '@/auth';

  export default {
    data(){
      return {
        auth: auth
      }
    },
    mounted(){
      let before = new Date();
      const that = this;
      if (window.focusEventListener != null){
        window.removeEventListener('focus', window.focusEventListener);
        window.focusEventListener = null;
      }
      window.focusEventListener = window.addEventListener('focus', function(){
        const now = new Date();
        if ((now.getTime() - before.getTime()) >= 300000) {
          that.auth.currentUser(that,true);
        } else {
          before = new Date();
        }
      });
    }
  };
</script>
<style lang="scss">
  .slideout {
    width: 75% !important;
  }
</style>
