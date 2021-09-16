<template>
  <div >
    <div class="main-panel">
      <div>
        <!-- your content here -->
        <zoom-center-transition :duration="200" mode="out-in">
          <router-view></router-view>
        </zoom-center-transition>
      </div>
    </div>
  </div>
</template>
<script>
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import EventGuestVuexModule from "../../app/Guest/EventGuest.vuex";
import { ZoomCenterTransition, FadeTransition } from "vue2-transitions";

export default {
  components: {
    ZoomCenterTransition,
    FadeTransition,
  },
  data() {
    return {
      // auth: auth,
      event: null,
    };
  },
  methods: {
    ...mapMutations("EventPlannerVuex", [
    ]),
    ...mapActions("event", ["getEventAction"]),

    async initData() {
      const id = this.$route.params.id;
      await this.$store.dispatch("EventPlannerVuex/getUserEvent", {id});
    },
  },
  created() {
    this.$store.registerModule("EventPlannerVuex", EventGuestVuexModule);
  },
  async mounted() {
    try{
        await this.$store.dispatch("auth/checkToken")
        await this.initData();
    }catch (e) {
        this.$router.push({ path: `/signin` });
    }
  },
  computed: {
    ...mapState("event", ["eventData"]),
  },
  watch: {
    $route: "checkTour",
  },
};
</script>
<style lang="scss">

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
