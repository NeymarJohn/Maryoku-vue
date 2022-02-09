<template>
  <div class="select-wrapper" :class="{ open: isOpen }" v-click-outside="close" @click="handleOpen">
    <div class="select" :class="{ open: isOpen }">
      <div class="select__trigger">
        <span class="selected-option" :class="{ selected: selected !== initialValue }">{{ selected }}</span>
        <div class="arrow"></div>
      </div>
      <div class="custom-options">
        <span
          v-for="(item, index) of data"
          class="custom-option"
          :class="{ selected: item === selected }"
          :key="index"
          :data-value="item"
          @click="(e)=>handleClick(e, index.toString())"
        >{{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomizableSelect',
  props: {
    width: String,
    data: {type: Array, required: true},
    initialValue: {type:[String , Number], required: true,
    },
  },
  data () {
    return {
      selected: '',
      isOpen: false,
      customClasses:{
          'select_wrapper': {
              'color': '#22222;'
          },
          select__trigger:{}
      },
    }
  },
  mounted () {
    this.selected = this.initialValue
  },
  methods: {
    close () {
      this.isOpen = false
    },
    handleOpen () {
      this.isOpen = !this.isOpen
    },
    handleClick (e, index) {
      e.stopPropagation()
      this.selected = e.target.dataset.value
      this.$emit('valueChanged', index)
      this.close()
    },
  },
}
</script>

<style scoped lang="scss">
.select-wrapper {
    font-family: 'Manrope-Regular';
    position: relative;
    user-select: none;
    width: 336.6px;
    height: 46.6px;
    padding: 13.8px 27.9px 10.7px 27.1px;
    border-radius: 3px;
    border: solid 1px #818080;
}
.selected-option {
    color: #818080;
    display: inline-block;
    font-size: 16px;
 }
.selected-option.selected {
  color: #050500;
  font-family: 'Manrope-Bold';
  display: inline-block;
}
.select {
  position: relative;
  display: flex;
  flex-direction: column;
}
.select-wrapper.open{
  border-color: #641856;
}
.select__trigger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: black;
  cursor: pointer;
}
.custom-options {
  position: absolute;
  display: block;
  width: 336.6px;
  overflow: auto;
  height: 140px;
  top: 25px;
  left: -28px;
  border-radius: 0 0 5px 5px;
  border: 1px solid #818080;
  border-top: 0;
  background: #fff;
  transition: all 0.5s;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 99;
}
.select.open .custom-options {
  border-color: #641856;
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}
.custom-option {
  width: 95%;
  height: 33px;
  letter-spacing: -0.2px;
  position: relative;
  display: block;
  margin: auto;
  padding: 8.9px 19.3px 10px 12.3px;
  font-size: 16px;
  color: #050505;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.5s;
}
.custom-option:hover {
  cursor: pointer;
  font-family: 'Manrope-Bold';
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
  background-color: #818080;

}
.arrow::before {
  left: -2px;
  transform: rotate(-45deg);
}
.arrow::after {
  left: 2px;
  transform: rotate(45deg);
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
