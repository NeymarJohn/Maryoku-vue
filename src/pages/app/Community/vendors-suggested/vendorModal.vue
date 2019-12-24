<template>
    <div class="md-layout">
        <modal v-if="inviteModalOpen" @close="noticeModalHide" container-class="modal-container">
            <template slot="body">
                <div class="md-medium-size-100 md-size-100">
                    <div class="vendor-card">
                        <div class="inline">
                            <div class="vendor-card_img">
                                <img src="http://static.maryoku.com/storage/img/faces/avatar.jpg" alt="">
                            </div>
                            <div class="vendor-card_title">
                                <h5>Pinup Photoshoot - Vendor Card</h5>
                            </div>
                        </div>
                        <div class="vendor-card_form">
                            <md-field>
                                <label>Contact Person</label>
                                <md-input v-model="emailadress" type="email"></md-input>
                            </md-field>
                            <md-field>
                                <label>Address</label>
                                <md-input v-model="emailadress" type="email"></md-input>
                            </md-field>
                            <md-field>
                                <label>Phone Number</label>
                                <md-input v-model="emailadress" type="email"></md-input>
                            </md-field>
                            <md-field>
                                <label>E-mail</label>
                                <md-input v-model="emailadress" type="email"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-100 pull-right">
                            <md-button class="pull-right md-rose text-rose md-card_comment_btn">
                                Add to My Vendors
                            </md-button>
                        </div>
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script>
  import { Modal } from "@/components";
  import swal from "sweetalert2";

  export default {
    components: {
      Modal
    },
    props: {

    },
    data() {
      return {
        inviteModalOpen: false
      }
    },
    methods: {
      noticeModalHide: function() {
        this.inviteModalOpen = false;
      },
      toggleModal: function(show) {
        this.inviteModalOpen = show;
      }
    }
  };
</script>
<style lang="scss">
.vendor-card {
    &_img{
         margin-right: 20px;
         width: fit-content;
         height: 80px;
         display: inline-block;

            & img {
                  width: auto;
                  height: 100%;
                  max-width: 100px;
                  object-fit: contain;
              }
     }
    &_title{
        display: inline-block;

        & h5{
            font-weight:bold;
        }
    }
    &_form{
        width:80%;
    }
}
    .pull-right{
        float: right!important;
    }
</style>
