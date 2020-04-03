<template>
  <div class="refer-modal-item-wrapper">
    <div class="title-cont" @click="isSelected=!isSelected">
      <div class="left-side">
        <md-checkbox v-model="isSelected">
        </md-checkbox>
        <h3 class="title"><md-icon>edit</md-icon>{{category}}</h3>
      </div>
      <div class="right-side">
        <md-icon v-if="isSelected">navigate_next</md-icon>
        <md-icon v-else>keyboard_arrow_down</md-icon>
      </div>
    </div>
    <div class="vendor-info-cont" v-if="isSelected">
      <input-proposal-sub-item
        :title="`Vendor's Name`"
        :placeholder="`Type vendor's name here`"
      >
      </input-proposal-sub-item>
      <input-proposal-sub-item
        :title="`Email`"
        :placeholder="``"
        :icon="`email`"
      >
      </input-proposal-sub-item>
      <input-proposal-sub-item
        :title="`Link to Website`"
        :placeholder="`Paste link here`"
        :icon="`wifi_tethering`"
      >
      </input-proposal-sub-item>
    </div>
  </div>
</template>
<script>
  import InputProposalSubItem from '@/components/Inputs/InputProposalSubItem.vue'

  export default {
    name: 'refer-modal-item',
    components: {
      InputProposalSubItem
    },
    props: {
      category: String
    },
    data () {
      return {
        isSelected: false,
      }
    },
    methods: {
    },
    created() {

    },
    mounted() {
    },
    computed: {
    },
    watch: {
    }
  }
</script>
<style lang="scss" scoped>
  .refer-modal-item-wrapper {
    padding: 34px 0;
    border-top: 1px solid #a0a0a0;
    font-family: 'Manrope-Regular', sans-serif;
    color: #050505;
    
    .title-cont {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      .left-side {
        display: flex;
        align-items: center;

        .title {
          i {
            margin-right: 22px;
            margin-left: 55px;
          }
        }

        h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 800;
        }
      }
    }
    .vendor-info-cont {
      text-align: left;

      .input-proposal-sub-item-wrapper {
        margin-bottom: 43px;
        &:first-child {
          margin-top: 32px;
        }
        &:last-child {
          margin-bottom: 34px;
        }
      }
    }
  }
</style>
