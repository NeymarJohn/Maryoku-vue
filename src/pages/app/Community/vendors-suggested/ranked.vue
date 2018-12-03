<template>
    <div>
        <md-card class="bg-rose">
            <md-card-content>
                <div class="md-medium-size-100 md-size-100">
                    <div class="card-content_info_title">
                        <h5 class="ranked-title">Best Ranked Pinup Studios</h5>
                    </div>
                </div>
                <div class="md-medium-size-100 md-size-100">
                    <div class="ranked-images">
                        <img src="static/img/faces/avatar.jpg" alt="">
                    </div>
                    <div class="ranked-images">
                        <img src="static/img/faces/avatar.jpg" alt="">
                    </div>
                    <div class="ranked-images">
                        <img src="static/img/faces/avatar.jpg" alt="">
                    </div>
                    <div class="ranked-images">
                        <img src="static/img/faces/avatar.jpg" alt="">
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>
<style lang="scss">
    .ranked {
        color: #5A5A5A;

        &-title{
            margin-top: 0px;
            font-size: 20px;
            font-weight: 500;
            color: #5A5A5A;
        }
        &-images{
            margin-top: 20px;
            margin-right: 50px;
            width: fit-content;
            height: 150px;
            float: left;

            &:not(:first-child){
                border-left: 1px solid #5A5A5A;
                padding-left: 50px;
            }
            &:first-child{
                padding-left: 50px;
            }
            & img {
                width: auto;
                height: 100%;
                max-width: 150px;
                object-fit: contain;
            }

        }
    }

</style>