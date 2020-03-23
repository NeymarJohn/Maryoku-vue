<template>
  <div class="proposal-item-wrapper">
    <div class="title-cont default" v-if="!isDropdown && !isCollapsed">
      <h3 class="title">{{category}}</h3>
      <p>
        Which element would you like to involve in your <strong>venue</strong> proposal?
      </p>
    </div>
    <div v-else class="title-cont dropdown">
      <div class="left-side">
        <md-checkbox v-model="isDropdown">
        </md-checkbox>
        <h3 class="title"><md-icon>edit</md-icon>{{category}}</h3>
      </div>
      <div class="right-side">
        <div class="budget-cont">
          <span>Budget</span>
          <span>400$</span>
        </div>
        <div class="proposal-range-cont">
          <p>You're the First bidder</p>
          <span v-if="proposalRange">Proposals range</span>
          <span v-if="proposalRange">$290-$1200</span>
        </div>
        <md-icon>navigate_next</md-icon>
      </div>
    </div>
    <div class="sub-items-cont" v-if="!isDropdown && !isCollapsed">
      <select-proposal-sub-item
        :active="true"
        :item="`Tables And Chairs`">
      </select-proposal-sub-item>
      <select-proposal-sub-item
        :active="true"
        :item="`Dance Floor`">
      </select-proposal-sub-item>
      <select-proposal-sub-item
        :active="false"
        :item="`Plateware`">
      </select-proposal-sub-item>
      <select-proposal-sub-item
        :active="true"
        :item="`Flowers`">
      </select-proposal-sub-item>
    </div>
    <div class="add-attributes-cont" v-if="!isDropdown && !isCollapsed">
      <input-proposal-sub-item
        :title="`Description`"
        :placeholder="`Type name of elements here`"
        :style="`width: 40%;`">
      </input-proposal-sub-item>
      <input-proposal-sub-item
        :title="`QTY`"
        :placeholder="`0`"
        :style="`width: calc(28% - 44px)`">
      </input-proposal-sub-item>
      <input-proposal-sub-item
        :title="`Price per unit`"
        :placeholder="`0`"
        :style="`width: 16%`">
      </input-proposal-sub-item>
      <input-proposal-sub-item
        :title="`Total`"
        :placeholder="`$0.00`"
        :style="`width: 16%; margin-right: 0`">
      </input-proposal-sub-item>
    </div>
    <div class="action-cont" v-if="!isDropdown && !isCollapsed">
      <a class="clear">Clear</a>
      <a class="add">Add This</a>
    </div>
    <div class="editable-sub-items-cont" v-if="!isDropdown && !isCollapsed">
      <div class="editable-sub-items-header">
        <span>
          Description
        </span>
        <span>
          QTY
        </span>
        <span>
          Price per unit
        </span>
        <span>
          Subtotal
        </span>
      </div>
      <editable-proposal-sub-item
        :item="`Description`"
        :qty="1"
        :pricePerUnit="400"
        :subtotal="400"
        :active="true"
        :isEdit="false"
      >
      </editable-proposal-sub-item>
      <editable-proposal-sub-item
        :item="`Sound Equipment`"
        :qty="1"
        :pricePerUnit="400"
        :subtotal="400"
        :active="true"
        :isEdit="false"
      >
      </editable-proposal-sub-item>
      <editable-proposal-sub-item
        :item="`Description`"
        :qty="1"
        :pricePerUnit="400"
        :subtotal="400"
        :active="true"
        :isEdit="false"
      >
      </editable-proposal-sub-item>
      <editable-proposal-sub-item
        :item="`Description`"
        :qty="1"
        :pricePerUnit="400"
        :subtotal="400"
        :active="true"
        :isEdit="false"
      >
      </editable-proposal-sub-item>
      <editable-proposal-sub-item
        :item="`Description`"
        :qty="1"
        :pricePerUnit="400"
        :subtotal="400"
        :active="true"
        :isEdit="false"
      >
      </editable-proposal-sub-item>
      <div class="editable-sub-items-footer">
        <span>
          Total
        </span>
        <span>
          $800.00
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import InputProposalSubItem from '@/components/Inputs/InputProposalSubItem.vue'
  import SelectProposalSubItem from './SelectProposalSubItem.vue'
  import EditableProposalSubItem from './EditableProposalSubItem.vue'

  export default {
    name: 'proposal-pricing-items',
    components: {
      InputProposalSubItem,
      SelectProposalSubItem,
      EditableProposalSubItem
    },
    props: {
      category: String,
      isCollapsed: Boolean,
      isDropdown: Boolean,
      proposalRange: Boolean,
    },
    data () {
      return {
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
  .proposal-item-wrapper {
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    padding: 34px 40px 0px 34px;
    font-family: 'Manrope-Regular', sans-serif;
    color: #050505;
    margin: 50px 0 30px 0;

    .title-cont {
      h3.title {
        font-weight: 800;
        font-size: 30px;
        margin: 0;
      }

      p {
        font-size: 20px;
        margin: 0;
        margin-top: 23px;

        strong {
          font-weight: 800;
        }
      }

      &.dropdown {
        padding: 8px 8px 42px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        .left-side {
          width: 50%;
          h3 {
            display: inline-block;
            margin-left: 39px;

            i {
              margin-right: 22px;
            }
          }
        }
        .right-side {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .budget-cont {
            span {
              color: #818080;
              &:first-child {
                font-size: 14px;
                margin-right: 1rem;
              }
              &:nth-child(2) {
                font-size: 20px;
                font-weight: 800;
              }
            }
          }
          .proposal-range-cont {
            text-align: right;
            margin-left: 65px;
            p {
              margin-top: 0;
              font-size: 14px;
            }
            span {
              font-size: 14px;
              &:first-child {
                color: #818080;
              }
              &:last-child {
                color: #050505;
                font-weight: 800;
              }
            }
          }
          i {
            margin-left: 80px;
          }
        }
      }
    }

    .sub-items-cont {
      padding: 30px 0;
      display: flex;
    }

    .add-attributes-cont {
      display: flex; 
    }

    .action-cont {
      text-align: right;
      margin-top: 35px;
      a {
        font-size: 16px;
        font-weight: 800;

        &.clear {
          color: #050505;
          padding: 8px 32px;
          margin-right: 1em;
        }
        &.add {
          background-color: #d5d5d5;
          border-radius: 3px;
          padding: 8px 32px;
          color: #ffffff;
        }
      }
    }

    .editable-sub-items-cont {
      margin-top: 65px;

      .editable-sub-items-header {
        border-top: 1px solid #050505;
        padding: 40px 34px 26px 34px;
        margin-left: -34px;
        margin-right: -40px;

        span {
          display: inline-block;
          font-size: 20px;
          font-weight: 800;

          &:first-child {
            width: 40%;
          }
          &:nth-child(2) {
            width: 10%;
          }
          &:nth-child(3) {
            width: 15%;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .editable-sub-items-footer {
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        background-color: #d5d5d5;
        padding: 21px 34px;
        margin-left: -34px;
        margin-right: -40px;

        span {
          font-size: 20px;
          font-weight: 800;
          display: inline-block;

          &:first-child {
            width: 65%;
          }
          &:last-child {
            width: calc(35% - 5px);
          }
        }
      }
    }
  }
</style>
