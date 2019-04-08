<template>
    <div class="event-images-list md-layout">

        <md-card class="md-layout-item md-size-25 default-image-box" v-if="eventImages.length == 0">
            Add Images here
        </md-card>

        <md-card v-for="(image,index) in eventImages" :key="index" class="md-layout-item md-size-25">
            <md-card-media>
                <div class="event-images_image-item" :style="`background-image : url(`+image+`)`">
                    <md-button class="md-info md-sm" @click="removeEventImage(index)">
                        DELETE
                    </md-button>
                </div>
            </md-card-media>
        </md-card>

        <div class="update-banner-form" v-if="eventImages.length < 3">
            <md-button  title="Add Images" class="add-event-image md-info md-sm md-just-icon md-round" @click="uploadEventImage">
                <md-icon>add</md-icon>
            </md-button>
            <input type="file" style="display: none;" ref="eventFile" accept="image/gif, image/jpg, image/png" @change="onEventFilePicked">
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
    name: 'event-images',
    components: {

    },
    props: {
        event
    },
    data: () => ({
        eventImages : [],
    }),
    methods: {
      uploadEventImage() {
          this.$refs.eventFile.click();

      },

      onEventFilePicked(event) {
          let file = event.target.files || event.dataTransfer.files;
          if (!file.length) {
              return;
          }
          if (file[0].size <= 500000){
              let url = URL.createObjectURL(file[0]);
              this.eventImages.push(url);

              const formData = new FormData();
              formData.append("images", file[0], file[0].name) // TODO :: send this object once we have api for userPorfile photo
          }else{
              this.alretExceedPictureSize = true
          }

      },
      removeEventImage(index){
          this.eventImages.splice(index,1);

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
