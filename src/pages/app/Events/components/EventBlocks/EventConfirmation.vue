<template>
    <div class="event-confirmation">
        <div class="confirmation-section">
            <h4>Are you coming?</h4>
            <md-button class="md-info md-sm" @click="confirmGoing('yes')">
                Yes
            </md-button>
            <md-button class="md-info md-sm" @click="confirmGoing('no')">
                No
            </md-button>
        </div>
    </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';


  export default {
    name: 'event-confirmation',
    components: {

    },
    props: {
        event,
    },
    data: () => ({

    }),
    methods: {
        ...mapMutations('EventPlannerVuex', ['setGoingToEvent']),
        confirmGoing(is_going){
            /*this.setGoingToEvent({isGoing: is_going});

            this.$emit('isGoing');*/
            this.$root.$emit("event-confirmation", is_going);
        }

    },
    created() {

    },
    mounted() {

    }
  }
</script>
