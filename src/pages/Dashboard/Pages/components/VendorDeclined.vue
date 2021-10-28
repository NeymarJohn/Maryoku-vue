<template>
    <div class="position-relative">
        <md-button
            class="md-simple position-absolute"
            style="top: 20px;right:20px"
            @click="$emit('close')"
        >
            <md-icon>close</md-icon>
        </md-button>
        <div class="pt-40" style="background-color: #f3f7fd">
            <div class="d-flex flex-column align-center w-max-600 mx-auto pb-30">
                <img :src="`${$iconURL}Submit Proposal/Group 10412.svg`">
                <h3 class="font-size-30 font-bold-extra color-won">Vendor have been notified!</h3>

                <p class="font-size-14">We have let the vendor know that you have decided to explore other options. Click here to tell us why this vendor was not a good fit, so we can match you with better options.</p>
            </div>
        </div>
        <div class="d-flex flex-column align-center">
            <h5 class="font-size-20 font-bold-extra color-red">Find Another Vendor</h5>
            <p class="font-size-14">There are plenty more vendors on Maryoku, offering you great services at attractive rates.</p>
            <md-button class="md-red maryoku-btn my-50" @click="$emit('show')">Click here to view other vendor options</md-button>
        </div>
    </div>
</template>
<script>
import { Loader, Modal } from "@/components";

export default {
    components: {
        Loader,
        Modal
    },
    data(){
        return {
            showBookedVendorModal: true,
        }
    }
}
</script>
<style>
</style>
