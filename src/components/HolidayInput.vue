<template>
  <div class="maryoku_input">
    <multiselect
            v-model="value"
            :options="[]"
            :close-on-select="true"
            :clear-on-select="true"
            tag-placeholder="Add this as new tag"
            placeholder="Please select vendors"
            class="multiple-selection small-selector mt-10"
    ></multiselect>
  </div>
</template>
<script>
  import { asyncForEach } from "@/utils/helperFunction";
  const christanHolidaysAPI =
          "https://www.googleapis.com/calendar/v3/calendars/en.christian%23holiday%40group.v.calendar.google.com/events?key=AIzaSyC4qrUfpIKpm5yZ1p7wGJAxa77PJwlgKD8";
  const jewishHolidaysAPI =
          "https://www.googleapis.com/calendar/v3/calendars/en.jewish%23holiday%40group.v.calendar.google.com/events?key=AIzaSyC4qrUfpIKpm5yZ1p7wGJAxa77PJwlgKD8";
  const muslimHolidaysAPI =
          "https://www.googleapis.com/calendar/v3/calendars/en.islamic%23holiday%40group.v.calendar.google.com/events?key=AIzaSyC4qrUfpIKpm5yZ1p7wGJAxa77PJwlgKD8";
  const hinduHolidaysAPI =
          "https://www.googleapis.com/calendar/v3/calendars/en.islamic%23holiday%40group.v.calendar.google.com/events?key=AIzaSyC4qrUfpIKpm5yZ1p7wGJAxa77PJwlgKD8";

export default {
  name: "holiday-input",
  model: {},
  props: {
    value: String,
  },
  data() {
    return {
      religions: [
        {
          name: "Chrisitanity",
          holidays: [],
          url: christanHolidaysAPI,
        },
        {
          name: "Hindu",
          holidays: [],
          url: hinduHolidaysAPI,
        },
        {
          name: "Islamic",
          url: muslimHolidaysAPI,
          holidays: [],
        },
        {
          name: "Judaism",
          url: jewishHolidaysAPI,
          holidays: [],
        },
      ],
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", this.content);
    },
    init: async function(){
      await asyncForEach(this.religions, async it => {
        let res = await this.$http.get(it.url, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "",
            Referer: "*",
            "Content-Type": "jsonp",
          },
        });

        console.log("holidays", res)
      });
    }
  },
  computed: {
  },
  mounted() {
    console.log("mounted");
    this.init();
  },
  watch: {
  },
};
</script>
<style lang="scss">

</style>
