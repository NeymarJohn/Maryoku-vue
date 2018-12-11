<template>
  <div class="md-layout" :class="[{'read-only': readOnly}]">

    <event-header-form :occasionOptions="occasionsArray" :formData="formData"></event-header-form>

    <div class="md-layout-item md-size-100">
      <md-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <drop-down direction="down">
              <md-button slot="title" class="md-button md-block dropdown-toggle" data-toggle="dropdown">
                <i class="material-icons">add</i> Add Component
              </md-button>
              <ul class="dropdown-menu" :class="{'dropdown-menu-right': responsive}">
                <li v-for="item in componentsList" :key="item.id" @click="createNewComponent(item)"><a>{{ item.value }}</a></li>
              </ul>
            </drop-down>
          </div>
          <div class="md-toolbar-section-end">
            <md-button class="md-just-icon md-simple md-toolbar-toggle">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </md-button>

            <div class="md-collapse">
              <md-list>
                <md-list-item @click="sentProposalRequest()">
                  <i class="material-icons" style="margin-right: 10px;">visibility</i> Request Proposal
                  <p class="hidden-lg hidden-md">Invite</p>
                </md-list-item>
              </md-list>
            </div>
          </div>
        </div>
      </md-toolbar>
    </div>

    <event-card-component v-for="(component, index) in components"
                          v-if="$store.state.vendorsList"
                          :componentObject="component"
                          :componentIndex="index"
                          :key="'event-card-component-' + index">

    </event-card-component>

  </div>
</template>

<script>

  import EventHeaderForm from './components/Event-header-form.vue';
  import EventCardComponent from './components/Event-card-component.vue';
  import Calendar from '@/models/Calendar';
  import CalendarEvent from '@/models/CalendarEvent';
  import Occasion from '@/models/Occasion';
  import EventComponent from '@/models/EventComponent';
  import Vendors from '@/models/Vendors';
  import { mapGetters } from 'vuex'
  import moment from 'moment';

  export default {
    components: {
      EventHeaderForm,
      EventCardComponent,
    },
    data: () => ({
      responsive: false,
      multiLevel: false,
      multiLevel2: false,
      calendarId: null,
      occasionsArray: null,
      componentsList: null,
      formData: null,
      readOnly: true,
    }),

    methods: {
      onResponsiveInverted() {
        if (window.innerWidth < 768) {
          this.responsive = true;
        } else {
          this.responsive = false;
        }
      },
      toggleMultiLevel() {
        this.multiLevel = !this.multiLevel;
      },
      toggleMultiLevel2() {
        this.multiLevel2 = !this.multiLevel2;
        this.multiLevel3 = false;
      },
      createNewComponent(item) {
        if (!this.$store.state.eventData.components) {
          this.$store.state.eventData.components = [];
        }
        this.$store.state.eventData.components.push({
          componentId: item.id,
          todos: [],
          values: [],
          vendors: [],
        })
      },
      sentProposalRequest() {
        let routeData = this.$router.resolve({ path: "/events/proposal" });
        window.open(routeData.href, '_blank');
      }
    },
    computed: {
      ...mapGetters({
        myState: 'getMyState'
      }),
      components() {
        return this.$store.state.eventData.components;
      }
    },
    watch: {
      '$route' (to, from) {
        this.readOnly = ['EventEdit', 'EventNew'].indexOf(this.$route.name) === -1;
      }
    },
    mounted() {
      this.onResponsiveInverted();
      this.readOnly = ['EventEdit', 'EventNew'].indexOf(this.$route.name) === -1;
      window.addEventListener("resize", this.onResponsiveInverted);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.onResponsiveInverted);
    },
    created() {
      Calendar.get().then((calendars) => {
        this.calendarId = calendars[0].id;

        let newEvent = new CalendarEvent().for(calendars[0]);
        newEvent.get().then((eventsItem) => {
          let editedItem = eventsItem.find((val) => val.id === this.$route.params.id);
          if (editedItem) {
            this.$store.state.eventData.components = editedItem.components;
            this.formData = {
              eventName: editedItem.title,
              occasion: editedItem.occasion,
              date: new Date(editedItem.eventStartMillis),
              time: moment(editedItem.eventStartMillis).format('HH:00'),
              duration: moment(editedItem.eventEndMillis).diff(editedItem.eventStartMillis, 'hours'),
              participants: editedItem.numberOfParticipants,
              status: editedItem.status,
              budget: editedItem.totalBudget,
              location: editedItem.location
            }
          }
        })

      });
      Occasion.get().then((occasions) => {
        this.occasionsArray = occasions;
      });
      EventComponent.get().then((componentsList) => {
        this.$store.state.componentsList = componentsList;
        this.componentsList = componentsList;
      });

      Vendors.get().then((vendorsList) => {
        this.$store.state.vendorsList = vendorsList;
      });
    },
  };
</script>

<style lang="scss">
  .dropdown .dropdown-menu .dropdown-menu {
    left: 102%;
  }
  .dropdown-menu .open + .dropdown-menu {
    min-width: 182px;
  }
  .read-only {
    pointer-events: none;
  }
</style>
