<template>
    <div class="new-event-side-bar"
         :data-color="activeColor"
         :data-background-color="backgroundColor">

        <div class="navbar-minimize">
            <md-button id="minimizeSidebar" class="md-round md-simple md-just-icon md-transparent" @click="minimizeSidebar">
                <i class="material-icons text_align-center visible-on-sidebar-regular">more_vert</i>
                <i class="material-icons design_bullet-list-67 visible-on-sidebar-mini">view_list</i>
            </md-button>
        </div>
        <div class="sidebar-wrapper" ref="sidebarScrollArea">
            <md-list class="nav">
                <sidebar-item name="left-menu-events-list" class="left-menu-events-list" :link="{name: 'Event Details',  icon: 'outlined_flag', path: '/events/' + event.id +'/edit/event'}"></sidebar-item>
                <sidebar-item name="left-menu-events-list" class="left-menu-events-list" :link="{name: 'Events Lists',  icon: 'check_circle_outline', path: '/events/'+ event.id +'/edit/timeline/new'}"></sidebar-item>
                <sidebar-item name="left-menu-yearly-plan" class="left-menu-yearly-plan" :link="{name: 'Event Budget',  icon: 'attach_money', path: '/events/'+ event.id +'/edit/details/new'}"></sidebar-item>
                <sidebar-item name="left-menu-vendors-list" class="left-menu-vendors-list" :link="{name: 'Vendors Pool', icon: 'chat_bubble_outline', path: '/vendors-pool'}">
                </sidebar-item>
            </md-list>
        </div>
        <div class="logo">
            <a href="/" class="simple-text logo-mini visible-on-sidebar-mini">
                <div class="logo-img">
                    <img :src="logo">
                    <!--<md-icon>calendar_today</md-icon>-->
                </div>
            </a>
        </div>
    </div>
</template>
<script>

    import SidebarItem from './NewSidebarItem';

    export default {
        name: 'sidebar',
        props: {
            title: {
                type: String,
                default: 'maryoku'
            },
            rtlTitle: {
                type: String,
                default: 'maryoku'
            },
            activeColor: {
                type: String,
                default: 'rose',
                validator: value => {
                    let acceptedValues = [
                        '',
                        'primary',
                        'azure',
                        'green',
                        'orange',
                        'danger',
                        'rose'
                    ]
                    return acceptedValues.indexOf(value) !== -1
                }
            },
            backgroundImage: {
                type: String,
                default: 'http://static.maryoku.com/storage/img/sidebar-2.jpg'
            },
            backgroundColor: {
                type: String,
                default: 'white',
                validator: value => {
                    let acceptedValues = ['', 'black', 'white', 'red']
                    return acceptedValues.indexOf(value) !== -1
                }
            },
            logo: {
                type: String,
                default: 'http://static.maryoku.com/storage/maryoku+-+logo+square+dark%402x.png'
            },
            fullLogo: {
                type: String,
                default: 'http://static.maryoku.com/storage/maryoku+-+logo+dark%402x.png'
            },
            sidebarLinks: {
                type: Array,
                default: () => []
            },
            autoClose: {
                type: Boolean,
                default: true
            },
            event : {
                type : Object,
                default : {}
            }
        },
        provide () {
            return {
                autoClose: this.autoClose
            }
        },
        methods: {
            minimizeSidebar () {
                if (this.$sidebar) {
                    this.$sidebar.toggleMinimize()
                }
            }
        },
        computed: {
            sidebarStyle () {
                return {
                    backgroundImage: `url(${this.backgroundImage})`
                }
            }
        },
        beforeDestroy () {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.showSidebar = false
            }
        },
        components : {
            SidebarItem
        }
    }
</script>
<style>
    @media (min-width: 992px) {
        .navbar-search-form-mobile,
        .nav-mobile-menu {
            display: none;
        }
    }
</style>
