<template>
    <div class="event_questions-answers-modal">
        <div class="md-layout">
            <modal v-if="questionsAnswersModal">
                <template slot="header">
                    <div class="md-layout d-flex items-left" >
                        <h4>Add Questions to Event
                        </h4>
                    </div>
                    <md-button class="md-simple md-just-icon md-round modal-default-button" @click="closeModal">
                        <md-icon>clear</md-icon>
                    </md-button>
                </template>
                <template slot="body">
                    <div class="question-item" v-for="(item, index) in questionsList" :key="index">
                        <md-field>
                            <label>Question</label>
                            <md-input v-model="item.question"></md-input>
                            <md-button class="md-danger md-sm md-just-icon md-simple " v-if="questionsList.length > 1" @click="removeQuestion(index)">
                                <md-icon>delete_outline</md-icon>
                            </md-button>
                        </md-field>
                        <md-field>
                            <label>Answer</label>
                            <md-textarea v-model="item.answer"></md-textarea>
                        </md-field>
                    </div>

                    <md-button class="md-info add-question-btn" @click="addQuestion">
                        <md-icon>add</md-icon> Add Question
                    </md-button>

                </template>
                <template slot="footer">
                    <md-button class="md-success move-right" @click="saveQuestoinsList">
                        Save
                    </md-button>
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
  import { error } from 'util';
  import moment from 'moment';

  export default {
    components: {
      Modal,
    },
    props: {
      event : Object

    },
    data: () => ({
      auth: auth,
        questionsList : [],
        questionTemplate : {
          question : '',
          answer  : ''
        }
    }),

    created() {
        this.questionsList = this.event.eventPage.qnas;

    },
    mounted() {

    },
    methods: {
        ...mapMutations('EventPlannerVuex', ['setQuestionsAnswersModal']),
        closeModal(){
          this.setQuestionsAnswersModal({ showModal: false });
      },
        saveQuestoinsList() {
            let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let editedEvent = new CalendarEvent({id: this.event.id});

            editedEvent = this.event;
            editedEvent.eventPage.qnas = this.questionsList;

            //this.closeModal();


            editedEvent.for(_calendar).save().then(response => {
                console.log(response);

            })
                .catch((error) => {
                    console.log(error);

                });

        },
        addQuestion(){
            let block = Object.assign({}, this.questionTemplate);
            this.questionsList.push(block);
        },
        removeQuestion(index){
            this.questionsList.splice(index,1);
        }
    },
      computed : {
          ...mapState('EventPlannerVuex', [
              'questionsAnswersModal',
          ])
      }
  };
</script>
<style lang="scss" scope>
  .md-datepicker {
    .md-icon.md-date-icon {
      display: none;
      &~label {
        left: 0;
      }
    }
    input {
      margin-left: 0 !important;
    }
    &.md-field::before,
    &.md-field::after {
      width: 100%;
    }
  }
  .md-field>.md-icon~.md-input {
    margin: 0;
  }
  .modal-container {
    max-width: 570px;
  }
</style>
<style lang="scss">
    .modal-z-index {
        z-index: 5;
    }
    .large-z-index {
        z-index: 6;
        position: relative;
    }
    .move-center {
        margin: 0 auto!important;;
    }
    .move-left {
      margin-left: 0!important;
      margin-right: auto!important;
    }
    .move-right {
      margin-right: 0!important;
      margin-left: auto!important;
    }
    .text-center {
      text-align: center;
    }
    .d-flex {
      display: flex;
    }
    .items-center-v {
      align-items: center;
    }
    .items-center-g {
      justify-content: center;
    }
    .justify-beetwen {
      justify-content: space-between
    }
    .md-field .md-error {
      text-align: left;
    }
    .swal2-container {
      z-index: 10000;
    }
</style>
