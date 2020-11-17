<template>
    <div class="event-plan">
        <progress-sidebar
                :elements="eventElements"
                page="event"
        ></progress-sidebar>
        <EventDetailsOverview></EventDetailsOverview>
    </div>
</template>
<script>
    import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
    import Calendar from "@/models/Calendar";
    import CalendarEvent from "@/models/CalendarEvent";
    import EventComponent from "@/models/EventComponent";
    import EventDetailsOverview from './EventDetailsOverview'
    import ProgressSidebar from "./components/progressSidebarForEvent";

    export default {
        computed: {
            ...mapState("event", {
                eventData: (state) => state.eventData,
            }),
        },
        components: {
            EventDetailsOverview,
            ProgressSidebar,
        },
        data() {
            return {
                eventElements: [],
                pageId: "",
                resevedPages: []
            }
        },
        mounted () {
            this.fetchData();
        },
        methods: {
            generatedItems() {
                const create = {
                    title: "Create Event",
                    status: "not-complete",
                    route: "overview",
                    icon: `${this.$iconURL}budget+screen/SVG/Asset%2010.svg`,
                    progress: 0,
                    componentId: "",
                };
                const create1 = {
                    title: "Book Venue",
                    status: "not-complete",
                    route: "venue",
                    icon: `${this.$iconURL}budget+screen/SVG/Asset%2010.svg`,
                    progress: 0,
                    componentId: "",
                };

                const create2 = {
                    title: "Book catering",
                    status: "not-complete",
                    route: "catering",
                    icon: `${this.$iconURL}budget+screen/SVG/Asset%2010.svg`,
                    progress: 0,
                    componentId: "",
                };
                const elements = [];

                elements.push(create);
                elements.push(create1);
                elements.push(create2);

                const vm = this;

                vm.eventElements = elements;

            },
            fetchData() {
                this.pageId = this.$route.params.blockId?this.$route.params.blockId:"timeline"
            }
        },
        created (){
            const currentUser = this.$store.state.auth.user;
            this.calendar = new Calendar({ id: currentUser.profile.defaultCalendarId });
            this.event = this.$store.state.event.eventData;
            this.generatedItems(this.event);
        },
        watch: {
            '$route':'fetchData',
            event(newValue) {

            },
            eventData(newValue) {

            },
        },
    }
</script>
<style lang="scss">
    @import "../../styles/EventPlan.scss";

</style>
