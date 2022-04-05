<template>
  <div class="user-avatar">
    <vue-element-loading :active="isLoading" color="#FF547C" />
    <div class="uploading-wrapper">
      <md-button id="pick-avatar" class="maryoku-btn md-simple md-white">
        <md-icon>edit</md-icon>
        Edit
      </md-button>
    </div>
    <img :src="`${userAvatarUrl}?q=${Math.random()}`" style="margin: auto">
    <avatar-cropper
      :upload-handler="uploadHandler"
      trigger="#pick-avatar"
      :labels="{ submit: 'OK', cancel: 'Cancel' }"
      @uploaded="handleUploaded"
      @uploading="handleUploading"
    />
  </div>
</template>
<script>
import S3Service from "@/services/s3.service";
import VueElementLoading from "vue-element-loading";
import AvatarCropper from "vue-avatar-cropper";

export default {
  components: {
    VueElementLoading,
    AvatarCropper,
  },
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isLoading: false,
      userAvatarUrl: "",
    };
  },
  created() {
    this.userAvatarUrl = this.user.avatar || `${this.$iconURL}Planner+Profile/woman+(2).svg`;
  },
  methods: {
    handleUploaded() {
    },
    handleUploading(event) {
      console.log(event);
    },
    uploadHandler(cropper) {
      const imageData = cropper.getCroppedCanvas().toDataURL("image/png");
      this.onUserAvatarChange(imageData);
    },
    onClickAvtar() {
      document.getElementById("user-avatar-file").click();
    },
    onUserAvatarChange(imageData) {
      const fileObject = S3Service.dataURLtoFile(imageData, `${this.user.id}`);
      let imageName = this.user.id;
      let imageUrl = `https://maryoku.s3.amazonaws.com/user/avatars/${this.user.id}.png`;
      this.isLoading = true;
      S3Service.fileUpload(fileObject, `${imageName}`, "user/avatars").then((res) => {
        this.isLoading = false;
        this.userAvatarUrl = imageUrl;
        this.$emit("set", imageUrl);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.user-avatar {
  width: 100%;
  height: 100%;

  border-radius: 3px;
  border: dashed 1.5px #f51355;

  img {
    width: 100%;
    height: 100%;
  }

  .uploading-wrapper {
    display: none;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    height: 100%;
    width: 100%;

    #pick-avatar {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &:hover {
    .uploading-wrapper {
      display: block;
    }
  }
}
</style>
