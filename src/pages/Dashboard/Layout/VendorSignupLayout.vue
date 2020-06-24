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
        <a class="save" @click="saveDraft()">
          <img :src="`${iconsUrl}Asset 610.svg`"/>
          Save for later
        </a>
        <a class="approve" @click="next()">
          {{nextLabel}}
        </a>
      </div>
    </section>
    <section class="footer-wrapper" v-else>
      <a class="approve" @click="approve()" :class="{'disabled': !validateBasicFields()}">
        Approve & Begin
      </a>
    </section>
    <modal v-if="savedItModal" class="saved-it-modal" container-class="modal-container sm">
      <template slot="header">
        <div class="saved-it-modal__header">
          <h3><img :src="`${proposalIconsUrl}Asset 588.svg`"/>Saved It!</h3>
        </div>
        <button class="close" @click="hideModal()">
          <img :src="`${proposalIconsUrl}Group 3671 (2).svg`"/>
        </button>
      </template>
      <template slot="body">
        <div class="saved-it-modal__body">
          <p>
            Your vendor info was saved!
          </p>
        </div>
      </template>
      <template slot="footer">
        <div class="saved-it-modal__footer">
          <button class="cool" @click="hideModal()">Ok, Thanks</button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
  import VSignupSteps from './Extra/VSignupSteps.vue'
  import { Modal } from '@/components'
  import moment from 'moment'

  export default {
    components: {
      VSignupSteps,
      Modal
    },
    data() {
      return {
        vendor: {},
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        savedItModal: false,
        iconsUrl: 'http://static.maryoku.com/storage/icons/NewSubmitPorposal/',
        proposalIconsUrl: 'http://static.maryoku.com/storage/icons/NewSubmitPorposal/',
        isApproved: false,
        step: 1,
      }
    },
    methods: {
      goTo (router) {
        this.$router.push(router)
      },
      validateBasicFields() {
        return this.vendor.email && 
          this.reg.test(this.vendor.email) &&
          this.vendor.companyName && 
          this.vendor.vendorCategory && 
          this.vendor.address 
      },
      approve() {
        if (this.validateBasicFields()) {
          this.$root.$emit('approve-vendor-basic-info')
          this.isApproved = true
          this.step = 1
        } else {
          // swal({
          //   title: `Please make sure filling out all required fields`,
          //   showCancelButton: true,
          //   confirmButtonClass: 'md-button md-success',
          //   cancelButtonClass: 'md-button md-danger',
          //   confirmButtonText: "Yes I'm sure",
          //   cancelButtonText: 'No, take me back',
          //   buttonsStyling: false
          // })
        }
      },
      next() {
        this.$root.$emit('next-vendor-signup-step')
        if (this.step < 5) {
          this.step += 1
        } else {
          if (this.vendor.password == this.vendor.confirmPassword) {
            this.$root.$emit('vendor-signup')
            this.savedItModal = true
          } else {
          }
        }
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
      },
      saveDraft () {
        this.savedItModal = true
      },
      hideModal() {
        this.savedItModal = false
      },
      camelize(str) {
        let temp = str.replace(/\W+(.)/g, function(match, chr) {
          return chr.toUpperCase()
        })
        return temp.charAt(0).toLowerCase() + temp.slice(1)
      }
    },
    created(){
    },
    mounted() {
      this.$root.$on('go-to-signup-step', (step) => {
        this.step = step
        this.isApproved = this.step < 1 ? false : true
      })
      this.$root.$on('update-vendor-value', (field, value) => {
        this.$set(this.vendor, this.camelize(field), value)
      })
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
      },
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

          &.disabled {
            box-shadow: none;
            background-color: #818080;
            border: none;
            opacity: 0.5;
            pointer-events: none;
          }
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
    .saved-it-modal {
      &__header {
        width: 100%;
        padding: 55px 31px 24px 31px;
        text-align: center;
        h3 {
          font-size: 30px;
          font-weight: bold;
          color: #f51355;

          img {
            width: 55px;
            height: 55px;
            margin-right: 15px;
          }
        }
        .header-description {
          max-width: 550px;
          margin: 0 auto;
          text-align: left;
          font-size: 20px;
          color: #050505;

          &.text-center {
            text-align: center;
          }
        }
        & + .close {
          background: transparent;
          border: none;
          position: absolute;
          top: 61px;
          right: 60px;
          color: #050505;
          cursor: pointer;
          img {
            width: 20px;
          }
        }
      }
      &__body {
        p {
          font: 800 20px Manrope-Regular, sans-serif;
        }
      }
      &__footer {
        padding: 10px 40px 40px 40px;
      }
    }
    .cool {
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
      background-color: #f51355;
      border-radius: 3px;
      padding: 8px 36px;
      cursor: pointer;
      border: none;
    }
  }
</style>
