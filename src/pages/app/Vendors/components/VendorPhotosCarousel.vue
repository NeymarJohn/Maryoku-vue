<template>
  <div class="proposal-inpirational-photos">
    <span class="prev" @click="prev()" v-if="startIndex > 0">
      <md-icon>keyboard_arrow_left</md-icon>
    </span>
    <div class="cont" :style="{ left: `${imageSlidePos}px` }" ref="imagesCont">
      <vendor-photos-carousel-item
        class="photo-item"
        v-for="(photo, index) in images"
        :key="photo"
        :index="index"
        :defaultPhoto="photo"
        @change="setPhoto(index, ...arguments)"
        @addCaption="addCaption(index, ...arguments)"
        @remove="removePhoto"
      >
      </vendor-photos-carousel-item>
      <div class="add-image-item d-flex align-center justify-content-center text-center" @click="handleAddImage">
        <label class="photo-add-label color-red font-bold" @click="handleAddImage">
          <md-icon class="color-red">add</md-icon>
          <br />
          Add image
        </label>
        <input
          style="display: none"
          :id="`input-add-photo`"
          name="attachment"
          type="file"
          multiple="multiple"
          @change="onFileChange"
        />
      </div>
    </div>

    <span class="next" @click="next()" v-if="startIndex < images.length - 2">
      <md-icon>keyboard_arrow_right</md-icon>
    </span>
    <!-- <template slot="next">
        <md-button class="md-simple md-black handle-btn next-btn md-icon-button edit-btn">
          <md-icon class="font-bold">keyboard_arrow_right</md-icon>
        </md-button>
      </template>
    </carousel> -->
    <modal class="add-caption-modal" v-if="captionModal.isOpen">
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
            <img :src="captionModal.photoUrl" />
          </div>
          <div class="md-layout-item md-size-40" style="text-align: left; padding-right: 0px; padding-left: 20px">
            <div class="font-bold">Add caption</div>
            <textarea
              v-model="captionModal.caption"
              placeholder="Write a brief description of the photo."
              rows="6"
            ></textarea>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div>
          <md-button class="md-simple md-black maryoku-btn" @click="captionModal.isOpen = false">Cancel</md-button>
          <md-button class="md-red maryoku-btn" @click="saveCaption">Save</md-button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import { Modal } from "@/components";
import carousel from "vue-owl-carousel";
import VendorPhotosCarouselItem from "./VendorPhotosCarouselItem.vue";
import Swal from "sweetalert2";
export default {
  components: {
    carousel,
    VendorPhotosCarouselItem,
    Modal,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
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
      document.getElementById(`input-add-photo`).click();
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
      console.log(document.getElementsByClassName("photo-inpirational-item")[this.startIndex].offsetLeft);
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
    border: dashed 1px #f51355;
    min-width: 340px;
    cursor: pointer;
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
</style>