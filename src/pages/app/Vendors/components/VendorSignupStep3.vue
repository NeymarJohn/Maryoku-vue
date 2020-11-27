<template>
  <div class="vendor-signup-step3-wrapper">
    <div class="inside-container">
      <div class="left-side">
        <img :src="`${iconUrl}Group 5224 (2).svg`" />
        <h2>
          DISCLAMER &
          <br />POLICY
        </h2>
        <p>
          Don’t worry, you’ll only have to do this once. After that all elements will appear on your future proposals
          automatically
        </p>
        <h2>3/5</h2>
        <p class="color-red font-bold">Good job, you're almost done!</p>
      </div>
      <div class="right-side">
        <div class="policy-wrapper mb-50">
          <div class="title-cont">
            <div class="top">
              <h5><img :src="`${iconUrl}Asset 560.svg`" /> Policy</h5>
            </div>
            <div class="bottom">
              <p>Set venue rules for your guests</p>
            </div>
          </div>
          <div class="card">
            <div class="rules">
              <div
                class="rule"
                v-for="(r, rIndex) in policies.filter((p) => p.category == vendor.vendorCategories[0])[0].items"
                :key="rIndex"
              >
                <div class="left v-grid-with-desc">
                  {{ r.name }}
                  <textarea
                    v-if="r.hasComment && yesRules.includes(r)"
                    class="desc"
                    rows="3"
                    v-model="r.desc"
                    :placeholder="`Add additional information`"
                  />
                </div>
                <div class="right">
                  <div class="top">
                    <template v-if="r.type == Boolean">
                      <div class="item" @click="yesRule(r)">
                        <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="yesRules.includes(r)" />
                        <span class="unchecked" v-else></span>
                        Yes
                      </div>
                      <div class="item" @click="noRule(r)">
                        <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="noRules.includes(r)" />
                        <span class="unchecked" v-else></span>
                        No
                      </div>
                    </template>
                    <template v-if="r.type == String">
                      <div class="item" v-if="!noteRules.includes(r)" @click="noteRule(r)">
                        <a class="note">+ Add Note</a>
                      </div>
                      <div class="item noflex" v-else>
                        <textarea placeholder="Except from the parking area" rows="3" />
                        <br />
                        <a class="cancel" @click="noteRule(r)">Cancel</a>
                      </div>
                    </template>
                    <template v-if="r.type == 'Selection'">
                      <select class="unit-select" v-model="r.value">
                        <option v-for="(option, index) in r.options" :key="index" :value="option">{{ option }}</option>
                      </select>
                    </template>
                  </div>
                  <div class="bottom no-margin" v-if="r.type == Number">
                    <template v-if="r.noSuffix">
                      <div>
                        <input type="number" class="text-center number-field" placeholder="00.00" />
                      </div>
                    </template>
                    <template v-else>
                      <span v-if="r.isPercentage">Rate (%)</span>
                      <span v-else>Extra Payment</span>
                      <br />
                      <div class="suffix percentage" v-if="r.isPercentage">
                        <input type="number" class placeholder="00.00" />
                      </div>
                      <div class="suffix" v-else>
                        <input type="number" class placeholder="00.00" />
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <v-signup-add-rules :comType="`rule`" :title="rulesDesc" />
          </div>
        </div>
        <div class="pricing-policy-wrapper mb-50">
          <div class="title-cont">
            <div class="top">
              <h5><img :src="`${iconUrl}Asset 536.svg`" /> pricing policy</h5>
            </div>
            <div class="bottom">
              <p>use the suggested element or add your own itmes to your disclaimer</p>
            </div>
          </div>
          <div class="card">
            <!-- <div class="field mb-50">
              <div class="label">
                <span>How much deposit do you charge?</span>
              </div>
              <input type="text" class="" placeholder="Like: 50% of the total event"/>
            </div>-->
            <!-- <div class="field ml-title">
              <h4>cancellation approach</h4>
            </div>
            <div class="field mb-50">
              <div class="label">
                <div class="title-cont">
                  <div class="left m-0">
                    <h5>cancellation is allowed until...?</h5>
                  </div>
                  <div class="right">
                    <p>(With full refund)</p>
                  </div>
                </div>
              </div>
              <input type="text" class="" placeholder="Like: 60 days prior to the start of the event..."/>
            </div>-->
            <div class="rules">
              <div
                class="rule"
                v-for="(p, pIndex) in vendorPricingPolicies.items"
                :key="pIndex"
              >
                <div class="left">
                  {{ p.name }}
                  <textarea
                    v-if="p.hasComment"
                    class="desc"
                    rows="3"
                    v-model="p.desc"
                    :placeholder="`Add additional information`"
                  />
                  <div v-if="p.yesOption && p.value" class="mt-10 ml-10">
                    <label>How many hours are included?</label><br />
                    <input type="number" class="text-center number-field" placeholder="" v-model="p.yesOption.value" />
                  </div>
                  <div v-if="p.noOption && !p.value" class="mt-10 ml-10">
                    <label>How much is hourly rate?</label><br />
                    <input
                      type="number"
                      class="text-center number-field"
                      placeholder="00.00"
                      v-model="p.noOption.value"
                    />
                  </div>
                </div>
                <div class="right">
                  <div class="d-flex align-center">
                  <div class="top">
                    <template v-if="p.type == Boolean">
                      <div class="item" @click="setPricePolicy(null, p.name, true)">
                        <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="p.value" />
                        <span class="unchecked" v-else></span>
                        Yes
                      </div>
                      <div class="item" @click="setPricePolicy(null, p.name, false)">
                        <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="!p.value" />
                        <span class="unchecked" v-else></span>
                        No
                      </div>
                    </template>
                    <template v-if="p.type == String">
                      <div class="item" v-if="!noteRules.includes(p)" @click="noteRule(p)">
                        <a class="note">+ Add Note</a>
                      </div>
                      <div class="item noflex" v-else>
                        <textarea placeholder="Except from the parking area" rows="3" />
                        <br />
                        <a class="cancel" @click="noteRule(p)">Cancel</a>
                      </div>
                    </template>
                    <template v-if="p.type == 'Including'">
                      <div class="item" @click="setPricePolicy(null, p.name, true)">
                        <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="p.value" />
                        <span class="unchecked" v-else></span>
                        Include
                      </div>
                      <div class="item" @click="setPricePolicy(null, p.name, false)">
                        <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="!p.value" />
                        <span class="unchecked" v-else></span>
                        Not Include
                      </div>
                    </template>
                    <template v-if="p.type == 'Selection'">
                      <select class="unit-select" v-model="p.value" @change="setPricePolicy">
                        <option v-for="(option, index) in p.options" :key="index" :value="option">{{ option }}</option>
                      </select>
                    </template>
                  </div>
                  <div class="bottom no-margin" v-if="p.type == Number">
                    <template v-if="p.noSuffix">
                      <div>
                        <input
                          type="number"
                          class="text-center number-field"
                          placeholder="00.00"
                          v-model="p.value"
                          @change="setPricePolicy"
                        />
                      </div>
                    </template>
                    <template v-else>
                      <span v-if="p.isPercentage">Rate (%)</span>
                      <span v-else>Extra Payment</span>
                      <br />
                      <div class="suffix percentage" v-if="p.isPercentage">
                        <input
                          type="number"
                          class
                          placeholder="00.00"
                          v-model="p.value"
                          @change="setPricePolicy"
                        />
                      </div>
                      <div class="suffix d-flex" v-else>
                        <input
                          type="number"
                          class
                          placeholder="00.00"
                          v-model="p.value"
                          @change="setPricePolicy"
                        />
                        <div v-if="p.units">
                          <select class="unit-select ml-10" v-model="p.unit">
                            <option v-for="(unit, index) in p.units" :key="index" :value="unit">{{ unit }}</option>
                          </select>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="bottom mt-10" v-if="p.type == 'Including' && !p.value">
                    <span>Extra Payment</span>
                    <br />
                    <div class="suffix">
                      <input
                        type="number"
                        class="text-center number-field"
                        placeholder="00.00"
                        v-model="p.cost"
                        @change="setPricePolicy"
                      />
                    </div>
                  </div>
                  <div class="bottom no-margin" v-if="p.type == 'Cost'">
                    <span>Cost per {{ p.unit }}</span>
                    <br />
                    <div class="suffix">
                      <input
                        type="number"
                        class="text-center number-field"
                        placeholder="00.00"
                        v-model="p.value"
                        @change="setPricePolicy"
                      />
                    </div>
                  </div>
                  <div class="bottom no-margin" v-if="p.type == 'Discount'">
                    <span>Discount</span>
                    <br />
                    <div class="suffix percentage d-flex">
                      <input
                        type="number"
                        class="text-center number-field"
                        placeholder="00.00"
                        v-model="p.value"
                        @change="setPricePolicy"
                      />
                      <div v-if="p.units">
                        <select class="unit-select ml-10" v-model="p.unit">
                          <option v-for="(unit, index) in p.units" :key="index" :value="unit">{{ unit }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="bottom mt-0 ml-40" v-if="p.hasOwnProperty('attendees') && (p.type == Boolean && p.value || p.type == Number)">
                    <span :class="{'d-block': p.type != Boolean, 'mr-10': p.type == Boolean}">How Many</span>

                      <input
                              type="number"
                              class="text-center number-field"
                              placeholder="attendees"
                              v-model="p.attendees"
                              @change="setPricePolicy()"
                      />

                  </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="field mb-50">
              <v-signup-add-rules
                :comType="'rule'"
                :title="policyDesc"
              />
            </div>
            <div class="field mb-50">
              <div class="label">
                <div class="title-cont">
                  <div class="left m-0">
                    <h5>additional disclaimer</h5>
                  </div>
                  <div class="right">
                    <p>*suggested</p>
                  </div>
                </div>
              </div>
              <textarea placeholder="For example : A 50% deposite will be due on or befor eThe remaining balance will be collected a week prior to the event" rows="5"/>
            </div>-->
          </div>
        </div>
        <div class="3rd-party-vendor-wrapper mb-50" v-if="vendor.vendorCategories[0] == 'venuerental'">
          <div class="title-cont">
            <div class="top">
              <h5>3rd party vendor</h5>
            </div>
          </div>
          <div class="card">
            <div class="title-cont">
              <div class="left">
                <h5>do you allow 3rd party vendor?</h5>
              </div>
              <div class="right">
                <p>(this question is for venues only)</p>
              </div>
            </div>
            <div class="checks-cont">
              <div class="check-item" @click="allowThirdVendor = 0">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="allowThirdVendor == 0" />
                <span class="unchecked" v-else></span>
                <span>Yes</span>
              </div>
              <div class="check-item" @click="allowThirdVendor = 1">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="allowThirdVendor == 1" />
                <span class="unchecked" v-else></span>
                <span>No</span>
              </div>
              <div class="check-item" @click="allowThirdVendor = 2">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="allowThirdVendor == 2" />
                <span class="unchecked" v-else></span>
                <span>Some</span>
              </div>
            </div>
            <div class="not-allow-cont" v-if="allowThirdVendor == 2">
              <h4>Which of the vendors do you not allow to work in your venue?</h4>
              <div class="na-check-list">
                <ul>
                  <li v-for="(n, nIndex) in defNa" :key="nIndex">
                    <img
                      :src="`${iconUrl}Group 5489 (4).svg`"
                      @click="updateNa(n)"
                      v-if="vendor.notAllowed.filter((nt) => nt.value == n.value).length > 0"
                    />
                    <img :src="`${iconUrl}Rectangle 1245.svg`" v-else @click="updateNa(n)" />
                    <span @click="updateNa(n)">{{ n.name }}</span>
                    <div
                      style="margin-top: 10px"
                      v-if="vendor.notAllowed.filter((nt) => nt.value == 'Other').length > 0 && n.value == 'Other'"
                    >
                      <input type="text" placeholder="Type vendor category..." />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="social-wrapper">
          <div class="title-cont">
            <div class="top">
              <h5>blackout days</h5>
            </div>
          </div>
          <div class="card">
            <div class="title-cont">
              <div class="top">
                <h5>are there times when your don't work regularly?</h5>
              </div>
              <div class="bottom">
                <p>This way we know not to send you irrelevant offers</p>
              </div>
            </div>
            <div class="checks-cont mt-2">
              <div class="check-item" @click="workAllDay = true">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="workAllDay" />
                <span class="unchecked" v-else></span>
                <span>I work all the time</span>
              </div>
              <div class="check-item" @click="workAllDay = false">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="!workAllDay" />
                <span class="unchecked" v-else></span>
                <span>There are times I don't work ></span>
              </div>
            </div>
            <div class="calendar-cont" v-if="!workAllDay">
              <div class="calendar">
                <div class="calendar-title">Mark the blackout days</div>
                <!-- dateFormat='yyyy-mm-dd'  -->
                <template>
                  <functional-calendar
                    :key="componentKey"
                    :change-month-function="true"
                    :change-year-function="true"
                    :is-multiple-date-picker="true"
                    :minSelDays="1"
                    :marked-dates="markedDates"
                    :disabled-day-names="optimizeWeekDays(selectedWeekdays)"
                    :sundayStart="true"
                    v-model="date"
                    ref="calendar"
                    v-on:dayClicked="updateDontWorkDays($event)"
                    v-on:daychoseDay="updateDontWorkDays($event)"
                  />
                </template>
              </div>
              <div class="check-list ml-40">
                <div class="block">
                  <div class="check-field" @click="exEvery = !exEvery">
                    <img :src="`${iconUrl}Group 6258.svg`" v-if="exEvery" />
                    <img :src="`${iconUrl}Rectangle 1245.svg`" v-else />
                    <span :class="{ checked: exEvery }">Every:</span>
                  </div>
                  <div class="cdropdown ml-30" v-if="exEvery" @click="isWeekday = !isWeekday" style="margin-left: 3rem">
                    <span>Select Day</span>
                    <img :src="`${iconUrl}Asset 519.svg`" />
                  </div>
                  <div class="cdropdown-cont" v-if="isWeekday && exEvery" style="margin-left: 3rem">
                    <div class="weekdays" v-for="(w, wIndex) in weekdays" :key="wIndex" @click="updateWeekdays(w)">
                      <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="selectedWeekdays.includes(w)" />
                      <span class="unchecked" v-else></span>
                      {{ w }}
                    </div>
                  </div>
                </div>
                <div class="block border">
                  <div class="check-field" @click="exDont = !exDont">
                    <img :src="`${iconUrl}Group 6258.svg`" v-if="exDont" />
                    <img :src="`${iconUrl}Rectangle 1245.svg`" v-else />
                    <span :class="{ checked: exDont }">I don't work on these holidays:</span>
                  </div>
                  <div class="cdropdown" v-if="exDont" @click="isReligion = !isReligion" style="margin-left: 3rem">
                    <span>Religion</span>
                    <img :src="`${iconUrl}Asset 519.svg`" />
                  </div>
                  <div class="cdropdown-cont" v-if="isReligion && exDont" style="margin-left: 3rem">
                    <div class="weekdays" v-for="(r, rIndex) in religions" :key="rIndex" @click="updateReligion(r)">
                      <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="selectedReligion.includes(r)" />
                      <span class="unchecked" v-else></span>
                      {{ r.name }}
                    </div>
                  </div>
                  <div
                    class="holidays"
                    v-for="(r, rIndex) in religions"
                    :key="rIndex"
                    :class="{ 'mt-1': selectedReligion.includes(r) }"
                  >
                    <template v-if="exDont && isReligion && selectedReligion.includes(r)">
                      <div class="dont">
                        <img :src="`${iconUrl}Asset 524.svg`" />
                      </div>
                      <div class="flex-1">
                        <ul>
                          <li v-for="(h, hIndex) in r.holidays" :key="hIndex">
                            <div class="check-field" @click="updateExDonts(h)">
                              <img :src="`${iconUrl}Group 6258.svg`" v-if="exDonts.includes(h)" />
                              <img :src="`${iconUrl}Rectangle 1245.svg`" v-else />
                              <span :class="{ checked: exDonts.includes(h) }">{{ h }}</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="block">
                  <div class="title">Additional Limitations</div>
                  <div class="check-field" @click="exLimitation = !exLimitation">
                    <img :src="`${iconUrl}Group 6258.svg`" v-if="exLimitation" />
                    <img :src="`${iconUrl}Rectangle 1245.svg`" v-else />
                    <span :class="{ checked: exLimitation }">Everyday between these hours:</span>
                  </div>
                  <div class="exLimitation" v-if="exLimitation">
                    <div class="select-time-cont">
                      <img :src="`${iconUrl}Asset 522.svg`" />
                      <vue-timepicker
                        manual-input
                        input-class="time-class"
                        hide-dropdown
                        format="hh:mm"
                        v-model="startTime"
                        hide-clear-button
                        v-on:input="updateDontWorkTime"
                        v-on:change="updateDontWorkTime"
                      />
                      <div class="am-field" @click="updateStartA()">
                        <input type="text" v-model="amPack.start" readonly />
                      </div>
                      <div class="border-line"></div>
                      <vue-timepicker
                        manual-input
                        input-class="time-class"
                        hide-dropdown
                        format="hh:mm"
                        v-model="endTime"
                        hide-clear-button
                        v-on:input="updateDontWorkTime"
                        v-on:change="updateDontWorkTime"
                      />
                      <div class="am-field" @click="updateEndA()">
                        <input type="text" v-model="amPack.end" readonly />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import VueElementLoading from "vue-element-loading";
import Vendors from "@/models/Vendors";

//COMPONENTS
import Icon from "@/components/Icon/Icon.vue";
import VendorServiceItem from "./VendorServiceItem.vue";
import VSignupAddRules from "@/components/Inputs/VSignupAddRules.vue";
import TimePicker from "@/components/Inputs/TimePicker";
// import VSignupTimeSelect from '@/components/Inputs/VSignupTimeSelect.vue'
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import { FunctionalCalendar } from "vue-functional-calendar";
import VueGoogleAutocomplete from "vue-google-autocomplete";
const christanHolidaysAPI =
  "https://www.googleapis.com/calendar/v3/calendars/en.christian%23holiday%40group.v.calendar.google.com/events?key=AIzaSyC4qrUfpIKpm5yZ1p7wGJAxa77PJwlgKD8";
const jewishHolidaysAPI =
  "https://www.googleapis.com/calendar/v3/calendars/en.jewish%23holiday%40group.v.calendar.google.com/events?key=AIzaSyC4qrUfpIKpm5yZ1p7wGJAxa77PJwlgKD8";
const muslimHolidaysAPI =
  "https://www.googleapis.com/calendar/v3/calendars/en.islamic%23holiday%40group.v.calendar.google.com/events?key=AIzaSyC4qrUfpIKpm5yZ1p7wGJAxa77PJwlgKD8";
const hinduHolidaysAPI =
  "https://www.googleapis.com/calendar/v3/calendars/en.islamic%23holiday%40group.v.calendar.google.com/events?key=AIzaSyC4qrUfpIKpm5yZ1p7wGJAxa77PJwlgKD8";

export default {
  name: "vendor-signup-step3",
  props: {
    categories: Array,
    icon: String,
    vendor: Object,
  },
  components: {
    VueElementLoading,
    VendorServiceItem,
    VSignupAddRules,
    FunctionalCalendar,
    VueTimepicker,
  },
  data() {
    return {
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
      allowThirdVendor: null,
      workAllDay: false,
      date: {},
      rulesDesc: {
        title: "additional rules",
        placeholder: "Event muse end before.. / Suitable for children (2-12 years)",
      },
      policyDesc: {
        title: "Add steps to your cancellation approch:",
        subTitle: "You can add more than one step",
        labels: {
          if: "the client cancel the event after:",
          than: "the client wil pay:",
        },
        placeholder: "Like two weeks before the event ",
        // placeholder: {
        //   if: 'Like two weeks before the event ',
        //   than: 'Like: 30% of deposit',
        // },
      },
      yesRules: [],
      noRules: [],
      yesPolicies: [],
      noPolicies: [],
      noteRules: [],
      religions: [
        {
          name: "Chrisitanity",
          holidays: ["Good Friday", "Easter", "Christmas", "Thanksgiving"],
          url: christanHolidaysAPI,
        },
        {
          name: "Hindu",
          holidays: ["Ganesh Chaturthi", "Pitru Paksha", "Mysore Dasara", "Navratri", "Vijayadashami", "Durga Puja"],
          url: hinduHolidaysAPI,
        },
        {
          name: "Islamic",
          url: muslimHolidaysAPI,
          holidays: [
            "All Islamic holiday",
            "Eid AI-Acha",
            "Eid AI-Fitr",
            "Lailat al Miraj",
            "Milad un Nabi(Shia)",
            "Ramadan(start)",
            "Laylat at Qadr",
            "Eid-ai-Fitr(End of Ramadan)",
            "Waqf ai Arafa - Hajj",
            "Hijra - Islamic New Year",
            "Day of Ashura / Muharram",
            "Milad un Nabi",
            "All Islamic holidays (Shia)",
          ],
        },
        {
          name: "Judaism",
          url: jewishHolidaysAPI,
          holidays: [
            "Rosh Hashana",
            "Yom Kipur",
            "Sukkot",
            "Shmini Atzeret",
            "Simchat Torah",
            "Chanukah",
            "Purim",
            "Pesach",
            "Shavout",
            `Tish'a B'Av`,
          ],
        },
      ],
      markedDates: [
        // "16/6/2020",
      ],
      componentKey: 0,
      allowedCategoryFor3rd: ["venuerental", "foodandbeverage", "decor", "entertainment"],
      weekdays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      selectedWeekdays: [],
      selectedReligion: [],
      isWeekday: false,
      exEvery: false,
      exDont: false,
      isReligion: false,
      exLimitation: false,
      exDonts: [],
      notAllowed: [],
      isOtherNa: false,
      startTime: {
        hh: "12",
        mm: "00",
      },
      endTime: {
        hh: "12",
        mm: "00",
      },
      amPack: {
        start: "AM",
        end: "AM",
      },
      defNa: [
        {
          name: "Food & Beverage",
          value: "foodandbeverage",
        },
        {
          name: "Design and Decor",
          value: "decor",
        },
        {
          name: "Entertainment",
          value: "entertainment",
        },
        {
          name: "Security",
          value: "securityservices",
        },
        {
          name: "Videography and Photography",
          value: "videographyandphotography",
        },
        {
          name: "Equipment Rental",
          value: "equipmentrentals",
        },
        {
          name: "Staffing and Guest Services",
          value: "staffingandguestservices",
        },
        {
          name: "Rentals",
          value: "rentals",
        },
        {
          name: "Other",
          value: "Other",
        },
      ],
      policies: [
        {
          category: "venuerental",
          items: [
            // {
            //   name: 'Allowed use of outside vendors',
            //   type: Boolean,
            // },

            {
              name: "Suitable for infants",
              type: Boolean,
              hasComment: true,
            },
            {
              name: "Audio restrictions",
              type: Boolean,
              hasComment: true,
            },
            {
              name: "Decor restrictions",
              type: Boolean,
              hasComment: true,
            },
            {
              name: "Dress code",
              type: Boolean,
              hasComment: true,
            },
            {
              name: "Minimum Spend",
              type: Boolean,
              hasComment: true,
            },
            {
              name: "Dry Hire",
              type: Boolean,
              hasComment: true,
            },
            {
              name: "Pets",
              type: Boolean,
              hasComment: true,
            },
          ],
        },
        {
          category: "foodandbeverage",
          items: [
            {
              name: "Tastings prior to booking",
              type: Number,
            },
            {
              name: "Allow customer provided liquor",
              type: Boolean,
            },
          ],
        },
        {
          category: "decor",
          items: [
            {
              name: "Room temperature constraints",
              type: String,
            },
            {
              name: "Flexible time requirement for setup",
              type: String,
            },
          ],
        },
        {
          category: "corporatesocialresponsibility",
          items: [
            {
              name: "Minimum hour of service",
              type: Number,
              noSuffix: true,
              hasComment: true,
            },
            {
              name: "Max guest to staff ratio",
              type: Number,
              isPercentage: true,
            },
          ],
        },
        {
          category: "signageprinting",
          items: [],
        },
        {
          category: "advertising-promotion",
          items: [],
        },
        {
          category: "equipmentrentals",
          items: [],
        },
        {
          category: "audiovisualstagingservices",
          items: [
            {
              name: "Accept staff attire request",
              type: Boolean,
            },
            {
              name: "Simulcasting bandwidth requirements",
              type: Number,
            },
            {
              name: "Union crew restrictions",
              type: Boolean,
              hasComment: true,
            },
          ],
        },
        {
          category: "swags",
          items: [
            {
              name: "Allow pickup",
              type: Boolean,
            },
            {
              name: "Minimum size order",
              type: String,
            },
          ],
        },
        {
          category: "shipping",
          items: [],
        },
        {
          category: "transportation",
          items: [],
        },
        {
          category: "entertainment",
          items: [
            {
              name: "Accept requests from guests",
              type: Boolean,
              hasComment: true,
            },
            {
              name: "Continuous band play time",
              type: Boolean,
              hasComment: true,
            },
            {
              name: "Max group size",
              type: Number,
              noSuffix: true,
            },
            {
              name: "Accessibility of activity",
              type: String,
            },
            {
              name: "Age restrictions",
              type: Boolean,
            },
            {
              name: "Time of day",
              type: "Selection",
              options: ["morning", "after noon", "evening", "night"],
              value: "",
            },
            {
              name: "Performer require a meal",
              type: Boolean,
            },
            {
              name: "Minimum Setup time required",
              type: Number,
              noSuffix: true,
            },
            {
              name: "Number of breaks",
              type: Number,
            },
            // {
            //   name: "Additional requirements from venue",
            //   type: String,
            // },
            // {
            //   name: "Power supply needs",
            //   type: String,
            // },
            {
              name: "Flexible to different dress codes",
              type: String,
            },
            {
              name: "Meet before signing contract",
              type: Boolean,
              hasComment: true,
            },
            {
              name: "Arrival onsite before the event",
              type: Number,
              noSuffix: true,
            },
            {
              name: "Losgistics",
              type: Boolean,
            },
          ],
        },
        {
          category: "administration",
          items: [],
        },
        {
          category: "securityservices",
          items: [
            {
              name: "Visit the venue in advance",
              type: Boolean,
            },
            {
              name: "Minimum hours of service",
              type: Number,
              noSuffix: true,
            },
            {
              name: "Max hours per shift",
              type: Number,
              noSuffix: true,
            },
            {
              name: "Dress code",
              type: String,
              hasComment: true,
            },
          ],
        },
        {
          category: "technologyservices",
          items: [],
        },
        {
          category: "videographyandphotography",
          items: [
            {
              name: "Flexible to last minute onsite changes",
              type: Boolean,
            },
            {
              name: "Minimum amount of hours",
              type: Number,
              noSuffix: true,
            },
            {
              name: "Need to control room lighting",
              type: Boolean,
            },
            {
              name: "Minimum internet bandwidth (Simulticasting, Streaming)",
              type: Number,
            },
            {
              name: "Flexibility to operate with additional Photo / Video companies during the event",
              type: Boolean,
            },
          ],
        },
      ],
      pricingPolicies: [
        {
          category: "venuerental",
          items: [
            {
              name: "Minimum amount of hours",
              type: Number,
              noSuffix: true,
              hasComment: true,
            },
            {
              name: "Hours included in rental",
              type: Number,
              noSuffix: true,
            },
            {
              name: "Setup hours included in rental",
              type: Boolean,
              type: Number,
              noSuffix: true,
            },
            {
              name: "Cost Extra Guest (beyond agreed upon)",
              type: Number,
            },
            {
              name: "Overtime Cost",
              type: Number,
              units: ["Per hour", "All togeter"],
            },
            {
              name: "Cost Late Night Fares",
              type: Number,
              hasUnit: true,
              units: ["Per person", "All together"],
            },
            {
              name: "Discount for large quantities",
              type: Number,
              isPercentage: true,
              hasComment: true,
              attendees: null,
            },
            {
              name: "Tax rate",
              type: Number,
              isPercentage: true,
            },
            {
              name: "Suggested Gratuity",
              type: Number,
              isPercentage: true,
            },
          ],
        },
        {
          category: "foodandbeverage",
          items: [
            {
              name: "Travel cost",
              type: Boolean,
            },
            {
              name: "Pickup",
              type: Boolean,
            },
            {
              name: "Cleanup",
              type: Boolean,
            },
            {
              name: "Breakdown",
              type: "Including",
            },
            {
              name: "Discount for large quantities",
              type: Boolean,
              isPercentage: true,
              hasComment: true,
            },
            {
              name: "Cost Late Night Fares",
              type: Boolean,
              hasComment: true,
            },
            {
              name: "Discount for large quantities",
              type: Number,
              isPercentage: true,
              hasComment: true,
              attendees: null,
            },
            {
              name: "Tax rate",
              type: Number,
              isPercentage: true,
            },
            {
              name: "Suggested Gratuity",
              type: Number,
            },
          ],
        },
        {
          category: "decor",
          items: [
            {
              name: "Delivery",
              type: Number,
            },
            {
              name: "Setup",
              type: Number,
            },
            {
              name: "Working with unions",
              type: Boolean,
            },
            {
              name: "Discounts for large quantities",
              type: Boolean,
              attendees: null,
            },
            {
              name: "Tax rate",
              type: Number,
              isPercentage: true,
            },
            {
              name: "Suggested Gratuity",
              type: Number,
            },
          ],
        },
        {
          category: "corporatesocialresponsibility",
          items: [
            {
              name: "Travel distance to event",
              type: Number,
            },
            {
              name: "Special attire requests",
              type: Number,
            },
            {
              name: "Last minute requests",
              type: Boolean,
            },
            {
              name: "Discount for large quantities",
              type: Boolean,
              attendees: null,
            },
            {
              name: "Tax rate",
              type: Number,
              isPercentage: true,
            },
            {
              name: "Suggested Gratuity",
              type: Number,
              noSuffix: true,
            },
          ],
        },
        {
          category: "signageprinting",
          items: [],
        },
        {
          category: "advertising-promotion",
          items: [],
        },
        {
          category: "equipmentrentals",
          items: [],
        },
        {
          category: "audiovisualstagingservices",
          items: [
            {
              name: "Rushed job",
              type: Number,
            },
            {
              name: "Overtime",
              type: Number,
            },
            {
              name: "Tax rate",
              type: Number,
              isPercentage: true,
            },
            {
              name: "Discounts",
              type: Boolean,
            },
            {
              name: "Suggested Gratuity",
              type: Number,
            },
          ],
        },
        {
          category: "swags",
          items: [
            {
              name: "Rushed orders",
              type: Boolean,
            },
            {
              name: "Delivery",
              type: Boolean,
            },
            {
              name: "preparing file for printing",
              type: Boolean,
            },
            {
              name: "Multiple print locations",
              type: Boolean,
            },
            {
              name: "Number of different colors",
              type: Boolean,
            },
            {
              name: "Tax rate",
              type: Number,
              isPercentage: true,
            },
            {
              name: "Discount for large quantites",
              type: Boolean,
              attendees: null,

            },
            {
              name: "Suggested Gratuity",
              type: Number,
            },
          ],
        },
        {
          category: "shipping",
          items: [],
        },
        {
          category: "transportation",
          items: [
            {
              name: "Tax rate",
              type: Number,
              isPercentage: true,
            },
            {
              name: "Large setup discounts",
              type: Boolean,
            },
            {
              name: "Suggested Gratuity",
              type: Number,
            },
          ],
        },
        {
          category: "entertainment",
          items: [
            {
              name: "Hours included in service",
              subCategory: "charge",
              type: Number,
              value: 0,
              hasComment: true,
              noSuffix: true,
            },
            {
              name: "Rushed setup",
              subCategory: "charge",
              type: "Including",
              value: true,
              cost: "0.00",
            },
            {
              name: "Rehersal time for the band (for special requests)",
              subCategory: "charge",
              type: "Including",
              value: true,
              cost: "0.00",
            },
            {
              name: "Special operating time",
              subCategory: "charge",
              type: "Selection",
              options: ["morning", "afternoon", "evening"],
              value: "",
            },
            {
              name: "Extra for prizes",
              subCategory: "charge",
              type: Number,
              hasComment: true,
            },
            {
              name: "Overtime charges",
              subCategory: "charge",
              type: "Cost",
              value: "",
              unit: "hour",
            },
            {
              name: "Tax rate",
              subCategory: "tax",
              type: Number,

              isPercentage: true,
            },
            {
              name: "Large group discounts",
              subCategory: "discount",
              type: "Discount",
              hasUnit: true,
              units: ["Per guest", "Total"],
            },
            {
              name: "Suggested Gratuity",
              subCategory: "tips",
              type: Number,
            },
          ],
        },
        {
          category: "administration",
          items: [],
        },
        {
          category: "securityservices",
          items: [
            {
              name: "Pre-selection personal",
              type: "Including",
              value: true,
              cost: "0.00",
            },
            {
              name: "Number of hours",
              type: Number,
              noSuffix: true,
            },
            {
              name: "Level of security training/certification",
              type: String,
            },
            {
              name: "Special attire requests",
              type: Boolean,
              hasComment: true,
            },
            {
              name: "Tax rate",
              type: Number,
              isPercentage: true,
            },
            {
              name: "Large group discounts",
              type: "Discount",
              units: ["per guest", "total"],
            },
            {
              name: "Suggested Gratuity",
              type: Number,
            },
          ],
        },
        {
          category: "technologyservices",
          items: [],
        },
        {
          category: "videographyandphotography",
          items: [
            {
              name: "Overtime charge",
              type: Number,
            },
            {
              name: "Travel to multiple location",
              type: Number,
            },
            {
              name: "Over number of pictures taken",
              type: Number,
            },
            {
              name: "Discount for large discounts",
              type: Boolean,
              attendees: null,
            },
            {
              name: "Tax rate",
              type: Number,
              isPercentage: true,
            },
            {
              name: "Suggested Gratuity",
              type: Number,
            },
          ],
        },
      ],
      vendorPolicies: {},
      vendorPricingPolicies:{},
    };
  },
  created() {},
  mounted() {
    console.log("vendor.signup.step3.mounted", this.vendor);

    this.vendorPricingPolicies = this.pricingPolicies.find(p => p.category == this.vendor.vendorCategory);
    if ( this.vendor.pricingPolicies && this.vendor.pricingPolicies.length) {
      this.$set(this.vendorPricingPolicies, 'items', this.vendor.pricingPolicies)
    }
    console.log("vendor.signup.step3.mounted", this.vendorPricingPolicies);
    this.religions.forEach((religion) => {
      this.$http
        .get(religion.url, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "",
            Referer: "*",
            "Content-Type": "jsonp",
          },
        })
        .then((res) => {
          console.log(res);
        });
    });
    if (this.vendor.selectedWeekdays) {
      if (this.vendor.selectedWeekdays.length > 0) {
        this.selectedWeekdays = this.vendor.selectedWeekdays;
      } else {
        this.selectedWeekdays = ["saturday", "sunday"];
      }
    }

    if (this.vendor.dontWorkDays) {
      if (this.vendor.dontWorkDays.selectedDates.length > 0) {
        this.markedDates = [];
        _.each(this.vendor.dontWorkDays.selectedDates, (sd) => {
          this.markedDates.push(sd.date);
        });
      }
    }

    this.optimizeWeekDays(this.selectedWeekdays);
    this.componentKey += 1;
    this.$forceUpdate();
  },
  methods: {
    updateExDonts(item) {
      if (this.exDonts.includes(item)) {
        this.exDonts = this.exDonts.filter((d) => d != item);
      } else {
        this.exDonts.push(item);
      }
      this.$root.$emit("update-vendor-value", "exDonts", this.exDonts);
    },
    updateNa(item) {
      if (this.notAllowed.includes(item)) {
        this.notAllowed = this.notAllowed.filter((n) => n != item);
      } else {
        this.notAllowed.push(item);
      }
      this.$root.$emit("update-vendor-value", "notAllowed", this.notAllowed);
    },
    yesRule(item) {
      if (this.yesRules.includes(item)) {
        this.yesRules = this.yesRules.filter((n) => n != item);
      } else {
        this.noRules = this.noRules.filter((n) => n != item);
        this.yesRules.push(item);
      }
      this.$root.$emit("update-vendor-value", "yesRules", this.yesRules);
      this.$root.$emit("update-vendor-value", "noRules", this.noRules);
    },
    noRule(item) {
      if (this.noRules.includes(item)) {
        this.noRules = this.noRules.filter((n) => n != item);
      } else {
        this.yesRules = this.yesRules.filter((n) => n != item);
        this.noRules.push(item);
      }
      this.$root.$emit("update-vendor-value", "yesRules", this.yesRules);
      this.$root.$emit("update-vendor-value", "noRules", this.noRules);
    },
    yesPolicy(item) {
      console.log(item);
      if (this.yesPolicies.includes(item)) {
        this.yesPolicies = this.yesPolicies.filter((n) => n != item);
      } else {
        this.noPolicies = this.noPolicies.filter((n) => n != item);
        this.yesPolicies.push(item);
      }
      this.$root.$emit("update-vendor-value", "yesPolicies", this.yesPolicies);
      this.$root.$emit("update-vendor-value", "noPolicies", this.noPolicies);
    },
    noPolicy(item) {
      if (this.noPolicies.includes(item)) {
        this.noPolicies = this.noPolicies.filter((n) => n != item);
      } else {
        this.yesPolicies = this.yesPolicies.filter((n) => n != item);
        this.noPolicies.push(item);
      }
      this.$root.$emit("update-vendor-value", "yesPolicies", this.yesPolicies);
      this.$root.$emit("update-vendor-value", "noPolicies", this.noPolicies);
    },
    noteRule(item) {
      if (this.noteRules.includes(item)) {
        this.noteRules = this.noteRules.filter((n) => n != item);
      } else {
        this.noteRules.push(item);
      }
    },
    updateWeekdays(item) {
      if (this.selectedWeekdays.includes(item)) {
        this.selectedWeekdays = this.selectedWeekdays.filter((s) => s != item);
      } else {
        this.selectedWeekdays.push(item);
      }
      this.componentKey += 1;
      this.$root.$emit("update-vendor-value", "selectedWeekdays", this.selectedWeekdays);
    },
    updateReligion(item) {
      if (this.selectedReligion.includes(item)) {
        this.selectedReligion = this.selectedReligion.filter((s) => s != item);
      } else {
        this.selectedReligion.push(item);
      }
      this.$root.$emit("update-vendor-value", "selectedReligion", this.selectedReligion);
    },
    updateDontWorkDays() {
      this.$root.$emit("update-vendor-value", "dontWorkDays", this.date);
    },
    updateStartA() {
      if (this.amPack.start == "AM") {
        this.amPack.start = "PM";
      } else {
        this.amPack.start = "AM";
      }
    },
    updateEndA() {
      if (this.amPack.end == "AM") {
        this.amPack.end = "PM";
      } else {
        this.amPack.end = "AM";
      }
    },
    updateDontWorkTime() {
      this.$root.$emit("update-vendor-value", "dontWorkTime", {
        startTime: this.startTime,
        endTime: this.endTime,
        amPack: this.amPack,
      });
    },
    optimizeWeekDays(weekDays) {
      let res = [];
      const wds = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

      if (weekDays) {
        weekDays.forEach((wd) => {
          res.push(wds[(wds.indexOf(this.capitalize(wd.slice(0, 2))) + 6) % 7]);
        });
      }

      return res;
    },
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    setPricePolicy(e, name, value) {
      console.log("setPricePolicy", name, value);
      if ( name ) {
        let p = this.vendorPricingPolicies.items.find(it => it.name == name);
        p.value = value;
      }
      console.log('setPricePolicy', this.vendorPricingPolicies);
      this.$root.$emit("update-vendor-value", "pricingPolicies", this.vendorPricingPolicies.items);
    },
  },
  computed: {},
  filters: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
.vendor-signup-step3-wrapper {
  font-family: Manrope-Regular, sans-serif;

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
      }
      h2 {
        margin: 30px 0;
        font: 800 40px Manrope-Regular, sans-serif;
      }
      h3 {
        margin: 0;
        color: #f51355;
        font: bold 20px Manrope-Regular, sans-serif;
      }
    }
    .right-side {
      flex: 4;

      .card {
        font-family: Manrope-Regular, sans-serif;
        color: #050505;
        background: #ffffff;
        -webkit-box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        padding: 60px;
        margin-bottom: 2rem;

        .field {
          font: 800 16px Manrope-Regular, sans-serif;
          margin: 0 0 2rem 0;
          .label {
            margin-bottom: 0.5rem;
            img {
              width: 24px;
              margin-right: 0.5rem;
            }
            span {
              text-transform: capitalize;
            }
          }
          input {
            font-size: 16px;
            padding: 22px 30px;
            min-width: 75%;
            border: 1px solid #707070;
            border-radius: 0;
          }
          .main-cont {
            display: flex;
            align-items: center;

            .suffix {
              flex: 3;
              input {
                padding-left: 45%;
                width: 100%;
              }
              &:before {
                position: absolute;
                margin-top: 12px;
                margin-left: 1.5rem;
              }
              &:first-child {
                &:before {
                  content: "Min";
                }
              }
              &:last-child {
                &:before {
                  content: "Max";
                }
              }
            }
            .arrow {
              flex: 1;
              text-align: center;
              img {
                width: 3rem;
              }
            }
          }
        }
        .checks-cont {
          display: flex;
          justify-content: flex-start;
          .check-item {
            display: flex;
            align-items: center;
            margin-right: 5rem;
            cursor: pointer;

            img {
              width: 30px;
              height: 30px;
              margin-right: 14px;
            }
          }
          span {
            &.unchecked {
              display: inline-block;
              width: 30px;
              height: 30px;
              border: 1px solid #707070;
              border-radius: 50%;
              background: #ffffff;
              margin-right: 14px;
            }
          }
        }
        .not-allow-cont {
          margin-top: 3rem;
          h4 {
            font: bold 16px Manrope-Regular, sans-serif;
          }
          .na-check-list {
            ul {
              margin: 0;
              list-style: none;
              padding: 0;
              display: grid;
              grid-template-columns: 30% 25% 25% 20%;
              li {
                margin-bottom: 1rem;
                cursor: pointer;
                // display: flex;
                img {
                  width: 27px;
                  height: 27px;
                  margin-right: 0.5rem;
                }
                input {
                  font-size: 16px;
                  padding: 22px 30px;
                  min-width: 75%;
                  border: 1px solid #dddddd;
                  border-radius: 0;
                }
              }
            }
          }
        }
        h5 {
          font: 800 16px Manrope-Regular, sans-serif;
        }
      }
    }
  }
  .title-cont {
    img {
      width: 24px;
      margin-right: 0.5rem;
    }
    h5 {
      text-transform: capitalize;
      font: 800 16px Manrope-Regular, sans-serif;
      margin: 0;
    }
    p {
      margin: 0;
      font: normal 14px Manrope-Regular, sans-serif;
    }
    .left,
    .right {
      margin: 0;
      display: inline-block;
    }
    .left {
      margin: 0 1rem 2rem 0;
    }
    .top,
    .bottom {
      margin-bottom: 0.5rem;
    }
  }
  .calendar-cont {
    display: flex;
    padding: 2rem 0;

    .calendar {
      flex: 1;
      border: solid 1px #a0a0a0;
      height: max-content;
      .calendar-title {
        position: absolute;
        z-index: 999;
        margin: 1.5rem;
        font: normal 16px Manrope-Regular, sans-serif;
      }
      /deep/ .vfc-main-container {
        padding-top: 3rem;
        width: 100%;
      }
      /deep/ .vfc-top-date {
        a {
          text-decoration: none !important;
          font: 600 16px Manrope-Regular, sans-serif;
          color: #050505;
        }
      }
      /deep/ .vfc-arrow-left,
      /deep/ .vfc-arrow-right {
        width: 10px;
        height: 10px;
        color: #f51355;
        border-color: #f51355;
        border-top: 3px solid;
      }
      /deep/ .vfc-arrow-left {
        border-left: 3px solid;
      }
      /deep/ .vfc-arrow-right {
        border-right: 3px solid;
      }
      /deep/ .vfc-dayNames {
        .vfc-day {
          color: #a0a0a0;
          font: 800 14px Manrope-Regular, sans-serif;
        }
      }
      /deep/ .vfc-span-day {
        font: normal 16px Manrope-Regular, sans-serif;
        // padding: 6px 0;
      }
      /deep/ .vfc-base-start,
      .vfc-base-end {
        background: #f51355;
        color: #ffffff;
      }
      /deep/ span.vfc-span-day {
        &.vfc-marked {
          // width: 30px;
          // height: 30px;
          &:before {
            // background-color: #f51355;
            color: #ffffff;
            // border-radius: 50%;
          }
        }
      }
      /deep/ .vfc-span-day.vfc-start-marked {
        background-color: #fc1355;
        color: #ffffff;
        z-index: 200;

        &:before {
          border-top-left-radius: 50%;
          border-bottom-left-radius: 50%;
        }
      }
      /deep/ .vfc-span-day.vfc-end-marked {
        &:before {
          border-top-right-radius: 50%;
          border-bottom-right-radius: 50%;
        }
      }
      /deep/ .vfc-week .vfc-day .vfc-base-end {
        background-color: #fc1355;
        color: #ffffff;
      }
      /deep/ .vfc-week .vfc-day span.vfc-span-day.vfc-hovered {
        background-color: #fc1355;
        color: #ffffff;
      }
      /deep/ .vfc-today {
        background-color: #ffd9e4;
        color: #f51355;
        font: 600 14px Manrope-Regular, sans-serif;
      }
      /deep/ span.vfc-span-day {
        &.vfc-marked {
          background-color: #f51355;
          color: #ffffff;
        }
      }
      /deep/ span.vfc-cursor-not-allowed {
        // background-color: #f51355;
        color: #fff !important;
        background-color: #f51355;
        // height: 30px;
      }
    }
    .check-list {
      flex: 2;
      margin-right: 2rem;

      .block {
        padding: 1rem 0;
        .title {
          margin-bottom: 1rem;
        }
        .check-field {
          cursor: pointer;
          img {
            width: 27px;
            margin-right: 0.5rem;
          }
          span {
            &.checked {
              font: 600 16px Manrope-Regular, sans-serif;
            }
          }
        }
        .holidays {
          display: flex;

          .dont {
            width: 24px;
            margin-right: 1rem;
            img {
              width: 24px;
            }
          }
          ul {
            padding: 0;
            list-style: none;
            margin: 0;
            display: grid;
            grid-template-columns: 50% 50%;

            li {
              margin-bottom: 1rem;
            }
          }
        }
        .cdropdown {
          border: 1px solid #818080;
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 3rem;
          margin: 1rem 0;
          border-radius: 3px;
          text-align: center;
          cursor: pointer;
          max-width: 250px;

          span {
            flex: 5;
            display: inline-block;
          }
          img {
            width: 8px;
            margin-left: 1rem;
            transform: rotate(90deg);
          }
        }
        .cdropdown-cont {
          border: 1px solid #050505;
          -webkit-box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
          box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
          max-width: 250px;
          padding: 1rem;
          margin-top: -1rem;

          .weekdays {
            text-transform: capitalize;
            display: flex;
            cursor: pointer;
            margin-bottom: 0.5rem;
            img {
              width: 24px;
              height: 24px;
              margin-right: 1rem;
            }
            span {
              display: inline-block;
              width: 24px;
              height: 24px;
              border: 1px solid #050505;
              border-radius: 50%;
              margin-right: 1rem;
            }
            &.last-child {
              margin-bottom: 0;
            }
          }
        }
        .exLimitation {
          .select-time-cont {
            display: flex;
            align-items: center;
            margin: 1rem 0 0 3rem;

            img {
              width: 18px;
              height: 18px;
              margin-right: 1rem;
            }
            .border-line {
              background: black;
              width: 1rem;
              height: 2px;
              margin: 0 1rem;
            }
            .am-field {
              position: relative;
              cursor: pointer;
              input {
                width: 56px;
                height: 45px;
                cursor: pointer;
                border-radius: 3px;
                font: normal 18px Manrope-Regular, sans-serif;
                margin-left: 0.5rem;
                border: 1px solid #707070;
                text-align: center;
              }
              &:before {
                position: absolute;
                content: ">";
                transform: translateX(50%) translateY(calc(100% + 1.2rem)) rotate(90deg);
                left: 40%;
                font-size: 20px;
                font-weight: 800;
              }
            }
            /deep/ .time-picker {
              width: unset;
              input {
                text-align: center;
                width: 110px;
                height: 45px;
                border-radius: 3px;
                font: normal 18px Manrope-Regular, sans-serif;
                border: 1px solid #707070;
                text-align: center;
              }
            }
          }
        }
        &.border {
          border-top: 1px solid #dddddd;
          border-bottom: 1px solid #dddddd;
        }
      }
    }
  }
  .w-16 {
    width: 16px !important;
  }
  .mb-50 {
    margin-bottom: 3rem !important;
  }
  .m-0 {
    margin: 0 !important;
  }
  .mt-1 {
    margin-top: 1rem;
  }
  .mt-2 {
    margin-top: 2rem;
  }
  .ml-title {
    padding: 1rem 0;
    background-color: #ededed;
    width: calc(75% + 60px);
    margin-left: -60px !important;
    padding-left: 60px;

    h4 {
      margin: 0;
      text-transform: capitalize;
      font: 800 16px Manrope-Regular, sans-serif;
    }
  }
  .rules {
    margin-bottom: 3rem;
    .rule {
      padding: 2rem 0;
      border-bottom: 1px solid #dddddd;
      font: 600 16px Manrope-Regular, sans-serif;

      &:first-child {
        padding-top: 0;
      }
      display: flex;
      justify-content: flex-start;
      .left {
        flex: 1;
      }
      .v-grid-with-desc {
        display: grid;
        grid-template-rows: 20% 80%;
      }
      .right {
        flex: 1;
        .top {
          display: flex;
          align-items: top;

          .item {
            display: flex;
            justify-content: flex-start;
            margin-right: 2rem;
            text-align: right;
            cursor: pointer;

            span {
              &.unchecked {
                display: inline-block;
                width: 30px;
                height: 30px;
                border: 1px solid #707070;
                border-radius: 50%;
                background: #ffffff;
                margin-right: 14px;
                position: relative;
                top: -4px;
              }
            }
            img {
              width: 30px;
              height: 30px;
              margin-right: 1rem;
              position: relative;
              top: -4px;
            }
            a {
              font: 800 16px Manrope-Regular, sans-serif;
              cursor: pointer;
              &.note {
                color: #f51355;
              }
              &.cancel {
                color: #050505;
              }
            }
            &:last-child {
              margin-right: 0;
            }
            textarea {
              width: 100% !important;
            }
            &.noflex {
              flex: 1;
              display: inline-block;
              cursor: none;
            }
          }
        }
        .bottom {
          margin-top: 2rem;
          span {
            font: normal 16px Manrope-Regular, sans-serif;
            margin-bottom: 1rem;
            display: inline-block;
          }
          .suffix {
            &:before {
              content: "$";
              position: absolute;
              font-size: 16px;
              color: #818080;
              margin-top: 13px;
              margin-left: 2rem;
            }
            &.percentage {
              &:before {
                content: "%";
              }
            }
            input {
              text-align: center;
              font-size: 16px;
              padding: 22px 30px;
              /*width: 40%;*/
              width: 12rem;
              border: 1px solid #dddddd;
              border-radius: 0;
            }
          }
          .number-field {
            text-align: center;
            font-size: 16px;
            padding: 22px 30px;
            /*width: 40%;*/
            width: 12rem;
            border: 1px solid #dddddd;
            border-radius: 0;
          }
        }
      }
    }
  }
  textarea {
    resize: none;
    width: 75%;
    padding: 1.5rem 2rem;
    font-size: 16px;

    &.desc {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
    }
  }
  .flex-1 {
    flex: 1;
  }
  .no-margin {
    margin: 0 !important;
  }
  .unit-select {
    border: 1px solid #dddddd;
    padding: 15px;
    font-size: 16px;
    color: #32325d;
    // #32325d;
    box-shadow: 0 1px 3px 0 #e6ebf1;
  }
}
.vfc-week .vfc-day span.vfc-span-day.vfc-marked {
  border: 1px solid black;
  margin: auto;
  background-color: #fc1355 !important;
  border-radius: 50%;
  opacity: 1;
  z-index: 1;
}
</style>
