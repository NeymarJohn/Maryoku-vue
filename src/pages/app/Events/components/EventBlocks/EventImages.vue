<template>
  <div class="event-images-list md-layout">

    <md-card class="md-layout-item md-size-25 default-image-box" v-if="event.eventPage.images.length == 0">
      Add Images here
    </md-card>

    <md-card v-for="(image,index) in event.eventPage.images" :key="index" class="md-layout-item md-size-25">
      <md-card-media>
        <div class="event-images_image-item" :style="`background-image : url(`+`${serverUrl}/1/eventPageImages/${image}`+`)`">
          <md-button class="md-info md-sm" @click="removeEventImage(index)">
            DELETE
          </md-button>
        </div>
      </md-card-media>
    </md-card>

    <div class="update-banner-form" v-if="event.eventPage.images.length < 3">
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
  import CalendarEvent from "@/models/CalendarEvent"
  import EventComponent from "@/models/EventComponent";
  import CalendarEventPageImage from "@/models/CalendarEventPageImage"
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';
  import swal from "sweetalert2";



  export default {
    name: 'event-images',
    components: {

    },
    props: {
      event
    },
    data: () => ({
      auth: auth,
      eventImages : [],
      serverUrl: process.env.SERVER_URL

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

        if (file[0].size <= 1500000){

          this.createImage(file[0]);


//              let url = URL.createObjectURL(file[0]);
//              const formData = new FormData();
//              formData.append("images", file[0], file[0].name) // TODO :: send this object once we have api for userPorfile photo
        }else{
          this.alretExceedPictureSize = true
          this.$notify(
            {
              message: "You've Uploaded an Image that Exceed the allowed size, try small one!",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'warning'
            })

        }

      },
      createImage(file, type) {
        let reader = new FileReader();
        let vm = this;

        this.$parent.isLoading = true;

        reader.onload = e => {
          const calendar = new Calendar({id: this.auth.user.defaultCalendarId});
          const event = new CalendarEvent({id: this.event.id});
          return new CalendarEventPageImage({featuredImageFile : e.target.result}).for(calendar, event).save().then(result => {

            console.log('image ', result.id);

            this.event.eventPage.images.push(result.id);

            this.$parent.isLoading = false;

          })
            .catch((error) => {
              console.log(error);
            });
        };
        reader.readAsDataURL(file);
      },

      removeEventImage(index){
        const calendar = new Calendar({id: this.auth.user.defaultCalendarId});
        const event = new CalendarEvent({id: this.event.id});
        return new CalendarEventPageImage({id : this.event.eventPage.images[index]}).for(calendar, event).delete().then(result => {

          console.log('image ', result.id);

          this.event.eventPage.images.splice(index,1);

          this.$parent.isLoading = false;

        })
          .catch((error) => {
            console.log(error);
          });
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
