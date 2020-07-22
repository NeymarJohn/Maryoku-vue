<template>
  <div v-if="component.title !== 'Total'" class="event-budget-component d-flex" :style="`border-left: 10px solid ${component.color}`">
    <div class="font-size-20 font-bold name">
      <img class="icon" :src="`${$iconURL}Budget Elements/${component.icon}`">
      {{component.title}}
    </div>
    <div class="text-right font-size-20 flex-1 budget">${{component.allocatedBudget | withComma}}</div>
    <div class="actions">
      <md-button class="edit-btn md-simple" @click="editBudget">
          <img :src="`${$iconURL}Event%20Page/edit-dark.svg`" />
      </md-button>
      <md-button class="edit-btn md-simple" @click="deleteComponent">
        <img class="trash" :src="`${$iconURL}Timeline-New/Trash.svg`" />
      </md-button>
    </div>
  </div>
  <div v-else class="event-budget-component d-flex total" >
    <div class="font-size-20 font-bold name">
      {{component.title}}
    </div>
    <div class="text-right font-size-20 flex-1">${{component.allocatedBudget | withComma}}</div>
    <div class="actions"> </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isEditing: false
      }
    },
    props: {
      component: {
        type: Object,
        default: {}
      },
    },
    created () {
      console.log(this.component);
    },
    methods: {
      editBudget() {
        
      },
      deleteComponent() {

      }
    },
  }
</script>
<style lang="scss" scoped>
.event-budget-component{
  height: 88px;
  border-radius: 3px;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  margin-top: 12px;
  display:flex;
  align-items:center;
  justify-content: space-between;
  padding: 10px 10px 10px 20px;
  cursor: pointer;
  .name {
    width: 60%;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    .icon {
      width: 30px
    }
  }
 
  .actions {
    opacity: 0;
    width: 100px;
    margin-left: 30px;
    img {
      max-width: 22px;
      max-height: 20px;
      margin: 10px;
    }
  }
  &:hover{
    .actions {
      opacity: 1;
    }
    .budget {
      font-weight: bold;
    }
  }
  &.total {
    border-left: 10px solid #434343;
    background-color: #434343;
    color: white;
    height: 72px;
  }
}
</style>