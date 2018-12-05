<template>
  <div class="md-layout ">
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-rose">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Upcoming Events
            <div class="pull-right">
              <router-link to="/events/modify">
                <md-button class="md-rose text-info md-sm" >
                  <md-icon>add_circle</md-icon>
                  Create New Event
                </md-button>
              </router-link>
            </div>
          </h4>
        </md-card-header>
        <md-card-content>
          <!--<div class="table table-stats text-right">
            <div class="text-right">
              <md-button class="md-success text-info">
                <md-icon>add_circle</md-icon>
                Create New Event
              </md-button>
            </div>
          </div>-->
          <router-link to="/events/modify">
            <md-table v-model="upcomingEvents" table-header-color="rose" class="table-striped table-hover">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Event Name">{{ item.title }}</md-table-cell>
                <md-table-cell md-label="Occasion">{{ item.occasion }}</md-table-cell>
                <md-table-cell md-label="Date">{{ item.date }}</md-table-cell>
                <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
              </md-table-row>
            </md-table>
          </router-link>
        </md-card-content>
      </md-card>
    </div>

    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
      <div class="header text-center">
        <h4 class="title">Recent Events</h4>
      </div>
    </div>

    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      v-for="event of recentEvents"
      :key="event.id"
    >
      <product-card
        header-animation="true">
        <img class="img" slot="imageHeader" :src="product3">
        <md-icon slot="fixed-button">build</md-icon>
        <template slot="first-button">
          <md-icon>photo_library</md-icon>
          <md-tooltip md-direction="bottom">Browse Gallery (45 Photos)</md-tooltip>
        </template>
        <template slot="second-button">
          <md-icon >share</md-icon>
          <md-tooltip md-direction="bottom">Share to Inspire</md-tooltip>
        </template>
        <template slot="third-button">
          <md-icon >folder_open</md-icon>
          <md-tooltip md-direction="bottom">Tour the Event</md-tooltip>
        </template>
        <h4 slot="title" class="title">
          <a href="#pablo">{{ event.title }}</a>
        </h4>
        <div slot="description" class="card-description">
          July 1st, 2018
        </div>
        <template slot="footer">
          <div class="price">
            <h4>{{event.numberOfParticipants}} Guests &middot; 7 hours</h4>
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

  export default {
    components: {
      Tabs,
      ProductCard,
    },
    mounted() {
      Calendar.get().then(calendars => {
        if (calendars.length === 0) {
          return;
        }
        calendars[0].calendarEvents().get().then(events => {
          this.upcomingEvents = events.reduce(function(result, element) {
            if (element.status.toLowerCase() !== 'done') {
              console.log(element);
              result.push(element);
            }
            return result;
          }, []);
          this.recentEvents = events.reduce(function(result, element) {
            if (element.status.toLowerCase() === 'done') {
              result.push(element);
            }
            return result;
          }, []);
        })
      })
      return true;
    },
    data() {
      return {
        product3: "static/img/shutterstock_289440710.png",
        recentEvents: [],
        upcomingEvents: []
      };
    }
  };
</script>
