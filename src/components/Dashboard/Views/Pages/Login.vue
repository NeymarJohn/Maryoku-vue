<template>
  <div class="login-page">
    <app-navbar></app-navbar>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page section-image">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
              <div class="col-lg-4 col-md-6 ml-auto mr-auto">
                <card type="login">
                  <h3 slot="header" class="header text-center">Login</h3>

                  <fg-input v-model="form.username" addon-left-icon="nc-icon nc-single-02" placeholder="Email Address" v-focus></fg-input>

                  <fg-input v-model="form.password" addon-left-icon="nc-icon nc-key-25" placeholder="Password" type="password"></fg-input>

                  <br>

                  <p-checkbox>
                    Subscribe to newsletter
                  </p-checkbox>

                  <p-button @click="tryLogin" slot="footer" type="warning" round block class="mb-3">Get started</p-button>
                </card>
              </div>
          </div>
        </div>
        <app-footer></app-footer>
        <div class="full-page-background" style="background-image: url(static/img/background/shutterstock_495639391.jpg) "></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Card, Checkbox, Button} from 'src/components/UIComponents';
  import AppNavbar from './Layout/AppNavbar'
  import AppFooter from './Layout/AppFooter'
  import auth from 'src/auth'
  export default {
    components: {
      Card,
      AppNavbar,
      AppFooter,
      [Checkbox.name]: Checkbox,
      [Button.name]: Button
    },
    created(){

    },
    methods: {
      tryLogin(){
        return new Promise((res, rej) => {
          //this._validateLoginForm();

          const credentials = {
            username: this.form.username,
            password: this.form.password,
          };

          if (this.form.username && this.form.password) {
            this.auth.login(this, credentials, '/');
            this.errors = { username: '', password: '' };
            res();
          } else {
            rej();
          }
        });
      },
      toggleNavbar () {
        document.body.classList.toggle('nav-open')
      },
      closeMenu () {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      }
    },
    data() {
      return {
        error: '',
        serverURL: process.env.SERVER_URL,
        auth,
        form: {
          username: '',
          password: ''
        }
      }
    },
    beforeDestroy () {
      this.closeMenu()
    }
  }
</script>
<style>
</style>
