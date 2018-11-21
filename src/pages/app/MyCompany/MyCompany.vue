<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
      <nav-tabs-card>
        <template slot="content">
          <!--<span class="md-nav-tabs-title">Tasks:</span>-->
          <md-tabs md-sync-route class="md-rose" md-alignment="fixed">

            <md-tab id="tab-dashboard" md-label="Dashboard" >
              <md-table v-model="firstTabs" @md-selected="onSelect">
                <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
                  <md-table-cell >{{ item.tab }}</md-table-cell>
                  <md-table-cell>
                    <md-button class="md-just-icon md-simple md-primary">
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="top">Edit</md-tooltip>
                    </md-button>
                    <md-button class="md-just-icon md-simple md-danger">
                      <md-icon>close</md-icon>
                      <md-tooltip md-direction="top">Close</md-tooltip>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-tab>

            <md-tab id="tab-company-profile" md-label="Company Profile" >
              <md-table v-model="firstTabs" @md-selected="onSelect">
                <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
                  <md-table-cell >{{ item.tab }}</md-table-cell>
                  <md-table-cell>
                    <md-button class="md-just-icon md-simple md-primary">
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="top">Edit</md-tooltip>
                    </md-button>
                    <md-button class="md-just-icon md-simple md-danger">
                      <md-icon>close</md-icon>
                      <md-tooltip md-direction="top">Close</md-tooltip>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-tab>

            <md-tab id="tab-approvals" md-label="Approvals Sign Off" >
              <md-table v-model="firstTabs" @md-selected="onSelect">
                <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
                  <md-table-cell >{{ item.tab }}</md-table-cell>
                  <md-table-cell>
                    <md-button class="md-just-icon md-simple md-primary">
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="top">Edit</md-tooltip>
                    </md-button>
                    <md-button class="md-just-icon md-simple md-danger">
                      <md-icon>close</md-icon>
                      <md-tooltip md-direction="top">Close</md-tooltip>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-tab>

            <md-tab id="tab-billing" md-label="Billing" >
              <md-table v-model="firstTabs" @md-selected="onSelect">
                <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
                  <md-table-cell >{{ item.tab }}</md-table-cell>
                  <md-table-cell>
                    <md-button class="md-just-icon md-simple md-primary">
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="top">Edit</md-tooltip>
                    </md-button>
                    <md-button class="md-just-icon md-simple md-danger">
                      <md-icon>close</md-icon>
                      <md-tooltip md-direction="top">Close</md-tooltip>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-tab>

            <md-tab id="tab-settings" md-label="Settings" >
              <md-table v-model="firstTabs" @md-selected="onSelect">
                <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
                  <md-table-cell >{{ item.tab }}</md-table-cell>
                  <md-table-cell>
                    <md-button class="md-just-icon md-simple md-primary">
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="top">Edit</md-tooltip>
                    </md-button>
                    <md-button class="md-just-icon md-simple md-danger">
                      <md-icon>close</md-icon>
                      <md-tooltip md-direction="top">Close</md-tooltip>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-tab>
          </md-tabs>
        </template>
      </nav-tabs-card>
    </div>
    <!--<div class="md-layout-item md-size-100 md-medium-size-100">
      <tabs
        :tab-name="['Home', 'Settings']"
        :tab-icon="['dashboard', 'schedule']"
        plain
        color-button="rose">

        &lt;!&ndash; here you can add your content for tab-content &ndash;&gt;
        <template slot="tab-pane-1">
          <div class="md-layout-item md-size-15 md-medium-size-15 mt-0">
            <div class="md-card">
              abc
            </div>
          </div>
          <div class="md-layout-item md-size-50 md-medium-size-50 mt-0">
            <div class="md-card">
              efg
            </div>
          </div>
        </template>
        <template slot="tab-pane-2">
          Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
          <br><br>
          Dramatically maintain clicks-and-mortar solutions without functional solutions.
        </template>
      </tabs>
    </div>-->
  </div>
</template>

<script>
  import { Tabs, NavTabsCard } from "@/components";

export default {
  components: {
    Tabs,
    NavTabsCard,
  },
  data() {
    return {
      firstTabs: [
        {
          tab: 'Sign contract for "What are conference organizers afraid of?"'
        },
        {
          tab: "Lines From Great Russian Literature? Or E-mails From My Boss?"
        },
        {
          tab:
            "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit"
        }
      ],
    };
  },
  methods: {
    onSelect: function(items) {
      this.selected = items;
    },
  }
};
</script>
