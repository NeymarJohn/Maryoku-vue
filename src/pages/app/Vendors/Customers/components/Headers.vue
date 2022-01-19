<template>
  <div class="position-relative" v-if="header">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <div
          class="d-flex justify-content-between
             align-center"
        >
          <div class="d-flex">
            <img :src="`${$iconURL}CustomerList/group-19001.svg`" class="mr-10" width="20" height="22" />

            <h3 class="font-size-30 font-bold m-0">Match your file headers to maryoku properties</h3>
          </div>
          <div>
            <md-button class="md-simple " style="" @click="$emit('cancel')">
              <md-icon>close</md-icon>
            </md-button>
          </div>
        </div>
      </div>
      <div class="md-layout-item pl-0 md-size-100 mt-20 ">
        <div class="custom_border">
          <md-table>
            <md-table-row>
              <md-table-head md-numeric>Mathced</md-table-head>
              <md-table-head>Maryoku Property</md-table-head>
              <md-table-head>Column Headers From File</md-table-head>
            </md-table-row>

            <md-table-row>
              <md-table-cell md-numeric> <img src="/static/img/good.svg"/></md-table-cell>
              <md-table-cell> Conract Full Name* </md-table-cell>
              <md-table-cell>
                <multiselect
                  v-model="selected"
                  :options="options"
                  class="height-20 mt-5 form-input md-purple"
                  :close-on-select="true"
                  :clear-on-select="true"
                  tag-placeholder="Add this as new tag"
                >
                </multiselect>
              </md-table-cell>
            </md-table-row>

            <md-table-row>
              <md-table-cell md-numeric> <img src="/static/img/good.svg"/></md-table-cell>
              <md-table-cell> Conract Full Name* </md-table-cell>
              <md-table-cell>
                <multiselect
                  v-model="selected"
                  :options="options"
                  class="height-20 mt-5 form-input md-purple"
                  :close-on-select="true"
                  :clear-on-select="true"
                  tag-placeholder="Add this as new tag"
                >
                </multiselect>
              </md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell md-numeric> <img src="/static/img/good.svg"/></md-table-cell>
              <md-table-cell> Conract Full Name* </md-table-cell>
              <md-table-cell>
                <multiselect
                  v-model="selected"
                  :options="options"
                  class="height-20 mt-5 form-input md-purple"
                  :close-on-select="true"
                  :clear-on-select="true"
                  tag-placeholder="Add this as new tag"
                >
                </multiselect>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>

      <div class="mt-20">
        <strong>*You have 1/2 mandatory matched column</strong>
      </div>

      <div class="md-layout-item pl-0 md-size-100 mt-20">
        <div
          class="d-flex justify-content-between
             align-center"
        >
          <div>
            <span class="font-bold">
              2/3
            </span>
          </div>
          <div>
            <md-button
              class="md-vendor maryoku-btn ml-auto"
              @click="
                header = false;
                preview = true;
              "
              >Continue</md-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueCsvImport from "vue-csv-import";
import Multiselect from "vue-multiselect";
// import Modal from "@/components/Modal.vue";

import { getBase64 } from "@/utils/file.util";
import S3Service from "@/services/s3.service";

export default {
  props: {},
  components: {
    VueCsvImport,

    Multiselect,
  },
  data: () => ({
    selected: null,
    csv: null,
    options: ["list", "of", "options"],
  }),

  methods: {
    close() {
      this.$emit("cancel");
    },
  },
};
</script>

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
