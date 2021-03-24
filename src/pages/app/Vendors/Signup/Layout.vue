<template>
  <div class="vendor-signup-layout-wrapper">
    <section class="header-wrapper" v-if="step > 0">
      <a href="https://www.maryoku.com">
        <img src="/static/img/maryoku-logo-dark.png" />
      </a>
      <v-signup-steps :step="step"></v-signup-steps>
    </section>
    <router-view></router-view>
    <template v-if="step < 7">
      <section class="footer-wrapper" :class="{ approved: step > 0 }" v-if="step > 0">
        <div class="left d-flex align-center">
          <md-button class="md-vendor-signup md-simple md-red" @click="prev()">
            <md-icon class="color-red font-size-30">keyboard_arrow_left</md-icon>
            Back
          </md-button>
          <md-button
            v-if="step != 6"
            @click="scrollToTop()"
            class="md-button md-button md-simple md-just-icon md-theme-default scroll-top-button md-theme-default"
          >
            <span>
              <img :src="`${iconsUrl}Asset 602.svg`" />
            </span>
          </md-button>
        </div>
        <div class="right">
          <md-button class="save md-vendor-signup md-simple md-red md-outlined" @click="saveDraft()">
            <img :src="`${iconsUrl}Asset 610.svg`" class="label-icon mr-10" />
            Save for later
          </md-button>
          <md-button class="approve md-vendor-signup md-red" @click="next">{{ nextLabel }}</md-button>
        </div>
      </section>
      <section class="footer-wrapper" v-else>
        <md-button
          class="approve md-vendor-signup md-red"
          @click="approve()"
          :class="{ disabled: !validateBasicFields }"
          >Approve & Begin</md-button
        >
      </section>
    </template>
    <modal v-if="status" class="saved-it-modal" container-class="modal-container sm">
      <template slot="header">
        <div class="saved-it-modal__header">
          <h3>
            <img :src="`${proposalIconsUrl}Asset 588.svg`" />
            {{ status.title }}
          </h3>
        </div>
        <button class="close" @click="hideModal()">
          <img :src="`${proposalIconsUrl}Group 3671 (2).svg`" />
        </button>
      </template>
      <template slot="body">
        <div class="saved-it-modal__body">
          <p>{{ status.message }}</p>
        </div>
      </template>
      <template slot="footer">
        <div class="saved-it-modal__footer">
          <button class="cool" @click="hideModal()">Ok, Thanks</button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import VSignupSteps from "./VSignupSteps.vue";
import { Modal } from "@/components";
import Vendors from "@/models/Vendors";
import Swal from "sweetalert2";
import { mapMutations, mapGetters } from "vuex";
import VendorSignupState from "./state";
export default {
  components: {
    VSignupSteps,
    Modal,
  },
  data() {
    return {
      savedItModal: false,
      iconsUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewSubmitPorposal/",
      proposalIconsUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewSubmitPorposal/",
    };
  },
  methods: {
    ...mapMutations("vendorSignup", ["setVendor", "setEditing", "setStep"]),
    goTo(router) {
      this.$router.push(router);
    },
    approve() {
      if (this.$store.state.vendorSignup.isEditing) {
        this.setStep(1);
      } else {
        if (this.validateBasicFields) {
          this.$set(this.vendor, "vendorCategory", this.vendor.vendorCategories[0]);
          this.$set(this.vendor, "vendorAddressLine1", this.vendor.vendorAddresses[0]);
          this.$set(this.vendor, "isEditing", true);
          this.$store
            .dispatch("vendorSignup/saveVendor", this.vendor)
            .then((res) => {
              this.setEditing(true);
              this.setStep(1);
            })
            .catch((error) => {
              if (error.message.indexOf("companyName") >= 0) {
                Swal.fire({
                  title: `Sorry, Company Name is duplicated. Please choose another.`,
                  buttonsStyling: false,
                  confirmButtonClass: "md-button md-success",
                }).then(() => {});
              } else {
                Swal.fire({
                  title: `Sorry, The information is not valid. Check your information and try again.`,
                  buttonsStyling: false,
                  confirmButtonClass: "md-button md-success",
                }).then(() => {});
              }
            });
        } else {
        }
        this.scrollToTop();
      }
    },
    next() {
      if (this.step < 6) {
        this.setStep(this.step + 1);
      } else {
        if (this.vendor.password == this.vendor.confirmPassword) {
          this.savedItModal = true;
          this.setStep(this.step + 1);
        } else {
        }
      }
      this.scrollToTop();
    },
    prev() {
      if (this.step > 0) {
        this.setStep(this.step - 1);
      }

      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    saveDraft() {
      // this.savedItModal = true;
      // this.addVendor();
      const title = "Success to save for later!";
      new Vendors({ ...this.vendor, isEditing: true })
        .save()
        .then((res) => {
          Swal.fire({
            title,
            buttonsStyling: false,
            confirmButtonClass: "md-button md-success",
          }).then(() => {});
        })
        .catch((error) => {});
    },
    hideModal() {
      this.$store.dispatch("vendorSignup/resetStatus");
    },
    camelize(str) {
      let temp = str.replace(/\W+(.)/g, function (match, chr) {
        return chr.toUpperCase();
      });
      return temp.charAt(0).toLowerCase() + temp.slice(1);
    },
    async addVendor() {
      let title = null;

      if (this.step === 7) {
        title = "Thank you for your sign up!";
      } else {
        title = "Success to save for later!";
      }
      const tenantUser = {
        company: this.vendor.companyName,
        name: this.vendor.email,
        email: this.vendor.email,
        password: this.vendor.password,
        role: "vendor",
        tenant: "DEFAULT",
      };

      this.$store.dispatch("auth/register", tenantUser).then(
        (registeredUser) => {
          new Vendors({ ...this.vendor, tenantUser: { id: registeredUser.id }, isEditing: false })
            .save()
            .then((res) => {
              this.isCompletedWizard = true;
              Swal.fire({
                title,
                buttonsStyling: false,
                confirmButtonClass: "md-button md-success",
              }).then(() => {
                const proposalRequest = this.$route.query.proposalRequest;
                if (this.step === 7) {
                  this.setVendor({});
                  this.setEditing(false);
                  this.setStep(0);
                  this.isCompletedWizard = false;
                  if (proposalRequest) {
                    this.$router.push(`/vendors/${res.id}/proposal-request/${proposalRequest}`);
                  } else {
                    this.$store.dispatch("auth/login", tenantUser).then(
                      () => {
                        this.$router.push(`/vendor/profile/settings`);
                      },
                      (error) => {
                        this.$router.push(`/vendor/signin`);
                      },
                    );
                  }
                }
              });
            })
            .catch((error) => {});
        },
        (error) => {
          this.loading = false;
          this.error = "failed";
        },
      );
    },
  },
  beforeCreate() {
    if (this.$store.registerModule("vendorSignup", VendorSignupState) === false) {
      this.$store.unregisterModule("vendorSignup");
      this.$store.registerModule("vendorSignup", myModule);
    }
  },
  beforeDestroy() {
    this.$store.unregisterModule("vendorSignup");
  },
  computed: {
    ...mapGetters({
      vendor: "vendorSignup/getVendor",
      step: "vendorSignup/getStep",
      validateBasicFields: "vendorSignup/validateBasicFields",
    }),
    nextLabel() {
      if (this.step == 6) {
        return "Sign Up";
      } else if (this.step == 5) {
        return "Finish";
      } else if (this.step == 3) {
        return " Check out your new profile!";
      } else {
        return "Next";
      }
    },
    status() {
      return this.$store.getters["vendorSignup/getStatus"];
    },
  },
  watch: {
    step(newVal) {
      if (this.step === 7) this.addVendor();
    },
  },
};
</script>
<style lang="scss" scoped>
.vendor-signup-layout-wrapper {
  section.header-wrapper {
    width: 100%;
    border-radius: 3px;
    background-color: #ffffff;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    display: flex;
    z-index: 9999;

    a {
      margin: 68px 350px 68px 123px;
      flex: 0 0 113px;
      display: inline-block;
      img {
        width: 100%;
      }
    }
  }
  section.footer-wrapper {
    z-index: 9999;
    width: 100%;
    padding: 33px 168px;
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    text-align: right;

    a {
      display: inline-block;
      padding: 17px 55px;
      cursor: pointer;
      border-radius: 3px;
      font: 800 20px Manrope-Regular, sans-serif;
      display: inline-block;
      min-width: 268px;
      text-align: center;

      &.approve {
        border: 1px solid #f51355;
        color: #ffffff;
        background-color: #f51355;

        &.disabled {
          box-shadow: none;
          background-color: #818080;
          border: none;
          opacity: 0.5;
          pointer-events: none;
        }
        &:hover {
          color: #dddddd !important;
        }
      }
    }
    &.approved {
      display: flex;
      justify-content: space-between;

      .left {
        a {
          &.back {
            color: #050505;
            font: 800 16px Manrope-Regular, sans-serif;
            img {
              width: 24px;
              transform: rotate(180deg);
            }
          }
        }
        span {
          cursor: pointer;
          width: 24px;
          box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
          border-radius: 50%;
          img {
            width: 12px;
            transform: rotate(270deg);
          }
        }
      }
      .right {
        a {
          &.save {
            color: #f51355;
            border: 1px solid #f51355;
            margin-right: 40px;
            font: bold 20px Manrope-Regular, sans-serif;
            border-radius: 3px;
            img {
              width: 24px;
              margin-right: 12px;
            }
          }
        }
      }
    }
  }
  .saved-it-modal {
    &__header {
      width: 100%;
      padding: 55px 31px 24px 31px;
      text-align: center;
      h3 {
        font-size: 30px;
        font-weight: bold;
        color: #f51355;

        img {
          width: 55px;
          height: 55px;
          margin-right: 15px;
        }
      }
      .header-description {
        max-width: 550px;
        margin: 0 auto;
        text-align: left;
        font-size: 20px;
        color: #050505;

        &.text-center {
          text-align: center;
        }
      }
      & + .close {
        background: transparent;
        border: none;
        position: absolute;
        top: 61px;
        right: 60px;
        color: #050505;
        cursor: pointer;
        img {
          width: 20px;
        }
      }
    }
    &__body {
      p {
        font: 800 20px Manrope-Regular, sans-serif;
      }
    }
    &__footer {
      padding: 10px 40px 40px 40px;
    }
  }
  .cool {
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    background-color: #f51355;
    border-radius: 3px;
    padding: 8px 36px;
    cursor: pointer;
    border: none;
  }
}
</style>
