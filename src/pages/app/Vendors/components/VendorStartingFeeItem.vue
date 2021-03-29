<template>
  <div class="vendor-starting-fee-item-wrapper">
    <div class="collapsed" @click="expand()">
      <div class="with-check">
        <img :src="`${iconUrl}Group 5479 (2).svg`" />
        <span class="value label">{{ item.label }}</span>
      </div>
      <div class="with-qty">
        <div class="qty text-transform-capitalize" v-html="getQty()"></div>
        <img
          v-if="item.desc"
          :src="`https://static-maryoku.s3.amazonaws.com/storage/icons/NewSubmitPorposal/Group 4770 (2).svg`"
        />
        <img v-else :src="`https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/Asset 528.svg`" />
      </div>
    </div>
    <div class="expanded" v-if="expanded">{{ item.desc }}</div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "vendor-starting-fee-item",
  props: {
    item: Object,
  },
  components: {},
  data() {
    return {
      expanded: false,
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
    };
  },
  created() {},
  mounted() {},
  methods: {
    expand() {
      if (this.item.desc) {
        this.expanded = !this.expanded;
      }
    },
    getQty() {
      if (this.item.value) {
        if (this.item.value.constructor.name == "Array") {
          return this.item.value.join("<br/>");
        } else if (this.item.value.constructor.name == "String") {
          return this.item.value;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
  },
  computed: {},
  filters: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
.vendor-starting-fee-item-wrapper {
  font-family: Manrope-Regular, sans-serif;
  color: #050505;
  border-bottom: 1px solid #dddddd;
  cursor: pointer;

  .collapsed {
    width: 100%;
    padding: 2rem 0;
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: flex-start;

    .with-check {
      display: flex;
      align-items: center;
    }
    .with-qty {
      text-align: right;
      span {
        margin-right: 2rem;
      }
    }
    img {
      width: 20px;

      &:first-child {
        margin-right: 1rem;
      }
    }
    span {
      flex: 1;
      display: inline-block;
      &.label {
        text-transform: capitalize;
      }
      &.value {
        font: 800 16px Manrope-Regular, sans-serif;
      }
      &.qty {
        font: normal 16px Manrope-Regular, sans-serif;
      }
    }
    &:nth-child(2n + 1) {
      margin-right: 1rem;
    }
  }
  .expanded {
    max-width: 40%;
    font: normal 14px Manrope-Regular, sans-serif;
    padding-bottom: 1rem;
  }
  .rotate-90 {
    transform: rotate(90deg);
  }
}
</style>
