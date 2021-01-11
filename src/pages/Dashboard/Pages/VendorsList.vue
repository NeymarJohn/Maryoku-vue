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

    <md-button @click="exportXls" class="md-simple md-red maryoku-btn">Export XLSX</md-button>
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
        <md-table-cell md-label="User Name" md-sort-by="vendorDisplayName">
          <a :href="`${currentPath}/#/vendor-signup/edit/${item.id}`" target="_blank">{{
            `${currentPath}/#/vendor-signup/edit/${item.id}`
          }}</a>
          &emsp;<md-button
            class="md-simple md-red edit-btn md-just-icon"
            @click="copyUrl(`${currentPath}/#/vendor-signup/edit/${item.id}`)"
            v-clipboard:copy="`${currentPath}/#/vendor-signup/edit/${item.id}`"
            v-clipboard:success="onCopy"
            v-clipboard:error="onCopyError"
            ><md-icon>content_copy</md-icon></md-button
          ></md-table-cell
        >
        <md-table-cell md-label="User Name" md-sort-by="vendorDisplayName">{{ item.vendorDisplayName }}</md-table-cell>
        <md-table-cell md-label="Business Category" md-sort-by="eventCategory.title">{{
          item.eventCategory ? item.eventCategory.title : ""
        }}</md-table-cell>
        <md-table-cell md-label="Main Email" md-sort-by="vendorMainEmail">{{ item.vendorMainEmail }}</md-table-cell>
        <md-table-cell md-label="Address" md-sort-by="vendorAddressLine1">{{ item.vendorAddressLine1 }}</md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog-alert :md-active.sync="showAlert" md-content="Copied vendor link!" md-confirm-text="Cool!" />
  </div>
</template>
<script>
import Vendors from "@/models/Vendors";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  data() {
    return {
      vendors: null,
      showAlert: false,
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
  methods: {
    copyUrl(url) {},
    onCopy() {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    },
    onCopyError() {},
    exportXls() {
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      const exportVendors = [];
      this.vendors.forEach((item, index) => {
        exportVendors.push({
          number: index + 1,
          companyName: item.companyName,
          editUrl: `${this.currentPath}/#/vendor-signup/edit/${item.id}`,
          userName: item.vendorDisplayName,
          category: item.eventCategory ? item.eventCategory.title : "",
          email: item.vendorMainEmail,
          address: item.vendorAddressLine1,
        });
      });
      const ws = XLSX.utils.json_to_sheet(exportVendors);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "vendors.xlsx");
    },
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