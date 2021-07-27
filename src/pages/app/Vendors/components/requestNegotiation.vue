<template>
    <div class="negotiation-modal">
        <h3 class="color-vendor">Planner needs extra time</h3>
        <p v-if="!approved">You can extend the offer expiration by 2 days</p>
        <p v-else>You successfully extended the offer expiration by 2 days</p>
        <VendorBidTimeCounter
            :key="`${days}-${hours}-${mins}`"
            customClass="vendor bg-purple w-max-400 mx-auto mb-30 mt-30 py-10 px-10"
            :days="days"
            :hours="hours"
            :minutes="mins"
            :seconds="seconds"
            :content="!approved ? 'Until offer expires' : ''"
        />
    </div>
</template>
<script>

    import moment from "moment"
    import VendorBidTimeCounter from "@/components/VendorBidTimeCounter/VendorBidTimeCounter";

    export default {
        components: {
          VendorBidTimeCounter
        },
        props: {
          expiredTime: Number,
          approved: {
            type: Boolean,
            default: false,
          },
        },
        data() {
          return {
            days: 0,
            hours: 0,
            mins: 0,
            seconds: 0,
          }
        },
        mounted() {
            console.log('negotiationModal.mounted');
            const diff = moment.utc(moment(this.expiredTime).diff(new Date().getTime())).format("DD:HH:mm:ss");
            this.days = parseInt(diff.split(":")[0]);
            this.hours = parseInt(diff.split(":")[1]);
            this.mins = parseInt(diff.split(":")[2]);
            this.seconds = parseInt(diff.split(":")[3]);
        },
        methods: {
        },
        watch: {
        }
    }
</script>
<style lang="scss" scoped>

</style>
