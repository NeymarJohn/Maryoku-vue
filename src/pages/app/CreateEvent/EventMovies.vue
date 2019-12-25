<template>
    <div class="">
        <div class="section-header">
            <h2 class="section-title">Which movie or TV show character would you say your boss is</h2>
            <div class="steps-wizard">
                <ul class="steps-wizard-items">
                    <li v-for="index in step" :key="index"></li>
                </ul>
            </div>
        </div>
        <div class="container">
            <div class="form-section movies-section">

                <div class="movies-list">
                    <div class="movie-item"v-for="(movie,index) in moviesList"
                         :key="index"
                    >
<!--                        <md-icon>pause_circle_filled</md-icon>-->
                        <div class="movie-wallpaper" :style="`background : url(${moviesPostersURL + movie.image}) center center no-repeat;`"></div>
                        <md-radio v-model="eventData.eventMovieId"
                                  v-tooltip="{
  content: movie.tooltip,
  placement: 'top-center',
  classes: ['info'],
  targetClasses: ['it-has-a-tooltip'],
  offset: 100,
  delay: {
    show: 500,
    hide: 300,
  },
}"

                                  :value="movie.image" class="movie-radio"><small>Godfather</small><br>{{movie.title}}</md-radio>
                    </div>
                </div>

                <div class="form-actions">
                    <md-button class="md-rose next-btn"
                               @click="goToNext"
                               :class="[{'disabled': !eventData.eventMovieId}]"> Next </md-button>
                </div>

            </div>
        </div>

        <go-back navigation="event-budget"></go-back>

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
                moviesList : [
                    {
                        image : 'amy-santiago.png',
                        tooltip : 'is a "by the book" type of cop but she takes it a step further by color-coding case files. With her, everything is calculated to perfection and if you want her approval, make sure your budget table is impeccable',
                        title : 'Amy'
                    },
                    {
                        image : 'amybrookheimer.jpg',
                        tooltip : 'is hyper-competitive, has a deep needto please and can also be a catastrophist. She wants to be the best at everything, and if your event is not perfectly planned her stress levels will skyrocket ',
                        title : 'Amy Brookheimer'
                    },
                    {
                        image : 'captain-kirk2.png',
                        tooltip : '"Star Trek" is all about going boldly where no one has gone before -- and nobody is bolder than Captain James T. Kirk. To please him you’d have to come up with fresh ideas, edgy concepts and flawless plan to execute',
                        title : 'Captain Kirk'
                    },
                    {
                        image : 'dirty-harry2.png',
                        tooltip : 'is not a "company man" and not a real team player (his partners got killed or wounded at an alarming rate). But, what he did have was laser focus on achieving his goals. His moto is: do what you have to do, and we bet if you do the plan he’ll approve it...or shoot you.  ',
                        title : 'Dirty Harry'
                    },
                    {
                        image : 'jerry-seinfeld.png',
                        tooltip : 'Seinfeld\'s is very meticulous about the cleanliness and organization of his apartment. He is stubborn and holds ontightly to his opinions. He isn\'t easy to convince, and your plan better be well organized before you seek his approval',
                        title : 'Seinfeld'
                    },
                    {
                        image : 'joan-harris.jpg',
                        tooltip : 'Joan Harris is a queen bee. She likes things the way she likes them. At times she can seem bossy or hard to please -- her standards are extremely high and you better have everything nailed before you show her your event plan',
                        title : 'Joan Harris'
                    },
                    {
                        image : 'mirandapreistly.jpg',
                        tooltip : 'Miranda Priestly personifies qualities of a classic A type boss: controlling, demanding and impossible to please. Her favorite words to utter, after all, are "do it correctly." You may try to, but we all know how this well end.',
                        title : 'Miranda Priestly'
                    },
                    {
                        image : 'soprano.png',
                        tooltip : 'Tony Soprano doesn\'t like to wait and neither does your boss. Impatience is a key characteristic for him. Waiting for vendors’ proposals or a well crafted event plan can be equally frustrating for him',
                        title : 'Tony Soprano'
                    }
                ]
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
                        this.$router.push({ path: `/event-scales`});


                    } else {
                    }

                });

            },
            skip() {

            },
            songName(name){
                console.log(name);

                var newStr = name.replace(/_/g, " ");
                return newStr.replace(".mp3","");

            },

            pauseSong(index) {
                this.boardSound[index].pause();
                this.currentIndex = null;
            },
            playSong (index) {

                if ( this.currentIndex ) {
                    this.boardSound[this.currentIndex].pause();
                }

                this.boardSound[index].play();

                this.currentIndex = index;

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

    .form-section.movies-section {
        width : 90%;
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


    .movies-list {

        .movie-wallpaper {

            border-radius: 12px 12px 0 0;
            background-size: cover !important;
            height: 70%;
            position: relative;
            &:after {
                content : ' ';
                background: linear-gradient(
                        rgba(244, 244, 244, 0),
                        rgba(244, 244, 244, 0.5),
                    rgba(244, 244, 244, 1));
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: 95px;
            }
        }
    }

    .movie-item {
        width: 164px;
        display: inline-block;
        float : left;
        margin : 0 1em 2em;
        position: relative;
        height: 210px;
        border : 1px solid #aaa;
        border-radius: 12px;

        &:hover {
            border-color : $baseColor;
        }

        .md-icon {
            font-size: 3rem !important;
            float: left;
            margin-top: 0.6em;
            margin-right: 0.4em;
            color : #AAAAAA !important;
            &:hover {
                color : $baseColor !important;
            }
            &.pause-icon {
                color : #F51355 !important;
            }
        }

        .md-radio.md-checked .md-radio-container {
            //border: 1px solid $baseColor !important;

            &:after {
                //background-color : $baseColor !important;
            }
        }

        .md-radio.movie-radio {
            // border: 1px solid #aaaaaa;
            background: linear-gradient(
                    rgba(244, 244, 244, 0)
                ,rgba(244, 244, 244, 1));
            position: absolute;
            bottom : 1px;
            left:1px;
            right: 1px;
            border-radius: 0 0 12px 12px;
            padding: 72% 0 0;
            width: 99%;
            margin: 0 !important;
            height: 100%;

            &:hover {
                background: linear-gradient(
                        rgba(255, 255, 255, 0)
                    ,rgba(255, 255, 255, 1));
            }

            label {
                font-size: 15px;
                width: 100%;
                font-weight: 500;
                color: rgba(96, 96, 96, 1);
                padding: 0;
                text-align: center;

                small {
                    font-size: 11px;
                    text-transform: uppercase;
                    font-weight: 400;
                }
            }

            .md-radio-container {
                position: absolute;
                right: 0;
                bottom: 12px;
                left: 0;
                top: auto;
                margin: 0 auto;
                width: 24px;
                min-width: 24px;
                height: 24px;
                z-index : 9999999999999999;
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






    .tooltip {

        display: block;
        z-index: 9999999999999999999;
        position: relative;

        .tooltip-inner {
            background: white;
            color: #525252;
            border-radius: 12px;
            padding: 15px 20px;
            font-size: 15px;
            border-color: #606060;
        }

        .tooltip-arrow {
            width: 0;
            height: 0;
            border-style: solid;
            margin: 0;
            border-color: #606060;
        }

        &[x-placement^="top"] {

            .tooltip-arrow {
                border-width: 5px 5px 0 5px;
                border-left-color: transparent !important;
                border-right-color: transparent !important;
                border-bottom-color: transparent !important;
                bottom: -5px;
                left: calc(50% - 5px);
                margin-top: 0;
                margin-bottom: 0;
            }

            .tooltip-inner {
                //margin-top : 50px;
            }
        }

        &[x-placement^="bottom"] {
            margin-top: -90px;

            .tooltip-arrow {
                border-width: 0 5px 5px 5px;
                border-left-color: transparent !important;
                border-right-color: transparent !important;
                border-top-color: transparent !important;
                top: -5px;
                left: calc(50% - 5px);
                margin-top: 0;
                margin-bottom: 0;
            }

            .tooltip-inner {
                margin-top : -70px;
            }

        }

        &[x-placement^="right"] {
            margin-left: 5px;

            .tooltip-arrow {
                border-width: 5px 5px 5px 0;
                border-left-color: transparent !important;
                border-top-color: transparent !important;
                border-bottom-color: transparent !important;
                left: -5px;
                top: calc(50% - 5px);
                margin-left: 0;
                margin-right: 0;
            }
        }

        &[x-placement^="left"] {
            margin-right: 5px;

            .tooltip-arrow {
                border-width: 5px 0 5px 5px;
                border-top-color: transparent !important;
                border-right-color: transparent !important;
                border-bottom-color: transparent !important;
                right: -5px;
                top: calc(50% - 5px);
                margin-left: 0;
                margin-right: 0;
            }
        }

        &[aria-hidden='true'] {
            visibility: hidden;
            opacity: 0;
            transition: opacity .15s, visibility .15s;
        }

        &[aria-hidden='false'] {
            visibility: visible;
            opacity: 1;
            transition: opacity .15s;
        }
    }


</style>
