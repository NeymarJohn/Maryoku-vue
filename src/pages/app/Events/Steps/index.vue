<template>
    <div>
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
        <div class="steps-container">
            <div class="step visited">
                Get started
            </div>
            <div class="step active">
                Brief details
            </div>
            <div class="step">
                Send to vendors
            </div>
        </div>
        <md-divider></md-divider>
        <get-started />
    </div>
</template>
<script>
    import VueElementLoading from 'vue-element-loading'
    import GetStarted from './GetStarted'
    
    export default {
        name: "event-steps",
        components: {
            VueElementLoading,
            GetStarted
        },
        data () {
            return {
                isLoading: false
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/md/_variables.scss";

    .steps-container {
        width: 50%;
        display: flex;
        margin: auto;
        justify-content: space-between;
        position: relative;
        text-align: center;
        margin-top: 15px;
        margin-bottom: 15px;

        &::before {
            content: " ";
            position: absolute;
            border-bottom: 1px solid $input-border;
            width: 65%;
            left: 0;
            right: 0;
            margin: auto;
            top: 15px;
        }

        .step {
            padding-top: 35px;
            position: relative;
            width: 100%;

            &:before {
                content: " ";
                position: absolute;
                width: 30px;
                height: 30px;
                border-width: 1px;
                border-style: solid;
                border-radius: 50%;
                border-color: $input-border;
                background: white;
                top: 0;
                left: 0;
                right: 0;
                margin: auto;
            }

            &.active {
                color: $brand-primary;

                &:before {
                    border-color: $brand-primary;
                    background: $brand-primary;
                }
            }

            &.visited:before {
                color: $brand-primary;
                border-color: $brand-primary;
                padding-top: 2px;
                font-family: 'Material Icons';
                content: '\e5ca';
            }
        }
    }
</style>