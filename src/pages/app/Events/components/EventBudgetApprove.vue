<template>
  <div class="event-budget-approve">
    <div class="md-layout justify-content-between">
      <div class="md-layout-item md-size-40 left-side-section">
        <div class="card-section card-overview">
          <div class="budget-card">
              <div class="font-size-22">Budget</div>
              <div class="font-size-50 font-bold value" >${{event.totalBudget | withComma}}</div>
              <md-button class="md-rose md-simple md-sm edit-btn" @click="showBudgetModal = true">Edit</md-button>
          </div>
        </div>
        <div class="card-section card-expense mt-3">
            <div class="section-header with-border">
                Expenses
            </div>
            <div style="margin:40px 30px">
                <pie-chart-round 
                    :event.sync="event"
                    :items="selectedComponents"
                    columns="1">
                </pie-chart-round>
            </div>
        </div>
      </div>
      <div class="md-layout-item  md-size-60">
          <div class="event-blocks-table">
              <tabs
                  :tab-name="['<img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+26.png\'> Total', ' <img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+28.png\'> Per Guest']"
              >
                  <template slot="tab-pane-1">
                    <event-budget-component v-for="(component,  index) in selectedComponents" :component="component" :key="index"></event-budget-component>
                    <event-budget-component :component="{title:'Total', allocatedBudget:event.totalBudget}" :key="index"></event-budget-component>
                    <div class="add-category-row">
                      <md-button class="md-simple add-category-btn md-red add-category-button" @click="showCategoryModal = true">
                        <img :src="`${$iconURL}budget+screen/SVG/Asset%2019.svg`"/> 
                        <span class="font-size-20 font-bold text-transform-capitalize">Add new category</span>
                      </md-button>
                    </div>
                  </template>
                  <template slot="tab-pane-2">
                  </template>
              </tabs>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import PieChartRound from './PieChartRound.vue'
import { Tabs, Modal } from '@/components'
import EventComponent from '@/models/EventComponent'
import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import EventBudgetComponent from './EventBudgetComponent'
export default {
  components: {
    Tabs, 
    Modal,
    PieChartRound,
    EventBudgetComponent
  },
  data() {
    return {
      showBudgetModal: false,
      selectedComponents: [],
      seriesData: [],
      isRendered : false
    }
  },
  created () {
    const _calendar = new Calendar({ id: this.$store.state.auth.user.profile.defaultCalendarId })
    const event = new CalendarEvent({ id: this.event.id})
    new EventComponent().for(_calendar, event).get().then(components => {
      components.sort((a,b)=>a.order - b.order)
      this.selectedComponents = components
      this.$forceUpdate()
      this.isRendered = true
    });
  },
  computed: {
    event() {
      return this.$store.state.event.eventData; 
    }
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format('MMM Do YYYY ')
    },
    formatTime: function (date) {
      return moment(date).format('h:00 A')
    },
    formatDuration: function (startDate, endDate) {
      return moment(endDate).diff(startDate, 'hours')
    },
    withComma (amount) {
      return amount ? amount.toLocaleString() : 0
    },
    roundNumber(amount) {
      return Math.round(amount / 10) * 10;
    }
  },
}
</script>
<style lang="scss" scoped>
.event-budget-approve{
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
    display:flex;
    justify-content: start;
    img {
      width: 30px;
      margin-right: 25px;
    }
  }
}

</style>