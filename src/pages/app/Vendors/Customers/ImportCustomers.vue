<template>
  <div>
    <div class="position-relative" v-if="upload">
      <md-button class="md-simple position-absolute" style="top: 0;right:0" @click="$emit('cancel')">
        <md-icon>close</md-icon>
      </md-button>
      <div class="text-left">
        <div class="d-flex">
          <img :src="`${$iconURL}CustomerList/group-19001.svg`" class="mr-10" width="20" height="22" />

          <h3 class="font-size-30 font-bold m-0">Upload your File</h3>
        </div>
        <p class="font-size-16 mt-20">
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
      <div class="md-layout">
        <div class="md-layout-item pl-0 md-size-100 ">
          <p class="d-flex font-size-16 font-bold-extra">Attach File</p>
        </div>
        <div class="md-layout-item pl-0 md-size-100">
          <p class="d-flex">
            <span class="font-size-16">
              <img class="" :src="`${$iconURL}Campaign/Group 9087.svg`" />
              <md-tooltip class="custom_right">
                <div class=" tab-tooltip px-20 py-20" style="color: black; width: 610px;">
                  <div>
                    <p class="font-size-20">
                      <strong>Map the column headers in your file to fit maryoku properties </strong>
                    </p>
                  </div>
                  <div class="mb-10 mt-10">
                    <p>
                      • Map the column headers in your file to fit Lorem ipsum dolor sit amet, consetetur sadipscing
                      elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                    </p>
                  </div>
                  <div class="mb-10">
                    <p>
                      • Your file must contain the following categories - service type, business name, contact name,
                      last name, phone number, email. Its ok if there are other categories in the file.
                    </p>
                  </div>
                </div>
              </md-tooltip>
              Make sure your file is ready to be imported
            </span>
          </p>
        </div>
        <div class="form-group  mt-30  md-layout-item pl-0 md-size-100">
          <vue-dropzone
            v-if="!fileName"
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
            :useCustomSlot="true"
            @vdropzone-file-added="logoSelected"
            class="file-drop-zone upload-section text-center"
          >
            <md-button class="md-outlined md-simple md-vendor md-dense">
              <img class="mr-5" :src="`${$iconURL}common/pin-dark.svg`" width="15" />
              Choose File
            </md-button>

            <div class="font-size-14">Or</div>
            <div class="font-size-16">Drag your file here</div>
          </vue-dropzone>
          <div class="form-group attach-file text-left mt-30" v-else>
            <img class="mr-5" :src="`${$iconURL}common/pin-dark.svg`" width="15" />
            <a :href="`${fileUrl}`" class="color-black" target="_blank">{{ fileName }}</a>
            <span class="attach-trash" @click="fileName = null"><md-icon>close</md-icon></span>
          </div>
        </div>
        <div v-if="showError" class="md-error">{{ this.errorMessage }}</div>
      </div>
      <div class="md-layout-item pl-0 md-size-100 mt-30">
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
              class="md-vendor maryoku-btn ml-auto"
              @click="
                upload = false;
                header = true;
              "
              >Continue</md-button
            >
          </div>
        </div>
      </div>
    </div>
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
              <md-button class="md-vendor maryoku-btn ml-auto" @click="$emit('cancel')">Continue</md-button>
            </div>
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
  props: {
    events: {
      type: Array,
      default: [],
    },
  },
  components: {
    VueCsvImport,
    Multiselect,
  },
  data: () => ({
    selected: null,
    csv: null,
    options: ["list", "of", "options"],
    upload: true,
    header: false,
    done: false,
    preview: false,
    logo: null,
    logoImageData: "",
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

    async logoSelected(file) {
      this.logo = file;
      this.logoImageData = await getBase64(file);
      this.campaignData.logoUrl = this.logoImageData;
      const extension = file.type.split("/")[1];
      const logoName = `${this.event.id}`;
      S3Service.fileUpload(file, logoName, "logos").then(res => {
        this.$store.dispatch("campaign/setLogo", { logoUrl: res });
      });
      this.$emit("changeInfo", { field: "logo", value: this.logoImageData });
    },
    async onFileChange(event) {
      this.coverImage = await getBase64(event.target.files[0]);
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

#done_modal {
  background: #f3f7fd;
  height: 370px;
}



 .upload-section {
  border-color: #641856 !important;
}
</style>
