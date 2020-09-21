<template>
  <div class="vendor-extra-pay-item-wrapper">
    <div class="collapsed" @click="expand()">
      <div class="col label">
        {{item.label}}
      </div>
      <div class="col">
        {{getQty()}}
      </div>
      <div class="col">
        {{getPrice()}}
      </div>
      <div class="col">
        <img 
          v-if="item.desc"
          :class="{'rotate-90': expanded}" 
          :src="`http://static.maryoku.com/storage/icons/NewSubmitPorposal/Group 4770 (2).svg`"
        />
      </div>
    </div>
    <div class="expanded" v-if="expanded">
      {{item.desc}}
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'vendor-extra-pay-item',
  props: {
    item: Object,
  },
  components: {
  },
  data() {
    return {
      expanded: false,
      iconUrl: 'http://static.maryoku.com/storage/icons/Vendor Signup/',
    }
  },
  created() {
    
  },
  mounted() {
  },
  methods: {
    expand() {
      if (this.item.desc) {
        this.expanded = !this.expanded
      }
    },
    getQty() {
      if (this.item.value) {
        if (this.item.value.constructor.name == 'Array') {
          return this.item.value.length
        } else {
          return null
        }
      } else {
        return null
      }
    },
    getPrice() {
      if (this.item.value) {
        if (this.item.value.constructor.name == 'String') {
          return `+$${this.item.value}`
        } else {
          return null
        }
      } else {
        return null
      }
    }
  },
  computed: {
    
  },
  filters: {
    
  },
  watch: {
  }
};
</script>
<style lang="scss" scoped>
  .vendor-extra-pay-item-wrapper {
    font-family: Manrope-Regular, sans-serif;
    color: #050505;
    border-bottom: 1px solid #dddddd;
    
    .collapsed {
      display: flex;
      padding: 2rem 0;

      .col {
        flex: 1;
        width: 20px;

        img {
          width: 20px;
        }
        &.label {
          text-transform: capitalize;
        }
        &:first-child {
          flex: 2;
          font: bold 16px Manrope-Regular, sans-serif;
        }
        &:last-child {
          text-align: right;
        }
      }
    }
    .expanded {
      max-width: 40%;
      font: normal 14px Manrope-Regular, sans-serif;
      padding-bottom: 1rem;
    }
    .rotate-90 {
      transform: rotate(90deg);
    }
  }  
</style>
