<template>
  <div class="maryoku_input">
    <md-autocomplete v-model="selectedLocation" :md-options="locations" class="location" :class="{active: selectedLocation}">
    </md-autocomplete>
  </div>
</template>
<script>
export default {
  name: "maryoku-input",
  model: {},
  props: {
    /**
     * Data binding
     * @model
     */
    value: String,
    name: String,
    srcLogo: String,
    type: String,
    onChange: Function,
    inputBlock: String,
    placeholder: String,
    disabled: Boolean,
    imgStyle: String,
    inputStyle: String,
  },
  data () {
    return {
      selectedLocation:this.value,
      addressSearch: null,
      locations: [],
      locationService: null,
      geocoder: null,
      results: [],
      countries: [
        'Algeria',
        'Argentina',
        'Brazil',
        'Canada',
        'Italy',
        'Japan',
        'United Kingdom',
        'United States'
      ],
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', this.content)
    },
    addressSuggestions(predictions, status) {
      console.log(predictions)
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        console.log(status);
        return;
      }
      this.locations = [];
      predictions.forEach(item => {
        this.locations.push(item.description);
      });
      console.log("locations", this.locations)
    },
  },
  computed: {
    getClass: function(){
      return `${this.inputStyle} ${this.value?"active":""}`
    }
  },
  mounted () {
    this.locationService = new google.maps.places.AutocompleteService();
    console.log(this.locationService)
    this.geocoder = new google.maps.Geocoder();
    console.log(this.geocoder)
  },
  watch: {
    content: function(newValue) {
      this.$emit('input', this.content)
    },
    selectedLocation: function(newValue) {
      this.$emit('input', newValue)
      if (newValue.length < 3) {
        // this.locations = [];
        return;
      }
      this.locationService.getPlacePredictions(
        {
          input: newValue,
          types: ['geocode'],
          // componentRestrictions: { country: ['us', 'ca'] },
        },
        this.addressSuggestions,
      );
    }
  }
};
</script>
<style lang="scss">
.input-default {
  border: none;
  padding: 15px;
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
}
.required-logo {
  color: red;
}
</style>
