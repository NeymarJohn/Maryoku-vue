<template>
  <modal container-class="modal-container guest-signup bg-white w-max-1100">
    <template slot="header">
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="md-layout">
        <div class="md-layout-item md-size-65">
            <div class="w-max-450 mx-auto py-100">
                <h2 class="font-size-30 font-bold-extra my-40" >Continue as a Guest</h2>
                <MaryokuInput
                    inputStyle="username py-20"
                    v-model="name"
                    placeholder="Enter Your Name..."
                ></MaryokuInput>
                <div class="terms-and-conditions my-20">
                    <md-checkbox v-model="terms" class="mt-30">
                        <div>
                            I agree
                            <a
                                href="https://www.maryoku.com/terms"
                                target="_blank"
                                class="font-size-18 font-bold-extra color-black ml-5">Terms & Conditions</a>
                        </div></md-checkbox>
                </div>
                <md-button class="md-red md-maryoku px-40 mt-20">Continue</md-button>
            </div>

        </div>
        <div class="md-layout-item md-size-35 bg-light-pink">
            <div class="d-flex flex-column align-center py-100">
                <h2 class="font-size-30 font-bold-extra my-40">Member Login</h2>
                <md-button class="md-simple md-outlined md-red md-white-back mx-auto py-5 mt-10"
                           style="width: 250px;background-color: white!important;">Sign in</md-button>
                <div class="line d-flex text-center mt-30 mb-10 py-10">
                   <span class="px-15">Or</span>
                </div>
                <md-button class="md-simple md-red py-5" style="width: 250px">Sign Up</md-button>
                <p class="font-size-16">Create a new account, free of charge, to enjoy special offers & discounts!</p>
            </div>
        </div>
      </div>
    </template>
  </modal>
</template>
<script>
import { Modal } from "@/components";
import MaryokuInput from "@/components/Inputs/MaryokuInput.vue";
import EventComponent from "@/models/EventComponent";

export default {
  components: {
    Modal,
    MaryokuInput,
  },
  props: {
  },
  created() {
  },
  data() {
    return {
      name: null,
      terms: false,
    }
  },
  methods: {
    close() {
      this.$emit("cancel");
    },
    addMoreMoney() {},
  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>
div.line{
 &:before, &:after{
   display: inline-block;
   content: "";
   border-top: 1px solid #707070;
   width: 130px;
   margin-top: 25px;
   transform: translateY(-1rem);
 }
}
</style>
