<template>
  <Modal v-if="showModal" :styles="modalCustomStyles">
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
          <md-button class="md-vendor md-simple" @click="showModal = false">
            Skip
          </md-button>
          <md-button class="md-vendor" @click="applyScreenZoom">
            Apply
          </md-button>
        </div>

      </div>
    </template>
  </Modal>
</template>

<script>
import {Modal} from "../index";

export default {
  name: "ChangeZoomModal",
  components: {
    Modal,
  },
  data() {
    return {
      showModal: true
    };
  },
  beforeCreate() {
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
      document.body.style.zoom = 1 / (1770 / this.windowWidth);
      this.showModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.steps-cont {
  width: 100%;
  margin: 0 auto;
  color: #a0a0a0;

  .progressbar {
    counter-reset: step;
    display: flex;

    li {
      list-style-type: none;
      float: left;
      width: 33.33%;
      position: relative;
      text-align: center;
      font-weight: 600;
      font-size: 16px;

      span {
        cursor: pointer;
        width: 34px;
        height: 34px;
        display: inline-block;
        border-radius: 50%;
        z-index: 2;
        position: relative;
        margin-bottom: 8px;
        color: #e0ae17;
      }

      &.active,
      &.current {
        span {
          background: #ffc001;
          box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.26);
          i {
            color: white;
            position: relative;
            top: 3px;
          }
        }
      }

      &.current {
        span {
          i {
            position: relative;
            top: 4px;
            left: 1px;
            font-size: 30px;
            font-style: normal;
            display: inline;
            text-shadow: 0 2px 3px rgba(0, 0, 0, 0.42);
          }
        }
      }

      &.inactive {
        span {
          i {
            color: #707070;
            position: relative;
            top: 2px;
            font-size: 50px;
            font-style: normal;
          }
        }
      }

      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: #707070;
        top: 15px;
        left: -50%;
      }

      &:first-child:after {
        content: none;
      }

      &.active,
      &.current {
        color: #e0ae17;
      }

      &.active:before,
      &.current:before {
        background-color: #ffc001;
        color: white;
      }

      &.active:after,
      &.current:after {
        background-color: #ffc001;
      }
    }
  }
}

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

  .body-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info-block {
      padding: 0 25px;
      display: flex;
      flex-direction: row;
      color: #641856;
      border: 1px solid #9f2488;
    }
  }
  .signature-editor {
    text-align: center;
    width: 100%;
    min-height: 300px;
    border: 1px solid #a0a0a0;
    background-color: white;
    border-radius: 3px;
    padding-top: 1px;
    position: relative;
  }
}
.footer {
  align-items: center;
  width: 100%;
  margin: 0 37px;
  display: flex;
  justify-content: space-between;
  flex-flow: row-reverse;

  .go-back {
    display: flex;
    color: #818080;
    font-size: 15px;
    cursor: pointer;
  }
}

@media screen and (max-width: 970px) {
  .header {
    min-width: unset;
    max-width: unset;
  }
}
</style>
