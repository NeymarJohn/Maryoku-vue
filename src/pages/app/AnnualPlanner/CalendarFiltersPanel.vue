<template>
  <div class="md-layout" style="height: 100%; overflow: hidden; padding: 0; margin: 0;">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

    <md-card style="padding: 0; margin: 0;">
      <md-card-content>Filters</md-card-content>
    </md-card>
  </div>
</template>

<script>
  import auth from '@/auth';
  import VueElementLoading from 'vue-element-loading';


  export default {
    name: 'calendar-filters-panel',
    components: {
      VueElementLoading,
    },
    props: {

    },
    data() {

      return {
        ready: false,
        auth: auth,
        isLoading: true
      }
    },
    created() {

    },
    mounted(){
      this.ready = true;
      this.isLoading = false;
    },
    methods: {

    },
    computed: {

    },
    watch: {

    }
  };
</script>
<style lang="scss">

</style>
