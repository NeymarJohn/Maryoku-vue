<template>
  <div class="select-proposal-sub-item-wrapper">
    <div v-if="active" class="active">
      {{item}} <md-icon>add_circle</md-icon>
    </div>
    <div v-else class="inactive">
      {{item}} <md-icon>close</md-icon>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'select-proposal-sub-item',
    components: {
    },
    props: {
      active: Boolean,
      item: String
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
  .select-proposal-sub-item-wrapper {
    margin-right: 30px;

    div {
      padding: 16px 28px 15px 28px;
      border-radius: 100px;
      background-color: #ffffff;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;

      &.active {
        border: solid 1px #f51355;
        color: #f51355;

        i {
          color: #f51355;
          margin-left: 8px;
          margin-top: -3px;
        }
      }
      &.inactive {
        border: solid 1px #818080;

        i {
          color: #818080;
          margin-left: 8px;
          margin-top: -3px;
        }
      }
    }
  }
</style>
