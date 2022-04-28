<template>
  <div class="wrapper-logo">
    <div class="wrapper-change-logo">
      <div v-if="imgURL" class="change-logo">
        <div v-if="!review" class="over-logo-campaign">
          <input
            id="replace-logo"
            style="display: none"
            name="attachment"
            type="file"
            multiple="multiple"
            @change="onFileChangeLogo"
          >
          <div
            class="width-100 d-flex justify-content-center color-white font-bold font-size-16 button cursor-pointer"
            @click="replaceLogo"
          >
            <img :src="`${$iconURL}RSVP/Group 2344.svg`" class="mr-10">
            <span>Replace</span>
          </div>
          <div
            class="width-100 d-flex justify-content-center color-white font-bold font-size-16 button cursor-pointer"
            @click="removeLogo"
          >
            <img :src="`${$iconURL}RSVP/Group 4854.svg`" class="mr-10">
            <span>Delete</span>
          </div>
        </div>
        <img class="logo" :src="imgURL">
      </div>
      <vue-dropzone
        v-else
        id="dropzone"
        ref="myVueDropzone"
        class="vue-dropzone"
        :options="dropzoneOptions"
        :use-custom-slot="true"
        @vdropzone-file-added="selectLogoDropZone"
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
  </div>
</template>


<script>
import vue2Dropzone from "vue2-dropzone";
import HideSwitch from "@/components/HideSwitch";
import CustomTitleEditor from "./CustomTitleEditor";
import { getBase64 } from "@/utils/file.util";

export default {
  name: "CampaignLogo",
  components: {
    HideSwitch,
    CustomTitleEditor,
    vueDropzone: vue2Dropzone,
  },
  props: {
    showLogo: {
      type: Boolean,
      default: false,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    logoTitle: {
      type: String,
      default: ""
    },
    review: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" },
      },
      imgURL: this.logoUrl,
    };
  },
  methods: {
    async onFileChangeLogo(event) {
      const photoData = await getBase64(event.target.files[0]);
      this.imgURL = photoData;
      this.$emit("change-logo", event.target.files[0]);
    },
    async selectLogoDropZone(file) {
      const photoData = await getBase64(file);
      this.imgURL = photoData;

      this.$emit("change-logo", file);
    },
    removeLogo() {
      this.imgURL = null;
      this.$emit("change-logo", null);
    },
    replaceLogo() {
      document.getElementById("replace-logo").click();
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

    .change-logo {
      width: 259px;
      height: 134px;
      margin-right: 27px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-radius: 3px;

      .over-logo-campaign {
        display: none;
        width: 100%;
        height: 100%;
        flex-wrap: wrap;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(5, 5, 5, 0.55);
        z-index: 900;
      }

      & img.logo {
        width: 178px;
        height: 99px;
        object-fit: contain;
      }

      &:hover {
        .over-logo-campaign {
          display: flex;
        }
      }
    }

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
