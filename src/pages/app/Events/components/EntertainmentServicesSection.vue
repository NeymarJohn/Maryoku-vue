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
        <td style="display: flex; align-items: center">
          <div style="padding-top: 14px; align-self: center">{{ service.item }}</div>
        </td>
        <td>
          <div v-if="service.type === 'select'">
            <entertainment-services-selector
                    :data="service"
                    @change=handleChangeItem
            >
            </entertainment-services-selector>
          </div>
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
    <div class="additional-request">
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

export default {
  name: "entertainment-services-section",
  components: {
    EntertainmentServicesSelector,
  },
  props: {
    data: {
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
    };
  },
  methods: {
    getServicesRequirements(){
      this.services = [];
      let checked = this.data['multi-selection'][0].options.filter(ms => ms.selected);

      checked.map(ch => {
        if ( ch.name === 'DJ Services' || ch.name === 'Band' || ch.name === 'Entertainment' ) {
          let options = [];
          this.data['Services'].map(sv => {
            if(sv.subCategory && sv.subCategory.trim() === ch.name.trim()) {
              options.push({label: sv.item, isSelected: sv.isSelected});
            }
          })
          this.services.push({item: ch.name, isSelected: ch.selected, type: 'select', options});
          this.$forceUpdate();
        }

      })

      this.data['Services'].map(sv => {
        if( sv.item === 'Onsite coordinators, instructors, guides' || sv.item === 'keynote speaker/Special MC' ) {
          this.services.push(sv);
        }
      })

      console.log("getServicesRequirements", this.services);
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
      }

      let requirements = this.data;
      requirements['multi-selection'][0].options.map(op => {
        if(op.name === service.item) op.selected = false;
      });
      requirements['Services'].map(it => {
        if(it.subCategory && it.subCategory.trim() === service.item.trim()){
          service.options.map(op => {
            if(op.label === it.item) it.isSelected = false;
          })
        }
      });
      this.$emit('change', requirements);
    },
    handleChangeItem(service){
      let requirements = this.data;
      requirements['Services'].map(it => {
        if(it.subCategory && it.subCategory.trim() === service.item.trim()){
          service.options.map(op => {
            if(op.label === it.item) it.isSelected = op.isSelected;
          })
        }
      });

      this.$emit('change', requirements);
    },
  },
  mounted(){
    this.getServicesRequirements();
    this.$root.$on('multi-select.change', (index, data) => {
      this.getServicesRequirements();
    })
    this.$root.$on('revertRequirements', _ => {
      this.getServicesRequirements();
    });
  }
};
</script>
