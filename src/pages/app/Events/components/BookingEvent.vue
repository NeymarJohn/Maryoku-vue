<template>
    <div class="md-layout booking-section">

        <side-bar :event="event">

        </side-bar>

        <progress-sidebar></progress-sidebar>

        <div class="event-page-header md-layout-item md-size-100">
            <div class="header-title">
                <h3>Hi Rachel</h3>
                <p>
                    We found the top 3 proposals for your event,
                    Book now before it’s too late
                </p>
            </div>
            <div class="header-actions">
                <ul>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 9.svg`"></a></li>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 5.svg`"></a></li>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 8.svg`"></a></li>
                </ul>
            </div>
        </div>

        <div class="booking-header d-flex justify-content-between md-layout-item md-size-100">
            <div class="header-title">
                <h4><img :src="`${newTimeLineIconsURL}timeline-title.svg`"> Book Venue</h4>
            </div>
            <div class="header-actions">
                <md-button class="md-default md-simple">Compare Proposals <md-icon>keyboard_arrow_right</md-icon></md-button>
            </div>
        </div>



        <!-- Event Booking Items -->
        <div class="md-layout events-booking-items">

            <div class="md-layout-item md-size-33">
                <div class="booking-item ">
                    <div class="event-image" style="background: url(https://bit.ly/2Q77CBI) center center no-repeat">

                    </div>
                    <div class="price"> <span class="price-value">$2,000</span> <small>For 3 hours</small> </div>
                    <h4 class="event-title">Trump National Golf Club Philadelphia</h4>
                    <div class="probability">Probability 92%</div>
                    <ul class="event-info">
                        <li class="event-info__item">575 Mission St.</li>
                        <li class="event-info__item">San Francisco, CA 94105</li>
                    </ul>
                    <p class="event-desc">
                        Trump National Golf Club is a wedding venue
                        located in Pine Hill, New Jersey. This classic
                        country club venue is a beautiful, exclusive
                        location located atop…
                    </p>

                    <div class="item-actions text-right">
                        <md-button class="md-rose details-btn"> Details & Booking</md-button>
                    </div>
                </div>
            </div>


            <div class="md-layout-item md-size-33">
                <div class="booking-item ">
                    <div class="event-image" style="background: url(https://bit.ly/2Q77CBI) center center no-repeat">
                        <ul class="event-labels">
                            <div class="label-item rose-label">Venue + Catering Proposal </div>
                        </ul>
                    </div>
                    <div class="price"> <span class="price-value">$2,000</span> <small>For 3 hours</small> </div>
                    <h4 class="event-title">Relish caterers & venues</h4>
                    <div class="probability">Probability 92%</div>
                    <ul class="event-info">
                        <li class="event-info__item">575 Mission St.</li>
                        <li class="event-info__item">San Francisco, CA 94105</li>
                    </ul>
                    <p class="event-desc">
                        Trump National Golf Club is a wedding venue
                        located in Pine Hill, New Jersey. This classic
                        country club venue is a beautiful, exclusive
                        location located atop…
                    </p>

                    <div class="item-actions text-right">
                        <md-button class="md-rose details-btn"> Details & Booking</md-button>
                    </div>
                </div>
            </div>


            <div class="md-layout-item md-size-33">
                <div class="booking-item ">
                    <div class="event-image" style="background: url(https://bit.ly/2Q77CBI) center center no-repeat">
                        <ul class="event-labels">
                            <div class="label-item special-offer">Special Offer </div>
                            <div class="label-item">Venue + Catering + DJ </div>
                        </ul>
                    </div>
                    <div class="price"> <span class="price-value">$2,000</span> <small>For 3 hours</small> </div>
                    <h4 class="event-title">Trump National Golf Club Philadelphia</h4>
                    <div class="probability">Probability 92%</div>
                    <ul class="event-info">
                        <li class="event-info__item">575 Mission St.</li>
                        <li class="event-info__item">San Francisco, CA 94105</li>
                    </ul>
                    <p class="event-desc">
                        Trump National Golf Club is a wedding venue
                        located in Pine Hill, New Jersey. This classic
                        country club venue is a beautiful, exclusive
                        location located atop…
                    </p>

                    <div class="item-actions text-right">
                        <md-button class="md-rose details-btn"> Details & Booking</md-button>
                    </div>
                </div>
            </div>

        </div>
        <!-- ./Event Booking Items -->

        <div class="booking-section__actions">
            <md-button class="md-default ">I want something different</md-button>
            <md-button class="md-default ">I already have a venue for my event</md-button>
        </div>




    </div>

</template>
<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    import Calendar from '@/models/Calendar'
    import CalendarEvent from '@/models/CalendarEvent'
    import EventComponent from '@/models/EventComponent'
    import EventTimelineItem from '@/models/EventTimelineItem'
    import moment from 'moment'
    import swal from 'sweetalert2'
    import {SlideYDownTransition} from 'vue2-transitions'
    import InputMask from 'vue-input-mask'

    import VueElementLoading from 'vue-element-loading'
    // import auth from '@/auth';
    import EventBlocks from '../components/NewEventBlocks'
    import draggable from 'vuedraggable'
    import {Drag, Drop} from 'vue-drag-drop'
    import _ from 'underscore'

    import SideBar from '../../../../components/SidebarPlugin/NewSideBar';
    import SidebarItem from '../../../../components/SidebarPlugin/NewSidebarItem.vue';
    import ProgressSidebar from './progressSidebar';

    export default {
        name: 'event-time-line',
        components: {
            VueElementLoading,
            EventBlocks,
            draggable, Drag, Drop,
            SlideYDownTransition,
            InputMask,
            SideBar,
            SidebarItem,
            ProgressSidebar
        },
        props: {
            // event: Object,
            // eventComponents: [Array, Function]

        },
        data: () => ({
            // auth: auth,
            isLoading: true,
            blocksList: [
                {
                    id: 1,
                    buildingBlockType: 'setup',
                    icon: 'Setup',
                    color: '#3a3838'
                },
                {
                    id: 2,
                    buildingBlockType: 'activity',
                    icon: 'Activity',
                    color: '#20c997'
                },
                {
                    id: 3,
                    buildingBlockType: 'meal',
                    icon: 'Meal',
                    color: '#f44336'
                },
                {
                    id: 4,
                    buildingBlockType: 'Discussion',
                    icon: 'Discussion',
                    color: '#ffc001'
                },
                {
                    id: 8,
                    buildingBlockType: 'Show',
                    icon: 'Show',
                    color: '#00bcd4'
                },
                {
                    id: 5,
                    buildingBlockType: 'Transportation',
                    icon: 'Transportation',
                    color: '#44546a'
                },
                {
                    id: 9,
                    buildingBlockType: 'Speaker / Keynote',
                    icon: 'speaker',
                    color: '#641956'
                },
                {
                    id: 10,
                    buildingBlockType: 'Break',
                    icon: 'Break',
                    color: '#ff527c'
                },
                {
                    id: 6,
                    buildingBlockType: 'Relaxation',
                    icon: 'Relaxation',
                    color: '#0caf50'
                },
                {
                    id: 7,
                    buildingBlockType: 'Other',
                    icon: 'other',
                    color: '#a5a5a5'
                }
            ],
            timelineItems: [],
            hoursArray: [],
            disabledDragging: false,
            timelineAttachment: null,
            eventElements: [
                {
                    title: 'book catering',
                    status: 'complete'
                },
                {
                    title: 'book catering',
                    status: 'complete'
                },
                {
                    title: 'book catering',
                    status: 'complete'
                },
                {
                    title: 'Create Timeline',
                    status: 'current'
                },
                {
                    title: 'Hire DJ',
                    status: 'not-complete'
                },
                {
                    title: 'Hire photographer',
                    status: 'not-complete'
                },
                {
                    title: 'Research event insurance',
                    status: 'not-complete'
                },
                {
                    title: 'Book event transportation',
                    status: 'not-complete'
                },
                {
                    title: 'Create and send save-the-dates',
                    status: 'not-complete'
                },
                {
                    title: 'Review budget',
                    status: 'not-complete'
                },
                {
                    title: 'Create event\'s banner',
                    status: 'not-complete'
                }
            ],
            timelineIconsURL : 'http://static.maryoku.com/storage/icons/timeline/svg/',
            menuIconsURL : 'http://static.maryoku.com/storage/icons/menu%20_%20checklist/SVG/',
            event : {},
            newTimeLineIconsURL : 'http://static.maryoku.com/storage/icons/Timeline-New/'
        }),
        methods: {
            /**
             * Handle drop block to time line items
             * @param data
             * @param event
             */
            handleDrop (data, event) {
                console.log('handleDrop => ',data);
                if (data) {
                    let block = Object.assign({}, data.block);
                    block.mode = 'edit';
                    block.startTime = '08:00';
                    block.endTime = '09:00';
                    block.title = block.buildingBlockType;
                    block.startDuration = 'am';
                    block.endDuration = 'am';

                    block.isItemLoading = false;
                    if (this.timelineItems.length > 0) {
                        //block.startTime = this.$moment(this.timelineItems[this.timelineItems.length - 1].endTime, 'H:mm A').format('H:mm A')
                        //block.endTime = this.$moment(this.timelineItems[this.timelineItems.length - 1].endTime, 'H:mm A').add(1, 'hour').format('H:mm A')
                    }
                    this.timelineItems.push(Object.assign({}, block))
                    this.disabledDragging = true
                } else {
                    setTimeout(this.updateTimelineITemsOrder, 100)
                }

            },

            removeItem (item) {

                swal({
                    title: 'Are you sure want to delete this item?',
                    showCancelButton: true,
                    confirmButtonClass: 'md-button md-success',
                    cancelButtonClass: 'md-button md-danger',
                    confirmButtonText: 'Yes, remove it!',
                    buttonsStyling: false
                })
                    .then(result => {
                        if (result.value === true) {
                            this.setItemLoading(item, true, false)

                            let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
                            let event = new CalendarEvent({id: this.event.id})

                            let timelineItem = new EventTimelineItem({id: item.id}).for(calendar, event)

                            timelineItem.delete().then(result => {
                                this.getTimelineItems()
                            }).catch(error => {
                                console.log(error)
                                this.$root.$emit('timeline-updated', this.timelineItems)
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        this.$root.$emit('timeline-updated', this.timelineItems)
                    })
            },
            modifyItem (index) {
                this.$set(this.timelineItems[index], 'mode', 'edit')
                this.disabledDragging = true
            },
            previewEvent () {
                this.$router.push({name: 'EventDetails', params: {id: this.event.id}})
            },
            getTimelineItems () {

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
                let event = new CalendarEvent({id: this.event.id})

                new EventTimelineItem().for(calendar, event).get().then(res => {
                    this.timelineItems = _.sortBy(res, function (item) {
                        return item.order
                    })
                    this.isLoading = false
                    this.timelineItems.forEach((item) => {
                        item.isItemLoading = false
                    })
                    this.event.timelineItems = this.timelineItems
                    this.$root.$emit('timeline-updated', this.timelineItems)
                })
            },
            cancelTimelineItem (item, index) {
                if (item.dateCreated) {
                    this.$set(this.timelineItems[index], 'mode', 'saved')
                } else {
                    this.timelineItems.splice(index, 1)
                }
                this.disabledDragging = false

            },
            saveTimelineItem (item, index) {

                this.setItemLoading(item, true, true)

                if ((!item.title && !item.description)) {

                    this.$notify(
                        {
                            message: 'From time, To time and ( Title or Description ) id Required',
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'warning'
                        })

                    this.setItemLoading(item, false, true)

                    return
                }



                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
                let event = new CalendarEvent({id: this.event.id})
                let order = ++index

                console.log('i am here => ', item)
                console.log(this.timelineAttachment)

                new EventTimelineItem({
                    event: {id: event.id},
                    title: item.title,
                    buildingBlockType: item.buildingBlockType,
                    description: item.description,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    endDuration : item.endDuration,
                    startDuration : item.startDuration,
                    order: order,
                    icon: item.icon,
                    color: item.color,
                    link: item.link,
                    attachment: this.timelineAttachment
                }).for(calendar, event).save()
                    .then(res => {

                        this.getTimelineItems()
                        this.disabledDragging = false
                        this.$root.$emit('timeline-updated', this.timelineItems)

                    })
                    .catch(error => {
                        console.log(error)
                        this.disabledDragging = false
                        this.$root.$emit('timeline-updated', this.timelineItems)
                    })

                this.timelineAttachment = null

            },
            updateTimelineItem (item) {

                this.setItemLoading(item, true, true)

                if (!item.startTime || !item.endTime ||
                    (!item.title && !item.description)) {
                    this.$set(item, 'isItemLoading', false)

                    this.$notify(
                        {
                            message: 'From time, To time and ( Title or Description ) id Required',
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'warning'
                        })

                    this.setItemLoading(item, false, true)
                    return
                }

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
                let event = new CalendarEvent({id: this.event.id})

                let timelineItem = new EventTimelineItem({id: item.id}).for(calendar, event)

                timelineItem.title = item.title
                timelineItem.description = item.description
                timelineItem.startTime = item.startTime
                timelineItem.endTime = item.endTime
                timelineItem.link = item.link
                timelineItem.attachment = this.timelineAttachment

                timelineItem.save().then(res => {
                    this.getTimelineItems()
                    this.disabledDragging = false
                    this.$root.$emit('timeline-updated', this.timelineItems)

                }).catch(error => {
                    console.log(error)
                    this.disabledDragging = false
                    this.$root.$emit('timeline-updated', this.timelineItems)
                })

                this.timelineAttachment = null

            },
            updateTimelineITemsOrder () {
                this.isLoading = true
                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
                let event = new CalendarEvent({id: this.event.id})

                let new_order = 1
                const timelineItemsForUpdate = []
                this.timelineItems.forEach(item => {
                    item.order = new_order
                    timelineItemsForUpdate.push({id: item.id, order: new_order})
                    new_order += 1
                })

                let timelineItem = new EventTimelineItem({
                    id: 'updateMultiple',
                    timelineItems: timelineItemsForUpdate
                }).for(calendar, event)

                timelineItem.order = new_order

                timelineItem.save().then(res => {

                    /*this.$notify(
                      {
                        message: "Timeline Items order modified successfully",
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success'
                      });*/
                    this.event.timelineItems = this.timelineItems
                    this.isLoading = false
                    this.$root.$emit('timeline-updated', this.timelineItems)

                }).catch(error => {
                    console.log(error)
                    this.$root.$emit('timeline-updated', this.timelineItems)
                })

            },
            setItemLoading (item, loading, force) {
                this.$set(item, 'isItemLoading', loading)
                if (force) {
                    this.$set(item, 'mode', 'saved')
                    this.$set(item, 'mode', 'edit')
                } else {
                    this.$set(item, 'mode', 'edit')
                    this.$set(item, 'mode', 'saved')
                }
            },
            onFileChange (e) {
                let files = e.target.files || e.dataTransfer.files
                if (!files.length) return
                if (e.target.name) {
                    this.createImage(files[0], 'attachment')
                } else {
                    this.createImage(files[0])
                }
            },
            createImage (file, type) {
                let reader = new FileReader()
                let vm = this

                reader.onload = e => {
                    if (type === 'attachment') {
                        vm.timelineAttachment = e.target.result
                    } else {
                        //vm.imageRegular = e.target.result;
                    }
                }
                reader.readAsDataURL(file)
            },

        },
        created () {
            [...Array(12).keys()].map(x => x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined);
            [...Array(12).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`));
            [...Array(8).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 AM`) : this.hoursArray.push(`${x}:00 AM`))

            this.hoursArray.push()

            this.$auth.currentUser(this, true, function () {
                let _calendar = new Calendar({id: this.$auth.user.defaultCalendarId})

                _calendar.calendarEvents().find(this.$route.params.id).then(event => {

                    this.event = event

                    this.getTimelineItems()

                    new EventComponent().for(_calendar, event).get().then(components => {
                        this.event.components = components
                        this.selectedComponents = components
                    })

                    console.log(event)
                })
            }.bind(this))

        },
        mounted () {
            this.isLoading = true
            // if (this.event && this.event.id){
            //     this.$root.$emit("set-title",this.event, this.routeName === 'EditBuildingBlocks',true);
            //     this.getTimelineItems();
            // }
        },
        watch: {
            event (newVal, oldVal) {
                this.$root.$emit('set-title', this.event, this.routeName === 'EditBuildingBlocks', true)
                this.getTimelineItems()
            }
        }
    }
</script>
<style lang="scss">

</style>
