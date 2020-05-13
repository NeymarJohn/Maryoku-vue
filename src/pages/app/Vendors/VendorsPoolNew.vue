<template>
    <div class="md-layout vendors-pool-page">
        <side-bar :event="event">
        </side-bar>

        <div class="event-page-header md-layout-item md-size-100">
            <div class="header-title">
                <h3 >Our Vendors List</h3>
                <p>
                    Millions of companies turn to Maryoku as their trusted event resource, with the  largest directory of local event<br>
                    vendors. Easily find the best event services in your area with detailed vendor reviews  for your event.
                </p>
            </div>
            <div class="header-actions">
                <div class="form-group search-field d-flex  justify-content-start align-center">
                    <md-icon>search</md-icon>
                    <input class="form-control" placeholder="Search">
                </div>
            </div>
        </div>

        <div class="filters-section">

        </div>

<!--        <div class="md-layout-item md-size-100" style="justify-content: space-between;">-->
<!--            <div class="md-group" style="">-->
<!--                <md-button-->
<!--                    class="md-xs md-icon-button"-->
<!--                    :class="[-->
<!--            {'md-white': view === 'list'},-->
<!--            {'md-info': view === 'grid'},-->
<!--          ]"-->
<!--                    @click.prevent="changeView('grid')">-->
<!--                    <md-icon>view_module</md-icon>-->
<!--                </md-button>-->
<!--                <md-button-->
<!--                    class="md-xs md-icon-button"-->
<!--                    :class="[-->
<!--            {'md-white': view === 'grid'},-->
<!--            {'md-info': view === 'list'},-->
<!--          ]"-->
<!--                    @click.prevent="changeView('list')">-->
<!--                    <md-icon>view_list</md-icon>-->
<!--                </md-button>-->
<!--            </div>-->
<!--            <div class="pull-right" style="margin: 0 1px;">-->
<!--                <md-button style="display: inline-block;" class="md-info md-sm" @click="addNewVendor">Add Vendor</md-button>-->
<!--                <md-button style="display: inline-block;" class="md-purple md-sm" @click="openUploadModal">Import Vendors From Spreadsheet</md-button>-->
<!--            </div>-->
<!--        </div>-->
        <div class="md-layout-item md-size-100 clear-margins" style="padding: 0 1em 0 3em !important;">
            <vue-element-loading :active="working" spinner="ring" color="#FF547C" background-color="transparent"/>
            <vendors-grid v-if="view === 'grid'"
                          :buildingBlocksList="buildingBlocksList"
                          :vendorsList="vendorsList"
                          :ratings="ratings"
                          @editVendorDetails="editVendorDetails"/>
            <vendors-list v-if="view === 'list'"
                          :buildingBlocksList="buildingBlocksList"
                          :vendorsList="vendorsList"
                          @editVendorDetails="editVendorDetails"
                          @delete="showDeleteAlert"
                          @add-new-vendor="addNewVendor"
                          @open-upload-modal="openUploadModal"
            />
        </div>
        <upload-modal ref="uploadModal"></upload-modal>
    </div>
</template>
<script>
import VueElementLoading from 'vue-element-loading'
import swal from 'sweetalert2'
import companyForm from './Form/companyForm.vue'
import UploadModal from './ImportVendors'
import VendorsGrid from './VendorsGridNew'
import VendorsList from './VendorsList'

import Vendors from '@/models/Vendors'
import EventComponent from '@/models/EventComponent'
import SideBar from '../../../components/SidebarPlugin/NewSideBar';

import _ from 'underscore'

export default {
  name: 'vendors-pool',
  components: {
    VueElementLoading,
    companyForm,
    UploadModal,
    VendorsGrid,
    VendorsList,
      SideBar
  },
  props: {
    inPanel: Boolean
  },
  data () {
    return {
      view: 'grid', // {grid, list}
      working: false,
      vendorsList: [],
      buildingBlocksList: [],
      ratings: [1, 2, 3, 4, 5],
      searchTerm: '',
        event : {}
    }
  },
  mounted () {
    this.working = true
    this.$auth.currentUser(this, true, () => {
      Vendors.find('categories').then(res => {
        let list = []
        _.each(res, (parentBuildingBlock) => {
          /* parentBuildingBlock.childComponents.forEach((bb)=>{
                            list.push({id: bb.id, value: bb.title});
                        }); */
          list.push({id: parentBuildingBlock.id, value: parentBuildingBlock.value})
        })

        this.buildingBlocksList = list

        new Vendors().limit(1000).get().then((vendors) => {
          this.vendorsList = vendors[0].results
          this.working = false
        })
      })
    })
  },
  methods: {
    changeView (view) {
      this.view = view
    },
    showDeleteAlert (vendor) {
      swal({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
        showCancelButton: true,
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'md-button md-success confirm-btn-bg ',
        cancelButtonClass: 'md-button md-danger cancel-btn-bg',
        confirmButtonText: 'Yes, delete it!',
        buttonsStyling: false
      }).then(result => {
        if (result.value) {
          this.working = true

          vendor.delete()
            .then(result => {
              let indx = _.findIndex(this.vendorsList, {id: vendor.id})
              this.vendorsList.splice(indx, 1)
              this.working = false
            })
            .catch(() => {
              this.working = false
            })
        }
      })
    },

    editVendorDetails (vendor) {
      this.$router.push({ name: 'EditVendor', params: { id: vendor.id, creation_mode: false } })
    },
    addNewVendor () {
      this.$router.push({ name: 'CreateVendor', props: { default: true, creation_mode: true } })
    },
    openUploadModal () {
      this.$refs.uploadModal.toggleModal(true)
    }
  },
  computed: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/md/_colors.scss';
    %visually-hidden {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
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
