<template>
  <div class="time-line-blocks_selected-items_item time-line-item">
    <img
      class="time-line-icon"
      :src="`${$iconURL}Timeline-New/${item.icon.toLowerCase()}-circle.svg`"
    />
    <md-card
      class="block-form"
      v-if="!item.dateCreated || item.mode === 'edit'"
      :style="`border-left : 5px solid ` + item.color"
      ref="timeline-edit-card"
      id="timeline-edit-card"
    >
      <vue-element-loading :active.sync="item.isItemLoading" spinner="ring" color="#FF547C" />
      <md-card-content class="md-layout">
        <div class="md-layout-item md-size-100">
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="item.title" />
          </div>
        </div>
        <div class="md-layout-item md-size-45">
          <div class="form-group">
            <label>Start At</label>
            <time-input v-model="item.startTime" :h24="false" displayFormat="hh:mm"></time-input>
          </div>
        </div>
        <div
          class="md-layout-item md-size-10 d-flex justify-content-center align-center"
          style="position : relative"
        >
          <div class="divider"></div>
        </div>
        <div class="md-layout-item md-size-45">
          <div class="form-group">
            <label>Finishes At</label>
            <time-input v-model="item.endTime" :h24="false" displayFormat="hh:mm"></time-input>
          </div>
        </div>
        <div class="md-layout-item md-size-100">
          <div class="form-group">
            <label>Description</label>
            <textarea row="100" type="text" class="form-control" v-model="item.description"></textarea>
          </div>
        </div>
        <div class="md-layout-item md-size-100 margin-bottom">
          <div class="form-group">
            <label>Location</label>
            <location-input v-model="item.location"></location-input>
          </div>
        </div>
        <div class="md-layout-item md-size-100">
          <div class="form-group">
            <label>
              Attach File
              <small>*suggested</small>
            </label>
            <p class="item-attachment" v-if="item.attachments && item.attachments.length>0">
              <span
                v-for="(attachmentItem, attachmentIndex) in item.attachments"
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
              :data-item="item.id"
              :data-timelineindex="timelineIndex"
              :data-itemIndex="index"
              @change="onFileChange"
            />
          </div>
        </div>
      </md-card-content>
      <md-card-actions md-alignment="right" style="border: none;" class="edit-timeline-footer">
        <md-button
          name="event-planner-tab-timeline-item-save"
          class="event-planner-tab-timeline-item-save md-default md-simple"
          @click="cancelTimelineItem(item, timelineIndex, index)"
        >Cancel</md-button>
        <md-button
          :disabled="item.isItemLoading"
          name="event-planner-tab-timeline-item-save"
          class="event-planner-tab-timeline-item-save md-red"
          v-if="!item.dateCreated"
          @click="saveTimelineItem(item, index, timelineItem.itemDay)"
        >Save</md-button>
        <md-button
          :disabled="item.isItemLoading"
          name="event-planner-tab-timeline-item-edit"
          class="event-planner-tab-timeline-item-edit md-red"
          v-else
          @click="updateTimelineItem(item)"
        >Save</md-button>
      </md-card-actions>
    </md-card>
    <!-- 
    <md-card
      class="block-info"
      v-if="!item.mode || item.mode === 'saved' "
      :style="`border-left : 5px solid ` + item.color"
    >
      <vue-element-loading :active.sync="item.isItemLoading" spinner="ring" color="#FF547C" />
      <md-card-content style="min-height: 80px;">
        <div class="item-title-and-time">
          <span class="item-time">{{ formatHour(item.startTime) }} - {{ formatHour(item.endTime)}}</span>
          <span
            class="item-title"
            style="font-weight: 500; display: inline-block;"
            v-if="item.title"
          >{{item.title }}</span>

          <p class="item-desc">{{ item.description }}</p>
          <p class="item-attachment" v-if="item.attachments && item.attachments.length>0">
            <span
              v-for="(attachmentItem) in item.attachments"
              :key="attachmentItem.url"
              @click="openAttachment(attachmentItem.url)"
              class="attachment-link"
            >
              <md-icon>attachment</md-icon>
              {{ attachmentItem.originalName }}
            </span>
          </p>
          <p class="item-location" v-if="item.location">
            <img :src="`${timelineIconsURL}place.svg`" width="20" style="width:18px" />
            <span>{{ item.location }}</span>
          </p>
          <div class="attachment" style="display : none;">
            <a href>
              <md-icon>attachment</md-icon>file name
            </a>
          </div>
          <md-button class="md-simple timeline-action">
            <img :src="`${timelineIconsURL}GoToProposal.svg`" width="20" /> Go To Proposal
          </md-button>
          <br />
          <md-button class="md-simple timeline-action">
            <img :src="`${timelineIconsURL}ContactVendor.svg`" width="20" /> Contact Vendor
          </md-button>
        </div>

        <div class="card-actions">
          <md-button
            name="event-planner-tab-timeline-item-edit"
            class="event-planner-tab-timeline-item-edit md-red md-simple md-xs md-round"
            @click="modifyItem(item)"
          >Edit</md-button>
          <md-button
            name="event-planner-tab-timeline-item-delete"
            class="event-planner-tab-timeline-item-delete md-simple md-xs md-just-icon md-round"
            @click="removeItem(item)"
          >
            <md-icon>delete_outline</md-icon>
          </md-button>
        </div>
      </md-card-content>
    </md-card>-->
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    console.log(this.item);
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
  }
  .time-line-icon {
    width: 60px;
    margin-top: 15px;
  }
}
</style>