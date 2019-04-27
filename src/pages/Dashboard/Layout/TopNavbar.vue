<template>
  <md-toolbar
    md-elevation="0"
    class="md-transparent" style="background-color: white !important;"
    :class="{'md-toolbar-absolute md-white md-fixed-top': $route.meta.navbarAbsolute}">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title" style="font-weight: 400;">{{$route.meta.title ? $route.meta.title : $route.name}}</h3>
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
                    <md-button slot="title" class="md-button md-simple" data-toggle="dropdown">
                      <!--<md-icon>email</md-icon>
                      <span class="notification">5</span>
                      <p class="hidden-lg hidden-md">Notifications</p>-->
                      <div class="photo">
                        <img :src="avatar" alt="avatar"/>
                      </div>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><router-link :to="{path: '/settings'}">My Profile</router-link></li>
                      <li><router-link :to="{path: '/company-form'}">Account Settings</router-link></li>
                      <li class="divider"></li>
                      <li><router-link :to="{path: '/signout'}">Sign Out</router-link></li>
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

  export default {
    data() {
      return {
        auth,
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
    },
    methods: {
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
</style>
