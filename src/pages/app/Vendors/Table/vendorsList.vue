<template>
    <div>
        <md-card-content>
            <md-table v-model="vendorsList" table-header-color="orange" class="vendors-table">
                <md-table-row slot="md-table-row" slot-scope="{ item }" :key="vendorsList.indexOf(item)"    @click="selectVendor(item)"  :class="{selected:item.id === selectedVendor}"    class="vendors-table_item hover-row">
                    <md-table-cell md-label="Vendor Name"  > {{ item.vendorDisplayName }}</md-table-cell>
                    <md-table-cell md-label="Category"  > {{ categoryTitle(item.vendorCategory) }}</md-table-cell>
                    <md-table-cell md-label="Rank">
                        <!-- <vue-stars
                            :name="item.id"
                            active-color="#ffdd00"
                            inactive-color="#999999"
                            shadow-color="#ffff00"
                            hover-color="#dddd00"
                            :max="5"
                            :value="item.rank"
                            :readonly="false"
                            char="★"
                            inactive-char=""
                            class=""/> -->
                                <div class="md-layout-item md-size-100 md-small-size-100">
                            <label class="star-rating__star"
                                   v-for="(rating, index) in ratings"
                                   :key="index"
                                   :class="{'is-selected' : ((item.rank >= rating) && item.rank != null)}" >
                                <input class="star-rating star-rating__checkbox"
                                       @click="setRanking(item.id,rating)"
                                       type="radio" :value="rating" :name="`market_ranking_`+item.id"
                                       v-model="item.rank">★</label>
                        </div>
                    </md-table-cell>

                    <!--<md-table-cell md-label="People">
                      {{item.voters}}
                    </md-table-cell>
                    <md-table-cell md-label="Average Score">
                      {{item.avgScore}}%
                    </md-table-cell>-->
                    <md-table-cell class="vendors-table_item-actions" v-if="mode == 'listing'">
                        <!-- <md-button :name="`vendors-list-rank-vendor-${vendorsList.indexOf(item)}`" class="md-warning md-just-icon md-round" @click="openPopover(vendorsList.indexOf(item))">
                            <md-icon>star</md-icon>
                        </md-button> -->
                        <md-button :name="`vendors-list-delete-vendor-${vendorsList.indexOf(item)}`" class="md-danger md-just-icon md-round" @click.native="deleteVendor(item.id)">
                            <md-icon>delete</md-icon>
                        </md-button>
                    </md-table-cell>
                    <md-table-cell class="vendors-table_item-actions" v-if="mode == 'manageBlock'">
                        <md-button  v-if="!isSelected(item.id)" :name="`vendors-list-delete-vendor-${vendorsList.indexOf(item)}`" class="md-button md-success md-sm md-theme-default auto-width" @click.native="addVendor(item)">
                            <md-icon>add</md-icon>
                        </md-button>

                        <md-button  v-else-if="isSelected(item.id)" :name="`vendors-list-delete-vendor-${vendorsList.indexOf(item)}`" class="md-button md-danger md-sm md-theme-default auto-width" @click.native="removeVendor(item)">
                            <md-icon>delete</md-icon>
                        </md-button>
                    </md-table-cell>



                    <!-- Ranking Popup -->
                    <div class="popup-box"
                         v-click-outside="closeModal"
                         v-if="tooltipModels[vendorsList.indexOf(item)] && tooltipModels[vendorsList.indexOf(item)].value && (openPopup)"
                         :md-active.sync="tooltipModels[vendorsList.indexOf(item)] ? tooltipModels[vendorsList.indexOf(item)].value : tooltipModels[vendorsList.indexOf(item)]"
                         md-direction="left">
                        <div class="header-position">
                            <h3 class="title">Ranking</h3>
                            <button class="btn-position" @click="closeModal">X</button>
                        </div>
                        <div class="md-layout-item md-size-100 md-small-size-100">
                            <label class="star-rating__star"
                                   v-for="(rating, index) in ratings"
                                   :key="index"
                                   :class="{'is-selected' : ((item.rank >= rating) && item.rank != null)}" >
                                <input class="star-rating star-rating__checkbox"
                                       @click="setRanking(item.id,rating)"
                                       type="radio" :value="rating" :name="`market_ranking_`+item.id"
                                       v-model="item.rank">★</label>
                        </div>
                    </div>
                    <!-- ./Ranking Popup -->


                </md-table-row>
            </md-table>
        </md-card-content>
    </div>
</template>

<script>
    import {Modal, SimpleWizard, WizardTab} from "@/components";
    import swal from "sweetalert2";
    import Vendors from "@/models/Vendors";
    import RankingModal from './RankingModal';
    import TagsModal from './TagsModal';
    import ClickOutside from 'vue-click-outside'
    // import auth from '@/auth';

    import Calendar from "@/models/Calendar";
    import CalendarEvent from "@/models/CalendarEvent";
    import EventComponent from "@/models/EventComponent";
    import EventComponentVendor from "@/models/EventComponentVendor";
    import _ from "underscore";

    export default {
        components: {
            Modal,
            SimpleWizard,
            WizardTab,
            TagsModal,
            RankingModal,
            ClickOutside
        },
        props: {
            vendorsList: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            buildingBlocksList: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            tooltipModels: {
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
            },
            mode : String,
            selectedBlock : {
                type : Object,
                default : null
            },
            event : {
                type : Object,
                default : null
            }
        },
        created() {

            if ( this.event && this.selectedBlock ) {
                this.getBlockVendors();
            }

        },
        data() {
            return {
                /*auth : auth,*/
                tagsModalOpen: false,
                openPopup: false,
                openPopupTags: false,
                tags: [],
                tag: ' ',
                name: 'Direction',
                ratings: [1, 2, 3, 4, 5],
                index : 0,
                selectedVendor: undefined,
                blockVendors : []


            }
        },
        mounted(){

            this.getBlockVendors();

        },
        methods: {
            async setRanking(id,ranking) {
                console.log("sss")
                let vendor = await Vendors.find(id);
                vendor.rank = ranking;
                vendor.save();

                this.$notify(
                    {
                        message: 'Vendor Ranked successfully!',
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success'
                    })

            },
            closeModal(){
                this.openPopup = false;
            },
            openPopover(index){
                this.tooltipModels[index].value = !this.tooltipModels[index].value && (this.openPopup = true);

                this.tooltipModels.map((item, itemIndex) => {
                    if (index !== itemIndex) {
                        this.tooltipModels[itemIndex].value = false;
                    }
                })

            },
            categoryTitle(categoryId){
                let category = _.findWhere(this.buildingBlocksList, {id: categoryId});
                return category ? category.value : categoryId;
                const buildingBlock = _.findWhere(this.buildingBlocksList, {id: categoryId});
                return buildingBlock ? buildingBlock.value : '';
            },
            deleteVendor(id){
                swal({
                    title: 'Are you sure you want to delete this vendor?',
                    text: "You won't be able to revert this!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "md-button md-success confirm-btn-bg btn-fill",
                    cancelButtonClass: "md-button md-danger cancel-btn-bg btn-fill",
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

                        if (  this.selectedVendor == id ) {
                            this.$set(this,'selectedVendor',undefined);
                            this.$emit('close-vendor',{});
                        }

                    }
                })

            }
            ,selectVendor(item) {
                let _self = this;

                if (  _self.selectedVendor != item.id ) {
                    _self.$set(_self,'selectedVendor',item.id);
                    _self.$emit('select-vendor',item);
                } else {
                    _self.$set(_self,'selectedVendor',undefined);
                    _self.$emit('close-vendor',{});
                }

            },
            resetSelectedVendor(data){
                this.$set(this,'selectedVendor',data);
            },
            addVendor(data) {
                this.$emit('add-vendor',data);
                this.getBlockVendors();
            },
            removeVendor(data){
                this.$emit('remove-vendor',data);
                this.getBlockVendors();
            },
            getBlockVendors() {

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                if (this.event) {
                    let event = new CalendarEvent({ id: this.event.id });
                    let selected_block = new EventComponent({ id: this.selectedBlock.id });

                    new EventComponentVendor().for(calendar, event, selected_block)
                        .get()
                        .then(resp => {
                            this.blockVendors = resp;
                        })
                        .catch(error => {

                            console.log('error =>', error);

                        });
                }
            },
            isSelected(vendorId) {
                let isSelected = _.find(this.blockVendors,function(vendor){ return vendor.vendorId === vendorId });
                return isSelected ? true : false;
            }
        }
    };
</script>
<style lang="scss">
    .md-table-cell-container{
        position: relative;
    }
    #target{

        position: relative;

    }
    .connected{
        right: 133px;
        z-index: 9999999999999;
        top: -300px;
        position: absolute;
    }
    .swal2-container{
        z-index: 999999;
    }
    .md-toolbar + .md-toolbar {
        margin-top: 16px;
        background-color: transparent!important;
    }
    .md-toolbar {
        background-color: transparent!important;
    }
    .md-toolbar .md-title{
        color: #555555!important;
    }
    .border-field{
        box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(153, 153, 153, 0.46);
        font-size: 13px;
    }
    .label-right{
        left: 16px!important;
        font-size: 13px!important;
    }
    .space-between{
        justify-content: space-between;
    }
    .space-between .pull-right span{
        cursor: pointer;
    }
    .white{
        color: white!important;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
    }
    .fill-yellow{
        color: yellow!important;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
    }
    %visually-hidden {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        height: 1px; width: 1px;
        margin: -1px; padding: 0; border: 0;
    }

    .star-rating {

        &__star {
            display: inline-block;
            padding: 3px;
            vertical-align: middle;
            line-height: 1;
            font-size: 1.5em;
            color: #ABABAB;
            transition: color .2s ease-out;

            &:not(.labeled):hover {
                cursor: pointer;
            }

            &.is-selected {
                color: #FFD700;
            }
        }

        &__checkbox {
            @extend %visually-hidden;
        }
    }
    .header-position {
        position: relative;
        padding: 15px;
    }
    .btn-position{
        position: absolute;
        right: 15px;
        font-weight: bold;
        top: 20px;
        font-size: 17px;
        background-color: transparent!important;
        box-shadow: none!important;
        color: gray!important;
        border-color: transparent;
        cursor: pointer;

        &:hover, &:visited, &:focus, &:active{
            background-color: transparent!important;
            box-shadow: none!important;
            color: gray!important;
        }
    }
    .box-rate{
        border-bottom: 1px solid #ddd ;

        & h3{
            font-size: 13px;
            display: inline-block;
            margin-top: 5px;
        }


    }
    .popup-box{
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
        right: 145px;
        z-index: 9999;
        width: 360px;
        position: absolute;
        border-radius: 5px;
        background: white;
        border:1px solid rgba(0, 0, 0, 0.14);
        padding : 1em;

        .header-position {
            padding : 0;
            margin-bottom : 0.5em;
            h3{
                margin : 0;
                padding : 0;
            }
            .btn-position {
                top  : 0;
                right:0;
            }
        }

        .md-layout-item {
            padding : 0;
        }
    }
    .clearfix {
        clear: both;
    }

    .header-position {
        position: relative;
    }
    .btn-position{
        position: absolute;
        right: 15px;
        font-weight: bold;
        top: 20px;
        font-size: 17px;
        background-color: transparent!important;
        box-shadow: none!important;
        color: gray!important;
        border-color: transparent;
        cursor: pointer;

        &:hover, &:visited, &:focus, &:active{
            background-color: transparent!important;
            box-shadow: none!important;
            color: gray!important;
        }
    }
    .popup-footer{
        padding: 15px 15px 15px 0px;
        text-align: right;
        & .move-left{
            width: 68px;
            margin-right: 15px;
            padding: 0px;
        }
        & .btn-success{
            width: 68px;
            padding: 0px;
        }
    }
    .md-table-row.vendors-table_item {
        cursor: pointer;
    }
</style>
