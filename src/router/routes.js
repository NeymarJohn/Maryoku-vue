import DashboardLayout from '@/pages/Dashboard/Layout/DashboardLayout.vue';
import EventLayout from '@/pages/Dashboard/Layout/EventLayout.vue';
import AuthLayout from '@/pages/Dashboard/Pages/AuthLayout.vue';
import PublicLayout from '@/pages/Dashboard/Pages/PublicLayout.vue';
import Me from '@/pages/app/Me.vue';
import Profile from '@/pages/app/Profile/index.vue';
import MyCompany from '@/pages/app/MyCompany/MyCompany.vue';
import MyCompanyNew from '@/pages/app/MyCompany/MyCompanyNew.vue';
import CompanyDashboard from '@/pages/app/CompanyDashboard/CompanyDashboard.vue';


import MyCompanyDashboard from "@/pages/app/MyCompany/MyCompanyDashboard.vue";
import MyCompanyBilling from "@/pages/app/MyCompany/MyCompanyBilling.vue";
import MyCompanyApprovals from "@/pages/app/MyCompany/MyCompanyApprovals.vue";
import MyCompanyProfile from "@/pages/app/MyCompany/MyCompanyProfile.vue";
import MyCompanySettings from "@/pages/app/MyCompany/MyCompanySettings.vue";

import Team from "@/pages/app/Team/Team.vue";
import Members from "@/pages/app/Members/Members.vue";
import Community from "@/pages/app/Community.vue";
import CommunityNew from "@/pages/app/Community/Community-new.vue";
import VendorsSuggested from "@/pages/app/Community/vendors-suggested/index.vue";

import Events from "@/pages/app/Events/Events.vue";
import CurrentEvents from "@/pages/app/Events/CurrentEvents.vue";
import EventGroups from "@/pages/app/Events/components/EventInvitees.vue";
import NewEvent from "@/pages/app/Events/NewEvent.vue";
import EditEvent from "@/pages/app/Events/EditEvent.vue";
import EventDetails from "@/pages/app/Events/EventDetails.vue";
import EditEventNew from "@/pages/app/Events/EditEventNew.vue";
import ShowEvent from "@/pages/app/Events/ShowEvent.vue";
import VendorProposals from "@/pages/app/Events/VendorProposals.vue";
import EventProposal from "@/pages/app/Events/EventProposal.vue";
import Notes from "@/pages/app/Notes.vue";
import Proposals from "@/pages/app/Proposals.vue";
import Vendors from "@/pages/app/Vendors/Vendors.vue";
import ImportVendors from "@/pages/app/Vendors/ImportVendors.vue";
import YearlyPlan from "@/pages/app/YearlyPlan/index.vue";
import AnnualPlanner from "@/pages/app/AnnualPlanner/index.vue";


// Dashboard pages
import EmployeeMain from '@/pages/Dashboard/Pages/CommonInfoProfile/Employee.vue';
import OfficeMenageMain from '@/pages/Dashboard/Pages/CommonInfoProfile/OfficeMenage.vue';
import CommonInfoProfile from '@/pages/Dashboard/Pages/CommonInfoProfile/index.vue';
import EventForm from '@/pages/Dashboard/Pages/CommonInfoProfile/EventForm.vue';
import Dietary from '@/pages/Dashboard/Pages/CommonInfoProfile/Dietary.vue';
import Company from '@/pages/Dashboard/Pages/CommonInfoProfile/Company.vue';
import Step2 from '@/pages/Dashboard/Pages/CommonInfoProfile/Step2.vue';
import Invite from '@/pages/Dashboard/Pages/CommonInfoProfile/Invite.vue';
import CreateWorkspace from '@/pages/Dashboard/Pages/CreateWorkspace';
import ChooseWorkspace from '@/pages/Dashboard/Pages/ChooseWorkspace';

import GetStarted from '@/pages/app/GetStarted';
import EmptyLayout from '../pages/Dashboard/Pages/EmptyLayout';
import MarketPlaceLayout from '../pages/Dashboard/Pages/MarketPlaceLayout';
const SignInSignUp = () => import("@/pages/Dashboard/Pages/SignInSignUp.vue");
const SignOut = () => import("@/pages/Dashboard/Pages/SignOut.vue");
const SignedIn = () => import("@/pages/Dashboard/Pages/SignedIn.vue");

import MyEvents from '@/pages/app/Guest/MyEvents.vue';
import MarketPlace from '@/pages/app/MarketPlace/MarketPlace.vue';

let authPages = {
    path: "/",
    component: AuthLayout,
    name: "Authentication",
    children: [
        {
            path: "/signin",
            name: "SignIn",
            component: SignInSignUp,
            meta: {auth: false, gtm: "SignIn"}
        },
        {
            path: "/signout",
            name: "SignOut",
            component: SignOut,
            meta: {auth: false, title: 'Sign Out', gtm: "SignOut"}
        },
        {
            path: "/signedin",
            name: "SignedIn",
            component: SignedIn,
            meta: {auth: false, title: 'Signed In', gtm: "SignedIn"}
        },
        {
            path: "/create-workspace",
            name: "CreateWorkspace",
            component: CreateWorkspace,
            meta: {auth: false, title: 'Create Workspace', gtm: "CreateWorkspace"}
        },
        {
            path: "/choose-workspace",
            name: "ChooseWorkspace",
            component: ChooseWorkspace,
            meta: {auth: false, title: 'Choose Workspace', gtm: "ChooseWorkspace"}
        },
    ]
};

let publicPages = {
  path: "/",
  component: PublicLayout,
  name: "Public",
  children: [
    {
      path: "/events/:id/public",
      name: "ShowEvent",
      component: ShowEvent,
      meta: {auth: false, title: 'Event', gtm: "Event"},
    },
      {
          path: "/vendor-proposals",
          name: "VendorProposals",
          component: VendorProposals,
          meta: {auth: false, title: 'Vendor Proposals', gtm: "VendorProposals"},
      },
    /*{
      path: "/get-started",
      name: "GetStarted",
      component: Onboarding,
      meta: {auth: false, title: 'Get Started', gtm: "GetStarted"}
    },*/
  ]
};
let marketPlacePages = {
  path: "/",
  component: MarketPlaceLayout,
  name: "Market",
  children: [
    {
        path: "/market-place",
        name: "MarketPlace",
        component: MarketPlace,
        meta: {auth: false, title: 'Choose Workspace', gtm: "MarketPlace"}
    },
  ]
};

let emptyLayoutPages = {
    path: "/",
    component: EmptyLayout,
    name: "Empty",
    children: [
        {
            path: "/get-started",
            name: "GetStarted",
            component: GetStarted,
            meta: {auth: true, title: 'Get Started', gtm: "GetStarted"}
        },
        {
            path: "/my-events",
            name: "MyEvents",
            component: MyEvents,
            meta: {auth: true, title: 'My Events', gtm: "MyEvents"}
        },
  
    ]
};

let appPages = {
    path: "/app",
    component: DashboardLayout,
    name: "App",
    children: [
        {
            path: "/me",
            name: "Me",
            component: Me,
            meta: {gtm: "Me"}
        },
        {
            path: "/settings",
            name: "Settings",
            component: Profile,
            meta: {gtm: "Settings"}
        },

        {
            path: "/company",
            name: "CompanyDashboard",
            component: CompanyDashboard,
            meta: {title: "Company Dashboard", gtm: "CompanyDashboard"},
        },
        {
            path: "/old-company",
            name: "MyCompany",
            component: MyCompanyNew,
            meta: {title: "My Company", gtm: "MyCompany"},
        },
        {
            path: "/team",
            name: "Team",
            component: Members,
            meta: {gtm: "Team"}
        },
        {
            path: "/community",
            name: "Community",
            component: Community
        },
        {
            path: "/vendors-suggested",
            name: "VendorsSuggested",
            component: VendorsSuggested
        },
        {
            path: "/community-new",
            name: "Community-new",
            component: CommunityNew
        },
        {
            path: "/yearly-plan",
            name: "YearlyPlan",
            component: YearlyPlan,
            meta: {title: "Yearly Plan"}
        },
        {
            path: "/planner/:year/:month",
            name: "AnnualPlannerYearMonth",
            component: AnnualPlanner,
            meta: {title: "Planner", gtm: "Planner"}
        },
        {
            path: "/planner/:year",
            name: "AnnualPlannerYear",
            component: AnnualPlanner,
            meta: {title: "Planner", gtm: "Planner"}
        },
        {
            path: "/planner",
            name: "AnnualPlanner",
            component: AnnualPlanner,
            meta: {title: "Planner", gtm: "Planner"}
        },
        {
            path: "/vendors",
            name: "Vendors",
            component: Vendors,
            meta: {gtm: "Vendors"}
        },
        {
            path: "/import-vendors",
            name: "ImportVendors",
            component: ImportVendors
        },
        {
            path: "/proposals",
            name: "Proposals",
            component: Proposals
        },
        {
            path: "/notes",
            name: "Notes",
            component: Notes
        },
        {
            path: "/events/:id/edit",
            name: "EventDetails",
            component: EventDetails,
            meta: {title: 'Event Page', gtm: "Event Details", opaque: false},
        }
    ]
};
let EventPages = {
    path: "/app",
    component: EventLayout,
    name: "App",
    children: [
        {
            path: "/events",
            name: "Events",
            component: Events,
            meta: {title: 'Our Events', gtm: "Events"},
        },
        {
            path: "/events/proposal",
            name: "EventProposal",
            component: EventProposal,
            meta: {title: 'Event Proposal'},
        },
        {
            path: '/events/new',
            name: 'NewEvent',
            component: NewEvent,
            meta: {title: 'Create New Event'},
        },
        {
            path: "/events/:id/edit/details",
            name: "EditEvent",
            component: CurrentEvents,
            meta: {title: 'Event Details', gtm: "Event Edit", opaque: false}
        },
        {
            path: "/events/:id/edit/building-blocks",
            name: "EditBuildingBlocks",
            component: CurrentEvents,
            meta: {title: 'Building Blocks', gtm: "Building Blocks", opaque: false},
        },
        {
            path: "/events/:id/edit/timeline",
            name: "EditTimeLine",
            component: CurrentEvents,
            meta: {title: 'Timeline', gtm: "Event Timeline", opaque: false},
        },
        {
            path: "/events/:id/edit/invitees-management",
            name: "InviteesManagement",
            component: CurrentEvents,
            meta: {title: 'Automated Interactions', gtm: "Event Edit", opaque: false},
        },
        {
            path: "/events/:id/edit/event-invitees",
            name: "EventInvitees",
            component: CurrentEvents,
            meta: {title: 'Event Invitees', gtm: "Event Invitees", opaque: false},
        }
    ]
};

const appCurrentInfo={
    path: "/additional-form",
    name: "CommonInfoProfile",
    component: CommonInfoProfile,
    children: [
        {
            path: "/employee-form",
            name: "EmployeeMain",
            component: EmployeeMain
        },
        {
            path: "/officeManager-form",
            name: "OfficeMenageMain",
            component: OfficeMenageMain
        },
        {
            path: "/events-data",
            name: "EventForm",
            component: EventForm
        },
        ,
        {
            path: "/dietary",
            name: "Dietary",
            component: Dietary
        },
        {
            path: "/company-form",
            name: "Company",
            component: Company
        },
        {
            path: "/me-form",
            name: "MeForm",
            component: Step2
        },
        {
            path: "/invite",
            name: "InviteEmployee",
            component: Invite
        },
    ]
};

const routes = [
    {
        path: "/",
        redirect: "/planner",
        name: "Root",
        meta: {gtm : "Root"}
    },
    appCurrentInfo,
    authPages,
    appPages,
    publicPages,
    emptyLayoutPages,
    EventPages,
    marketPlacePages
];

export default routes;
