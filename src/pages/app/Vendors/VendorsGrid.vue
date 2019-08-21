<template>
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-100 " style="margin-bottom: 42px; margin-top: 0;">
            <md-field>
                <md-input
                    type="search"
                    class="mb-3"
                    clearable
                    placeholder="Search vendors"
                    v-model="searchQuery">
                </md-input>
            </md-field>
        </div>
        <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-large-size-25 md-size-20"
             v-for="vendor in filteredVendorsList"
             :key="vendor.id">
            <product-card
                header-animation="true" fixed-header="false" :data-count="9999" :hover-count="9999">
                <img class="img" slot="imageHeader" :src="vendorMainImage(vendor)" style="min-height: 180px;max-height: 180px; object-fit: cover;">
                <div slot="card-buttons">
                    <md-button class="md-purple md-xs md-round md-just-icon">
                        <md-icon >more_horiz</md-icon>
                        <md-tooltip md-direction="bottom">View</md-tooltip>
                    </md-button>

                    <md-button v-if="vendor.vendorWebsite" class="md-info md-xs md-round md-just-icon" :href="`${vendor.vendorWebsite}`" target="_blank">
                        <md-icon>open_in_browser</md-icon>
                        <md-tooltip md-direction="bottom">Open website</md-tooltip>

                    </md-button>

                    <md-button class="md-warning md-xs md-round md-just-icon" @click="showVendorDetails(vendor)">
                        <md-icon >edit</md-icon>
                        <md-tooltip md-direction="bottom">Edit</md-tooltip>

                    </md-button>
                    <md-button class="md-danger md-xs md-round md-just-icon">
                        <md-icon >delete</md-icon>
                        <md-tooltip md-direction="bottom">Remove</md-tooltip>

                    </md-button>
                </div>
                <h4 slot="title" class="title">
                    <a class="" style="font-weight: bold;" href="#pablo">{{vendor.vendorDisplayName}}</a>
                    <div class="small">
                        <label
                            class="star-rating__star"
                            v-for="(rating, ratingIndex) in ratings"
                            :key="ratingIndex"
                            :class="{'is-selected' : ((vendor.rank >= rating) && vendor.rank != null)}"
                        >★</label>
                        <span class="small text-gray">({{vendor.voters}})</span>
                    </div>
                </h4>

                <div slot="description" class="card-description ">
                    <div style="max-height: 20px;">
                        <p>
                            {{vendor.vendorTagLine}}
                        </p>
                    </div>
                    <div style="min-height: 38px;">
                        <template v-if="vendor.vendorTagging && vendor.vendorTagging.length" v-for="(tag, index) in vendor.vendorTagging">
                            <span style="text-transform: capitalize;">{{tag}}</span><span v-if="index <=  vendor.vendorTagging.length"> &middot; </span>
                        </template>
                    </div>
                </div>
                <template slot="footer">
                    <div class="price">
                        <div
                            class="badge badge-primary"
                            :class="`badge-${categoryColor(vendor.vendorCategory, buildingBlocksList)}`"
                            style="font-size: 10px !important; position: relative; top: 90%;">{{ categoryTitle(vendor.vendorCategory, buildingBlocksList) }}</div>
                    </div>
                    <div class="stats">
                        <p class="category">
                            <md-icon>place</md-icon>
                            Geography
                        </p>
                    </div>
                </template>
            </product-card>
        </div>
        <!--<div
            class="md-layout-item md-small-size-100 md-medium-size-50 md-large-size-33"
            v-for="vendor in vendorsList"
            :key="vendor.id"
        >
            <md-card>
                <md-card-content style="padding: 15px;">
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100" style="padding: 0;">
                            <div class="md-layout" style="margin: 0 -12px; ">
                                <div class="md-layout-item md-size-50">
                                    <div
                                        style="background:url('/static/img/lock.jpg') no-repeat center center; height:100%; width:100%; background-size: cover; box-shadow: 0 0 3px #c0c0c0; border-radius: 5px; text-align: center;"
                                    >
                                        <div
                                            class="badge badge-rose"
                                            :class="`badge-${categoryColor(vendor.vendorCategory, buildingBlocksList)}`"
                                            style="font-size: 10px !important; position: relative; top: 90%;"
                                        >{{ categoryTitle(vendor.vendorCategory, buildingBlocksList) }}</div>
                                    </div>
                                </div>
                                <div class="md-layout-item md-size-50">
                                    <h5 class="title ellipsis" style="font-weight: 700; white-space: nowrap;">{{vendor.vendorDisplayName}}</h5>
                                    <div class>
                                        <label
                                            class="star-rating__star"
                                            v-for="(rating, ratingIndex) in ratings"
                                            :key="ratingIndex"
                                            :class="{'is-selected' : ((vendor.rank >= rating) && vendor.rank != null)}"
                                        >★</label>
                                        <span class="small text-gray">({{vendor.voters}})</span>
                                    </div>
                                    <div class="item-content ellipsis" style="min-height: 80px; max-height: 80px;">
                                        <div>
                                            <p>{{vendor.vendorTagLine}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </md-card-content>
                <md-card-actions md-alignment="space-between">
                    <div>
                        <md-chips
                            v-model="vendor.vendorTagging"
                            style="padding: 0; margin: 0;"
                            class="md-primary"
                            name="tagging"
                            id="tagging"
                            :md-deletable="false"
                            :md-static="true"
                        />
                    </div>
                    <div>
                        <md-button :href="`${vendor.vendorWebsite}`" target="_blank" class="text-info md-sm md-simple md-round md-just-icon clear-margins">
                            <md-icon>chat_bubble</md-icon>
                            <md-tooltip>Contact</md-tooltip>
                        </md-button>
                        <md-button :href="`${vendor.vendorWebsite}`" target="_blank" class="text-info md-sm md-simple md-round md-just-icon clear-margins">
                            <md-icon>open_in_browser</md-icon>
                            <md-tooltip>Website</md-tooltip>
                        </md-button>
                        <md-button @click="showVendorDetails(vendor)" target="_blank" class="text-info md-small md-simple md-round md-just-icon clear-margins">
                            <md-icon>more_horiz</md-icon>
                            <md-tooltip>Details</md-tooltip>
                        </md-button>
                        &lt;!&ndash;<md-button class="md-simple md-round md-xs md-info md-just-icon" @click="showVendorDetails(vendor)"><md-icon>chevron_right</md-icon></md-button>&ndash;&gt;
                    </div>
                </md-card-actions>
            </md-card>
        </div>-->
    </div>
</template>
<script>
  import { categoryTitle, categoryColor } from './helpers'
  import _ from 'underscore';

  import {
    ProductCard,
    AnimatedNumber
  } from "@/components";

  export default {
    components: {
      ProductCard,
      AnimatedNumber,
    },
    props: ['vendorsList', 'ratings', 'buildingBlocksList'],
    data() {
      return {
        searchQuery: "",
        filteredVendorsList: [],
        bgImages : [
          '/static/img/lock.jpg',
          '/static/img/login.jpg',
          '/static/img/register.jpg',
          '/static/img/bg-pricing.jpg',
          '/static/img/bg3.jpg',
          '/static/img/bg9.jpg',
          '/static/img/card-1.jpg',
          '/static/img/card-2.jpg',
          '/static/img/card-3.jpg',
          '/static/img/sidebar-1.jpg',
          '/static/img/sidebar-2.jpg',
          '/static/img/sidebar-3.jpg',
          '/static/img/sidebar-4.jpg',
          '/static/img/shutterstock_289440710.png',
          '/static/img/shutterstock_495639391.png',
          '/static/img/shutterstock_732491308.png',
          '/static/img/shutterstock_740167702.png'
        ]
      }
    },
    mounted() {
      this.filteredVendorsList = this.vendorsList;
    },
    methods: {
      categoryTitle,
      categoryColor,
      showVendorDetails (vendor) {
        this.$emit('showVendorDetails', vendor);
      },
      vendorMainImage(vendor){
        const rndInt = Math.floor(Math.random() * this.bgImages.length);
        return this.bgImages[rndInt];
      },
      filterVendors(){
        this.filteredVendorsList = _.filter(this.vendorsList, (v)=>{
          return v.vendorDisplayName.toString().toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
        });
      }
    },
    watch: {
      searchQuery(newVal, oldVal){
        if (newVal === '') {
          this.filteredVendorsList = this.vendorsList;
        } else {
          this.filterVendors();
        }
      },
      vendorsList(newVal, oldVal){
        this.filterVendors();
      }
    }
  }
</script>
<style lang="scss" scoped>

    @import '@/assets/scss/md/_colors.scss';

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
        content:"";
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

        background: -webkit-gradient(linear, left top, right top,
            from(rgba(255, 255, 255, 0)), to(white), color-stop(50%, white));
        background: -moz-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
        background: -o-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
        background: -ms-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
        background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
    }

    .md-tooltip {
        z-index: 9999 !important;
        background: $purple-500 !important;
        color: $white !important;

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
</style>
