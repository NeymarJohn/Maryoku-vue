<template>
  <div>
    <md-card>
      <md-card-header class="md-card-header-icon md-card-header-rose">
        <div class="card-icon" style="padding: 12px;">
          <md-icon>event</md-icon>
        </div>
        <h5 class="title">My Events</h5>
      </md-card-header>

      <md-card-content>
        <h6 v-if="!eventList">No events yet</h6>
        <collapse :collapse="eventList"  icon="query_builder" color-collapse="warning" >

          <template v-for="(item,index) in eventList"  :slot="`md-collapse-pane-${index+1}`">
            <event-details :titleCollaps="eventTitleFromCollaps" :where="eventLocation" :when="item.eventStartMillis" :dressCode="eventDressCode"></event-details>
          </template>
        </collapse>
      </md-card-content>

    </md-card>
  </div>
</template>

<script>
  import {
    Collapse
  } from "@/components";
  import EventDetails from "./EventDetails"
  export default {
    components: {
      Collapse,
      EventDetails
    },
    data() {
      return {
        eventLocation: '',
        eventDate: '',
        eventDressCode: '',
        eventList:[],
        // eventsTitleList: [],
        eventTitleFromCollaps:''
      }
    },
    props: {
      events: Array
    },
    mounted() {
      // this.eventsTitleList = this.events.map((event) => {

      //     return event.title
      // })

      this.eventList= this.events;
      //   debugger
    },

    methods:{

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
    background-image: linear-gradient(to right, #ffa625, #fb8d02), linear-gradient(to top, #000000, #ffffff);
  }

  .my-event {
    width: 513px;
    height: 842px;
    border-radius: 6px;
    // box-shadow: 0px 1px 4px 0 rgba(0, 0, 0, 0.14);
    // background-color: #ffffff;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0px;
    margin: 0px;
  }
</style>
