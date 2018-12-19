<template>
  <div class="md-layout margin-footer">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

    <div class="md-layout-item md-size-50 md-small-size-100 scrollable-container">
      <event-header-form :occasionOptions="occasionsArray"
                         :formData="formData"
                         v-bind:shouldUpdate="true"
                         :event="event"></event-header-form>
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
                              v-if="component && $store.state.vendorsList"
                              v-bind:shouldUpdate="true"
                              :componentObject="component"
                              :componentIndex="index"
                              :createVendor="createVendor"
                              :updateVendor="updateVendor"
                              :updateTodo="updateTodo"
                              :updateComponent="updateComponent"
                              :deleteVendor="deleteVendor"
                              :deleteTodo="deleteTodo"
                              :deleteComponentItem="deleteComponentItem"
                              :deleteComponent="deleteComponent"
                              :key="'event-card-component-' + index">

        </event-card-component>
      </time-line>
    </div>

  </div>
</template>

<script>

  import EventHeaderForm from './components/EventHeaderForm.vue';
  import EventCardComponent from './components/EventCardComponent.vue';
  import EventComponentVendor from '@/models/EventComponentVendor';
  import EventComponentTodo from '@/models/EventComponentTodo';
  import EventComponentValue from '@/models/EventComponentValue';
  import Calendar from '@/models/Calendar';
  import CalendarEvent from '@/models/CalendarEvent';
  import Occasion from '@/models/Occasion';
  import EventComponent from '@/models/EventComponent';
  import Vendors from '@/models/Vendors';
  import { mapGetters } from 'vuex'
  import moment from 'moment';
  import VueElementLoading from 'vue-element-loading';
  import Vue from 'vue';
  import { TimeLine, TimeLineItem } from "@/components";

  export default {
    components: {
      EventHeaderForm,
      EventCardComponent,
      VueElementLoading,
      TimeLine,
      TimeLineItem
    },
    data: () => ({
      responsive: false,
      calendarId: null,
      occasionsArray: null,
      componentsList: null,
      event: {},
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
      createTodo() {

      },
      createNewComponent(e, item) {
        this.$refs.dropdown.closeDropDown();
        e.stopPropagation();
        if (this.$store.state.eventData.components === null || !this.$store.state.eventData.components.length) {
          this.$store.state.eventData.components = [];
        }

        this.isLoading = true;
        let value = new EventComponent({ componentId: item.id, todos: [], values: [], vendors: [], calendarEvent: this.event.id }).for(this.calendar, this.event);
        value.save().then(result => {
          this.isLoading = false;
          this.$store.commit('updateComponent', result);
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        })
      },
      createVendor(component, subComponent) {

      },
      updateVendor(component, subComponent, updatedItemIndex) {
        this.isLoading = true;
        let componentIndex = this.$store.state.eventData.components.indexOf(component);
        let vendor = new EventComponentVendor(subComponent).for(this.calendar, this.event, new EventComponent(component));
        let vendorsArray = this.$store.state.eventData.components[componentIndex].vendors;
        let vendorItemIndex = updatedItemIndex ? updatedItemIndex : vendorsArray.length - 1;

        vendor.save().then(result => {
          this.isLoading = false;
          Vue.set(vendorsArray, vendorItemIndex, result);
          this.$store.commit('updateEventData', {index: componentIndex, data: this.$store.state.eventData.components[componentIndex]});
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        })
      },
      updateTodo(component, subComponent, updatedItemIndex) {
        this.isLoading = true;
        let componentIndex = this.$store.state.eventData.components.indexOf(component);
        let todo = new EventComponentTodo(subComponent).for(this.calendar, this.event, new EventComponent(component));
        let todosArray = this.$store.state.eventData.components[componentIndex].todos;
        let todoItemIndex = updatedItemIndex ? updatedItemIndex : todosArray.length - 1;

        todo.save().then(result => {
          this.isLoading = false;
          Vue.set(todosArray, todoItemIndex, result);
          this.$store.commit('updateEventData', {index: componentIndex, data: this.$store.state.eventData.components[componentIndex]});
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        })
      },
      updateComponent(component, subComponent, updatedItemIndex) {
        this.isLoading = true;
        let componentIndex = this.$store.state.eventData.components.indexOf(component);
        let value = new EventComponentValue(subComponent).for(this.calendar, this.event, new EventComponent(component));
        let componentsArray = this.$store.state.eventData.components[componentIndex].values;
        let componentItemIndex = updatedItemIndex ? updatedItemIndex : componentsArray.length - 1;

        value.save().then(result => {
          this.isLoading = false;
          Vue.set(componentsArray, componentItemIndex, result);
          this.$store.commit('updateEventData', {index: componentIndex, data: this.$store.state.eventData.components[componentIndex]});
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        })
      },
      deleteVendor(component, subComponent) {
        this.isLoading = true;
        let vendor = new EventComponentVendor(subComponent).for(this.calendar, this.event, new EventComponent(component));
        vendor.delete().then(result => {
          this.isLoading = false;
        }).catch(() => {
          this.isLoading = false;
        })
      },
      deleteTodo(component, subComponent) {
        this.isLoading = true;
        let todo = new EventComponentTodo(subComponent).for(this.calendar, this.event, new EventComponent(component));
        todo.delete().then(result => {
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        })
      },
      deleteComponentItem(component, subComponent) {
        this.isLoading = true;
        let value = new EventComponentValue(subComponent).for(this.calendar, this.event, new EventComponent(component));
        value.delete().then(result => {
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        })
      },
      deleteComponent(component) {
        this.isLoading = true;
        let value = new EventComponent(component).for(this.calendar, this.event);
        value.delete().then(result => {
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
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
    mounted() {
      this.onResponsiveInverted();
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
      let calendar = Calendar.get().then(calendars => {
        if(calendars.length === 0 ) {
          return;
        }
        this.calendar = calendars[0];
        calendars[0].calendarEvents().find(this.$route.params.id).then(event => {
          this.$store.state.eventData.components = event.components;
          this.event = event;
          this.formData = {
            eventName: event.title,
            occasion: event.occasion,
            date: new Date(event.eventStartMillis),
            time: moment(event.eventStartMillis).format('HH:00'),
            duration: moment(event.eventEndMillis).diff(event.eventStartMillis, 'hours'),
            participants: event.numberOfParticipants,
            status: event.status,
            budget: event.totalBudget,
            location: event.location
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
      });
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

      Promise.all([vendors, components, occasions, calendar]).then(() => {
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
  .left-offset {
    margin-left: 30px;
    margin-bottom: -23px;
  }
  .dropdown-menu .dropdown-menu {
    min-width: 182px;
  }
  .margin-footer {
    margin-bottom: 50px;
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
  .scrollable-container {
    height: calc(100vh - 72px);
    overflow: auto;
    padding-top: 1px;
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
