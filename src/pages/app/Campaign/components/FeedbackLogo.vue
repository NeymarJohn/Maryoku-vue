<template>
  <div class="wrapper-logo">
    <div class="wrapper-logo-microsoft">
      <div class="logo-campaign">
        <img :src="logoUrl" />
      </div>
      <hide-switch v-if="!review" :value="value" @input="$emit('input', $event)" label="Logo" />
    </div>
    <span class="hello-microsoft-special-employee">
      {{ logoTitle }}
    </span>
  </div>
</template>


<script>
import HideSwitch from "@/components/HideSwitch";

export default {
  name: "FeedbackLogo",
  components: {
    HideSwitch
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    logoTitle: {
      type: String,
      default: ""
    },
    review: {
      type: Boolean,
      default: false
    }
  }
};
</script>


<style lang="scss" scoped>
.wrapper-logo {
  max-width: 500px;
  flex: 1 1 300px;

  .wrapper-logo-microsoft {
    height: 150px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-grow: 1;

    .logo-campaign {
      width: 250px;
      height: 75px;
      display: flex;
      align-items: center;
    }
  }

  .hello-microsoft-special-employee {
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
  }
}
</style>
