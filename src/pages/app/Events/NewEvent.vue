<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

    <event-header-form :occasionOptions="occasionsArray" :formData="formData"></event-header-form>

    <div class="md-layout-item md-size-100">
      <md-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <drop-down direction="down" ref="dropdown">
              <md-button slot="title" class="md-button md-block dropdown-toggle" data-toggle="dropdown">
                <i class="material-icons">add</i> Add Component
              </md-button>
              <ul class="dropdown-menu" :class="{'dropdown-menu-right': responsive}">
                <li v-for="item in componentsList" :key="item.id" @click="createNewComponent($event, item)">
                  <a :class="item.childComponents ? 'dropdown-toggle' : ''">
                    {{ item.value }}
                    <ul class="dropdown-menu" v-if="item.childComponents">
                      <li v-for="subItem in item.childComponents" :key="subItem.id" @click="createNewComponent($event, subItem)">
                        <a>{{ subItem.title }}</a></li>
                    </ul>
                  </a>
                </li>
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

  import EventHeaderForm from './components/EventHeaderForm.vue';
  import EventCardComponent from './components/EventCardComponent.vue';
  import Calendar from '@/models/Calendar';
  import CalendarEvent from '@/models/CalendarEvent';
  import Occasion from '@/models/Occasion';
  import EventComponent from '@/models/EventComponent';
  import Vendors from '@/models/Vendors';
  import { mapGetters } from 'vuex'
  import moment from 'moment';
  import VueElementLoading from 'vue-element-loading';

  export default {
    components: {
      EventHeaderForm,
      EventCardComponent,
      VueElementLoading
    },
    data: () => ({
      responsive: false,
      calendarId: null,
      occasionsArray: null,
      componentsList: null,
      formData: null,
      readOnly: true,
      isLoading: true,
    }),

    methods: {
      onResponsiveInverted() {
        if (window.innerWidth < 768) {
          this.responsive = true;
        } else {
          this.responsive = false;
        }
      },
      createNewComponent(e, item) {
        this.$refs.dropdown.closeDropDown();
        e.stopPropagation();
        if (this.$store.state.eventData.components === null || !this.$store.state.eventData.components.length) {
          this.$store.state.eventData.components = [];
        }

        this.$store.commit('updateComponent', {
          componentId: item.id,
          todos: [],
          values: [],
          vendors: [],
        });
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
      let occasions = Occasion.get().then((occasions) => {
        this.occasionsArray = occasions;
      });
      let components = EventComponent.get().then((componentsList) => {
        this.$store.state.componentsList = componentsList;
        this.componentsList = componentsList;
      });

      let vendors = Vendors.get().then((vendorsList) => {
        this.$store.state.vendorsList = vendorsList;
      });

      Promise.all([occasions, components, vendors]).then(() => {
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
  .dropdown .dropdown-menu .dropdown-menu {
    left: 97%;
    margin-top: -5px;
  }
  .dropdown-menu .dropdown-menu {
    min-width: 182px;
  }
  .read-only {
    pointer-events: none;
  }
  .dropdown .dropdown-menu .dropdown-toggle:hover .dropdown-menu {
    opacity: 1;
    transform: scale(1);
  }
  .dropdown .dropdown-menu .dropdown-toggle:after {
    font-family: 'Material Icons';
    content: 'chevron_right';
    border: 0 none;
    width: auto;
    height: auto;
  }
</style>
