<template>
  <div class="md-layout interactions-list">
    <div class="md-layout-item md-medium-size-45 md-size-35">
      <md-card style="min-height: 50%;">
        <md-card-header class="md-card-header-text md-card-header-warning">
          <div class="card-text">
            <h4 class="title" style="color: white;">Manage Groups</h4>
          </div>
        </md-card-header>
        <md-card-content style="min-height: 100%;">
          <vue-element-loading :active="working" spinner="ring" color="#FF547C"/>
          <md-table :md-card="false"  v-model="groupsList" >
            <md-table-row slot="md-table-row" slot-scope="{ item, index }" :class="{'visible-row':item.editMode,'not-visible-row':!item.editMode}" @click="editInteraction(item)">
              <md-table-cell class="text-center">
                <md-switch class="md-switch-rose" style="margin: auto;"  v-model="item.enabled" @change="enable($event, item)"></md-switch>
              </md-table-cell>
              <md-table-cell >
                <h5 class="" style="margin: 0; padding-top: 4px;">{{ item.title }}</h5>
                <div class="timing-form" v-if="item.editMode">
                  <md-card class="md-card-plain md-gutter" style="margin: 0; padding: 0;">
                    <md-card-content style="padding: 12px 0;">
                      <div class="md-layout">
                        <div class="md-layout-item md-size-65">
                          <md-field>
                            <label>Send this interaction</label>
                            <md-select v-model="item.sendDateOption" name="sendDateOption" id="sendDateOption">
                              <md-option value="sendOnDate">On a specific date</md-option>
                              <md-option value="sendDaysBeforeEvent">Days before the event</md-option>
                            </md-select>
                          </md-field></div>
                        <div class="md-layout-item md-size-35">
                          <md-field v-if="item.sendDateOption === 'sendOnDate'">
                            <md-input v-model="item.sendOnDate"
                                      data-vv-name="sendOnDate"
                                      v-focus/>
                          </md-field>
                          <md-field v-if="item.sendDateOption === 'sendDaysBeforeEvent'">
                            <md-input v-model="item.sendDaysBeforeEvent"
                                      data-vv-name="sendDaysBeforeEvent" v-focus/>
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
    <div class="md-layout-item md-medium-size-55 md-size-65">
      <event-group-details :group-data.sync="visibleGroup" :event-data="eventData"></event-group-details>
    </div>
  </div>
</template>
<script>
  import EventInteraction from '@/models/EventInteraction';
  import EventGroupDetails from './EventGroupDetails';
  import Calendar from '@/models/Calendar';

  export default {
    name: 'event-groups-list',
    components: {
      EventGroupDetails
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
        groupsList: [],
        visibleGroup: { title: ''}
      };
    },
    mounted(){
      this.working = true;
    },
    watch: {
      eventData(newVal, oldVal){

      }
    },
    methods: {

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
