<template>
    <div class="event-confirmation">
        <div class="confirmation-section">
            <h4>Are you coming?</h4>
            <md-button class="md-info md-sm" @click="confirmGoing('yes')">
                Yes
            </md-button>
            <md-button class="md-info md-sm" @click="confirmGoing('No')">
                No
            </md-button>
        </div>
    </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import auth from '@/auth';

  export default {
    name: 'event-confirmation',
    components: {

    },
    props: {
        event,
    },
    data: () => ({
        auth : auth
    }),
    methods: {

        confirmGoing(is_going){
            this.$emit('isGoing',is_going);
        }

    },
    created() {

    },
    mounted() {

    }
  }
</script>
