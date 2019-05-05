<template>
    <div class="event-modal event_publish-modal">
        <div class="md-layout">
            <modal v-if="publishEventModal">
                <template slot="header">
                    <div class="md-layout d-flex items-left">
                        <h4>Publish Event</h4>
                    </div>
                    <md-button class="md-simple md-just-icon md-round modal-default-button" @click="closeModal">
                        <md-icon>clear</md-icon>
                    </md-button>
                </template>
                <template slot="body">
                    <p class="text-left">
                        Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                    </p>

                    <md-field v-if="event">
                        <md-input  v-model="publishUrl" :value="publishUrl"  id="event-link"></md-input>
                        <md-button class="md-success md-sm" @click="copyLink">
                            COPY LINK
                        </md-button>
                    </md-field>

                </template>
                <template slot="footer">

                </template>
            </modal>
        </div>
    </div>
</template>
<script>
    import auth from '@/auth';
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import CalendarEvent from '@/models/CalendarEvent';
    import {Modal} from "@/components";
    import Calendar from "@/models/Calendar";
    import EventComponent from "@/models/EventComponent";

    import swal from "sweetalert2";
    import {error} from 'util';
    import moment from 'moment';

    export default {
        components: {
            Modal,
        },
        props: {
            event: Object

        },
        data: () => ({
            auth: auth,
            publishUrl : ''
        }),

        created() {

        },
        mounted() {
            setTimeout(()=>{this.publishUrl = `${document.location.protocol}//${document.location.hostname}:${document.location.port}/#/events/${this.event.id}/public`},400);

        },
        methods: {
            ...mapMutations('EventPlannerVuex', ['setPublishEventModal']),
            closeModal(){
                this.setPublishEventModal({ showModal: false });
            },
            copyLink () {
                let testingCodeToCopy = document.querySelector('#event-link')
                testingCodeToCopy.setAttribute('type', 'text')
                testingCodeToCopy.select()

                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                    swal({
                        title: `Event publich link coplied successfully!`,
                        showConfirmButton: false,
                        type: "success",
                        timer: 3000
                    });
                } catch (err) {
                    alert('Oops, unable to copy');
                }

                window.getSelection().removeAllRanges();
            }

        },
        computed: {
            ...mapState('EventPlannerVuex', [
                'publishEventModal',
            ])
        }
    };
</script>
