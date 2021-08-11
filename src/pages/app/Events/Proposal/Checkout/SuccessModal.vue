<template>
  <modal class="timeline-gap-modal">
    <template slot="header">
      <div class="font-size-30 font-bold line-height-1">Thank you for your payment</div>
    </template>
    <template slot="body">
      <div class="timeline-gap-modal-body">You payment is submitted successfully.</div>
    </template>
    <template slot="footer"> </template>
  </modal>
</template>
<script>
import { Modal } from "@/components";
import moment from "moment";

export default {
  components: {
    Modal,
  },

  methods: {},
  computed: {},
};
</script>
<style lang="scss" scoped>
</style>