<template>
  <div class="user">
    <div class="photo">
      <img src="static/img/faces/face-2.jpg"/>
    </div>
    <div class="info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" @click="toggleMenu" href="#">
         <span>
           {{this.auth.user}}
           <b class="caret"></b>
        </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <collapse-transition>
          <ul class="nav nav-menu" v-show="!isClosed">
            <li>
              <a href="#">
                <span class="sidebar-mini-icon">P</span>
                <span class="sidebar-normal">Profile</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="sidebar-mini-icon">A</span>
                <span class="sidebar-normal">Account</span>
              </a>
            </li>
            <li>
              <a href="#" @click="signout">
                <span class="sidebar-mini-icon">SO</span>
                <span class="sidebar-normal">Sign Out</span>
              </a>
            </li>
          </ul>
        </collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
  import { CollapseTransition } from 'vue2-transitions';
  import auth from 'src/auth';

  export default {
    components: {
      CollapseTransition
    },
    data() {
      return {
        auth,
        isClosed: true
      }
    },
    methods: {
      toggleMenu() {
        this.isClosed = !this.isClosed
      },
      signout: function(e) {
        this.auth.logout(this);
      }
    }
  }
</script>
<style scoped>
  .nav.nav-menu {
    margin-top: 0;
  }
</style>
