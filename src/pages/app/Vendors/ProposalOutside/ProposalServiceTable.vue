<template>
  <div v-if="services && services.length > 0" class="proposal-service-table-wrapper">
    <div class="editable-sub-items-cont">
      <proposal-service-table-item
        v-for="(req, rIndex) in services"
        :key="req.requirementTitle + rIndex"
        :service-type="tableCategory"
        :index="rIndex"
        :default-item="req"
        :active="true"
        :step="1"
        @save="updateItem"
        @remove="removeItem"
      />
      <div v-if="tableCategory === 'cost'" class="editable-sub-items-footer">
        <span class="text-right">Total</span>
        <span />
        <span />
        <span class="text-right"> ${{ totalPrice | withComma }} </span>
      </div>
    </div>
  </div>
</template>
<script>
import ProposalRequest from "@/models/ProposalRequest";
import ProposalServiceTableItem from "./ProposalServiceTableItem.vue";
import _ from "underscore";

export default {
  name: "ProposalServiceTable",
  components: {
    ProposalServiceTableItem,
  },
  filters: {
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    },
  },
  props: {
    category: {
      type: String,
      default: ""
    },
    isCollapsed: Boolean,
    isDropdown: Boolean,
    proposalRange: Boolean,
    subTitle: {
      type: String,
      default: ""
    },
    img: {
      type: String, 
      default: ""
    },
    service: {
      type: Object,
      default: () => {}
    },
    tableCategory: {
      type: String,
      default: () => {}
    },
  },
  data() {
    return {
      isAllFilledInfo: false,
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewSubmitPorposal/",
      isVCollapsed: false,
      isChecked: false,
      isEditDiscount: false,
      isEditTax: false,
      clickedItem: false,
      discount: {},
      discount_by_amount: 0,
      isDiscountPercentage: true,
      tax: 0,

      isRequiredPlannerChoice: false,

      inputType: "text",
      temp: null,
      isNumberVisible: true,
      files: [],
      docTag: null,

      servicesWidth: 0,
      currencyFormat: {
        decimal: ".",
        thousands: ",",
        prefix: "$",
        suffix: "",
        precision: 0,
        masked: false,
      },
      qtyFormat: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: false,
      },
      percentageFormat: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "  %",
        precision: 2,
        masked: false,
      },
      selectedQuickButton: "",
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 10,
      },
      proposalData: {},
    };
  },
  computed: {
    requirements() {
      return this.proposalRequest.componentRequirements[this.category];
    },
    optionalRequirements() {
      if (!this.requirements) return [];
      return this.requirements.filter((item) => !item.mustHave && item.type !== "multi-selection");
    },
    mandatoryRequirements() {
      if (!this.requirements) return [];
      return this.requirements.filter((item) => item.mustHave);
    },
    proposalRequest() {
      return this.$store.state.proposalForNonMaryoku.proposalRequest;
    },
    vendor() {
      return this.$store.state.proposalForNonMaryoku.vendor;
    },
    services: {
      get: function () {
        if (this.tableCategory === "cost") return this.$store.state.proposalForNonMaryoku.costServices[this.category];
        else if (this.tableCategory === "included") {
          return this.$store.state.proposalForNonMaryoku.includedServices[this.category];
        } else if (this.tableCategory === "extra")
          return this.$store.state.proposalForNonMaryoku.extraServices[this.category];
        return [];
      },
      set: function (newServices) {
        if (this.tableCategory === "cost")
          this.$store.commit("proposalForNonMaryoku/setCostServices", {
            category: this.category,
            services: newServices,
          });
        else if (this.tableCategory === "included")
          this.$store.commit("proposalForNonMaryoku/setIncludedServices", {
            category: this.category,
            services: newServices,
          });
        else if (this.tableCategory === "extra")
          this.$store.commit("proposalForNonMaryoku/setExtraServices", {
            category: this.category,
            services: newServices,
          });
      },
    },
    calculatedTotal() {
      return this.totalPrice - this.discount.price + this.taxPrice;
    },
    taxPrice() {
      return Math.round(((this.totalPrice - this.discount.price) * this.tax) / 100);
    },
    totalPrice() {
      if (!this.services) {
        return 0;
      }
      const sumPrice = this.services.reduce((s, item) => {
        return s + (item.isComplimentary ? 0 : item.requirementValue * item.price);
      }, 0);
      return sumPrice;
    },
  },
  watch: {},
  created() {
    this.$root.$emit("update-proposal-budget-summary", this.proposalRequest, {});
    this.$root.$on("remove-proposal-requirement", (item) => {
      this.proposalRequest.requirements = this.proposalRequest.requirements.filter(
        (req) => req.requirementTitle != item.requirementTitle,
      );
      this.$root.$emit("update-proposal-budget-summary", this.proposalRequest, {});
      this.$forceUpdate();
      this.cancel();
    });

    this.$root.$on("add-service-item", (item) => {
      this.clickedItem = !this.clickedItem;
      this.serviceItem = item;
      this.qty = this.unit = this.subTotal = 0;
      this.selectedQuickButton = item;
    });

    this.$root.$on("save-proposal-requirement", ({ index, item }) => {
      if (this.proposalRequest) {
        this.proposalRequest.requirements[index] = item;
      }
      if (this.newProposalRequest) {
        this.newProposalRequest.requirements[index] = item;
      }
      this.$root.$emit("update-proposal-budget-summary", this.proposalRequest, {});
      this.$forceUpdate();
    });

    if (this.$refs.servicesCont) {
      this.servicesWidth = this.$refs.servicesCont.clientWidth;
    }
    this.tax = this.$store.state.proposalForNonMaryoku.taxes[this.category];
    if (!this.tax) this.tax = 0;
    this.discount = this.$store.state.proposalForNonMaryoku.discounts[this.category];
    if (!this.discount) {
      this.discount = {
        percentage: 0,
        price: 0,
      };
    } else if (!this.discount.price) {
      this.discount.price = ((this.totalPrice * this.discount.percentage) / 100).toFixed(0);
    }
  },
  methods: {
    getObject(item) {
      return JSON.parse(JSON.stringify(item));
    },
    clickItem(category) {
      this.isChecked = !this.isChecked;
      this.$root.$emit("update-additional-services", category);
    },
    setRange(value, type) {
      let val = value;
      if (type == "discount_percentage") {
        if (value > 100) {
          val = 100;
        }
        if (value < 0) {
          val = 0;
        }
      }
      if (type == "tax") {
        this.tax = val;
        this.discount_by_amount = 0;
      } else if (type == "discount_by_amount") {
        this.discount.percentage = ((val / this.totalPrice) * 100).toFixed(2);
      } else {
        this.discount.price = ((this.totalPrice * val) / 100).toFixed(0);
      }
    },
    cancel() {
      this.selectedQuickButton = "";
      this.serviceItemSize = "";
      this.qty = 0;
      this.unit = 0;
      this.subTotal = 0;
      this.serviceItem = null;
      this.discount_by_amount = null;
    },
    saveItem(serviceItem, size, qty, price, category) {
      this.services.unshift({
        comments: [],
        dateCreated: "",
        includedInPrice: true,
        itemNotAvailable: false,
        price: price,
        priceUnit: "qty",
        proposalRequest: { id: this.proposalRequest.id },
        requirementComment: null,
        requirementId: "",
        requirementMandatory: false,
        requirementPriority: null,
        requirementTitle: serviceItem,
        requirementsCategory: category,
        requirementSize: size,
        requirementValue: `${qty}`,
      });
      this.$forceUpdate();
      this.$root.$emit("update-proposal-budget-summary", this.proposalRequest, {});
      this.cancel();
    },
    updateItem({ index, item }) {
      const serviceIndex = this.services.findIndex((it) => item.requirementTitle === it.requirementTitle);

      if (this.tableCategory === "included" && item.price > 0) {
        this.$store.dispatch("proposalForNonMaryoku/addPrice", { category: this.category, selectedItem: item });
      } else {
        this.services[serviceIndex] = item;
        this.services = Object.assign([], this.services);
      }
    },
    removeItem(index) {
      this.services.splice(index, 1);
      this.services = this.services;
    },
    calculateSubTotal() {
      this.subTotal = this.qty * this.unit;
      this.discount_by_amount = this.unit;
    },
    saveDiscount() {
      this.isEditDiscount = false;
      this.$store.commit("proposalForNonMaryoku/setDiscount", { category: this.category, discount: this.discount });
      this.$root.$emit("update-proposal-budget-summary", this.proposalRequest, {
        category: this.category,
        value: this.discount,
      });
    },
    cancelDiscount() {
      this.isEditDiscount = false;
      this.discount = 0;
    },

    saveTax() {
      this.isEditTax = false;
      this.$store.commit("proposalForNonMaryoku/setTax", { category: this.category, tax: this.tax });
    },
    createProposalFile(file) {
      let reader = new FileReader();
      let vm = this;

      reader.onload = (e) => {
        let proposalRequest = new ProposalRequest({ id: vm.$route.params.id });

        this.files.push({
          tag: this.docTag,
          filename: file.name,
        });

        if (this.docTag == "image") {
          Swal.fire({
            title: `You've Uploaded an Image named ${file.name}`,
            text: "",
            type: "success",
            timer: 3000,
          });
        }
      };
      reader.readAsDataURL(file);
    },

    totalCost() {
      return this.services.reduce((s, item) => {
        return s + item.price * item.requirementValue;
      }, 0);
    },
    totalOffer() {
      // let total = parseFloat(this.proposalRequest.requirementsCategoryCost)
      let total = 0;
      let vm = this;
      let requirements = [];
      if (this.proposalRequest.requirements.length) {
        requirements = this.proposalRequest.requirements.filter((r) => r.hasOwnProperty("requirementTitle"));
      }

      requirements.map(function (item) {
        if (item.price) {
          if (item.priceUnit === "total") {
            total += parseFloat(String(item.price).replace(/,/g, ""));
          } else {
            if (vm.proposalRequest != undefined) {
              total += parseFloat(String(item.price).replace(/,/g, "")) * parseInt(item.requirementValue);
            }
          }
        }
      });

      return total;
    },

    switchDiscountMethod() {
      // this.discount.price = 0;
      // this.discount.percentage = 0;
    },

    async imageSelected(file) {
      const imageData = await getBase64(file);
      const extension = file.type.split("/")[1];
    },
  },
};
</script>
<style lang="scss" scoped>
.proposal-service-table-wrapper {
  padding: 0px;
  font-family: "Manrope-Regular", sans-serif;
  color: #050505;

  .dropdown-zone {
    margin: 30px;
  }

  .sub-items-cont {
    padding: 1rem 0;
    overflow: hidden;
    position: relative;

    h3 {
      font-size: 30px;
      font-weight: 800;
      padding-bottom: 2rem;
      margin: 0;
    }
    .sub-items {
      // display: flex;
      display: block;
      position: relative;
      white-space: nowrap;
      width: calc(100% - 2rem);
      // overflow-x: auto;
    }
    .prev {
      position: absolute;
      cursor: pointer;
      z-index: 99;
      left: 0;
      background: #fff;
      padding: 1.5rem 0;
      top: 0;
      i {
        color: #641856 !important;
      }
    }
    .next {
      z-index: 99;
      position: absolute;
      cursor: pointer;
      right: 0;
      background: #fff;
      padding: 1.5rem 0;
      top: 0;
      i {
        color: #641856 !important;
      }
    }
  }

  .add-attributes-cont {
    display: flex;
  }

  a {
    cursor: pointer;
    padding: 8px 26px;
    &:hover {
      color: #dddddd !important;
      .md-icon {
        color: #dddddd !important;
        font-weight: normal;
      }
    }
    &.cancel {
      font: 800 16px "Manrope-Regular", sans-serif;
      color: #050505;
      background: transparent;
    }
    &.save {
      font: 800 16px "Manrope-Regular", sans-serif;
      color: white;
      background: #641856;
      border-radius: 3px;

      &.isDisabled {
        pointer-events: none;
        cursor: not-allowed;
        background: #d5d5d5;
      }
    }
  }

  .editable-sub-items-cont {
    margin-top: 2rem;

    .editable-sub-items-header {
      // border-top: 1px solid #707070;
      border-top: 2px solid #cbcbcb;
      padding: 40px 0px 30px 0px;
      display: grid;
      // grid-template-columns: 30% 10% 10% 12% 15%;
      // grid-template-columns: 40% 14% 14% 14% 14%;
      grid-template-columns: 50% 10% 12% 14% 10%; // 40% 10% 20% 20% 10%;
      gap: 1%;

      span {
        display: inline-block;
        font-size: 16px;
        font-weight: 800;
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
        display: grid;
        grid-template-columns: 55% 15% 15% 15%;
        align-items: center;
        input {
          font-size: 16px;
          padding: 1.5rem 1rem;
          border: 1px solid #b7b7b7;
          box-shadow: none;
          font: normal 16px "Manrope-Regular", sans-serif;
          color: #050505;
          &.isFilled {
            border: 1px solid #828282;
          }
        }
        .item-cont {
          display: grid;
          grid-template-columns: 40% 60%;
          align-items: center;

          .plabel {
          }
          .ptitle {
            padding-left: 1rem;
            font: normal 14px "Manrope-Regular", sans-serif;
            text-align: left;
          }
        }
        .percent-cont {
          font: normal 14px "Manrope-Regular", sans-serif;
          color: #050505;
          text-align: center;
          &.text-right {
            padding-right: 1rem;
            span {
              font-weight: 400 !important;
            }
          }
        }
        .price-cont {
          font: normal 14px "Manrope-Regular", sans-serif;
          span {
            &.pl-2 {
              font: normal 14px "Manrope-Regular", sans-serif;
              color: #050505;
              padding-left: 20px;
            }
          }
        }
        &:hover {
          .edit-cont {
            .edit {
              visibility: unset;
            }
          }
        }
        .edit-cont {
          text-align: right;
          white-space: nowrap;
          .edit {
            width: 21px;
            height: 21px;
            margin-right: 2rem;
            cursor: pointer;
            visibility: hidden;
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
      // box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
      // background-color: #d5d5d5;
      padding: 30px 0px;
      border-top: 1px solid #d5d5d5;
      border-bottom: none;
      display: grid;
      // grid-template-columns: 55% 15% 15%;
      grid-template-columns: 50% 10% 12% 14% 10%;
      gap: 1%;
      span {
        font-size: 20px;
        font-weight: 800;
      }
    }
  }

  .active-discount {
    width: 100px;
    margin-top: 5px;
    border: 1px solid #050505;
    text-align: center;
    font: normal 16px "Manrope-Regular", sans-serif;
  }
  .inactive-discount {
    opacity: 0.6;
    width: 100px;
    text-align: center;
    margin-top: 5px;
    background: #d5d5d5;
    border: 1px solid #707070;
    font: normal 16px "Manrope-Regular", sans-serif;
  }

  .additional-photos-wrapper {
    margin-left: -34px;
    margin-right: -34px;
    padding: 60px 0 10px 0;
    border-top: 1px solid #707070;

    .title-cont {
      display: flex;
      align-items: flex-end;
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
        position: relative;
        top: -6px;
      }
      p {
        font-size: 16px;
        margin: 0;
        margin-left: 72px;
      }
    }
    .upload-cont {
      padding-bottom: 84px;
      p {
        font-size: 16px;
        margin-left: 72px;
        margin-top: 9px;
        margin-bottom: 30px;
      }
      .upload {
        border: 1px dashed #641856;
        margin: 0 34px;
        padding: 32px;
        cursor: pointer;
        text-align: center;

        a.choose-file {
          font-size: 14px;
          font-weight: 800;
          padding: 8px 24px;
          color: #641856;
          border: 1px solid #641856;
          border-radius: 3px;
          display: inline-block;

          img {
            width: 10px;
            margin-right: 8px;
          }
        }
        span {
          display: inline-block;
          &.or {
            padding: 5px 0;
          }
        }
      }
    }
  }
  .pb-40 {
    padding-bottom: 40px;
    cursor: pointer;
  }

  .hide {
    display: none;
  }
}
</style>
