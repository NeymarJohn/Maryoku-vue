import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Dashboard/Pages/AuthLayout.vue";
import PublicLayout from "@/pages/Dashboard/Pages/PublicLayout.vue";

import Home from "@/pages/app/Home.vue";
import Me from "@/pages/app/Me.vue";
import Profile from "@/pages/app/Profile/index.vue";
import MyCompany from "@/pages/app/MyCompany/MyCompany.vue";
import MyCompanyNew from "@/pages/app/MyCompany/MyCompanyNew.vue";
import CompanyDashboard from "@/pages/app/CompanyDashboard/CompanyDashboard.vue";

import MyCompanyDashboard from "@/pages/app/MyCompany/MyCompanyDashboard.vue";
import MyCompanyBilling from "@/pages/app/MyCompany/MyCompanyBilling.vue";
import MyCompanyApprovals from "@/pages/app/MyCompany/MyCompanyApprovals.vue";
import MyCompanyProfile from "@/pages/app/MyCompany/MyCompanyProfile.vue";
import MyCompanySettings from "@/pages/app/MyCompany/MyCompanySettings.vue";

import Team from "@/pages/app/Team/Team.vue";
import Community from "@/pages/app/Community.vue";
import CommunityNew from "@/pages/app/Community/Community-new.vue";
import VendorsSuggested from "@/pages/app/Community/vendors-suggested/index.vue";

import Events from "@/pages/app/Events/Events.vue";
import CurrentEvents from "@/pages/app/Events/CurrentEvents.vue";
import NewEvent from "@/pages/app/Events/NewEvent.vue";
import EditEvent from "@/pages/app/Events/EditEvent.vue";
import EventDetails from "@/pages/app/Events/EventDetails.vue";
import EditEventNew from "@/pages/app/Events/EditEventNew.vue";
import ShowEvent from "@/pages/app/Events/ShowEvent.vue";
import EventProposal from "@/pages/app/Events/EventProposal.vue";
import Notes from "@/pages/app/Notes.vue";
import Proposals from "@/pages/app/Proposals.vue";
import Vendors from "@/pages/app/Vendors/Vendors.vue";
import ImportVendors from "@/pages/app/Vendors/ImportVendors.vue";
import YearlyPlan from "@/pages/app/YearlyPlan/index.vue";
import AnnualPlanner from "@/pages/app/AnnualPlanner/index.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard/Dashboard.vue";

//OM/Emp_info_pages
import EmployeeMain from '@/pages/Dashboard/Pages/CommonInfoProfile/Employee.vue'
import OfficeMenageMain from '@/pages/Dashboard/Pages/CommonInfoProfile/OfficeMenage.vue'
import CommonInfoProfile from '@/pages/Dashboard/Pages/CommonInfoProfile/index.vue'
import EventForm from '@/pages/Dashboard/Pages/CommonInfoProfile/EventForm.vue'
import Dietary from '@/pages/Dashboard/Pages/CommonInfoProfile/Dietary.vue'
import Company from '@/pages/Dashboard/Pages/CommonInfoProfile/Company.vue'
import Step2 from '@/pages/Dashboard/Pages/CommonInfoProfile/Step2.vue'
import Invite from '@/pages/Dashboard/Pages/CommonInfoProfile/Invite.vue'
// Pages
const User = () => import("@/pages/Dashboard/Pages/UserProfile.vue");
const Pricing = () => import("@/pages/Dashboard/Pages/Pricing.vue");
const TimeLine = () => import("@/pages/Dashboard/Pages/TimeLinePage.vue");
const RtlSupport = () => import("@/pages/Dashboard/Pages/RtlSupport.vue");
const Login = () => import("@/pages/Dashboard/Pages/Login.vue");
const Register = () => import("@/pages/Dashboard/Pages/Register.vue");
const SignInSignUp = () => import("@/pages/Dashboard/Pages/SignInSignUp.vue");
const SignOut = () => import("@/pages/Dashboard/Pages/SignOut.vue");
const Onboarding = () => import("@/pages/Dashboard/Pages/Onboarding.vue");
const SignedIn = () => import("@/pages/Dashboard/Pages/SignedIn.vue");
const Lock = () => import("@/pages/Dashboard/Pages/Lock.vue");
// const EmployeeMain = () => import("@/pages/Pages/CommonInfoProfile/Employee.vue");
// const OfficeMenageMain = () => import("@/pages/Pages/CommonInfoProfile/OfficeMenage.vue");
// import EmployeeMain from '@/pages/Pages/CommonInfoProfile/Employee.vue'

// Components pages
const Buttons = () => import("@/pages/Dashboard/Components/Buttons.vue");
const GridSystem = () => import("@/pages/Dashboard/Components/GridSystem.vue");
const Panels = () => import("@/pages/Dashboard/Components/Panels.vue");
const SweetAlert = () => import("@/pages/Dashboard/Components/SweetAlert.vue");
const Notifications = () =>
  import("@/pages/Dashboard/Components/Notifications.vue");
const Icons = () => import("@/pages/Dashboard/Components/Icons.vue");
const Typography = () => import("@/pages/Dashboard/Components/Typography.vue");

// Forms pages
const RegularForms = () => import("@/pages/Dashboard/Forms/RegularForms.vue");
const ExtendedForms = () => import("@/pages/Dashboard/Forms/ExtendedForms.vue");
const ValidationForms = () =>
  import("@/pages/Dashboard/Forms/ValidationForms.vue");

// TableList pages
const RegularTables = () =>
  import("@/pages/Dashboard/Tables/RegularTables.vue");
const ExtendedTables = () =>
  import("@/pages/Dashboard/Tables/ExtendedTables.vue");
const PaginatedTables = () =>
  import("@/pages/Dashboard/Tables/PaginatedTables.vue");

// Maps pages
const GoogleMaps = () => import("@/pages/Dashboard/Maps/GoogleMaps.vue");
const FullScreenMap = () => import("@/pages/Dashboard/Maps/FullScreenMap.vue");
const VectorMaps = () => import("@/pages/Dashboard/Maps/VectorMaps.vue");

// Calendar
const Calendar = () => import("@/pages/Dashboard/Calendar.vue");
// Charts
const Charts = () => import("@/pages/Dashboard/Charts.vue");
import Widgets from "@/pages/Dashboard/Widgets.vue";
import CreateWorkspace from '@/pages/Dashboard/Pages/CreateWorkspace';

let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  redirect: "/components/buttons",
  name: "Components",
  children: [
    {
      path: "buttons",
      name: "Buttons",
      components: { default: Buttons }
    },
    {
      path: "grid-system",
      name: "Grid System",
      components: { default: GridSystem }
    },
    {
      path: "panels",
      name: "Panels",
      components: { default: Panels }
    },
    {
      path: "sweet-alert",
      name: "Sweet Alert",
      components: { default: SweetAlert }
    },
    {
      path: "notifications",
      name: "Notifications",
      components: { default: Notifications }
    },
    {
      path: "icons",
      name: "Icons",
      components: { default: Icons }
    },
    {
      path: "typography",
      name: "Typography",
      components: { default: Typography }
    }
  ]
};
let formsMenu = {
  path: "/forms",
  component: DashboardLayout,
  redirect: "/forms/regular",
  name: "Forms",
  children: [
    {
      path: "regular",
      name: "Regular Forms",
      components: { default: RegularForms }
    },
    {
      path: "extended",
      name: "Extended Forms",
      components: { default: ExtendedForms }
    },
    {
      path: "validation",
      name: "Validation Forms",
      components: { default: ValidationForms }
    }
  ]
};

let tablesMenu = {
  path: "/table-list",
  component: DashboardLayout,
  redirect: "/table-list/regular",
  name: "Tables",
  children: [
    {
      path: "regular",
      name: "Regular Tables",
      components: { default: RegularTables }
    },
    {
      path: "extended",
      name: "Extended Tables",
      components: { default: ExtendedTables }
    },
    {
      path: "paginated",
      name: "Pagianted Tables",
      components: { default: PaginatedTables }
    }
  ]
};

let mapsMenu = {
  path: "/maps",
  component: DashboardLayout,
  name: "Maps",
  redirect: "/maps/google",
  children: [
    {
      path: "google",
      name: "Google Maps",
      components: { default: GoogleMaps }
    },
    {
      path: "full-screen",
      name: "Full Screen Map",
      meta: {
        hideContent: true,
        hideFooter: true,
        navbarAbsolute: true
      },
      components: { default: FullScreenMap }
    },
    {
      path: "vector-map",
      name: "Vector Map",
      components: { default: VectorMaps }
    }
  ]
};

let pagesMenu = {
  path: "/pages",
  component: DashboardLayout,
  name: "Pages",
  redirect: "/pages/user",
  children: [
    {
      path: "user",
      name: "User Page",
      components: { default: User }
    },
    {
      path: "timeline",
      name: "Timeline Page",
      components: { default: TimeLine }
    },
    {
      path: "rtl",
      name: "وحة القيادة",
      meta: {
        rtlActive: true
      },
      components: { default: RtlSupport }
    }
  ]
};

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
    }
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
      path: "/get-started",
      name: "GetStarted",
      component: Onboarding,
      meta: {auth: false, title: 'Get Started', gtm: "GetStarted"}
    }
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
      component: Team,
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
      path: "/events/:id/edit",
      name: "EventDetails",
      component: EventDetails,
      meta: {title: 'Event Planner / Event Page', gtm: "Event Details", opaque: false},
    },
      {
          path: "/events/:id/edit/details",
          name: "EditEvent",
          component: CurrentEvents,
          meta: {title: 'Event Planner / Event Details', gtm: "Event Edit", opaque: true}
      },
      {
          path: "/events/:id/edit/building-blocks",
          name: "EditBuildingBlocks",
          component: CurrentEvents,
          meta: {title: 'Event Planner / Building Blocks', gtm: "Building Blocks", opaque: true},
      },
    {
        path: "/events/:id/edit/timeline",
        name: "EditTimeLine",
        component: CurrentEvents,
        meta: {title: 'Event Planner / Timeline', gtm: "Event Timeline", opaque: true},
    },
    {
        path: "/events/:id/edit/invitees-management",
        name: "InviteesManagement",
        component: CurrentEvents,
        meta: {title: 'Event Planner / Invitees Management', gtm: "Event Edit", opaque: true},
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
      name: "AnnualPlannerYEar",
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
}

const routes = [
  {
    path: "/",
    redirect: "/company",
    name: "Root",
    meta: {gtm : "Root"}
  },
  /*componentsMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,*/
  appCurrentInfo,
  authPages,
  appPages,
  publicPages,
  /*{
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "me",
        name: "Home",
        components: { default: Home }
      },
      {
        path: "my-company",
        name: "MyCompany",
        components: { default: MyCompany }
      },
      {
        path: "calendar",
        name: "Calendar",
        components: { default: Calendar }
      },
      {
        path: "charts",
        name: "Charts",
        components: { default: Charts }
      },
      {
        path: "widgets",
        name: "Widgets",
        components: { default: Widgets }
      }
    ]
  }*/
];

export default routes;
