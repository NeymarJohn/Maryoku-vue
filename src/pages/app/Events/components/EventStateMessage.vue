<template>
  <div class="event-state-message">
    <div>
      <img src="" />
    </div>
    <div v-if="type=='positive'">
      <div class="message-title">Great Job!</div>
      <div class="message-content">You saved</div>
      <div class="message-action">
        <div class="message-action-content">
          Want to upgrade your event and get a fantastic clip?
        </div>
        <div class="message-action-button">
          <md-button
            class="md-button md-black md-simple "
          >Cancel</md-button>
          <md-button class="md-red md-bold add-category-btn">Send</md-button>
        </div>
      </div>
    </div>
    <div v-if="type=='action'">
      <div class="message-title">Great Job!</div>
      <div class="message-content">You saved</div>
      <div class="message-action">
        <div class="message-action-content"></div>
        <div class="message-action-button">
          <md-button
            class="md-button md-black md-simple "
          >Cancel</md-button>
          <md-button class="md-red md-bold add-category-btn">Send</md-button>
        </div>
      </div>
    </div>
    <div v-if="type=='benchmark'">
      <div class="message-title benchmark">{{messages[2].title}}</div>
      <div class="message-content benchmark">{{messages[2].message}}</div>
      <div class="message-action">
        <div class="message-action-content benchmark">{{messages[2].action}}</div>
        <div class="message-action-button">
          <md-button
            class="md-red md-simple normal-btn"
          >Ok, Thanks</md-button>
        </div>
      </div>
    </div>
    <div v-if="type=='alert'">
      <div class="message-title alert-message">
        <md-icon class="color-minus">remove_circle_outline</md-icon>
        $ 2,200
      </div>
      <div class="message-title alert-message">{{messages[3].title}}</div>
      <div class="message-action">
        <div class="message-action-content alert-message">{{messages[3].message}}</div>
        <div class="message-action-button">
          <md-button
            class="md-bold add-category-btn md-black md-simple"
          >No, Thanks</md-button>
          <md-button class="md-red md-bold add-category-btn">Add Money</md-button>
        </div>
      </div>
    </div>
    <div class="close-button">
      <md-button @click="closeMessage()" class="md-icon-button md-default md-simple md-black">
        <md-icon>close</md-icon>
      </md-button>
    </div>
  </div>
</template>
<script>
const messages = [
  {
    title: "Great Job!",
    message: "You saved money on the catering deal!  Seems like you could use this extra money and get a video photographer. ",
    action: "Want to upgrade  our event and get fantastic clip?",
    type: "positive"
  },
  {
    title: "So where are we with the event budget? ",
    message: " Are we ready to go?",
    action: "Click here to approve the budget or use share option to get inputs from collegues",
    type: "action"
  },
  {
    title: "Manage your risks!",
    message: "You may want to keep some budget for unexpected issues and day-of expenses. ",
    action: "Typically, 10%-15% of total budget should be enough",
    type: "benchmark"
  },
  {
    title: "Ooops, your in minus",
    message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
    type: "alert"
  }
]
export default {
  name: "event-state-message",
  props: {
    type: {
      type: String,
      default: 'positive'
    },
  },
  data() {
    return {
      messages: messages
    }
  },
  methods: {
    closeMessage() {
      alert()
      this.$emit("close");
    }
  },
}
</script>
<style lang="scss" scoped>
  .event-state-message {
    height: 200px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    padding:20px 60px;
    .message-title {
      font-family: "Manrope-ExtraBold";
      font-size: 20px;
      color: #0fac4c;
      margin-bottom: 15px;
      &.benchmark {
        color: #e0ae17;
      }
      &.alert-message {
        color: #9f0000;
      }
    }
    .message-content {
      margin-bottom: 15px;
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
        font-size: 16px;
        &.benchmark {
          font-family: "Manrope-Regular";
        }
        &.alert-message {
          font-family: "Manrope-Regular";
        }
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
</style>