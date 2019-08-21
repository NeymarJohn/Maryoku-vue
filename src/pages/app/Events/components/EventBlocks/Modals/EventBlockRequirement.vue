<template>
    <div class="md-layout ">
        <div class="md-layout-item md-size-80 clear-margins">
            <md-card class="md-card-plain" style="margin: 8px;" v-if="true">
                <md-card-header>
                    <h6 class="title" style="font-weight: bold;">
                        3<md-icon class="text-gray" style="font-size: 12px !important;">close</md-icon>Requirement Title
                        <badge class="" type="primary" style="font-size: 10px; margin-top: -3px;">Must Have</badge>
                    </h6>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            Requirement description
                        </div>
                    </div>
                </md-card-content>
            </md-card>

            <md-card class="md-card-plain" style="margin: 8px;" v-if="false">
                <md-card-header>
                    <div style="height: 100%; line-height: 24px; vertical-align: middle; display: table-cell;">
                        <div style="width: auto; display: inline-block;">
                            <label-edit :numeric="true" :icon="false" style="margin-top: 8px; text-align: center;" empty="Amount" :scope="requirement" :text="requirement.value" field-name="value"  @text-updated-blur="groupNameChanged" @text-updated-enter="groupNameChanged"></label-edit>
                        </div>
                        <div style="width: auto; display: inline-block; text-align: center;">
                            <label-edit :icon="false" style="margin-top: 8px; text-align: center;" empty="X" :scope="requirement" text="X" field-name="X" :disabled="true"  @text-updated-blur="groupNameChanged" @text-updated-enter="groupNameChanged"></label-edit>
                        </div>
                        <div style="width: auto; display: inline-block;">
                            <label-edit :icon="false" style="margin-top: 8px;" empty="Title" :scope="requirement" :text="requirement.title" field-name="title"  @text-updated-blur="groupNameChanged" @text-updated-enter="groupNameChanged"></label-edit>
                        </div>
                    </div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <label-edit :icon="false" style="margin-top: 8px;" empty="Description" :scope="requirement" :text="requirement.comment" field-name="comment"  @text-updated-blur="groupNameChanged" @text-updated-enter="groupNameChanged"></label-edit>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </div>
        <div class="md-layout-item md-size-20">
            <div class="text-center" style="margin-top: 30%;">
                <md-button class="md-round md-just-icon md-info" @click="deleteValue(requirement.id)"><md-icon>edit</md-icon></md-button>
                <md-button class="md-round md-just-icon md-danger" @click="deleteValue(requirement.id)"><md-icon>delete_outline</md-icon></md-button>
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
    }
  }
</script>

<style scoped>

</style>
