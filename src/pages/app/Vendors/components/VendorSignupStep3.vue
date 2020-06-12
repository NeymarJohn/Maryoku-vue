<template>
  <div class="vendor-signup-step3-wrapper">
    <div class="inside-container">
      <div class="left-side">
        <img :src="`${iconUrl}Group 5224 (2).svg`"/>
        <h2>DISCLAMER & <br/>POLICY</h2>
        <p>Those elements will automatically appear on your future proposal</p>
        <h2>3/4</h2>
      </div>
      <div class="right-side">
        <div class="policy-wrapper mb-50">
          <div class="title-cont">
            <div class="top">
              <h5><img :src="`${iconUrl}Asset 560.svg`"/> Policy</h5>
            </div>
            <div class="bottom">
              <p>Set venue rules for your guests</p>
            </div>
          </div>
          <div class="card">
            <div class="rules">
              <div 
                class="rule" 
                v-for="(r, rIndex) in policies.filter(p => p.category == vendor.businessCategory)[0].items" 
                :key="rIndex"
              >
                <div class="left">
                  {{r.name}}
                </div>
                <div class="right">
                  <div class="top">
                    <template v-if="r.type==Boolean">
                      <div class="item" @click="yesRule(r)">
                        <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="yesRules.includes(r)"/>
                        <span class="unchecked" v-else></span>
                        Yes
                      </div>
                      <div class="item" @click="noRule(r)">
                        <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="noRules.includes(r)"/>
                        <span class="unchecked" v-else></span>
                        No
                      </div>
                    </template>
                    <template v-if="r.type==String">
                      <div class="item" v-if="!noteRules.includes(r)" @click="noteRule(r)">
                        <a class="note">
                          + Add Note
                        </a>
                      </div>
                      <div class="item noflex" v-else>
                        <textarea placeholder="Except from the parking area" rows="3"/>
                        <br/>
                        <a class="cancel" @click="noteRule(r)">
                          Cancel
                        </a>
                      </div>
                    </template>
                  </div>
                  <div class="bottom no-margin" v-if="r.type == Number">
                    <span>Price for every extra hour</span>
                    <br/>
                    <div class="suffix">
                      <input type="text" class="" placeholder="00.00"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <v-signup-add-rules
              :comType="`rule`"
              :title="rulesDesc"
            />
          </div>
        </div>
        <div class="pricing-policy-wrapper mb-50">
          <div class="title-cont">
            <div class="top">
              <h5><img :src="`${iconUrl}Asset 536.svg`"/> pricing policy</h5>
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
            </div> -->
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
            </div> -->
            <div class="rules">
              <div 
                class="rule" 
                v-for="(p, pIndex) in pricingPolicies.filter(p => p.category == vendor.businessCategory)[0].items" 
                :key="pIndex"
              >
                <div class="left">
                  {{p.name}}
                </div>
                <div class="right">
                  <div class="top">
                    <template v-if="p.type == Boolean">
                      <div class="item" @click="yesRule(p)">
                        <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="yesRules.includes(p)"/>
                        <span class="unchecked" v-else></span>
                        Yes
                      </div>
                      <div class="item" @click="noRule(p)">
                        <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="noRules.includes(p)"/>
                        <span class="unchecked" v-else></span>
                        No
                      </div>
                    </template>
                    <template v-if="p.type == String">
                      <div class="item" v-if="!noteRules.includes(p)" @click="noteRule(p)">
                        <a class="note">
                          + Add Note
                        </a>
                      </div>
                      <div class="item noflex" v-else>
                        <textarea placeholder="Except from the parking area" rows="3"/>
                        <br/>
                        <a class="cancel" @click="noteRule(p)">
                          Cancel
                        </a>
                      </div>
                    </template>
                  </div>
                  <div class="bottom no-margin" v-if="p.type == Number">
                    <span>Price for every extra hour</span>
                    <br/>
                    <div class="suffix">
                      <input type="text" class="" placeholder="00.00"/>
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
            </div> -->
          </div>
        </div>
        <div class="3rd-party-vendor-wrapper mb-50" v-if="vendor.businessCategory == 'venuerental'">
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
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="allowThirdVendor == 0"/>
                <span class="unchecked" v-else></span>
                <span>Yes</span>
              </div>
              <div class="check-item" @click="allowThirdVendor = 1">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="allowThirdVendor == 1"/>
                <span class="unchecked" v-else></span>
                <span>No</span>
              </div>
              <div class="check-item" @click="allowThirdVendor = 2">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="allowThirdVendor == 2"/>
                <span class="unchecked" v-else></span>
                <span>Some</span>
              </div>
            </div>
            <div class="not-allow-cont" v-if="allowThirdVendor==2">
              <h4>Which of the vendors do you not allow to work in your venue?</h4>
              <div class="na-check-list">
                <ul>
                  <li v-for="(n, nIndex) in defNa.split(', ')" :key="nIndex" @click="updateNa(n)">
                    <img :src="`${iconUrl}Group 5489 (4).svg`" v-if="notAllowed.includes(n)"/>
                    <img :src="`${iconUrl}Rectangle 1245.svg`" v-else/>
                    {{n}}
                  </li>
                  <li v-if="notAllowed.includes('Other')">
                    <input type="text" placeholder="Type vendor category..."/>
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
                <p>This way we kow not to send your irrelevant offers</p>
              </div>
            </div>
            <div class="checks-cont mt-2">
              <div class="check-item" @click="workAllDay = true">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="workAllDay"/>
                <span class="unchecked" v-else></span>
                <span>I work all the time</span>
              </div>
              <div class="check-item" @click="workAllDay = false">
                <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="!workAllDay"/>
                <span class="unchecked" v-else></span>
                <span>There are times I don't work ></span>
              </div>
            </div>
            <div class="calendar-cont" v-if="!workAllDay">
              <div class="check-list">
                <div class="block">
                  <div class="check-field" @click="exEvery=!exEvery">
                    <img :src="`${iconUrl}Group 6258.svg`" v-if="exEvery"/>
                    <img :src="`${iconUrl}Rectangle 1245.svg`" v-else/>
                    <span :class="{'checked': exEvery}">Every:</span>
                  </div>
                  <div class="cdropdown" v-if="exEvery" @click="isWeekday=!isWeekday">
                    <span>Select Day</span>
                    <img :src="`${iconUrl}Asset 519.svg`"/>
                  </div>
                  <div class="cdropdown-cont" v-if="isWeekday">
                    <div class="weekdays" v-for="(w, wIndex) in weekdays" :key="wIndex" @click="updateWeekdays(w)">
                      <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="selectedWeekdays.includes(w)"/>
                      <span class="unchecked" v-else></span>
                      {{w}}
                    </div>
                  </div>
                </div>
                <div class="block border">
                  <div class="check-field" @click="exDont=!exDont">
                    <img :src="`${iconUrl}Group 6258.svg`" v-if="exDont"/>
                    <img :src="`${iconUrl}Rectangle 1245.svg`" v-else/>
                    <span :class="{'checked': exDont}">I don't work on these holidays:</span>
                  </div>
                  <div class="cdropdown" v-if="exDont">
                    <span>Islam</span>
                    <img :src="`${iconUrl}Asset 519.svg`"/>
                  </div>
                  <div class="holidays" v-if="exDont">
                    <div class="dont">
                      <img :src="`${iconUrl}Asset 524.svg`"/>
                    </div>
                    <div class="flex-1">
                      <ul>
                        <li v-for="(h, hIndex) in holidays" :key="hIndex">
                          <div class="check-field" @click="updateExDonts(h)">
                            <img :src="`${iconUrl}Group 6258.svg`" v-if="exDonts.includes(h)"/>
                            <img :src="`${iconUrl}Rectangle 1245.svg`" v-else/>
                            <span :class="{'checked': exDonts.includes(h)}">{{h}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="block">
                  <div class="title">
                    Additional Limitations
                  </div>
                  <div class="check-field" @click="exLimitation=!exLimitation">
                    <img :src="`${iconUrl}Group 6258.svg`" v-if="exLimitation"/>
                    <img :src="`${iconUrl}Rectangle 1245.svg`" v-else/>
                    <span :class="{'checked': exLimitation}">Everyday between these hours:</span>
                  </div>
                  <div class="exLimitation" v-if="exLimitation">
                    <div class="select-time-cont">
                      <img :src="`${iconUrl}Asset 522.svg`"/>
                      <vue-timepicker format="hh:mm A" v-model="startTime" hide-clear-button/>
                      <div class="border-line"></div>
                      <vue-timepicker format="hh:mm A" v-model="endTime" hide-clear-button/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="calendar">
                <div class="calendar-title">
                  Mark the blackout days
                </div>
                <functional-calendar 
                  :change-month-function='true' 
                  :change-year-function='true'
                  :is-date-range='true'
                  v-on:changedMonth="changedMonth"
                  v-on:changedYear="changedYear"
                  :sundayStart="true"
                  :minSelDays="1"
                  :maxSelDays="7"
                  dateFormat='yyyy-mm-dd' 
                  v-model="date"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import VueElementLoading from 'vue-element-loading'
import Vendors from '@/models/Vendors'

//COMPONENTS
import Icon from '@/components/Icon/Icon.vue'
import VendorServiceItem from './VendorServiceItem.vue'
import VSignupAddRules from '@/components/Inputs/VSignupAddRules.vue'
// import VSignupTimeSelect from '@/components/Inputs/VSignupTimeSelect.vue'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import { FunctionalCalendar } from 'vue-functional-calendar'

export default {
  name: 'vendor-signup-step3',
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
      iconUrl: 'http://static.maryoku.com/storage/icons/Vendor Signup/',
      allowThirdVendor: null,
      workAllDay: false,
      date: {},
      rulesDesc: {
        title: 'additional rules',
        placeholder: 'Event muse end before.. / Suitable for children (2-12 years)'
      },
      policyDesc: {
        title: 'Add steps to your cancellation approch:',
        subTitle: 'You can add more than one step',
        labels: {
          if: 'the client cancel the event after:',
          than: 'the client wil pay:',
        },
        placeholder: 'Like two weeks before the event '
        // placeholder: {
        //   if: 'Like two weeks before the event ',
        //   than: 'Like: 30% of deposit',
        // },
      },
      yesRules: [],
      noRules: [],
      noteRules: [],
      holidays: [
        'All Islamic holiday', 
        'Eid AI-Acha', 
        'Eid AI-Fitr',
        'Lailat al Miraj',
        'Milad un Nabi(Shia)',
        'Ramadan(start)',
        'Laylat at Qadr',
        'Eid-ai-Fitr(End of Ramadan)',
        'Waqf ai Arafa - Hajj',
        'Hijra - Islamic New Year',
        'Day of Ashura / Muharram',
        'Milad un Nabi',
        'All Islamic holidays (Shia)',
      ],
      allowedCategoryFor3rd: ['venuerental', 'foodandbeverage', 'decor', 'entertainment'],
      weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      selectedWeekdays: ['saturday', 'sunday'],
      isWeekday: false,
      exEvery: false,
      exDont: false,
      exLimitation: false,
      exDonts: [],
      notAllowed: [],
      isOtherNa: false,
      startTime: {
        hh: '12',
        mm: '00',
        A: 'AM'
      },
      endTime: {
        hh: '12',
        mm: '00',
        A: 'AM'
      },
      defNa: 'Amenities, Services, Accessibility, Equipment, Staff, Other',
      policies: [
        {
          category: 'venuerental',
          items: [
            {
              name: 'Allowed use of outside vendors', 
              type: Boolean
            },
            {
              name: 'Minimum amount of hours', 
              type: Number
            },
            {
              name: 'Suitable for infants', 
              type: Boolean
            },
            {
              name: 'Audio restrictions', 
              type: Boolean
            },
            {
              name: 'Decor restrictions', 
              type: Boolean
            },
            {
              name: 'Dress code', 
              type: Boolean
            },
            {
              name: 'Minimum Spend',
              type: Boolean
            },
            {
              name: 'Dry Hire',
              type: Boolean
            },
            {
              name: 'Pets',
              type: Boolean
            }
          ]
        },
        {
          category: 'foodandbeverage',
          items: [
            {
              name: 'Tastings prior to booking',
              type: Boolean
            },
            {
              name: 'Allow customer provided liquor',
              type: Boolean
            }
          ]
        },
        {
          category: 'decor',
          items: [
            {
              name: 'Room temperature constraints',
              type: String
            },
            {
              name: 'Flexible time requirement for setup',
              type: String
            }
          ]
        },
        {
          category: 'corporatesocialresponsibility',
          items: []
        },
        {
          category: 'signageprinting',
          items: []
        },
        {
          category: 'advertising-promotion',
          items: []
        },
        {
          category: 'audiovisualstagingservices',
          items: [
            {
              name: 'Accept staff attire request',
              type: Boolean
            },
            {
              name: 'Simulcasting bandwidth requirements',
              type: Number
            },
            {
              name: 'Union crew restrictions',
              type: Boolean
            },
          ]
        },
        {
          category: 'swags',
          items: [
            {
              name: 'Allow pickup',
              type: Boolean
            },
            {
              name: 'Minimum size order',
              type: String
            }
          ]
        },
        {
          category: 'shipping',
          items: []
        },
        {
          category: 'transportation',
          items: []
        },
        {
          category: 'entertainment',
          items: [
            {
              name: 'Accept requests from guests',
              type: Boolean
            },
            {
              name: 'Continuous band play time',
              type: Boolean
            },
            {
              name: 'Max group size',
              type: Boolean
            },
            {
              name: 'Accessibility of activity', 
              type: Boolean
            },
            {
              name: 'Age restrictions',
              type: Boolean
            },
            {
              name: 'Time of day',
              type: Boolean
            },
            {
              name: 'Performer require a meal',
              type: Boolean
            },
            {
              name: 'Minimum Setup time required',
              type: Number
            },
            {
              name: 'Number of breaks',
              type: Number
            },
            {
              name: 'Additional requirements from venue',
              type: String
            },
            {
              name: 'Power supply needs',
              type: String
            },
            {
              name: 'Flexible to different dress codes',
              type: Boolean
            },
            {
              name: 'Meet before signing contract',
              type: Boolean
            },
            {
              name: 'Arrival onsite before the event',
              type: Boolean
            },
            {
              name: 'Losgistics',
              type: Boolean
            },
          ]
        },
        {
          category: 'administration',
          items: []
        },
        {
          category: 'securityservices',
          items: [
            {
              name: 'Visit the venue in advance',
              type: Boolean
            },
            {
              name: 'Minimum hours of service',
              type: Boolean
            },
            {
              name: 'Max hours per shift',
              type: Boolean
            },
            {
              name: 'Dress code',
              type: String
            },
          ]
        },
        {
          category: 'technologyservices',
          items: []
        },
        {
          category: 'videographyandphotography',
          items: [
            {
              name: 'Flexible to last minute onsite changes',
              type: Boolean
            },
            {
              name: 'Minimum amount of hours',
              type: Number
            },
            {
              name: 'Need to control room lighting',
              type: Boolean
            },
            {
              name: 'Minimum internet bandwidth (Simulticasting, Streaming)',
              type: Number
            },
            {
              name: 'Flexibility to operate with additional Photo / Video companies during the event',
              type: Boolean
            },
          ]
        },
      ],
      pricingPolicies: [
        {
          category: 'venuerental',
          items: [
            {
              name: 'Hours included in rental',
              type: Number
            },
            {
              name: 'Setup hours included in rental',
              type: Boolean
            },
            {
              name: 'Extra Guest (beyond agreed upon)',
              type: Number
            },
            {
              name: 'Overtime Cost',
              type: Number
            },
            {
              name: 'Late Night fares',
              type: Number
            },
            {
              name: 'Discount for large quantities',
              type: Number
            },
            {
              name: 'Tax rate',
              type: Number
            },
            {
              name: 'Suggested Gratuity',
              type: Number
            },
          ]
        },
        {
          category: 'foodandbeverage',
          items: [
            {
              name: 'Travel cost',
              type: Number
            },
            {
              name: 'Pickup',
              type: Number
            },
            {
              name: 'Cleanup',
              type: Number
            },
            {
              name: 'Breakdown',
              type: Number
            },
            {
              name: 'Discount for large quantities',
              type: Boolean
            },
            {
              name: 'Late Night fares',
              type: Number
            },
            {
              name: 'Discount for large quantities',
              type: Number
            },
            {
              name: 'Tax rate',
              type: Number
            },
            {
              name: 'Suggested Gratuity',
              type: Number
            },
          ]
        },
        {
          category: 'decor',
          items: [
            {
              name: 'Delivery',
              type: Number
            },
            {
              name: 'Setup',
              type: Number
            },
            {
              name: 'Working with unions',
              type: Boolean
            },
            {
              name: 'Discounts for large quantities',
              type: Boolean
            },
            {
              name: 'Tax rate',
              type: Number
            },
            {
              name: 'Suggested Gratuity',
              type: Number
            },
          ]
        },
        {
          category: 'corporatesocialresponsibility',
          items: []
        },
        {
          category: 'signageprinting',
          items: []
        },
        {
          category: 'advertising-promotion',
          items: []
        },
        {
          category: 'audiovisualstagingservices',
          items: [
            {
              name: 'Rushed job',
              type: Number
            },
            {
              name: 'Overtime',
              type: Number
            },
            {
              name: 'Tax rate',
              type: Number
            },
            {
              name: 'Discounts',
              type: Boolean
            },
            {
              name: 'Suggested Gratuity',
              type: Number
            },
          ]
        },
        {
          category: 'swags',
          items: [
            {
              name: 'Rushed orders',
              type: Boolean
            },
            {
              name: 'Delivery',
              type: Boolean
            },
            {
              name: 'preparing file for printing',
              type: Boolean
            },
            {
              name: 'Multiple print locations',
              type: Boolean
            },
            {
              name: 'Number of different colors',
              type: Boolean
            },
            {
              name: 'Tax rate',
              type: Number
            },
            {
              name: 'Discount for large quantites',
              type: Boolean
            },
            {
              name: 'Suggested Gratuity',
              type: Number
            },
          ]
        },
        {
          category: 'shipping',
          items: []
        },
        {
          category: 'transportation',
          items: [
            {
              name: 'Tax rate',
              type: Number
            },
            {
              name: 'Large setup discounts',
              type: Boolean
            },
            {
              name: 'Suggested Gratuity',
              type: Number
            },
          ]
        },
        {
          category: 'entertainment',
          items: [
            {
              name: 'Hours included in service',
              type: Number
            },
            {
              name: 'Rushed setup',
              type: Boolean
            },
            {
              name: 'Rehersal time for the band (for special requests)',
              type: Number
            },
            {
              name: 'Special operating time',
              type: Boolean
            },
            {
              name: 'Extra for prizes',
              type: Boolean
            },
            {
              name: 'Overtime charges',
              type: Boolean
            },
            {
              name: 'Tax rate',
              type: Number
            },
            {
              name: 'Large group discounts',
              type: Boolean
            },
            {
              name: 'Suggested Gratuity',
              type: Number
            },
          ]
        },
        {
          category: 'administration',
          items: []
        },
        {
          category: 'securityservices',
          items: [
            {
              name: 'Pre-selection personal',
              type: Boolean
            },
            {
              name: 'Number of hours',
              type: Boolean
            },
            {
              name: 'Level of security training/certification',
              type: Boolean
            },
            {
              name: 'Special attire requests',
              type: Boolean
            },
            {
              name: 'Tax rate',
              type: Number
            },
            {
              name: 'Large group discounts',
              type: Boolean
            },
            {
              name: 'Suggested Gratuity',
              type: Number
            },
          ]
        },
        {
          category: 'technologyservices',
          items: []
        },
        {
          category: 'videographyandphotography',
          items: [
            {
              name: 'Overtime charge',
              type: Number
            },
            {
              name: 'Travel to multiple location',
              type: Number
            },
            {
              name: 'Over number of pictures taken',
              type: Number
            },
            {
              name: 'Discount for large discounts',
              type: Boolean
            },
            {
              name: 'Tax rate',
              type: Number
            },
            {
              name: 'Suggested Gratuity',
              type: Number
            },
          ]
        },
      ]
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    updateExDonts(item) {
      if (this.exDonts.includes(item)) {
        this.exDonts = this.exDonts.filter(d => d != item)
      } else {
        this.exDonts.push(item)
      }
    },
    updateNa(item) {
      if (this.notAllowed.includes(item)) {
        this.notAllowed = this.notAllowed.filter(n => n != item)
      } else {
        this.notAllowed.push(item)
      }
    },
    yesRule(item) {
      if (this.yesRules.includes(item)) {
        this.yesRules = this.yesRules.filter(n => n != item)
      } else {
        this.noRules = this.noRules.filter(n => n != item)
        this.yesRules.push(item)
      }
    },
    noRule(item) {
      if (this.noRules.includes(item)) {
        this.noRules = this.noRules.filter(n => n != item)
      } else {
        this.yesRules = this.yesRules.filter(n => n != item)
        this.noRules.push(item)
      }
    },
    noteRule(item) {
      if (this.noteRules.includes(item)) {
        this.noteRules = this.noteRules.filter(n => n != item)
      } else {
        this.noteRules.push(item)
      }
    },
    updateWeekdays(item) {
      if (this.selectedWeekdays.includes(item)) {
        this.selectedWeekdays = this.selectedWeekdays.filter(s => s != item)
      } else {
        this.selectedWeekdays.push(item)
      }
    }
  },
  computed: {
    
  },
  filters: {
    
  },
  watch: {
  }
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
          font: normal 16px Manrope-Regular, sans-serif;
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
              margin-bottom: .5rem;
              img {
                width: 24px;
                margin-right: .5rem;
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
                    content: 'Min'
                  }
                }
                &:last-child {
                  &:before {
                    content: 'Max'
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
                grid-template-columns: 25% 25% 25% 25%;
                li {
                  margin-bottom: 1rem;
                  cursor: pointer;
                  img {
                    width: 27px;
                    height: 27px;
                    margin-right: 1rem;
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
      text-transform: capitalize;
      img {
        width: 24px;
        margin-right: .5rem;
      }
      h5 {
        font: 800 16px Manrope-Regular, sans-serif;
        margin: 0;
      }
      p {
        margin: 0;
        font: normal 14px Manrope-Regular, sans-serif;
      }
      .left, .right {
        margin: 0;
        display: inline-block;
      }
      .left {
        margin: 0 1rem 2rem 0;
      }
      .top, .bottom {
        margin-bottom: .5rem;
      }
    }
    .calendar-cont {
      display: flex;
      padding: 2rem 0;

      .calendar {
        flex: 1;

        .calendar-title {
          position: absolute;
          z-index: 999;
          margin: 1.5rem;
          font: normal 16px Manrope-Regular, sans-serif;
        }
        /deep/ .vfc-main-container {
          padding-top: 3rem;
        }
        /deep/ .vfc-top-date {
          a {
            text-decoration: none!important;
            font: 600 16px Manrope-Regular, sans-serif;
            color: #050505;
          }
        }
        /deep/ .vfc-arrow-left, /deep/ .vfc-arrow-right {
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
          padding: 6px 0;
        }
        /deep/ .vfc-base-start,
        .vfc-base-end {
          background: #f51355;
          color: #ffffff;
        }
        /deep/ span.vfc-span-day {
          &.vfc-marked {
            &:before {
              background-color: #f51355;
              color: #ffffff;
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
              margin-right: 1rem;
            }
            span {
              &.checked {
                font: 600 16px Manrope-Regular, sans-serif;
              }
            }
          }
          .holidays {
            display: flex;
            margin-top: 1rem;

            .dont {
              width: 24px;
              margin-right: 1rem;
              img {
                width: 24p;
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
            padding: .5rem 3rem;
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
              margin-bottom: .5rem;
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
              /deep/ .time-picker {
                input {
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
      width: 16px!important;
    }
    .mb-50 {
      margin-bottom: 3rem!important;
    }
    .m-0 {
      margin: 0!important;
    }
    .mt-2 {
      margin-top: 2rem;
    }
    .ml-title {
      padding: 1rem 0;
      background-color: #ededed;
      width: calc(75% + 60px);
      margin-left: -60px!important;
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
                width: 100%!important;
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
                content: '$';
                position: absolute;
                font-size: 16px;
                color: #818080;
                margin-top: 13px;
                margin-left: 2rem;
              }
              input {
                text-align: center;
                font-size: 16px;
                padding: 22px 30px;
                width: 40%;
                border: 1px solid #dddddd;
                border-radius: 0;
              }
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
    }
    .flex-1 {
      flex: 1;
    }
    .no-margin {
      margin: 0!important; 
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
