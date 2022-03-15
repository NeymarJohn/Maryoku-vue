<template>
  <md-toolbar
    md-elevation="0"
    class="md-transparent"
    :class="{
      'md-toolbar-absolute md-white md-fixed-top': $route.meta.navbarAbsolute,
      'navbar-white': $route.meta.opaque,
    }"
  >
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start event-top-bar">
        <h3 v-if="topBarTitle" class="md-title">
          {{ topBarTitle }}
        </h3>
        <h3 v-if="isEventDetails" class="md-title cst-style">
          <md-icon v-if="topBarTitle" class="text-rose">
            arrow_right
          </md-icon>
          {{ $route.meta.title ? $route.meta.title : $route.name }}
        </h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-round md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar" />
          <span class="icon-bar" />
          <span class="icon-bar" />
        </md-button>

        <div class="md-collapse">
          <md-list>
            <li v-if="topBarEventId" class="md-list-item import-vendor">
              <a class="import" @click="gotoVendorsPool"> <md-icon>file_upload</md-icon>import your vendors </a>
              <a class="import"> <md-icon>play_arrow</md-icon>learn more </a>
            </li>
            <li class="md-list-item">
              <a href="#" class="md-list-item-router md-list-item-container md-button-clean dropdown">
                <div class="md-list-item-content">
                  <drop-down direction="down" :hover="true">
                    <md-button
                      slot="title"
                      name="user-top-menu"
                      class="user-top-menu md-button md-simple no-padding"
                      data-toggle="dropdown"
                    >
                      <div class="photo">
                        <md-icon>menu</md-icon>
                      </div>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <a
                          href="javascript: void(null);"
                          name="user-top-menu-my-profile"
                          class="user-top-menu-my-profile"
                          @click="openMyProfile"
                        >My Profile</a>
                      </li>
                      <li>
                        <a
                          href="javascript: void(null);"
                          name="user-top-menu-account-settings"
                          class="user-top-menu-account-settings"
                          @click="openAccountSettings"
                        >My Company</a>
                      </li>
                      <li>
                        <router-link
                          name="user-top-menu-my-profile"
                          class="user-top-menu-my-profile"
                          :to="{ name: 'Team' }"
                        >Manage Team</router-link>
                      </li>
                      <li class="divider" />
                      <li>
                        <router-link
                          name="user-top-menu-sign-out"
                          class="user-top-menu-sign-out"
                          :to="{ path: '/signout' }"
                        >Sign Out</router-link>
                      </li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
// import auth from '@/auth';
import ProfileSettings from "@/pages/app/Planner/Profile/ProfileSettings";
import Team from "../../app/Team/Team";

import "vue-popperjs/dist/vue-popper.css";
import EventSidePanel from "@/pages/app/Events/EventSidePanel";

export default {
  components: {
  },
  data() {
    return {
      topBarTitle: null,
      topBarEventId: null,
      topBarEventDate: null,
      topBarEventParticipants: "",
      topBarEventLocation: "",
      topBarEventInvitees: false,
      topBarEventProposals: false,
      topBarEvent: null,
      avatar: "",
      selectedEmployee: "",
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone",
      ],
    };
  },
  computed: {
    isEventDetails() {
      if (this.$route.name === "EditEvent" || this.$route.title === "Event Details") {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    setTimeout(
      function () {
        console.log("avatar: " + this.$auth.user.avatar);
        this.avatar =
          this.$auth.user.avatar != null
            ? this.$auth.user.avatar
            : "https://static-maryoku.s3.amazonaws.com/storage/img/placeholder.jpg";
      }.bind(this),
      3000,
    );

    this.$root.$on("set-title", (eventData, invitees, proposals) => {
      if (eventData) {
        this.topBarTitle = eventData.title;
        this.topBarEvent = eventData;
        this.topBarEventId = eventData.id;
        this.topBarEventInvitees = invitees;
        this.topBarEventProposals = proposals;
        this.topBarEventParticipants = eventData.numberOfParticipants;
        this.topBarEventDate = this.$moment(eventData.eventStartMillis).format("YYYY-MM-DD H:mm a");
        this.topBarEventLocation = eventData.location || "Unknown";
      } else {
        this.topBarTitle = null;
      }
    });
  },
  methods: {
    editEventDetails() {
      window.currentPanel = this.$showPanel({
        component: EventSidePanel,
        cssClass: "md-layout-item md-size-40 transition36 ",
        openOn: "right",
        disableBgClick: false,
        props: {
          modalSubmitTitle: "Save",
          editMode: true,
          sourceEventData: this.topBarEvent,
          year: this.$route.params.year,
          month: this.$route.params.month,
          openInPlannerOption: false,
        },
      });
    },
    openMyProfile() {
      window.currentPanel = this.$showPanel({
        component: ProfileSettings,
        cssClass: "md-layout-item md-size-75 transition36 bg-grey",
        openOn: "right",
        props: {},
      });
    },
    openTeam() {
      const panelInstance = this.$showPanel({
        component: Team,
        cssClass: "md-layout-item md-size-75 transition36 bg-grey",
        openOn: "right",
        props: {},
      });
      window.currentPanel = panelInstance;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
    manageInvitees() {
      this.$router.push({
        name: "EventInvitees",
        params: { id: this.topBarEventId },
      });
      document.location.reload();
    },
    manageProposals() {
      this.$router.push({
        name: "EditBuildingBlocks",
        params: { id: this.topBarEventId },
      });
      document.location.reload();
    },
    uploadVendors() {
      this.$router.push({ name: "Vendors" });
      document.location.reload();
    },
    manageInviteeGroups() {
      this.$router.push({
        name: "EditBuildingBlocks",
        params: { id: this.topBarEventId },
      });
      document.location.reload();
    },
    manageInteractions() {
      this.$router.push({
        name: "EditBuildingBlocks",
        params: { id: this.topBarEventId },
      });
      document.location.reload();
    },
    eventPage() {
      this.$router.push({
        name: "EventDetails",
        params: { id: this.topBarEventId },
      });
      document.location.reload();
    },
    inviteesManagement() {
      this.$router.push({
        name: "InviteesManagement",
        params: { id: this.topBarEventId },
      });
      document.location.reload();
    },
    manageGroups() {
      this.$router.push({
        name: "EventInvitees",
        params: { id: this.topBarEventId },
      });
      document.location.reload();
    },
    timeline() {
      this.$router.push({
        name: "EditTimeLine",
        params: { id: this.topBarEventId },
      });
      document.location.reload();
    },
    gotoVendorsPool() {
      let routeData = this.$router.resolve({
        name: "VendorsPool",
        params: { id: this.topBarEventId },
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.photo {
  width: 28px;
  height: 28px;
  overflow: hidden;
  float: left;
  z-index: 5;
  border-radius: 50%;
  /*@include shadow-big();
    @extend .animation-transition-general;*/

  img {
    width: 100%;
  }
}

.navbar-white {
  background-color: white !important;
}

.tooltip {
  &.popover {
    $color: #fdfdfd;
    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      border: none;
      box-shadow: 0 10px 50px rgba(black, 0.3);
    }
    .wrapper {
      height: auto;
    }
    .popover-arrow {
      border-color: $color;
    }
  }
}

.tooltip[x-placement^="right"] {
  .tooltip-arrow {
    border-width: 10px 10px 10px 0;
    left: -10px;
  }
}
.tooltip[x-placement^="top"] {
  .tooltip-arrow {
    border-width: 0 10px 10px 10px;
    bottom: -10px;
  }
}
.tooltip[x-placement^="bottom"] {
  .tooltip-arrow {
    border-width: 10px 10px 10px 0;
    top: -10px;
  }
}
.tooltip[x-placement^="left"] {
  .tooltip-arrow {
    border-width: 10px 0 10px 10px;
    right: -10px;
  }
}

.open > .md-button.md-rose.dropdown-toggle {
  color: white !important;
}

.md-button:not(.md-just-icon):not(.md-btn-fab):not(.md-icon-button):not(.md-toolbar-toggle) .md-ripple {
  padding: 6px 12px !important;
}

.import-vendor {
  display: flex;
  align-items: center;
  a {
    color: #ff4470 !important;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    margin-right: 2em !important;
    cursor: pointer;
    i {
      color: #ff4470 !important;
      font-size: 14px !important;
      width: 14px !important;
      min-width: 14px !important;
    }
  }
  .btn-learn-more {
    width: 100px;
    height: 30px !important;
    text-transform: capitalize;
    border-radius: 25px;
    i {
      height: 0;
      font-size: 14px !important;
      width: 12px !important;
      min-width: 12px !important;
    }
    span {
      padding-left: 3px;
      font-size: 12px;
      font-weight: 500;
    }
  }
}
.user-top-menu {
  margin: 0 !important;
}
h3.cst-style {
  font-weight: 400;
  padding-top: 14px;
  margin-left: -10px;
}
.title-fixed {
  position: -webkit-sticky;
  position: sticky;
}
</style>
