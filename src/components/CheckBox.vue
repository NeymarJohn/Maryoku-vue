<template>
  <div class="checks-cont">
    <div class="check-item" @click="handleCheck(true)">
      <img v-if="checked" :src="`/static/icons/vendor/Icon_V.svg`">
      <span v-else class="unchecked" />
      <span>Yes</span>
    </div>
    <div class="check-item" @click="handleCheck(false)">
      <img v-if="!checked" :src="`/static/icons/vendor/Icon_V.svg`">
      <span v-else class="unchecked" />
      <span>No</span>
    </div>
  </div>
</template>
<script>
export default {
    name: "Badge",
    props: {
        checked: {
            type: Boolean,
        },

    },
    methods: {
        handleCheck(value) {
            this.$emit("changed", value);
        }
    },
    watch: {
      checked(newVal){
        console.log('checked.watch', newVal);
      }
    }
};
</script>
<style lang="scss" scoped>
.checks-cont {
    display: flex;
    justify-content: flex-start;

    .check-item {
        display: flex;
        align-items: center;
        margin-right: 5rem;
        cursor: pointer;

        img {
            width: 30px;
            height: 30px;
            margin-right: 14px;
        }
    }

    span {
        &.unchecked {
            display: inline-block;
            width: 30px;
            height: 30px;
            border: 1px solid #707070;
            border-radius: 50%;
            background: #ffffff;
            margin-right: 14px;
        }
    }
}
</style>
