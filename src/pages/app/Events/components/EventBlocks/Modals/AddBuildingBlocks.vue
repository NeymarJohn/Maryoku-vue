<template>
    <div class="event_header-image-modal">
        <div class="md-layout">
            <modal v-if="editHeaderModal">
                <template slot="header">
                    <div class="md-layout d-flex items-left" >
                        <h4>Update Header
                        </h4>
                    </div>
                    <md-button class="md-simple md-just-icon md-round modal-default-button" @click="closeModal">
                        <md-icon>clear</md-icon>
                    </md-button>
                </template>
                <template slot="body" v-if="headerImages">

                </template>
                <template slot="footer">
                    <md-button class="md-success move-right" @click="saveHeaderImage">
                        Add
                    </md-button>
                </template>
            </modal>
        </div>

    </div>
</template>
<script>
  import auth from '@/auth';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import CalendarEvent from '@/models/CalendarEvent';
  import EventPageHeaderImage from '@/models/EventPageHeaderImage';
  import {Modal} from "@/components";
  import Calendar from "@/models/Calendar";
  import EventComponent from "@/models/EventComponent";

  import swal from "sweetalert2";
  import { error } from 'util';
  import moment from 'moment';

  export default {
    components: {
      Modal,
    },
    props: {
      event : Object

    },
    data: () => ({
      auth: auth,
      headerImages : null,
        selectedImage : null,
        imagePreview : null
    }),

    created() {

        this.getHeaderImages()

    },
    mounted() {

    },
    methods: {
        ...mapMutations('EventPlannerVuex', ['setHeaderModal']),
        closeModal(){
          this.setHeaderModal({ showModal: false });
      },
        getHeaderImages() {

            new EventPageHeaderImage().get().then(headerImages => {
                // iterate through header images

                this.headerImages = headerImages;
            });
        },
        saveHeaderImage() {

            let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let editedEvent = new CalendarEvent({id: this.event.id});

            editedEvent = this.event;
            editedEvent.eventPage.headerImage = this.selectedImage;



            editedEvent.save().then(response => {
                this.closeModal();

            })
                .catch((error) => {
                    console.log(error);

                });

        },
        selectImage(selectedImage) {

            this.selectedImage = selectedImage;

        },
        previewImage(selectedImage) {
            this.imagePreview = selectedImage;

        },
        closePreviewModal() {
            this.imagePreview = null;

        }
    },
      computed : {
          ...mapState('EventPlannerVuex', [
              'editHeaderModal',
          ])
      }
  };
</script>
<style lang="scss" scope>
  .md-datepicker {
    .md-icon.md-date-icon {
      display: none;
      &~label {
        left: 0;
      }
    }
    input {
      margin-left: 0 !important;
    }
    &.md-field::before,
    &.md-field::after {
      width: 100%;
    }
  }
  .md-field>.md-icon~.md-input {
    margin: 0;
  }
</style>
<style lang="scss">
    .modal-z-index {
        z-index: 5;
    }
    .large-z-index {
        z-index: 6;
        position: relative;
    }
    .move-center {
        margin: 0 auto!important;;
    }
    .move-left {
      margin-left: 0!important;
      margin-right: auto!important;
    }
    .move-right {
      margin-right: 0!important;
      margin-left: auto!important;
    }
    .text-center {
      text-align: center;
    }
    .d-flex {
      display: flex;
    }
    .items-center-v {
      align-items: center;
    }
    .items-center-g {
      justify-content: center;
    }
    .justify-beetwen {
      justify-content: space-between
    }
    .md-field .md-error {
      text-align: left;
    }
    .swal2-container {
      z-index: 10000;
    }
</style>
