<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-30">
      <md-card class="md-card-profile">       
        <md-card-content>
          <div class="md-layout">
          <div class='company-view-common-logo_block'>
          <img class="company-logo" :src="customer.logoFileId||'static/img/placeholder.jpg'" style="width: 80%; height: 80%;">
            <div class='company-name-block'>
              <h4 class="title text-gray" style="font-weight: 500;">{{customer.name}}</h4>
              <md-button class="md-rose md-sm" @click='isEditable'>Edit Profile</md-button>
            </div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="md-layout">
                <div v-show='!isShowForm' class="md-layout-item md-size-50" style="text-align: left;">
                  <div class="title text-bold text-gray info-text-size" >Main Office</div>
                </div>
                <div v-show='!isShowForm' class="md-layout-item md-size-50" style="text-align: left;">
                  <div  class="title info-text-size">{{customer.mainAddressCity}}</div>
                  
                </div>
                <div v-show='isShowForm' class="md-layout-item md-size-100" style="text-align: left;">
                  <InputText v-gmaps-searchbox='"mainOffice"' label='Main Office' :value='customer.mainAddressCity' name='mainAddressCity'  :onChange='onChange'/>
                </div>

                <div v-if='!isShowForm' class="md-layout-item md-size-50" style="text-align: left;">
                  <div class="title text-bold text-gray info-text-size">Number of Employees</div>
                </div>
                <div v-if='!isShowForm' class="md-layout-item md-size-50" style="text-align: left;">
                  <div class="title info-text-size">{{customer.numberOfEmployees}}</div>
                </div>
                <div v-else class="md-layout-item md-size-100" style="text-align: left;">
                  <InputText label='Number of Employees' name='numberOnEmployees' :value='String(customer.numberOfEmployees)' :onChange="onChange"/>
                </div>

                <div v-if='!isShowForm' class="md-layout-item md-size-50" style="text-align: left;">
                  <div class="title text-bold text-gray info-text-size">Industry</div>
                </div>
                <div v-if='!isShowForm' class="md-layout-item md-size-50" style="text-align: left;">
                  <div class="title info-text-size">{{customer.industry}}</div>
                </div>
                <div v-else class="md-layout-item md-size-100" style="text-align: left;">
                          <Select                
                            label='Industry'
                            labelStyle='om_label_input'
                            :list='industryList'
                            name='industry'                
                            :onChange="onChange" 
                            :valueName="['id','title']"                                                       
                  />                           
                </div>
              </div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="header text-bold text-gray " style="text-align: left; margin-bottom: 8px;">Contact Information</div>
              <div class="md-layout">
                <div v-if='!isShowForm' class="md-layout-item md-size-100" style="text-align: left; display: flex;">
                  <md-icon class="text-gray branch-add_icon" style="margin-right: 12px; margin-bottom: 12px;">pin_drop</md-icon><div class='company-wrap-block'>{{customer.mainAddressCountry}}</div> 
                </div>
                <div v-else class="md-layout-item md-size-100" style="text-align: left;">
                  <InputText v-gmaps-searchbox='addreess' label='Company address' name='mainAddressCountry' :value='customer.mainAddressCountry' :onChange="onChange"/>
                </div>
                <div v-if='!isShowForm' class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">call</md-icon>{{customer.phone}}
                </div>
                <div v-else class="md-layout-item md-size-100" style="text-align: left;">
                  <InputText label='Phone' name='phone' :value='customer.phone||""' :onChange="onChange"/>
                </div>

                <div v-if='!isShowForm' class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">mail_outline</md-icon>{{customer.workspaceDomain}}
                </div>
                <div v-else class="md-layout-item md-size-100" style="text-align: left;">
                  <InputText  label='Company Email' name='workspaceDomain' :value='customer.workspaceDomain' :onChange="onChange"/>
                </div>

                <div v-if='!isShowForm' class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">web_asset</md-icon>{{customer.website}}
                </div>
                <div v-else class="md-layout-item md-size-100" style="text-align: center;">
                  <InputText label='Company Domain' name='website' :value='customer.website'  :onChange="onChange"/>
                  <md-button class="md-rose md-sm" @click.prevent='saveInfoFromForm'>Save Profile</md-button>
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
              
              <div v-for="item of customer.branches||[]" >              
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
                name='branch_address'
                :value='branch_address'
                :onChange='onChange'                             
                v-gmaps-searchbox='"branches_getter"'
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
    <div class="md-layout-item md-size-33" style="position: relative">
      <div class='chart-box'>
        <md-card-content  style="max-height: 200px">
        <div class='chart-title'>         
          <div class="title text-bold">Number of events</div>          
          <div class="company-button-filter-block">
          <ButtonDiv text='Yearly' class='button-filter'  :onClick='onChangeFilterToEarly'/>
          <ButtonDiv text='Monthly' class='button-filter'   :onClick='onChangeFilter'/>
          </div>          
        </div>
        <div><span class='info-chat-value'>23</span><span class='info-chart'>{{`This year of ${new Date().getFullYear()}`}}</span></div>
        <div class='filter-block' v-if='showFilter'>
        <div class='filter-datepicker'>
             <Select                
                label='From'
                labelStyle='om_label_input'
                :list='listMonth'
                name='from'                
                :onChange="onChange"                                             
        />
        </div>
        <div class='filter-datepicker'>
         <Select                
                label='To'
                labelStyle='om_label_input'
                :list='listMonth'
                name='to'                
                :onChange="onChange"
                                              
        />
        </div>
          </div>  
          <canvas v-show='!isMonthly' style="max-height: 130px" id="number_of_events_chart" width="350" height="150"></canvas>
          <canvas v-show='isMonthly' style="max-height: 130px"  id="number_of_events_chart_monthly" width="350" height="150"></canvas>
        </md-card-content>
      </div>
      <md-card>
        <md-card-content>
          <div class="title text-bold">Average number of participants per event</div>
          <div>
          <ControlPanel :onClick='getMonthControlRate' controlBlockStyle="control-panel-block-participants"/>
          </div>
          <div>
          <LineIndicator
                v-for="item in chechParticipant"
              :key="item.total"
              leftIndicatorStyle='left-side-indicator-participants'
              rightIndicatorStyle ='right-side-indicator' 
              :total='item.total'
              :typeEvent='item.typeEvent' 
              :eventDate='item.eventDate'   
              :currentValue='item.currentValue'
           />
          </div>
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-content style="max-height: 200px">
          <div class="title text-bold">Event categories comparison</div>
          <canvas id="event_vs_category" style="max-height: 150px" width="350" height="150"></canvas>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-33">
      <md-card>
        <md-card-content>
          <div class="title text-bold">Attendants satisfaction rate</div>
          <div>
          <ControlPanel :onClick='getMonthFromControl' controlBlockStyle="control-panel-block-rate"/>
          <div class='rate-mean-block'>
          <span class='indicator-event-info-mean-value'>{{`${Math.floor(getMeanМalue)}%`}}</span>
          <span class='indicator-event-type-title-rate'>{{`Average attendants satisfaction in ${new Date().getFullYear()}`}}</span>
          </div>
          </div>
          <div>
          <LineIndicator
              v-for="item in checkMonth"
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
          <canvas  id="number_of_participants_chart" width="350" height="150"></canvas>           
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
import Select from '@/components/Select/Select.vue'
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

//CONSTANST
import listMonth from "@/constants/month";

//helper function
import {isWrong} from '@/utils/helperFunction'

  

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
      Datepicker,
      Select
    },
     mounted:function(){
          this.$store.dispatch("user/getIndustry");
          this.$store.dispatch("user/getUserFromApi")          
      const chart = document.getElementById("number_of_events_chart");      
       new Chart(chart, {
    type: 'line',
    data: {
        labels: ["2014", "2015", "2016", "2017", "2018", "2019"],
        datasets: [{            
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
      legend: {
        display: false
    },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
 const chart2 = document.getElementById("number_of_participants_chart");
       new Chart(chart2, {
    type: 'line',
    data: {
        labels: ['Jan', "Feb", "Mar", "Apr", "May", "June"],
        datasets: [{            
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
      legend: {
        display: false
    },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
const chart3 = document.getElementById("number_of_events_chart_monthly");
       new Chart(chart3, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{            
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
      legend: {
        display: false
    },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
 const numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
const dataPack1 = [40, 47, 44, 38 ];
const dataPack2 = [10, 12, 7, 5];
const BarChat = document.getElementById("event_vs_category");
       new Chart(BarChat, {
    type: 'bar',
    data: {
        labels: ['Q1', "Q2", "Q3", "Q4"],
        datasets: [{
            label: '# of type Events',
            data: dataPack1,
            backgroundColor: '#25d0a2'                
            
        },
        {
            label: '# of Categories',
            data: dataPack2,
            backgroundColor: '#89e0fe'               
            
        }
        
        
        ]
    },
    options: {
      legend: {
        display: false
    },
     		animation: {
        	duration: 10,
        },
        tooltips: {
					mode: 'label',
          callbacks: {
          label: function(tooltipItem, data) { 
          	return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
          }
          }
         },
        scales: {
          xAxes: [{ 
          	stacked: true, 
            gridLines: { display: false },
            }],
          yAxes: [{ 
          	stacked: true, 
            ticks: {
        			callback: function(value) { return numberWithCommas(value); },
     				}, 
            }],
        },
        
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
        rate:[[{category:'Space/Location',total:'304',currentValue:'39'},{category:'Catering',total:'400',currentValue:'167'},{category:'Content',total:'600',currentValue:'300'},{category:'Giveaway',total:'246',currentValue:'230'}],
        [{category:'Space/Location',total:'673',currentValue:'324'},{category:'Catering',total:'373',currentValue:'167'},{category:'Content',total:'203',currentValue:'78'},{category:'Giveaway',total:'231',currentValue:'160'}]],
        participants:[
          [{typeEvent:'Comapany Trainig', eventDate:'August 19,2018', total:'324',currentValue:'23'},{typeEvent:'Outreach Program', eventDate:'August 12,2018',total:'543',currentValue:'167'},{typeEvent:'Development Workshop', eventDate:'August 23,2018',total:'400',currentValue:'323'},{typeEvent:'Meeting', eventDate:'August 27,2018',total:'434',currentValue:'89'}],
          [{typeEvent:'Comapany Trainig', eventDate:'July 20,2019', total:'224',currentValue:'123'},{typeEvent:'Outreach Program', eventDate:'August 12,2018',total:'443',currentValue:'267'},{typeEvent:'Development Workshop', eventDate:'August 23,2018',total:'400',currentValue:'123'},{typeEvent:'Meeting', eventDate:'August 27,2018',total:'334',currentValue:'189'}]
          ],
        from:'',
        to:'',
        monthValue:[{month:'Jan', events:'34'}, {month:'Feb', events:'41'}, {month:'Mar', events:'24'}, {month:'Apr', events:'14'}, {month:'May', events:'34'}, {month:'Jun', events:'14'}, {month:'Jul', events:'24'}, {month:'Aug', events:'34'},{month:'Sep', events:'14'} ,{ month:'Oct', events:'44'}, {month:'Nov', events:'14'}, {month:'Dec', events:'34'}],
        month:'',
        monthRete:'',
        listMonth:listMonth,
        isShowForm:false,
        vm: {
                    searchPlace: '',
                    location: {}

                }        
      }
    },
    computed:{
      ...mapGetters({
        customer:'user/getCustomer',
        industryList:'user/getIndustryList'
      }),
       getMonth(){
         return this.monthValue.map(item=>item.month)
       },
       getEvents(){
         return this.monthValue.map(item=>item.events)
       },
       checkMonth(){
         const firstPart=["January",  "March",  "May", "July",  "September", "December"]        
         if(firstPart.includes(this.month)){
           return this.rate[1]
         }else{
           return this.rate[0]
         }
       },
       chechParticipant(){         
         const firstPart=["January",  "March",  "May", "July",  "September", "December"]        
         if(firstPart.includes(this.monthRete)){
           return this.participants[1]
         }else{
           return this.participants[0]
         }
       },
       getMeanМalue(){
         const firstPart=["January",  "March",  "May", "July",  "September", "December"]
            if(firstPart.includes(this.month)){
              let meanValue=0
              this.rate[1].forEach(item=>{meanValue=meanValue+item.currentValue*100/item.total})
              this.rate[1].length              
           return meanValue/this.rate[1].length
         }else{
           let meanValue=0
              this.rate[0].forEach(item=>{meanValue=meanValue+item.currentValue*100/item.total})
              this.rate[0].length              
           return meanValue/this.rate[0].length
         }
       },
       isMonthly(){        
         return this.from&&this.to
       },
       getDuration(){
            if(this.from&&this.to){
                const from=this.listMonth.indexOf(this.from)
                const to=this.listMonth.indexOf(this.to)
                const duration=this.listMonth.splice(from,to)
                return duration
            }else{
              return this.listMonth
            }
       },
       isShow(){
         
       } 
}    
    ,
    methods: {
      onSelect: function(items) {
        this.selected = items;
      },
       onChange:function(value, name){                                 
                 this[name]=value                                                                 
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
         },
         getMonthFromControl(month){
           this.month=month
         }
         ,getMonthControlRate(month){
           this.monthRete=month
         },
         onChangeFilterToEarly(){
           this.from=''
           this.to=''
           this.showFilter=false           
         },
          isEditable(){
            this.isShowForm=!this.isShowForm
          },
          saveInfoFromForm(){
            const data=isWrong(this,['mainAddressCity','numberOnEmployees','industry','mainAddressCountry','phone','workspaceDomain','website'])
            for(let key in this.customer){
              if(data[key]){
                if(data[key]!==this.customer[key]){
                    this.customer[key]=data[key]
                }
              }              
            }
             this.$store.dispatch("user/putUserFromApi",this.customer) 
             this.isShowForm=!this.isShowForm
          }

    }
  };
</script>
<style >
.info-chat-value{
      color: black;
    font-weight: 500;
    font-size: 1.2rem;
    margin-left: 10px;
}
.info-chart{
  font-size: 0.85rem;
    font-weight: 500;
    color: #c6c6c6;
    margin-left: 5px;
}
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
    padding: 2px;
    color:white;
    font-size: 1rem
}
.control-panel-block-rate{
    display: flex;
    justify-content: space-between;
    background: #25d0a2;
    border-radius: 5px;
    padding: 2px;;
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
   display:flex;
   position: absolute;
    top: -20px;
    left: 30px;
 }
 .indicator-event-type-title-rate{
        font-size: 0.85rem;
        font-weight: 500;
        color:#c6c6c6
}
.indicator-event-info-mean-value{
        color:black;
        font-weight: 500;
        font-size: 26px;
}
.rate-mean-block{
  display: flex;
    justify-content: space-between;
    margin: 20px 0px;
}
</style>
