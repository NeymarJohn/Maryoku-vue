<template>
    <div class="back-section" @click="goTo">
        <md-icon>keyboard_arrow_left</md-icon> <span class="back-text"> Go Back </span>
    </div>
</template>

<script>
    export default {
        props : ["navigation"],
        components: {

        },
        data() {
            return {


            }
        },
        methods : {
            goTo(){
                console.log(this.navigation);
                this.$router.push({ path: this.navigation});
            }
        }
    };
</script>
<style lang="scss">

</style>
