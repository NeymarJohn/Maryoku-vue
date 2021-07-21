<template>
    <div class="md-layout justify-content-center align-center height-100vh">
        <vue-element-loading :active="loading" spinner="ring" color="#FF547C" isFullScreen/>
        <div class="md-layout-item md-size-30">
            <div class="d-flex flex-column">
                <img class="mx-auto" :src="`${$iconURL}Vendor%20Signup/Group%2019453.svg`"/>
                <div class="text-center font-size-30 font-bold color-black my-20">Reset Password</div>
            </div>
            <signup-card>
                <div v-if="!inValidToken" class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 signin-contain" slot="content-right">
                    <template v-if="succeded">
                        <div class="font-size-16 text-center font-bold">
                            Your password updated successfully.
                            <br/>
                            You can sign in with new password
                        </div>
                        <div>
                            <md-button class="md-simple normal-btn md-vendor" @click="toSignin">Go to Signin</md-button>
                        </div>
                    </template>
                    <template v-else>
                        <maryoku-input
                            class="form-input"
                            type="password"
                            v-validate="'required|min:8'"
                            name="password"
                            inputStyle="password"
                            v-model="password"
                            placeholder="New password"
                            refName="password"
                        ></maryoku-input>
                        <maryoku-input
                            class="form-input"
                            name="confirm_password"
                            type="password"
                            v-validate="'required|min:8|confirmed:password'"
                            inputStyle="password"
                            v-model="confirm_password"
                            placeholder="Confirm password"
                        ></maryoku-input>
                        <div class="md-error">{{error}}</div>
                        <span class="md-error color-red" v-if="errors.has('password')">{{ errors.first('password') }}</span>
                        <span class="md-error color-red" v-if="errors.has('confirm_password')">{{ errors.first('confirm_password') }}</span>
                        <div class="form-buttons">
                            <md-button @click="updatePassword" class="md-default md-vendor md-maryoku mt-4" slot="footer">Update Password</md-button>
                        </div>
                    </template>

                </div>
                <div v-if="inValidToken" class="text-center md-layout-item md-size-100 md-medium-size-100 md-small-size-100 signin-contain" slot="content-right">
                    <div class="font-size-16 font-bold text-center">
                        The current token is expired.
                    </div>
                    <br/>
                    <md-button @click="toSignin" class="md-vendor md-default normal-btn md-simple">Signin</md-button>
                </div>
            </signup-card>
            <div class="d-flex flex-column">
                <img class="mx-auto mt-100" :src="`${$iconURL}common/maryoku-logo-purple-1.png`">
            </div>
        </div>
    </div>
</template>

<script>
    import { SignupCard, MaryokuInput } from '@/components'
    import InputText from '@/components/Inputs/InputText.vue'
    import VueElementLoading from 'vue-element-loading'
    import Tenant from '@/models/Tenant'

    export default {
        components: {
            SignupCard,
            InputText,
            VueElementLoading,
            MaryokuInput
        },
        methods: {
            updatePassword () {
                console.log(this.$validator)
                const email = this.$route.query.email
                const token = this.$route.query.resetToken
                // this.$validator.validateAll().then(isValid => {
                //     console.log(this.$validator)
                //     if (isValid) {
                //         this.$http.post(`${process.env.SERVER_URL}/1/reset-password`, { username : email, token : token, password: this.password}, { 'ContentType': 'application/json' })
                //             .then((resp) => {
                //                 console.log(resp)
                //                 this.loading = false
                //                 if (resp.status) {
                //                     this.succeded = true
                //                 } else {
                //                     this.error = resp.message
                //                 }
                //             })
                //             .catch((error) => {
                //                 console.error(error)
                //                 this.loading = false
                //                 if (error.response.status === 401) {
                //                     this.error = 'Sorry, No such user name or password address.'
                //                 } else {
                //                     this.error = 'Temporary failure, try again later'
                //                 }
                //             })
                //     } else  {
                //         this.error = 'Invalid password. Minimum length is 8 letters.'
                //     }
                // })

            },
            toSingUp() {
                this.$router.push({ path: '/vendor/signup' })
            },
            toSignin() {
                this.$router.push({ path: '/vendor/signin' })
            }
        },
        watch: {
            password () {
                this.touched.password = true
            }
        },
        created () {
            const token = this.$route.query.resetToken
            this.$http.post(`${process.env.SERVER_URL}/1/check-password-token`, { token: token }, { 'ContentType': 'application/json' })
                .then((resp) => {
                    console.log(resp)
                    this.loading = false
                    if (resp.data.isValid) {
                        this.inValidToken = false
                    } else {
                        this.inValidToken = false;
                    }
                })
                .catch((error) => {
                    console.error(error)
                    this.loading = false
                    if (error.response.status === 401) {
                        this.error = 'Sorry, No such user name or email address.'
                    } else {
                        this.error = 'Temporary failure, try again later'
                    }
                });
        },
        data () {
            return {
                inValidToken: false,
                error: '',
                loading: false,
                firstname: null,
                terms: false,
                password: null,
                confirm_password: null,
                succeded: false,
                isForgot: false,
                serverURL: process.env.SERVER_URL,
                // auth: auth,
                touched: {
                    password: false,
                },
                modelValidations: {
                    password: {
                        required: true,
                        min: 8
                    },
                    confirm_password: {
                        required: true,
                        min: 8,
                        confirmed: 'password',
                    },
                },
                submitted:false
            }
        }
    }
</script>
<style lang="scss" scoped>
    p.description {
        font-size: 16px;
    }
    .md-error {
        color: red;
    }
    .form-input{
        margin:30px 0px;
        min-width: 300px;
    }
    .form-buttons {
        text-align: center;
    }
    .signin-contain {
        padding: 20px 60px;
    }
</style>
