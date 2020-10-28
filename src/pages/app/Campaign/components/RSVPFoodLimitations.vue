<template>
  <div class="d-flex food-limitaions">
    <div v-for="(item, index) in limitations" :key="index" class="flex-1 food-limit-item text-center">
      <img :src="`${$iconURL}${item.icon}`" v-if="item.icon" />
      <div>
        <div>
          {{ item.label }}
        </div>
        <div>
          ({{ item.value }})
          <span style="color: #050505" @click="showPannel(index)"
            ><md-icon v-if="item.value">keyboard_arrow_down</md-icon></span
          >
        </div>
      </div>
      <div class="popover-panel" v-if="item.isOpened">
        <div class="popup-item">AAA</div>
        <div class="popup-item">BBB</div>
        <div class="popup-item">CCC</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      limitations: [],
    };
  },
  created() {
    this.limitations = this.data;
  },
  methods: {
    showPannel(index) {
      this.limitations.forEach((item) => {
        this.$set(item, "isOpened", false);
      });
      this.$set(this.limitations[index], "isOpened", !this.limitations[index].isOpened);
    },
  },
};
</script>
<style lang="scss" scoped>
.food-limitaions {
  .food-limit-item {
    height: 100px;
    border-right: solid 1px #a0a0a0;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    &:last-child {
      border: none;
    }
    .popover-panel {
      position: absolute;
      background-color: white;
      box-shadow: 0 3px 19px 0 rgba(0, 0, 0, 0.3);
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      padding: 30px;
      columns: 2;
      .popup-item {
        width: 100px;
      }
    }
  }
}
</style>