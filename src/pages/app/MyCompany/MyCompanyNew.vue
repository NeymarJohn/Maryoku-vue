<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-30">
      <md-card class="md-card-profile">       
        <md-card-content>
          <div class="md-layout">
          <div class='company-view-common-logo_block'>
          <img class="company-logo" :src="company.logo" style="width: 80%; height: 80%;">
            <div class='company-name-block'>
              <h4 class="title text-gray" style="font-weight: 500;">{{company.companyName}}</h4>
              <md-button class="md-rose md-sm">Edit Profile</md-button>
            </div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="md-layout">
                <div class="md-layout-item md-size-50" style="text-align: left;">
                  <h5 class="title text-bold text-gray info-text-size">Main Office</h5>
                </div>
                <div class="md-layout-item md-size-50" style="text-align: left;">
                  <h5 class="title info-text-size">{{company.mainOffice}}</h5>
                </div>

                <div class="md-layout-item md-size-50" style="text-align: left;">
                  <h5 class="title text-bold text-gray info-text-size">Number of Employees</h5>
                </div>
                <div class="md-layout-item md-size-50" style="text-align: left;">
                  <h5 class="title info-text-size">{{company.numberOfEmployees}}</h5>
                </div>

                <div class="md-layout-item md-size-50" style="text-align: left;">
                  <h5 class="title text-bold text-gray info-text-size">Industry</h5>
                </div>
                <div class="md-layout-item md-size-50" style="text-align: left;">
                  <h5 class="title info-text-size">{{company.industry}}</h5>
                </div>
              </div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="header text-bold text-gray " style="text-align: left; margin-bottom: 8px;">Contact Information</div>
              <div class="md-layout">
                <div class="md-layout-item md-size-100" style="text-align: left; display: flex;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">pin_drop</md-icon><div class='company-wrap-block'>{{company.address}}</div> 
                </div>
                <div class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">call</md-icon>{{company.phone}}
                </div>

                <div class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">mail_outline</md-icon>{{company.email}}
                </div>

                <div class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">web_asset</md-icon>{{company.domain}}
                </div>
              </div>
            </div>

            <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class='company-branch_block'>
                <div class="header text-bold text-gray " style="text-align: left; margin-bottom: 8px;">Branches</div>
                  <div @click.prevent='onShowInput($event)'><md-icon  class='branch-add_icon'>add</md-icon>
                </div>
              </div>
              
              <div v-for="item of company.branches" >              
                <div  style="text-align: left;  display: flex; align-items: center;align-items: center; justify-content: space-between;">
                  <md-icon class="branch-add_icon" style="margin-right: 12px; margin-bottom: 12px;">pin_drop</md-icon><div class='company-wrap-block'> {{item}}</div>
                  <div  class='event-add-new-date-delete_button' @click.prevent='deleteBranch(item)'><md-icon  class='event-add_icon'>delete</md-icon></div>
                </div>                                          
              </div>
              
              <div v-show='showSearch'>
              <form @submit.prevent='addIndustry' action="#">
               <InputText                 
                labelStyle='company_label_input'
                label='Branches address'
                id='branches_getter'               
                name='branch_address'
                :value='branch_address'
                :onChange='onChange'                             
                
        />        
        </form>
        </div>
            </div>

            <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="header text-bold text-gray " style="text-align: left; margin-bottom: 8px;">Customer Infromation</div>

            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-33">
      <div class='chart-box'>
        <md-card-content>
        <div class='chart-title'>
          <div class="title text-bold">Number of events</div>
          <div class="company-button-filter-block">
          <ButtonDiv text='Yearly' class='button-filter'  />
          <ButtonDiv text='Monthly' class='button-filter'   :onClick='onChangeFilter'/>
          </div>          
        </div>
        <div class='filter-block' v-if='showFilter'>
        <div class='filter-datepicker'>
             <Datepicker                 
                label='From'                
                :value='from'
                name='from'
                :onChange='onChange'                
        />
        </div>
        <div class='filter-datepicker'>
         <Datepicker                
                label='To'                
                :value='to'
                name='to'
                :onChange='onChange'                
        />
        </div>
          </div>  
          <canvas id="number_of_events_chart" width="350" height="150"></canvas>
        </md-card-content>
      </div>
      <md-card>
        <md-card-content>
          <div class="title text-bold">Average number of participants per event</div>
          <div>
          <ControlPanel controlBlockStyle="control-panel-block-participants"/>
          </div>
          <div>
          <LineIndicator
            v-for="item in participants"
           :key="item.total"
           leftIndicatorStyle='left-side-indicator-participants'
           rightIndicatorStyle ='right-side-indicator' 
           :total='item.total'
           :typeEvent='item.typeEvent' 
           :eventDate='item.eventDate'   
           :currentValue='item.currentValue'/>
          </div>
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-content>
          <div class="title text-bold">Indoor VS Outdoor events</div>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-33">
      <md-card>
        <md-card-content>
          <div class="title text-bold">Attendants satisfaction rate</div>
          <div>
          <ControlPanel controlBlockStyle="control-panel-block-rate"/>
          </div>
          <div>
          <LineIndicator
           v-for="item in rate"
           :key="item.total"
           leftIndicatorStyle='left-side-indicator-rate'
           rightIndicatorStyle ='right-side-indicator' 
           :total='item.total'
           :categoryEvent="item.category"            
           :currentValue='item.currentValue'
           isRate
           />
          </div>
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-content>
          <div class="title text-bold">Average event cost per employee</div>
          <canvas id="number_of_participants_chart" width="350" height="150"></canvas>           
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
//MAIN MODULES
import {mapGetters} from 'vuex';
import Chart from 'chart.js';
  
//COMPONENTS
import { Tabs, NavTabsCard } from "@/components";
import MyCompanyDashboard from "src/pages/app/MyCompany/MyCompanyDashboard.vue";
import MyCompanyApprovals from "src/pages/app/MyCompany/MyCompanyApprovals.vue";
import MyCompanyProfile from "src/pages/app/MyCompany/MyCompanyProfile.vue";
import MyCompanyBilling from "src/pages/app/MyCompany/MyCompanyBilling.vue";
import MyCompanySettings from "src/pages/app/MyCompany/MyCompanySettings.vue";
import InputText from '@/components/Inputs/InputText.vue';
import ButtonDiv from '@/components/Button/ButtonDiv.vue';
import Button from '@/components/Button/Button.vue';
import ControlPanel from '@/components/Button/ControlPanel.vue';
import LineIndicator from '@/components/Chart/LineIndicator.vue';
import CustomerFile from '@/models/CustomerFile';
import Datepicker from '@/components/Datepicker/Datepicker.vue';


  

  export default {
    components: {
      Tabs,
      NavTabsCard,
      MyCompanyDashboard,
      MyCompanyApprovals,
      MyCompanyProfile,
      MyCompanyBilling,
      MyCompanySettings,
      InputText,
      ButtonDiv,
      Button,
      ControlPanel,
      LineIndicator,
      Datepicker
    },
    mounted:function(){
      const branch =document.getElementById('branches_getter');             
      this.autocomplete = new google.maps.places.Autocomplete(branch ,{types: ['geocode']}); 
      CustomerFile.get().then(res=>console.log(res)).catch(e=>console.log(e))
      var ctx = document.getElementById("number_of_events_chart");      
      var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["2014", "2015", "2016", "2017", "2018", "2019"],
        datasets: [{
            label: '# of Events',
            data: [2, 5, 7, 9, 12, 15],
            backgroundColor: [                
                'rgba(255, 255, 255, 0.2)',                
            ],
            borderColor: [                
                '#71c278',                
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
 var chart2 = document.getElementById("number_of_participants_chart");
      var myChart = new Chart(chart2, {
    type: 'line',
    data: {
        labels: ['Jan', "Feb", "Mar", "Apr", "May", "June"],
        datasets: [{
            label: '# of Events',
            data: [80, 125, 145, 60, 92, 57],
            backgroundColor: [                
                'rgba(255, 255, 255, 0.2)',                
            ],
            borderColor: [                
                '#26cfa0',                
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
    },
    data() {
      return {
        firstTabs: [
          {
            tab: 'Sign contract for "What are conference organizers afraid of?"'
          },
          {
            tab: "Lines From Great Russian Literature? Or E-mails From My Boss?"
          },
          {
            tab:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit"
          }
        ],
        branch_address:'',
        showSearch:false,
        showFilter:false,
        rate:[{category:'Space/Location',total:'304',currentValue:'39'},{category:'Catering',total:'400',currentValue:'167'},{category:'Content',total:'600',currentValue:'300'},{category:'Giveaway',total:'246',currentValue:'230'}],
        participants:[{typeEvent:'Comapany Trainig', eventDate:'August 19,20018', total:'324',currentValue:'23'},{typeEvent:'Outreach Program', eventDate:'August 12,20018',total:'543',currentValue:'167'},{typeEvent:'Development Workshop', eventDate:'August 23,20018',total:'400',currentValue:'323'},{typeEvent:'Meeting', eventDate:'August 27,20018',total:'434',currentValue:'89'}],
        from:'',
        to:'',
        monthValue:[{month:'Jan', events:'34'}, {month:'Feb', events:'41'}, {month:'Mar', events:'24'}, {month:'Apr', events:'14'}, {month:'May', events:'34'}, {month:'Jun', events:'14'}, {month:'Jul', events:'24'}, {month:'Aug', events:'34'},{month:'Sep', events:'14'} ,{ month:'Oct', events:'44'}, {month:'Nov', events:'14'}, {month:'Dec', events:'34'}]
      };
    },
    computed:{
      ...mapGetters({
        company:'user/getCompany'
      }),
       getMonth(){
         return this.monthValue.map(item=>item.month)
       },
       getEvents(){
         return this.monthValue.map(item=>item.events)
       } 
}    
    ,
    methods: {
      onSelect: function(items) {
        this.selected = items;
      },
       onChange:function(value, name){                    
                 this[name]=value
                 value.toString().split(' ')
                 console.log(value.toString().split(' '))
                 console.log(name,value)                                    
         },
         onShowInput:function(value, name){          
           this.showSearch=!this.showSearch
         }
      ,addIndustry: function(value, name){                                  
                 this.showSearch=!this.showSearch                
                 this.$store.dispatch("user/sendIndustry",this.branch_address)                    
         },
         onChangeFilter:function(){                     
           this.showFilter=!this.showFilter           
         },
         deleteBranch(item){           
            this.$store.dispatch("user/deleteBranchToCompany",item)
         }

    }
  };
</script>
<style>
  .text-bold {
    font-weight: 600;
  }
  .info-text-size {
    font-size: 14px;
    margin-top: 12px;
  }
  .company-view-common-logo_block{
    display:flex;
    justify-content: space-between;    
  }
   .company-logo{
            width: 40% !important;
            height: 100% !important;
 }
 .company-branch_block{
   display:flex;
   justify-content: space-between  
 }
 .branch-add_icon{
  margin:0;
  cursor: pointer;
}
.company-name-block{

}
.button-filter{
  text-align: center;
    padding: 0px 6px;
    background: #25d0a2;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin:5px
}
.company-button-filter-block{
      display: flex;   
    justify-content: flex-end;
}
.company-wrap-block{
    white-space: nowrap;
    overflow: hidden;    
    text-overflow: ellipsis;
}
.control-panel-block-participants{
    display: flex;
    justify-content: space-between;
    background: #87e1fe;
    border-radius: 5px;
    padding: 5px;
    color:white;
    font-size: 1rem
}
.control-panel-block-rate{
    display: flex;
    justify-content: space-between;
    background: #25d0a2;
    border-radius: 5px;
    padding: 5px;
    color:white;
    font-size: 1rem
}
.chart-title{
  display: flex;
  justify-content: space-between;
}
.chart-box{
      background: white;
      border-radius: 5px;
      margin-top: 30px;
      box-shadow: 0 0 10px rgba(80,80,80,.1);
}
 .right-side-indicator{
   background: #f4f4f4;
 }
 .left-side-indicator-participants{
   background: #bce9fc;
 }
 .left-side-indicator-rate{
    background:#aff3e1;
 }
 .filter-datepicker{
   width:50%
 }
 .filter-block{
   display:flex
 }
</style>
