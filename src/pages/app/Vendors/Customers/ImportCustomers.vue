<template>
  <div>
    <div class="position-relative" v-if="upload">
      <div class="md-layout">
        <div class="md-layout-item pl-0 md-size-90">
          <div class="d-flex flex-column align-start">
            <div class="d-flex">
              <img :src="`${$iconURL}CustomerList/group-19001.svg`" class="mr-10" width="20" height="22" />

              <h3 class="font-size-25 font-bold m-0">Upload your File</h3>
            </div>
            <p class="font-size-14 mt-20">
              Don't have a compatible document?
              <strong>
                <a
                  href=""
                  style="color: #641856; text-decoration: none;
                   border-bottom: 1px solid  #641856; padding: 0px;"
                  >download our template</a
                ></strong
              >
            </p>
          </div>
        </div>
        <div class="md-layout-item pl-0 md-size-10">
          <md-button class="md-simple " style="margin-top: -10px" @click="$emit('cancel')">
            <md-icon>close</md-icon>
          </md-button>
        </div>
        <div class="md-layout-item pl-0 md-size-100 mt-30 ">
          <p class="d-flex font-size-15 font-bold-extra">Attach File</p>
        </div>
        <div class="md-layout-item pl-0 md-size-100">
          <p class="d-flex">
            <span class="font-size-14" style="cursor: pointer;">
              <img class="" :src="`${$iconURL}Campaign/Group 9087.svg`" />
              <md-tooltip class="custom_right ">
                <div class=" tab-tooltip px-20 py-20" style="color: black; width: 610px;">
                  <div>
                    <p class="font-size-18">
                      <strong>Tell us which columns in your file match our categories </strong>
                    </p>
                  </div>
                  <div class="mb-10 mt-10">
                    <p>
                      • Your file needs to contain columns that have the following information:<br />
                      service type, business name, contact person’s full name, phone number, <br />
                      and email (it’s ok if you have other information too).
                    </p>
                  </div>
                  <div class="mb-10">
                    <p>
                      • On the next screen, you’ll let us know which columns match Maryoku <br />
                      categories, so we can analyze them properly.
                    </p>
                  </div>
                </div>
              </md-tooltip>
              <span class="pl-5"> Make sure your file is ready to be imported</span>
            </span>
          </p>
        </div>

        <div class="form-group  mt-30  md-layout-item pl-0 md-size-100 pb-20">
          <vue-dropzone
            ref="csv"
            :options="dropzoneOptions"
            :useCustomSlot="true"
            @vdropzone-file-added="handleAdded"
            v-if="!csv"
            class="file-drop-zone upload-section text-center"
          >
            <md-button class="md-outlined md-simple md-vendor md-dense font-size-14">
              <i class="fas fa-paperclip md-simple pr-5"></i>
              <span>Choose File</span>
            </md-button>

            <div class="font-size-13 font-bold" style="">Or</div>
            <div class="font-size-14">Drag your file here</div>
          </vue-dropzone>

          <div class="form-group attach-file text-left mt-30" v-else>
            <i class="fas fa-paperclip md-simple md-vendor pr-5"></i>

            <a :href="`${fileUrl}`" class="color-black" target="_blank">{{ fileName }}</a>
            <span class="attach-trash" @click="fileName = null"><md-icon>close</md-icon></span>
          </div>
        </div>
        <div v-if="showError" class="md-error">{{ this.errorMessage }}</div>
      </div>
      <div class="md-layout-item pl-0 md-size-100 mt-40">
        <div
          class="d-flex justify-content-between
             align-center"
        >
          <div>
            <span class="font-bold">
              1/3
            </span>
          </div>
          <div>
            <md-button class="md-vendor maryoku-btn ml-auto font-size-14 px-20 " @click="load()">continue</md-button>
          </div>
        </div>
      </div>
    </div>
    <div class="position-relative" v-if="header">
      <div class="md-layout">
        <div class="md-layout-item pl-0 md-size-90">
          <div class="d-flex">
            <img :src="`${$iconURL}CustomerList/group-19001.svg`" class="mr-10" width="20" height="22" />

            <h3 class="font-size-25 font-bold m-0">Match your column headers to Maryoku categories</h3>
          </div>
        </div>

        <div class="md-layout-item pl-0 md-size-10">
          <md-button class="md-simple " style="margin-top: -7px;" @click="$emit('cancel')">
            <md-icon>close</md-icon>
          </md-button>
        </div>
        <div class="md-layout-item pl-0 md-size-100 mt-20 ">
          <div class="custom_border">
            <md-table>
              <md-table-row class="font-size-17">
                <md-table-head md-numeric>Matched</md-table-head>
                <md-table-head>Maryoku Category</md-table-head>
                <md-table-head>Column Header in File</md-table-head>
              </md-table-row>

              <md-table-row v-for="(field, key) in fieldsToMap" :key="key" class="text-left font-normal">
                <md-table-cell md-numeric class="pr-20"> <img :src="img" v-if="map[field.key]"/></md-table-cell>
                <md-table-cell> {{ field.label }} </md-table-cell>
                <md-table-cell>
                  <md-field>
                    <md-select v-model="map[field.key]" style="border: solid 2px #E0E0E0;" class="pt-5 px-5 md-vendor">
                      <md-option v-for="(column, key) in firstRow" :key="key" :value="key" class="md-vendor">{{
                        column
                      }}</md-option>
                    </md-select>
                  </md-field>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
        </div>

        <div class="mt-20">
          <strong>*You have {{ Object.keys(map).length }}/5 mandatory matched columns</strong>
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
                class="md-vendor maryoku-btn ml-auto font-size-14 px-20"
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

    <div class="position-relative" v-if="preview">
      <div class="md-layout">
        <div class="md-layout-item pl-0 md-size-90">
          <div class="d-flex align-center">
            <span class="mr-10"> <i class="fas fa-search fa-lg"></i></span>

            <h3 class="font-size-25 font-bold m-0">Preview</h3>
          </div>
        </div>
        <div class="md-layout-item pl-0 md-size-10">
          <md-button class="md-simple " style="" @click="$emit('cancel')">
            <md-icon>close</md-icon>
          </md-button>
        </div>

        <div class="md-layout-item pl-0 md-size-100 mt-20 ">
          <md-table style="width:100%">
            <md-table-row>
              <md-table-head>EIN</md-table-head>
              <md-table-head>Business Name</md-table-head>
              <md-table-head>Phone Number</md-table-head>
              <md-table-head>Email</md-table-head>
              <md-table-head>Contact Name</md-table-head>
            </md-table-row>

            <md-table-row class="text-center" v-for="(item, index) in form.csv" :key="index">
              <md-table-cell md-numeric>{{ item.ServiceType }}</md-table-cell>
              <md-table-cell>{{ item.BusinessName }}</md-table-cell>
              <md-table-cell> {{ item.PhoneNumber }}</md-table-cell>
              <md-table-cell>{{ item.email }}</md-table-cell>
              <md-table-cell>{{ item.ContactFullName }} </md-table-cell>
              <md-table-cell>
                <span style="color: #b7b5b5;"> <i class="fas fa-ellipsis-v fa-lg"></i></span
              ></md-table-cell>
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
              <md-button class="md-vendor maryoku-btn ml-auto font-size-14 px-40" @click="saveCustomers(form.csv)"
                >Save</md-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import axios from "axios";
import Papa from "papaparse";
import vue2Dropzone from "vue2-dropzone";
import Multiselect from "vue-multiselect";
import S3Service from "@/services/s3.service";
import { getBase64 } from "@/utils/file.util";
import success from "../../../../../static/img/good.svg";
export default {
  props: {
    events: {
      type: Array,
      default: [],
    },
  },
  components: {
    Multiselect,
    vueDropzone: vue2Dropzone,
  },
  data: () => ({
    form: {
      csv: null,
    },
    img: success,
    fieldsToMap: [],
    map: {},
    mapFields: ["ContactFullName", "email", "PhoneNumber", "BusinessName", "ServiceType"],
    hasHeaders: true,
    sample: null,
    selected: null,
    csv: null,
    done: false,

    upload: true,
    header: false,
    done: false,
    headers: true,
    preview: false,
    fileUrl: null,
    fileName: null,
    dropzoneOptions: {
      url: "https://httpbin.org/post",
      thumbnailWidth: 150,
      maxFilesize: 5,
      headers: { "My-Awesome-Header": "header value" },
    },
    showError: false,
    errorMessage: "",
  }),
  created() {
    this.hasHeaders = this.headers;
    if (_.isArray(this.mapFields)) {
      this.fieldsToMap = _.map(this.mapFields, item => {
        return {
          key: item,
          label: item,
        };
      });
    } else {
      this.fieldsToMap = _.map(this.mapFields, (label, key) => {
        return {
          key: key,
          label: label,
        };
      });
    }
  },
  methods: {
    eventIcon(idx) {
      return this.icons[Math.ceil(Math.random() * 10 * idx) % this.icons.length];
    },
    close() {
      this.$emit("cancel");
    },
    handleAdded(file) {
      this.csv = file;
      this.fileName = file.name;
    },
    async fileAdded(file) {
      const extension = file.type.split("/")[1];
      let fileName = new Date().getTime();
      this.fileName = file.name;
    },
    saveCustomers(item) {
      this.$emit("save", item);
      this.preview = false;
    },
    submit() {
      const _this = this;
      this.form.csv = this.buildMappedCsv();

      if (this.url) {
        axios
          .post(this.url, this.form)
          .then(response => {
            _this.callback(response);
          })
          .catch(response => {
            _this.catch(response);
          })
          .finally(response => {
            _this.finally(response);
          });
      } else {
        _this.callback(this.form.csv);
      }
    },
    buildMappedCsv() {
      const _this = this;
      let csv = this.hasHeaders ? _.drop(this.csv) : this.csv;
      return _.map(csv, row => {
        let newRow = {};

        _.forEach(_this.map, (column, field) => {
          _.set(newRow, field, _.get(row, column));
        });

        return newRow;
      });
    },
    load() {
      const _this = this;
      this.readFile(output => {
        _this.sample = _.get(Papa.parse(output, { preview: 2, skipEmptyLines: true }), "data");
        _this.csv = _.get(Papa.parse(output, { skipEmptyLines: true }), "data");
      });
      this.upload = false;
      this.header = true;
    },
    readFile(callback) {
      let file = this.csv;
      if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function(evt) {
          callback(evt.target.result);
        };
        reader.onerror = function() {};
      }
    },
  },
  watch: {
    map: {
      handler: function(newVal) {
        if (this.headers === true) {
          var hasAllKeys = this.mapFields.every(function(item) {
            return newVal.hasOwnProperty(item);
          });

          this.submit();
        }
      },
      deep: true,
    },
  },
  computed: {
    firstRow() {
      return _.get(this, "sample.0");
    },
    preRow() {
      // this.form.csv.shift();
      // return this.form.csv
    },
  },
};
</script>

<style scoped>
.event-logo {
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  width: 41px !important;
  height: 41px !important;
  min-width: 41px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 7px;
}
.md-table-row:hover:not(.md-header-row) .md-table-cell {
  background: unset !important;
}
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
table,
th,
td {
  border-left: none;
  border-right: none;
}
.md-table-head-container {
  font-size: 12px;
  padding-left: 10px;
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
#done_modal {
  background: #f3f7fd;
  height: 370px;
}
.md-table-row:hover:not(.md-header-row) .md-table-cell {
  background: unset !important;
}
.upload-section {
  border-color: #641856 !important;
}
.t_text {
  margin: 0 24.7px 19.5px 106px;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  color: #641856;
}
.s_text {
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #050505;
}
</style>
