<template>
  <div class="event-confirmation" style="position: absolute !important;">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />
    <div class="confirmation-section">
      <h4>Are you coming?</h4>
      <md-button class=" md-sm" :class="[{'md-success': (userResponse && userResponse.attending), 'md-info' : !(userResponse && userResponse.attending)}]" @click="confirmGoing(true)">
        Yes
      </md-button>
      <md-button class="md-info md-sm" :class="[{'md-success': (userResponse && !userResponse.attending), 'md-info' : !(userResponse && !userResponse.attending)}]" @click="confirmGoing(false)">
        No
      </md-button>
      <div v-if="!userInfo" class="event-confirmation-signin text-center">
        <md-button class="md-simple md-xs text-center" style="font-weight: 500; width: 100%;" @click="showSignIn">
          Already responded? Sign in
        </md-button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "EventConfirmation",
  components: {

  },
  props: {
    event,
    userInfo: Object,
    userResponse: Object
  },
  data: () => ({
    isLoading: false
  }),
  watch: {
    userResponse (newVal, oldVal) {
      this.isLoading = false;
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    showSignIn () {
      this.$root.$emit("event-confirmation", null);
    },
    confirmGoing (isGoing) {
      this.$root.$emit("event-confirmation", isGoing);
    }

  }
};
</script>
<style lang="scss" scoped>

</style>
