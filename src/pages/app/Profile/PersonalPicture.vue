<template>
<div>
  <div class="picture-container">
    <div class="picture">
      <div v-if="!imageUrl">
        <img class="avatar" title src="static/img/profile-picture.png">
      </div>
      <div v-else>
        <img v-model="imageUrl" class="avatar" :src="imageUrl">
      </div>
      <input type="file" @change="onFileChange">
    </div>
    <div v-if="!imageUrl">
      <button class="description choose-button">Choose Picture</button>
    </div>

  </div>
      <div v-if="imageUrl" class="remove">
      <button v-on:click="clearImg" class="description  choose-button" > <h6 class="description">Remove</h6></button>
    </div>
  </div>
</template>

<style lang="scss">
.avatar {
  width: 50% !important;
  border-radius: 50% !important;
}
.choose-button {
  background: #9034ab !important;
  padding: 4px;
  width: 50%;
  padding-top: 8px;
  border: 12px;
  border-radius: 5px;
}
.remove{
    width:100%;
    h6{
    margin: 4px !important;

    }
    text-align: center;
}
.description {
  color: #fff;
}
.picture {
  width: 100% !important;
  max-width: 100%;
  padding: 24px;
}
.picture-src {
  width: 100%;
}
</style>


<script>
import { LabelEdit } from "@/components";
import Me from "@/models/Me";
export default {
  components: {
    Me
  },
  mounted() {},
  props: {
    userInfo: Object,
    isLoading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      imageUrl: null,
      alretExceedPictureSize: false
    };
  },
  methods: {
    onFileChange(event) {
      let file = event.target.files || event.dataTransfer.files;
      if (!file.length) {
        return;
      }
      if (file[0].size <= 500000) {
        let url = URL.createObjectURL(file[0]);
        this.imageUrl = url;
        this.createImage(files[0]);
      } else {
        this.alretExceedPictureSize = true;
      }
    },
    clearImg(){
        this.imageUrl = ''
    },
        showRemoveConfirmDialog(){
        this.dialogMessage="Are you sure you want delete profile picture ?"
        this.dialogConfirmFlag =  true
      },

      confirmDelete(){
        this.imageUrl = null
        this.dialogConfirmFlag = false
      },
      onCancel(){
        this.dialogConfirmFlag = false
      },
    createImage(file, type) {
      let reader = new FileReader();
      let vm = this;

      reader.onload = e => {
        this.loaded = false;
        // return new CustomerFile({customerFile: e.target.result}).save().then(result => {
        //     this.loaded = true;
        // }) .catch((error) => {
        //     console.log(error);
        //     this.loaded = true;
        // });
        // const formData = new FormData();
        // formData.append("images", file[0], file[0].name) // TODO :: send this object once we have api for userPorfile photo
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(type) {
       // showRemoveConfirmDialog()
      this.loaded = false;
      // let customer = this.$auth.user.customer;
      // new CustomerFile({id: customer.logoFileId}).delete().then(res => {
      //     this.loaded = true;
      //     customer.logoFileId = null;
      //     this.companyProfile.logoFileId = undefined;
      //     this.companyProfile.companyLogo = customer.logoFileId ? `${process.env.SERVER_URL}/1/customerFiles/${customer.logoFileId}` : 'static/img/image_placeholder.jpg';
      // }).catch((error) => {
      //     this.loaded = true;
      // });
    }
  },
  watch: {
    userInfo(newVal, oldVal) {}
  }
};
</script>

<style lang="scss" scoped>
.picture-container {
  position: relative;
  cursor: pointer;
  text-align: center;

  .description {
    margin: 0;
    margin-bottom: 0.5rem;
  }

  .picture input[type="file"] {
    cursor: pointer;
    display: block;
    height: 100%;
    left: 0;
    opacity: 0 !important;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .picture-src {
    width: 100%;
  }
}
</style>
