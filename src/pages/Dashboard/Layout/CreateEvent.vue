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

    .md-field.purple-field {
        border-radius: 10px;
        padding : 0.4em 6px 0.35em;
        border : 1px solid #aaaaaa;


        label {
            top: 13px;
            color : #606060 !important;
        }

        .md-icon.md-theme-default.md-icon-font {
            color : #606060 !important;
            &:after {
                background: none !important;
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

            .md-icon.md-theme-default.md-icon-font {
                color: $baseColor;
            }
        }

        &.with-icon.md-focused label, &.with-icon.md-has-value label {
            top: 2px;
            font-size: 12px;
            color: gray !important;
            left: 2.6rem;
        }

        &:not(.width-icon) {
            label{
                left: 1em;

            }

            &.md-focused , &.md-has-value {
                label {
                    color : #818181 !important;
                    top: 8px;
                    font-size: 11px;
                }
            }
        }
    }



    .md-checkbox.md-theme-default.md-checked .md-checkbox-container {
        background-color : $baseColor;
        border: 1px solid $baseColor;
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
        padding: 0.8em 1em;
        border-radius: 10px;

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

        .section-title {
            color : #fff;
            font-size: 30px;
            font-weight: 500;
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

        .form-actions {
            margin-top : 3em;
            text-align: center;

            .md-button {
                width: 200px;
                border-radius: 10px;

                &.md-rose {
                    background-color: #eb3468;
                }
            }
        }
    }

</style>
