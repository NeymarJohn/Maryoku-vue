<template>
  <div class="md-layout">
    <vue-element-loading :active="loading" spinner="ring" color="#FF547C" isFullScreen/>
    <div class="md-layout-item">
      <h2 class="title text-center" slot="title" style="text-align: center;">Reset Password</h2>
      <signup-card>
        <div class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 signin-contain" slot="content-right">
          <!-- <div class="social-line text-center">
            <h4 class="mt-3">Forgot Password</h4>
          </div> -->
          <maryoku-input class="form-input" v-validate="modelValidations.email" inputStyle="email" v-model="email" placeholder="Type email address here..."></maryoku-input>
          <div class="md-error">{{error}}</div>
          <div class="form-buttons">
            <md-button @click="forgotPassword" class="md-default md-red md-maryoku mt-4" slot="footer">ResetPassword</md-button>
            <!-- <br/>
            <md-button @click="isForgot=true" class="md-black md-maryoku mt-4  md-simple mt-4" slot="footer">Forgot my password?</md-button> -->
          </div>
        </div>
      </signup-card>
    </div>
  </div>
</template>

<script>
import { SignupCard, MaryokuInput } from '@/components'
import InputText from '@/components/Inputs/InputText.vue'
import VueElementLoading from 'vue-element-loading'
import Tenant from '@/models/Tenant'

export default {
  components: {
    SignupCard,
    InputText,
    VueElementLoading,
    MaryokuInput
  },
  methods: {
    forgotPassword () {
      let that = this
      console.log(this.errors.items.length)
      that.$auth.forgotPassword(
        that, 
        that.email.toString().toLowerCase(), 
        (success) => {
          that.isForgot = false
        }, 
        (failure) => {
          console.log(failure)
          that.loading = false
          if (failure.response.status === 401) {
            that.error = 'Sorry, No such user name or email address.'
          } else {
            that.error = 'Temporary failure, try again later'
            console.log(JSON.stringify(failure.response))
          }
        })
    },
    toSingUp() {
      this.$router.push({ path: '/signup' })
    }
  },
  watch: {
    email () {
      this.touched.email = true
    }
  },
  data () {
    return {
      error: '',
      loading: false,
      firstname: null,
      terms: false,
      email: null,
      password: null,
      isForgot: false,
      serverURL: process.env.SERVER_URL,
      // auth: auth,
      touched: {
        email: false,
        password: false
      },
      modelValidations: {
        email: {
          required: true,
          email: true
        }
      },
      forgotPasswordValidations: {
        email: {
          required: true,
          email: true
        },
      },
    }
  }
}
</script>
<style lang="scss" scoped>
    p.description {
      font-size: 16px;
    }

    h4.info-title {
      font-size: 18px;
      font-weight: 400;
    }

    .sorry-modal {
      font-family: 'Rubik', sans-serif;

      &__header {
        width: 100%;
        padding: 8px 8px 0;
        display: flex;
        justify-content: center;

        h3 {
          text-align: center;
          margin: 0;
          color: #641956;
          font-size: 32px;
          font-weight: 400;
        }

        & + .close {
          background: transparent;
          border: none;
          position: absolute;
          top: 48px;
          right: 54px;
          color: #641956;
          cursor: pointer;

          i {
            color: #641956;
          }
        }
      }
      &__body {
        padding: 10px 40px;

        .forgot {
          display: block;
          color: #641956;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
        }
      }
      &__footer {
        width: 100%;
        padding: 10px 20px 20px 20px;
        .or-divider-wrapper {
          padding-bottom: 20px;
          color: #aaaaaa;
          display: flex;
          justify-content: center;
          align-items: center;

          .divider-item {
            height: 2px;
            background-color: #aaaaaa;
            width: 100%;
          }
          .or {
            padding: 0 22px;
            font-weight: bold;
          }
        }
        .cancel {
          width: 100%;
          height: 56px;
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
          background-color: transparent;
          border-radius: 12px;
          cursor: pointer;
          border: none;
          margin-bottom: 56px;
        }
        .send {
          width: 100%;
          height: 56px;
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
          background: #FF0066 0% 0% no-repeat padding-box!important;
          border-radius: 12px;
          padding: 8px 36px;
          cursor: pointer;
          border: none;
          box-shadow: 0px 12px 24px #ff006633;
        }
      }
    }
    .md-error {
      color: red;
    }
    .form-input{
      margin:30px 0px;
      min-width: 300px;
    }
    .form-buttons {
      text-align: center;
    }
    .signin-contain {
      padding: 20px 60px;
    }
</style>
