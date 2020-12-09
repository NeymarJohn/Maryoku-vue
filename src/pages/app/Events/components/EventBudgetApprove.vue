<template>
  <div class="event-budget-approve">
    <div class="md-layout justify-content-between">
      <div class="md-layout-item md-size-40 left-side-section">
        <div class="card-section card-overview">
          <div class="budget-card">
            <div class="font-size-22">Budget</div>
            <div class="font-size-50 font-bold value">${{ event.totalBudget | withComma }}</div>
            <md-button v-if="canEdit" class="md-rose md-simple md-sm edit-btn" @click="showBudgetModal = true"
              >Edit</md-button
            >
          </div>
        </div>
        <div class="card-section card-expense mt-3">
          <div class="section-header with-border">Expenses</div>
          <div style="margin: 40px 30px">
            <pie-chart-round :event.sync="event" :items="pieChartData" columns="1"></pie-chart-round>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-size-60">
        <div class="event-blocks-table">
          <tabs
            :tab-name="[
              '<img src=\'https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/png/Asset+26.png\'> Total',
              ' <img src=\'https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/png/Asset+28.png\'> Per Guest',
            ]"
          >
            <template slot="tab-pane-1">
              <event-budget-component
                v-for="component in selectedComponents"
                :component="component"
                :key="component.id"
                :editable="canEdit"
                @delete="deleteCategory"
                @updateCategory="updateCategory"
              ></event-budget-component>
              <event-budget-component
                :editable="false"
                :component="{
                  title: 'Unexpected',
                  color: '#80B93D',
                  fontColor: '#80B93D',
                  icon: 'unexpected.svg',
                  allocatedBudget: event.unexpectedBudget,
                }"
              ></event-budget-component>
              <event-budget-component
                :editable="canEdit"
                :component="{
                  title: 'Extra',
                  color: '#818080',
                  fontColor: '#818080',
                  icon: 'extra.svg',
                  allocatedBudget: event.allocatedFees + event.allocatedTips,
                }"
              ></event-budget-component>
              <event-budget-component
                :editable="false"
                :component="{
                  title: 'Unused',
                  color: '#0047cc',
                  fontColor: '#0047cc',
                  icon: 'unused.svg',
                  allocatedBudget: unusedBudget,
                }"
              ></event-budget-component>
              <event-budget-component
                :editable="canEdit"
                :component="{ title: 'Total', allocatedBudget: event.totalBudget }"
              ></event-budget-component>
              <div class="add-category-row" v-if="canEdit">
                <md-button
                  class="md-simple add-category-btn md-red add-category-button"
                  @click="showAddNewCategory = true"
                >
                  <img :src="`${$iconURL}budget+screen/SVG/Asset%2019.svg`" />
                  <span class="font-size-20 font-bold text-transform-capitalize">Add new category</span>
                </md-button>
              </div>
            </template>
            <template slot="tab-pane-2">
              <event-budget-component
                :editable="canEdit"
                type="perguest"
                :participants="event.numberOfParticipants"
                v-for="(component, index) in selectedComponents"
                :component="component"
                :key="index"
              ></event-budget-component>
              <event-budget-component
                :editable="false"
                :component="{
                  title: 'Unexpected',
                  color: '#80B93D',
                  fontColor: '#80B93D',
                  icon: 'unexpected.svg',
                  allocatedBudget: event.unexpectedBudget,
                }"
                type="perguest"
                :participants="event.numberOfParticipants"
              ></event-budget-component>
              <event-budget-component
                :editable="canEdit"
                :component="{
                  title: 'Extra',
                  color: '#818080',
                  fontColor: '#818080',
                  icon: 'extra.svg',
                  allocatedBudget: event.allocatedFees + event.allocatedTips,
                }"
                type="perguest"
                :participants="event.numberOfParticipants"
              ></event-budget-component>
              <event-budget-component
                :editable="canEdit"
                :component="{
                  title: 'Unused',
                  color: '#0047cc',
                  fontColor: '#0047cc',
                  icon: 'unused.svg',
                  allocatedBudget: unusedBudget,
                }"
                type="perguest"
                :participants="event.numberOfParticipants"
              ></event-budget-component>
              <event-budget-component
                :editable="canEdit"
                :component="{ title: 'Total', allocatedBudget: event.totalBudget }"
                type="perguest"
                :participants="event.numberOfParticipants"
              ></event-budget-component>
              <div class="add-category-row" v-if="canEdit">
                <md-button
                  class="md-simple add-category-btn md-red add-category-button"
                  @click="showAddNewCategory = true"
                >
                  <img :src="`${$iconURL}budget+screen/SVG/Asset%2019.svg`" />
                  <span class="font-size-20 font-bold text-transform-capitalize">Add new category</span>
                </md-button>
              </div>
            </template>
          </tabs>
        </div>
      </div>
    </div>

    <budget-edit-modal
      v-if="showBudgetModal"
      :event="event"
      @cancel="showBudgetModal = false"
      @save="updateBudget"
    ></budget-edit-modal>
    <add-new-category-modal
      v-if="showAddNewCategory"
      :event="event"
      :components="selectedComponents"
      @cancel="showAddNewCategory = false"
      @save="addNewCategory"
    ></add-new-category-modal>
  </div>
</template>
<script>
import PieChartRound from "./PieChartRound.vue";
import { Tabs, Modal } from "@/components";
import EventComponent from "@/models/EventComponent";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import EventBudgetComponent from "./EventBudgetComponent";
import BudgetEditModal from "@/components/Modals/BudgetEditModal";
import AddNewCategoryModal from "@/components/Modals/AddNewCategoryModal";
export default {
  components: {
    Tabs,
    Modal,
    PieChartRound,
    EventBudgetComponent,
    BudgetEditModal,
    AddNewCategoryModal,
  },
  data() {
    return {
      showBudgetModal: false,
      selectedComponents: [],
      seriesData: [],
      isRendered: false,
      showEditModal: false,
      showAddNewCategory: false,
    };
  },
  created() {
    const event = new CalendarEvent({ id: this.event.id });
    new EventComponent()
      .for(event)
      .get()
      .then((components) => {
        components.sort((a, b) => a.order - b.order);
        this.selectedComponents = components;
        this.$forceUpdate();
        this.isRendered = true;
      });
  },
  computed: {
    event() {
      return this.$store.state.event.eventData;
    },
    allocatedTotal() {
      const addedBudget = this.selectedComponents.reduce((sum, item) => {
        return sum + item.allocatedBudget;
      }, 0);
      return addedBudget + this.event.allocatedTips + this.event.allocatedFees;
    },
    unusedBudget() {
      return this.event.totalBudget;
    },
    pieChartData() {
      return this.selectedComponents.filter((item) => item.componentId !== "unexpected");
    },
    permission() {
      console.log(this.$store.state.event.eventData);
      try {
        return this.$store.state.event.eventData.permit;
      } catch (e) {
        return "edit";
      }
    },
    canComment() {
      return this.permission === "edit" || this.permission === "comment";
    },
    canEdit() {
      return !this.permission || this.permission === "edit";
    },
  },
  methods: {
    updateBudget(eventBudget) {
      const event = new CalendarEvent({
        id: this.event.id,
        totalBudget: eventBudget.totalBudget,
        calendar: new Calendar({ id: this.event.calendar.id }),
      });
      this.$store.dispatch("event/saveEventAction", event).then((res) => {
        this.showBudgetModal = false;
      });
    },
    async addNewCategory(newCategory) {
      let newComponent = newCategory.category;
      if (newComponent.id === "other") {
        const newCategory = {
          title: `Other-${newCategory.name}`,
          key: `other-${newCategory.name.toLowerCase()}`,
          color: `rgb(${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, ${parseInt(
            Math.random() * 255,
          )})`,
          icon: `other.svg`,
          type: "customized",
          categoryId: "other",
        };
        newComponent = await new EventCategory(newCategory).save();
      }
      let newBlock = {
        componentId: newComponent ? newComponent.key : "other",
        componentCategoryId: newComponent ? newComponent.key : "other",
        calendarEvent: { id: this.event.id },
        allocatedBudget: newCategory.budget,
        order: this.selectedComponents.length,
        icon: newComponent.icon,
        category: newComponent,
      };

      new EventComponent(newBlock)
        .for(this.event)
        .save()
        .then((res) => {
          this.showAddNewCategory = false;
          this.selectedComponents = res.eventComponents.sort((a, b) => a.eventCategory.order - b.eventCategory.order);
        })
        .catch((error) => {
          console.log("Error while saving ", error);
        });
    },
    deleteCategory(category) {
      const deletingCategory = new EventComponent({ id: category.id });
      deletingCategory
        .for(this.event)
        .delete()
        .then((resp) => {
          this.isLoading = false;
          this.selectedComponents.splice(
            this.selectedComponents.findIndex((b) => {
              return b.id === deletingCategory.id;
            }),
            1,
          );
          this.$forceUpdate();

          let allocatedBudget = 0;
          this.selectedComponents.forEach((item) => {
            allocatedBudget += Number(item.allocatedBudget);
          });
          this.allocatedBudget = allocatedBudget;
          this.$emit("change");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateCategory(category) {
      const eventComponent = new EventComponent(category);
      eventComponent
        .for(this.event)
        .save()
        .then((res) => {
          this.selectedComponents = res.eventComponents.sort((a, b) => a.eventCategory.order - b.eventCategory.order);
          const totalAllocatedBudget = this.selectedComponents.reduce((s, item) => {
            return s + item.allocatedBudget;
          }, 0);
          const event = new CalendarEvent({
            id: this.event.id,
            totalBudget: totalAllocatedBudget,
            calendar: new Calendar({ id: this.event.calendar.id }),
          });
          this.$store.dispatch("event/saveEventAction", event).then((res) => {
            this.showBudgetModal = false;
          });
          this.$forceUpdate();
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.event-budget-approve {
  .left-side-section {
    display: flex;
    flex-direction: column;
    .budget-card {
      padding: 60px 0;
      text-align: center;
      .value {
        line-height: 2em;
      }
    }
    .card-expense {
      flex-grow: 1;
      margin-bottom: 55px;
    }
  }

  .add-category-row {
    margin-top: 12px;
    font-size: 20px;
    height: 88px;
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    border: solid 1px #f51355;
    background-color: #ffffff;
    display: flex;
    justify-content: start;
    img {
      width: 30px;
      margin-right: 25px;
    }
  }
}
</style>