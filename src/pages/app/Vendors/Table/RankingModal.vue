<template>
  <div class="md-layout">
    <popover v-if="inviteModalOpen" container-class="modal-container" @close="noticeModalHide">
      <template slot="header" class="header-position">
        <h3 class="title">
          Ranking
        </h3>
        <button class="btn-position" @click="closeModal">
          X
        </button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <div class="md-layout-item md-size-95 md-small-size-100">
            <div v-for="(item, index) in rankingParameters" :key="item.id" class="space-between box-rate">
              <h3 class="">
                {{ item.name }}
              </h3>
              <div class="pull-right">
                <div class="star-rating">
                  <label
                    v-for="(rating, ratingIndex) in ratings"
                    :key="ratingIndex"
                    class="star-rating__star"
                    :class="{ 'is-selected': item.value >= rating && item.value != null }"
                    @click="setRanking(rating, index)"
                  >
                    <input
                      v-model="item.value"
                      class="star-rating star-rating__checkbox"
                      type="radio"
                      :value="rating"
                      :name="name"
                    >★</label>
                </div>
              </div>
            </div>

            <md-field class="border-field">
              <label class="label-right">Your review</label>
              <md-textarea v-model="textarea" md-counter="80" />
            </md-field>
          </div>
        </div>
      </template>
      <template slot="footer">
        <md-button class="move-left md-red md-simple" @click="closeModal">
          Close
        </md-button>
        <md-button class="md-success">
          Submit
        </md-button>
      </template>
    </popover>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import vendorsVuex from "../vendors.vuex";
import Popover from "@/components/Popover";
import Vendors from "@/models/Vendors";

export default {
  components: {
    popover: Popover,
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    value: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: ""
    },
    required: Boolean,
  },
  data() {
    return {
      rankingParameters: [
        {
          name: "Overal Experience",
          parameterName: "overal_experience",
          value: "",
        },
        {
          name: "Cleanliness and Maintenance",
          parameterName: "cleanliness_and_maintenance",
          value: "",
        },
        {
          name: "Accuracy",
          parameterName: "accuracy",
          value: "",
        },
        {
          name: "Value for money",
          parameterName: "value_for_money",
          value: "",
        },
        {
          name: "Service",
          parameterName: "service",
          value: "",
        },
        {
          name: "Location & Parking",
          parameterName: "location_parking",
          value: "",
        },
      ],
      temp_value: null,
      value1: null,
      value2: null,
      ratings: [1, 2, 3, 4, 5],
      inviteModalOpen: false,
      single: null,
      categories: ["Space / Venue ", "Catering", "Content ", "Services ", "Products Rental / Purchase"],
    };
  },
  computed: {
    ...mapState("vendors", ["vendorsMemberData"]),
  },
  created() {
    this.$store.registerModule("vendors", vendorsVuex);
  },
  destroyed() {
    this.$store.unregisterModule("vendors", vendorsVuex);
  },

  methods: {
    ...mapMutations("vendors", ["setMemberProperty"]),
    noticeModalHide: function () {
      this.inviteModalOpen = false;
    },
    toggleModal: function (show) {
      this.inviteModalOpen = show;
    },
    closeModal() {
      this.inviteModalOpen = false;
    },
    async addVendor() {
      let vendor = new Vendors({});

      vendor.attach(this.vendorsMemberData);
    },

    setRanking: function (value, index) {
      if (!this.disabled) {
        this.temp_value = value;
        return (this.rankingParameters[index].value = value);
      }
    },
  },
};
</script>
<style lang="scss">
.swal2-container {
  z-index: 999999;
}
.md-toolbar + .md-toolbar {
  margin-top: 16px;
  background-color: transparent !important;
}
.md-toolbar {
  background-color: transparent !important;
}
.md-toolbar .md-title {
  color: #555555 !important;
}
.border-field {
  box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(153, 153, 153, 0.46);
  font-size: 13px;
}
.label-right {
  left: 16px !important;
  font-size: 13px !important;
}
.space-between {
  justify-content: space-between;
}
.space-between .pull-right span {
  cursor: pointer;
}
.white {
  color: white !important;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
.fill-yellow {
  color: yellow !important;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
%visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

.star-rating {
  &__star {
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    line-height: 1;
    font-size: 1.5em;
    color: #ababab;
    transition: color 0.2s ease-out;

    &:hover {
      cursor: pointer;
    }

    &.is-selected {
      color: #ffd700;
    }
  }

  &__checkbox {
    @extend %visually-hidden;
  }
}
.header-position {
  position: relative;
}
.btn-position {
  position: absolute;
  right: 15px;
  font-weight: bold;
  top: 20px;
  font-size: 17px;
  background-color: transparent !important;
  box-shadow: none !important;
  color: gray !important;
  border-color: transparent;
  cursor: pointer;

  &:hover,
  &:visited,
  &:focus,
  &:active {
    background-color: transparent !important;
    box-shadow: none !important;
    color: gray !important;
  }
}
.box-rate {
  border-bottom: 1px solid #ddd;

  & h3 {
    font-size: 13px;
    display: inline-block;
    margin-top: 5px;
  }
}
</style>
