<template>
	<div class="maryoku_input">
		<md-autocomplete
			v-model="selectedLocation"
			:md-options="locations"
			:md-input-placeholder="placeholder"
			class="location"
			:class="{ active: selectedLocation, 'md-purple': theme === 'purple' }"
			@md-opened="updateSuggestionStyle"
		/>
	</div>
</template>
<script>
export default {
	name: "MaryokuInput",
	model: {},
	props: {
		/**
		 * Data binding
		 * @model
		 */
		value: {
			type: String,
			default: "",
		},
		name: {
			type: String,
			default: "",
		},
		srcLogo: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			default: "",
		},
		onChange: {
			type: Function,
			default: () => {},
		},
		inputBlock: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
		disabled: Boolean,
		imgStyle: {
			type: String,
			default: "",
		},
		inputStyle: {
			type: String,
			default: "",
		},
		theme: {
			type: String,
			default: "roze",
		},
	},
	data() {
		return {
			selectedLocation: this.value,
			addressSearch: null,
			locations: [],
			places: [],
			locationService: null,
			geocoder: null,
			results: [],
		};
	},
	computed: {
		getClass: function () {
			return `${this.inputStyle} ${this.value ? "active" : ""}`;
		},
	},
	watch: {
		content: function (newValue) {
			this.$emit("input", this.content);
		},
		selectedLocation: function (newValue) {
			// console.log('selectedLocation', newValue);
			if (newValue.length < 3) {
				// this.locations = [];
				return;
			}
			this.init();
			this.$emit("input", newValue);
			const locationObject = this.places.find((item) => item.name === newValue);
			this.$emit("change", locationObject);

			this.locationService.getPlacePredictions(
				{
					input: newValue,
					types: ["geocode"],
					// componentRestrictions: { country: ['us', 'ca'] },
				},
				this.addressSuggestions,
			);
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.locationService = new google.maps.places.AutocompleteService();
			this.geocoder = new google.maps.Geocoder();
		},
		handleInput(e) {
			this.$emit("input", this.content);
		},
		addressSuggestions(predictions, status) {
			if (status != google.maps.places.PlacesServiceStatus.OK) {
				return;
			}
			this.locations = [];
			predictions.forEach((item) => {
				this.locations.push(item.description);
				this.places.push({ id: item.place_id, name: item.description });
			});
			this.updateSuggestionStyle();
		},
		updateSuggestionStyle() {
			if (this.theme === "purple") {
				setTimeout((_) => {
					$(".md-list-item-button").hover(
						function (el) {
							$(this).attr("style", "background-color:#641856 !important;color: #fff!important");
						},
						function () {
							$(this).attr("style", "background-color:#fff;color:#000");
						},
					);
				}, 0);
			} else {
				setTimeout((_) => {
					$(".md-list-item-button").hover(
						function (el) {
							$(this).attr("style", "background-color:#f51355!important;color: #fff!important");
						},
						function () {
							$(this).attr("style", "background-color:#fff;color:#000");
						},
					);
				}, 0);
			}
		},
	},
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
