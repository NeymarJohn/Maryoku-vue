<template>
    <div class="negotiation-modal">
        <img v-if="icon" :src="`${$iconURL}${icon}`">
        <h3 class="color-vendor font-bold-extra">{{title}}</h3>
        <p>{{subTitle}}</p>
        <VendorBidTimeCounter
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
          expiredTime: Number,
          processed: {
            type: Number,
            default: NEGOTIATION_REQUEST_STATUS.NONE,
          },
        },
        data() {
          return {
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
               console.log('negotiationReqeust.init', this.expiredTime);
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
            else return 'Planner needs extra time';
          },
          subTitle(){
            if (this.processed === NEGOTIATION_REQUEST_STATUS.APPROVED) return 'You successfully extended the offer expiration by 2 days';
            else if(this.processed === NEGOTIATION_REQUEST_STATUS.DECLINE) return 'We will make sure to inform the planner';
            else return 'You can extend the offer expiration by 2 days';
          },
          icon(){
            if(this.processed === NEGOTIATION_REQUEST_STATUS.DECLINE) return 'VendorsProposalPage/group-20091.svg';
            else return 'VendorsProposalPage/group-18823.svg';
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
