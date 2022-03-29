<template>
	<div class="progress-sidebar">
		<div class="summer-party">
			<div v-if="page === 'plan'" class="title-label">
				summer party
				<small>checklist</small>
			</div>
			<div v-if="page === 'event'" class="subTitle-label">Let's Begin</div>
			<div class="completion-progress">
				<div class="progress-done" />
			</div>
			<div class="percentage">
				<ul>
					<li class="green-label">{{ (((warming / elements.length).toFixed(2) * 10000) / 100) | withComma }}%</li>
					<li class>{{ warming }} of {{ elements.length }}</li>
				</ul>
			</div>
			<div v-if="page === 'plan'" class="small-label">Things are warming up!</div>
			<div v-if="page === 'event'" class="small-label">Only 4 more vendors to close!</div>
		</div>
		<div class="progress-sidebar-content">
			<!-- Sidebar Elements -->
			<div class="event-elements">
				<draggable :list="localElements" @change="changeItem">
					<div
						v-for="(item, index) in localElements"
						:id="item.id"
						:key="index"
						class="event-elements__item"
						:class="{
							current: isActiveRoute(item),
						}"
						@click="goToRoute(item, index)"
					>
						<div class="item-title">
							<img
								v-if="item.status === 'completed' || item.progress === 100 || item.progress > 100"
								:src="`${$iconURL}budget+screen/SVG/Asset%2032.svg`"
								width="25"
							/>
							<img
								v-if="isActiveRoute(item) && item.icon"
								:src="item.icon"
								width="25"
								style="max-width: 25px; max-height: 25px"
							/>
							{{ item.title }}
						</div>
					</div>
				</draggable>
				<md-button
					class="md-simple refresh"
					:style="{
						bottom: `${56 * (elements.length % 2 == 0 ? elements.length / 2 : (elements.length - 1) / 2 + 1)}px`,
					}"
					@click="changeItem('refresh')"
				>
					<img :src="`${$iconURL}Budget Requirements/group-9602@3x.png`" width="80" />
				</md-button>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import { SlideYDownTransition } from "vue2-transitions";
import InputMask from "vue-input-mask";
import VueElementLoading from "vue-element-loading";
import draggable from "vuedraggable";
import { Drag, Drop } from "vue-drag-drop";
import { SideBar, SidebarItem } from "@/components";
import EventBlocks from "../components/NewEventBlocks";
import EventNotePanel from "../components/EventNotePanel";

export default {
	name: "ProgressSidebar",
	components: {
		VueElementLoading,
		EventBlocks,
		draggable,
		Drag,
		Drop,
		SlideYDownTransition,
		InputMask,
		SideBar,
		SidebarItem,
		EventNotePanel,
	},
	props: {
		elements: {
			type: Array,
			required: true,
		},
		event: {
			type: Object,
		},
		page: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		isLoading: true,
		isOpenNote: false,
		currentUrl: "",
		event: {},
		localElements: [],
	}),
	computed: {
		// ...mapState("event", {
		//   eventData: (state) => state.eventData,
		// }),
		warming() {
			let value = this.elements.filter((it) => it.progress == 100);
			return value ? value.length : 0;
		},
	},
	created() {
		this.fetchUrl();
		this.event = this.$store.state.event.eventData;
		this.localElements = this.elements;
		setTimeout((_) => {
			this.renderProgress();
		}, 50);
	},
	methods: {
		...mapActions("event", ["getEventAction"]),
		goToRoute(item, index) {
			let vm = this;
			this.$router.push(`/events/${this.event.id}/${item.route}`);
		},
		fetchUrl() {
			this.currentUrl = this.$router.history.current.path;
		},
		isActiveRoute(item) {
			if (this.currentUrl.indexOf(item.route) > -1) {
				return "current";
			}
			return "";
		},
		changeItem(option) {
			const params = option === "refresh" ? null : this.localElements;
			this.$emit("change", params);
		},
		renderProgress() {
			let self = this;
			$(".event-elements__item").each(function (idx, el) {
				let progress = self.elements.find((it) => it.id === $(el).attr("id")).progress;
				$(el).css("--width", `${progress}%`);
			});
		},
	},
	watch: {
		$route: "fetchUrl",
		currentUrl(newVal) {},
		elements(newValue) {},
	},
	updated() {
		this.localElements = this.elements;
		this.renderProgress();
	},
	mounted() {},
};
</script>
<style lang="scss"></style>
