<template>
  <div class="md-layout interactions-list">
    <div class="md-layout-item md-medium-size-55 md-size-45">
      <md-card style="min-height: 50%;">
        <md-card-header class="md-card-header-text md-card-header-warning">
          <div class="card-text text-left">
            <h4 class="title" style="color: white;">
              Interactions
            </h4>
          </div>
        </md-card-header>
        <md-card-content style="min-height: 100%;">
          <vue-element-loading :active="working" spinner="ring" color="#FF547C" />
          <md-table v-model="possibleInteractionsList" :md-card="false">
            <md-table-row slot="md-table-row" slot-scope="{ item, index }" :class="{'visible-row':item.editMode,'not-visible-row':!item.editMode}" @click="editInteraction(item)">
              <md-table-cell class="text-center">
                <md-switch v-model="item.enabled" class="md-switch-rose" style="margin: auto;" @change="enable($event, item)" />
              </md-table-cell>
              <md-table-cell>
                <h5 class="text-left" style="margin: 0; padding-top: 4px;">
                  {{ item.title }}
                </h5>
                <div v-if="item.editMode" class="timing-form">
                  <md-card class="md-card-plain md-gutter" style="margin: 0; padding: 0;">
                    <md-card-content style="padding: 12px 0;">
                      <div class="md-layout interaction-fields">
                        <div class="md-layout-item md-size-65">
                          <md-field>
                            <label>Send this interaction</label>
                            <md-select id="sendDateOption" v-model="item.sendDateOption" name="sendDateOption">
                              <md-option value="sendOnDate">
                                On a specific date
                              </md-option>
                              <md-option value="sendDaysBeforeEvent">
                                Days before the event
                              </md-option>
                            </md-select>
                          </md-field>
                        </div>
                        <div class="md-layout-item md-size-35">
                          <md-field v-if="item.sendDateOption === 'sendOnDate'">
                            <md-input v-model="item.sendOnDate"
                                      v-focus
                                      data-vv-name="sendOnDate"
                            />
                          </md-field>
                          <md-field v-if="item.sendDateOption === 'sendDaysBeforeEvent'">
                            <md-input v-model="item.sendDaysBeforeEvent"
                                      v-focus data-vv-name="sendDaysBeforeEvent"
                            />
                          </md-field>
                        </div>
                        <div class="md-layout-item md-size-100 checkbox-section">
                          <md-checkbox :id="`include-${index}`"
                                       v-model="item.includePageLink" @md-change="this.$forceUpdate()"
                          />
                          <!--<label style=" margin:  14px 16px 14px 0" :for="`include-${index}`">Include a link to the <a :href="`/#/events/${eventData ? eventData.id : ''}/public`">event public page</a>?</label>-->
                          <label style=" margin:  14px 16px 14px 0; font-size: 12px;" :for="`include-${index}`">Include a link to the event public page?</label>
                        </div>
                      </div>
                    </md-card-content>
                  </md-card>
                </div>
              </md-table-cell>
              <md-table-cell class="text-right">
                <md-button v-if="!item.editMode" class="md-round md-warning md-just-icon" @click="editInteraction(item)">
                  <md-icon>edit</md-icon>
                  <md-tooltip md-direction="top">
                    Set timing and preview
                  </md-tooltip>
                </md-button>
                <md-button v-if="item.editMode" class="md-success md-tiny" style="width: auto !important; margin: 8px;" :disabled="working" @click="saveInteraction(item)">
                  Save
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-medium-size-45 md-size-55">
      <interaction-preview :interaction-data.sync="visibleInteraction" :event-data="eventData" />
    </div>
  </div>
</template>
<script>
import EventInteraction from "@/models/EventInteraction";
import InteractionPreview from "./InteractionPreview";
import Calendar from "@/models/Calendar";

export default {
  name: "InteractionsList",
  components: {
    InteractionPreview
  },
  props: {
    eventData: {
      type: Object,
      default: () => { return { title: ""}; }
    }
  },
  data () {
    return {
      working: false,
      possibleInteractionsList: [],
      visibleInteraction: { title: ""}
    };
  },
  watch: {
    eventData (newVal, oldVal) {
      this.refreshList(false);
    }
  },
  mounted () {
    this.working = true;
    if (this.eventData) {
      this.refreshList(false);
    }
  },
  methods: {
    refreshList (force) {
      new EventInteraction().get().then(res => {
        this.possibleInteractionsList = res;

        this.possibleInteractionsList.forEach(possibleInteraction => {
          possibleInteraction.event = {id: this.eventData.id};
        });

        let firstEnabledInteraction = null;
        new EventInteraction().for(new Calendar({id: this.$auth.user.defaultCalendarId}), this.eventData).get().then(interactions => {
          interactions.forEach(interaction => {
            this.possibleInteractionsList.forEach(possibleInteraction => {
              if (possibleInteraction.templateId === interaction.templateId) {
                Object.assign(possibleInteraction, interaction);

                if (possibleInteraction.enabled && !firstEnabledInteraction) {
                  firstEnabledInteraction = possibleInteraction;
                }
              }
            });
          });
          this.editInteraction(firstEnabledInteraction || this.possibleInteractionsList[0]);
          this.working = false;
        });
      }).catch((e) => {
        console.error(e);
        this.working = false;
      });
    },
    editInteraction (item) {
      if (item.editMode) return;

      this.possibleInteractionsList.forEach((interaction) => {
        interaction.editMode = false;
      });
      item.editMode = true;
      this.visibleInteraction = item;
      if (!item.id) { // Existing
        Object.assign(this.visibleInteraction, {templateImage: item.options[0], sendDaysBeforeEvent: 15, line1: item.title, line2: this.$moment(this.eventData.eventStartMillis).format("MM-DD-YYYY"), line3: this.eventData.title});
      }
      this.$forceUpdate();
    },
    saveInteraction (item) {
      console.log(JSON.stringify(item));
      this.working = true;
      new EventInteraction(item).for(new Calendar({id: this.$auth.user.defaultCalendarId}), this.eventData).save().then(res => {
        this.working = false;
      }).catch((e) => {
        console.error(e);
        this.working = false;
      });
    },
    enable (e, item) {
      item.enabled = e;
      this.$forceUpdate();
    }
  }
};
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/md/_colors.scss';
    .visible-row {
        h5 {
            font-weight: 500;
        }
        border : 1px solid $grey-300;
    }
    .not-visible-row {
        cursor: pointer;
    }

    .md-table-content {
        thead {
            display: none !important;
        }

        .md-table-row:not(:last-child) td {
            border-bottom-color: #ddd !important;
            border-top: 0 solid ;
            border-bottom: 1px solid ;
        }
    }
</style>
