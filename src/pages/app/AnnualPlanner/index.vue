<template>
  <div class="md-layout" style="height: 100%; overflow: hidden;">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
    <div class="md-layout-item md-size-15" style="text-align: center; height: 100%;">
      <md-card style="background-color: #41535E; color: rgb(225, 234,239); height: 100%; margin-top: 0; margin-bottom: 0;">
        <md-card-content>
          <h5 style="font-size: 1.05em; font-weight: 600; padding: 0; margin: 0;">Total remaining budget</h5>
          <h4 style="font-size: 2.3em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">$26,350</h4>
          <div style="padding: 16px;"></div>
          <img src="https://cdn1.iconfinder.com/data/icons/charts-and-diagrams-1-1/512/donutchart-512.png"/>
          <div style="padding: 16px;"></div>

          <div>
            <div style="text-align: left;">
              <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Remaining budget per employee</h5>
              <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">$285.5</h4>
              <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
            </div>
          </div>

          <div style="padding: 8px;"></div>

          <div>
            <div style="text-align: left;">
              <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Annual budget per employee</h5>
              <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">$285.5</h4>
              <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
            </div>
          </div>

          <div style="padding: 8px;"></div>

          <div>
            <div style="text-align: left;">
              <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Total annual budget</h5>
              <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">$285.5</h4>
              <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
            </div>
          </div>

          <div style="padding: 8px;"></div>

          <div>
            <div style="text-align: left;">
              <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Total events</h5>
              <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">20</h4>
              <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>

    <div class="md-layout-item md-size-70 " style="height: 100%;">
      <md-card style="margin-top: 0; height: 15%; ">
        <md-card-content>filters</md-card-content>
      </md-card>

      <div class="md-layout" style="height: 85%;">
        <div class="md-layout-item md-size-20 side-padding left right top bottom">
          <md-card  style="margin: 0; height: 95%; overflow: auto;">
            <md-card-content style="width: 100%; padding: 0; margin: 0;">
              &lt; 2019 &gt;
              <hr/>
              <md-list style="width: 100%; padding: 0; margin: 0;">
                <md-list-item style="background-color: #FF547C; margin-left: 0;">
                  <a href="#" style="width: 100%;" >
                    <div style="color: white; font-weight: 500; width: 100%; padding: 0 15px;">January <div class="pull-right">3</div></div>
                  </a>
                </md-list-item>
                <md-list-item>February <div class="pull-right">3</div></md-list-item>
                <md-list-item>March <div class="pull-right">3</div></md-list-item>
                <md-list-item>April <div class="pull-right">3</div></md-list-item>
                <md-list-item>May <div class="pull-right">3</div></md-list-item>
                <md-list-item>June <div class="pull-right">3</div></md-list-item>
                <md-list-item>July <div class="pull-right">3</div></md-list-item>
                <md-list-item>August <div class="pull-right">3</div></md-list-item>
                <md-list-item>September <div class="pull-right">3</div></md-list-item>
                <md-list-item>October <div class="pull-right">3</div></md-list-item>
                <md-list-item>November <div class="pull-right">3</div></md-list-item>
                <md-list-item>December <div class="pull-right">3</div></md-list-item>
              </md-list>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-size-80 side-padding right">


          <div class="md-layout" style="height: 100%;">
            <div class="md-layout-item md-size-100 side-padding right" style="height: 80%;">
              <md-card style="margin: 0; height: 100%; overflow: auto;">
                <md-card-content style="height: 100%; text-align: center;">
                  <h3 class="text-gray">August</h3>
                  <table style="width: 100%; height: 90%; text-align: center;" border="1">
                    <tr>
                      <th class="text-gray">Sun</th>
                      <th>Mon</th>
                      <th>Tue</th>
                      <th>Wed</th>
                      <th>Thu</th>
                      <th>Fri</th>
                      <th>Sat</th>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                      <td>6</td>
                      <td>7</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                      <td>6</td>
                      <td>7</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                      <td>6</td>
                      <td>7</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                      <td>6</td>
                      <td>7</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                      <td>6</td>
                      <td>7</td>
                    </tr>
                  </table>
                </md-card-content>
              </md-card>
            </div>
            <div class="md-layout-item md-size-100 side-padding right" style="height: 15%;">
              <md-card style="margin: 0; height: 85%;">
                <md-card-content>legend</md-card-content>
              </md-card>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div class="md-layout-item md-size-15 " style="height: 100%;">
      <div class="md-layout" style="height: 100%;">
        <div class="md-layout-item md-size-100" style="height: 15%;">
          <md-card style="height: 100%; margin: 0; padding: 0; background-color: transparent; box-shadow: none; overflow: auto;">
            <md-card-content>
              <md-button class="md-success" style="height: 100%;">Create New Event</md-button>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-size-100" style="height: 65%;">
          <md-card style="height: 100%; margin: 0; padding: 0; overflow: auto;">
            <md-card-content>events list</md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-size-100" style="height: 15%;">
          <md-card style="height: 100%; margin: 0; padding: 0; background-color: transparent; box-shadow: none; overflow: auto;">
            <md-card-content>
              <md-button class="md-success" style="height: 100%;">Import Events</md-button>
              <md-button class="md-success" style="height: 100%;">Export to Excel</md-button>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '@/auth';
  import Calendar from '@/models/Calendar';
  import CalendarEvent from '@/models/CalendarEvent';
  import CalendarMetadata from '@/models/CalendarMetadata';
  import VueElementLoading from 'vue-element-loading';
  import ChartComponent from '@/components/Cards/ChartComponent';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import AnnualPlannerVuexModule from './AnnualPlanner.vuex';
  import moment from 'moment';

  export default {
    components: {
      VueElementLoading,
      ChartComponent,
    },
    data() {

      return {
        ready: false,
        auth: auth,
        isLoading: true,
      }
    },
    created() {
      this.$store.registerModule('AnnualPlannerVuex', AnnualPlannerVuexModule);
    },
    mounted(){
      console.log("mounted !");
      this.ready = false;
      this.isLoading = true;
      this.auth.currentUser(this, true, function() {

        this.checkSelectedYearMonth();

        this.ready = true;
        this.isLoading = false;
      }.bind(this))
    },
    methods: {
      checkSelectedYearMonth(){
        let yearParam = this.$route.params.year;
        let monthParam = this.$route.params.month;
        let redirect = false;

        if (yearParam === undefined || isNaN(yearParam)){
          yearParam = moment().format('YYYY');
          redirect = true;
        }

        if (monthParam === undefined || isNaN(yearParam)){
          monthParam = moment().format('MM');
          redirect = true;
        }

        if (redirect) {
          this.$router.push({
            path: `/annual-planner/${yearParam}/${monthParam}`
          });
        } else {
          this.selectYearMonth(yearParam, monthParam);
        }
      },
      selectYearMonth(year, month){
        console.log(`working with ${year} as year and ${month} as month.`);
      }
    },
    computed: {
      ...mapState('AnnualPlannerVuex', ['filtersData']),
    },
    watch: {
      '$route' (to, from) {
        // react to route changes...
        this.checkSelectedYearMonth();
      }
    }
  };
</script>
<style lang="scss">
  .side-padding {
    &.left {
      padding-left: 0;
    }

    &.right {
      padding-right: 0;
    }

    &.top {
      padding-top: 0;
    }

    &.bottom {
      padding-bottom: 0;
    }
  }

  .content {
    height: 90% !important;
  }
</style>
