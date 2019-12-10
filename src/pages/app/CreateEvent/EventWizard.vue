<template>
  <div class="">
      <div class="section-header">
          <h2 class="section-title">Few steps to complete the background we need</h2>
          <div class="steps-wizard">
              <ul class="steps-wizard-items">
                  <li v-for="index in step" :key="index"></li>
              </ul>
          </div>
      </div>
      <div class="container">
          <div class="form-section">

              <md-field class="purple-field with-icon">
                  <md-icon>room</md-icon>
                  <label>Event Location (City)</label>
                  <md-input></md-input>
              </md-field>

              <md-checkbox v-model="haveEventPlace">I have event place</md-checkbox>

              <md-field class="purple-field with-icon">
                  <md-icon>date_range</md-icon>
                  <label>Event Date</label>
                  <md-input type="date" v-model="eventDate" ></md-input>
              </md-field>

              <md-checkbox v-model="flexibleWithDates">I'm flexible with dates</md-checkbox>

              <div class="event-time">
                  <md-radio v-model="eventTime" value="day" class="with-border">Day event</md-radio>
                  <md-radio v-model="eventTime" value="night" class="with-border">Night event</md-radio>
              </div>


              <div class="form-actions">
                  <md-button class="md-rose next-btn" @click="goToNext"> Next </md-button>
              </div>



          </div>
      </div>
  </div>
</template>

<script>
export default {
  components: {

  },
    methods :{
        goToNext() {
            this.$router.push({ path: `/about-invited`});
        }
    },
  data() {
   return {

       step : 1,
       haveEventPlace : false,
       flexibleWithDates : false,
       eventTime : null,
       eventDate : null

   }
  }
};
</script>
<style lang="scss">


    .form-section {
        width : 30%;
        margin : 0 auto;
        padding : 0 2em;
    }

    .event-time {
        display: flex;
        flex:1;
        flex-direction: row;
        justify-content: space-between;

        .md-radio {
            margin-right: 0;
            width: 47%;
        }
    }
</style>
