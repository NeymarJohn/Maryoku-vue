<template>
    <div class="md-layout">
        <vue-element-loading :active="loading" spinner="ring" color="#FF547C" isFullScreen/>
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
                        <!--<md-button class="md-just-icon-social md-circle md-linkedin" @click="authenticate('linkedin')">
                          <i class="fab fa-linkedin" style="font-size: 42px !important;width: 80px;height: 42px;"></i>
                        </md-button>-->
                        <!--<md-button class="md-just-icon md-round md-facebook">
                          <i class="fab fa-facebook-f"></i>
                        </md-button>-->
                        <h4 class="mt-3">or sign up with your work email address</h4>
                    </div>
                    <md-field :class="[{'md-valid': !errors.has('email') && touched.email},{'md-error': errors.has('email')}]">
                        <label>Email Address</label>
                        <md-input v-model="email" type="email" data-vv-name="email" required v-validate="modelValidations.email" v-focus></md-input>
                    </md-field>
                    <md-field :class="[{'md-valid': !errors.has('password') && touched.password},{'md-error': errors.has('password')}]">
                        <label>Password</label>
                        <md-input v-model="password" type="password" data-vv-name="password" required v-validate="modelValidations.password"></md-input>
                        <div class='md-error' style="text-align: center; width: 100%;">{{error}}</div>
                    </md-field>

                    <div class="title">
                        By signing up you agree to our <br/> <a href="https://www.262days.com/terms" target="_blank" style="background-color: #f2f2f2;">Terms of Use</a> and <a href="https://www.262days.com/privacy" target="_blank" style="background-color: #f2f2f2;">Privacy Policy</a>
                    </div>
                    <div class="button-container">
                        <md-button @click="signup" class="md-success md-round mt-4" slot="footer">Continue</md-button>
                    </div>
                </div>
            </signup-card>
        </div>
    </div>
</template>
<script>
    import { SignupCard } from "@/components";
    // import auth from '@/auth';
    import VueElementLoading from 'vue-element-loading';
    import Tenant from '@/models/Tenant';

    export default {
        components: {
            SignupCard,
            VueElementLoading
        },
        methods: {
            authenticate(provider) {
                this.loading = true;
                let tenantId = document.location.hostname.replace(".262days.com","").replace(".","_");
                const callback = btoa(`${document.location.protocol}//${document.location.hostname}:${document.location.port}/#/signedin?token=`);
                document.location.href = `${this.$data.serverURL}/oauth/authenticate/${provider}?tenantId=${tenantId}&callback=${callback}`;
            },
            signup(){
                this.loading = true;
                let that = this;
                this.$validator.validateAll().then(isValid => {
                    if (isValid){
                        that.$auth.signupOrSignin(that, this.email.toString().toLowerCase(), that.password, 'administrator', (data) => {
                            that.$auth.login(that, {username: that.email.toString().toLowerCase(), password: that.password}, (success) => {
                                that.$router.push({ path: '/signedin', query: {token: success.access_token} });
                            }, (failure) => {
                                that.loading = false;
                                if (failure.response.status === 401){
                                    that.error = 'Sorry, wrong password, try again.';
                                } else {
                                    that.error = 'Temporary failure, try again later';
                                    console.log(JSON.stringify(failure.response));
                                }
                            } );
                        })
                    } else {
                        that.loading = false;
                    }
                });
            }
        },
        created() {
            const givenToken = this.$route.query.token;
            this.$auth.setToken(givenToken);
            this.$auth.currentUser(this, true);
            /*let tenantId = document.location.hostname.replace(".262days.com","");
            new Tenant().find(tenantId).then(res =>{
              if (!res.status){
                this.$router.push({name:"CreateWorkspace"});
              }
            });*/
        },
        watch: {
            email() {
                this.touched.email = true;
            },
            password() {
                this.touched.password = true;
            },
        },
        data() {
            return {
                error: '',
                loading: false,
                firstname: null,
                terms: false,
                email: null,
                password: null,
                serverURL: process.env.SERVER_URL,
                // auth: auth,
                touched: {
                    email: false,
                    password: false
                },
                modelValidations: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        min: 8
                    }
                },
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
                ]
            };
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
</style>
