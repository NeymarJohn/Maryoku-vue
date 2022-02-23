<template>
    <modal class="upload-files-modal">
        <template slot="header">
            <div> <div>
                <div class="upload-files-title">Upload Files</div>
                <div class="upload-files-text">Drag and drop your files, you can upload several files together,
                    click here to upload files from your computer</div>
            </div>
                <div class="graph-close-button">
                    <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
                        <md-icon>clear</md-icon>
                    </md-button>
                </div>
            </div>
        </template>
        <template slot="body">
            <md-button class="md-button md-button md-red maryoku-btn md-theme-default change-cover-btn md-theme-default">Upload files</md-button>
        </template>
    </modal>
</template>

<script>
import { Modal } from "@/components";
export default {
    name: "FeedbackUploadFilesModal",
    components: {
        Modal,
    },
    methods: {
        close() {
            this.$emit("close");
        },
    },
    data() {
        return {};
    },

};
</script>

<style lang="scss" scoped>

.upload-files-title{
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.53;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
}
.upload-files-text{
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
    width: 460px;
}
</style>
