<template>
  <div class="vendor-bid-time-counter-wrapper event" :class="customClass">
    <div v-if="topContent" class="action-cont border-bottom">
      {{ topContent }}
    </div>
    <div class="time-cont">
      <ul>
        <li class="fix-digit">
          {{ d | attachZero }}<br><span>Days</span>
        </li>
        <li class="mt-10">:</li>
        <li class="fix-digit">
          {{ h | attachZero }}<br><span>Hours</span>
        </li>
        <li class="mt-10">:</li>
        <li class="fix-digit">
          {{ m | attachZero }}<br><span>Min</span>
        </li>
        <li class="mt-10">:</li>
        <li class="fix-digit">
          {{ s | attachZero }}<br><span>Sec</span>
        </li>
      </ul>
    </div>
    <div v-if="bottomContent" class="action-cont border-top">
      {{ bottomContent }}
    </div>
  </div>
</template>
<script>
export default {
  name: "VendorBitTimeCounter",
  components: {},
  filters: {
    attachZero(number) {
      return number > 9 ? number : "0" + number.toString();
    },
  },
  props: {
    days: {
      type: Number,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
    seconds: {
      type: Number,
      required: true,
    },
    topContent: {
      type: String,
      default: "",
    },
    bottomContent: {
      type: String,
      default: "",
    },
    customClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      totalTime: 0,
      d: 0,
      h: 0,
      m: 0,
      s: 0,
    };
  },
  computed: {},
  watch: {
    days(newVal){this.init();},
    hours(newVal){this.init();},
    minutes(newVal){this.init();},
    seconds(newVal){this.init();},
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    timerCount: function () {
      this.totalTime -= 1000;
      this.calcTime(this.totalTime);
    },
    calcTime: function (totalTime) {
      this.d = Math.floor(totalTime / (1000 * 60 * 60 * 24));
      this.h = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.m = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
      this.s = Math.floor((totalTime % (1000 * 60)) / 1000);
    },
    init(){
        this.totalTime =
            this.days * 24 * 60 * 60 * 1000 + this.hours * 60 * 60 * 1000 + this.minutes * 60 * 1000 + this.seconds * 1000;
        if (this.totalTime != 0) {
            this.timerCount();
            this.interval = setInterval(() => {
                this.timerCount();
            }, 1000);
        }
    }
  },
};
</script>
<style lang="scss" scoped>
.vendor-bid-time-counter-wrapper {
  font-family: "Manrope-Regular", sans-serif;
  text-align: center;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  color: #ffffff;

  .time-cont {
    padding: 18px 34px 9px 34px;
    font-size: 30px;
    font-weight: bold;

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      justify-content: center;

      li {
        margin-right: 16px;

        span {
          font-size: 14px;
          font-weight: normal;
        }

        &.fix-digit {
          width: 38px;
          padding: 10px 0;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .action-cont {
    font-size: 13px;
    padding: 16px 0;
    margin: 0 20px;
  }
  .border-top{border-top: .5px solid rgba(255, 255, 255, 0.64);}
  .border-bottom{border-bottom: .5px solid rgba(255, 255, 255, 0.64);}
}
</style>
