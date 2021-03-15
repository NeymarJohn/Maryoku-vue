<template>
  <div class="vendor-extra-pay-item-wrapper">
    <div class="collapsed" @click="expand()">
      <div class="col label">{{item.label}}
          <img
                  v-if="item.hasOwnProperty('desc') && item.desc"
                  class="ml-20"
                  :class="{'rotate-90': expanded}"
                  :src="`https://static-maryoku.s3.amazonaws.com/storage/icons/NewSubmitPorposal/Group 4770 (2).svg`"
          />
      </div>
      <div class="col" v-if="!isEditable">{{getQty()}}</div>
      <div class="col" v-else>
        <div>
          <input v-model="item.qty" @input="changeItem()"/>
        </div>
      </div>
      <div class="col" v-if="!isEditable">{{getPrice()}}</div>
      <div class="col" v-else>
        <div class="field">
          <input v-model="item.value" @input="changeItem()"/>
        </div>
      </div>
      <div class="col action">
        <img class="mr-20 ml-auto" src="https://static-maryoku.s3.amazonaws.com/storage/icons/Requirements/edit-dark.svg" @click="edit">
        <img src="https://static-maryoku.s3.amazonaws.com/storage/icons/Requirements/delete-dark.svg" @click="remove">
      </div>
    </div>
    <div class="expanded" v-if="expanded">
      <span v-if="!isEditable">{{item.desc}}</span>
      <textarea v-else v-model="item.desc"></textarea>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "vendor-extra-pay-item",
  props: {
    item: Object,
  },
  components: {},
  data() {
    return {
      expanded: false,
      isEditable: false,
      iconUrl:
        "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
    };
  },
  created() {},
  mounted() {},
  methods: {
    expand() {
      if (this.item.desc) {
        this.expanded = !this.expanded;
      }
    },
    getQty() {
      if (this.item.value) {
        if (this.item.value.constructor.name == "Array") {
          return this.item.value.length;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    getPrice() {
      if (this.item.value) {
        if (this.item.value.constructor.name == "String") {
          return `+$${this.item.value}`;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    changeItem(){
      this.$emit('change', this.item);
    },
    edit(){
      this.isEditable = true;
    },
    remove(){
      this.item.checked = false;
      console.log('remvoe', this.item);
      this.$emit('change', this.item);
    }
  },
  computed: {},
  filters: {},
  watch: {},
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
      display: flex;
      align-items: center;

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

      input{
        text-align: center;
        border-radius: 3px;
        border: 1px solid #818080;
        max-width: 160px;
        font: normal 16px Manrope-Regular, sans-serif;
        color: #050505;
      }

      .field{
        display: inline-block;
      }

      .field:before{
        content: "$";
        position: absolute;
        margin-top: 15px;
        margin-left: 3rem;
      }
    }

    .action {
      opacity: 0;
    }

    &:hover{
      .action {
        opacity: 1;
      }
    }
  }
  .expanded {
    max-width: 40%;
    font: normal 14px Manrope-Regular, sans-serif;
    padding-bottom: 1rem;

    textarea{
      min-width: 300px;
    }
  }
  .rotate-90 {
    transform: rotate(90deg);
  }
}
</style>
