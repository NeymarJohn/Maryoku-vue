<template>
  <div class="md-layout">
    <modal v-if="modalOpen" @close="noticeModalHide">
      <template slot="header">
        <h4 class="modal-title">
          {{ componentItemIndex !== null && componentItemIndex > -1 ? 'Edit' : 'Add new' }} component
        </h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noticeModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <form>
          <md-card>
            <div class="md-layout">
              <div class="md-layout-item">
                <md-autocomplete v-model="form.title"
                                 data-vv-name="title"
                                 v-validate= "modelValidations.title"
                                 required
                                 :md-options="propertyValues"
                                 class="change-icon-order select-with-icon mb16"
                                 :class="[{'md-error': errors.has('title')}]">
                  <md-icon class="md-accent">person</md-icon>
                  <label>Property Name</label>
                  <span class="md-error" v-if="errors.has('title')">This field is required</span>
                </md-autocomplete>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item">
                <md-field :class="[{'md-error': errors.has('value')}]" class="mb16">
                  <md-icon class="md-accent">attach_money</md-icon>
                  <label>Value</label>
                  <md-input v-model="form.value"
                            data-vv-name="value"
                            v-validate= "modelValidations.value"
                            required/>
                  <span class="md-error" v-if="errors.has('value')">This field is required and should be in range of 0 - 100 000</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item">
                <md-field :class="[{'md-error': errors.has('comment')}]" class="mb16">
                  <md-icon class="md-accent">create</md-icon>
                  <label>Comments</label>
                  <md-textarea md-autogrow
                               v-model="form.comment"
                               data-vv-name="comment"
                               v-validate= "modelValidations.comment"
                               required
                               style="min-height: 36px;"></md-textarea>
                  <span class="md-error" v-if="errors.has('comment')">This field is required</span>
                </md-field>
              </div>
            </div>
          </md-card>
        </form>
      </template>

      <template slot="footer">
        <md-button class="md-simple" @click="noticeModalHide">Cancel</md-button>
        <md-button class="md-primary" @click="validateModalForm">
          {{ componentItemIndex !== null && componentItemIndex > -1 ? 'Save' : 'Create' }}
        </md-button>
      </template>
    </modal>
  </div>
</template>
<script>
  import { Modal } from "@/components";
  import EventComponent from '@/models/EventComponent';
  import EventComponentProperty from '@/models/EventComponentProperty';
  import Vue from 'vue';

  export default {
    name: 'event-modal-components',
    props: {
      componentItem: Object,
      componentIndex: Number,
      componentItemIndex: Number,
      componentId: String,
      shouldUpdate: Boolean,
      updateComponent: Function,
    },
    components: {
      Modal,
    },
    data() {
      return {
        modalOpen: false,
        form: {
          id: null,
          title: "",
          value: null,
          comment: null,
        },
        modelValidations: {
          title: {
            required: true,
          },
          value: {
            required: true,
          },
          comment: {
            required: true,
          }
        },
        propertyValues: [],
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
        this.$validator.validateAll().then(isValid => {
          if (isValid) {
            let store = this.$store.state.eventData.components[this.componentIndex];
            this.form.propertyId = 'custom';

            if (this.componentItemIndex !== null) {
              Vue.set(store.values, this.componentItemIndex, this.form);
            } else {
              delete this.form.id; // remove id key
              this.form.propertyId = 'custom';
              store.values.push(this.form);
            }

            if (this.shouldUpdate) {
              this.$props.updateComponent(store, this.form);
            }

            this.$store.commit('updateEventData', store)
            this.clearForm();
            this.modalOpen = false;
          }
        });
      },
      clearForm() {
        this.form = {
          id: null,
          title: null,
          value: null,
          comment:  null,
        };
      },
    },
    created() {
      EventComponent.get().then((componentsList) => {
        let propertiesList = new EventComponentProperty().for(componentsList[0]);

        propertiesList.get().then(response => {
          this.propertyValues = response.length ? response.map((val) => val.title) : [];
          console.log(response);
        });
      });
    },
    mounted() {
      EventComponent.get().then((componentsList) => {
        let propertiesList = new EventComponentProperty().for(componentsList[0]);

          propertiesList.get().then(response => {
            this.propertyValues = response.length ? response.map((val) => val.title) : [];
          });
      });
    },
    watch: {
      componentItem: function(val) {
        this.form.id = 'id' in val ? val.id : null;
        this.form.title = 'title' in val ? val.title : '';
        this.form.value = 'value' in val ? val.value : '';
        this.form.comment = 'comment' in val ? val.comment : '';
      },
    },
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
