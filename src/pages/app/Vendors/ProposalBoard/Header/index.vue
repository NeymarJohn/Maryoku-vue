<template>
  <div class="font-size-22 font-bold d-flex align-center">
    <img src="/static/icons/vendor/proposal-active.svg" class="mr-10" alt=""> Proposals Board
    <md-button class="ml-auto md-vendor md-maryoku mr-15" @click="onCreate">
      Create New Proposal
    </md-button>
  </div>
</template>
<script>
export default {
  methods: {
    onCreate (event) {
      this.$emit("onCreate", event);
    }
  }
};
</script>
