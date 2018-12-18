<template>
    <div>
    <md-table v-model="vendorsList" table-header-color="rose" class="table-striped table-hover">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Vendor">{{ item.vendorDisplayName }}</md-table-cell>
            <md-table-cell md-label="Category">{{ item.productsCategory }}</md-table-cell>
            <md-table-cell md-label="Web site">{{ item.vendorWebsite }}</md-table-cell>
            <md-table-cell md-label="Address">{{ item.vendorAddressLine1 }}</md-table-cell>
            <md-table-cell md-label="Email">{{ item.vendorMainEmail }}</md-table-cell>
            <md-table-cell md-label="Phone">{{ item.vendorMainPhoneNumber }}</md-table-cell>
            <md-table-cell md-label="Actions">
                <md-button @click.native="openInviteModal" class="md-raised md-info md-icon-button">
                    <md-icon>thumb_up</md-icon>
                    <md-tooltip md-direction="left">Ranking</md-tooltip>
                </md-button>
                <md-button class="md-raised md-primary md-icon-button" @click.native="deleteVendor(item.id)">
                    <md-icon>delete</md-icon>
                    <md-tooltip md-direction="left">Delete</md-tooltip>
                </md-button>
                <!--<md-button class="md-raised md-primary md-icon-button" @click.native="test">-->
                    <!--<md-icon>share</md-icon>-->
                    <!--<md-tooltip md-direction="left">Share</md-tooltip>-->
                <!--</md-button>-->
                <md-button class="md-raised md-primary md-icon-button" @click.native="openTagsModal">
                    <md-icon>local_offer</md-icon>
                    <md-tooltip md-direction="left">Tags</md-tooltip>
                </md-button>
            </md-table-cell>

        </md-table-row>
    </md-table>
    <ranking-modal  ref="inviteModal"></ranking-modal>
        <tags-modal  ref="tagsModal"></tags-modal>
</div>
</template>

<script>
    import {Modal, SimpleWizard, WizardTab} from "@/components";
    import swal from "sweetalert2";
    import Vendors from "@/models/Vendors";
    import RankingModal from './RankingModal';
    import TagsModal from './TagsModal';
    export default {
        components: {
            Modal,
            SimpleWizard,
            WizardTab,
            TagsModal,
            RankingModal
        },
        props: {
            vendorsList: {
                type: Array,
                default: () => {
                    return {};
                }
            },
            item: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        data() {
            return {
                inviteModalOpen: false,
                tagsModalOpen: false,
                name: 'Direction'
            }
        },
        methods: {
            openInviteModal(){
              this.$refs.inviteModal.toggleModal(true);
            },
          openTagsModal(){
            this.$refs.tagsModal.toggleModal(true);
          },
            noticeModalHide: function () {
                this.inviteModalOpen = false;
            },
            toggleModal: function (show) {
                this.inviteModalOpen = show;
            },
              noticeModalHide: function () {
                this.tagsModalOpen = false;
              },
              toggleModal: function (show) {
                this.tagsModalOpen = show;
              },
            validateStep(ref) {
                return this.$refs[ref].validate();
            },
            onStepValidated(validated, model) {
                this.wizardModel = {...this.wizardModel, ...model};
            },
            wizardComplete() {
                swal("Good job!", "You clicked the finish button!", "success");
            },
           deleteVendor(id){
            swal({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
              if (result.value) {
                let vendor = await Vendors.find(id);
                vendor.delete();

                let vendorIndex = this.vendorsList.findIndex(obj => obj.id === id);

                this.vendorsList.splice(vendorIndex, 1);
                this.$notify(
                  {
                    message: 'Vendor deleted successfully!',
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                    type: 'success'
                  })
              }
            })

          }
        }
    };
</script>
<style>

</style>
