<template>
  <modal container-class="modal-container no-header no-body no-footer w-min-900">
    <template slot="body">
      <div class="text-left px-50 pt-50">
        <h2 class="font-size-30 font-bold-extra my-10 mr-40">
          {{ step === 1 ? 'Which proposals need to be changed?' : 'Help us find you something better' }}
        </h2>
        <p class="font-size-16 p-0">{{ step === 1 ? "We'll be happy to improve them for you. You can also request new options." :
          'Tell us what was wrong with our suggestions so that we cloud make the future suggestion better for you?' }}</p>
      </div>
      <md-button class="position-absolute md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
      <div v-if="step === 1">
        <div class="px-50 mt-40">
          <div v-for="(proposal, idx) in proposals" class="md-layout align-center border-top py-30">
            <md-checkbox v-model="checked_proposals" :value="proposal.id" class="md-layout-item md-checkbox-narrow md-size-5" />
            <div class="md-layout-item md-size-20">
              <img :src="backgroundImage(proposal)" style="width: 130px;height: 90px">
            </div>
            <div class="md-layout-item md-size-30">
              <p class="font-size-16 text-left font-bold-extra">
                {{ proposal.vendor.companyName }}
              </p>
              <div class="font-size-22 text-left font-bold-extra">${{ proposal.cost | withComma }}</div>
            </div>
            <div class="md-layout-item md-size-40">
              <md-button v-if="!options[idx]" class="md-simple md-outlined md-red maryoku-btn" @click="replace">Give me a different option</md-button>
              <div v-else class="d-flex align-center bg-light-green p-20" style="width: 330px">
                <img :src="`${$iconURL}budget+screen/SVG/Asset%2032.svg`" width="28px"/>
                <p class="font-size-14 mb-0 mx-1">We'll look for a better alternative</p>
                <md-button class="md-simple md-black maryoku-btn">Undo</md-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 2">
        <div class="px-50 mt-40">
          <div v-for="option in better_options" class="text-left py-10">
            <md-checkbox
              v-model="checked_better_options"
              :value="option.value"
              class="md-checkbox-narrow"
            >{{option.label}}</md-checkbox>
            <div class="ml-30 mr-50 my-10">
              <maryoku-textarea
                v-if="option.value === 'missing_essential' && checked_better_options.includes(option.value)"
                v-model="essential"
                placeholder="Type what you are missing..."
                size="small"
              ></maryoku-textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex align-center px-50 py-30" :class="step === 1 ? 'border-top' : ''">
        <md-button class="md-simple md-black maryoku-btn ml-auto" @click="close" style="width: 160px">Cancel</md-button>
        <md-button class="md-red maryoku-btn ml-10 w-min-200" style="width: 160px" @click="next">{{ step === 1 ? 'Next' : 'Send' }}</md-button>
      </div>

      <div class="d-flex align-center justify-content-center py-40">
        <span class="step-dot mr-10" :class="step === 1 ? 'active':''"></span>
        <span class="step-dot" :class="step === 2 ? 'active':''"></span>
      </div>

      <div class="text-center py-60" style="background: #ffedb7">
        <p>If you can't find a suitable vendor, you can add your own:</p>
        <md-button class="md-simple md-outlined md-red maryoku-btn" style="background-color: white!important;width: 300px" @click="uploadVendor">Upload New Vendor</md-button>
      </div>
    </template>
  </modal>
</template>
<script>
import Modal from "@/components/Modal.vue";
import { MaryokuTextarea } from "@/components";

export default {
  components: {
    Modal,
    MaryokuTextarea,
  },
  props: {
    proposals: {
      type: Object,
    }
  },
  data(){
    return {
      step: 1,
      checked_proposals: [],
      checked_better_options: [],
      options: [0,1,1],
      essential: null,
      better_options : [
        {label: "Prices are higher than my expectations", value: 'price_higher'},
        {label: "I don't like the location", value: 'unlike_location'},
        {label: "I did not like the style of the proposals", value: 'unlike_proposal_style'},
        {label: "I'm missing something essential", value: 'missing_essential'},
        {label: 'Other', value: 'other'},
      ]
    }
  },
  created() {},
  methods: {
    close() {
      this.$emit("cancel");
    },
    next(){
      if (this.step === 1) {
        this.step = 2;
      } else {
        this.step = 1;
      }
    },
    backgroundImage(proposal) {
      if (proposal.coverImage && proposal.coverImage[0])
        return proposal.coverImage[0];
      if (proposal.inspirationalPhotos && proposal.inspirationalPhotos[0])
        return proposal.inspirationalPhotos[0].url;
      if (proposal.vendor.images && proposal.vendor.images[0])
        return proposal.vendor.images[0];
      if (proposal.vendor.vendorImages && proposal.vendor.vendorImages[0])
        return proposal.vendor.vendorImages[0];
      return "";
    },
    replace() {
      if (!this.checked_proposals.length) return;
      this.$emit('replace', this.checked_proposals)
    },
    uploadVendor(){
      this.$emit('action', 'already_have_venue')
    }
  }
};
</script>

<style scoped lang="scss">
.border-top {
  border-top: 1px solid #707070;
}
.step-dot{
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: #d5d5d5;
  cursor: pointer;

  &.active{
    background-color: #f51355;
  }
}
</style>
