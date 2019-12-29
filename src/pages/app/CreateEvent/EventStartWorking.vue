<template>
    <div class="">
        <div class="section-header">
            <h2 class="section-title">Great Job! we have everything we need to start working!</h2>
            <div class="steps-wizard">
                <ul class="steps-wizard-items">
                    <li v-for="index in step" :key="index"></li>
                </ul>
            </div>
        </div>
        <div class="container no-padding-mobile">
            <div class="form-section start-working">

                <div class="start-working-item" v-for="(item,index) in startWorkingList" :key="index">
                    <md-checkbox v-model="item.selected">
                        <div class="image-cont">
                            <img :src="`http://static.maryoku.com/storage/wizard-icons/${item.img}`">
                        </div>
                        <span>{{item.title}} </span>
                        <small>{{item.desc}}</small>
                    </md-checkbox>
                </div>

                <div class="form-actions">
                    <md-button class="md-rose next-btn custom-btn"
                               @click="goToNext"
                               > Let's go </md-button>
                </div>

            </div>
        </div>

        <go-back navigation="event-scales"></go-back>

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

                step : 7,
                haveEventPlace : false,
                flexibleWithDates : false,
                eventTime : null,
                concept : false,
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
                startWorkingList : [
                    {
                        title : 'Concept and ideas',
                        desc : 'we’ll need some more info for that',
                        img : 'Component 50 – 1@2x.png',
                        selected : true
                    },
                    {
                        title : 'Detailed Budget Table',
                        desc : 'to match the concept',
                        img : 'Component 52 – 4@2x.png',
                        selected : true
                    },
                    {
                        title : 'Event Timeline',
                        desc : 'you’ll be able to edit it later',
                        img : 'Component 49 – 4@2x.png',
                        selected : true
                    },
                    {
                        title : 'Vendors proposals',
                        desc : 'to match budget, concept and timing',
                        img : 'Component 51 – 4@2x.png',
                        selected : true
                    },
                    {
                        title : 'RSVP',
                        desc : 'Campaign, invite and track attendance',
                        img : 'Component 48 – 8@2x.png',
                        selected : true
                    },
                    {
                        title : 'On day coordination',
                        desc : 'to match budget, concept and timing',
                        img : 'Component 51 – 4@2x.png',
                        selected : true
                    }
                ]
            }
        },
        created() {
            // this.$set(this,'eventMovieId' ,this.publicEventData.eventMovieId);

            if ( this.publicEventData.eventNeededServices ) {
                this.$set(this,'startWorkingList' ,this.publicEventData.eventNeededServices);

            }



        },

        methods : {
            ...mapMutations('PublicEventPlannerVuex', ['setEventProperty']),

            goToNext() {

                let vm = this;

                this.cerrors = {};
                this.validating = true;


                //open the modal

                this.$validator.validateAll().then(isValid => {

                    if (isValid) {
                        this.setEventProperty({key: 'eventNeededServices', actualValue: this.startWorkingList});

                        this.$router.push({ path: `/event-created`});


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

    .form-section.start-working {
        width : 60%;
        margin : 0 auto;
        padding : 0 2em 5em;
        height: auto;
        min-height: 440px;

    }

    .start-working {

        &-item {
           width : 48%;
            display: inline-block;
            font-family: 'Open Sans';

            .md-checkbox {
                display: flex;
                flex-direction: row-reverse;
                border : 1px solid #aaa;
                border-radius: 12px;
                height: 72px;
                justify-content: space-between;
                align-items: center;
                padding: 0 1em;
                margin-bottom : 0;

                .image-cont {
                    position: absolute;
                    left : 0;
                    width : 50px;
                    text-align: center;
                }

                img {
                    filter: gray; /* IE6-9 */
                    -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
                    filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
                    opacity: 0.6;
                    width: 37px;

                }


                label {
                    position: relative !important;
                    padding-left : 64px !important;
                    height: auto !important;

                    img {

                    }
                    small {
                        display: block;
                        font-size: 11px;
                        color : #606060;
                        font-weight: bold;
                    }
                }

                &.md-checked {
                    border : 1px solid $baseColor;

                    label {
                        img {
                            -webkit-filter: grayscale(0);
                            filter: none;
                            opacity: 1;
                        }
                    }

                }


            }


        }
    }


</style>
