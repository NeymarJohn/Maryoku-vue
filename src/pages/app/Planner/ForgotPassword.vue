<template>
  <div class="md-layout">
    <Loader :active="loading" is-full-screen />
    <div class="md-layout-item">
      <div class="d-flex flex-column">
        <img class="mx-auto" :src="`${$iconURL}PinkIcons/icon-reset-password-planner.svg`">
        <div class="text-center font-size-30 font-bold color-black my-20">
          Forgot your Password?
        </div>
      </div>
      <signup-card>
        <div
          slot="content-right"
          class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 signin-contain w-max-600"
        >
          <p v-if="!submitted" class="font-size-16 text-center font-bold">
            Please enter the email address you used to create your Maryoku account:
          </p>
          <p v-else class="font-size-16 font-bold">
            We have sent a temporary password & instructions to your email.
          </p>
          <maryoku-input
            v-model="email"
            v-validate="modelValidations.email"
            :disabled="submitted"
            class="form-input mb-10"
            input-style="email"
            placeholder="Email address"
            @change="changeEmail"
          />
          <div v-if="submitted" class="color-red font-size-14">
            Please check your email
          </div>
          <div v-if="error" class="md-error">
            {{ error }}
          </div>
          <div class="form-buttons">
            <md-button
              slot="footer"
              class="md-default md-red md-maryoku mt-4"
              :disabled="submitted"
              @click="forgotPassword"
            >
              Send
            </md-button>
          </div>
          <div v-if="!submitted">
            <p class="text-center">
              If your email address is in our records, you will receive an email enabling you to create a temporary
              password that will be valid for 24 hours. Simply sign in using this temporary password and then replace it
              with a new permanent one.
            </p>
          </div>
          <div v-else class="d-flex flex-column">
            <p class="text-center font-size-16 font-bold">
              Did not receive the email?
            </p>
            <span class="text-center font-size-16 font-bold">Check your spam filter, or
              <a class="color-vendor font-size-18" @click="reset">try another email address</a></span>
          </div>
        </div>
      </signup-card>
      <div class="d-flex flex-column">
        <img class="mx-auto mt-100" :src="`${$iconURL}Onboarding/maryoku-logo-dark%402x%403x.png`" width="200px">
      </div>
    </div>
  </div>
</template>

<script>
import { SignupCard, MaryokuInput } from "@/components";
import Loader from "@/components/loader/Loader.vue";

export default {
  components: {
    SignupCard,
    MaryokuInput,
    Loader,
  },
  data() {
    return {
      error: "",
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
        password: false,
      },
      modelValidations: {
        email: {
          required: true,
          email: true,
        },
      },
      forgotPasswordValidations: {
        email: {
          required: true,
          email: true,
        },
      },
      submitted: false,
    };
  },
  watch: {
    email() {
      this.touched.email = true;
    },
  },
  methods: {
    forgotPassword() {
      this.$http.post(`${process.env.SERVER_URL}/1/forgot-password`, { email: this.email }, { "ContentType": "application/json" })
        .then((res) => {
          this.loading = false;
          if (res.data.status) {
            this.submitted = true;
          } else {
            this.error = res.data.message;
          }
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
          if (error.response.status === 401) {
            this.error = "Sorry, No such user name or email address.";
          } else {
            this.error = "Temporary failure, try again later";
          }
        });
    },
    changeEmail() {
      this.error = null;
    },
    reset() {
      this.email = null;
      this.submitted = false;
    },
    toSingUp() {
      this.$router.push({ path: "/signup" });
    },
  },
};
</script>
<style lang="scss" scoped>
p.description {
  font-size: 16px;
}

.md-error {
  color: red;
}

.form-input {
  margin: 30px 0px;
  min-width: 300px;
}

.form-buttons {
  text-align: center;
}

.signin-contain {
  padding: 20px 60px;
}
</style>
