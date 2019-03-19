<template>
  <div>
    <md-card>
      <md-card-header class="md-card-header-icon md-card-header-rose">
        <div class="card-icon" style="padding: 12px;">
          <md-icon>event_note</md-icon>
        </div>
        <h4 class="title">My Special Dates</h4>
      </md-card-header>
      <md-card-content>
        <collapse :collapse="mySpecialDateList" color-collapse="success">
          <template slot="md-collapse-pane-1">
            <!-- <event-details :where="EventLocation" :when="EventDate" :DressCode="EventDressCode"></event-details> -->
            <div class="md-layout">
              <div class="md-layout-item md-size-100">
                <p>The main office @ 15 Sunset Blvd. Transportation will be provided from the office. If you're arriving solo, the venue is located @ street name. Parking is available in building garage.
                </p>
              </div>
            </div>
          </template>

          <template slot="md-collapse-pane-2">
            <!-- <event-details :where="EventLocation" :when="EventDate" :DressCode="EventDressCode"></event-details> -->
            <div class="md-layout">
              <div class="md-layout-item md-size-100">
                <p>The main office @ 15 Sunset Blvd. Transportation will be provided from the office. If you're arriving solo, the venue is located @ street name. Parking is available in building garage.
                </p>
              </div>
            </div>
          </template>

        </collapse>

        <div class="md-layout" style="margin-top:4%;margin-bottom:5%;">
          <div class="md-layout-item md-size-100">
            <div>
              <span class="add-date">Add a date</span> <md-icon style="color: #02adc2;">add_circle</md-icon>
            </div>
          </div>
        </div>
      </md-card-content>

    </md-card>
  </div>
</template>

<script>
  import {
    Collapse
  } from "@/components";

  export default {
    components: {
      Collapse
    },
    data(){
      return {
        mySpecialDateList:[]
      }
    },
    props:{
      workingSince:Date,
      birthDate: Date
    },
    mounted(){

      this.mySpecialDateList.push({title: 'Birthday', eventStartMillis:this.birthDate});
      this.mySpecialDateList.push({title: 'Working since', eventStartMillis:this.workingSince});
    }
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
</style>
