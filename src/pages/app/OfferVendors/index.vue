<template>
    <div class="offervendors-layout">
        <loader :active="isLoading" is-full-screen page="vendor"/>
        <template v-if="showOffers">
            <div class="d-flex justify-content-between pt-50 pl-100 pr-80">
                <div>
                    <ResizableToggleButton
                        class="mr-20 mb-10"
                        :key="component.key"
                        :label="component ? component.fullTitle : ''"
                        :icon="`${$iconURL}Budget+Elements/${component ? component.icon : ''}`"
                        :selectedIcon="`${$iconURL}Budget+Elements/${component.key}-white.svg`"
                        :defaultStatus="selectedCategory && component.key === selectedCategory.key"
                        :hasBadge="hasBadge(component.key)"
                        iconStyle="opacity:0.8"
                        v-for="component in categories"
                        @click="selectCategory(component)"
                    ></ResizableToggleButton>
                    <button class="add-category-button mb-10" @click="addRequirements"><md-icon>add</md-icon></button>
                </div>

                <ProgressRadialBar
                    :value="Object.keys(requirements).length"
                    :total="allRequirements.length"
                    @click="showRequirementCart = true"></ProgressRadialBar>
            </div>
            <div class="pl-100 pr-80 booking-proposals">
                <template v-if="selectedCategory">
                    <div class="font-size-30 font-bold-extra category-title mt-30 mb-30" v-if="selectedCategory">
                        <md-tooltip class="custom-tooltip-2" md-direction="top">Here’s where you can set your expectations and requirements for your event</md-tooltip>
                        <img :src="`${$iconURL}Budget+Elements/${selectedCategory.icon}`" />
                        {{ selectedCategory.fullTitle }}
                        <template v-if="!booked && (!(getDefaultTypes(selectedCategory.key, selectedCategory.title) || []).length)">
                            <template v-if="hasBudget(selectedCategory.key)">
                                <a class="font-size-18 md-red maryoku-btn" @click="getSpecification({ category: selectedCategory, services: getDefaultTypes(selectedCategory.key, selectedCategory.title) })">
                                    Get Specific
                                </a>
                            </template>
                            <template v-else>
                                <a class="font-size-18 md-red maryoku-btn" @click="showAddBudgetConfirm = true"> Add To Budget </a>
                            </template>
                        </template>
                        <template v-else>
                            <div class="d-flex align-center justify-content-center">
                                <div v-if="booked" class="color-red">
                                    Already booked
                                </div>
                                <a class="font-size-18 md-red maryoku-btn" @click="getSpecification({ category: selectedCategory, services: getDefaultTypes(selectedCategory.key, selectedCategory.title) })">
                                    Change specifications
                                </a>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
            <template v-for="(service, serviceIndex) in serviceCards[0]">
                <template v-if="selectedCategory && selectedCategory.key == service.serviceCategory">
                        <div :key="`serviceGroup-${serviceIndex}` ">
                            <div class="pl-100 pr-80 booking-proposals">
                                <template v-if="selectedCategory">
                                    <div class="category-title mt-30 mb-30 d-flex flex-column" v-if="selectedCategory">
                                        <div class="font-size-30 font-bold-extra text-transform-uppercase">
                                            <div style="float: left;">
                                                {{ service.seqNo }}
                                                &nbsp;&nbsp;
                                                {{ service.name }}
                                            </div>
                                        </div>
                                        <div class="font-size-10 ">
                                            <p>
                                                {{ "What suits your event best? Help vendors understand your needs by selecting your favorites and adding more details if needed." }}
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div class="md-layout md-gutter mt-60 pl-100 pr-80 d-flex flex-row align-center" >
                                <template v-if="service.musicPlayer">
                                    <template v-for="(clip, clipindx) in service.clips">
                                    <ServiceCategoryCard
                                            class="mb-0 mr-0 ml-0"
                                            :clip="clip"
                                            :index="clipindx"
                                            :serviceCategory="service"
                                            :key="service.name+clipindx"
                                            :isLong="(serviceIndex + clipindx) % 2 === 1"
                                            :has-budget="true"
                                            :musicPlayer="service.musicPlayer"
                                            :defaultData="getDefaultTypes(service.serviceCategory, service.name)"
                                            :booked="service.serviceCategory === proposal.vendor.vendorCategory"
                                            @showSpecific="getSpecification"
                                            @update="setServiceStyles"
                                        ></ServiceCategoryCard>
                                    </template>
                                </template>
                                <template v-else>
                                    <template v-for="(image, indx) in service.images">
                                        <ServiceCategoryCard
                                            class="mb-0 mr-0 ml-0"
                                            :image="image"
                                            :index="indx"
                                            :serviceCategory="service"
                                            :key="service.name+indx"
                                            :isLong="(serviceIndex + indx) % 2 === 1"
                                            :has-budget="true"
                                            :musicPlayer="service.musicPlayer"
                                            :defaultData="getDefaultTypes(service.serviceCategory, service.name)"
                                            :booked="service.serviceCategory === proposal.vendor.vendorCategory"
                                            @showSpecific="getSpecification"
                                            @update="setServiceStyles"
                                        ></ServiceCategoryCard>
                                    </template>
                                </template>
                            </div>
                        </div>
                </template>
            </template>
            <div class="width-66 mx-auto">
                <div class="d-flex flex-column align-center mx-20" style="background-color: #f5f5f5">
                    <h5 class="font-size-20 font-bold-extra mb-0">Already Booked Vendors?</h5>
                    <p class="font-size-14">With Maryoku you can easily plan and organize the event </p>
                    <md-button class="md-gray my-20 w-max-350" disabled>Collaboration board</md-button>
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
                <md-button class="md-red ml-auto mr-40" @click="findVendors">Find me vendors</md-button>
            </div>
        </template>

        <AdditionalRequestModal
            class="lg"
            v-if="isOpenedAdditionalModal"
            :subCategory="subCategory"
            :selectedCategory="selectedCategory"
            :defaultData="getRequirements(selectedCategory.key) || {}"
            :selectedTypes="getSelectedTypes(selectedCategory.key)"
            :proposal="proposal"
            page="customer"
            @save="saveAdditionalRequest"
            @cancel="isOpenedAdditionalModal = false"
            @close="isOpenedAdditionalModal = false"
        ></AdditionalRequestModal>
        <special-requirement-modal
            v-if="isOpenedFinalModal"
            :defaultData="specialRequirements"
            @cancel="isOpenedFinalModal = false"
            @save="saveSpecialRequirements"
        >
        </special-requirement-modal>
        <modal v-if="showSignupModal" container-class="modal-container offer-vendors bg-white w-max-450">
            <template slot="body">
                <sign-in-content
                    :page="page"
                    @signIn="signIn"
                    @signUp="signUp"
                    @changePage="changePage"
                    @authenticate="authenticate"
                >
                </sign-in-content>
            </template>
        </modal>
        <transition name="slide-fade">
            <requirements-cart
                v-if="showRequirementCart"
                :requirements="requirements"
                :service-categories="serviceCategories"
                :total="Object.keys(allRequirements).length"
                @close="showRequirementCart = false"></requirements-cart>
        </transition>
        <AddBudgetModal
        v-if="showAddNewCategory"
        :serviceCategory="selectedCategory"
        @cancel="showAddNewCategory = false"
        @save="saveBudget"
        ></AddBudgetModal>
        <AddBudgetConfirmModal
        v-if="showAddBudgetConfirm"
        :serviceCategory="selectedCategory"
        @cancel="showAddBudgetConfirm = false"
        @addNewBudget="addBudget"
        ></AddBudgetConfirmModal>
    </div>
</template>
<script>

import CalendarEvent from "@/models/CalendarEvent";
import Proposal from "@/models/Proposal";
import { ServiceCards } from "@/constants/event.js";
import { postReq, getReq } from "@/utils/token";
import { camelize } from "@/utils/string.util";
import _ from "underscore";
import moment from "moment";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

const components = {
    Loader: () => import("@/components/loader/Loader.vue"),
    Modal: () => import("@/components/Modal.vue"),
    SignInContent: () => import('@/components/SignInContent/index.vue'),
    ServiceCategoryCard: () => import('@/pages/app/Events/PlanningBoard/components/ServiceCategoryCard.vue'),
    ProgressRadialBar: () => import('@/pages/app/Events/PlanningBoard/components/ProgressRadialBar.vue'),
    AdditionalRequestModal: () => import('@/pages/app/Events/PlanningBoard/components/modals/AdditionalRequest.vue'),
    RequirementsCart: () => import('@/pages/app/Events/PlanningBoard/RequirementsCart.vue'),

    ResizableToggleButton: () => import("@/components/Button/ResizableToggleButton.vue"),
    AddBudgetModal: () => import("@/pages/app/Events/PlanningBoard/components/modals/AddBudget.vue"),
    AddBudgetConfirmModal: () => import("@/pages/app/Events/PlanningBoard/components/modals/AddBudgetConfirm.vue"),
    SpecialRequirementModal: () => import("./components/modals/SpecialRequirement.vue"),
}

export default {
    components,
    data(){
        return {
            isLoading: true,
            step: 1,
            page: 'signup',
            showSignupModal: false,
            isOpenedAdditionalModal: false,
            isOpenedFinalModal: false,
            showRequirementCart: false,
            showOffers: false,
            serviceCards: ServiceCards,
            allRequirements: [],
            subCategory: null,
            selectedCategory: null,
            vendorEvent : null,
            proposal: null,

            expiredTime: 0,
            proposalsByCategory: {},
            showAddNewCategory: false,
            showAddBudgetConfirm: false,
            booked: false,
            requirements:{}
        }
    },
    methods: {
        ...mapMutations("event", [ "setProposalsByCategory"]),
        ...mapMutations("planningBoard", ["setSpecialRequirements"]),
        ...mapMutations('modal', ['setOpen', 'setProposal']),
        async handleRate(score){
            await this.saveProposal({...this.proposal, score})
        },
        async saveProposal(proposal){
            let query = new Proposal(proposal);
            let res = await query.save();
            this.proposal = res;
        },
        async getAllRequirements(){
            let res = await getReq(`/1/vendor/property`);
            this.allRequirements = res.data;
            localStorage.setItem('all_requirements', JSON.stringify(this.allRequirements));
        },
        async getProposal(){
            let res = await getReq(`/1/proposals/${this.$route.params.proposalId}`);
            this.proposal = res.data;
            localStorage.setItem('proposal', JSON.stringify(this.proposal));
        },
        async createEvent(){

            await this.$store.dispatch("event/saveEventAction", new CalendarEvent({
                eventStartMillis: this.proposal.eventData.startTime * 1000,
                eventEndMillis: this.proposal.eventData.endTime * 1000,
                status: 'draft',
                numberOfParticipants: this.proposal.eventData.numberOfParticipants,
                flexibleWithDates: 0,
                guestType: {
                    name: "Employees",
                    selected: false,
                    value: "employees",
                },
                location: this.proposal.eventData.location,
                eventType: this.proposal.eventData.eventType,
                places: ['OUTDOORS'],
            }));
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
            let getSelectedCategory = this.serviceCategories.find(
                item => item.key === category.key,
            );
            this.selectedCategory = {...this.selectedCategory, ...getSelectedCategory};
            this.isOpenedAdditionalModal = true;
            console.log(category.key);
            let requirements = this.allRequirements[category.key].requirements;
            const storedRequirements = this.requirements[category.key].mainRequirements;
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
            let requirement = this.requirements[category.serviceCategory];
            if(!requirement) {
                requirement = {event: {id: this.event.id}, category: category.serviceCategory, types: { [type]: services }}
            } else {
                requirement = {...requirement, types: { [type]: services }};
            }
            this.saveRequirements(requirement)
        },
        saveAdditionalRequest({ category, requirements }) {
            this.isOpenedAdditionalModal = false;
            this.saveRequirements({...this.requirements[category], ...requirements})
        },
        async saveRequirements(requirement){
            this.$set(this.requirements, requirement.category, requirement)
            localStorage.setItem('requirements', JSON.stringify(this.requirements));
        },
        async signIn({email, password}){
            console.log('signIn', email, password)
            await this.$store.dispatch("auth/login", {
                email,
                password,
            })
            this.showSignupModal =  false;

            this.isLoading = true;
            await this.save();
            this.goToAccountPage();
            this.isLoading = false;
        },
        async signUp({email, password, name, company}){
            console.log('signUp', email, password, name, company)
            await this.$store.dispatch("auth/register", {
                email: email,
                password,
                name,
                company,
                currentUserType: 'guest',
                role: 'administrator',
            });
            await this.$store.dispatch('auth/login', {email, password});

            this.showSignupModal =  false;

            this.isLoading = true;
            await this.save();
            this.goToAccountPage();
            this.isLoading = false;
        },

        findVendors() {
            if ( this.loggedInUser ) {
                this.isOpenedFinalModal = true;
            }
            else {
                this.showSignupModal = true;
            }
        },
        async save(){
            if(!this.event.id){
                await this.createEvent();
            }

            this.expiredTime = moment(new Date()).add(3, "days").valueOf();
            let res = await postReq(`/1/events/${this.event.id}/offer-vendors/find-vendors`, {
                issuedTime: new Date().getTime(),
                expiredBusinessTime: this.expiredTime,
                requirements: this.requirements,
            });
            await this.$store.dispatch(
                "event/saveEventAction",
                new CalendarEvent({ id: this.event.id, processingStatus: "accept-proposal" }),
            );

            // removed cached data in localstorage
            localStorage.removeItem('requirements');
            localStorage.removeItem('proposal');
        },
        goToAccountPage(){
            this.$router.push(`/user-events/${this.event.id}/booking/choose-vendor`);
        },
        changePage(){
            this.page = this.page === 'signin' ? 'signup' : 'signin';
        },
        authenticate(provider){
            let tenantId = this.$authService.resolveTenantId();
            let redirectURL = `/vendor/offer/${this.proposal.id}`
            let callback = btoa(
                `${document.location.protocol}//${document.location.hostname}:${document.location.port}/#/signedIn?redirectURL=${redirectURL}&action=${this.$queryEventActions.guest}&userType=guest&token=`,
            );
            console.log(`${process.env.SERVER_URL}/oauth/authenticate/${provider}?tenantId=${tenantId}&callback=${callback}`);
            document.location.href = `${process.env.SERVER_URL}/oauth/authenticate/${provider}?tenantId=${tenantId}&callback=${callback}`;
        },

        hasBadge(componentComponentId) {
            if (!this.proposalsByCategory[componentComponentId]) return false;
            if (this.proposalsByCategory[componentComponentId].length === 0) return false;
            const notViewedProposals = this.proposalsByCategory[componentComponentId].filter((item) => !item.viewed);
            if (notViewedProposals.length === 0) return false;
            console.log(notViewedProposals);
            return true;
        },
        addRequirements() {
        },
        selectCategory(category, clicked) {
            this.selectedCategory = category;
            let proposals = this.$store.state.event.proposals;
            if (proposals[category.key]) {
                proposals[category.key].forEach((proposal, index) => {
                new Proposal({ id: proposal.id, viewed: true }).save().then((res) => {
                    this.$set(proposal, "viewed", true);
                });
                });
            }
        },
        saveSpecialRequirements(data) {
            this.isOpenedFinalModal = false;
            this.setSpecialRequirements(data);
            this.expiredTime = moment(new Date())
                .add(3, "days")
                .valueOf();

            const requestRequirement = {
                issuedTime: new Date().getTime(),
                expiredBusinessTime: this.expiredTime,
            };
            postReq(`/1/events/${this.event.id}/find-vendors`, {
                issuedTime: new Date().getTime(),
                expiredBusinessTime: this.expiredTime,
            }).then(res => {
                this.$router.push(`/events/${this.event.id}/booking/choose-vendor`);
                this.$store.dispatch(
                "event/saveEventAction",
                new CalendarEvent({ id: this.event.id, processingStatus: "accept-proposal" }),
                );
            });
        },
        hasBudget(categoryKey) {
            return this.event.components && !!this.event.components.find(item => item.componentId == categoryKey);
        },
        addBudget() {
            this.showAddBudgetConfirm = false;
            this.showAddNewCategory = true;
        },
        saveBudget() {
            this.showAddNewCategory = false;
        },

    },
    computed:{
        loggedInUser(){
            return this.$store.state.auth.user;
        },
        event() {
            return this.$store.state.event.eventData;
        },
        serviceCategories(){
            return this.$store.state.common.serviceCategories;
        },
        eventRequirements() {
            return this.$store.state.event.requirements;
        },

        categories() {
            const categories = this.serviceCategories;
            if(categories){
                categories.sort((a, b) => a.order - b.order);
            }

            if(categories && this.selectedCategory == null){
                this.selectCategory(categories[0]);
            }
            return categories;
        },
        specialRequirements() {
            return this.$store.state.planningBoard.specialRequirements;
        },
    },
    async created() {
        let redirect = this.$route.query.redirect
        await this.$store.dispatch("planningBoard/resetRequirements");
        if (this.loggedInUser) {
            await this.$store.dispatch("auth/checkToken", this.loggedInUser.access_token);

            this.allRequirements = JSON.parse(localStorage.getItem('all_requirements'));
            if (!this.allRequirements || !this.allRequirements.length) {
                await this.getAllRequirements()
            }

            this.requirements = JSON.parse(localStorage.getItem('requirements')) || {};

            await this.getProposal();
            if (redirect) {
                await this.save();
                this.goToAccountPage();
            }

            this.isLoading = false;

            // this.$store.dispatch("event/getEventById", this.$route.params.proposalId);
            await this.$store.dispatch("event/getRequirements", this.$route.params.proposalId);

        } else {
            this.showBookedVendorModal = true;

            if (!this.allRequirements || !this.allRequirements.length) {
                await this.getAllRequirements()
            }
            await this.getProposal();
            this.isLoading = false;

            // this.$store.dispatch("event/getEventById", this.$route.params.proposalId);
            await this.$store.dispatch("event/getRequirements", this.$route.params.proposalId);

        }
        this.showOffers = true;
        this.setProposal(this.proposal);
        this.setOpen('BOOKED');
    },

}
</script>
<style lang="scss" scoped>
.offervendors-layout{
    .booking-proposals {
        .category-title {
            img {
            width: 30px;
            }
        }
    }
    .add-category-button {
        border: none;
        width: 60px;
        height: 60px;
        display: inline-block;
        border-radius: 50%;
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        background-color: #ffffff;
        cursor: pointer;
        i {
            font-size: 40px !important;
        }
    }
    .md-dialog.singin-form {
        border-radius: 10px;
        padding: 2em 40px;
        z-index: 9999999;
        height: auto;
    }
    .arrow-right{
        border-radius: 100%;
        width: 25px;
        height: 25px;
        min-width: 25px;
    }
    /deep/ .md-icon{color: #f51355}
}

</style>
