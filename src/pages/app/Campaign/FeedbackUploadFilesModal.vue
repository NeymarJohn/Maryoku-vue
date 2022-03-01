<template>
    <modal class="upload-files-modal">
        <template slot="header">
            <div>
                <div>
                    <div class="upload-files-title">Upload Files</div>
                    <div class="upload-files-text">Drag and drop your files, you can upload several files together,
                        click here to upload files from your computer
                    </div>
                </div>
                <div class="graph-close-button">
                    <md-button class="md-simple md-just-icon md-round modal-upload-files-close-button" @click="close">
                        <md-icon>clear</md-icon>
                    </md-button>
                </div>
            </div>
        </template>
        <template slot="body">
            <div class="upload-files-cube">
                <div class="upload-files-white-cube">
                    <md-button class="choose-file-button" @click="chooseFiles">
                        <img src="/static/icons/red-clip.svg">
                        <div class="ml-10">Choose File</div>
                    </md-button>
                    <div class="font-size-14">Or</div>
                    <div class="drag-your-file-text">Drag your file here</div>
                </div>
            </div>
            <div class="feedback-modal-bottom-block">
                <div class="d-flex">
                    <img src="/static/icons/red-delete-icon.svg" >
                    <div class="bottom-block-delete-text">Delete the images marked with V</div>
                </div>
                <div class="cancel-text-bottom-block" @click="close">Cancel</div>
                <md-button class="md-button md-button md-red maryoku-btn md-theme-default change-cover-btn md-theme-default" >Upload files</md-button>
            </div>

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
        chooseFiles() {
            document.getElementById("coverImage").click();
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
.upload-files-cube{
    width: 948.9px;
    height: 506px;
    margin: 0 auto;
    background-color: #f3f7fd;
    display: flex;
    justify-content: center;
    align-items: center;
}
.upload-files-white-cube{
    width: 876.8px;
    height: 430.8px;
    background-color: white;
    border: 1px dashed #818080;
}
.choose-file-button{
    background-color: #fff!important;
    width: 148px;
    height: 32px;
    border: solid 2px #f51355;
    color: #f51355!important;
    font-size: 14px;
    font-weight: 800;
    margin-top: 177px;
}
.drag-your-file-text{
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #818080;
}
.feedback-modal-bottom-block{
    width: 948px;
    margin: 65px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.cancel-text-bottom-block{
    font-size: 16px;
    color: #000;
    font-weight: bold;
    margin-left: 350px;
    cursor: pointer;
}
.bottom-block-delete-text{
    font-size: 16px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.34px;
    text-align: left;
    color: #f51355;
    margin-left: 14px;
    margin-top: 7px;
    cursor: pointer;
}
</style>
