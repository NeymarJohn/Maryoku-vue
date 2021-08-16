<template>
    <div>
        <svg
          :width="35"
          :height="100"
        >
          <g
            v-for="(item, idx) in recordingData"
            :key="idx"
            transform="translate(0, 0) scale(1, 1)"
          >
              <rect
                  :x="10"
                  :y="recordingData.reduce((sum, it, index) => {
                      return index < idx ? sum + it.value - (idx > 0 ? 9 : 0) : sum
                      }, 0)"
                  width="15"
                  :rx="8"
                  :ry="8"
                  :height="item.value"
                  :style="`
                    fill: ${item.color}
                    z-index: ${recordingData.length - idx}
                  `"
              ></rect>
          </g>
        </svg>
    </div>
</template>
<script>
export default {
  props:{

  },
  data(){
      return {
        recordingData: [
            {value: 60, color: '#ffffff'},
            {value: 25, color: '#22cfe0'},
            {value: 15, color: '#fec02d'},
        ]
      }
  },
  methods:{

  }
}

</script>
<style lang="scss" scoped>

</style>
