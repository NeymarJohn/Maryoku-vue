<template>
  <div class="autocomplete-field">
    <input
      v-if="filteredSuggestItems[selectedSuggestItemIndex] && searchWord"
      class="suggested-place-holder"
      :value="filteredSuggestItems[selectedSuggestItemIndex].label"
    />
    <input
      v-model="searchWord"
      class="input-value label-input"
      :class="{ isFilled: !!searchWord }"
      type="text"
      :placeholder="placeholder"
      @keypress="startSearch"
      @blur="stopSearch"
    />
    <div class="auto-complete-panel" v-if="showAutoCompletePanel && filteredSuggestItems.length > 0">
      <div
        class="suggest-item font-bold"
        v-for="(item, index) in filteredSuggestItems"
        :key="item.label"
        @mouseenter="hoverSuggestItem(index)"
        @click="selectSuggestItem(index)"
      >
        <div>{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Autocomplete",
  data() {
    return {
      selectedSuggestItemIndex: -1,
      showAutoCompletePanel: false,
      searchWord: "",
    };
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  methods: {
    hoverSuggestItem(index) {
      this.selectedSuggestItemIndex = index;
      this.qty = this.filteredSuggestItems[index].qty;
      this.unit = this.filteredSuggestItems[index].price;
      this.searchWord = this.filteredSuggestItems[index].label.slice(0, this.searchWord.length);
    },
    selectSuggestItem(index) {
      this.qty = this.filteredSuggestItems[index].qty;
      this.unit = this.filteredSuggestItems[index].price;
      this.searchWord = this.filteredSuggestItems[index].label;
      this.selectedSuggestItemIndex = -1;
      this.showAutoCompletePanel = false;
    },
    startSearch() {
      this.showAutoCompletePanel = true;
    },
    stopSearch() {
      setTimeout(() => {
        this.showAutoCompletePanel = false;
        this.selectedSuggestItemIndex = -1;
      }, 500);
    },
  },
  computed: {
    filteredSuggestItems() {
      if (!this.searchWord) return [];
      return this.options.filter((item) => item.label.toLowerCase().startsWith(this.searchWord.toLowerCase()));
    },
  },
};
</script>
<style lang="scss" scoped>
.autocomplete-field {
  position: relative;
  input {
    font-size: 16px;
    width: 100%;
    border: 1px solid #b7b7b7;
    box-shadow: none;
    font: normal 16px "Manrope-Regular", sans-serif;
    color: #050505;
    &.isFilled {
      border: 1px solid #b7b7b7;
    }
    &:disabled {
      color: #828282;
    }
    width: 100%;
  }
  .suggested-place-holder {
    position: absolute;
  }
  .suggested-place-holder,
  .isSuggeted {
    color: #e8ae03;
  }
  .label-input {
    background-color: transparent;
  }
  .auto-complete-panel {
    z-index: 10;
    padding: 30px 0;
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    position: absolute;
    width: 100%;
    .suggest-item {
      display: grid;
      grid-template-columns: 50% 30% 20%;
      padding: 10px 20px;
      cursor: pointer;
      &:hover {
        background-color: #ffedb7;
      }
    }
  }
}
</style>
