<template>
  <div class="content mx-40" :class="page === 'signin' ? 'py-40' : 'py-20'">
    <template v-if="page === 'signin'">
      <div class="text-center">
        <md-button class="md-black md-maryoku md-simple md-google" @click="authenticate('google')">
          <img :src="`${$iconURL}Signup/google-icon.jpg`" class="mr-10">
          <span>Sign in with Google</span>
        </md-button>
        <div>Or</div>
      </div>
      <maryoku-input
        v-model="email"
        v-validate="validations.email"
        class="form-input mt-30"
        data-vv-name="email"
        input-style="email"
        placeholder="Type email address here..."
      />
      <maryoku-input
        v-model="password"
        v-validate="validations.password"
        class="form-input mt-30"
        data-vv-name="password"
        type="password"
        input-style="password"
        placeholder="Type password here..."
      />
      <div class="terms-and-conditions text-left mt-30">
        <md-checkbox v-model="keepMe">
          Keep me signed in
        </md-checkbox>
      </div>
      <div class="md-error">
        {{ error }}
      </div>
      <div class="text-center">
        <md-button class="md-default md-red md-maryoku custom-btn mt-4" @click="signup">
          Sign In
        </md-button>
        <md-button class="md-black md-red md-maryoku md-simple mt-4 ml-4" @click="changePage">
          Sign Up
        </md-button>
      </div>

      <div class="text-center">
        <md-button class="md-black md-maryoku mt-4 md-simple mt-4">
          Forgot my password?
        </md-button>
      </div>
    </template>
    <template v-else>
      <div class="social-line text-center">
        <md-button class="md-black md-maryoku md-simple md-google" @click="authenticate('google')">
          <img :src="`${$iconURL}Signup/google-icon.jpg`" class="mr-10">
          <span>Sign up with Google</span>
        </md-button>
        <div>Or</div>
      </div>
      <maryoku-input
        v-model="name"
        class="form-input mt-30"
        input-style="username"
        placeholder="Type your name here..."
      />
      <maryoku-input
        v-model="email"
        v-validate="validations.email"
        class="form-input mt-20"
        data-vv-name="email"
        input-style="email"
        placeholder="Type email address here..."
      />
      <maryoku-input
        v-model="company"
        class="form-input mt-20"
        input-style="company"
        placeholder="Type name of company here..."
      />
      <maryoku-input
        v-model="password"
        v-validate="validations.password"
        class="form-input mt-20"
        data-vv-name="password"
        type="password"
        input-style="password"
        placeholder="Type password here..."
      />
      <div class="terms-and-conditions">
        <md-checkbox v-model="terms" class="mt-30">
          <div>
            I agree
            <a
              href="https://www.maryoku.com/terms"
              target="_blank"
              class="font-size-18 font-bold-extra color-black ml-5"
            >Terms & Conditions</a>
          </div>
        </md-checkbox>
      </div>
      <div class="md-error text-center">
        <div v-if="error === 'email'" class="font-size-16">
          This email is already existed.
          <br>
          Please signin <span class="signInLink" @click="changePage">here</span>.
        </div>
        <div v-if="error === 'company'" class="font-size-16">
          This workspace already exists, and you need to be invited to it. Either create new workspace or ask admin
          for invitation.
        </div>
        <div v-if="error === 'failed'" class="font-size-16">
          The signup is failed. Please try again later.
        </div>
        <div v-if="errorMsg">
          {{ errorMsg }}
        </div>
      </div>
      <div class="text-center">
        <div>
          <md-button class="md-default md-red md-maryoku mt-4" @click="signup">
            Sign Up
          </md-button>
        </div>
        <div>
          <md-button class="md-black md-maryoku mt-4 md-simple mt-4" @click="changePage">
            Already a User?
          </md-button>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
    import { FadeTransition } from "vue2-transitions";
    import MaryokuInput  from "../Inputs/MaryokuInput";

    export default {
        components: {
            FadeTransition,
            MaryokuInput,
        },
        props:{
            page:{
                type: String,
                default: "signin",
            }
        },
        data() {
            return {
                name: null,
                company: null,
                email: null,
                password: null,
                department: null,
                terms: false,
                validations: {
                    email: {
                        required: true,
                        email: true,
                    },
                    password: {
                        required: true,
                        min: 8,
                    },
                },
                keepMe: false,
                errorMsg: "",
                error: "",
            };
        },
        methods: {
            signup() {
                console.log("signup", this.$validator);
                this.$validator.validateAll().then((isValid) => {
                    if (isValid) {
                        if (this.page === "signin") {
                            this.$emit("signIn", {email: this.email, password: this.password});
                        } else {
                            this.$emit("signUp", {name: this.name, company: this.company, email: this.email, password: this.password});
                        }

                    } else {
                        this.error = "Sorry, invalid email or wrong password, try again.";
                    }
                });
            },
            authenticate(provider) {
                this.$emit("authenticate", provider);
            },
            changePage(){
                this.$emit("changePage");
            }
        },

    };
</script>
<style lang="scss" scoped>
.signin{
  width: 360px;
  padding: 0;
}
.signup{
  width: 420px;
}
</style>
