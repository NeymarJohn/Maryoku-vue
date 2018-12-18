<template>
  <div class="md-layout margin-footer">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>
    <div class="md-layout-item md-size-100">

      <div class="event-status-field">
        <label>Status: </label>
        <md-field class="status-select">
          <md-select v-model="event.status" name="event-status">
            <md-option value="draft">Draft</md-option>
            <md-option value="approved">Approved</md-option>
            <md-option value="execution">Execution</md-option>
            <md-option value="done">Done</md-option>
          </md-select>
        </md-field>


        <md-button native-type="submit" @click="openImageGallery()" class="md-success">
          Image Gallery
          <span class="badge md-round md-info" v-if="uploadedImages.length">{{ uploadedImages.length }}</span>
        </md-button>
        <md-button @click="editEvent()" class="md-success">
          Edit event
        </md-button>
      </div>
    </div>
    <div class="md-layout-item md-size-50 md-small-size-100 scrollable-container">
      <event-info :occasionOptions="occasionsArray" :event="event" v-bind:readonly="true"></event-info>
    </div>

    <div class="md-layout-item md-size-50 md-small-size-100 scrollable-container mt-small-20">
      <time-line plain :type="'simple'">

          <event-card-component v-for="(component, index) in event.components"
                                :key="'event-card-component-' + index"
                                v-if="$store.state.vendorsList && component"
                                :componentObject="component"
                                :componentIndex="index"
                                :readonly="true">
          </event-card-component>

      </time-line>

    </div>
  <event-gallery-modal ref="galleryModal"
                         :isModalLoading="isModalLoading"
                         :uploadedImages="uploadedImages">
    </event-gallery-modal>
  </div>
</template>

<script>

  import EventHeaderForm from './components/EventHeaderForm.vue';
  import EventInfo from './components/EventInfo.vue';
  import EventCardComponent from './components/EventCardComponent.vue';
  import Calendar from '@/models/Calendar';
  import CalendarEvent from '@/models/CalendarEvent';
  import CalendarEventImage from '@/models/CalendarEventImage';
  import Occasion from '@/models/Occasion';
  import EventComponent from '@/models/EventComponent';
  import Vendors from '@/models/Vendors';
  import { mapGetters } from 'vuex'
  import moment from 'moment';
  import EventGalleryModal from './Components/EventGalleryModal';
  import VueElementLoading from 'vue-element-loading';
  import { TimeLine } from "@/components";
  import { TimeLineItem } from "@/components";

  export default {
    components: {
      EventHeaderForm,
      EventInfo,
      EventCardComponent,
      VueElementLoading,
      TimeLine,
      TimeLineItem,
      EventGalleryModal
    },
    data: () => ({
      uploadedImages: [],
      isModalLoading: false,
      responsive: false,
      calendarId: null,
      occasionsArray: null,
      componentsList: null,
      event: {},
      calendar: {},
      readOnly: true,
      isLoading: true,
    }),

    methods: {
      updateEvent(status) {
        this.event.status = status;
        this.event.for(this.calendar).save();
      },
      openImageGallery() {
        this.$refs.galleryModal.toggleModal(true);
      },
      editEvent() {
        this.$router.push({ path: `/events/${this.$route.params.id}/edit` });
      },
      onResponsiveInverted() {
        if (window.innerWidth < 768) {
          this.responsive = true;
        } else {
          this.responsive = false;
        }
      },

      sentProposalRequest() {
        let routeData = this.$router.resolve({ path: "/events/proposal" });
        window.open(routeData.href, '_blank');
      },
      getEventData() {
        CalendarEvent.custom(`${process.env.SERVER_URL}/1/calendars/${this.$store.state.calendarId}/events/${this.$route.params.id}`).get().then(event => {
          this.event = event[0];
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
      }
    },
    computed: {
      ...mapGetters({
        myState: 'getMyState'
      }),
      components() {
        return this.event.components;
      }
    },
    mounted() {
      // hack to always scroll top
      document.getElementsByClassName('main-panel')[0].scrollTop = 0;
      this.onResponsiveInverted();
      window.addEventListener("resize", this.onResponsiveInverted);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.onResponsiveInverted);
    },
    watch: {
      event: {
        handler: function(event, oldVal) {
          if (event.id != oldVal.id)  {
            this.isModalLoading = true;
            CalendarEventImage.custom(`${process.env.SERVER_URL}/1/calendars/${this.calendar.id}/events/${event.id}/images/`).get().then(images => {
              this.uploadedImages = images.map((image) => { return {'src': `${process.env.SERVER_URL}/${image.href}`, 'thumb': `${process.env.SERVER_URL}/${image.href}`}});
              this.isModalLoading = false;
            })
            .catch((error) => {
              this.isModalLoading = false;
              console.log(error);
            });
          }
          
        },
      },
      'event.status': {
        handler: function(newVal, oldVal) {
          if (newVal !== '' && newVal !== undefined && newVal !== oldVal && oldVal !== undefined) {
          return this.updateEvent(newVal);
        }
        }
      }
    },
    created() {
      let calendar = '';

      if (this.$store.state.calendarId === null) {
        calendar = Calendar.get().then(calendars => {
          if (calendars.length === 0) {
            return;
          }
          this.$store.state.calendarId = calendars[0].id;
          this.getEventData();
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
      } else {
        this.getEventData()
      }


      let vendorsList = Vendors.get().then((vendorsList) => {
        this.$store.state.vendorsList = vendorsList;
      });

      let components = '';

      if (this.$store.state.componentsList === null) {
        components = EventComponent.get().then((componentsList) => {
          this.$store.state.componentsList = componentsList;
        });
      }

      Promise.all([vendorsList, calendar, components]).then(() => {
        this.isLoading = false;
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
      });
    },
  };
</script>

<style lang="scss">
  .read-only {
    pointer-events: none;
  }
  .no-margin-container {
    margin-top: -33px;
  }
  .margin-footer {
    margin-bottom: 50px;
  }
  .scrollable-container {
    height: calc(100vh - 72px);
    overflow: auto;
    padding-top: 1px;

    .md-card {
      margin: 10px 0;
    }
  }
  @media (max-width: 960px) {
    .mt-small-20 {
      margin-top: 20px;
    }
    .scrollable-container {
      height: auto;
    }
  }
</style>
