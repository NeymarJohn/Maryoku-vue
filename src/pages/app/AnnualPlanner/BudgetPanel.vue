<template>
  <div class="md-layout" style="height: 100%; overflow: hidden;">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

    <md-card style="background-color: #41535E; color: rgb(225, 234,239); height: 100%; margin-top: 0; margin-bottom: 0; margin-right: 0;">
      <md-card-content style="text-align: center;">
        <h5 style="font-size: 1.05em; font-weight: 600; padding: 0; margin: 0;">Total remaining budget</h5>
        <h4 style="font-size: 2.3em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
          <animated-number ref="totalRemainingBudgetNumber" :value="totalRemainingBudget" prefix="$"></animated-number>
        </h4>
        <div style="padding: 16px;"></div>
        <img src="https://cdn1.iconfinder.com/data/icons/charts-and-diagrams-1-1/512/donutchart-512.png"/>
        <div style="padding: 16px;"></div>

        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Remaining budget per employee</h5>
            <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">$285.5</h4>
            <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
          </div>
        </div>

        <div style="padding: 8px;"></div>

        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Annual budget per employee</h5>
            <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">$285.5</h4>
            <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
          </div>
        </div>

        <div style="padding: 8px;"></div>

        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Total annual budget</h5>
            <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">$285.5</h4>
            <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
          </div>
        </div>

        <div style="padding: 8px;"></div>

        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Total events</h5>
            <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">20</h4>
            <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
  import auth from '@/auth';
  import VueElementLoading from 'vue-element-loading';
  import ChartComponent from '@/components/Cards/ChartComponent';
  import moment from 'moment';
  import {
    AnimatedNumber
  } from "@/components";

  export default {
    name: 'budget-panel',
    components: {
      VueElementLoading,
      ChartComponent,
      AnimatedNumber,
    },
    props: {
      month : {
        type: Number
      },
      year: {
        type: String
      }
    },
    data() {

      return {
        ready: false,
        auth: auth,
        isLoading: true,
        totalRemainingBudget: 0
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
