<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <h2 class="title text-center" slot="title" style="text-align: center;">Sign In</h2>
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
            <md-button class="md-just-icon-social md-circle md-linkedin" @click="authenticate('linkedin')">
              <i class="fab fa-linkedin" style="font-size: 42px !important;width: 80px;height: 42px;"></i>
            </md-button>
            <!--<md-button class="md-just-icon md-round md-facebook">
              <i class="fab fa-facebook-f"></i>
            </md-button>-->
            <h4 class="mt-3">or proceed with your email address</h4>
          </div>
          <md-field class="md-form-group" v-for="item in inputs" :key="item.name">
            <md-icon>{{item.icon}}</md-icon>
            <label>{{item.name}}</label>
            <md-input :v-model="item.nameAttr" :type="item.type"></md-input>
          </md-field>
          <md-checkbox v-model="terms">I agree to the <a>terms and conditions</a>.</md-checkbox>
          <div class="button-container">
            <md-button href class="md-success md-round mt-4" slot="footer" :disabled="!terms">Continue</md-button>
          </div>
        </div>
      </signup-card>
    </div>
  </div>
</template>
<script>
import { SignupCard } from "@/components";
import Vendor from '@/models/Vendors';
import auth from "@/auth";

export default {
  components: {
    SignupCard
  },
  methods: {
    authenticate(provider) {
      document.location.href = `${this.$data.serverURL}/oauth/authenticate/${provider}`;
    }
  },
  async mounted()
  {
    this.vendors = await Vendor.get();
  },
  created() {
    const givenToken = this.$route.query.token;
    this.auth.setToken(givenToken);
    this.auth.currentUser(this, true);
  },
  data() {
    return {
      vendors: [],
      firstname: null,
      terms: false,
      email: null,
      password: null,
      serverURL: process.env.SERVER_URL,
      auth: auth,
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
      ],
      inputs: [
        /*{
          icon: "face",
          name: "First Name...",
          nameAttr: "firstname",
          type: "text"
        },*/

        {
          icon: "email",
          name: "Email Address",
          nameAttr: "email",
          type: "email"
        },

        /*{
          icon: "lock_outline",
          name: "Password..",
          nameAttr: "password",
          type: "password"
        }*/
      ]
    };
  }
};
</script>
<style>
</style>
