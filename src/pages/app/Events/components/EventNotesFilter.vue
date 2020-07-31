<template>
  <div class="notes-filter" ref="noteFilterComponent">
    <img :src="`${$iconURL}Notes/filter-gray.svg`" @click="showPanel">
    <div ref="notesFilterElements"  v-if="isOpenPanel"> 
      <div class="notes-filter-panel" ref="noteFilterPanel">
        <div class="notes-filter-close"> <md-button class="md-simple edit-btn md-black font-size-30" @click="isOpenPanel=false"><md-icon>close</md-icon></md-button></div>
        <div><md-checkbox v-model="selectedFilters" value="0">Select All</md-checkbox></div>
        <div><md-checkbox v-model="selectedFilters" value="1">Done</md-checkbox></div>
        <div><md-checkbox v-model="selectedFilters" value="2">Select All</md-checkbox></div>
        <div><md-checkbox v-model="selectedFilters" value="3">Select All</md-checkbox></div>
        <div><md-checkbox v-model="selectedFilters" value="4">Select All</md-checkbox></div>
        <div><md-checkbox v-model="selectedFilters" value="5">Select All</md-checkbox></div>
      </div>
      <div class="filter-panel-mask" @click="isOpenPanel=false" ref="filterPanelMask"></div> 
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpenPanel: false,
      selectedFilters: []
    }
  },
  methods: {
    cumulativeOffset(element) {
        var top = 0, left = 0;
        do {
            top += element.offsetTop  || 0;
            left += element.offsetLeft || 0;
            top -= element.scrollTop || 0;
            element = element.offsetParent;
        } while(element);

        return {
            top: top,
            left: left
        };
    },
    showPanel() {
      this.isOpenPanel = true
      setTimeout(() => {
        const pos = this.cumulativeOffset(this.$refs.noteFilterComponent)
        this.$refs.noteFilterPanel.style.left = `${pos.left + 30}px`;
        this.$refs.noteFilterPanel.style.top = `${pos.top}px`;
        this.$refs.noteFilterPanel.style.display = "block";
        document.getElementsByTagName("body")[0].appendChild(this.$refs.notesFilterElements)
        window.addEventListener('scroll', this.handleScroll);
      }, 100);
    }
  },
  handleScroll(event) {
    this.$refs.noteFilterPanel.style.top = `${window.scrollY + this.cumulativeOffset(this.$refs.noteFilterComponent).top}px`;
  }
}
</script>
<style lang="scss" scoped>
  .notes-filter {
    width: 25px;
    &-panel {
      position: fixed;
      display: none;
      background-color: white;
      box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.16);
      width: 300px;
      padding: 30px;
      z-index: 100;
    }
  }
  .filter-panel-mask {
    position: fixed;
    left:0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .notes-filter-close {
    position: absolute;
    right: 20px;
    top: 30px;
    i {
      font-size: 40px;
    }
  }
</style>