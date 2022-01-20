<template>
  <div class="proposal-page_details">
    <div class="proposal-content">
        <div class="proposal-info">
            <div class="proposal-body">
                <div class="md-simple d-flex justify-content-center">
                    <img
                        v-tooltip="{
                            html: true,
                            content: '<p></p>',
                            delay: { show: 200, hide: 100 },
                            trigger: 'hover',
                            placement: 'bottom',
                            classes: 'vendor-tooltip-theme',
                        }"
                        src="/static/icons//hand-shaking.svg"

                    />
                </div>
                <div class="d-flex justify-content-center">
                    <div class="md-small-hide">
                        <div class="start-communicating">
                            LET'S START COMMUNICATING..
                        </div>
                        <div class="to-start">
                            To start communication, click on one of the planer on the left, or start a new conversation. more information
                        </div>
                        <!-- <div class="lets-begin"> -->
                            <div class="md-vendor lets-begin"><div class="lets-text">Let's Begin</div></div>
                        <!-- </div> -->
                    </div>
                    <div class="md-small-hide">
                    </div>
                </div>
            </div>
            <div class="footer-strip d-flex justify-content-center">
                For more information and an explanation of how to start a new offer, <span class="click-style-1"> click here.</span>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
//MAIN MODULES


import _ from "underscore";

import Proposal from "@/models/Proposal";

//COMPONENTS
const components = {
}

export default {
  components,
  props: {
    proposal: {
      type: Object,
      default: () => {},
    },
    landingPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
  created() {
  },

  methods: {
  },
  computed: {
  },
  filters: {
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>
.proposal-page {
  &_details {
    .alert-danger {
      background-color: #ffe5ec;
      font-size: 12px;
      color: #050505;
      margin-left: 1em;
      box-shadow: none;
      padding: 0.6em 1.4em;
      display: inline-block;
    }

    .proposal-content {
        // margin: 0 2em;
        position: relative;

        .proposal-info {
            background: #fff;
            box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        }

        .proposal-header {
            background-size: cover !important;
            position: relative;
            .event-info {
            background: rgba(255, 255, 255, 0.76);
            align-items: center;
            padding: 2.5em;

            h3 {
                margin: 0;
                font-size: 20px;
                font-weight: 800;
                color: #050505;
            }
            }
            .event-details {
            list-style: none;
            display: flex;
            flex-direction: row;
            margin: 0;
            padding: 0;

            &__item {
                font-size: 14px;
                padding-bottom: 10px;
                &:not(:last-child) {
                border-right: 1px solid #818080;
                padding-right: 80px;
                margin-right: 80px;
                }

                label {
                font-weight: 800;
                margin-bottom: 1em;
                }
                .info-text {
                color: #050505;
                }
            }
            }
        }

        .proposal-body {
            position: relative;
            padding:124px 207.3px 135px 208.5px;

            h1 {
            margin: 1em 0 0;
            font-size: 28px;
            font-weight: 800;
            color: #050505;
            }

            p {
            font-size: 14px;
            color: #050505;
            .proposal-title {
                font-weight: 800;
                display: block;
            }
            }

            .proposal-includes {
            margin: 3em 0;
            padding-right: 20%;
            &__title {
                margin-bottom: 1em;
            }
            &__item {
                display: inline-block;
                width: 29%;
                margin-bottom: 1.5em;

                img {
                width: 20px;
                margin-right: 1em;
                }
            }
            }

            .start-communicating {
                width: 764px;
                height: 68px;
                margin: 45.2px 0 55px;
                // font-family: Manrope;
                font-size: 40px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.52;
                letter-spacing: normal;
                text-align: center;
                color: #641856;
            }
            .to-start{
                width: 673px;
                height: 63px;
                margin: 55px 45.5px;
                // font-family: Manrope;
                font-size: 22px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: center;
                color: #050505;
            }
            .lets-begin {
                width: 312px;
                height: 72px;
                margin: 55px 215.5px 0 236.5px;
                padding: 20.5px 101px 24.5px;
                border-radius: 3px;
                border: solid 1px #641856;
                background-color: #641856;
                cursor: pointer;
            }
            .lets-text {
                width: 110px;
                height: 27px;
                // font-family: Manrope;
                font-size: 20px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: 0.42px;
                text-align: center;
                color: #fff;
            }

        }

        .footer-strip {
            // width: 1180px;
            width: 100%;
            // height: 66px;
            // margin: 2.5px 93px 31.5px 92px;
            padding: 24px 316px 23px 338px;
            border-radius: 3px;
            background-color: #ffefff;
        }
        .click-style-1 {
            color: #641856;
            cursor: pointer;
        }

        .proposal-section {
            &__title {
            font-size: 20px;
            font-weight: 800;
            color: #050505;
            img {
                margin-right: 0.2em;
            }

            /*img.seating{*/
            /*  filter:brightness(0) invert(0);*/
            /*}*/

            small {
                margin-top: 0.5em;
                font-size: 14px;
                color: #050505;
                display: block;
            }
            }

        }

    }

  }

  &_header {
    padding: 0.5em 1em;
    font-size: 30px;
    a {
      text-decoration: underline;
      font-weight: 800;
      font-size: 30px;
      color: #050505 !important;
      text-transform: capitalize;
    }

    img {
      width: 30px;
      margin-right: 0.5em;
    }
  }
}
.bg-light-gray{
    background-color: #f8fafb;
}
</style>


