<template>
  <div style="width: 50px; height: 150px; position: relative; overflow: hidden;">
    <template v-for="(item, idx) in dataset">
      <div :style="{
        position: 'absolute',
        top: item.topPosition + 'px',
        left: '10px',
        width: '18px',
        height: '150px',
        borderRadius: '10px 10px 0 0',
        backgroundColor: item.color,
        zIndex: 5+idx,
      }"
      />
    </template>

    <svg width="50" height="150" style="position: relative; z-index: 20" viewBox="0 0 50 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H19C14.0294 0 10 4.02944 10 9V141C10 145.971 14.0294 150 19 150H0V0ZM19 150C23.9706 150 28 145.971 28 141V9C28 4.02944 23.9706 0 19 0H50V150H19Z" fill="#641856" />
    </svg>
  </div>
</template>
<script>
  export default {
    props: {
      chartData: {
        type: Array,
        default: []
      },
      customClass:{
        type: String,
        default: null
      }
    },
    data() {
      return {
        dataset: [],
        buffer: []
      };
    },
    computed: {
      usedHeightLength() {
        return this.chartData.filter(el => el.value > 7).length;
      },
    },
    watch: {
      chartData() {
        this.init();
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let syncValue = this.getSyncedValue();
        this.buffer = this.chartData.map(i => {
          if (!i.value) return i;
          return i.value < 7 ? {...i, value: 7} : {...i, value: i.value - syncValue};
        });

        this.dataset = this.buffer.map((item, idx) => {
          return {
            ...item,
            topPosition: this.getTopPosition(idx),
          };
        });
      },
      getSyncedValue() {
        return this.chartData.reduce((sum, item) => {
          return item.value < 7 ? sum + 7 - item.value : 0;
        }, 0) / this.usedHeightLength;
      },
      getTopPosition(idx) {
        return this.buffer.reduce((sum, it, index) => {
          return index < idx ? sum + Math.round(it.value * 1.5) : sum;
        }, 0);
      },
    }
  };
</script>
<style lang="scss" scoped>
</style>
