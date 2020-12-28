<template>
  <div class="new-event-side-bar" :data-color="activeColor" :data-background-color="backgroundColor">
    <div class="sidebar-menu">
      <md-button
        v-if="toggleMenu === false"
        class="md-round md-simple md-just-icon md-transparent menu-button"
        @click="toggleMenu = true"
      >
        <img :src="`${menuIconsURL}Group 2763.svg`" width="30" style="width: 30px !important" />
      </md-button>
      <md-button v-else class="md-round md-simple md-just-icon md-transparent" @click="toggleMenu = false">
        <img :src="`${menuIconsURL}Group 2763 (2).svg`" width="20" style="width: 20px !important" />
      </md-button>

      <div class="sidebar-menu__list" v-if="toggleMenu">
        <!-- <div class="sidebar-menu__item">
          <div class="item-route">
            <img :src="`${menuIconsURL}Asset 115.svg`" /> Search
          </div>
        </div> -->
        <div class="sidebar-menu__item">
          <div class="item-route" @click="goTo('/profile')"><img :src="`${menuIconsURL}Asset 117.svg`" /> Profile</div>
          <div class="item-action" @click="goTo('/signout')">
            Sign Out
            <img :src="`${menuIconsURL}Asset 118.svg`" />
          </div>
        </div>
        <div class="sidebar-menu__item">
          <div class="item-route" @click="goTo('/events')"><img :src="`${menuIconsURL}Asset 114.svg`" /> My Events</div>
        </div>
        <div class="sidebar-menu__item" @click="goTo('/settings')">
          <div class="item-route"><img :src="`${menuIconsURL}Asset 116.svg`" /> Settings</div>
        </div>
        <div class="sidebar-menu__item" @click="goToHelp">
          <div class="item-route"><img :src="`${menuIconsURL}Asset 117.svg`" /> Help</div>
        </div>
        <div class="sidebar-menu__item">
          <div class="item-route" @click="goTo('/vendors-pool')">
            <img :src="`${menuIconsURL}Asset 117.svg`" /> Vendors Pool
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar-wrapper" ref="sidebarScrollArea">
      <md-list class="nav">
        <sidebar-item
          name="left-menu-events-list"
          class="left-menu-events-list"
          :link="{
            name: 'Event Details',
            icon: 'outlined_flag',
            path: `/events/${event.id}/overview`,
            startLink: `/events/${event.id}/overview`,
          }"
        ></sidebar-item>
        <sidebar-item
          name="left-menu-events-list"
          class="left-menu-events-list"
          :link="{
            name: 'Events Lists',
            icon: 'check_circle_outline',
            path: taskUrl,
            startLink: `/events/${event.id}/booking`,
          }"
        ></sidebar-item>
        <sidebar-item
          name="left-menu-yearly-plan"
          class="left-menu-yearly-plan"
          :disabled="event.budgetProgress !== 100"
          :link="{
            name: 'Event Budget',
            icon: 'attach_money',
            path: `/events/${event.id}/edit/budget`,
            startLink: `/events/${event.id}/edit/budget`,
          }"
        ></sidebar-item>
        <!-- <sidebar-item
          name="left-menu-yearly-plan"
          class="left-menu-yearly-plan disabled"
          v-else
        ></sidebar-item>-->
      </md-list>
    </div>
    <div class="logo">
      <a href="/" class="simple-text logo-mini visible-on-sidebar-mini">
        <div class="logo-img">
          <img :src="logo" />
          <!--<md-icon>calendar_today</md-icon>-->
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import SidebarItem from "./NewSidebarItem";
import eventService from "@/services/event.service";

export default {
  name: "sidebar",
  data: () => {
    return {
      newTimeLineIconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/Timeline-New/",
      menuIconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/menu _ checklist/SVG/",
      toggleMenu: false,
      currentUrl: "",
    };
  },
  props: {
    title: {
      type: String,
      default: "maryoku",
    },
    rtlTitle: {
      type: String,
      default: "maryoku",
    },
    activeColor: {
      type: String,
      default: "rose",
      validator: (value) => {
        let acceptedValues = ["", "primary", "azure", "green", "orange", "danger", "rose"];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    backgroundImage: {
      type: String,
      default: "https://static-maryoku.s3.amazonaws.com/storage/img/sidebar-2.jpg",
    },
    backgroundColor: {
      type: String,
      default: "white",
      validator: (value) => {
        let acceptedValues = ["", "black", "white", "red"];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    logo: {
      type: String,
      default: "https://static-maryoku.s3.amazonaws.com/storage/maryoku+-+logo+square+dark%402x.png",
    },
    fullLogo: {
      type: String,
      default: "https://static-maryoku.s3.amazonaws.com/storage/maryoku+-+logo+dark%402x.png",
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
    event: {
      type: Object,
      default: {},
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  methods: {
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
    goTo(router) {
      this.toggleMenu = false;
      this.$router.push(router);
    },
    goToHelp() {
      localStorage.setItem("currentEventId", this.$route.params.id);
      this.goTo("/welcome/event");
    },
    fetchUrl() {
      this.currentUrl = this.$router.history.current.path;
    },
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`,
      };
    },
    isEventPage() {
      return this.currentUrl.indexOf("event") >= 0;
    },
    isEventPage() {
      return this.$router.history.current.path.indexOf("event") >= 0;
    },
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
  components: {
    SidebarItem,
  },
  created() {
    this.fetchUrl();
    this.taskUrl = eventService.getFirstTaskLink(this.event);
  },
  watch: {
    $route: "fetchUrl",
    event: {
      handler(newEvent) {
        this.taskUrl = eventService.getFirstTaskLink(newEvent);
      },
      deep: true,
    },
  },
};
</script>
<style>
.menu-button {
  border-radius: 30px;
  width: calc(100% - 0.5em) !important;
  margin: 30px 0px !important;
}
@media (min-width: 992px) {
  .navbar-search-form-mobile,
  .nav-mobile-menu {
    display: none;
  }
}
</style>
