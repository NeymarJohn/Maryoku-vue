<template>
  <div class='maryoku-textarea'>
    <textarea style="padding:40px 140px 40px 40px" v-model="content" @input="handleInput" :placeholder="placeholder"></textarea>
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
  },
  created () {
    console.log("teset")
    console.log(placeholder);
  },
}
</script>
<style lang="scss" scoped>

</style>