<template>
  <div class="event-vision-wrapper proposal-add-personal-message-wrapper mt-40">
    <template v-if="event.concept">
      <div class="concept-title-wrap mb-20">
        <div class="font-size-40 line-height-1 concept-title">
          {{ event.concept.name }}
        </div>
        <div class="tags-wrapper">
          <span v-for="tag in event.concept.tags" :key="tag.name">
            {{ tag.name }}
          </span>
        </div>
      </div>
      <div class="d-flex concept-image-wrapper">
        <div
          v-for="(color, index) in event.concept.colors"
          :key="index"
          class="concept-color"
          :style="`background: ${color.color || '#EDEDED'}`"
        >
          <img v-if="event.concept.images[index]" class="concept-image" :src="`${event.concept.images[index].url}`">
        </div>
      </div>
      <div class="concept-description mt-30 mb-30">
        {{ event.concept.description }}
      </div>
    </template>
    <div class="font-size-30 font-bold-extra mt-30 mb-30">
      <img :src="`${$iconURL}Vendor+Landing+Page/Asset+491.svg`" class="page-icon">
      How does your vision of the event fit in with the concept?
    </div>
    <textarea v-model="eventVision" placeholder="Write your intentions here…." />
    <div class="mt-50">
      <div>
        <span class="font-size-30 font-bold-extra">
          <img :src="`${$iconURL}Vendor+Landing+Page/art.svg`" class="page-icon mr-10">
          Upload Inspirational Photos
        </span>
        <span style="padding: 5px">(15 photos under 5M each)</span>
      </div>
      <div style="padding: 10px 10px 30px 40px">
        Photos that could fit in with the concept
      </div>
      <proposal-inspirational-photos />
    </div>
  </div>
</template>
<script>
import ProposalInspirationalPhotos from "./ProposalInspirationalPhotos.vue";

export default {
  components: {
    ProposalInspirationalPhotos,
  },
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 10,
      },
    };
  },
  computed: {
    eventVision: {
      get() {
        return this.$store.state.vendorProposal.eventVision;
      },
      set(value) {
        this.$store.commit("vendorProposal/setValue", { key: "eventVision", value });
      },
    },
  },
  watch: {
    eventVision:{
        handler(newVal) {
          console.log("eventVision", newVal);
        },
        deep: true,
    }
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.event-vision-wrapper {
  .concept-title-wrap{
    display: flex;
    align-items: center;
    .concept-title{
      min-width: max-content;
    }
    .tags-wrapper{
      display: flex;
      flex-wrap: wrap;
      margin-left: 20px;
      max-width: 600px;
      span{
        display: block;
        margin-bottom: 10px;
        margin-right: 20px;
        padding: 4px 14px;
        border-radius: 100px;
        border: solid 1px #a0a0a0;
        text-transform: capitalize;
      }
    }
  }
  .concept-image-wrapper {
    width: 80%;
    .concept-color {
      width: 25%;
      padding: 2em;
      text-align: center;
      .concept-image {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        object-fit: cover;
        transition: 0.2s;
        &:hover {
          border-radius: 3px;
          transform: scale(2);
          transition: 0.5s;
        }
      }
    }
  }
  .concept-description {
    width: 80%;
  }
  textarea {
    width: 100%;
    resize: none;
    font-size: 16px;
    border-radius: 3px;
    border: solid 0.5px #707070;
    padding: 21px 18px;
    margin-bottom: 15px;
    min-height: 150px;
  }
  .vue-dropzone {
    border: dashed 2px #f51355;
    width: 100%;
    margin: auto;
  }
}
</style>
