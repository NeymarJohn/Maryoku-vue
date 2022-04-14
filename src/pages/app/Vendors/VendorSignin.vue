<template>
  <div class="md-layout vendor-signin">
    <Loader :active="loading" is-full-screen page="vendor" />
    <div class="md-layout-item">
      <signup-card>
        <div
          slot="content-left"
          class="md-layout-item md-size-50 md-medium-size-50 md-small-size-100 left-section p-60"
        >
          <div>Before we move on...</div>
          <div class="description-content text-center flex-1 pt-50 pb-50">
            <img style="width: 100px" :src="`${$iconURL}common/signin-logo-purple.svg`">
            <div class="social-line mt-40">
              <span class="font-size-40 font-bold line-height-15 text-transform-uppercase">
                Stop looking at your watch
              </span>
            </div>
            <div>You already know it's time for business.</div>
            <img class="mt-60" :src="`${$iconURL}common/maryoku-logo-purple-1.png`" style="width: 180px">
          </div>
        </div>
        <div
          slot="content-right"
          class="md-layout-item md-size-50 md-medium-size-50 md-small-size-100 p-60 right-section"
        >
          <div class="social-line text-center">
            <md-button class="md-black md-maryoku md-simple md-google" @click="authenticate('google')">
              <img :src="`${$iconURL}Signup/google-icon.jpg`" class="mr-20">
              <span>Sign in with Google</span>
            </md-button>
          </div>
          <maryoku-input
            v-model="user.email"
            v-validate="modelValidations.email"
            class="form-input"
            input-style="email"
            placeholder="Type email address here..."
          />
          <maryoku-input
            v-model="user.password"
            v-validate="modelValidations.password"
            class="form-input"
            type="password"
            input-style="password"
            placeholder="Type password here..."
          />
          <div class="md-error mt-10">
            <div v-if="notFoundUser" class="font-size-16">
              Sorry, we couldn’t find you.
              <br>
              If you are not a user please sign up <span class="signupLink" @click="toSingUp">here</span>.
            </div>
            <div>{{ error }}</div>
          </div>
          <!--          <div class="d-flex align-center">-->
          <!--              <md-checkbox class="md-vendor mr-10" v-model="accepted">I accept</md-checkbox>-->
          <!--              <a target="_blank" href="https://www.maryoku.com/terms" class="color-black font-size-16 font-bold">Maryoku's Terms & Conditions</a>-->
          <!--          </div>-->
          <div class="d-flex justify-content-end">
            <a class="color-black font-size-16 font-bold" @click="toForgotPassword">Forgot password?</a>
          </div>
          <div id="vendorLoginButtonsBlock" class="form-buttons">
            <md-button
              class="md-default md-red md-maryoku mt-30 md-vendor"
              :disabled="!user.password || !user.email"
              @click="signIn"
            >
              Login
            </md-button>
            <div class="text-center mt-10 mb-10">
              Or
            </div>
            <md-button class="md-black md-maryoku md-red md-vendor" @click="toSingUp">
              Sign Up
            </md-button>
          </div>
        </div>
      </signup-card>
    </div>
  </div>
</template>

<script>
import { SignupCard, MaryokuInput } from "@/components";
import TenantUser from "@/models/TenantUser";
import Loader from "@/components/loader/Loader.vue";

export default {
  name: "SignIn",
  components: {
    Loader,
    SignupCard,
    MaryokuInput,
  },
  data() {
    return {
      error: "",
      loading: false,
      user: new TenantUser("", ""),
      keepMe: false,
      accepted: false,
      serverURL: process.env.SERVER_URL,
      modelValidations: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          min: 6,
        },
      },
      forgotPasswordValidations: {
        email: {
          required: true,
          email: true,
        },
      },
      notFoundUser: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  async created() {
    if (this.loggedIn) {
      let res = await this.$store.dispatch("auth/checkToken", this.currentUser.access_token);
      if (res.currentUserType === "vendor") this.$router.push("/vendor/proposals");
    }
  },
  methods: {
    authenticate(provider) {
      let action = this.$route.query.action;
      this.loading = true;
      let tenantId = this.$authService.resolveTenantId();

      let callback = btoa(
        `${document.location.protocol}//${document.location.hostname}:${document.location.port}/#/vendor/signedin?token=`,
      );

      if (action) {
        callback = btoa(
          `${document.location.protocol}//${document.location.hostname}:${document.location.port}/#/vendor/signedin?action=${action}&token=`,
        );
      }
      document.location.href = `${this.$data.serverURL}/oauth/authenticate/${provider}?tenantId=${tenantId}&callback=${callback}`;
    },
    signIn() {
      this.loading = true;
      let that = this;
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          if (this.user.email && this.user.password) {
            const userData = {
              email: `${this.user.email}/vendor`,
              password: this.user.password,
            };
            this.$store.dispatch("auth/login", userData).then(
              () => {
                this.redirectPage();
              },
              (error) => {
                this.loading = false;
                this.notFoundUser = true;
                this.error = "";
              },
            );
          }
        } else {
          that.notFoundUser = false;
          that.error = "Sorry, invalid email or password, please check and try again";
          that.loading = false;
        }
      });
    },
    toSingUp() {
      this.$router.push({ path: "/vendor/signup" });
    },
    toForgotPassword() {
      this.$router.push({ path: "/vendor/forgot-password" });
    },
    redirectPage() {
      this.$router.push({ path: "/vendor/dashboard" });
    },
  },
};
</script>
<style lang="scss" scoped>
.vendor-signin {
  max-width: 1100px;
  margin: 0px auto;
  padding: 40px;
  overflow: hidden;

  .left-section {
    background-color: #64185608;
    flex-direction: column;
    display: flex;

    .description-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .right-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;

    .form-input {
      margin-top: 30px;
    }

    .form-buttons {
      padding: 20px 60px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
    }
  }
}
</style>
