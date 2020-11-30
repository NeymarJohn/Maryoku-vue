<template>
  <div class="card vendor-list-all">
    <h1>All Vendors</h1>

    <!-- <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Company Name</th>
          <th>User Name</th>
          <th>Business Category1</th>
          <th>Business Category2</th>
          <th>Main Email</th>
          <th>Location1</th>
          <th>Location2</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vendor, index) in vendors" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ vendor.companyName }}</td>
          <td>{{ vendor.vendorDisplayName }}</td>
          <td>{{ vendor.eventCategory ? vendor.eventCategory.title : "" }}</td>
          <td>{{ vendor.secondaryEventCategory ? vendor.secondaryEventCategory.title : "" }}</td>
          <td>{{ vendor.vendorMainEmail }}</td>
          <td>{{ vendor.vendorAddressLine1 }}</td>
          <td>{{ vendor.vendorAddressLine2 }}</td>
        </tr>
      </tbody>
    </table> -->

    <md-table v-if="vendors && vendors.length > 0" md-sort="companyName" md-sort-order="asc">
      <md-table-row>
        <md-table-head md-numeric>No</md-table-head>
        <md-table-head>Company Name</md-table-head>
        <md-table-head>Editing Url</md-table-head>
        <md-table-head>User Name</md-table-head>
        <md-table-head>Business Catgory</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Address</md-table-head>
      </md-table-row>
      <md-table-row v-for="(item, index) in vendors" :key="item.id">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ index + 1 }}</md-table-cell>
        <md-table-cell md-label="Company Name" md-sort-by="companyName">{{ item.companyName }} </md-table-cell>
        <md-table-cell md-label="User Name" md-sort-by="vendorDisplayName">{{
          `${currentPath}/vendor-signup/update/${item.id}`
        }}</md-table-cell>
        <md-table-cell md-label="User Name" md-sort-by="vendorDisplayName">{{ item.vendorDisplayName }}</md-table-cell>
        <md-table-cell md-label="Business Category" md-sort-by="eventCategory.title">{{
          item.eventCategory ? item.eventCategory.title : ""
        }}</md-table-cell>
        <md-table-cell md-label="Main Email" md-sort-by="vendorMainEmail">{{ item.vendorMainEmail }}</md-table-cell>
        <md-table-cell md-label="Address" md-sort-by="vendorAddressLine1">{{ item.vendorAddressLine1 }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>
<script>
import Vendors from "@/models/Vendors";
export default {
  data() {
    return {
      vendors: null,
      currentPath: location.origin,
    };
  },
  created() {
    // Vendors.get().then((vendors) => {
    //   this.vendors = vendors[0].results;
    // });

    new Vendors().get().then((vendors) => {
      this.vendors = vendors[0].results;
    });
  },
};
</script>
<style lang="scss" scoped>
.vendor-list-all {
  h1 {
    text-align: center;
  }
  table {
    padding: 30px;
    width: 100%;
    min-width: 1200px;
  }
}
</style>