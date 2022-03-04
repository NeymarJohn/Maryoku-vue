<template>
    <drop-down class="d-flex" >
        <button class="versions-button" data-toggle="dropdown">
            <img src="/static/icons/vendor/proposal.svg" width="20px" class="mr-10">
            &nbsp;&nbsp;
            <span v-if="selected === -1">
                {{'Original'}}
            </span>
            <span v-else-if="versions">
                {{ versions[selected].name}}
            </span>
            &nbsp;&nbsp;
            <md-icon>keyboard_arrow_down</md-icon>
        </button>
        <ul class="dropdown-width dropdown-menu dropdown-other dropdown-menu-right " >
            <li class="other-list" @click="select(-1)" :class="{'selected': selected === -1}">
                <a class="other-item font-size-16" >
                    <div class="other-name">
                        <img src="/static/icons/vendor/proposal.svg" width="20px" class="mr-10">
                        &nbsp;&nbsp;
                        <span>
                        {{'Original'}}
                        </span>
                    </div>
                </a>
            </li>
            <li class="other-list" v-for="(version, idx) in versions" :key="idx" @click="select(idx)" :class="{'selected': selected === idx}">
                <a class="other-item font-size-16" >
                    <div class="other-name">
                        <img src="/static/icons/vendor/proposal.svg" width="20px" class="mr-10">
                        &nbsp;&nbsp;
                        <span>
                        {{version.name}}
                        </span>
                    </div>
                </a>
            </li>
        </ul>
    </drop-down>
</template>
<script>
import { PROPOSAL_VERSION_FIELDS } from "@/constants/proposal";

const components = {
    ClickOutside: () => import("vue-click-outside")
}
export default {
  name: "proposal-versions-dropdown",
  components,
  props: {
      versions:{
          type: Array,
      },
      selected:{
          type: Number,
          default: -1,
      }
  },
  data() {
    return {
        versionFields: PROPOSAL_VERSION_FIELDS,
        versionName: null,
    };
  },
  methods: {
    select(index){
      console.log('select', index, this.selected);
      if (this.selected === index) return;
      this.$emit('select', index);
    },

  },
  watch: {
    versions(newVal){console.log('versions', newVal)}
  },
};
</script>
<style lang="scss" scoped>
.selected{
    background-color: #ffe67e;
}

.dropdown-menu li a:hover, .dropdown-menu li a:focus, .dropdown-menu li a:active {
    background-color: transparent !important;
    color: initial !important;
    box-shadow: none !important;
}
.dropdown-width{
    width: max-content;
    // width: 385px;
}
.other-list{
    cursor: pointer;
    img {
        width: 30px;
    }
    .other-heading{
        padding: 10px 1.5rem;
        margin: 0 5px;
    }
    .other-item{
        display: flow-root;
        .other-name{
            float: left;
        }
    }
}
.versions-button {
    border: none;
    background: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    i {
        margin: 0px;
    }
}

</style>
