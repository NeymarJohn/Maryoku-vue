<template>
    <div class="">
        <div class="section-header">
            <h2 class="section-title">Tell us what you care for more in this event</h2>
            <div class="steps-wizard">
                <ul class="steps-wizard-items">
                    <li v-for="index in step" :key="index"></li>
                </ul>
            </div>
        </div>
        <div class="container">
            <div class="form-section scales-section">

                <div class="range-item">
                    <div class="option left">Convinience & Accessability</div>
                    <div class="option right">Authenticity & experience</div>
                    <input type="range" v-model="eventScale1" @change="checkScale"/>
                </div>

                <div class="range-item">
                    <div class="option left">Familiar & trusted</div>
                    <div class="option right">New & adget</div>
                    <input type="range" v-model="eventScale2" @change="checkScale"/>
                </div>

                <div class="range-item">
                    <div class="option left">Within budget</div>
                    <div class="option right">Hight Value for Money</div>
                    <input type="range" v-model="eventScale3" @change="checkScale"/>
                </div>

                <div class="range-item">
                    <div class="option left">Meeting Requirements</div>
                    <div class="option right">Social & Green</div>
                    <input type="range" v-model="eventScale4" @change="checkScale"/>
                </div>

                <div class="form-actions">
                    <md-button class="md-rose next-btn"
                               @click="goToNext"
                               > Next </md-button>
                </div>

            </div>
        </div>

        <go-back navigation="event-movies"></go-back>

    </div>
</template>

<script>

    import GoBack from './componenets/GoBack';
    import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

    import PublicEventPlannerVuexModule from "./PublicEventPlanner.vuex";

    import VTooltip from 'v-tooltip'


    export default {
        components: {
            GoBack,
            VTooltip
        },
        data() {
            return {

                step : 4,
                haveEventPlace : false,
                flexibleWithDates : false,
                eventTime : null,
                eventScale1 : null,
                eventScale2 : null,
                eventScale3 : null,
                eventScale4 : null,
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
                buttonLabel : 'Skip',
                moviesPostersURL : 'http://static.maryoku.com/storage/movies/',
                eventMovieId : null,
                boardSound:  [],
                currentIndex : null,
                isPaused : false,
            }
        },
        created() {
            this.$set(this,'eventMovieId' ,this.publicEventData.eventMovieId);

        },

        methods : {
            ...mapMutations('PublicEventPlannerVuex', ['setEventProperty']),

            goToNext() {

                let vm = this;

                this.cerrors = {};
                this.validating = true;

                this.$validator.validateAll().then(isValid => {
                    let eventMovieId = this.boardSound[this.currentIndex];
                    if (isValid) {
                        this.setEventProperty({key: 'eventMovieId', actualValue: eventMovieId});
                        //this.$router.push({ path: `/event-budget`});


                    } else {
                    }

                });

            },
            skip() {

            },
            checkScale() {
                console.log(this.eventScale);
            }
        },computed : {
            ...mapState('PublicEventPlannerVuex', [
                'publicEventData',
            ])
        }
    };
</script>
<style lang="scss">

    $baseColor : #5c2153;

    .form-section.scales-section {
        width : 70%;
        margin : 0 auto;
        padding : 0 2em 5em;
        min-height: auto;
        height: auto;

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

    .range-item {
        position: relative;
        margin-bottom : 1em;
        .option {
            position: absolute;
            top :0;
            font-weight: 500;
            font-size: 15px;
            color : #606060;
            &.left {
                left : 0;
            }
            &.right {
                right : 0;
            }
        }
    }

    input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        margin: 13.8px 0;
        background: none;
        box-shadow: none;
        padding-left : 0;
        padding-right : 0;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: #AAAAAA;
        border-radius: 1.3px;
        border: 0.2px solid #010101;
        position: relative;

    }
    input[type=range]::-webkit-slider-thumb {
        height: 24px;
        width: 37px;
        border-radius: 100px;
        background: $baseColor;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -12px;
        border : 1px solid #f4f4f4;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #AAAAAA;
    }


    input[type=range]::-moz-range-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: #AAAAAA;
        border-radius: 1.3px;
        position: relative;

    }
    input[type=range]::-moz-range-thumb {
        height: 24px;
        width: 37px;
        border-radius: 100px;
        background: $baseColor;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -12px;
        border : 1px solid #f4f4f4;
    }



    input[type=range]::-ms-track {
        width: 100%;
        height: 8.4px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    input[type=range]::-ms-fill-lower {
        background: #AAAAAA;
        border: 0.2px solid #010101;
        border-radius: 2.6px;
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }
    input[type=range]::-ms-fill-upper {
        background: #AAAAAA;
        border: 0.2px solid #010101;
        border-radius: 2.6px;
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }
    input[type=range]::-ms-thumb {
        height: 24px;
        width: 37px;
        border-radius: 100px;
        background: $baseColor;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -12px;
        border : 1px solid #f4f4f4;
    }
    input[type=range]:focus::-ms-fill-lower {
        background: #AAAAAA;
    }
    input[type=range]:focus::-ms-fill-upper {
        background: #AAAAAA;
    }



</style>
