<template>
  <div class="position-relative" v-if="preview">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <div
          class="d-flex justify-content-between
             align-center"
        >
          <div class="d-flex align-center">
            <span class="mr-10"> <i class="fas fa-search fa-lg"></i></span>

            <h3 class="font-size-30 font-bold m-0">Preview</h3>
          </div>
          <div>
            <md-button class="md-simple " style="" @click="$emit('cancel')">
              <md-icon>close</md-icon>
            </md-button>
          </div>
        </div>
      </div>
      <div class="md-layout-item pl-0 md-size-100 mt-20 ">
        <md-table>
          <md-table-row>
            <md-table-head md-numeric>EIN</md-table-head>
            <md-table-head>Business Name</md-table-head>
            <md-table-head>Phone Number</md-table-head>
            <md-table-head>Email</md-table-head>
            <md-table-head>Address</md-table-head>
            <md-table-head>Contact Name</md-table-head>
          </md-table-row>

          <md-table-row>
            <md-table-cell md-numeric>12-3456789</md-table-cell>
            <md-table-cell>Relish Caterers & Venues</md-table-cell>
            <md-table-cell> 212-228-1672</md-table-cell>
            <md-table-cell>info@relishcat…</md-table-cell>
            <md-table-cell>830 Fifth Avenue New York, NY 10065</md-table-cell>
            <md-table-cell>Tom Davis</md-table-cell>
          </md-table-row>
        </md-table>
      </div>

      <div class="md-layout-item pl-0 md-size-100 mt-30">
        <div
          class="d-flex justify-content-between
             align-center"
        >
          <div>
            <span class="font-bold">
              3/3
            </span>
          </div>
          <div>
            <md-button
              class="md-vendor maryoku-btn ml-auto"
              @click="
                preview = false;
                done = true;
              "
              >Continue</md-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.title {
  width: 237px;
  height: 40px;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #050505;
}

.custom_border {
  border: solid 1px #e0e0e0;
}

.custom_right {
  margin-left: 290px;
}
.subtitle {
  width: 506px;
  height: 21px;

  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: normal;
  text-align: left;
  color: #000;
}

h2 {
  font-size: 16px;
  margin: 0px 5px;
}

.upload-section {
  border-color: #641856 !important;
}
</style>

