<template>
  <div class="file-uloader" @click="handleAddPhoto">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />

    <Preload @click="handleAddPhoto" />
    <Preview />

    <!-- <div v-if="!photo" class="empty-item">
      <label class="photo-add-label color-vendor font-bold" @click="handleAddPhoto(index)">
        <md-icon class="color-vendor">add</md-icon>
        <br>
        Add photo
      </label>
    </div>
    <template v-else>
      <div class="active-item">
        <img class="photo-image" :src="photo.url" @click="handleAddPhoto(index)">
        <md-button class="remove-btn md-icon-button md-raised" @click="removePhoto">
          <img :src="`${$iconURL}common/trash-dark.svg`" style="width: 20px">
        </md-button>
      </div>
      <div v-if="photo.caption" class="photo-caption">
        {{ photo.caption }}&nbsp;&nbsp;
        <md-button class="edit-btn md-black md-simple" @click="addCaption">
          <u>Edit</u>
        </md-button>
      </div>
      <div v-else class="photo-caption">
        <md-button class="md-simple edit-btn md-black" @click="addCaption">
          <u>Add caption</u>
        </md-button>
      </div>
    </template> -->
    <input
      id="proposal-uploader"
      style="display: none"
      name="attachment"
      type="file"
      multiple="multiple"
      hidden
      :disabled="maxCount >= files.length"
      @change="onLoad"
    >
  </div>
</template>
<script>
// import { getBase64 } from "@/utils/file.util";
// import Swal          from "sweetalert2";
import numberClamp   from "@/helpers/number/clamp";

import Preload       from "./Preload.vue";
import Preview       from "./Prewiev.vue";

const MAX_SIZE  = 1024 * 1024 * 25;
const MAX_COUNT = 10;

export default {
  components: {
    Preload,
    Preview,
  },
  props: {
    maxSize: {
      type    : Number,
      default : MAX_SIZE
    },
    maxCount: {
      type    : Number,
      default : MAX_COUNT,
    },
    files: {
      type    : Array,
      default : () => ([]),
    }
  },
  data() {
    return {
      select    : -1,
      isLoading : false,
    };
  },
  computed: {
    lastFileIndex () {
      return this.files ? this.files.length - 1 : -1;
    },
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
  watch:{
    files () {
      if      (this.lastFileIndex < this.select) this.select = this.lastFileIndex;
      else if (this.lastFileIndex >= 0 && this.select < this.lastFileIndex) this.select = this.lastFileIndex;
    },
    defaultPhoto(newVal){console.log("defaultPhoto", newVal); this.photo = newVal;}
  },
  created() {},
  methods: {
    onSelect (index = 0) {
      const currentIndex = +index;
      if (currentIndex !== this.select) this.select = numberClamp(0, this.lastFileIndex, currentIndex);
    },
    onNext () {
      return this.select = this.select >= this.lastFileIndex ? 0 : this.select + 1;
    },
    onPrev () {
      return this.select = this.select <= 0 ? this.lastFileIndex : this.select - 1;
    },

    validateSize (file) {
      if (file.size > this.maxSize) throw new Error();
    },

    onLoad ({ target }) {
      console.log(target.files);
    },

    // async onFileChange(event) {
    //   if (!event.target.files[0]) return;
    //   console.log(event.target.files[0]);
    //   if (event.target.files[0].size > 1024 * 1024 * 5) {
    //     Swal.fire({
    //       title: `The size of file that you selected is ${Math.floor(
    //         event.target.files[0].size / 1024 / 1024,
    //       )}MB. This file should be under 5MB`,
    //       showCancelButton: false,
    //       confirmButtonClass: "md-button md-vendor",
    //       cancelButtonClass: "md-button md-danger",
    //       confirmButtonText: "I got it",
    //       buttonsStyling: false,
    //     }).then((result) => {
    //       if (result.value) {
    //       }
    //     });
    //     return;
    //   }
    //   const extension = event.target.files[0].type.split("/")[1];
    //   if (!this.photo) this.photo = {};
    //   const timeStamp = new Date().valueOf();
    //   const photoData = await getBase64(event.target.files[0]);
    //   this.$set(this.photo, "url", photoData);
    //   this.$root.$emit("update-inspirational-photo", {
    //     file: event.target.files[0],
    //     index: this.index,
    //     link: `proposal/inspirationalPhotos/${this.proposalRequest.id}`,
    //     fileName: `photo-${timeStamp}`,
    //   });
    // },
    handleAddPhoto() {
      document.getElementById("proposal-uploader").click();
    },
    // addCaption() {
    //   this.$emit("addCaption", this.photo);
    // },
    // removePhoto() {
    //   this.photo = null;
    //   this.$root.$emit("remove-inspirational-photo", this.index);
    // },
  }
};
</script>
<style lang="scss" scoped>
.file-uloader {
  cursor: pointer;
  border: 1px dashed #818080;
}
</style>
