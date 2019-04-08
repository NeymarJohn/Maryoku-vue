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
            <md-card-content>
                <collapse
                        :collapse="questionsAndAnswersList"
                        icon="keyboard_arrow_down"
                        color-collapse="danger">
                    <template slot="md-collapse-pane-1">
                        <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                    </template>
                    <template slot="md-collapse-pane-2">
                        <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                    </template>
                    <template slot="md-collapse-pane-3">
                        <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
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
        questionsAndAnswersList : [
            {
                title : 'Question 1 : what if'
            },
            {
                title : 'Question 2'
            },
            {
                title : 'Question 3'
            }
        ],
        showModal : false
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
      
    },
    mounted() {

    },
    computed: {

    }
  }
</script>
