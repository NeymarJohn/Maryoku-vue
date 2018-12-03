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
                    <i class="fa fa-circle text-info"></i> Remaining Budget 23% ($3100)
                  </div>
                  <div class="md-layout-item">
                    <i class="fa fa-circle text-danger"></i> Spent Budget 77% ($10395)
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

    <div class="md-layout-item md-size-100">
      <md-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <drop-down direction="down" multiLevel>
              <md-button slot="title" class="md-button md-block dropdown-toggle" data-toggle="dropdown">
                <i class="material-icons">add</i> Add Component
              </md-button>
              <ul class="dropdown-menu" :class="{'dropdown-menu-right': responsive}">
                <li><a href="#">Component name </a></li>
                <li><a href="#">Another component</a></li>
                <li>
                  <a class="dropdown-toggle" :class="{'open': multiLevel}" @click="toggleMultiLevel">Group of components</a>
                  <ul class="dropdown-menu">
                    <li><a href="#">Some subcomponent</a></li>
                    <li><a href="#">Something else</a></li>
                    <li>
                      <a class="dropdown-toggle" :class="{'open': multiLevel2}" @click="toggleMultiLevel2()">SubSubComponent</a>
                      <ul class="dropdown-menu" :class="{'dropdown-menu-right': responsive}">
                        <li><a href="#">Subsubmenu action 1</a></li>
                        <li><a href="#">Subsubmenu action 2</a></li>
                      </ul>
                    </li>
                  </ul>
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

    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green md-layout md-gutter">
          <div class="md-layout-item">
            <div class="card-icon">
              <md-icon>assignment</md-icon>
            </div>
            <h4 class="title">SPACE</h4>
          </div>

          <div class="md-layout-item" style="text-align: right;">
            <md-button class="md-just-icon md-simple md-danger md-align-right">
              <md-icon>delete</md-icon>
            </md-button>
          </div>

        </md-card-header>

        <md-card-content>

          <md-field class="md-layout-item md-size-25">
            <label>Value</label>
            <md-select>
              <md-option value="new year">Some option 1</md-option>

              <md-optgroup label="Group name 1">
                <md-option value="birthday">Some option 2</md-option>
                <md-option value="new year">Some option 3</md-option>
                <md-option value="other">Some option 4</md-option>
              </md-optgroup>

              <md-optgroup label="Group name 2">
                <md-option value="birthday">Some option 5</md-option>
              </md-optgroup>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label>Special requests, constraints, needs</label>
            <md-textarea md-autogrow></md-textarea>
          </md-field>

          <nav-tabs-card>
            <template slot="content">
              <md-tabs md-sync-route class="md-success" md-alignment="left">

                <md-tab id="tab-properties" md-label="Component Properties" md-icon="settings">
                  <md-table v-model="componentProperties" table-header-color="green">
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                      <md-table-cell md-label="Property name">{{ item.name }}</md-table-cell>
                      <md-table-cell md-label="Value">{{ item.value }}</md-table-cell>
                      <md-table-cell md-label="Comment">{{ item.comment }}</md-table-cell>
                      <md-table-cell style="text-align: right;">
                        <md-button class="md-just-icon md-simple md-danger">
                          <md-icon>delete</md-icon>
                        </md-button>
                      </md-table-cell>
                    </md-table-row>
                  </md-table>
                  <md-button class="md-button md-block md-primary md-size-5 md-layout-item">
                    <i class="material-icons">add</i> Add
                  </md-button>
                </md-tab>

                <md-tab id="tab-suppliers" md-label="Optional Suppliers" md-icon="rv_hookup">
                  <md-table v-model="optionalSuppliers" table-header-color="green">
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                      <md-table-cell md-label="Supplier Name">{{ item.supplierName }}</md-table-cell>
                      <md-table-cell md-label="Contact Person">{{ item.contactPerson }}</md-table-cell>
                      <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
                      <md-table-cell md-label="Phone">{{ item.phone }}</md-table-cell>
                      <md-table-cell md-label="Cost / Budget">{{ item.cost }}</md-table-cell>
                      <md-table-cell md-label="Proposal">{{ item.proposal }}</md-table-cell>
                      <md-table-cell style="text-align: right;">
                        <md-button class="md-just-icon md-simple md-danger">
                          <md-icon>delete</md-icon>
                        </md-button>
                      </md-table-cell>
                    </md-table-row>
                  </md-table>
                  <md-button class="md-button md-block md-primary md-size-5 md-layout-item">
                    <i class="material-icons">add</i> Add
                  </md-button>
                </md-tab>

                <md-tab id="tab-posts" md-label="ToDo" md-icon="check_circle">
                  <md-table v-model="toDo" table-header-color="green">
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                      <md-table-cell md-label="What">{{ item.what }}</md-table-cell>
                      <md-table-cell md-label="Due Date">{{ item.dueDate }}</md-table-cell>
                      <md-table-cell md-label="Assign To">{{ item.assignTo }}</md-table-cell>
                      <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
                      <md-table-cell style="text-align: right;">
                        <md-button class="md-just-icon md-simple md-danger">
                          <md-icon>delete</md-icon>
                        </md-button>
                      </md-table-cell>
                    </md-table-row>
                  </md-table>
                  <md-button class="md-button md-block md-primary md-size-5 md-layout-item">
                    <i class="material-icons">add</i> Add
                  </md-button>
                </md-tab>
              </md-tabs>
            </template>
          </nav-tabs-card>
        </md-card-content>
      </md-card>



    </div>

  </div>
</template>

<script>

  import {
    ChartCard,
    NavTabsCard
  } from "@/components";

  export default {
    components: {
      ChartCard,
      NavTabsCard
    },
    data: () => ({
      responsive: false,
      multiLevel: false,
      multiLevel2: false,
      selected: [],
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
      },
      optionalSuppliers: [
        {
          supplierName: 'Angelo&Nina' ,
          contactPerson: 'Eyal',
          email: 'angelonona@gmail.com',
          phone: '12345667',
          cost: '$2000',
          proposal: 'n/a'
        },
        {
          supplierName: 'Nur' ,
          contactPerson: 'Michal',
          email: 'michal@nur.com',
          phone: '3321312346',
          cost: '$7000',
          proposal: 'n/a'
        }
      ],
      componentProperties: [
        {
          name: 'Property name 1',
          value: 'Some value 1',
          comment: 'Some commentary'
        },
        {
          name: 'Property name 2',
          value: 'Some value 2',
          comment: 'Another commentary'
        }
      ],
      toDo: [
        {
          what: 'Negotiate Price',
          dueDate: '12/12/2018',
          assignTo: 'Rotem Sela',
          status: 'New'
        },
        {
          what: 'Something',
          dueDate: '11/05/2019',
          assignTo: 'Some person',
          status: 'In Work'
        },
      ]
    }),

    methods: {
      validateEvent () {
        return true;
      },
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
    },
    mounted() {
      this.onResponsiveInverted();
      window.addEventListener("resize", this.onResponsiveInverted);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.onResponsiveInverted);
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
  .dropdown .dropdown-menu .dropdown-menu {
    left: 102%;
  }
  .md-tabs-content table thead {
    display: table-header-group;
  }
  .md-tabs-navigation {
    overflow: auto;
    padding-left: 15px;
  }
  .dropdown-menu .open + .dropdown-menu {
    min-width: 182px;
  }
</style>
