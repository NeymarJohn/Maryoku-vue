<template>
    <div class="md-layout">
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
        <div class="md-card">
            <div class="md-card-content">
                <div class="md-layout">
                    <div class="md-layout-item md-size-55">
                        <md-field class="required">
                            <label>Event Title</label>
                            <md-input></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-15">
                        <md-field class="required">
                            <label>Guest Count</label>
                            <md-input></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-15">
                        <md-field class="required">
                            <label>Budget</label>
                            <md-input></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-15">
                        <md-field class="required">
                            <label>Per Guest</label>
                            <md-input></md-input>
                        </md-field>
                    </div>
                </div>

                <!-- Event Types list-->
                <div class="md-layout event-types-list">
                    <div class="md-layout-item md-size-100">
                        <label class="bold">
                            Select Event Type
                        </label>

                        <div class="list-container">
                            <div v-for="type in eventTypes"
                                 :key="type.item" class="list-item"
                                 :class="{'active': isTypeSelected(type.id) }"
                                 @click="selectEventType(type)"
                            >
                                <div class="list-item--icon">
                                    <md-icon v-if="isTypeSelected(type.id)" class="checked-item">check</md-icon>
                                </div>
                                <div class="list-item--title">
                                    {{ type.item }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ./Event Types list-->

                <!-- Guest Types list-->
                <div class="md-layout event-types-list">
                    <div class="md-layout-item md-size-100">
                        <label class="bold">
                            Select Guest Type
                        </label>

                        <div class="list-container">
                            <div v-for="type in InviteeTypes"
                                 :key="type" class="list-item"
                                 :class="{'active': isGuestTypeSelected(type) }"
                                 @click="selectGuestType(type)"
                            >
                                <div class="list-item--icon">
                                    <md-icon v-if="isGuestTypeSelected(type)" class="checked-item">check</md-icon>
                                </div>
                                <div class="list-item--title">
                                    {{ type }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ./Guest Types list-->

                <!-- Event fields section -->
                <div class="md-layout">
                    <div class="md-layout-item md-size-25">
                        <md-field>
                            <label>Occasion</label>
                            <md-input></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-25">
                        <md-field>
                            <label>Where is your event?</label>
                            <md-input></md-input>
                        </md-field>

                        <md-checkbox >I don't know yet</md-checkbox>
                    </div>
                </div>
                <div class="md-layout">
                    <div class="md-layout-item md-size-50">
                        <md-datepicker
                            data-vv-name="date"
                            ref="datePicker"
                            required>
                            <label >Date</label>
                        </md-datepicker>

                        <md-checkbox >Select a month if you don't have a specific date yet</md-checkbox>

                    </div>
                </div>
                <div class="md-layout">
                    <div class="md-layout-item md-size-25">
                        <md-field class="required">
                            <label>Start Time</label>
                            <md-select
                                data-vv-name="time"
                                required>
                                <md-option v-for="hour in hoursArray"
                                           :key="hour"
                                           :value="hour">
                                    {{ hour }}
                                </md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-25">
                        <md-field>
                            <label>Duration</label>
                            <md-select data-vv-name="duration"
                                       required>
                                <md-option v-for="hour in durationArray"
                                           :key="hour"
                                           :value="hour">
                                    {{ hour + ' hours' }}
                                </md-option>
                            </md-select>
                        </md-field>

                    </div>
                </div>
                <!-- ./Event fields section -->

            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import EventComponent from '@/models/EventComponent'
    import CalendarEvent from '@/models/CalendarEvent';
    import Calendar from "@/models/Calendar";
    import VueElementLoading from 'vue-element-loading'

    export default {
        name: "get-started-step",
        components: {
            VueElementLoading
        },
        methods: {
            selectEventType(type) {
                console.log(type);
                this.eventType = type;
            },
            isTypeSelected(id) {
                return this.eventType && this.eventType.id === id;
            },
            selectGuestType(type) {
                this.guestType = type;
            },
            isGuestTypeSelected(guest) {
                return this.guestType === guest;
            }

        },
        data () {
            return {
                isLoading: true,
                event: null,
                calendar: null,
                eventType : {},
                InviteeTypes: ["Guests Only","Guests and spouse","Guests and families", "Guests siblings"],
                guestType : null,
                hoursArray: [],
                durationArray: [...Array(12).keys()].map(x =>  ++x),
            }
        },
        created(){
            [...Array(12).keys()].map(x => x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined);
            [...Array(12).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`));
            [...Array(8).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 AM`) : this.hoursArray.push(`${x}:00 AM`));

            this.hoursArray.push();
        },
        mounted () {
            this.isLoading = true;
            let vm = this;

            vm.$auth.currentUser(vm, true, ()=> {

                Promise.all([
                    CalendarEvent.find(vm.$route.params.id),
                    EventComponent.get()
                ]).then(([event, components]) => {
                    vm.calendar = new Calendar({id: vm.$auth.user.defaultCalendarId});
                    vm.event = event.for(vm.calendar);

                    vm.isLoading = false;
                });
            });


        },
        computed : {
            ...mapGetters({
                eventTypes: 'event/getEventTypesList',
            }),
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/md/_variables.scss";

    .list-container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
        margin-bottom: 20px;
        flex-direction: row;

        .list-item {
            border-radius: 4px;
            cursor: pointer;
            width : 120px;
            text-align: center;
            margin-right : 10px;
            position: relative;

            &.active {
                .list-item--icon {
                    background: $brand-primary;
                    border-color: $brand-primary;
                    .md-icon-font {
                        color: white;
                        content: "check";
                    }

                    .checked-item {
                        position: absolute;
                        right : 5px;
                        top : 5px;
                    }
                }
            }
        }

        .list-item--title {
            margin-top: 5px;
        }

        .list-item--icon {
            width : 120px;
            height : 120px;
            border: 1px solid #e0e0e0;
            text-align: center;
            border-radius: 2px;
        }
    }

</style>
