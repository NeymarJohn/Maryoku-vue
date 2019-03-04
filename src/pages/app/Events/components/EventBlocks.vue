<template>
       <md-card class="md-card-profile">
        <md-card-header>
             <md-card-content>
                <div class="md-layout-item md-size-100">
                    <h4 style="text-align:left;">Team Building Event</h4>
                </div>
             </md-card-content>
        </md-card-header>
        <md-card-content>
            <div class="md-layout-item md-size-100">
                <md-tabs class="light-theme">
                    <template slot="md-tab" slot-scope="{ tab }">
                        <i class="fa fa-square" style="margin-right: 15px;" v-bind:style="`color: ${tab.icon}!important;`"></i>
                        {{ tab.label }} 
                    </template>
                    <md-tab v-for="item in components" :key="item.id" :id="`tab-${item.value}`" :md-icon="`${item.color}`" :md-label="`${item.value}`" @click="!item.childComponents ? selectComponent(item.id) : ''">
                        <div class="md-layout">
                            <div class="md-layout-item">
                                <md-list>
                                    <md-list-item v-for="child in item.childComponents" :key="child.id" @click="selectComponent(child.id)"> 
                                        <div class="image-block">
                                            <img v-show="!selectedComponents(child.id)" :src="`${child.imageOff}`">
                                            <img v-show="selectedComponents(child.id)" :src="`${child.imageOn}`">    
                                        </div>
                                        {{child.title}}
                                    </md-list-item>
                                </md-list>
                            </div>
                        </div>                        
                    </md-tab>
                </md-tabs>                
            </div>
        </md-card-content>
        <md-card-content class="mt-auto">
            <div class="md-layout-item" style="text-align:right;">
                <md-button class="md-success" @click="createComponent">
                    Next
                </md-button>
            </div>
        </md-card-content>    
      </md-card>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from "@/models/Calendar"
  import EventComponent from "@/models/EventComponent";
  import auth from '@/auth';

  export default {
    name: 'event-blocks',
    components: {

    },
    props: {
        eventId: String,
        eventComponents: Array,
    },
    data: () => ({
        auth: auth,
        componentsData: [],
    }),
    methods: {
        selectComponent(id) {
            if (this.componentsData.includes(id)) {
                this.componentsData.splice(this.componentsData.indexOf(id), 1)
            } else {
                this.componentsData.push(id);
            }
        },
        selectedComponents(id) {
          return this.componentsData.includes(id);
        },
        async createComponent(){
            let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let event = await calendar.calendarEvents().find(this.eventId);
            let eventId = this.eventId;
            this.componentsData.forEach(function(item){

                let value = new EventComponent({ componentId: item, todos: [], values: [], vendors: [], calendarEvent: eventId }).for(calendar, event);
                
                value.save().then(result => {
                    
                })
                .catch(error => {
                    console.log(error);
                    this.isLoading = false;
                })  
            });          
        },
       selectEventComponents() {
            let map = []

            this.eventComponents.forEach(function(item){
                map.push(item.componentId);
            });    
            
            this.componentsData = map;
        }        
    },
    created() {
      
    },
    mounted() {
        this.selectEventComponents()
    },
    computed: {
        ...mapGetters({
            components: "event/getComponentsList"
        })
    },
    watch: {
        eventComponents(newVal, oldVal) {
            this.selectEventComponents();
        },
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
            background-color: rgba($color: #000000, $alpha: 0.05)!important;
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
              background-color: rgba($color: #000000, $alpha: 0.05)!important;    
              color:#3c4858!important;
            }
            &.md-active{
                background-color: #ffd966!important;
            }
            .md-ripple {
                justify-content: flex-start
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
