<template>
  <div class="proposal-pricing-items-wrapper">
    <div class="pricing-item">
      <div class="summary" @click="isExpanded=!isExpanded">
        <div class="left">
          <img v-if="itemType=='price'" :src="categoryIcon"/><h3>Venue</h3><span>For Whole Event</span>
        </div>
        <div class="right">
          <span v-if="!isExpanded">$400.00</span>
          <img 
            :src="`${iconUrl}Component 36 (2).svg`"
            :style="`transform: ${isExpanded ? 'rotate(90deg)' : ''}`"
          />
        </div>
      </div>
      <div v-if="isExpanded" class="subitems">
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
        <div class="bundle-discount">
          <div class="left">
            <span>
              Discount 
            </span>
            <span>
              10%
            </span>
          </div>
          <div class="right">
            <span>
              $160.00
            </span>
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
    </div>
    <!-- <div class="tax-cont">
      <div class="left">
        <span>Taxes</span>
        <span>18%</span>
      </div>
      <div class="right">
        <span>$200.00</span>
      </div>
    </div>
    <div class="total-cont">
      <div class="left">
        <span>
          Total Bundle
        </span>
      </div>
      <div class="right">
        <span class="org-price">
          $1,800
        </span>
        <br/>
        <span class="discounted">
          $1,600.00
        </span>
      </div>
    </div> -->
  </div>    
</template>
<script>
  import EditableProposalSubItem from './EditableProposalSubItem.vue'

  export default {
    name: 'proposal-pricing-item',
    components: {
      EditableProposalSubItem
    },
    props: {
      category: String,
      isCollapsed: Boolean,
      isDropdown: Boolean,
      proposalRange: Boolean,
      iconUrl: String,
      categoryIcon: String,
      itemType: String,
    },
    data () {
      return {
        isExpanded: false
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
  .proposal-pricing-items-wrapper {
    background-color: #ffffff;
    font-family: 'Manrope-Regular', sans-serif;
    color: #050505;
    margin: 30px 0;

    .pricing-item {
      padding: 46px 40px 48px 40px;
      background-color: #ffffff;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
      border-radius: 3px;

      .summary {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        .left{
          display: flex;
          align-items: center;

          h3 {
            margin: 0;
            margin-left: 30px;
            font-size: 30px;
            font-weight: 800;
          }
          span {
            font-size: 20px;
            margin-left: 30px;
          }
          img {
            width: 28px;

          }
        }
        .right {
          img {
            width: 12px;
            margin-left: 50px;
          }
          span {
            font-size: 20px;
            font-weight: 800;
          }
        }
      }

      .subitems {
        margin-top: 30px;

        .editable-sub-items-header {
          padding: 0px 34px 26px 34px;
          margin-left: -34px;
          margin-right: -34px;

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
        .bundle-discount {
          padding: 34px 38px 34px 38px;
          margin: 0 -40px;
          border-top: 1.5px solid #818080;
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          font-weight: 800;
          color: #818080;

          .left {
            span {
              &:first-child {
                margin-right: 48px;
              }
            }
          }
          .right {
            span {
              margin-right: 325px;
            }
          }
        }
        .editable-sub-items-footer {
          padding: 37px 38px 0 38px;
          margin: 0 -40px;
          border-top: 1.5px solid #818080;
          display: flex;
          justify-content: space-between;

          span {
            font-size: 20px;
            font-weight: 800;

            &:last-child {
              margin-right: 325px;
            }
          }
        }
      }
    }

    .tax-cont {
      padding: 22px 40px 25px 40px;
      border: solid 0.75px #050505;
      background-color: #e0e0e0;
      color: #818080;
      font-size: 16px;
      font-weight: 800;
      display: flex;
      justify-content: space-between;

      .right {
        margin-right: 130px;
      }
    }

    .total-cont {
      padding: 37px 40px 36px 40px;
      border: solid 0.75px #050505;
      background-color: #ffedb7;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      font-weight: 800;

      .right {
        text-align: right;
        margin-right: 130px;
        span {
          &.org-price {
            font-size: 16px;
            font-weight: normal;
            text-decoration: line-through;
          }
        }
      }
    }    
  }
</style>
