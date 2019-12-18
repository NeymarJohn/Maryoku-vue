<template>
    <div class="">
        <div class="section-header">
            <h2 class="section-title">Let’s make sure we understand the vibe you’re looking for</h2>
            <div class="steps-wizard">
                <ul class="steps-wizard-items">
                    <li v-for="index in step" :key="index"></li>
                </ul>
            </div>
        </div>
        <div class="container">
            <div class="form-section">

                <div class="vibes-list">
                    <div class="vibe-item" v-for="index in 8" :key="index">
<!--                        <md-icon>pause_circle_filled</md-icon>-->
                        <md-icon>play_circle_filled</md-icon>
                        <md-radio v-model="eventTime" value="day" class="with-border">
                            <small>ABBA</small><br>
                            Money Money Money
                        </md-radio>
                    </div>
                </div>

                <div class="form-actions">
                    <md-button class="md-default next-btn"
                               :class="[{'opacity-btn' : buttonLabel === 'Skip'}]"
                               @mouseover="buttonLabel='I don\'t know yet'" @mouseleave="buttonLabel='Skip'" > {{buttonLabel}} </md-button>
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

                step : 4,
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
                buttonLabel : 'Skip'

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

    $baseColor : #5c2153;

    .form-section {
        width : 65%;
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

    .vibe-item {
        width : 50%;
        display: inline-block;
        float : left;

        >.md-icon {
            font-size: 3rem !important;
            float: left;
            margin-top: 0.6em;
            margin-right: 0.4em;
            color : #AAAAAA !important;
            &:hover {
                color : $baseColor !important;
            }
        }

        .md-radio.md-checked .md-radio-container {
            //border: 1px solid $baseColor !important;

            &:after {
                //background-color : $baseColor !important;
            }
        }

        .md-radio.with-border {
            // border: 1px solid #aaaaaa;

            height: 52px;
            padding : 4px;
            width: 81%;

            &:hover {
                border-color : $baseColor;
            }

            label {
                font-size: 15px;
                line-height: 17px;

                small {
                    font-size: 11px;
                }
            }

            .md-radio-container {
                position : absolute;
                right : 1em;
                top : 0.8em;
            }

            &:hover {
                .md-radio-container {
                    &:after {
                        background-color: $baseColor !important;
                        opacity: 0.7;
                        transform: scale3D(1,1,1);
                    }
                }
            }

            &.md-checked {
                //border: 1px solid $baseColor;

                .md-radio-label {
                    //color : $baseColor;
                }
            }
        }

    }

</style>
