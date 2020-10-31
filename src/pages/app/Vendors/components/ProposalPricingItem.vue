<template>
  <div class="proposal-pricing-items-wrapper">
    <div
      class="pricing-item"
      :class="[{ 'total-wrapper': itemType == 'total' }, { 'bundle-wrapper': itemType == 'bundle' }]"
    >
      <div class="summary" @click="expand()">
        <div class="left">
          <img v-if="itemType == 'price'" :src="getCategoryIcon()" />
          <img v-if="itemType == 'bundle'" :src="`${iconUrl}Asset 577.svg`" />
          <h3 v-if="itemType == 'price'">{{ category }}</h3>
          <h3 v-if="itemType == 'bundle'">Bundle offer</h3>
          <div v-if="itemType == 'total'" class="total-cont">
            <h4>Total</h4>
            <span>before discount</span>
          </div>
          <span v-if="itemType == 'price'">For Whole Event</span>
          <div class="bundle-desc" v-if="itemType == 'bundle'">
            <h4>15%</h4>
            <span>Venue + Catering</span>
          </div>
        </div>
        <div class="right">
          <div class="price-cont" v-if="!isExpanded">
            <span class="org-price">${{ getOrgPrice() | withComma }}</span>
            <div class="off-cont">
              (0% off)
              <span>${{ getOrgPrice() | withComma }}</span>
            </div>
          </div>
          <img
            v-if="itemType == 'price'"
            :src="`${iconUrl}Component 36 (2).svg`"
            :style="`transform: ${isExpanded ? 'rotate(90deg)' : ''}`"
          />
        </div>
      </div>
      <div v-if="isExpanded" class="subitems">
        <div class="editable-sub-items-header">
          <span>Description</span>
          <span>QTY</span>
          <span>Price per unit</span>
          <span>Subtotal</span>
        </div>
        <editable-proposal-sub-item
          v-for="(s, sIndex) in servicesByCategory()"
          :key="sIndex"
          :item="s"
          :active="true"
          :isEdit="false"
          :step="3"
        />
        <div class="discount-tax-wrapper">
          <div class="item">
            <div class="left">
              <span>Discount</span>
              <span>0%</span>
            </div>
            <div class="right">
              <span>-$0</span>
            </div>
          </div>
          <div class="item">
            <div class="left">
              <span>Taxes</span>
              <span>0%</span>
            </div>
            <div class="right">
              <span>$0</span>
            </div>
          </div>
        </div>
        <div class="editable-sub-items-footer">
          <span>Total</span>
          <span>${{ getOrgPrice() | withComma }}</span>
        </div>
        <div class="services-check-list-wrapper">
          <h4>What do we include in this proposal?</h4>
          <div class="check-list-cont">
            <ul>
              <li>
                <check-list-item
                  v-for="(s, sIndex) in servicesByCategory()"
                  :key="sIndex"
                  :name="s.requirementTitle"
                  :iconUrl="iconUrl"
                  :qty="s.requirementValue"
                  :desc="`Lorem`"
                />
              </li>
              <!-- <li>
                <a class="add-service"><img :src="`${iconUrl}Asset 567.svg`"/>Add Another</a>
              </li>-->
            </ul>
          </div>
        </div>
        <div class="extras-wrapper">
          <h4><img :src="`${iconUrl}Asset 576.svg`" />Extras</h4>
          <p>We suggest these features to the client with this proposal</p>
          <div class="extra-items">
            <check-list-item
              v-for="(s, sIndex) in servicesByCategory()"
              :key="sIndex"
              :name="s.requirementTitle"
              :iconUrl="iconUrl"
              :desc="`Lorem`"
              :extra="true"
              :qty="s.requirementValue"
              :price="`$${s.price}`"
            />
          </div>
        </div>
        <div class="attachments-cont">
          <h4>Attachments</h4>
          <div class="files-cont">
            <div class="item"><img :src="`${iconUrl}Asset 578.svg`" /> Kosher_certificate.pdf</div>
            <div class="item"><img :src="`${iconUrl}Asset 578.svg`" /> Kosher_certificate.pdf</div>
            <div class="item"><img :src="`${iconUrl}Asset 578.svg`" /> Kosher_certificate.pdf</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditableProposalSubItem from "./EditableProposalSubItem.vue";
import CheckListItem from "./CheckListItem.vue";
import VendorService from "@/services/vendor.service";

export default {
  name: "proposal-pricing-item",
  components: {
    EditableProposalSubItem,
    CheckListItem,
  },
  props: {
    category: String,
    isCollapsed: Boolean,
    isDropdown: Boolean,
    proposalRange: Boolean,
    iconUrl: String,
    itemType: String,
    requirements: Array,
  },
  data() {
    return {
      isExpanded: false,
      iconsWithCategory: null,
    };
  },
  methods: {
    expand() {
      if (this.itemType == "price") {
        this.isExpanded = !this.isExpanded;
      }
    },
    getCategoryIcon() {
      console.log(
        `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/${
          this.iconsWithCategory.filter((c) => c.name == this.category)[0].icon
        }`,
      );
      return `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/${
        this.iconsWithCategory.filter((c) => c.name == this.category)[0].icon
      }`;
    },
    servicesByCategory() {
      return this.requirements.filter((r) => r.requirementsCategory == this.category);
    },
    getOrgPrice() {
      let total = 0;

      if (this.itemType == "price") {
        this.servicesByCategory().forEach((s) => {
          total += s.price;
        });
      } else if (this.itemType == "total") {
        this.requirements.forEach((r) => {
          total += r.price;
        });
      } else {
        total = 0;
      }

      return total;
    },
  },
  created() {},
  mounted() {
    this.iconsWithCategory = VendorService.categoryNameWithIcons();
  },
  computed: {},
  filters: {
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.proposal-pricing-items-wrapper {
  background-color: #ffffff;
  font-family: "Manrope-Regular", sans-serif;
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

      .left {
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
            text-transform: capitalize;
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
      background: #f7f7f7;
      margin-top: 30px;

      .editable-sub-items-header {
        padding: 40px 34px 26px 34px;
        display: grid;
        grid-template-columns: 40% 15% 15% 15% 15%;

        span {
          display: inline-block;
          font-size: 16px;
          font-weight: 800;
        }
      }
      .discount-tax-wrapper {
        padding: 0 38px;
        background: #ededed;
        border-top: 1.5px solid #818080;

        .item {
          display: grid;
          grid-template-columns: 70% 30%;
          font-size: 16px;
          font-weight: 800;
          color: #818080;
          padding: 24px 0;
          .left {
            display: grid;
            grid-template-columns: 15% 0%;
          }
          .right {
          }
          &:first-child {
            border-bottom: 1px solid #707070;
          }
        }
      }
      .editable-sub-items-footer {
        background: #424242;
        color: white;
        padding: 20px 40px;
        display: grid;
        grid-template-columns: 70% 30%;

        span {
          font-size: 20px;
          font-weight: 800;

          &:last-child {
            margin-right: 155px;
          }
        }
      }
    }
    .services-check-list-wrapper {
      background-color: #ffffff;
      padding: 50px 0px 60px 0px;
      display: flex;
      flex-wrap: wrap;

      h4 {
        text-transform: capitalize;
        font-size: 22px;
        font-weight: 800;
        margin: 0 0 32px 0;
      }
      .check-list-cont {
        width: 100%;
        ul {
          padding: 0;
          list-style: none;
          -webkit-column-count: 2;
          -moz-column-count: 2;
          column-count: 2;
          list-style-position: inside;
          li {
            a {
              &.add-service {
                cursor: pointer;
                display: inline-block;
                padding: 15px 40px;
                img {
                  width: 0px;
                  margin-right: 0px;
                }
                font-size: 14px;
                border: 1px dashed #f51355;
                border-radius: 3px;
              }
            }
            &:first-child,
            &:nth-child(2n) {
              margin-left: 0 !important;
              margin-right: 70px;
            }
            &:nth-child(2n + 1) {
              margin-left: 60px;
            }
            &:nth-child(2n) {
              &:after {
                content: "";
                background-color: #000;
                position: absolute;
                width: 1px;
                height: auto;
                display: block;
              }
            }
          }
        }
      }
    }
    .extras-wrapper {
      margin-left: -60px;
      margin-right: -50px;
      padding: 60px;
      background: #ffffff;
      border-top: 1px solid #818080;
      h4 {
        font-size: 22px;
        font-weight: 800;
        margin: 0;

        img {
          width: 14px;
          margin-right: 16px;
          top: -2px;
          position: relative;
        }
      }
      p {
        margin-top: 13px;
        margin-bottom: 35px;
        font-size: 16px;
      }
      .extra-items {
        width: 75%;
      }
    }
    .attachments-cont {
      margin-left: -60px;
      margin-right: -50px;
      padding: 60px;
      background: #ffffff;
      border-top: 1px solid #818080;
      h4 {
        font-size: 22px;
        font-weight: 800;
        margin: 0;
        margin-bottom: 30px;
      }
      .files-cont {
        display: flex;
        .item {
          border: 1px solid #f51355;
          color: #f51355;
          border-radius: 3px;
          font-size: 16px;
          padding: 18px 30px;
          margin-right: 40px;

          img {
            width: 12px;
            margin-right: 0px;
            transform: rotate(45deg);
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
