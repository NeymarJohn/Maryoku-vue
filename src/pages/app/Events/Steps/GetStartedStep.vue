<template>
    <div class="md-layout">
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
        <div class="md-layout-item">
            <h2 class="margin-bottom-md">Let's start with big things</h2>
            <label class="bold">First things first, this party needs:</label>
            <div class="md-error" v-if="cerrors.selectedCategories">
                {{ cerrors.selectedCategories[0] }}
            </div>
            <div class="list-container">
                <div v-for="category in categories" :key="category.id"
                @click="toggleSelectCategory(category)"
                class="list-item"
                :class="{'active': isCategorySelected(category) || isSelected(category)}">
                    <div class="list-item--icon">
                        <md-icon v-if="isCategorySelected(category) || isSelected(category)">check</md-icon>
                        <md-icon v-else>arrow_forward</md-icon>
                    </div>
                    <div class="list-item--title">
                        {{ category.title }}
                    </div>
                </div>
            </div>
            <label class="bold">
                Select more elements <md-icon>keyboard_arrow_right</md-icon>
            </label>
            <div class="list-container">
                <div v-for="subCategory in subCategories"
                @click="toggleSelectSubCategory(subCategory)"
                :key="subCategory.id" class="list-item"
                :class="{'active': isSubCategorySelected(subCategory) || isSelected(subCategory) }">
                    <div class="list-item--icon">
                        <md-icon v-if="isSubCategorySelected(subCategory) || isSelected(subCategory)">check</md-icon>
                        <md-icon v-else>arrow_forward</md-icon>
                    </div>
                    <div class="list-item--title">
                        {{ subCategory.title }}
                    </div>
                </div>
            </div>
            <div>
                <md-field class="margin-bottom-xxl">
                    <label>Add a short paragraph about the event.</label><br/>
                    <md-textarea v-model="brief" placeholder="Is there a dress code? Who is participating? What's the occasion?"></md-textarea>
                </md-field>
            </div>
            <div class="text-right margin-bottom-xxl">
                <md-button @click.prevent="validateAndSubmit" class="md-button md-primary">Brief Details</md-button>
            </div>
        </div>
    </div>
</template>
<script>
    import EventComponent from '@/models/EventComponent'
    import CalendarEvent from '@/models/CalendarEvent';
    import Calendar from "@/models/Calendar";
    import VueElementLoading from 'vue-element-loading'

    export default {
        name: "get-started-step",
        components: {
            VueElementLoading
        },
        methods: {
            isSelected (category) {
                return _.findIndex(this.eventComponents, o => o.componentId == category.id) > -1;
            },
            isCategorySelected (category) {
                return _.findIndex(this.selectedCategories, o => o.id == category.id) > -1;
            },

            isSubCategorySelected (subCategory) {
                return _.findIndex(this.selectedSubCategories, o => o.id == subCategory.id) > -1;
            },

            toggleSelectSubCategory (subCategory) {
                if (this.isSubCategorySelected(subCategory)) {
                    this.selectedSubCategories = this.selectedSubCategories.filter(o => o.id != subCategory.id);
                } else {
                    this.selectedSubCategories = this.selectedSubCategories.concat([subCategory]);
                }

            },

            toggleSelectCategory (category) {
                if (this.isCategorySelected(category)) {
                    this.selectedCategories = this.selectedCategories.filter(o => o.id != category.id);
                    //this.subCategories = this.subCategories.filter(o => o.categoryId != category.id);
                    //this.selectedSubCategories = this.selectedSubCategories.filter(o => o.categoryId != category.id);
                } else {
                    this.selectedCategories = this.selectedCategories.concat([category]);
                   // this.subCategories = this.subCategories.concat(category.childComponents);
                }
            },

            validateAndSubmit () {

                // this.$emit('goToNextPage');
                //  return;
                this.cerrors = {};

                if (!this.selectedCategories.length && !this.selectedSubCategories.length && this.eventComponents.length ) {
                    this.$emit('goToNextPage');
                    return;
                }

                if (!this.selectedCategories.length && !this.selectedSubCategories.length) {
                    this.cerrors.selectedCategories = ['you must select at least one category'];
                    return;
                }

                this.isLoading = true;
                let promisses = [];


                let new_block = {
                    componentId: null,
                    componentCategoryId: null,
                    todos: "",
                    values: "",
                    vendors: "",
                    calendarEvent: {id: this.event.id}
                }

                this.event.brief = this.brief;
                promisses.push(this.event.save());

                this.selectedCategories.forEach(category => {
                    new_block.componentCategoryId = category.id;
                    new_block.componentId = category.id;

                    promisses.push(new EventComponent(new_block).for(this.calendar, this.event).save());
                })

                this.selectedSubCategories.forEach(category => {
                    new_block.componentCategoryId = category.id;
                    new_block.componentId = category.id;

                    promisses.push(new EventComponent(new_block).for(this.calendar, this.event).save());
                })


                Promise.all(promisses).then(() => {
                    this.isLoading = false;
                    this.$emit('goToNextPage');
                })
                .catch((e) => {
                    console.log('error -->', e);
                    this.isLoading = false;
                });

            },
        },
        data () {
            return {
                isLoading: true,
                brief: null,
                event: null,
                calendar: null,
                cerrors: {},
                categories: [],
                subCategories: [],
                selectedCategories: [],
                selectedSubCategories: [],
                eventComponents : []
            }
        },
         mounted () {
            this.isLoading = true;
            let vm = this;

             vm.$auth.currentUser(vm, true, ()=> {

                Promise.all([
                    CalendarEvent.find(vm.$route.params.id),
                    EventComponent.get()
                ]).then(([event, components]) => {
                    vm.calendar = new Calendar({id: vm.$auth.user.defaultCalendarId});
                    vm.event = event.for(vm.calendar);
                    vm.categories =_.filter(components ,  function(item) { return item.promoted === true});
                    vm.subCategories =_.filter(components ,  function(item) { return item.promoted === false});

                    console.log('categories ', vm.categories);
                    console.log('categories ', vm.subCategories);


                    new EventComponent().for(vm.calendar, vm.event).get().then(resp =>{
                        console.log('components ', resp);
                        //vm.selectedCategories = resp;
                        vm.$set(vm,'eventComponents',resp);

                    })
                    vm.isLoading = false;
                });
            });


        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/md/_variables.scss";

    // .textarea-262 {
    //     width: 50%;
    //     // border: 1px solid $input-border;
    //     background: none;
    //     border-radius: 4px;
    //     height: 100px;
    //     padding: 15px;
    // }

    .list-container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
        margin-bottom: 20px;

        .list-item {
            display: flex;
            padding: 15px;
            margin-right: 15px;
            margin-bottom: 15px;
            background: white;
            border-radius: 4px;
            min-width: 180px;
            cursor: pointer;

            &.active {
                .list-item--icon {
                    background: $brand-primary;
                    border-color: $brand-primary;
                    .md-icon-font {
                        color: white;
                        content: "check";
                    }
                }
            }
        }

        .list-item--title {
            font-size: 20px;
            margin-top: 5px;
        }

        .list-item--icon {
            width: 35px;
            height: 35px;
            border: 1px solid $input-border;
            border-radius: 50%;
            text-align: center;
            margin-right: 10px;
            padding-top: 3px;
        }
    }
</style>
