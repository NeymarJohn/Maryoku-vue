<template>
    <div class="adding-building-blocks-panel">
        <div class="md-layout">
            <h4 class="md-title" style="margin-bottom: 0; line-height: 51px;">
                <md-button @click="closePanel" class="md-button md-theme-default md-simple md-just-icon"><md-icon>arrow_back</md-icon></md-button>
                Requirements List
            </h4>
            <div class="md-layout-item md-size-100">
                <md-card>
                    <md-card-content>
                        <div class="blocks-list_item md-layout" v-for="(block,index) in eventBlocks">
                            <div class="md-layout-item md-size-100">
                                <md-field >
                                    <label>Requirement Description</label>
                                    <md-textarea
                                            v-model="block.title"
                                            type="text"
                                            :rows="block.title ? parseInt(block.title.length / 33) + 1 : 2"
                                    ></md-textarea>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-size-50" >
                                <md-field >
                                    <label >Priority</label>
                                    <md-select v-model="block.priority" name="select">
                                        <md-option v-for="(option, index) in prioritiesList"  :key="index"  :value="option.value">{{ option.value }}</md-option>
                                    </md-select>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-size-50 block-actions">
                                <md-button  class="md-info md-sm md-just-icon md-simple"  @click="editValue(block)">
                                    <md-icon>create</md-icon>
                                </md-button>
                                <md-button  class="md-danger md-sm md-just-icon md-simple"  @click="deleteValue(block.id)">
                                    <md-icon>delete_outline</md-icon>
                                </md-button>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
            <div class="md-layout-item md-size-100">
                <div class="pull-right">
                    <md-button class="md-info"  @click="addNewValue">Add Requirement</md-button>
                    <md-button class="md-info" @click="saveAllValues">Save</md-button>
                </div>
            </div>

        </div>

    </div>
</template>
<script>
    import auth from '@/auth';
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import CalendarEvent from '@/models/CalendarEvent';
    import Calendar from "@/models/Calendar";
    import EventComponent from "@/models/EventComponent";
    import EventComponentValue from "@/models/EventComponentValue";
    import swal from "sweetalert2";
    import {error} from 'util';
    import moment from 'moment';
    import VueElementLoading from 'vue-element-loading';
    import _ from "underscore";
    import MdCardContent from "../../../../../../../node_modules/vue-material/src/components/MdCard/MdCardContent/MdCardContent.vue";

    export default {
        components: {
            MdCardContent,
            VueElementLoading,
        },
        props: {
            event: Object,
            selectedBlock : Object
        },
        data: () => ({
            auth: auth,
            isLoaded : false,
            eventBlocks : [],
            prioritiesList : [
                {
                    label : 'Preferred',
                    value : 'Preferred'
                },
                {
                    label : 'Nice to have',
                    value : 'Nice to have'
                },
                {
                    label : 'Must have',
                    value : 'Must have'
                }
            ],

        }),

        created() {
        },
        mounted() {

            this.getBuildingBlockValues();

        },
        methods: {
            closePanel(){
                this.$emit("closePanel");
            },
            getBuildingBlockValues(){
                let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id : this.selectedBlock.id});

                new EventComponentValue().for(calendar, event, selected_block).get().then(values => {
                    this.eventBlocks = values;
                });
            },
            addNewValue(){

                this.$parent.isLoading = true;

                this.saveAllValues();

                let new_value = {
                    eventComponent: { id: this.selectedBlock.id }
                }

                let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id : this.selectedBlock.id});

                new EventComponentValue(new_value).for(calendar, event, selected_block).save().then(res => {

                    this.$parent.isLoading = false;
                    this.getBuildingBlockValues();
                });
            },
            deleteValue(valueId){
                swal({
                    title: "Are you sure?",
                    text: `You won't be able to revert this!`,
                    showCancelButton: true,
                    confirmButtonClass: "md-button md-success",
                    cancelButtonClass: "md-button md-danger",
                    confirmButtonText: "Yes, delete it!",
                    buttonsStyling: false
                }).then(result => {
                    if (result.value) {

                        this.$parent.isLoading = true;
                        let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                        let event = new CalendarEvent({id: this.event.id});
                        let selected_block = new EventComponent({id : this.selectedBlock.id});

                        let value = new EventComponentValue({id : valueId});

                        value.for(calendar,event,selected_block).delete().then(resp => {
                            this.getBuildingBlockValues();
                            this.$parent.isLoading = false;
                            this.$forceUpdate();
                        })
                            .catch(error => {
                                console.log(error);
                            })
                    }
                });

            },
            editValue(item){

                this.$parent.isLoading = true;

                let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id : this.selectedBlock.id});
                let value = new EventComponentValue({id : item.id});

                value.title = item.title;
                value.priority = item.priority;

                value.for(calendar,event,selected_block).save().then(resp => {
                    this.$parent.isLoading = false;
                })
                    .catch(error => {
                        console.log(error);
                        this.$parent.isLoading = false;

                    })
            },
            saveAllValues () {
                let _self = this;
                this.eventBlocks.forEach(block => {
                    _self.editValue(block);
                })
            }
        },
        computed: {

        }
    };
</script>
