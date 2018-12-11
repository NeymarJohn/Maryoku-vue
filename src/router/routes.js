import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Dashboard/Pages/AuthLayout.vue";

import Home from "@/pages/app/Home.vue";
import Me from "@/pages/app/Me.vue";
import Profile from "@/pages/app/Profile.vue";
import MyCompany from "@/pages/app/MyCompany/MyCompany.vue";
import MyCompanyDashboard from "@/pages/app/MyCompany/MyCompanyDashboard.vue";
import MyCompanyBilling from "@/pages/app/MyCompany/MyCompanyBilling.vue";
import MyCompanyApprovals from "@/pages/app/MyCompany/MyCompanyApprovals.vue";
import MyCompanyProfile from "@/pages/app/MyCompany/MyCompanyProfile.vue";
import MyCompanySettings from "@/pages/app/MyCompany/MyCompanySettings.vue";
import Team from "@/pages/app/Team/Team.vue";
import Community from "@/pages/app/Community.vue";
import CommunityNew from "@/pages/app/Community/Community-new.vue";
import VendorsSuggested from "@/pages/app/Community/vendors-suggested/index.vue";

import Events from "@/pages/app/Events.vue";
import Notes from "@/pages/app/Notes.vue";
import Proposals from "@/pages/app/Proposals.vue";
import Vendors from "@/pages/app/Vendors.vue";
import YearlyPlan from "@/pages/app/YearlyPlan.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard/Dashboard.vue";

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
      meta: {auth: false}
    },
    {
      path: "/signout",
      name: "SignOut",
      component: SignOut,
      meta: {auth: false, title: 'Sign Out'}
    },
    {
      path: "/get-started",
      name: "GetStarted",
      component: Onboarding,
      meta: {auth: false, title: 'Get Started'}
    },
    {
      path: "/signedin",
      name: "SignedIn",
      component: SignedIn,
      meta: {auth: false, title: 'Signed In'}
    }
  ]
};

let appPages = {
  path: "/",
  component: DashboardLayout,
  name: "App",
  children: [
    {
      path: "/me",
      name: "Me",
      component: Me
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/my-company",
      name: "MyCompany",
      component: MyCompany,
      /*redirect: "/my-company/dashboard",*/
      meta: {title: "My Company"},
      /*children: [
        {
          path: 'dashboard',
          name: 'MyCompanyDashboard',
          component: MyCompanyDashboard,
          meta: {title: 'My Company / Dashboard'}
        },
        {
          path: 'company-profile',
          name: 'MyCompanyProfile',
          component: MyCompanyProfile,
          meta: {title: 'My Company / Company Profile'}
        },
        {
          path: 'approvals',
          name: 'MyCompanyApprovals',
          component: MyCompanyApprovals,
          meta: {title: 'My Company / Approvals Sign-Off'}
        },
        {
          path: 'billing',
          name: 'MyCompanyBilling',
          component: MyCompanyBilling,
          meta: {title: 'My Company / Billing'}
        },
        {
          path: 'company-settings',
          name: 'MyCompanySettings',
          component: MyCompanySettings,
          meta: {title: 'My Company / Settings'}
        },
      ]*/
    },
    {
      path: "/team",
      name: "Team",
      component: Team
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
      meta: {title: 'Our Events'}
    },
    {
      path: "/yearly-plan",
      name: "YearlyPlan",
      component: YearlyPlan,
      meta: {title: "Yearly Plan"}
    },
    {
      path: "/vendors",
      name: "Vendors",
      component: Vendors
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

const routes = [
  {
    path: "/",
    redirect: "/me",
    name: "Root"
  },
  componentsMenu,
  /*formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,*/
  authPages,
  appPages,
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
