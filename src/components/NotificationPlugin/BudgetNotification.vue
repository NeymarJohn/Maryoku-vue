<template>
  <div
    data-notify="container"
    class="alert open event-state-message alert-plain"
    role="alert"
    :class="[verticalAlign, horizontalAlign]"
    :style="customPosition"
    data-notify-position="top-center"
    @click="close"
  >
    <md-button
      v-if="closeBtn"
      class="md-simple position-absolute md-small-hide"
      style="top: 20px;right:20px"
      @click="close"
    >
      <md-icon>close</md-icon>
    </md-button>
    <div v-if="icon" class="event-state-message-image">
      <img :src="icon">
    </div>
    <div class="event-state-message-content">
      <div class="message-title" :style="{color: type === 'info' ? '#000' : ''}">
        {{ message.title }}
      </div>
      <div class="message-content">
        {{ message.content }}
      </div>
      <div class="message-action">
        <div class="message-action-content">
          {{ message.action }}
        </div>
        <div class="message-action-button">
          <md-button v-if="cancelBtn" class="md-bold add-category-btn md-black md-simple" @click="close">
            Cancel
          </md-button>
          <md-button v-if="confirmBtn && type !== 'positive'" class="md-red md-bold add-category-btn" @click="send">
            {{ confirmBtn }}
          </md-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Notification",
  props: {
    title: {
        type: String,
        require: true,
    },
    action: {
        type: String,
        require: true,
    },
    message: Object,
    icon: String,
    verticalAlign: {
      type: String,
      default: "top"
    },
    horizontalAlign: {
      type: String,
      default: "center"
    },
    type: {
      type: String,
    },
    timeout: {
      type: Number,
      default: 5000,
    },
    cancelBtn: {
      type: Boolean,
      default: true,
    },
      confirmBtn: {
      type: Boolean,
      default: false,
    },
    closeBtn: {
       type: Boolean,
       default: false,
    },
    timestamp: {
      type: Date,
      default: () => new Date()
    },
  },
  data () {
    return {
      elmHeight: 0
    };
  },
  computed: {
    hasIcon () {
      return this.icon && this.icon.length > 0;
    },
    alertType () {
      return `alert-${this.type}`;
    },
    customPosition () {
      let initialMargin = 0;
      let alertHeight = this.elmHeight + 10;
      let sameAlertsCount = this.$notifications.state.filter(alert => {
        return (
          alert.horizontalAlign === this.horizontalAlign &&
          alert.verticalAlign === this.verticalAlign &&
          alert.timestamp <= this.timestamp
        );
      }).length;
      let pixels = (sameAlertsCount - 1) * alertHeight + initialMargin;
      let styles = {};
      if (this.verticalAlign === "top") {
        styles.top = `${pixels}px`;
      } else {
        styles.bottom = `${pixels}px`;
      }
      return styles;
    }
  },
  mounted () {
    this.elmHeight = this.$el.clientHeight;
    if (this.timeout) {
        setTimeout(_ => {
            this.$emit("on-close");
        }, this.timeout);
    }
  },
  methods: {
    close () {
      this.$emit("on-close", this.timestamp);
    },
    send(){
      this.$emit("on-send", this.message.title);
    }
  }
};
</script>
<style lang="scss" scoped>
    .event-state-message {
        height: 200px;
        min-width: 94%;
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        background-color: #ffffff;
        padding:20px 60px 20px 150px;
        display: flex;
        align-items: center;

        &-image {
            width: 62px;
            margin-right: 40px;
        }
        &-content {
            flex-grow: 1;
        }
        .message-title {
            font-family: "Manrope-ExtraBold";
            font-size: 20px;
            color: #0fac4c;
            margin-bottom: 15px;
            &.info{
                color: #000;
            }
            &.benchmark {
                color: #e0ae17;
            }
            &.alert-message {
                color: #9f0000;
            }
        }
        .message-content {
            margin-bottom: 16px;
            color: #050505;
            &.benchmark {
                font-family: "Manrope-ExtraBold";
            }
        }
        .message-action {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &-content {
                font-family: 'Manrope-Bold';
                color: #0d0d0d;
                font-size: 16px;
                &.benchmark {
                    font-family: "Manrope-Regular";
                }
                &.alert-message {
                    font-family: "Manrope-Regular";
                }
            }
            &-button {
                white-space: nowrap;
            }
        }
        .close-button {
            position: absolute;
            right: 60px;
            top: 30px;
            i {
                font-size: 30px !important;
                color: #050505;
            }
        }
    }
@media screen and (max-width: 991px) {
  .alert {
    width: auto !important;
    margin: 0 10px;

    &.left {
      left: 0 !important;
    }
    &.right {
      right: 0 !important;
    }
    &.center {
      margin: 0 10px !important;
    }
  }
}

.alert {
  z-index: 100;
  cursor: pointer;
  position: fixed;
  width: 100%;
  top: -10px !important;

  &.center {
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin: 0 auto;
  }

  &.left,
  &.right,
  &.center {
    margin-top: 10px;
  }

  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
}
</style>
