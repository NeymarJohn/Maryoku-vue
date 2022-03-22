<template>
  <div class="event-budget-approve">
    <div class="md-layout justify-content-between">
      <div class="md-layout-item md-size-40 left-side-section">
        <div class="card-section card-overview">
          <div class="budget-card">
            <div class="font-size-22">
              Budget
            </div>
            <div class="font-size-50 font-bold value">
              ${{ event.totalBudget | withComma(Number) }}
            </div>
            <md-button v-if="canEdit" class="md-rose md-simple md-sm edit-btn" @click="setModalStep('next')">
              Edit
            </md-button>
          </div>
        </div>
        <div class="card-section card-expense mt-3">
          <div class="section-header with-border">
            Expenses
          </div>
          <div style="margin: 40px 30px">
            <pie-chart-round :event.sync="event" :items="pieChartData" columns="1" />
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
                v-for="component in categoryList"
                :key="component.id"
                :component="component"
                :editable="canEdit"
                @delete="deleteCategory"
                @updateCategory="updateCategory"
              />
              <event-budget-component
                v-if="event.unexpectedBudget"
                :editable="canEdit"
                :component="{
                  title: 'Unexpected',
                  color: '#80B93D',
                  fontColor: '#80B93D',
                  icon: 'unexpected.svg',
                  allocatedBudget: event.unexpectedBudget,
                }"
                @delete="deleteCategory"
                @updateCategory="updateCategory"
              />
              <event-budget-component
                v-if="event.allocatedFees + event.allocatedTips"
                :editable="canEdit"
                :component="{
                  title: 'Extra',
                  color: '#818080',
                  fontColor: '#818080',
                  icon: 'extra.svg',
                  allocatedBudget: event.allocatedFees + event.allocatedTips,
                }"
                @delete="deleteCategory"
                @updateCategory="updateCategory"
              />
              <event-budget-component
                :editable="false"
                :component="{
                  title: 'Unused',
                  color: '#0047cc',
                  fontColor: '#0047cc',
                  icon: 'unused.svg',
                  allocatedBudget: unusedBudget,
                }"
              />
              <event-budget-component
                :editable="canEdit"
                :component="{ title: 'Total', allocatedBudget: event.totalBudget }"
              />
              <div v-if="canEdit" class="add-category-row">
                <md-button
                  class="md-simple add-category-btn md-red add-category-button"
                  @click="showAddNewCategory = true"
                >
                  <img :src="`${$iconURL}budget+screen/SVG/Asset%2019.svg`">
                  <span class="font-size-20 font-bold text-transform-capitalize">Add new category</span>
                </md-button>
              </div>
            </template>
            <template slot="tab-pane-2">
              <event-budget-component
                v-for="(component, index) in categoryList"
                :key="index"
                :editable="canEdit"
                type="perguest"
                :participants="event.numberOfParticipants"
                :component="component"
              />
              <event-budget-component
                v-if="event.unexpectedBudget"
                :editable="canEdit"
                :component="{
                  title: 'Unexpected',
                  color: '#80B93D',
                  fontColor: '#80B93D',
                  icon: 'unexpected.svg',
                  allocatedBudget: event.unexpectedBudget,
                }"
                type="perguest"
                :participants="event.numberOfParticipants"
                @delete="deleteCategory"
                @updateCategory="updateCategory"
              />
              <event-budget-component
                v-if="event.allocatedFees + event.allocatedTips"
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
                @delete="deleteCategory"
                @updateCategory="updateCategory"
              />
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
              />
              <event-budget-component
                :editable="canEdit"
                :component="{ title: 'Total', allocatedBudget: event.totalBudget }"
                type="perguest"
                :participants="event.numberOfParticipants"
              />
              <div v-if="canEdit" class="add-category-row">
                <md-button
                  class="md-simple add-category-btn md-red add-category-button"
                  @click="showAddNewCategory = true"
                >
                  <img :src="`${$iconURL}budget+screen/SVG/Asset%2019.svg`">
                  <span class="font-size-20 font-bold text-transform-capitalize">Add new category</span>
                </md-button>
              </div>
            </template>
          </tabs>
        </div>
      </div>
    </div>

    <budget-edit-modal
      v-if="editBudgetModalStep === 1"
      :event="event"
      @cancel="closeEditBudgetModal"
      @save="onBudgetChangeModal"
    />
    <modal v-if="editBudgetModalStep===2" class="add-category-model no-header">
      <template slot="body">
        <div class="add-category-model__header">
          <div class="d-flex justify-content-between mb-20">
            <md-button class="md-icon-button md-simple" @click="setModalStep('previous')">
              <md-icon>
                west
              </md-icon>
            </md-button>
            <md-button
              class="ml-auto md-icon-button md-simple"
              @click="closeEditBudgetModal"
            >
              <md-icon>clear</md-icon>
            </md-button>
          </div>
          <h2> <span :style="{color: extra<0?'red':'green', display: 'inline-block'}">${{ extra | withComma(Number) }}</span></h2>
          <h2 v-if="extra<0">
            Oops, these changes have put you in the red!
          </h2>
          <span class="black">What would you like to do? </span>
          <br>
          <md-checkbox v-show="extra>0" v-model="extraBudgetMethod" class="md-checkbox-circle md-red" value="betweenCategories">
            Add new category
          </md-checkbox>
          <br>
          <md-checkbox v-model="extraBudgetMethod" class="md-checkbox-circle md-red" value="onUnexpected">
            {{ extra > 0 ? 'Store that money to ‘Unexpected’ category' : 'Allocate funds from the “Unexpected” category' }}
          </md-checkbox>
          <br>
          <md-checkbox v-show="extra<0" v-model="extraBudgetMethod" class="md-checkbox-circle md-red" value="goBack">
            Add more money to my budget
          </md-checkbox>
        </div>
      </template>
      <template slot="footer">
        <md-button class="add-category-btn" @click="handleBudgetMethod">
          Select
        </md-button>
      </template>
    </modal>
    <add-new-category-modal
      v-if="showAddNewCategory"
      :event="event"
      :components="categoryList"
      @cancel="showAddNewCategory = false"
      @save="addNewCategory"
    />
  </div>
</template>
<script>
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";

const components = {
    Tabs: () => import("@/components/Tabs.vue"),
    Modal: () => import("@/components/Modal.vue"),
    PieChartRound: () => import("./PieChartRound.vue"),
    EventBudgetComponent: () => import("./EventBudgetComponent.vue"),
    BudgetEditModal: () => import("@/components/Modals/BudgetEditModal.vue"),
    AddNewCategoryModal: () => import("@/components/Modals/AddNewCategoryModal.vue"),

};
export default {
  components,
  data() {
    return {
      editBudgetModalStep: 0,
      selectedComponents: [],
      seriesData: [],
      isRendered: false,
      showEditModal: false,
      showAddNewCategory: false,
      extraBudgetMethod:"betweenCategories",
      extra:"0",
    };
  },
  computed: {
    event() {
      return this.$store.state.event.eventData;
    },

    unusedBudget() {
      return this.event.totalBudget;
    },
    pieChartData() {
      return this.categoryList.filter((item) => item.componentId !== "unexpected");
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
    categoryList() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.$store.state.event.eventData.components.sort((a, b) => a.eventCategory.order - b.eventCategory.order);
    },
  },
  created() {},
  methods: {
    updateBudget(eventBudget) {
      const event = new CalendarEvent({
        id: this.event.id,
        totalBudget: eventBudget.totalBudget,
        unexpectedBudget: this.event.unexpectedBudget + (eventBudget.totalBudget - this.event.totalBudget),
        calendar: new Calendar({ id: this.event.calendar.id }),
      });
      this.$store.dispatch("event/saveEventAction", event).then((res) => {
        this.showBudgetModal = false;
      });
    },
    async addNewCategory(newCategory) {
      const event = new CalendarEvent({
        id: this.event.id,
        unexpectedBudget: this.event.unexpectedBudget - newCategory.allocatedBudget,
        calendar: new Calendar({ id: this.event.calendar.id }),
      });
      this.showAddNewCategory = false;
      this.$store.dispatch("event/saveEventAction", event).then((res) => {});
    },
    deleteCategory(changedMoney) {
        const event = new CalendarEvent({
            id: this.event.id,
            allocatedBudget: this.event.allocatedBudget - changedMoney.offset,
        });
        if (changedMoney.selectedOption === "total") {
            event.totalBudget = this.event.totalBudget - changedMoney.offset;
            if (changedMoney.hasOwnProperty("title") && changedMoney.title) {
                if (changedMoney.title === "Unexpected") event.unexpectedBudget = 0;
                if (changedMoney.title === "Extra") {
                    event.allocatedTips = 0;
                    event.allocatedFees = 0;
                }
            }
        } else if (changedMoney.selectedOption === "unexpected") {
            event.unexpectedBudget = this.event.unexpectedBudget + changedMoney.offset;
        }
        this.$store.dispatch("event/saveEventAction", event).then((res) => {});
    },
    updateCategory(changedMoney) {
        const event = new CalendarEvent({
            id: this.event.id,
            allocatedBudget: this.event.allocatedBudget + changedMoney.offset,
        });

        if (changedMoney.selectedOption === "total") {
            event.totalBudget = this.event.totalBudget + changedMoney.offset;
            if (changedMoney.hasOwnProperty("title") && changedMoney.title) {
                if (changedMoney.title === "Unexpected") event.unexpectedBudget = this.event.unexpectedBudget + changedMoney.offset;
                if (changedMoney.title === "Extra") {
                    event.allocatedTips = this.event.allocatedTips + changedMoney.offset;
                }
            }
        } else if (changedMoney.selectedOption === "unexpected") {
            event.unexpectedBudget = this.event.unexpectedBudget - changedMoney.offset;
        }
        this.$store.dispatch("event/saveEventAction", event).then((res) => {
            this.$emit("change");
        });
    },
      handleBudgetMethod(){
          if(this.extraBudgetMethod==="onUnexpected"){
              const event = new CalendarEvent({
                  id: this.event.id,
                  totalBudget: this.newBudget,
                  unexpectedBudget: this.event.unexpectedBudget + (this.newBudget - this.event.totalBudget),
              });
              this.$store.dispatch("event/saveEventAction", event).then((res) => {
                  this.event = res;
              });
              this.closeEditBudgetModal();
          }else {
              this.setModalStep(this.extraBudgetMethod === "goBack" ? "previous" : "next");
          }
      },
      closeEditBudgetModal(){
          this.editBudgetModalStep = 0;
      },
      setModalStep(stepAction){
          if(stepAction === "next"){
              this.editBudgetModalStep++;
          } else if (stepAction === "previous"){
              this.editBudgetModalStep--;
          }else{

          }
      },
      onBudgetChangeModal(newBudget){
          this.extra = newBudget.totalBudget - this.event.totalBudget;
          if (this.extra === 0) {
              return this.closeEditBudgetModal();
          }
          this.newBudget = newBudget.totalBudget;
          this.setModalStep("next");
      },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../styles/EventDetailsBudget.scss";
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
