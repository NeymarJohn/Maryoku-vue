<template>
    <div class="position-relative">
        <p class="text-left my-20">These vendors has given you 2 more days to decide</p>
        <div class="d-flex color-black-middle align-center my-20 pb-5 border-bottom">
            <img class="mr-10" :src="`${$iconURL}Budget+Elements/${serviceCategory.icon}`" width="30px"/>
            {{serviceCategory.fullTitle}}
        </div>
        <div class="d-flex align-start mb-30">
            <img v-if="image" :src="image" class="mr-10" width="80px">
            <div class="text-left">
                <div class="font-bold-extra">{{proposal.vendor.companyName}}</div>
                <div class="font-size-20 font-bold-extra mt-10">${{proposal.cost | withComma(Number)}}</div>
            </div>
        </div>
        <VendorBidTimeCounter
            :key="`${days}-${hours}-${mins}`"
            customClass="vendor bg-red py-10"
            :days="days"
            :hours="hours"
            :minutes="mins"
            :seconds="seconds"
        />
    </div>
</template>
<script>
import VendorBidTimeCounter from "@/components/VendorBidTimeCounter/VendorBidTimeCounter";
export default {
  components:{
      VendorBidTimeCounter,
  },
  props: {
    proposal: {
      type: Object,
      required: true,
    },
    serviceCategories:{
      type: Array,
      required: true,
    }
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
        console.log('negotiationNotification.init', this.proposal)
        if(this.proposal) {
            let diff = (new Date(this.proposal.expiredDate).getTime() - new Date().getTime()) / 1000;
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
      close(){
        this.$emit('close');
      }
    },
  computed:{
    image(){
      let proposalPhotos = this.proposal.inspirationalPhotos.filter(p => p !== null)
      let vendorPhotos = this.proposal.vendor.images.filter(p => p !== null)
      if(proposalPhotos && proposalPhotos.length) {
          return proposalPhotos[0].url
      } else if(vendorPhotos && vendorPhotos.length) {
          return vendorPhotos[0]
      }
      return null;
    },
    serviceCategory(){
      if(!this.proposal) return {};
      return this.serviceCategories.find(it => it.key === this.proposal.vendor.vendorCategory);
    }
  }
};
</script>
<style>
.loading-budget-image {
}
.border-bottom{
  border-bottom: 1px solid #707070;
}
</style>
