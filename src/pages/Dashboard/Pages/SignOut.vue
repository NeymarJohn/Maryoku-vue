<template>
    <div class="md-layout">
        <div class="md-layout-item" style="text-align: center;">
            <img src="http://static.maryoku.com/storage/img/calendar-loader-3.gif" class="text-center" style="width: 64px;"/>
            <h2 class="title text-center" slot="title" style="text-align: center;">
                One moment please ...
            </h2>
        </div>
    </div>
</template>
<script>
    export default {
        components: {

        },
        methods: {
        },
        created() {
            const that = this;
            setTimeout(() => {
                this.$auth.logout(this);
                this.$ls.remove("user");

                if (process.env.NODE_ENV === 'production') {
                    try {
                        window.heap.resetIdentity();
                    } catch (e) { console.error(e);}

                    try {
                        this.$Tawk.$endChat();
                    } catch (e) {
                        console.error(e);
                    }

                    this.$gtm.trackEvent({
                        event: 'user_signed_out', // Event type [default = 'interaction'] (Optional)
                        category: 'Users',
                        action: 'signout',
                        label: 'User Signed Out',
                        value: this.$auth.user.emailAddress,
                        noninteraction: false // Optional
                    });
                }


            },1500)
        },
        data() {
            return {
                serverURL: process.env.SERVER_URL,
            };
        }
    };
</script>
<style>
</style>
