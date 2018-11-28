<template>
    <div class="md-layout-item md-size-100 m-top">
                <div class="grid-col">
                    <span class="custom-label">Let the community know what you are looking for</span>
                        <div class="md-layout-item md-medium-size-100 md-size-100">
                            <md-field  v-if="show" class="no-margin">
                                <md-select v-model="select1" name="select">
                                    <md-option v-for="(option, index) in options"  :key="index"  :value="option">{{ option }}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                    </div>
                <div class="grid-col">
                    <span class="custom-label">The type of service or product you are inquiring about.</span>
                    <div class="md-layout-item md-medium-size-100 md-size-100">
                        <md-field class="no-margin">
                            <md-select v-model="select2" name="select">
                                <md-option  v-for="(option, index) in options"  :key="index" :value="option">{{ option }}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div>
        <div class="grid-col">
                <span class="custom-label">The occasion you are celebrating</span>
                <div class="md-layout-item md-medium-size-100 md-size-100">
                    <md-field class="no-margin">
                        <md-select v-model="select3" name="select">
                            <md-option  v-for="(option, index) in options"  :key="index"  :value="option">{{ option }}</md-option>
                        </md-select>
                    </md-field>
                </div>
            </div>
                <div class="grid-col">
                    <span class="custom-label">Where will the event take place(mostly useful to get local vendors & reccomendations)</span>
                    <div class="md-layout-item md-medium-size-100 md-size-100">
                        <md-field class="no-margin">
                            <md-select v-model="select4" name="select">
                                <md-option  v-for="(option, index) in options"  :key="index"  :value="option">{{ option }}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div>
        <md-card class="bg-gray">
            <md-card-content>
                <h5 class="tags-title">Tag your event</h5>
                <div class="md-layout-item md-size-100 move-left">
                    <span class="tags-label">Tag Event Budget</span>
                    <span class="tags-inline"><md-chips v-model="budget" class="md-primary no-padding"></md-chips></span>
                </div>
                <div class="md-layout-item md-size-100 move-left">
                    <span class="tags-label">Tag Event Vibe</span>
                    <span class="tags-inline"><md-chips v-model="vibe" class="md-primary no-padding"></md-chips></span>
                </div>
                <div class="md-layout-item md-size-100 move-left">
                    <span class="tags-label">Tag Event Location</span>
                    <span class="tags-inline"><md-chips v-model="location" class="md-primary no-padding"></md-chips></span>
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
                show: false,
                select1: 'Recommendation',
                select2: 'Space',
                select3: '4th July',
                select4: 'San Francisco',
                budget: ["Low Budget", "Medium Budget", "Go Wild"],
                vibe: ["Festive", "Casula", "Social", "Industrial"],
                location: ["In Doors", "Out Doors"],
                options: [
                    'test11',
                    'test12',
                    'test13',
                    'test14']
            };
        },
        created() {
          console.log(this.options)
        },
        mounted(){
            this.show = true
        },
        methods: {

        }
    }
</script>
<style>
    .no-margin{
        margin-top: 0px;
    }
    .m-top{
        margin-top: 15px;
    }
    .bg-gray{
        background-color: #F2F2F2!important;
    }
    .no-padding{
        padding-top: 0px!important;
        padding-bottom: 0px!important;
    }
    .move-left{
        text-align: left;
    }
</style>