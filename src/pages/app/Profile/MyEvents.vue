<template>
    <div class="my-event">
        <md-card >
            <md-card-header class="md-card-header-icon ">
               <div class="md-layout">
                    <div class="card-icon  header-icon-myEvents">
                        <md-icon style=" text-align: center;">perm_identity</md-icon>
                    </div>
    
                    <div class="md-layout-item  title-My-Events">
                        My Events
                    </div>
                  
                </div>
            </md-card-header>
            <md-card-content>
                <collapse
            :collapse="[
              'Event 1',
              'Event 2',
              'Event 3',
              'Event 4',
              'Event 5',
              'Event 6',
              'Event 7']"
            icon="query_builder"
            color-collapse="warning">
              <template slot="md-collapse-pane-1">
                <event-details :where="EventLocation" :when="EventDate" :DressCode="EventDressCode"></event-details>
              </template>
              <template slot="md-collapse-pane-2">
                  <event-details :where="EventLocation" :when="EventDate" :DressCode="EventDressCode"></event-details>
              </template>
              <template slot="md-collapse-pane-3">
                  <event-details :where="EventLocation" :when="EventDate" :DressCode="EventDressCode"></event-details>
              </template>
               <template slot="md-collapse-pane-4">
                  <event-details :where="EventLocation" :when="EventDate" :DressCode="EventDressCode"></event-details>
              </template>
               <template slot="md-collapse-pane-5">
                  <event-details :where="EventLocation" :when="EventDate" :DressCode="EventDressCode"></event-details>
              </template>
               <template slot="md-collapse-pane-6">
                  <event-details :where="EventLocation" :when="EventDate" :DressCode="EventDressCode"></event-details>
              </template>
               <template slot="md-collapse-pane-7">
                  <event-details :where="EventLocation" :when="EventDate" :DressCode="EventDressCode"></event-details>
              </template>
        </collapse>
            </md-card-content>
    
        </md-card>
    </div>
</template>
<script>
import { Collapse } from "@/components";
import EventDetails from "./EventDetails"
export default {
    components: {
    Collapse,
    EventDetails
  },
  data()
  {
      return { 
          EventLocation:'',
          EventDate:'',
          EventDressCode:''
      }
  },
  mounted()
  {
      this.EventLocation = 'test'; 
      this.EventDate='20-02-2019';
      this.EventDressCode = 'test22';
  }
}
</script>

<style lang="scss">
    .title-My-Events {
        width: 81px;
        height: 18px;
        font-family: Roboto;
        font-size: 18px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: var(--slate);
        padding-top: 20px;
    }
    
    .header-icon-myEvents {
        width: 63px;
        height: 64px;
        border-radius: 3px;
        box-shadow: 0px 4px 20px 0 rgba(0, 0, 0, 0.14);
        background-image:  linear-gradient(to right, #ffa625, #fb8d02),linear-gradient(to top, #000000, #ffffff);
    }

    .my-event{
        width: 513px;
        height: 842px;
        border-radius: 6px;
        // box-shadow: 0px 1px 4px 0 rgba(0, 0, 0, 0.14);
        // background-color: #ffffff;
        overflow-y:auto; 
        overflow-x: hidden;
        padding: 0px;
        margin:0px;
    }
</style>
