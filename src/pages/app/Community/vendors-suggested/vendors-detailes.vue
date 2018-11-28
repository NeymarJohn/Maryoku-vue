<template>
    <div class="md-layout-item md-size-100">
        <div class="grid-for-suggested">
            <div class="md-card_comment_person md-layout-item md-medium-size-100 md-size-100 m-top-50">
                <div class="md-card_comment_person_photo m-left-12">
                </div>
                <div class="md-card_comment_person_info" style="display: block">
                    <div class="md-card_comment_person_info_name">
                        <span>Ella Moor</span>
                    </div>
                    <div class="md-card_comment_person_info_time">
                        <span>Playbuzz</span>
                    </div>
                </div>

            </div>
            <md-card class="bg-rose">
                <md-card-content>
                    <div class="md-medium-size-100 md-size-100">
                        <div class="card-content">
                            <div class="card-content_img">
                                <img src="static/img/faces/avatar.jpg" alt="">
                            </div>
                            <div class="card-content_info">
                            <div class="card-content_info_title">
                                <h5 class="card-content_info_title_bold">Pinup Photoshoot</h5>
                            </div>
                            <div class="card-content_info_address">
                                <h5 class="card-content_info_address_margin">Address</h5>
                            </div>
                                <div class="card-content_info_contact">
                                    <h5 class="card-content_info_contact_spaceBottom">Contact Info</h5>
                                </div>
                                <div class="card-content_info_price">
                                    <h5 class="card-content_info_price_space">Recommended price <span>$45</span> p/p</h5>
                                </div>
                                <div class="card-content_info_ranking">
                                    <h5 class="card-content_info_ranking_margin">
                                        Vendor Ranking <span>4.5</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>
<style lang="scss">
    .m-top-50{
        margin-top: 50px;
    }
    .m-left-12{
        margin-left: 12px;
    }
    .grid-for-suggested{
        display: grid;
        grid-template-columns: 1fr 7fr;
    }
    .card-content {

        color: #5A5A5A !important;

        &_img {
            width: fit-content;
            height: 200px;
            background: gray;
            float: left;

            & img {
                width: auto;
                height: 100%;
                object-fit: contain;
            }
        }
        &_info {

            float: left;
            margin-left: 30px;

            &_title , &_address, &_contact, &_price, &_ranking {

                font-size: 20px;
                display: block;

                &_margin{
                    margin-top: 0px;
                    margin-bottom: 0px;
                }

                &_spaceBottom{
                    margin-top: 0px;
                }

                &_space{
                    margin-bottom: 0px;
                }

                &_bold {
                    font-weight: bold;
                    margin-top: 15px;
                    margin-bottom: 0px;
                }
            }
        }
    }
</style>