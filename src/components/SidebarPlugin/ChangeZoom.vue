<template>
  <div class="zoom-block">
    <div class="zoom-wrapper">
      <button class="md-button zoom-button"
              @click="changeZoom('-')">
        -
      </button>
      <span>{{ zoomLevel }}%</span>
      <button
        class="md-button zoom-button"
        @click="changeZoom('+')">
        +
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeZoom",
  data: () => {
    return {
      zoomLevel: 100,
    };
  },
  created() {
    this.zoomLevel = Math.round( JSON.parse(localStorage.getItem("zoomParams")).zoomScale * 100);
  },
  methods: {
    changeZoom(sign) {
      if (sign === "-") {
        this.zoomLevel = this.zoomLevel - 10;
      } else {
        this.zoomLevel = this.zoomLevel + 10;
      }
      document.body.style.zoom = this.zoomLevel / 100;
      localStorage.setItem("zoomParams", JSON.stringify({
        zoomScale: this.zoomLevel / 100,
        windowWidth: this.windowWidth
      }));
    },
  }
};
</script>

<style lang="scss" scoped>
.zoom-block {
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;

  .zoom-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-size: 0.8rem;
    width: 35px;
    box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12);
    border-radius: 18px;

    span {
      color: #05050591;
      width: 100%;
      padding: 5px 0;
      text-align: center;
      border: solid #88868645;
      border-width: 1px 0;
    }

    .zoom-button {
      background-color: transparent !important;
      color: #05050591 !important;
      font-size: 25px;
      box-shadow: none;
      margin: 0;
      line-height: 29px;
      min-width: 100%;
      &:hover{
        color: #641856 !important;
      }
    }
  }
}
</style>