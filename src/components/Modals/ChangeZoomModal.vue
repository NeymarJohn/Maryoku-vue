<template>
  <Modal v-if="showModal && !isMobile" :styles="modalCustomStyles">
    <template slot="header">
      <div class="header">
      </div>
    </template>
    <template slot="body">
      <div class="body">
        <h2> Adjust Your Display Settings</h2>
        <br/>
        Your current screen resolution is not supported on this platform.
        <br/>
        Apply recommended resolution?
      </div>
    </template>
    <template slot="footer">
      <div class="footer">
        <div>
          <md-button class="md-black md-simple" @click="showModal = false">
            Skip
          </md-button>
          <md-button class="md-rose" :class="{'md-vendor': isVendor}" @click="applyScreenZoom">
            Apply
          </md-button>
        </div>

      </div>
    </template>
  </Modal>
</template>

<script>
import {Modal} from "../index";
import {MobileMixins} from "../../mixins";

export default {
  name: "ChangeZoomModal",
  components: {
    Modal,
  },
  mixins: [MobileMixins],
  data() {
    return {
      zoomScale: 1,
      showModal: true,
      isVendor: false,
    };
  },
  beforeMount() {
   setTimeout( ()=> {
     this.isVendor = this.$router.currentRoute.path.startsWith("/vendor");
     this.showModal = !(
       this.$router.currentRoute.path.includes("signup") ||
       this.$router.currentRoute.path.includes("signin")
     );
   }, 1);
    this.zoomScale = 1 / (1770 / this.windowWidth);
    const savedZoom = localStorage.zoomParams ? JSON.parse(localStorage.zoomParams) : {};
    if (this.zoomScale === savedZoom.zoomScale && this.windowWidth === savedZoom.windowWidth) {
      document.body.style.zoom = this.zoomScale;
      this.showModal = false;
    }
  },
  computed: {
    modalCustomStyles() {
      return {
        header: "padding: 0",
        body: "background-color: #f3f7fd;",
        footer: "background-color: #f3f7fd;"
      };
    },
  },
  methods: {
    applyScreenZoom(){
      document.body.style.zoom = this.zoomScale;
      localStorage.setItem("zoomParams", JSON.stringify({zoomScale: this.zoomScale, windowWidth: this.windowWidth}));
      this.showModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  min-width: 700px;
  max-width: 800px;
  width: 100%;
}

.body {
  position: relative;
  max-width: 700px;
  padding: 0 60px;
}
.footer {
  align-items: center;
  width: 100%;
  margin: 0 37px;
  display: flex;
  justify-content: space-between;
  flex-flow: row-reverse;
}

@media screen and (max-width: 970px) {
  .header {
    min-width: unset;
    max-width: unset;
  }
}
</style>
