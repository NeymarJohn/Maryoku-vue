<template>
  <div class="md-layout-item md-size-33 proposal-card">
    <div class="booking-item">
      <div class="event-image" :style="`background: url(${backgroundImage}) center center no-repeat`">
        <div class="bundle-offer" v-if="proposal.bundleDiscount && proposal.bundleDiscount.isApplied">
          <img :src="`${$iconURL}common/bell-white.svg`" /> Bundle Offer
          <md-tooltip md-direction="top" class="p-30 color-black">
            <div class="font-size-20 font-bold mb-10">{{ getBundleToolTipText(proposal.bundleDiscount.services) }}</div>
            <div class="font-size-16">{{ proposal.bundleDiscount.discountPercentage }}% Off for the whole package</div>
          </md-tooltip>
        </div>
      </div>
      <div class="price">
        <span class="price-value">${{ proposal.cost | withComma }}</span>
        <small>For 3 hours</small>
      </div>
      <template v-if="proposal.vendor">
        <h4 class="event-title">{{ proposal.vendor.companyName }}</h4>
        <div class="probability">Probability {{ probability }}%</div>
        <ul class="event-info">
          <li class="event-info__item">{{ proposal.vendor.vendorAddresses[0] }}</li>
          <li class="event-info__item">{{ proposal.vendor.vendorCity }}</li>
        </ul>
      </template>

      <p class="event-desc">{{ proposal.vendor.about ? proposal.vendor.about.company : "" }}</p>

      <div class="item-actions text-right">
        <md-button class="md-red maryoku-btn" @click="proposalDetails">Details & Booking </md-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    proposal: {
      type: Object,
      default: () => {},
    },
    probability: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    getCategory(key) {
      return this.categories.find((item) => item.key === key);
    },
    getBundleToolTipText(bundleServices) {
      const serviceNames = bundleServices.map((service) => {
        return this.getCategory(service).title;
      });
      return serviceNames.join(" + ");
    },
    proposalDetails() {
      this.$emit("goDetail", this.proposal);
    },
  },
  computed: {
    backgroundImage() {
      let link = "";
      if (this.proposal.inspirationalPhotos && this.proposal.inspirationalPhotos[0]) {
        console.log("object");
        link = this.proposal.inspirationalPhotos[0].url;
        return link;
      }
      return link;
    },
    categories() {
      return this.$store.state.common.serviceCategories;
    },
  },
};
</script>
<style lang="scss" scoped>
.booking-item {
  border-radius: 3px;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  padding: 1.5em;
  height: 100%;

  .event-image {
    background-size: cover !important;
    height: 200px;
    position: relative;

    .bundle-offer {
      width: 40%;
      background-color: #ffc001;
      color: white;
      font-weight: bold;
      padding: 5px;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
      cursor: pointer;
      img {
        width: 16px;
        margin-right: 5px;
      }
    }
    .event-labels {
      padding: 0;
      margin: 0;
      list-style: none;
      position: absolute;
      left: 0;
      bottom: 0;

      .label-item {
        background: #fff;
        padding: 6px 17px;
        font-size: 12px;
        font-weight: bold;
        color: #050505;
        width: auto;
        float: left;
        clear: both;

        &.rose-label {
          color: #f51355;
        }

        &.special-offer {
          background: #ffc001;
          color: #fff;
        }
      }
    }
  }

  .price {
    margin: 2em 0 0.8em;

    small {
      font-size: 14px;
      color: #050505;
    }
  }
  .price-value {
    font-size: 30px;
    font-weight: bold;
    color: #050505;
    margin-right: 0.2em;
  }

  .event-title {
    font-size: 20px;
    font-weight: 800;
    color: #050505;
    margin: 0;
    height: 52px;
  }

  .probability {
    font-size: 16px;
    font-weight: 800;
    color: #0fac4c;
    margin: 0.5em 0 1em;
  }

  .event-info {
    list-style: none;
    padding: 0;
    margin: 0;

    &__item {
      font-size: 14px;
      color: #818080;
    }
  }
  .event-desc {
    font-size: 14px;
    color: #050505;
    height: 100px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .details-btn {
    .md-ripple {
      // background-color: #f51355;
      text-transform: capitalize;
      font-weight: bold;
      letter-spacing: 1px;
    }
  }
}
</style>