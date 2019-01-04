<template>
  <router-view></router-view>
</template>

<script>
export default {

  mounted(){
    let before = new Date();
    if (window.focusEventListener != null){
      window.removeEventListener('focus', window.focusEventListener);
      window.focusEventListener = null;
    }
    window.focusEventListener = window.addEventListener('focus', function(){
      const now = new Date();
      if ((now.getTime() - before.getTime()) >= 300000) {
        document.location.reload(true);
      } else {
        before = new Date();
      }
    });
  }
};
</script>
