<template>
  <div>
    <rsvp-analytics v-if="info.completed"></rsvp-analytics>
    <div class="white-card rsvp-campaign">
      <div class="p-50">
        <div class="font-size-30 font-bold-extra">Get everyone to RSVP</div>
        <div class="cover-preview mt-50">
          <img :src="coverImage" class="mr-10">
          <label for="cover">
          <md-button class="md-button md-red maryoku-btn md-theme-default change-cover-btn" @click="chooseFiles" >
            <img :src="`${$iconURL}Campaign/Group 2344.svg`" class="mr-10" style="width:20px"/>Change Cover
          </md-button>
          </label>
          <input
              style="display: none"
              id="coverImage"
              name="attachment"
              type="file"
              multiple="multiple"
              @change="onFileChange"
            />
        </div>
        <div class="preview-logo p-40 d-flex align-center" v-if="info.logo">
          <img :src="info.logo" style="max-width:200px">
          <md-switch class="large-switch below-label" v-model="showLogo"> Hide logo</md-switch>
        </div>
        <div class="font-size-30 font-bold mt-20">Hello Microsoft special employee!</div>
        <div class="font-size-20 mt-50">YOU ARE INVITED TO A</div>
        <div class="font-size-60 font-bold-extra mt-50 mb-30">{{info.conceptName}}</div>
        <maryoku-textarea 
          v-model="content" 
          :placeholder="`Hey, you've been invited to ${event.title} on ${$dateUtil.formatScheduleDay(event.eventStartMillis, 'dddd, MMMM D, YYYY')} at ${event.location}. I can hardly wait to see you, please RSVP  by ${$dateUtil.formatScheduleDay(event.eventStartMillis, 'dddd, MMMM D, YYYY')}, so I'll know you feel the same way :)`">
        </maryoku-textarea>
        <rsvp-event-info-panel class="mt-60" :event="event"></rsvp-event-info-panel>
        <div>
            <div>
              <rsvp-venue-carousel></rsvp-venue-carousel>
            </div>
          </div>
      </div>
      <div class="p-40 position-relative" >
        <div class="rsvp-event-guid-background" :style="`background-color:${event.concept.colors[0].color}`"></div>
        <div class="rsvp-event-guid md-layout">
          <div class="md-layout-item md-size-50 md-small-size-50">
            <div class="font-size-30 font-bold-extra mb-30 d-flex">
              <img :src="`${$iconURL}RSVP/Path 3728.svg`" style="height:43px"/>
              <span style="padding-top: 10px; margin-left:20px;">WHAT SHOULD I WEAR?</span>
              <md-switch v-model="showWhatWear" class="ml-10 md-switch below-label large-switch"><span class="color-black font-regular">Hide</span></md-switch>
              
            </div>
            <maryoku-textarea placeholder="Give your guests details about the expected dress code"></maryoku-textarea>
          </div>
          <div class="md-layout-item md-size-50 md-small-size-50">
            <div class="font-size-30 font-bold-extra mb-30 d-flex">
              <img :src="`${$iconURL}RSVP/Path 2369.svg`"  style="height:43px"/>
              <span style="padding-top: 10px; margin-left:20px;">What should I Know?</span>
              <md-switch v-model="showWhatKnow" class="ml-10 md-switch below-label large-switch "><span class="color-black font-regular">Hide</span></md-switch>
            </div>
            <maryoku-textarea placeholder="Give your guests any information you find relevant"></maryoku-textarea>
          </div>
        </div>
      </div>
      <div class="rsvp-event-timeline md-layout p-50">
        <div
          class="md-layout-item md-size-100 md-small-size-100 text-transform-uppercase font-size-30 font-bold-extra mb-50 d-flex align-center"
        >sneaky peak to the agenda
          <md-switch v-model="showTimeline" class="ml-10 md-switch below-label large-switch"><span class="color-black font-regular">Hide</span></md-switch>
        </div>
        
        <div
          v-for="(schedule, index) in scheduledDays"
          :key="index"
          class="md-layout-item md-size-50 md-small-size-100 text-transform-uppercase font-size-30 font-bold-extra"
        >
          <div class="rsvp-event-timeline-day">
            <span class="font-size-22 font-bold-extra">Day 0{{index + 1}}</span>
            <span class="font-size-16">{{$dateUtil.formatScheduleDay(schedule.itemDay)}}</span>
          </div>
          <div>
            <rsvp-timeline-item
              v-for="(timeline, index) in schedule.items"
              :key="index"
              :timeline="timeline"
            ></rsvp-timeline-item>
          </div>
        </div>
      </div>
    </div>
    <div class="white-card p-50 mt-40">
      <div class="font-size-30 font-bold-extra mb-30"> 
        <img :src="`${$iconURL}Campaign/Group+9235.svg`" class="mr-10">
        Online participants </div>
      <md-checkbox v-model="allowOnline"><span class="font-bold">Allow online participation</span></md-checkbox>
      <br/>
      <div class="d-flex" v-if="allowOnline">
        <img class="ml-10 mr-20" style="margin-top: -65px" :src="`${$iconURL}Campaign/enter-gray.svg`">  
        <div class="width-50">
          <div class="font-bold">Paste link to video communication</div>
          <maryoku-input  v-model="zoomlink" placeholder="Paste Zoom link here..."></maryoku-input>
        </div>
      </div>
      
      
    </div>
  </div>
</template>
<script>
import MaryokuTextarea from '@/components/Inputs/MaryokuTextarea'
import { MaryokuInput } from "@/components";
import RsvpVenueCarousel from "@/pages/app/RSVP/RSVPVenueCarousel.vue"
import RsvpEventInfoPanel from "@/pages/app/RSVP/RSVPEventInfoPanel.vue"
import RsvpAnalytics from './components/RSVPAnalytics'
import { getBase64 } from '@/utils/file.util'

export default {
  components: {
    MaryokuTextarea,
    MaryokuInput,
    RsvpVenueCarousel,
    RsvpEventInfoPanel,
    RsvpAnalytics
  },
  props: {
    info: {
      type: Object,
      default: {} 
    },
  },
  data() {
    return {
      coverImage: '',
      logoImage: "http://static.maryoku.com/storage/icons/RSVP/ms-icon.png",
      showLogo: true,
      content: "",
      zoomlink: "",
      allowOnline:false,
      showWhatWear: true,
      showWhatKnow: true,
      showTimeline: true,
      images: [
        {
          src: `${this.$iconURL}RSVP/Image+81.jpg`,
        },
        {
          src: `${this.$iconURL}RSVP/Image+82.jpg`,
        },
        {
          src: `${this.$iconURL}RSVP/Image+83.jpg`,
        },
        {
          src: `${this.$iconURL}RSVP/Image+84.jpg`,
        },
      ],
    }
  },
  created () {
    this.coverImage = this.event.concept.images[1].url;
  },
  computed: {
    event() {
      console.log(this.$store.state.event.eventData )
      return this.$store.state.event.eventData 
    },
    scheduledDays() {
      var timelines = {};
        // define timelines
        if (this.event.timelineItems) {
          this.event.timelineItems.forEach((item) => {
            item.isItemLoading = false;
            if (!timelines[item.plannedDate]) timelines[item.plannedDate] = [];
            item.isItemLoading = false;
            timelines[item.plannedDate].push(item);
          });
          console.log(timelines);
          if (Object.keys(timelines).length > 0) {
            let scheduledDays = [];
            Object.keys(timelines).forEach((itemDay, index) => {
              scheduledDays.push({
                itemDay: parseInt(itemDay),
                isEditable: false,
                items: timelines[itemDay],
              });
            });
            scheduledDays = _.sortBy(scheduledDays, function (item) {
              return item.itemDay;
            });
          }
        }
    },
  },
  methods: {
    chooseFiles() {
       document.getElementById("coverImage").click()
    },
    async onFileChange(event) {
      this.coverImage = await getBase64(event.target.files[0])
    }
  },
}
</script>
<style lang="scss" scoped>
.rsvp-campaign {
  .cover-preview {
    width: 100%;
    height: 350px;
    position: relative;
    overflow: hidden;
    border-radius: 30px;
    &:hover {
      .cover-preview::before {
        content: "";
        width: 100%;
        height: 100%;
        opacity: 0.52;
        background: #050505;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      
    }
    .change-cover-btn {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  
  .md-switch {
    .md-switch-label {
      display: block;
      padding: 0;
    }
  }
  .rsvp-event-guid-background {
    position: absolute;
    opacity: 0.24;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0
  }
}
</style>
