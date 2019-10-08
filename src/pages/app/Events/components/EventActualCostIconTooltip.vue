<template>
  <div class="md-layout actual-cost-wrapper">
    <md-icon>{{icon}}</md-icon>
    <md-tooltip md-direction="top">
      <div class="tooltip-wrapper">
        <strong>Down payment has been paid</strong>
        <span>Paid Amount: {{paid}}</span>
        <span>Date: {{date}}</span>
      </div>
    </md-tooltip>
  </div>
</template>
<script>
//MAIN MODULES
import moment from "moment";

export default {
  name:'event-actual-cost-icon-tooltip',
  props:{
    icon: String,
    paid: Number,
    date: String
  },
  components: {   
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
  computed: {
  },
  filters: {
  },
  watch: {
  },  
};
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/md/_colors.scss';
  .tooltip-wrapper {
    strong {
      font-size: 13px;
      font-weight: 400;
    }
    span {
      font-size: 12px;
      color: #666666;
    }
  }
</style>
