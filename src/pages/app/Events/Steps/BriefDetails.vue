<template>
    <div class="md-layout">
        <div class="md-layout-item">
            brief details

            <div class="text-right margin-bottom-xxl">
                <md-button @click.prevent="back" class="md-button md-white">Back</md-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        back () {
            this.$emit('goToPrevPage');
        }
    }
}
</script>
<style lang="scss" scoped>

</style>