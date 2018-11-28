<template>
    <div class="md-layout-item md-size-100">
        <md-card class="bg-rose">
            <md-card-content>
                <div class="grid-col">
                    <span class="custom-label">Let the community know what you are looking for</span>
                        <div class="md-layout-item md-medium-size-100 md-size-100">
                            <md-field class="no-margin">
                                <label for="select">Select one</label>
                                <md-select v-model="select" name="select">
                                    <md-option :v-for="option in options"  :key="option"  :value="option">{{ option }}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                    </div>
                <div class="grid-col">
                    <span class="custom-label">The type of service or product you are inquiring about.</span>
                    <div class="md-layout-item md-medium-size-100 md-size-100">
                        <md-field class="no-margin">
                            <label for="select">Select one</label>
                            <md-select v-model="select" name="select">
                                <md-option :v-for="option in options"  :key="option"  :value="option">{{ option }}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div> <div class="grid-col">
                <span class="custom-label">The occasion you are celebrating</span>
                <div class="md-layout-item md-medium-size-100 md-size-100">
                    <md-field class="no-margin">
                        <label for="select">Select one</label>
                        <md-select v-model="select" name="select">
                            <md-option :v-for="option in options"  :key="option"  :value="option">{{ option }}</md-option>
                        </md-select>
                    </md-field>
                </div>
            </div>
                <div class="grid-col">
                    <span class="custom-label">Where will the event take place(mostly useful to get local vendors & reccomendations)</span>
                    <div class="md-layout-item md-medium-size-100 md-size-100">
                        <md-field class="no-margin">
                            <label for="select">Select one</label>
                            <md-select v-model="select" name="select">
                                <md-option :v-for="option in options"  :key="option"  :value="option">{{ option }}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
                select: '',
                options: [
                    'test11',
                    'test12',
                    'test13',
                    'test14']
            };
        },
        methods: {

        }
    }
</script>
<style>
    .no-margin{
        margin-top: 0px;
    }
    .custom-label{
        margin-top: 10px;
        text-align: left;
    }
</style>