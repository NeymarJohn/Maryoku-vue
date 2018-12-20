<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>

    <div class="md-layout-item md-size-100 text-right">
      <md-button class="md-rose text-success" @click="routeToNewEvent()">
        <md-icon>add_circle</md-icon>
        Create New Event
      </md-button>
    </div>
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-rose">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Upcoming Events</h4>
        </md-card-header>
        <md-card-content>
          <md-table v-model="upcomingEvents" table-header-color="rose" class="table-striped table-hover right-align-actions" v-if="upcomingEvents.length">
            <md-table-row slot="md-table-row" slot-scope="{ item }" @click="routeToEvent(item.id, $event)" class="hover-row">
              <md-table-cell md-label="Event Name">{{ item.title }}</md-table-cell>
              <md-table-cell md-label="Occasion">{{ item.occasion }}</md-table-cell>
              <md-table-cell md-label="Date">{{ item.eventStartMillis | moment }}</md-table-cell>
              <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
              <md-table-cell md-label="Actions">
                <!--<md-button @click="viewEvent(item)" class="md-raised md-info md-icon-button">
                  <md-icon>visibility</md-icon>
                </md-button>-->
                <md-button @click="editEvent($event, item)" class="md-raised md-info md-icon-button">
                  <md-icon>edit</md-icon>
                </md-button>
                <md-button @click="showDeleteAlert($event, item)" class="md-raised md-primary md-icon-button">
                  <md-icon>delete</md-icon>
                </md-button>

               <!-- <div class="float-right"><md-icon>share</md-icon></div>-->
              </md-table-cell>
            </md-table-row>
          </md-table>
          <div class="empty-table text-danger text-center" v-else>
            No events yet,
            <span class="text-link" @click="routeToNewEvent()">
              create one now
            </span>
          </div>

        </md-card-content>
      </md-card>
    </div>

    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" v-if="recentEvents.length">
      <div class="header text-center">
        <h4 class="title">Recent Events</h4>
      </div>
    </div>

    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33 card-link"
      v-for="event in recentEvents"
      :key="event.id"
      @click="routeToEvent(event.id)">

      <product-card header-animation="true">
        <img class="img" slot="imageHeader" :src="imageHref(event.coverImage)">


        <h4 slot="title" class="title">
          <a @click="routeToEvent(event.id)">{{ event.title }}</a>
        </h4>
        <div slot="description" class="card-description">
          {{ event.eventStartMillis | moment }}
        </div>
        <template slot="footer">
          <div class="price">
            <h4>{{event.numberOfParticipants}} Guests &middot; {{duration(event)}} hours</h4>
          </div>
          <div class="stats">
            <p class="category">
              <md-icon>place</md-icon>
              {{ event.location }}
            </p>
          </div>
        </template>
      </product-card>
    </div>
  </div>
</template>

<script>

  import {
    Tabs,
    ProductCard
  } from "@/components";

  import Calendar from '../../../models/Calendar';
  import moment from 'moment';
  import VueElementLoading from 'vue-element-loading';
  import swal from "sweetalert2";

  export default {
    components: {
      Tabs,
      ProductCard,
      VueElementLoading
    },
    mounted() {
      if (this.$store.state.calendarId === null) {
        Calendar.get().then(calendars => {
          if (calendars.length === 0) {
            return;
          }
          this.$store.state.calendarId = calendars[0].id;

          this.getCalendarEvents();
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
      } else {
        this.getCalendarEvents();
      }
    },
    data() {
      return {
        product3: "static/img/shutterstock_289440710.png",
        recentEvents: [],
        upcomingEvents: [],
        isLoading: true,
      };
    },

    methods: {
      getCalendarEvents() {
        let _calendar = new Calendar({id: this.$store.state.calendarId});

        _calendar.calendarEvents().get().then(events => {
          this.upcomingEvents = events.reduce(function (result, element) {
            if (element.status.toLowerCase() !== 'done') {
              result.push(element);
            }
            return result;
          }, []);
          this.recentEvents = events.reduce(function (result, element) {
            if (element.status.toLowerCase() === 'done') {
              result.push(element);
            }
            return result;
          }, []);

          this.isLoading = false;
        })
          .catch((error) => {
            console.log(error);
            this.isLoading = false;
          });
      },
      showDeleteAlert(e, ev) {
        const _this = this;
        e.stopPropagation();
        swal({
          title: "Are you sure?",
          text: `You won't be able to revert this!`,
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "md-button md-success",
          cancelButtonClass: "md-button md-danger",
          confirmButtonText: "Yes, delete it!",
          buttonsStyling: false
        }).then(result => {
          if (result.value) {
            _this.isLoading = true;
            let event = _this.upcomingEvents.find((e) => { return e.id === ev.id })
            ev.delete().then(result => {
              _this.upcomingEvents.splice(this.upcomingEvents.indexOf(event), 1)
              _this.isLoading = false;
            }).catch(() => {
              _this.isLoading = false;
            })
          }
        });
      },
      editEvent(ev, event) {
        if (ev.target.tagName === 'I') {
          ev.stopPropagation();
          this.$router.push(`/events/${event.id}/edit`)
        }
      },
      viewEvent(event) {
        this.$router.push(`/events/${event.id}`)
      },
      imageHref(image) {
        return image && image.href ? `${process.env.SERVER_URL}${image.href}` : this.product3;
      },
      duration(event) {
        return (event.eventEndMillis - event.eventStartMillis) / 3600000
      },
      routeToEvent(eventId) {
        this.$router.push({ path: `/events/${eventId}/edit` });
      },
      routeToNewEvent() {
        this.$store.state.eventData = {
          id: null,
          calendar: {id: null},
          title: null,
          eventStartMillis: null,
          eventEndMillis: null,
          eventType: null,
          numberOfParticipants: null,
          totalBudget: null,
          status: null,
          components: null,
        },
        this.$router.push({ path: `/events/new` });
      }
    },
    filters: {
      moment: function (date) {
        return moment(date).format('MMMM Do, GGGG');
      }
    }
  };
</script>

<style lang="scss">
  .card-link .md-card {
    cursor: pointer;
  }

  .float-right {
    float: right;
  }

  .hover-row:hover {
    cursor: pointer;
  }
  .right-align-actions {
    .md-table-cell:last-child, .md-table-head:last-child {
      text-align: right;
    }
  }
  .text-link {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
