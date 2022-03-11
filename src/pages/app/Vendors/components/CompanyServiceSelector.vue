<template>
  <div class="company-services-selector">
    <category-selector
      :value="value || ''"
      :categories="options.available"
      column="2"
      :multiple="true"
      @change="updateExChecked"
    />
  </div>
</template>
<script>
import CategorySelector from "@/components/Inputs/CategorySelector";
export default {
  components: {
    CategorySelector,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    defaultValue: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      checked: true,
      value: "",
      categories: [],
    };
  },
  created() {
    console.log(this.defaultValue);
    this.value = this.defaultValue;
  },
  methods: {
    updateExChecked(selectedValues) {
      this.$emit("change", selectedValues);
    },
  },
};
</script>
