<template>
    <div>
        <md-card>
            <md-card-header class="md-card-header-icon md-card-header-rose">
                <div class="card-icon">
                    <md-icon>mail_outline</md-icon>
                </div>
                <h4 class="title2">Melissa’s Company</h4>
            </md-card-header>

            <md-card-content class="md-layout">
                <div class="md-layout-item md-size-100">
                    <md-field>
                        <label>Name</label>
                        <md-input v-model="company.name" type="text"></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label>Website</label>
                        <md-input v-model="company.website" type="text"></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field >
                        <label>Email</label>
                        <md-input v-model="company.email" type="email"></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label>Address</label>
                        <md-input v-model="company.address" type="text"></md-input>
                    </md-field>

                </div>

                <div  class="md-layout-item md-size-50">
                    <md-field>
                        <label>Phone Number</label>
                        <md-input v-model="company.phone" type="text"></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label for="category">Category</label>
                        <md-select v-model="company.category" name="category" id="category">
                            <md-option value="Services">Services</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label for="tagging">Tagging</label>
                        <md-select v-model="company.tagging" name="tagging" id="tagging">
                            <md-option value="Gardenplace">Gardenplace</md-option>
                        </md-select>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label>Contact Person</label>
                        <md-input v-model="company.website" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label>Attachments</label>
                        <md-file v-model="company.attachments" multiple />
                    </md-field>
                </div>


            </md-card-content>

            <md-card-actions md-alignment="right">
                <md-button class="md-rose">Save</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>


    export default {
        components: {


        },
        props: {

        },
      created() {

      },
        data() {
            return {
                company : {}

            }
        },
        methods: {

        }
    };
</script>
