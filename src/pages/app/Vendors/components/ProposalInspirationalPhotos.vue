<template>
  <!-- <div class="proposal-inpirational-photos">
    <div class="photos-carousel">
      <div class="photo-item" v-for="(photo, index) in photos" :key="`photo-${index}`">
        <div v-if="!photo" class="">
          <label class="photo-add-label color-red font-bold" for="fileInput">
            <md-icon class="color-red">add</md-icon>
            <br />
            Add photo
          </label>
        </div>
      </div>
    </div>
  </div> -->
  <div class="proposal-inpirational-photos">
    <carousel
      :items="4"
      :margin="25"
      :dots="false"
      :nav="false"
      class="photos-carousel"
      :number="2"
      :key="Math.random()"
    >
      <div class="photo-item" v-for="(photo, index) in photos" :key="`photo-${index}`">
        <div v-if="!photo" class="">
          <label class="photo-add-label color-red font-bold" @click="handleAddPhoto(index)">
            <md-icon class="color-red">add</md-icon>
            <br />
            Add photo
          </label>
        </div>
        <div v-else><img :src="photo.url" /></div>
      </div>
      <!-- <div v-if="editable" class="empty-carousel-item">
      <md-button class="md-simple md-outlined maryoku-btn" @click="addImage">
        <md-icon>add_circle</md-icon>Add image
      </md-button>
      <input
        style="display: none"
        id="carousel-file"
        name="attachment"
        type="file"
        multiple="multiple"
        @change="onFileChange"
      />
    </div> -->
    </carousel>
    <input
      style="display: none"
      id="proposal-inspiration-file"
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
export default {
  components: {
    carousel,
  },
  data() {
    return {
      photos: new Array(15),
      currentPhotoIndex: -1,
    };
  },
  computed: {
    proposalRequest() {
      return this.$store.state.vendorProposal.proposalRequest;
    },
  },
  methods: {
    onFileChange(event) {
      const extension = event.target.files[0].type.split("/")[1];
      this.photos[this.currentPhotoIndex] = {
        url: `https://maryoku.s3.amazonaws.com/proposal/inspirationalPhotos/${this.proposalRequest.id}/photo-${this.currentPhotoIndex}.${extension}`,
      };
      S3Service.fileUpload(
        event.target.files[0],
        `photo-${this.currentPhotoIndex}`,
        `proposal/inspirationalPhotos/${this.proposalRequest.id}`,
      ).then((res) => {});
      this.$forceUpdate();
    },
    handleAddPhoto(index) {
      this.currentPhotoIndex = index;
      document.getElementById("proposal-inspiration-file").click();
    },
  },
};
</script>
<style lang="scss" scoped>
.proposal-inpirational-photos {
  margin-left: -10px;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  .photos-carousel {
    .photo-item {
      border: dashed #f51355 1px;
      width: 100%;
      height: 200px;
      display: inline-block;
      margin: 10px;
      position: relative;
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
  }
}
</style>