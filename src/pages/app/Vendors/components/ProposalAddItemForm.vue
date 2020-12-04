<template>
  <div class="title-cont default">
    <div class="sub-items-cont">
      <span class="prev" @click="prev()" v-if="serviceSlidePos < 0">
        <md-icon>keyboard_arrow_left</md-icon>
      </span>
      <div class="sub-items" :style="{ left: `${serviceSlidePos}px` }" ref="servicesCont">
        <select-proposal-sub-item
          :selected="isSelectedQuickButton('')"
          :item="requirement.item ? requirement.item : requirement.subCategory"
          v-for="(requirement, sIndex) in optionalRequirements"
          :key="sIndex"
        />
      </div>
      <span class="next" @click="next()">
        <md-icon>keyboard_arrow_right</md-icon>
      </span>
    </div>
    <div class="add-item-cont">
      <div class="fields-cont">
        <div class="field">
          <span>Description</span>
          <input v-model="serviceItem" class="description" placeholder="Type name of element here" />
        </div>
        <div class="field">
          <span>Size</span>
          <input v-model="serviceItemSize" />
        </div>
        <div class="field">
          <span>QTY</span>
          <money v-model="qty" v-bind="qtyFormat" @keyup.native="calculateSubTotal()" />
        </div>
        <div class="field">
          <span>Price per unit</span>
          <money v-model="unit" v-bind="currencyFormat" @keyup.native="calculateSubTotal()" />
        </div>
        <div class="field">
          <span>Total</span>
          <money v-model="subTotal" v-bind="currencyFormat" v-if="isNumberVisible" class="total" />
          <money v-model="unit" v-bind="currencyFormat" v-else class="total" />
        </div>
      </div>
      <div class="fields-cont">
        <md-checkbox v-model="isRequiredPlannerChoice"
          ><span class="mr-10">This item requires planners choice</span>
          <md-icon class="color-black">keyboard_arrow_downz</md-icon
          ><md-icon class="color-red">help_outline</md-icon></md-checkbox
        >
      </div>
      <div class="action-cont">
        <a class="cancel" @click="cancel()">Clear</a>
        <a class="addNote" @click="cancel()">
          <md-icon>add_circle_outline</md-icon>
          Add Note</a
        >
        <a
          class="save"
          :class="{ isDisabled: isDisabledAdd }"
          @click="saveItem(serviceItem, serviceItemSize, qty, unit, category)"
          >Add This</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import SelectProposalSubItem from "./SelectProposalSubItem.vue";
export default {
  components: { SelectProposalSubItem },
  data() {
    return {
      serviceSlidePos: 0,
      serviceItem: null,
      serviceItemSize: "",
      qty: null,
      unit: null,
      subTotal: null,
    };
  },
  created() {
    this.$root.$on("clear-slide-pos", (item) => {
      this.serviceSlidePos = 0;
    });
  },
  methods: {
    prev() {
      if (this.$refs.servicesCont) {
        this.servicesWidth = this.$refs.servicesCont.clientWidth;
        if (this.servicesWidth - this.serviceSlidePos > 0) {
          this.serviceSlidePos += 200;
        }
      }
    },
    next() {
      if (this.$refs.servicesCont) {
        this.servicesWidth = this.$refs.servicesCont.clientWidth;
        if (this.servicesWidth + this.serviceSlidePos - 200 > 0) {
          this.serviceSlidePos -= 200;
        }
      }
    },
    isSelectedQuickButton(item) {
      return false;
    },
  },
  computed: {
    isDisabledAdd() {
      return !this.qty || !this.unit || !this.subTotal || this.subTotal == 0 || !this.serviceItem;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>