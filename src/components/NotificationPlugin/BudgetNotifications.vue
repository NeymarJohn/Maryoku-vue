<template>
  <div class="notifications">
    <transition-group v-if="field === 'budget'" name="list" mode="in-out">
      <budget-notification v-for="(notification) in notifications"
                           :key="notification.timestamp.getTime()"
                           :message="notification.message"
                           :icon="notification.icon"
                           :type="notification.type"
                           :timestamp="notification.timestamp"
                           :vertical-align="notification.verticalAlign"
                           :horizontal-align="notification.horizontalAlign"
                           :cancel-btn="notification.cancelBtn"
                           :close-btn="notification.closeBtn"
                           :confirm-btn="notification.confirmBtn"
                           @on-send="action"
                           @on-close="removeNotification"
      />
    </transition-group>
    <transition-group v-if="field === 'negotiation'" name="list" mode="in-out">
      <negotiation-notification v-for="(notification) in notifications"
                                :key="notification.timestamp.getTime()"
                                :message="notification.message"
                                :icon="notification.icon"
                                :type="notification.type"
                                :timestamp="notification.timestamp"
                                :vertical-align="notification.verticalAlign"
                                :horizontal-align="notification.horizontalAlign"
                                @on-send="action"
                                @on-close="removeNotification"
      />
    </transition-group>
  </div>
</template>
<script>
import BudgetNotification from "./BudgetNotification";
import NegotiationNotification from "./NegotiationNotification";
export default {
  components: {
      NegotiationNotification,
      BudgetNotification
  },
  props:{
    field:{
        type: String,
        default: "budget"
    }
  },
  data () {
    return {
      notifications: this.$notifications.state
    };
  },
    beforeDestroy() {
        this.$root.$off("budget_notification_action");
    },
  methods: {
    removeNotification (timestamp) {
      this.$notifications.removeNotification(timestamp);
    },
    action(message) {
      this.$root.$emit("budget_notification_action", message);
    }
  },
};
</script>
<style lang="scss">
.notifications {
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }
  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}
</style>
