<template>
  <div class="special-request-section">
    <div class="font-size-22 font-bold">
      <md-checkbox class="md-checkbox-circle md-red" v-model="selected">Sitting arrangement</md-checkbox>
    </div>
    <div class="special-request-section-description">
      <div
        class="font-size-20 font-bold mt-20"
      >What kind of sitting arrangement did you have in mind?</div>
      <div
        class="mt-10"
      >You may select up to 2 options and we will endeavor to incorporate them into your event</div>
      <div class="mt-10">Please select up to 2 options</div>
    </div>
    <div class="special-request-section-options">
      <div class="md-layout">
        <div
          class="md-layout-item md-size-50 md-small-size-100 p-50"
          v-for="(option, index) in defaultOptions"
          :key="index"
        >
          <div>
            <md-checkbox class="md-simple md-red" v-model="option.selected">
              <span>{{option.name}}</span>
            </md-checkbox>
            <div class="ml-30">
              <span class="font-bold">Popular for:</span>
              {{option.popular}}
              <div>
                <img :src="`${$iconURL}Requirements/${option.icon}`" />
              </div>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-size-50 md-small-size-100 p-50">
          <div class="d-flex">
            <md-checkbox class="md-simple md-red">
              <span class="font-bold">Other:</span>
            </md-checkbox>
            <maryoku-input class="flex-1"></maryoku-input>
          </div>
        </div>
      </div>
    </div>
    <div class="special-request-section-description">
      <div class="font-size-20 font-bold">Is there going to be group work at the event?</div>
      <div class="mt-10">Which will require dedicated tables?</div>
      <div>
        <md-checkbox class="md-checkbox-circle md-red" v-model="isGroup" :value="true">Yes</md-checkbox>
        <md-checkbox class="md-checkbox-circle md-red" v-model="isGroup" :value="false">No</md-checkbox>
      </div>
      <div v-if="isGroup" class="d-flex align-start mt-20">
        <img :src="`${$iconURL}Requirements/enter-gray.svg`" style="margin-top:-10px" />
        <div>
          <div class="font-size-20 font-bold">Around what size of groups?</div>
          <div class="d-flex justify-content-between mt-10">
            <md-radio v-model="groupSize" value="3-5">3-5 people</md-radio>
            <md-radio v-model="groupSize" value="6-9">6-9 people</md-radio>
            <md-radio v-model="groupSize" value="10-13">10-13 people</md-radio>
            <md-radio v-model="groupSize" value="14-18">14-18 people</md-radio>
            <md-radio v-model="groupSize" value="19-25">19-25 people</md-radio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import MaryokuInput from "@/components/Inputs/MaryokuInput.vue";

export default {
  components: {
    MaryokuInput,
  },
  data() {
    return {
      value: "",
      selected: true,
      hasOther: false,
      isGroup: false,
      groupSize: "",
      defaultOptions: [
        {
          name: "Theatre",
          popular: "meetings, Annual General Meetings, product launches",
          icon: "theatre-small.png",
          selected: false,
        },
        {
          name: "U Shape",
          popular:
            "training, conferences, workshops, meetings, large meetings, presentations, team briefings",
          icon: "u-shape-small.png",
          selected: false,
        },
        {
          name: "Classroom",
          popular:
            "training, conferences, sales  kick-offs and product launches.",
          icon: "classroom-small.png",
          selected: false,
        },
        {
          name: "Banquet",
          popular:
            "gala dinners, awards night, Christmas parties, weddings and other informal events.",
          icon: "banquet-small.png",
          selected: false,
        },
        {
          name: "Cocktail",
          popular:
            "cocktail parties, weddings,Christmas parties and other social events.",
          icon: "cocktail-small.png",
          selected: false,
        },
        {
          name: "Boardroom",
          popular:
            "small meetings, one on one interviews, small presentations, team briefings.",
          icon: "boardroom-small.png",
          selected: false,
        },
      ],
    };
  },
};
</script>