<template>
       <div class="manage-proposals md-layout">
        <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>

           <div class="md-layout-item md-size-100">
               <h3 @click="goBack" > <md-icon>arrow_back</md-icon> Send inquiry and manage proposals</h3>

               <p>
                   Send out one inquiry to all vendors and we'll organize all the proposals for you to choose the best one.
               </p>
           </div>

           <div class="md-layout-item md-size-40">
               <md-card >
                   <md-card-header :class="`md-card-header-icon md-card-header-${selectedBlock.color}`">
                       <div class="card-icon">
                           <md-icon>{{selectedBlock.icon}}</md-icon>
                       </div>
                       <h4 class="title2" style="text-transform: capitalize;">{{selectedBlock.componentId}}</h4>
                   </md-card-header>

                   <md-card-content class="md-layout blocks-list">

                       <div class="blocks-list_item md-layout" v-for="(block,index) in eventBlocks">
                           <div class="md-layout-item md-size-100">
                               <md-field >
                                   <label>Requirement Description</label>
                                   <md-input
                                           v-model="block.req_desc"
                                           type="text"
                                   ></md-input>
                               </md-field>
                           </div>

                           <div class="md-layout-item md-size-50" >
                               <md-field >
                                   <label >Priority</label>
                                   <md-select v-model="block.priority" name="select">
                                       <md-option v-for="(option, index) in prioritisList"  :key="index"  :value="option.value">{{ option.value }}</md-option>
                                   </md-select>
                               </md-field>
                           </div>

                           <div class="md-layout-item md-size-50 block-actions">
                               <md-button  class="md-info md-sm"  >Edit</md-button>
                           </div>
                       </div>

                   </md-card-content>

                   <md-card-actions md-alignment="right">
                       <md-button class="md-info"  @click="addBlock">Add Field</md-button>
                       <md-button class="md-info" >Save</md-button>
                   </md-card-actions>
               </md-card>
           </div>

           <div class="md-layout-item md-size-60">
                <manage-proposals :selectedBlock="selectedBlock"></manage-proposals>
           </div>

      </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from "@/models/Calendar"
  import EventComponent from "@/models/EventComponent";
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';
  import ManageProposals from './EventBlocks/ManageProposals.vue';

  export default {
    name: 'event-blocks',
    components: {
        VueElementLoading,
        ManageProposals
    },
    props: {
        selectedBlock : Object
    },
    data: () => ({
        auth: auth,
        isLoading:true,
        eventBlocks : [
            {
                req_desc: "Set-up, service and clean up",
                priority : "Preferred"
            }
        ],
        prioritisList : [
            {
                label : 'Preferred',
                value : 'Preferred'
            },
            {
                label : 'Nice to have',
                value : 'Nice to have'
            }
        ]
    }),
    methods: {

        addBlock(){
            this.eventBlocks.push({
                req_desc: "",
                priority : ""
            })
        },
        goBack() {
            this.$emit('go-to-building-blocks',{})
        }


    },
    created() {

    },
    mounted() {
        this.isLoading = false;
    },
    computed: {

    }
  }
</script>
<style lang="scss">
    .mt-auto {
        margin-top: auto;
    }
    .light-theme {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .md-list {
            flex-direction: column;
            justify-content: flex-end;
        }
        .md-tab {
            padding-top: 0;
            .md-list {
                padding-top: 0;
                flex-wrap: wrap;
            }
        }
        .md-list.md-theme-default .md-list-item-container:not(.md-list-item-default):not([disabled]):hover {
            background: none;
        }
        .md-list-item-content{
            font-size: 12.5px;
            color: #6a6869;
            cursor: pointer;
            flex-direction: column;
            .image-block {
                margin-bottom: 10px;
            }
        }
        .md-content {
            width: 100%;
        }
        .md-button {
            height: 50px;
            color:#3c4858!important;
            i,
            &:hover,
            &:hover i,
            &:focus,
            &:focus i,
            &:active,
            &:active i,
            &:active:focus,
            &:active:focus i,
            &:active:hover{
              color:#3c4858!important;
            }
            .caret{
                width: auto;
                min-width: 0;
                margin-right: 0;
                margin-left: auto;
            }
            .md-ripple {
                padding: 0!important;
                .md-button-content {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 100%;
                    height:100%;
                    .item {
                        display: flex;
                        align-items: center;
                        padding: 13px;
                        width: 100%;
                        text-align: left;
                        background-color: rgba($color: #000000, $alpha: 0.05)!important;
                        &.selected{
                            background-color: #ffd966!important;
                        }
                    }
                }
            }
        }
        .md-list {
            display: flex;
            flex-direction: row;
        }
        .md-tabs-navigation {
            flex-direction: column;
            margin: 0;
            padding: 0;
            margin-right: 5%;
            overflow: hidden;
            box-shadow:none;
            -webkit-box-shadow:none;
            min-width: 230px;
            max-width: 230px;
            margin-left: 0!important;
            flex: 1 1 230px;
        }
    }
</style>
