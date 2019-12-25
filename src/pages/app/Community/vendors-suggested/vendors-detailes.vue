<template>
    <div>
    <div class="md-layout-item md-size-100">
            <md-card class="bg-rose">
                <md-card-content>
                        <div class="md-card_comment_person md-medium-size-100 md-size-100">
                            <div class="md-card_comment_person_photo">
                            </div>
                            <div class="md-card_comment_person_info">
                                <div class="md-card_comment_person_info_name">
                                    <span>Ella Moor</span>
                                </div>
                                <div class="md-card_comment_person_info_time">
                                    <span>Playbuzz</span>
                                </div>
                            </div>
                            <div class="info_time">
                                <span>5 hours ago</span>
                            </div>
                        </div>
                    <div class="md-medium-size-100 md-size-100 m-top-50">
                        <div class="card-content grid-col">
                            <div class="img-holder">
                            <div class="card-content_img">
                                <img src="http://static.maryoku.com/storage/img/faces/avatar.jpg" alt="">
                            </div>
                                <div class="card-content_img">
                                    <img src="http://static.maryoku.com/storage/img/login.jpg" alt="">
                                </div>
                                <div class="card-content_img">
                                    <img src="http://static.maryoku.com/storage/img/sidebar-4.jpg" alt="">
                                </div>
                                <div class="card-content_img">
                                    <img src="http://static.maryoku.com/storage/img/bg9.jpg" alt="">
                                </div>
                            </div>
                            <div class="card-content_info">
                            <div class="card-content_info_title">
                                <h5 class="card-content_info_title_bold">Pinup Photoshoot</h5>
                            </div>
                            <!--<div class="card-content_info_address">-->
                                <!--<h5 class="card-content_info_address_margin">Address</h5>-->
                            <!--</div>-->
                                <!--<div class="card-content_info_contact">-->
                                    <!--<h5 class="card-content_info_contact_spaceBottom">Contact Info</h5>-->
                                <!--</div>-->
                                <div class="card-content_info_price">
                                    <h5 class="card-content_info_price_space">Really fun with memories to take home. Something girls will remember forever. Highly recommended.</h5>
                                </div>
                                <div class="card-content_info_title_bold">
                                    <md-button class="md-rose text-rose md-card_comment_btn">
                                        Save to occasion
                                    </md-button>
                                </div>
                                <!--<div class="card-content_info_price">-->
                                    <!--<h5 class="card-content_info_price_space">Recommended price <span>$45</span> p/p</h5>-->
                                <!--</div>-->
                                <!--<div class="card-content_info_ranking">-->
                                    <!--<h5 class="card-content_info_ranking_margin">-->
                                        <!--Vendor Ranking <span>4.5</span>-->
                                    <!--</h5>-->
                                <!--</div>-->
                            </div>
                        </div>
                        <div class="md-medium-size-100 md-size-100">
                            <div class="pull-right">
                                <div class="card-content_info_price">
                                    <h5 class="card-content_info_price_space make-inline space-txt"> 3 Vendors</h5>
                                    <span>
                                        <md-button @click="openInviteModal" class="make-inline md-rose text-rose md-card_comment_btn">
                                                Add
                                        </md-button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </div>
        <div class="md-layout-item md-size-100">
            <ranked></ranked>
        </div>
        <vendor-modal ref="inviteModal"></vendor-modal>
    </div>
</template>
<script>
    import Ranked from './ranked';
    import VendorModal from './vendorModal';

    export default {
      components: {
        Ranked,
        VendorModal
      },
      data() {
        return {

        }
      },
      methods: {
        openInviteModal(){
          this.$refs.inviteModal.toggleModal(true);
        }
      }
    }

</script>
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
    .make-inline{
        display: inline-block;
        float: left;
    }
    .space-txt{
        margin-top: 13px;
        margin-right: 15px
    }
    .move-right{
        text-align: right;
    }
    .info_time{
        display: inline-block;
        float: right;
    }
    .card-content {

        color: #5A5A5A !important;

        &_img {
            width: fit-content;
            height: 200px;
            float: left;

            & img {
                width: auto;
                height: 100%;
                max-width: 275px;
                padding-right: 10px;
                object-fit: contain;
                padding-bottom: 10px;
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
