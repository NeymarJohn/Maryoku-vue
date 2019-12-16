<template>
    <div class="">
        <div class="section-header">
            <h2 class="section-title">Tell us about the people you invited?</h2>
            <div class="steps-wizard">
                <ul class="steps-wizard-items">
                    <li v-for="index in step" :key="index"></li>
                </ul>
            </div>
        </div>
        <div class="container">
            <div class="form-section">

                <md-field class="purple-field">
                    <label>How many people do you invite?</label>
                    <md-input></md-input>
                </md-field>

                <md-field class="purple-field">
                    <label>% people you're expecting to show up</label>
                    <md-input  ></md-input>
                </md-field>

                <md-checkbox v-model="flexibleWithDates">Internal company event</md-checkbox>


                <div class="form-actions">
                    <md-button class="md-rose next-btn"> Next </md-button>
                </div>



            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {

        },
        data() {
            return {

                step : 2,
                haveEventPlace : false,
                flexibleWithDates : false,
                eventTime : null,
                eventDate : null

            }
        }
    };
</script>
<style lang="scss">


    .form-section {
        width : 30%;
        margin : 0 auto;
        padding : 0 2em;
    }

    .event-time {
        display: flex;
        flex:1;
        flex-direction: row;
        justify-content: space-between;

        .md-radio {
            margin-right: 0;
            width: 47%;
        }
    }
</style>
