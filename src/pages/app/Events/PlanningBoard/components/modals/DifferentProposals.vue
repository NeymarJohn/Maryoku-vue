<template>
  <modal container-class="modal-container no-header no-body no-footer w-min-900">
    <template slot="body">
      <div v-if="step === 1">
        <div class="text-left px-50 pt-50">
          <h2 class="font-size-30 font-bold-extra my-10 mr-40">
            Which of those proposals require changes?
          </h2>
          <p class="font-size-16 p-0">We wish to make those better for you. But you could also request for alternative proposals</p>
        </div>
        <md-button class="position-absolute md-simple md-just-icon md-round modal-default-button" @click="close">
          <md-icon>clear</md-icon>
        </md-button>
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
              <md-button v-if="!replace[idx]" class="md-simple md-outlined md-red maryoku-btn">Replace with alternative proposal</md-button>
              <div v-else class="d-flex align-center bg-light-green p-20" style="width: 330px">
                <img :src="`${$iconURL}budget+screen/SVG/Asset%2032.svg`" width="28px"/>
                <p class="font-size-14 mb-0 mx-1">We will start looking for something better instead</p>
                <md-button class="md-simple md-black maryoku-btn">Undo</md-button>
              </div>
            </div>
          </div>
          <div class="d-flex align-center border-top pt-30 pb-80">
            <md-button class="md-simple md-black maryoku-btn ml-auto" @click="close" style="width: 160px">Cancel</md-button>
            <md-button class="md-red maryoku-btn ml-10 w-min-200" style="width: 160px" @click="next">Next</md-button>
          </div>
        </div>
      </div>
      <div v-if="step === 2">
        <div class="text-left px-50 pt-50">
          <h2 class="font-size-30 font-bold-extra my-10 mr-40">
            Help us find you something better
          </h2>
          <p class="font-size-16 p-0">Tell us what was wrong with our suggestions so that we cloud make the future suggestion better for you?</p>
        </div>
        <div class="px-50 mt-40">
          <div v-for="option in better_options" class="text-left py-10">
            <md-checkbox
              v-model="checked_better_options"
              :value="option.value"
              class="md-checkbox-narrow"
            >{{option.label}}</md-checkbox>
            <div class="ml-30 mr-50 my-10">
              <maryoku-input
                v-if="option.value === 'missing_essential' && checked_better_options.includes(option.value)"
                placeholder="Type what you are missing..."
              ></maryoku-input>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center py-60" style="background: #ffedb7">
        <p>You could always find a vendor on your own and go to:</p>
        <md-button class="md-simple md-outlined md-red maryoku-btn" style="background-color: white!important;width: 300px">Full Vendors List</md-button>
      </div>
    </template>
  </modal>
</template>
<script>
import Modal from "@/components/Modal.vue";
import { MaryokuInput } from "@/components";

export default {
  components: {
    Modal,
    MaryokuInput,
  },
  props: {
    proposals: {
      type: Object,
    }
  },
  data(){
    return {
      step: 2,
      checked_proposals: [],
      checked_better_options: [],
      replace: [0,1,1],
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
      console.log('next', this.checked);
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
  }
};
</script>

<style scoped lang="scss">
.border-top {
  border-top: 1px solid #707070;
}
</style>
