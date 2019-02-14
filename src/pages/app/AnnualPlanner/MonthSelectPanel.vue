<template>
  <div class="md-layout" style="height: 100%; overflow: hidden; padding: 0; margin: 0; padding-top: 15px;">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

    <md-card  style="overflow: auto; padding: 0; margin: 0; height: 100%;">
      <md-card-content style="width: 100%; padding: 0; margin: 0;text-align: center; vertical-align: middle;">

        <md-button class="md-simple md-sm md-just-icon md-round" style="height: 55px;"><i class="fa fa-chevron-left fa-2x"></i></md-button>
        <md-button class="md-simple md-round year-button" style="font-size: 21px !important; height: 55px; font-weight: 500; padding: 0;">{{currentYear}}</md-button>
        <md-button class="md-simple md-sm md-just-icon md-round" style="height: 55px; font-weight: 100;"><i class="fa fa-chevron-right"></i></md-button>

        <hr style="margin-top: 0; margin-left: 18px; margin-right: 18px; border-color: lightgray; border-top: none; border-left: none; border-right: none;" class="divider"/>

        <md-list style="width: 100%; padding: 0; margin: 0;">
          <md-list-item v-for="(month, idx) in months" :key="month" :ref="`month_${idx}`" :class="{'selected-month' : currentMonth === idx+1, 'month' : currentMonth !== idx+1}">
            <router-link :to="{name: 'AnnualPlannerYearMonth', params: {year: currentYear, month: idx+1}}" style="width: 100%;">
              <div :class="{'selected-month-item' : currentMonth === idx+1, 'item' : currentMonth !== idx+1}">{{month}} <div class="pull-right" :ref="`month_${idx}_count`">0</div></div>
            </router-link>
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
    name: 'month-select-panel',
    components: {
      VueElementLoading,
    },
    props: {
      currentYear: Number,
      currentMonth : Number
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
