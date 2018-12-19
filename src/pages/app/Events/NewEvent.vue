<template>
  <div class="md-layout margin-footer">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

    <div class="md-layout-item md-size-50 md-small-size-100 scrollable-container">
      <event-header-form :occasionOptions="occasionsArray" :formData="formData"></event-header-form>
    </div>

    <div class="md-layout-item md-size-50 md-small-size-100 scrollable-container mt-small-20">

      <time-line plain :type="'simple'">
        <time-line-item inverted badge-type="danger" badge-icon="card_travel" class="empty-timeline">
          <div slot="header">
          <drop-down direction="down" ref="dropdown" class="dropdown-component-button">
                <md-button slot="title" class="md-button md-block md-primary dropdown-toggle" data-toggle="dropdown">
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
        </time-line-item>
        <event-card-component v-for="(component, index) in components"
                              :key="'event-card-component-' + index"
                              v-if="$store.state.vendorsList"
                              :componentObject="component"
                              :componentIndex="index">
        </event-card-component>

      </time-line>
    </div>
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
  import { TimeLine, TimeLineItem } from "@/components";

  export default {
    components: {
      EventHeaderForm,
      EventCardComponent,
      VueElementLoading,
      TimeLine,
      TimeLineItem,
    },
    data: () => ({
      responsive: false,
      calendarId: null,
      occasionsArray: null,
      componentsList: null,
      formData: null,
      readOnly: true,
      isLoading: true,
      buttonRowClass: '',
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
      },
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

      this.$watch(
        () => {
          return this.$refs.dropdown.isOpen;
        },
        (val) => {
          this.buttonRowClass = val ? 'large-z-index' : '';
        }
      )
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.onResponsiveInverted);
    },
    created() {
      let occasions = '';
      if (this.$store.state.occasionsArray === null) {
        occasions = Occasion.get().then((occasions) => {
          this.$store.state.occasionsArray = occasions;
          this.occasionsArray = occasions;
        });
      } else {
        this.occasionsArray = this.$store.state.occasionsArray;
      }

      let components = '';
      if (this.$store.state.componentsList === null) {
        components = EventComponent.get().then((componentsList) => {
          this.$store.state.componentsList = componentsList;
          this.componentsList = componentsList;
        });
      } else {
        this.componentsList = this.$store.state.componentsList;
      }

      // vendors are dynamically changed, so always get them
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
  .dropdown-component-button {
    width: 40%;
    margin: 0 auto;
    margin-bottom: -30px;
    margin-top: -15px;
  }
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
   .left-offset {
    margin-left: 30px;
    margin-bottom: -23px;
  }
  .margin-footer {
    margin-bottom: 50px;
  }
  .dropdown .dropdown-menu .dropdown-toggle:after {
    font-family: 'Material Icons';
    content: 'chevron_right';
    border: 0 none;
    width: auto;
    height: auto;
  }
  .scrollable-container {
    height: calc(100vh - 72px);
    overflow: auto;
    padding-top: 1px;

    .md-card {
      margin: 10px 0;
    }
  }
  .md-toolbar-section-center {
    justify-content: center;
    display: flex;
    align-items: center;
    flex: 1;
  }
  .modal-z-index {
    z-index: 5;
  }
  .large-z-index {
    z-index: 6;
    position: relative;
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
