<template>
  <md-toolbar
    md-elevation="0"
    class="md-transparent"
    :class="{'md-toolbar-absolute md-white md-fixed-top': $route.meta.navbarAbsolute, 'navbar-white': $route.meta.opaque}">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start event-top-bar">
        <drop-down direction="down" v-if="topBarTitle" :has-caret="false" :hover="true">
          <md-button slot="title" class="md-button md-simple md-rose dropdown-toggle md-tiny" data-toggle="dropdown" style="border-radius: 3px 3px 0 0; text-transform: capitalize; font-size: 18px !important; font-weight: 400 !important;">
            {{topBarTitle}}
          </md-button>
          <ul class="dropdown-menu" style="margin-top: 5px; border-radius: 0 3px 3px 3px !important; ">
            <li>
              <div class="md-layout md-gutter" style="min-width: 480px; padding: 12px;">
                <div class="md-layout event-info-section">
                  <div class="md-layout-item md-size-100">
                    <div class="md-layout-item  title-text">Date</div>
                    <div class="md-layout-item md-size-100 md-caption ">May 29th 2019 , 9:00 AM (6 hrs) </div>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <div class="md-layout-item  title-text">Participants</div>
                    <div class="md-layout-item md-size-100 md-caption ">30 + spouses </div>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <div class="md-layout-item  title-text">Geography</div>
                    <div class="md-layout-item md-size-100 md-caption "> </div>
                  </div>

                  <div class="md-layout-item md-size-100">
                    <md-button class="md-sm md-simple md-rose">
                      <md-icon>cached</md-icon> Recurring weekly
                    </md-button>
                  </div>

                </div>
              </div>
            </li>
          </ul>
        </drop-down>
        <h3 class="md-title" style="font-weight: 400; padding-top: 14px; margin-left: -10px;">
          <md-icon class="text-rose" v-if="topBarTitle">arrow_right</md-icon>
          {{$route.meta.title ? $route.meta.title : $route.name}}
        </h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-round md-simple md-toolbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <!--<div class="md-autocomplete" style="width: 50%;">
            <md-autocomplete class="search" v-model="selectedEmployee" :md-options="employees" :md-open-on-focus="false">
              <label v-if="$route.meta.rtlActive">بحث...</label>
              <label v-else>Search...</label>
            </md-autocomplete>
          </div>-->
          <md-list>
            <!--<md-list-item to="/">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>-->

            <!--<li class="md-list-item">
              <a href="#" class="md-list-item-router md-list-item-container md-button-clean dropdown">
                <div class="md-list-item-content">
                  <drop-down direction="down">
                    <md-button slot="title" class="md-button md-just-icon md-simple" data-toggle="dropdown">
                      <md-icon>email</md-icon>
                      <span class="notification">5</span>
                      <p class="hidden-lg hidden-md">Notifications</p>
                      <md-tooltip>5 unread messages</md-tooltip>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><a href="#">Mike John responded to your email</a></li>
                      <li><a href="#">You have 5 new tasks</a></li>
                      <li><a href="#">You're now friend with Andrew</a></li>
                      <li><a href="#">Another Notification</a></li>
                      <li><a href="#">Another One</a></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>-->
            <li class="md-list-item" v-if="topBarEventId">
              <md-button v-if="topBarEventInvitees" class="md-simple md-lg" style="margin-top: 6px;" @click="uploadVendors">
                <md-icon>cloud_upload</md-icon>
                <span>Upload Vendors</span>
              </md-button>
            </li>
            <li class="md-list-item" v-if="topBarEventId">
              <md-button v-if="topBarEventProposals" class="md-simple md-lg" style="margin-top: 6px;" @click="manageInviteeGroups">
                <md-icon>group</md-icon>
                <span>Set Invitees Groups</span>
              </md-button>
            </li>
            <li class="md-list-item" v-if="topBarEventId">
              <md-button v-if="topBarEventProposals" class="md-simple md-lg" style="margin-top: 6px;" @click="manageInteractions">
                <md-icon>mail</md-icon>
                <span>Automate Interactions</span>
              </md-button>
            </li>
            <li class="md-list-item" v-if="topBarEventId">
              <md-button v-if="topBarEventInvitees" class="md-button md-info" style="margin-top: 12px;" @click="manageInvitees">
                <span>Manage Invitees</span>
              </md-button>
              <md-button v-if="topBarEventProposals" class="md-button md-info" style="margin-top: 12px;" @click="manageProposals">
                <span>Manage Budget &amp; Proposals</span>
              </md-button>
            </li>
            <li class="md-list-item">
              <a href="#" class="md-list-item-router md-list-item-container md-button-clean dropdown">
                <div class="md-list-item-content">
                  <drop-down direction="down" :hover="true">
                    <md-button name="user-top-menu" slot="title" class="md-button md-simple" data-toggle="dropdown">
                      <!--<md-icon>email</md-icon>
                      <span class="notification">5</span>
                      <p class="hidden-lg hidden-md">Notifications</p>-->
                      <div class="photo">
                        <img :src="avatar" alt="avatar"/>
                      </div>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <!--<li><router-link name="user-top-menu-my-profile" :to="{path: '/settings'}">My Profile</router-link></li>-->
                      <li><a href="javascript: void(null);" name="user-top-menu-my-profile" @click="openMyProfile">My Profile</a></li>
                      <li><a href="javascript: void(null);" name="user-top-menu-account-settings" @click="openAccountSettings">My Company</a></li>
                      <li><router-link name="user-top-menu-my-profile" :to="{path: '/team'}">Manage Team</router-link></li>
                      <li class="divider"></li>
                      <li><router-link name="user-top-menu-sign-out" :to="{path: '/signout'}">Sign Out</router-link></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>

            <!--<md-list-item to="/pages/user">
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Profile</p>◊
            </md-list-item>-->
          </md-list>
        </div>
      </div>
    </div>

  </md-toolbar>
</template>

<script>
  import auth from '@/auth';
  import MyProfile from '@/pages/app/Profile/MyProfile';
  import Team from '../../app/Team/Team';
  import MyCompany from '../../app/Profile/MyCompany';

  import Popper from 'vue-popperjs';
  import 'vue-popperjs/dist/vue-popper.css';
  import EventInfo from '../../app/Events/components/EventInfo';

  export default {
    components: {
      EventInfo,
      'popper': Popper
    },
    data() {
      return {
        auth,
        topBarTitle: null,
        topBarEventId: null,
        topBarEventInvitees: false,
        topBarEventProposals: false,
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
          "Kevin Malone"
        ]
      };
    },
    mounted() {
      setTimeout(function(){
        console.log("avatar: " + this.auth.user.avatar);
        this.avatar = this.auth.user.avatar != null ? this.auth.user.avatar : "static/img/placeholder.jpg";
      }.bind(this),3000);

      this.$root.$on("set-title", (title, eventId, invitees, proposals) => {
        this.topBarTitle = title;
        this.topBarEventId = eventId;
        this.topBarEventInvitees = invitees;
        this.topBarEventProposals = proposals;
      });
    },
    methods: {
      openMyProfile(){
        window.currentPanel = this.$showPanel({
          component: MyProfile,
          cssClass: 'md-layout-item md-size-75 transition36 bg-grey',
          openOn: 'right',
          props: {}
        });
      },
      openAccountSettings(){
        window.currentPanel = this.$showPanel({
          component: MyCompany,
          cssClass: 'md-layout-item md-size-65 transition36  bg-grey',
          openOn: 'right',
          props: {}
        });
      },
      openTeam(){
        const panelInstance = this.$showPanel({
          component : Team,
          cssClass: 'md-layout-item md-size-75 transition36 bg-grey',
          openOn: 'right',
          props: {

          }
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
      manageInvitees(){
        this.$router.push({name: 'InviteesManagement', params: {id: this.topBarEventId}});
        document.location.reload();
      },
      manageProposals(){
        this.$router.push({name: 'EditBuildingBlocks', params: {id: this.topBarEventId}});
        document.location.reload();
      },
      uploadVendors(){
        this.$router.push({name: 'EditBuildingBlocks', params: {id: this.topBarEventId}});
        document.location.reload();
      },
      manageInviteeGroups(){
        this.$router.push({name: 'EditBuildingBlocks', params: {id: this.topBarEventId}});
        document.location.reload();
      },
      manageInteractions(){
        this.$router.push({name: 'EditBuildingBlocks', params: {id: this.topBarEventId}});
        document.location.reload();
      }
    }
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

    img{
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
        border:none;
        box-shadow: 0 10px 50px rgba(black, .3);
      }
      .wrapper {
        height: auto
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
</style>
