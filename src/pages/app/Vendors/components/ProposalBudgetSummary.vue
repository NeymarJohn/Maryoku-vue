<template>
  <div class="proposal-budget-summary-wrapper">
    <div class="summary-cont">
      <h3>
        You're the 4th catering & venue bidder
      </h3>
      <p>
        Proposals range: <strong>$290 - $1200</strong>
      </p>
    </div>
    <div class="items-cont">
      <div class="item">
        <ul>
          <li>
            <md-icon>home</md-icon>
            Venue
          </li>
          <li>
            <span>Relish caterers & venues</span>
          </li>
          <li>
            <span>Your proposal</span>
            <span>$800</span>
          </li>
          <li>
            <span>Budget for venue</span>
            <span>$1100</span>
          </li>
        </ul>
      </div>
      <div class="item">
        <ul>
          <li>
            <md-icon>home</md-icon>
            Venue
          </li>
          <li>
            <span>Relish caterers & venues</span>
          </li>
          <li>
            <span>Your proposal</span>
            <span>$800</span>
          </li>
          <li>
            <span>Budget for venue</span>
            <span>$1100</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="total-cont">
      <div class="title">
        Total
      </div>
      <div class="price">
        <span>
          <strong>$800</strong><br/>
          $1100
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'proposal-budget-summary',
    components: {
    },
    props: {
    },
    data () {
      return {
      }
    },
    methods: {
    },
    created() {

    },
    mounted() {
    },
    computed: {
    },
    watch: {
    }
  }
</script>
<style lang="scss" scoped>
  .proposal-budget-summary-wrapper {
    font-family: Manrope;
    text-align: left;
    color: #050505;
    border-radius: 3px;
    padding: 43px 25px 0;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background: #ffffff;

    .summary-cont {
      h3 {
        font-size: 30px;
        font-weight: 800;
        margin: 0;
        margin-right: 82px;
      }
      p {
        font-size: 16px;
        font-weight: normal;
        margin-bottom: 33px;

        strong {
          font-size: 16px;
          font-weight: 800;
        }
      }
    }
    .items-cont {
      .item {
        padding: 33px 0;
        border-top: 0.5px solid #707070;
        ul {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 14px;

            &:first-child {
              display: block;
            }
            &:nth-child(2) {
              font-size: 14px;
              font-weight: 800;
              text-decoration: underline;
            }
            &:nth-child(3) {
              font-size: 14px;
              color: #050505;
              span:last-child {
                font-size: 20px;
                font-weight: 800;
              }
            }
            &:last-child {
              color: #818080;
              margin-bottom: 0;
              font-size: 14px;

              span:last-child {
                color: #707070;
              }
            }
          }
        }
      }
    }
    .total-cont {
      padding: 34px 25px;
      background: #404040;
      margin: auto -25px;
      color: #ffffff;
      display: flex;
      justify-content: space-between;

      .title {
        color: #ffffff;
        font-size: 16px;
      }
      .price {
        strong {
          font-size: 22px;
          font-weight: 800;
        }
        font-size: 14px;
      }
    }
  }  
</style>
