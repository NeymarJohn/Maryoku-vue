<template>
  <div class="requirement-section">
    <table class="requirement-section-table">
      <thead>
      <tr>
        <th>
              <span class="section-title">
                <img :src="`${$iconURL}Requirements/Services.svg`" class="mr-20" style="width: 60px" />
                Services
              </span>
        </th>
        <th>
          <div class="text-center">How Many?</div>
        </th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr
              class="requirement-item"
              v-for="(service, index) in services.filter(sv => sv.isSelected)"
              :key="index"
      >
        <td>
          <div>{{ service.item }}
            <div v-if="service.type === 'select'">
              <!--<entertainment-services-selector-->
              <!--:service="service"-->
              <!--:key="index"-->
              <!--@change=handleChangeItem-->
              <!--&gt;-->
              <!--</entertainment-services-selector>-->
              <multiselect
                      v-model="service.value"
                      :options="service.options"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :searchable="false"
                      :multiple="true"
                      tag-placeholder="Add this as new tag"
                      placeholder="Select the services"
                      class="multiple-selection small-selector"
                      @select="handleChangeItem(service.item, 'select', $event)"
                      @remove="handleChangeItem(service.item, 'remove', $event)"
              ></multiselect>
            </div>
          </div>
        </td>
        <td>
          <template v-if="service.qtyEnabled">
            <input class="quantity-input" type="number" v-model="service.defaultQty" />
            <span v-if="service.hint">
                        <img :src="`${$iconURL}Event%20Page/light.svg`" width="20" />
                        <md-tooltip md-direction="bottom">{{ service.hint }}</md-tooltip>
                      </span>
          </template>
        </td>
        <td>
          <div>
            <md-button class="md-icon-button md-simple requirement-action" v-if="service.qtyEnabled">
              <img :src="`${$iconURL}Requirements/edit-dark.svg`" width="20" />
            </md-button>
            <md-button
                    class="md-icon-button md-simple requirement-action"
                    @click="removeRequirement(service)"
            >
              <img :src="`${$iconURL}Requirements/delete-dark.svg`" width="20" />
            </md-button>
          </div>
        </td>
        <td>
          <div v-if="service.type !== 'select'" class="condition">
            <md-checkbox class="md-simple md-checkbox-circle md-red" v-model="service.mustHave" :value="true"
            >Must Have</md-checkbox
            >
            <md-checkbox
                    class="md-simple md-checkbox-circle md-red"
                    v-model="service.mustHave"
                    :value="false"
            >Nice To Have</md-checkbox
            >
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="additional-request mb-30">
      <div class="additional-request-description">
        <h4>Additional Requests</h4>
        <div>Would you like to add one of those items?</div>
      </div>
      <div>
        <div
                class="additional-request-tag"
                v-for="(service, index) in services.filter((item) => !item.isSelected && item.visible)"
                :key="index"
                @click="addRequirement(service)"
        >
          {{ service.item }}
          <md-icon class="icon color-red">add_circle</md-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import EntertainmentServicesSelector from "./EntertainmentServicesSelector";
import Multiselect from "vue-multiselect";

export default {
  name: "entertainment-services-section",
  components: {
    EntertainmentServicesSelector,
    Multiselect
  },
  props: {
    requirements: {
      type: Object,
      required: true,
    },
    note: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      services: [],
      anythingElse: this.note,
    };
  },
  methods: {
    getServicesRequirements(){
      this.services = [];
      let checked = this.requirements['multi-selection'][0].options.filter(ms => ms.selected);

      checked.map(ch => {

          let options = [];
          let value = [];
          this.requirements['Services'].map(sv => {
            if(sv.subCategory && (sv.subCategory.trim() === ch.name.trim() || sv.subCategory.trim().indexOf(ch.name.trim()) !== -1)) {
              options.push(sv.item);
              if(sv.isSelected) value.push(sv.item);
            }
          })
          this.services.push({item: ch.name, isSelected: ch.selected, type: 'select', options, value});


      })

      this.requirements['Services'].map(sv => {
        if( sv.item === 'Onsite coordinators, instructors, guides' || sv.item === 'keynote speaker/Special MC' ) {
          this.services.push(sv);
        }
      })
      console.log("entertainment.getService", this.requirements, this.services);
    },
    addRequirement(service) {
      const index = this.services.findIndex((it) => it.item == service.item);
      this.services[index].isSelected = true;
    },
    removeRequirement(service) {
      const index = this.services.findIndex((it) => it.item == service.item);
      if ( service.type === 'select' ){
        this.services.splice(index, 1);
      } else {
        this.services[index].isSelected = false;
        return;
      }

      // let requirements = this.requirements;
      this.requirements['multi-selection'][0].options.map(op => {
        if(op.name === service.item) op.selected = false;
      });
      this.requirements['Services'].map(it => {
        if(it.subCategory && it.subCategory.trim() === service.item.trim()){
          service.options.map(op => {
            if(op.label === it.item) it.isSelected = false;
          })
        }
      });

      this.$emit('change', this.requirements);
    },
    handleChangeItem(cat, action, e){
      this.requirements['Services'].map(it => {
        if(it.subCategory && it.subCategory.trim() === cat.trim() && it.item === e){
          it.isSelected = action === 'select';
        }
      });

      this.$emit('change', this.requirements);
    },
    handleNoteChange(){
      this.$emit('change', {note: this.anythingElse});
    },
  },
  watch: {
    requirements:{
     handler(newVal, oldVal){
       // console.log("props.change", newVal);
       this.getServicesRequirements();
     },
     deep: true,
    }
  },
  mounted(){
    this.getServicesRequirements();
  }
};
</script>
