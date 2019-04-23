<template>
    <div class="invitees-management">
        <md-button class="md-info" @click="goToComponent('/edit/timeline')">
            Create Timeline
        </md-button>
        <md-button class="md-info" @click="goToComponent('')">
            Event Page
        </md-button>

        <div class="md-layout">
            <md-card class="md-layout-item md-size-65">
                <md-card-header class="md-card-header-icon md-card-header-rose">
                    <div class="card-icon">
                        <md-icon>contacts</md-icon>
                    </div>
                    <h4 class="title2">Invitees Management</h4>
                </md-card-header>
                <md-card-content >
                    <div class="md-layout">
                        <label class="md-layout-item md-size-20 md-form-label">
                            Select Audience
                        </label>
                        <div class="md-layout-item md-size-40">
                            <md-field>
                                <md-select v-model="selected_audience" name="select">
                                    <md-option v-for="(option, index) in audienceList"  :key="index"  :value="option.value">{{ option.title }}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-40">
                            <md-button class="md-success md-sm" @click="goToComponent('')">
                                ADD AND SELECT CUSTOM GROUP
                            </md-button>
                        </div>
                    </div>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <label>What is the nature of the group?</label>
                        </div>
                        <div class="md-layout-item md-size-100">
                            <md-radio v-model="nature_group" :value="1">Invited alone</md-radio>
                            <md-radio v-model="nature_group" :value="2">Invited with spouses only</md-radio>
                            <md-radio v-model="nature_group" :value="3">Invited with other team</md-radio>
                            <md-radio v-model="nature_group" :value="4">Invited with family</md-radio>
                            <md-radio v-model="nature_group" :value="5">Invited with customers</md-radio>
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <md-card class="md-layout-item rsvp-card">
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
            </md-card>

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
                        <!-- TODO:list all interactions -->
                        <div class="interactions-list" v-if="interactions.length">
                            <div class="interactions-list_item" v-for="(item,index) in interactions" :key="index">
                                <div class="md-layout">
                                    <label class="md-layout-item md-size-30 md-form-label">
                                        Add an interaction
                                    </label>
                                    <div class="md-layout-item">
                                        <md-field>
                                            <md-select v-model="item.id" name="select" >
                                                <md-option v-for="(option, index) in interactionsList"  :key="index"  :value="option.id" >{{ option.title }}</md-option>
                                            </md-select>
                                        </md-field>
                                    </div>
                                </div>
                                <div class="md-layout">
                                    <div class="interaction-images">
                                        <ul class="images-list">
                                            <li class="list-item">
                                                <div class="image-item" style="background-image: url(https://bit.ly/2v5L5dO)"></div>
                                            </li>
                                            <li class="list-item">
                                                <div class="image-item" style="background-image: url(https://bit.ly/2v5L5dO)"></div>
                                            </li>
                                            <li class="list-item">
                                                <div class="image-item" style="background-image: url(https://bit.ly/2v5L5dO)"></div>
                                            </li>
                                            <li class="list-item">
                                                <div class="image-item" style="background-image: url(https://bit.ly/2v5L5dO)"></div>
                                            </li>
                                            <li class="list-item">
                                                <div class="image-item" style="background-image: url(https://bit.ly/2v5L5dO)"></div>
                                            </li>
                                            <li class="list-item">
                                                <div class="image-item" style="background-image: url(https://bit.ly/2v5L5dO)"></div>
                                            </li>
                                            <li class="list-item">
                                                <div class="image-item" style="background-image: url(https://bit.ly/2v5L5dO)"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="md-layout">
                                    <div class="md-layout-item md-size-50 no-padding">
                                        <div class="send-date-field">
                                            <label class="md-form-label">
                                                Send Date
                                            </label>
                                            <md-field style="width:62%;">
                                                <md-input type="text" v-model="item.sendOnDate"></md-input>
                                            </md-field>
                                        </div>
                                    </div>
                                    <div class="md-layout-item md-size-50 no-padding">
                                        <div class="send-date-field">
                                            <label class="md-form-label">
                                                Days to send before the event
                                            </label>
                                            <md-field style="width:22%;">
                                                <md-input type="number" v-model="item.sendDaysBeforeEvent"></md-input>

                                            </md-field>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ./Interactions List -->

                        <!-- Add New Interaction -->
                        <div class="add-interaction-section">
                            <div class="md-layout">
                                <label class="md-layout-item md-size-30 md-form-label">
                                    Add an interaction
                                </label>
                                <div class="md-layout-item">
                                    <md-field>
                                        <md-select v-model="selected_interaction" name="select" >
                                            <md-option v-for="(option, index) in interactionsList"  :key="index"  :value="JSON.stringify(option)" >{{ option.title }}</md-option>
                                        </md-select>
                                    </md-field>
                                </div>
                            </div>
                        </div>
                        <!-- ./Add New Interaction -->
                    </div>
                    <div class="md-layout-item md-size-50">
                        <div class="preview-section">
                            <div class="preview-item" style="background-image: url(https://bit.ly/2v5L5dO)">

                              <iframe src="/static/img/interactions/interaction-1.html"></iframe>

                            </div>
                            <md-field>
                                <label>Title</label>
                                <md-input ></md-input>
                            </md-field>
                            <md-field>
                                <label>Date</label>
                                <md-input ></md-input>
                            </md-field>
                            <md-field>
                                <label>Your Message</label>
                                <md-textarea ></md-textarea>
                            </md-field>
                            <md-button class="md-success pull-right">
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
        isLoading:true,
        selected_audience : null,
        selected_interaction : null,
        nature_group: null,
        send_rsvp : false,
        when_set_email : null,
        audienceList : [],
        interactions : [],
        interactionsList : null
    }),
    methods: {
      goToComponent (route = null) {
          this.$router.push({ path: `/events/`+ this.event.id + route });
          location.reload();
      },
        selectInteraction(event) {

        }

    },
    created() {

    },
    mounted() {

        let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
        let event = new CalendarEvent({id: this.event.id});

        // Get Event Interactions
        new EventInteraction().for(calendar,event).get().then(res => {

            console.log('Interactions', res);
        })

        // Get List of available interactions
        new EventInteraction().get().then(res => {
            this.interactionsList = res;
        })
    },
    computed: {

    },
      watch:{
          selected_interaction(option) {
              let item = JSON.parse(option);

              let new_interaction = {
                  id : item.id,
                  title : item.title,
                  templateId : null,
                  sendOnDate : null,
                  sendDaysBeforeEvent : 0,
                  event : { id : this.event.id}
              }

              this.interactions.push(new_interaction);

              // Save event interaction
              let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
              let event = new CalendarEvent({id: this.event.id});

              new EventInteraction(new_interaction).for(calendar,event).save().then(res => {
                  console.log('saved successfully');
                  console.log(res);
              })
                  .catch(error => {
                      console.log('Error while saving ', error);
                  })
          }
      }
  }
</script>
