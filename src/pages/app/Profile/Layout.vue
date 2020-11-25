<template>
    <div >
        <notifications></notifications>
        <header class="">
            <div class="">
                <slot name="header"></slot>
            </div>
        </header>

        <slot name="sidebar"></slot>

        <main>
            <slot name="main"></slot>
        </main>

        <div class="footer">
            <slot name="footer"></slot>
        </div>

        <zoom-center-transition :duration="200" mode="out-in">
            <router-view></router-view>
        </zoom-center-transition>
    </div>
</template>

<script>

import { ZoomCenterTransition } from "vue2-transitions";

export default {
  components:{
      ZoomCenterTransition,
  },
  data(){
    return {

    }
  },
  methods:{

  },
  mounted(){
    console.log("profile.mounted")
  },

}
</script>

