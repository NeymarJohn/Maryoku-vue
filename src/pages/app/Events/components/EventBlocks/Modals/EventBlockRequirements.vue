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
                        Add New Requirement
                    </md-button>
                </div>

            </h4>
            <div class="md-layout-item md-size-100">

                <ul class="requirements-list" v-if="predefinedRequirements">

                    <li class="list-item" v-for="(item,index) in predefinedRequirements">
                        <div
                                :class="`md-button ${item.color}`"
                                @click="handleDrop(item)"
                        > {{item.title}}
                            <md-icon>add_circle_outline</md-icon>
                        </div>
                    </li>


                </ul>
                <md-card>
                    <md-card-content>
                        <md-table v-if="eventBlocks.length" v-model="eventBlocks" table-header-color="orange"
                                  class="requirements-table">
                            <md-table-row slot="md-table-row" slot-scope="{ item, index }"
                                          :key="eventBlocks.indexOf(item)"
                                          :class="{'visible-row':item.editMode,'not-visible-row':!item.editMode}">
                                <md-table-cell md-label="Title">
                                    {{item.title}}

                                    <div v-if="item.editMode">

                                        <md-field>
                                            <md-input
                                                    v-model="item.title"
                                                    type="text"
                                            ></md-input>
                                        </md-field>

                                    </div>

                                </md-table-cell>
                                <md-table-cell md-label="Description">
                                    {{item.comment ? item.comment : 'No Description'}}

                                    <div v-if="item.editMode">
                                        <md-field>
                                            <md-textarea
                                                    v-model="item.comment"
                                                    placeholder="Add Description here"
                                                    type="text"
                                                    :rows="item.comment ? parseInt(item.comment.length / 33) + 1 : 2"
                                            ></md-textarea>
                                        </md-field>
                                    </div>

                                </md-table-cell>
                                <md-table-cell md-label="Priority">
                                    {{item.priority}}

                                    <div v-if="item.editMode">

                                        <md-field>
                                            <md-select v-model="item.priority" name="select">
                                                <md-option v-for="(option, index) in prioritiesList" :key="index"
                                                           :value="option.value">{{ option.value }}
                                                </md-option>
                                            </md-select>
                                        </md-field>
                                    </div>


                                </md-table-cell>

                                <md-table-cell md-label="Actions">
                                    <div v-if="!item.editMode">
                                        <md-button
                                                class="md-info md-sm md-just-icon"
                                                @click="editItem(item)">
                                            <md-icon>edit</md-icon>
                                        </md-button>
                                        <md-button
                                                class="md-danger md-sm md-just-icon event-building-blocks-requirements-delete"
                                                @click="deleteValue(item.id)">
                                            <md-icon>delete_outline</md-icon>
                                        </md-button>
                                    </div>

                                    <div v-if="item.editMode">

                                        <md-button class="md-success md-sm edit-requirement" @click="editValue(item)">
                                            Save
                                        </md-button>
                                        <md-button class="md-default md-sm md-just-icon" @click="cancelEdit(item)">
                                            <md-icon>close</md-icon>
                                        </md-button>
                                    </div>


                                </md-table-cell>


                            </md-table-row>

                        </md-table>
                        <div v-else>
                            <md-table v-if="dummyList && dummyList.length" v-model="dummyList" table-header-color="orange"
                                      class="requirements-table">
                                <md-table-row slot="md-table-row" slot-scope="{ item, index }"
                                              :key="dummyList.indexOf(item)"
                                              >
                                    <md-table-cell md-label="Title">
                                        {{item.title}}
                                    </md-table-cell>
                                    <md-table-cell md-label="Description">
                                        {{'No Description'}}
                                    </md-table-cell>
                                    <md-table-cell md-label="Priority">
                                        {{'Must Have'}}
                                    </md-table-cell>

                                    <md-table-cell md-label="Actions">
                                    </md-table-cell>
                                </md-table-row>
                            </md-table>
                        </div>
                    </md-card-content>
                </md-card>

            </div>
        </div>

    </div>
</template>
<script>
    // import auth from '@/auth';
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
            selectedBlock: Object,
            predefinedRequirements: {
                type: Array,
                default: null
            }
        },
        data: () => ({
            // auth: auth,
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
            dummyList : [
                {
                    title : this.predefinedRequirements[0].title
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
                this.$bus.$emit('BlockAdded');
            },
            getBuildingBlockValues() {
                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id: this.selectedBlock.id});

                new EventComponentValue().for(calendar, event, selected_block).get().then(values => {
                    this.eventBlocks = values;
                    this.isLoading = false;

                });
            },
            addNewValue() {

                this.isLoading = true;

                this.saveAllValues();

                let new_value = {
                    eventComponent: {id: this.selectedBlock.id}
                }

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
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
            handleDrop(data) {
                this.isLoading = true;

                let item = {};
                item.title = data.title;
                item.eventComponent = {id: this.selectedBlock.id};

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
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
                        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
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

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id: this.selectedBlock.id});
                let value = new EventComponentValue({id: item.id});

                value.title = item.title;
                value.priority = item.priority;
                value.comment = item.comment;

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
            editItem(item) {
                this.eventBlocks.forEach((interaction) => {
                    interaction.editMode = false;
                });
                item.editMode = true;
                this.$forceUpdate();
            },
            cancelEdit(item) {
                item.editMode = false;
                this.$forceUpdate();
            }
        },
        computed: {}
    };
</script>
