<template>
  <div class="questions-answers-list">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen />
    <md-card v-if="!editMode">
      <md-card-header>
        <h4 class="title">
          Questions & Answers
          <md-button v-if="!readonly" class="md-info md-sm edit-event-component pull-right" @click="editMode = !editMode">
            Edit
          </md-button>
        </h4>
      </md-card-header>
      <md-card-content v-if="qnas">
        <collapse
          :collapse="questionsAndAnswersList"
          icon="keyboard_arrow_down"
          color-collapse="danger"
        >
          <template v-for="(item,index) in qnas" :slot="`md-collapse-pane-${index + 1}`">
            <p>{{ `A${index+1}: `+item.answer }}</p>
          </template>
        </collapse>
      </md-card-content>
    </md-card>

    <edit-questions-and-answers v-if="!readonly && editMode" :event="event" />
  </div>
</template>
<script>
import {mapState, mapGetters, mapMutations, mapActions} from "vuex";
import Calendar from "@/models/Calendar";
import EventComponent from "@/models/EventComponent";
import VueElementLoading from "vue-element-loading";
// import auth from '@/auth';

import { Collapse } from "@/components";

// COMPONENTS
import EditQuestionsAndAnswers from "./Modals/EditQuestionsAndAnswers.vue";

export default {
  name: "EventQuestionsAnswers",
  components: {
    Collapse,
    EditQuestionsAndAnswers
  },
  props: {
    event,
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    editMode: false,
    headers: [],
    qnas: [],
    isLoading: false

  }),
  computed: {
    questionsAndAnswersList () {
      let questions = [];
      let index = 1;
      this.qnas.forEach(item => {
        questions.push({title: `Q${index++}: ${item.question}`});
      });

      return questions;
    }
  },
  created () {
    this.qnas = this.event.eventPage.qnas;
  },
  mounted () {

  },
  methods: {

  }
};
</script>
