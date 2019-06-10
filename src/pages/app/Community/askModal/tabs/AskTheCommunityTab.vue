<template>
    <div  class="md-layout-item md-size-100 m-top">
                <div class="grid-col">
                    <span class="custom-label">Let the community know what you are looking for</span>
                        <div class="md-layout-item md-medium-size-100 md-size-100">
                            <md-field  v-if="show" class="no-margin">
                                <md-select v-model="interest" name="select">
                                    <md-option v-for="(option, index) in interests"  :key="index"  :value="option">{{ option }}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                    </div>
                <div class="grid-col">
                    <span class="custom-label">The type of service or product you are inquiring about.</span>
                    <div class="md-layout-item md-medium-size-100 md-size-100">
                        <md-field class="no-margin">
                            <md-select v-model="occasion" name="select">
                                <md-option  v-for="(option, index) in occasions"  :key="index" :value="option">{{ option }}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div>
        <div class="grid-col">
                <span class="custom-label">The occasion you are celebrating</span>
                <div class="md-layout-item md-medium-size-100 md-size-100">
                    <md-field class="no-margin">
                        <md-select v-model="event" name="select">
                            <md-option  v-for="(option, index) in events"  :key="index"  :value="option">{{ option }}</md-option>
                        </md-select>
                    </md-field>
                </div>
            </div>
                <div class="grid-col">
                    <span class="custom-label">Where will the event take place(mostly useful to get local vendors & reccomendations)</span>
                    <div class="md-layout-item md-medium-size-100 md-size-100">
                        <md-field class="no-margin">
                            <md-select v-model="location" name="select">
                                <md-option  v-for="(option, index) in locations"  :key="index"  :value="option">{{ option }}</md-option>
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
                    <span class="tags-inline"><md-chips v-model="tagsLocation" class="md-primary no-padding"></md-chips></span>
                </div>
                <md-button @click="addData">add</md-button>
            </md-card-content>
        </md-card>
    </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import communityModule from '../communityModal.vuex';
    export default {
        components: {},
        data() {
            return {
                show: false,
                budget: ["Low Budget", "Medium Budget", "Go Wild"],
                vibe: ["Festive", "Casula", "Social", "Industrial"],
                tagsLocation: ["In Doors", "Out Doors"],
                interests: [
                    'recommendation',
                    'ranking',
                    'referral',
                    'introduction',
                    'inspiration'
                ],
                  occasions: [
                    'holiday',
                    'company event'
                  ],
                  events: [
                    'space',
                    'content',
                    'catering',
                    'service',
                    'product',
                    'give away'
                  ],
                  locations: [
                    'San Francisco',
                    'London',
                    'Argentina',
                    'England'
                  ],

            };
        },
      computed: {
        ...mapState('communityModal', ['askCommunityData']),
        recommendation: {
          get() {
            return this.askCommunityData.recommendation
          },
          set(value) {
            this.setMemberProperty({key: 'recommendation', actualValue: value})
          },

        },

        interest: {
          get() {
            return this.askCommunityData.interest
          },
          set(value) {
            this.setMemberProperty({key: 'interest', actualValue: value})
          },

        },
        occasion: {
          get() {
            return this.askCommunityData.occasion
          },
          set(value) {
            this.setMemberProperty({key: 'occasion', actualValue: value})
          },

        },
        event: {
          get() {
            return this.askCommunityData.event
          },
          set(value) {
            this.setMemberProperty({key: 'event', actualValue: value})
          }
        },
        location: {
          get() {
            return this.askCommunityData.location
          },
          set(value) {
            this.setMemberProperty({key: 'location', actualValue: value})
          }
        }
      },
        created() {
        },
        mounted(){
            this.show = true
        },
        methods: {
          ...mapMutations('communityModal', [
              'setMemberProperty',
            ]),
          async addData(){

              let ask = await CommunityAsks.first();
                ask.answers().attach(this.askCommunityData).then(response => {


              })
          }
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
        background-color: #F2F2F2 !important;
    }
    .no-padding{
        padding-top: 0px!important;
        padding-bottom: 0px!important;
    }
    .move-left{
        text-align: left;
    }
</style>
