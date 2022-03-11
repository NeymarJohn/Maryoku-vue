<template>
  <div class="md-layout text-center">
    <div class="md-layout-item md-size-50 md-small-size-100">
      <lock-card>
        <img slot="imageProfile" class="img" :src="image">
        <h4 slot="title" class="title">
          Tania Andrew
        </h4>
        <md-field slot="content">
          <label>Enter Password</label>
          <md-input v-model="password" type="password" />
        </md-field>
        <md-button slot="footer" href class="md-success md-round">
          Unlock
        </md-button>
      </lock-card>
    </div>
  </div>
</template>
<script>
import { LockCard } from "@/components";
export default {
  components: {
    LockCard,
  },
  data() {
    return {
      password: null,
      image:
        "https://static-maryoku.s3.amazonaws.com/storage/img/faces/avatar.jpg",
    };
  },
};
</script>
<style>
</style>
