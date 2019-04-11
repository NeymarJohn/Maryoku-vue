<template>
  <div class="questions-answers-list">
    <md-card>
      <md-card-header>
        <h4 class="title">Questions & Answers
          <md-button class="md-info md-sm edit-event-component"  v-if="!readonly"  @click="showQuestionsAnswersModal">
            Edit
          </md-button>
        </h4>
      </md-card-header>
      <md-card-content v-if="qnas">
        <collapse
          :collapse="questionsAndAnswersList"
          icon="keyboard_arrow_down"
          color-collapse="danger">
          <template v-for="(item,index) in qnas" :slot="`md-collapse-pane-${index + 1}`">
            <p>{{`A${index+1}: `+item.answer}}</p>
          </template>
        </collapse>
      </md-card-content>
    </md-card>

    <edit-questions-and-answers v-if="!readonly" :event="event" rel="questionsAnswersModal"></edit-questions-and-answers>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from "@/models/Calendar"
  import EventComponent from "@/models/EventComponent";
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';

  import { Collapse } from "@/components";

  //COMPONENTS
  import EditQuestionsAndAnswers from './Modals/EditQuestionsAndAnswers.vue';

  export default {
    name: 'event-questions-answers',
    components: {
      Collapse,
      EditQuestionsAndAnswers
    },
    props: {
      event,
      readonly : {
          type : Boolean,
          default : false
      }
    },
    data: () => ({
      showModal : false,
      headers : [],
      qnas : []
    }),
    methods: {
      ...mapMutations("EventPlannerVuex", [
        "setQuestionsAnswersModal"
      ]),
      showQuestionsAnswersModal() {
        this.setQuestionsAnswersModal({ showModal: true });
      }
    },
    created() {

      this.qnas = this.event.eventPage.qnas

    },
    mounted() {

    },
    computed: {
      questionsAndAnswersList() {
        let questions = [];
        let index = 1;
        this.qnas.forEach(item => {
          questions.push({title : `Q${index++}: ${item.question}`});
        });

        return questions;
      }
    }
  }
</script>
