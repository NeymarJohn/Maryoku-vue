<template>
    <div class="negotiation-modal px-30 py-20">
        <img v-if="icon" :src="`${$iconURL}${icon}`">
        <h3 class="color-vendor font-bold-extra">{{title}}</h3>
        <p>{{subTitle}}</p>
        <template v-if="type === negotiationTypes.EVENT_CHANGE">
            <div v-if="eventData.originalDate != eventData.date" class="d-flex align-center justify-content-center mt-40">
                <div class="font-size-14 w-min-180 color-black-middle">
                    <div class="font-size-24 text-line-through mb-5">{{eventData.originalDate}}</div>
                    Original Data
                </div>
                <md-icon class="mx-40">arrow_forward</md-icon>
                <div class="font-size-24 font-bold-extra w-min-180">
                    {{eventData.date}}
                    <p class="font-size-14 mt-5">New Data</p>
                </div>
            </div>
            <div v-if="eventData.originalStartTime != eventData.startTime || eventData.originalEndTime != eventData.endTime" class="d-flex align-center justify-content-center mt-40">
                <div class="font-size-14 w-min-180 color-black-middle">
                    <div class="font-size-24 text-line-through mb-5">{{`${eventData.originalStartTime} - ${eventData.originalEndTime}`}}</div>
                    Original Time
                </div>
                <md-icon class="mx-40">arrow_forward</md-icon>
                <div class="font-size-24 font-bold-extra w-min-180">
                    <div class="font-size-24 mb-5">{{`${eventData.startTime} - ${eventData.endTime}`}}</div>
                    <p class="font-size-14 mt-5">New Time</p>
                </div>
            </div>
            <div v-if="eventData.originalNumberOfParticipants != eventData.numberOfParticipants" class="d-flex align-center justify-content-center mt-40">
                <div class="font-size-14 w-min-180 color-black-middle">
                    <div class="font-size-24 text-line-through mb-5">{{eventData.originalNumberOfParticipants | withComma(Number)}}</div>
                    Original Number of guests
                </div>
                <md-icon class="mx-40">arrow_forward</md-icon>
                <div class="font-size-22 font-bold-extra w-min-180">
                    {{eventData.numberOfParticipants | withComma(Number)}}
                    <p class="font-size-14 font-bold-extra mt-5">New Number of guests</p>
                </div>
            </div>
            <div v-if="eventData.originalLocation != eventData.location" class="d-flex align-center justify-content-center mt-40">
                <div class="font-size-14 w-min-180 color-black-middle">
                    <div class="font-size-24 text-line-through mb-5">{{eventData.originalLocation}}</div>
                    Original Location
                </div>
                <md-icon class="mx-40">arrow_forward</md-icon>
                <div class="font-size-22 font-bold-extra w-min-180">
                    {{eventData.location}}
                    <p class="font-size-14 font-bold-extra mt-5">Location</p>
                </div>
            </div>
        </template>


        <VendorBidTimeCounter
            v-if="type === negotiationTypes.ADD_MORE_TIME"
            :key="`${days}-${hours}-${mins}`"
            customClass="vendor bg-purple w-max-400 mx-auto mb-30 mt-30 px-10"
            :days="days"
            :hours="hours"
            :minutes="mins"
            :seconds="seconds"
            :bottom-content="processed === 0 ? 'Until offer expires' : null"
            :top-content="processed !== 0 ? 'This offer will expire in' : null"
        />
    </div>
</template>
<script>

    import {NEGOTIATION_REQUEST_STATUS, NEGOTIATION_REQUEST_TYPE} from "@/constants/status";
    import VendorBidTimeCounter from "@/components/VendorBidTimeCounter/VendorBidTimeCounter";


    export default {
        components: {
          VendorBidTimeCounter
        },
        props: {
          type: Number,
          expiredTime: Number,
          eventData: {
            type : Object,
            default: _ => {return {}},
          },
          processed: {
            type: Number,
            default: NEGOTIATION_REQUEST_STATUS.NONE,
          },
        },
        data() {
          return {
            negotiationTypes: NEGOTIATION_REQUEST_TYPE,
            days: 0,
            hours: 0,
            mins: 0,
            seconds: 0,
          }
        },
        mounted() {
          this.init()
        },
        methods: {
           init(){
               console.log('negotiationReqeust.init', this.eventData);
               let diff = (this.expiredTime - new Date().getTime()) / 1000;
               if (diff < 0) return;
               this.days = Math.floor(diff / (24 * 3600));
               diff = diff - this.days * 24 * 3600;
               this.hours = Math.floor(diff / 3600);
               diff = diff - this.hours * 3600;
               this.mins = Math.floor(diff / 60);
               diff -= this.mins * 60;
               this.seconds = Math.floor(diff);
           }
        },
        computed: {
          title(){
            if (this.processed === NEGOTIATION_REQUEST_STATUS.APPROVED) return 'Time added successfully';
            else if(this.processed === NEGOTIATION_REQUEST_STATUS.DECLINE) return 'Time extension Declined';
            return this.type === NEGOTIATION_REQUEST_TYPE.ADD_MORE_TIME ? 'Planner needs extra time' : 'The planner changed the event details';
          },
          subTitle(){
            if (this.processed === NEGOTIATION_REQUEST_STATUS.APPROVED) return 'You successfully extended the offer expiration by 2 days';
            else if(this.processed === NEGOTIATION_REQUEST_STATUS.DECLINE) return 'We will make sure to inform the planner';
            return this.type === NEGOTIATION_REQUEST_TYPE.ADD_MORE_TIME ? 'You can extend the offer expiration by 2 days' :
                'You can change the rate right from here. If the change entails further changes on your part you can edit the proposal before sending to the planner';
          },
          icon(){
            if(this.processed === NEGOTIATION_REQUEST_STATUS.DECLINE) return 'VendorsProposalPage/group-20091.svg';
            return this.type === NEGOTIATION_REQUEST_TYPE.ADD_MORE_TIME ? 'VendorsProposalPage/group-18823.svg' : 'VendorsProposalPage/group-21671.svg';
          }
        },
        watch:{
          processed(newVal){
              this.init()
          }
        }
    }
</script>
<style lang="scss" scoped>

</style>
