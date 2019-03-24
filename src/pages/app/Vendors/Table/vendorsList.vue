<template>
    <div>
        <md-card-content>
            <md-table v-model="vendorsList" table-header-color="orange">
                <md-table-row slot="md-table-row" slot-scope="{ item }" :key="item.id" @click="selectVendor(item)">
                    <md-table-cell md-label="ID"> {{ item.vendorDisplayName }}</md-table-cell>
                    <md-table-cell md-label="Vendor Name">{{ item.vendorDisplayName }}</md-table-cell>
                    <md-table-cell md-label="Market Ranking">
                        <label class="star-rating__star"
                               v-for="rating in ratings"
                               @click="setRanking(item.id,rating)"
                               :class="{'is-selected' : ((item.rank >= rating) && item.rank != null)}"
                               >
                            <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="`market_ranking_`+item.id"
                                   v-model="item.rank">★</label>
                    </md-table-cell>
                    <md-table-cell>
                        <md-button class="md-button md-primary md-sm md-theme-default auto-width" @click.native="deleteVendor(item.id)">
                            delete
                        </md-button>
                    </md-table-cell>
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
                    return {};
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
            }
        },
      created() {

      },
        data() {
            return {
              tagsModalOpen: false,
              openPopup: false,
              openPopupTags: false,
              tags: [],
              tag: ' ',
              name: 'Direction',
                    ratings: [1, 2, 3, 4, 5],
                index : 1

            }
        },
        methods: {
          closeModal(){
            this.openPopup = false;
          },
           deleteVendor(id){
            swal({
              title: 'Are you sure you want to delete this vendor?',
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
          ,selectVendor(item) {
               this.$emit('select-vendor',item);
           }
           , async setRanking(id,ranking) {
                let vendor = await Vendors.find(id);
                vendor.rank = ranking;
                vendor.save();
                console.log(vendor);
                this.$notify({
                    message: 'Vendor Ranked successfully!',
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                    type: 'success'
                })
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

        &:hover {
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
        background: white;
        border:1px solid rgba(0, 0, 0, 0.14);
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
</style>
