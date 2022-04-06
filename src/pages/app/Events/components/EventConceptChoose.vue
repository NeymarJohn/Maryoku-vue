<template>
	<div class="md-layout event-concept-section booking-section">
		<loader :active="isLoading" />
		<comment-editor-panel
			v-if="showCommentEditorPanel"
			:comment-components="commentComponents"
			@saveComment="saveComment"
			@updateComment="updateComment"
			@deleteComment="deleteComment"
			@updateCommentComponent="updateCommentComponent"
		/>
		<div v-if="showConceptList && !isLoading" class="concept-content">
			<div class="event-page-header md-layout-item md-size-100">
				<div class="header-name">
					<h3>Hi {{ userName }}</h3>
					<p>
						Here are 3 awesome event concepts based on everything you told us about your event.
						<br />Got some cool ideas of your own? &nbsp;&nbsp;Scroll down to create a brilliant new concept.
					</p>
				</div>
				<header-actions @toggleCommentMode="toggleCommentMode" @share="share" />
			</div>

			<div class="booking-header d-flex justify-content-between md-layout-item md-size-100">
				<div class="header-name">
					<h4><img :src="`${conceptIconsURL}Asset 491.svg`" width="30" /> Choose concept</h4>
				</div>
			</div>

			<div class="concepts-list md-layout-item md-size-100">
				<vue-element-loading :active="loadingConceptOptions" spinner="ring" color="#FF547C" />
				<div
					v-for="(item, index) in conceptOptions"
					:key="index"
					class="concepts-list__item d-flex justify-content-start"
					:class="{ expanded: item.expand }"
				>
					<div v-if="item.expand" class="d-flex justify-content-between align-center">
						<label>24 have tried this!</label>
						<md-button
							v-if="item.name != selectedConcept.name && canEdit"
							class="md-red md-bold"
							@click="selectConcept(index)"
						>
							Select
						</md-button>
						<span v-if="item.name == selectedConcept.name" class="font-size-16">You already selected this concept</span>
					</div>

					<div :class="`images-list option-${index + 1}`">
						<div class="image-backgrounds">
							<div
								v-for="(bg, bgIndex) in item.colors"
								:key="bgIndex"
								class="image-background"
								:style="`background:${bg.color}; opacity:${bg.opacity}`"
							/>
						</div>
						<div>
							<div v-for="(image, imageIndex) in item.images" :key="imageIndex" :class="`images-list__item`">
								<div
									class="image-section"
									:style="`background-image: url(${
										image.thumb_url || image.url
									});background-size: cover;background-position: center;`"
								/>
							</div>
						</div>
					</div>
					<div class="concept-details">
						<small>Option 0{{ index + 1 }}</small>
						<div class="concept-name">
							<h3 class="mb-5" :style="`font-family:${item.fontFamily}`" v-html="item.name" />
							<ul v-if="item.tags" class="features-list">
								<li v-for="(tag, featureIndex) in item.tags" :key="featureIndex" class="features-list__item">
									{{ tag.name }}
								</li>
							</ul>
						</div>
						<div v-if="item.expand" class="concept-description">
							{{ item.description }}
						</div>
					</div>
					<md-button class="md-rose md-simple md-just-icon view-concept" @click="expandConcept(item, index)">
						<img :src="`${conceptIconsURL}Asset 490.svg`" />
					</md-button>
				</div>

				<!-- Create Concept Section -->
				<div
					v-if="canEdit"
					class="concepts-list__item d-flex justify-content-start"
					:class="{ expanded: expandCreateConcept }"
				>
					<div v-if="!expandCreateConcept" class="images-list create-concept">
						<div class="image-backgrounds">
							<div v-for="idx in 4" :key="idx" class="image-background" />
						</div>
						<div>
							<div v-for="indx in 5" :key="indx" :class="`images-list__item`">
								<div class="image-section d-flex justify-content-center align-center">
									<img :src="`${conceptIconsURL}Asset 492.svg`" />
								</div>
							</div>
						</div>
					</div>
					<div v-if="!expandCreateConcept" class="concept-details">
						<h3 class="font-bold-extra font-size-30 color-red">Create Your Own Concept</h3>
						<p>Feeling creative? Tell us all about your ideas and we’ll get right on it!</p>
					</div>
					<md-button
						class="md-rose md-simple md-just-icon view-concept"
						@click="expandCreateConcept = !expandCreateConcept"
					>
						<img :src="`${conceptIconsURL}Asset 490.svg`" />
					</md-button>
					<event-concept-edit-form v-if="expandCreateConcept" @saved="onSaveConcept" />
				</div>
				<!-- ./Create Concept Section -->
			</div>

			<!-- <div class="booking-section__actions"></div> -->
			<div class="text-center" style="height: 100px">
				<!-- <md-button class="md-red md-simple back-to-top" @click="scrollToTop">
          <md-icon>expand_less</md-icon>Back to top
        </md-button>-->
			</div>
			<div v-if="!expandCreateConcept" class="concept-actions">
				<div>
					<md-button v-if="!showConceptList" class="md-simple md-black normal-btn" @click="showConceptList = true">
						<md-icon>arrow_back</md-icon>Back
					</md-button>
					<md-button class="md-button md-simple md-just-icon md-theme-default scroll-top-button" @click="scrollToTop">
						<img :src="`${$iconURL}Budget+Requirements/Asset+49.svg`" width="17" />
					</md-button>
				</div>
				<md-button class="md-simple md-black normal-btn" @click="openConceptContest">
					I'd like to see more options
				</md-button>
			</div>
		</div>
		<div v-if="!showConceptList && !isLoading" class="concept-content">
			<div class="event-page-header md-layout-item md-size-100">
				<div class="header-name">
					<h3>Great Choice!</h3>
					<p>This theme will inspire us when planning our next steps.</p>
				</div>
				<header-actions @toggleCommentMode="toggleCommentMode" @share="share" @export="exportToPdf" />
			</div>

			<div class="booking-header d-flex justify-content-between md-layout-item md-size-100">
				<div class="header-name">
					<h4><img :src="`${conceptIconsURL}Asset 491.svg`" width="30" /> Your Selected Theme</h4>
				</div>
			</div>

			<div v-if="!showEditForm" class="concepts-list md-layout-item md-size-100">
				<div class="concepts-list__item d-flex justify-content-start expanded">
					<div>
						<a
							class="concept-compete-link"
							style="padding-top: 4px"
							href="https://www.maryoku.com/contest-compete"
							target="_blank"
							>Earn points by sharing this concept</a
						>
						<span>
							<img
								src="https://static-maryoku.s3.amazonaws.com/storage/icons/Event%20Page/light.svg"
								alt="Avatar"
								width="20px"
							/>
							<md-tooltip md-direction="bottom">
								<div class="font-size-16">When you share this concept you created with the Maryoku community</div>
								<div class="font-size-16 d-flex align-start">
									you’ll earn points you can use toward discounts and coupons
								</div>
							</md-tooltip>
						</span>
					</div>
					<concept-box :concept="selectedConcept" />
				</div>
				<vue-html2pdf
					ref="html2Pdf"
					:show-layout="false"
					:float-layout="true"
					:enable-download="true"
					:preview-modal="false"
					:paginate-elements-by-height="1400"
					:filename="`concept-${eventData.id}`"
					:pdf-quality="2"
					:manual-pagination="false"
					pdf-format="a4"
					pdf-orientation="portrait"
					pdf-content-width="800px"
				>
					<section slot="pdf-content">
						<!-- PDF Content Here -->
						<div class="concepts-list__item d-flex justify-content-start expanded">
							<div>
								<a
									class="concept-compete-link"
									style="padding-top: 4px"
									href="https://www.maryoku.com/contest-compete"
									target="_blank"
									>Earn points by sharing this concept</a
								>
								<span>
									<img
										src="https://static-maryoku.s3.amazonaws.com/storage/icons/Event%20Page/light.svg"
										alt="Avatar"
										width="20px"
									/>
									<md-tooltip md-direction="bottom">
										<div class="font-size-16">When you share this concept you created with the Maryoku community</div>
										<div class="font-size-16 d-flex align-start">
											you’ll earn points you can use toward discounts and coupons
										</div>
									</md-tooltip>
								</span>
							</div>
							<concept-box :concept="selectedConcept" :scale="0.77" />
						</div>
					</section>
				</vue-html2pdf>
			</div>
			<div v-else class="concepts-list md-layout-item md-size-100">
				<div class="concepts-list__item d-flex justify-content-start expanded">
					<event-concept-edit-form :default-concept="selectedConcept" @saved="onSaveConcept" />
				</div>
			</div>
			<div class="selected-concept-footer d-flex justify-content-end">
				<!-- <md-button class="md-black md-simple md-maryoku " @click="showConceptList=true">
          <md-icon>keyboard_arrow_left</md-icon>Back
        </md-button>-->
				<div />
				<div>
					<span class="concept-saved">
						<img :src="`${$iconURL}common/check-circle-green.svg`" width="32" />
						Concept is Saved
					</span>
					<span class="separate" />
					<md-button v-if="!showEditForm" class="md-black md-simple md-maryoku" @click="showEditForm = true">
						Edit Concept
					</md-button>
					<md-button v-else class="md-black md-simple md-maryoku" @click="showEditForm = false"> Cancel </md-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import moment from "moment";
import Swal from "sweetalert2";
import { SlideYDownTransition } from "vue2-transitions";
import InputMask from "vue-input-mask";

// import auth from '@/auth';
import EventBlocks from "../components/NewEventBlocks";
import draggable from "vuedraggable";
import { Drag, Drop } from "vue-drag-drop";
import { Modal, Loader } from "@/components";

import EventConceptEditForm from "./EventConceptEditForm";
import HeaderActions from "@/components/HeaderActions";
import CommentEditorPanel from "./CommentEditorPanel";
import { CommentMixins, ShareMixins } from "@/mixins";
import ConceptImageBlock from "@/components/ConceptImageBlock";
import ConceptBox from "../../../../components/ConceptBox.vue";

const VueHtml2pdf = () => import("vue-html2pdf");

export default {
	name: "EventConceptChoose",
	components: {
		Loader,
		EventBlocks,
		draggable,
		Drag,
		Drop,
		SlideYDownTransition,
		InputMask,
		Modal,
		EventConceptEditForm,
		HeaderActions,
		CommentEditorPanel,
		ConceptImageBlock,
		ConceptBox,
		VueHtml2pdf,
	},
	mixins: [CommentMixins, ShareMixins],
	props: {},
	computed: {
		...mapState("event", ["eventData"]),
		currentUser() {
			return this.$store.state.auth.user;
		},
		userName() {
			return this.currentUser ? this.currentUser.name : "";
		},
		permission() {
			try {
				return this.$store.state.event.eventData.permit;
			} catch (e) {
				return "edit";
			}
		},
		canComment() {
			return this.canEdit || this.permission === "comment";
		},
		canEdit() {
			return !this.permission || this.permission === "edit";
		},
	},
	data: () => ({
		// auth: auth,
		colour: "#FF00FF",
		showConceptList: true,
		showEditForm: false,
		isLoading: true,
		timelineItems: [],
		disabledDragging: false,
		somethingMessage: null,
		timelineAttachment: null,
		event: {},
		timelineIconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/timeline/svg/",
		menuIconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/menu%20_%20checklist/SVG/",
		iconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/Event%20Page/",
		newTimeLineIconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/Timeline-New/",
		budgetElementsIConsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/Budget+Elements/",
		conceptIconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/Concept/",
		showSomethingModal: false,
		showShareVendorModal: false,
		selectedBlock: {},
		selectedConcept: {},
		showCommentEditorPanel: false,
		base64Images: [],
		loadingConceptOptions: false,
		conceptOptions: [
			{
				option: 1,
				name: "March Madness",
				description:
					"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
				fontFamily: "Cooperative-Regular",
				tags: [{ name: "Fun" }, { name: "Diy" }, { name: "Sporting" }, { name: "Light" }],
				images: [
					{
						url: "https://placeimg.com/200/200/any?1",
					},
					{
						url: "https://placeimg.com/200/200/any?2",
					},
					{
						url: "https://placeimg.com/200/200/any?3",
					},
					{
						url: "https://placeimg.com/200/200/any?4",
					},
					{
						url: "https://placeimg.com/200/200/any?5",
					},
				],
				colors: [{ value: "#ffc001" }, { value: "#f3423a" }, { value: "#ff7600" }],
			},
			{
				option: 2,
				name: "Horror movies",
				description:
					"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
				fontFamily: "CFNightofTerrorPERSONAL-Reg",
				tags: [{ name: "romantic" }, { name: "luxurry" }, { name: "fun" }, { name: "colourful" }],
				images: [
					{
						url: "https://placeimg.com/200/200/any?1",
					},
					{
						url: "https://placeimg.com/200/200/any?2",
					},
					{
						url: "https://placeimg.com/200/200/any?3",
					},
					{
						url: "https://placeimg.com/200/200/any?4",
					},
					{
						url: "https://placeimg.com/200/200/any?5",
					},
				],
				colors: [{ value: "#de0300" }, { value: "#d1d1d1" }, { value: "#ff7600" }],
			},
			{
				option: 3,
				name: "Intergalactic",
				description:
					"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
				fontFamily: "IntergalacticHalftoneItalic",
				tags: [{ name: "festive" }, { name: "elegant" }, { name: "respectable" }],
				images: [
					{
						url: "https://placeimg.com/200/200/any?1",
						backgroundColor: "#00165d",
					},
					{
						url: "https://placeimg.com/200/200/any?2",
					},
					{
						url: "https://placeimg.com/200/200/any?3",
					},
					{
						url: "https://placeimg.com/200/200/any?4",
						backgroundColor: "linear-gradient(#ff0082,#a700ff)",
					},
				],
				colors: [{ value: "#00165d" }, { value: "linear-gradient(#ff0082,#a700ff)" }, { value: "#ff7600" }],
			},
		],
		expandCreateConcept: false,
		conceptTags: [
			{
				name: "festive",
			},
			{
				name: "elegant",
			},
			{
				name: "respectable",
			},
		],
		newTag: "",
		newConcept: {
			name: "",
			description: "",
			tags: [],
			colors: [{ value: "#ff48b2", opacity: 1 }, { value: "#71ecf8", opacity: 1 }, { value: "" }, { value: "" }],
			images: [],
		},
		uploadImages: {},
		uploadImageData: {
			0: "",
			1: "",
			2: "",
			3: "",
			4: "",
			5: "",
		},
		uploadImage: "",
	}),
	methods: {
		...mapMutations("event", ["setEventData"]),
		expandConcept(item, index) {
			console.log(item.name);
			if (!item.expand) {
				console.log(" i am true");
				this.conceptOptions[index].expand = true;
			} else {
				console.log(" i am false");
				this.conceptOptions[index].expand = false;
			}
			this.$forceUpdate();
		},
		addTag() {
			if (this.newTag && this.newTag.length) {
				this.newConcept.tags.push({ name: this.newTag });
			}
			this.newTag = "";
		},
		removeTag(index) {
			this.conceptTags.splice(index, 1);
		},
		scrollToTop() {
			window.scrollTo(0, 0);
		},
		async saveConcept() {},
		addColor(index) {
			const colors = ["#ff48b2", "#71ecf8", "#ededed"];
			this.newConcept.colors[index].value = "#ff48b2";
		},
		selectConcept(index) {
			let event = this.$store.state.event.eventData;
			this.$http
				.get(`${process.env.SERVER_URL}/1/concepts/${event.id}/select/${this.conceptOptions[index].id}`)
				.then((res) => {
					console.log(res.data);
					this.onSaveConcept(res.data);
				});

			// this.onSaveConcept(this.conceptOptions[index]);
			// this.selectedConcept = this.conceptOptions[index]
			// this.showConceptList = false
		},
		onSaveConcept(eventConcept) {
			let calendar = new Calendar({
				id: this.currentUser.profile.defaultCalendarId,
			});
			let event = this.$store.state.event.eventData;
			event.concept = eventConcept;
			event.conceptProgress = 100;
			this.isLoading = true;
			this.$store
				.dispatch(
					"event/saveEventAction",
					new CalendarEvent({
						id: event.id,
						concept: { id: eventConcept.id },
						title: eventConcept.name,
						conceptProgress: 100,
						calendar: calendar,
					}),
				)
				.then((result) => {
					this.showConceptList = false;
					this.showEditForm = false;
					this.selectedConcept = eventConcept;
					this.isLoading = false;
				});
		},
		imageUrlAlt(image, event) {
			event.target.src = image;
		},
		openConceptContest() {
			window.open("https://www.maryoku.com/concept-contest", "_blank");
		},
		toggleCommentMode(mode) {
			this.showCommentEditorPanel = mode;
		},
		exportToPdf() {
			this.$refs.html2Pdf.generatePdf();
		},
	},
	watch: {
		eventData(newValue, oldValue) {
			console.log(newValue);
			if (newValue.concept) {
				this.selectedConcept = newValue.concept;
				this.selectedConcept.images.forEach((item, i) => {
					item.url = item.url;
				});
				this.showConceptList = false;
			} else {
				this.showConceptList = true;
			}
			this.isLoading = false;
			console.log(newValue.id);
		},
	},
	async created() {
		if (this.eventData.id) {
			if (this.eventData.concept) {
				this.selectedConcept = this.eventData.concept;
				this.selectedConcept.images.forEach((item, i) => {
					item.url = item.url;
				});
				this.showConceptList = false;
				this.conceptOptions.push(this.selectedConcept);
			} else {
				this.loadingConceptOptions = true;
				try {
					let suggestions = JSON.parse(localStorage.getItem("concept.suggestions"));
					if (!suggestions || !suggestions.length) {
						let res = await this.$http.get(`${process.env.SERVER_URL}/1/concepts/${this.eventData.id}/suggestions`);
						suggestions = res.data;
						localStorage.setItem("concept.suggestions", JSON.stringify(suggestions));
					}

					suggestions.map((concept) => {
						let weight = "";
						// filter by event places
						if (this.eventData.places && this.eventData.places.length) {
							let tags = concept.tags.map((tag) => tag.name);
							let isContain = tags.some((tag) => this.eventData.places.includes(tag.toUpperCase()));

							weight += isContain ? "1" : "0";
						} else {
							weight += "0";
						}

						// filter by event song
						if (this.eventData.eventSong && this.eventData.eventSong.tags && this.eventData.eventSong.tags.length) {
							let isContain = this.eventData.eventSong.tags.every((songTag) => {
								return concept.tags.some((conceptTag) => {
									conceptTag.name.toLowerCase() === songTag.toLowerCase();
								});
							});
							weight += isContain ? "1" : "0";
						} else {
							weight += "0";
						}

						// filter by event occasion
						if (this.eventData.occasion && concept.occasion && concept.occasion.length) {
							let isContain = concept.occasion.some((it) => it.value === this.eventData.occasion);
							weight += isContain ? "1" : "0";
						} else {
							weight += "0";
						}

						// filter by event month
						if (this.eventData.eventStartMillis) {
							let startDate = new Date(this.eventData.eventStartMillis);
							let eventMonth = startDate.toLocaleString("default", { month: "long" });
							weight += eventMonth === concept.eventMonthName ? "1" : "0";
						} else {
							weight += "0";
						}

						// filter by range of cost per person
						if (concept.rangeOfCostPerPerson) {
							let cost = this.eventData.totalBudget / this.eventData.numberOfParticipants;
							weight +=
								parseInt(concept.rangeOfCostPerPerson.min) <= cost <= parseInt(concept.rangeOfCostPerPerson.max)
									? "1"
									: "0";
						} else {
							weight += "0";
						}

						// filter by guests number
						if (concept.rangeOfGuests) {
							weight +=
								parseInt(concept.rangeOfGuests.min) <=
								this.eventData.numberOfParticipants <=
								parseInt(concept.rangeOfGuests.max)
									? "1"
									: "0";
						} else {
							weight += "0";
						}
						this.$set(concept, "weight", weight);
					});

					suggestions.sort((a, b) => (a.weight < b.weight ? 1 : a.weight > b.weight ? -1 : 0));

					this.conceptOptions = suggestions.slice(0, 3);
					this.showConceptList = true;
					this.loadingConceptOptions = false;
				} catch (e) {
					console.log("filter.error", e);
					this.loadingConceptOptions = false;
				}
			}
			this.isLoading = false;
		}
	},
	filters: {
		formatDate: function (date) {
			return moment(date).format("MMM Do YYYY ");
		},
		formatTime: function (date) {
			return moment(date).format("h:00 A");
		},
		formatDuration: function (startDate, endDate) {
			return moment(endDate).diff(startDate, "hours");
		},
		withComma(amount) {
			return amount ? amount.toLocaleString() : 0;
		},
	},
};
</script>
<style lang="scss" scoped>
@import "../../../styles/EventConceptChoose.scss";
</style>
