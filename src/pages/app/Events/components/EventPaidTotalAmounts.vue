<template>
  <div class="md-layout amounts-wrapper">
    <div class="amounts">
      <span class="text-left">
        Paid: ${{paid}}
      </span>
      <span class="text-right">
        Total: ${{total}}
      </span>
    </div>
    <div class="percentage">
      <div class="inner" :style="percentageStyle"></div>
    </div>
    <h3>${{total-paid}} to be paid</h3>
  </div>
</template>
<script>
//MAIN MODULES
import moment from "moment";

export default {
  name:'event-paid-total-amounts',
  props:{
    paid: Number, 
    total: Number,
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
    percentageStyle() {
      return {
        width: 100 / this.total * this.paid + '%'
      };
    }
  },
  filters: {
  },
  watch: {
  },  
};
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/md/_colors.scss';
  .amounts-wrapper {
    flex-direction: column;
    h3 {
      text-transform: capitalize;
      color: $purple-500;
      font-size: 18px;
      font-weight: 500;
      text-align: left;
    }
    .amounts {
      display: flex;
      span {
        flex: 1;
      }
    }
    .percentage {
      height: 5px;
      background: rgb(187,208,234);
      .inner {
        background: rgb(217,154,50);
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
