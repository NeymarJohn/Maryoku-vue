<template>
  <div class="md-layout">
    <vue-element-loading :active="loading" spinner="ring" color="#FF547C" is-full-screen />
    <div class="md-layout-item">
      <h2 slot="title" class="title text-center" style="text-align: center;">
        Hey, tell us about you
      </h2>
      <signup-card
        style="padding-top: 32px; padding-bottom: 2px; padding-left: 0; min-width: 680px;"
      >
        <div slot="content-left" class="md-layout-item md-size-5" />
        <div slot="content-middle" class="md-layout-item md-size-80">
          <!-- Company Name -->
          <div class="md-layout">
            <label class="md-layout-item md-size-35 md-form-label">Company Name</label>
            <div class="md-layout-item">
              <md-field
                :class="[{'md-valid': !errors.has('companyName') && touched.companyName},{'md-error': errors.has('companyName')}]"
              >
                <md-input
                  v-model="companyName"
                  v-validate="modelValidations.companyName"
                  type="text"
                  autofocus
                  required
                  data-vv-name="companyName"
                />
              </md-field>
            </div>
          </div>

          <!-- Full Name -->
          <div class="md-layout">
            <label class="md-layout-item md-size-35 md-form-label">Full Name</label>
            <div class="md-layout-item">
              <md-field
                :class="[{'md-valid': !errors.has('fullName') && touched.fullName},{'md-error': errors.has('fullName')}]"
              >
                <md-input
                  v-model="fullName"
                  v-validate="modelValidations.fullName"
                  type="text"
                  autofocus
                  required
                  data-vv-name="fullName"
                />
              </md-field>
            </div>
          </div>

          <!-- Email Address -->
          <div class="md-layout">
            <label class="md-layout-item md-size-35 md-form-label">Number of Guests</label>
            <div class="md-layout-item">
              <md-field
                :class="[{'md-valid': !errors.has('numberOfEmployees') && touched.email},{'md-error': errors.has('numberOfEmployees')}]"
              >
                <md-input
                  v-model="numberOfEmployees"
                  v-validate="modelValidations.numberOfEmployees"
                  type="text"
                  required
                  data-vv-name="numberOfEmployees"
                />
              </md-field>
            </div>
          </div>
        </div>
        <div slot="content-right" class="md-layout-item md-size-5" />

        <div
          slot="footer"
          class="md-layout-item md-size-100"
          style="text-align: right; padding-top: 48px;"
        >
          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <md-button class="md-simple pull-left" @click="skip">
                Skip
              </md-button>
              <md-button class="md-success pull-right" @click="next">
                Next
              </md-button>
            </div>
          </div>
        </div>
      </signup-card>
    </div>
  </div>
</template>
<script>
// MAIN MODULES
import { mapGetters } from "vuex";
import { isWrong } from "@/utils/helperFunction";
import VueElementLoading from "vue-element-loading";
import CustomerFile from "@/models/CustomerFile";
import Customer from "@/models/Customer";
import Me from "@/models/Me";
import { SignupCard } from "@/components";

export default {
  name: "Employee",
  components: {
    SignupCard,
    VueElementLoading
  },
  data () {
    return {
      // auth: auth,
      loading: false,
      companyName: "",
      fullName: "",
      email: "",
      workspace_domain: "",
      upload_logo: null,
      main_office_adddress: {
        label: "",
        data: {}
      },
      numberOfEmployees: 1,
      industry: "",
      website: "",
      isError: false,
      logo_name: "",
      images: [],
      isImageShow: false,
      touched: {
        email: false,
        fullName: false,
        companyName: false
      },
      modelValidations: {
        companyName: {
          required: true,
          min: 3
        },
        fullName: {
          required: true,
          min: 3
        },
        email: {
          required: false,
          email: true
        },
        numberOfEmployees: {
          required: true
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      industryList: "user/getIndustryList"
    })
  },
  watch: {
    email () {
      this.touched.email = true;
    },
    fullName () {
      this.touched.fullName = true;
    },
    companyName () {
      this.touched.companyName = true;
    }
  },
  attributes () {
    return {
      ...this.$attrs,
      type: this.type,
      id: this.id,
      name: this.name,
      disabled: this.disabled,
      required: this.required,
      placeholder: this.placeholder,
      readonly: this.readonly,
      maxlength: this.maxlength
    };
  },
  
  mounted: function () {
    this.$auth.currentUser(this, true, () => {
      /* this.$store.dispatch("user/getIndustry"); */

      let user = this.$auth.user;
      this.fullName = user.displayName;
      this.email = user.email;

      let customer = this.$auth.user.customer;
      this.companyName = customer.name;
    });
  },


  methods: {
    next () {
      this.loading = true;
      const that = this;

      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          new Customer({
            id: that.$auth.user.me.customer.id,
            onboarded: true,
            name: this.companyName,
            numberOfEmployees: this.numberOfEmployees
          })
            .save()
            .then(res => {
              that.$auth.user.customer = res.item;
              that.$ls.set("user", that.$auth.user, 1000 * 60 * 10);
              new Me({
                id: that.$auth.user.id,
                onboarded: true,
                emailAddress: that.email,
                displayName: that.fullName
              })
                .save()
                .then(response => {
                  Me.get().then(me => {
                    that.$auth.user.me = me;
                    that.moveon();
                  });
                });
            });
        }
      });
    },
    skip () {
      this.loading = true;
      new Customer({ id: this.$auth.user.me.customer.id, onboarded: true })
        .save()
        .then(res => {
          new Me({ id: this.$auth.user.id, onboarded: true })
            .save()
            .then(response => {});
        });
      this.moveon();
    },
    moveon () {
      // this.$router.push({name: 'MeForm'});
      this.$router.push({ name: "GetStarted" });
    },
    openPicker () {
      this.$refs.inputFile.click();
    },
    submitForm: function () {
      this.validFunc(this);
      if (this.isError === false) {
        const info = isWrong(this, [
          "company_name",
          "main_office_adddress",
          "number_of_employees",
          "industry",
          "website"
        ]);
        this.$store.dispatch("user/sendCompanyInfo", info);
        this.$router.push("/invite");
      }
    },
    onChange: function (selectedIndustry) {
      this.industry = selectedIndustry;
    },
    validFunc: function (ctx, required) {
      const errorsObj = [];
      if (ctx["company_name"] === "") {
        errorsObj.push("company_name");
      }
      if (ctx["main_office_adddress"] === "") {
        errorsObj.push("main_office_adddress");
      }
      if (errorsObj.length !== 0) {
        ctx.isError = true;
      } else {
        ctx.isError = false;
      }
    },
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files;

      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage (file) {
      let reader = new FileReader();
      let _this = this;
      reader.onload = e => {
        if (true) {
          this.isImageShow = true;
          this.logo_name = file.name;
          const newImage = {
            src: e.target.result,
            thumb: e.target.result
          };
          this.images.push(newImage);
          this.logo_name = file.name;
          return new CustomerFile({ customerFile: e.target.result })
            .save()
            .then(result => {
              _this.uploadedImages.push({
                src: e.target.result,
                thumb: e.target.result,
                id: result.id
              });
              this.isImageShow = true;
              this.logo_name = file.name;
              const newImage = {
                src: e.target.result,
                thumb: e.target.result
              };
              this.images.push(newImage);
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          _this.uploadedImages.push({
            src: e.target.result,
            thumb: e.target.result
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>
<style lang="scss" scoped>
input[type="file"] {
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
  clip: rect(0 0 0 0);
  border: 0;
}
</style>
