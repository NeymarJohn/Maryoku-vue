<template>
  <div class="vendor-signup-wrapper">
    <vendor-basic-info-form v-if="!isApproved"/>
    <vendor-signup-step2 :categories="categories" v-if="isApproved && step == 2"/>
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
