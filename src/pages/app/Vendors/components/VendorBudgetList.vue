<template>
  <div class="vendor-budget-list-wrapper">
    <h4>$ {{title}}</h4>
    <p>
      {{description}}
    </p>
    <div class="budget-list">
      <div class="items">
        <div 
          class="item" 
          v-for="(vendor, vIndex) in items" 
          :key="vIndex"
        >
          <span>{{vendor.category}}</span>
          <span>${{vendor.budget}}</span>
        </div>
      </div>
      <div class="total">
        <span>Total</span>
        <span>$2400</span>
      </div>
    </div>
  </div>
</template>
<script>
  import VueElementLoading from 'vue-element-loading'

  export default {
    name: 'vendor-budget-list',
    components: {
      VueElementLoading,
    },
    props: {
      title: String, 
      description: String,
      items: Array
    },
    data: () => ({
      isLoading:true,
    }),
    methods: {
    },
    created() {

    },
    mounted() {
      this.isLoading = false;
    },
    computed: {
    },
    watch: {
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/md/_variables.scss";
  @import "@/assets/scss/md/_colors.scss";
  .vendor-budget-list-wrapper {
    h4 {
      font-size: 22px;
      color: #050505;
      font-weight: bold;
    }
    p {
      font-size: 16px;
      margin-bottom: 4rem;
    }
    .budget-list {
      max-width: 65%;
      margin-bottom: 2rem;

      .items {
        padding: 0 24px;
        background-color: #ffffff;
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.05);
        border-radius: 3px;

        .item {
          padding: 24px 0;
          border-bottom: 1px solid #707070;
          display: flex;
          align-content: flex-start;
          justify-content: space-between;

          span {
            font-size: 20px;
            font-weight: 800;

            &:last-child {
              font-weight: 400;
            }
          }

          &:last-child {
            border: none;
          }
        }
      }

      .total {
        display: flex;
        align-content: flex-start;
        justify-content: space-between;
        padding: 16px 24px;
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        background-color: #404040;
        color: #ffffff;

        span {
          font-size: 22px;

          &:last-child {
            font-weight: 800;
          }
        }
      }
    }    
  }
</style>
