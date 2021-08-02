<template>
  <div class="proposal-time-counter" :class="theme">
    <div class="font-bold" v-if="isExpired">This offer has expired</div>
    <div class="font-bold" v-else>This offer will expire in</div>
    <hr />
    <timer size="big" :target="target"></timer>
    <div class="button-wrapper">
      <md-button
        class="maryoku-btn md-simple"
        :class="`md-${theme === 'red' ? 'red' : 'vendor'}`"
        @click="updateExpireTime"
        >Ask for more time</md-button
      >
    </div>
  </div>
</template>
<script>
import Timer from "../../../../components/Timer.vue";
import TimeCounter from "./TimeCounter.vue";
import Swal from "sweetalert2";

export default {
  components: { TimeCounter, Timer },
  props: {
    target: {
      type: [Date, Number],
      default: new Date(),
    },
    theme: {
      type: String,
      default: "red",
    },
  },
  methods: {
    updateExpireTime() {
      Swal.fire({
        title: "Are you sure?",
        text: `You'll get more 2 days.`,
        showCancelButton: true,
        confirmButtonClass: `md-button md-success btn-fill md-${this.theme}`,
        cancelButtonClass: "md-button md-danger btn-fill",
        confirmButtonText: "Yes, I'm sure",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$emit("updateExpireDate");
        }
      });
    },
  },
  computed: {
    isExpired() {
      return new Date(this.target).getTime() - new Date().getTime() < 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.proposal-time-counter {
  width: 300px;
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
  hr {
    background-color: white;
    opacity: 0.5;
  }
}
</style>
