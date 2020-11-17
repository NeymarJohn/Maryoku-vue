<template>
  <div class="md-layout vendors-pool-page">
    <div class="event-page-header md-layout-item md-size-100">
      <div class="header-title">
        <h3>Our Vendors List</h3>
        <p>
          Millions of companies turn to Maryoku as their trusted event resource, with the largest directory of local
          event
          <br />vendors. Easily find the best event services in your area with detailed vendor reviews for your event.
        </p>
      </div>
      <div class="header-actions">
        <div class="form-group search-field d-flex justify-content-start align-center">
          <md-icon>search</md-icon>
          <input class="form-control" placeholder="Search" />
        </div>
      </div>
    </div>

    <div class="filters-section d-flex justify-content-start font-size-16">
      <div class="filters-section__label">Filter By</div>
      <div
        class="filters-section__item"
        :class="{ selected: filter.expand }"
        v-for="(filter, index) in filtersItems"
        :key="index"
      >
        <div class="item-title" @click="expandFilter(index)">
          {{ filter.title }}
          <md-icon>keyboard_arrow_down</md-icon>
        </div>
        <div class="expanded-section" v-if="filter.expand">
          <div class="categories-filters-section d-flex" v-if="filter.title.toLowerCase() == 'category'">
            <div class="main-categories-filters">
              <div
                class="main-filters-item text-center"
                :class="[
                  `item-${mainFilterIndex}`,
                  { 'first-row': mainFilterIndex < 4 },
                  { 'second-row': mainFilterIndex >= 4 },
                ]"
                v-for="(item, mainFilterIndex) in filter.mainCategories"
                :key="mainFilterIndex"
              >
                <img :src="`${categoriesIconURL}${item.icon}`" width="20" />
                <div class="filter-title">{{ item.title }}</div>
              </div>
            </div>
            <div class="more-categories-filters">
              <div class="section-title">More</div>
              <ul class="columns-2">
                <li v-for="(moreItem, moreItemIndex) in filter.moreCategories" :key="moreItemIndex">
                  <a href>{{ moreItem }}</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="location-filters-section d-flex" v-if="filter.title.toLowerCase() == 'location'">
            <div class="search-field-section">
              <div class="form-group">
                <input placeholder="Search by City, State, Country…" />
                <md-button class="md-just-icon md-simple md-small">
                  <img :src="`${menuIconsURL}Asset 115.svg`" />
                </md-button>
              </div>
            </div>
            <div class="more-categories-filters">
              <div class="section-title">Nearby Locations</div>
              <ul>
                <li v-for="(locationItem, locationItemIndex) in filter.locations" :key="locationItemIndex">
                  <a href>{{ locationItem }}</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="capacity-filters-section d-flex" v-if="filter.title.toLowerCase() == 'capacity'">
            <md-radio
              v-model="filters.capacity"
              :value="capacityItem"
              v-for="(capacityItem, capacityItemIndex) in filter.options"
              :key="capacityItemIndex"
              >{{ capacityItem }}</md-radio
            >
          </div>

          <div class="rank-filters-section d-flex justify-content-end" v-if="filter.title.toLowerCase() == 'rank'">
            <div class="rank-item">
              <md-checkbox v-model="filters.rank[0]">
                <div class="label-title">5 Stars</div>
                <label
                  class="star-rating__star"
                  v-for="(rating, ratingIndex) in ratings"
                  :key="ratingIndex"
                  :class="{ 'is-selected': ratingIndex <= 5 }"
                  >★</label
                >
                <span class="rank-counter">(59)</span>
              </md-checkbox>
            </div>
            <div class="rank-item">
              <md-checkbox v-model="filters.rank[1]">
                <div class="label-title">4 Stars</div>
                <label
                  class="star-rating__star"
                  v-for="(rating, ratingIndex) in ratings"
                  :key="ratingIndex"
                  :class="{ 'is-selected': ratingIndex <= 4 }"
                  >★</label
                >
                <span class="rank-counter">(59)</span>
              </md-checkbox>
            </div>
            <div class="rank-item">
              <md-checkbox v-model="filters.rank[2]">
                <div class="label-title">3 Stars</div>
                <label
                  class="star-rating__star"
                  v-for="(rating, ratingIndex) in ratings"
                  :key="ratingIndex"
                  :class="{ 'is-selected': ratingIndex <= 3 }"
                  >★</label
                >
                <span class="rank-counter">(59)</span>
              </md-checkbox>
            </div>
            <div class="rank-item">
              <md-checkbox v-model="filters.rank[3]">
                <div class="label-title">2 Stars</div>
                <label
                  class="star-rating__star"
                  v-for="(rating, ratingIndex) in ratings"
                  :key="ratingIndex"
                  :class="{ 'is-selected': ratingIndex <= 2 }"
                  >★</label
                >
                <span class="rank-counter">(59)</span>
              </md-checkbox>
            </div>
            <div class="rank-item">
              <md-checkbox v-model="filters.rank[4]">
                <div class="label-title">1 Stars</div>
                <label
                  class="star-rating__star"
                  v-for="(rating, ratingIndex) in ratings"
                  :key="ratingIndex"
                  :class="{ 'is-selected': ratingIndex <= 1 }"
                  >★</label
                >
                <span class="rank-counter">(59)</span>
              </md-checkbox>
            </div>
            <div class="rank-item">
              <md-checkbox v-model="filters.rank[5]">
                <div class="label-title just-label">
                  Unrated
                  <span class="rank-counter">(59)</span>
                </div>
              </md-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="filters-section__reset"><md-icon>refresh</md-icon>Reset Filters</div>
    </div>
    <div class="md-layout-item md-size-100 clear-margins" style="padding: 0 1em 0 3em !important">
      <vue-element-loading :active="working" spinner="ring" color="#FF547C" background-color="transparent" />
      <vendors-grid
        v-if="view === 'grid'"
        :buildingBlocksList="buildingBlocksList"
        :vendorsList="vendorsList"
        :ratings="ratings"
        @editVendorDetails="editVendorDetails"
      />
      <vendors-list
        v-if="view === 'list'"
        :buildingBlocksList="buildingBlocksList"
        :vendorsList="vendorsList"
        @editVendorDetails="editVendorDetails"
        @delete="showDeleteAlert"
        @add-new-vendor="addNewVendor"
        @open-upload-modal="openUploadModal"
      />
    </div>
    <div class="text-center width-100 mb-60 mt-50">
      <div style="width: 400px">
        <line-progress-bar></line-progress-bar>
      </div>
      <md-button class="md-simple md-black maryoku-btn md-outlined" @click="loadMoreVendor"
        ><span style="padding: 5px 40px" class="font-size-20">Load More</span></md-button
      >
    </div>
    <upload-modal ref="uploadModal"></upload-modal>
  </div>
</template>
<script>
import VueElementLoading from "vue-element-loading";
import swal from "sweetalert2";
import companyForm from "./Form/companyForm.vue";
import UploadModal from "./ImportVendors";
import VendorsGrid from "./VendorsGridNew";
import VendorsList from "./VendorsList";
import LineProgressBar from "@/components/ProgressBar/Line";

import SideBar from "../../../components/SidebarPlugin/NewSideBar";
import { Modal } from "@/components";
import Vendors from "@/models/Vendors";
import _ from "underscore";

export default {
  name: "vendors-pool",
  components: {
    VueElementLoading,
    companyForm,
    UploadModal,
    VendorsGrid,
    VendorsList,
    SideBar,
    LineProgressBar,
  },
  props: {
    inPanel: Boolean,
  },
  data() {
    return {
      working: true,
      view: "grid", // {grid, list}
      vendorsList: [],
      page: 1,
      buildingBlocksList: [],
      ratings: [1, 2, 3, 4, 5],
      searchTerm: "",
      event: {},
      categoriesIconURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
      menuIconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/menu%20_%20checklist/SVG/",
      filtersItems: [
        {
          title: "Category",
          expand: false,
          mainCategories: [
            {
              title: "Venue",
              icon: "Asset 543.svg",
            },
            {
              title: "Transportation",
              icon: "Asset 543.svg",
            },
            {
              title: "Photographer",
              icon: "Asset 543.svg",
            },
            {
              title: "Rentals",
              icon: "Asset 543.svg",
            },
            {
              title: "Catering",
              icon: "Group 1471 (2).svg",
            },
            {
              title: "DJ",
              icon: "Asset 543.svg",
            },
            {
              title: "decoration",
              icon: "Asset 543.svg",
            },
            {
              title: "Favours & Gifts",
              icon: "Asset 543.svg",
            },
          ],
          moreCategories: [
            "Flowers",
            "Rentals",
            "Photo Booths",
            "Band",
            "Cakes",
            "Musicians",
            "Decor & Lighting",
            "Activities",
          ],
        },
        {
          title: "Location",
          expand: false,
          locations: ["Manhattan", "New Jersey", "Brooklyn", "Long Island", "Queens"],
        },
        {
          title: "Capacity",
          expand: false,
          options: [
            "Intimate event",
            "Small event (100- 300 guests)",
            "Medium event (300-700 guests)",
            "Large event (more than 700 guests)",
          ],
        },
        {
          title: "Rank",
          expand: false,
        },
      ],
      filters: {
        rank: [],
      },
    };
  },
  mounted() {
    this.working = true;
    // this.$auth.currentUser(this, true, () => {
    Vendors.find("categories").then((res) => {
      let list = [];
      _.each(res, (parentBuildingBlock) => {
        /* parentBuildingBlock.childComponents.forEach((bb)=>{
                            list.push({id: bb.id, value: bb.title});
                        }); */
        list.push({
          id: parentBuildingBlock.id,
          value: parentBuildingBlock.value,
        });
      });
      this.loadVendors();
      this.buildingBlocksList = list;
      console.log("vendor-pool.categories", list);
    });
    // })
  },
  methods: {
    loadVendors() {
      new Vendors()
        .limit(8)
        .page(this.page)
        .get()
        .then((vendors) => {
          this.vendorsList = [...this.vendorsList, ...vendors[0].results];
          this.working = false;
        });
    },
    loadMoreVendor() {
      this.page = this.page + 1;
      this.loadVendors();
    },
    changeView(view) {
      this.view = view;
    },
    showDeleteAlert(vendor) {
      swal({
        title: "Are you sure?",
        text: `You won't be able to revert this!`,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "md-button md-success confirm-btn-bg ",
        cancelButtonClass: "md-button md-danger cancel-btn-bg",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.working = true;

          vendor
            .delete()
            .then((result) => {
              let indx = _.findIndex(this.vendorsList, { id: vendor.id });
              this.vendorsList.splice(indx, 1);
              this.working = false;
            })
            .catch(() => {
              this.working = false;
            });
        }
      });
    },
    editVendorDetails(vendor) {
      this.$router.push({
        name: "EditVendor",
        params: { id: vendor.id, creation_mode: false },
      });
    },
    addNewVendor() {
      this.$router.push({
        name: "CreateVendor",
        props: { default: true, creation_mode: true },
      });
    },
    openUploadModal() {
      this.$refs.uploadModal.toggleModal(true);
    },
    expandFilter(index) {
      let indexOfExpandedItem = _.findIndex(this.filtersItems, {
        expand: true,
      });
      if (indexOfExpandedItem !== -1) this.filtersItems[indexOfExpandedItem].expand = false;
      this.filtersItems[index].expand = indexOfExpandedItem !== index ? true : false;
    },
  },
  computed: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
%visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

/deep/ .star-rating {
  &__star {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    font-size: 0.9em;
    color: #ababab;
    transition: color 0.2s ease-out;
    &.is-selected {
      color: #ffd700;
    }
  }
  &__checkbox {
    @extend %visually-hidden;
  }
}
</style>
