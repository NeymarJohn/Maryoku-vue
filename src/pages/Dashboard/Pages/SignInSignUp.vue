<template>
  <div class="md-layout">
    <vue-element-loading :active="loading" spinner="ring" color="#FF547C" isFullScreen/>
    <div class="md-layout-item">
      <!-- <h2 class="title text-center" slot="title" style="text-align: center;">Sign In</h2>
      <signup-card>
        <div class="md-layout-item md-size-50 md-medium-size-50 md-small-size-100 ml-auto" slot="content-left">
          <div class="info info-horizontal" v-for="item in contentLeft" :key="item.title">
            <div :class="`icon ${item.colorIcon}`">
              <md-icon>{{ item.icon }}</md-icon>
            </div>
            <div class="description">
              <h4 class="info-title">{{ item.title }}</h4>
              <p class="description">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-size-50 md-medium-size-50 md-small-size-100 mr-auto " slot="content-right">
          <div class="social-line text-center">
            <md-button class="md-just-icon-social md-google" @click="authenticate('google')">
              <i class="fab fa-google-plus-g" style="font-size: 42px !important;width: 80px;height: 42px;"></i>
            </md-button>
            <h4 class="mt-3">or sign up with your work email address</h4>
          </div>
          <md-field :class="[{'md-valid': !errors.has('email') && touched.email},{'md-error': errors.has('email')}]">
            <label>Email Address</label>
            <md-input v-model="email" type="email" data-vv-name="email" required v-validate="modelValidations.email" v-focus @keypress.enter="signup"></md-input>
          </md-field>
          <md-field :class="[{'md-valid': !errors.has('password') && touched.password},{'md-error': errors.has('password')}]">
            <label>Password</label>
            <md-input v-model="password" type="password" data-vv-name="password" required v-validate="modelValidations.password" @keypress.enter="signup"></md-input>
            <div class="md-error" style="text-align: center; width: 100%;">{{error}}</div>
          </md-field>
          <div class="title">
            By signing up you agree to our <br/> <a href="https://www.maryoku.com/terms" target="_blank" style="background-color: #f2f2f2;">Terms of Use</a> and <a href="https://www.maryoku.com/privacy" target="_blank" style="background-color: #f2f2f2;">Privacy Policy</a>
          </div>
          <div class="button-container">
            <md-button @click="signup" class="md-success md-round mt-4" slot="footer">Continue</md-button>
          </div>
        </div>
      </signup-card> -->
      <modal class="sorry-modal" container-class="modal-container sign-in border-radius-28">
        <template slot="header">
          <div class="sorry-modal__header">
            <h3 v-if="isForgot">Forgot Password</h3>
            <h3 v-else>Sign in</h3>
          </div>
          <button class="close">
            <md-icon>clear</md-icon>
          </button>
        </template>
        <template slot="body">
          <div class="sorry-modal__body" v-if="!isForgot">
            <md-field :class="[{'md-valid': !errors.has('email') && touched.email},{'md-error': errors.has('email')}]" class="border">
              <label>Email Address</label>
              <md-input 
                v-model="email" 
                type="email" 
                data-vv-name="email" 
                required v-validate="modelValidations.email" 
                v-focus 
                @keypress.enter="signup"
              ></md-input>
            </md-field>
            <md-field :class="[{'md-valid': !errors.has('password') && touched.password},{'md-error': errors.has('password')}]">
              <label>Password</label>
              <md-input 
                v-model="password" 
                type="password" 
                data-vv-name="password" 
                required v-validate="modelValidations.password" 
                @keypress.enter="signup"
              ></md-input>
            </md-field>
            <a class="forgot" @click="isForgot=true">Forgot your password?</a>
          </div>
          <div class="sorry-modal__body" v-else>
            <md-field :class="[{'md-valid': !errors.has('email') && touched.email},{'md-error': errors.has('email')}]" class="border">
              <label>Email Address</label>
              <md-input 
                v-model="email" 
                type="email" 
                data-vv-name="email" 
                required v-validate="forgotPasswordValidations.email" 
                v-focus 
                @keypress.enter="forgotPassword()"
              ></md-input>
            </md-field>
            <div class="md-error" v-if="errors.items.length > 0" style="width: 100%;">{{errors.items[0].msg}}</div>
          </div>
        </template>
        <template slot="footer">
          <div class="sorry-modal__footer" v-if="!isForgot">
            <div class="or-divider-wrapper">
              <div class="divider-item">
              </div>
              <div class="or">
                Or
              </div>
              <div class="divider-item">
              </div>
            </div>
            <md-button class="cancel" @click="authenticate('google')">
              <i class="fab fa-google-plus-g" style="font-size: 42px !important;width: 80px;height: 42px;"></i>
              Sign in with Google
            </md-button>
            <md-button class="send warning" :class="[{'disabled': false}]" @click="signup">Sign in</md-button>
          </div>
          <div class="sorry-modal__footer" v-else>
            <md-button class="send warning" :class="[{'disabled': false}]" @click="forgotPassword()">Reset Password</md-button>
          </div>
        </template>
      </modal>
    </div>
  </div>
</template>

<script>
import { SignupCard } from '@/components'
import { Modal } from '@/components'
import InputText from '@/components/Inputs/InputText.vue'
// import auth from '@/auth';
import VueElementLoading from 'vue-element-loading'
import Tenant from '@/models/Tenant'

export default {
  components: {
    SignupCard,
    Modal,
    InputText,
    VueElementLoading
  },
  methods: {
    authenticate (provider) {
      this.loading = true
      let tenantId = document.location.hostname.replace('.maryoku.com', '').replace('.', '_')
      const callback = btoa(`${document.location.protocol}//${document.location.hostname}:${document.location.port}/#/signedin?token=`)
      document.location.href = `${this.$data.serverURL}/oauth/authenticate/${provider}?tenantId=${tenantId}&callback=${callback}`
    },
    signup () {
      this.loading = true
      let that = this
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          // that.$auth.signupOrSignin(that, this.email.toString().toLowerCase(), that.password, 'administrator', (data) => {
          //   that.$auth.login(that, {username: that.email.toString().toLowerCase(), password: that.password}, (success) => {
          //     that.$router.push({ path: '/signedin', query: {token: success.access_token} })
          //   }, (failure) => {
          //     that.loading = false
          //     if (failure.response.status === 401) {
          //       that.error = 'Sorry, wrong password, try again.'
          //     } else {
          //       that.error = 'Temporary failure, try again later'
          //       console.log(JSON.stringify(failure.response))
          //     }
          //   })
          // })
          that.$auth.login(that, {username: that.email.toString().toLowerCase(), password: that.password}, (success) => {
            that.$router.push({ path: '/signedin', query: {token: success.access_token} })
          }, (failure) => {
            that.loading = false
            if (failure.response.status === 401) {
              that.error = 'Sorry, wrong password, try again.'
            } else {
              that.error = 'Temporary failure, try again later'
              console.log(JSON.stringify(failure.response))
            }
          })
        } else {
          that.loading = false
        }
      })
    },
    forgotPassword () {
      let that = this
      console.log(this.errors.items.length)
      if (this.errors.items.length == 0) {
        this.isForgot = false
      }
      that.$auth.forgotPassword(that, that.email.toString().toLowerCase(), (success) => {
        this.isForgot = false
      }, (failure) => {
        that.loading = false
        if (failure.response.status === 401) {
          that.error = 'Sorry, No such user name or email address.'
        } else {
          that.error = 'Temporary failure, try again later'
          console.log(JSON.stringify(failure.response))
        }
      })
    }
  },
  created () {
    const givenToken = this.$route.query.token
    this.$auth.setToken(givenToken)
    this.$auth.currentUser(this, true)
    /* let tenantId = document.location.hostname.replace(".maryoku.com","");
    new Tenant().find(tenantId).then(res =>{
      if (!res.status){
        this.$router.push({name:"CreateWorkspace"});
      }
    }); */
  },
  watch: {
    email () {
      this.touched.email = true
    },
    password () {
      this.touched.password = true
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
      contentLeft: [
        {
          colorIcon: 'icon-success',
          icon: 'color_lens',
          title: 'Get Inspired',
          description: "Why struggle to find good ideas for your company's next event, when you can simply browse through other companies' events, see what worked for them and adjust those ideas to your needs."
        },

        {
          colorIcon: 'icon-danger',
          icon: 'calendar_today',
          title: 'Plan Ahead',
          description: 'Making the best of your annual budget is so much easier when you have visibility over all year occasions combined with insights on industry benchmark.'
        },

        {
          colorIcon: 'icon-info',
          icon: 'developer_board',
          title: 'Work Less',
          description: 'Stop spending hours on phone calls, emails, quotes and invoices. Locate ranked suppliers and have them work for you.'
        }
      ]
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
</style>
