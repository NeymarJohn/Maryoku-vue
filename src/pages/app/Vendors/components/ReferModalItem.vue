<template>
  <div class="refer-modal-item-wrapper">
    <div class="title-cont" @click="isSelected=!isSelected">
      <div class="left-side">
        <img v-if="isSelected" :src="`${iconUrl}Group 6258 (2).svg`"/>
        <img v-else :src="`${iconUrl}Rectangle 1245 (2).svg`"/>
        <h3 class="title"><img :src="img"/>{{category}}</h3>
      </div>
      <div class="right-side">
        <img 
          :src="`${iconUrl}Component 36 (2).svg`"
          :style="`transform: ${isSelected ? 'rotate(90deg)' : ''}`"
        />
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
        :placeholder="`Type email address here`"
        :img="`${iconUrl}Asset 620.svg`"
      >
      </input-proposal-sub-item>
      <input-proposal-sub-item
        :title="`Link to Website`"
        :placeholder="`Paste link here`"
        :img="`${iconUrl}Asset 619.svg`"
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
      category: String,
      img: String,
      iconUrl: String,
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

        img {
          width: 33px;
        }

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

          img {
            width: 34px;
            margin-left: 55px;
            margin-right: 22px;
            top: -2px;
            position: relative;
          }
        }
      }
      .right-side {
        img {
          width: 12px;
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
