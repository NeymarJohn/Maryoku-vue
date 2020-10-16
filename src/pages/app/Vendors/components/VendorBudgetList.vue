<template>
  <div class="vendor-budget-list-wrapper">
    <h4>
      <img :src="`${iconsUrl}Asset 500.svg`" />
      {{ title }}
    </h4>
    <div class="total"><strong>Total Event Budget:</strong>$0</div>
    <p>
      <img :src="`${iconsUrl}Group 5180.svg`" />
      {{ description }}
    </p>
    <div class="budget-list">
      <div class="items">
        <div class="item" v-for="(r, ri) in requirements" :key="ri">
          <span>
            <img
              v-if="r.category == 'food'"
              :src="`${iconsUrl}Asset 515.svg`"
            />
            <img v-else :src="`${iconsUrl}Asset 516.svg`" />
            {{ r.category }}
          </span>
          <span>${{ r.price | withComma }}</span>
        </div>
      </div>
      <div class="total">
        <span>Total</span>
        <span>$0</span>
      </div>
    </div>
  </div>
</template>
<script>
import VueElementLoading from "vue-element-loading";
import VendorService from "@/services/vendor.service";

export default {
  name: "vendor-budget-list",
  components: {
    VueElementLoading,
  },
  props: {
    title: String,
    description: String,
    proposalRequest: Object,
  },
  data: () => ({
    isLoading: true,
    requirements: [],
    rawRequirements: [],
    iconsUrl:
      "https://static-maryoku.s3.amazonaws.com/storage/icons/NewLandingPage/",
  }),
  created() {},
  mounted() {
    this.getRequirements();
    // this.rawRequirements = VendorService.getProposalRequest()
  },
  methods: {
    getRequirements() {
      this.requirements = [
        {
          category: "No requirement",
          price: this.categoryCost,
        },
      ];
    },
  },
  computed: {},
  filters: {
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.vendor-budget-list-wrapper {
  font-family: "Manrope-Regular", sans-serif !important;

  h4 {
    font-size: 22px;
    color: #050505;
    font-weight: 800;
    margin-top: 83px;
    margin-bottom: 20px;

    img {
      width: 15.7px;
      margin-right: 15px;
      position: relative;
      top: -3px;
    }
  }
  .total {
    margin: 0;
    font-size: 20px;
    strong {
      margin-right: 26px;
      font-weight: 600;
    }
    font-weight: 500;
  }
  p {
    font-size: 16px;
    margin-top: 23px;
    margin-bottom: 33px;

    img {
      width: 27px;
      margin-right: 12px;
    }
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
          text-transform: capitalize;

          img {
            width: 28.4px;
            margin-right: 30px;
          }

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
        font-weight: 800;
      }
    }
  }
}
</style>
