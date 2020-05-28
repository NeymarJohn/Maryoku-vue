<template>
  <div class="vendor-signup-wrapper">
    <vendor-basic-info-form v-if="!isApproved"/>
    <vendor-signup-step1 
      :categories="categories" 
      :icon="`${iconUrl}`" 
      v-if="isApproved && step == 1"
    />
    <vendor-signup-step2 
      :categories="categories" 
      :icon="`${iconUrl}`" 
      v-if="isApproved && step == 2"
    />
    <vendor-signup-step3 
      :categories="categories" 
      :icon="`${iconUrl}`" 
      v-if="isApproved && step == 3"
    />
    <vendor-signup-step4 
      :categories="categories" 
      :icon="`${iconUrl}`" 
      v-if="isApproved && step == 4"
    />
    <vendor-signup-final-form 
      :categories="categories" 
      :icon="`${iconUrl}`" 
      v-if="isApproved && step == 5"
    />
  </div>
</template>

<script>
import moment from 'moment'
import VueElementLoading from 'vue-element-loading'
import Vendors from '@/models/Vendors'

//COMPONENTS
import Icon from '@/components/Icon/Icon.vue'
import VSignupEditableField from '@/components/Inputs/VSignupEditableField.vue'
import VendorBasicInfoForm from './components/VendorBasicInfoForm.vue'
import VendorSignupStep1 from './components/VendorSignupStep1.vue'
import VendorSignupStep2 from './components/VendorSignupStep2.vue'
import VendorSignupStep3 from './components/VendorSignupStep3.vue'
import VendorSignupStep4 from './components/VendorSignupStep4.vue'
import VendorSignupFinalForm from './components/VendorSignupFinalForm.vue'

export default {
  components: {
    VueElementLoading,
    VSignupEditableField,
    VendorBasicInfoForm,
    VendorSignupStep1,
    VendorSignupStep2,
    VendorSignupStep3,
    VendorSignupStep4,
    VendorSignupFinalForm,
  },
  data() {
    return {
      vendor: null,
      isApproved: false,
      step: 1,
      categories: [
        {
          name: 'amenities',
          subCategory: [
            {
              name: 'around the space',
              items: [
                {
                  name: 'hotel acommondations within walking distance',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'shopping centers',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'the space',
              items: [
                {
                  name: 'number of function spaces',
                  type: Number, 
                  value: 1
                },
                {
                  name: 'number of meeting rooms',
                  type: Number, 
                  value: 1
                },
                {
                  name: 'indoor event space',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'outdoor event space',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'smoking section',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'separate cocktail hour space',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'outside area for guests',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'kitchen for outside caterers',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'available bathrooms',
                  type: Number, 
                  value: 1
                },
              ]
            },
            {
              name: 'lighting',
              items: [
                {
                  name: 'artificial lighting',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'natural lighting space',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'control of lighting during event',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'parking',
              items: [
                {
                  name: 'onsite parking',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'network',
              items: [
                {
                  name: 'fast reliable Wifi for guests',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'venue bandwidth (for video streaming or meeting content)',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'floral',
              items: [
                {
                  name: 'plants',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'extra flowers for caterer (boufet decor)',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'refrigerated truck',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'permanent botanical arragements',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'specialties',
              items: [
                {
                  name: 'drone and remote photo/video',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'crane',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'simulacasting/live streaming',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'custom prints',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'branded lighting effect',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'printing',
              items: [
                {
                  name: 'printing method',
                  type: Array, 
                  value: [],
                  available: ['digital printing', 'screen printing', 'flexography printing', 'litho printing', 'transfer printing', 'engraving', 'embossing', 'embrolder printing']
                },
                {
                  name: 'printing material',
                  type: Array, 
                  value: [],
                  available: ['business cards', 'brochures', 'flyers', 'one-sheets', 'infographics', 'instructions', 'posters', 'tickets', 'banners', 'menues', 'place cards']
                },
              ]
            },
            {
              name: 'furniture',
              items: [
                {
                  name: 'chairs',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'tables',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'tableware',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'special catering rental equipment',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'furniture / props',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'tech equipment',
              items: [
                {
                  name: 'screens',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'projections',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'recordings',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'video conferencing',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'tents',
              items: [
                {
                  name: 'tents',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'air conditioning',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'generator',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'tent lighting',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'flooring and carpeting',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'portable bathrooms',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'liners',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'visual',
              items: [
                {
                  name: 'screens',
                  type: Array, 
                  value: [],
                  available: ['projectors(rear or font)', 'plasma/LED tv', 'LED wall', 'show and go screen']
                },
                {
                  name: 'ZAP shots',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'cranes',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'audio',
              items: [
                {
                  name: 'sound system',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'rigging',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'programmer',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'variety of inventory',
              items: [
                {
                  name: 'ceremonial items',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'specialty food & liquor',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'tech items',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'apparel',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'drinkware',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'bags',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'wellness',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'fitness',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'office',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'other',
                  type: String, 
                  value: ''
                },
              ]
            },
            {
              name: 'other',
              items: [
                {
                  name: 'special effects (pyrotechnic, waterfall, baloon, explosion, etc)',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'props',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'staging podiums, registration areas',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'special equipment',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'simulcasting',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'cordless mics',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: ' ',
              items: [
                {
                  name: 'wifi',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'bar',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'luggage',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'food',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'TV/Cable TV',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'restrooms',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'audio equipment',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'stage light',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'dance floor give aways',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'special equipment',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'suit / tuxido rentals',
                  type: Boolean, 
                  value: false
                }
              ]
            },
          ]
        },
        {
          name: 'services',
          subCategory: [
            {
              name: 'band',
              items: [
                {
                  name: 'trio',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'quartet',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'vocalist',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'orchestra',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'nine pieces and plus',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'specialty band (ethnic music, rock and roll etc)',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'parking',
              items: [
                {
                  name: 'valet services',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'cleaning',
              items: [
                {
                  name: 'cleaning services during the event',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'breakdown, cleaning and pickup',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'serving styles',
              items: [
                {
                  name: 'appetizers',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'meal type',
              items: [
                {
                  name: 'breakfast',
                  type: Array, 
                  value: []
                },
                {
                  name: 'lunch',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'dinner',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'desserts',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'setup, cleanup and delivery',
              items: [
                {
                  name: 'customer pickup',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'deliveries',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'onsite setup',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'cleanup',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'specialties',
              items: [
                {
                  name: 'digital decor',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'holiday decor',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'decor in motion',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'live decor',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'lighting decor',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'specialized theme designs',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'flower decor',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'designs serivces',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'staffing',
              items: [
                {
                  name: 'event staffing',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'transportation host',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'models',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'staffing services',
                  type: Array, 
                  value: [],
                  available: ['tour guide', 'wait staff', 'event registration']
                },
                {
                  name: 'hospitality professional',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'chaperones',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'patrolling officers',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'bouncers',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'body guards',
                  type: Array, 
                  value: []
                },
                {
                  name: 'amed security officers',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'unarmed security',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'undercover',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'sound/visual engineer',
                  type: Boolean, 
                  value: false
                },{
                  name: 'setup crew',
                  type: Boolean, 
                  value: false
                },{
                  name: 'programmer',
                  type: Boolean, 
                  value: false
                },{
                  name: 'event manager',
                  type: Boolean, 
                  value: false
                },{
                  name: 'rigging',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'guest services',
              items: [
                {
                  name: 'gneral guest services',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'consierge services',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'VIP services',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'day-off corrdination',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'hosting',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'tours & sightseeing',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'visiting guest services support',
                  type: Array, 
                  value: []
                },
                {
                  name: 'last minute onsite fitting (tux, suits)',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'style',
              items: [
                {
                  name: 'journalistic',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'studio',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'traditiontal',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'candid',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'marketing',
              items: [
                {
                  name: 'branding strategy',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'event registration tracking',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'consultation',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'open communication',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'PR',
              items: [
                {
                  name: 'speech writing',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'press releases',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'high profile sourcing',
                  type: Array, 
                  value: [],
                  available: ['politicians', 'celebrities', 'influencers', 'artists']
                },
                {
                  name: 'social media promotion',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'media pitch',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'administrative',
              items: [
                {
                  name: 'guest lists',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'graphics',
              items: [
                {
                  name: 'graphic design services',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'editing',
              items: [
                {
                  name: 'video',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'audio',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'photo',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'photo invitations / thank you',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'format of delivery',
              items: [
                {
                  name: 'physical proof/print',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'flash drive',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'digital download',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'setup & breakdown',
              items: [
                {
                  name: 'adapt equipment mobility to program',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'setup & breakdown',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'type of entertainment',
              items: [
                {
                  name: 'interactive',
                  type: Array, 
                  value: [],
                  available: ['photo booth', 'casino games', 'sport games', 'make your own']
                },
                {
                  name: 'singers',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'keynote speaker / special MC',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'theme entertainment ( dancers, shows, illusionist etc )',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'activities',
              items: [
                {
                  name: 'team building',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'events and shows',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'museum & art gallery visits',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'classes',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'sport',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'other',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'family activities',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'children activities',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'food',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'wine/beer/bourbon/etc',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'sightseeing',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'tours',
              items: [
                {
                  name: 'food',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'wine/beer/bourbon/etc',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'sightseeing',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'coordination & logistics',
              items: [
                {
                  name: 'instructors, guides',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'logistics',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'other',
              items: [
                {
                  name: 'table setup and preparations',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'interactive stations',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'set up centerpieces, name cards, favors, etc',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'risk assessment',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'VIP security',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: ' ',
              items: [
                {
                  name: 'taxi',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'airport pickup/drop off',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'round trip',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'one way',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'tours',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'parameter security',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'crowd control',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'onsite supervisors during event',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'special delivery and pickup',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'pre-inspection',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'ability to handle rushed orders',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'graphic design',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'ability to handle special requests',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'printing',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'stuffing and packaging',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'customization',
                  type: Boolean, 
                  value: false
                },
              ]
            }
          ]
        },
        {
          name: 'accessibility',
          subCategory: [
            {
              name: ' ',
              items: [
                {
                  name: 'accessbility for people with disabilities',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'all indoor',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'all outdoor',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'accessible bathrooms',
                  type: Number, 
                  value: 1
                },
                {
                  name: 'acitivy is suitable for people with disabilities',
                  type: Boolean, 
                  value: false
                },
              ]
            }
          ]
        },
        {
          name: 'equipment',
          subCategory: [
            {
              name: 'entertainment', 
              items: [
                {
                  name: 'stage',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'dance floor',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'furniture', 
              items: [
                {
                  name: 'chairs',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'outdoor chairs',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'high chairs',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'tables',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'outdoor tables',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'high tables',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'power', 
              items: [
                {
                  name: 'power supply',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'generator',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'AV', 
              items: [
                {
                  name: 'microphones',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'projector',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'sound system',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'LCD displays',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'monitor',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'speaker / sound system',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'tableware',
              items: [
                {
                  name: 'linens & tablecloth',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'glassware',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'silverware',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'disposables',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'china',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'customized items',
                  type: Boolean, 
                  value: false
                },
              ]
            }
          ]
        },
        {
          name: 'staff',
          subCategory: [
            {
              name: 'onsite managers',
              items: [
                {
                  name: 'captain',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'maltre d',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'chefs and cooks',
              items: [
                {
                  name: 'chef',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'specialty chef',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'other',
              items: [
                {
                  name: 'servers',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'busboys',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'cleanup crew',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'waitstaff',
              items: [
                {
                  name: 'waitstaff',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'number of waitstaff',
                  type: Number, 
                  value: 0
                },
                {
                  name: 'attire of waitstaff',
                  type: Array, 
                  value: []
                },
              ]
            },
            {
              name: ' ',
              items: [
                {
                  name: 'event coordinator',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'cleaning stuff',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'waiters',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'security',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'receptionist',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'technical support',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'bathroom attendant',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'uniformed drivers',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'uniform style',
                  type: String, 
                  value: ''
                },
              ]
            }
          ]
        },
        {
          name: 'inclusions',
          subCategory: [
            {
              name: 'dietary constraints',
              items: [
                {
                  name: 'vegetarian',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'vegan',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'gluten - free',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'egg free',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'kosher',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'halal',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'floral',
              items: [
                {
                  name: 'hypoallergenic flowers',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'non scented flowers',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'other',
              items: [
                {
                  name: 'children meals',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'tastings prior to booking',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'allow customer provided liquor',
                  type: Boolean, 
                  value: false
                },
              ]
            },
            {
              name: ' ',
              items: [
                {
                  name: 'provide sample',
                  type: Boolean, 
                  value: false
                },
                {
                  name: '',
                  type: Array, 
                  value: [],
                  available: ['digital','real','sample']
                },
              ]
            }
          ]
        },
        {
          name: 'what we serve',
          subCategory: [
            {
              name: 'food', 
              items: [
                {
                  name: 'cuisine specialty',
                  type: Array, 
                  value: []
                },
                {
                  name: 'food specialties',
                  type: Array, 
                  value: []
                },
                {
                  name: 'food preparation location',
                  type: Array, 
                  value: []
                },
                {
                  name: 'after party entertainment food',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'caterer type',
                  type: Array, 
                  value: []
                },
              ]
            },
            {
              name: 'beverage',
              items: [
                {
                  name: 'specialty liquor stations',
                  type: Array, 
                  value: []
                },
                {
                  name: 'specialty bar services',
                  type: Boolean, 
                  value: false
                },
                {
                  name: 'non alcoholic specials',
                  type: Array, 
                  value: []
                },
              ]
            }
          ]
        },
      ],
      iconUrl: 'http://static.maryoku.com/storage/icons/Vendor Signup/',
    }
  },
  created() {
  },
  mounted() {
    this.$root.$on('approve-vendor-basic-info', () => {
      this.isApproved = true
      console.log('vendor basic info is approved')
    })
    this.$root.$on('next-vendor-signup-step', () => {
      if (this.step < 5) {
        this.step += 1
      }
    })
    this.$root.$on('prev-vendor-signup-step', () => {
      if (this.step > 1) {
        this.step -= 1
      }
    })
  },
  methods: {
    
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
  .vendor-signup-wrapper {
    padding: 84px 124px;    
    font-family: Manrope-Regular, sans-serif;
    background: #f3f7fd;
  }  
</style>
