<template>
    <div class="event-plan d-flex">
        <div class="" style="width: 25vw;">
            <InboxSidebar />
        </div>
        <router-view></router-view>
        hello
    </div>
</template>
<script>
const components = {
    InboxSidebar: () => import('../components/InboxSidebar.vue'),
}
export default {
    components,
    data(){
        return{}
    },
    async created(){
        await this.$store.dispatch('vendorDashboard/getComments', {vendorId: this.vendorData.id});
    },
    computed:{
        vendorData() {
            return this.$store.state.vendor.profile;
        },
    }
}
</script>
<style lang="scss" scoped>
section.footer-wrapper {
    padding: 11px 100px 11px 20px;
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    z-index: 10;
    overflow: hidden;
    bottom: 0;

    .prev-cont {
        font-size: 16px;
        font-weight: 800;
        cursor: pointer;

        img {
            width: 20px;
            transform: rotate(180deg);
        }
    }

    .next-cont {
        span {
            font-size: 14px;
            font-weight: normal;
            margin-right: 41px;
        }

        a {
            padding: 18px 49px;
            cursor: pointer;
            border-radius: 3px;
            font-size: 20px;
            font-weight: 800;
            display: inline-block;
            min-width: 250px;
            text-align: center;

            &.discard {
                color: #050505;
                margin-right: 41px;
                min-width: 100px;
                padding: 18px 0px;

                img {
                    width: 25px;
                    margin-right: 12px;
                }
            }

            &.save {
                border: 1px solid #641856;
                color: #641856;
                margin-right: 41px;

                img {
                    width: 25px;
                    margin-right: 12px;
                }
            }

            &.next {
                background: #d5d5d5;
                color: #ffffff;

                &:hover {
                    color: #ffffff !important;
                }
            }
        }
    }
}

.scroll-top-button {
    img {
        height: 20px;
        transform: rotate(-90deg);
    }
}

.inboxSidebar {
    position: fixed;
    left: 80px;
    top: 0;
    bottom: 0;
    width: 25vw;
    height: 100vh;
    z-index: 10;
}

.event-plan{

}
</style>
