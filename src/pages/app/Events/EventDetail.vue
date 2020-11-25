<template>
    <div class="event-plan">
        <progress-sidebar
                :elements="eventElements"
                page="event"
        ></progress-sidebar>
        <EventDetailsOverview v-if="pageId == 'overview'" ></EventDetailsOverview>
        <EventDetailsOther v-else ></EventDetailsOther>
    </div>
</template>
<script>
    import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
    import Calendar from "@/models/Calendar";
    import EventDetailsOverview from './components/EventDetailsOverview'
    import EventDetailsOther from './components/EventDetailsOther'
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
            EventDetailsOther,
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
                    icon: `${this.$iconURL}budget+screen/SVG/Asset%2032.svg`,
                    progress: 0,
                    componentId: "",
                };
                const venue = {
                    title: "Book Venue",
                    status: "not-complete",
                    route: "venue",
                    icon: `${this.$iconURL}budget+screen/SVG/Asset%2032.svg`,
                    progress: 0,
                    componentId: "",
                };

                const catering = {
                    title: "Book catering",
                    status: "not-complete",
                    route: "catering",
                    icon: `${this.$iconURL}budget+screen/SVG/Asset%2032.svg`,
                    progress: 0,
                    componentId: "",
                };

                const timeline = {
                    title: "Create timeline",
                    status: "not-complete",
                    route: "timeline",
                    icon: `${this.$iconURL}budget+screen/SVG/Asset%2032.svg`,
                    progress: 0,
                    componentId: "",
                };

                const dj = {
                    title: "Hire DJ",
                    status: "not-complete",
                    route: "dj",
                    icon: `${this.$iconURL}budget+screen/SVG/Asset%2032.svg`,
                    progress: 0,
                    componentId: "",
                };

                const photographer = {
                    title: "Hir photographer",
                    status: "not-complete",
                    route: "catering",
                    icon: `${this.$iconURL}budget+screen/SVG/Asset%2032.svg`,
                    progress: 0,
                    componentId: "",
                };
                const elements = [];

                elements.push(create);
                elements.push(venue);
                elements.push(catering);
                elements.push(timeline);
                elements.push(dj);
                elements.push(photographer);

                const vm = this;

                vm.eventElements = elements;

            },
            fetchData() {
                this.pageId = this.$route.params.blockId?this.$route.params.blockId:"overview"
                console.log("fetchData", this.pageId);
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
