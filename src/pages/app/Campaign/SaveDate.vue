<template>
  <div class="campaign-save-date">
    <savedate-analytics v-if="info.completed"></savedate-analytics>
    <div class="white-card">
      <div
        class="font-size-30 font-bold-extra text-transform-capitalize p-50"
      >let's start with a "save the date campaign"</div>
      <concept-image-block
        v-if="concept"
        class="ml-50"
        :images="concept.images"
        :colors="concept.colors"
        border="no-border"
      ></concept-image-block>
      <img v-else :src="`${$storageURL}Campaign+Images/SAVE+THE+DATE.jpg`" />
      <div class="concept p-50">
        <span class="font-size-30 font-bold">Save The Date</span>
        <span
          class="font-size-22 ml-10"
        >{{$dateUtil.formatScheduleDay(event.eventStartMillis, "MMMM D, YYYY")}}</span>
        <title-editor :value="editingContent.title" @change="changeTitle" class="mt-40"></title-editor>
      </div>
      <div class="p-50 comment">
        <maryoku-textarea
          class="width-100"
          :placeholder="placeHolder"
          v-model="editingContent.description"
        ></maryoku-textarea>
      </div>
      <div class="p-50 text-center">
        <div class="font-size-22 mb-50">MORE DETAILS COMING SOON</div>
        <vue-dropzone
          v-if="!editingContent.logoUrl"
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
          :useCustomSlot="true"
          @vdropzone-file-added="logoSelected"
        >
          <span class="color-red font-bold">
            <img :src="`${$iconURL}Campaign/Group 9241.svg`" class="mr-10" />Upload company logo
          </span>
          <br />Or
          <br />
          <span class="color-dark-gray">Drag your file here</span>
        </vue-dropzone>
        <div v-else class="d-flex align-center justify-content-center">
          <img :src="editingContent.logoUrl" class="image-logo" />
          <div class="display-logo ml-50">
            <md-switch
              v-model="editingContent.visibleSettings.showLogo"
              class="showlogo-switch large-switch"
            ></md-switch>
            <div v-if="editingContent.visibleSettings.showLogo">Hide Logo</div>
            <div v-if="!editingContent.visibleSettings.showLogo">Show Logo</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import ConceptImageBlock from "@/components/ConceptImageBlock";
import MaryokuTextarea from "@/components/Inputs/MaryokuTextarea";
import SavedateAnalytics from "./components/SavedateAnalytics";
import { getBase64 } from "@/utils/file.util";
import TitleEditor from "./components/TitleEditor";
import swal from "sweetalert2";

const placeHolder =
  "Clear your schedule and get ready to mingle! the greatest event of the year is coming up! more details are yet to come, but we can already promise you it's going to be an event to remember. be sure to mark the date on your calendar. you can do it using this link: (google calendar link). see ya soon";
export default {
  components: {
    vueDropzone: vue2Dropzone,
    ConceptImageBlock,
    MaryokuTextarea,
    SavedateAnalytics,
    TitleEditor,
  },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
    defaultData: {
      type: Object,
      default: () => {},
    },
  },
  data: function () {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" },
      },
      logo: null,
      logoImageData: "",
      placeHolder: placeHolder,
      description: "",
      originContent: {
        title: "",
        descriptoin: "",
        logoUrl: "",
      },
      editingContent: {
        title: "",
        descriptoin: "",
        logoUrl: "",
        visibleSettings: {
          showLogo: true,
        },
      },
    };
  },
  created() {
    if (this.campaignData) {
      console.log("123123123");
      this.editingContent = this.campaignData;
    } else {
      this.editingContent.title = this.info.conceptName;
    }
    this.originContent = { ...this.editingContent };
    // console.log(this.info);
  },
  computed: {
    event() {
      console.log(this.$store.state.event.eventData);
      return this.$store.state.event.eventData;
    },
    concept() {
      return this.event.concept ? this.event.concept : null;
    },
    campaignData() {
      return this.$store.state.campaign.SAVING_DATE;
    },
  },
  methods: {
    saveData() {
      console.log(this.originContent);
      // this.$store.commit("campaign/setCampaign", {
      //   name: "SAVING_DATE",
      //   data: Object.assign({}, this.editingContent),
      // });
    },
    setDefault() {
      swal({
        title: "Are you sure?",
        text: `You won't be able to revert this!`,
        showCancelButton: true,
        confirmButtonClass: "md-button md-success btn-fill",
        cancelButtonClass: "md-button md-danger btn-fill",
        confirmButtonText: "Yes, revert it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.editingContent.title = this.originContent.title;
          this.editingContent.description = this.originContent.description;
          this.editingContent.logoUrl = this.originContent.logoUrl;
        }
      });
    },
    async logoSelected(file) {
      this.logo = file;
      this.logoImageData = await getBase64(file);
      this.editingContent.logoUrl = this.logoImageData;
      this.$emit("changeInfo", { field: "logo", value: this.logoImageData });
    },
    changeTitle(newTitle) {
      this.editingContent.title = newTitle;
      // this.saveData();
      // this.$emit("changeInfo", {field: "conceptName", value: newTitle})
    },
  },
  watch: {
    campaignData: {
      handler: (newValue) => {
        alert("222");
        console.log("newValue", newValue);
        console.log(this.editingContent);
        this.editingContent.title = newValue.title;
        console.log(this.editingContent);
        this.originContent = { ...this.editingContent };
        alert();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.campaign-save-date {
  .comment {
    background-color: #d4fbf0;
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