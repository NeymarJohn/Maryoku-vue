<template>
    <div class="">
        <div class="section-header">
            <h2 class="section-title">Tell us about the people you invited?</h2>
            <div class="steps-wizard">
                <ul class="steps-wizard-items">
                    <li v-for="index in step" :key="index"></li>
                </ul>
            </div>
        </div>
        <div class="container">
            <div class="form-section">

                <md-field class="purple-field">
                    <label>How many people do you invite?</label>
                    <md-input type="number"
                              v-model="eventData.numberOfEmployees"
                              data-vv-name="numberOfEmployees"
                              v-validate= "modelValidations.numberOfEmployees"
                              :class="[{'md-error': errors.has('numberOfEmployees')}]"></md-input>
                    <span class="md-error" v-if="errors.has('numberOfEmployees')">This field is required</span>
                </md-field>

                <md-field class="purple-field">
                    <label>% people you're expecting to show up</label>
                    <md-select v-model="eventData.expectingPeople"
                               data-vv-name="expectingPeople"
                               v-validate= "modelValidations.expectingPeople">
                        <md-option v-for="(type,index) in expectingPeople" :key="index"  :value="type">{{ type }}</md-option>
                    </md-select>
                    <span class="md-error" v-if="errors.has('expectingPeople')">This field is required</span>
                </md-field>


                <md-checkbox v-model="flexibleWithDates">Internal company event</md-checkbox>


                <div class="form-actions">
                    <md-button class="md-rose next-btn"
                               @click="goToNext"
                               :class="[{'disabled': !eventData.numberOfEmployees || !eventData.expectingPeople}]"> Next </md-button>
                </div>



            </div>
        </div>

        <go-back navigation="create-event-wizard"></go-back>


    </div>
</template>

<script>

    import GoBack from './componenets/GoBack';


    export default {
        components: {
            GoBack
        },
        data() {
            return {

                step : 2,
                haveEventPlace : false,
                flexibleWithDates : false,
                eventTime : null,
                eventDate : null,
                eventData : {},
                expectingPeople : ["10 - 30%","30 - 60%","60 - 80%","80 - 100%"],
                modelValidations: {
                    numberOfEmployees: {
                        required: true,
                    },
                    expectingPeople: {
                        required: true,
                    }
                },

            }
        },
        methods : {
            goToNext() {

                let vm = this;

                this.cerrors = {};
                this.validating = true;

                this.$validator.validateAll().then(isValid => {
                    if (isValid) {
                        this.$router.push({ path: `/event-budget`});


                    } else {
                    }

                });

            },
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
