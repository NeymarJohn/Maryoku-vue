<template>
  <div class="proposal-item-wrapper">
    <div class="title-cont default" 
      :class="[{'pb-40': isVCollapsed}]" 
      @click="isVCollapsed=!isVCollapsed"
      v-if="step==1"
    >
      <div class="with-subtitle">
        <div class="text-cont">
          <h3 class="title"><img :src="img"/>{{category}}</h3>
          <h5 v-if="!isVCollapsed">{{subTitle}}</h5>
        </div>
        <div class="action">
          <img v-if="!isVCollapsed" :src="`${iconUrl}Group 3671 (2).svg`"/>
          <img v-else :src="`${iconUrl}Asset 567.svg`"/>
        </div>
      </div>
      <p v-if="!isVCollapsed">
        Which element would you like to involve in your <strong>{{category}}</strong> proposal?
      </p>
    </div>
    <div class="editable-sub-items-cont" v-if="step == 1 && !isVCollapsed">
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
        :item="`Plateware`"
        :qty="1"
        :pricePerUnit="400"
        :subtotal="400"
        :active="true"
        :isEdit="false"
      >
      </editable-proposal-sub-item>
      <editable-proposal-sub-item
        :item="`Chairs`"
        :qty="1"
        :pricePerUnit="400"
        :subtotal="400"
        :active="true"
        :isEdit="false"
      >
      </editable-proposal-sub-item>
      <div class="tax-discount-wrapper">
        <div class="row">
          <div class="item-cont">
            <img :src="`${iconUrl}Asset 612.svg`"/>
            <span>Add Discount</span>
          </div>
          <div class="percent-cont">
            <span>0%</span>
          </div>
          <div class="price-cont">
            <span>$0.00</span>
          </div>
          <div class="edit-cont">
            <img class="edit" :src="`${iconUrl}Asset 585.svg`"/>
          </div>
        </div>
        <div class="row">
          <div class="item-cont">
            <img :src="`${iconUrl}Asset 613.svg`"/>
            <span>Add Taxes</span>
          </div>
          <div class="percent-cont">
            <span>0%</span>
          </div>
          <div class="price-cont">
            <span>$0.00</span>
          </div>
          <div class="edit-cont">
            <img class="edit" :src="`${iconUrl}Asset 585.svg`"/>
          </div>
        </div>
      </div>
      <div class="editable-sub-items-footer">
        <span>
          Total
        </span>
        <span>
          $800.00
        </span>
      </div>
    </div>
    <div class="upload-files-wrapper" v-if="step == 1 && !isVCollapsed">
      <div class="title-cont">
        <h3><img :src="`${iconUrl}Asset 608.svg`"/>Upload This Files:</h3><h5>And add additional if you want</h5>
      </div>
      <div class="files-cont">
        <div class="item">
          <div class="left">
            <span class="filename">Legal Requirements</span>
            <span class="req">Required</span>
          </div>
          <div class="right">
            <img :src="`${iconUrl}Asset 609.svg`"/>Upload
          </div>
        </div>
        <div class="item">
          <div class="left">
            <span class="filename">Legal Requirements</span>
            <span class="req">Required</span>
          </div>
          <div class="right">
            <img :src="`${iconUrl}Asset 609.svg`"/>Upload
          </div>
        </div>
        <div class="option">
          <div class="left">
            <span class="filename">Other</span>
            <span class="req">*Optional</span>
          </div>
          <div class="right">
            <img :src="`${iconUrl}Asset 609.svg`"/>Upload
          </div>
        </div>
      </div>
    </div>
    <div class="title-cont dropdown" v-if="step == 2" @click="isChecked=!isChecked">
      <div class="left-side">
        <div class="check-cont">
          <img v-if="isChecked" :src="`${iconUrl}Group 6258 (2).svg`"/>
          <img v-else :src="`${iconUrl}Rectangle 1245 (2).svg`"/>
        </div>
        <h3 class="title"><img :src="img"/>{{category}}</h3>
      </div>
      <div class="right-side">
        <div class="budget-cont">
          <span>Budget</span>
          <span>$400.00</span>
        </div>
        <div class="proposal-range-cont">
          <p>You're the First bidder</p>
          <span v-if="proposalRange">Proposals range</span>
          <span v-if="proposalRange">$290-$1200</span>
        </div>
        <img :src="`${iconUrl}Component 36 (2).svg`"/>
      </div>
    </div>
    <!-- <div class="sub-items-cont" v-if="step == 2">
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
    <div class="add-attributes-cont" v-if="step == 2">
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
    <div class="action-cont" v-if="step == 2">
      <a class="clear">Clear</a>
      <a class="add" :class="[{'active': isAllFilledInfo}]">Add This</a>
    </div> -->
  </div>
</template>
<script>
  import InputProposalSubItem from '@/components/Inputs/InputProposalSubItem.vue'
  import SelectProposalSubItem from './SelectProposalSubItem.vue'
  import EditableProposalSubItem from './EditableProposalSubItem.vue'

  export default {
    name: 'proposal-item',
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
      subTitle: String,
      img: String,
      step: Number,
    },
    data () {
      return {
        isAllFilledInfo: false,
        iconUrl: 'http://static.maryoku.com/storage/icons/NewSubmitPorposal/',
        isVCollapsed: false,
        isChecked: false,
      }
    },
    methods: {
    },
    created() {
    },
    mounted() {
      this.isVCollapsed = this.isCollapsed
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
    padding: 40px 34px 0px 34px;
    font-family: 'Manrope-Regular', sans-serif;
    color: #050505;
    margin: 50px 0 30px 0;

    .title-cont {
      .with-subtitle {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .text-cont {
          display: flex;
          align-items: center;
          h3.title {
            font-weight: 800;
            font-size: 30px;
            margin: 0;
            margin-right: 20px; 
            img {
              width: 28px;
              margin-right: 19px;
              position: relative;
              top: -3px;
            }
          }
          h5 {
            font-size: 20px;
            margin: 0;
          }
        }
        .action {
          cursor: pointer;
          img {
            width: 20px;
          }
        }
      }
      p {
        font-size: 16px;
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
          width: 100%;
          display: flex;
          align-items: center;

          .check-cont {
            img {
              width: 33px;
            }
          }
          h3 {
            display: inline-block;
            margin: 0;

            img {
              width: 34px;
              margin-left: 55px;
              margin-right: 22px;
              position: relative;
              top: -2px;
            }
          }
        }
        .right-side {
          display: flex;
          width: 100%;
          justify-content: flex-end;
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
          img {
            width: 12px;
            margin-left: 50px;
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
          max-height: 38px;
          cursor: pointer;

          &.active {
            background-color: #f51355;
            color: #ffffff;
          }
        }
      }
    }

    .editable-sub-items-cont {
      margin-top: 65px;

      .editable-sub-items-header {
        border-top: 1px solid #707070;
        padding: 40px 40px 30px 40px;
        
        span {
          display: inline-block;
          font-size: 16px;
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
      .tax-discount-wrapper {
        .row {
          padding: 35px;
          border: 2px solid #d5d5d5;
          border-bottom: none;
          display: flex;
          align-items: center;

          .item-cont {
            width: calc(50% + 26px);
          }
          .percent-cont {
            width: calc(15% - 14px);
          }
          .price-cont {
            width: calc(15% + 1px);
          }
          .edit-cont {
            text-align: right;
            width: 15%;
            .edit {
              width: 21px;
              margin-right: 31px;
              cursor: pointer;
            }
          }

          img {
            width: 15px;
            margin-right: 22px;

            &.edit {
              cursor: pointer;
            }
          }
          span {
            color: #818080;
            font-size: 16px;
            font-weight: 800;
          }
        }
      }
      .editable-sub-items-footer {
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        background-color: #d5d5d5;
        padding: 21px 40px;
        border: 2px solid #d5d5d5;
        border-bottom: none;

        span {
          font-size: 20px;
          font-weight: 800;
          display: inline-block;

          &:first-child {
            width: calc(60% + 34px);
          }
          &:last-child {
            width: calc(35% - 5px);
          }
        }
      }
    }

    .upload-files-wrapper {
      margin-top: 60px;
      margin-left: -34px;
      margin-right: -40px;
      padding: 60px 0 10px 0;
      border-top: 1px solid #707070;

      .title-cont {
        display: flex;
        align-items: flex-end;
        margin-bottom: 25px;
        padding: 0 34px;
        
        h3 {
          font-size: 30px;
          font-weight: 800;
          margin: 0;
          margin-right: 10px;
          img {
            width: 24px;
            margin-right: 10px;
          }
          margin-right: 10px;
        }
        h5 {
          margin: 0;
          font-size: 14px;
        }
      }
      .files-cont {
        .item, .option {
          display: flex;
          justify-content: space-between;
          padding: 30px 34px;
          border-bottom: 1px solid #707070;

          .left {
            span {
              font-weight: 800;
              &.filename {
                font-size: 20px;
                margin-right: 23px;
              }
              &.req {
                color: #818080;
                font-size: 14px;
              }
            }
          }
          .right {
            cursor: pointer;
            color: #f51355;
            font-size: 16px;
            font-weight: 800;
            img {
              width: 13px;
              margin-right: 9px;
            }            
          }
        }
        .option {
          margin-bottom: 10px;
          border: none;
          .left {
            span {
              &.filename {
                font-size: 20px;
                font-weight: normal;
              }
            }
          }
        }
      }
    }
    .pb-40 {
      padding-bottom: 40px;
      cursor: pointer;
    }
  }
</style>
