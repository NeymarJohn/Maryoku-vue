<template>
  <div class="md-layout" style="text-align: center;">
    <h2 class="title text-center" style="text-align: center;width: 100%;">Welcome, lets create your workspace</h2>
    <div class="md-layout-item md-size-50 mx-auto">
      <signup-card>
        <!--<div class="md-layout-item md-size-50 md-medium-size-50 md-small-size-100 ml-auto" slot="content-left">
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
        </div>-->
        <div class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 mr-auto " slot="content-right" style="padding: 24px;">
          <vue-element-loading :active="loading" spinner="ring" color="#FF547C"/>
          <div>&nbsp;</div>
          <!--<div class="social-line text-center">
            <md-button class="md-just-icon-social md-google" @click="authenticate('google')">
              <i class="fab fa-google-plus-g" style="font-size: 42px !important;width: 80px;height: 42px;"></i>
            </md-button>
            <md-button class="md-just-icon-social md-circle md-linkedin" @click="authenticate('linkedin')">
              <i class="fab fa-linkedin" style="font-size: 42px !important;width: 80px;height: 42px;"></i>
            </md-button>
            &lt;!&ndash;<md-button class="md-just-icon md-round md-facebook">
              <i class="fab fa-facebook-f"></i>
            </md-button>&ndash;&gt;
            <h4 class="mt-3">or sign up with your work email address</h4>
          </div>-->
          <!--<md-field :class="[
          {'md-valid': !errors.has('email') && touched.email},
          {'md-error': errors.has('email')}]">
            <label>Your <strong>Work</strong> Email Address</label>
            <md-input v-model="email" type="email" data-vv-name="email" required v-validate="modelValidations.email"></md-input>
          </md-field>-->
          <md-field :class="[
          {'md-valid': !errors.has('workspace') && touched.workspace},
          {'md-error': errors.has('workspace')},
          {'extra-margin' : error}]">
            <label>Workspace Name</label>
            <span class="md-prefix">https://</span>
            <md-input v-focus v-model="workspace" type="text" data-vv-name="workspace" required @keyup="checkWorkspace"></md-input>
            <span class="md-suffix">.262days.com</span>
            <div class='md-error' v-if="!workspaceValid" style="text-align: center; width: 100%;font-size: 0.9rem; padding-top: 18px;">{{error}}</div>
          </md-field>

          <div><md-checkbox v-model="terms" ></md-checkbox> I agree to 262Days <a href="https://www.262days.com/terms" target="_blank">Terms of Use</a> and <a href="https://www.262days.com/privacy" target="_blank">Privacy Policy</a></div>
          <div class="button-container">
            <md-button @click="signup" class="md-success md-round mt-4" slot="footer" :disabled="!terms || !workspaceValid">Continue</md-button>
          </div>
        </div>
      </signup-card>

    </div>
  </div>
</template>
<script>
import { SignupCard } from "@/components";
import auth from "@/auth";
import VueElementLoading from 'vue-element-loading';
import Tenant from '@/models/Tenant';

export default {
  components: {
    SignupCard,
    VueElementLoading
  },
  methods: {
    authenticate(provider) {
      this.loading = true;
      let tenantId = document.location.hostname.replace(".262days.com","");
      const callback = btoa(`${document.location.protocol}//${document.location.hostname}:${document.location.port}/#/signedin?token=`);
      document.location.href = `${this.$data.serverURL}/oauth/authenticate/${provider}?tenantId=${tenantId}&callback=${callback}`;
    },
    signup(){
      this.loading = true;

      this.$validator.validateAll().then(isValid => {
        if (isValid){
          /*this.auth.signupOrSignin(this, this.email, this.password, (data) => {
            this.auth.login(this, {username: this.email, password: this.password}, (success) => {
              this.$router.push({ path: '/signedin', query: {token: success.access_token} });
            }, (failure) => {
              this.loading = false;
              if (failure.response.status === 401){
                this.error = 'Sorry, wrong password, try again.';
              } else {
                this.error = 'Temporary failure, try again later';
                console.log(JSON.stringify(failure.response));
              }
            } );
          })*/
        } else {
          this.loading = false;
        }
      });
    },
    checkWorkspace(){
      this.workspace = this.workspace.toLowerCase();
      if (this.workspace.length < 4 || this.workspace.length > 18 || this.workspace.replace(/[A-Za-z0-9_-]/g,"").length > 0 || this.workspace.startsWith("-") || this.workspace.startsWith("_") || this.workspace.endsWith("-") || this.workspace.endsWith("_")) {
        this.workspaceValid = false;
        this.error = "Should have 4-18 characters, start and end with a letter or digit and can include digits, letters, - (dash) and _ (underscore)"
      } else {

        if (this.t){
          clearTimeout(this.t);
          this.t = null;
        }

        this.t = setTimeout(function(){
          this.loading = true;
          let tenantId = document.location.hostname.replace(".262days.com","");
          tenantId = tenantId.length > 0 ? "_"+tenantId : '';

          new Tenant().find(this.workspace + tenantId).then(res =>{
            if (res.status){
              this.workspaceValid = false;
              this.error = 'This workspace is already taken, try another name';
            } else {
              this.workspaceValid = true;
              this.error = null;
            }
            this.loading = false;
          });
        }.bind(this), 500);
      }
    }
  },
  created() {
    const givenToken = this.$route.query.token;
    this.auth.setToken(givenToken);
    this.auth.currentUser(this, true);
    /*let tenantId = document.location.hostname.replace(".262days.com","");
    new Tenant().find(tenantId).then(res =>{
      if (!res.status){
        this.$router.push({name:"CreateWorkspace"});
      }
    });*/
  },
  watch: {
    email() {
      this.touched.email = true;
    },
    password() {
      this.touched.password = true;
    },
  },
  data() {
    return {
      error: '',
      workspace: '',
      loading: false,
      t: null,
      terms: false,
      workspaceValid: true,
      serverURL: process.env.SERVER_URL,
      auth: auth,
      touched: {
        workspace: false
      },
      modelValidations: {
        workspace: {
          required: true,
          min: 4,
          max: 12
        }
      },
      contentLeft: [
        {
          colorIcon: "icon-success",
          icon: "color_lens",
          title: "Get Inspired",
          description:
            "Why struggle to find good ideas for your company's next event, when you can simply browse through other companies' events, see what worked for them and adjust those ideas to your needs."
        },

        {
          colorIcon: "icon-danger",
          icon: "calendar_today",
          title: "Plan Ahead",
          description:
            "Making the best of your annual budget is so much easier when you have visibility over all year occasions combined with insights on industry benchmark."
        },

        {
          colorIcon: "icon-info",
          icon: "developer_board",
          title: "Work Less",
          description:
            "Stop spending hours on phone calls, emails, quotes and invoices. Locate ranked suppliers and have them work for you."
        }
      ]
    };
  }
};
</script>
<style scoped>
  p.description {
    font-size: 16px;
  }

  h4.info-title {
    font-size: 18px;
    font-weight: 400;
  }

  .extra-margin {
    margin-bottom: 64px !important;
  }
</style>
