<template>
    <div class="back-section" @click="goTo">
        <md-icon>keyboard_arrow_left</md-icon> <span class="back-text"> Go Back </span>
    </div>
</template>

<script>

    import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
    import PublicEventPlannerVuexModule from "../PublicEventPlanner.vuex";

    export default {
        props : {
            navigation : {
                type : String,
                default : '/'
            }
        },
        components: {

        },
        data() {
            return {


            }
        },
        methods : {
            ...mapMutations('PublicEventPlannerVuex', ['setEventProperty','setCurrentStep']),

            goTo(){
                console.log(this.navigation);
                this.setCurrentStep({currentPage : this.navigation})
                this.$router.push({ path: this.navigation});
            }
        }
    };
</script>
<style lang="scss">

</style>
