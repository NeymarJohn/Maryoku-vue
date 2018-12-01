<template>
    <div>

        <single-ask :vendorsClicked=false > </single-ask>

        <div class="md-layout">
            <div class="md-layout-item md-size-100">
            <div class="grid-col border-bott">
                <div class="option-title">
                    3 Vendors Suggested
                </div>
                <!--<div class="detailes-options">-->
                    <!--<span><a href="#">5 Recommendations</a></span>-->
                    <!--<span class="md-card_comment_links_dott"> . </span>-->
                    <!--<span><a href="#" class="active">3 vendors suggested</a></span>-->
                    <!--<span class="md-card_comment_links_dott"> . </span>-->
                    <!--<span><a href="#">22 comments</a></span>-->
                <!--</div>-->
            </div>
            </div>
        </div>
        <vendors-detailes></vendors-detailes>
    </div>
</template>
<script>
    import SingleAsk from "src/pages/app/Community/widgets/single-ask.vue";
    import VendorsDetailes from "./vendors-detailes.vue";

    export default {
        components: {
            SingleAsk,
            VendorsDetailes
        },
        data() {
            return {

            }
        },
        methods: {

        }
    };
</script>
<style lang="scss">
    .border-bott{
        border-bottom: 1px solid #5A5A5A;
    }
    .detailes-options{
        text-align: right;

        & span a{
            color: #5A5A5A!important;
            padding-bottom: 2.5px;

            &.active{
                border-bottom: 3px solid #FF5479;
            }
        }

    }

</style>