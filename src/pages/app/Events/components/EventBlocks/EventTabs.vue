<template>
    <div class="event-info-tabs">
        <tabs
                :tab-name="['MEETING PLACE', 'WHEN TO ARRIVE', 'WHAT YOU NEED TO KNOW']"
                flex-column
                color-button="danger">
            <!-- here you can add your content for tab-content -->
            <template slot="tab-pane-1">
                <md-field :class="{editable : editMode}">
                         <md-textarea  v-model="event.eventPage.meetingPlaceDescription " placeholder="Add description here ...">

                         </md-textarea>
                </md-field>
            </template>
            <template slot="tab-pane-2">
                <md-field :class="{editable : editMode}">
                    <md-textarea  v-model="event.eventPage.whenToArrive" placeholder="Add description here ...">

                    </md-textarea>
                </md-field>
            </template>
            <template slot="tab-pane-3">
                <md-field :class="{editable : editMode}">
                    <md-textarea  v-model="event.eventPage.whatYouNeedToKnow" placeholder="Add description here ...">

                    </md-textarea>
                </md-field>
            </template>
        </tabs>

        <div class="tabs-actions">
            <md-button class="md-info md-sm edit-timeline-btn" v-if="!editMode" @click="toggleEditMode">
                Edit
            </md-button>
            <md-button class="md-info md-sm edit-timeline-btn" v-if="editMode" @click="editEventInfo">
                Save
            </md-button>
            <md-button class="md-default md-sm edit-timeline-btn" v-if="editMode" @click="toggleEditMode">
                Cancel
            </md-button>
        </div>

    </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from "@/models/Calendar";
  import CalendarEvent from "@/models/CalendarEvent";
  import EventComponent from "@/models/EventComponent";
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';

  //COMPONENTS
  import { Tabs } from "@/components";


  export default {
    name: 'event-tabs',
    components: {
        Tabs
    },
    props: {
        event
    },
    data: () => ({
        editMode : false,
        auth : auth
    }),
    methods: {
        toggleEditMode() {
            this.editMode = !this.editMode;
        },
        editEventInfo() {
            this.$parent.isLoading = true;


            let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let editedEvent = new CalendarEvent({id: this.event.id});

            editedEvent = this.event;
            editedEvent.eventPage.meetingPlaceDescription = this.event.eventPage.meetingPlaceDescription;
            editedEvent.eventPage.whenToArrive = this.event.eventPage.whenToArrive;
            editedEvent.eventPage.whatYouNeedToKnow = this.event.eventPage.whatYouNeedToKnow;


            //this.closeModal();


            editedEvent.save().then(response => {
                console.log(response);

            })
                .catch((error) => {
                    console.log(error);

                });

        }

    },
    created() {

    },
    mounted() {

    },
    computed: {

    }
  }
</script>
