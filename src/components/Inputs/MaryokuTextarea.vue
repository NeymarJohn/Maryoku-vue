<template>
  <div class='maryoku-textarea'  style="padding:40px 140px 40px 40px" >
    <textarea v-model="content" @input="handleInput" :placeholder="placeholder" :rows="rows"></textarea>
    <span  class="close-button" @click="clearContent"><img :src="`${$iconURL}Campaign/Group+3602.svg`"/></span>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    value: String,
    rows: {
      type: String,
      default: "3"
    }
  },
  data() {
    return {
      content: ""
    }
  },
  methods: {
    handleInput(e) {
      this.$emit("input", this.content);
    },
    clearContent() {
      this.content = ""
      this.$emit("input", this.content);
    }
  },
  created () {
    this.content = this.value
  },
}
</script>
<style lang="scss" scoped>
.maryoku-textarea {
  position: relative;
  border: solid 1px #a0a0a0;
  border-radius: 3px;
  background: white;
  
  .close-button {
    right: 35px;
    top: 30px;
    position: absolute;
    cursor: pointer;
  }

  textarea {
    width: 100%;
    resize: none;
    border: none;
    // overflow: hidden;
  }
  
    /* Hide scrollbar for Chrome, Safari and Opera */
  textarea::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  textarea{
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
}

</style>