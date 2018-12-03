<template>
  <div class="md-layout ">
    <div class="md-layout-item md-size-100">
      <md-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <h3 class="md-title">Invite co-producers to help you with this event</h3>
          </div>
          <div class="md-toolbar-section-end">
            <md-button class="md-just-icon md-simple md-toolbar-toggle">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </md-button>

            <div class="md-collapse">
              <md-list>
                <md-list-item to="#dashboard">
                  <i class="material-icons">add</i>
                  <p class="hidden-lg hidden-md">Invite</p>
                </md-list-item>
              </md-list>
            </div>
          </div>
        </div>
      </md-toolbar>
    </div>

    <div class="md-layout-item md-size-100">
      <md-card class="md-layout-item md-size-100 event-form-padding">
        <form @submit.prevent="validateEvent" class="md-layout">
          <md-card class="md-layout-item md-size-50 md-small-size-100">

            <md-field>
              <md-icon class="md-accent">home</md-icon>
              <label>Event Name</label>
              <md-input name="event-name" v-model="form.eventName" />
            </md-field>

            <md-field>
              <md-icon class="md-accent">local_bar</md-icon>
              <label>Occasion</label>
              <md-select v-model="form.occasion" name="event-occasion">
                <md-option value="new year">Option without group</md-option>

                <md-optgroup label="Group name 1">
                  <md-option value="birthday">Birthday</md-option>
                  <md-option value="new year">New Year</md-option>
                  <md-option value="other">Some another occasion</md-option>
                </md-optgroup>

                <md-optgroup label="Group name 2">
                  <md-option value="birthday">Option in group 2</md-option>
                </md-optgroup>
              </md-select>
            </md-field>

            <div style="display: flex;"> <!-- md-layout brokes the design -->
              <div class="md-layout-item md-small-size-100">
                <md-datepicker v-model="form.date" name="event-date">
                  <label>Date</label>
                </md-datepicker>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <md-icon class="md-accent">query_builder</md-icon>
                  <label>Time</label>
                  <md-select v-model="form.time" name="event-time">
                    <md-option value="00:00">00:00</md-option>
                    <md-option value="01:00">01:00</md-option>
                    <md-option value="02:00">02:00</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>

            <md-field>
              <md-icon class="md-accent">person</md-icon>
              <label>Number of Participants</label>
              <md-input name="event-participants" type="text" v-model="form.participants" />
            </md-field>

          </md-card>


          <div class="md-layout-item md-size-50 md-small-size-100">
            <div class="event-status-field">
              <md-field>
                <label>Status</label>
                <md-select v-model="form.status" name="event-status">
                  <md-option value="draft">Draft</md-option>
                  <md-option value="approved">Approved</md-option>
                  <md-option value="execution">Execution</md-option>
                  <md-option value="done">Done</md-option>
                </md-select>
              </md-field>
            </div>

            <chart-card
                header-animation="false"
                :chart-data="pieChart.data"
                :chart-options="pieChart.options"
                chart-type="Pie"
                header-icon
                chart-inside-content
                background-color="green">
              <template slot="footer">
                <div class="md-layout">
                  <div class="md-layout-item">
                    <i class="fa fa-circle text-info"></i> 23% Remaining
                    <i class="fa fa-circle text-danger"></i> $3100 Remaining Budget
                  </div>

                  <md-field>
                    <md-icon class="md-accent">attach_money</md-icon>
                    <label>Total Budget</label>
                    <md-input name="event-budget" type="text" v-model="form.budget" />
                  </md-field>
                </div>
              </template>
            </chart-card>
          </div>
        </form>
      </md-card>
    </div>
  </div>
</template>

<script>

  import {
    ChartCard,
  } from "@/components";

  export default {
    components: {
      ChartCard
    },
    data: () => ({
      form: {
        eventName: null,
        occasion: null,
        date: null,
        time: null,
        participants: null,
        status: null,
        budget: null,
      },
      pieChart: {
        data: {
          labels: [" ", " "], // should be empty to remove text from chart
          series: [23, 77]
        },
        options: {
          height: "230px"
        }
      }
    }),

    methods: {
      validateEvent () {
        return true;
      }
    }
  };
</script>

<style lang="scss">
  .event-status-field {
    position: absolute;
    right: 31px;
    top: -10px;
  }
  .event-form-padding {
    padding-top: 20px;
  }
  .md-datepicker .md-icon.md-theme-default.md-icon-image svg {
    fill: #ff5252;
  }
</style>
