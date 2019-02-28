<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-30 md-medium-size-30 md-large-size-20">
      <md-card class="md-card-profile">
        <md-card-content>
          <div class="md-layout">
            <div class='company-view-common-logo_block'>
              <div class='company-main-logo-block'>
                <img class="company-logo" :src="customerLogoUrl" style="width: 80%; height: 80%;">
                <div>
                  <div class="company-logo-button-block">
                    <div @click='UploadAvatar'>
                      <md-icon class='company-logo-button'>edit<input type="file" id='company-avatar-upload' @change="onFileChange($event)" style="display:none"/></md-icon>
                    </div>
                    <div @click='deleteAvatar(customer.files[0])'>
                      <md-icon class='company-logo-button'>clear</md-icon>
                    </div>
                  </div>
                </div>
              </div>
              <div class='company-name-block'>
                <h4 class="title text-gray" style="font-weight: 500;">{{customer.name}}</h4>
              </div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
            <div class="md-layout-item md-size-100">              
              <input-text
                    labelStyle='company_label_input'
                    label='Number of employees'
                    name='numberOfEmployees'
                    :value='String(customer.numberOfEmployees)'
                    :onChange='onChange'
                    editebleMode
                    :actionFunc='saveInfoFromForm'
                    :ctx='customer'
                    fieldStyle="without-border"/>              
              <select-common
                    label='Industry'
                    labelStyle='om_label_input'
                    :list='industryList'
                    name='industry'
                    :onChange="onChange"
                    :valueName="['title','id']"
                    editebleMode
                    :actionFunc='saveInfoFromForm'
                    :ctx='customer'
                    :value='customer.industry'
                    fieldStyle="without-border"/>
              <div class="md-layout">              
              </div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="header text-bold text-gray " style="text-align: left; margin-bottom: 8px;">Contact Information</div>
              <div class="md-layout">                
                   <input-text
                    labelStyle='company_label_input'
                    label='Company address'
                    name='mainAddress'
                    id='main_address_customer'
                    :value='customer.mainAddress'
                    :onChange='onChange'
                    editebleMode
                    :actionFunc='saveInfoFromForm'
                    :ctx='customer'
                    fieldStyle="without-border"/>             
                  <input-text
                    labelStyle='company_label_input'
                    label='Phone'
                    name='phoneNumber'
                    :value='String(user.phoneNumber)||""'
                    :onChange='onChange'
                    editebleMode
                    :actionFunc='saveInfoFromForm'
                    :ctx='user'
                    fieldStyle="without-border"/>
                  <input-text
                    labelStyle='company_label_input'
                    label='Company Email'
                    name='workspaceDomain'
                    :value='customer.workspaceDomain'
                    :onChange='onChange'
                    editebleMode
                    :actionFunc='saveInfoFromForm'
                    :ctx='customer'
                    fieldStyle="without-border"/>
                  <input-text
                    labelStyle='company_label_input'
                    label='Company Domain'
                    name='website'
                    :value='customer.website'
                    :onChange='onChange'
                    editebleMode
                    :actionFunc='saveInfoFromForm'
                    :ctx='customer'
                    fieldStyle="without-border"/>                
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
                  <input-text
                    labelStyle='company_label_input'
                    label='Branches address'
                    name='branch_address'
                    :value='branch_address'
                    id='branch_address_search'
                    :onChange='onChange'/>                  
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
              <div class='filter-datepicker-block'>
                <select-common
                  label='Start year'
                  labelStyle='om_label_input'
                  :list='getDurationForChart'
                  name='startPeriod'
                  :onChange="onChange"/>
              </div>
              <div class='filter-datepicker-block'>
                <select-common
                  label='From'
                  labelStyle='om_label_input'
                  :list='listMonth'
                  name='from'
                  :onChange="onChange"/>
              </div>
            </div>
            <div class='filter-datepicker'>
              <div class='filter-datepicker-block'>
                <select-common
                  label='Finish year'
                  labelStyle='om_label_input'
                  :list='getDurationForChart'
                  name='finishPeriod'
                  :onChange="onChange"/>
              </div>
              <div class='filter-datepicker-block'>
                <select-common
                  label='To'
                  labelStyle='om_label_input'
                  :list='listMonth'
                  name='to'
                  :onChange="onChange"/>
              </div>
            </div>
          </div>

          <LineChart
            v-if='!isMonthly'
            key="username-input"
            classStyle="max-height: 130px"
            id="number_of_events_chart"
            width="350"
            height="150"
            :dataChart='getChartNumberOfEventsPerYear'
            type='line'
            :optionChart='dataChart.options'/>
          <LineChart
            v-else
            key="email-input"
            classStyle="max-height: 130px"
            id="number_of_events_chart_monthly"
            width="350"
            height="150"
            :dataChart='getDataFromDuration'
            type='line'
            :optionChart='dataChart.options'/>
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
              :key="item.total+item.typeEvent"
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
        <md-card-content style="max-height: 200px">
          <div class="title text-bold">Average event cost per employee</div>
          <LineChart
            classStyle="max-height: 130px"
            id="number_of_participants_chart"
            width="350"
            height="150"
            :dataChart='getChartEventPerEmployee'
            type='line'
            :optionChart='dataChart.options'/>
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
              :key="item.total+item.typeEvent"
              leftIndicatorStyle='left-side-indicator-rate'
              rightIndicatorStyle ='right-side-indicator'
              :total='item.total'
              :categoryEvent="item.category"
              :currentValue='item.currentValue'
              isRate/>
          </div>
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-content>
          <div class="title text-bold">Event categories comparison</div>
          <LineChart
            classStyle="max-height: 130px"
            id="event_vs_category"
            width="350"
            height="150"
            :dataChart='getChartEventsPerCategory'
            type='bar'
            :optionChart='dataChart.options'/>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
  //MAIN MODULES
  import {mapGetters, mapMutations, mapState} from 'vuex';
  import Chart from 'chart.js';
  import auth from '@/auth';

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
  import LineChart from '@/components/Chart/LineChart.vue'

 import Customer from '@/models/Customer';
  import CustomerFile from '@/models/CustomerFile';
  import Datepicker from '@/components/Datepicker/Datepicker.vue';

  //CONSTANST
  import listMonth,{months_short} from "@/constants/month";

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
      "input-text":InputText,
      ButtonDiv,
      Button,
      ControlPanel,
      LineIndicator,
      Datepicker,
      "select-common":Select,
      LineChart
    },
     mounted(){
       const options = {          
          types: ['geocode']
        }
       this.rate=this.getChartSatisfactionRate()
       this.participants=this.getChartParticipantsPerEvent()
      const inputMainAddress = document.getElementById('main_address_customer')
      
      const inputBranch = document.getElementById('branch_address_search')
      const autocomplete2 = new google.maps.places.Autocomplete(inputBranch, options)
      
      const autocomplete1 = new google.maps.places.Autocomplete(inputMainAddress, options)


      this.$store.dispatch("user/getIndustry");
      this.$store.dispatch("user/getUserFromApi");
      this.$store.dispatch("user/getChartsFromApi",this.customer.id); 
     
      this.auth.currentUser(this, true, () => {
        this.customerLogoUrl = this.auth.user.me.customer.logoFileId ? `${process.env.SERVER_URL}/1/customerFiles/${this.auth.user.me.customer.logoFileId}` : 'static/img/placeholder.jpg';
      });
    },
    data() {
      return {
        auth: auth,
        customerLogoUrl: 'static/img/placeholder.jpg',

        numberOfEmployees: 100,
        editing: {
          numberOfEmployees: false,
        },

        dataChart:{          
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

        },      
        branch_address:'',
        showSearch:false,
        showFilter:false,       
        from:'',
        to:'',
        startPeriod:'',
        finishPeriod:'',       
        month:"",
        monthRate:"",
        listMonth:listMonth,
        shortNameM:months_short,
        isShowForm:false,
        formSwitcher:'',
        duration:[],
        vm:{searchPlace:""}
      }
    },
    computed:{
      ...mapGetters({
        customer:'user/getCustomer',
        user:'user/getUser',
        industryList:'user/getIndustryList',
        charts:'user/getChartStatistics'
      }),
      getChartNumberOfEventsPerYear(){
        const parse_data=[]
        const parse_label=[]
        if(this.charts.numberOfEventsPerYear){ 
            const chart=this.charts.numberOfEventsPerYear
            for(let key in chart){              
              parse_label.push(key)
              parse_data.push(chart[key]) 
          }
          return{            
            labels: parse_label,
            datasets: [{
              data: parse_data,
              backgroundColor: [
                'rgba(255, 255, 255, 0.2)',
              ],
              borderColor: [
                '#71c278',
              ],
              borderWidth: 1
            }]                     
          }
        }else{
          return{            
            labels: [],
            datasets:[{
              label: '# of type Events',
              data: [],
              backgroundColor: '#25d0a2'

            }]          
          }
        }


        
      } 
      ,
      getChartEventPerEmployee(){
        const parse_data=[]
        const parse_month=[]
        if(this.charts.eventCostPerEmployeePerYearMonth){          
          const chart= this.charts.eventCostPerEmployeePerYearMonth          
          for(let key in chart){
          const moths= key.split('__')
          parse_month.push(this.shortNameM[moths[1]-1])
          parse_data.push(chart[key]) 
          }
           if(parse_month.length<6&&parse_data.length<6){
             return{               
                labels: parse_month,
                datasets: [{
                  data: parse_data,
                  backgroundColor: [
                    'rgba(255, 255, 255, 0.2)',
                  ],
                  borderColor: [
                    '#26cfa0',
                  ],
                  borderWidth: 1
                }]          
                }
            
        }else{
           const arrLenght=parse_data.length-6
            const dataCh=parse_data.splice(arrLenght)
            const labemlCh=parse_month.splice(arrLenght)
            return{               
                labels: labemlCh,
                datasets: [{
                  data: dataCh,
                  backgroundColor: [
                    'rgba(255, 255, 255, 0.2)',
                  ],
                  borderColor: [
                    '#26cfa0',
                  ],
                  borderWidth: 1
                }]          
                }  
        }
        }},
        getChartEventsPerCategory(chartData){
           const parse_data=[]
          const parse_label=[]
        if(this.charts.eventsPerCategory){ 
            const chart=this.charts.eventsPerCategory
            for(let key in chart){
              const moths= key.split('__')
              parse_label.push(key)
              parse_data.push(chart[key]) 
          }
          return{            
            labels: parse_label,
            datasets:[{
              label: '# of type Events',
              data: parse_data,
              backgroundColor: '#25d0a2'

            }]          
          }
        }else{
          return{            
            labels: [],
            datasets:[{
              label: '# of type Events',
              data: [],
              backgroundColor: '#25d0a2'

            }]          
          }
        }
        },        
             
      getMonth(){
        return this.monthValue.map(item=>item.month)
      },
      getEvents(){
        return this.monthValue.map(item=>item.events)
      },
      checkMonth(){
        const currentMonth=this.listMonth[new Date().getMonth()]
        const currentCount=new Date().getMonth()
        
        if(!this.month){
           return this.rate[currentCount]
        }else{
          const count= this.listMonth.indexOf(this.month)
          return this.rate[count]
        }  


        // const count= this.listMonth.indexOf(this.month)
        // return this.rate[count]
        // const currentMonth= this.listMonth[new Date().getMonth()]
        // console.log(currentMonth,'currentMonth') 
        // let countMonth=new Date().getMonth()
        // console.log(this.listMonth.indexOf(currentMonth), 'eto index')
        // if(countMonth===this.listMonth.indexOf(currentMonth)){
        //   return this.rate[countMonth]
        // }else{
        //   const count= this.listMonth.indexOf(currentMonth)
        // return this.rate[count]
        // }             
        
        
      },
      chechParticipant(){
        const currentMonth=this.listMonth[new Date().getMonth()]
        const currentCount=new Date().getMonth()
        console.log(this.monthRate,'eto rate')
        if(!this.monthRate){
           return this.participants[currentCount]
        }else{
          const count= this.listMonth.indexOf(this.monthRate)
          return this.participants[count]
        }       
      },
      getMeanМalue(){
       const count = this.listMonth.indexOf(this.month)       
       if(count==-1){
         return 0
       }else{
         let meanValue=0
       this.rate[count].forEach(item=>{
         if(item.currentValue&&item.total){
           meanValue=meanValue+item.currentValue*100/item.total
         }         
         })         
       this.rate[count].length
       if(meanValue){
          return meanValue/this.rate[count].length 
       }else{
         return 0
       }
           
       }      
      },
      isMonthly(){
        return Boolean(this.from&&this.to&&this.startPeriod&&this.finishPeriod)
      },
      getDuration(){
        if(this.from&&this.to&&this.startPerion&&this.finishPerion){
          const from=this.listMonth.indexOf(this.from)
          const to=this.listMonth.indexOf(this.to)
          const duration=this.listMonth.splice(from,to)
          return duration
        }else{
          return this.listMonth
        }
      },
      getDurationForChart(){
        const chart=this.charts.eventCostPerEmployeePerYearMonth
        const duration=[]
        for (let year in chart){
        const y=year.split('_')
        if(!duration.includes(y[0]))duration.push(y[0])
        }
        this.duration=duration
        return duration
      } ,
      getDataFromDuration(){
        const duration=this.duration
        function filter(start, from ,finish, to, period){
          const startY=period.indexOf(start)
          const finishY= period.indexOf(finish)
          const yearPeriod= period.splice(startY,finishY)
          var allPeriod=[]
          yearPeriod.forEach(item=>{
              var month=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
              if(item===start){

                var startMonth=month.indexOf(from)
                var firstY= month.splice(startMonth)

                allPeriod=allPeriod.concat(firstY)
              } else if(item===finish){
                var finishMonth=month.indexOf(to)
                var lastY= month.splice(0,finishMonth)
                allPeriod=allPeriod.concat(lastY)
              }else{
                allPeriod=allPeriod.concat(month)
              }
            }

          )
          return allPeriod
        }

        if(this.from&&this.to&&this.startPeriod&&this.finishPeriod){
          const period =  filter(this.startPeriod,this.from,this.finishPeriod,this.to,duration)
          const dataArray=period.map(item=>Math.ceil(Math.random()*100))
          return{
            labels: period,
            datasets: [{
              data: dataArray,
              backgroundColor: [
                'rgba(255, 255, 255, 0.2)',
              ],
              borderColor: [
                '#26cfa0',
              ],
              borderWidth: 1
            }]

          }
        }

      }
    }
    ,
    methods: {
      isShow(obj,value){
        let ifChange=false
        for(let key in obj){
          if(key===value)this.formSwitcher=value
        }
      },
      isClose(){
        this.formSwitcher=''
      },
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
        
        this.monthRate=month
      },
      onChangeFilterToEarly(){
        this.from=''
        this.to=''
        this.startPerion=''
        this.finishPerion=''
        this.showFilter=false
      },
      isEditable(){
        this.isShowForm=!this.isShowForm
      },
      saveInfoFromForm(obj,objName){
        if(this[objName]!==obj[objName]) {
          let a = {}
          a[objName]=this[objName]
          a["id"]=obj.id
          this.$store.dispatch("user/putUserFromApi",a)
          this.formSwitcher=''
        }
      },
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;

        if (!files.length) return;
        this.createImage(files[0]);
      },
      createImage(file) {
        let reader = new FileReader();
        let _this = this;

        reader.onload = e => {
          return new CustomerFile({customerFile: e.target.result}).save().then(result => {            
            _this.customerLogoUrl = `${process.env.SERVER_URL}/1/customerFiles/${result.id}`
          })
            .catch((error) => {
              console.log(error);
            });
        };
        reader.readAsDataURL(file);
      },
      UploadAvatar(){
        console.log('@')
        document.getElementById('company-avatar-upload').click()
      },
      deleteAvatar(id){        
        CustomerFile({id: e.target.result}).delete().then(result => {
          console.log(result)
         
        })
          .catch((error) => {
            console.log(error);
          });
      },
      getChartSatisfactionRate(){
          const currentYear=new Date().getFullYear()
          const months=this.listMonth
          let listRete=null
          if(this.charts.satisfactionRatesPerYearMonth){
            const chart=this.charts.satisfactionRatesPerYearMonth
            let filterYear=null           
             for(let key in chart){               
              if(key==currentYear){                
                filterYear=chart[key]                
              }              
          }    
              
           listRete= months.map((item,index)=>{
            const currentObj=[]
            for(let month in filterYear){                     
             if((month-1)===index){
                const categori=filterYear[month]
                 for(let key in categori){                   
                     const obj={}
                     obj['category']=key
                     obj['total']='100'
                     obj['currentValue']=String(categori[key])
                     currentObj.push(obj)
                 }
             }else{
               const a = {category:'N/D',total:'0',currentValue:'0'}
               currentObj.push(a)
               }
             }
             
             return currentObj
          
          })        
          }          
           this.rate=listRete
           return listRete
        },
        getChartParticipantsPerEvent(){
          // {typeEvent:'Comapany Trainig', eventDate:'August 19,2018', total:'324',currentValue:'23'}
          const currentYear=new Date().getFullYear()
          const months=this.listMonth
          let listRete=null
          if(this.charts.participantsPerEventPerYearMonthEventType){
            const chart=this.charts.participantsPerEventPerYearMonthEventType
            
            let filterYear=null           
             for(let key in chart){               
              if(key==currentYear){                
                filterYear=chart[key]                
              }              
          }    
            
           listRete= months.map((item,index)=>{
            const currentObj=[]
            for(let month in filterYear){                     
             if((month-1)===index){
                const categori=filterYear[month]                
                 for(let key in categori){                                    
                     const obj={}
                     obj['typeEvent']=key
                     obj['total']=String(categori[key].Invited)
                     obj['currentValue']=String(categori[key].Actual)
                     currentObj.push(obj)
                 }
             }else{
               const a = {category:'N/D',total:'0',currentValue:'0'}
               currentObj.push(a)
               }
             }
            
             return currentObj
          
          })        
          }         
           
           return listRete
        } 
 

    }, 
       
  };
</script>
<style lang='scss'>
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
    width: 100%;
    align-items: center
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
  .filter-datepicker{
    width:25%;
    display:flex

  }
  .filter-datepicker-block{
    width:50%;
  }
  .filter-block{
    display:flex;
    position: absolute;
    top: -20px;
    left: 20px;
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
  .delete-edit-block{
    display:flex;
  }
  .company-logo-button{
    font-size: 0.85rem !important;
    cursor:pointer;
  }
  .company-logo-button-block{
    display: flex;
    flex-direction: column-reverse;
  }
  .company-main-logo-block{
    display:flex
  }
  .md-layout-item >.fc-divider{
    margin: 15px -10px !important;
  }
</style>
