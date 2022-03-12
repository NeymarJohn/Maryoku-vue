<template>
  <div class="wrapper-logo" >
    <div class="wrapper-logo-microsoft" >
      <div class="logo-microsoft" >
        <div class="icon-microsoft" >
          <div class="block block1" />
          <div class="block block2" />
          <div class="block block3" />
          <div class="block block4" />
        </div>
        <h2>
          Microsoft
        </h2>
      </div>
      <hide-switch v-if="showSwitch" label="Hide Logo" />
    </div>
    <span class="hello-microsoft-special-employee">
      Hello Microsoft special employee!
    </span>
  </div>
</template>


<script>
import HideSwitch from "@/components/HideSwitch";

export default {
  name: "feedback-logo",
  components: {
    HideSwitch
  },
  props: {
    showSwitch: {
      type: Boolean,
      default: false,
    }
  }
}
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

    .logo-microsoft {
      width: 250px;
      height: 75px;
      display: flex;
      align-items: center;

      .icon-microsoft {
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        .block {
          width: 20px;
          height: 20px;
        }

        .block1 {
          background: #f25022;
        }

        .block2 {
          background: #7fba00;
        }

        .block3 {
          background: #00a4ef;
        }

        .block4 {
          background: #ffb600;
        }
      }

      h2 {
        font-size: 30px;
        color: #737373;
        font-weight: 900;
        margin-left: 10px;
        flex-grow: 1;
      }
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
