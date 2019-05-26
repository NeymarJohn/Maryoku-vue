<template>
    <div class="adding-building-blocks-panel">
        <div class="md-layout" style="max-height: 50vh;">
            <div class="md-layout-item md-size-5" style="padding: 0; margin: 0;">
                <h4 class="md-title">
                    <md-button @click="closePanel" class="md-button md-theme-default md-simple md-just-icon"><md-icon>arrow_back</md-icon></md-button>
                </h4>
            </div>
            <div class="md-layout-item md-size-95" style="max-height: 50vh;">
                <h4 class="md-title" style="margin-bottom: 0; line-height: 51px;">
                    Proposals List
                </h4>
            </div>
        </div>

    </div>
</template>
<script>
    import auth from '@/auth';
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import CalendarEvent from '@/models/CalendarEvent';
    import Calendar from "@/models/Calendar";
    import EventComponent from "@/models/EventComponent";

    import swal from "sweetalert2";
    import {error} from 'util';
    import moment from 'moment';
    import VueElementLoading from 'vue-element-loading';
    import _ from "underscore";

    export default {
        components: {
            VueElementLoading,
        },
        props: {
            event: Object,
            selectedBlock : Object
        },
        data: () => ({
            auth: auth,
            isLoaded : false,

        }),

        created() {
        },
        mounted() {


        },
        methods: {
            closePanel(){
                this.$emit("closePanel");
            }
        },
        computed: {

        }
    };
</script>
