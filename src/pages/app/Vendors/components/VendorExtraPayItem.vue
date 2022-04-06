<template>
	<div class="vendor-extra-pay-item-wrapper">
		<div class="collapsed" @click="expand()">
			<div class="col label">
				{{ editingData.label }}
				<img
					v-if="editingData.hasOwnProperty('desc') && editingData.desc"
					class="ml-20"
					:class="{ 'rotate-90': expanded }"
					:src="`${$iconURL}NewSubmitPorposal/Group 4770 (2).svg`"
				/>
			</div>
			<div v-if="!isEditable" class="col">
				<span v-if="getQty()">{{ getQty() | formatQty }}</span>
				<span v-else>-</span>
			</div>
			<div v-else class="col">
				<div>
					<input v-model="editingData.qty" />
				</div>
			</div>
			<div v-if="!isEditable" class="col">+${{ getPrice() | withComma }}</div>
			<div v-else class="col">
				<money
					v-model="editingData.value"
					v-bind="{
						decimal: '.',
						thousands: ',',
						prefix: '$ ',
						suffix: '',
						precision: 2,
						masked: false,
					}"
					class="input-value"
				/>
			</div>
			<div v-if="!isEditable" class="col action">
				<img class="mr-20 ml-auto" :src="`${$iconURL}Requirements/edit-dark.svg`" @click="edit" />
				<img :src="`${$iconURL}Requirements/delete-dark.svg`" @click="remove" />
			</div>
			<div v-else class="col">
				<md-button class="md-simple md-black maryoku-btn" @click="cancel"> Cancel </md-button>
				<md-button
					class="md-red maryoku-btn"
					:class="{ 'md-red': theme === 'red', 'md-vendor': theme === 'purple' }"
					@click="save"
				>
					Save
				</md-button>
			</div>
		</div>
		<div v-if="expanded" class="expanded">
			<span v-if="!isEditable">{{ editingData.desc }}</span>
			<textarea v-else v-model="editingData.desc" />
		</div>
	</div>
</template>

<script>
import { Money } from "v-money";
export default {
	name: "VendorExtraPayItem",
	components: {
		Money,
	},
	filters: {},
	props: {
		item: {
			type: Object,
			default: () => {},
		},
		theme: {
			type: String,
			default: "purple",
		},
	},
	data() {
		return {
			expanded: false,
			isEditable: false,
			editingData: {},
		};
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {
		this.editingData = Object.assign({}, this.item);
	},
	methods: {
		expand() {
			if (this.item.desc) {
				this.expanded = !this.expanded;
			}
		},
		getQty() {
			return this.item.qty;
		},
		getPrice() {
			if (this.item.value) {
				if (this.item.value) {
					///.constructor.name == "String"
					return Number(this.item.value);
				} else {
					return null;
				}
			} else {
				return null;
			}
		},
		changePrice(value) {},
		changeItem() {
			this.$emit("change", this.editingData);
		},
		edit() {
			this.isEditable = true;
		},
		remove() {
			this.item.checked = false;
			this.$emit("change", this.item);
		},
		cancel() {
			this.editingItem = Object.assign({}, this.item);
			this.isEditable = false;
		},
		save() {
			this.isEditable = false;
			this.changeItem();
		},
	},
};
</script>
<style lang="scss" scoped>
.vendor-extra-pay-item-wrapper {
	font-family: Manrope-Regular, sans-serif;
	color: #050505;
	border-bottom: 1px solid #dddddd;

	.collapsed {
		display: grid;
		grid-template-columns: 40% 20% 20% 20%;
		padding: 2rem 0;
		grid-gap: 5px;
		.col {
			flex: 1;
			display: flex;
			align-items: center;
			padding: 10px 20px 10px 0;
			&:not(:first-child) {
				justify-content: center;
			}
			img {
				width: 20px;
			}
			&.label {
				text-transform: capitalize;
			}
			&:first-child {
				flex: 2;
				font: bold 16px Manrope-Regular, sans-serif;
			}
			&:last-child {
				text-align: right;
			}

			input {
				text-align: center;
				border-radius: 3px;
				border: 1px solid #818080;
				max-width: 160px;
				font: normal 16px Manrope-Regular, sans-serif;
				color: #050505;
			}

			.field {
				display: inline-block;
			}

			.field:before {
				content: "$";
				position: absolute;
				margin-top: 15px;
				margin-left: 3rem;
			}
		}

		.action {
			opacity: 0;
			display: flex;
			flex-flow: nowrap;
			cursor: pointer;
		}

		&:hover {
			.action {
				opacity: 1;
			}
		}
	}
	.expanded {
		max-width: 40%;
		font: normal 14px Manrope-Regular, sans-serif;
		padding-bottom: 1rem;

		textarea {
			min-width: 300px;
		}
	}
	.rotate-90 {
		transform: rotate(90deg);
	}
}
</style>
