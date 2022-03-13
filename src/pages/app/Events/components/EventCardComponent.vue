<template>
  <time-line-item inverted badge-type="danger" :badge-icon="findIcon(componentObject)" class="components-timeline">
    <!--<div slot="header">
      <div class="component-header">
        <h3 class="title" style="font-weight: bold;">{{ componentTitle }}</h3>
        <div class="actions-wrapper">
          <md-button class="md-just-icon md-simple" @click.native='showInspirations()' v-if="!readonly && componentObject.id">
            <md-icon>reorder</md-icon>
          </md-button>
          <md-button class="md-just-icon md-simple" @click.native="showSwalComponent()" v-if="!readonly">
            <md-icon>close</md-icon>
          </md-button>
        </div>
      </div>
    </div>-->
    <event-tabs
      slot="header"
      color-button="rose"
      :tab-name="['Requirements', 'Vendors', 'Todo']"
      :component-title="componentTitle"
      :readonly="readonly"
      :show-inspirations="showInspirations"
      :component-object-id="componentObject.id"
      :show-swal-component="showSwalComponent"
    >
      <template slot="tab-pane-1">
        <div class="md-layout">
          <div class="md-layout-item md-size-5" style="margin: 0; padding: 0">
            <md-button
              v-if="!readonly && componentObject.values.length"
              class="md-icon-button md-info md-fab md-round"
              style="height: 24px; width: 24px; min-width: 24px; min-height: 24px; line-height: 24px"
              @click.native="showModalComponent({}, null)"
            >
              <i class="material-icons">add</i>
            </md-button>
          </div>
          <div class="md-layout-item md-size-95" style="padding: 0">
            <md-table
              v-if="componentObject.values.length"
              v-model="componentObject.values"
              table-header-color="green"
              class="components-table"
              :class="readonly ? 'readonly' : ''"
            >
              <md-table-row>
                <md-table-head>Requirement</md-table-head>
                <md-table-head>Value</md-table-head>
                <!--<md-table-head>Comment</md-table-head>-->
                <md-table-head />
              </md-table-row>

              <md-table-row
                v-for="(item, index) in componentObject.values"
                v-if="item !== null"
                slot="md-table-row"
                :key="'component-' + index"
                @click.native="showModalComponent(item, index)"
              >
                <md-table-cell>{{ item.title }}</md-table-cell>
                <md-table-cell>{{ item.value }}</md-table-cell>
                <!--<md-table-cell>{{ item.comment }}</md-table-cell>-->
                <md-table-cell class="visible-on-hover">
                  <md-button
                    v-if="!readonly"
                    class="md-raised md-primary md-icon-button"
                    @click="showSwalItems($event, index, 'values')"
                  >
                    <md-icon>delete</md-icon>
                  </md-button>
                </md-table-cell>
                <md-tooltip v-if="item.comment">
                  {{ item.comment }}
                </md-tooltip>
              </md-table-row>
            </md-table>
          </div>
        </div>
        <p v-if="!componentObject.values.length" class="text-danger text-center">
          <a v-if="!readonly" class="text-danger text-center link-underscored" @click="showModalComponent({}, null)">Add requirements for <strong>{{ componentObject.componentId }}</strong></a>
        </p>
      </template>

      <template slot="tab-pane-2">
        <div class="md-layout">
          <div class="md-layout-item md-size-5" style="margin: 0; padding: 0">
            <md-button
              v-if="!readonly && vendorsObjectsArray.length"
              class="md-icon-button md-info md-fab md-round"
              style="height: 24px; width: 24px; min-width: 24px; min-height: 24px; line-height: 24px"
              @click.native="showModalVendors({}, null)"
            >
              <i class="material-icons">add</i>
            </md-button>
          </div>
          <div class="md-layout-item md-size-95" style="padding: 0">
            <md-table
              v-if="vendorsObjectsArray.length"
              v-model="vendorsObjectsArray"
              table-header-color="green"
              class="components-table"
              :class="readonly ? 'readonly' : ''"
            >
              <md-table-row>
                <md-table-head>Vendor Name</md-table-head>
                <!--<md-table-head>Contact Person</md-table-head>
                <md-table-head>Email</md-table-head>
                <md-table-head>Phone</md-table-head>-->
                <md-table-head>Cost</md-table-head>
                <md-table-head />
              </md-table-row>
              <md-table-row
                v-for="(item, index) in vendorsObjectsArray"
                v-if="item !== null"
                slot="md-table-row"
                :key="'vendor-' + index"
                @click.native="showModalVendors(item, index)"
              >
                <md-table-cell>{{ item.vendorDisplayName }}</md-table-cell>
                <!--<md-table-cell>{{ item.contactPerson }}</md-table-cell>
                <md-table-cell>{{ item.vendorMainEmail }}</md-table-cell>
                <md-table-cell>{{ item.vendorMainPhoneNumber }}</md-table-cell>-->
                <md-table-cell>${{ item.cost }}</md-table-cell>
                <md-table-cell class="visible-on-hover min-actions">
                  <div class="actions-flex">
                    <!--<md-button class="md-raised md-primary md-icon-button" @click="sentProposalRequest($event)" v-if="!readonly && shouldUpdate">
                      <md-icon>visibility</md-icon>
                      <md-tooltip md-direction="top">Request Proposal</md-tooltip>
                    </md-button>-->
                    <md-button
                      v-if="!readonly"
                      class="md-raised md-primary md-icon-button"
                      @click="showSwalItems($event, index, 'vendors')"
                    >
                      <md-icon>delete</md-icon>
                    </md-button>
                  </div>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
        </div>
        <!--<p class="text-danger text-center" v-if="!componentObject.vendors.length">
          No vendors were added yet.
          <a class="text-danger text-center link-underscored" v-if="!readonly" @click='showModalVendors({}, null)'>Go ahead and add one!</a>
        </p>-->
        <p v-if="!componentObject.vendors.length" class="text-danger text-center">
          <a v-if="!readonly" class="text-danger text-center link-underscored" @click="showModalVendors({}, null)">Add vendors for <strong>{{ componentObject.componentId }}</strong></a>
        </p>
      </template>

      <template slot="tab-pane-3">
        <div class="md-layout">
          <div class="md-layout-item md-size-5" style="margin: 0; padding: 0">
            <md-button
              v-if="!readonly && componentObject.todos.length"
              class="md-icon-button md-info md-fab md-round"
              style="height: 24px; width: 24px; min-width: 24px; min-height: 24px; line-height: 24px"
              @click="showModalTodo({}, null)"
            >
              <i class="material-icons">add</i>
            </md-button>
          </div>
          <div class="md-layout-item md-size-95" style="padding: 0">
            <md-table
              v-if="componentObject.todos.length"
              table-header-color="green"
              class="components-table"
              :class="readonly ? 'readonly' : ''"
            >
              <md-table-row>
                <md-table-head>To Do</md-table-head>
                <md-table-head>Due Date</md-table-head>
                <!--<md-table-head>Assign To</md-table-head>
                <md-table-head>Status</md-table-head>-->
                <md-table-head />
              </md-table-row>
              <event-todo-row
                v-for="(item, index) in componentObject.todos"
                v-if="item !== null"
                :key="'todo-' + index"
                :show-modal-todo="showModalTodo"
                :show-swal="showSwalItems"
                :todo-item="item"
                :todo-index="index"
              />
            </md-table>
          </div>
        </div>
        <!--<p class="text-danger text-center" v-if="!componentObject.todos.length">
          No todos were added yet.
          <a class="text-danger text-center link-underscored" v-if="!readonly" @click='showModalTodo({}, null)'>Go ahead and add one!</a>
        </p>-->
        <p v-if="!componentObject.todos.length" class="text-danger text-center">
          <a v-if="!readonly" class="text-danger text-center link-underscored" @click="showModalTodo({}, null)">Add To Do's for <strong>{{ componentObject.componentId }}</strong></a>
        </p>
      </template>
    </event-tabs>

    <!-- should be inside of 'slot="content"' for rendering -->
    <div slot="content" class="tabs-timeline-content">
      <md-list class="nav-tabs">
        <md-list-item
          v-for="(item, index) in tabName"
          :key="item"
          :class="[
            { active: isActivePanel(tabName[index]) },
            { [getColorButton(colorButton)]: isActivePanel(tabName[index]) },
          ]"
          @click="switchPanel(tabName[index])"
        >
          {{ tabName[index] }}
          <md-icon v-if="navPillsIcons">
            {{ tabIcon[index] }}
          </md-icon>
        </md-list-item>
      </md-list>
      <!--<event-modal-inspirations ref="inspirationsModal" v-if="componentObject.id"></event-modal-inspirations>-->
      <event-modal-vendor
        ref="vendorsModal"
        :v-bind:readonly="$props.readonly"
        :vendor-item="vendorItem"
        :vendor-index="vendorIndex"
        :should-update="$props.shouldUpdate"
        :update-vendor="$props.updateVendor"
        :component-index="componentIndex"
      />
      <event-modal-components
        ref="componentsModal"
        :v-bind:readonly="$props.readonly"
        :component-item="componentItem"
        :component-item-index="componentItemIndex"
        :component="componentObject"
        :component-id="componentObject.id"
        :should-update="$props.shouldUpdate"
        :update-component="$props.updateComponent"
        :component-index="componentIndex"
      />
      <event-modal-todo
        ref="todoModal"
        :todo-item="todoItem"
        :todo-index="todoIndex"
        :should-update="$props.shouldUpdate"
        :v-bind:readonly="$props.readonly"
        :update-todo="$props.updateTodo"
        :component-index="componentIndex"
      />
    </div>
  </time-line-item>
</template>

<script>
import { NavTabsCard, TimeLineItem } from "@/components";
import EventModalInspirations from "./EventInspirationsModal";
import EventModalTodo from "./EventTodoModal";
import EventModalVendor from "./EventVendorModal";
import EventModalComponents from "./EventComponentsModal";
import EventTodoRow from "./EventTodoRow.vue";
import EventTabs from "./EventTabs.vue";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  name: "EventCardComponent",
  components: {
    NavTabsCard,
    EventModalInspirations,
    EventModalTodo,
    EventModalVendor,
    EventModalComponents,
    EventTodoRow,
    TimeLineItem,
    EventTabs,
  },

  filters: {
    moment: function (date) {
      return moment(date).format("YYYY-MM-DD");
    },
  },
  props: {
    componentIndex: Number,
    componentObject: Object,
    readonly: Boolean,
    shouldUpdate: Boolean,
    updateVendor: Function,
    updateComponent: Function,
    updateTodo: Function,
    deleteVendor: Function,
    deleteTodo: Function,
    deleteComponentItem: Function,
    deleteComponent: Function,
    tabName: String,
  },
  data: function () {
    return {
      vendorsObjectsArray: [],
      vendorItem: null,
      vendorIndex: null,
      componentItem: null,
      componentItemIndex: null,
      todoItem: null,
      todoIndex: null,
    };
  },
  computed: {
    componentTitle() {
      let componentId = this.componentObject.componentId;
      let o = {};

      this.$store.state.componentsList.some(function (val) {
        if (val.id === componentId) {
          return (o = val);
        } else if (val.childComponents) {
          return (o = val.childComponents.find((x) => x.id === componentId));
        }
      });

      return o ? o.value || o.title : "";
    },
  },
  watch: {
    componentObject: {
      handler: function (before, after) {
        this.getVendorObjectsArray();
      },
      deep: true,
    },
  },
  mounted() {
    this.getVendorObjectsArray();
  },
  methods: {
    findIcon(object) {
      let obj = "";
      if (this.$store.state.componentsList) {
        obj = this.$store.state.componentsList.find((e) => {
          return e.id === object.componentId;
        });
        if (!obj) {
          let child = this.$store.state.componentsList.map((e) => {
            return e.childComponents ? e.childComponents : {};
          });
          obj = child.flat().find((e) => {
            return e.id === object.componentId;
          });
        }
      }
      return obj ? obj.icon : "card_travel";
    },
    getVendorObjectsArray() {
      let _this = this;
      this.vendorsObjectsArray = [];
      if (this.componentObject) {
        this.componentObject.vendors.forEach(function (vendorItem) {
          let vendorObj = Object.assign(
            {},
            _this.$store.state.vendorsList.find((val) => val.id === vendorItem.vendorId),
          );
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
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonClass: "md-button md-success",
        cancelButtonClass: "md-button md-danger",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          let store = this.$store.state.eventData.components[this.componentIndex];

          if (this.shouldUpdate) {
            switch (arrayTitle) {
              case "vendors":
                this.$props.deleteVendor(store, { id: store.vendors[itemIndex].id });
                break;
              case "todos":
                this.$props.deleteTodo(store, { id: store.todos[itemIndex].id });
                break;
              case "values":
                this.$props.deleteComponentItem(store, { id: store.values[itemIndex].id });
                break;
              default:
                break;
            }
          }
          this.$store.commit("removeSubComponent", {
            component: this.componentIndex,
            type: arrayTitle,
            item: itemIndex,
          });
        }
      });
    },
    showSwalComponent() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonClass: "md-button md-success",
        cancelButtonClass: "md-button md-danger",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          if (this.shouldUpdate) {
            this.$props.deleteComponent(this.componentObject);
          }
          this.$store.commit("removeComponent", { index: this.componentIndex });
        }
      });
    },
    sentProposalRequest(event) {
      event.stopPropagation();
      let routeData = this.$router.resolve({ path: "/events/proposal" });
      window.open(routeData.href, "_blank");
    },
  },
};
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
.link-underscored {
  text-decoration: underline !important;
  cursor: pointer;
  &hover {
    text-decoration: underline !important;
    cursor: pointer;
  }
}
.md-table.readonly {
  pointer-events: none;
}
.text-center {
  text-align: center;
}
.min-actions {
  min-width: 70px;
}
.actions-flex {
  display: flex;

  .md-button {
    margin-right: 5px;
    margin-left: auto;
  }
}
.md-table .md-table-row {
  .visible-on-hover .md-table-cell-container {
    text-align: right;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
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
  /*margin-right: 15px !important;
    margin-top: 6px !important;*/
  width: 27px;
  height: 27px;
  min-width: 27px;
}
.components-timeline {
  .timeline-heading {
    margin: 0;
  }
}

.component-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    text-align: left;
  }
  .actions-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
