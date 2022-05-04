<template>
  <div class="d-flex align-center p-50">
    <img class="mr-30" :src="`${$iconURL}Campaign/Group 9136.svg`">
    <div>
      <div class="font-size-30 font-bold-extra color-red">
        {{ title }}
      </div>
      <div class="mt-2 d-flex align-center">
        <span class="font-bold-extra font-size-30 pr-20">{{ inviteesCount }}</span>
        <span>{{ inviteesTitle }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type    : String,
      default : "Message Settings",
    },
    inviteesTitle: {
      type    : String,
      default : "in your current invitee list",
    },
    inviteesCount: {
      type    : Number,
      default : 0,
    }
  }
};
</script>
