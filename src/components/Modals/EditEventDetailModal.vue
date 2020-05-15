<template>
  <modal v-if="showEditDetailModal" class="edit-event-model">
    <template slot="header">
      <div class="edit-event-model__header">
        <h2>
          Edit event's detail
        </h2>
        <div class="header-description">
          <img :src="`${iconsURL}warning-circle-gray.svg`" width="20" /> 
          Your changes will be deleted after that
        </div>
      </div>
      <md-button
        class="md-simple md-just-icon md-round modal-default-button"
        @click="showEditDetailModal = false"
      >
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="footer">
      <md-button class="md-default md-simple cancel-btn" @click="showEditDetailModal=false">Cancel</md-button>
      <md-button class="md-rose add-category-btn" @click="addBuildingBlock">Save</md-button>
    </template>
  </modal>
</template>

