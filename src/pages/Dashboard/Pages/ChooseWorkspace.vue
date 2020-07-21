<template>
  <div class="md-layout" style="text-align: center;">
    <h2 class="title text-center" style="text-align: center;width: 100%; color:#050505">Hi, choose your workspace</h2>
    <div class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 md-size-50 mx-auto">
      <signup-card>
        <div class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 mr-auto " slot="content-right" style="padding: 24px;">
          <vue-element-loading :active="loading" spinner="ring" color="#FF547C"/>
          <div>&nbsp;</div>
          <md-list>
            <md-list-item v-for="tenant in tenantIds" :key="tenant">
              <md-list-item><a class="tenant_link" :href="tenantUrl(tenant)">{{tenant}}</a></md-list-item>
            </md-list-item>
          </md-list>
        </div>
      </signup-card>

    </div>
  </div>
</template>
<script>
import { SignupCard } from '@/components'
import VueElementLoading from 'vue-element-loading'
import Tenant from '@/models/Tenant'
import TenantUser from '@/models/TenantUser'

export default {
  components: {
    SignupCard,
    VueElementLoading
  },
  methods: {
    authenticate (provider) {
      this.loading = true
      let tenantId = document.location.hostname.replace('.maryoku.com', '')
      const callback = btoa(`${document.location.protocol}//${document.location.hostname}:${document.location.port}/#/signedin?token=`)
      document.location.href = `${this.$data.serverURL}/oauth/authenticate/${provider}?tenantId=${tenantId}&callback=${callback}`
    },
    signup () {
      this.loading = true

      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          let tenantId = document.location.hostname.replace('.maryoku.com', '')
          tenantId = tenantId.length > 0 && tenantId === 'dev' ? '_' + tenantId : ''

          new Tenant({id: this.workspace + tenantId}).save().then(res => {
            if (res.status) {
              this.loading = true
              document.location.href = `${document.location.protocol}//${this.workspace}${tenantId}.maryoku.com:${document.location.port}`
            } else {
              this.$router.push({name: 'SignIn'})
            }
          }).catch(() => {
            this.$router.push({name: 'SignIn'})
          })

          /* this.$auth.signupOrSignin(this, this.email, this.password, (data) => {
              this.$auth.login(this, {username: this.email, password: this.password}, (success) => {
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
            }) */
        } else {
          this.loading = false
        }
      })
    },
    checkWorkspace () {
      this.workspace = this.workspace.toLowerCase()
      if (this.workspace.length < 4 || this.workspace.length > 18 || this.workspace.replace(/[A-Za-z0-9_-]/g, '').length > 0 || this.workspace.startsWith('-') || this.workspace.startsWith('_') || this.workspace.endsWith('-') || this.workspace.endsWith('_')) {
        this.workspaceValid = false
        this.error = 'Should have 4-18 characters, start and end with a letter or digit and can include digits, letters, - (dash) and _ (underscore)'
      } else {
        if (this.t) {
          clearTimeout(this.t)
          this.t = null
        }

        this.t = setTimeout(function () {
          this.loading = true
          let tenantId = document.location.hostname.replace('.maryoku.com', '')
          tenantId = tenantId.length > 0 && tenantId === 'dev' ? '_' + tenantId : ''

          new Tenant().find(this.workspace + tenantId).then(res => {
            if (res.status) {
              this.workspaceValid = false
              this.error = 'This workspace is already taken, try another name'
            } else {
              this.workspaceValid = true
              this.error = null
            }
            this.loading = false
          })
        }.bind(this), 500)
      }
    },
    tenantUrl (tenant) {
      // return `${this.$authService.getAppUrl(tenant)}/#/signedin?token=${this.$auth.getToken()}`
      return `${this.$authService.getAppUrl(tenant)}/#/events`
    }
  },
  created () {
    // const givenToken = this.$route.query.token;
    // this.$auth.setToken(givenToken);
    // this.$auth.currentUser(this, true);
    /* let tenantId = document.location.hostname.replace(".maryoku.com","");
      new Tenant().find(tenantId).then(res =>{
        if (!res.status){
          this.$router.push({name:"CreateWorkspace"});
        }
      }); */
  },
  mounted () {
    this.tenantIds = this.$store.state.auth.user.tenants
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
      tenantIds: [],
      error: '',
      workspace: '',
      loading: false,
      t: null,
      terms: false,
      workspaceValid: true,
      serverURL: process.env.SERVER_URL,
      // auth: auth,
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
          colorIcon: 'icon-success',
          icon: 'color_lens',
          title: 'Get Inspired',
          description:
              "Why struggle to find good ideas for your company's next event, when you can simply browse through other companies' events, see what worked for them and adjust those ideas to your needs."
        },

        {
          colorIcon: 'icon-danger',
          icon: 'calendar_today',
          title: 'Plan Ahead',
          description:
              'Making the best of your annual budget is so much easier when you have visibility over all year occasions combined with insights on industry benchmark.'
        },

        {
          colorIcon: 'icon-info',
          icon: 'developer_board',
          title: 'Work Less',
          description:
              'Stop spending hours on phone calls, emails, quotes and invoices. Locate ranked suppliers and have them work for you.'
        }
      ]
    }
  }
}
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
  .tenant_link {
    font-family: "Manrope-ExtraBold";
    font-size: 20px;
  }
</style>
