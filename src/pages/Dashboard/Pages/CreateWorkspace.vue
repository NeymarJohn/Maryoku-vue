<template>
  <div class="md-layout" style="text-align: center;">
    <h2
      class="title text-center"
      style="text-align: center;width: 100%;"
    >Welcome, lets create your workspace</h2>
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
        <div
          class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 mr-auto"
          slot="content-right"
          style="padding: 24px;"
        >
          <vue-element-loading :active="loading" spinner="ring" color="#FF547C" />
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
          <md-field
            :class="[
          {'md-valid': !errors.has('workspace') && touched.workspace},
          {'md-error': errors.has('workspace')},
          {'extra-margin' : error}]"
          >
            <label>Workspace Name</label>
            <span class="md-prefix">https://</span>
            <md-input
              v-focus
              v-model="workspace"
              type="text"
              data-vv-name="workspace"
              required
              @keyup="checkWorkspace"
            ></md-input>
            <span class="md-suffix">.maryoku.com</span>
            <div
              class="md-error"
              v-if="!workspaceValid"
              style="text-align: center; width: 100%;font-size: 0.9rem; padding-top: 18px;"
            >{{error}}</div>
          </md-field>

          <div class="button-container">
            <md-button
              @click="createWorkSpace"
              class="md-default md-red md-maryoku mt-4"
              slot="footer"
              :disabled="!workspaceValid"
            >Continue</md-button>
          </div>
        </div>
      </signup-card>
    </div>
  </div>
</template>
<script>
import { SignupCard } from "@/components";
// import auth from '@/auth';
import VueElementLoading from "vue-element-loading";
import Tenant from "@/models/Tenant";
import CalendarEvent from '@/models/CalendarEvent'
import Calendar from '@/models/Calendar'
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import _ from 'underscore'

export default {
  components: {
    SignupCard,
    VueElementLoading
  },
  methods: {
    authenticate(provider) {
      this.loading = true;
      let tenantId = document.location.hostname.replace(".maryoku.com", "");
      const callback = btoa(
        `${document.location.protocol}//${document.location.hostname}:${document.location.port}/#/signedin?token=`
      );
      document.location.href = `${this.$data.serverURL}/oauth/authenticate/${provider}?tenantId=${tenantId}&callback=${callback}`;
    },
    createWorkSpace() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          let tenantIdExt =
            document.location.hostname === "dev.maryoku.com" ? ".dev" : "";
            //calendar: { id: "5efcfbe646a1c413babb41ab" },
          new Tenant({ id: this.workspace}).save().then(res => {
            if (res.status) {
              this.loading = true;
              this.createEvent().then(event=>{
                document.location.href = `${document.location.protocol}//${this.workspace}${tenantIdExt}.maryoku.com:${document.location.port}/#/signedin?token=${res.token}&firstEvent=${event.id}`;
              })
            } else {
              this.error = "Failed";
            }
          });
        } else {
          this.loading = false;
        }
      });
    },
    createEvent() {
      let vm = this;

      return new Promise((resolve, reject) => {
        this.tenantId = this.workspace
        this.$auth.currentUser(this, true, () => {
          // Code  here
          let calendarId = this.$auth.user.defaultCalendarId;
          let _calendar = new Calendar({
            id: calendarId
          });

          let catObject = _.find(
            this.occasionsForCategory,
            el => el.value === this.eventData.occasion
          ) || {
            category: "CompanyDays"
          };
          this.category = catObject.category;

          let newEvent = new CalendarEvent({
            calendar: {
              id: calendarId
            },
            // title: "test",
            // occasion: "123",
            // eventStartMillis: 1595397600000,
            // eventEndMillis: 1595401200000,
            // numberOfParticipants: "123",
            // budgetPerPerson: "1001.00",
            // totalBudget: "123123",
            // status: "draft",
            // currency: "USD",
            // eventType: "5e9dc16846a1c47a3b6b66c8",
            // category: "CompanyDays",
            // editable: true,
            // location: "123123"
            title: this.publicEventData.title,
            occasion: this.publicEventData.occasion.name,
            eventStartMillis: this.publicEventData.eventStartMillis,
            eventEndMillis: this.publicEventData.eventEndMillis,
            numberOfParticipants: this.publicEventData.numberOfParticipants,
            budgetPerPerson: 0,
            totalBudget: 0,
            status: "draft",
            currency: "USD",
            eventType: this.publicEventData.eventType.id,
            category: catObject.category, //! this.publicEventData.editable ? 'Holidays' : 'CompanyDays',
            editable: true,
            location: this.publicEventData.location
          })
            .for(_calendar)
            .save()
            .then(response => {
              resolve(response.item)
            })
            .catch(error => {
              console.log(error);
              this.working = false;
              reject(error)
              // this.$parent.isLoading = false
            });
        });
      });
    },
    checkWorkspace() {
      this.workspace = this.workspace.toLowerCase();
      if (
        this.workspace.length < 4 ||
        this.workspace.length > 18 ||
        this.workspace.replace(/[A-Za-z0-9_-]/g, "").length > 0 ||
        this.workspace.startsWith("-") ||
        this.workspace.startsWith("_") ||
        this.workspace.endsWith("-") ||
        this.workspace.endsWith("_")
      ) {
        this.workspaceValid = false;
        this.error =
          "Should have 4-18 characters, start and end with a letter or digit and can include digits, letters, - (dash) and _ (underscore)";
      } else {
        if (this.t) {
          clearTimeout(this.t);
          this.t = null;
        }
        this.t = setTimeout(
          function() {
            new Tenant().find(this.workspace).then(res => {
              if (res.status) {
                this.workspaceValid = false;
                this.error =
                  "This workspace is already taken, try another name";
              } else {
                this.workspaceValid = true;
                this.error = null;
              }
              this.loading = false;
            });
          }.bind(this),
          1000
        );
      }
    },
    generateWorkspaceName(company) {
      if (!company) {
        return "";
      }
      return company.replace(/ /g, "-").toLowerCase();
    }
  },
  created() {
    this.$auth.currentTenantUser(this, true, userData => {
      console.log(userData);
      this.tenantUser = userData;
      this.workspace = this.generateWorkspaceName(userData.company);
    });
    // this.$auth.currentUser(this, true)
    // const givenToken = this.$route.query.token;
    // this.$auth.setToken(givenToken);
    // this.$auth.currentUser(this, true);
    // console.log("auth",this.$auth)
    /* let tenantId = document.location.hostname.replace(".maryoku.com","");
    new Tenant().find(tenantId).then(res =>{
      if (!res.status){
        this.$router.push({name:"CreateWorkspace"});
      }
    }); */
  },
  watch: {
    email() {
      this.touched.email = true;
    },
    password() {
      this.touched.password = true;
    }
  },
  data() {
    return {
      error: "",
      workspace: "",
      loading: false,
      t: null,
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
      tenantUser: {}
    };
  },
  computed: {
    ...mapState("PublicEventPlanner", ["publicEventData"])
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
.title {
  font-family: "Manrope-ExtraBold";
  color: #050505;
}
</style>
