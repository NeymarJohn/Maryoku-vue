<template>
    <div class="">
        <div class="section-header">
            <h2 class="section-title">And the million dollar question - your budget</h2>
            <div class="steps-wizard">
                <ul class="steps-wizard-items">
                    <li v-for="index in step" :key="index"></li>
                </ul>
            </div>
        </div>
        <div class="container">
            <div class="form-section">

                <md-field class="purple-field">
                    <label>Total budget</label>
                    <md-input
                        type="number"
                        v-model="eventData.totalBudget"
                        data-vv-name="totalBudget"
                        v-validate= "modelValidations.totalBudget"
                        :class="[{'md-error': errors.has('totalBudget')}]"
                    ></md-input>
                    <span class="md-error" v-if="errors.has('totalBudget')">This field is required</span>

                </md-field>

                <div class="divider text-center mt10">
                    Or
                </div>

                <md-field class="purple-field">
                    <label>Per guest budget</label>
                    <md-input
                        type="number"
                        v-model="eventData.budgetPerPerson"
                        data-vv-name="budgetPerPerson"
                        v-validate= "modelValidations.budgetPerPerson"
                        :class="[{'md-error': errors.has('budgetPerPerson')}]"
                    ></md-input>
                    <span class="md-error" v-if="errors.has('budgetPerPerson')">This field is required</span>

                </md-field>
                <div class="field-small-note"> <small>Guest estimation: 200</small> </div>

                <div class="form-actions">
                    <md-button class="md-default next-btn disabled"> Build my budget </md-button>
                    <md-button class="md-rose next-btn"
                               @click="goToNext"
                               :class="[{'disabled': !eventData.budgetPerPerson || !eventData.totalBudget}]"> Next </md-button>
                </div>



            </div>
        </div>

        <go-back navigation="about-invited"></go-back>

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

                step : 3,
                haveEventPlace : false,
                flexibleWithDates : false,
                eventTime : null,
                eventData : {

                },
                modelValidations: {
                    totalBudget : {
                        required: true,
                    },
                    budgetPerPerson: {
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
                        //this.$router.push({ path: `/event-budget`});


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

        .divider {
            margin-top : 1em;
        }

        .field-small-note {
            font-size: 15px;
            color : #aaa;
            font-weight: bold;
            text-align: center;
        }
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
