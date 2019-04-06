<template>
    <div class="md-layout-item md-size-100 event-details_banner" :style="`background-image : url(`+ bannerURL  +`)`">
        <div class="update-banner-form">
            <md-button  class="md-info md-sm" @click="uploadImage">
                UPDATE IMAGE
            </md-button>
            <input type="file" style="display: none;" ref="inputFile" accept="image/gif, image/jpg, image/png" @change="onFilePicked">
        </div>
    </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from "@/models/Calendar"
  import EventComponent from "@/models/EventComponent";
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';

  export default {
    name: 'event-banner',
    components: {

    },
    props: {
        event
    },
    data: () => ({
        bannerURL : 'https://bit.ly/2TWGILO', // default image for banner
    }),
    methods: {
        uploadImage() {
            this.$refs.inputFile.click();

        },
        onFilePicked(event) {
            let file = event.target.files || event.dataTransfer.files;
            if (!file.length) {
                return;
            }
            if (file[0].size <= 500000){
                let url = URL.createObjectURL(file[0]);
                this.bannerURL = url

                const formData = new FormData();
                formData.append("images", file[0], file[0].name) // TODO :: send this object once we have api for userPorfile photo
            }else{
                this.alretExceedPictureSize = true
            }

        }

    },
    created() {
      
    },
    mounted() {

    },
    computed: {

    }
  }
</script>
