<template>
	<div>
		<table
			class="event-blocks__table event-block-table"
			:class="{ booked: eventCategoryItem.bookedBudget, borderCard: !editingMode }"
			:style="
				editingMode
					? `border-left: 10px solid ${eventCategoryItem.color}`
					: `border: 2px solid ${eventCategoryItem.color}`
			"
		>
			<tbody>
				<template>
					<tr>
						<td width="43%" class="event-block-element">
							<div class="d-flex align-center">
								<img
									:src="
										editingMode
											? `${$iconURL}Budget Elements/${eventCategoryItem.icon}`
											: `/static/icons/budget/${eventCategoryItem.icon.replace('svg', 'png')}`
									"
								/>
								<div style="width: 250px">
									<span>{{ eventCategoryItem.title }}</span>
									<span v-if="eventCategoryItem.eventCategory">
										<img :src="`${$iconURL}Campaign/Group 9087.svg`" class="label-icon" />
										<md-tooltip>
											<div class="font-size-14 tab-tooltip">{{ eventCategoryItem.eventCategory.tooltipText }}</div>
										</md-tooltip>
									</span>
								</div>
							</div>
						</td>
						<td class="planned" width="25%" style="white-space: nowrap">
							<span v-if="type === 'total'">$ {{ eventCategoryItem.allocatedBudget | withComma(Number) }}</span>
							<span v-else
								>$ {{ (eventCategoryItem.allocatedBudget / event.numberOfParticipants).toFixed(2) | withComma }}</span
							>
							<md-button v-if="isEditable && editingMode" class="md-rose md-sm md-simple edit-btn" @click="switchEdit">
								<img :src="`${$iconURL}Requirements/edit-dark.svg`" style="width: 20px" />
							</md-button>
							<img
								v-if="isEditing"
								:src="`${$iconURL}Event Page/arrow-left-gray.svg`"
								style="width: 25px; float: right; margin: 3px 0px"
							/>
						</td>
						<template v-if="!isEditing">
							<td class="actual red-label" width="15%">
								<template v-if="eventCategoryItem.allocatedBudget">
									<template v-if="eventCategoryItem.winningProposalId">
										<template v-if="eventCategoryItem.allocatedBudget < eventCategoryItem.winingProposal.cost">
											<img :src="`${$iconURL}budget+screen/png/Asset+29.png`" />
										</template>
										<template v-else>
											<img :src="`${$iconURL}budget+screen/png/Asset+29.png`" />
										</template>
										<md-button
											class="md-simple actual-cost md-xs"
											:class="
												eventCategoryItem.allocatedBudget < eventCategoryItem.winingProposal.cost
													? `md-danger`
													: `md-success`
											"
										>
											{{
												event.elementsBudgetPerGuest
													? `$${(eventCategoryItem.winingProposal.cost / event.numberOfParticipants).toFixed(2)}`
													: `$${eventCategoryItem.winingProposal.cost.toFixed(2)}`
											}}
											<md-icon>open_in_new</md-icon>
										</md-button>
									</template>
								</template>
								<!-- v-if="eventCategoryItem.downPaymentStatus==='accepted'" -->
								<event-actual-cost-icon-tooltip :icon="'credit_card'" :item="eventCategoryItem" :event="event" />
								<span v-if="eventCategoryItem.vendorsCount > 0" class="font-size-20 whitspace-nowrap">
									<md-icon
										v-if="eventCategoryItem.bookedBudget <= eventCategoryItem.allocatedBudget"
										class="color-plus font-size-20"
										style="margin-top: -0.2em"
										>add_circle_outline</md-icon
									>
									<md-icon v-else class="color-minus font-size-20">remove_circle_outline</md-icon>
									<span
										:class="
											eventCategoryItem.bookedBudget <= eventCategoryItem.allocatedBudget ? 'color-plus' : 'color-minus'
										"
									>
										<template v-if="type === 'total'"
											>$
											{{
												eventCategoryItem.bookedBudget ? eventCategoryItem.bookedBudget : 0 | withComma(Number)
											}}</template
										>
										<template v-else>
											$
											{{
												eventCategoryItem.bookedBudget
													? (eventCategoryItem.bookedBudget / event.numberOfParticipants).toFixed().toString()
													: 0
											}}
										</template>
									</span>
								</span>
							</td>
							<td class="status" width="10%">
								<div class="text-left">
									<img
										v-if="eventCategoryItem.bookedBudget"
										:src="`${$iconURL}common/check-circle-green.svg`"
										width="32"
									/>
								</div>
							</td>
							<td class="expand">
								<div class="text-right" @click="showDeleteModal">
									<img
										:src="`${$iconURL}menu _ checklist/SVG/Group 2763 (2).svg`"
										class="colour-filter"
										style="width: 13px"
									/>
								</div>
							</td>
						</template>
						<template v-else>
							<td colspan="3" align="right" style="white-space: nowrap" class="d-flex">
								<maryoku-input
									v-model="newBudget"
									input-style="budget"
									size="small"
									style="width: 150px"
									@focus="$event.target.select()"
								/>
								<md-button class="md-simple md-black normal-btn" @click="switchEdit"> Cancel </md-button>
								<md-button class="md-red normal-btn" :disabled="!isUpdated" @click="showResizeBudgetModal">
									Save
								</md-button>
							</td>
						</template>
					</tr>
				</template>
			</tbody>
		</table>
		<budget-resize-modal
			v-if="resizeModalOpened"
			:new-value="newBudget"
			:value="eventCategoryItem.allocatedBudget"
			:category-name="eventCategoryItem.fullTitle"
			@select="resizeBudget"
			@cancel="resizeModalOpened = false"
		/>
		<category-delete-modal
			v-if="deleteModalOpened"
			:category="eventCategoryItem"
			@select="deleteItem"
			@cancel="deleteModalOpened = false"
		/>
		<add-my-vendor-modal
			v-if="addVendorModalOpened"
			:event="event"
			:selected-component="eventCategoryItem"
			@closeModal="closeAddVendorModalOpened"
			@remindLater="addVendorModalOpened = false"
			@updateVendor="updateVendor"
		/>
	</div>
</template>
<script>
import EventActualCostIconTooltip from "../components/EventActualCostIconTooltip.vue";
import MaryokuInput from "@/components/Inputs/MaryokuInput.vue";
import BudgetResizeModal from "@/components/Modals/BudgetResizeModal";
import CategoryDeleteModal from "@/components/Modals/CategoryDeleteModal";
import AddMyVendorModal from "@/components/Modals/AddMyVendorModal";

import EventComponent from "@/models/EventComponent";
import CalendarEvent from "@/models/CalendarEvent";
import Swal from "sweetalert2";

export default {
	components: {
		EventActualCostIconTooltip,
		MaryokuInput,
		BudgetResizeModal,
		CategoryDeleteModal,
		AddMyVendorModal,
	},
	props: {
		event: {
			type: Object,
			default: () => {},
		},
		eventCategoryItem: {
			type: Object,
			default: () => {},
		},
		type: {
			type: String,
			default: "total",
		},
		editingMode: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			isExpanded: false,
			isEditing: false,
			newBudget: this.eventCategoryItem.allocatedBudget,
			resizeModalOpened: false,
			deleteModalOpened: false,
			addVendorModalOpened: false,
		};
	},
	computed: {
		isEditable() {
			return !this.isEditing && !this.eventCategoryItem.bookedBudget;
		},
		canExpand() {
			return !this.eventCategoryItem.fixed && this.eventCategoryItem.componentId != "unexpected";
		},
		isUpdated() {
			return this.eventCategoryItem.allocatedBudget !== this.newBudget;
		},
	},
	created() {
		this.$root.$on("expandBudgetCategoryItem", (category) => {
			if (category.id != this.eventCategoryItem.id) {
				this.isExpanded = false;
			}
		});
		this.$root.$on("editBudgetCategoryItem", (category) => {
			if (category.id != this.eventCategoryItem.id) {
				this.isEditing = false;
			}
		});
	},
	methods: {
		closeAddVendorModalOpened() {
			this.addVendorModalOpened = false;
		},
		switchExpand() {
			this.isExpanded = !this.isExpanded;
			this.$root.$emit("expandBudgetCategoryItem", this.eventCategoryItem);
		},
		switchEdit() {
			this.isEditing = !this.isEditing;
			this.$root.$emit("editBudgetCategoryItem", this.eventCategoryItem);
		},
		showResizeBudgetModal() {
			this.resizeModalOpened = true;
		},
		resizeBudget(selectedOption) {
			this.resizeModalOpened = false;
			let selected_block = new EventComponent({ id: this.eventCategoryItem.id, allocatedBudget: this.newBudget });
			selected_block
				.for(new CalendarEvent({ id: this.eventCategoryItem.calendarEvent.id }))
				.save()
				.then((res) => {
					this.isEditing = false;
					this.$emit("update", selectedOption);
				});
		},
		showDeleteModal() {
			Swal.fire({
				title: `<div class="text-left"><div class="font-size-30 cross-line"><img src="${this.$iconURL}Budget Elements/${this.eventCategoryItem.componentId}.svg" width="40"/>${this.eventCategoryItem.title}</div>
                  <div >Are you sure you want to delete this category?
                </div></div>`,
				showCancelButton: true,
				confirmButtonClass: "md-button md-success",
				cancelButtonClass: "md-button md-danger",
				confirmButtonText: "Yes I'm sure",
				cancelButtonText: "No, take me back",
				buttonsStyling: false,
			}).then((result) => {
				if (result.value) {
					this.deleteModalOpened = true;
				}
			});
		},
		deleteItem(selectedOption) {
			let selected_block = new EventComponent({ id: this.eventCategoryItem.id, allocatedBudget: this.newBudget });
			selected_block
				.for(new CalendarEvent({ id: this.eventCategoryItem.calendarEvent.id }))
				.delete()
				.then((res) => {
					this.isEditing = false;
					this.$emit("delete", selectedOption);
				});
		},
		addMyVendor() {
			this.addVendorModalOpened = true;
		},
		updateVendor(myVendor) {
			let selected_block = new EventComponent({ id: this.eventCategoryItem.id, bookedBudget: myVendor.cost });
			selected_block
				.for(new CalendarEvent({ id: this.eventCategoryItem.calendarEvent.id }))
				.save()
				.then((res) => {
					this.addVendorModalOpened = false;
					this.$emit("addVendor", myVendor);
				});
		},
		bookVendors(item) {
			// go to booking page
			this.$router.push(`/events/${this.event.id}/booking/${item.id}`);
		},
	},
};
</script>
<style scoped lang="scss">
.colour-filter {
	cursor: pointer;
	filter: invert(80%) sepia(0%) saturate(160%) hue-rotate(260deg) brightness(82%) contrast(81%);
}
</style>
