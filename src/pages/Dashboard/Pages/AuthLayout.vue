<template>
  <div :class="{ 'nav-open': $sidebar.showSidebar }">
    <div class="wrapper wrapper-full-page" @click="toggleSidebarPage">
      <div class="page-header header-filter" :class="setPageClass" filter-color="black" :style="setBgImage">
        <div class="container md-offset">
          <video autoplay muted loop class="background-video">
            <source :src="`/static/videos/signinBg.mp4`" type="video/mp4">
            Your browser does not support HTML5 video.
          </video>
          <zoom-center-transition :duration="pageTransitionDuration" mode="out-in">
            <router-view />
          </zoom-center-transition>
        </div>
        <footer v-if="false" class="footer">
          <div class="container md-offset">
            <nav>
              <ul>
                <!--<li>
                  <router-link :to="{path:'/dashboard'}">Home</router-link>
                </li>-->
                <li>
                  <a href="https://www.maryoku.com/our-story" target="_blank">Our Story</a>
                </li>
                <li>
                  <a href="https://www.maryoku.com/terms" target="_blank">Terms of Use</a>
                </li>
                <li>
                  <a href="https://www.maryoku.com/privacy" target="_blank">Privacy</a>
                </li>
              </ul>
            </nav>
            <div class="copyright text-center">
              &copy;
              <a href="https://www.maryoku.com" target="_blank">maryoku Ltd</a> &middot; All rights reserved
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { ZoomCenterTransition } from "vue2-transitions";

export default {
  components: {
    ZoomCenterTransition,
  },
  props: {
    backgroundColor: {
      type: String,
      default: "black",
    },
  },
  inject: {
    autoClose: {
      default: true,
    },
  },
  data() {
    return {
      responsive: false,
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 300,
      year: new Date().getFullYear(),
    };
  },
  computed: {
    setBgImage() {
      let images = {
        Pricing: "https://static-maryoku.s3.amazonaws.com/storage/img/bg-pricing.jpg",
        Login: "https://static-maryoku.s3.amazonaws.com/storage/img/shutterstock_495639391.png",
        Register: "https://static-maryoku.s3.amazonaws.com/storage/img/shutterstock_495639391.png",
        CreateWorkspace1: "https://static-maryoku.s3.amazonaws.com/storage/img/shutterstock_495639391.png",
        ForgotPassword1: "https://static-maryoku.s3.amazonaws.com/storage/img/shutterstock_732491308.png",
        SignIn1: "https://static-maryoku.s3.amazonaws.com/storage/img/shutterstock_732491308.png",
        SignUp1: "https://static-maryoku.s3.amazonaws.com/storage/img/shutterstock_495639391.png",
        // SignOut: 'https://static-maryoku.s3.amazonaws.com/storage/img/shutterstock_732491308.png',
        // GetStarted: 'https://static-maryoku.s3.amazonaws.com/storage/img/shutterstock_732491308.png',
        // SignedIn: 'https://static-maryoku.s3.amazonaws.com/storage/img/shutterstock_732491308.png',
        Lock: "https://static-maryoku.s3.amazonaws.com/storage/img/lock.jpg",
      };
      if (!images[this.$route.name]) {
        return {
          backgroundColor: "#f3f7fd",
        };
      }
      return {
        backgroundImage: `url(${images[this.$route.name]})`,
      };
    },
    setPageClass() {
      return `${this.$route.name}-page`.toLowerCase();
    },
  },
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeMount() {
    if (this.$store.state.auth.status.loggedIn) {
      this.$store
        .dispatch("auth/checkToken")
        .then(res => {})
        .catch(error => {
          this.$store.dispatch("auth/logout").then(res => {
            this.$router.push({ path: "/signin" });
          });
        });
    }
  },
  beforeDestroy() {
    this.closeMenu();
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  methods: {
    toggleSidebarPage() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    linkClick() {
      if (this.autoClose && this.$sidebar && this.$sidebar.showSidebar === true) {
        this.$sidebar.displaySidebar(false);
      }
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleNavbar() {
      document.body.classList.toggle("nav-open");
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      document.body.classList.remove("nav-open");
      this.showMenu = false;
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    // Close the mobile menu first then transition to next page
    if (this.showMenu) {
      this.closeMenu();
      setTimeout(() => {
        next();
      }, this.menuTransitionDuration);
    } else {
      next();
    }
  },
};
</script>
<style lang="scss" scoped>
$scaleSize: 0.1;
$zoomOutStart: 0.7;
$zoomOutEnd: 0.46;
@keyframes zoomIn8 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  100% {
    opacity: 1;
  }
}
.wrapper-full-page .zoomIn {
  animation-name: zoomIn8;
}
@keyframes zoomOut8 {
  from {
    opacity: 1;
    transform: scale3d($zoomOutStart, $zoomOutStart, $zoomOutStart);
  }
  to {
    opacity: 0;
    transform: scale3d($zoomOutEnd, $zoomOutEnd, $zoomOutEnd);
  }
}
.wrapper-full-page .zoomOut {
  animation-name: zoomOut8;
}
.radius-bk {
  // background: #5c2153!important;
  border-radius: 0 0 50% 50%;
  padding: 0 0 1em;
  height: 100px;
}
.page-header > .container {
  color: #ffffff;
  padding-top: 0px;
  padding-bottom: 0px;
  max-width: 100%;
  /* padding-top: 70px; */
  /* padding-bottom: 160px; */
  max-width: 1100px;
}
.page-header::before {
  background: transparent;
}
.background-video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}
@media screen and (max-width: 500px) {
  .container {
    padding: 0px;
  }
}
@media screen and (min-width: 1500px) {
  .page-header {
    .container {
      max-width: unset;
    }
  }
}
</style>
