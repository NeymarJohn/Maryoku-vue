<template>
  <div class="requirement-section">
    <div class="d-flex align-start mb-30">
      <div class="d-flex align-center" style="min-width: 300px;">
        <img :src="`${$iconURL}Requirements/special-request-red.svg`" class="mr-20" />
        <div class="title">
          <div class="font-size-22 font-bold">Special Requests</div>
          <div class="mt-10">
            Would you like to add
            <br />one of those items?
          </div>
        </div>
      </div>

      <div>
        <template v-for="(property, index) in specialRequirements">
          <div
            class="additional-request-tag"
            :class="{selected:property.selected}"
            @click="setRequirement(index)"
            :key="index"
          >
            {{property.label}}
            <md-icon class="icon color-red">add_circle</md-icon>
          </div>
        </template>
      </div>
    </div>
    <div v-for="(property, idx) in specialRequirements">
      <special-requirement-item
              v-if="property.selected"
              :index="idx"
              :data="property"
              @change="handleChangeItem"
      ></special-requirement-item>
    </div>
    <div class="anything-else-section">
      <div class="font-bold mt-10">Anything Else?</div>

      <div class="mt-10">Get me a pink unicorn please.</div>
      <div class="anything-else-section-options mt-10">
        <textarea placeholder="Type name of element here..." v-model="anythingElse" @input="handleNoteChange"></textarea>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import SpecialRequirementItem from './SpecialRequirementItem';
export default {
  components: {
    SpecialRequirementItem,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    note: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      specialRequirements: [],
      anythingElse: this.note,
    };
  },
  methods: {
    getSpecialRequirements(){

      let requirements = this._getUniqueValueArray(this.data, 'subCategory');
      this.specialRequirements = requirements.map(requirement => {
        let items = [];

        this.data.map(item => {
          if(item.subCategory === requirement.subCategory){
            items.push(item);
          }
        });

        let selected = items.some(item => item.isSelected === true);
        let type = null;
        if ( requirement.subCategory === 'Around the space' ){
          type = 'around_the_space';
        } else {
          type = requirement.subCategory.toLowerCase();
        }
        return {selected, label: requirement.subCategory, items, type};
      });

    },
    _getUniqueValueArray(array, key){

      let flags = [];
      let output = [];

      for (let i = 0; i < array.length; i++){
        if ( flags[array[i][key]]  ) continue;
        flags[array[i][key]] = true;
        output.push(array[i]);
      }

      return output;
    },
    handleChangeItem(index){
      this.specialRequirements[index].items.map(item => {
          let index = this.data.findIndex(option => option.item === item.item);
          this.data[index] = JSON.parse(JSON.stringify(item));
      });
      this.$emit('change');
    },
    handleNoteChange(){
      this.$emit('change', {note: this.anythingElse});
    },
    setRequirement(index) {
      this.specialRequirements[index].selected = !this.specialRequirements[index].selected;
    },
  },
  computed: {
    selected() {
      const selectedStatus = {};
      this.specialRequirements.forEach((item) => {
        selectedStatus[item.name] = item.selectedAccessibility;
      }, {});
      return selectedStatus;
    },
  },
  mounted(){
    this.getSpecialRequirements();
    this.$root.$on('revertRequirements', _ => {
      this.getSpecialRequirements();
    });
  }
};
</script>
