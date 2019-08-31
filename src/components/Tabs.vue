<template>
    <md-card class="md-card-tabs"
             :class="[
      {'flex-column': flexColumn},
      {'nav-pills-icons': navPillsIcons},
      {'md-card-plain': plain}
    ]">
        <!--<md-card-header>
          <slot name="header-title"></slot>
        </md-card-header>-->
        <md-card-content>
            <md-list class="nav-tabs md-card" style=" margin-top: -15px; width: 110%; margin-left: -55px; padding-left: 55px; margin-bottom:0; justify-content: center;">
                <md-list-item
                    v-for="(item, index) in tabName"
                    @click="switchPanel(tabName[index])"
                    :key="item"
                    :class="[
            {active: isActivePanel(tabName[index])},
            {[getColorButton(colorButton)]: isActivePanel(tabName[index])}]">
                    <div v-html="tabName[index]"></div>
                    <md-icon v-if="navPillsIcons">{{tabIcon[index]}}</md-icon>
                </md-list-item>
            </md-list>

            <transition name="fade" mode="out-in">
                <div class="tab-content">
                    <template v-for="(item, index) in tabName">
                        <template v-if="isActivePanel(tabName[index])">
                            <div :class="getTabContent(index + 1)" :key="item">
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
    import _ from 'underscore';

  export default {
    props: {
      flexColumn: Boolean,
      navPillsIcons: Boolean,
      plain: {
        type: Boolean,
        default: true
      },
      tabName: Array,
      tabIcon: Array,
      colorButton: {
        type: String,
        default: ""
      },
      syncRouter: Boolean,
    },
    data() {
      return {
        activePanel: this.tabName[0]
      };
    },
    computed: {},
    created(){
    },
    mounted(){
      this.$on('event-planner-nav-switch-panel',(index)=>{
        this.switchPanel(this.tabName[index]);
      })

      this.$root.$on('goToTab',(value)=>{
        this.activePanel = value
      });

      if (this.syncRouter) {
        this.switchPanel(this.$route.query.t || 0);
      }
    },
    methods: {
      switchPanel(panel) {
        this.activePanel = panel;
        if (this.syncRouter && this.activePanel) {
          let panelIndex = _.findIndex(this.tabName, (t) => {
            return t === this.activePanel;
          });
          if (panelIndex > -1) {
            this.$router.push({query: {t: panelIndex}})
          }
        }
      },
      isActivePanel(panel) {
        return this.activePanel === panel;
      },
      getColorButton: function(colorButton) {
        return "md-" + colorButton + "";
      },
      getTabContent: function(index) {
        return "tab-pane-" + index + "";
      }
    }
  };
</script>

<style lang="css">
</style>
