<template>
    <div>
        <h5 class="info-text"> What are you doing? (checkboxes) </h5>
        <div class="md-layout">
            <div class="md-layout-item">
                <div class="md-layout">
                    <div class="md-layout-item md-size-33 md-small-size-100">
                        <icon-radio v-model="role"
                                       icon="fas fa-pencil-alt"
                                    label="Design"
                                    :value="selectedValue"
                                    @change="updateValue"
                                    title="Design">
                        </icon-radio>
                    </div>
                    <div class="md-layout-item md-size-33 md-small-size-100">
                        <icon-radio v-model="role"
                                    :value="selectedValue"
                                    label="Code"
                                       icon="fas fa-terminal"
                                    @change="updateValue"
                                       title="Code">
                        </icon-radio>
                    </div>
                    <div class="md-layout-item md-size-33 md-small-size-100">
                        <icon-radio v-model="role"
                                    label="Develop"
                                    :value="selectedValue"
                                    @change="updateValue"
                                       icon="fas fa-laptop"
                                       title="Develop">
                        </icon-radio>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import { IconCheckbox } from "@/components";
  import  IconRadio from "@/components/Inputs/IconRadio";
  import teamVuexModule from '../../team.vuex'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    components: {
      IconCheckbox,
      IconRadio
    },
    data() {
      return {
        selectedValue: 'Design'
      };
    },
    computed: {
      ...mapState('teamVuex', ['teamMemberData']),
      role: {
        get() {
          return this.teamMemberData.role
        },
        set(value) {
          this.setMemberProperty({key: 'role', actualValue: value})
        }
      }

    },
    created () {
      this.$store.registerModule('teamVuex', teamVuexModule);

    },
    methods: {
      ...mapMutations('teamVuex', [
        'setMemberProperty',
      ]),
      updateValue(newValue) {
        console.log('Radio Evenet', newValue);
        this.selectedValue = newValue;
      },
      validate() {
        this.$emit("on-validated", true, this.model);
        return Promise.resolve(true);
      }
    }
  };
</script>
<style>
</style>
