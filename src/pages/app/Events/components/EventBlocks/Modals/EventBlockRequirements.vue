<template>
    <div class="adding-building-blocks-panel">
        <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
        <div class="md-layout">
            <h4 class="md-title md-layout-item md-size-100" style="margin-bottom: 0; line-height: 51px; width:100%;">
                <md-button @click="closePanel" class="md-button md-theme-default md-simple md-just-icon">
                    <md-icon>arrow_back</md-icon>
                </md-button>
                {{this.selectedBlock.title}} Requirements

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
                        <md-table v-if="eventBlocks && eventBlocks.length" v-model="eventBlocks" table-header-color="orange"
                                  class="requirements-table">
                            <md-table-row slot="md-table-row" slot-scope="{ item, index }"
                                          :key="eventBlocks.indexOf(item)" >
                                <md-table-cell md-label="Requirement" class="requirement-title">
                                    <div class="field-section">
                                        <label-edit :text="item.title"
                                                    :field-name="item.id.toString()"
                                                    :scope="`title`"
                                                    @text-updated-blur="editValue"
                                                    @text-updated-enter="editValue"></label-edit>

                                        <md-button class="md-rose md-just-icon md-simple" @click="editItemDescription(item)">
                                            <md-icon>comment</md-icon>
                                        </md-button>
                                    </div>


                                    <div class="item-description-field" v-if="item.editMode">
                                        <md-field>
                                            <md-textarea
                                                v-model="item.comment"
                                                placeholder="Add Description here"
                                                type="text"
                                                :rows="item.comment ? parseInt(item.comment.length / 33) + 1 : 2"
                                                @change="itemChanged(item)"
                                            ></md-textarea>
                                        </md-field>
                                    </div>

                                </md-table-cell>

                                <md-table-cell md-label="Amount" class="requirement-amount">
                                    <span class="dollar-sign">$</span>
                                    <label-edit :text="item.value"
                                                :field-name="item.id.toString()"
                                                :scope="`value`"
                                                @text-updated-blur="editValue"
                                                @text-updated-enter="editValue"></label-edit>
                                </md-table-cell>

                                <md-table-cell md-label="Must Have?" class="requirement-must-have">
                                    <md-checkbox v-model="item.mandatory" @change="mustHaveChanged(item)"></md-checkbox>
                                </md-table-cell>

                                <md-table-cell md-label="">
                                    <md-button
                                        class="md-danger md-sm md-just-icon event-building-blocks-requirements-delete"
                                        @click="deleteValue(item.id)">
                                        <md-icon>delete_outline</md-icon>
                                    </md-button>
                                </md-table-cell>


                            </md-table-row>
                        </md-table>
                        <div v-else>
                            <md-table v-model="dummyList" table-header-color="orange"
                                      class="requirements-table">
                                <md-table-row slot="md-table-row" style="opacity:0.4; background : #efefef;" slot-scope="{ item, index }"
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
                        <div class="pull-left">
                            <md-button class="md-default md-simple add-new-requirements"  @click="addNewValue">
                                Add New <md-icon>add</md-icon>
                            </md-button>
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
    import ClickOutside from 'vue-click-outside'
    import {LabelEdit} from '@/components';
    import draggable from 'vuedraggable';
    import {Drag, Drop} from 'vue-drag-drop';

    export default {
        components: {
            MdCardContent,
            VueElementLoading,
            LabelEdit,
            draggable, Drag, Drop,
            ClickOutside
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
            dummyList : [
                {
                    title : this.predefinedRequirements ? this.predefinedRequirements[0].title : 'No Title'
                }
            ]
        }),

        created() {
        },
        mounted() {

            this.getBuildingBlockValues();

            // put dummy item
            this.dummyList[0].title = this.predefinedRequirements ? this.predefinedRequirements[0].title : 'No Title';
        },
        methods: {
            closePanel() {
                this.$emit("closePanel");
            },
            getBuildingBlockValues( newValueId = null) {
                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id: this.selectedBlock.id});

                new EventComponentValue().for(calendar, event, selected_block).get().then(values => {
                    this.eventBlocks = values;
                    console.log(values);
                     if ( newValueId ) {

                        let newValue = _.findWhere(this.eventBlocks,{id : newValueId});
                        newValue.editMode = true;
                        this.$forceUpdate();
                    }
                    this.isLoading = false;

                });
            },
            addNewValue() {

                this.isLoading = true;

                this.saveAllValues();

                let new_value = {
                    eventComponent: {id: this.selectedBlock.id},
                    editMode : true
                }

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id: this.selectedBlock.id});

                new EventComponentValue(new_value).for(calendar, event, selected_block).save().then(res => {

                    this.isLoading = false;
                    this.getBuildingBlockValues();
                });
            },
            handleDrop(data) {
                this.isLoading = true;

                let item = {};
                item.title = data.title;
                item.eventComponent = {id: this.selectedBlock.id};
                item.editMode= true;

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                let eventObject = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id: this.selectedBlock.id});

                new EventComponentValue(item).for(calendar, eventObject, selected_block).save().then(res => {

                    this.isLoading = false;
                    this.getBuildingBlockValues(res.item.id);
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
            editRequirementItemProperty(property,val,item){

                if ( !item ) {
                    return;
                }
                this.isLoading = true;

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});
                let selected_block = new EventComponent({id: this.selectedBlock.id});
                let value = new EventComponentValue({id: item.id});

                value[property] = val ? val : false;

                value.for(calendar, event, selected_block).save().then(resp => {
                    this.isLoading = false;
                    this.cancelEdit(item);
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
            /**
             * Edit requirement item
             * @{val} new value for the item property
             * @{fieldName} the id for the item
             * @{scope} property name to set the new value in it
             * */
            editValue(val, fieldName , scope) {

                let item = _.findWhere(this.eventBlocks,{id : fieldName});

                this.editRequirementItemProperty(scope,val,item);

            },
            saveAllValues() {
                let _self = this;
                this.eventBlocks.forEach(block => {
                    _self.editValue(block);
                })
            },
            editItemDescription(item) {

                item.editMode = !item.editMode;
                this.$forceUpdate();
            },
            cancelEdit(item) {
                item.editMode = false;
                this.$forceUpdate();
            },
            itemChanged (item) {
                this.editRequirementItemProperty('comment',item.comment,item);
            },
            mustHaveChanged (item) {
                this.editRequirementItemProperty('mandatory',item.mandatory,item);
            }
        },
        computed: {}
    };
</script>
