<template>
    <div class="md-layout ">
        <div class="md-layout-item md-size-80 clear-margins" style="border-right: 1px solid #eee;">
            <md-card class="md-card-plain" style="margin: 8px;" v-if="!editMode">
                <md-card-header>
                    <h6 class="title" style="font-weight: bold;">
                        {{requirement.value || 1}}
                        <!--<input type="text" class="requirement-input" ref="amountInput" @keydown="adjustInputSize('amountInput')"></input>-->
                        <!--<label-edit :text="requirement.value || 1" field-name="value" :icon="false" style="width: auto; display: inline-block;"></label-edit>-->
                        <md-icon class="text-gray" style="font-size: 12px !important;">close</md-icon>
                        {{requirement.title}}
                        <badge v-if="requirement.mandatory" class="" type="danger" style="background-color: white; border: 1px solid #ff0000; color: #ff0000; padding: 4px 6px 3px 6px; font-size: 8px;line-height: 14px; margin-left: 8px;">Must Have</badge>
                    </h6>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            {{requirement.comment || 'Description here'}}
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <md-card class="md-card-plain" style="margin: 8px;" v-if="editMode">
                <md-card-header>
                    <h6 class="title" style="font-weight: bold;">
                        <input v-model="requirement.value" type="text" class="requirement-input" placeholder="#" ref="amountInput" @keydown="adjustInputSize('amountInput')"></input>
                        <!--<label-edit :text="requirement.value || 1" field-name="value" :icon="false" style="width: auto; display: inline-block;"></label-edit>-->
                        <md-icon class="text-gray" style="font-size: 12px !important;">close</md-icon>
                        <input v-model="requirement.title" type="text" class="requirement-input" placeholder="Title" style="text-align: left;" ref="titleInput" @keydown="adjustInputSize('titleInput')"></input>
                        <badge v-if="requirement.mandatory" class="" type="danger" style="background-color: white; border: 1px solid #ff0000; color: #ff0000; padding: 4px 6px 3px 6px; font-size: 8px;line-height: 14px; margin-left: 8px;">Must Have</badge>
                    </h6>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            {{requirement.comment || 'Description here'}}
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </div>

        <div class="md-layout-item md-size-20">
            <div class="text-center" style="margin-top: 18px;">
                <md-button v-if="!editMode" class="md-round md-just-icon md-info" @click="editMode = true"><md-icon>edit</md-icon></md-button>
                <md-button v-if="!editMode" class="md-round md-just-icon md-danger" @click="deleteValue(requirement.id)"><md-icon>delete_outline</md-icon></md-button>
                <md-button v-if="editMode" class="md-xs md-success"  style="width: auto;">Save</md-button>
                <md-button v-if="editMode" class="md-xs md-simple" style="width: auto;">Cancel</md-button>
                <div style="margin-top: 12px;" v-if="editMode">
                    <md-switch class="md-switch-success md-switch-small" style="" v-model="requirement.mandatory"></md-switch>
                    <div style="display: inline-block; margin: 0; padding: 0; top: -9px; position: relative;"><small class="" style="font-size: 10px;">Must Have</small></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import LabelEdit from '@/components/LabelEdit';
  import Badge from '@/components/Badge';

  export default {
    name: 'event-block-requirement',
    components: {LabelEdit, Badge},
    props: {
      requirement: Object,
      deleteValue: Function
    },
    data() {
      return {
        editMode: false
      }
    },
    methods: {
      adjustInputSize(refName){
        let input = this.$refs[refName]
        if (input) {
          input.size = input.value ? Math.ceil(input.value.length * 1.3) : 2
        }
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

</style>
