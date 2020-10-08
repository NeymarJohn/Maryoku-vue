<template>
  <div>
    <div class="conceptTitle">{{ event.concept.title }}</div>
    <div class="d-flex">
      <div v-for="(color, index) in event.concept.colors" :key="index">
        <div class="concept-color" :style="`background: ${color.color}`">
          <img class="concept-image" :src="`${event.concpet.images[index].url}`" />
        </div>
      </div>
    </div>
    <div class="concept-description">
      {{ event.concept.description }}
    </div>
    <div class="font-size-30 font-bold">How does your vision of the event fit in with the concept?</div>
    <textarea></textarea>
    <div>
      <div></div>
      <div>
        <div>
          <span class="font-size-30 font-bold">Upload Inspirational Photos</span
          ><span>(15 photos top, under 20 KB)</span>
        </div>
        <div>Photos that could fit in with the concept</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
};
</script>