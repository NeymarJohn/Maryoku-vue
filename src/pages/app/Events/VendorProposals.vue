<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <h3 class="title">Vendor's Name</h3>
        </div>

        <div class="md-layout-item md-size-70">
            <!-- Event Information Card -->
            <md-card class="md-primary event-information-card">
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <h4 class="title">Event information</h4>
                        </div>
                        <div class="md-layout-item md-size-45">
                            <div class="info-item">
                                <div class="">
                                    <md-icon>calendar_today</md-icon>
                                    Start Date:
                                </div>
                                <div class="info-value">
                                    December 20,2019
                                </div>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-45">
                            <div class="info-item">
                                <div class="">
                                    <md-icon>place</md-icon>
                                    Location:
                                </div>
                                <div class="info-value">
                                    135 West street, New York
                                </div>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-45">
                            <div class="info-item">
                                <div class="">
                                    <md-icon>history</md-icon>
                                    Time & Duration:
                                </div>
                                <div class="info-value">
                                    10:00 AM - 6 Hours
                                </div>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-45">
                            <div class="info-item">
                                <div class="">
                                    <md-icon>person</md-icon>
                                    Participants:
                                </div>
                                <div class="info-value">
                                    74 + Spouses
                                </div>
                            </div>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <!-- ./Event Information Card -->

            <!-- Dietary requirements -->
            <md-card class="event-information-card">
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <h4 class="title">Dietary Requirements</h4>
                        </div>

                        <div class="md-layout-item md-size-100">
                            <div class="requirements-list">
                                <div class="list-item">
                                    <div class="requirement-title">

                                    </div>
                                    <div class="included-in-price">

                                    </div>
                                    <div class="actions-list">
                                        <md-button class="md-rose md-simple"></md-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <!-- ./Dietary requirements -->

        </div>
        <div class="md-layout-item md-size-30">
            <md-card>
                <md-card-content >
                    Hello
                </md-card-content>
            </md-card>
        </div>
    </div>
  </div>
</template>

<script>
    //MAIN MODULES
    import ChartComponent from "@/components/Cards/ChartComponent";
    import VueElementLoading from "vue-element-loading";

    //COMPONENTS
    import Icon from "@/components/Icon/Icon.vue";
    import { Collapse } from "@/components";

    export default {
        components: {
            VueElementLoading,
            Icon,
            Collapse
        },

        data() {
            return {
                // auth: auth,
                calendarEvent: {},
                isLoading: false,
                readonly : true,
                isMobile : window.innerWidth <= 500 ? true : false
            };
        },
        created(){


        },
        mounted() {


        },
        methods: {
        },
        computed: {

        }
    };
</script>
