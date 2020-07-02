<template>
  <div class="md-layout">
    <vue-element-loading :active="loading" spinner="ring" color="#FF547C" isFullScreen/>
    <div class="md-layout-item">
      <!-- <h2 class="title text-center" slot="title" style="text-align: center;">Sign Up</h2> -->
      <signup-card class="signup-card">
        <div class="md-layout-item md-size-50 md-medium-size-50 md-small-size-100 ml-auto" slot="content-left">
          <div class="info info-horizontal">
            <div>
              <div class="image">
                <img :src="`${$iconURL}Signup/champain-red.svg`">
              </div>
              <div class="signup-title">TIME TO PUT YOURSELF <br/>A DRINK & RELAX!</div>
              <div class="signup-description">You can start thinkg about what you'll wear to <br/>the event, cause everything else is covered.</div>
            </div>
            <div class="logo">
              <img :src="`${$iconURL}Onboarding/maryoku-logo-dark%402x%403x.png`">
            </div>
          </div>
        </div>
        <div class="md-layout-item md-size-50 md-medium-size-50 md-small-size-100 mr-auto " slot="content-right">
          <div class="social-line text-center">
            <md-button class="md-black md-maryoku md-simple md-google" @click="authenticate('google')">
              <img :src="`${$iconURL}Signup/google-icon.jpg`">
              <span>Sign in with Google</span>
            </md-button>
            <h4 class="mt-1">Or</h4>
          </div>
          <maryoku-input class="form-input" inputStyle="username" v-model="name" placeholder="Type your name here..."></maryoku-input>
          <maryoku-input class="form-input" v-validate="modelValidations.email"  inputStyle="email" v-model="email" placeholder="Type email address here..."></maryoku-input>
          <maryoku-input class="form-input" inputStyle="company" v-model="company" placeholder="Type name of company here..."></maryoku-input>
          <maryoku-input class="form-input" v-validate="modelValidations.password" type="password" inputStyle="password" v-model="password" placeholder="Type password here..."></maryoku-input>
          <div class="terms-and-conditions">
            <md-checkbox v-model="terms">
            </md-checkbox>
            <div >
              I agree <a href="https://www.maryoku.com/terms" target="_blank" class="term-and-condition">Terms & Conditions</a>
            </div>
          </div>
          <div class="md-error text-center">
            {{this.error}}
          </div>
          <div class="text-center" >
              <div><md-button @click="signup" class="md-default md-red md-maryoku mt-4">Sign Up</md-button></div>
              <div><md-button @click="toSignin" class="md-black md-maryoku mt-4  md-simple mt-4">Already Singed?</md-button></div>
          </div>
        </div>
      </signup-card>
    </div>
  </div>
</template>

<script>
import { SignupCard, MaryokuInput} from '@/components'
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
    VueElementLoading,
    MaryokuInput
  },
  methods: {
    authenticate (provider) {
      this.loading = true
      let tenantId = document.location.hostname.replace('.maryoku.com', '').replace('.', '_')
      const callback = btoa(`${document.location.protocol}//${document.location.hostname}:${document.location.port}/#/signedin?token=`)
      document.location.href = `${this.$data.serverURL}/oauth/authenticate/${provider}?tenantId=${tenantId}&callback=${callback}`
    },
    signup () {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          if (!this.terms) {
            this.error = "Please confirm terms and conditions"
            return;
          }
          this.isLoading = true
          const userData = {
            email: this.email,
            name: this.name,
            password: this.password,
            role: 'administrator',
            company: this.company
          }
          this.$auth.signupOrSignin(this, userData,  
            (data) => {
              if (data.status == "exists" ) {
                this.error = "This email already registered. Please sign in or use another email."
              } else {
                this.$auth.login(this, {email: this.email, password: this.password}, 
                (success) => {
                  console.log("singup", data);
                  this.isLoading = false
                  // this.$router.push({ path: '/signedin', query: {token: success.access_token} })
                  if (data.status === "create-workspace") {
                    this.$router.push({ path: '/create-workspace' })
                  }
                  
                }, 
                (failure) => {
                  this.isLoading = false
                  if (failure.response.status === 401) {
                    this.error = 'Sorry, wrong password, try again.'
                  } else  if (failure.response.status === 400) {
                    this.error = 'Please fill all values'
                    console.log(JSON.stringify(failure.response))
                  } else  if (failure.response.status === 500) {
                    this.error = 'Temporary failure, try again later'
                    console.log(JSON.stringify(failure.response))
                  }
                })
              }

            },
            (failure) => {
              this.isLoading = false
              if (failure.response.status === 401) {
                this.error = 'Sorry, wrong password, try again.'
              } else  if (failure.response.status === 400) {
                this.error = 'Please fill all values'
                console.log(JSON.stringify(failure.response))
              } else  if (failure.response.status === 500) {
                this.error = 'Temporary failure, try again later'
                console.log(JSON.stringify(failure.response))
              }
            })
        } else {
          this.error = 'Please check all values and try again.'
        }
      })
    },
    toSignin() {
      this.$router.push({ path: '/signin' })
    }
  },
  created () {
    const givenToken = this.$route.query.token
    // this.$auth.setToken(givenToken)
    // this.$auth.currentTenantUser(this, true)
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
      name: "",
      company: "",
      email: "",
      password: "",
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
        },
        name: {
          required: true,
        },
        company: {
          required: true,
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
    .signup-card .md-card-content {
      padding: 0;
    }
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
    .ml-auto {
      background: #FFF0F4;
      padding: 60px 60px 20px;
    }
    .mr-auto {
      padding: 20px 60px 20px;
    }
    .form-input{
      margin:20px 0px;
      min-width: 300px;
    }
    .signup-title {
      text-align: center;
      font-size: 28px;
      font-family: "Manrope-Bold";
      line-height: 1.5em;
    }
    .signup-description {
      margin-top: 20px;
      font-size: 16px;
      font-family: "Manrope-Regular";
      line-height: 1.5em;
      white-space: nowrap;
      text-align: center;
    }
    .terms-and-conditions {
      display: flex;
      align-items: center;
      font-size: 16px;
      a {
        color: #050505;
        font-family: "Manrope-Bold";
        text-decoration: underline;
      }
      
    }
    .info-horizontal {
      position: relative;
      height: 100%;
      .image {
        margin: 0px auto 40px;
        text-align: center;
        img {
           margin: 0px auto;
          width: 150px;
        }
      }
      .logo {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 50px;
        img {
          width: 200px;
        }
      }
    }
    .md-google {
      span {
        padding-left: 20px;
      }
    }
</style>
