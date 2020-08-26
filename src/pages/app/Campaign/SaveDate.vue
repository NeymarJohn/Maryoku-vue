<template>
  <div class="campaign-save-date">
    <savedate-analytics v-if="info.completed"></savedate-analytics>
    <div class="white-card">
      <div class="font-size-30 font-bold-extra text-transform-capitalize  p-50">
        let's start with a "save the date campaign"
      </div>
      <concept-image-block class="ml-50" :images="concept.images" :colors="concept.colors" border="no-border"></concept-image-block>
      <div class="concept  p-50"> 
        <span class="font-size-30 font-bold">Save The Date</span>
        <span class="font-size-22 ml-10"> {{$dateUtil.formatScheduleDay(event.eventStartMillis, "MMMM D, YYYY")}}</span>
        <div class="font-size-60 font-bold-extra mt-40">
        {{event.title}}
        </div>
      </div>
      <div class="p-50 comment">
        <maryoku-textarea class="width-100" :placeholder="placeHolder" v-model="description"></maryoku-textarea>
      </div>
      <div class="p-50 text-center">
        <div class="font-size-22 mb-50">MORE DETAILS COMING SOON</div>
        <vue-dropzone v-if="!logo" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-file-added="logoSelected">
          <span class="color-red font-bold "><img :src="`${$iconURL}Campaign/Group 9241.svg`" class="mr-10">Upload company logo</span>
          <br/>
          Or
          <br/>
          <span class="color-dark-gray">Drag your file here</span>
        </vue-dropzone>
        <div v-else class="d-flex align-center justify-content-center">
          <img :src="logoImageData" class="image-logo">
          <div class="display-logo ml-50">
            <md-switch v-model="showLogo" class="showlogo-switch large-switch"></md-switch>
            <div v-if="showLogo">Hide Logo</div>
            <div v-if="!showLogo">Show Logo</div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import ConceptImageBlock from '@/components/ConceptImageBlock'
import MaryokuTextarea from '@/components/Inputs/MaryokuTextarea'
import SavedateAnalytics from './components/SavedateAnalytics'
import { getBase64 } from '@/utils/file.util'
const placeHolder = "Clear your schedule and get ready to mingle! the greatest event of the year is coming up! more details are yet to come, but we can already promise you it's going to be an event to remember. be sure to mark the date on your calendar. you can do it using this link: (google calendar link). see ya soon";
export default {
  components: {
    vueDropzone: vue2Dropzone,
    ConceptImageBlock,
    MaryokuTextarea,
    SavedateAnalytics,
  },
  props: {
    info: {
      type: Object,
      default: {}
    },
  },
  data: function () {
    return {
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" }
      },
      logo: null,
      logoImageData: '',
      showLogo: true,
      placeHolder: placeHolder,
      description: ''
    }
  },
  created () {
    console.log(this.info);
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
  methods: {
    async logoSelected(file) {
      this.logo = file
      this.logoImageData = await getBase64(file)
    },
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
  .image-logo {
    margin-left: 200px;
    width: 200px;
  }
  .display-logo {
    width: 150px;
    .showlogo-switch {
      width: max-content;
      margin: auto;
    }
  }
}
</style>