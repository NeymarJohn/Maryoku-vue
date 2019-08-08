<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100" style="justify-content: space-between;">
            <div class="md-group" style="display: inline-block;">
                <md-button
                  class="md-xs md-icon-button"
                  :class="[
                    {'md-white': view == 'grid'},
                    {'md-info': view == 'list'},
                  ]"
                  @click.prevent="changeView('list')"
                >
                  <md-icon>view_list</md-icon>
                </md-button>
                <md-button
                  class="md-xs md-icon-button"
                  :class="[
                    {'md-white': view == 'list'},
                    {'md-info': view == 'grid'},
                  ]"
                  @click.prevent="changeView('grid')"
                >
                  <md-icon>view_module</md-icon>
                </md-button>
            </div>
            <div style="display: inline-block; height: 30px; border: 1px solid lightgrey; background-color: white; border-radius: 5px; padding: 4px; margin: .3125rem 12px; flex-grow: 1;">
                <input class="md-input" type="text" style="width: 100%; height: 100%; border: 0; background-color: transparent; font-size: 14px;" placeholder="Search"></input>
            </div>
            <div class="pull-right" style="margin: 0 1px;">
                <md-button style="display: inline-block;" class="md-info md-sm" @click="addNewVendor">Add Vendor</md-button>
                <md-button style="display: inline-block;" class="md-purple md-sm" @click="openUploadModal">Import Vendors From Spreadsheet</md-button>
            </div>
        </div>
        <div class="md-layout-item md-size-100">
            <!--<md-field>
                <label>Search</label>
                <md-input v-model="searchTerm" type="text"></md-input>
            </md-field>-->
        </div>
        <div class="md-layout-item md-size-100">
            <vue-element-loading :active="working" spinner="ring" color="#FF547C" background-color="transparent"/>
            <!-- <div class="md-layout md-gutter ">
                <div class="md-layout-item md-small-size-100 md-medium-size-50 md-large-size-33" v-for="vendor in vendorsList" :key="vendor.id">
                    <md-card>
                        <md-card-content style="padding: 15px;">
                            <div class="md-layout">
                                <div class="md-layout-item md-size-100" style="padding: 0;">
                                    <div class="md-layout" style="margin: 0 -12px; ">
                                        <div class="md-layout-item md-size-50">
                                            <div style="background:url('/static/img/lock.jpg') no-repeat center center; height:100%; width:100%; background-size: cover; box-shadow: 0 0 3px #c0c0c0; border-radius: 5px; text-align: center;">
                                                <div class="badge badge-rose" :class="`badge-${categoryColor(vendor.vendorCategory)}`" style="font-size: 10px !important; position: relative; top: 90%;">{{ categoryTitle(vendor.vendorCategory) }}</div>
                                            </div>
                                        </div>
                                        <div class="md-layout-item md-size-50">
                                            <h5 class="title" style="font-weight: 700;">
                                                {{vendor.vendorDisplayName}}
                                            </h5>
                                            <div class="">
                                                <label class="star-rating__star"
                                                       v-for="(rating, ratingIndex) in ratings"
                                                       :key="ratingIndex"
                                                       :class="{'is-selected' : ((vendor.rank >= rating) && vendor.rank != null)}" >★
                                                </label> <span class="small text-gray">({{vendor.voters}})</span>
                                            </div>
                                            <div class="item-content ellipsis" style="min-height: 80px; max-height: 80px;">
                                                <div>
                                                    <p>
                                                        {{vendor.vendorTagLine}}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </md-card-content>
                        <md-card-actions md-alignment="space-between">
                            <div>
                                <md-chips v-model="vendor.vendorTagging" style="padding: 0; margin: 0;" class="md-primary" name="tagging" id="tagging" :md-deletable="false" :md-static="true">{{tag}}</md-chips>
                            </div>
                            <md-button class="md-sm md-info" @click="showVendorDetails(vendor)">More ...</md-button>
                        </md-card-actions>
                    </md-card>
                </div>
            </div> -->
            <vendors-grid v-if="view == 'grid'"
              :buildingBlocksList="buildingBlocksList"
              :vendorsList="vendorsList"
              :ratings="ratings"
              @showVendorDetails="showVendorDetails"
            />
            <vendors-list v-if="view == 'list'"
              :buildingBlocksList="buildingBlocksList"
              :vendorsList="vendorsList"
              @showVendorDetails="showVendorDetails"
              @delete="showDeleteAlert"
            />
        </div>

        <upload-modal ref="uploadModal"></upload-modal>
    </div>
</template>
<script>
  import VueElementLoading from 'vue-element-loading';
  import swal from "sweetalert2";
  import companyForm from './Form/companyForm.vue';
  import UploadModal from './ImportVendors';
  import VendorsGrid from './VendorsGrid';
  import VendorsList from './VendorsList';

  import Vendors from '@/models/Vendors';
  import EventComponent from '@/models/EventComponent';
  import _ from 'underscore';

  export default {
    name: "vendors-pool",
    components: {
      VueElementLoading,
      companyForm,
      UploadModal,
      VendorsGrid,
      VendorsList
    },
    data() {
      return {
        view: "grid", //{grid, list}
        working: false,
        vendorsList: [],
        buildingBlocksList: [],
        ratings: [1, 2, 3, 4, 5],
        searchTerm: ""
      };
    },
    mounted() {
      this.working = true;
      this.$auth.currentUser(this, true, ()=>{
        new EventComponent().get().then(res=>{
          let list = [];
          res.forEach((parentBuildingBlock)=>{
            /*parentBuildingBlock.childComponents.forEach((bb)=>{
                list.push({id: bb.id, value: bb.title});
            });*/
            list.push({id: parentBuildingBlock.id, value: parentBuildingBlock.value});
          });
          this.buildingBlocksList = list;

          new Vendors().limit(1000).get().then((vendors) => {
            this.vendorsList = vendors[0].results;
            this.working = false;
          });
        });
      });
    },
    methods: {
      changeView (view) {
        this.view = view;
      },
      showDeleteAlert(vendor) {
        swal({
          title: "Are you sure?",
          text: `You won't be able to revert this!`,
          showCancelButton: true,
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "md-button md-success confirm-btn-bg ",
          cancelButtonClass: "md-button md-danger cancel-btn-bg",
          confirmButtonText: "Yes, delete it!",
          buttonsStyling: false
        }).then(result => {
          if (result.value) {
            this.working = true;

            vendor.delete()
              .then(result => {
                let indx = _.findIndex(this.vendorsList, {id: vendor.id});
                this.vendorsList.splice(indx, 1);
                this.working = false;
              })
              .catch(() => {
                this.working = false;
              });
          }
        });
      },

      showVendorDetails(vendor){
        window.currentPanel = this.$showPanel({
          component: companyForm,
          cssClass: 'md-layout-item md-size-40 transition36 ',
          openOn: 'right',
          disableBgClick: false,
          props: {
            categories: this.buildingBlocksList,
            selected_vendor: vendor,
            creation_mode: false,
          }
        });
      },
      addNewVendor(){
        window.currentPanel = this.$showPanel({
          component: companyForm,
          cssClass: 'md-layout-item md-size-40 transition36 ',
          openOn: 'right',
          disableBgClick: false,
          props: {
            categories: this.buildingBlocksList,
            selected_vendor: {},
            creation_mode: true,
          }
        });
      },
      openUploadModal(){
        this.$refs.uploadModal.toggleModal(true);
      },
    },
    computed: {},
    watch: {}
  };
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/md/_colors.scss';

    %visually-hidden {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        height: 1px; width: 1px;
        margin: -1px; padding: 0; border: 0;
    }

    /deep/ .star-rating {

        &__star {
            display: inline-block;
            vertical-align: middle;
            line-height: 1;
            font-size: 0.9em;
            color: #ABABAB;
            transition: color .2s ease-out;

            &.is-selected {
                color: #FFD700;
            }
        }

        &__checkbox {
            @extend %visually-hidden;
        }
    }


</style>
