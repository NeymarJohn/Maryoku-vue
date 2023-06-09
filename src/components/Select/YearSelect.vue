<template>
  <div v-click-outside="close" class="select-wrapper" @click="handleOpen">
    <div class="select" :class="{ open: isOpen }">
      <div class="select__trigger">
        <span style="display: inline-block; padding-left: 120px">{{ selected }}</span>
        <div class="arrow" />
      </div>
      <div class="custom-options">
        <span
          v-for="(item, index) of data"
          :key="index"
          class="custom-option"
          :class="{ selected: item == selected }"
          :data-value="item"
          @click="handleClick"
        >{{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "YearSelect",
  props: {
    width: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: () => []
    },
    initialValue: {
      type: [String, Number],
      default: ""
    },
  },
  data () {
    return {
      selected: "",
      isOpen: false,
    };
  },
  mounted () {
    this.selected = this.initialValue;
  },
  methods: {
    close () {
      this.isOpen = false;
    },
    handleOpen () {
      this.isOpen = !this.isOpen;
    },
    handleClick (e) {
      e.stopPropagation();
      const value = e.target.dataset.value;
      this.selected = value;
      this.$emit("valueChanged", value);
      this.close();
    },
  },
};
</script>

<style scoped lang="scss">
.select-wrapper {
  position: relative;
  user-select: none;
  width: 177px
}
.select {
  position: relative;
  display: flex;
  flex-direction: column;
}
.select__trigger {
  font-family: 'Manrope-ExtraBold';
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: white;
  cursor: pointer;
}
.custom-options {
  position: absolute;
  display: block;
  top: 25px;
  left: 0;
  right: 20px;
  border-radius: 5px;
  padding: 5px 10px;
  background: #fff;
  transition: all 0.5s;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 99;
  width: 177px;
}
.select.open .custom-options {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
  width: 177px;
}
.custom-option {
  font-family: 'Manrope-Bold';
  font-size: 15px;
  letter-spacing: -0.2px;
  padding-left: 8px;
  position: relative;
  display: block;
  font-size: 16px;
  color: #3b3b3b;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.5s;
}
.custom-option:hover {
  cursor: pointer;
  background-color: #f2e8f1;
}
.custom-option.selected {
  color: #641856;
  background-color: #e9dfe8;
}

.arrow {
  position: relative;
  height: 6px;
  width: 6px;
}
.arrow::before,
.arrow::after {
  content: '';
  position: absolute;
  bottom: 0px;
  width: 0.15rem;
  height: 100%;
}
.arrow::before {
  left: -2px;
  transform: rotate(-45deg);
  background-color: white;
}
.arrow::after {
  left: 2px;
  transform: rotate(45deg);
  background-color: white;
}
.open .arrow::before {
  left: -2px;
  transform: rotate(45deg);
}
.open .arrow::after {
  left: 2px;
  transform: rotate(-45deg);
}
</style>
