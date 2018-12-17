<template>
  <div class="md-layout-item md-size-100">

    <md-card>
      <md-card-header class="md-card-header-icon md-card-header-green md-layout md-gutter">
        <div class="md-layout-item">
          <h4 class="title">{{ componentTitle }}</h4>
        </div>

        <div class="md-layout-item" style="text-align: right;">
          <md-button class="md-just-icon md-simple" @click.native='showInspirations()' v-if="!readonly && componentObject.id">
            <md-icon>reorder</md-icon>
          </md-button>
          <md-button class="md-raised md-primary md-icon-button delete-button--small" @click.native="showSwalComponent()" v-if="!readonly">
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
                <md-table v-model="componentObject.values" table-header-color="green" v-if="componentObject.values.length" :class="readonly ? 'readonly': ''">
                  <md-table-row>
                    <md-table-head>Vendor name</md-table-head>
                    <md-table-head>Value</md-table-head>
                    <md-table-head>Comment</md-table-head>
                    <md-table-head></md-table-head>
                  </md-table-row>
                  <md-table-row slot="md-table-row"
                                v-for="(item, index) in componentObject.values"
                                v-if="item !== null"
                                :key="'component-' + index"
                                @click.native="showModalComponent(item, index)">
                    <md-table-cell>{{ item.title }}</md-table-cell>
                    <md-table-cell>{{ item.value }}</md-table-cell>
                    <md-table-cell>{{ item.comment }}</md-table-cell>
                    <md-table-cell class="visible-on-hover">
                      <md-button class="md-raised md-primary md-icon-button" @click="showSwalItems($event, index, 'values')" v-if="!readonly">
                        <md-icon>delete</md-icon>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
                <p class="text-danger text-center" v-if="!componentObject.values.length">
                  No records were added yet.
                </p>
                <md-button class="md-button md-block md-primary md-size-10 md-layout-item center-icon" @click.native='showModalComponent({}, null)' v-if="!readonly">
                  <i class="material-icons">add</i> Add
                </md-button>
              </md-tab>

              <md-tab id="tab-vendors" md-label="Vendors" md-icon="rv_hookup">
                <md-table v-model="vendorsObjectsArray" table-header-color="green" v-if="vendorsObjectsArray.length" :class="readonly ? 'readonly': ''">
                  <md-table-row>
                    <md-table-head>Vendor Name</md-table-head>
                    <md-table-head>Contact Person</md-table-head>
                    <md-table-head>Email</md-table-head>
                    <md-table-head>Phone</md-table-head>
                    <md-table-head>Cost / Budget</md-table-head>
                    <md-table-head></md-table-head>
                  </md-table-row>
                  <md-table-row slot="md-table-row"
                                v-for="(item, index) in vendorsObjectsArray"
                                v-if="item !== null"
                                :key="'vendor-' + index"
                                @click.native="showModalVendors(item, index)">
                    <md-table-cell>{{ item.vendorDisplayName }}</md-table-cell>
                    <md-table-cell>{{ item.contactPerson }}</md-table-cell>
                    <md-table-cell>{{ item.vendorMainEmail }}</md-table-cell>
                    <md-table-cell>{{ item.vendorMainPhoneNumber }}</md-table-cell>
                    <md-table-cell>{{ item.cost }}</md-table-cell>
                    <md-table-cell class="visible-on-hover">
                      <md-button class="md-raised md-primary md-icon-button" @click="showSwalItems($event, index, 'vendors')" v-if="!readonly">
                        <md-icon>delete</md-icon>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
                <p class="text-danger text-center" v-if="!componentObject.vendors.length">
                  No records were added yet.
                </p>
                <md-button class="md-button md-block md-primary md-size-10 md-layout-item center-icon" @click.native='showModalVendors({}, null)' v-if="!readonly">
                  <i class="material-icons">add</i> Add
                </md-button>
              </md-tab>

              <md-tab id="tab-todo" md-label="ToDo" md-icon="check_circle">
                <md-table table-header-color="green" v-if="componentObject.todos.length" :class="readonly ? 'readonly': ''">
                  <md-table-row>
                    <md-table-head>What</md-table-head>
                    <md-table-head>Due Date</md-table-head>
                    <md-table-head>Assign To</md-table-head>
                    <md-table-head>Status</md-table-head>
                    <md-table-head></md-table-head>
                  </md-table-row>
                  <event-todo-row v-for="(item, index) in componentObject.todos"
                                  v-if="item !== null"
                                  :showModalTodo="showModalTodo"
                                  :showSwal="showSwalItems"
                                  :todoItem="item"
                                  :todoIndex="index"
                                  :key="'todo-' + index"></event-todo-row>
                </md-table>
                <p class="text-danger text-center" v-if="!componentObject.todos.length">
                  No records were added yet.
                </p>
                <md-button class="md-button md-block md-primary md-size-10 md-layout-item center-icon" @click="showModalTodo({}, null)" v-if="!readonly">
                  <i class="material-icons">add</i> Add
                </md-button>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
      </md-card-content>
    </md-card>

    <event-modal-inspirations ref="inspirationsModal" v-if="componentObject.id"></event-modal-inspirations>
    <event-modal-vendor ref="vendorsModal"
                        :v-bind:readonly="$props.readonly"
                        :vendorItem="vendorItem"
                        :vendorIndex="vendorIndex"
                        v-bind:shouldUpdate="$props.shouldUpdate"
                        :createVendor="$props.createVendor"
                        :updateVendor="$props.updateVendor"
                        :componentIndex="componentIndex"></event-modal-vendor>
    <event-modal-components ref="componentsModal"
                            :v-bind:readonly="$props.readonly"
                            :componentItem="componentItem"
                            :componentItemIndex="componentItemIndex"
                            :componentId="componentObject.id"
                            :shouldUpdate="$props.shouldUpdate"
                            :updateComponent="$props.updateComponent"
                            :componentIndex="componentIndex"></event-modal-components>
    <event-modal-todo ref="todoModal" 
                      :todoItem="todoItem"
                      :todoIndex="todoIndex"
                      v-bind:shouldUpdate="$props.shouldUpdate"
                      :v-bind:readonly="$props.readonly"
                      :updateTodo="$props.updateTodo"
                      :componentIndex="componentIndex"></event-modal-todo>
  </div>
</template>

<script>

  import {
    NavTabsCard
  } from "@/components";
  import EventModalInspirations from './EventInspirationsModal';
  import EventModalTodo from './EventTodoModal';
  import EventModalVendor from './EventVendorModal';
  import EventModalComponents from './EventComponentsModal';
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
      readonly: Boolean,
      shouldUpdate: Boolean,
      createVendor: Function,
      updateVendor: Function,
      updateComponent: Function,
      updateTodo: Function,
      deleteVendor: Function,
      deleteTodo: Function,
      deleteComponentItem: Function,
      deleteComponent: Function,
    },
    name: 'event-card-component',
    data: function() {
      return {
        vendorsObjectsArray: [],
        vendorItem: null,
        vendorIndex: null,
        componentItem: null,
        componentItemIndex: null,
        todoItem: null,
        todoIndex: null
      }
    },
    mounted() {
      this.getVendorObjectsArray();
    },
    computed: {
      componentTitle() {
        let componentId = this.componentObject.componentId;
        let o = {};

        this.$store.state.componentsList.some(function(val) {
          if (val.id === componentId) {
            return o = val;
          } else if (val.childComponents) {
            return o = val.childComponents.find(x => x.id === componentId);
          }
        });

        return o ? o.value || o.title : '';
      }
    },
    watch: {
      componentObject: {
        handler: function(before, after) {
          this.getVendorObjectsArray();
        },
        deep: true,
      }
    },
    methods: {
      getVendorObjectsArray() {
        let _this = this;
        this.vendorsObjectsArray = [];
        if (this.componentObject) {
          this.componentObject.vendors.forEach(function (vendorItem) {
            let vendorObj = Object.assign({}, _this.$store.state.vendorsList.find((val) => val.id === vendorItem.vendorId));
            vendorObj.cost = vendorItem.cost;
            vendorObj.vendorItemId = vendorItem.id;

            _this.vendorsObjectsArray.push(vendorObj);
          });
        }
      },

      showInspirations() {
        this.$refs.inspirationsModal.toggleModal(true);
      },
      showModalVendors(item, index) {
        if (!this.readonly) {
          this.vendorItem = item;
          this.vendorIndex = index;
          this.$refs.vendorsModal.toggleModal(true);
        }
      },
      showModalComponent(item, index) {
        if (!this.readonly) {
          this.componentItem = item;
          this.componentItemIndex = index;
          this.$refs.componentsModal.toggleModal(true);
        }
      },
      showModalTodo(todo, index) {
        if (!this.readonly) {
          this.todoItem = todo;
          this.todoIndex = index;
          this.$refs.todoModal.toggleModal(true);
        }
      },
      showSwalItems(e, itemIndex, arrayTitle) {
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
            let store = this.$store.state.eventData.components[this.componentIndex];

            if (this.shouldUpdate) {
              switch(arrayTitle) {
                case 'vendors':
                  this.$props.deleteVendor(store, {id: store.vendors[itemIndex].id})
                  break;
                case 'todos':
                  this.$props.deleteTodo(store, {id: store.todos[itemIndex].id})
                  break;
                case 'values':
                  this.$props.deleteComponentItem(store, {id: store.values[itemIndex].id})
                  break;
                default:
                  break;
              }
            }
            this.$store.commit('removeSubComponent', {component: this.componentIndex, type: arrayTitle, item: itemIndex});
          }
        });
      },
      showSwalComponent() {
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

            if (this.shouldUpdate) {
              this.$props.deleteComponent(this.componentObject);
            }
            this.$store.commit('removeComponent', {index: this.componentIndex});
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
    pointer-events: all;
  }
  .center-icon.md-button {
    padding-left: 6px;
  }
  .md-table.readonly {
    pointer-events: none;
  }
  .text-center {
    text-align: center;
  }
  .md-table .md-table-row {
    .visible-on-hover .md-table-cell-container {
      text-align: right;
      opacity: 0;
      pointer-events: none;
      transition: opacity .3s ease;
    }

    &:hover {
      .md-table-cell {
        cursor: pointer;
        background: #eee !important;
      }
      .visible-on-hover .md-table-cell-container {
        opacity: 1;
        pointer-events: all;
      }
    }
  }
  .delete-button--small {
    margin-right: 15px !important;
    margin-top: 6px !important;
    width: 27px;
    height: 27px;
    min-width: 27px;
  }

</style>
