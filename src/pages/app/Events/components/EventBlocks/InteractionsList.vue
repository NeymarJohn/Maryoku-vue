<template>
  <div class="md-layout interactions-list">
    <div class="md-layout-item md-size-45">
      <md-card style="min-height: 50%;">
        <md-card-header class="md-card-header-text md-card-header-blue">
          <div class="card-text">
            <h4 class="title" style="color: white;">Manage Interactions</h4>
          </div>
        </md-card-header>
        <md-card-content>
          <vue-element-loading :active="working" spinner="ring" color="#FF547C"/>
          <md-table :md-card="false"  v-model="possibleInteractionsList" >
            <md-table-row slot="md-table-row" slot-scope="{ item, index }" :class="{'visible-row':item.editMode,'not-visible-row':!item.editMode}" @click="editInteraction(item)">
              <md-table-cell class="text-center">
                <md-switch class="md-switch-rose" style="margin: auto;"  v-model="item.enabled"></md-switch>
              </md-table-cell>
              <md-table-cell >
                <h5 class="" style="margin: 0; padding-top: 4px;">{{ item.title }}</h5>
                <div class="timing-form" v-if="item.editMode">
                  <md-card class="md-card-plain md-gutter" style="margin: 0; padding: 0;">
                    <md-card-content style="padding: 12px 0;">
                      <div class="md-layout">
                        <div class="md-layout-item md-medium-size-100 md-size-45">
                          <md-field>
                            <label>Send on specific date</label>
                            <md-input v-model="item.sendOnDate"
                                      data-vv-name="sendOnDate"
                                      v-focus/>
                          </md-field>
                        </div>
                        <div class="md-layout-item md-medium-size-100 md-size-10" style="margin-top: auto; margin-bottom: auto; font-weight: 500;">
                          OR
                        </div>
                        <div class="md-layout-item md-medium-size-100 md-size-45">
                          <md-field>
                            <label>Days before the event</label>
                            <md-input v-model="item.sendDaysBeforeEvent"
                                      data-vv-name="sendDaysBeforeEvent"/>
                          </md-field>
                        </div>
                        <div class="md-layout-item md-size-100">
                          <md-checkbox v-model="item.includePageLink"
                                       :id="`include-${index}`"></md-checkbox>
                          <!--<label style=" margin:  14px 16px 14px 0" :for="`include-${index}`">Include a link to the <a :href="`/#/events/${eventData ? eventData.id : ''}/public`">event public page</a>?</label>-->
                          <label style=" margin:  14px 16px 14px 0" :for="`include-${index}`">Include a link to the event public page?</label>
                        </div>
                      </div>
                    </md-card-content>
                  </md-card>
                </div>
              </md-table-cell>
              <md-table-cell class="text-right">
                <md-button class="md-round md-warning md-just-icon" v-if="!item.editMode" @click="editInteraction(item)">
                  <md-icon>edit</md-icon>
                  <md-tooltip md-direction="top">Set timing and preview</md-tooltip>
                </md-button>
                <md-button class="md-success md-tiny" style="width: auto !important; margin: 8px;" v-if="item.editMode" @click="saveInteraction(item)" :disabled="working">
                  Save
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-55">
      <interaction-preview :interactionData="visibleInteraction" :event-data="eventData"></interaction-preview>
    </div>
  </div>
</template>
<script>
  import EventInteraction from '@/models/EventInteraction';
  import InteractionPreview from './InteractionPreview';
  import Calendar from '@/models/Calendar';

  export default {
    name: 'interactions-list',
    components: {
      InteractionPreview
    },
    props: {
      eventData: {
        type: Object,
        default: ()=>{ return { title: ''};}
      }
    },
    data() {
      return {
        working: false,
        possibleInteractionsList: [],
        visibleInteraction: { title: ''}
      };
    },
    mounted(){
      this.working = true;
    },
    watch: {
      eventData(newVal, oldVal){
        new EventInteraction().get().then(res=>{
          this.possibleInteractionsList = res;

          new EventInteraction().for(new Calendar({id: this.$auth.user.defaultCalendarId}),this.eventData).get().then(interactions=>{
            interactions.forEach(interaction=>{
              this.possibleInteractionsList.forEach(possibleInteraction=>{
                if (possibleInteraction.templateId === interaction.templateId){
                  possibleInteraction.enabled = true;
                }
              });
            });
            this.editInteraction(this.possibleInteractionsList[0]);
            this.working = false;
          });
        }).catch((e)=>{
          console.error(e);
          this.working = false;
        });
      }
    },
    methods: {
      editInteraction(item){
        this.possibleInteractionsList.forEach((interaction)=>{
          interaction.editMode = false;
        });
        item.editMode = true;
        this.visibleInteraction = item;
        if (!item.id){ //Existing
          Object.assign(this.visibleInteraction, {templateImage: item.options[0],sendDaysBeforeEvent: 15, line1: this.eventData.title, line2: this.$moment(this.eventData.eventStartMillis).format('MM-DD-YYYY, H:mm A'), line3: ''});
        }
        this.$forceUpdate();
      },
      saveInteraction(item){
        console.log(JSON.stringify(item));
        this.working = true;
        if (item.id) { //Existing

        } else {
          new EventInteraction(item).for(new Calendar({id: this.$auth.user.defaultCalendarId}),this.eventData).save().then(res=>{
            this.working = false;
          }).catch((e)=>{
            console.error(e);
            this.working = false;
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/md/_colors.scss';
  .visible-row {
    h5 {
      font-weight: 500;
      color: $pink-262;
    }
    background-color: $grey-50;
  }
  .not-visible-row {
    cursor: pointer;
  }
</style>
