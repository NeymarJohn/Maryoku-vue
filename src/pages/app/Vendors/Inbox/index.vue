<template>
    <div class="event-plan d-flex">
        <div class="" style="width: 25vw;">
            <InboxSidebar />
        </div>
        <router-view></router-view>
        hello
    </div>
</template>
<script>
const components = {
    InboxSidebar: () => import('../components/InboxSidebar.vue'),
}
export default {
    components,
    data(){
        return{}
    },
    async created(){
        await this.$store.dispatch('vendorDashboard/getComments', {vendorId: this.vendorData.id});
    },
    computed:{
        vendorData() {
            return this.$store.state.vendor.profile;
        },
    }
}
</script>
