<template>
  <div ref="noteFilterComponent" class="notes-filter">
    <md-button class="md-icon-button md-simple" @click="showPanel">
      <img :src="`${$iconURL}Notes/filter-gray.svg`" width="30">
    </md-button>
    <div v-if="isOpenPanel" ref="notesFilterElements">
      <div ref="noteFilterPanel" class="notes-filter-panel">
        <div class="notes-filter-close">
          <md-button class="md-simple edit-btn md-black font-size-30" @click="isOpenPanel=false">
            <md-icon>close</md-icon>
          </md-button>
        </div>
        <div>
          <md-checkbox v-model="selectedAll" @change="selectAll">
            Select All
          </md-checkbox>
        </div>
        <div>
          <md-checkbox v-model="selectedFilters" value="done" @change="select">
            Done
          </md-checkbox>
        </div>
        <div>
          <md-checkbox v-model="selectedFilters" value="todo" @change="select">
            Need to do
          </md-checkbox>
        </div>
        <div>
          <md-checkbox v-model="selectedFilters" value="me" @change="select">
            Need for me
          </md-checkbox>
        </div>
        <div v-for="(user, index) in filterUsers" :key="index">
          <md-checkbox v-model="selectedFilters" :value="user" @change="select">
            Need for {{ user }}
          </md-checkbox>
        </div>
        <!-- <div><md-checkbox v-model="selectedFilters" value="4">Need for xxx</md-checkbox></div>
        <div><md-checkbox v-model="selectedFilters" value="5">Need for yyy</md-checkbox></div> -->
      </div>
      <div ref="filterPanelMask" class="filter-panel-mask" @click="isOpenPanel=false" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    filterUsers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isOpenPanel: false,
      filters: ["done", "todo", "me"],
      selectedFilters: ["done", "todo", "me"],
      selectedAll: true,
    };
  },
  methods: {
    cumulativeOffset(element) {
      var top = 0, left = 0;
      do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        top -= element.scrollTop || 0;
        element = element.offsetParent;
      } while (element);

      return {
        top: top,
        left: left,
      };
    },
    showPanel() {
      this.isOpenPanel = !this.isOpenPanel;
      if (this.isOpenPanel) {
        setTimeout(() => {
          const pos = this.cumulativeOffset(this.$refs.noteFilterComponent);
          this.$refs.noteFilterPanel.style.left = `${pos.left + 30}px`;
          this.$refs.noteFilterPanel.style.top = `${pos.top}px`;
          this.$refs.noteFilterPanel.style.display = "block";
          document.getElementsByTagName("body")[0].appendChild(this.$refs.notesFilterElements);
          window.addEventListener("scroll", this.handleScroll);
        }, 100);
      }
    },
    handleScroll() {
      this.$refs.noteFilterPanel.style.top = `${window.scrollY + this.cumulativeOffset(this.$refs.noteFilterComponent).top}px`;
    },
    selectAll() {
      this.selectedFilters = [];
      if (this.selectedAll) {
        this.selectedFilters = this.filters;
        this.$emit("filter", "all");
      }
    },
    select: function() {
      this.$emit("filter", this.selectedFilters);
      this.selectedAll = false;
    },
  },
};
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
  left: 0;
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
