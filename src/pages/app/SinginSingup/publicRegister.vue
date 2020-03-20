<template>
    <div class="register-page">

        <div class="register-form">

            <h3>Register now!</h3>
            <md-field class="purple-field">
                <label>Name of the company</label>
                <md-input
                    type="text"
                    v-model="department"
                ></md-input>

            </md-field>
            <md-field class="purple-field" :class="[{'md-valid': !errors.has('email') && touched.email},{'md-error': errors.has('email')}]">
                <label>Email address</label>
                <md-input
                    type="email"
                    v-model="email"
                    data-vv-name="email" required v-validate="modelValidations.email"
                ></md-input>

            </md-field>
            <md-field class="purple-field" :class="[{'md-valid': !errors.has('password') && touched.password},{'md-error': errors.has('password')}]">
                <label>Password</label>
                <md-input
                    type="password"
                    v-model="password"
                    data-vv-name="password" required v-validate="modelValidations.password"
                ></md-input>
            </md-field>

            <div class="text-center">
                <a href="" class="forget-password">Forgot your password ?</a>
            </div>

            <md-button class="md-rose md-sm md-square custom-btn" @click="singup">Sign Up</md-button>
        </div>
    </div>
</template>

<script>

    import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
    import numeral from 'numeral';
    import EventComponent from '@/models/EventComponent'
    import CalendarEvent from '@/models/CalendarEvent';
    import Calendar from "@/models/Calendar";


    export default {
        components: {

        },
        data() {
            return {
                email : null,
                password : null,
                department : null,
                touched: {
                    email: false,
                    password: false,
                    department : false
                },
                modelValidations: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        min: 8
                    },
                    department: {
                        required: true,
                    }
                },
                serverURL: process.env.SERVER_URL,
            }
        },
        created(){
            //create new event
        },
        methods : {
            singup(){
                let that = this;
                this.$validator.validateAll().then(isValid => {
                    if (isValid){
                        that.signUpLoading = true;
                        that.$auth.clientSignupOrSignin(that, this.email.toString().toLowerCase(), that.password, that.department, (data) => {
                            that.$auth.login(that, {username: that.email.toString().toLowerCase(), password: that.password}, (success) => {

                                that.$router.push({ path: '/', query: {token: success.access_token} });
                                that.signUpLoading = false;
                            }, (failure) => {
                                that.signUpLoading = false;
                                if (failure.response.status === 401){
                                    that.error = 'Sorry, wrong password, try again.';
                                } else {
                                    that.error = 'Temporary failure, try again later';
                                    console.log(JSON.stringify(failure.response));
                                }
                            } );
                        })
                    } else {

                    }
                });
            },
            authenticate(provider) {
                this.loading = true;
                let tenantId = document.location.hostname.replace(".maryoku.com","").replace(".","_");
                const callback = btoa(`${document.location.protocol}//${document.location.hostname}:${document.location.port}/#/signedin?token=`);
                document.location.href = `${this.$data.serverURL}/oauth/authenticate/${provider}?tenantId=${tenantId}&callback=${callback}`;
            },

        },watch: {
            email() {
                this.touched.email = true;
            },
            password() {
                this.touched.password = true;
            },
            department() {
                this.touched.department = true;
            },
        },

    };
</script>
<style lang="scss">
    $baseColor : #5c2153;
    html,
    body {
        height: 100%;
        >div , .create-event {
            height: 100%;
        }
    }
    .register-page {
        height: 80%;
        display: flex;
        flex : 1;
        justify-content: center;
        align-items: center;
    }

    .register-form {
        width : 60%;
        margin : 0 auto;
        text-align: center;
        max-width: 400px;
    }

</style>
