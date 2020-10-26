<template>
  <div class="card vendor-list-all">
    <h1>All Vendors</h1>

    <table>
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
    </table>
  </div>
</template>
<script>
import Vendors from "@/models/Vendors";
export default {
  data() {
    return {
      vendors: null,
    };
  },
  created() {
    Vendors.get().then((vendors) => {
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
    td,
    th {
      text-align: center;
    }
  }
}
</style>