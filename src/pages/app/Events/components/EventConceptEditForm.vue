<template>
  <div class="create-concept-from">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />
    <div class="form-name font-bold-extra font-size-30 mb-50">Create Your Own Concept</div>
    <div class="form-content">
      <div class="form-group">
        <label>What should we call it?</label>
        <input
          type="text"
          class="form-control"
          placeholder="Type your concept here…"
          v-model="editConcept.name"
        />
      </div>
      <div class="form-group add-tags-field">
        <label style="margin-bottom:1em; display:inline-block">
          Tags
          <small>*suggested</small>
        </label>
        <!-- <input
          type="text"
          v-model="newTag"
          class="form-control"
          placeholder="Type your concept here…"
        />
        <div class="add-tags-actions text-right">
          <md-button class="md-red md-maryoku" @click="addTag">add Tag</md-button>
        </div>-->
        <!-- <multiselect
          v-model="selectedTag"
          :options="taggingOptions"
          :close-on-select="true"
          :clear-on-select="true"
          tag-placeholder="Add this as new tag"
          placeholder="Type to search or add tag"
          label="name"
          track-by="name"
        ></multiselect>
        <div class="add-tags-actions text-right">
          <md-button class="md-red md-maryoku" @click="addTag">add Tag</md-button>
        </div> -->

      </div>

      <div class="tags-list" >
        <div class="tags-list-wrapper d-flex justify-content-start" :class="{expanded:tagExpanded}">
          <template v-for="(tag, index) in taggingOptions" >
            <div v-if="tag.selected"  class="tags-list__item" :class="{selected:tag.selected}" :key="index" @click="removeTag(tag, index)" >
              {{tag.name}}
              <img  :src="`${$iconURL}Concept/Asset 489.svg`"  />
            </div>
            <div v-else  class="tags-list__item" :class="{selected:tag.selected}" :key="index" @click="addTag(tag, index)" >
              {{tag.name}}
              <img  :src="`${$iconURL}Concept/plus-red.svg`" @click="addTag(tag,index)" />
            </div>
          </template>
          
          <div style="flex-grow:1"></div>
        </div>
        <md-button @click="tagExpanded = !tagExpanded" class="md-button md-red md-sm md-simple edit-btn md-theme-default" style="margin-top:20px !important">
          <span v-if="!tagExpanded">Show More <md-icon class="font-size-30">keyboard_arrow_right</md-icon></span>
          <span v-if="tagExpanded">Show Less <md-icon class="font-size-30">keyboard_arrow_up</md-icon></span>
        </md-button>
      </div>
      <div class="form-group" style="margin-top:50px">
        <label>Tell us more</label>
        <p>The more we know, the better services we can find for you</p>
        <textarea
          rows
          class="form-control"
          placeholder="Write description here"
          v-model="editConcept.description"
        ></textarea>
      </div>

      <div class="form-group">
        <label>Add Colors</label>
        <div class="colors-list d-flex justify-content-start">
          <div
            v-for="(colorItem, index) in editConcept.colors"
            :key="index"
            style="margin-right: 30px"
          >
            <color-button v-model="editConcept.colors[index]"></color-button>
            <!-- <md-button class="colors-list__item md-just-icon" :style="`background: ${color.value} !important`" @click="addColor(index)" v-if="color.value"></md-button> -->
            <!-- <md-button class="colors-list__item colors-list__add md-just-icon" @click="addColor(index)" v-else><img :src="`${conceptIconsURL}Asset 488.svg`"></md-button> -->
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>
          Create your mood board
          <small>(5 photos top, under 20 KB)</small>
        </label>
        <p>Drag the photos to the empty frames or click on each one of them to create your photos board</p>
      </div>

      <div class="images-list new-concept">
        <div class="image-backgrounds">
          <!-- <div class="image-background" :style="`background: #ff48b2`"></div> -->

          <div
            class="image-background"
            v-for="idx in 4"
            :key="idx"
            :style="`background-color: ${editConcept.colors[idx-1].value}; opacity:${editConcept.colors[idx-1].opacity}`"
          ></div>
        </div>
        <div>
          <div :class="`images-list__item`" v-for="indx in 5" :key="indx">
            <div
              class="image-section d-flex justify-content-center align-center text-center"
              :style="`background:url(${uploadImageData[indx-1]})`"
              :for="`file-${indx}`"
            >
              <label class="image-selector" :for="`file-${indx}`" style="cursor:pointer">
                <div  v-if="!uploadImageData[indx-1]">
                  <img :src="`${$iconURL}Concept/Asset 488.svg`" style="width:24px" />
                  <br />
                  <div style="margin-top:5px">
                    <img :src="`${$iconURL}Concept/image-dark.svg`" style="width:16px" /> Add Photo
                  </div>
                </div>
              </label>
              <input
                style="display: none"
                :id="`file-${indx}`"
                name="attachment"
                type="file"
                multiple="multiple"
                :data-fileIndex="indx-1"
                @change="onFileChange"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="concept-actions d-flex justify-content-end align-center">
        <md-button class="md-red md-bold" @click="saveConcept">Save my brilliant concept</md-button>
      </div>
    </div>
  </div>
</template>                    
<script>
import Multiselect from "vue-multiselect";

import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import EventComponent from "@/models/EventComponent";
import EventConcept from "@/models/EventConcept";
import ColorButton from "@/components/ColorButton";
import swal from 'sweetalert2'

const tags = [
  { name: "adventurous", selected:false},
  { name: "artistic", selected:false},
  { name: "festive", selected:false},
  { name: "formal", selected:false},
  { name: "competitive", selected:false},
  { name: "conservative", selected:false},
  { name: "challenging", selected:false},
  { name: "classy", selected:false},
  { name: "casual", selected:false},
  { name: "educational", selected:false},
  { name: "fun", selected:false},
  { name: "social/green", selected:false},
  { name: "styled", selected:false},
  { name: "trendy", selected:false},
  { name: "authentic", selected:false},
  { name: "elegant", selected:false},
  { name: "innovative", selected:false},
  { name: "indoors", selected:false},
  { name: "mysterious", selected:false},
  { name: "global", selected:false},
  { name: "laid back", selected:false},
  { name: "luxurious", selected:false},
  { name: "productive", selected:false},
  { name: "relaxed", selected:false},
  { name: "cultural", selected:false},
  { name: "inclusive", selected:false },
  { name: "outdoors", selected:false }
];

const initialConcept = {
  name: "",
  description: "",
  tags: [],
  colors: [
    { value: "#ff48b2", opacity: 1 },
    { value: "#71ecf8", opacity: 1 },
    { value: "" },
    { value: "" }
  ],
  images: []
};
export default {
  name: "event-concept-edit-form",
  components: {
    ColorButton,
    Multiselect
  },
  props: {
    defaultConcept: [Object]
  },
  data: () => ({
    isLoading: false,
    tagExpanded:false,
    editConcept: this.defaultStatus ? this.defaultConcept : initialConcept,
    newTag: "",
    uploadImages: {},
    selectedTag: {},
    addedTags: [],
    taggingOptions: tags.sort((a,b)=> a.name >b.name?1:-1),
    uploadImageData: {
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: ""
    }
  }),
  methods: {
    // addTag() {
    //   if (this.newTag && this.newTag.length) {
    //       this.editConcept.tags.push({name: this.newTag});
    //   }
    //   this.newTag = "";
    // },
    addTag(newTag, tagIndex) {
      this.editConcept.tags.push(newTag);
      this.taggingOptions[tagIndex].selected = true
    },
    removeTag(tag, index) {
      const selectedIndex = this.editConcept.tags.findIndex(
        item => item.name === tag.name
      );
      this.taggingOptions[index].selected = false
      this.editConcept.tags.splice(selectedIndex, 1);
    },
    onFileChange(event) {
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      if (files[0].size > 1024 * 1024 * 5) {
        swal({
          title: 'File is too big',
          text: `Sorry, this miximum file size is 5M`,
          showCancelButton: false,
          type: 'warning',
          showCancelButton: true,
          confirmButtonClass: 'md-button md-success confirm-btn-bg ',
          cancelButtonClass: 'md-button md-danger cancel-btn-bg',
          confirmButtonText: 'Yes, delete it!',
          buttonsStyling: false
        }).then(result => {
          
        })
        return;
      }
      let reader = new FileReader();
      let vm = this;
      if (event.target.name) {
        const itemIndex = event.target.getAttribute("data-fileIndex");
        let isLargeFile = false;
        this.uploadImages[itemIndex] = files[0];
        this.uploadImageData[itemIndex] = URL.createObjectURL(files[0]);
        this.uploadImage = URL.createObjectURL(files[0]);
      }
    },
    async saveConcept() {
      let calendar = new Calendar({ id: this.$store.state.auth.user.profile.defaultCalendarId });
      let imageKeys = Object.keys(this.uploadImages);
      this.isLoading = true;

      let formData = new FormData();
      const fileNames = [];
      for (let i = 0; i < imageKeys.length; i++) {
        const fileItem = this.uploadImages[imageKeys[i]];
        formData.append("files[]", fileItem);
        fileNames.push({
          name: fileItem.name,
        })
      }

      // Create Concept
      if (fileNames.length > 0) {
        this.editConcept.images = fileNames;
      }
      const evenConcept = await new EventConcept(this.editConcept).save();
      fileNames.forEach((item, index)=>{
        fileNames[index].url = `concept/${evenConcept.id}/${item.name}`
      })
      this.isLoading = false;
      this.$emit("saved", evenConcept, this.uploadImages);

      // formData.append("file", fileItem);
      formData.append("from", "concept");
      formData.append("folder", evenConcept.id);
      const result = await this.$http.post(
        `${process.env.SERVER_URL}/uploadMultipleFiles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log("response", evenConcept);
    }
  },
  created() {
    if (this.defaultConcept) {
      this.editConcept = this.defaultConcept;
      this.editConcept.images.forEach((image, i) => {
        this.uploadImageData[i] = `${this.$storageURL}concept/${this.editConcept.id}/${image.name}`;
      });
    }
  },
  mounted() {
    this.taggingOptions.forEach((item, index) => {
      if (this.editConcept.tags.findIndex(tag=>tag.name === item.name) >=0 ) {
        this.taggingOptions[index].selected = true
      }
    })
    // if (this.defaultConcept) {
    //   this.editConcept = this.defaultConcept;
    //   this.editConcept.images.forEach((image, i) => {
    //     this.uploadImageData[i] = this.$resourceURL + image.url;
        
    //   });
    //   console.log(this.uploadImageData);
    // }
  }
};
</script>

<style lang="scss" scoped>

// .image-section {
//   &:hover {
//     opacity: 0.5 !important;
//   }
// }
.image-selector {
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>