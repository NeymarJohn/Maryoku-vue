<template>
    <md-table
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
    </md-table>
</template>
<script>
  import { categoryTitle } from './helpers'

  export default {
    props: ['vendorsList', 'buildingBlocksList'],
    methods: {
      categoryTitle,
      showVendorDetails (vendor) {
        this.$emit('showVendorDetails', vendor);
      },

      remove (vendor) {
        this.$emit('delete', vendor);
      }
    }
  }
</script>
