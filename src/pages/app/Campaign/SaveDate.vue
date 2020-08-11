<template>
  <div class="campaign-save-date white-card">
    <div class="font-size-30 font-bold-extra text-transform-capitalize  p-50">
      let's start with a "save the date campaign"
    </div>
    <concept-image-block class="ml-50" :images="concept.images" :colors="concept.colors"></concept-image-block>
    <div class="concept  p-50"> 
      <span class="font-size-30 font-bold">Save The Date</span>
      <span class="font-size-22"> December 25, 2019 </span>
      <div class="font-size-60 font-bold-extra mt-40">
        80’s Disco Party
      </div>
    </div>
    <div class="p-50 comment">
      <textarea class="width-100 p-40" placeholder="Clear your schedule and get ready to mingle! the greatest event of the year is coming up! more details are yet to come, but we can already promise you it's going to be an event to remember. be sure to mark the date on your calendar. you can do it using this link: (google calendar link). see ya soon"></textarea>
    </div>
    <div class="p-50 text-center">
      <div class="font-size-22 mb-50">MORE DETAILS COMING SOON</div>
      <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" >
        <span class="color-red font-bold "><img :src="`${$iconURL}Campaign/Group 9241.svg`" class="mr-10">Upload company logo</span>
        <br/>
        Or
        <br/>
        <span class="color-dark-gray">Drag your file here</span>
      </vue-dropzone>
    </div>
  </div>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import ConceptImageBlock from '@/components/ConceptImageBlock'
export default {
  components: {
    vueDropzone: vue2Dropzone,
    ConceptImageBlock
  },
  data: function () {
    return {
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" }
      }
    }
  },
  created () {
    console.log(this.$store.state.event.eventData);
  },
  computed: {
    event() {
      console.log(this.$store.state.event.eventData);

      return this.$store.state.event.eventData;
    },
    concept() {
      return this.event.concept?this.event.concept:{}
    }
  },
}
</script>
<style lang="scss" scoped>
.campaign-save-date{
  .comment {
    background-color: #D4FBF0;
    textarea {
      resize: none;
      min-height: 150px;
      padding-right: 100px;
      line-height: 1.5em;
      font-size: 16px;
    }
  }
  .vue-dropzone {
    border: dashed 2px #f51355;
    width: 275px;
    margin: auto;
  }
}
</style>