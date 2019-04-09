<template>
  <div style="width:100%">
    <md-card>
      <md-card-header class="md-card-header-icon md-card-header-blue">
        <div class="card-icon" style="padding: 12px;">
          <md-icon>event_note</md-icon>
        </div>
        <div class="md-layout" style="width: 70%;">
            <div class="md-layout-item" style="padding-right: 0px;padding-left: 0px;">
              <div class="md-layout">
                  <div class="md-layout-item md-size-90"  style="padding-left: 0px;padding-right: 0px;">
                    <h4 class="title"><span style="font-size:18px;">My Special Dates</span></h4>
                  </div> 
                  <div class="md-layout-item md-size-10 add-date" style="padding-left: 10px;padding-right: 0px;" @click="addNewSpecialDateItem">
                      <md-icon style="font-size: 19px !important; color: #02adc2;" >add_circle</md-icon>
                  </div>  
              </div>
            </div>
           
          </div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout mb16">
          <div class="md-layout-item md-size-100 md-small-size-100">
           <md-datepicker v-model="birthdayDate" >
              <label >Birthday Date</label>
            </md-datepicker>
          </div>  
        </div>
        <div class="md-layout mb16">
          <div class="md-layout-item md-size-100 md-small-size-100">
           <md-datepicker v-model="workingSinceDate" >
              <label >workingSince Date</label>
            </md-datepicker>
          </div>  
        </div>
   
       <new-special-date :DateList="specialDateList" ></new-special-date>
       
      </md-card-content>

    </md-card>
  </div>
</template>

<script>
  import {
    Collapse
  } from "@/components";
  import NewSpecialDate from './newSpecailDate';
  export default {
    components: {
      Collapse,
      NewSpecialDate
    },
    data(){
      return {
        mySpecialDateList:[],
        birthdayDate:null,
        workingSinceDate:null,
        specialDateList:[],
      }
    },
    props:{
      workingSince:Number,
      birthDate: Number
    },
    mounted(){

      this.mySpecialDateList.push({title: 'Birthday', eventStartMillis:this.birthDate});
      this.mySpecialDateList.push({title: 'Working since', eventStartMillis:this.workingSince});
    },

    methods:{
      addNewSpecialDateItem(){
        let checkEmptyRows= this.specialDateList.filter(row=>row.title=== null)
        if (checkEmptyRows.length >= 1 && this.specialDateList.length > 0)
        return 
        this.specialDateList.push({
          title:'',
          selectedDate:null,
          editable:false
        })

      },

     

      
    },


    
  }
</script>
<style lang="scss">
  .add-date{
    width: 66px;
    height: 12px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.71;
    letter-spacing: normal;
    text-align: left;
    color: #999999;
  }

  .my-special-date{
    width: 63px;
    height: 64px;
    border-radius: 3px;
    box-shadow: 0px 4px 20px 0 rgba(0, 0, 0, 0.14);
    background-image: linear-gradient(to right, #23c4d8, #00acc1);
  }
  .my-special-date-main{
    width: 349px;
    height: 302px;
    border-radius: 6px;
    // box-shadow: 0px 1px 4px 0 rgba(0, 0, 0, 0.14);
    // background-color: #ffffff;
  }
  
  .add-date{
    cursor: pointer;
  
  }
</style>
