<template>
  <div class="photo-inpirational-item">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />
    <div v-if="!photo" class="empty-item">
      <label class="photo-add-label color-red font-bold" @click="handleAddPhoto(index)">
        <md-icon class="color-red">add</md-icon>
        <br />
        Add photo
      </label>
    </div>
    <template v-else>
      <div class="active-item">
        <img class="photo-image" :src="photo.url" @click="handleAddPhoto(index)" />
        <md-button class="remove-btn md-icon-button md-raised" @click="removePhoto">
          <img :src="`${$iconURL}common/trash-dark.svg`" style="width: 20px" />
        </md-button>
      </div>
      <div class="photo-caption" v-if="photo.caption">
        {{ photo.caption }}&nbsp;<md-button class="edit-btn md-black md-simple" @click="addCaption"
          ><u>Edit</u></md-button
        >
      </div>
      <div class="photo-caption" v-else>
        <md-button class="md-simple edit-btn md-black" @click="addCaption"><u>Add caption</u></md-button>
      </div>
    </template>
    <input
      style="display: none"
      :id="`proposal-inspiration-file-${index}`"
      name="attachment"
      type="file"
      multiple="multiple"
      @change="onFileChange"
    />
  </div>
</template>
<script>
import carousel from "vue-owl-carousel";
import S3Service from "@/services/s3.service";
import { getBase64 } from "@/utils/file.util";
export default {
  components: {
    carousel,
  },
  props: {
    defaultPhoto: {
      type: Object,
      default: () => null,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      photo: null,
      isLoading: false,
    };
  },
  created() {
    console.log("create", this.index);
    this.photo = this.defaultPhoto;
    this.$root.$on("saveCaption", (captionData) => {
      console.log(captionData);
      if (this.index == captionData.currentIndex) {
        if (!this.photo) this.photo = {};
        this.$set(this.photo, "caption", captionData.caption);
      }
    });
  },
  computed: {
    proposalRequest() {
      return this.$store.state.vendorProposal.proposalRequest;
    },
    inspirationalPhotos: {
      get() {
        return this.$store.state.vendorProposal.inspirationalPhotos;
      },
      set(value) {
        this.$store.commit("vendorProposal/setValue", { key: "inspirationalPhotos", value });
      },
    },
  },
  methods: {
    async onFileChange(event) {
      this.isLoading = true;
      const extension = event.target.files[0].type.split("/")[1];
      if (!this.photo) this.photo = {};
      this.photo.url = await getBase64(event.target.files[0]);
      S3Service.fileUpload(
        event.target.files[0],
        `photo-${this.currentPhotoIndex}`,
        `proposal/inspirationalPhotos/${this.proposalRequest.id}`,
      )
        .then((res) => {
          this.isLoading = false;
          this.$emit("change", {
            url: `https://maryoku.s3.amazonaws.com/proposal/inspirationalPhotos/${this.proposalRequest.id}/photo-${this.currentPhotoIndex}.${extension}`,
            caption: "",
          });
        })
        .catch((event) => {
          this.isLoading = false;
        });

      // this.$forceUpdate();
    },
    handleAddPhoto() {
      document.getElementById(`proposal-inspiration-file-${this.index}`).click();
    },
    addCaption() {
      this.$emit("addCaption", this.photo);
    },
    removePhoto() {
      this.photo = null;
      this.$emit("remove", this.index);
    },
  },
};
</script>
<style lang="scss" scoped>
.photo-inpirational-item {
  width: 100%;
  height: 250px;
  display: inline-block;
  overflow: hidden;
  .empty-item {
    border: dashed #f51355 1px;
    width: 100%;
    height: 220px;
    position: relative;
  }
  .active-item {
    width: 100%;
    height: 220px;
    .remove-btn {
      background-color: white !important;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      position: absolute;
      right: 15px;
      top: 15px;
    }
    .photo-image {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 3px;
      cursor: pointer;
    }
  }
  .photo-caption {
    margin-top: 10px;
  }

  .photo-add-label {
    cursor: pointer;
    text-align: center;
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>