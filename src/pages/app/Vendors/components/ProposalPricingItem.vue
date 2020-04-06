<template>
  <div class="proposal-pricing-items-wrapper">
    <div class="pricing-item" :class="[{'total-wrapper': itemType=='total'}, {'bundle-wrapper': itemType=='bundle'}]">
      <div class="summary" @click="expand()">
        <div class="left">
          <img v-if="itemType=='price'" :src="categoryIcon"/>
          <img v-if="itemType=='bundle'" :src="`${iconUrl}Asset 577.svg`"/>
          <h3 v-if="itemType=='price'">Venue</h3>
          <h3 v-if="itemType=='bundle'">Bundle offer</h3>
          <div v-if="itemType=='total'" class="total-cont">
            <h4>Total</h4>
            <span>before discount</span>
          </div>
          <span v-if="itemType=='price'">For Whole Event</span>
          <div class="bundle-desc" v-if="itemType=='bundle'">
            <h4>15%</h4>
            <span>Venue + Catering</span>
          </div>
        </div>
        <div class="right">
          <div class="price-cont" v-if="!isExpanded">
            <span class="org-price">$400.00</span>
            <div class="off-cont">(10% off) <span>$1,100.00</span></div>
          </div>
          <img 
            v-if="itemType=='price'"
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
      expand() {
        if (this.itemType == 'price') {
          this.isExpanded=!this.isExpanded
        }
      }
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
      padding: 46px 50px 48px 60px;
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
          .bundle-desc {
            display: flex;
            align-items: center;
            h4 {
              margin: 0 12px;
              font-size: 30px;
            }
            span {
              font-size: 16px;
              font-weight: 800;
            }
          }
          .total-cont {
            h4 {
              font-size: 22px;
              font-weight: 800;
              margin: 0;
            }
            span {
              margin: 0;
              font-size: 14px;
              margin-top: 7px;
            }
          }
        }
        .right {
          display: flex;

          img {
            width: 12px;
            margin-left: 50px;
          }
          .price-cont {
            text-align: right;
            span {
              &.org-price {
                font-size: 20px;
                font-weight: 800;
              }
            }
            .off-cont {
              padding-top: 9px;
              color: #707070;
              font-size: 14px;
              span {
                text-decoration: line-through;
              }
            }
          }
        }
      }

      &.total-wrapper {
        background-color: #404040;
        color: #ffffff;

        .right {
          .price-cont {
            margin-right: 60px;
            color: #ffffff;
            .off-cont {
              color: #ffffff;
            }
          }
        }
      }

      &.bundle-wrapper {
        background-color: #ffedb7;

        .summary {
          .left {
            .bundle-desc {
              span {
                margin: 0;
              }
            }
          }
          .right {
            .price-cont {
              margin-right: 60px;
            }
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
  }
</style>
