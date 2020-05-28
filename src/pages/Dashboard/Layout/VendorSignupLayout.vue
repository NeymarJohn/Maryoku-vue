<template>
  <div class="vendor-signup-layout-wrapper">
    <section class="header-wrapper" v-if="isApproved">
      <a href="https://www.maryoku.com"><img src="/static/img/maryoku-logo-dark.png"/></a>
      <v-signup-steps :step="step"></v-signup-steps>
    </section>
    <router-view></router-view>
    <section class="footer-wrapper" :class="{'approved': isApproved}" v-if="isApproved">
      <div class="left">
        <a class="back" @click="prev()">
          <img :src="`${iconsUrl}Group 4770 (2).svg`"/> Back
        </a>
        <span v-if="step != 5" @click="scrollToTop()"><img :src="`${iconsUrl}Asset 602.svg`"/></span>
      </div>
      <div class="right">
        <a class="save">
          <img :src="`${iconsUrl}Asset 610.svg`"/>
          Save for later
        </a>
        <a class="approve" @click="next()">
          {{nextLabel}}
        </a>
      </div>
    </section>
    <section class="footer-wrapper" v-else>
      <a class="approve" @click="approve()">
        Approve & Begin
      </a>
    </section>
  </div>
</template>
<script>
  import VSignupSteps from './Extra/VSignupSteps.vue'

  export default {
    components: {
      VSignupSteps
    },
    data() {
      return {
        iconsUrl: 'http://static.maryoku.com/storage/icons/NewSubmitPorposal/',
        isApproved: false,
        step: 1,
      }
    },
    methods: {
      goTo (router) {
        this.$router.push(router)
      },
      approve() {
        this.$root.$emit('approve-vendor-basic-info')
        this.isApproved = true
        this.step = 1
      },
      next() {
        this.$root.$emit('next-vendor-signup-step')
        if (this.step < 5) {
          this.step += 1
        }
        console.log(this.step)
      },
      prev() {
        this.$root.$emit('prev-vendor-signup-step')
        if (this.step > 0) {
          this.step -= 1
        }
        if (this.step == 0) {
          this.isApproved = false
        }
      },
      scrollToTop() {
        window.scrollTo(0, 0)
      }
    },
    created(){
    },
    mounted() {
    },
    computed:{
      nextLabel () {
        if ( this.step == 5) {
          return 'Sign Up'
        } else if ( this.step == 4 ) {
          return 'Finish'
        } else {
          return 'Next'
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .vendor-signup-layout-wrapper {
    section.header-wrapper {
      width: 100%;
      border-radius: 3px;
      background-color: #ffffff;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
      display: flex;
      z-index: 9999;

      a {
        margin: 68px 350px 68px 123px;
        flex: 0 0 113px;
        display: inline-block;
        img {
          width: 100%;
        }
      }
    }
    section.footer-wrapper {
      z-index: 9999;
      width: 100%;
      padding: 33px 168px;
      background-color: #ffffff;
      border-radius: 3px;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
      text-align: right;

      a {
        display: inline-block;
        padding: 17px 55px;
        cursor: pointer;
        border-radius: 3px;
        font: 800 20px Manrope-Regular, sans-serif;
        display: inline-block;
        min-width: 268px;
        text-align: center;

        &.approve {
          border: 1px solid #f51355;
          color: #ffffff;
          background-color: #f51355;

          &:hover {
            color: #dddddd!important;
          }
        }
      }
      &.approved {
        display: flex;
        justify-content: space-between;

        .left {
          a {
            &.back {
              color: #050505;
              font: 800 16px Manrope-Regular, sans-serif;
              img {
                width: 24px;
                transform: rotate(180deg);
              }
            }
          }
          span {
            cursor: pointer;
            width: 24px;
            box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
            border-radius: 50%;
            img {
              width: 12px;
              transform: rotate(270deg);
            }
          }
        }
        .right {
          a {
            &.save {
              color: #f51355;
              border: 1px solid #f51355;
              margin-right: 40px;
              font: bold 20px Manrope-Regular, sans-serif;
              border-radius: 3px;
              img {
                width: 24px;
                margin-right: 12px;
              }
            }
          }
        }
      }
    }
  }
</style>
