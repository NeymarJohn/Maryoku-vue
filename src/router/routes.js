import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Dashboard/Pages/AuthLayout.vue";
import CreateEvent from "@/pages/Dashboard/Layout/CreateEvent.vue";
import HomeLayout from "@/pages/Dashboard/Layout/HomeLayout.vue";
import NewEventLayout from "@/pages/Dashboard/Layout/NewEventLayout.vue";
import WorkspaceLayout from "@/pages/Dashboard/Layout/WorkspaceLayout.vue";
import LandingPageLayout from "@/pages/Dashboard/Layout/LandingPageLayout.vue";
import authService from "@/services/auth.service";

const Events = () => import("@/pages/app/Events/Events.vue");
const EventProposal = () => import("@/pages/app/Events/EventProposal.vue");
const CurrentVendors = () => import("@/pages/app/Vendors/CurrentVendors.vue");
const AddEditVendor = () => import("@/pages/app/Vendors/AddEditVendor.vue");
const VendorsPoolNew = () => import("@/pages/app/Vendors/VendorsPoolNew.vue");

// Event Pages
import EventDetailsOverView from "@/pages/app/Events/EventDetailsOverview.vue";
import EventDetailsBudget from "@/pages/app/Events/EventDetailsBudget.vue";
import EventPlan from "@/pages/app/Events/EventPlan.vue";
import EventProposalDetails from "@/pages/app/Events/components/EventProposalDetails.vue";

const CreateWorkspace = () => import("@/pages/Dashboard/Pages/CreateWorkspace");
const ChooseWorkspace = () => import("@/pages/Dashboard/Pages/ChooseWorkspace");

// New Vendor Pages
const ForVendorLayout = () => import("@/pages/Dashboard/Layout/ForVendorLayout.vue");
const ForProposalsLayout = () => import("@/pages/Dashboard/Layout/ForProposalsLayout.vue");
const VendorSignupLayout = () => import("@/pages/Dashboard/Layout/VendorSignupLayout.vue");
const ForVendors = () => import("@/pages/app/Vendors/ForVendors.vue");
const ForProposals = () => import("@/pages/app/Vendors/ForProposals.vue");
const VendorSignup = () => import("@/pages/app/Vendors/VendorSignup.vue");

// OnBoardingPages
import EventWizardStart from "@/pages/app/CreateEvent/EventWizardStart.vue";
import EventWizardDay from "@/pages/app/CreateEvent/EventWizardDay.vue";
import EventWizardDateFlexibility from "@/pages/app/CreateEvent/EventWizardDateFlexibility.vue";
import EventWizardGuests from "@/pages/app/CreateEvent/EventWizardGuests.vue";
import EventWizardGuestsType from "@/pages/app/CreateEvent/EventWizardGuestsType.vue";
import EventWizardLocation from "@/pages/app/CreateEvent/EventWizardLocation.vue";
import EventWizardBuilding from "@/pages/app/CreateEvent/EventWizardBuilding.vue";
import EventWizardType from "@/pages/app/CreateEvent/EventWizardType.vue";
import EventWizardCelebrating from "@/pages/app/CreateEvent/EventWizardCelebrating.vue";
import EventWizardVibes from "@/pages/app/CreateEvent/EventWizardVibes.vue";
import EventWizardReligion from "@/pages/app/CreateEvent/EventWizardReligion.vue";

// RSVP

import RSVPEvent from "@/pages/app/RSVP/RSVPEvent.vue";
import EventCreatePage from "@/pages/app/CreateEvent/EventWizardCreate.vue";

import FeedbackLandingPage from "@/pages/app/Events/FeedbackLandingPage.vue";
// User authentication pages
const SignInSignUp = () => import("@/pages/Dashboard/Pages/SignInSignUp.vue");
const SignUp = () => import("@/pages/Dashboard/Pages/SignUp.vue");
const ForgotPassword = () => import("@/pages/Dashboard/Pages/ForgotPassword.vue");
const ResetPassword = () => import("@/pages/Dashboard/Pages/ResetPassword.vue");
const SignOut = () => import("@/pages/Dashboard/Pages/SignOut.vue");
const SignedIn = () => import("@/pages/Dashboard/Pages/SignedIn.vue");
const Invited = () => import("@/pages/Dashboard/Pages/Invited.vue");

let authPages = {
    path: "/",
    component: AuthLayout,
    name: "Authentication",
    children: [
        {
            path: "/signin",
            name: "SignIn",
            component: SignInSignUp,
            meta: {
                auth: false,
                gtm: "SignIn",
            },
        },
        {
            path: "/signup",
            name: "SignUp",
            component: SignUp,
            meta: {
                auth: false,
                gtm: "SignUp",
            },
        },
        {
            path: "/forgot-password",
            name: "ForgotPassword",
            component: ForgotPassword,
            meta: {
                auth: false,
                gtm: "ForgotPassword",
            },
        },
        {
            path: "/reset-password",
            name: "ResetPassword",
            component: ResetPassword,
            meta: {
                auth: false,
                gtm: "ResetPassword",
            },
        },
        {
            path: "/signout",
            name: "SignOut",
            component: SignOut,
            meta: {
                auth: false,
                title: "Sign Out",
                gtm: "SignOut",
            },
        },
        {
            path: "/signedin",
            name: "SignedIn",
            component: SignedIn,
            meta: {
                auth: false,
                title: "Signed In",
                gtm: "SignedIn",
            },
        },
        {
            path: "/invited",
            name: "Invited",
            component: Invited,
            meta: {
                auth: false,
                title: "Invited",
                gtm: "Invited",
            },
        },
    ],
};

let workspacePages = {
    path: "/",
    component: WorkspaceLayout,
    name: "Authentication",
    children: [
        {
            path: "/create-workspace",
            name: "CreateWorkspace",
            component: CreateWorkspace,
            meta: {
                auth: false,
                title: "Create Workspace",
                gtm: "CreateWorkspace",
            },
        },
        {
            path: "/choose-workspace",
            name: "ChooseWorkspace",
            component: ChooseWorkspace,
            meta: {
                auth: false,
                title: "Choose Workspace",
                gtm: "ChooseWorkspace",
            },
        },
    ],
};
let publicPages = {
    path: "/",
    component: ForVendorLayout,
    name: "ForVendors",
    children: [
        {
            path: '/vendors/:vendorId/proposal-request/:rfpId',
            name: 'VendorProposal',
            component: ForVendors,
            meta: {
                auth: false,
                title: 'For Vendors',
                gtm: 'ForVendors'
            },
        },
    ]
}

let forProposals = {
    path: "/",
    component: ForProposalsLayout,
    name: "ForProposalsLayout",
    children: [
        {
            path: '/vendors/:vendorId/proposal-request/:id/form',
            name: "ForProposals",
            component: ForProposals,
            meta: {
                auth: false,
                title: 'For Proposals',
                gtm: 'ForProposals'
            },
        },
        {
            path: '/proposal-request/:id/form',
            name: "ForProposals",
            component: ForProposals,
            meta: {
                auth: false,
                title: 'For Proposals',
                gtm: 'ForProposals'
            },
        },
        {
            path: '/vendors/:vendorId/events/:eventId/proposal-request/:id/form',
            name: "ForProposals",
            component: ForProposals,
            meta: {
                auth: false,
                title: 'For Proposals',
                gtm: 'ForProposals'
            },
        },
    ]
}

let vendorSignup = {
    path: "/",
    component: VendorSignupLayout,
    name: "VendorSignupLayout",
    children: [
        {
            path: "/vendor-signup",
            name: "VendorSignup",
            component: VendorSignup,
            meta: {
                auth: false,
                title: "Vendor Signup",
                gtm: "VendorSignup",
            },
        },
    ],
};

let appPages = {
    path: "/app",
    component: DashboardLayout,
    name: "App",
    children: [
        {
            path: "/vendors/:id/detail",
            name: "VendorDetails",
            component: CurrentVendors,
            meta: {
                title: "Vendor Page",
                gtm: "Vendor Details",
                opaque: false,
            },
        },
        {
            path: "/vendors/:id/edit",
            name: "EditVendor",
            component: AddEditVendor,
            meta: {
                title: "Edit Vendor Details",
                gtm: "Edit Vendor Details",
            },
        },
    ],
};
let EventPages = {
    path: "/app2",
    component: NewEventLayout,
    name: "App2",
    children: [
        {
            path: "/events/proposal",
            name: "EventProposal",
            component: EventProposal,
            meta: {
                title: "Event Proposal",
            },
        },
        {
            path: "/events/:id/edit/budget",
            name: "EventDetailsBudget",
            component: EventDetailsBudget,
            meta: {
                title: "Event Details",
                gtm: "Event Edit",
                opaque: false,
            },
        },
        {
            path: "/events/:id/overview",
            name: "EventDetailsOverView",
            component: EventDetailsOverView,
            meta: {
                title: "Event Details",
                gtm: "Event Edit",
                opaque: false,
            },
        },
        {
            path: "/events/:id/booking",
            redirect: "/events/:id/booking/timeline",
            name: "Timeline",
            meta: {
                gtm: "Timeline",
            },
        },
        {
            path: "/events/:id/booking/:blockId",
            name: "EventPlan",
            component: EventPlan,
            meta: {
                title: "Plan Event",
                gtm: "Plan Event",
                opaque: false,
            },
        },
        {
            path: "/events/:id/proposal-details/:vendorId/:proposalId",
            name: "EventProposalDetails",
            component: EventProposalDetails,
            meta: {
                title: "EventProposalDetails",
                gtm: "Event Proposal Details",
                opaque: false,
            },
        },
        {
            path: "/vendors-pool",
            name: "VendorsPoolNew",
            component: VendorsPoolNew,
            meta: {
                gtm: "VendorsPoolNew",
            },
        },
    ],
};
let PublicCreateEvent = {
    path: "/app-public",
    component: CreateEvent,
    name: "CreateEvent",
    meta: {
        auth: false,
    },
    children: [
        {
            path: "/create-event-wizard",
            name: "EventWizardStart",
            component: EventWizardStart,
            meta: {
                title: "Event Wizard",
                gtm: "Event Wizard",
                auth: false,
            },
        },
        {
            path: "/event-wizard-day",
            name: "EventWizardDay",
            component: EventWizardDay,
            meta: {
                title: "Event Day",
                gtm: "Event Day",
                auth: false,
            },
        },
        {
            path: "/event-wizard-flexibility",
            name: "EventWizardDateFlexibility",
            component: EventWizardDateFlexibility,
            meta: {
                title: "Event Day Flexibility",
                gtm: "Event Day Flexibility",
                auth: false,
            },
        },
        {
            path: "/event-wizard-guests",
            name: "EventWizardGuests",
            component: EventWizardGuests,
            meta: {
                title: "Event Guests",
                gtm: "Event Guests",
                auth: false,
            },
        },
        {
            path: "/event-wizard-guests-type",
            name: "EventWizardGuestsType",
            component: EventWizardGuestsType,
            meta: {
                title: "Event Guests Type",
                gtm: "Event Guests",
                auth: false,
            },
        },
        {
            path: "/event-wizard-location",
            name: "EventWizardLocation",
            component: EventWizardLocation,
            meta: {
                title: "Event  Location",
                gtm: "Event Location",
                auth: false,
            },
        },
        {
            path: "/event-wizard-building",
            name: "EventWizardBuilding",
            component: EventWizardBuilding,
            meta: {
                title: "Event Building",
                gtm: "Event Building",
                auth: false,
            },
        },
        {
            path: "/event-wizard-type",
            name: "EventWizardType",
            component: EventWizardType,
            meta: {
                title: "Event  Type",
                gtm: "Event Type",
                auth: false,
            },
        },
        {
            path: "/event-wizard-celebrating",
            name: "EventWizardCelebrating",
            component: EventWizardCelebrating,
            meta: {
                title: "Event celebrating",
                gtm: "Event celebrating",
                auth: false,
            },
        },
        {
            path: "/event-wizard-religion",
            name: "EventWizardReligion",
            component: EventWizardReligion,
            meta: {
                title: "Event Guests Religion",
                gtm: "Event Religion",
                auth: false,
            },
        },
        {
            path: "/event-wizard-vibes",
            name: "EventWizardVibes",
            component: EventWizardVibes,
            meta: {
                title: "Event Guests Religion",
                gtm: "Event Religion",
                auth: false,
            },
        },
        {
            path: "/event-wizard-create",
            name: "EventCreatePage",
            component: EventCreatePage,
            meta: {
                title: "EventCreatePage",
                gtm: "Event Create",
                opaque: false,
            },
        },
    ],
};

let HomePages = {
    path: "/app2",
    component: HomeLayout,
    name: "HomePageLayout",
    children: [
        {
            path: "/events",
            name: "Events",
            component: Events,
            meta: {
                title: "Our Events",
                gtm: "Events",
            },
        },
    ],
};

let RSVPPages = {
    path: "/app2",
    component: LandingPageLayout,
    name: "LandingPageLayout",
    children: [
        {
            path: "/rsvp/:eventId",
            name: "RSVP",
            component: RSVPEvent,
            meta: {
                title: "Our Events",
                gtm: "Events",
            },
        },
    ],
};

let feedbackPages = {
    path: "/app2",
    component: LandingPageLayout,
    name: "LandingPageLayout",
    children: [
        {
            path: "/landingpage/feedback/:eventId",
            name: "Event Feedback",
            component: FeedbackLandingPage,
            meta: {
                title: "Feedback Form",
                gtm: "Feedback",
            },
        },
    ],
};

const rememberMe = authService.getCookie("rememberMe");
const homeLink = rememberMe === "true" ? "/events" : "/signin";
const routes = [
    {
        path: "/",
        redirect: "/signin",
        name: "Root",
        meta: {
            gtm: "Root",
        },
    },
    authPages,
    workspacePages,
    appPages,
    publicPages,
    PublicCreateEvent,
    HomePages,
    forProposals,
    vendorSignup,
    EventPages,
    RSVPPages,
    feedbackPages,
];

export default routes;
