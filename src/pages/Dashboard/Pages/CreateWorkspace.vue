<template>
  <div class="md-layout" style="text-align: center">
   
    <div class="md-layout-item md-size-100 mx-auto md-alignment-center">
      <signup-card>

        <div
         slot="content-right"
         class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 mr-auto"
          style=""
        >

        <div class="mb-10" style=" display: flex;
         justify-content: center; margin-top: 140px">
           <img class="" src="/static/icons/welcome.svg" style="  width:77.5px;" >
        </div>
        <div>
           <h2 class="title text-center" style="text-align: center; width: 100%">
            Welcome to Maryoku!
                  
         </h2>
         <h2 class="title text-center" style="text-align: center; width: 100%">
              
            Let's create your workspace
         </h2>
        </div>

         <div>
           <div class=" subtitle text-center" style="text-align: center; width: 100%">
             In order to share the content, we have created a domain for you. Ability to
            <br>  rename the domain to your business or workspace name.
                  
           </div>
      
        </div>

      </div>
        <div
          slot="content-right"
         class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 mr-auto my-0"

          
        >
         
          <vue-element-loading :active="loading" spinner="ring" color="#FF547C" />
          <div>&nbsp;</div>

          <div style="display: flex;
           align-items: center; justify-content: center; ">
             <div class="align-center" style=" display: flex;
            justify-content: center; height: 30px">
            <span class="md-prefix mr-15">www.</span>
          <md-field
                  
            :class="[
              { 'md-valid': !errors.has('workspace') && touched.workspace },
              { 'md-error': errors.has('workspace') },
              { 'extra-margin': error },
            ]"
          >
           <div class="md-prefix mx-10" style=" display: flex;
            justify-content: center;">
           <img class="" src="/static/icons/edit.svg" style="  width:20px;" >
        </div>
            <md-input
              v-model="workspace"
              v-focus
              type="text"
              id="input_field"
              data-vv-name="workspace"
              required
              @keyup="checkWorkspace"
              
           />
            
            
            <div
              v-if="!workspaceValid"
              class="md-error"
              style="text-align: center; width: 100%; font-size: 0.9rem; padding-top: 18px"
            >
              {{ error }}
            </div>
          </md-field>
          <span class="md-suffix ml-15">maryoku.com</span>
       </div>
      </div>
      

          <div class="button-container mt-40">
            <md-button
              slot="footer"
              class="md-default md-red md-maryoku mt-4"
              :disabled="!workspaceValid"
              @click="createWorkSpace"
            >
            Create a domain
            </md-button>
          </div>
          <div class="mb-50 mt-70" style=" display: flex;
         justify-content: center;">
           <img class="" src="/static/icons/maryoku - logo dark@2x@2x.png" style="  width:16%" >
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
import CalendarEvent from "@/models/CalendarEvent";
import Calendar from "@/models/Calendar";
import eventService from "@/services/event.service";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import _ from "underscore";
import AuthService from "@/services/auth.service";

export default {
  components: {
    SignupCard,
    VueElementLoading,
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
        workspace: false,
      },
      modelValidations: {
        workspace: {
          required: true,
          min: 4,
          max: 12,
        },
      },
      tenantUser: {},
      defaultCalendar: null,
    };
  },
  computed: {
    ...mapState("PublicEventPlanner", ["publicEventData"]),
  },
  watch: {
    email() {
      this.touched.email = true;
    },
    password() {
      this.touched.password = true;
    },
  },
  created() {
    this.workspace = this.generateWorkspaceName(this.$store.state.auth.user.companyName);
  },
  methods: {
    createWorkSpace() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          let tenantIdExt = this.$authService.resolveStaging();
          tenantIdExt = tenantIdExt ? `.${tenantIdExt}` : "";
          new Tenant({ id: this.workspace })
            .save()
            .then((res) => {
              this.loading = true;
              if (res.status === true) {
                this.defaultCalendar = new Calendar({ id: res.defaultCalendar });
                AuthService.setTenant(this.workspace);
                let callback = this.$route.query.callback;
                const action = this.$route.query.action;
                let eventData = JSON.parse(localStorage.getItem("event"));
                if (action === this.$queryEventActions.planner) {
                  eventService
                    .saveEvent(eventData)
                    .then((event) => {
                      callback = btoa(`events/${event.id}/booking/concept`);
                      document.location.href = `${document.location.protocol}//${this.workspace}${tenantIdExt}.maryoku.com:${document.location.port}/#/signedin?token=${res.token}&userType=planner&redirectURL=${callback}`;
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                } else if (action === "register") {
                  document.location.href = `${document.location.protocol}//${this.workspace}${tenantIdExt}.maryoku.com:${document.location.port}/#/signedin?token=${res.token}&userType=planner&redirectURL=${callback}`;
                } else {
                  eventService
                    .saveEvent(eventData)
                    .then((event) => {
                      callback = btoa(`events/${event.id}/booking/concept`);
                      document.location.href = `${document.location.protocol}//${this.workspace}${tenantIdExt}.maryoku.com:${document.location.port}/#/signedin?token=${res.token}&userType=planner&redirectURL=${callback}`;
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                }
              } else {
                this.loading = false;
                this.workspaceValid = false;
                if (res.message) {
                  this.error = "This workspace already exists.  Please try to use different name.";
                } else {
                  this.error = "Something is woring. Please try again later";
                }
              }
            })
            .catch((e) => {
              this.loading = false;
            });
        } else {
          this.loading = false;
        }
      });
    },
    createEvent() {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.tenantId = this.workspace;
        let catObject = _.find(this.occasionsForCategory, (el) => el.value === this.eventData.occasion) || {
          category: "CompanyDays",
        };
        this.category = catObject.category;
        const editingEvent = JSON.parse(localStorage.getItem("event"));
        let newEvent = new CalendarEvent({
          calendar: this.defaultCalendar,
          title: editingEvent.title,
          occasion: editingEvent.occasion ? editingEvent.occasion.name : "",
          eventStartMillis: editingEvent.eventStartMillis,
          eventEndMillis: editingEvent.eventEndMillis,
          numberOfParticipants: editingEvent.numberOfParticipants,
          budgetPerPerson: 0,
          totalBudget: 0,
          status: "draft",
          currency: "USD",
          eventType: editingEvent.eventType,
          category: catObject.category, //! editingEvent.editable ? 'Holidays' : 'CompanyDays',
          editable: true,
          location: editingEvent.location,
        })
          .for(this.defaultCalendar)
          .save()
          .then((response) => {
            resolve(response.item);
          })
          .catch((error) => {
            console.error(error);
            this.working = false;
            reject(error);
            // this.$parent.isLoading = false
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
        this.workspaceValid = true;
        this.error = null;
        // if (this.t) {
        //   clearTimeout(this.t);
        //   this.t = null;
        // }
        // this.t = setTimeout(
        //   function () {
        //     new Tenant().find(this.workspace).then((res) => {
        //       if (res.status) {
        //         this.workspaceValid = false;
        //         this.error = "This workspace is already taken, try another name";
        //       } else {
        //         this.workspaceValid = true;
        //         this.error = null;
        //       }
        //       this.loading = false;
        //     });
        //   }.bind(this),
        //   1000,
        // );
      }
    },
    generateWorkspaceName(company) {
      if (!company) {
        return "";
      }
      return company.replace(/ /g, "-").toLowerCase();
    },
  },
};
</script>
<style lang="scss" scoped>
.workspace-container {
  width: 100%;
  .title {
    max-width: 100%;
  }
}
p.description {
  font-size: 16px;
}

h4.info-title {
  font-size: 18px;
  font-weight: 400;
}

// .extra-margin {
//   margin-bottom: 64px !important;
// }


.md-input {
  border: 2px solid #E0E0E0;
  margin-left: -45px;
  padding-left: 50px;
  width: 425px;
  height: 64px;
  
  

}

.md-field.md-focused .md-input, .md-field.md-focused .md-textarea, .md-field.md-has-value .md-input, .md-field.md-has-value .md-textarea {
    font-size: 16px;
    
}



.title {
  color: #050505;
 font-size: 37px;
 font-weight: bold;
 text-transform: uppercase;

}
.subtitle {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #050505;

  margin-bottom: 20px;
  margin-top: 30px;

}


</style>

