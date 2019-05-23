<template>
  <div class="md-layout" style="max-height: 100vh;">
    <div class="md-layout-item md-size-5" style="padding: 0; margin: 0;">
      <h4 class="md-title">
        <md-button @click="closePanel" class="md-button md-theme-default md-simple md-just-icon">
          <md-icon>arrow_back</md-icon>
        </md-button>
      </h4>
    </div>
    <div class="md-layout-item md-size-95" style="max-height: 90vh; ">
      <h4 class="md-title" style="margin-bottom: 0; line-height: 51px;">
        {{modalTitle}}
      </h4>
      <div class="md-layout" style="overflow: auto; max-height: 90vh; margin-top: 24px;">
        <div class="md-layout-item mx-auto">
          <div>
            <span v-if="!this.editMode" class="md-subheading" style="margin-bottom: 24px;">
              Type in comma separated list of emails, then choose a role and permission to invite members of your team
            </span>
          </div>
          <div class="md-small-size-100">
                <div class="md-layout-item md-size-95 md-small-size-100">
                  <div class="grid-col">
                    <md-field
                      style="margin-right: 10px; width: 97%;"
                      :class="[
                    {'md-valid': !errors.has('firstName') && touched.firstName},
                    {'md-error': errors.has('firstName')}]"
                    >
                      <label>First Name</label>
                      <md-input
                        ref="focusable"
                        v-model="firstName"
                        data-vv-name="firstName"
                        type="text"
                        autofocus
                        name="firstName"
                        required
                        v-validate="modelValidations.firstName"
                      ></md-input>
                      <slide-y-down-transition>
                        <md-icon class="error" v-show="errors.has('firstName')">close</md-icon>
                      </slide-y-down-transition>
                      <slide-y-down-transition>
                        <md-icon
                          class="success"
                          v-show="!errors.has('firstName') && touched.firstName"
                        >done</md-icon>
                      </slide-y-down-transition>
                    </md-field>
                    <md-field
                      :class="[
                    {'md-valid': !errors.has('lastName') && touched.lastName},
                    {'md-error': errors.has('lastName')}]"
                    >
                      <label>Last Name</label>
                      <md-input
                        v-model="lastName"
                        data-vv-name="lastName"
                        type="text"
                        name="lastName"
                        required
                        v-validate="modelValidations.lastName"
                      ></md-input>
                      <slide-y-down-transition>
                        <md-icon class="error" v-show="errors.has('lastName')">close</md-icon>
                      </slide-y-down-transition>
                      <slide-y-down-transition>
                        <md-icon
                          class="success"
                          v-show="!errors.has('lastName') && touched.lastName"
                        >done</md-icon>
                      </slide-y-down-transition>
                    </md-field>
                  </div>
                </div>
                <div class="md-layout-item md-size-95 md-small-size-100 mb25">
                  <md-field
                    class="height-auto"
                    :class="[
                            {'md-valid': !errors.has('email') && touched.email},
                            {'md-error': errors.has('email')}]"
                  >
                    <label>Email</label>
                    <md-textarea
                      v-if="!this.editMode"
                      v-model="emailAddress"
                      data-vv-name="email"
                      type="email"
                      name="email"
                      required
                      rows="3"
                      v-validate="modelValidations.email"
                    ></md-textarea>
                    <md-input
                      v-else
                      v-model="emailAddress"
                      data-vv-name="email"
                      type="email"
                      name="email"
                      required
                      v-validate="modelValidations.email"
                    ></md-input>
                    <slide-y-down-transition>
                      <md-icon class="error" v-show="errors.has('email')">close</md-icon>
                    </slide-y-down-transition>
                    <slide-y-down-transition>
                      <md-icon class="success" v-show="!errors.has('email') && touched.email">done</md-icon>
                    </slide-y-down-transition>

                    <span class="md-error" v-if="errors.has('email')">{{ errors.first('email') }}</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-95 md-small-size-100">
                  <md-field
                    :class="[
                            {'md-valid': !errors.has('role') && touched.role},
                            {'md-error': errors.has('role')}]"
                  >
                    <label for="select">Role</label>
                    <md-select
                      required
                      v-model="member_role"
                      name="select"
                      data-vv-name="role"
                      v-validate="modelValidations.role"
                    >
                      <md-option value="co_producer">Co-Producer</md-option>
                      <md-option value="manager">Manager</md-option>
                      <md-option value="team_leader">Team Leader</md-option>
                      <md-option value="employee">Employee</md-option>
                      <md-option value="Guest">Guest</md-option>
                    </md-select>
                    <slide-y-down-transition>
                      <md-icon class="error" v-show="errors.has('role')">close</md-icon>
                    </slide-y-down-transition>
                    <slide-y-down-transition>
                      <md-icon class="success" v-show="!errors.has('role') && touched.role">done</md-icon>
                    </slide-y-down-transition>
                    <span class="md-error" v-if="errors.has('role')">{{ errors.first('role') }}</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-95 md-small-size-100">
                  <md-field
                    :class="[
                            {'md-valid': !errors.has('permissions') && touched.permissions},
                            {'md-error': errors.has('permissions')}]"
                  >
                    <label for="select">Permissions</label>
                    <md-select
                      required
                      v-model="permission"
                      data-vv-name="permissions"
                      v-validate="modelValidations.permissions"
                      id="permissions"
                      name="select"
                      multiple
                    >
                      <md-option value="sign_off">Sign-Off</md-option>
                      <md-option value="edit">Edit</md-option>
                      <md-option value="create">Create</md-option>
                      <md-option value="request_budget">Request Budget</md-option>
                      <md-option value="View">View</md-option>
                      <md-option value="Vote">Vote</md-option>
                    </md-select>
                    <slide-y-down-transition>
                      <md-icon class="error" v-show="errors.has('permissions')">close</md-icon>
                    </slide-y-down-transition>
                    <slide-y-down-transition>
                      <md-icon
                        class="success"
                        v-show="!errors.has('permissions') && touched.permissions"
                      >done</md-icon>
                    </slide-y-down-transition>
                    <span
                      class="md-error"
                      v-if="errors.has('permissions')"
                    >{{ errors.first('permissions') }}</span>
                  </md-field>
                </div>
              </div>
          <div>
                <md-button class="move-left md-rose md-simple" @click="closePanel">Close</md-button>
                <md-button
                  native-type="validated"
                  class="md-success"
                  @click="sendInvitatio"
                >{{ modalSubmitTitle }}</md-button>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "@/auth";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { Modal, SimpleWizard, WizardTab } from "@/components";
import swal from "sweetalert2";
import Teams from "@/models/Teams";
import TeamMember from "@/models/TeamMembers";
import { SlideYDownTransition } from "vue2-transitions";

export default {
  components: {
    Modal,
    SlideYDownTransition,
    SimpleWizard,
    WizardTab
  },
  props: {
    team: {
      type: Object,
      required: true
    },
    membersRefresh: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      auth: auth,
      greenSuccess: false,
      touched: {
        //                firstName: false,
        //                lastName: false,
        email: false,
        permissions: false,
        role: false
      },
      emailArray: [],
      modelValidations: {
        firstName: {
          required: true,
          min: 2
        },
        lastName: {
          required: true,
          min: 2
        },
        email: {
          required: true
        },
        role: {
          required: true
        },
        permissions: {
          required: true
        }
      }
    };
  },
  created() {},
  computed: {
    ...mapState("teamVuex", [
      "teamMemberData",
      "inviteModalOpen",
      "modalTitle",
      "modalSubmitTitle",
      "editMode"
    ]),
    firstName: {
      get() {
        console.log(this.teamMemberData)
        return this.teamMemberData.firstName;
      },
      set(value) {
        this.setMemberProperty({ key: "firstName", actualValue: value });
      }
    },
    lastName: {
      get() {
        return this.teamMemberData.lastName;
      },
      set(value) {
        this.setMemberProperty({ key: "lastName", actualValue: value });
      }
    },
    emailAddress: {
      get() {
        return this.teamMemberData.emailAddress;
      },
      set(value) {
        this.setMemberProperty({ key: "emailAddress", actualValue: value });
        this.setMemberProperty({ key: "username", actualValue: value });
      }
    },
    member_role: {
      get() {
        return this.teamMemberData.role;
      },
      set(value) {
        this.setMemberProperty({ key: "role", actualValue: value });
      }
    },
    permission: {
      get() {
        return this.teamMemberData.permissions;
      },
      set(value) {
        this.setMemberProperty({ key: "permissions", actualValue: value });
      }
    }
  },
  methods: {
    ...mapMutations("teamVuex", [
      "setMemberProperty",
      "resetForm",
      "setInviteModal"
    ]),
    _noticeModalHide: function() {
      this.closePanel();
    },
    get noticeModalHide() {
      return this._noticeModalHide;
    },
    set noticeModalHide(value) {
      this._noticeModalHide = value;
    },
    onStepValidated(validated, model) {
      this.wizardModel = { ...this.wizardModel, ...model };
    },
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res);
        return res;
      });
    },
    closePanel() {
      this.$emit("closePanel");
      this.setInviteModal(false);
      this.resetForm();
      // this.noticeModalHide();
    },
    validateEmails() {
      this.emailArray = [];
      let pattern = /(^[a-zA-Z0-9]([a-zA-Z0-9_\.\+]*)@([a-zA-Z0-9_\.]*)([.][a-z]{1,3})$)|(^[a-zA-Z0-9]([a-zA-Z0-9_\.]*)@([a-zA-Z0-9_\.]*)(\.[a-z]{1,3})(\.[a-z]{2,})*$)/i;
      let emailValidateMap = [];
      let emailList = this.emailAddress
        .replace(/(?:\r\n|\r|\n)/g, ",")
        .split(",")
        .map(function(item) {
          return item.trim();
        });

      emailList = emailList.filter(function(item, pos) {
        if (item != "") {
          return emailList.indexOf(item) == pos;
        }
      });

      emailList.forEach((item, index) => {
        emailValidateMap.push(pattern.test(item));
      });

      let errorMap = emailValidateMap.filter(function(item) {
        return item == false;
      });

      if (errorMap.length) {
        this.$validator.errors.add({
          field: "email",
          msg: "Email is not correct!"
        });
        return false;
      }

      this.emailArray = emailList;

      return true;
    },

    sendInvitatio() {
      this.$validator.validateAll().then(res => {
        if (this.validateEmails() && res) {
          if (this.editMode) {
            this.updateTeamMember();
          } else {
            console.log("Send invitation: closing modal.");
            this.setInviteModal(false);
            Teams.first().then(team => {
              console.log("Send invitation: first team: ");
              console.log(JSON.stringify(team));
              this.emailArray.forEach((item, index) => {
                console.log("Send invitation: email: " + JSON.stringify(item));
                let member = Object.assign({}, this.teamMemberData, {
                  emailAddress: item,
                  username: item
                });
                if (member) {
                  console.log("Send invitation: saving team member ");
                  team
                    .members()
                    .attach(member)
                    .then(() => {
                      console.log("Send invitation: member attached ");
                      member = {};
                      // this.$emit('membersRefresh');
                      this.membersRefresh();
                      this.closePanel()
                    });
                }
              });

              this.$notify({
                message: "Team member invited successfully!",
                horizontalAlign: "center",
                verticalAlign: "top",
                type: "success"
              });
            });
          }
        } else {
          this.$emit("on-validated", res);
          return res;
        }
      });
    },
    async updateTeamMember() {
      let team = new Teams({ id: this.auth.user.defaultGroupId });
      let member = await team.members().find(this.editMode);

      member.emailAddress = this.teamMemberData.emailAddress;
      member.role = this.teamMemberData.role;
      member.permissions = this.teamMemberData.permissions;
      member.firstName = this.teamMemberData.firstName;
      member.lastName = this.teamMemberData.lastName;
      this.setInviteModal(false);

      await member
        .for(team)
        .save()
        .then(result => {
          this.membersRefresh();
          this.$notify({
            message: "Team member Update successfully!",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success"
          });
          this.closePanel()
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch: {
    firstName() {
      this.touched.firstName = true;
    },
    lastName() {
      this.touched.lastName = true;
    },
    email() {
      this.touched.email = true;
    },
    role() {
      this.touched.role = true;
    },
    permissions() {
      this.touched.permissions = true;
    }
  }
};
</script>
<style lang="scss">
.mt-0 {
  margin-top: 0;
}
.md-field.md-has-textarea.height-auto:not(.md-autogrow) .md-textarea {
  height: auto;
  min-height: auto;
}
.md-field.md-has-textarea.height-auto:not(.md-autogrow):after,
.md-field.md-has-textarea.height-auto:not(.md-autogrow):before {
  height: 1px;
  top: auto;
  bottom: 10px;
}
.mb25 {
  margin-bottom: 25px;
}
.modal-header .color-success {
  color: #42b983;
}
.btn-position {
  position: absolute;
  right: 15px;
  font-weight: bold;
  top: 20px;
  font-size: 17px;
  background-color: transparent !important;
  box-shadow: none !important;
  color: gray !important;
  border-color: transparent;
  cursor: pointer;

  &:hover,
  &:visited,
  &:focus,
  &:active {
    background-color: transparent !important;
    box-shadow: none !important;
    color: gray !important;
  }
}
.swal2-container {
  z-index: 999999;
}
.header-position {
  position: relative;
}
.move-left {
  margin-right: 15px !important;
}
.success-box {
  position: absolute;
  top: 45px;
  width: 25%;
  height: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
