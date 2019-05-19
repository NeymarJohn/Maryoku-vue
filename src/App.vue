<template>
  <div>
    <slideout-panel></slideout-panel>
    <router-view></router-view>
  </div>
</template>

<script>
  import auth from '@/auth';
  import Model from '@/models/Model';

  export default {
    data(){
      return {
        auth: auth
      }
    },
    created() {
      let tenantId = document.location.hostname.replace(".262days.com","");
      this.$http.defaults.headers.common.gorm_tenantid = tenantId;
      Model.$http.defaults.headers.common.gorm_tenantid = tenantId;
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
  .slideout.transition36 {
    transition: transform 0.36s ease-out !important;
  }
  .slideout.w100{
    width: 100% !important;
  }
  .slideout.w75{
    width: 75% !important;
  }

  .slideout.w50{
    width: 50% !important;
  }

  .slideout.w25{
    width: 25% !important;
  }

  .slideout.h25{
    height: 25% !important;
  }

  .slideout.h50{
    height: 50% !important;
  }

  .slideout.h75{
    height: 75% !important;
    padding-left: 89px;
  }

  .slideout.h100{
    height: 100% !important;
  }

  .slideout.bg-grey {
    background-color: #EEEEEE !important;
  }
</style>
