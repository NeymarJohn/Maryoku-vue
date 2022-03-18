<template>
  <md-field :class="fieldStyle" :editeble-mode="editebleMode">
    <label v-if="!editebleMode" key="label-editable" :class="labelStyle">{{ label }}<span v-if="required" class="required-logo">*</span></label>
    <label v-if="editebleMode" key="label-noeditable" style="cursor: pointer !important;" @click="toggleEditableComponent">{{ label }}</label>
    <md-input
      :id="id"
      :ref="'focusable-' + name"
      class="input-default"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :name="name"
      :disabled="disabled"
      @input="triggerFunc($event,name,count)"
      @change="changeFunc($event,name)"
      @:keyup.enter="autoSubmit($event,name)"
      @blur.prevent="updatefocusValue"
    />

    <span v-if="!editebleMode" key="input-noeditable" class="md-error">{{ isErrors?'Required':'' }}</span>
    <span v-if="editebleMode" key="input-editable" class="md-suffix" style="display: inline-block; white-space: nowrap;">
      <md-button v-show="isEditable" v-close-popover class="md-simple md-just-icon md-round md-sm md-success" style="padding: 0; margin: 0; text-align: right;" @click.prevent="makeAction"><md-icon>check</md-icon></md-button>
      <md-button v-show="isEditable" v-close-popover class="md-simple md-just-icon md-round md-sm md-red" style="padding: 0; margin: 0; text-align: right;" @click.prevent="toggleEditableComponent"><md-icon>close</md-icon></md-button>
      <md-button v-show="!isEditable" v-close-popover class="inline-edit md-simple md-just-icon md-round fa fa-edit button-height" @click="toggleEditableComponent">
        <md-icon>edit</md-icon>
      </md-button>
    </span>
  </md-field>
</template>
<script>
export default {
  name: "InputText",
  model: {
  },
  props: {
    required: Boolean,
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    focus: Boolean,
    disabled: Boolean,
    labelStyle: {
      type: String,
      default: ""
    },
    fieldStyle: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    onChange: {
      type: Function,
      default: () => {}
    },
    isErrors: Boolean,
    id: {
      type: String,
      default: ""
    },
    onChangeInput: {
      type: Function,
      default: () => {}
    },
    count: Boolean,
    isEditable: Boolean,
    editebleMode: Boolean,
    actionFunc: {
      type: Function,
      default: () => {}
    },
    ctx: {
      type: Object,
      default: () => {}
    },
    googleSearch: Boolean
  },
  data () {
    return {
      vm: {
        searchPlace: ""
      }
    };
  },
  watch: {
    focus (val) {
      if (val) {
        setTimeout(() => {
          this.$refs[`focusable-${this.name}`].$el.focus();
        }, 500);
      }
    }
  },
  mounted () {
  },
  methods: {
    updatefocusValue (event) {
      this.$emit("update-focus-value", false);
    },
    triggerFunc: function (value, name, count) {
      if (this.onChange) {
        this.onChange(value, name, count);
      }
    },
    changeFunc: function (e, name) {
      this.onChange(e.target.value, name);
    },
    autoSubmit: function ($event, name) {
      if (this.onBlur) {
        this.onBlur(value, name);
      }
    },
    toggleEditableComponent () {

    },
    makeAction () {
      this.actionFunc(this.ctx, this.name);
    }
  }
};

</script>
<style lang="scss" scoped>
    .input-default{
        font-size: 18px !important;
    }
    .required-logo{
        color:red;
    }
    .md-focused label{
        top:-20px
    }
    .display{
        display:none
    }
     .md-disabled {
    cursor: pointer;
  }

  .md-field .inline-edit {
    visibility: hidden;
  }

  .md-field:hover {
    .inline-edit {
      visibility: visible;
    }
  }

  .md-input {
    width: 80% !important;
    padding: 0 !important;
    margin-top: auto !important;
    margin-bottom: auto !important;
    cursor: pointer !important;

  }

  .md-select >.md-icon {
    display: none !important;
  }
  .md-field.without-border:after {
     height: 0px;
}
.button-height{
      height: 20px;
}
.hidden-input{
  display: none;
}
</style>
