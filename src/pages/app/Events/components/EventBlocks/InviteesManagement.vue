<template>
    <div class="invitees-management">
        <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
        <md-button name="event-planner-tab-invitees-management-event-page" class="md-info" @click="goToComponent('')">
            Event Page
        </md-button>

        <div class="md-layout">
            <md-card class="md-layout-item md-size-100">
                <md-card-header class="md-card-header-icon md-card-header-warning">
                    <div class="card-icon">
                        <md-icon>contacts</md-icon>
                    </div>
                    <h4 class="title2">Select Invitees</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <label class="md-layout-item md-size-10">
                            Invitees Group
                        </label>
                        <div class="md-layout-item md-size-30">
                            <md-field class="invitees-group-list">
                                <md-select v-model="selected_audience" name="select">
                                    <md-option v-for="(option, index) in audienceList" :key="index"
                                               :value="option.value">{{ option.title }}
                                    </md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-40">
                            <md-button name="event-planner-tab-invitees-management-save"
                                       class="md-info" @click="goToComponent('')">
                                Save
                            </md-button>
                            <md-button name="event-planner-tab-invitees-management-manage-groups"
                                       class="md-info" @click="showManageGroupSection()">
                                Manage Groups
                            </md-button>
                        </div>
                    </div>
                    <!--<div class="md-layout">-->
                        <!--<div class="md-layout-item md-size-100">-->
                            <!--<label>What is the nature of the group?</label>-->
                        <!--</div>-->
                        <!--<div class="md-layout-item md-size-100">-->
                            <!--<md-radio v-model="nature_group" :value="1">Invited alone</md-radio>-->
                            <!--<md-radio v-model="nature_group" :value="2">Invited with spouses only</md-radio>-->
                            <!--<md-radio v-model="nature_group" :value="3">Invited with other team</md-radio>-->
                            <!--<md-radio v-model="nature_group" :value="4">Invited with family</md-radio>-->
                            <!--<md-radio v-model="nature_group" :value="5">Invited with customers</md-radio>-->
                        <!--</div>-->
                    <!--</div>-->
                </md-card-content>
            </md-card>

            <!--<md-card class="md-layout-item rsvp-card">
                <div class="rsvp-card_icon">
                    <md-icon>notifications</md-icon>
                </div>
                <div class="md-layout">
                    <label class="md-layout-item md-size-100 md-form-label">
                        Send RSVP?
                    </label>
                    <div class="md-layout-item md-size-100">
                        <md-checkbox v-model="send_rsvp">
                            A notification will be sent  to invitees that haven’t confirmed their status.
                        </md-checkbox>
                    </div>
                </div>
                <div class="md-layout">
                    <label class="md-layout-item md-size-100 md-form-label">
                        When would you like to set this?
                    </label>
                    <div class="md-layout-item md-size-100">
                        <md-radio v-model="when_set_email" :value="1">Send email 3 weeks before the event</md-radio>
                        <md-radio v-model="when_set_email" :value="2">Send email 3 days before the event</md-radio>
                    </div>
                </div>
            </md-card>-->

            <md-card class="md-layout-item md-size-100" v-if="interactionsList">
                <md-card-header class="md-card-header-icon md-card-header-rose">
                    <div class="card-icon">
                        <md-icon>contacts</md-icon>
                    </div>
                    <h4 class="title2">Manage Interactions</h4>
                </md-card-header>
                <md-card-content class="md-layout">
                    <div class="md-layout-item md-size-50">
                        <p class="desc">
                            Automate the interactions with the audience selected for this event. Select the text that will be written in the mail for each type of interaction.
                        </p>

                        <!-- Interactions List -->
                        <div class="interactions-list" v-if="interactionsList.length">
                            <div class="interactions-list_item" v-for="(item,index) in interactionsList" :key="index" @click="selectInteraction(item)" :class="{selected_interaction : selectedInteraction && item.id == selectedInteraction.id}">
                                <div class="md-layout">
                                    <div class="md-layout-item">

                                        <h4 class="interaction-title">
                                            <md-checkbox v-model="item.enabled" @change="checkItem(item)"></md-checkbox>
                                            {{item.title}}
                                        </h4>
                                    </div>
                                </div>
                                <div class="md-layout" v-if="selectedInteraction && item.id == selectedInteraction.id">
                                    <div class="md-layout-item md-size-100">
                                        <div class="send-date-field md-layour">
                                            <label class="md-form-label md-layout-item md-size-40">
                                                Send Date
                                            </label>
                                            <md-datepicker class="md-layout-item" v-model="item.sendOnDate">
                                                <label></label>
                                            </md-datepicker>
                                        </div>
                                    </div>
                                    <div class="md-layout-item md-size-100">
                                        <div class="send-date-field md-layout">
                                            <label class="md-form-label md-layout-item md-size-40">
                                                Days to send before the event
                                            </label>
                                            <md-field class="md-layout-item" >
                                                <md-input type="number" v-model="item.sendDaysBeforeEvent"></md-input>
                                            </md-field>
                                        </div>
                                    </div>
                                    <div class="md-layout-item md-size-100">
                                        <div class="send-date-field">
                                            <md-checkbox v-model="item.include_link"  :id="`include-${index}`"></md-checkbox>
                                            <label style=" margin:  14px 16px 14px 0" :for="`include-${index}`">Include link to event page</label>
                                        </div>
                                        <div style="margin-bottom : 1em;">Still don't have one? <a href="javascript:void(0)" @click="goToComponent('')">click here</a> to create event page</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ./Interactions List -->

                    </div>
                    <div class="md-layout-item md-size-50" v-if="selectedInteraction">
                        <div class="preview-section">
                            <div class="preview-item"
                                 :style="`background-image: url(/static/img/interactions/${templateImage}.png)`">

                                <!--<iframe src="/static/img/interactions/interaction-1.html"></iframe>-->

                                <h2 class="interaction-title">
                                    {{line1}}
                                </h2>
                                <h4 class="interaction-date">{{line2}}</h4>
                                <p class="interaction-desc">{{line3}}</p>

                            </div>

                            <div class="interaction-images md-layout-item md-size-100">

                                <h4>Select Image for your interaction</h4>
                                <ul class="images-list">
                                    <li class="list-item" v-for="(image,index) in interactionsImagesList">
                                        <div class="image-item"
                                             :style="`background-image: url(/static/img/interactions/${image}.png)`"
                                             :class="{selected : templateImage == image }"
                                             @click="templateImage = image ;selectTemplateImage(image)"></div>
                                    </li>
                                </ul>
                            </div>

                            <md-field>
                                <label>Title</label>
                                <md-input v-model="line1" type="text"></md-input>
                            </md-field>
                            <md-field>
                                <label>Date</label>
                                <md-input v-model="line2" type="text"></md-input>
                            </md-field>
                            <md-field>
                                <label>Your Message</label>
                                <md-textarea v-model="line3" type="text"></md-textarea>
                            </md-field>
                            <md-button name="event-planner-tab-invitees-management-interaction-save"
                                       class="md-success pull-right" @click="editInteraction(selectedInteraction)">
                                Save
                            </md-button>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import Calendar from "@/models/Calendar"
    import CalendarEvent from "@/models/CalendarEvent"
    import EventComponent from "@/models/EventComponent";
    import VueElementLoading from 'vue-element-loading';
    import auth from '@/auth';
    import EventInteraction from "@/models/EventInteraction";
    import moment from 'moment';
    import _ from "underscore";

    // Get dummy images from EventPageHeaderImage
    import EventPageHeaderImage from '@/models/EventPageHeaderImage';
    import ManageInviteesGroups from './Modals/ManageInviteesGroups.vue';

    export default {
        name: 'invitees-management',
        components: {
            VueElementLoading,
        },
        props: {
            event
        },
        data: () => ({
            auth: auth,
            isLoading: true,
            selected_audience: null,
            nature_group: null,
            send_rsvp: false,
            when_set_email: null,
            audienceList: [],
            interactions: [],
            interactionsList: null,
            selectedInteraction: null,
            line1: "",
            line2: "",
            line3: "",
            interactionsImagesList : [],
            templateImage : null
        }),
        methods: {
            goToComponent(route = null) {
                this.$router.push({path: `/events/` + this.event.id + route});
                location.reload();
            },
            selectInteraction(item) {
                this.selectedInteraction = Object.assign({}, item);
                this.templateImage = item.templateImage;
                this.line1 = item.line1;
                this.line2 = item.line2;
                this.line3 = item.line3;
            },
            selectTemplateImage(image) {
                this.templateImage = image;
            },
            editInteraction(item) {
                this.isLoading = true;

                // Edit event interaction
                let interaction = new EventInteraction({id: item.hashed_id});

                interaction.templateId = item.id;
                interaction.title = item.title;
                interaction.sendOnDate = this.getEventStartInMillis(item.sendOnDate);
                interaction.sendDaysBeforeEvent = item.sendDaysBeforeEvent;
                interaction.line1 = this.line1;
                interaction.line2 = this.line2;
                interaction.line3 = this.line3;
                interaction.templateImage = this.templateImage;
                interaction.event = {id: this.event.id};

                interaction.save()
                    .then(resp => {

                        this.isLoading = false;

                        this.$notify(
                            {
                                message: 'Changes saved successfully',
                                horizontalAlign: 'center',
                                verticalAlign: 'top',
                                type: 'success'
                            })
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            getEventStartInMillis(sendDate) {
                let eventStartTime = new Date(sendDate).getTime();
                return eventStartTime;
            },
            checkEventInteraction(interactionId, index) {

                let interaction = _.findWhere(this.interactions, {templateId: interactionId});

                if (interaction) {
                    this.interactionsList[index].sendOnDate = new Date(interaction.sendOnDate);
                    this.interactionsList[index].sendDaysBeforeEvent = interaction.sendDaysBeforeEvent;
                    this.interactionsList[index].line1 = interaction.line1;
                    this.interactionsList[index].line2 = interaction.line2;
                    this.interactionsList[index].line3 = interaction.line3;
                    this.interactionsList[index].hashed_id = interaction.id;
                    this.interactionsList[index].templateImage = interaction.templateImage;
                    this.interactionsList[index].enabled = interaction.enabled ? interaction.enabled : false;
                    return true;
                } else {
                    return false;
                }
            },
            checkItem(item) {

                if (item.enabled && !item.hashed_id) {
                    this.saveInteraction(item);
                } else if (item.enabled && item.hashed_id) {
                    this.EnableDisableInteraction(item, true);
                } else {
                    this.EnableDisableInteraction(item, false);
                }
            },
            saveInteraction(item) {
                this.isLoading = true;

                let new_interaction = {
                    title: item.title,
                    templateId: item.id,
                    templateImage: this.selectedInteraction ? this.selectedInteraction.templateImage : '',
                    sendOnDate: null,
                    sendDaysBeforeEvent: 0,
                    event: {id: this.event.id},
                    enabled: true
                }

                // Save event interaction
                let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});

                new EventInteraction(new_interaction).for(calendar, event).save().then(res => {

                    this.isLoading = false;

                })
                    .catch(error => {
                        console.log('Error while saving ', error);
                    })
            },
            EnableDisableInteraction(item, status) {
                // Edit event interaction
                this.isLoading = true;

                let interaction = new EventInteraction({id: item.hashed_id});
                interaction.enabled = status;
                interaction.templateId = item.id;
                interaction.title = item.title;
                interaction.templateImage = item.templateImage;
                interaction.sendOnDate = this.getEventStartInMillis(item.sendOnDate);
                interaction.sendDaysBeforeEvent = item.sendDaysBeforeEvent;
                interaction.line1 = this.line1;
                interaction.line2 = this.line2;
                interaction.line3 = this.line3;
                interaction.templateImage = this.selectedInteraction ? this.selectedInteraction.templateImage : '';
                interaction.event = {id: this.event.id};

                interaction.save().then(resp => {
                    this.isLoading = false;
                    this.$forceUpdate();
                })
                    .catch(error => {
                        console.log(error);

                    })
            },
            showManageGroupSection(){
                window.currentPanel = this.$showPanel({
                    component: ManageInviteesGroups,
                    cssClass: 'md-layout-item md-size-45 transition36 bg-grey',
                    openOn: 'right',
                    props: {event : this.event}
                });
            }

        },
        created() {
        },
        mounted() {
            this.isLoading = false;

            let _self = this;
            let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.event.id});

            // Get Event Interactions
            new EventInteraction().for(calendar, event).get().then(res => {

                this.interactions = res;

                // Get List of available interactions
                new EventInteraction().get().then(res => {

                    _self.interactionsList = res;
                    this.interactionsImagesList = res[0].options;

                    _self.interactionsList.forEach(function (item, index) {
                        _self.checkEventInteraction(item.id, index);
                    })
                })

            })

        },
        computed: {},
        watch: {}
    }
</script>
