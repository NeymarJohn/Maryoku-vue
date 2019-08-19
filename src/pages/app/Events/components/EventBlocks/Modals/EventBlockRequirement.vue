<template>
    <div class="md-layout hover-parent">
        <vue-element-loading :active="working" spinner="ring" color="#FF547C"></vue-element-loading>
        <div class="md-layout-item md-size-90 clear-margins">
            <md-card class="md-card-plain" style="margin: 8px;" v-if="!requirement.editMode">
                <md-card-header>
                    <h5 class="title" style="font-weight: bold;">
                        {{requirement.value || 1}}
                        <md-icon class="text-gray" style="font-size: 14px !important;">close</md-icon>
                        {{requirement.title}}
                        <badge v-if="requirement.mandatory" class="inline-badge" type="danger">Must Have</badge>
                    </h5>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout" v-if="requirement.comment">
                        <div class="md-layout-item md-size-100" style="margin-left: 6px !important; margin-bottom: 8px;">
                            {{requirement.comment}}
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <md-card class="md-card-plain" style="margin: 8px;" v-if="requirement.editMode">
                <md-card-header>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-15">
                            <md-field>
                                <label>Amount</label>
                                <md-input v-focus type="text" v-model="tempValue"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-85">
                            <md-field>
                                <label>Title</label>
                                <md-input type="text" v-model="tempTitle"></md-input>
                            </md-field>
                        </div>
                    </div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-75">
                            <md-field>
                                <label>Description</label>
                                <md-input type="text" v-model="tempComment"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-25">
                            <div style="margin-top: 12px;">
                                <md-switch class="md-switch-success" style="" v-model="tempMandatory">Must Have</md-switch>
                            </div>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </div>

        <div class="md-layout-item md-size-10">
            <div class="text-right pull-right" style="margin-top: 18px; white-space: nowrap;">
                <md-button v-if="!requirement.editMode" class="md-xs md-round md-just-icon md-info hover" @click="startEdit(requirement)"><md-icon>edit</md-icon></md-button>
                <md-button v-if="!requirement.editMode" class="md-xs md-round md-just-icon md-danger hover" @click="deleteValue(requirement.id)"><md-icon>delete_outline</md-icon></md-button>
                <md-button v-if="requirement.editMode" class="md-xs md-round md-just-icon md-success" @click="saveEdit(requirement)"><md-icon>check</md-icon></md-button>
                <md-button v-if="requirement.editMode" class="md-xs md-round md-just-icon md-warning" @click="cancelEdit"><md-icon>close</md-icon></md-button>
            </div>
        </div>
    </div>
</template>

<script>
  import LabelEdit from '@/components/LabelEdit';
  import Badge from '@/components/Badge';
  import EventComponentValue from '@/models/EventComponentValue'
  import EventComponent from '@/models/EventComponent'
  import Calendar from '@/models/Calendar'
  import CalendarEvent from '@/models/CalendarEvent'

  export default {
    name: 'event-block-requirement',
    components: {LabelEdit, Badge},
    props: {
      requirement: Object,
      deleteValue: Function,
      eventId: String,
      selectedBlockId: String
    },
    data() {
      return {
        working: false,
        tempValue: 1,
        tempTitle: "",
        tempComment: "",
        tempMandatory: false
      }
    },
    mounted(){
      if (this.requirement.editMode){
        this.startEdit(this.requirement);
      }
    },
    methods: {
      adjustInputSize(refName){
        let input = this.$refs[refName]
        if (input) {
          input.size = input.value ? Math.ceil(input.value.length * 1.3) : 2
        }
      },
      startEdit (requirement){
        this.requirement.editMode = true;
        this.tempValue = requirement.value;
        this.tempTitle = requirement.title;
        this.tempComment = requirement.comment;
        this.tempMandatory = requirement.mandatory;
        this.$forceUpdate();
      },
      cancelEdit (){
        this.requirement.editMode = false;
        this.$forceUpdate();
      },
      saveEdit (requirement){
        this.working = true;
        requirement.value = this.tempValue;
        requirement.title = this.tempTitle;
        requirement.comment = this.tempComment;
        requirement.mandatory = this.tempMandatory;

        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
        let event = new CalendarEvent({id: this.eventId});
        let selectedBlock = new EventComponent({id: this.selectedBlockId});

        new EventComponentValue(this.requirement).for(calendar, event, selectedBlock).save().then(res=>{
          this.requirement.editMode = false;
          this.working = false;
          this.$forceUpdate();
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

    .requirement-input {
        border-radius: 3px;
        border: none;
        box-shadow: 0 0 3px #aaa;
        padding: 3px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        margin: 0;
    }

    .separator {
        border-left: 1px dashed #ddd;
    }

    .hover-parent {
        .hover {
            opacity: 0;
            transition: opacity .1s ease-out;
        }
        &:hover {
            .hover {
                opacity: 1;
                transition: opacity .3s ease-in;
            }
        }
    }

    .inline-badge {
        background-color: white;
        border: 1px solid #ff0000;
        color: #ff0000;
        padding: 4px 6px 3px 6px;
        font-size: 8px;
        font-weight: 500;
        letter-spacing: 1.5px;
        line-height: 14px;
        margin-left: 8px;
        display: inline;
        top: -2px;
        position: relative;
    }

</style>
