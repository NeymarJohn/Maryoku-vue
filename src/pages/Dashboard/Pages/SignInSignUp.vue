<template>
  <div class="md-layout">
    <vue-element-loading :active="loading" spinner="ring" color="#FF547C" isFullScreen/>
    <div class="md-layout-item">
      <signup-card>
        <div class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 signin-contain" slot="content-right">
          <div class="social-line text-center">
            <md-button class="md-black md-maryoku md-simple md-google" @click="authenticate('google')">
              <img :src="`${$iconURL}Signup/google-icon.jpg`">
              <span>Sign in with Google</span>
            </md-button>
            <h4 class="mt-1">Or</h4>
          </div>
          <maryoku-input class="form-input" v-validate="modelValidations.email" inputStyle="email" v-model="user.email" placeholder="Type email address here..."></maryoku-input>
          <maryoku-input class="form-input" v-validate="modelValidations.password" type="password" inputStyle="password" v-model="user.password" placeholder="Type password here..."></maryoku-input>
          <div class="md-error">{{error}}</div>
          <div class="terms-and-conditions mt-2">
            <md-checkbox v-model="keepMe">
              Keep me signed in
            </md-checkbox>
          </div>
          <div class="form-buttons">
            <div>
              <md-button @click="signIn" class="md-default md-red md-maryoku mt-4" slot="footer">Sign In</md-button>
              <md-button @click="toSingUp" class="md-black md-maryoku mt-4  md-simple mt-4" slot="footer">Sign Up</md-button>
            </div>
            <md-button @click="toForgotPassword" class="md-black md-maryoku mt-4  md-simple mt-4" slot="footer">Forgot my password?</md-button>
          </div>
        </div>
      </signup-card>
    </div>
  </div>
</template>

<script>
import { SignupCard, MaryokuInput, Modal } from '@/components'
import InputText from '@/components/Inputs/InputText.vue'
import VueElementLoading from 'vue-element-loading'
import Tenant from '@/models/Tenant'
import TenantUser from '@/models/TenantUser'
export default {
  name: "SignIn",
  components: {
    SignupCard,
    Modal,
    InputText,
    VueElementLoading,
    MaryokuInput
  },
  methods: {
    authenticate (provider) {
      this.loading = true
      let tenantId = this.$authService.resolveTenantId()
      const callback = btoa(`${document.location.protocol}//${document.location.hostname}:${document.location.port}/#/signedin?token=`)
      console.log(`${this.$data.serverURL}/oauth/authenticate/${provider}?tenantId=${tenantId}&callback=${callback}`)
      document.location.href = `${this.$data.serverURL}/oauth/authenticate/${provider}?tenantId=${tenantId}&callback=${callback}`
    },
    signIn () {
      this.loading = true
      let that = this
      this.$validator.validateAll().then(isValid => {
        console.log(this.$validator)
        if (isValid) {
          if (this.user.email && this.user.password) {
            this.$store.dispatch('auth/login', this.user).then(
              () => {
                this.redirectPage()
              },
              error => {
                this.loading = false;
                this.error = "Invalid email or wrong password, try again."
              }
            );
          }
          // that.$auth.login(that, {email: that.email.toString().toLowerCase(), password: that.password}, (success) => {
          //   that.$router.push({ path: '/signedin', query: {token: success.access_token} })
          // }, (failure) => {
          //   that.loading = false
          //   if (failure.response.status === 401) {
          //     that.error = 'Sorry, invalid email or wrong password, check and try again.'
          //   } else {
          //     that.error = 'Temporary failure, try again later'
          //     console.log(JSON.stringify(failure.response))
          //   }
          // })
        } else {
          that.error = 'Sorry, invalid email or wrong password, try again.'
          that.loading = false
        }
      })
    },
    toSingUp() {
      this.$router.push({ path: '/signup' })
    },
    toForgotPassword() {
      this.$router.push({ path: '/forgot-password' })
    },
    redirectPage() {
      if (this.currentUser) {
        if (this.currentUser.currentTenant) {
          this.$router.push({ path: '/events'})
        } else if (this.currentUser.tenants.length === 0) {
          this.$router.push({ path: '/create-workspace'})
        } else if (this.currentUser.tenants.length > 0) {
          this.$router.push({ path: '/choose-workspace'})
        } else {
          this.$router.push({ paht: '/error'})
        }
      }
    }
  },
  beforeMount () {
    if (this.loggedIn) {
      this.$store.dispatch('auth/checkToken')
      .then(res=>{
        this.redirectPage()
      })
      .catch(err=>{
        this.$router.push({path:'signin'})
      })
    }
  },
  data () {
    return {
      error: '',
      loading: false,
      user: new TenantUser('',''),
      keepMe: false,
      serverURL: process.env.SERVER_URL,
      modelValidations: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          min: 8
        }
      },
      forgotPasswordValidations: {
        email: {
          required: true,
          email: true
        },
      },
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user
    }
  },
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
    .signin-page .md-card-signup {
      box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.13);
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
    .md-google {
      span {
        padding-left: 20px;
      }
    }
    .ml-auto {
      background: #FFF0F4;
      padding: 20px 30px 20px;
    }
</style>
