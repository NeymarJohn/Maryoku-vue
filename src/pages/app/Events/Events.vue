<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
      <div class="md-layout-item md-size-25">      
      <md-card class="md-card-profile">
      <div class='logo-block'>
      <div class='event-planer-logo'>
            <md-icon class='company-logo'>date_range</md-icon>
         </div>
         <div class='event-title'> Event Information
         </div>
         <div>
         </div>
         </div>
        <md-card-content>
         <div class="md-layout-item ">
         <div class="control-main-block">
             <div class='company-control-logo'>
             <div class='company-logo-block'>
            <md-icon class='company-logo'>create</md-icon>
            </div>
         </div>
           <div class='company-control-logo'>
           <div class='company-logo-block'>
            <md-icon class='company-logo'>sms</md-icon>
            </div>
         </div>
           <div class='company-control-logo'>
           <div class='company-logo-block'>
            <md-icon class='company-logo'>person</md-icon>
            </div>
         </div>
         </div>      
        <div>
          <h5 style="font-size: 1.05em; font-weight: 600; padding: 0; margin: 0;">Total remaining budget</h5>
          <h4 class="title" style="font-size: 2.3em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
            <animated-number ref="totalRemainingBudgetNumber" value="1232" prefix="$"></animated-number>
          </h4>

          <div style="display: grid;margin-top: 18px;">
            <chart-component
              :chart-data="pieChart.data"
              :chart-options="pieChart.options"
              chart-type="Pie"
            style="grid-column: 1; grid-row: 1; color:red"/>
            <animated-number class="percentage" ref="percentageNumber" value="234" suffix="%"></animated-number>
          </div>
        </div>
        </div>
          </md-card-content>
        </md-card>
        </div>
        <div class="md-layout-item">
        </div>
  </div>
</template>

<script>
//MAIN MODULES
import ChartComponent from '@/components/Cards/ChartComponent';
import auth from '@/auth';
import moment from 'moment';
import VueElementLoading from 'vue-element-loading';

//COMPONENTS
import {AnimatedNumber} from "@/components";
import Icon from '@/components/Icon/Icon.vue'



  export default {
    components: {
      VueElementLoading,
      ChartComponent,
      AnimatedNumber,
      Icon
    },

    data() {
      return {
        auth: auth,
        product3: "static/img/shutterstock_289440710.png",
        recentEvents: [],
        upcomingEvents: [],
        isLoading: false,
      };
    },
    computed: {
      pieChart() {
        return {
          data: {
            labels: [" ", " "], // should be empty to remove text from chart
            series: ["100", "70"]
          },
          options: {
            padding: 0,
            height: 120,
            donut: true,
            donutWidth: 12
          }
        }
      },
    },
  }


</script>

<style lang="scss">
 .percentage {
  padding-bottom: 8px;
  padding-left: 5px;
  grid-column: 1;
  grid-row: 1;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.5rem;
  font-weight: 700;
  color: #7DC0D9;
}
.logo-block{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0px 15px;
    margin: -20px 0px 20px 0px;
    .event-planer-logo{
      background:#eb3e79;
      width: 64px;
      height: 64px;
      display:flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;  
        .company-logo{
          color:white !important;
        }
    }
    .event-title{
      font-family: 'Roboto';
      font-size: 18px;
      font-weight: 300;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.33;
      letter-spacing: normal;
      text-align: left;
      color: #000000;
    }
}
.control-main-block{
          display: flex;
          justify-content: center;
      .company-logo-block{
          border: 2px solid #8b8b8b;
          padding: 7px;
          border-radius: 50%;
          margin: 0px 5px
      }
}
 </style>
