<template>
	<div class="vendor-category-editor" :class="[{ 'border-bottom': borderBottom }]">
		<div class="left" :class="[{ 'full-width': isEdit }]">
			<div class="title">{{ title }}<span v-if="required"> *</span></div>
			<div v-if="isEdit">
				<div v-for="(item, index) of selectedValue" :key="item || index + 1" class="d-flex position-relative">
					<!-- <img class="inside-img" :src="img" v-if="img != '' && field !== 'vendorCategories'" /> -->
					<category-selector
						v-if="field === 'vendorCategories'"
						:value="item || ''"
						:categories="vendorCategories"
						column="2"
						track-by="name"
						class="my-10"
						@change="updateCategory(index, ...arguments)"
					/>
					<location-input
						v-else-if="field === 'vendorAddresses'"
						:value="item"
						class="my-10 width-100 address"
						theme="purple"
						@change="changeAddress(index, ...arguments)"
					/>
					<img
						v-if="selectedValue.length > 1"
						class="ml-10 close-btn"
						:src="`${$iconURL}Requirements/delete-dark.svg`"
						@click="removeValue(index)"
					/>
				</div>
				<div class="d-flex align-center py-10 font-bold cursor-pointer" style="color: #58154b" @click="addNewValue">
					<img class="mr-10" :src="`/static/icons/vendor/Icon_+.svg`" />
					<span v-if="field === 'vendorAddresses'">Add another address</span>
					<span v-else>Add another category</span>
				</div>
			</div>
			<div v-else>
				<template v-if="selectedValue.length">
					<div v-for="item of selectedValue" :key="item" class="content mt-10">
						<img
							v-if="field === 'vendorCategories' && item"
							class="mr-10"
							:src="vendorCategories.find((v) => v.name === item).icon"
						/>
						<img v-if="img != '' && item" class="mr-10" :src="img" />
						{{ item }}
					</div>
				</template>
			</div>
			<div v-if="isEdit" class="action-cont">
				<md-button class="md-black maryoku-btn md-simple" @click="cancel"> Cancel </md-button>
				<md-button class="md-vendor maryoku-btn" :disabled="!isInputValid" @click="save"> Save </md-button>
			</div>
		</div>
		<div v-if="!isEdit" class="right">
			<a @click="isEdit = true">
				Edit
				<md-icon>navigate_next</md-icon>
			</a>
		</div>
	</div>
</template>
<script>
import CategorySelector from "@/components/Inputs/CategorySelector";
import { VendorCategories } from "@/constants/vendor";
import LocationInput from "../../pages/app/Vendors/VendorDashboard/LocationInput.vue";

export default {
	name: "VSignupEditableField",
	components: {
		CategorySelector,
		LocationInput,
	},
	props: {
		title: {
			type: String,
			default: "",
		},
		field: {
			type: String,
			default: "",
		},
		img: {
			type: String,
			default: "",
		},
		borderBottom: Boolean,
		required: {
			type: Boolean,
			default: false,
		},
		value: {
			type: [String, Array],
			default: () => null,
		},
	},
	data: () => ({
		isEdit: false,
		reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
		categoryIconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/",
		vendorCategories: VendorCategories,
		selectedValue: [],
	}),
	computed: {
		isInputValid() {
			if (!this.selectedValue) return false;
			return this.selectedValue.length > 0 && this.selectedValue.every((item) => item);
		},
	},
	watch: {
		value(newValue) {
			// console.log("signup.category.selector.watch", newValue, this.field);
			this.init();
		},
	},
	mounted() {
		this.init();
	},
	beforeDestroy() {
		// this.$root.$off('update-vendor-value')
	},
	methods: {
		updateCategory(index, data) {
			// console.log('updateCategory', index, data);
			this.selectedValue[index] = data;
			this.selectedValue = [...this.selectedValue];
		},
		save() {
			this.isEdit = false;
			let selectedValue = [];

			// console.log("vendor.signup.category", this.selectedValue);
			if (this.field === "vendorCategories") {
				this.selectedValue.map((v) => {
					let item = this.vendorCategories.find((cat) => cat.name === v);
					selectedValue.push(item ? item["value"] : "");
				});
			} else {
				selectedValue = this.selectedValue;
			}
			// this.$root.$emit("update-vendor-value", this.field, selectedValue);
			const validValues = selectedValue.filter((item) => !!item);
			this.$emit("save", { field: this.field, value: validValues });
		},
		cancel() {
			this.isEdit = false;
			this.init();
		},
		addNewValue() {
			this.selectedValue.push("");
		},
		removeValue(index) {
			this.selectedValue.splice(index, 1);
			// this.$root.$emit(
			//   "update-vendor-value",
			//   this.field,
			//   this.selectedValue.filter((s, sIdx) => index !== sIdx),
			// );
		},
		getAddressData(index, addressData, placeResultData, id) {
			this.selectedValue[
				index
			] = `${addressData.route}, ${addressData.administrative_area_level_1}, ${addressData.country}`;
			this.selectedValue = [...this.selectedValue];
		},
		init() {
			// console.log('init', this.value);
			this.selectedValue = [];
			if (this.value.length && this.field === "vendorCategories") {
				this.value.map((v) => {
					let item = this.vendorCategories.find((cat) => cat.value === v);
					this.selectedValue.push(item ? item["name"] : "");
				});
			} else {
				this.selectedValue = this.value.map((item) => item);
			}
		},
		changeAddress(index, value) {
			if (!value) return;
			this.selectedValue[index] = value.name;
			this.selectedValue = [...this.selectedValue];
		},
	},
};
</script>
<style lang="scss" scoped>
.vendor-category-editor {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	color: #050505;
	margin-top: 30px;

	&.border-bottom {
		padding-bottom: 35px;
		border-bottom: 1px solid #dddddd;
	}
	.close-btn {
		cursor: pointer;
	}
	.left {
		width: 75%;

		.title {
			font: 800 16px Manrope-Regular, sans-serif;
		}

		.inside-img {
			width: 20px;
			position: absolute;
			top: 25px;
			left: 25px;
			z-index: 99;
		}

		input.address {
			padding-left: 60px;
			min-height: 55px;
			border: solid 0.5px #bcbcbc;
			font: normal 16px Manrope-Regular, sans-serif;
		}

		.content {
			img {
				width: 20px;
			}
		}

		.action-cont {
			margin-top: 10px;
			text-align: right;

			a {
				cursor: pointer;
				padding: 8px 24px;
				&.cancel {
					color: #050505;
					font: 800 16px Manrope-Regular, sans-serif;
				}
				&.save {
					color: #ffffff;
					font: 800 16px Manrope-Regular, sans-serif;
					background-color: #58154b;
					&:hover {
						color: #ffffff !important;
					}
				}
			}
		}
		&.full-width {
			width: 100%;
		}
	}

	.right {
		a {
			font: 800 16px Manrope-Regular, sans-serif;
			color: #58154b;
			cursor: pointer;
			text-decoration: none !important;
			i {
				color: #58154b !important;
				position: relative;
				top: -1px;
			}
		}
	}
}
</style>
