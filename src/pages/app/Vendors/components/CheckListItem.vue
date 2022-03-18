<template>
  <div 
    class="check-list-item-wrapper" 
    :class="[{'extra': extra}]" 
    @click="isExpanded=!isExpanded"
  >
    <template v-if="!extra">
      <div class="check-item">
        <div class="left">
          <img :src="`${iconUrl}Group 4781 (3).svg`">
          <span>{{ name }}</span>
        </div>
        <div class="right">
          <span v-if="qty">{{ qty }}</span>
          <span v-else class="placeholder">QTY</span>
          <img v-if="!isExpanded" :src="`${iconUrl}Group 4770 (2).svg`">
          <img v-else :src="`${iconUrl}Asset 568.svg`">
        </div>
      </div>
      <p v-if="isExpanded">
        {{ desc }}
      </p>
    </template>
    <template v-else>
      <div class="extra-item">
        <div class="left">
          <span class="name">{{ name }}</span>
          <span v-if="qty">{{ qty }}</span>
          <span v-else class="placeholder">QTY</span>
          <span v-if="price" class="price">{{ price }}</span>
        </div>
        <div class="right">
          <img v-if="!isExpanded" :src="`${iconUrl}Group 4770 (2).svg`">
          <img v-else :src="`${iconUrl}Asset 568.svg`">
        </div>
      </div>
      <p v-if="isExpanded">
        {{ desc }}
      </p>
    </template>
  </div>
</template>
<script>
  export default {
    name: "ProposalAddFiles",
    components: {
    },
    props: {
      name: {
        type: String,
        default: ""
      }, 
      qty: {
        type: Number,
        default: 0
      },
      iconUrl: {
        type: String,
        default: ""
      },
      desc: {
        type: String,
        default: ""
      },
      extra: Boolean,
      price: {
        type: String,
        default: ""
      },
    },
    data () {
      return {
        isExpanded: false,
      };
    },
    computed: {
    },
    watch: {
    },
    created() {

    },
    mounted() {
    },
    methods: {
    }
  };
</script>
<style lang="scss" scoped>
  .check-list-item-wrapper {
    font-family: 'Manrope-Regular', sans-serif;
    color: #050505;
    cursor: pointer;
    margin-bottom: 50px;

    .check-item {
      display: flex;
      justify-content: space-between;
      .left {
        img {
          width: 22px;
          margin-right: 22px;
        }
        span {
          font-size: 16px;
          font-weight: 800;
          text-transform: capitalize;
        }
      }
      .right {
        text-align: right;
        img {
          width: 22px;
          position: relative;
          margin-left: 55px;
          top: -2px;
        }
        span {
          &.placeholder {
            color: #a0a0a0;
          }
        }
      }
    }
    .extra-item {
      display: grid;
      grid-template-columns: 90% 10%;

      .left {
        width: 80%;
        display: grid;
        grid-template-columns: 60% 20% 20%;
        span {
          display: inline-block;
          font-size: 16px;
          font-weight: 800;
          &.name {
            text-transform: capitalize;
          }
          &.placeholder {
            font-weight: normal;
            color: #a0a0a0;
          }
          &.price {
            font-weight: normal;
          }
        }
      }
      .right {
        img {
          width: 22px;
          position: relative;
          top: -2px;
        }
      }
    }
    p {
      margin: 15px 0 0 0;
      font-size: 14px;
      font-weight: normal;
      max-width: 50%;
    }
    &.extra {
      margin-bottom: 25px;
      padding-bottom: 25px;
      border-bottom: 1px solid #a5a5a5;

      &:last-child {
        border: none;
        margin-bottom: 0;
      }
    }
  }  
</style>
