<template>
    <div class="event-plan">
        <InboxSidebar />
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
    }
}
</script>
