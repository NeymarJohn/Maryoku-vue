<template>
  <div
    v-if="component.title !== 'Total'"
    class="event-budget-component d-flex"
    :class="{ editable: editable }"
    :style="`border-left: 10px solid ${component.color}; color: ${fontColor}`"
  >
    <div class="font-size-20 font-bold name">
      <img class="icon" :src="`${$iconURL}Budget Elements/${component.icon}`" />
      {{ component.title }}
    </div>
    <template v-if="!isEditing">
      <div class="text-right font-size-20 flex-1 budget" v-if="type == 'perguest'">
        ${{ (component.allocatedBudget / participants).toFixed(0) | withComma }}
      </div>
      <div class="text-right font-size-20 flex-1 budget" v-else>${{ component.allocatedBudget | withComma }}</div>
      <div class="actions">
        <md-button class="edit-btn md-simple" @click="editBudget">
          <img :src="`${$iconURL}Event%20Page/edit-dark.svg`" />
        </md-button>
        <md-button class="edit-btn md-simple" @click="deleteComponent">
          <img class="trash" :src="`${$iconURL}Timeline-New/Trash.svg`" />
        </md-button>
      </div>
    </template>
    <template v-if="isEditing">
      <div class="text-right font-size-20 flex-1 budget d-flex">
        <maryoku-input inputStyle="budget" v-model="newBudget"></maryoku-input>
        <md-button class="normal-btn md-simple md-red" @click="isEditing = false"> Cancel </md-button>
        <md-button class="normal-btn md-red" @click="updateComponent"> Save </md-button>
      </div>
    </template>
  </div>
  <div v-else class="event-budget-component d-flex total">
    <div class="font-size-20 font-bold name">
      {{ component.title }}
    </div>
    <div class="text-right font-size-20 flex-1" v-if="type == 'perguest'">
      ${{ (component.allocatedBudget / participants) | withComma }}
    </div>
    <div class="text-right font-size-20 flex-1" v-else>${{ component.allocatedBudget | withComma }}</div>
    <div class="actions"></div>
  </div>
</template>
<script>
import swal from "sweetalert2";
import MaryokuInput from "@/components/Inputs/MaryokuInput.vue";
export default {
  components: {
    MaryokuInput,
  },
  data() {
    return {
      isEditing: false,
      newBudget: "",
      prevBudget: 0,
    };
  },
  props: {
    component: {
      type: Object,
      default: {},
    },
    type: {
      type: String,
      default: "total",
    },
    participants: {
      type: Number,
      default: 1,
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    // console.log(this.component);
    this.newBudget = `${this.component.allocatedBudget}`.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.prevBudget = this.component.allocatedBudget;
  },
  methods: {
    editBudget() {
      this.isEditing = true;
    },
    deleteComponent() {
      swal({
        title: `<div class="text-left"><div class="font-size-30 cross-line"><img src="${this.$iconURL}Budget Elements/${this.component.componentId}.svg" width="40"/>${this.component.title}</div>
                  <div >Are You Sure You Want To <br/>Delete This Category?
                  </div></div>`,
        showCancelButton: true,
        confirmButtonClass: "md-button md-success",
        cancelButtonClass: "md-button md-danger",
        confirmButtonText: "Yes I'm sure",
        cancelButtonText: "No, take me back",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$emit("delete", this.component);
        }
      });
    },
    updateComponent() {
      this.component.allocatedBudget = this.newBudget;
      this.isEditing = false;
      this.$emit("updateCategory", {
        category: this.component,
        offset: Number(this.component.allocatedBudget) - Number(this.prevBudget),
      });
    },
  },
  computed: {
    fontColor() {
      if (this.component.fontColor) return this.component.fontColor;
      if (this.component.componentId == "unexpected") return this.component.color;
      return "";
    },
  },
};
</script>
<style lang="scss" scoped>
.event-budget-component {
  height: 88px;
  border-radius: 3px;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 20px;
  cursor: pointer;
  .name {
    width: 60%;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    .icon {
      width: 30px;
    }
  }

  .actions {
    opacity: 0;
    width: 100px;
    margin-left: 30px;
    img {
      max-width: 22px;
      max-height: 20px;
      margin: 10px;
      width: 20px;
      height: 20px;
    }
  }
  &.editable:hover {
    .actions {
      opacity: 1;
    }
    .budget {
      font-weight: bold;
    }
  }
  &.total {
    border-left: 10px solid #434343;
    background-color: #434343;
    color: white;
    height: 72px;
  }
}
</style>