<template>
    <div class="questions-answers-list">
        <md-card>
            <md-card-header>
                <h4 class="title">Questions & Answers 
                    <md-button class="md-info md-sm edit-event-component"   @click="showQuestionsAnswersModal">
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
                        <p>{{item.answer}}</p>
                    </template>
                </collapse>
            </md-card-content>
        </md-card>

        <edit-questions-and-answers :event="event" rel="questionsAnswersModal"></edit-questions-and-answers>
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
            event
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

                this.qnas.forEach(item => {
                    questions.push({title : item.question});
                })

                return questions;
            }
        }
    }
</script>
