<template>
  <div class="select-time-cont">
    <img :src="`${iconsUrl}Group 6085.svg`" />
    <vue-timepicker
      manual-input
      input-class="time-class"
      hide-dropdown
      format="hh:mm"
      v-model="startTime"
      hide-clear-button
    />
    <div class="am-field" @click="updateStartA()">
      <input type="text" v-model="amPack.start" readonly />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      amPack: {
        start: "AM",
        end: "AM",
      },
      startTime: {
        hh: "12",
        mm: "00",
      },
    };
  },
  methods: {
    updateStartA() {
      if (this.amPack.start == "AM") {
        this.amPack.start = "PM";
      } else {
        this.amPack.start = "AM";
      }
    },
  },
};
</script>