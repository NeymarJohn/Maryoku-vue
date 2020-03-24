<template>
  <div class="vendor-bid-time-counter-wrapper">
    <div class="time-cont">
      <ul>
        <li>{{d | attachZero }}<br/><span>Days</span></li>
        <li>:</li>
        <li>{{h | attachZero }}<br/><span>Hours</span></li>
        <li>:</li>
        <li>{{m | attachZero }}<br/><span>Min</span></li>
        <li>:</li>
        <li>{{s | attachZero }}<br/><span>Sec</span></li>
      </ul>
    </div>
    <div class="action-cont">
      To send your bid
    </div>
  </div>
</template>
<script>
  export default {
    name: 'vendor-bit-time-counter',
    components: {
    },
    props: {
      days: Number,
      hours: Number,
      minutes: Number,
      seconds: Number
    },
    data () {
      return {
        totalTime: 0,
        d: 0, 
        h: 0,
        m: 0,
        s: 0
      }
    },
    methods: {
      timerCount: function() {
        this.totalTime -= 1000;
        this.calcTime(this.totalTime)
      },
      calcTime: function(totalTime){
        this.d = Math.floor(totalTime / (1000 * 60 * 60 * 24));
        this.h = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.m = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
        this.s = Math.floor((totalTime % (1000 * 60)) / 1000);
      }
    },
    created() {

    },
    mounted() {
      this.totalTime = (this.days * 24 * 60 * 60 * 1000) +
                      (this.hours * 60 * 60 * 1000) +
                      (this.minutes * 60 * 1000) +
                      (this.seconds * 1000)
      if (this.totalTime != 0) {
        this.timerCount();
        this.interval = setInterval(() => {
          this.timerCount();
        }, 1000);
      }
    },
    computed: {
    },
    watch: {
    },
    filters: {
      attachZero(number) {
        return number > 9 ? number : '0' + number.toString()
      }
    },
  }
</script>
<style lang="scss" scoped>
  .vendor-bid-time-counter-wrapper {
    background-color: #ffc001;
    font-family: 'Manrope-Regular', sans-serif;
    text-align: center;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    color: #ffffff;

    .time-cont {
      padding: 15px 34px 9px 34px;
      font-size: 30px;
      font-weight: bold;
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        li {
          padding-right: 16px;

          span {
            font-size: 14px;
            font-weight: normal;
          }

          &:last-child {
            padding-right: 0;
          }
        }
      }
    }
    .action-cont {
      font-size: 14px;
      font-weight: bold;
      padding: 9px 0;
      border-top: 2px solid rgba(255,255,255,0.64);
    }
  }  
</style>
