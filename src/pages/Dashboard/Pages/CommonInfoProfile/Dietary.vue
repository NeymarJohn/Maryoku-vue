<template>
  <div v-if="role==='OM'">
    <div class="dietery_employee-body">
      <div class="dietary_form-main">
        <div class="dietary_form-block">
          <div>
            <Title class="emp-title" title="It's time to come clean" title-text="titleStyle" />
            <Title
              title="Mark you dietary constrints, so that we'll know to order for you"
              title-block="dietary_titleBlock"
              title-text="dietary_title-span"
            />
          </div>
          <div class="dietary-check-block">
            <Icon
              icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/gluten_free_off.png"
              icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/gluten_free_on.png"
              image-style="dietary-icon_logo"
              :on-click="onSelect"
              name="cluten"
            />
            <Icon
              icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/lactose_free_off.png"
              icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/lactose_free_on.png"
              image-style="dietary-icon_logo"
              :on-click="onSelect"
              name="lactuz"
            />
            <Icon
              icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/gmo_free_off.png"
              icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/gmo_free_on.png"
              image-style="dietary-icon_logo"
              :on-click="onSelect"
              name="gmo"
            />
            <Icon
              icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/egg_free_off.png"
              icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/egg_free_on.png"
              image-style="dietary-icon_logo"
              :on-click="onSelect"
              name="egg"
            />
          </div>
          <div class="dietary-check-block">
            <Icon
              icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/sugar_free_off.png"
              icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/sugar_free_on.png"
              image-style="dietary-icon_logo"
              :on-click="onSelect"
              name="sugar"
            />
            <Icon
              icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/peanut_free_off.png"
              icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/peanut_free_on.png"
              image-style="dietary-icon_logo"
              :on-click="onSelect"
              name="peanut"
            />
            <Icon
              icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/kosher_off.png"
              icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/kosher_on.png"
              image-style="dietary-icon_logo"
              :on-click="onSelect"
              name="kosher"
            />
            <Icon
              icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/organic_off.png"
              icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/organic_on.png"
              image-style="dietary-icon_logo"
              :on-click="onSelect"
              name="organic"
            />
          </div>
          <div class="dietary-check-block">
            <Icon
              icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/eco_off.png"
              icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/eco_on.png"
              image-style="dietary-icon_logo"
              :on-click="onSelect"
              name="ecofood"
            />
            <div class="dietary_other-options">
              <InputText
                label-style="label_input"
                label="Other"
                field-style="field_input"
                :value="another_food"
                name="another_food"
                :on-change="onChange"
              />
            </div>
          </div>
        </div>
        <div class="button-block">
          <ButtonDiv button-style="dietary_buttonStyle" text="skip" :on-click="onSkip" />
          <Button text="next" :on-click="onNext" class="md-success md-fileinput button-md-common" />
        </div>
      </div>
      <div class="dietary_logo-main">
        <div>
          <img
            class="emp-logo"
            src="https://static-maryoku.s3.amazonaws.com/storage/img/syncer.png"
          >
          <Title
            title="All Guests Preferences in one place"
            title-block="titleBlock"
            title-text="titleStyle"
          />
          <Title
            title-text="dietary_addition-text"
            title-block="titleBlock"
            title="Keeping track on everyone's dietory preferences can be a hassle, when each employee manages their personal preferences, all you have to do is lay back and enjoy"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="dietery_employee-body">
      <div class="dietary_form-main">
        <div class="dietary_form-block">
          <div>
            <Title class="emp-title" title="It's time to come clean" title-text="titleStyle" />
            <Title
              title="Mark you dietary constrints, so that we'll know to order for you"
              title-block="event_titleBlock"
              title-text="dietary_title-span"
            />
          </div>
          <div>
            <div class="dietary-check-block">
              <Icon
                icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/gluten_free_off.png"
                icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/gluten_free_on.png"
                image-style="dietary-icon_logo"
                :on-click="onSelect"
                name="cluten"
              />
              <Icon
                icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/lactose_free_off.png"
                icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/lactose_free_on.png"
                image-style="dietary-icon_logo"
                :on-click="onSelect"
                name="lactuz"
              />
              <Icon
                icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/gmo_free_off.png"
                icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/gmo_free_on.png"
                image-style="dietary-icon_logo"
                :on-click="onSelect"
                name="gmo"
              />
              <Icon
                icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/egg_free_off.png"
                icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/egg_free_on.png"
                image-style="dietary-icon_logo"
                :on-click="onSelect"
                name="egg"
              />
            </div>
            <div class="dietary-check-block">
              <Icon
                icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/sugar_free_off.png"
                icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/sugar_free_on.png"
                image-style="dietary-icon_logo"
                :on-click="onSelect"
                name="sugar"
              />
              <Icon
                icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/peanut_free_off.png"
                icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/peanut_free_on.png"
                image-style="dietary-icon_logo"
                :on-click="onSelect"
                name="peanut"
              />
              <Icon
                icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/kosher_off.png"
                icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/kosher_on.png"
                image-style="dietary-icon_logo"
                :on-click="onSelect"
                name="kosher"
              />
              <Icon
                icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/organic_off.png"
                icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/organic_on.png"
                image-style="dietary-icon_logo"
                :on-click="onSelect"
                name="organic"
              />
            </div>
            <div class="dietary-check-block">
              <Icon
                icon-source-one="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/eco_off.png"
                icon-source-two="https://static-maryoku.s3.amazonaws.com/storage/img/dietary/eco_on.png"
                image-style="dietary-icon_logo"
                :on-click="onSelect"
                name="ecofood"
              />
              <div class="dietary_other-options">
                <InputText
                  label-style="label_input"
                  label="Other"
                  field-style="field_input"
                  :value="another_food"
                  name="another_food"
                  :on-change="onChange"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="button-block">
          <ButtonDiv button-style="dietary_buttonStyle" text="skip" :on-click="onSkip" />
          <Button text="next" :on-click="onNext" class="md-success md-fileinput button-md-common" />
        </div>
      </div>
      <div class="dietary_logo-main">
        <div>
          <img
            class="emp-logo"
            src="https://static-maryoku.s3.amazonaws.com/storage/img/syncer.png"
          >
          <Title title="You gutta eat, right?" title-block="titleBlock" title-text="titleStyle" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InputText from "@/components/Inputs/InputText.vue";
import Title from "@/components/Title/Title.vue";
import ButtonDiv from "@/components/Button/ButtonDiv.vue";
import Button from "@/components/Button/Button.vue";
import Icon from "@/components/Icon/Icon.vue";

export default {
  name: "Employee",
  components: {
    InputText,
    Title,
    ButtonDiv,
    Icon,
    Button,
  },
  props: {
    officeManager: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      role: null,
      dietary: [],
      another_food: "",
    };
  },
  mounted: function () {
    const onboardingPath = this.$store.getters["user/getUser"].onboardingPath;
    this.role = onboardingPath;
  },
  methods: {
    onSkip: function () {
      this.$router.push("/company");
    },
    onSelect: function (food) {
      if (!this.dietary.includes(food)) {
        this.dietary.push(food);
      } else {
        this.dietary = this.dietary.filter((item) => item !== food);
      }
    },
    onChange: function (value, name) {
      this[name] = value;
    },
    onNext: function () {
      const data = {};
      data["dietary"] = this.dietary;
      data["another_food"] = this.another_food;
      this.$store.dispatch("user/sendCompanyInfo", data);
      this.$router.push("/company");
    },
  },
};
</script>
<style lang="scss">
.dietery_employee-body {
  display: flex;
  flex-direction: "column";
}
.dietary_form-main {
  width: 50%;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dietary_logo-main {
  width: 50%;
  height: 100vh;
  background: #67b5dd;
  display: flex;
  align-items: center;
}
.dietary_form-block {
  width: 75%;
  display: flex;
  flex-direction: column;
}
.emp-logo {
  height: 100%;
  width: 100%;
}
.emp-title {
  text-align: center;
  margin-bottom: 20px;
}
.label_input {
  font-size: 20px !important;
  padding-left: 10px;
}
.titleStyle {
  font-size: 40px;
  font-weight: 700;
}
.titleBlock {
  display: flex;
  justify-content: center;
}
.dietary_buttonStyle {
  cursor: pointer;
  color: #67b5dd;
  font-size: 20px;
  padding: 10px 0px;
}
.button-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
}
.dietary_addition-text {
  text-align: center;
  width: 70%;
  color: white;
  font-size: 26px;
  margin-top: 20px;
  line-height: 147%;
}
.dietary-icon_logo {
  width: 150px;
  height: 150px;
}
.dietary-check-block {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}
.dietary_other-options {
  padding-top: 30px;
  width: 75%;
}
.dietary_icon-title {
  font-weight: 800;
  color: #b6b6b6;
}
.dietary_title-span {
  color: #b6b6b6;
  font-size: 22px;
  margin-top: 20px;
}
.dietary_titleBlock {
  display: flex;
  justify-content: center;
}
</style>
