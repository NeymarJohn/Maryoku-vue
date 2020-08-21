<template>
  <div class="proposal-event-summary-wrapper">
    <template v-if="isEdit">
    </template>
    <template v-else>
      <div class="event-summary-wrapper">
        <div class="with-bkimg">
          <div class="summary-cont">
            <div class="upper">
              <h3>{{title}}</h3>
              <div class="warning-days" v-if="warning">
                <img :src="`${iconUrl}Asset 575.svg`"/> This proposal is 2 days before the original date
              </div>
            </div>
            <ul>
              <li>
                <span>Name</span>
                <p>{{eventData.name}}</p>
              </li>
              <li>
                <span>Date</span>
                <p>{{eventData.date}}</p>
              </li>
              <li>
                <span>Guest Arrival Time</span>
                <p>{{eventData.arrival_time}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="cover-letter">
          <h4>
            Dear Rachel,
          </h4>
          <p @mouseover="mouseOver()" @mouseleave="mouseLeave()">
            {{personalMessage}}
            <!-- Relish caters & venus is pleased to provide you with the attached catering proposal for you, which is currently scheduled to be held on at. -->
            <br/><br/>
            Sincerely,<br/>
            <strong>Relish cateres & venues</strong>
          </p>
          <span @click="savedItModal=true">
            More about us <md-icon>navigate_next</md-icon>
          </span>
        </div>
        <div class="contact-cont">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <img :src="`${iconUrl}Asset 593.svg`"/> <span>Relish@venue@hotmail.com</span>
            </li>
            <li>
              <img :src="`${iconUrl}Asset 573.svg`"/> <span>Relish@venue@hotmail.com</span>
            </li>
            <li>
              <img :src="`${iconUrl}Asset 591.svg`"/> <span>Relish@venue@hotmail.com</span>
            </li>
          </ul>
        </div>
        <!-- <div class="image-slider">
          <img class="item" src="http://static.maryoku.com/storage/img/sidebar-2.jpg">
          <img class="item" src="http://static.maryoku.com/storage/img/sidebar-2.jpg">
          <img class="item" src="http://static.maryoku.com/storage/img/sidebar-2.jpg">
          <img class="item" src="http://static.maryoku.com/storage/img/sidebar-2.jpg">
          <a class="more">
            <md-icon>keyboard_arrow_right</md-icon>
          </a>
        </div> -->
      </div>

      <div class="pricing-cont">
        <div class="title">
          <h4><img :src="`${iconUrl}Asset 576.svg`"/>Pricing & Details</h4>
          <p>*Work only with our catering</p>
        </div>
        <p>What would you like to take from our suggested services?</p>
        <proposal-pricing-item
          :iconUrl="iconUrl"
          :categoryIcon="`${iconUrl}Asset 614.svg`"
          :itemType="`price`"
        />
        <proposal-pricing-item
          :iconUrl="iconUrl"
          :categoryIcon="`${iconUrl}Asset 615.svg`"
          :itemType="`price`"
        />
        <proposal-pricing-item
          :iconUrl="iconUrl"
          :categoryIcon="`${iconUrl}Asset 605.svg`"
          :itemType="`price`"
        />
        <proposal-pricing-item
          :iconUrl="iconUrl"
          :categoryIcon="`${iconUrl}Asset 615.svg`"
          :itemType="`bundle`"
        />
        <proposal-pricing-item
          :iconUrl="iconUrl"
          :categoryIcon="`${iconUrl}Asset 615.svg`"
          :itemType="`total`"
        />
      </div>
      <div class="policy-cont">
        <div class="title">
          <h4><img :src="`${iconUrl}Asset 594.svg`"/> Our Policy</h4>
          <p>
            <img 
              :src="`${iconUrl}Group 5280 (5).svg`" 
              @mouseover="considerUpdate=true" 
              @mouseleave="considerUpdate=false"
            />
            Consider update
          </p>
          <div class="consider-update" v-if="considerUpdate">
            <h3>Consider Update!</h3>
            <p>If the addiiontal services you've added require additional policy changes-this is the tame to add those!</p>
          </div>
        </div>
        <div class="policy-wrapper">
          <div class="condition">
            <h6>We charge deposite is:</h6>
            <p>50% of the total event</p>
          </div>
          <div class="cancellation">
            <h5 class="subtitle">Our cancellation approach</h5>
            <h6>We allow free cancellation until:</h6>
            <p>
              30 days before the event
            </p>
            <div class="semi-column">
              <p><strong>If</strong> the client cancel the vent after 3 weeks before the event</p>
              <p><strong>If</strong> the client cancel the vent after 3 weeks before the event</p>
            </div>
            <div class="semi-column">
              <p><strong>Than</strong> the client will pay full deposite</p>
              <p><strong>Than</strong> the client will pay full deposite</p>
            </div>
            <div class="additional">
              <h6>Additional</h6>
              <p>
                Lorem
              </p>
            </div>
            <div class="signature-wrapper">
              <div class="half-side">
                <h6>Relish caterers & venues</h6>
                <div class="signature-client signature-bidder">
                  
                </div>
              </div>
              <div class="half-side">
                <h6>Client</h6>
                <div class="signature-client">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import ProposalPricingItem from './ProposalPricingItem.vue'

  export default {
    name: 'proposal-event-summary',
    components: {
      ProposalPricingItem,
    },
    props: {
      title: String, 
      eventData: Object,
      isEdit: Boolean,
      iconUrl: String,
      itemType: String,
      personalMessage: String,
    },
    data () {
      return {
        currentTab: 1,
        savedItModal: false,
        isTimeUp: false,
        hover: false,
        considerUpdate: false,
        warning: false,
      }
    },
    methods: {
      hideModal() {
        this.savedItModal = false
      },
      mouseOver() {
        this.hover = true
      },
      mouseLeave() {
        this.hover= false
      }
    },
    created() {
    },
    mounted() {
      this.savedItModal = false
      this.isTimeUp = true
    },
    computed: {
    },
    watch: {
    }
  }
</script>
<style lang="scss" scoped>
  .proposal-event-summary-wrapper {
    border-radius: 3px;
    background-color: #f5f5f5;
    font-family: 'Manrope-Regular', sans-serif;
    padding: 0 60px;
    margin-top: 50px;
    color: #050505;

    .tabs-cont {
      display: flex;
      justify-content: flex-start;
      position: relative;
      text-align: center;
      margin: 0 -60px;
      border-radius: 3px;

      .tab-item {
        flex: 1;
        font-size: 22px;
        padding: 27px 0 32px 0;
        border: solid 3px #818080;
        cursor: pointer;

        span {
          color: #050505;
          font-weight: normal;
        }

        &:first-child {
          border-right: none;
        }
        &.active {
          border-top: solid 5px #f51355;
          span {
            color: #f51355;
            font-weight: 800;
          }
        }
      }
    }
    .event-summary-wrapper {
      margin: 0 -60px;
      background-color: #ffffff;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);

      .with-bkimg {
        background-image: url("http://static.maryoku.com/storage/img/sidebar-2.jpg");
        min-height: 540px;

        .summary-cont {
          padding: 60px;
          background: rgba(255,255,255, 0.4);

          .upper {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            h3 {
              font-size: 22px;
              font-weight: 800;
              margin: 0;
              margin-right: 36px;
            } 
            .warning-days {
              padding: 12px 28px;
              background-color: #ffe5ec;
              display: inline-block;
              font-size: 14px;

              img {
                width: 27px;
                height: 27px;
                margin-right: 12px;
              }
            }
          }
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;

            li {
              padding: 0 95px;
              border-right: 1px solid #818080;
              font-size: 16px;

              span {
                font-weight: 800;
                color: #818080;
              }
              p {
                margin: 0;
                margin-top: 13px;
                font-weight: normal;
              }

              &:first-child {
                padding-left: 0;
              }
              &:last-child {
                border: none;
              }
            }
          }
        }
      }

      .cover-letter {
        padding: 0 60px;
        h4 {
          font-size: 30px;
          font-weight: 800;
          margin: 0;
          padding-top: 60px;
          padding-bottom: 25px;
        }
        p {
          margin: 0;
          font-size: 14px;

          strong {
            font-weight: 800;
          }
        }
        span {
          display: inline-block;
          font-weight: 800;
          padding-top: 36px;
          padding-bottom: 60px;
          font-size: 16px;
          color: #f51355;
          text-transform: capitalize;
          cursor: pointer;
          i {
            color: #f51355;
          }
        }
      }

      .contact-cont {
        padding: 60px;
        border-top: 1px solid #818080;

        h4 {
          font-size: 22px;
          font-weight: 800;
          margin: 0;
        }
        ul {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
          margin-top: 20px;

          li {
            font-size: 16px;
            margin-right: 55px;

            span {
              text-decoration: underline;
            }

            img {
              width: 26px;
              height: 26px;
              margin-right: 14px;
            }

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }

      .image-slider {
        padding-left: 60px;
        display: flex;
        overflow: hidden;

        .item {
          margin-right: 30px;
          width: 300px;
          min-width: 300px;
          max-height: 177px;

          &:last-child {
            margin-right: 0;
          }
        }
        a.more {
          cursor: pointer;
          position: absolute;
          background: white;
          border-radius: 20px;
          margin-top: 75px;
        }
      }

      .check-list-wrapper {
        padding: 0 60px;
        h4 {
          font-size: 22px;
          font-weight: 800;
          margin: 0;
          margin-top: 40px;
          margin-bottom: 30px;
          text-transform: capitalize;
        }
        ul {
          padding: 0;
          list-style: none;
          -webkit-column-count: 3;
          -moz-column-count: 3;
          column-count: 3;
          li {
            margin-bottom: 33px;

            i {
              color: #f51355;
              font-size: 22px;
              margin-right: 22px;
            }
          }
        }
      }
    }

    .pricing-cont {
      margin: 0 -60px;
      padding: 60px 0;

      .title {
        display: flex;
        align-items: flex-end;
        background-color: #f5f5f5;
        padding-top: 23px;
        padding-bottom: 0px;

        h4 {
          font-size: 22px;
          font-weight: 800;
          margin: 0;
          margin-right: 10px;

          img {
            width: 22px;
            height: 22px;
            margin-right: 5px;
          }
        }
        p {
          font-size: 16px;
          margin: 0;
          color: #f51355;
        }
      }
      p {
        font-size: 16px;
        font-weight: normal;
        margin-top: 14px;
        margin-bottom: 30px;
      }
    }

    .policy-cont {
      padding: 20px 0;
      margin: 0 -60px;

      .title {
        display: flex;
        align-items: center;
        padding-bottom: 30px;

        h4 {
          margin: 0;
          font-size: 30px;
          font-weight: 800;
          margin-right: 30px;

          img {
            width: 30px;
            margin-right: 16px;
          }
        }
        p {
          img {
            width: 27px;
            margin-right: 12px;
          }
        }
        .consider-update {
          position: absolute;
          background-color: #ffedb7;
          padding: 0px 15px 15px 15px;
          color: #050505;
          font-size: 14px;
          margin-left: 180px;
          margin-top: 120px;
          max-width: 350px;
          text-align: center;

          h3 {
            font-size: 20px;
            font-weight: 800;
          }
          p {
            font-size: 16px;
          }
          &::after{
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            top: 4px;
            left: 70px;
            box-sizing: border-box;
            
            border: 12px solid black;
            border-color: transparent transparent #ffedb7 #ffedb7;
            
            transform-origin: 0 0;
            transform: rotate(135deg);
          }
        }
      }
      .policy-wrapper {
        background: #ffffff;
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        padding: 60px;

        .condition {
          h6 {
            margin: 0;
            font-size: 20px;
            font-weight: 800;
            margin-bottom: 8px;
            text-transform: none;
          }
          p {
            margin: 0;
            margin-bottom: 60px;
          }
        }
        .cancellation {
          h5.subtitle {
            margin: 0;
            padding: 15px 53px 20px 55px;
            margin-left: -60px;
            background-color: #ededed;
            display: inline-block;
            font-size: 20px;
            font-weight: 800;
            text-transform: none;
          }
          h6 {
            font-size: 20px;
            font-weight: 800;
            margin-top: 30px;
            margin-bottom: 8px;
            text-transform: none;
          }
          p {
            font-size: 16px;
            margin: 0;
          }
          .semi-column {
            display: flex;
            margin-top: 35px;
            
            p {
              flex: 1;
              margin: 0;
              font-size: 16px;
              strong {
                font-size: 20px;
                font-weight: 800;
              }
            }
          }
          .additional {
            margin-top: 60px;

            h6 {
              font-size: 16px;
              font-weight: 800;
            }
            p {
              margin-top: 13px;
              font-size: 16px;
            }
          }
          .signature-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-top: 60px;

            .half-side {
              text-align: center;
              h6 {
                text-decoration: underline;
                font-size: 16px;
                font-weight: 800;
                margin: 0;
              }

              .signature-client {
                margin-top: 23px;
                min-width: 350px;
                min-height: 120px;
                border: dashed 1px #050505;
                border-radius: 3px;
              }

              &:first-child {
                h6 {
                  text-align: left;
                }
              }
            }
          }
        }
      }
    }
  }  
</style>