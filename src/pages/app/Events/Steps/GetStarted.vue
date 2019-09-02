<template>
    <div class="md-layout">
        <div class="md-layout-item">
            <h2 class="margin-bottom-md">Let's start with big things</h2>
            <label class="bold">First things first, this party needs:</label>
            <div class="list-container">
                <div v-for="i in 5" :key="i" class="list-item" :class="{'active': i == 2}">
                    <div class="list-item--icon">
                        <md-icon v-if="i == 2">check</md-icon>
                        <md-icon v-else>arrow_forward</md-icon>
                    </div>
                    <div class="list-item--title">
                        Venue
                    </div>
                </div>
            </div>
            <label class="bold">
                Select more elements <md-icon>keyboard_arrow_right</md-icon>
            </label>
            <div class="list-container">
                <div v-for="i in 15" :key="i" class="list-item" :class="{'active': i == 2}">
                    <div class="list-item--icon">
                        <md-icon v-if="i == 2">check</md-icon>
                        <md-icon v-else>arrow_forward</md-icon>
                    </div>
                    <div class="list-item--title">
                        Venue
                    </div>
                </div>
            </div>
            <div class="margin-bottom-xxl">
                <label>Add a short paragraph about the event.</label><br/>
                <md-textarea class="textarea-262" placeholder="Is there a dress code? Who is participating? What's the occasion?"></md-textarea>
            </div>
            <div class="text-right margin-bottom-xxl">
                <md-button class="md-button md-primary">Brief Details</md-button>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: "get-started",
        components: {
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/md/_variables.scss";

    .margin-bottom-md {
        margin-bottom: 15px;
    }

    .margin-bottom-xxl {
        margin-bottom: 25px;
    }

    .bold {
        font-weight: bold;
    }

    .textarea-262 {
        width: 50%;
        border: 1px solid $input-border;
        background: none;
        border-radius: 4px;
        height: 100px;
        padding: 15px;
    }

    .list-container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
        margin-bottom: 20px;

        .list-item {
            display: flex;
            padding: 15px;
            margin-right: 15px;
            margin-bottom: 15px;
            background: white;
            border-radius: 4px;
            min-width: 180px;
            cursor: pointer;

            &.active {
                .list-item--icon {
                    background: $brand-primary;
                    border-color: $brand-primary;
                    .md-icon-font {
                        color: white;
                        content: "check";
                    }
                }
            }
        }

        .list-item--title {
            font-size: 20px;
            margin-top: 5px;
        }

        .list-item--icon {
            width: 35px;
            height: 35px;
            border: 1px solid $input-border;
            border-radius: 50%;
            text-align: center;
            margin-right: 10px;
            padding-top: 3px;
        }
    }
</style>