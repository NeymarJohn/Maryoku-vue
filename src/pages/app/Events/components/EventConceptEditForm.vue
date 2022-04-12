<template>
  <div class="create-concept-from">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />
    <div class="form-name font-bold-extra font-size-30 mb-50">
      Create Your Own Concept
    </div>
    <div class="form-content">
      <div class="form-group">
        <label>What should we call it?</label>
        <input
          v-model="editConcept.name"
          v-validate="'required'"
          type="text"
          class="form-control"
          placeholder="Type your concept here…"
        >
      </div>
      <div class="form-group add-tags-field">
        <label style="margin-bottom: 1em; display: inline-block">
          Tags
          <small>*suggested</small>
        </label>
      </div>

      <div class="tags-list">
        <div class="tags-list-wrapper d-flex justify-content-start" :class="{ expanded: tagExpanded }">
          <template v-for="(tag, index) in taggingOptions">
            <div
              v-if="tag.selected"
              :key="index"
              class="tags-list__item"
              :class="{ selected: tag.selected }"
              @click="removeTag(tag, index)"
            >
              {{ tag.name }}
              <img :src="`${$iconURL}Concept/Asset 489.svg`">
            </div>
            <div
              v-else
              :key="index"
              class="tags-list__item"
              :class="{ selected: tag.selected }"
              @click="addTag(tag, index)"
            >
              {{ tag.name }}
              <img :src="`${$iconURL}Concept/plus-red.svg`" @click="addTag(tag, index)">
            </div>
          </template>

          <div style="flex-grow: 1" />
        </div>
        <md-button
          class="md-button md-red md-sm md-simple edit-btn md-theme-default"
          style="margin-top: 20px !important"
          @click="tagExpanded = !tagExpanded"
        >
          <span v-if="!tagExpanded">
            Show More
            <md-icon class="font-size-30">keyboard_arrow_right</md-icon>
          </span>
          <span v-if="tagExpanded">
            Show Less
            <md-icon class="font-size-30">keyboard_arrow_up</md-icon>
          </span>
        </md-button>
      </div>
      <div class="form-group" style="margin-top: 50px">
        <label>Tell us more</label>
        <p>The more we know, the better services we can find for you</p>
        <textarea
          v-model="editConcept.description"
          rows
          class="form-control"
          placeholder="Write description here"
        />
      </div>

      <div class="form-group">
        <label>Add Colors</label>
        <div class="colors-list d-flex justify-content-start">
          <div v-for="(colorItem, index) in editConcept.colors" :key="index" style="margin-right: 30px">
            <color-button v-model="editConcept.colors[index]" />
            <!-- <md-button class="colors-list__item md-just-icon" :style="`background: ${color.value} !important`" @click="addColor(index)" v-if="color.value"></md-button> -->
            <!-- <md-button class="colors-list__item colors-list__add md-just-icon" @click="addColor(index)" v-else><img :src="`${conceptIconsURL}Asset 488.svg`"></md-button> -->
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>
          Create your mood board
          <small>(5 photos top, under 20 KB)</small>
        </label>
        <p>Drag the photos to the empty frames or click on each one of them to create your photos board</p>
      </div>

      <div class="form-group">
        <label>You can easily Design with canva</label>
        <span>
          <img class="ml-10" :src="`${$iconURL}Campaign/Group 9087.svg`">
          <md-tooltip class="w-max-350">
            <div class="font-size-14 tab-tooltip">
              <p>{{ canvaTooltip }}</p>
            </div>
          </md-tooltip>
        </span>
      </div>

      <div class="images-list new-concept">
        <div class="image-backgrounds">
          <div
            v-for="(item, idx) in editConcept.colors"
            :key="idx"
            class="image-background"
            :style="`background-color: ${item.color}; opacity:${item.opacity}`"
          />
        </div>
        <div>
          <div v-for="indx in 5" :key="indx" :class="`images-list__item`">
            <vue-element-loading :active="uploadingStatus[indx - 1]" spinner="ring" color="#FF547C" />
            <div class="image-section d-flex justify-content-center align-center text-center" :for="`file-${indx}`">
              <img
                v-if="`${uploadImageData[indx - 1]}`|| defaultConcept.images[indx - 1] "
                class="concept-image"
                :src="`${uploadImageData[indx - 1]}` || defaultConcept.images[indx - 1].url"
                @click="uploadPhoto(indx)"
              >
              <div class="image-section-actions" :class="uploadImageData[indx - 1]?'hover-action':''">
                <md-button
                  class="canva-design-button md-simple md-red normal-btn"
                  style="
                  position: absolute;
                  left: 0;
                  right: 0;
                  width: 150px;
                  margin: 0 auto;
                  top: 15%;
                  z-index: 10;
                "
                  @click="handleClickCanva(indx-1)"
                >
                  Design on Canva
                </md-button>
                <div class="image-selector" @click="uploadPhoto(indx)">
                  <div :class="indx === 2 || indx === 5 ? 'mt-2' : 'mt-1'">
                    <div class="font-size-14">
                      Or
                    </div>
                    <div class="color-black-middle font-size-14">
                      Upload Photo
                    </div>
                  </div>
                </div>
                <input
                  :id="`file-${indx}`"
                  style="display: none"
                  name="attachment"
                  type="file"
                  multiple="multiple"
                  :data-fileIndex="indx - 1"
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="concept-actions d-flex justify-content-end align-center">
        <md-button class="md-red md-bold" :disabled="!canSave" @click="saveConcept">
          Save my brilliant concept
        </md-button>
      </div>
    </div>
  </div>
</template>
<script>
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import EventConcept from "@/models/EventConcept";
import ColorButton from "@/components/ColorButton";
import Swal from "sweetalert2";
import S3Service from "@/services/s3.service";
import { getBase64 } from "@/utils/file.util";

const tags = [
  { name: "adventurous", selected: false },
  { name: "artistic", selected: false },
  { name: "festive", selected: false },
  { name: "formal", selected: false },
  { name: "competitive", selected: false },
  { name: "conservative", selected: false },
  { name: "challenging", selected: false },
  { name: "classy", selected: false },
  { name: "casual", selected: false },
  { name: "educational", selected: false },
  { name: "fun", selected: false },
  { name: "social/green", selected: false },
  { name: "styled", selected: false },
  { name: "trendy", selected: false },
  { name: "authentic", selected: false },
  { name: "elegant", selected: false },
  { name: "innovative", selected: false },
  { name: "indoors", selected: false },
  { name: "mysterious", selected: false },
  { name: "global", selected: false },
  { name: "laid back", selected: false },
  { name: "luxurious", selected: false },
  { name: "productive", selected: false },
  { name: "relaxed", selected: false },
  { name: "cultural", selected: false },
  { name: "inclusive", selected: false },
  { name: "outdoors", selected: false },
  { name: "gleeful", selected: false },
  { name: "cheerful", selected: false },
  { name: "different", selected: false },
  { name: "seasonal", selected: false },
];

const initialConcept = {
  name: "",
  description: "",
  tags: [],
  colors: [
    { color: "#d2d2d2", opacity: 1 },
    { color: "#d2d2d2", opacity: 1 },
    { color: "#d2d2d2", opacity: 1 },
    { color: "#d2d2d2", opacity: 1 },
  ],
  images: [],
};

export default {
  name: "EventConceptEditForm",
  components: {
    ColorButton,
  },
  props: {
    defaultConcept: {
      type: Object,
      default: () => {}
    },
  },
  data: () => ({
    isLoading: false,
    tagExpanded: false,
    editConcept: initialConcept,
    newTag: "",
    selectedTag: {},
    addedTags: [],
    taggingOptions: tags.sort((a, b) => (a.name > b.name ? 1 : -1)),
    uploadImages: {},
    uploadImageNames: {},
    uploadImageData: {
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
    },
    uploadingStatus: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
    canvaTooltip: "Access high quality images to convey your inspiration using our integration to Canva",
    canvaApi: null
  }),
  computed: {
    canSave() {
      return this.editConcept.name && this.editConcept.description;
    },
  },
  created() {
    const defaultConcept = this.defaultConcept;
    if (defaultConcept.name && defaultConcept.name.length) {
      this.editConcept.name = defaultConcept.name;
    }
    if (defaultConcept.description && defaultConcept.description.length) {
      this.editConcept.description = defaultConcept.description;
    }
    if (defaultConcept.tags && defaultConcept.tags.length) {
      this.editConcept.tags = defaultConcept.tags;
    }
    if (defaultConcept.colors && defaultConcept.colors.length) {
      this.editConcept.colors = defaultConcept.colors;
    }
    if (defaultConcept.images && defaultConcept.images.length) {
      this.editConcept.images.forEach((image, i) => {
        this.uploadImageData[i] = image.url ? image.url : "";
      });
    }

    (async () => {
      if (!window.Canva || !window.Canva.DesignButton) {
        return;
      }

      this.canvaApi = await window.Canva.DesignButton.initialize({
        apiKey: "no5x5PRx6hMNshFZIrRpevKJ",
      });
    })();
  },
  mounted() {
    this.taggingOptions.forEach((item, index) => {
      if (this.editConcept.tags.findIndex((tag) => tag.name === item.name) >= 0) {
        this.taggingOptions[index].selected = true;
      }
    });
  },
  methods: {
    addTag(newTag, tagIndex) {
      this.editConcept.tags.push(newTag);
      this.taggingOptions[tagIndex].selected = true;
    },
    removeTag(tag, index) {
      const selectedIndex = this.editConcept.tags.findIndex((item) => item.name === tag.name);
      this.taggingOptions[index].selected = false;
      this.editConcept.tags.splice(selectedIndex, 1);
    },
    uploadPhoto(idx) {
      let file_el = document.getElementById("file-" + idx);
      file_el.onchange = async (_) => {
        let files = event.target.files || event.dataTransfer.files;
        if (!files.length) return;
        if (files[0].size > 1024 * 1024 * 5) {
          Swal.fire({
            title: "File is too big",
            text: "Sorry, this miximum file size is 5M",
            showCancelButton: false,
            icon: "warning",
            showCancelButton: true,
            confirmButtonClass: "md-button md-success confirm-btn-bg ",
            cancelButtonClass: "md-button md-danger cancel-btn-bg",
            confirmButtonText: "Yes, delete it!",
            buttonsStyling: false,
          }).then((result) => {});
          return;
        }
        let reader = new FileReader();
        if (event.target.name) {
          const itemIndex = event.target.getAttribute("data-fileIndex");
          let isLargeFile = false;
          this.uploadImages[itemIndex] = files[0];

          // getting File information
          const extension = files[0].type.split("/")[1];
          const fileName = new Date().getTime() + "";
          const dirName = "concepts";


          const imageData = await getBase64(files[0]); ///URL.createObjectURL(files[0]);
          this.$set(this.uploadImageData, itemIndex, imageData);
          this.$set(this.uploadingStatus, itemIndex, true);

          const fileInfo = {
              originName: files[0].name,
              name: `${fileName}`,
            };
          S3Service.fileUpload(files[0], fileInfo.name, dirName).then((res) => {
            fileInfo.url = res;
            this.uploadingStatus[itemIndex] = false;

          this.editConcept.images[itemIndex] = fileInfo;
            this.$set(this.uploadingStatus, itemIndex, false);
          });
        }
      };
      file_el.click();
    },
    async onFileChange(event) {
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      if (files[0].size > 1024 * 1024 * 5) {
        Swal.fire({
          title: "File is too big",
          text: "Sorry, this miximum file size is 5M",
          showCancelButton: false,
          icon: "warning",
          showCancelButton: true,
          confirmButtonClass: "md-button md-success confirm-btn-bg ",
          cancelButtonClass: "md-button md-danger cancel-btn-bg",
          confirmButtonText: "Yes, delete it!",
          buttonsStyling: false,
        }).then((result) => {});
        return;
      }
      let reader = new FileReader();
      if (event.target.name) {
        const itemIndex = event.target.getAttribute("data-fileIndex");
        let isLargeFile = false;
        this.uploadImages[itemIndex] = files[0];

        // getting File information
        const extension = files[0].type.split("/")[1];
        const fileName = new Date().getTime() + "";
        const dirName = "concepts";
        const fileInfo = {
            originName: files[0].name,
            name: `${fileName}`,
          };

        this.uploadImageData[itemIndex] = await getBase64(files[0]); ///URL.createObjectURL(files[0]);
        this.uploadingStatus[itemIndex] = true;
        S3Service.fileUpload(files[0], fileInfo.name, dirName).then((res) => {
          fileInfo.url = res;
          this.uploadingStatus[itemIndex] = false;
          this.editConcept.images[itemIndex] = fileInfo;
        });
      }
    },
    async saveConcept() {
      let calendar = new Calendar({
        id: this.$store.state.auth.user.profile.defaultCalendarId,
      });
      this.isLoading = true;

      this.editConcept.event = new CalendarEvent({ id: this.$store.state.event.eventData.id });
      const eventConcept = await new EventConcept(this.editConcept).save();
      eventConcept.imageData = this.uploadImageData;

      this.isLoading = false;
      this.$emit("saved", eventConcept);
    },
    handleClickCanva(imageIndex) {
      this.canvaApi.createDesign({
        design: {
          type: "Poster",
        },
        onDesignPublish: (opts) => {
          this.editConcept.images[imageIndex] = {
            name: opts.designId,
            originName: opts.designTitle,
            url: opts.exportUrl
          };
          this.uploadImageData[imageIndex] = opts.exportUrl;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.create-concept-from {
  padding: 2em;
  width: 100%;
  .form-title {
    font-size: 28px;
    font-family: "Manrope-ExtraBold", sans-serif;
    font-weight: 800;
    color: #050505;
    margin-bottom: 2em;
  }
  .form-group {
    width: 70%;
    margin-bottom: 1em;
    font-size: 16px;

    label {
      font-size: 16px;
      font-weight: 800;
      color: #050505;
      font-family: "Manrope-ExtraBold", sans-serif;

      small {
        font-size: 14px;
        font-family: "Manrope-Regular", sans-serif;
      }
    }
    p {
      margin: 0;
      font-size: 14px;
      color: #050505;
    }
    .form-control {
      border-radius: 3px;
      border: solid 1px #707070;
      height: 65px;
      display: block;
      width: 100%;
      background: none;
      padding: 1em 2em;
      margin-top: 1em;
      font-size: 16px;
      &:focus {
        border: solid 1px #050505;
      }
    }

    textarea.form-control {
      height: 145px;
    }
  }
  .add-tags-field {
    margin-top: 60px;
  }
  .tags-list {
    margin: 0 0 3em;
    width: 100%;
    &-wrapper {
      flex-flow: wrap;
      justify-content: flex-start;
      height: 130px;
      overflow: hidden;
      width: 100%;
      transition: height 0.5s;
      &.expanded {
        height: 330px;
        max-height: max-content;
        transition: height 0.5s;
      }
    }
    &__item {
      border-radius: 100px;
      flex: 1 1 10%;
      border: solid 1px #a0a0a0;
      font-size: 14px;
      padding: 0.3em 0.9em;
      margin: 1em 1em 1em 0;
      text-transform: capitalize;
      height: fit-content;
      line-height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      white-space: nowrap;
      max-width: 130px;
      img {
        width: 15px;
        margin-left: 0.5em;
        cursor: pointer;
      }
      &.selected {
        border: solid 1px #050505;
        font-weight: 800;
      }
    }
  }

  .colors-list {
    margin: 1em 0 2em;
    &__item {
      width: 52px;
      height: 52px;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      border-radius: 50%;
      margin-right: 36px !important;
      width: 52px;
      height: 52px;
      margin: 0 36px 0 0;
    }
    &__add {
      border-radius: 50%;
      width: 52px;
      height: 52px;
      margin: 0 36px 0 0;

      .md-ripple {
        margin-right: 1em;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        background-color: #ffffff;
        border: dashed 1.5px #f51355;
        background-color: #ffffff;
        border-radius: 50%;
        img {
          width: 15px;
        }
      }
    }
  }

  .new-concept {
    position: relative;
    height: 382px;

    .image-background {
      background: #ededed;
      position: absolute;
      &:first-child {
        top: 142px;
        left: 0;
        width: calc(249px - 50px);
        height: calc(232px - 50px);
      }
      &:nth-child(2) {
        top: 40px;
        left: 123px;
        width: calc(296px - 50px);
        height: calc(232px - 50px);
      }
      &:nth-child(3) {
        top: 38px;
        left: 445px;
        width: calc(272px - 50px);
        height: calc(325px - 50px);
      }
      &:nth-child(4) {
        top: 74px;
        left: 752px;
        width: calc(182px - 50px);
        height: calc(278px - 50px);
      }
    }
    .images-list__item {
      border: 2px dashed $rose;
      background: #fff;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      position: absolute !important;

      .image-section {
        width: 100%;
        height: 100%;
        position: relative;
        img.concept-image {
          width: 100%;
          max-width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          object-fit: cover;
          position: absolute;
        }
        .image-selector {
          cursor: pointer;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .md-button {
          .md-button-content {
            flex-direction: column;

            img {
              width: 16px;
            }
            label {
              font-size: 12px;
              color: #050505;
              text-transform: capitalize;

              img {
                margin-right: 0.5em;
              }
            }
          }
        }
        .image-section-actions {
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.7);
          z-index: 2;
        }
        .hover-action {
          display: none;
        }
        &:hover{
          .hover-action {
            display: block;
          }
        }
      }
      &:first-child {
        top: 70px;
        left: 30px;
        z-index: 15;
        width: calc(234px - 48px);
        height: calc(234px - 50px);
      }
      &:nth-child(2) {
        top: 172px;
        left: 168px;
        z-index: 14;
        width: calc(320.8px - 50px);
        height: calc(198px - 50px);
      }
      &:nth-child(3) {
        top: 69px;
        left: 342px;
        z-index: 13;
        width: calc(311px - 50px);
        height: calc(236px - 50px);
      }
      &:nth-child(4) {
        top: 94px;
        left: 583px;
        z-index: 12;
        width: calc(242px - 50px);
        height: calc(280px - 50px);
      }
      &:nth-child(5) {
        top: 45px;
        left: 720px;
        z-index: 11;
        width: calc(287.6px - 50px);
        height: calc(202px - 50px);
      }
    }
  }
}
</style>
