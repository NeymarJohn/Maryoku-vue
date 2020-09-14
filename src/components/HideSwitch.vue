<template>
  <md-switch class="below-label large-switch" v-model="data">
    <template v-if="label">
      <span v-if="data"> Hide {{label}}</span>
      <span v-if="!data"> Show {{label}}</span>
    </template>
  </md-switch>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true, 
    },
    label: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      data: true
    }
  },
  created () {
    this.data = this.value;
  },
  watch: {
    data(newValue, oldValue) {
      this.$emit("input", newValue)
    }
  },
}
</script>