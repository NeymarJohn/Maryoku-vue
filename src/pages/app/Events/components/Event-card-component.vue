<template>
  <div class="md-layout-item md-size-100">
    <md-card>
      <md-card-header class="md-card-header-icon md-card-header-green md-layout md-gutter">
        <div class="md-layout-item">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Space</h4>
        </div>

        <div class="md-layout-item" style="text-align: right;">
          <md-button class="md-just-icon md-simple" @click.native='showInspirations()'>
            <md-icon>reorder</md-icon>
          </md-button>
          <md-button class="md-just-icon md-simple md-danger" @click.native="showSwal()">
            <md-icon>delete</md-icon>
          </md-button>
        </div>

      </md-card-header>

      <md-card-content>
        <nav-tabs-card>
          <template slot="content">
            <md-tabs md-sync-route class="md-success" md-alignment="left">

              <!-- if it will some time left, could be replaced with one table component -->
              <md-tab id="tab-components" md-label="Component Properties" md-icon="settings">
                <md-table v-model="componentObject.values" table-header-color="green" v-if="componentObject.values.length">
                  <md-table-row slot="md-table-row"
                                v-for="(item, index) in componentObject.values"
                                :key="'component-' + index"
                                @click.native="showModalComponent({item}, index)">
                    <md-table-cell md-label="Vendor name">{{ item.name }}</md-table-cell>
                    <md-table-cell md-label="Value">{{ item.value }}</md-table-cell>
                    <md-table-cell md-label="Comment">{{ item.comment }}</md-table-cell>
                    <md-table-cell class="visible-on-hover">
                      <md-button class="md-just-icon md-simple md-danger" @click="showSwal($event)">
                        <md-icon>delete</md-icon>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
                <p class="text-danger text-center" v-if="!componentObject.values.length">
                  No records were added yet.
                </p>
                <md-button class="md-button md-block md-primary md-size-5 md-layout-item center-icon" @click.native='showModalComponent({}, null)'>
                  <i class="material-icons">add</i> Add
                </md-button>
              </md-tab>

              <md-tab id="tab-vendors" md-label="Vendors" md-icon="rv_hookup">
                <md-table v-model="componentObject.vendors" table-header-color="green" v-if="componentObject.vendors.length">
                  <md-table-row slot="md-table-row"
                                v-for="(item, index) in componentObject.vendors"
                                :key="'vendor-' + index"
                                @click.native="showModalVendors({item}, index)">
                    <md-table-cell md-label="Vendor Name">{{ item.vendorName }}</md-table-cell>
                    <md-table-cell md-label="Contact Person">{{ item.contactPerson }}</md-table-cell>
                    <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
                    <md-table-cell md-label="Phone">{{ item.phone }}</md-table-cell>
                    <md-table-cell md-label="Cost / Budget">{{ item.cost }}</md-table-cell>
                    <md-table-cell md-label="Proposal">{{ item.proposal }}</md-table-cell>
                    <md-table-cell class="visible-on-hover">
                      <md-button class="md-just-icon md-simple md-danger" @click="showSwal($event)">
                        <md-icon>delete</md-icon>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
                <p class="text-danger text-center" v-if="!componentObject.vendors.length">
                  No records were added yet.
                </p>
                <md-button class="md-button md-block md-primary md-size-5 md-layout-item center-icon" @click.native='showModalVendors({}, null)'>
                  <i class="material-icons">add</i> Add
                </md-button>
              </md-tab>

              <md-tab id="tab-todo" md-label="ToDo" md-icon="check_circle">
                <md-table table-header-color="green" v-if="componentObject.todos.length">
                  <event-todo-row v-for="(item, index) in componentObject.todos"
                                  :showModalTodo="showModalTodo"
                                  :showSwal="showSwal"
                                  :todoItem="item"
                                  :todoIndex="index"
                                  :key="'todo-' + index"></event-todo-row>
                </md-table>
                <p class="text-danger text-center" v-if="!componentObject.todos.length">
                  No records were added yet.
                </p>
                <md-button class="md-button md-block md-primary md-size-5 md-layout-item center-icon" @click="showModalTodo({}, null)">
                  <i class="material-icons">add</i> Add
                </md-button>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
      </md-card-content>
    </md-card>

    <event-modal-inspirations ref="inspirationsModal"></event-modal-inspirations>
    <event-modal-vendor ref="vendorsModal" :vendorItem="vendorItem" :componentIndex="componentIndex"></event-modal-vendor>
    <event-modal-components ref="componentsModal" :componentItem="componentItem" :componentItemIndex="componentItemIndex" :componentIndex="componentIndex"></event-modal-components>
    <event-modal-todo ref="todoModal" :todoItem="todoItem" :todoIndex="todoIndex" :componentIndex="componentIndex"></event-modal-todo>
  </div>
</template>

<script>

  import {
    NavTabsCard
  } from "@/components";
  import EventModalInspirations from './Event-modal-inspirations';
  import EventModalTodo from './Event-modal-todo';
  import EventModalVendor from './Event-modal-vendor';
  import EventModalComponents from './Event-modal-components';
  import EventTodoRow from './EventTodoRow.vue';
  import swal from "sweetalert2";
  import moment from 'moment';

  export default {
    components: {
      NavTabsCard,
      EventModalInspirations,
      EventModalTodo,
      EventModalVendor,
      EventModalComponents,
      EventTodoRow
    },
    props: {
      componentIndex: Number,
      componentObject: Object,
    },
    name: 'event-card-component',
    data: function() {
      return {
        vendorItem: null,
        vendorIndex: null,
        componentItem: null,
        componentItemIndex: null,
        todoItem: null,
        todoIndex: null,
      }
    },
    mounted() {
    },
    methods: {
      showInspirations() {
        this.$refs.inspirationsModal.toggleModal(true);
      },
      showModalVendors(item, index) {
        this.vendorItem = item;
        this.vendorIndex = index;
        this.$refs.vendorsModal.toggleModal(true);
      },
      showModalComponent(item, index) {
        this.componentItem = item;
        this.componentItemIndex = index;
        this.$refs.componentsModal.toggleModal(true);
      },
      showModalTodo(todo, index) {
        this.todoItem = todo;
        this.todoIndex = index;
        this.$refs.todoModal.toggleModal(true);
      },
      showSwal(e) {
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
            swal({
              title: "Deleted!",
              text: "This item has been deleted.",
              type: "success",
              confirmButtonClass: "md-button md-success",
              buttonsStyling: false
            });
          }
        });
      }
    },

    filters: {
      moment: function (date) {
        return moment(date).format('YYYY-MM-DD');
      }
    }
  }
</script>
<style lang="scss">
  .md-tabs-content table thead {
    display: table-header-group;
  }
  .md-tabs-navigation {
    overflow: auto;
    padding-left: 15px;
  }
  .center-icon.md-button {
    padding-left: 6px;
  }
  .text-center {
    text-align: center;
  }
  .md-table-row {
    .visible-on-hover .md-table-cell-container {
      text-align: right;
      opacity: 0;
      pointer-events: none;
      transition: opacity .3s ease;
    }

    &:hover {
      cursor: pointer;
      background: #eee;

      .visible-on-hover .md-table-cell-container {
        opacity: 1;
        pointer-events: all;
      }
    }
  }
</style>
