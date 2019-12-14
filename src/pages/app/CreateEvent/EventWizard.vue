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

              <div class="form-group">
                  <md-autocomplete v-model="eventData.location"
                                   data-vv-name="location"
                                   :md-options="locationsList"
                                   v-validate= "modelValidations.location"
                                   class="change-icon-order select-with-icon purple-field with-icon"
                                   :class="[{'md-error': errors.has('location')}]" value="">
                      <md-icon>room</md-icon>
                      <label>Event Location (City)</label>
                      <span class="md-error" v-if="errors.has('location')">This field is required</span>

                      <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                          <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                      </template>

                      <template slot="md-autocomplete-empty" slot-scope="{ term }">
                          No employees matching "{{ term }}" were found. <a @click="noop()">Create a new</a> one!
                      </template>

                  </md-autocomplete>

                  <md-checkbox v-model="haveEventPlace">I have event place</md-checkbox>
              </div>



              <md-field class="purple-field with-icon">
                  <md-icon>grade</md-icon>
                  <label>Event Type</label>
                  <md-select v-model="eventData.eventType"
                             data-vv-name="eventType"
                             v-validate= "modelValidations.eventType">
                      <md-option v-for="(type,index) in eventTypes" :key="index"  :value="type">{{ type }}</md-option>
                  </md-select>
                  <span class="md-error" v-if="errors.has('eventType')">This field is required</span>
              </md-field>

              <div class="form-group">
                  <md-datepicker
                      class="purple-field with-icon"
                      v-model="eventData.date"
                      v-validate= "modelValidations.date"
                      md-immediately
                      :class="[{'md-error': errors.has('date')}]">
                      <label>Event Date</label>
                      <span class="md-error" v-if="errors.has('date')">This field is required</span>
                  </md-datepicker>

                  <md-checkbox v-model="flexibleWithDates">I'm flexible with dates</md-checkbox>
              </div>

              <div class="event-time">
                  <md-radio v-model="eventTime" value="day" class="with-border">Day event</md-radio>
                  <md-radio v-model="eventTime" value="night" class="with-border">Night event</md-radio>
              </div>


              <div class="form-actions">
                  <md-button
                      class="md-rose next-btn"
                      @click="goToNext"
                        :class="[{'disabled': !eventData.location || !eventData.eventType || !eventData.date}]"> Next </md-button>
              </div>



          </div>
      </div>

      <go-back navigation="home"></go-back>

  </div>
</template>

<script>

    import GoBack from './componenets/GoBack';

export default {
  components: {
      GoBack
  },
    methods :{
        goToNext() {

            let vm = this;

            this.cerrors = {};
            this.validating = true;

            this.$validator.validateAll().then(isValid => {
                if (isValid) {
                    this.$router.push({ path: `/about-invited`});


                } else {
                    this.showNotify();
                }

            });

        },
        validateDate() {
            return this.$refs.datePicker.$el.classList.contains('md-has-value')
        },
        validateAndSubmit() {

            // this.$emit('goToNextPage');
            //  return;
            let vm = this;

            this.cerrors = {};
            this.validating = true;

            this.$validator.validateAll().then(isValid => {
                if (isValid) {
                    //this.$parent.isLoading = true;

                    if ( this.eventId ) {
                        vm.updateEvent();
                    } else {
                        vm.createEvent();
                    }

                } else {
                    this.showNotify();
                }

            });

            if (!this.eventType) {

            } else {
                //this.$emit('goToNextPage');
            }
        },
        showNotify() {
            this.$notify({
                message: 'Please, check all required fields',
                icon: "warning",
                horizontalAlign: 'center',
                verticalAlign: 'top',
                type: 'danger',
            });
        },
    },
  data() {
   return {

       step : 1,
       haveEventPlace : false,
       flexibleWithDates : false,
       eventTime : null,
       eventDate : null,
       eventData : {
           location : null
       },
       modelValidations: {
           location: {
               required: true,
           },
           date: {
               required: true,
           },
           eventType: {
               required: true,
           }
       },
       locationsList : ["San Francisco, California","Los Angeles, California","Jacksonville, Florida","Miami, Florida","NYC, New York","Austin, Texas","Huston, Texas"],
       eventTypes : ["Formal meeting","Offsite","Celebration / Party","Toast","Team Building","Customer event"]

   }
  }
};
</script>
<style lang="scss">


    .form-section {
        width : 30%;
        margin : 0 auto;
        padding : 0 2em;
        min-height: 440px;

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
