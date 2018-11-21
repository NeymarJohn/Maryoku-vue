<template>
  <div class="md-layout ">
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Upcoming Events
            <div class="pull-right">
              <md-button class="md-success text-info md-sm">
                <md-icon>add_circle</md-icon>
                Create New Event
              </md-button>
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
          <md-table v-model="eventsRecords" table-header-color="green" class="table-striped table-hover">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Event Name">{{ item.name }}</md-table-cell>
              <md-table-cell md-label="Occasion">{{ item.occasion }}</md-table-cell>
              <md-table-cell md-label="Date">{{ item.date }}</md-table-cell>
              <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
      </md-card>
    </div>

    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
      <div class="header text-center">
        <h4 class="title">Recent Events</h4>
      </div>
    </div>

    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
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
          <a href="#pablo">Day on the beach &middot; Celebrating "Project Milestone"</a>
        </h4>
        <div slot="description" class="card-description">
          July 1st, 2018
        </div>
        <template slot="footer">
          <div class="price">
            <h4>76 Guests &middot; 7 hours</h4>
          </div>
          <div class="stats">
            <p class="category">
              <md-icon>place</md-icon>
              Gordon Beach, Tel Aviv
            </p>
          </div>
        </template>
      </product-card>
    </div>
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
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
          <a href="#pablo">Day on the beach &middot; Celebrating "Project Milestone"</a>
        </h4>
        <div slot="description" class="card-description">
          July 1st, 2018
        </div>
        <template slot="footer">
          <div class="price">
            <h4>76 Guests &middot; 7 hours</h4>
          </div>
          <div class="stats">
            <p class="category">
              <md-icon>place</md-icon>
              Gordon Beach, Tel Aviv
            </p>
          </div>
        </template>
      </product-card>
    </div>
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
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
          <a href="#pablo">Day on the beach &middot; Celebrating "Project Milestone"</a>
        </h4>
        <div slot="description" class="card-description">
          July 1st, 2018
        </div>
        <template slot="footer">
          <div class="price">
            <h4>76 Guests &middot; 7 hours</h4>
          </div>
          <div class="stats">
            <p class="category">
              <md-icon>place</md-icon>
              Gordon Beach, Tel Aviv
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

  export default {
    components: {
      Tabs,
      ProductCard
    },
    data() {
      return {
        product3: "static/img/shutterstock_289440710.png",
        eventsRecords: [
          {
            id: 1,
            name: "Company Event",
            occasion: "Summer Event",
            date: "15 Dec, 2018",
            status: "Draft"
          },
        ]
      };
    }
  };
</script>
