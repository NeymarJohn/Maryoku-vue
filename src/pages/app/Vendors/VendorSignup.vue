<template>
  <div class="vendor-signup-wrapper">
    <vendor-basic-info-form v-if="!isApproved"/>
    <vendor-signup-step2 v-if="isApproved && step == 2"/>
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
import VendorSignupStep2 from './components/VendorSignupStep2.vue'

export default {
  components: {
    VueElementLoading,
    VSignupEditableField,
    VendorBasicInfoForm,
    VendorSignupStep2,
  },
  data() {
    return {
      vendor: null,
      isApproved: false,
      step: 2,
      categories: [
        {
          name: 'amentities',
          subCategory: [
            {
              name: 'around the space',
              items: [
                {
                  name: 'hotel acommondations within walking distance',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'shopping centers',
                  type: boolean, 
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
                  type: boolean, 
                  value: false
                },
                {
                  name: 'outdoor event space',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'smoking section',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'separate cocktail hour space',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'outside area for guests',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'kitchen for outside caterers',
                  type: boolean, 
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
                  type: boolean, 
                  value: false
                },
                {
                  name: 'natural lighting space',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'control of lighting during event',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'parking',
              items: [
                {
                  name: 'onsite parking',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'network',
              items: [
                {
                  name: 'fast reliable Wifi for guests',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'venue bandwidth (for video streaming or meeting content)',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'floral',
              items: [
                {
                  name: 'plants',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'extra flowers for caterer (boufet decor)',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'refrigerated truck',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'permanent botanical arragements',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'other',
              items: [
                {
                  name: 'special effects (pyrotechnic, waterfall, baloon, explosion, etc)',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'props',
                  type: boolean, 
                  value: false
                },
              ]
            },
          ]
        },
        {
          name: 'services',
          subCategory: [
            {
              name: 'parking',
              items: [
                {
                  name: 'valet services',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'cleaning',
              items: [
                {
                  name: 'cleaning services during the event',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'breakdown, cleaning and pickup',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'serving styles',
              items: [
                {
                  name: 'appetizers',
                  type: boolean, 
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
                  type: boolean, 
                  value: false
                },
                {
                  name: 'dinner',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'desserts',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'setup, cleanup and delivery',
              items: [
                {
                  name: 'customer pickup',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'deliveries',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'onsite setup',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'cleanup',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'specialties',
              items: [
                {
                  name: 'digital decor',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'holiday decor',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'decor in motion',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'live decor',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'lighting decor',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'specialized theme designs',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'flower decor',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'designs serivces',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'other',
              items: [
                {
                  name: 'table setup and preparations',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'interactive stations',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'set up centerpieces, name cards, favors, etc',
                  type: boolean, 
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
                  type: boolean, 
                  value: false
                },
                {
                  name: 'all indoor',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'all outdoor',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'accessible bathrooms',
                  type: Number, 
                  value: 1
                }
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
                  type: boolean, 
                  value: false
                },
                {
                  name: 'dance floor',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'furniture', 
              items: [
                {
                  name: 'chairs',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'outdoor chairs',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'high chairs',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'tables',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'outdoor tables',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'high tables',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'power', 
              items: [
                {
                  name: 'power supply',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'generator',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'AV', 
              items: [
                {
                  name: 'microphones',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'projector',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'sound system',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'LCD displays',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'monitor',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'speaker / sound system',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'tableware',
              items: [
                {
                  name: 'linens & tablecloth',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'glassware',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'silverware',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'disposables',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'china',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'customized items',
                  type: boolean, 
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
                  type: boolean, 
                  value: false
                },
                {
                  name: 'maltre d',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'chefs and cooks',
              items: [
                {
                  name: 'chef',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'specialty chef',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'other',
              items: [
                {
                  name: 'servers',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'busboys',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'cleanup crew',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'waitstaff',
              items: [
                {
                  name: 'waitstaff',
                  type: boolean, 
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
                  type: boolean, 
                  value: false
                },
                {
                  name: 'cleaning stuff',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'waiters',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'security',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'receptionist',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'technical support',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'bathroom attendant',
                  type: boolean, 
                  value: false
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
                  type: boolean, 
                  value: false
                },
                {
                  name: 'vegan',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'gluten - free',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'egg free',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'kosher',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'halal',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'floral',
              items: [
                {
                  name: 'hypoallergenic flowers',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'non scented flowers',
                  type: boolean, 
                  value: false
                },
              ]
            },
            {
              name: 'other',
              items: [
                {
                  name: 'children meals',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'tastings prior to booking',
                  type: boolean, 
                  value: false
                },
                {
                  name: 'allow customer provided liquor',
                  type: boolean, 
                  value: false
                },
              ]
            }
          ]
        },
        {
          name: 'amenaties'
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
                  type: boolean, 
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
  }  
</style>
