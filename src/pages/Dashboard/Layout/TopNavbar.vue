<template>
  <md-toolbar
    md-elevation="0"
    class="md-transparent"
    :class="{'md-toolbar-absolute md-white md-fixed-top': $route.meta.navbarAbsolute, 'navbar-white': $route.meta.opaque}">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title" style="font-weight: 400;">
          {{$route.meta.title ? $route.meta.title : $route.name}}</h3>
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
            <!--<li class="md-list-item">
              <md-button class="md-button md-info" style="margin-top: 6px;" @click="openEventModal()">
                <md-icon>event</md-icon>
                <span>Create New Event</span>
              </md-button>
            </li>-->
            <li class="md-list-item">
              <a href="#" class="md-list-item-router md-list-item-container md-button-clean dropdown">
                <div class="md-list-item-content">
                  <drop-down direction="down">
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

  export default {
    data() {
      return {
        auth,
        topBarTitle: null,
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

      this.$root.$on("set-title", (title) => {
        this.topBarTitle = title;
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
      }
    }
  };
</script>
<style scoped>
  .photo {
    width: 28px;
    height: 28px;
    overflow: hidden;
    float: left;
    z-index: 5;
    border-radius: 50%;
    @include shadow-big();
    @extend .animation-transition-general;

    img{
      width: 100%;
    }
  }

  .navbar-white {
    background-color: white !important;
  }
</style>
