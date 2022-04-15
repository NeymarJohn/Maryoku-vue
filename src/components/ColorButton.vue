<template>
  <div class="maryoku-component color-select-button">
    <div v-if="showColorPane" class="color-select-button-mask" style="z-index: 1" @click="toggleColorPane()" />
    <md-button
      v-if="bgc"
      class="md-just-icon"
      :style="`background-color: ${bgc} !important; opacity:${alpha}; width:${size}px; height:${size}px`"
      @click="toggleColorPane()"
    />
    <md-button
      v-else
      class="add-button md-just-icon md-white"
      :style="`width:${size}px; height:${size}px`"
      @click="toggleColorPane()"
    >
      <img :src="`${$iconURL}Concept/Asset 488.svg`" width="20">
    </md-button>
    <div
      v-if="showColorPane"
      class="color-piker-wrapper"
      id="conceptColorPikerWrapper"
    >
      <span class="">
        Colors Picker
      </span>
      <chrome-picker
        :value="selectedColour"
        label="Pick Colour"
        picker="chrome"
        @input="updateValue"
      />
      <div>
        <div class="chosen-color-block">
          <input :value="bgc" style="width: 45%" @change="inputUpdateValue">
          <md-button class="md-rose md-simple" style="border-radius: 3px; border: 1px solid; font-weight: 800; width: 45% " @click="saveColor"> Save </md-button>
        </div>
        <div class="select-colors">
          <span>My Saved Colors</span>
          <div v-if="savedColors" class="colors-wrapper">
            <span v-for="(colorItem, i) in savedColors"
                  :key="colorItem.hex + i"
                  v-bind:style="'background-color: ' + colorItem.hex"
                  class="picked-color"
                  @click="updateValue(colorItem)"></span>
          </div>
          <span v-else style="font-weight: normal; font-size: 12px; color: black">No saved colors</span>
        </div>
        <div class="select-colors">
          <span style="margin-bottom: 0 ">Last Piked Colors</span>
          <div class="colors-wrapper">
            <span v-for="(colorItem, i) in lastPickedColors"
                  :key="i"
                  v-bind:style="'background-color: ' + colorItem.color"
                  class="picked-color"
                  @click="updateValue({hex: colorItem.color, a:colorItem.opacity})"></span>
          </div>
        </div>
      </div>
    </div>
    <img v-if="icon" :src="icon" class="icon-img" @click="toggleColorPane()">
  </div>
</template>
<script>
import { Chrome } from "vue-color";
import { rgba2hex } from "@/utils/helperFunction";

let defaultValue = {
  hex: "#194d33e6",
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 0.9,
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.3,
    a: 0.9,
  },
  rgba: {
    r: 159,
    g: 96,
    b: 43,
    a: 0.9,
  },
  a: 0.9,
};

export default {
  name: "ColorButton",
  components: {
    "chrome-picker": Chrome,
  },
  props: {
    /**
     * Data binding
     * @model
     */
    value: {
      type: [Object, String],
      default: "",
    },
    size: {
      type: Number,
      default: 54,
    },

    icon: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    showColorPane: false,
    selectedColour: {
      hex: this.value ? this.value.color : "",
      a: this.value ? this.value.opacity : 1,
    },
  }),
  computed: {
    bgc() {
      if (this.selectedColour) {
        if(this.selectedColour.hex && this.selectedColour.hex.startsWith("rgb")){
          return "#" + rgba2hex(this.selectedColour.hex);
        }
        return this.selectedColour.hex;
      }
      return "";
    },
    alpha() {
      if (this.selectedColour) return this.selectedColour.a;
      return 1;
    },
    savedColors() {
      if (localStorage.savedColors) return JSON.parse(localStorage.savedColors);
      return null;
    },
    lastPickedColors() {
      return JSON.parse(localStorage.lastColors);
    }
  },
  watch: {
    value: function () {
      this.selectedColour.hex = this.value.color;
      this.selectedColour.a = this.value.opacity;
    },
  },
  created() {
    this.selectedColour.hex = this.value.color;
    this.selectedColour.a = this.value.alpha;
  },
  methods: {
    saveColor(){
      let colors = [];
      if(!this.savedColors) {
        colors = [this.selectedColour];
      } else {
        colors = [
          {
            hex: this.selectedColour.hex,
            a: this.selectedColour.a
          },
          ...this.savedColors.slice(0, 4)
        ];
      }
      localStorage.setItem("savedColors", JSON.stringify(colors));
    },
    inputUpdateValue(e){
      this.updateValue({hex:e.target.value});
    },
    hidePane: function (event) {
      this.showColorPane = false;
    },
    updateValue: function (value) {
      value.a = value.a || this.selectedColour.a;
      this.selectedColour = value;
      this.$emit("input", {
        color: this.selectedColour.hex,
        opacity: this.selectedColour.a,
      });
    },
    toggleColorPane: function () {
      document.getElementsByClassName("vc-chrome");
      this.showColorPane = !this.showColorPane;
      if (!this.showColorPane) {
        this.$emit("closed");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.color-select-button {
  position: relative;
  &-mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0px;
    top: 0px;
    z-index: 30;
  }
  .md-button {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    margin: 0px;
    // &.add-button {}
  }
  .add-button {
    -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    border: dashed 1.5px #f51355;
    border-radius: 50%;
  }
  .color-piker-wrapper{
    min-width: 280px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.20);
    left: 65px;
    padding: 2px;
    text-align: center;
    top: -55px;
    position: absolute;
    font-weight: 800;
    z-index: 16;
    background-color: white;
    .chosen-color-block{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    span{
         display: block;
         margin: 15px 0;
       }
    .select-colors {
      span{
        margin-bottom: 0;
      }
      color: #a0a0a0;
      .colors-wrapper {
        width: 100%;
        display: flex;
        .picked-color {
          cursor: pointer;
          margin-left: 5px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: inline-block;

        }
      }
    }

    .vc-chrome {
      position: relative;
      box-shadow: none;
      width: 100%;
      &:before {
        content: "";
        width: 12px;
        height: 12px;
        position: absolute;
        background-color: white;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        left: -6px;
        top: 22px;
        z-index: 0;
      }
      .vc-chrome-toggle-btn{
        display: none;
      }
    }
  }
  .icon-img {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 25px;
    height: 25px;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}
</style>
