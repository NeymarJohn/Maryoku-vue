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
              If you dont have a compatible document you can
              <strong>
                <a
                  href=""
                  style="color: #641856; text-decoration: none;
                   border-bottom: 1px solid  #641856; padding: 0px;"
                  >download template</a
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
                      <strong>Map the column headers in your file to fit maryoku properties </strong>
                    </p>
                  </div>
                  <div class="mb-10 mt-10">
                    <p>
                      • Map the column headers in your file to fit Lorem ipsum dolor sit amet, <br />
                      consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                    </p>
                  </div>
                  <div class="mb-10">
                    <p>
                      • Your file must contain the following categories - service type, business name, <br />
                      contact name, last name, phone number, email. <br />
                      Its ok if there are other categories in the file.
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
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
            :useCustomSlot="true"
            @vdropzone-file-added="fileAdded"
            v-if="!fileName"
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
            <md-button
              class="md-vendor maryoku-btn ml-auto font-size-14 px-20 "
              @click="
                upload = false;
                header = true;
              "
              >continue</md-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="position-relative" v-if="header">
      <div class="md-layout">
        <div class="md-layout-item pl-0 md-size-90">
          <div class="d-flex">
            <img :src="`${$iconURL}CustomerList/group-19001.svg`" class="mr-10" width="20" height="22" />

            <h3 class="font-size-25 font-bold m-0">Match your file headers to maryoku properties</h3>
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
                <md-table-head md-numeric>Mathced</md-table-head>
                <md-table-head>Maryoku Property</md-table-head>
                <md-table-head>Column Headers From File</md-table-head>
              </md-table-row>

              <md-table-row v-for="item in table" :key="item.property" class="text-left font-normal">
                <md-table-cell md-numeric class="pr-20"> <img :src="item.mathced"/></md-table-cell>
                <md-table-cell> {{ item.property }} </md-table-cell>
                <md-table-cell>
                  <multiselect
                    v-model="item.select.selected"
                    :options="item.select.options"
                    class="height-20 mt-5 form-input md-purple"
                    :close-on-select="true"
                    :clear-on-select="true"
                    :placeholder="item.select.placeHolder"
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
              <md-table-head>Address</md-table-head>
              <md-table-head>Contact Name</md-table-head>
            </md-table-row>

            <md-table-row class="text-left" v-for="item in previewTable" :key="item.name">
              <md-table-cell md-numeric>{{ item.ein }}</md-table-cell>
              <md-table-cell>{{ item.bname }}</md-table-cell>
              <md-table-cell> {{ item.number }}</md-table-cell>
              <md-table-cell>{{ item.email }}</md-table-cell>
              <md-table-cell>{{ item.address }}</md-table-cell>
              <md-table-cell>{{ item.name }} </md-table-cell>
              <md-table-cell>
                <span style="color: #b7b5b5;" v-if="item.icon === true"> <i class="fas fa-ellipsis-v fa-lg"></i></span
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
              <md-button
                class="md-vendor maryoku-btn ml-auto font-size-14 px-20"
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

    <div class="position-relative" v-if="done">
      <div class="md-layout">
        <div
          style="margin-top: -90px; background-color: #f3f7fd; height: 370px; width: 100vw; margin-left: -40px; margin-right: -40px "
          class="text-center"
        >
          <div class="md-layout-item pl-0 md-size-100 mt-30" style="">
            <div class="d-flex justify-content-end" style="">
              <md-button class=" md-simple " @click="$emit('cancel')">
                <md-icon class="">close</md-icon>
              </md-button>
            </div>
          </div>

          <div class="md-layout-item pl-0 md-size-100 mt-20 text-center ">
            <div>
              <img src="/static/img/Group 20954.svg" />
            </div>
            <div class="mt-20">
              <h2 class="t_text">Upload completed successfully</h2>
              <p class="s_text">You can now see all your customers in the customer list</p>
            </div>
          </div>
        </div>
        <div class="md-layout-item pl-0 md-size-100 mt-50">
          <md-button class=" md-simple md-outlined px-70 md-vendor " @click="$emit('cancel')">
            Done
          </md-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueCsvImport from "vue-csv-import";
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
    VueCsvImport,
    Multiselect,
    vueDropzone: vue2Dropzone,
  },
  data: () => ({
    selected: null,
    csv: null,
    done: false,
    previewTable: [
      {
        ein: "12-36789",
        bname: "Relish Caterers & Venues",
        number: "212-228-1672",
        email: "info@relishcat…",
        address: "830 Fifth Avenue New York, NY 10065",
        name: "Tom Dany",
      },
      {
        icon: true,
        ein: "12456789",
        bname: "Relish Caterers & Venues",
        number: "212-228-1672",
        email: "info@relishcat…",
        address: "830 Fifth Avenue New York, NY 10065",
        name: "John doe",
      },
      {
        icon: true,
        ein: "12-3456",
        bname: "Relish Caterers & Venues",
        number: "212-228-1672",
        email: "info@relishcat",
        address: "830 Fifth Avenue New York, NY 10065",
        name: "Thomos",
      },
      {
        icon: true,
        ein: "12-345",
        bname: "Relish Caterers & Venues",
        number: "212-228-1672",
        email: "info@relishcat",
        address: "830 Fifth Avenue New York, NY 10065",
        name: "Joseph",
      },
      {
        icon: true,
        ein: "12-3456789",
        bname: "Relish Caterers & Venues",
        number: "212-228-1672",
        email: "info@relishcat",
        address: "830 Fifth Avenue New York, NY 10065",
        name: "Dn",
      },
      {
        icon: true,
        ein: "12-3456789",
        bname: "Relish Caterers & Venues",
        number: "212-228-1672",
        email: "info@relishcat",
        address: "830 Fifth Avenue New York, NY 10065",
        name: "Shawn",
      },
    ],
    table: [
      {
        property: "Contact Full Name*",
        mathced: success,
        select: {
          selected: "Name",
          options: ["Name"],
        },
      },
      {
        property: "Email*",
        select: {
          selected: "Email",
          options: ["Email"],
          placeHolder: "Choose Header",
        },
      },
      {
        property: "Phone Number",
        select: {
          selected: null,
          options: ["number"],
          placeHolder: "Choose Headers",
        },
        mathced: success,
      },
      {
        property: "Business Name",
        select: {
          selected: null,
          options: ["list", "of", "options"],
          placeHolder: "Business Name",
        },
        mathced: success,
      },
      {
        property: "EIN",
        select: {
          selected: null,
          options: ["list", "of", "options"],
          placeHolder: "Choose Headers",
        },
      },
    ],

    upload: true,
    header: false,
    done: false,
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

  methods: {
    eventIcon(idx) {
      return this.icons[Math.ceil(Math.random() * 10 * idx) % this.icons.length];
    },
    close() {
      this.$emit("cancel");
    },

    async fileAdded(file) {
      const extension = file.type.split("/")[1];
      let fileName = new Date().getTime();
      this.fileName = file.name;
      let fileUrl = `https://maryoku.s3.amazonaws.com/events/proposal/${fileName}.${extension}`;

      S3Service.fileUpload(file, `${fileName}`, `events/proposal`).then(res => {
        this.isLoading = false;
        this.fileUrl = fileUrl;
      });
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
