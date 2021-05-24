<template>
  <div class="proposal-card">
    <div class="booking-item">
      <div class="event-image" :style="`background: url(${backgroundImage}) center center no-repeat`">
        <div class="bundle-offer" v-if="proposal.bundleDiscount && proposal.bundleDiscount.isApplied">
          <img :src="`${$iconURL}common/bell-white.svg`" />
          Bundle Offer
          <md-tooltip md-direction="top" class="p-30 color-black">
            <div class="font-size-20 font-bold mb-10">{{ getBundleToolTipText(proposal.bundleDiscount.services) }}</div>
            <div class="font-size-16">{{ proposal.bundleDiscount.percentage }}% Off for the whole package</div>
          </md-tooltip>
        </div>
      </div>
      <div class="card-content">
        <div class="mt-20 d-flex" v-show="proposal.suggestionDate">
          <img :src="`${$iconURL}Event Page/warning-circle-gray.svg`" class="label-icon mr-5" />
          <span v-if="getDiffDaysFromOriginal() < 0" class="whitspace-nowrap">
            This proposal is {{ -getDiffDaysFromOriginal() }}days before your original date
          </span>
          <span v-else class="whitspace-nowrap">
            This proposal is {{ getDiffDaysFromOriginal() }}days later your original date
          </span>
        </div>
        <div class="price">
          <span class="price-value">${{ proposal.cost | withComma }}</span>
          <small>For 3 hours</small>
        </div>
        <div
          class="font-size-14 color-dark-gray mb-10"
          :class="{ invisible: component.allocatedBudget >= proposal.cost }"
        >
          <img :src="`${$iconURL}Event Page/warning-circle-gray.svg`" class="label-icon" />
          ${{ (proposal.cost - component.allocatedBudget) | withComma }}
          more than budget
        </div>
        <template v-if="proposal.vendor">
          <h4 class="event-title">{{ proposal.vendor.companyName }}</h4>
          <div class="probability">Alignement to requirements {{ probability }}%</div>
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
  </div>
</template>
<script>
import moment from "moment";
import Timer from "@/components/Timer.vue";
export default {
  components: { Timer },
  props: {
    proposal: {
      type: Object,
      default: () => {},
    },
    probability: {
      type: Number,
      default: 0,
    },
    component: {
      type: Object,
      default: () => {},
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
    getDiffDaysFromOriginal() {
      const suggestionDate = this.proposal.suggestionDate;
      if (!this.eventData) return "-";

      let orignStartDate = moment(new Date(this.eventData.eventStartMillis));
      if (suggestionDate && suggestionDate.length > 0) {
        let suggestedDate = moment(suggestionDate[0].date, "DD/MM/YYYY");
        return suggestedDate.diff(orignStartDate, "days");
      }
      return 0;
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
    eventData() {
      return this.$store.state.event.eventData;
    },
  },
};
</script>
<style lang="scss" scoped>
.booking-item {
  border-radius: 3px;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
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
  .card-content {
    padding: 1.5em;
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