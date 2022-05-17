<template>
  <div class="wrapper-logo">
    <div class="wrapper-change-logo">
      <Preview
        v-if="imgURL"
        :src="imgURL"
        :review="review"
        @change="changeLogo"
      />
      <vue-dropzone
        v-else
        id="dropzone"
        ref="myVueDropzone"
        class="vue-dropzone"
        :options="dropzoneOptions"
        :use-custom-slot="true"
        @vdropzone-file-added="changeLogo"
      >
        <span class="color-red font-bold">
          <img :src="`${$iconURL}Campaign/Group 9241.svg`" class="mr-10">Upload company logo
        </span>
        <br>Or
        <br>
        <span class="color-dark-gray">Drag your file here</span>
      </vue-dropzone>
      <hide-switch v-if="!review" :value="showLogo" label="Logo" @input="$emit('change-show-logo', $event)" />
    </div>
    <div v-if="logoTitle" class="font-size-30 d-flex align-center">
      <custom-title-editor
        v-if="!review"
        :default-value="logoTitle"
        class="mt-20 mb-10"
        @change="$emit('change-logo-title', $event)"
      />
      <span v-else>{{ logoTitle }}</span>
    </div>
    <small v-if="error">{{ error }}</small>
  </div>
</template>


<script>
import vue2Dropzone      from "vue2-dropzone";

// components
import HideSwitch        from "@/components/HideSwitch";
import CustomTitleEditor from "../CustomTitleEditor";

// utils
import { getBase64 }     from "@/utils/file.util";

export default {
  name: "CampaignLogo",
  components: {
    HideSwitch,
    CustomTitleEditor,
    vueDropzone: vue2Dropzone,
    Preview: () => import("./Preview"),
  },
  props: {
    showLogo: {
      type     : Boolean,
      default  : false,
    },
    logoUrl: {
      type     : String,
      required : true,
    },
    logoTitle: {
      type     : String,
      default  : ""
    },
    review: {
      type     : Boolean,
      default  : false
    }
  },
  data() {
    return {
      dropzoneOptions: {
        url            : "https://httpbin.org/post",
        // thumbnailWidth : 150,
        maxFilesize    : 10,
        headers        : { "My-Awesome-Header": "header value" },
        acceptedFiles  : "image/*",
      },
      imgURL: this.logoUrl,
      error : "",
    };
  },
  watch: {
    logoUrl() {
      console.log({
        img: this.imgURL,
        logo: this.logoUrl,
      });
      if (!this.imgURL && this.logoUrl && this.logoUrl !== this.imgURL) this.imgURL = this.logoUrl;
    }
  },
  methods: {
    async changeLogo (file) {
      this.imgURL = "";
      if (file && file.size > 10 * 1024 * 1024) {
        this.error = "file size must not exceed 10mb";
      } else {
        this.imgURL = file ? (file.dataURL || await getBase64(file)) : file;
        this.$emit("change-logo", file);
      }
    },
    onFileChangeLogo({ target }) {
      const [file] = target.files;
      return this.changeLogo(file);
    },
    removeLogo() {
      return this.changeLogo();
    },
  }
};
</script>


<style lang="scss" scoped>
.wrapper-logo {
  max-width: 500px;
  flex: 1 1 300px;

  .wrapper-change-logo {
    display: flex;
    align-items: center;
    margin-top: 27px;

    .vue-dropzone {
      width: 259px;
      height: 134px;
      border: dashed 2px #f51355;
      padding: 0 !important;
    }
  }

  .logo-title {
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
  }
}
</style>
