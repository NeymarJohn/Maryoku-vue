<template>
    <div class="event-info">

        <div class="info-item md-layout">
            <h4 class="md-layout-item md-size-30 md-rose md-button md-just-icon text-center" style="border-bottom-right-radius: 0; border-top-right-radius: 0;">MEETING PLACE</h4>
            <md-field  class="md-layout-item md-size-70 md-button text-center" :class="{editable : editMode}" style="color: white; background-color: #efefef !important; margin-left: -1px; border-bottom-left-radius: 0; border-top-left-radius: 0; min-height: auto; padding: 0 12px;">
                <md-textarea  v-model="event.eventPage.meetingPlaceDescription" placeholder="Add description here ..."></md-textarea>
            </md-field>
        </div>

        <div class="info-item md-layout">
          <h4 class="md-layout-item md-size-30 md-rose md-button md-just-icon text-center" style="border-bottom-right-radius: 0; border-top-right-radius: 0;">WHEN TO ARRIVE</h4>
          <md-field  class="md-layout-item md-size-70 md-button text-center" :class="{editable : editMode}" style="color: white; background-color: #efefef !important; margin-left: -1px; border-bottom-left-radius: 0; border-top-left-radius: 0; min-height: auto; padding: 0 12px;">
                <md-textarea  v-model="event.eventPage.whenToArrive " placeholder="Add description here ...">

                </md-textarea>
            </md-field>
        </div>

        <div class="info-item md-layout">
          <h4 class="md-layout-item md-size-30 md-rose md-button md-just-icon text-center" style="border-bottom-right-radius: 0; border-top-right-radius: 0;">WHAT YOU NEED TO KNOW</h4>
          <md-field  class="md-layout-item md-size-70 md-button text-center" :class="{editable : editMode}" style="color: white; background-color: #efefef !important; margin-left: -1px; border-bottom-left-radius: 0; border-top-left-radius: 0; min-height: auto; padding: 0 12px;">
                <md-textarea  v-model="event.eventPage.whatYouNeedToKnow " placeholder="Add description here ...">

                </md-textarea>
            </md-field>
        </div>

        <div class="tabs-actions text-right">
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

            editedEvent.save().then(response => {

                this.toggleEditMode();

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
