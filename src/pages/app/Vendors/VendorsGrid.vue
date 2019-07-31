<template>
  <div class="md-layout md-gutter">
    <div
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
                  <h5 class="title" style="font-weight: 700;">{{vendor.vendorDisplayName}}</h5>
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
          <md-button class="md-sm md-info" @click="showVendorDetails(vendor)">More ...</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>
<script>
  import { categoryTitle, categoryColor } from './helpers'  

  export default {
    props: ['vendorsList', 'ratings', 'buildingBlocksList'],
    methods: {
      categoryTitle, 
      categoryColor,
      showVendorDetails (vendor) {
        this.$emit('showVendorDetails', vendor);
      }
    }
  }
</script>
