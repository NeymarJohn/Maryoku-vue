<template>
  <modal class="budget-handle-minus-model">
    <template slot="header">
      <div class="edit-event-model__header">
        <md-icon>arrow-back</md-icon>
        <div>-${{value}}</div>
        <h2>
          Oops, The changes you made <br/>
          have got you in the minus
        </h2>
        <div class="header-description">
          <img :src="`${iconsURL}warning-circle-gray.svg`" width="20" /> 
          Your changes will be deleted after that
        </div>
      </div>
      <div class="edit-event-model__content">
        <md-icon>arrow-back</md-icon>
        <div>-${{value}}</div>
        <h2>
          Oops, The changes you made <br/>
          have got you in the minus
        </h2>
        <div class="header-description">
          <img :src="`${iconsURL}warning-circle-gray.svg`" width="20" /> 
          Your changes will be deleted after that
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-radio v-model="radio" value="keep">Keep me in minus for now</md-radio>
            <md-radio v-model="radio" value="take">Take that money from ‘Unexpected’ category</md-radio>
            <md-radio v-model="radio" value="add">Add more money</md-radio>
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-default md-simple cancel-btn" @click="showEditDetailModal=false">Cancel</md-button>
      <md-button class="md-rose add-category-btn" @click="addBuildingBlock">Save</md-button>
    </template>
  </modal>
</template>

<script>
export default {
  name: "budget-handle-minus-modal",
  props: {
    value:[ Number ]
  },
  data: ()=>{
    return {
      
    }
  }
}
</script>