<template>
  <md-card class="md-card-plain clear-margins vendors-pool-list">
    <md-card-content>
      <md-table v-model="filteredVendorsList" style="background-color: white !important; display: block; border-radius: 8px;box-shadow: 0 0 3px #ccc;" class="clear-margins">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <md-field>
              <md-input
                v-model="searchQuery"
                type="search"
                class="mb-1"
                clearable
                placeholder="Search vendors"
              />
            </md-field>
          </div>
          <div v-if="false" class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>delete</md-icon>
            </md-button>
          </div>
        </md-table-toolbar>
        <md-table-empty-state :md-description="`No vendors found for '${searchQuery}'. Try a different search term or create add new vendor.`">
          <md-button style="display: inline-block;" class="md-info md-sm" @click="$emit('add-new-vendor')">
            Add Vendor
          </md-button>
          <md-button style="display: inline-block;" class="md-purple md-sm" @click="$emit('open-upload-modal')">
            Import Vendors From Spreadsheet
          </md-button>
        </md-table-empty-state>
        <md-table-row slot="md-table-row" :key="item.id" slot-scope="{ item, index }" class="table-striped">
          <md-table-cell md-label="Vendor Name" class="text-bold">
            <a href="javascript: void(null);" @click="routeToVendor(item.id, $event)">
              {{ item.vendorDisplayName }}
            </a>
          </md-table-cell>
          <md-table-cell md-label="Email">
            {{ item.vendorMainEmail }}
          </md-table-cell>
          <md-table-cell md-label="Phone">
            {{ item.vendorMainPhoneNumber }}
          </md-table-cell>
          <md-table-cell md-label="Website">
            {{ item.vendorWebsite }}
          </md-table-cell>
          <md-table-cell md-label="Vendor Category">
            {{ categoryTitle(item.vendorCategory, buildingBlocksList) }}
          </md-table-cell>
          <md-table-cell md-label="Tags">
            <md-chips
              id="tagging"
              v-model="item.vendorTagging"
              style="padding: 0; margin: 0;"
              class="md-primary"
              name="tagging"
              :md-deletable="false"
              :md-static="true"
            />
          </md-table-cell>
          <md-table-cell style="white-space: nowrap;" class="hover">
            <md-button class="md-info md-xs md-just-icon md-round" @click.prevent="editVendorDetails(item)">
              <md-icon>edit</md-icon>
            </md-button>
            <md-button
              class="md-danger md-xs md-just-icon md-round"
              @click.prevent="remove(item)"
            >
              <md-icon>delete</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </md-card-content>
  </md-card>
  <!--<md-table
    v-model="vendorsList"
    table-header-color="rose"
    class="table-striped table-hover right-align-actions"
  >
    <md-table-row
      slot="md-table-row"
      slot-scope="{ item }"
      class="hover-row"
    >
      <md-table-cell md-label="Vendor Name">{{ item.vendorDisplayName }}</md-table-cell>
      <md-table-cell md-label="Email">{{ item.vendorMainEmail }}</md-table-cell>
      <md-table-cell md-label="Phone">{{ item.vendorMainPhoneNumber }}</md-table-cell>
      <md-table-cell md-label="Website">{{ item.vendorWebsite }}</md-table-cell>
      <md-table-cell md-label="Vendor Category">{{ categoryTitle(item.vendorCategory, buildingBlocksList) }}</md-table-cell>
      <md-table-cell md-label="Tags">
        <md-chips
          v-model="item.vendorTagging"
          style="padding: 0; margin: 0;"
          class="md-primary"
          name="tagging"
          id="tagging"
          :md-deletable="false"
          :md-static="true"
        />
      </md-table-cell>
      <md-table-cell md-label="Actions" style="white-space: nowrap;">
        <md-button  @click.prevent="showVendorDetails(item)" class="md-info md-just-icon md-round">
          <md-icon>edit</md-icon>
        </md-button>
        <md-button
          @click.prevent="remove(item)"
          class="md-danger md-just-icon md-round"
        >
          <md-icon>delete</md-icon>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>-->
</template>
<script>
import { categoryTitle } from "./helpers";

export default {
  props: ["vendorsList", "buildingBlocksList"],
  data () {
    return {
      searchQuery: "",
      filteredVendorsList: []
    };
  },
  watch: {
    searchQuery (newVal, oldVal) {
      this.filterVendors();
    }
  },
  mounted () {
    this.filteredVendorsList = this.vendorsList;
  },
  methods: {
    categoryTitle,
    editVendorDetails (vendor) {
      this.$emit("editVendorDetails", vendor);
    },
    routeToVendor (vendorId) {
      this.$router.push({ name: "VendorDetails", params: { id: vendorId } });
    },
    remove (vendor) {
      this.$emit("delete", vendor);
    },
    filterVendors () {
      this.filteredVendorsList = _.filter(this.vendorsList, (v) => {
        let byDisplayName = v.vendorDisplayName.toString().toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
        let byCategory = v.vendorCategory.toString().toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
        return byDisplayName || byCategory;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
