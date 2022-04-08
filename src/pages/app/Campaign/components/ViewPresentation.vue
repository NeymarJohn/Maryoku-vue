<template>
  <div class="view-presentation-main">
    <img v-if="coverImage" class="view-presentation-cover-image" :src="coverImage">
    <div class="view-presentation-content">
      <div v-if="isEdit">
        <div class="wrapper-icon-play">
          <img
            width="77"
            height="77"
            src="https://cdn.zeplin.io/5e24629a581f9329a242e986/assets/9b892cf0-5507-4cdb-9828-1d10baa61381.svg"
          >
        </div>
        <div class="wrapper-btn-switch">
          <hide-switch class="btn-switch" label="View A Presentation From The Event Photos" />
        </div>
      </div>
      <div v-else>
        <img
          width="77"
          height="77"
          src="static/icons/play-white.svg"
          @click="$emit('on-play', $event)"
        >
      </div>
    </div>
    <div v-if="!isEdit" class="view-presentation-footer">
      <img
        class="view-presentation-footer-icon-arrow-up"
        src="static/icons/arrow-up-red.svg"
      >
      <div class="view-presentation-footer-action-download">
        <span @click="downloadFiles" class="view-presentation-footer-action-download-text">
          Download the presentation
        </span>
        <button
          class="view-presentation-footer-action-download-button md-dense md-raised"
          @click="toggleMenuSelectDownloadFiles"
        >
          <md-icon class="view-presentation-footer-action-download-button-icon">
            {{ showMenuSelectDownloadFiles ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
          </md-icon>
        </button>
        <div v-if="showMenuSelectDownloadFiles" class="view-presentation-footer-menu-select-download-files">
          <ul class="view-presentation-footer-menu-select-download-files-checkbox-list">
            <li
              v-for="listItem of listMenu"
              :key="listItem.id"
              :class="{
                'view-presentation-footer-menu-select-download-files-checkbox-list-item': true,
                'view-presentation-footer-menu-select-download-files-checkbox-list-item-active': listItem.checkbox
              }"
            >
              <md-checkbox
                v-model="listItem.checkbox"
                class="checkbox"
              />
              <span class="text">
                {{ listItem.title }}
              </span>
            </li>
          </ul>
          <span class="view-presentation-footer-menu-select-download-files-description">
            (Mark in V the presentation you want to appear in the main view)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import HideSwitch from "@/components/HideSwitch";

export default {
  name: "ViewPresentation",
  components: {
    HideSwitch,
  },
  props: {
    coverImage: String,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showMenuSelectDownloadFiles: false,
      listMenu: [
        {
          id: 1,
          checkbox: true,
          type: "image",
          title: "Download images",
        },
        {
          id: 1,
          checkbox: false,
          type: "document",
          title: "Download Documents",
        },
        {
          id: 1,
          checkbox: true,
          type: "video",
          title: "Download Videos",
        },
      ]
    };
  },
  methods: {
    downloadFiles(event) {
      if (this.showMenuSelectDownloadFiles) {
        this.toggleMenuSelectDownloadFiles();
      }
      this.$emit("download-files", event);
    },
    toggleMenuSelectDownloadFiles() {
      this.showMenuSelectDownloadFiles = !this.showMenuSelectDownloadFiles;
      if (this.showMenuSelectDownloadFiles === false) {
        const selectedDownloadFiles = this.listMenu
          .filter(({ checkbox }) => checkbox)
          .map(({ type }) => type);
        this.$emit("selected-download-files", selectedDownloadFiles);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.view-presentation-main {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);

  img.view-presentation-cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(60%);
    border-radius: 30px;
  }

  .view-presentation-content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 1;

    &> div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .wrapper-icon-play {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .wrapper-btn-switch {
        width: 40%;
        display: flex;
        align-items: center;
      }
    }
  }

  .view-presentation-footer {
    display: flex;
    position: absolute;
    bottom: -50px;

    .view-presentation-footer-icon-arrow-up {
      width: 24px;
      height: 24px;
    }

    .view-presentation-footer-action-download {
      margin-left: 10px;

      .view-presentation-footer-action-download-text {
        font-size: 16px;
        font-weight: 800;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.34px;
        text-align: left;
        text-decoration: underline;
        color: #f51355;
        cursor: pointer;
      }

      .view-presentation-footer-action-download-button {
        width: 24px;
        height: 24px;
        padding: 0;
        border: none;
        outline: none;
        background-color: initial;

        .view-presentation-footer-action-download-button-icon {
          font-size: 24px;
          color: #f51355;
          cursor: pointer;
        }
      }

      .view-presentation-footer-menu-select-download-files {
        width: 548px;
        height: 249px;
        position: absolute;
        top: 40px;
        left: 0;
        padding: 32px;
        border-radius: 3px;
        box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.13);
        background-color: #fff;
        z-index: 1;

        .view-presentation-footer-menu-select-download-files-checkbox-list {
          margin: 0;
          padding: 0;

          .view-presentation-footer-menu-select-download-files-checkbox-list-item {
            display: flex;
            align-items: center;
            padding: 5px;

            .checkbox {
              margin: 0 10px 0 0;
            }

            .text {
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: 2.88;
              letter-spacing: normal;
              text-align: left;
              color: #050505;
            }

          }

          .view-presentation-footer-menu-select-download-files-checkbox-list-item-active .text {
            font-size: 16px;
            font-weight: 800;
            font-stretch: normal;
            font-style: normal;
            line-height: 2.88;
            letter-spacing: normal;
            text-align: left;
            color: #050505;
          }
        }

        .view-presentation-footer-menu-select-download-files-description {
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          text-align: left;
          color: #707070;
        }
      }
    }
  }
}
</style>
