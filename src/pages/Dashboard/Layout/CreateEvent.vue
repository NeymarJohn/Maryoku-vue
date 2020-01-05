<template>
    <div class="create-event">

        <div class="top-header">

            <div class="header-content md-layout">
                <div class="logo md-layout-item md-size-50">
                    <a href="/"><img src="http://static.maryoku.com/storage/img/homepage/maryoku-logo-white@2x.png" width="118"></a>
                </div>
                <div class="header-actions md-layout-item md-size-50">
                    <ul class="actions-list unstyled">
                        <template v-if="$auth.user.authenticated === false">
                            <li class="action-item" >
                                <md-button @click="showSingupDialog"> Sign up</md-button>
                            </li>
                        </template>

                        <template v-else-if="$auth.user.authenticated === true">

                            <li class="user-info">
                                <span>Hello {{$auth.user.displayName}}</span>
                            </li>

                            <li class="action-item" >
                                <md-button @click="logout">Sing out</md-button>
                            </li>
                        </template>

                    </ul>
                </div>
            </div>

        </div>

        <FadeTransition :duration="200" mode="out-in">
            <!-- your content here -->
            <router-view></router-view>
        </FadeTransition>




        <md-dialog :md-active.sync="shoWSignupModal" class="singin-form">
            <md-dialog-title class="text-center">Sign up <button class="close-btn" @click="closeSingupModal"><md-icon>close</md-icon></button></md-dialog-title>

            <md-dialog-content>
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

                <div class="divider-or text-center" style="margin-top: 48px;">
                    Or
                </div>

                <md-button class="md-default md-sm md-square custom-btn google-singup" @click="authenticate('google')"> <md-icon><img src="/static/img/GoogleIcon.png" ></md-icon> Sign in with Google</md-button>


            </md-dialog-content>
        </md-dialog>


    </div>
</template>
<script>
    import { FadeTransition } from "vue2-transitions";
    import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
    import PublicEventPlannerVuexModule from "../../../pages/app/CreateEvent/PublicEventPlanner.vuex";

    export default {
        data(){
            return {
                showDialog: false,
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
        components: {
            FadeTransition
        },
        created () {
            this.$store.registerModule("PublicEventPlannerVuex", PublicEventPlannerVuexModule);

            console.log(this.$auth.user);
        },
        methods: {
            ...mapMutations('PublicEventPlannerVuex', ['setEventProperty','setSingupModal']),
            closeSingupModal(){
                this.setSingupModal({showModal : false})
            },
            showSingupDialog(){
                this.setSingupModal({showModal : true});

            },
            singup(){
                let that = this;
                this.$validator.validateAll().then(isValid => {
                    if (isValid){
                        that.$auth.clientSignupOrSignin(that, this.email.toString().toLowerCase(), that.password, that.department, (data) => {
                            that.$auth.login(that, {username: that.email.toString().toLowerCase(), password: that.password}, (success) => {

                                this.closeSingupModal();
                                that.$router.push({ path: that.currentStep, query: {token: success.access_token} });

                            }, (failure) => {

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
            logout() {
                this.$router.push({ path: '/signout'});

            }
        },computed : {
            ...mapState('PublicEventPlannerVuex', [
                'publicEventData',
                'shoWSignupModal',
                'currentStep'
            ])
        },
        watch: {
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
        beforeRouteUpdate(to, from, next) {
            next();
        }
    };
</script>
<style lang="scss">

    $baseColor : #5c2153;

    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700|Rubik:400,500,700&display=swap');

    .md-overlay {
        z-index: 99999;

    }
    .md-dialog.singin-form {

        border-radius: 20px;
        padding : 2em 40px;
        width: 428px;
        z-index: 9999999;
        height: auto;


        .md-dialog-container {
        }

        .md-dialog-title {
            color : $baseColor;
            position: relative;
            padding : 0;

            button {
                position: absolute;
                right :0;

            }
        }

        .md-dialog-content {
            padding : 0;
            overflow-x: hidden;
        }

        .custom-btn {
            width:100%;
        }

        .close-btn {
            background: none !important;
            border : none !important;
            padding : 0;

            .md-icon {
                color : $baseColor !important;
            }
        }

        .md-dialog-actions {
            padding : 8px 0;
            margin-top : 3em;
        }



    }

    .forget-password {
        text-align: center;
        margin : 0.7em auto;
        color : $baseColor !important;
        font-size: 14px;
        font-weight: 500;
        display: block;
    }
    .create-event {
        .top-header {
            background: #5c2153;
            height : 60px;
            //border-radius: 0 0 50% 50%;

            .header-content {
                max-width : 1200px;
                margin : 0 auto;
                padding-top : 2em;
            }

            .logo {
                color : #fff;
                font-size : 22px;
            }
            .header-actions {
                text-align: right;
                ul {
                    list-style: none;
                    padding : 0;
                    margin : 0;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    align-items: center;

                    li {
                        display: inline-block;

                        &.user-info span {
                            color : #fff;
                            display: inline-block;
                            padding: 0 1em;
                        }
                    }

                    .md-button {
                        border : 1px solid #fff;
                        color : #fff;
                        background: none !important;
                        border-radius: 100px;
                    }
                }
            }
        }
    }

    .md-field {
        font-family: 'Open Sans', sans-serif;
    }

    .md-field.purple-field {
        border-radius: 10px;
        padding: 0.5em 6px 0.4em;
        border : 1px solid #aaaaaa;
        min-height: 52px;

        label {
            top: 13px;
            color : #606060 !important;
            font-size: 15px;
            left: 43px;
        }

        .md-icon.md-theme-default.md-icon-font {
            color : #606060 !important;
            &:after {
                background: none !important;
            }
        }

        &.md-autocomplete {
            >.md-icon {
                position:absolute;
            }

            .md-menu {
                padding-left: 2.2em;
            }
        }
        .md-error:not(.md-input) {
            right: 13px;
            left: auto;
            top: 19px;
        }

        .md-input-action {
            background: none !important;
            box-shadow: none;
            top: 8px;
        }

        &:hover {
            border-color: $baseColor !important;
            cursor: pointer;

            .md-icon.md-theme-default.md-icon-font , label {
                color : $baseColor !important;
            }
        }

        &:not(.md-disabled):after {
            background: none !important;
        }
        &.md-theme-default:before {
            background: none !important;

        }
        .md-input {
            opacity: 0;
        }

        &.md-focused, &.md-has-value {
            background: #fff;
            padding : 0.4em 6px 0;
            border : 1px solid $baseColor;

            label {
                color : $baseColor !important;
                top: 13px;
            }
            .md-input {
                opacity: 1;
                padding: 0;
                margin-top: 6px;
                -webkit-text-fill-color: $baseColor !important;
            }
            .md-select-value {
                padding-left:0.7em;
            }

            .md-icon.md-theme-default.md-icon-font {
                color: $baseColor !important;
            }
        }

        &.with-icon.md-focused label, &.with-icon.md-has-value label {
            top: 4px;
            font-size: 12px;
            color: gray !important;
            left: 2.6rem;
        }

        &:not(.with-icon) {
            label{
                left: 2em;

            }
            .md-input {
                padding-left : 1em;
            }

            &.md-focused , &.md-has-value {
                label {
                    color : #818181 !important;
                    top: 5px;
                    font-size: 11px;
                }
            }
        }
    }

    .md-checkbox.md-theme-default {

        label {
            color : #606060;
        }

        .md-checkbox-container {
            border-radius: 7px;
            width: 26px;
            height: 26px;


            &:after {
                top: 4px;
                left: 9px;
            }
        }

        &:hover {
            .md-checkbox-container {
                background : none !important;
                border: 1px solid $baseColor;

                &:before {
                    width: 20px;
                    height: 20px;
                    background: rgba(93, 33, 84, 0.81);
                    border-radius: 5px;
                    left: 12px;
                    top: 12px;
                }

                &:after {
                    opacity: 1;
                    transform: rotate(45deg) scale3D(1,1,1);
                    transition: .4s cubic-bezier(.25,.8,.25,1);
                    top: 4px;
                    left: 9px;
                    border-color: #fff !important;

                }
            }
            label {
                color : $baseColor !important;
            }
        }
        &.md-checked {
            .md-checkbox-container {
                background : none !important;
                border: 1px solid $baseColor;

                &:before {
                    width: 20px;
                    height: 20px;
                    background: #5d2154;
                    border-radius: 5px;
                    left: 12px;
                    top: 12px;
                }

                &:after {
                    top: 4px;
                    left: 9px;
                }
            }
        }
    }

    .md-checkbox.md-checked .md-checkbox-container:after {
        border-color : #fff !important;
    }
    .md-checkbox.md-checked .md-checkbox-label {
        color : $baseColor;
    }

    .md-radio.md-checked .md-radio-container {
        border: 1px solid $baseColor !important;
        &:after {
            background-color : $baseColor !important;
        }
    }

    .md-radio.with-border {
        border: 1px solid #aaaaaa;
        padding: 1em 1em;
        border-radius: 10px;

        label {
            color : #606060;
            width: 100%;
            display: inline-block;
        }
        .md-radio-container {
            width:23px;
            height: 23px;
            min-width: auto;
            top:0;
        }

        &.md-checked {
            border: 1px solid $baseColor;

            .md-radio-label {
                color : $baseColor;
            }
        }
    }


    .section-header {
        background: #5c2153;
        padding : 0.5em 0 1em;
        border-radius: 0 0 50% 50%;
        text-align: center;
        margin-bottom : 3em;
        font-family: 'Rubik', sans-serif;

        .section-title {
            color : #fff;
            font-size: 30px;
            font-family: 'Rubik', sans-serif;
            margin-top: 0;
        }
    }

    .steps-wizard-items {
        display: flex;
        flex : 1;
        flex-direction: row;
        background: #903482;
        border-radius: 20px;
        list-style: none;
        width : 200px;
        margin : 0 auto 20px;
        padding: 0;

        li {
            height : 3px;
            background: #fff;
            width: 14.2%;

            &:last-child:not(:first-child) {
                border-radius: 0 20px  20px 0;
            }

            &:first-child {
                border-radius: 20px 0 0 20px;
            }
        }
    }

    .form-section {
        position: relative;
        .form-actions {
            position: absolute;
            left: 0;
            right : 0;
            bottom : 0;margin : 0 auto;
            text-align: center;
            display: flex;
            flex: 1;
            justify-content: center;


        }
    }

    .md-button.custom-btn {
        width: 256px;
        height: 56px;
        border-radius: 12px;
        min-width: 256px;

        .md-ripple {
            font-size: 15px;
            text-transform: initial;
            font-weight: bold;
        }

        &.md-rose {
            background-color: #FF0066 !important;
            box-shadow: 0px 12px 24px #FF006633;

            &:hover {
                margin-top:5px;
                background-color: #de0e43 !important;

            }
        }

        &.md-default {
            margin-right: 1em;
        }



        &.disabled, &.opacity-btn {
            opacity: 0.3;
        }
    }

    .maryoku-field {
        margin : 0.5em 0 0;
        border : 1px solid #aaa;
        border-radius: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: 'Open Sans', sans-serif;
        cursor: pointer;
        position: relative;

        .md-error:not(.md-input) {
            position: absolute;
            font-size: 12px;
            right: 33px;
            left: auto;
            top: 18px;
            color: red;
            width: auto;
            display: block;
        }

        .md-icon {
            position: absolute;
            left: 8px;
            z-index: 2;
        }

        >label {
            position: absolute;
            left: 30px;
            margin: 0;
            font-size: 15px;
            pointer-events: none;
            z-index: 2;

        }

        .v-select {
            width : 100%;
        }

        .vs--open + label, .has-value + label {
            top: 4px;
            font-size: 12px;
            color: gray !important;
            left: 1.4rem;
        }

        .vs--open {
            .vs__selected {
                color : #efefef;
            }
            .vs__open-indicator {
                display: none;
            }
        }

        .vs__selected {
            position: absolute;
            top: 21px;
            left: 23px;
            z-index: 2;
            color : $baseColor;
        }

        .vs__selected-options {
            position: relative;

            input {
                background: none;
                font-size: 15px;
                padding: 1.5em 6px 0.9em 23px;
                border-radius: 10px;
                width: 100%;
                height: 100%;
                border : none !important;

                &:focus {
                    outline: none;
                    box-shadow: none;
                    background: #fff
                }
            }
        }

        &.with-icon {

            >label {
                left: 43px;
            }

            .vs--open + label, .has-value + label {
                left: 2.6rem;
            }
            .vs__selected-options {

                input {
                    padding: 1.5em 6px 0.9em 42px;
                }
            }

            .vs__selected {

                left: 41px;
            }

        }

        .vs__actions {
            position: absolute;
            top: 15px;
            right: 13px;
            z-index: 2;

            .vs__clear {
                background: none !important;
                border : none !important;
                opacity: 0.3;
                margin-right : -9px;
            }
        }

        .vs__dropdown-menu {
            position: absolute;
            background: #fff !important;
            list-style: none;
            padding : 0;
            margin : 0;
            width:100%;
            z-index: 9999999999999999999999999999  !important;
            border : 1px solid #aaa;
            border-radius: 10px;
            color : #606060;
            font-size: 16px;
            li {
                padding : 0.8em 1em;
                &:not(:last-child) {
                    border-bottom : 1px solid #aaa;
                }
            }

        }

        &.has-value {
            background: #fff;
            border-color : $baseColor !important;

            .vs__open-indicator {
                display: none;
            }

            .md-icon {
                color : $baseColor;
            }
        }
        &:hover {
            border-color : $baseColor;
            >label  , .md-icon {
                color : $baseColor;
            }
        }
    }


    .md-menu-content:not(.md-select-menu), .md-select-menu {
        box-shadow: none;
        padding : 0;
        margin : 0;
        width: 350px !important;
        z-index: 9999999999999999999999 !important;
        max-width: none;

        .md-menu-content-container {

            margin : 0.5em 0 0;
            border : 1px solid #606060;
            border-radius: 10px;

            .md-list {
                padding : 0;

                .md-list-item {
                    margin: 0;
                    padding : 0.2em 0.5em;

                    &:not(:last-child) {
                        margin-bottom: 5px;
                        border-bottom : 1px solid #AAAAAA;
                    }

                    .md-list-item-button {
                        background-color: transparent;
                        //color: $gray-dark !important;
                        border-radius: 3px;

                        &:hover {
                            background: none !important;
                            color: $baseColor !important;
                            box-shadow: none;
                        }

                        .md-list-item-content {
                            min-height: 38px;
                            font-size : 14px;
                            color : #606060;

                            span {
                                top: auto;
                                left: auto;
                                right: 0;
                                padding-left: 15px;
                                padding-right: 0px;
                                font-weight: bold;
                                color : #606060;
                            }
                        }
                    }

                    &:hover {
                        background: none !important;
                        color: $baseColor !important;
                        box-shadow: none;
                    }

                }
            }
        }
    }

    .md-datepicker-dialog.md-theme-default {

        box-shadow: none;
        border: 1px solid #606060;
        border-radius: 14px;
        z-index: 999999999999999;
        height: auto;

        .md-datepicker-header {
            display: none;
        }
        .md-datepicker-body-footer {
            display: none;
        }

        .md-datepicker-days .md-datepicker-day-button {
            border-radius: 10px;
            width: 35px;
            min-width: 35px;
            height: 35px;
            line-height: 35px;
            &.md-datepicker-selected {
                background-color: $baseColor !important;
                box-shadow: none;
            }

        }
    }


    .back-section {

        position: absolute;
        top : 130px;
        height: calc(100% - 130px);
        width : 100px;
        display: flex;
        flex : 1;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        transition: .4s cubic-bezier(.55,0,.55,.2);
        cursor: pointer;

        &:after {
            content: ' ';
            position: absolute;
            left: -11px;
            height: 80%;
            width: 20px;
            border-radius: 50%;
            background-color: #aaa;
            z-index: 999999;
            opacity: 0.2;
        }


        .back-text {
            display: none;
            color : #606060;

        }

        &:hover {

            .back-text {
                display: inline-block;
            }

            &:after {
                left: -241px;
                width: 430px;
            }
        }
    }

    .md-select-menu .md-list-item.md-selected .md-list-item-button {
        box-shadow: none !important;

        .md-ripple {
            .md-list-item-text {
                color : $baseColor !important;
            }
        }
    }

    .form-group {
        position: relative;

        .md-checkbox {
            position: absolute;
            left: 104%;
            top: 0;
            width: 200px;
        }
    }

    .divider-or {
        position: relative;
        color : #aaa;
        font-size: 16px;
        font-weight: 500;

        &:before {
            content: ' ';
            position: absolute;
            left : 0;
            top : 50%;
            width : 42%;
            height: 1px;
            background: #aaa;
        }
        &:after {
            content: ' ';
            position: absolute;
            right : 0;
            top : 50%;
            width : 42%;
            height: 1px;
            background: #aaa;
        }
    }

    .google-singup {

        .md-ripple {
            background: #BABABA;
            font-weight: bold;
        }

        .md-button-content {
            width: 100%;
            justify-content: center;
        }

        .md-icon {
            position: absolute;
            left: 0;
            top: 0;

            img {
                width: 44px !important;
                max-width: inherit;
            }
        }
    }



    @media screen and (max-width : 500px) {

        .create-event {
            .top-header {
                .logo {
                    img {
                        width : 100px;

                    }
                }
                .header-actions ul .md-button {
                    margin-top : -2px;
                }
            }
        }

        .form-group {
            .md-checkbox {
                position: relative;
                top : auto;
                left : auto;
                width : 100%;
            }
        }


        .section-header {
            .section-title {
                font-size: 20px;
                margin-top: 25px;
                padding: 0 2em;
            }
        }

        .form-section .form-actions  {
            position: relative;
        }

        .back-section {
            margin: 0 auto;
            height: 30px;
            width: 30px;
            left: 0;
            right: 0;
            border-radius: 50%;
            background-color: #aaaaaa8c;
            top: 30px;

            .md-icon {
                color : #fff;
            }

            &:after {
                display: none;
            }
        }

        .form-section {
            width: 100% !important;
        }

        .form-actions{

            float: left;
            width: 100%;
            margin-top : 2em !important;

            &.two-btns {

                .md-button.custom-btn {
                    min-width: auto;
                    width: 50%;
                }
            }
        }
        .vibe-item {
            width: 48% !important;
            margin-right: 2%;
            margin-bottom: 1em;
             .md-radio.with-border {
                width: 100% !important;
            }
            >span {
                display: block;
                text-align: center;
                .md-icon {
                    float: none;
                    margin: 0;
                }
            }
            .md-radio.with-border label {
                font-size: 14px !important;
                width: 80% !important;
            }
        }

        .movie-item {
            width: 48% !important;
        }

        .section-header {
            margin-top : -1px;
        }

        .range-item .option {
            font-size: 12px !important;
        }

        .start-working-item {
            width: 100% !important;

            .md-checkbox {
                margin-right :0;
            }
        }

        .event-created {
            .page-banner {
                h3 {
                    font-size: 26px !important;
                }
            }
             .page-content {
                font-size: 16px !important;
                padding: 0 2em;
            }
        }
        .md-dialog.singin-form {
            bottom: auto;
            top: 10%;
            width: 90%;
        }

        .no-padding-mobile {
            padding : 0px;
        }


    }



</style>
