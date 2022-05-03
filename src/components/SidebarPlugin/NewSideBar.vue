<template>
  <div class="new-event-side-bar" :data-color="activeColor" :data-background-color="backgroundColor">
    <div class="sidebar-menu">
      <md-button class="md-round md-simple md-just-icon md-transparent menu-button" @click="toggleMenu = !toggleMenu">
        <img v-if="toggleMenu === false" :src="`${menuIconsURL}Group 2763.svg`">
        <img v-else :src="`${menuIconsURL}Group 2763 (2).svg`">
      </md-button>
      <div v-if="toggleMenu" class="sidebar-menu__list">
        <!-- <div class="sidebar-menu__item">
          <div class="item-route">
            <img :src="`${menuIconsURL}Asset 115.svg`" /> Search
          </div>
        </div> -->
        <div class="sidebar-menu__item">
          <div class="item-route" @click="goTo('/profile/settings')">
            <img :src="`${menuIconsURL}Asset 117.svg`"> Profile
          </div>
          <div class="item-action" @click="goTo('/signout')">
            Sign Out
            <img :src="`${menuIconsURL}Asset 118.svg`">
          </div>
        </div>
        <div class="sidebar-menu__item">
          <div class="item-route" @click="goTo('/events')">
            <img :src="`${menuIconsURL}Asset 114.svg`"> My Events
          </div>
        </div>
        <div class="sidebar-menu__item" @click="goTo(`/events/${event.id}/booking/overview?walkWithMe=true`)">
          <div class="item-route">
            <img :src="`${menuIconsURL}Asset 116.svg`"> Product tour
          </div>
        </div>
        <div class="sidebar-menu__item" @click="goToHelp">
          <div class="item-route">
            <img :src="`${menuIconsURL}Asset 117.svg`"> About the product
          </div>
        </div>
        <div class="sidebar-menu__item">
          <div class="item-route" @click="goTo('/vendors-pool')">
            <img :src="`${menuIconsURL}Asset 117.svg`"> Vendors Pool
          </div>
        </div>
      </div>
    </div>
    <div ref="sidebarScrollArea" class="sidebar-wrapper">
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
        />
        <sidebar-item
          name="left-menu-events-list"
          class="left-menu-events-list"
          :link="{
            name: 'Events Lists',
            icon: 'check_circle_outline',
            path: taskUrl,
            startLink: `/events/${event.id}/booking`,
          }"
        />
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
        />
        <li class="show-note-list-item" @click="isOpenNote = !isOpenNote">
          <div class="my-notes left-menu-yearly-plan disabled show-note-wrapper">
            <button>
              <img :class="{active: isOpenNote} " :src="`${$iconURL}Event Page/note-light.svg`" width="22" style="margin: 0 3px">
            </button>
          </div>
        </li>
        <!-- <sidebar-item
          name="left-menu-yearly-plan"
          class="left-menu-yearly-plan disabled"
          v-else
        ></sidebar-item>-->
      </md-list>
    </div>
    <div class="logo">
      <a href="https://maryoku.com/" target="_blank" class="simple-text logo-mini visible-on-sidebar-mini">
        <div class="logo-img">
          <img :src="logo">
          <!--<md-icon>calendar_today</md-icon>-->
        </div>
      </a>
    </div>
    <transition name="slide-fade">
      <div v-show="isOpenNote" class="note-wrapper">
        <div style="height:40px; margin-right:25px" class="text-right">
          <md-button class="md-simple md-just-icon md-round md-black font-size-30" @click="isOpenNote = false">
            <md-icon class="font-size-30">
              clear
            </md-icon>
          </md-button>
        </div>
        <br>
        <event-note-panel />
      </div>
    </transition>
    <change-zoom/>
  </div>
</template>
<script>
import SidebarItem from "./NewSidebarItem";
import eventService from "@/services/event.service";
import EventNotePanel from "../../pages/app/Events/components/EventNotePanel";
import ChangeZoom from "./ChangeZoom";
export default {
  name: "Sidebar",
  components: {
    ChangeZoom,
    SidebarItem,
    EventNotePanel,
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
      default:()=> {},
    },
  },
  data: () => {
    return {
      newTimeLineIconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/Timeline-New/",
      menuIconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/menu _ checklist/SVG/",
      toggleMenu: false,
      currentUrl: "",
      isOpenNote:false,
      zoomLevel: 100,
    };
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
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
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
  created() {
    this.fetchUrl();
    this.taskUrl = eventService.getFirstTaskLink(this.event);
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
};
</script>
<style lang="scss" scoped>
.note-wrapper{
  position: fixed;
  background-color: white;
  width: 410px;
  left: 85px;
  height: 90vh;
  top: 5vh;
  box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0,  0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.20);
}
.show-note-list-item{
  height: 57px;
  cursor: pointer;
  .show-note-wrapper{
    width: fit-content;
    margin: auto;
    button{
      padding-top: 16px;
      background-color: white;
      border: none;
      cursor: pointer;
      img {
        filter: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7500%) hue-rotate(193deg) brightness(110%) contrast(107%);
      }
      img.active{
        filter: brightness(0) saturate(100%) invert(13%) sepia(60%) saturate(7249%) hue-rotate(336deg) brightness(113%) contrast(92%);      }
    }
  }
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
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
  .menu-button {
    border-radius: 30px;
    width: calc(100% - 0.5em) !important;
    margin: 30px 0px !important;
    img {
      width: 30px;
    }
  }
  @media (min-width: 992px) {
    .navbar-search-form-mobile,
    .nav-mobile-menu {
      display: none;
    }
  }
  .sidebar-wrapper {
    /deep/ .md-list {
      li {
        border-bottom: 1px solid rgba(0, 0, 0, 0.13);
        border-left: 7px solid rgba(0, 0, 0, 0);

        a {
          display: block;
          text-align: center;
          padding: 1em 0.6em;

          .md-icon.md-theme-default.md-icon-font {
            color: #000 !important;
          }
        }

        &.active {
          border-left: 7px solid #fbc02d;

          a.nav-link {
            background: none;
            box-shadow: none;
            border-radius: 0;

            .md-icon.md-theme-default.md-icon-font {
              color: #fbc02d !important;
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
  }

  .logo-img {
    text-align: center;
    img {
      width: 40px;
    }
  }

}
</style>
