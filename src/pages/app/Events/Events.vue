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
        <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
        <div class="md-layout-item md-layout md-gutter">
        <div class="md-layout-item">
        <div class='md-caption title-text'>Event Occasion</div>
        <div class='md-caption title-text'>Date</div>
        <div class='md-caption title-text'>Start Time</div>
        <div class='md-caption title-text'>Duration</div>
        <div class='md-caption title-text' >Geography</div>
        <div class='md-caption title-text'>Participants</div>
        <div class='md-caption title-text'>Participant Type</div>
        
        </div>
        <div class="md-layout-item">
        <div class='md-caption title-text'>MLK Day</div>
        <div class='md-caption title-text'>Dec 20, 2019</div>
        <div class='md-caption title-text'>10:00 AM</div>
        <div class='md-caption title-text'>6 Hours</div>
        <div class='md-caption title-text' >New York</div>
        <div class='md-caption title-text'>74</div>
        <div class='md-caption title-text'>With Spouses</div>       
        </div>
      </div>
      <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
        <div class="md-layout-item">
          <h5 class='title-budget-main'>Total remaining budget</h5>
          <h4 class="title" style="font-size: 2.3em; font-weight: 500; padding: 0; margin: 0; color: rgb(33, 201, 152, 0.8);">
            <animated-number ref="totalRemainingBudgetNumber" value="1232" prefix="$"></animated-number>
          </h4>

          <div style="display: grid;margin-top: 18px; color: rgb(33, 201, 152, 0.8);">
            <chart-component
              :chart-data="pieChart.data"
              :chart-options="pieChart.options"
              chart-type="Pie"
            style="grid-column: 1; grid-row: 1; color:red"/>            
            <animated-number class="percentage" ref="percentageNumber" value="234" suffix="%"></animated-number>
          </div>
        </div>
        </div>
        </div>
        <div class="md-layout-item">
        <div>
        <div class='md-caption title-text'>
        Remaining budget per employee
        </div>
        <div class='md-caption title-text title-budget-prise'>
        $22
        </div>
        </div>
        <div>
        <div class='md-caption title-text'>
        Budget per employee
        </div>
        <div class='md-caption title-text title-budget-prise'>
        $22
        </div>
        </div>
        <div>
        <div class='md-caption title-text '>
        Total budget for the event
        </div>
        <div class='md-caption title-text title-budget-prise'>
        $22
        </div>
        </div>      
        </div>         
          </md-card-content>
        </md-card>
        </div>
        <div class="md-layout-item md-size-75 block-flex">
        <div class="md-layout-item md-size-75">
        main block
        </div>
        <div class="md-layout-item md-size-25">
              <md-button class='button-event-creatig' @click="openEventModal()">
                Create New Event
            </md-button>
        </div>       
        </div>
        <div class="md-layout-item md-size-100 block-flex copyright-block">
        <div>
         <md-button class="footer-link-button" v-for='(item, index) in footerLink' :key="index">
                {{item.title}}
            </md-button>
         </div>
         <div>
         <p>{{`&copy; ${new Date().getFullYear()}`}} <span class='copyright'>Creative Tim</span>{{`, made with love for a better web`}}</p>
         </div>   
        </div>
        <event-modal
              @refresh-events="refreshEvents"
              ref="eventModal">
      </event-modal>  
  </div>
</template>

<script>
//MAIN MODULES
import ChartComponent from '@/components/Cards/ChartComponent';
import auth from '@/auth';
import moment from 'moment';
import VueElementLoading from 'vue-element-loading';
import {mapMutations} from 'vuex';

//COMPONENTS
import {AnimatedNumber} from "@/components";
import Icon from '@/components/Icon/Icon.vue'
import EventModal from './EventModal/';

  export default {
    components: {
      VueElementLoading,
      ChartComponent,
      AnimatedNumber,
      Icon,
      EventModal
    },

    data() {
      return {
        auth: auth,
        product3: "static/img/shutterstock_289440710.png",
        recentEvents: [],
        upcomingEvents: [],
        isLoading: false,
        footerLink:[{title:"HOME"},{title:"COMPANY"},{title:"PORTFOLIO"},{title:"BLOG"},]
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
    methods: {
     ...mapMutations('AnnualPlannerVuex', ['setEventModal', 'setEditMode', 'setModalSubmitTitle', 'setEventModalAndEventData', 'setEventDate', 'setNumberOfParticipants']),
     openEventModal() {
        this.setEventModal({ showModal: true });
        this.setModalSubmitTitle('Save');
        this.setEditMode({ editMode: false });
        this.setNumberOfParticipants({numberOfParticipants: this.auth.user.customer.numberOfEmployees});
      },
      refreshEvents() {
        
      }
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
  color: rgba(33, 201, 152, 0.8)
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
.title-text{
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: normal;
  text-align: left;
  color: #959595;
}
.title-budget-main{
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
}
.title-budget-prise{
    color: rgba(33, 200, 152, 0.8)!important;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2;
}
.block-flex{
  display: flex;
}
.button-event-creatig .md-ripple{
  background-color: #00bcd4;
}
.footer-link-button .md-ripple{
  color: #89229b;
  background-color: rgba(240, 240, 240, 1);
}
.copyright{
  color:#9c27b0
}
.copyright-block{
  justify-content: space-between;
}
 </style>
