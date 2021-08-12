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
            <div class="d-flex flex-column w-max-600 mx-auto">
                <h3 class="font-size-30 font-bold-extra color-won">Vendor is booked!</h3>
                <p class="font-size-14">Your payment has been received and will be held in escrow until the event is completed successfully. Assuming there are no disputes, we will pay the vendor 7 days after the event.</p>
                <md-button class="md-simple md-black ml-auto">Change email address</md-button>
            </div>
        </div>
        <div class="d-flex flex-column align-center">
            <h5 class="font-size-20 font-bold-extra color-red">Can we offer you more vendors for your event?</h5>
            <p class="font-size-14">Let us help you find more vendors that are just right for your event</p>
            <md-button class="md-red maryoku-btn my-50" @click="$emit('show')">Show me more vendors</md-button>
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
