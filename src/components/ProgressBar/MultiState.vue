<template>
  <div class="multistate-progress">
    <div class="guests-progress d-flex justify-content-center align-center">
      <div
        v-for="(item, index) in calculatedData"
        :key="index"
        class="guests-progress__item green"
        :style="`width : ${item.percentage}%; z-index:${calculatedData.length-index};`"
      >
        <div class="value">{{item.value}}</div>
        <div class="progress" :style="`background-color:${item.color}`"></div>
        <div class="percentage" :style="`color:${item.color}`">{{item.percentage}}%</div>
      </div>
      <!-- <div class="guests-progress__item red" style="width : 21%;">
        <div class="value">240</div>
        <div class="progress"></div>
        <div class="percentage">21%</div>
      </div>
      <div class="guests-progress__item gray" style="width : 13%;">
        <div class="value">120</div>
        <div class="progress"></div>
        <div class="percentage">13%</div>
      </div>-->
    </div>

    <div class="guests-legends d-flex justify-content-center align-center mt-60">
      <color-dot-label
        v-for="(item, index) in data"
        :key="index"
        class="mb-40 flex-1"
        :color="item.color"
      >
        <span class="font-bold">{{item.label}}</span>
        ({{item.value}})
      </color-dot-label>
    </div>
  </div>
</template>
<script>
import ColorDotLabel from "@/components/ColorDotLabel";

export default {
  components: {
    ColorDotLabel,
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      colors: ["#2cde6b", "#f3423a", "#ffc001", "#43536a", "#cbc8c8"],
    };
  },
  created() {
    const calculatedData = [];
    const total = this.data.reduce((s, item) => {
      return s + item.value;
    }, 0);
    this.data.forEach((item) => {
      if (!item.value) return;
      item.percentage = Math.round((item.value / total) * 100);
      calculatedData.push(item);
    });
    this.calculatedData = calculatedData;
    console.log(this.data);
  },
  computed: {
    percentage() {
      const total = this.data.reduce((s, item) => {
        return s + item.value;
      }, 0);
      console.log("total", total);
      console.log(Array.from(this.data, (item) => (item.value / total) * 100));
      return Array.from(this.data, (item) => (item.value / total) * 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.multistate-progress {
  .guests-progress {
    &__item {
      text-align: center;
      font-size: 20px;
      .progress {
        border-radius: 0 100px 100px 0;
        &::before {
          background-color: inherit;
          content: "";
          width: 50px;
          height: 100%;
          display: block;
          transform: translateX(-30px);
          z-index: 5;
        }
      }
      &:first-child {
        z-index: 10;
        .progress {
          border-radius: 100px;
        }
        .progress::before {
          display: none;
        }
      }

      &:last-child {
        z-index: 1;
        .progress {
          border-radius: 0 100px 100px 0;
          &::before {
            background-color: inherit;
            content: "";
            width: 50px;
            height: 100%;
            display: block;
            transform: translateX(-30px);
          }
        }
      }
      &:first-child {
        .progress {
          border-radius: 100px;
          overflow: hidden;
        }
      }
      .value {
        font-weight: bold;
        color: #050505;
      }

      .progress {
        height: 30px;
        margin: 0.6em 0;
      }
      .percentage {
        font-weight: bold;
      }

      &.green {
        .progress {
          background-color: #2cde6b;
        }
        .percentage {
          color: #2cde6b;
        }
      }
      &.red {
        .progress {
          background-color: #f51355;
        }
        .percentage {
          color: #f51355;
        }
      }
      &.gray {
        .progress {
          background-color: #d5d5d5;
        }
        .percentage {
          color: #d5d5d5;
        }
      }
    }
  }
}
</style>