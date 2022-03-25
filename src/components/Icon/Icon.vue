<template>
  <div class="icon" @click.prevent="checkImage">
    <div :class="iconStyle">
      <img v-if="isChecked===true" :src="iconSourceOne" :class="imageStyle">
      <img v-else :src="iconSourceTwo" :class="imageStyle">
    </div>
    <div class="label-logo">
      <span :class="titleStyle">{{ toUpperCase }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Icon",
  model: {
  },
  props: {
    iconSourceOne: {
      type: String,
      required: true,
    },
    iconSourceTwo: {
      type: String,
      required: true,
    },
    iconStyle: {
      type: String,
      default: "",
    },
    imageStyle: {
      type: String,
      required: true,
    },
    titleStyle: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: ""
    },
    onClick: {
      type: Function,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      isChecked: true
    };
  },
  computed: {
    toUpperCase: function () {
      return this.title.toUpperCase();
    }
  },
  methods: {
    checkImage: function () {
      this.isChecked = !this.isChecked;
      this.onClick(this.name);
    }
  }
};
</script>
<style lang="scss">
.icon{
    cursor:pointer
}
.label-logo{
    width:100%;
    display: flex;
    justify-content: center;
    padding-top:10px
}
</style>
