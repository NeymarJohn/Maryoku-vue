<template>
    <div class="md-layout brief-details">
        <div class="md-layout-item md-size-100">
            <tabs
                :tab-name="['DETAILS', 'IMAGES', 'TIMELINE']"
                color-button="primary" class="vertical-tabs md-vertical">

                <!-- here you can add your content for tab-content -->
                <template slot="tab-pane-1">
asdasd
                </template>
                <template slot="tab-pane-2">

                    asdfqwdasd
                </template>
                <template slot="tab-pane-3">
asd asd asd a
                </template>
            </tabs>
        </div>
        <div class="md-layout-item md-size-100">
            <div class="text-right margin-bottom-xxl">
                <md-button @click.prevent="back" class="md-button md-white">Back</md-button>
                <md-button class="md-button md-primary">Send to vendors</md-button>
            </div>
        </div>
    </div>
</template>
<script>

    import { Tabs, NavTabsCard } from "@/components";

export default {
    components:{
        Tabs,
        NavTabsCard
    },
    methods: {
        back () {
            this.$emit('goToPrevPage');
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
