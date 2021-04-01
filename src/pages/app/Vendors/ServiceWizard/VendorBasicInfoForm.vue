<template>
  <div class="vendor-basic-info-form-wrapper">
    <div class="inside-container">
      <div class="left-side">
        <img :src="`${iconUrl}step-1.svg`" />
        <h4>Hi,{{ vendor.companyName }}</h4>
        <p>Choose the category & upload photos to appear in your fussiness card & future proposals</p>
        <h2>0/4</h2>
        <h3>Only 5 simple steps & you're signed!</h3>
      </div>
      <div class="right-side">
        <h2>
          Before we begin,
          <br />What type of service would you like to sign?
        </h2>
        <div class="card">
          <label>Business Category</label>
          <category-selector
            :value="item || ''"
            :categories="vendor.vendorCategories"
            column="2"
            trackBy="name"
            class="my-10"
            @change="updateCategory"
          ></category-selector>
          <div class="upload-wrapper">
            <div class="title-cont">
              <div class="left">
                <h5><img :src="`${iconUrl}art (2).svg`" class="page-icon" /> Upload your best images</h5>
              </div>
              <div class="right">
                <p>(15 photos top, under 5MB)</p>
              </div>
            </div>
            <vendor-photos-carousel
              :images="vendor.images"
              @addImage="addVendorImage"
              @setPhoto="updateVendorImage"
              @removeImage="removeVendorImage"
            ></vendor-photos-carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";
import VSignupEditableField from "@/components/Inputs/VSignupEditableField.vue";
import VSignupCategorySelector from "@/components/Inputs/VSignupCategorySelector.vue";
import CategorySelector from "@/components/Inputs/CategorySelector";
import VendorPhotosCarousel from "../components/VendorPhotosCarousel.vue";

export default {
  name: "vendor-basic-info-form",
  components: {
    VueElementLoading,
    VSignupEditableField,
    VSignupCategorySelector,
    CategorySelector,
    VendorPhotosCarousel,
  },
  props: {
    vendor: Object,
  },
  data() {
    return {
      iconUrl: `${this.$iconURL}Vendor Signup/`,
      secondUrl: `${this.$iconURL}VendorSignup/`,
    };
  },
  methods: {
    onUpdateFocus(newValue) {},
    saveValue({ field, value }) {
      // this.$root.$emit("update-vendor-value", field, value);
      this.$store.commit("vendorService/setField", { field, value });
    },
    updateCategory(index, data) {
      // console.log('updateCategory', index, data);
      this.selectedValue[index] = data;
      this.selectedValue = [...this.selectedValue];
    },
  },
  watch: {
    vendor(newVal) {},
  },
};
</script>
<style lang="scss" scoped>
.vendor-basic-info-form-wrapper {
  font-family: Manrope-Regular, sans-serif;
  .vendor-address-editor {
    input {
      font-size: 16px;
      font-family: "Manrope-Regular";
    }
  }
  .inside-container {
    display: flex;
    color: #050505;

    .left-side {
      flex: 1;
      margin-right: 122px;

      img {
        width: 92.5px;
      }
      h4 {
        margin: 36px 0 11px 0;
        font: 800 20px Manrope-Regular, sans-serif;
      }
      p {
        margin: 0;
        padding: 0;
        font: normal 16px Manrope-Regular, sans-serif;
      }
      h2 {
        margin: 30px 0;
        font: 800 40px Manrope-Regular, sans-serif;
      }
      h3 {
        margin: 0;
        color: #641856;
        font: bold 20px Manrope-Regular, sans-serif;
      }
    }
    .right-side {
      flex: 3;

      h2 {
        margin: 0;
        margin-bottom: 40px;
        font: 800 40px Manrope-Regular, sans-serif;
      }
      .card {
        padding: 30px 60px 60px 60px;
        background-color: #ffffff;
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        .action-cont {
          margin-top: 30px;
          text-align: right;
          a {
            cursor: pointer;
            padding: 8px 24px;
            &.cancel {
              color: #050505;
              font: 800 16px Manrope-Regular, sans-serif;
            }
            &.save {
              color: #ffffff;
              font: 800 16px Manrope-Regular, sans-serif;
              background-color: #f51355;
              &:hover {
                color: #ffffff !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
