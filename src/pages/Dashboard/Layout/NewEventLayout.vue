<template>
  <div :class="[{'nav-open': $sidebar.showSidebar}, {'rtl': $route.meta.rtlActive}]">
    <notifications></notifications>
    <div class="main-panel" style="height: 50%;">
      <div
        :class="{content: !$route.meta.hideContent}"
        @click="toggleSidebar"
        style="padding-right : 0;"
        v-if="renderChild"
      >
        <!-- your content here -->
        <side-bar :event="eventData"></side-bar>
        <zoom-center-transition :duration="200" mode="out-in">
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <div class="error-page" v-else>
        <span v-if="showError">We cannot get your event. Please check your link or try again later.</span>
      </div>
      <!--<content-footer v-if="!$route.meta.hideFooter"></content-footer>-->
    </div>
  </div>
</template>
<script>
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import EventModal from "../../app/Events/EventModal/";
import EventPlannerVuexModule from "../../app/Events/EventPlanner.vuex";
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import MobileMenu from "./Extra/MobileMenu.vue";
import UserMenu from "./Extra/UserMenu.vue";
import { ZoomCenterTransition } from "vue2-transitions";
import SideBar from "@/components/SidebarPlugin/NewSideBar";

// import auth from "src/auth";
import EventSidePanel from "@/pages/app/Events/EventSidePanel";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

export default {
  components: {
    TopNavbar,
    ContentFooter,
    MobileMenu,
    UserMenu,
    ZoomCenterTransition,
    SideBar
  },
  data() {
    return {
      // auth: auth,
      event: null,
      createEventModalOpen: false,
      renderChild: false,
      showError: false
    };
  },
  methods: {
    ...mapMutations("EventPlannerVuex", [
      "setEventModal",
      "setEditMode",
      "setModalSubmitTitle",
      "setEventModalAndEventData",
      "setNumberOfParticipants"
    ]),
    ...mapActions("event", [
      "getEventAction"
    ]),
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    openEventModal() {
      this.setModalSubmitTitle("Create");
      let now = new Date();
      this.createEventModalOpen = true;
      window.currentPanel = this.$showPanel({
        component: EventSidePanel,
        cssClass: "md-layout-item md-size-40 transition36 ",
        openOn: "right",
        disableBgClick: false,
        props: {
          modalSubmitTitle: "Save",
          editMode: false,
          sourceEventData: {
            eventStartMillis: new Date().getTime(),
            numberOfParticipants: this.$auth.user.customer.numberOfEmployees
          },
          refreshEvents: null,
          year: now.getFullYear(),
          month: now.getMonth(),
          occasionsOptions: this.occasionsArray,
          openInPlannerOption: false
        }
      });

      window.currentPanel.promise.then(res => {
        this.createEventModalOpen = false;
      });
    },
    initData() {
      const calendar = new Calendar({ id: this.$store.state.auth.user.profile.defaultCalendarId });
      const eventId = this.$route.params.id
      if (!eventId) {
        this.renderChild = true
        return
      }
      this.getEventAction({eventId, calendar}).then(event=>{
        this.renderChild = true;
      }).catch(error=>{
        this.showError = true
        console.error(error)
      });
    }
  },
  created() {
    this.$store.registerModule("EventPlannerVuex", EventPlannerVuexModule);
  },
  mounted() {
    console.log("new.event.layout")
    this.$store.dispatch('auth/checkToken').then(()=>{
      this.initData();
    }).catch(()=>{
      this.$router.push({ path: `/signin`})
      return
    })
  },
  computed: {
    ...mapState('event', [
      'eventData',
    ]),
  },
};
</script>
<style lang="scss">
.menu-divider {
  height: 1px;
  margin-top: 10px;
  background-color: rgba(0, 0, 0, 0.12);
}

$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95;
}

@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95;
}
.error-page {
  font-size: 30px;
  margin: auto;
  padding: 200px;
  text-align: center;
}
</style>
