<template>
  <div>
    <div v-if="item.type === 'string'">
      <md-field>
        <label>{{ item.name }}</label>
        <md-input
          v-model="vendor.vendorPropertyValues[item.id]"
          type="text"
          :required="item.mandatory"
        />
      </md-field>
    </div>
    <div v-else-if="item.type === 'text'">
      <md-field>
        <label>{{ item.name }}</label>
        <md-textarea
          v-model="vendor.vendorPropertyValues[item.id]"
          autogrow
          :required="item.mandatory"
        />
      </md-field>
    </div>
    <div v-else-if="item.type === 'boolean'">
      <md-checkbox
        v-model="vendor.vendorPropertyValues[item.id]"
        :required="item.mandatory"
      >
        {{ item.name }}
      </md-checkbox>
    </div>
    <div v-else-if="item.type === 'integer'">
      <md-field>
        <label>{{ item.name }}</label>
        <md-input
          v-model="vendor.vendorPropertyValues[item.id]"
          type="number"
          :required="item.mandatory"
        />
      </md-field>
    </div>
    <div v-else-if="item.type === 'float'">
      <md-field>
        <label>{{ item.name }}</label>
        <md-input
          v-model="vendor.vendorPropertyValues[item.id]"
          type="number"
          :required="item.mandatory"
        />
      </md-field>
    </div>
    <div v-else-if="item.type === 'date'">
      <md-datepicker
        v-model="vendor.vendorPropertyValues[item.id]"
        class="purple-field with-icon"
        md-immediately
      >
        <label>{{ item.name }}</label>
      </md-datepicker>
    </div>
    <div v-else-if="item.type === 'image'">
      {{ item.name }} <strong>{{ item.type }}</strong>
    </div>
    <div v-else-if="item.type === 'image-array'">
      {{ item.name }} <strong>{{ item.type }}</strong>
    </div>
    <div v-else-if="item.type === 'file'" />
    <div v-else-if="item.type === 'file-array'" />
    <div v-else-if="item.type === 'geo-map'" />
    <div v-else-if="item.type === 'link'">
      <md-field>
        <label>{{ item.name }}</label>
        <md-input
          v-model="vendor.vendorPropertyValues[item.id]"
          type="text"
          :required="item.mandatory"
        />
      </md-field>
    </div>
    <div v-else-if="item.type === 'single-selection'">
      <md-field>
        <label>{{ item.name }}</label>
        <md-select
          :id="item.id"
          v-model="vendor.vendorPropertyValues[item.id]"
          :name="item.name"
        >
          <md-option
            v-for="opt in item.selectionOptions"
            :id="opt.id"
            :key="opt.id"
            :value="opt.id"
          >
            {{ opt.title }}
          </md-option>
        </md-select>
      </md-field>
    </div>
    <div
      v-else-if="
        item.type === 'multiple-selection' || item.type === 'multi-selection'
      "
    >
      <md-field>
        <label>{{ item.name }}</label>
        <md-select
          :id="item.id"
          v-model="vendor.vendorPropertyValues[item.id]"
          :name="item.id"
          multiple
        >
          <md-option
            v-for="opt in item.selectionOptions"
            :id="opt.id"
            :key="opt.id"
            :value="opt.id"
          >
            {{ opt.title }}
          </md-option>
        </md-select>
      </md-field>
    </div>
    <div v-else-if="item.type === 'single-selection-with-amount'">
      {{ item.name }} <strong>{{ item.type }}</strong>
    </div>
    <div v-else-if="item.type === 'multiple-selection-with-amount'">
      {{ item.name }} <strong>{{ item.type }}</strong>
    </div>
    <div v-else>
      <md-field>
        <label>{{ item.name }}</label>
        <md-input
          v-model="vendor.vendorPropertyValues[item.id]"
          type="text"
          :required="item.mandatory"
        />
      </md-field>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    vendor: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    if (
      this.item.type === "multiple-selection" ||
      this.item.type === "multi-selection"
    ) {
      this.vendor.vendorPropertyValues[this.item.id] = [];
    }
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
