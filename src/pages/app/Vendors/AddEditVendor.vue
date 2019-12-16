<template>
    <div class="vendor-editor">
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

        <div class="md-layout">
            <div class="md-layout-item md-size-20">
                <md-card>
                    <md-card-content>
                        <md-field>
                            <label>Vendor Category</label>
                            <md-select v-model="vendor.vendorCategory" name="movie" id="movie" @md-selected="vendorCategoryChanged">
                                <md-option v-for="opt in categories" :key="opt.id" :id="opt.id" :value="opt.id">{{opt.value}}</md-option>
                            </md-select>
                        </md-field>
                    </md-card-content>
                </md-card>
            </div>
            <div class="md-layout-item md-size-80 md-offset">
                <md-button class="md-success text-right">Save</md-button>
            </div>
        </div>

        <div class="md-layout">
            <vue-element-loading :active="categoryPropertiesLoading" spinner="ring" color="#FF547C"/>
            <div class="md-layout-item md-size-100" v-for="section in vendorPropertiesSections">
                <template v-if="section.title !== 'Images'">
                    <h4 class="">{{section.title}}</h4>
                    <md-card>
                        <md-card-content>
                            <div v-for="item in section.items">
                                <div v-if="item.type === 'string'">
                                    <md-field>
                                        <label>{{item.name}}</label>
                                        <md-input v-model="vendor.vendorPropertiesValues[item.id]" type="text" :required="item.mandatory"/>
                                    </md-field>
                                </div>
                                <div v-else-if="item.type === 'text'">
                                    <md-field>
                                        <label>{{item.name}}</label>
                                        <md-textarea v-model="vendor.vendorPropertiesValues[item.id]" autogrow :required="item.mandatory"/>
                                    </md-field>
                                </div>
                                <div v-else-if="item.type === 'boolean'">
                                    <md-checkbox v-model="vendor.vendorPropertiesValues[item.id]" :required="item.mandatory">
                                        {{item.name}}
                                    </md-checkbox>
                                </div>
                                <div v-else-if="item.type === 'integer'">
                                    <md-field>
                                        <label>{{item.name}}</label>
                                        <md-input v-model="vendor.vendorPropertiesValues[item.id]" type="number" :required="item.mandatory"/>
                                    </md-field>
                                </div>
                                <div v-else-if="item.type === 'float'">
                                    <md-field>
                                        <label>{{item.name}}</label>
                                        <md-input v-model="vendor.vendorPropertiesValues[item.id]" type="number" :required="item.mandatory"/>
                                    </md-field>
                                </div>
                                <div v-else-if="item.type === 'date'">
                                    <md-datepicker
                                        class="purple-field with-icon"
                                        v-model="vendor.vendorPropertiesValues[item.id]"
                                        md-immediately>
                                        <label>{{item.name}}</label>
                                    </md-datepicker>

                                </div>
                                <div v-else-if="item.type === 'image'">

                                </div>
                                <div v-else-if="item.type === 'image-array'">

                                </div>
                                <div v-else-if="item.type === 'geo-map'">

                                </div>
                                <div v-else-if="item.type === 'link'">
                                    <md-field>
                                        <label>{{item.name}}</label>
                                        <md-input v-model="vendor.vendorPropertiesValues[item.id]" type="text" :required="item.mandatory"/>
                                    </md-field>
                                </div>
                                <div v-else>
                                    <md-field>
                                        <label>{{item.name}}</label>
                                        <md-input v-model="vendor.vendorPropertiesValues[item.id]" type="text" :required="item.mandatory"/>
                                    </md-field>
                                </div>
                            </div>
                        </md-card-content>
                    </md-card>
                </template>
            </div>
        </div>

        <div class="md-layout">
            <div class="md-layout-item md-size-100 md-offset">
                <md-button class="md-success text-right">Save</md-button>
            </div>
        </div>

    </div>
</template>

<script>
    import moment from 'moment'
    import VueElementLoading from 'vue-element-loading'
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
            }
        },
        data () {
            return {
                isLoading: true,
                categoryPropertiesLoading: false,
                categories: [],
                vendorPropertiesSections: {},
            }
        },
        created () {
            Vendors.find('categories').then(categories => {
                this.categories = categories
            }, (error) => {
                console.log(error)
            })
        },
        mounted () {
            this.isLoading = false
            this.$auth.currentUser(this, true, () => {
                this.vendor.vendorCategory = 'venue';
                this.vendorCategoryChanged(this.vendor.vendorCategory);
            });
        },
        methods: {
            getVendor() {
                this.$auth.currentUser(this, true, function () {
                    Vendors.find(this.$route.params.id).then(vendor => {
                        this.vendor = vendor
                        this.isLoading = false
                    })
                }.bind(this))
            },
            vendorCategoryChanged(val) {
                this.categoryPropertiesLoading = true;
                Vendors.params({category: val}).find('properties').then(vendorProperties => {
                    this.vendorPropertiesSections = vendorProperties;
                    this.categoryPropertiesLoading = false;
                }, (error) => {
                    console.log(error);
                    this.categoryPropertiesLoading = false;
                })
            }
        },
        computed: {
        },
        filters: {
        },
        watch: {
        },
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/md/_variables.scss";
    @import "@/assets/scss/md/_colors.scss";

</style>
