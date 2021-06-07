<template>
  <div class="requirements-cart">
    <div class="requirements-cart-header">
      <div>
        <span class="text-transform-uppercase font-bold font-size-20">Your Choices</span>
        <div>
          Our vendors will create proposals based on your choices, Caterogies that are missing those will be open to the
          vendors discretion
        </div>
      </div>
      <progress-radial-bar :value="percentOfBudgetCategories" :total="12" @click="openCart"></progress-radial-bar>

      <md-button class="md-simple close-btn" @click="close">
        <md-icon>close</md-icon>
      </md-button>
    </div>
    <div>
      <vsa-list>
        <vsa-item v-for="item in selectedCategories" :key="item.key">
          <vsa-heading>
            {{ item.fullTitle }}
          </vsa-heading>

          <vsa-content>
            {{ item }}
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>
  </div>
</template>
<script>
import { VsaList, VsaItem, VsaHeading, VsaContent, VsaIcon } from "vue-simple-accordion";
import "vue-simple-accordion/dist/vue-simple-accordion.css";
import ProgressRadialBar from "./components/ProgressRadialBar.vue";

export default {
  components: {
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
    VsaIcon,
    ProgressRadialBar,
  },
  data() {
    return {
      listOfItems: [
        { heading: "Venue", content: "ASFASDFAs" },
        { heading: "Catering", content: "ASFASDFAs" },
        { heading: "Photography", content: "ASFASDFAs" },
      ],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },

  computed: {
    selectedCategories() {
      const categoryKeys = Object.keys(this.$store.state.planningBoard);
      const selectedData = [];
      categoryKeys.forEach((categoryKey) => {
        console.log("his.$store.state.common.serviceCategories", this.$store.state.common.serviceCategories);
        const category = this.$store.state.common.serviceCategories.find((item) => item.key === categoryKey);
        if (category) {
          selectedData.push(category);
        }
      });
      return selectedData;
    },
    serviceCategories() {
      return this.$store.state.common.serviceCategories;
    },
  },
};
</script>
<style lang="scss" scoped>
.requirements-cart {
  position: fixed;
  width: 600px;
  height: 100vh;
  background-color: white;
  top: 0;
  right: 0;
  z-index: 10;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

  &-header {
    padding: 40px;
    display: flex;
    .close-btn {
      position: absolute;
      top: 10px;
      right: 0px;
    }
  }
  .vsa-list {
    border: none;
    .vsa-item {
      border: none;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      margin-top: 8px;
    }
    /deep/ .vsa-item__heading {
      border: none;
      cursor: pointer;
      .vsa-item__trigger {
        background-color: white;
        color: black;
      }
    }
    /deep/ .vsa-item__trigger__icon--is-default:after,
    /deep/ .vsa-item__trigger__icon--is-default:before {
      content: "";
      height: 2px;
      position: absolute;
      top: 0px;
      transition: all 0.13333s ease-in-out;
      width: 16px;
      background-color: #818080;
    }
    /deep/ .vsa-item__trigger__icon--is-default:after {
      transform: rotate(-50deg) translate3d(-24px, 14px, 0);
    }
    /deep/ .vsa-item__trigger__icon--is-default:before {
      transform: rotate(50deg) translate3d(24px, 14px, 0);
    }
    /deep/ .vsa-item--is-active {
      .vsa-item__trigger__icon--is-default {
        transform: rotate(-180deg);
      }
    }
  }
}
</style>