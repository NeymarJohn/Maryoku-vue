<template>
  <div class="md-layout ">

    <event-header-form :occasionOptions="occasionsArray"></event-header-form>

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
                <md-list-item>
                  <i class="material-icons" style="margin-right: 10px;">visibility</i> Request Proposal
                  <p class="hidden-lg hidden-md">Invite</p>
                </md-list-item>
              </md-list>
            </div>
          </div>
        </div>
      </md-toolbar>
    </div>

    <event-card-component v-for="component in components" :componentObject="component" :key="component.id"></event-card-component>

  </div>
</template>

<script>

  import EventHeaderForm from './components/Event-header-form.vue';
  import EventCardComponent from './components/Event-card-component.vue';
  import Calendar from '@/models/Calendar';
  import Occasion from '@/models/Occasion';
  import EventComponent from '@/models/EventComponent';
  import Vendors from '@/models/Vendors';
  import { mapGetters } from 'vuex'

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
        this.$store.state.eventData.components.push({
          componentId: item.id,
          todos: [],
          values: [],
          vendors: [],
        })
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
      components(newVal) {
        console.log(newVal);
      }
    },
    mounted() {
      this.onResponsiveInverted();
      window.addEventListener("resize", this.onResponsiveInverted);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.onResponsiveInverted);
    },
    created() {
      Calendar.get().then((calendars) => {
        this.calendarId = calendars[0].id;
        // get data from ID and then
        this.$store.state.eventData.components =  [
          {
            id: 'services',
            componentId: 'Services',
            vendors: [
              {
                id: 1,
                vendorName: 'Angelo&Nina' ,
                contactPerson: 'Eyal',
                email: 'angelonona@gmail.com',
                phone: '12345667',
                cost: '$2000',
                proposal: 'n/a'
              },
              {
                id: 2,
                vendorName: 'Nur' ,
                contactPerson: 'Michal',
                email: 'michal@nur.com',
                phone: '3321312346',
                cost: '$7000',
                proposal: 'n/a'
              }
            ],
            values: [
              {
                id: 1,
                name: 'Property name 1',
                value: 'Some value 1',
                comment: 'Some commentary'
              },
              {
                id: 2,
                name: 'Property name 2',
                value: 'Some value 2',
                comment: 'Another commentary'
              }
            ],
            todos: [
              {
                id: 1,
                title: 'Negotiate Price',
                dueDateMillis: 1544088126000,
                assignee: 'Rotem Sela',
                status: 'New'
              },
              {
                id: 2,
                title: 'Something',
                dueDateMillis: 1544088126000,
                assignee: 'Some person',
                status: 'In Work'
              },
            ]
          }
        ];
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
</style>
