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
                    :value="Object.keys(requirements).length"
                    :total="Object.keys(allRequirements).length"
                    @click="openCart"></progress-radial-bar>
            </div>
            <div class="md-layout md-gutter mt-60 width-70 mx-auto">
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
                        :has-budget="true"
                        @showSpecific="getSpecification"
                        @update="setServiceStyles"
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
                        :has-budget="true"
                        @showSpecific="getSpecification"
                        @update="setServiceStyles"
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
            <div class="d-flex flex-column align-center bg-white p-20">
                <md-button class="md-red ml-auto mr-40">Find me vendors</md-button>
            </div>
        </template>

        <modal v-if="showBookedVendorModal" container-class="modal-container bg-white offer-vendors">
            <template slot="body">
                <vendor-booked
                    @show="showVendors" @close="showBookedVendorModal = false" />
            </template>
        </modal>
        <additional-request-modal
            class="lg"
            v-if="isOpenedAdditionalModal"
            :subCategory="subCategory"
            :selectedCategory="selectedCategory"
            :defaultData="getRequirements(selectedCategory.key) || {}"
            :selectedTypes="getSelectedTypes(selectedCategory.key)"
            @save="saveAdditionalRequest"
            @cancel="isOpenedAdditionalModal = false"
            @close="isOpenedAdditionalModal = false"
        ></additional-request-modal>
        <transition name="slide-fade">
            <requirements-cart
                v-if="showRequirementCart"
                :requirements="requirements"
                :service-categories="serviceCategories"
                :total="Object.keys(allRequirements).length"
                @close="showRequirementCart = false"></requirements-cart>
        </transition>
    </div>
</template>
<script>
import { Loader, Modal } from "@/components";
import VendorBooked from "./VendorBooked";
import ServiceCategoryCard from "../Events/PlanningBoard/components/ServiceCategoryCard";
import ProgressRadialBar from "../Events/PlanningBoard/components/ProgressRadialBar.vue";
import AdditionalRequestModal from "../Events/PlanningBoard/components/modals/AdditionalRequest.vue";
import RequirementsCart from "../Events/PlanningBoard/RequirementsCart.vue";
import { serviceCategoryImages, serviceCards } from "@/constants/event.js";
import { postReq, getReq } from "@/utils/token";
import { camelize } from "@/utils/string.util";
import _ from "underscore";

export default {
    components: {
        Modal,
        Loader,
        VendorBooked,
        RequirementsCart,
        ProgressRadialBar,
        ServiceCategoryCard,
        AdditionalRequestModal,
    },
    data(){
        return {
            isLoading: false,
            step: 1,
            showBookedVendorModal: true,
            isOpenedAdditionalModal: false,
            showRequirementCart: false,
            showOffers: false,
            serviceCards: serviceCards,
            allRequirements: [],
            subCategory: null,
            selectedCategory: null,
            requirements: {},
        }
    },
    methods: {
        async showVendors(){
            this.showBookedVendorModal = false;
            this.showOffers = true;
            this.isLoading = true;

            await this.getAllRequirements();

            this.isLoading = false;
        },
        async getAllRequirements(){
          let res = await getReq(`/1/vendor/property`);
          this.allRequirements = res.data;
          console.log('requirements', this.allRequirements, this.requirements);
        },
        openCart() {
            this.showRequirementCart = true;
        },
        getSelectedTypes(category) {
            let typesList = [];
            // this.requirements
            const types = this.requirements[category].types;
            for (const t in types) {
                typesList = [...typesList, ...types[t]];
            }
            return typesList;
        },
        getDefaultTypes(category, name) {
            return _.property([category, "types", camelize(name)])(this.requirements);
        },
        getRequirements(category) {
            if (!this.requirements[category]) return {};
            return this.requirements[category];
        },
        getSpecification({ category, services }){
          console.log('getSpecification');
            this.selectedCategory = this.serviceCategories.find(
                (item) => item.key === category.serviceCategory,
            );
            this.isOpenedAdditionalModal = true;
            console.log(category.serviceCategory);
            let requirements = this.allRequirements[category.serviceCategory].requirements;
            const storedRequirements = this.requirements[category.serviceCategory].mainRequirements;
            console.log(requirements);
            requirements = { ...requirements, ...storedRequirements };
            if (category.script) eval(category.script); //select relevant options using script
            console.log(requirements);
            for (let subCategory of Object.keys(requirements)) {
                requirements[subCategory].forEach((item) => {
                    try {
                        if (item.conditionScript) item.visible = eval(item.conditionScript);
                        else item.visible = true;
                    } catch (e) {}
                });
            }
            this.subCategory = requirements;
        },
        setServiceStyles({category, services, type}){
            console.log('setServiceStyles', services, this.requirements.hasOwnProperty(category.serviceCategory), this.requirements[category.serviceCategory]);
            if(!this.requirements.hasOwnProperty(category.serviceCategory) || !this.requirements[category.serviceCategory]) {
                this.$set(this.requirements, category.serviceCategory, {types: {[type]: services}});
            } else {
                this.$set(this.requirements, category.serviceCategory, {types: {[type]: services}});
            }
            console.log('requirements', this.requirements);
        },
        saveAdditionalRequest({ category, requirements }) {
            console.log('save', requirements);
            this.isOpenedAdditionalModal = false;
            this.$set(this.requirements, category, {...this.requirements[category], ...requirements})
            console.log('save', this.requirements);
        },
    },
    computed:{
        serviceCategories(){
            return this.$store.state.common.serviceCategories;
        }
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
