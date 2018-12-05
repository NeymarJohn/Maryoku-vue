<template>
  <div class="md-layout">
    <modal v-if="modalOpen" @close="noticeModalHide">
      <template slot="header">
        <h4 class="modal-title">Add new vendor</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noticeModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <form @submit.prevent="validateModalForm" class="md-layout">
          <md-card>
            <div class="md-layout">
              <div class="md-layout-item">
                <md-autocomplete v-model="form.name" :md-options="values" name="component-name" class="change-icon-order">
                  <md-icon class="md-accent">person</md-icon>
                  <label>Property Name</label>
                </md-autocomplete>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item">
                <md-field>
                  <md-icon class="md-accent">attach_money</md-icon>
                  <label>Value</label>
                  <md-input name="component-value" v-model="form.value" />
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item">
                <md-field>
                  <md-icon class="md-accent">create</md-icon>
                  <label>Comments</label>
                  <md-textarea md-autogrow name="component-comment" v-model="form.comment" style="min-height: 36px;"></md-textarea>
                </md-field>
              </div>
            </div>
          </md-card>
        </form>
      </template>

      <template slot="footer">
        <md-button class="md-simple" @click="noticeModalHide">Cancel</md-button>
        <md-button class="md-primary">Create</md-button>
      </template>
    </modal>
  </div>
</template>
<script>
  import { Modal } from "@/components";

  export default {
    name: 'event-modal-components',
    components: {
      Modal,
    },
    data() {
      return {
        modalOpen: false,
        form: {
          id: null,
          name: null,
          value: null,
          comment: null,
        },
        values: [
          'value1',
          'value2',
          'value3',
        ]
      }
    },
    methods: {
      noticeModalHide() {
        this.modalOpen = false;
      },
      toggleModal(show) {
        this.modalOpen = show;
      },
      validateModalForm() {
        return true;
      }
    }
  }
</script>
<style lang="scss">
  .change-icon-order {
    .md-menu {
      order: 2;
    }
    .md-icon {
      order: 1;
    }
  }
</style>
