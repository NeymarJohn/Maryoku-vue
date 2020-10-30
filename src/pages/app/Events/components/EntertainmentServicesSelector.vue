<template>
  <div class="services-editor">
    <div class="droplist" v-if="!expanded">
      <input readonly class="default with-img" :value="selectedService" @click="expanded = true" />
      <img class="dropdown" src="https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/Asset 523.svg" />
    </div>
    <div class="item-container" v-else>
      <ul>
        <li v-for="(option, cIndex) in service.options" :key="cIndex" @click="updateService(cIndex)">
          {{ option.label }}
          <md-checkbox class="md-checkbox" v-model="option.isSelected" @change="changeService()"></md-checkbox>
        </li>
      </ul>
      <div>
        <i class="md-icon md-icon-font icon color-red md-theme-default" @click="close">close</i>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: "entertainment-services-selector",
    props: {
      service: {
        type: Object,
        required: true,
      },

    },
    data: () => ({
      expanded: false,
      // service: this.data,
      value: null,
    }),
    mounted() {
      // this.service = this.data;
    },
    computed: {
      selectedService(){
        let txt = '';
        let selected = this.service.options.filter(op => op.isSelected);
        selected.map((s, index) => {
          txt += s.label + (index < selected.length - 1 ? ", " : '');
        });
        return txt;
      }
    },
    methods: {
      updateService(index) {
        this.service.options[index].isSelected = !this.service.options[index].isSelected;
        this.$emit("change", this.service);
      },
      changeService(){
        this.$emit("change", this.service);
      },
      close(){
        this.expanded = false;
      }
    },
  };
</script>
<style lang="scss" scoped>
  .services-editor {
    font: normal 16px Manrope-Regular, sans-serif;
    min-width: 300px;
    position: relative;
    .droplist {
      position: relative;
      width: 400px;
      .inside-img {
        width: 22px;
        z-index: 10;
        position: absolute;
        top: 15px;
        left: 15px;
      }
      input {
        padding-left: 16px;
        cursor: pointer;
        width: 100%;
        font-family: 'Manrope-Regular',sans-serif;
        font-size: 16px;
      }
      .dropdown {
        position: absolute;
        margin-top: 20px;
        width: 14px;
        right: 15px;
      }
    }

    .item-container{
      position: absolute;
      top: -20px;
      width: 400px;
      background: white;
      z-index: 10;

      .md-icon{
        position: absolute;
        top: 5px;
        right: 5px;
      }
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 30px;
      border: solid 1px #050505;
      box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.16);

      li {
        cursor: pointer;
        font: normal 16px Manrope-Regular, sans-serif;
        display: flex;
        align-items: center;

        .md-checkbox{
          margin-left: auto;
        }
      }
    }
  }
</style>
