<template>
  <div>
    <slideout-panel />
    <router-view />
    <NotificationModal v-if="isNotificationModal" :name="name" @click="() => {}" />
    <ActionModal v-if="isActionModal" :name="name" />
    <AfterFirstTransaction />
    <ChangeZoomModal />
  </div>
</template>

<script>
import { NOTIFICATION, ACTION } from "./constants/modal";

const components = {
  NotificationModal: () => import("@/components/Modals/NotificationModal.vue"),
  ActionModal: () => import("@/components/Modals/ActionModal.vue"),
  ChangeZoomModal: ()=> import("./components/Modals/ChangeZoomModal"),
  AfterFirstTransaction: ()=> import("./components/Modals/AfterFirstTransaction/index")
};

export default {
  components,
  data() {
    return {
      // auth: auth
    };
  },
  computed: {
    name() {
      return this.$store.state.modal.name;
    },
    isNotificationModal() {
      return Object.keys(NOTIFICATION).includes(this.name);
    },
    isActionModal() {
      return Object.keys(ACTION).includes(this.name);
    },
  },
  watch: {
    name(newVal) {},
  },
  mounted() {
    if (window.focusEventListener != null) {
      window.removeEventListener("focus", window.focusEventListener);
      window.focusEventListener = null;
    }

    const initialMessage = document.getElementById("initial-message");
    if (initialMessage) {
      initialMessage.remove();
    }
    const loadingBackground = document.getElementById("loading-background");
    if (loadingBackground) {
      loadingBackground.remove();
    }
  },
};
</script>
<style lang="scss">
.slideout.transition36 {
  transition: transform 0.36s ease-out !important;
}
.slideout.w100 {
  width: 100% !important;
}
.slideout.w75 {
  width: 75% !important;
}

.slideout.w50 {
  width: 50% !important;
}

.slideout.w25 {
  width: 25% !important;
}

.slideout.h25 {
  height: 25% !important;
}

.slideout.h50 {
  height: 50% !important;
}

.slideout.h65 {
  height: 65% !important;
}

.slideout.h75 {
  height: 75% !important;
  padding-left: 89px;
}

.slideout.h100 {
  height: 100% !important;
}

.slideout.bg-grey {
  background-color: #eeeeee !important;
}
</style>
