<template>
  <div class="md-layout" style="height: 100%; overflow: hidden; padding: 0; margin: 0; padding-top: 15px; ">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

    <md-card style="padding: 0; margin: 0; height: 100%; min-height: 100%;">
      <md-card-content style="text-align: center; padding: 0; margin: 0; height: 100%;min-height: 100%; overflow: hidden;">

        <md-button class="md-simple md-round year-button disabled" style="font-size: 18px !important; font-weight: 500; padding: 8px; margin-top: 8px;">Events</md-button>

        <hr style="margin-top: 0; margin-left: 18px; margin-right: 18px; border-color: lightgray; border-top: none; border-left: none; border-right: none;" class="divider"/>

        <md-list class="md-triple-line md-dense" style="overflow: auto; height: 88%; min-height: 88%;">

          <md-list-item v-for="(event, idx) in calendarEvents" style="cursor: pointer;">
            <md-button class="md-just-icon md-md md-round md-success" style="margin-right: 8px;">1</md-button>

            <div class="md-list-item-text">
              <span style="font-weight: 500;">Thanks Giving</span>
              <span class="small text-gray">August 18, 2019</span>
            </div>
          </md-list-item>

        </md-list>

      </md-card-content>
    </md-card>
  </div>
</template>

<script>
  import auth from '@/auth';
  import VueElementLoading from 'vue-element-loading';


  export default {
    name: 'month-events-panel',
    components: {
      VueElementLoading,
    },
    props: {
      calendarEvents: {
        type: Object
      }
    },
    data() {

      return {
        ready: false,
        auth: auth,
        isLoading: true,
        months: this.$moment.months(),
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
