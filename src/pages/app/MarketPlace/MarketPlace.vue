<template>

</template>
<script>

    import EventSidePanel from '@/pages/app/Events/EventSidePanel';

    export default {
        data() {

        },
        mounted(){
            this.$auth.currentUser(this, true, () =>{

            });
        },
        methods: {
            openEventModal() {
                /*this.$router.push({ path: `/events` , name  : 'Events', params : { mode : 'create-event'} });
                this.setEventModal({ showModal: true });
                this.setModalSubmitTitle("Save");
                this.setEditMode({ editMode: false });*/

                let now = new Date();
                window.currentPanel = this.$showPanel({
                    component: EventSidePanel,
                    cssClass: 'md-layout-item md-size-40 transition36 ',
                    openOn: 'right',
                    disableBgClick: false,
                    props: {
                        modalSubmitTitle: 'Save',
                        editMode: false,
                        sourceEventData: {eventStartMillis: new Date().getTime(), numberOfParticipants: this.$auth.user.customer.numberOfEmployees},
                        refreshEvents: null,
                        year: now.getFullYear(),
                        month: now.getMonth(),
                        occasionsOptions: this.occasionsArray,
                        openInPlannerOption: false
                    }
                });
            },
            openYearPlanner() {
                this.$router.push({ path: `/planner`});
            },
            openVendorsUpload() {
                this.$router.push({ path: `/vendors`});
            }
        }
    }
</script>
<style lang="scss" scoped>

    .get-started {
        background-color: #26c6da;
        height: 100vh;
    }

    .get-started-card-title {
        font-weight: 400 !important;
    }

    .get-started-card-description {
        min-height: 100px;
        font-size: 16px;
        font-weight: 300;
        color: #777;
    }
</style>
