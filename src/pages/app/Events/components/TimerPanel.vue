<template>
  <div class="proposal-time-counter" :class="theme">
    <div v-if="isExpired" class="font-bold">
      This offer has expired
    </div>
    <div v-else class="font-bold">
      This offer will expire in
    </div>
    <hr>
    <timer v-if="status !== 2" size="big" :target="target" />
    <timer v-if="status === 2" size="big" :target="new Date()" />
    <template v-if="approved">
      <hr>
      <div class="font-bold font-size-14">
        More Time Granted
      </div>
    </template>
    <template v-else-if="declined">
      <hr>
      <div class="font-bold font-size-14">
        Request Denied
      </div>
    </template>
    <template v-else-if="pending">
      <hr>
      <div class="font-bold font-size-14">
        Waiting reply
      </div>
    </template>
    <template v-else-if="status === 2">
      <div class="button-wrap">
        <md-button class="maryoku-btn " :class="`md-${theme === 'red' ? 'red' : 'vendor'}`" disabled>
          <span style="color: gray">Ask for more time</span>
        </md-button>
      </div>
    </template>

    <div v-else-if="section !== 'card'" class="button-wrapper">
      <md-button
        class="maryoku-btn md-simple "
        :class="`md-${theme === 'red' ? 'red' : 'vendor'}`"
        @click="updateExpireTime"
      >
        <span>Ask for more time</span>
      </md-button>
    </div>
  </div>
</template>
<script>
const components = {
  Timer: () => import("@/components/Timer.vue"),
  TimeCounter: () => import("./TimeCounter.vue"),
};

export default {
  components,
  props: {
    target: {
      type: [Date, Number],
      default: new Date(),
    },
    approved: {
      type: Boolean,
      default: false,
    },
    declined: {
      type: Boolean,
      default: false,
    },

    status: {
      type: Number,
    },

    pending: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: "red",
    },
    section: {
      type: String,
      default: "detail",
    },
  },
  computed: {
    isExpired() {
      return new Date(this.target).getTime() - new Date().getTime() < 0;
    },
  },
  methods: {
    updateExpireTime() {
      this.$emit("updateExpireDate");
    },
  },
};
</script>
<style lang="scss" scoped>
.proposal-time-counter {
  width: 300px;
  max-width: 90%;
  color: white;
  text-align: center;
  padding: 20px;
  border-radius: 3px;
  &.red {
    background-color: #f51355;
  }
  &.purple {
    background-color: #641865;
  }
  &.mobile-red {
    background-color: white;
  }
  .button-wrapper {
    background-color: white !important;
    margin: auto;

    width: max-content;
    .md-button {
      background-color: white !important;
      &:hover {
        background-color: white !important;
      }
    }
  }
  .button-wrap {
    background-color: white !important;
    margin: auto;
    opacity: 0.5;

    width: max-content;
    .md-button {
      background-color: white !important;
      &:hover {
        background-color: white !important;
      }
    }
  }
  hr {
    background-color: white;
    opacity: 0.5;
  }

  &.mobile {
    color: #f51355;
    border: 2px solid #f51355;
    background-color: white;
    padding: 20px 0 0 0;

    .button-wrapper {
      background-color: #f51355 !important;
      width: 100%;
      .md-button {
        background-color: #f51355 !important;
        &:hover {
          background-color: #f51355 !important;
        }
      }
    }

    /deep/ .md-button-content {
      color: white !important;
    }

    hr {
      background-color: #f51355;
    }
  }
}
</style>
