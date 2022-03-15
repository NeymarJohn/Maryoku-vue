<template>
  <div class="md-layout md-gutter vendors-pool-grid">
    <div class="md-layout-item md-size-100 vendors-list-header d-flex justify-content-start align-center">
      <div class="form-group d-flex align-center">
        <label>Sort by</label>
        <v-select v-model="sortField" class="sort-by-list" :options="sortOptions" :clearable="false" />
      </div>
      <div class="vendors-number">
        Vendors:{{ pagingData.total }}
      </div>
    </div>
    <div
      v-for="vendor in filteredVendorsList"
      :key="vendor.id"
      class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-large-size-25 md-size-25"
    >
      <div class="vendor-item">
        <div
          class="vendor-image"
          :style="`background : url(${vendorMainImage(vendor)}) center center no-repeat;`"
        />
        <div class="vendor-info">
          <div v-if="vendor.eventCategory" class="category font-size-16">
            <img :src="`${$iconURL}Budget+Elements/${vendor.eventCategory.icon}`" class="label-icon">
            {{ categoryTitle(vendor.vendorCategory, buildingBlocksList) }}
          </div>
          <h4 class="vendor-name font-size-20">
            {{ vendor.companyName }}
          </h4>
          <div class="vendor-location">
            {{ vendor.vendorAddressLine1 ? vendor.vendorAddressLine1.substring(0, 35) : "" }}
          </div>
          <div class="vendor-review small">
            <label
              v-for="(rating, ratingIndex) in ratings"
              :key="ratingIndex"
              class="star-rating__star"
              :class="{
                'is-selected': vendor.rank >= rating && vendor.rank != null,
              }"
            >★</label>
            <span class="small text-gray">{{ vendor.voters }} Reviews</span>
          </div>
          <div class="about-vendor">
            {{ vendor.about && vendor.about.company ? vendor.about.company.substring(0, 180) + " ..." : "" }}
          </div>
          <div class="actions">
            <md-button class="md-rose md-outline" @click="routeToVendor(vendor.id, $event)">
              <span class="font-size-14">More Details</span>
            </md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { categoryTitle, categoryColor } from "./helpers";
import _ from "underscore";

import { ProductCard, AnimatedNumber } from "@/components";

export default {
  components: {
  },
  props: {
    vendorsList: {
      type: Array,
      default: () => []
    },
    ratings: {
      type: Array,
      default: () => []
    },
    buildingBlocksList: {
      type: Array,
      default: () => []
    },
    pagingData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      searchQuery: "",
      filteredVendorsList: [],
      sortField: "Popularity",
      sortOptions: ["Popularity", "Newest"],
      modelValidations: {
        vendorWebsite: {
          url: { require_protocol: true },
          regex: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,=.]+$/gm,
          min: 10, // http://x.x
        },
      },
      bgImages: [
        "https://static-maryoku.s3.amazonaws.com/storage/img/lock.jpg",
        "https://static-maryoku.s3.amazonaws.com/storage/img/login.jpg",
        "https://static-maryoku.s3.amazonaws.com/storage/img/register.jpg",
        "https://static-maryoku.s3.amazonaws.com/storage/img/bg-pricing.jpg",
        "https://static-maryoku.s3.amazonaws.com/storage/img/bg3.jpg",
        "https://static-maryoku.s3.amazonaws.com/storage/img/bg9.jpg",
        "https://static-maryoku.s3.amazonaws.com/storage/img/card-1.jpg",
        "https://static-maryoku.s3.amazonaws.com/storage/img/card-2.jpg",
        "https://static-maryoku.s3.amazonaws.com/storage/img/card-3.jpg",
        "https://static-maryoku.s3.amazonaws.com/storage/img/sidebar-1.jpg",
        "https://static-maryoku.s3.amazonaws.com/storage/img/sidebar-2.jpg",
        "https://static-maryoku.s3.amazonaws.com/storage/img/sidebar-3.jpg",
        "https://static-maryoku.s3.amazonaws.com/storage/img/sidebar-4.jpg",
        "https://static-maryoku.s3.amazonaws.com/storage/img/shutterstock_289440710.png",
        "https://static-maryoku.s3.amazonaws.com/storage/img/shutterstock_495639391.png",
        "https://static-maryoku.s3.amazonaws.com/storage/img/shutterstock_732491308.png",
        "https://static-maryoku.s3.amazonaws.com/storage/img/shutterstock_740167702.png",
      ],
    };
  },
  watch: {
    searchQuery(newVal, oldVal) {
      if (newVal === "") {
        this.filteredVendorsList = this.vendorsList;
      } else {
        this.filterVendors();
      }
    },
    vendorsList(newVal, oldVal) {
      this.filterVendors();
    },
  },
  mounted() {
    this.filteredVendorsList = this.vendorsList;
  },
  methods: {
    categoryTitle,
    categoryColor,
    editVendorDetails(vendor) {
      this.$emit("editVendorDetails", vendor);
    },
    routeToVendor(vendorId) {
      this.$router.push({ name: "VendorDetails", params: { id: vendorId } });
    },
    vendorMainImage(vendor) {
      if (vendor.images && vendor.images.length > 0) {
        return vendor.images[0];
      } else if (vendor.vendorImages && vendor.vendorImages.length > 0) {
        return vendor.vendorImages[0];
      } else {
        const rndInt = Math.floor(Math.random() * this.bgImages.length);
        return this.bgImages[rndInt];
      }
    },
    filterVendors() {
      this.filteredVendorsList = _.filter(this.vendorsList, (v) => {
        // let byDisplayName = v.vendorDisplayName.toString().toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
        let byCategory = v.vendorCategory
          ? v.vendorCategory.toString().toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1
          : "";
        return byCategory;
      });
    },
    isValidVendorWebsite(vendor) {
      if (vendor.vendorWebsite) {
        return vendor.vendorWebsite.indexOf("http://") > -1 || vendor.vendorWebsite.indexOf("https://") > -1;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.vendors-pool-grid {
  .about-vendor {
    word-break: break-word;
  }
  .sort-by-list {
    min-height: max-content;
    width: 150px;
  }
}
.md-card-header-image {
  > img {
    max-height: 25vmin;
  }
}

.ellipsis {
  overflow: hidden;
  height: 80px;
}

.ellipsis:before {
  content: "";
  float: left;
  width: 5px;
  height: 85px;
}

.ellipsis > *:first-child {
  float: right;
  width: 100%;
  margin-left: -5px;
}

.ellipsis:after {
  content: "\02026";
  box-sizing: content-box;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  float: right;
  position: relative;
  top: -25px;
  left: 100%;
  width: 3em;
  margin-left: -3em;
  padding-right: 5px;
  text-align: right;
  font-size: 1.8em;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(rgba(255, 255, 255, 0)),
    to(white),
    color-stop(50%, white)
  );
  background: -moz-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
  background: -o-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
  background: -ms-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
  background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
}

.md-tooltip {
  z-index: 9999 !important;
  background: $purple-500 !important;
  color: white !important;
  &[x-placement="top"]:after {
    border-bottom-color: $purple-500 !important;
  }
  &[x-placement="bottom"]:after {
    border-bottom-color: $purple-500 !important;
  }
  &[x-placement="right"]:after {
    border-bottom-color: $purple-500 !important;
  }
  &[x-placement="left"]:after {
    border-bottom-color: $purple-500 !important;
  }
}
.mb-42 {
  margin-bottom: 42px !important;
}
.mt-0 {
  margin-top: 0 !important;
}
.maxh-20 {
  max-height: 20px !important;
}
.fw-bold {
  font-weight: bold !important;
}
.tt-capitalize {
  text-transform: capitalize !important;
}
.imgHeader {
  min-height: 180px !important;
  max-height: 180px !important;
  object-fit: cover;
}
.badge {
  font-size: 10px !important;
  position: relative !important;
  top: 90% !important;
}
.tags {
  min-height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #dfe5fb;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}
</style>
