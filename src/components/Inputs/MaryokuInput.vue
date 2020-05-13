<template>
  <div class="maryoku_input">
    
    <input
    v-model="content"
      :name="name"
      :type="type"
      @input="handleInput"
      :placeholder="placeholder"
      :class="inputClass"
    />
  </div>
</template>
<script>
export default {
  name: "maryoku-input",
  model: {},
  props: {
    /**
     * Data binding
     * @model
     */
    value: String,
    name: String,
    srcLogo: String,
    type: String,
    onChange: Function,
    inputBlock: String,
    placeholder: String,
    disabled: Boolean,
    imgStyle: String,
    inputStyle: String,
  },
  data () {
    return {
      content: this.value,
      inputClass: this.inputStyle

    }
  },
  methods: {
    handleInput (e) {
      console.log(e.target.value);
      this.$emit('input', this.content)
    }
  },
  computed: {
    getClass: function(){
      console.log("tes");
      return `${this.inputStyle} ${this.value?"active":""}`
    }
  },
  watch: {
    content: function() {
      this.inputClass = `${this.inputStyle} ${this.value?"active":""}`
    }
  }
};
</script>
<style lang="scss">
.input-default {
  border: none;
  padding: 15px;
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
}
.required-logo {
  color: red;
}
</style>
