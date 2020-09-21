<template>
  <div class="time-line-blocks_selected-items_item time-line-item">
    <img
      class="time-line-icon"
      :src="`${$iconURL}Timeline-New/${editingContent.icon.toLowerCase()}-circle.svg`"
    />
    <md-card
      class="block-form"
      v-if="editingContent.mode === 'edit'"
      :style="`border-left : 5px solid ` + editingContent.color"
      ref="timeline-edit-card"
      id="timeline-edit-card"
    >
      <vue-element-loading
        :active.sync="editingContent.isItemLoading"
        spinner="ring"
        color="#FF547C"
      />
      <md-card-content class="md-layout">
        <div class="md-layout-item md-size-100 mb-20">
          <span
            class="font-size-20 font-bold text-trans text-transform-capitalize"
            :style="`color:${editingContent.color};`"
          >{{editingContent.buildingBlockType}}</span>
          <img :src="`${$iconURL}Timeline-New/tip.svg`" class="label-icon" style="margin-left:50px" />
          <span>70% of events like yours timed 30 minuets to this slot</span>
        </div>

        <div class="md-layout-item md-size-100">
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="editingContent.title" />
          </div>
        </div>
        <div class="md-layout-item md-size-100">
          <md-button class="md-simple edit-btn" @click="showDescription=!showDescription">
            <img :src="`${$iconURL}Timeline-New/circle-plus.svg`" class="label-icon mr-10" />
            <span class="color-red">Add Description</span>
            <span class="color-black font-size-14">(Optional)</span>
          </md-button>
          <div class="form-group" v-if="showDescription">
            <label>Description</label>
            <textarea
              row="100"
              type="text"
              class="form-control"
              v-model="editingContent.description"
            ></textarea>
          </div>
        </div>
        <div class="md-layout-item md-size-100 mt-50 d-flex">
          <div class="form-group">
            <label class="font-size-16">
              <img :src="`${$iconURL}Timeline-New/clock.svg`" class="label-icon mr-10" />Start At
            </label>
            <time-input
              v-model="editingContent.startTime"
              :h24="false"
              displayFormat="hh:mm"
              size="normal"
            ></time-input>
          </div>
          <div class="divider"></div>
          <div class="form-group">
            <label class="font-size-16">
              <img :src="`${$iconURL}Timeline-New/clock.svg`" class="label-icon mr-10" />Finishes At
            </label>
            <time-input
              v-model="editingContent.endTime"
              :h24="false"
              displayFormat="hh:mm"
              size="normal"
            ></time-input>
          </div>
        </div>
        <div class="md-layout-item md-size-100">
          <div class="form-group">
            <label class="font-size-16">Assign vendor to slot</label>
            <textarea
              row="100"
              type="text"
              class="form-control"
              v-model="editingContent.description"
            ></textarea>
          </div>
        </div>
        <!-- <div class="md-layout-item md-size-100 margin-bottom">
          <div class="form-group">
            <label>Location</label>
            <location-input v-model="editingContent.location"></location-input>
          </div>
        </div>-->
        <!-- <div class="md-layout-item md-size-100">
          <div class="form-group">
            <label>
              Attach File
              <small>*suggested</small>
            </label>
            <p class="item-attachment" v-if="editingContent.attachments && editingContent.attachments.length>0">
              <span
                v-for="(attachmentItem, attachmentIndex) in editingContent.attachments"
                :key="attachmentItem.url"
                class="attachment-link"
              >
                <md-icon>attachment</md-icon>
                <span
                  @click="openAttachment(attachmentItem.url)"
                  class="attachment-name"
                >{{ attachmentItem.originalName }}</span>
                <span @click="removeAttachment(item, attachmentIndex)">
                  <md-icon class="remove-attachment">close</md-icon>
                </span>
              </span>
            </p>
            <label class="upload-section">
              <label
                class="md-rose md-outline md-simple md-sm attachment"
                for="file"
                style="cursor:pointer"
              >
                <md-icon>attachment</md-icon>Choose file(10MB)
              </label>
              <div>
                <span
                  v-for="(file, index) in currentAttachments"
                  :key="index"
                  class="attachment-link"
                >
                  {{ file.name}}
                  <span @click="removeSelectedAttachment(index)">
                    <md-icon class="remove-attachment">close</md-icon>
                  </span>
                </span>
              </div>
            </label>

            <input
              style="display: none"
              id="file"
              name="attachment"
              type="file"
              multiple="multiple"
              :data-item="editingContent.id"
              :data-timelineindex="timelineIndex"
              :data-itemIndex="index"
              @change="onFileChange"
            />
          </div>
        </div>-->
      </md-card-content>
      <md-card-actions md-alignment="right" style="border: none;" class="edit-timeline-footer">
        <md-button
          name="event-planner-tab-timeline-item-save"
          class="maryoku-btn md-default md-simple"
          @click="cancelTimelineItem(item, timelineIndex, index)"
        >Cancel</md-button>
        <md-button
          :disabled="!saveAvailable"
          name="event-planner-tab-timeline-item-save"
          class="maryoku-btn md-red"
          v-if="!editingContent.dateCreated"
          @click="saveTimelineItem"
        >Save</md-button>
        <md-button
          :disabled="editingContent.isItemLoading"
          name="event-planner-tab-timeline-item-edit"
          class="event-planner-tab-timeline-item-edit md-red"
          v-else
          @click="updateTimelineItem(item)"
        >Save</md-button>
      </md-card-actions>
    </md-card>
    <md-card
      class="block-form"
      v-if="!editingContent.mode || editingContent.mode === 'saved' "
      :style="`border-left : 5px solid ` + editingContent.color"
    >
      <vue-element-loading
        :active.sync="editingContent.isItemLoading"
        spinner="ring"
        color="#FF547C"
      />
      <md-card-content style="min-height: 80px;">
        <div class="item-title-and-time">
          <span
            class="item-time font-size-20 color-dark-gray"
          >{{ formatHour(editingContent.startTime) }} - {{ formatHour(editingContent.endTime)}}</span>
          <p>
            <span
              class="font-size-20 font-bold-extra mr-20"
              v-if="editingContent.title"
            >{{editingContent.title }}</span>
            <md-button
              class="md-button edit-btn md-red md-simple"
              @click="showDescription=!showDescription"
              style="margin:3px !important;"
              v-if="editingContent.description"
            >
              <span v-if="!showDescription" class="color-red font-regular">Read More</span>
              <span v-if="showDescription" class="color-black font-regular">Read Less</span>
              <md-icon v-if="!showDescription">keyboard_arrow_down</md-icon>
              <md-icon v-if="showDescription">keyboard_arrow_up</md-icon>
            </md-button>
          </p>

          <p class="item-desc" v-if="showDescription">{{ editingContent.description }}</p>
          <p
            class="item-attachment"
            v-if="editingContent.attachments && editingContent.attachments.length>0"
          >
            <span
              v-for="(attachmentItem) in editingContent.attachments"
              :key="attachmentItem.url"
              @click="openAttachment(attachmentItem.url)"
              class="attachment-link"
            >
              <md-icon>attachment</md-icon>
              {{ attachmentItem.originalName }}
            </span>
          </p>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
import TimeInput from "@/components/Inputs/TimeInput";
import moment from "moment";

export default {
  components: {
    TimeInput,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showDescription: false,
      editingContent: {},
    };
  },
  mounted() {
    console.log("thjis.item", this.item);
    this.editingContent = this.item;
  },
  computed: {
    saveAvailable() {
      return this.editingContent.startTime && this.editingContent.endTime;
    },
  },
  methods: {
    saveTimelineItem() {
      console.log(this.editingContent);
      this.editingContent.mode = "saved";
      this.$emit("save", { item: this.editingContent, index: this.index });
    },
    formatDate(date) {
      if (typeof date == "number") {
        return moment(new Date(date)).format("MM/DD/YY");
      }
      return moment(date).format("MM/DD/YY");
    },
    formatHour(date) {
      return moment(new Date(Number(date))).format("hh:mm A");
    },
  },
};
</script>
<style lang="scss" scoped>
.time-line-item {
  display: flex;
  align-items: flex-start;
  .block-form {
    margin: 0;
    margin-left: 20px;
    padding: 20px 20px;
  }
  .time-line-icon {
    width: 60px;
    margin-top: 15px;
  }
  .divider {
    width: 20px;
    height: 1px;
    background: #050505;
    top: 0;
    left: 22px;
    bottom: 0;
    margin: auto;
  }
}
</style>