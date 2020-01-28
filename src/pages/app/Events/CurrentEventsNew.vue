<template>
    <div class="edit-event-details">
        <!-- Event Header -->
        <div class="event-header d-flex justify-content-between">
            <div class="header-title">
                <h3> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+3.png" width="15"> Budget</h3>
            </div>
            <div class="header-actions">
                <ul>
                    <li><a href=""><i class="fa fa-download"></i></a></li>
                    <li><a href=""><i class="fa fa-download"></i></a></li>
                    <li><a href=""><i class="fa fa-download"></i></a></li>
                </ul>
            </div>
        </div>

        <div class="md-layout justify-content-between">
            <div class="md-layout-item md-size-60">

                <div class="card-section">
                    <div class="section-header">
                        Overview
                    </div>
                    <div class="budget-list d-flex justify-content-between">
                        <div class="budget-list__item">
                            <div class="label-title">Budget</div>
                            <div class="budget-value">$6,000</div>
                            <a href="">Edit</a>
                        </div>
                        <div class="budget-list__item">
                            <div class="label-title">User</div>
                            <div class="budget-value">$3,500</div>
                            <div class="percent">50%</div>
                        </div>
                        <div class="budget-list__item">
                            <div class="label-title">Remaining</div>
                            <div class="budget-value">$2,500</div>
                            <div class="percent">42%</div>
                        </div>
                    </div>
                </div>

                <div class="card-section saved-budget text-center">
                    So far you saved : <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+25.png" width="15"> <b>$100</b>
                </div>

            </div>
            <div class="md-layout-item  md-size-40">
                <div class="card-section">
                </div>
            </div>
        </div>



        <div class="md-layout justify-content-between">
            <div class="md-layout-item md-size-40">

                <div class="card-section">
                    <div class="section-header">
                        Expences
                    </div>

                </div>

            </div>
            <div class="md-layout-item  md-size-60">
                <div class="event-blocks-table">
                    <tabs
                        :tab-name="['<img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+26.png\'> Total', ' <img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+28.png\'> Per Guest']"
                    >

                        <!-- here you can add your content for tab-content -->
                        <template slot="tab-pane-1">
                            <table class="event-blocks__table" >
                                <thead>
                                <tr>
                                    <th>Vendor</th>
                                    <th>Planned</th>
                                    <th>Actual</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr >
                                    <td class="vendor completed"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+2.png"> Venue</td>
                                    <td class="planned completed">$2000</td>
                                    <td class="actual red-label completed"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+29.png"> $2000</td>
                                    <td class="status completed">
                                        <a href="">
                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+31.png">
                                        </a>
                                    </td>
                                    <td class="expand completed">
                                        <a href="">
                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">
                                        </a>
                                    </td>
                                </tr>
                                <tr >
                                    <td class="vendor completed"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+2.png"> Catering</td>
                                    <td class="planned">$1500</td>
                                    <td class="actual green-label"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+30.png"> $1200</td>
                                    <td class="status">
                                        <a href="">
                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+31.png">
                                        </a>
                                    </td>
                                    <td class="expand">
                                        <a href="">
                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">
                                        </a>
                                    </td>
                                </tr>
                                <tr >
                                    <td class="vendor completed"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+2.png"> DJ</td>
                                    <td class="planned">$1500</td>
                                    <td class="actual"> $50</td>
                                    <td class="status">
                                        <md-button class="book-btn md-sm">Book</md-button>
                                    </td>
                                    <td class="expand">
                                        <a href="">
                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">
                                        </a>
                                    </td>
                                </tr>
                                </tbody>

                            </table>
                        </template>
                        <template slot="tab-pane-2">
                            <table class="event-blocks__table" >
                                <thead>
                                <tr>
                                    <th>Vendor</th>
                                    <th>Planned</th>
                                    <th>Actual</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr >
                                    <td class="vendor completed"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+2.png"> Venue</td>
                                    <td class="planned completed">$2000</td>
                                    <td class="actual red-label completed"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+29.png"> $2000</td>
                                    <td class="status completed">
                                        <a href="">
                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+31.png">
                                        </a>
                                    </td>
                                    <td class="expand completed">
                                        <a href="">
                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">
                                        </a>
                                    </td>
                                </tr>
                                <tr >
                                    <td class="vendor completed"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+2.png"> Catering</td>
                                    <td class="planned">$1500</td>
                                    <td class="actual green-label"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+30.png"> $1200</td>
                                    <td class="status">
                                        <a href="">
                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+31.png">
                                        </a>
                                    </td>
                                    <td class="expand">
                                        <a href="">
                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">
                                        </a>
                                    </td>
                                </tr>
                                <tr >
                                    <td class="vendor completed"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+2.png"> DJ</td>
                                    <td class="planned">$1500</td>
                                    <td class="actual"> $50</td>
                                    <td class="status">
                                        <md-button class="book-btn md-sm">Book</md-button>
                                    </td>
                                    <td class="expand">
                                        <a href="">
                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">
                                        </a>
                                    </td>
                                </tr>

                                <tr >
                                    <td class="vendor"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+2.png"> Photographer</td>
                                    <td class="planned">$100</td>
                                    <td class="actual"> $100</td>
                                    <td class="status">
                                        <md-button class="book-btn md-sm disabled">Book</md-button>
                                    </td>
                                    <td class="expand">
                                        <a href="">
                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">
                                        </a>
                                    </td>
                                </tr>

                                <tr >
                                    <td class="vendor unexpected"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+18.png"> Unexpected</td>
                                    <td class="planned">$100</td>
                                    <td class="actual"> $100</td>
                                    <td class="status">
                                        <md-button class="use-btn md-sm">Use</md-button>
                                    </td>
                                    <td class="expand">
                                        <a href="">
                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">
                                        </a>
                                    </td>
                                </tr>

                                </tbody>

                            </table>
                        </template>
                    </tabs>
                </div>
            </div>
        </div>


    </div>

</template>

<script>

    import EventModal from './EventModal/'
    import EventPlannerVuexModule from './EventPlanner.vuex'

    //MAIN MODULES
    import ChartComponent from '@/components/Cards/ChartComponent'
    // import auth from '@/auth';
    import moment from 'moment'
    import VueElementLoading from 'vue-element-loading'
    import Calendar from '@/models/Calendar'
    import CalendarEvent from '@/models/CalendarEvent'
    import CalendarEventStatistics from '@/models/CalendarEventStatistics'
    import EventComponent from '@/models/EventComponent'
    import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';

    import { Tabs } from "@/components";

    //COMPONENTS

    export default {
        components: {
            Tabs
        },

        data () {
            return {
                // auth: auth,
                calendarEvent: {},
                selectedComponents: [],
                currentTab: 'blocks',
                eventId: null,
                percentage: 0,
                totalRemainingBudget: 0,
                remainingBudgetPerEmployee: 0,
                seriesData: [],
                isLoading: false,
                event: {statistics: {}},
                routeName: null,
                budgetPerEmployee: 0,
                activeTab: 0
            }
        },
        created () {
            this.routeName = this.$route.name
        },
        mounted () {

        },
        methods: {}
    }
</script>

<style scoped>
    .md-layout, .md-layout-item {
        width: initial;
    }

    .tab-content {
        background-color: transparent !important;
    }
</style>

