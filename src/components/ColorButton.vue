<template>
  <div class="color-select-button">
    <md-button
      class="md-just-icon"
      :style="`background-color: ${bgc} !important; opacity:${alpha}`"
      @click="toggleColorPane()"
       v-if="selectedColour.hex"
    ></md-button>
    <md-button
      class="add-button md-just-icon md-white"
      @click="toggleColorPane()"
      v-else
    >
      <img :src="`${$iconURL}Concept/Asset 488.svg`" width="20"/>
      
    </md-button>

    <chrome-picker
      :value="selectedColour"
      @input="updateValue"
      label="Pick Colour"
      picker="chrome"
      v-if="showColorPane"
    />
  </div>
</template>
<script>
import { Chrome } from "vue-color";

let defaultValue = {
  hex: "#194d33e6",
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 0.9
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.3,
    a: 0.9
  },
  rgba: {
    r: 159,
    g: 96,
    b: 43,
    a: 0.9
  },
  a: 0.9
};

export default {
  name: "event-time-line",
  components: {
    "chrome-picker": Chrome
  },
  props: {
    /**
     * Data binding
     * @model
     */
    value: {
      type: [String]
    }
  },
  data: () => ({
    showColorPane: false,
    selectedColour: defaultValue
  }),
  computed: {
    bgc() {
      return this.selectedColour.hex;
    },
    alpha() {
      return this.selectedColour.a;
    }
  },
  methods: {
    hidePane: function(event) {
      this.showColorPane = false;
    },
    updateValue: function(value) {
      this.selectedColour = value;
      // this.$emit("input",this.selectedColour)
    },
    toggleColorPane: function() {
      document.getElementsByClassName("vc-chrome");
      this.showColorPane = !this.showColorPane;
    }
  },
  created() {
    this.selectedColour.hex = this.value;
  },
  watch: {
    value: function() {
      this.selectedColour.hex = this.value;
    }
  }
};
</script>
<style lang="scss" scoped>
.color-select-button {
  position: relative;
}
.md-button {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  margin:0px;
  // &.add-button {}
}
.add-button{
    -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    border: dashed 1.5px #f51355;
    background-color: #ffffff;
    border-radius: 50%;
  }
.vc-chrome {
  left: 65px;
  top: 0px;
  &:before {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    border: 1px solid #989898;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    left: -6px;
    top: 22px;
  }
}
</style>
