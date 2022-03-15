<template>
  <div>
    <div v-if="upload" class="position-relative">
      <div class="md-layout">
        <div class="md-layout-item pl-0 md-size-90">
          <div class="d-flex flex-column align-start">
            <div class="d-flex">
              <img :src="`${$iconURL}CustomerList/group-19001.svg`" class="mr-10" width="20" height="22">

              <h3 class="font-size-25 font-bold m-0">
                Upload your File
              </h3>
            </div>
            <p class="font-size-14 mt-20">
              Don't have a compatible document?
              <strong>
                <a
                  href="static/Vendorlist_template.csv"
                  style="color: #641856; text-decoration: none;
                   border-bottom: 1px solid  #641856; padding: 0px;"
                >Download our template</a></strong>
            </p>
          </div>
        </div>
        <div class="md-layout-item pl-0 md-size-10">
          <md-button class="md-simple " style="margin-top: -10px" @click="$emit('cancel')">
            <md-icon id="x_mark">
              close
            </md-icon>
          </md-button>
        </div>
        <div class="md-layout-item pl-0 md-size-100 mt-30 ">
          <p class="d-flex font-size-15 font-bold-extra">
            Attach File
          </p>
        </div>
        <div class="md-layout-item pl-0 md-size-100">
          <div class="d-flex">
            <span class="font-size-14" style="cursor: pointer;">
              <img class="" :src="`${$iconURL}Campaign/Group 9087.svg`">
              <md-tooltip class="custom_right ">
                <div class=" tab-tooltip px-20 py-20" style="color: black; width: 610px;">
                  <div>
                    <p class="font-size-18">
                      <strong>Tell us which columns in your file match our categories </strong>
                    </p>
                  </div>
                  <div class="mb-10 mt-10">
                    <p>
                      • Your file needs to contain columns that have the following information:<br>
                      business name, contact person’s full name, phone number, <br>
                      and email (it’s ok if you have other information too).
                    </p>
                  </div>
                  <div class="mb-10">
                    <p>
                      • On the next screen, you’ll let us know which columns match Maryoku <br>
                      categories, so we can analyze them properly.
                    </p>
                  </div>
                </div>
              </md-tooltip>
              <span class="pl-5"> Make sure your file is ready to be imported</span>
            </span>
          </div>
        </div>

        <div class="form-group  mt-30  md-layout-item pl-0 md-size-100 pb-20" :class="{hasFile: csv, opened: showErrors}">
          <vue-dropzone
            v-if="!csv"
            id="drop"
            ref="csv"
            :options="dropzoneOptions"
            :use-custom-slot="true"
            class="file-drop-zone upload-section text-center"
            @vdropzone-file-added="handleAdded"
          >
            <md-button class="md-outlined md-simple md-vendor md-dense font-size-14">
              <i class="fas fa-paperclip md-simple pr-5" />
              <span>Choose File</span>
            </md-button>

            <div class="font-size-13 font-bold" style="">
              Or
            </div>
            <div class="font-size-14">
              Drag your file here
            </div>
          </vue-dropzone>

          <div v-else class="added-file-wrapper" :class="{'opened': showErrors}">
            <div class="file">
              <div>
                <i class="fas fa-paperclip md-simple md-vendor pr-5" />
                <a :href="`${fileUrl}`" class="color-black" target="_blank"> {{ fileName }} </a>
              </div>
              <div>
                <div class="progressbar color-yellow-dark">
                  <div class="progress-inner-bar" :class="{fileIsLoading}" />
                </div>
                <span class=" color-won">{{ fileIsLoading?'90%':'100%' }}</span>
              </div>
              <div>
                <span v-show="!fileIsLoading" class=" color-red" :class=" {'color-won': !errors}"> {{ errors ? 1 : 'NO ' }} </span>
                <span class="color-black-heavy"> ERROR </span>
                <span v-if="errors" @click="showErrors=!showErrors"><md-icon>{{
                  showErrors ? 'expand_less' : 'expand_more'
                }}</md-icon></span>
              </div>
            </div>
            <span class="attach-trash" @click="deleteFile"><md-icon>delete</md-icon></span>
          </div>
        </div>
        <div v-if="showError&&!csv" class="md-error error_text">
          {{ this.errorMessage }}
        </div>
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
            <md-button class="md-vendor maryoku-btn ml-auto font-size-14 px-20 " @click="load()">
              continue
            </md-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="header" class="position-relative">
      <div class="md-layout">
        <div class="md-layout-item pl-0 md-size-90">
          <div class="d-flex">
            <img :src="`${$iconURL}CustomerList/group-19001.svg`" class="mr-10" width="20" height="22">

            <h3 class="font-size-25 font-bold m-0">
              Match your column headers to Maryoku categories
            </h3>
          </div>
        </div>

        <div class="md-layout-item pl-0 md-size-10">
          <md-button class="md-simple " style="margin-top: -7px;" @click="$emit('cancel')">
            <md-icon id="x_mark">
              close
            </md-icon>
          </md-button>
        </div>
        <div class="md-layout-item pl-0 md-size-100 mt-20 ">
          <div id="headers_to_categories_mapping" class="custom_border">
            <md-table>
              <md-table-row class="font-size-17">
                <md-table-head md-numeric>
                  Matched
                </md-table-head>
                <md-table-head>Maryoku Category</md-table-head>
                <md-table-head>Column Header in File</md-table-head>
              </md-table-row>

              <md-table-row v-for="(field, key) in fieldsToMap" :key="key" class="text-left font-normal">
                <md-table-cell md-numeric class="pr-20">
                  <img v-if="map[field.key]" :src="img">
                </md-table-cell>
                <md-table-cell :id="field.label">
                  {{ mapFieldsNames[key] }}
                </md-table-cell>
                <md-table-cell>
                  <customizable-select :initial-value="'Choose ' + mapSelectNames[key]" :data="firstRow" @valueChanged="onValueChanged($event, field.key)" />
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
        </div>

        <div class="mt-20">
          <strong>*You have {{ requiredFieldsNumber }}/2 mandatory matched columns</strong>
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
                @click="backToUpload()"
              >
                Back
              </md-button>
              <md-button
                class="md-vendor maryoku-btn ml-auto font-size-14 px-20"
                @click="showPreview()"
              >
                continue
              </md-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="preview" class="position-relative">
      <div class="md-layout">
        <div class="md-layout-item pl-0 md-size-90">
          <div class="d-flex align-center">
            <span class="mr-10"> <i class="fas fa-search fa-lg" /></span>

            <h3 class="font-size-25 font-bold m-0">
              Preview
            </h3>
          </div>
        </div>
        <div class="md-layout-item pl-0 md-size-10">
          <md-button class="md-simple " style="" @click="$emit('cancel')">
            <md-icon id="x_mark">
              close
            </md-icon>
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

            <md-table-row v-for="(item, index) in form.csv" :key="index" class="text-center">
              <md-table-cell> {{ item.EIN }}</md-table-cell>
              <md-table-cell>{{ item.BusinessName }}</md-table-cell>
              <md-table-cell> {{ item.PhoneNumber }}</md-table-cell>
              <md-table-cell>{{ item.email }}</md-table-cell>
              <md-table-cell>{{ item.ContactFullName }} </md-table-cell>
              <md-table-cell>
                <span style="color: #b7b5b5;"> <i class="fas fa-ellipsis-v fa-lg" /></span>
              </md-table-cell>
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
              <md-button class="md-vendor maryoku-btn ml-auto font-size-14 px-40" @click="backToPreview()">
                Back
              </md-button>
              <md-button class="md-vendor maryoku-btn ml-auto font-size-14 px-40" @click="saveCustomers(form.csv)">
                Done
              </md-button>
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
import vue2Dropzone from "vue2-dropzone";
import CustomizableSelect from "../../../../components/Select/CustomizableSelect";
import { getBase64 } from "@/utils/file.util";
import success from "../../../../../static/img/good.svg";
export default {
  components: {
    CustomizableSelect,
    vueDropzone: vue2Dropzone,
  },
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    form: {
      csv: null,
    },
    img: success,
    fieldsToMap: [],
    map: {
      "ContactFullName": null,
      "email": null,
      "PhoneNumber": null,
      "BusinessName": null,
      "EIN": null
    },
    requiredFieldsNumber: 0,
    mapFields: ["ContactFullName", "email", "PhoneNumber", "BusinessName", "EIN"],
    mapFieldsNames: ["Contact Full Name*", "Email*", "Phone Number", "Business Name", "EIN"],
    mapSelectNames: ["Name", "Email", "Phone Number", "Business Name", "Headers"],
    hasHeaders: true,
    sample: [],
    selected: null,
    csv: null,
    csv2: [],
    showErrors: false,
    fileIsLoading: true,
    errors: 1,
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
    url: `${process.env.SERVER_URL}/1/customersCSV`,
  }),
  computed: {
    firstRow() {
      return _.get(this, "sample.0");
    },
    preRow() {
      // this.form.csv.shift();
      // return this.form.csv
    },
    vendorData() {
      return this.$store.state.vendor.profile;
    },
  },
    watch: {
    map: {
      handler: function(newVal) {
        if (this.headers === true) {
          this.mapFields.every(function(item) {
            return newVal.hasOwnProperty(item);
          });
            this.requiredFieldsNumber = newVal.ContactFullName && newVal.email ? 2 :
                newVal.ContactFullName || newVal.email ? 1 : 0;
          // this.submit();
        }
      },
      deep: true,
    },
  },
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
    onValueChanged(value, key) {
      this.map[key] = value;
    },
    eventIcon(idx) {
      return this.icons[Math.ceil(Math.random() * 10 * idx) % this.icons.length];
    },
    deleteFile(){
      this.fileName = null;
      this.csv = null;
      this.csv2 = [];
      this.sample = [];
    },
    close() {
      this.$emit("cancel");
    },
    async handleAdded(file) {
      this.fileIsLoading = true;
      this.csv = file;
      this.fileName = file.name;
      let data = {
        vendorId:this.vendorData.id,
        file: await getBase64(file)
      };
      this.submit(data);
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
    submit(data) {
      const _this = this;

      if (this.url) {
        axios
          .post(this.url, data)
          .then(response => {
            this.fileIsLoading = false;
            if (response.data) {
              this.errors = response.data.success ? 0 : 1;
              const {data} = response.data;

              this.sample[0] = this.csv2[0] = _.map(data[0], (label, key) => {
                return key;
              });

              for (let index = data.length - 1; index >= 0; index--) {
                this.csv2.push(_.map(data[index], (label, key) => {
                  return label;
                }));
              }
            }
            // _this.callback(response);
            if(response.data.status){
              this.close();
              this.emit("fileUploaded");
            }
          })
          .catch(error => {
              console.log("error", error);
          });
      } else {
        _this.callback(this.form.csv);
      }
    },
    buildMappedCsv() {
      const _this = this;
      let mycsv = this.hasHeaders ? _.drop(this.csv2) : this.csv2;
      return _.map(mycsv, row => {
        let newRow = {};

        _.forEach(_this.map, (column, field) => {
          _.set(newRow, field, _.get(row, column));
        });

        return newRow;
      });
    },
    load() {
      if (this.errors) return;
      const _this = this;
      if (!_this.csv) {
          this.errorMessage = "Choose File";
          this.showError = true;
            return;
      }
      this.readFile(output => {
        // _this.sample = _.get(Papa.parse(output, { preview: 2, skipEmptyLines: true }), "data");
        // _this.csv = _.get(Papa.parse(output, { skipEmptyLines: true }), "data");
      });
      this.showError = false;
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
    showPreview(){
      if(this.requiredFieldsNumber !== 2)return;
      this.form.csv = this.buildMappedCsv();
      this.header = false;
      this.preview = true;
    },
    backToUpload() {
      this.upload = true;
      this.header = false;
      this.done = false;
      this.headers = true;
      this.preview = false;
    },
    backToPreview() {
      this.upload = false;
      this.header = true;
      this.preview = false;
    }
  },
};
</script>

<style scoped>
.hasFile{
  width: 100%;
  border-radius: 3px;
  margin-bottom: 80px;
  background-color: #f3f7fd;
}
.hasFile.opened{
  min-height: 100px;
  margin-bottom: 0;
}
.hasFile .added-file-wrapper{
  position: relative;
  border-radius: 3px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
  width: 95%;
  margin-left: 15px;
}
.hasFile .added-file-wrapper.opened{
  min-height: 130px;
  margin-bottom: 0;
}
.hasFile .added-file-wrapper .file{
  height: 50px;
  display: flex;
  margin-top: 15px;
  padding: 0 17px;
  justify-content: space-between;
  align-items: center;
}
.hasFile .added-file-wrapper .attach-trash{
  position: absolute;
  right: -30px;
  top: 10px;
}
.progressbar{
  width: 232px;
  margin: 1px 18px 1px;
  display: inline-block;
  height: 8px;
  border: #2cde6b 2px solid;
  border-radius: 120px;
}
.progress-inner-bar{
  width: 100%;
  height: 100%;
  border-radius: 120px;
  background-color: #2cde6b;
}
.progress-inner-bar.fileIsLoading{
  width: 90%;

}
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
#x_mark{
    margin-top: 6px;
    font-size: 31px !important;
    font-weight: 100;
    color: #050505 !important;
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
.error_text{
 color: red;
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

.md-select::before {
    color: blue !important;
}
</style>
