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
                <div class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">pin_drop</md-icon>{{company.address}}
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
              <div class='company-branch_block'><div class="header text-bold text-gray " style="text-align: left; margin-bottom: 8px;">Branches</div><div @click.prevent='onShowInput($event)'><md-icon  class='branch-add_icon'>add</md-icon></div></div>
              <div v-for="item of company.branches" class="md-layout">
                <div class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">pin_drop</md-icon> {{item}}
                </div>
              </div>
              <div v-show='showSearch'>
               <InputText
                labelStyle='company_label_input'
                label='Branches address'
                id='branches_getter'
                name='branch_adddress'
                :value='branch_adddress'
                :onChange='onChange'

        />
        <Button text='Add' :onClick='addIndustry'/>
        </div>
            </div>

            <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="header text-bold text-gray " style="text-align: left; margin-bottom: 8px;">Additional Infromation</div>

            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-33">
      <md-card>
        <md-card-content>
        <div>
          <div class="title text-bold">Number of events</div>
          <div class="company-button-filter-block">
          <ButtonDiv text='Yearly' class='button-filter'  :onClick='onChangeFilter("Yearly")'/>
          <ButtonDiv text='Monthly' class='button-filter'  :onClick='onChangeFilter("Monthly")'/>
          </div>
        </div>
          <canvas id="number_of_events_chart" width="350" height="350"></canvas>
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-content>
          <div class="title text-bold">Average number of participants per event</div>
          <canvas id="number_of_participants_chart" width="400" height="400"></canvas>
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
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-content>
          <div class="title text-bold">Average event cost per employee</div>
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
import InputText from '@/components/Inputs/InputText.vue'
import ButtonDiv from '@/components/Button/ButtonDiv.vue'
import Button from '@/components/Button/Button.vue'
import CustomerFile from '@/models/CustomerFile';




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
      Button
    },
    mounted:function(){
      const branch =document.getElementById('branches_getter');
      //this.autocomplete = new google.maps.places.Autocomplete(branch ,{types: ['geocode']});
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
        branch_adddress:'',
        showSearch:false,
        filter:'Yearly'
      };
    },
    computed:{
      ...mapGetters({
        company:'user/getCompany'
      })

}
    ,
    methods: {
      onSelect: function(items) {
        this.selected = items;
      },
       onChange:function(value, name){
                 this[name]=value
         },
         onShowInput:function(){
           console.log('@')
           this.showSearch=!this.showSearch
         }
      ,addIndustry: function(value, name){
                 this.showSearch=!this.showSearch
                 this.$store.dispatch("user/sendIndustry",this.branch_adddress)
         },
         onChangeFilter:function(name){
           this.filter=name
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

  }
   .company-logo{
            width: 45% !important;
            height: 110% !important;
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
    width: 62%;
    justify-content: flex-end;
}

</style>
