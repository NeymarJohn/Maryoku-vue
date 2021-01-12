<template>
  <div class="my-event-item">
    <div class="my-event-item-header">
      <img class="event-image" :srce="event.eventConcept.images[0].url" />
      My Event 03
      <span>created on march 22 2000</span>
      <md-button class="edit-btn md-simple">Edit Detials</md-button>
      In progresss 20%
    </div>
    <div v-if="expanded">
      <div class="event-info-item">Date</div>
      <div class="event-info-item">Location</div>
      <div class="event-info-item">Number Of Guests</div>
      <div class="event-info-item">Event type</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.my-event-item {
  .event-info-item {
    padding: 30px 0;
    border-top: solid 1px #dfdfdf;
  }
}
</style>
<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
};
</script>