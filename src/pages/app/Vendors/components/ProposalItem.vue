<template>
  <div class="proposal-item-wrapper">
    <h3 class="title">{{category}}</h3>
    <p>
      Which element would you like to involve in your <strong>venue</strong> proposal?
    </p>
    <div class="add-attributes-cont">
      
    </div>
    <div class="add-attributes-cont">
      <input-proposal-sub-item
        :title="`Description`"
        :placeholder="`Type name of elements here`"
        :style="`width: 40%;`">
      </input-proposal-sub-item>
      <input-proposal-sub-item
        :title="`QTY`"
        :placeholder="0"
        :style="`width: calc(28% - 44px)`">
      </input-proposal-sub-item>
      <input-proposal-sub-item
        :title="`Price per unit`"
        :placeholder="0"
        :style="`width: 16%`">
      </input-proposal-sub-item>
      <input-proposal-sub-item
        :title="`Total`"
        :placeholder="`$0.00`"
        :style="`width: 16%; margin-right: 0`">
      </input-proposal-sub-item>
    </div>
    <div class="action-cont">
      <a class="clear">Clear</a>
      <a class="add">Add This</a>
    </div>
    <table class="table-sub-items">
      <thead>
        <tr>
          <th>Description</th>
          <th>QTY</th>
          <th>Price per unit</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="active">
          <td>Sound Equipment</td>
          <td>1</td>
          <td>$400</td>
          <td>$400</td>
          <td>
            <md-icon>edit</md-icon>
            <md-icon>delete</md-icon>
          </td>
        </tr>
        <tr class="inactive">
          <td>Sound Equipment</td>
          <td>1</td>
          <td>$400</td>
          <td>$400</td>
          <td>
            <md-icon>edit</md-icon>
            <md-icon>delete</md-icon>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">Total</td>
          <td colspan="2">$800.00</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
  import InputProposalSubItem from '@/components/Inputs/InputProposalSubItem.vue'

  export default {
    name: 'proposal-item',
    components: {
      InputProposalSubItem
    },
    props: {
      category: String
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

    h3.title {
      font-weight: 800;
      font-size: 30px;
      margin: 0;
    }

    p {
      font-size: 20px;
      strong {
        font-weight: 800;
      }
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
    
    .table-sub-items {
      padding: 0;
      margin-top: 68px;
      border-top: 1px solid black;
      width: calc(100% + 74px);
      text-align: left;

      thead {
        padding: 0 34px;
        tr {
          th {
            padding: 40px 0 26px 0;
          }
        }
      }
      tbody {
        tr {
          td {
            border-top: 1px solid #050505;
            font-size: 16px;
            font-weight: bold;
            padding: 46px 0;
          }
          &.inactive {
            td {
              border-top: 1px solid #818080;
              color: #818080;
            }
          }
        }
      }
      tfoot {
        background-color: #d5d5d5;
        tr {
          td {
            font-size: 20px;
            font-weight: 800;
            padding: 34px 0;
            border: none;
          }
        }
      }
    }
  }
</style>
