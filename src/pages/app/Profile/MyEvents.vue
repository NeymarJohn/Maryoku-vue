<template>
    <div>
        <md-card>
            <md-card-header class="md-card-header-icon md-card-header-warning">
                <div class="card-icon" style="padding: 12px;">
                    <md-icon>event</md-icon>
                </div>
                <h5 class="title profile-title">My Events</h5>
            </md-card-header>

            <md-card-content>
                <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>
                <h6 v-if="events.length === 0">No events yet</h6>
                <collapse :collapse="events" icon="keyboard_arrow_down" color-collapse="warning" >

                    <template v-for="(item,index) in events" :slot="`md-collapse-pane-${index+1}`">
                        <event-details :key="item.id" :titleCollaps="eventTitleFromCollaps" :where="eventLocation" :when="item.eventStartMillis" :dressCode="eventDressCode"></event-details>
                    </template>
                </collapse>
            </md-card-content>

        </md-card>
    </div>
</template>

<script>
    import {
        Collapse
    } from "@/components";
    import EventDetails from "./EventDetails"

    import VueElementLoading from 'vue-element-loading';

    export default {
        components: {
            Collapse,
            EventDetails,
            VueElementLoading
        },
        data() {
            return {
                isLoading: true,
                events: [],
                eventLocation: '',
                eventDate: '',
                eventDressCode: '',
                emptyEvents:'',
                eventTitleFromCollaps: ''
            }
        },
        props: {
            userInfo: Object
        },
        mounted() {
            if (!this.userInfo){
                this.isLoading = true;
            } else {
                this.events = this.userInfo.myEvents || [];
                console.log(JSON.stringify(this.events, null, 4));
            }
        },

        watch: {
            userInfo(newVal, oldVal) {
                this.events = newVal.myEvents || [];
                this.emptyEvents = this.events.length === 0;
                this.isLoading = false;
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .title-My-Events {
        width: 81px;
        height: 18px;
        font-family: Roboto;
        font-size: 18px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: var(--slate);
        padding-top: 20px;
    }

    .header-icon-myEvents {
        width: 63px;
        height: 64px;
        border-radius: 3px;
        box-shadow: 0px 4px 20px 0 rgba(0, 0, 0, 0.14);
        background-image: linear-gradient(to right, #ffa625, #fb8d02), linear-gradient(to top, #000000, #ffffff);
    }

    .my-event {
        width: 513px;
        height: 842px;
        border-radius: 6px;
        // box-shadow: 0px 1px 4px 0 rgba(0, 0, 0, 0.14);
        // background-color: #ffffff;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0px;
        margin: 0px;
    }
</style>
