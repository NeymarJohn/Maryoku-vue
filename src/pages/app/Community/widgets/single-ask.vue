<template>
    <div class="md-layout-item md-size-100">
        <md-card class="bg-rose">
            <md-card-content>
                <div class="md-card_comment_tags md-medium-size-100 md-size-100">
                    <span>Festive</span>
                    <span class="md-card_comment_links_dott"> . </span>
                    <span>Low Price</span>
                    <span class="md-card_comment_links_dott"> . </span>
                    <span>Formal</span>
                    <span class="md-card_comment_links_dott"> . </span>
                    <span>Out doors</span>
                </div>
                <h1 class="md-card_comment_title">Looking for recommendation on space for Thanks Giving in San Francisco</h1>
                <div v-if="vendorsClicked" class="md-card_comment_person md-layout-item md-medium-size-100 md-size-100">
                    <div class="md-card_comment_person_photo">
                    </div>
                    <div class="md-card_comment_person_info">
                        <div class="md-card_comment_person_info_name">
                            <span>Ella Moor, </span><span>Playbuzz</span>
                        </div>
                        <div class="md-card_comment_person_info_time">
                            <span>5 hours ago</span>
                        </div>
                    </div>

                </div>
                <div v-if="vendorsClicked" class="md-card_comment_links md-layout-item md-medium-size-100 md-size-100">
                    <span><a href="#">5 Recommendations</a></span>
                    <span class="md-card_comment_links_dott"> . </span>
                    <span><a href="#" @click="goToVendor">3 vendors suggested</a></span>
                    <span class="md-card_comment_links_dott"> . </span>
                    <span><a href="#">22 comments</a></span>
                </div>
                <div class="md-card_comment_input">
                    <div class="md-layout-item md-medium-size-100 md-size-100">
                        <input-text
                                placeholder="Add Comment">
                        </input-text>
                    </div>
                    <div class="md-medium-size-50 md-size-50 remove-left-padding">
                        <md-button class="md-rose text-rose md-card_comment_btn">
                            Add comment
                        </md-button>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>
<script>
    import { InputText } from "@/components";
    export default {
        props: {
          asksList: {
            type: Array,
            default: () => {
              return {};
            }
          },
          item: {
            type: Object,
            default: () => {
              return {};
            }
          },
            vendorsClicked: {
                type: Boolean,
                default: true
            }
        },
        components: {
            InputText
        },
        data() {
            return {

            }
        },
        methods: {
            goToVendor() {
                this.$router.push('/vendors-suggested');
            }
        }
    };
</script>