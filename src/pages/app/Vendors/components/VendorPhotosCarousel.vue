<template>
  <div v-if="images.length > 0" class="proposal-inpirational-photos">
    <span v-show="startIndex > 0" class="prev" @click="prev()">
      <md-icon>keyboard_arrow_left</md-icon>
    </span>
    <div ref="imagesCont" class="cont" :style="{ left: `${imageSlidePos}px` }">
      <vendor-photos-carousel-item
        v-for="(photo, index) in images"
        :key="photo"
        class="photo-item"
        :index="index"
        :default-photo="photo"
        @change="setPhoto(index, ...arguments)"
        @addCaption="addCaption(index, ...arguments)"
        @remove="removePhoto"
      />
      <div
        class="add-image-item photo-inpirational-item d-flex align-center justify-content-center text-center"
        :class="theme"
        @click="handleAddImage"
      >
        <label
          class="photo-add-label font-bold cursor-pointer"
          :class="{ 'color-red': theme === 'red', 'color-purple': theme === 'purple' }"
        >
          <md-icon :class="{ 'color-red': theme === 'red', 'color-purple': theme === 'purple' }">add</md-icon>
          <br>
          Add image
        </label>
        <input
          :id="`input-add-photo`"
          style="display: none"
          name="attachment"
          type="file"
          multiple="multiple"
          @change="onFileChange"
        >
      </div>
    </div>

    <span v-show="startIndex < images.length - 2" class="next" @click="next()">
      <md-icon>keyboard_arrow_right</md-icon>
    </span>

    <modal v-if="captionModal.isOpen" class="add-caption-modal">
      <template slot="header">
        <div class="maryoku-modal-header">
          <h2>Add caption</h2>
        </div>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="captionModal.isOpen = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <div class="md-layout-item md-size-60">
            <img :src="captionModal.photoUrl">
          </div>
          <div class="md-layout-item md-size-40" style="text-align: left; padding-right: 0px; padding-left: 20px">
            <div class="font-bold">
              Add caption
            </div>
            <textarea
              v-model="captionModal.caption"
              placeholder="Write a brief description of the photo."
              rows="6"
            />
          </div>
        </div>
      </template>
      <template slot="footer">
        <div>
          <md-button class="md-simple md-black maryoku-btn" @click="captionModal.isOpen = false">
            Cancel
          </md-button>
          <md-button class="md-red maryoku-btn" @click="saveCaption">
            Save
          </md-button>
        </div>
      </template>
    </modal>
  </div>
  <vue-dropzone
    v-else
    id="dropzone"
    ref="myVueDropzone"
    :options="dropzoneOptions"
    :use-custom-slot="true"
    class="file-drop-zone"
    @vdropzone-file-added="fileAdded"
  >
    <span class="color-purple font-bold choose file-upload-btn">
      <img :src="`${$iconURL}common/pin-dark.svg`" class="mr-10">Choose File
    </span>
    <br>Or
    <br>
    <span class="color-dark-gray">Drag your file here</span>
  </vue-dropzone>
</template>
<script>
import { Modal } from "@/components";
import VendorPhotosCarouselItem from "./VendorPhotosCarouselItem.vue";
import Swal from "sweetalert2";
import vue2Dropzone from "vue2-dropzone";

export default {
  components: {
    vueDropzone: vue2Dropzone,
    VendorPhotosCarouselItem,
    Modal,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    theme: {
      type: String,
      default: "purple",
    },
  },
  data() {
    return {
      photos: new Array(15),
      currentPhotoIndex: -1,
      captionModal: {
        isOpen: false,
        photoUrl: "",
        caption: "",
        currentIndex: -1,
      },
      imageSlidePos: 0,
      startIndex: 0,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 5,
        headers: { "My-Awesome-Header": "header value" },
      },
    };
  },
  methods: {
    setPhoto(index, photoData) {
      this.$emit("setPhoto", { index, photo: photoData });
    },
    addNewPhoto(photoData) {
      this.$emit("addImage", photoData);
    },
    addCaption(index, photoData) {
      this.captionModal.isOpen = true;
      this.captionModal.photoUrl = photoData.url;
      this.captionModal.caption = photoData.caption;
      this.captionModal.currentIndex = index;
    },
    removePhoto(index) {
      // this.$store.commit("vendorProposal/setInspirationalPhoto", { index, photo: null });
      this.$emit("removeImage", index);
    },
    saveCaption() {
      this.$root.$emit("saveCaption", this.captionModal);
      this.$store.commit("vendorProposal/setInspirationalPhoto", {
        index: this.captionModal.currentIndex,
        photo: {
          url: this.captionModal.photoUrl,
          caption: this.captionModal.caption,
        },
      });
      this.captionModal.isOpen = false;
    },
    handleAddImage() {
      document.getElementById("input-add-photo").click();
    },
    async onFileChange(event) {
      if (!event.target.files[0]) return;
      if (event.target.files[0].size > 1024 * 1024 * 5) {
        Swal.fire({
          title: `The size of file that you selected is ${Math.floor(
            event.target.files[0].size / 1024 / 1024,
          )}MB. This file should be under 5MB`,
          showCancelButton: false,
          confirmButtonClass: "md-button md-success",
          cancelButtonClass: "md-button md-danger",
          confirmButtonText: "I got it",
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
          }
        });
        return;
      }
      this.addNewPhoto(event.target.files[0]);
    },
    prev() {
      if (this.startIndex - 1 === 0) {
        this.imageSlidePos = 0;
      } else
        this.imageSlidePos = -document.getElementsByClassName("photo-inpirational-item")[this.startIndex - 1]
          .offsetLeft;

      this.startIndex -= 1;
    },
    next() {
      this.imageSlidePos = -document.getElementsByClassName("photo-inpirational-item")[this.startIndex + 1].offsetLeft;
      this.startIndex += 1;
    },
    async fileAdded(file) {
      this.addNewPhoto(file);
    },
  },
};
</script>
<style lang="scss" scoped>
.proposal-inpirational-photos {
  width: 100%;
  overflow: hidden;
  position: relative;

  .cont {
    position: relative;
    transition: all 0.5s;
    white-space: nowrap;
    display: flex;
    transition: all 0.5s;
  }

  .handle-btn {
    background-color: white !important;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    position: absolute;
    top: 120px;
    transform: translateY(-50%);

    &.next-btn {
      right: 1px;
    }

    &.prev-btn {
      left: 1px;
    }
  }

  /deep/ .modal-container {
    max-width: 1200px !important;
  }

  .add-image-item {
    height: 220px;
    min-width: 340px;
    cursor: pointer;

    &.red {
      border: dashed 1px #f51355;
    }

    &.purple {
      border: dashed 1px #641856;
    }
  }

  .photo-inpirational-item:first-child {
    margin-left: 60px;
  }

  span {
    cursor: pointer;
    position: absolute;
    width: 28px;
    height: 28px;
    background-color: #ffffff;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    border-radius: 50%;
    text-align: center;
    font-weight: 800;
    z-index: 99;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;

    &.prev {
      left: 50px;
    }

    &.next {
      right: 50px;
    }
  }
}

.file-drop-zone.vue-dropzone {
  border: dashed 1px #641856;
  margin-left: 60px;
  margin-right: 60px;
  text-align: center;
  padding: 30px;

  & .file-upload-btn {
    border: solid 1px #641856;
    padding: 10px 20px;
    border-radius: 2px;
    display: block;
    max-width: 200px;
    margin: 0px auto;
  }
}
</style>
