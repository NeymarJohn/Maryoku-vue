<template>
    <div>
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
        <div class="steps-container">
            <div class="step" :class="[{'visited': step > 1}, {'active': step == 1}]">
                Get started
            </div>
            <div class="step" :class="[{'visited': step > 2}, {'active': step == 2}]">
                Brief details
            </div>
            <div class="step" :class="[{'active': step == 3}]">
                Send to vendors
            </div>
        </div>
        <md-divider></md-divider>
        <get-started v-show="step == 1" @goToNextPage="goToNextPage" />
        <brief-details v-show="step == 2" @goToNextPage="goToNextPage" @goToPrevPage="goToPrevPage" />
    </div>
</template>
<script>
    import VueElementLoading from 'vue-element-loading'
    import GetStarted from './GetStartedStep'
    import BriefDetails from './BriefDetails'
    
    export default {
        name: "event-steps",
        components: {
            VueElementLoading,
            GetStarted,
            BriefDetails
        },
        methods: {
            goToNextPage () {
                this.step++;
            },
            goToPrevPage () {
                this.step--;
            },
        },
        data () {
            return {
                isLoading: false,
                step: 1,
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/md/_variables.scss";
    /deep/ .margin-bottom-md {
        margin-bottom: 15px;
    }

    /deep/ .margin-bottom-xxl {
        margin-bottom: 25px;
    }

    /deep/ .bold {
        font-weight: bold;
    }

    /deep/ .md-error {
        color: $state-danger-text;
    }

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