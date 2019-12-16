<template>
    <div class="create-event">

        <div class="top-header">

            <div class="header-content md-layout">
                <div class="logo md-layout-item md-size-50">
                    maryoku
                </div>
                <div class="header-actions md-layout-item md-size-50">
                    <ul class="actions-list unstyled">
                        <li class="action-item">
                            <md-button> Sign up</md-button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <FadeTransition :duration="200" mode="out-in">
            <!-- your content here -->
            <router-view></router-view>
        </FadeTransition>
    </div>
</template>
<script>
    import { FadeTransition } from "vue2-transitions";
    export default {
        components: {
            FadeTransition
        }
    };
</script>
<style lang="scss">

    $baseColor : #5c2153;

    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700|Rubik:400,500,700&display=swap');

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
        .md-error {
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
            width: 20%;

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

            .md-button {
                width: 256px;
                height: 56px;
                border-radius: 12px;
                min-width: 256px;

                .md-ripple {
                    font-size: 15px;
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



                &.disabled {
                    opacity: 0.3;
                }

            }
        }
    }


    .md-menu-content:not(.md-select-menu), .md-select-menu {
        box-shadow: none;
        padding : 0;
        margin : 0;
        width:100% !important;

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



</style>
