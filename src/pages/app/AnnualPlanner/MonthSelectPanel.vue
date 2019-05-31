<template>
  <div class="md-layout" style="height: 100%; overflow: hidden; padding: 0; margin: 0; padding-top: 15px;">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

    <md-card  class="md-card" style="padding: 0; margin: 0; height: 100%;">
      <md-card-header class="md-card-header md-card-header-text md-card-header-rose">
        <div class="card-text" style="display: flex;">
          <router-link :to="{name: 'AnnualPlannerYearMonth', params: {year: currentYear-1}}" style="width: 100%;">
            <md-button class="md-simple chevron-circle md-sm md-just-icon md-round"><i class="fa fa-chevron-left fa-2x"></i></md-button>
          </router-link>
          <md-button class="md-simple md-round year-button" style="color: #FFF !important; font-size: 21px !important; font-weight: 500; padding: 0;">{{currentYear}}</md-button>
          <router-link :to="{name: 'AnnualPlannerYearMonth', params: {year: currentYear+1}}" style="width: 100%;">
            <md-button class="md-simple chevron-circle md-sm md-just-icon md-round" style="font-weight: 100;"><i class="fa fa-chevron-right"></i></md-button>
          </router-link>
        </div>
      </md-card-header>
      <md-card-content style="width: 100%; padding: 0; margin: 0;text-align: center; vertical-align: middle;">
        <hr style="margin-top: 25px; margin-left: 18px; margin-right: 18px; border-color: lightgray; border-top: none; border-left: none; border-right: none;" class="divider"/>

        <md-list style="width: 100%; padding: 0; margin: 0;">
          <md-list-item v-for="(month, idx) in months" :key="month" :ref="`month_${idx}`" :class="{'selected-month' : currentMonth === idx+1, 'month' : currentMonth !== idx+1}">
            <router-link :to="{name: 'AnnualPlannerYearMonth', params: {year: currentYear, month: idx+1}}" style="width: 100%;">
              <div :class="{'selected-month-item' : currentMonth === idx+1, 'item' : currentMonth !== idx+1}">{{month}} <div class="pull-right" :ref="`month_${idx}_count`">{{monthCounts[idx+1]}}</div></div>
            </router-link>
          </md-list-item>

        </md-list>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
  // import auth from '@/auth';
  import VueElementLoading from 'vue-element-loading';


  export default {
    name: 'month-select-panel',
    components: {
      VueElementLoading,
    },
    props: {
      currentYear: Number,
      currentMonth : Number,
      monthCounts: Object,
    },
    data() {
      return {
        ready: false,
        // auth: auth,
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
      prevYear() {
        this.currentYear--
      },
      nextYear() {
        this.currentYear++
      }
    },
    computed: {

    },
    watch: {

    }
  };
</script>
<style scoped lang="scss">
  $btn-color: #fff;

  .chevron-circle {

    i {
      border: 1.5px solid #fff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      color: #fff !important;
      align-items: center;
    }
  }
</style>
