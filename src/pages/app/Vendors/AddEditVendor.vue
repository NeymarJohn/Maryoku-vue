<template>
    <div class="vendor-editor">
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>
        <div style="position: fixed; width: 92%;">
            <div class="md-layout-item md-size-100 text-right">
                <md-button class="md-success text-right">Save</md-button>
            </div>
        </div>
        <div class="md-layout">
            <div class="md-layout-item md-size-10"></div>
            <div class="md-layout-item md-size-20">
                <md-card>
                    <md-card-content>
                        <md-field>
                            <label>Vendor Category</label>
                            <md-select v-model="vendor.vendorCategory" name="vendorCategory" id="vendorCategory" @md-selected="vendorCategoryChanged">
                                <md-option v-for="opt in categories" :key="opt.id" :id="opt.id" :value="opt.id">{{opt.value}}</md-option>
                            </md-select>
                        </md-field>
                    </md-card-content>
                </md-card>
            </div>
            <div class="md-layout-item md-size-20" v-if="false">
                <md-card>
                    <md-card-content style="background-color: #ddd;">
                        <md-field class="disabled" disabled="true">
                            <label>Sub Category</label>
                            <md-select v-model="vendor.vendorCategory" name="vendorSubCategory" id="vendorSubCategory" @md-selected="vendorSubCategoryChanged">
                                <md-option v-for="opt in categories" :key="opt.id" :id="opt.id" :value="opt.id">{{opt.value}}</md-option>
                            </md-select>
                        </md-field>
                    </md-card-content>
                </md-card>
            </div>
        </div>
        <div class="md-layout" v-for="(section, sIndex) in vendorPropertiesSections" :key="sIndex">
            <vue-element-loading :active="categoryPropertiesLoading" spinner="ring" color="#FF547C"/>
            <div class="md-layout-item md-size-10"></div>
            <div class="md-layout-item md-size-80">
                <h4 class="">{{section.title}}</h4>
                <md-card>
                    <md-card-content>
                        <div v-for="(item, index) in section.items" :key="index">
                            <template v-if="item.title">
                                <h6>{{item.title}}</h6>
                                <div v-for="(subItem, index) in item.items" :key="index">
                                    <vendor-property-field :item="subItem" :vendor="vendor"/>
                                </div>
                            </template>
                            <template v-else>
                                <vendor-property-field :item="item" :vendor="vendor"/>
                            </template>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
            <div class="md-layout-item md-size-10"></div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import VueElementLoading from 'vue-element-loading'
    import VendorPropertyField from './VendorPropertyField'
    import Vendors from '@/models/Vendors'

    //COMPONENTS
    import Icon from '@/components/Icon/Icon.vue'
    import VendorSimilarProposals from './components/VendorSimilarProposals.vue'
    import VendorFeedbacks from './components/VendorFeedbacks.vue'
    import VendorSimilarItem from './components/VendorSimilarItem.vue'
    import LightBox from 'vue-image-lightbox'
    import {
        SlideYDownTransition
    } from 'vue2-transitions'

    export default {
        components: {
            VueElementLoading,
            VendorPropertyField,
        },
        props: {
            vendor: {
                type: Object,
                default: () => {
                    return {
                        vendorCategory: null,
                        vendorPropertiesValues: {}
                    }
                }
            },
            creation_mode: false
        },
        data() {
            return {
                isLoading: true,
                categoryPropertiesLoading: false,
                categories: [],
                vendorPropertiesSections: {},
                selectedField: null
            }
        },
        created() {
            Vendors.find('categories').then(categories => {
                this.categories = categories
            }, (error) => {
                console.log(error)
            })
        },
        mounted() {
            this.isLoading = false
            this.$auth.currentUser(this, true, () => {
                if (!this.creation_mode && this.$route.params.id !== undefined) {
                    this.getVendor(this.$route.params.id);
                } else {
                    this.vendor.vendorCategory = 'venue'
                    this.vendorCategoryChanged(this.vendor.vendorCategory)
                }
            })
        },
        methods: {
            getVendor(vendorId) {
                Vendors.find(vendorId).then(vendor => {
                    this.vendor = vendor
                    this.vendorCategoryChanged(this.vendor.vendorCategory)
                    this.isLoading = false
                })
            },
            vendorCategoryChanged(val) {
                this.categoryPropertiesLoading = true
                Vendors.params({
                    category: val
                }).find('properties').then(vendorProperties => {
                    this.vendorPropertiesSections = vendorProperties
                    this.categoryPropertiesLoading = false
                }, (error) => {
                    console.log(error)
                    this.categoryPropertiesLoading = false
                })
            },
            async addVendor() {
                this.$validator.validateAll().then(res => {
                    if (res) {
                        let newVendor = new Vendors({})

                        newVendor.attach(this.vendor).then((res) => {
                            this.$emit('vendorCreated')
                            this.$emit('selectVendor', res.data.item)
                            this.$notify({
                                message: 'Vendor created successfully!',
                                horizontalAlign: 'center',
                                verticalAlign: 'top',
                                type: 'success'
                            })
                        })
                    } else {
                        this.$emit('on-validated', res)
                        return res
                    }
                })
            },
            async updateVendor() {
                let newVendor = await Vendors.find(this.vendor.id)

                newVendor.vendorDisplayName = this.vendor.vendorDisplayName
                newVendor.vendorAddressLine1 = this.vendor.vendorAddressLine1
                newVendor.vendorCategory = this.vendor.vendorCategory
                newVendor.rank = this.vendor.rank
                newVendor.avgScore = this.vendor.avgScore
                newVendor.vendorWebsite = this.vendor.vendorWebsite
                newVendor.vendorMainEmail = this.vendor.vendorMainEmail
                newVendor.vendorMainPhoneNumber = this.vendor.vendorMainPhoneNumber
                newVendor.vendorTagging = this.vendor.vendorTagging

                if (this.errors.items.length == 0) {
                    newVendor.save()

                    this.$notify({
                        message: 'Vendor Updated Successfully!',
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success'
                    })
                } else {
                    this.$notify({
                        message: this.errors.items[0].msg,
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'danger'
                    })
                }

                this.selectedField = null
            }
        },
        computed: {},
        filters: {},
        watch: {},
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/md/_variables.scss";
    @import "@/assets/scss/md/_colors.scss";

</style>
