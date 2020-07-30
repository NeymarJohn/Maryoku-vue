<template>
  <div class="proposal-budget-summary-wrapper">
    <div class="summary-cont">
      <h3>
        You're the {{newProposalRequest.bidderRank | numeral('Oo')}} catering & venue bidder
      </h3>
      <p>
        Proposals range: <strong>${{newProposalRequest.bidRange.low | withComma}} - ${{newProposalRequest.bidRange.high | withComma}}</strong>
      </p>
      <div class="bundle-discount" @click="isBundleDiscount=!isBundleDiscount">
        <img :src="`${iconUrl}Asset 579.svg`"/>
        <span>
          Add Bundle Discount 
          <md-icon v-if="!isBundleDiscount">keyboard_arrow_right</md-icon>
          <md-icon v-else>keyboard_arrow_down</md-icon>
        </span>
        <p v-if="isBundleDiscount">What services would you like to include in your bundle?</p>
      </div>
    </div>
    <div class="items-cont">
      <div class="item">
        <ul>
          <li>
            <img :src="`${iconUrl}Asset 614.svg`"/>
            Venue
          </li>
          <li>
            <span>Relish caterers & venues</span>
          </li>
          <li>
            <span>Your proposal</span>
            <span>${{calculatedTotal(getRequirementsByCategory('venuerental')) | withComma}}</span>
          </li>
          <li :style="`margin: ${discountBlock.category == 'venuerental' ? '' : '0' }`">
            <template v-if="discountBlock.category == 'venuerental'">
              <div class="left">
                <span>Before discount</span>
              </div>
              <div class="right">
                <span>{{`(${discountBlock.value}% off)`}}</span>
                <span>${{total(getRequirementsByCategory('venuerental')) | withComma}}</span>
              </div>
            </template>
          </li>
          <li v-if="calculatedTotal(getRequirementsByCategory('venuerental')) - newProposalRequest.eventData.allocatedBudget > 0">
            <md-icon>error</md-icon>
            <span>
              Your proposal is ${{calculatedTotal(getRequirementsByCategory('venuerental')) - newProposalRequest.eventData.allocatedBudget | withComma}} more than the budget
            </span>
          </li>
        </ul>
      </div>
      <div class="item additional" v-if="step==2 && additionalServices.length > 0">
        <h3>Additional Services</h3>
        <ul v-for="(a, aIndex) in additionalServices" :key="aIndex">
          <li>
            <img :src="getIconUrlByCategory(a.value)"/>
            {{a.name}}
          </li>
          <li>
            <span>{{a.subTitle}}</span>
          </li>
          <li>
            <span>Your proposal</span>
            <span>${{calculatedTotal(getRequirementsByCategory(a.value)) | withComma}}</span>
          </li>
          <li>
            <span>Budget for {{a.name}}</span>
            <span>${{calculatedTotal(getRequirementsByCategory(a.value)) | withComma}}</span>
          </li>
          <li v-if="calculatedTotal(getRequirementsByCategory(a.value)) - newProposalRequest.eventData.allocatedBudget > 0">
            <md-icon>error</md-icon>
            <span>Your proposal is ${{calculatedTotal(getRequirementsByCategory(a.value)) - newProposalRequest.eventData.allocatedBudget | withComma}} more than the budget</span>
          </li>
        </ul>
      </div>
      <div class="item bundle" v-if="isEdit">
        <div class="element">
          <input-proposal-sub-item
            :title="`Add bundle new total`"
            :placeholder="``"
            :style="`width: 100%`"
          >
          </input-proposal-sub-item>
        </div>
        <div class="element">
          <input-proposal-sub-item
            :title="`Or by percentage`"
            :placeholder="``"
            :style="`width: 100%`"
          >
          </input-proposal-sub-item>
        </div>
        <div class="element dis-value">
          $100.00 Discount
        </div>
        <div class="action-cont">
          <a class="clear">Cancel</a>
          <a class="add">Save</a>
        </div>
      </div>
    </div>
    <div class="total-cont isEdit" v-if="isEdit">
      <div class="title">
        Total
        <br/>
        <span>Before discount</span>
      </div>
      <div class="price">
        <strong>$800</strong>
        <br/>
        $1100
        <span>(10% off)</span>
        <span>$1100</span>
      </div>
    </div>
    <div class="total-cont" v-else>
      <div class="title">
        Total
        <br/>
        <span v-if="discountBlock.value">Before discount</span>
      </div>
      <div class="price">
        <strong>${{calculatedTotal(getRequirementsBySelectedCategory()) | withComma}}</strong>
        <br/>
        <span v-if="discountBlock.value">{{`(${discountBlock.value}% off)`}}</span>
        <span v-if="discountBlock.value">${{total(getRequirementsBySelectedCategory()) | withComma}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import VendorService from '@/services/vendor.service'
  import InputProposalSubItem from '@/components/Inputs/InputProposalSubItem.vue'

  export default {
    name: 'proposal-budget-summary',
    components: {
      InputProposalSubItem
    },
    props: {
      // bundleDiscount: Boolean,
      // additional: Boolean,
      // warning: Boolean,
      // isEdit: Boolean,
      step: Number,
      proposalRequest: Object,
      services: Array,
    },
    data () {
      return {
        isBundleDiscount: false,
        isEdit: false,
        warning: false,
        iconUrl: 'http://static.maryoku.com/storage/icons/NewSubmitPorposal/',
        newProposalRequest: {},
        discountBlock: {},
        additionalServices: [],
        iconsWithCategory: null,
      }
    },
    methods: {
      flatDeep(arr, d = 1) {
        return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? this.flatDeep(val, d - 1) : val), [])
                      : arr.slice();
      },
      servicesByCategory(category) {
        const services = this.services.filter( s => s.name == category)

        if (services.length > 0) {
          return this.flatDeep(
            services[0].categories.map(
              s => s.subCategories.map(
                sc => sc.items.map(dd => dd.name
              )
            )), Infinity
          )
        } else {
          return []
        }
      },
      getIconUrlByCategory(category) {
        return `http://static.maryoku.com/storage/icons/Budget Elements/${this.iconsWithCategory.filter( c => c.value == category)[0].icon}`
      },
      getRequirementsByCategory(category) {
        const services = this.servicesByCategory(category) || []
        return this.newProposalRequest.requirements.filter( r => services.includes(r.requirementTitle) )
      },
      getRequirementsBySelectedCategory() {
        let selectedCategories = []
        let selectedServices = []
        
        selectedCategories = this.additionalServices.map( as => as.value )
        selectedCategories.push('venuerental')

        this.services.filter( s => selectedCategories.includes(s.name) ).map( function (cs) {
          cs.categories.map( function (scs) {
            scs.subCategories.map( function (sscs) {
              sscs.items.map( function (ssscs) {
                selectedServices.push(ssscs.name)
              })
            })
          })
        })

        return this.newProposalRequest.requirements.filter( r => selectedServices.includes(r.requirementTitle) )
      },
      total(requirements, category = null) {
        let total = 0
        let vm = this

        requirements.map(function (item) {
          if (item.price) {
            if (item.priceUnit === 'total') {
              total += parseFloat(String(item.price).replace(/,/g, ''))
            } else {
              if (vm.newProposalRequest !=  undefined) {
                total += parseFloat(String(item.price).replace(/,/g, ''))
              } 
            }
          }
        })
        return total
      },
      calculatedTotal(requirements) {
        let total = this.total(requirements)
        if (this.discountBlock.value != undefined) {
          total = total - ( total * this.discountBlock.value / 100)
        }
        return total
      }
    },
    created() {

    },
    mounted() {
      this.newProposalRequest = this.proposalRequest
      this.iconsWithCategory = VendorService.categoryNameWithIcons()

      this.$root.$on('update-proposal-budget-summary', (newProposalRequest, discountBlock) => {
        this.newProposalRequest = newProposalRequest
        this.discountBlock = discountBlock
      })

      this.$root.$on('update-additional-services', (category) => {
        const additionalServicesBlock = VendorService.categoryNameWithIcons()
        const selectedBlock = additionalServicesBlock.filter(a => a.name == category)[0]

        if (this.additionalServices.filter( a => a.name == category).length > 0) {
          this.additionalServices = this.additionalServices.filter( a => a.name != category )
        } else {
          this.additionalServices.push(selectedBlock)
        }
      })
      this.$forceUpdate()
    },
    computed: {
    },
    watch: {
    }
  }
</script>
<style lang="scss" scoped>
  .proposal-budget-summary-wrapper {
    font-family: 'Manrope-Regular', sans-serif;
    text-align: left;
    color: #050505;
    border-radius: 3px;
    padding: 43px 25px 0;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background: #ffffff;

    .summary-cont {
      h3 {
        font-size: 30px;
        font-weight: 800;
        margin: 0;
        margin-right: 82px;
      }
      p {
        font-size: 16px;
        font-weight: normal;
        margin-bottom: 33px;

        strong {
          font-size: 16px;
          font-weight: 800;
        }
      }
      .bundle-discount {
        padding-bottom: 35px;
        cursor: pointer;

        img {
          width: 30px;
          margin-right: 1em;
        }
        span {
          font-size: 16px;
          font-weight: bold;
          color: #f51355;
          i {
            color: #f51355;
            position: relative;
            top: -1px;
          }
        }
        p {
          margin: 12px 32px 0 44px;
          font-size: 14px;
        }
      }
    }
    .items-cont {
      .item {
        padding: 33px 0;
        border-top: 0.5px solid #707070;
        h3 {
          margin-top: 0;
          margin-bottom: 23px;
          color: #ffc001;
          font-size: 20px;
          font-weight: 800;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          border-bottom: 1px solid #707070;
          margin-bottom: 1rem;
          padding-bottom: 1rem;

          li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 14px;

            &:first-child {
              display: block;
              font: 800 16px 'Manrope-Regular', sans-serif;
              img {
                width: 28px;
                height: 28px;
                margin-right: 1em;
              }
            }
            &:nth-child(2) {
              font-size: 14px;
              font-weight: 800;
              text-decoration: underline;
            }
            &:nth-child(3) {
              font-size: 14px;
              color: #050505;
              span {
                &:last-child {
                  font-size: 20px;
                  font-weight: 800;
                }
              }
            }
            &:nth-child(4) {
              color: #818080;
              margin-bottom: 15px;
              font-size: 14px;
              display: flex;
              justify-content: space-between;

              .left {
                flex: 1;
                text-align: left;
              }
              .right {
                flex: 1;
                text-align: right;
                span {
                  color: #707070;
                  &:last-child {
                    text-decoration: line-through;
                  }
                }
              }
            }
            &:last-child {
              justify-content: flex-start;
              text-align: left;
              margin-bottom: 0;

              i {
                color: #ffe5ec;
                margin: 0;
                margin-right: 8px;
              }
              span {
                font-size: 14px;
              }
            }
          }

          &:last-child {
            margin: 0;
            padding: 0;
            border: none;
          }
        }
        &.additional {
          margin: 0 -25px;
          padding: 33px 25px;
        }
        &.bundle {
          margin: 0 -25px;
          padding: 33px 25px;

          .element {
            margin-bottom: 22px;
            width: 75%;

            &.dis-value {
              background-color: #ffedb7;
              border-radius: 3px;
              padding: 11px 90px;
              font-size: 14px;
              text-align: center;
            }
          }

          .action-cont {
            text-align: right;
            margin-top: 40px;
            a {
              font-size: 16px;
              font-weight: 800;
              cursor: pointer;

              &.clear {
                color: #050505;
                padding: 8px 32px;
                margin-right: 1em;
              }
              &.add {
                background-color: #f51355;
                border-radius: 3px;
                padding: 8px 32px;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
    .total-cont {
      padding: 34px 25px;
      background: #404040;
      margin: auto -25px;
      color: #ffffff;
      display: flex;
      justify-content: space-between;

      .title {
        color: #ffffff;
        font: 800 22px 'Manrope-Regular', sans-serif;

        span {
          font: normal 14px 'Manrope-Regular', sans-serif;
        }
      }
      .price {
        text-align: right;
        font: normal 14px 'Manrope-Regular', sans-serif;
        strong {
          font: 800 22px 'Manrope-Regular', sans-serif;
          margin-bottom: 6px;
          display: inline-block;
        }
        span {
          &:last-child {
            text-decoration: line-through;
          }
        }
      }
      &.isEdit {
        background-color: #ffedb7;
        color: #050505;

        .title {
          color: #050505;
        }
      }
    }
  }  
</style>
