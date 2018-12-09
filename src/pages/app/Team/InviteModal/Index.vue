<template>
    <div class="md-layout">
        <modal v-if="inviteModalOpen" @close="noticeModalHide" container-class="modal-container">
            <template slot="header" class="header-position">
                <h3 class="title">Invite Your Team</h3>
                <md-button class="btn-position" @click="closeModal">X</md-button>
            </template>
            <template slot="body">
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-100">
                        <div class="md-layout-item md-size-95 md-small-size-100">
                            <md-field :class="[
          {'md-valid': !errors.has('firstName') && touched.firstName},
          {'md-error': errors.has('firstName')}]">
                                <label>First Name</label>
                                <md-input
                                        v-model="firstName"
                                        data-vv-name="firstName"
                                        type="text"
                                        name="firstName"
                                        required
                                        v-validate="modelValidations.firstName">
                                </md-input>
                                <slide-y-down-transition>
                                    <md-icon class="error" v-show="errors.has('firstName')">close</md-icon>
                                </slide-y-down-transition>
                                <slide-y-down-transition>
                                    <md-icon class="success" v-show="!errors.has('firstName') && touched.firstName">done</md-icon>
                                </slide-y-down-transition>
                            </md-field>
                            <md-field :class="[
          {'md-valid': !errors.has('lastName') && touched.lastName},
          {'md-error': errors.has('lastName')}]">
                                <label>Last Name</label>
                                <md-input
                                        v-model="lastName"
                                        data-vv-name="lastName"
                                        type="text"
                                        name="lastName"
                                        required
                                        v-validate="modelValidations.lastName">
                                </md-input>
                                <slide-y-down-transition>
                                    <md-icon class="error" v-show="errors.has('lastName')">close</md-icon>
                                </slide-y-down-transition>
                                <slide-y-down-transition>
                                    <md-icon class="success" v-show="!errors.has('lastName') && touched.lastName">done</md-icon>
                                </slide-y-down-transition>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-size-95 md-small-size-100">
                            <md-field :class="[
                          {'md-valid': !errors.has('emailAddress') && touched.emailAddress},
                          {'md-error': errors.has('emailAddress')}]">
                                <label>Email</label>
                                <md-input
                                        v-model="emailAddress"
                                        data-vv-name="emailAddress"
                                        type="text"
                                        name="emailAddress"
                                        required
                                        v-validate="modelValidations.emailAddress">
                                </md-input>
                                <slide-y-down-transition>
                                    <md-icon class="error" v-show="errors.has('emailAddress')">close</md-icon>
                                </slide-y-down-transition>
                                <slide-y-down-transition>
                                    <md-icon class="success" v-show="!errors.has('emailAddress') && touched.emailAddress">done</md-icon>
                                </slide-y-down-transition>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-95 md-small-size-100">
                            <md-field :class="[
          {'md-valid': !errors.has('role') && touched.role},
          {'md-error': errors.has('role')}]">
                                <label for="select">Role</label>
                                <md-select
                                        required
                                        v-model="role"
                                        name="select"
                                        data-vv-name="role"
                                        v-validate="modelValidations.role">
                                    <md-option value="guest">Guest</md-option>
                                    <md-option value="collaborator">Collaborator</md-option>
                                </md-select>
                                <slide-y-down-transition>
                                    <md-icon class="error" v-show="errors.has('role')">close</md-icon>
                                </slide-y-down-transition>
                                <slide-y-down-transition>
                                    <md-icon class="success" v-show="!errors.has('role') && touched.role">done</md-icon>
                                </slide-y-down-transition>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-95 md-small-size-100">
                            <md-field :class="[
          {'md-valid': !errors.has('permissions') && touched.permissions},
          {'md-error': errors.has('permissions')}]">
                                <label for="permissions">Permissions</label>
                                <md-select
                                        required
                                        v-model="permissions"
                                        data-vv-name="permissions"
                                        v-validate="modelValidations.permissions"
                                        name="permissions"
                                        id="permissions"
                                        multiple>
                                    <md-option value="View">View</md-option>
                                    <md-option value="Manage">Manage</md-option>
                                    <md-option value="Vote">Vote</md-option>
                                </md-select>
                                <slide-y-down-transition>
                                    <md-icon class="error" v-show="errors.has('permissions')">close</md-icon>
                                </slide-y-down-transition>
                                <slide-y-down-transition>
                                    <md-icon class="success" v-show="!errors.has('permissions') && touched.permissions">done</md-icon>
                                </slide-y-down-transition>
                            </md-field>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="footer">
                <md-button class="move-left md-rose" @click="closeModal">Close</md-button>
                <md-button class="md-rose" @click="wizardComplete">Send Invitation</md-button>
            </template>
        </modal>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import teamVuexModule from '../team.vuex'
    import {Modal, SimpleWizard, WizardTab} from "@/components";
    import swal from "sweetalert2";
    import Teams from "@/models/Teams";
    import TeamMember from "@/models/TeamMembers";
    import {SlideYDownTransition} from "vue2-transitions";


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
        },
        data() {
            return {
                inviteModalOpen: false,
              touched: {
                firstName: false,
                lastName: false,
                emailAddress: false,
                permissions: false,
                role: false,
              },
              modelValidations: {
                firstName: {
                  required: true,
                  min: 5
                },
                lastName: {
                  required: true,
                  min: 5
                },
                emailAddress: {
                  required: true,
                  email: true
                },
                role: {
                  required: true
                },
                permissions: {
                  required: true
                }
              }
            }
        },
        created() {
            this.$store.registerModule('teamVuex', teamVuexModule);
        },
        computed: {
            ...mapState('teamVuex', ['teamMemberData']),
          firstName: {
            get() {
              return this.teamMemberData.firstName
            },
            set(value) {
              this.setMemberProperty({key: 'firstName', actualValue: value})
            },

          },
          lastName: {
            get() {
              return this.teamMemberData.lastName
            },
            set(value) {
              this.setMemberProperty({key: 'lastName', actualValue: value})
            },

          },
          emailAddress: {
            get() {
              return this.teamMemberData.emailAddress
            },
            set(value) {
              this.setMemberProperty({key: 'emailAddress', actualValue: value});
              this.setMemberProperty({key: 'username', actualValue: value});
            }
          },
          role: {
            get() {
              return this.teamMemberData.role
            },
            set(value) {
              this.setMemberProperty({key: 'role', actualValue: value})
            }
          },
          permissions: {
            get() {
              return this.teamMemberData.permissions
            },
            set(value) {
              this.setMemberProperty({key: 'permissions', actualValue: value})
            }
          },
        },
        methods: {
          ...
            mapMutations('teamVuex', [
              'setMemberProperty','resetForm'
            ]),
            noticeModalHide: function () {
                this.inviteModalOpen = false;
            },
            closeModal(){
              this.inviteModalOpen = false;
            },
            toggleModal: function (show) {
                this.inviteModalOpen = show;
            },
            onStepValidated(validated, model) {
                this.wizardModel = {...this.wizardModel, ...model};
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
           wizardComplete() {

            this.$validator.validateAll().then(res => {
                if(res){
                  this.inviteModalOpen = false;
                  Teams.first().then((team) => {
                    team.members().attach(this.teamMemberData);
                    this.resetForm();
                    swal("Good job!", "You clicked the finish button!", "success");
                  });
                }else {
                  this.$emit("on-validated", res);
                  return res;
                }

              });


            }
        },
      watch: {
        firstName() {
          this.touched.firstName = true;
        }
        ,
        lastName() {
          this.touched.lastName = true;
        },
        email() {
          this.touched.emailAddress = true;
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
    .btn-position{
        position: absolute;
        right: 20px;
        font-weight: bold;
        top: 15px;
        font-size: 17px;
        background-color: transparent!important;
        box-shadow: none!important;
        color: gray!important;

        &:hover{
            background-color: transparent!important;
            box-shadow: none!important;
            color: gray!important;
        }
    }
    .swal2-container {
        z-index: 999999;
    }
    .header-position {
        position: relative;
    }
    .move-left{
        margin-right: 15px!important;
    }

</style>
