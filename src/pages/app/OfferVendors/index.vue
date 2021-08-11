<template>
    <div>
        <loader :active="isLoading" />
        <template v-if="showOffers">
            <div class="d-flex justify-content-between pt-50 pl-100 pr-80">
                <div>
                    <div class="font-size-30 font-bold text-transform-capitalize">
                        Can we offer you more vendors for your event?
                    </div>
                    <p>Mark the services & specify if needed. Each category has more than one option so use the arrows to navigate</p>
                </div>

                <progress-radial-bar
                    :value="4"
                    :total="12"
                    @click="openCart"></progress-radial-bar>
            </div>
            <div class="md-layout md-gutter mt-60 width-66 mx-auto">
                <div
                    class="md-layout-item md-size-33 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
                    v-for="(serviceGroup, groupIndex) in serviceCards[0]"
                    :key="`serviceGroup-0-${groupIndex}`"
                >
                    <service-category-card
                        v-for="(service, serviceIndex) in serviceGroup"
                        class="mb-40"
                        :serviceCategory="service"
                        :key="service.name"
                        :isLong="(serviceIndex + groupIndex) % 2 === 1"
                        :musicPlayer="service.musicPlayer"
                        :defaultData="getDefaultTypes(service.serviceCategory, service.name)"

                    ></service-category-card>
                </div>
                <div
                    class="md-layout-item md-size-33 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
                    v-for="(serviceGroup, groupIndex) in serviceCards[1]"
                    :key="`serviceGroup-1-${groupIndex}`"
                >
                    <service-category-card
                        v-for="(service, serviceIndex) in serviceGroup"
                        class="mb-40"
                        :serviceCategory="service"
                        :key="service.name"
                        :isLong="(serviceIndex + groupIndex) % 2 === 1"
                        :musicPlayer="service.musicPlayer"
                        :defaultData="getDefaultTypes(service.serviceCategory, service.name)"

                    ></service-category-card>
                </div>
            </div>
            <div class="width-66 mx-auto">
                <div class="d-flex flex-column align-center mx-20" style="background-color: #f5f5f5">
                    <h5 class="font-size-20 font-bold-extra mb-0">Already Booked Vendors?</h5>
                    <p class="font-size-14">With Marioko you can easily plan and organize the event </p>
                    <md-button class="md-red my-20 w-max-350">Collaboration board</md-button>
                </div>
            </div>
            <div class="d-flex flex-column align-center mt-30 py-30" style="background-color: #f5f5f5">
                <div class="font-size-12">Powered By </div>
                <p class="d-flex align-center font-size-12">Who are we and why are we great?
                    <md-button class="ml-10 md-icon-button md-raised md-white arrow-right">
                        <md-icon style="color: #f51355">keyboard_arrow_right</md-icon></md-button>
                </p>
            </div>
        </template>

        <modal v-if="showBookedVendorModal" container-class="modal-container bg-white offer-vendors">
            <template slot="body">
                <vendor-booked
                    @show="showVendors" @close="showBookedVendorModal = false" />
            </template>
        </modal>
    </div>
</template>
<script>
import { Loader, Modal } from "@/components";
import VendorBooked from "./VendorBooked";
import ServiceCategoryCard from "../Events/PlanningBoard/components/ServiceCategoryCard";
import ProgressRadialBar from "../Events/PlanningBoard/components/ProgressRadialBar.vue";
import { serviceCategoryImages, serviceCards } from "@/constants/event.js";
import { camelize } from "@/utils/string.util";
import _ from "underscore";

export default {
    components: {
        Modal,
        Loader,
        VendorBooked,
        ProgressRadialBar,
        ServiceCategoryCard,
    },
    data(){
        return {
            isLoading: false,
            step: 1,
            showBookedVendorModal: true,
            showOffers: false,
            serviceCards: serviceCards,
            allRequirements: []
        }
    },
    methods: {
        async showVendors(){
            this.showBookedVendorModal = false;
            this.showOffers = true;
            this.isLoading = true;
            this.allRequirements =  await this.$store
                .dispatch("event/getRequirements");

            this.isLoadingStoredData = true;

            this.isLoading = false;
        },
        openCart() {

        },
        getDefaultTypes(category, name) {
            return _.property([category, "types", camelize(name)])(this.requirements);
        },
    },
    computed:{
        requirements(){
            return this.$store.state.planningBoard.requirements
        },
    },
    async mounted() {

    }

}
</script>
<style lang="scss" scoped>
.arrow-right{
    border-radius: 100%;
    width: 25px;
    height: 25px;
    min-width: 25px;
}
/deep/ .md-icon{color: #f51355}
</style>
