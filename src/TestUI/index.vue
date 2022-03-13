<template>
  <div>
    <md-button
      class="md-xs md-just-icon md-round md-info md-icon-button md-fileinput"
    >
      <md-icon>edit</md-icon>
      <input ref="logoImageInput" type="file" @change="onFileChange">
    </md-button>
  </div>
</template>

<script>

import CustomersCSV from "@/models/CustomersCSV";
export default {
    name: "TablePaginationRemote",
    data: () => ({
        users: {
            mdCount: null,
            mdPage: null,
            mdData: []
        },
        rowsPerPage: 3,
    }),
    created() {
        if(this.$store.state.auth.user){
            this.$store.dispatch("auth/checkToken", this.$store.state.auth.user.access_token).then(user => {
                console.log("user", user);
            });
        }
    },
    methods: {
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.uploadCustomersCSV(files[0]);

        },
        uploadCustomersCSV(file, type) {

            let reader = new FileReader();
            reader.onload = (e) => {
                console.log("file", e);
                return new CustomersCSV({ file: e.target.result, vendorId: "60c21d02cfefec3756b70f17" })
                    .save()
                    .then((result) => {
                        console.log("upload.res", result);
                    });
            };

            reader.readAsDataURL(file);
        }
    },
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
    margin-top: 16px
}

.avatar img {
    max-width: 30px;
}
</style>
