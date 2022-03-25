<template>
  <md-card id="card-tabs-999" class="md-card-tabs"
           :class="[
             {'flex-column': flexColumn},
             {'nav-pills-icons': navPillsIcons},
             {'md-card-plain': plain}]"
  >
    <!--<md-card-header>
          <slot name="header-title"></slot>
        </md-card-header>-->
    <md-card-content class="clear-margins">
      <md-list class="nav-tabs" style="box-shadow: none !important;">
        <!--style="background-color: white !important; margin-top: -15px; width: 110%; margin-left: -55px; padding-left: 55px; margin-bottom:0; justify-content: flex-start;">-->
        <md-list-item
          v-for="(item, index) in tabName"
          :key="item"
          :disabled="navigationDisabled && !isActivePanel(tabName[index])"
          :class="[
            {active: isActivePanel(tabName[index])},
            {[getColorButton(colorButton)]: isActivePanel(tabName[index])}]"
          @click="ignore(tabName[index])"
        >
          {{ tabName[index] }}
          <md-icon v-if="navPillsIcons">
            {{ tabIcon[index] }}
          </md-icon>
        </md-list-item>
      </md-list>

      <transition name="fade" mode="out-in">
        <div class="tab-content mx-auto">
          <template v-for="(item, index) in tabName">
            <template v-if="isActivePanel(tabName[index])">
              <div :key="item" :class="getTabContent(index + 1)">
                <slot :name="getTabContent(index + 1)">
                  This is the default text!
                </slot>
              </div>
            </template>
          </template>
        </div>
      </transition>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: "NavTabs",
  props: {
    navigationDisabled: {
      type: Boolean,
      required: true,
    },
    flexColumn: {
      type: Boolean,
      required: true,
    },
    navPillsIcons: {
      type: Boolean,
      required: true,
    },
    plain: {
      type: Boolean,
      required: true,
    },
    tabName: {
      type: Array,
      required: true,
    },
    tabIcon: {
      type: Array,
      required: true,
    },
    colorButton: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      activePanel: this.tabName[0]
    };
  },
  computed: {},
  mounted () {
    this.$root.$on("switch-panel", (index) => {
      this.switchPanel(this.tabName[index]);
    });
  },
  beforeDestroy () {
    this.$root.$off("switch-panel");
  },
  methods: {
    ignore (panel) {
      if (!this.navigationDisabled) {
        this.switchPanel(panel);
      }
    },
    switchPanel (panel) {
      this.activePanel = panel;
    },
    isActivePanel (panel) {
      return this.activePanel === panel;
    },
    getColorButton: function (colorButton) {
      return "md-" + colorButton + "";
    },
    getTabContent: function (index) {
      return "tab-pane-" + index + "";
    }
  }
};
</script>

<style lang="css">
    #card-tabs-999 .md-list-item-container {
        border-radius: 5px !important;
    }
</style>
