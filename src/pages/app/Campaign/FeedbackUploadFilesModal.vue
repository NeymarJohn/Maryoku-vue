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
                <div v-if="fileName" class="uploaded-files-block">
                    <div class="uploaded-files-text">
                        {{fileName}}
                    </div>
                    <span @click="fileName = null"><md-icon class="close-icon-style">close</md-icon></span>
                </div>
            </div>
        </template>
        <template slot="body">
            <div class="upload-files-cube">
                <div class="upload-files-white-cube">
                    <vue-dropzone
                        ref="myVueDropzone"
                        id="dropzone"
                        :options="dropzoneOptions"
                        :useCustomSlot="true"
                        @vdropzone-file-added="fileAdded"
                        class="file-drop-zone upload-section text-center drop feedback-drop-zone"
                        v-if="!fileName"
                    >
                        <md-button class="choose-file-button">
                            <img src="/static/icons/red-clip.svg">
                            <div class="ml-10">Choose File</div>
                        </md-button>
                        <div class="font-size-14">Or</div>
                        <div class="drag-your-file-text">Drag your file here</div>
                    </vue-dropzone>

<!--                    <md-button class="choose-file-button" @click="chooseFiles">-->
<!--                        <img src="/static/icons/red-clip.svg">-->
<!--                        <div class="ml-10">Choose File</div>-->
<!--                    </md-button>-->
<!--                    <div class="font-size-14">Or</div>-->
<!--                    <div class="drag-your-file-text">Drag your file here</div>-->
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
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import S3Service from "@/services/s3.service";
export default {
    name: "FeedbackUploadFilesModal",
    components: {
        Modal,
        vueDropzone: vue2Dropzone,
    },
    methods: {
        close() {
            this.$emit("close");
        },
        chooseFiles() {
            document.getElementById("coverImage").click();
        },
        async fileAdded(file) {
            const extension = file.type.split("/")[1];
            let fileName = new Date().getTime();
            this.fileName = file.name;
            S3Service.fileUpload(file, `${fileName}`, `events/proposal`).then((res) => {
                this.isLoading = false;
                this.fileUrl = res;
            });
        },
    },
    data() {
        return {
            dropzoneOptions: {
                url: "https://httpbin.org/post",
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: { "My-Awesome-Header": "header value" },
            },
            fileName: null,
        };
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
.feedback-drop-zone{
    border: none;
    height: 100%;
    background-color: #fff;
}
.uploaded-files-block{
    position: absolute;
    top:160px;
    width: 200px;
    height: 51px;
    border: 1px solid #f51355;
    border-radius: 20px;
    display: flex;
}
.uploaded-files-text{
    width: 160px;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.29px;
    text-align: left;
    color: #707070;
    padding: 13px 0px 0px 17px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.close-icon-style{
    padding: 15px 0px 0px 5px;
    color: #0caf50;
    cursor: pointer;
}
</style>
