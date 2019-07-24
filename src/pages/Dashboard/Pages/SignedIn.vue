<template>
    <div class="md-layout">
        <div class="md-layout-item" style="text-align: center;">
            <img src="static/img/calendar-loader-3.gif" class="text-center" style="width: 64px;"/>
            <h2 class="title text-center" slot="title" style="text-align: center;">
                Hi there, one moment please ...
            </h2>
        </div>
    </div>
</template>
<script>
    // import auth from '@/auth';
    import SockJS from 'sockjs-client'; //NEW: SockJS & Stomp instead of socket.io
    import Stomp from 'stompjs';
    import TenantUser from '@/models/TenantUser';
    import Model from '@/models/Model';

    export default {
        components: {

        },
        methods: {
        },
        created() {
            const givenToken = this.$route.query.token;
            this.$auth.setToken(givenToken);
            this.$auth.setHeaders(this);

            const that = this;

            let tenantId = document.location.hostname.replace(".262days.com","");
            let isPrimeTenant = tenantId === 'dev' || tenantId === 'app';
            if (isPrimeTenant) {

                this.$cookies.set('at', givenToken, '1m', '', '262days.com', true);

                new TenantUser().find(givenToken).then(res => {
                    if (res.status){
                        if (res.tenantIds.length === 1) {
                            that.$http.defaults.headers.common['gorm-tenantid'] = res.tenantIds[0];
                            that.$http.defaults.headers.common.gorm_tenantid = res.tenantIds[0];
                            //Model.$http.defaults.headers.common['gorm-tenantid'] = res.tenantIds[0];
                            //Model.$http.defaults.headers.common.gorm_tenantid = res.tenantIds[0];
                            let hostname = document.location.hostname;
                            hostname = hostname.replace("app.","");
                            document.location.href = `${document.location.protocol}//${res.tenantIds[0]}.${hostname}:${document.location.port}/#/signedin?token=${givenToken}`;
                        } else {
                            that.$router.push({name: 'ChooseWorkspace'});
                        }
                    } else {
                        this.$gtm.trackEvent({
                            event: 'new_registration', // Event type [default = 'interaction'] (Optional)
                            category: 'User',
                            action: 'register',
                            label: 'New User Registered',
                            value: this.$auth.user.emailAddress,
                            noninteraction: false // Optional
                        });
                        that.$router.push({name: 'CreateWorkspace'});
                    }
                });

            } else {

                let tenantId = document.location.hostname.replace( ".dev.262days.com","");
                tenantId = tenantId.replace(".262days.com","");

                that.$http.defaults.headers.common['gorm-tenantid'] = tenantId;
                that.$http.defaults.headers.common.gorm_tenantid = tenantId;
                //Model.$http.defaults.headers.common['gorm-tenantid'] = tenantId;
                //Model.$http.defaults.headers.common.gorm_tenantid = tenantId;

                that.$auth.currentUser(that, true, function () {

                    that.$gtm.trackEvent({
                        event: 'user_signed_in', // Event type [default = 'interaction'] (Optional)
                        category: 'Users',
                        action: 'signin',
                        label: 'User Signed In',
                        value: that.$auth.user.emailAddress,
                        noninteraction: false // Optional
                    });

                    /*const socket = new SockJS(`${process.env.SERVER_URL}/stomp`);
                  const client = Stomp.over(socket);

                  client.connect({}, () => {
                    client.subscribe(`/topic/${that.$auth.user.id}`, () => {
                      alert('Your session timed out.');
                      that.$auth.logout(that);
                    });
                  }, (error) => {
                    console.error('unable to connect : ' + error);
                  });*/

                    let me = that.$auth.user.me;

                    if (process.env.NODE_ENV === 'production') {
                        try {
                            window.heap.identify(that.$auth.user.email);
                        } catch (e) {
                            console.error(e);
                        }
                        try {
                            that.$Tawk.$updateChatUser({
                                name: that.$auth.user.displayName,
                                email: that.$auth.user.email
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    }

                    if (!me.customer.onboarded) {
                        that.$router.push({ path: '/company-form' });
                    } else if (!me.onboarded) {
                        that.$router.push({ path: '/me-form' });
                    } else {
                        that.$router.push({ path: '/' });
                    }
                });
            }
        },
        data() {
            return {
                serverURL: process.env.SERVER_URL
            };
        }
    };
</script>
<style>
</style>
