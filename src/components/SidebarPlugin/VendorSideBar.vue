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
          <div class="item-route" @click="goTo('/profile/settings')">
            <img :src="`${menuIconsURL}Asset 117.svg`" /> Profile
          </div>
          <div class="item-action" @click="goTo('/signout')">
            Sign Out
            <img :src="`${menuIconsURL}Asset 118.svg`" />
          </div>
        </div>
        <div class="sidebar-menu__item">
          <div class="item-route" @click="goTo('/events')"><img :src="`${menuIconsURL}Asset 114.svg`" /> My Events</div>
        </div>
        <div class="sidebar-menu__item" @click="goTo(`/events/${event.id}/booking/overview?walkWithMe=true`)">
          <div class="item-route"><img :src="`${menuIconsURL}Asset 116.svg`" /> Product tour</div>
        </div>
        <div class="sidebar-menu__item" @click="goToHelp">
          <div class="item-route"><img :src="`${menuIconsURL}Asset 117.svg`" /> About the product</div>
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
            iconUrl: '/static/icons/vendor/dashboard.svg',
            iconActiveUrl: '/static/icons/vendor/dashboard-active.svg',
            path: `/vendor/dashboard`,
            startLink: `/vendor/dashboard`,
          }"
        ></sidebar-item>
        <sidebar-item
          name="left-menu-events-list"
          class="left-menu-events-list"
          :link="{
            name: 'Events Lists',
            iconUrl: '/static/icons/vendor/proposal.svg',
            iconActiveUrl: '/static/icons/vendor/proposal-active.svg',
            path: `/vendor/dashboard`,
            startLink: `/vendor/dashboard`,
          }"
        ></sidebar-item>
        <sidebar-item
          name="left-menu-yearly-plan"
          class="left-menu-yearly-plan"
          :link="{
            name: 'Event Budget',
            iconUrl: '/static/icons/vendor/profile.svg',
            iconActiveUrl: '/static/icons/vendor/profile-active.svg',
            path: `/vendor/profile/settings`,
            startLink: `/vendor/profile/`,
          }"
        ></sidebar-item>
        <sidebar-item
          name="left-menu-yearly-plan"
          class="left-menu-yearly-plan"
          :link="{
            name: 'Event Budget',
            iconUrl: '/static/icons/vendor/revenue.svg',
            iconActiveUrl: '/static/icons/vendor/revenue-active.svg',
            path: `/vendor/dashboard`,
            startLink: `/vendor/dashboard`,
          }"
        ></sidebar-item>
        <sidebar-item
          name="left-menu-yearly-plan"
          class="left-menu-yearly-plan"
          :link="{
            name: 'Event Budget',
            iconUrl: '/static/icons/vendor/message.svg',
            iconActiveUrl: '/static/icons/vendor/message-active.svg',
            path: `/vendor/dashboard`,
            startLink: `/vendor/dashboard`,
          }"
        ></sidebar-item>
      </md-list>
    </div>
    <div class="logo">
      <a href="/" class="simple-text logo-mini visible-on-sidebar-mini">
        <div class="logo-img">
          <img :src="`${$iconURL}VendorDashboard/maryoku-logo-dark.png`" />
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
    reloadPage() {
      location.href = `/#/events/${this.event.id}/booking/overview?walkWithMe=true`;
      location.reload();
      this.toggleMenu = false;
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
<style lang="scss" scoped>
.new-event-side-bar {
  display: block;
  font-weight: 200;
  z-index: 9999;
  width: 80px;
  box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12),
    0 8px 10px -5px rgba(0, 0, 0, 0.2);
  background-size: cover;
  background-position: 50%;
  background: #fff;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  .sidebar-wrapper {
    /deep/ .md-list {
      li {
        &:first-child {
          border-top: 1px solid rgba(0, 0, 0, 0.13);
        }
        border-bottom: 1px solid rgba(0, 0, 0, 0.13);

        a {
          display: block;
          text-align: center;
          padding: 1.5em 0.6em;

          .md-icon.md-theme-default.md-icon-font {
            color: #000 !important;
          }
        }

        &.active {
          border-left: 10px solid #641856;

          a.nav-link {
            background: none;
            box-shadow: none;
            border-radius: 0;
            .md-icon.md-theme-default.md-icon-font {
              color: #641856 !important;
            }
          }
        }
      }
    }
  }

  .logo-mini {
    display: block !important;
    position: fixed;
    bottom: 2em;
    left: 0.6em;
    width: 60px;
  }

  .logo-img {
    text-align: center;
    overflow: hidden;
    max-width: 40px;
    margin: auto;
    img {
      max-width: unset;
    }
  }
}
</style>
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
