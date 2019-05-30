<template>
    <div class="adding-building-blocks-panel">
        <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
        <div class="md-layout">
            <h4 class="md-title md-layout-item md-size-100" style="margin-bottom: 0; line-height: 51px; width:100%;">
                <md-button @click="closePanel" class="md-button md-theme-default md-simple md-just-icon">
                    <md-icon>arrow_back</md-icon>
                </md-button>
                Requirements List

                <div class="pull-right">
                    <md-button class="md-info event-building-blocks-requirements-add" @click="addNewValue">
                        Add Requirement
                    </md-button>
                    <md-button class="md-info event-building-blocks-requirements-save" @click="saveAllValues">Save
                    </md-button>
                </div>

            </h4>
            <div class="md-layout-item md-size-100">

                <ul class="requirements-list">

                    <li class="list-item" v-for="(item,index) in requirementsList">
                        <drag
                                :class="`md-button md-${item.color}`"
                                :transfer-data="{ item }"> {{item.title}} <md-icon>add_circle_outline</md-icon></drag>
                    </li>


                </ul>
                <md-card>

                    <md-card-content>
                        <md-table v-if="eventBlocks.length" v-model="eventBlocks" table-header-color="orange"
                                  class="requirements-table">
                            <md-table-row slot="md-table-row" slot-scope="{ item }" :key="eventBlocks.indexOf(item)">
                                <md-table-cell md-label="Title">
                                    <label-edit :text="item.title" :field-name="item.id"
                                                @text-updated-blur="requirementChanged"
                                                @text-updated-enter="requirementChanged"></label-edit>
                                </md-table-cell>
                                <md-table-cell md-label="Description">
                                    <label-edit :text="item.comment" :field-name="item.id"
                                                @text-updated-blur="descriptionChanged"
                                                @text-updated-enter="descriptionChanged"></label-edit>
                                </md-table-cell>
                                <md-table-cell md-label="Priority">
                                    <label-edit :text="item.priority" :field-name="item.id"
                                                @text-updated-blur="priorityChanged"
                                                @text-updated-enter="priorityChanged"></label-edit>

                                </md-table-cell>

                                <md-table-cell md-label="Actions">
                                    <md-button
                                            class="md-danger md-sm md-just-icon event-building-blocks-requirements-delete"
                                            @click="deleteValue(item.id)">
                                        <md-icon>delete_outline</md-icon>
                                    </md-button>
                                </md-table-cell>

                            </md-table-row>

                        </md-table>
                        <div v-else>
                            No Requirements
                        </div>

                        <drop @drop="handleDrop" class="drag-area">
                            <p >Drag Item here</p>
                        </drop>

                    </md-card-content>

                    <md-card-content style="display: none;">
                        <div class="blocks-list_item md-layout" v-for="(block,index) in eventBlocks">
                            <div class="md-layout-item md-size-100">
                                <md-field>
                                    <label>Requirement Description</label>
                                    <md-textarea
                                            v-model="block.title"
                                            type="text"
                                            :rows="block.title ? parseInt(block.title.length / 33) + 1 : 2"
                                    ></md-textarea>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-size-50">
                                <md-field>
                                    <label>Priority</label>
                                    <md-select v-model="block.priority" name="select">
                                        <md-option v-for="(option, index) in prioritiesList" :key="index"
                                                   :value="option.value">{{ option.value }}
                                        </md-option>
                                    </md-select>
                                </md-field>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>

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

    import {LabelEdit} from '@/components';
    import draggable from 'vuedraggable';
    import {Drag, Drop} from 'vue-drag-drop';

    export default {
        components: {
            MdCardContent,
            VueElementLoading,
            LabelEdit,
            draggable, Drag, Drop
        },
        props: {
            event: Object,
            selectedBlock: Object
        },
        data: () => ({
            auth: auth,
            isLoading: false,
            eventBlocks: [],
            prioritiesList: [
                {
                    label: 'Preferred',
                    value: 'Preferred'
                },
                {
                    label: 'Nice to have',
                    value: 'Nice to have'
                },
                {
                    label: 'Must have',
                    value: 'Must have'
                }
            ],
            requirementsList : [
                {
                    id : 1,
                    title : 'Smoking Area',
                    color : 'rose',
                    priority : 'Must Have',
                    comment : '',
                    propertyId : null,
                    value : null
                },
                {
                    id : 2,
                    title : 'Reception Area',
                    color : 'primary',
                    priority : 'Must Have',
                    comment : '',
                    propertyId : null,
                    value : null
                },
                {
                    id : 3,
                    title : 'Cleaning services',
                    color : 'warning',
                    priority : 'Must Have',
                    comment : '',
                    propertyId : null,
                    value : null
                }
            ]

        }),

        created() {
        },
        mounted() {

            this.getBuildingBlockValues();
        },
        methods: {
            closePanel() {
                this.$emit("closePanel");
            },
            getBuildingBlockValues() {
                let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id: this.selectedBlock.id});

                new EventComponentValue().for(calendar, event, selected_block).get().then(values => {
                    this.eventBlocks = values;
                    console.log('event requirements ', values);
                });
            },
            addNewValue() {

                this.isLoading = true;

                this.saveAllValues();

                let new_value = {
                    eventComponent: {id: this.selectedBlock.id}
                }

                let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id: this.selectedBlock.id});

                new EventComponentValue(new_value).for(calendar, event, selected_block).save().then(res => {

                    this.isLoading = false;
                    this.getBuildingBlockValues();

                    this.$notify(
                        {
                            message: 'Requirement added successfully',
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'success'
                        })
                });
            },
            handleDrop(data, event){
                this.isLoading = true;


                //let item = data.item;
                item.eventComponent = {id: this.selectedBlock.id};


                let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                let eventObject = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id: this.selectedBlock.id});

                new EventComponentValue(item).for(calendar, eventObject, selected_block).save().then(res => {

                    this.isLoading = false;
                    this.getBuildingBlockValues();

                    this.$notify(
                        {
                            message: 'Requirement added successfully',
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'success'
                        })
                });


            },
            deleteValue(valueId) {
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

                        this.isLoading = true;
                        let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                        let event = new CalendarEvent({id: this.event.id});
                        let selected_block = new EventComponent({id: this.selectedBlock.id});

                        let value = new EventComponentValue({id: valueId});

                        value.for(calendar, event, selected_block).delete().then(resp => {
                            this.getBuildingBlockValues();
                            this.isLoading = false;
                            this.$forceUpdate();
                            this.$notify(
                                {
                                    message: 'Requirement deleted successfully',
                                    horizontalAlign: 'center',
                                    verticalAlign: 'top',
                                    type: 'success'
                                })
                        })
                            .catch(error => {

                                this.$notify(
                                    {
                                        message: 'Error while trying to delete this requirement',
                                        horizontalAlign: 'center',
                                        verticalAlign: 'top',
                                        type: 'danger'
                                    })

                                console.log(error);
                            })
                    }
                });

            },
            editValue(item) {

                this.isLoading = true;

                let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id: this.selectedBlock.id});
                let value = new EventComponentValue({id: item.id});

                value.title = item.title;
                value.priority = item.priority;

                value.for(calendar, event, selected_block).save().then(resp => {
                    this.isLoading = false;

                    this.$notify(
                        {
                            message: 'Requirement modified successfully',
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'success'
                        })

                    this.getBuildingBlockValues();
                })
                    .catch(error => {
                        console.log(error);
                        this.isLoading = false;
                        this.$notify(
                            {
                                message: 'Error while trying to modify this requirement',
                                horizontalAlign: 'center',
                                verticalAlign: 'top',
                                type: 'danger'
                            })

                    })
            },
            saveAllValues() {
                let _self = this;
                this.eventBlocks.forEach(block => {
                    _self.editValue(block);
                })
            },
            requirementChanged(val, index) {

                if (!val.length) {
                    return
                }

                this.isLoading = true;

                let item = _.find(this.eventBlocks, function (item) {
                    return item.id == index;
                });

                let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id: this.selectedBlock.id});
                let value = new EventComponentValue({id: item.id});

                value.title = val;

                value.for(calendar, event, selected_block).save().then(resp => {
                    this.isLoading = false;

                    this.$notify(
                        {
                            message: 'Requirement saved successfully',
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'success'
                        })
                    this.getBuildingBlockValues();


                })
                    .catch(error => {
                        console.log(error);
                        this.isLoading = false;

                        this.$notify(
                            {
                                message: 'Error while trying to modify this requirement',
                                horizontalAlign: 'center',
                                verticalAlign: 'top',
                                type: 'danger'
                            })
                        this.getBuildingBlockValues();

                    })


            },
            priorityChanged(val, index) {

                if (!val.length) {
                    return
                }

                this.isLoading = true;


                let item = _.find(this.eventBlocks, function (item) {
                    return item.id == index;
                });

                let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id: this.selectedBlock.id});
                let value = new EventComponentValue({id: item.id});


                value.priority = val;

                value.for(calendar, event, selected_block).save().then(resp => {
                    this.isLoading = false;


                    this.$notify(
                        {
                            message: 'Requirement saved successfully',
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'success'
                        })
                    this.getBuildingBlockValues();


                })
                    .catch(error => {
                        console.log(error);
                        this.isLoading = false;

                        this.$notify(
                            {
                                message: 'Error while trying to modify this requirement',
                                horizontalAlign: 'center',
                                verticalAlign: 'top',
                                type: 'danger'
                            })

                        this.getBuildingBlockValues();

                    })

            },
            descriptionChanged(val, index) {

                if (!val.length) {
                    return
                }

                this.isLoading = true;


                let item = _.find(this.eventBlocks, function (item) {
                    return item.id == index;
                });

                let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id: this.selectedBlock.id});
                let value = new EventComponentValue({id: item.id});


                value.comment = val;

                value.for(calendar, event, selected_block).save().then(resp => {
                    this.isLoading = false;
                    console.log('requirement saved');


                    this.$notify(
                        {
                            message: 'Requirement saved successfully',
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'success'
                        })
                    this.getBuildingBlockValues();


                })
                    .catch(error => {
                        console.log(error);
                        this.isLoading = false;

                        this.$notify(
                            {
                                message: 'Error while trying to modify this requirement',
                                horizontalAlign: 'center',
                                verticalAlign: 'top',
                                type: 'danger'
                            })
                        this.getBuildingBlockValues();


                    })

            },
        },
        computed: {}
    };
</script>
