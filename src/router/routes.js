import DashboardLayout from '@/pages/Dashboard/Layout/DashboardLayout.vue'
import EventLayout from '@/pages/Dashboard/Layout/EventLayout.vue'
import AuthLayout from '@/pages/Dashboard/Pages/AuthLayout.vue'
import PublicLayout from '@/pages/Dashboard/Pages/PublicLayout.vue'
import Me from '@/pages/app/Me.vue'
import Profile from '@/pages/app/Profile/index.vue'
import MyCompany from '@/pages/app/MyCompany/MyCompany.vue'
import MyCompanyNew from '@/pages/app/MyCompany/MyCompanyNew.vue'
import CompanyDashboard from '@/pages/app/CompanyDashboard/CompanyDashboard.vue'
import CreateEvent from '@/pages/Dashboard/Layout/CreateEvent.vue'
import HomeLayout from '@/pages/Dashboard/Layout/HomeLayout.vue'
import SigninSignupLayout from '@/pages/Dashboard/Layout/SigninSignupLayout.vue'
import NewEventLayout from '@/pages/Dashboard/Layout/NewEventLayout.vue'

import Team from '@/pages/app/Team/Team.vue'
import Members from '@/pages/app/Members/Members.vue'

import Events from '@/pages/app/Events/Events.vue'
import CurrentEvents from '@/pages/app/Events/CurrentEvents.vue'
import EventGroups from '@/pages/app/Events/components/EventInvitees.vue'
import NewEvent from '@/pages/app/Events/NewEvent.vue'
import EditEvent from '@/pages/app/Events/EditEvent.vue'
import EventDetails from '@/pages/app/Events/EventDetails.vue'
import EventDetailsOverView from '@/pages/app/Events/EventDetailsOverview.vue'
import ShowEvent from '@/pages/app/Events/ShowEvent.vue'
import VendorProposals from '@/pages/app/Events/VendorProposals.vue'
import EventProposal from '@/pages/app/Events/EventProposal.vue'
import EventSteps from '@/pages/app/Events/Steps'
import Notes from '@/pages/app/Notes.vue'
import Proposals from '@/pages/app/Proposals.vue'
import Vendors from '@/pages/app/Vendors/Vendors.vue'
import CurrentVendors from '@/pages/app/Vendors/CurrentVendors.vue'
import AddEditVendor from '@/pages/app/Vendors/AddEditVendor.vue'
import EditVendor from '@/pages/app/Vendors/EditVendor.vue'
import VendorsPool from '@/pages/app/Vendors/VendorsPool.vue'
import ImportVendors from '@/pages/app/Vendors/ImportVendors.vue'
import YearlyPlan from '@/pages/app/YearlyPlan/index.vue'
import AnnualPlanner from '@/pages/app/AnnualPlanner/index.vue'
import EventWizard from '@/pages/app/CreateEvent/EventWizard.vue'
import EventInfo from '@/pages/app/CreateEvent/EventInfo.vue'
import EventBudget from '@/pages/app/CreateEvent/EventBudget.vue'
import EventVibe from '@/pages/app/CreateEvent/EventVibe.vue'
import EventMovies from '@/pages/app/CreateEvent/EventMovies.vue'
import EventScales from '@/pages/app/CreateEvent/EventScales.vue'
import EventStartWorking from '@/pages/app/CreateEvent/EventStartWorking.vue'
import EventCreated from '@/pages/app/CreateEvent/EventCreated.vue'
import EventSummery from '@/pages/app/CreateEvent/EventSummery.vue'
import HomePage from '@/pages/app/HomePage/Home.vue'
import publicRegister from '@/pages/app/SinginSingup/publicRegister.vue'

// New Event Pages
import EventDetailsBudget from "@/pages/app/Events/EventDetailsBudget.vue"
import EventDetailsTimeline from "@/pages/app/Events/EventDetailsTimeline.vue"
import BookingEvent from "@/pages/app/Events/components/BookingEvent.vue"
import ChooseEventConcept from "@/pages/app/Events/components/ChooseEventConcept.vue"
import EventProposalDetails from "@/pages/app/Events/components/EventProposalDetails.vue"
import ExportTimeLine from "@/pages/app/Events/components/ExportTimeLine.vue"

// Dashboard pages
import EmployeeMain from '@/pages/Dashboard/Pages/CommonInfoProfile/Employee.vue'
import OfficeMenageMain from '@/pages/Dashboard/Pages/CommonInfoProfile/OfficeMenage.vue'
import CommonInfoProfile from '@/pages/Dashboard/Pages/CommonInfoProfile/index.vue'
import EventForm from '@/pages/Dashboard/Pages/CommonInfoProfile/EventForm.vue'
import Dietary from '@/pages/Dashboard/Pages/CommonInfoProfile/Dietary.vue'
import Company from '@/pages/Dashboard/Pages/CommonInfoProfile/Company.vue'
import Step2 from '@/pages/Dashboard/Pages/CommonInfoProfile/Step2.vue'
import Invite from '@/pages/Dashboard/Pages/CommonInfoProfile/Invite.vue'
import CreateWorkspace from '@/pages/Dashboard/Pages/CreateWorkspace'
import ChooseWorkspace from '@/pages/Dashboard/Pages/ChooseWorkspace'

import GetStarted from '@/pages/app/GetStarted'
import EmptyLayout from '../pages/Dashboard/Pages/EmptyLayout'
import MarketPlaceLayout from '../pages/Dashboard/Pages/MarketPlaceLayout'

import MyEvents from '@/pages/app/Guest/MyEvents.vue'
import MarketPlace from '@/pages/app/MarketPlace/MarketPlace.vue'

// New Vendor Pages
import ForVendorLayout from '@/pages/Dashboard/Layout/ForVendorLayout.vue'
import ForProposalsLayout from '@/pages/Dashboard/Layout/ForProposalsLayout.vue'
import ForVendors from "@/pages/app/Vendors/ForVendors.vue"
import ForProposals from "@/pages/app/Vendors/ForProposals.vue"

const SignInSignUp = () =>
  import('@/pages/Dashboard/Pages/SignInSignUp.vue')
const SignOut = () =>
  import('@/pages/Dashboard/Pages/SignOut.vue')
const SignedIn = () =>
  import('@/pages/Dashboard/Pages/SignedIn.vue')

let authPages = {
  path: '/',
  component: AuthLayout,
  name: 'Authentication',
  children: [{
    path: '/signin',
    name: 'SignIn',
    component: SignInSignUp,
    meta: {
      auth: false,
      gtm: 'SignIn'
    }
  },
  {
    path: '/signout',
    name: 'SignOut',
    component: SignOut,
    meta: {
      auth: false,
      title: 'Sign Out',
      gtm: 'SignOut'
    }
  },
  {
    path: '/signedin',
    name: 'SignedIn',
    component: SignedIn,
    meta: {
      auth: false,
      title: 'Signed In',
      gtm: 'SignedIn'
    }
  },
  {
    path: '/create-workspace',
    name: 'CreateWorkspace',
    component: CreateWorkspace,
    meta: {
      auth: false,
      title: 'Create Workspace',
      gtm: 'CreateWorkspace'
    }
  },
  {
    path: '/choose-workspace',
    name: 'ChooseWorkspace',
    component: ChooseWorkspace,
    meta: {
      auth: false,
      title: 'Choose Workspace',
      gtm: 'ChooseWorkspace'
    }
  }
  ]
}

let publicPages = {
  path: '/',
  component: PublicLayout,
  name: 'Public',
  children: [{
    path: '/events/:id/public',
    name: 'ShowEvent',
    component: ShowEvent,
    meta: {
      auth: false,
      title: 'Event',
      gtm: 'Event'
    }
  },
  {
    path: '/proposal-request/:id',
    name: 'VendorProposals2',
    component: VendorProposals,
    meta: {
      auth: false,
      title: 'Vendor Proposals',
      gtm: 'VendorProposals'
    }
  },
  {
    path: '/vendors/:vendorId/proposal-request/:id',
    name: 'VendorProposals',
    component: VendorProposals,
    meta: {
      auth: false,
      title: 'Vendor Proposals',
      gtm: 'VendorProposals'
    }
  }
    /* {
      path: "/get-started",
      name: "GetStarted",
      component: Onboarding,
      meta: {auth: false, title: 'Get Started', gtm: "GetStarted"}
    }, */
  ]
}

let forVendors = {
  path: "/",
  component: ForVendorLayout,
  name: "ForVendors",
  children: [
    {
      path: "/for-vendors",
      name: "ForVendors",
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
  name: "ForProposals",
  children: [
    {
      path: "/for-proposals",
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

let marketPlacePages = {
  path: '/',
  component: MarketPlaceLayout,
  name: 'Market',
  children: [{
    path: '/market-place',
    name: 'MarketPlace',
    component: MarketPlace,
    meta: {
      auth: false,
      title: 'Choose Workspace',
      gtm: 'MarketPlace'
    }
  } ]
}

let emptyLayoutPages = {
  path: '/',
  component: EmptyLayout,
  name: 'Empty',
  children: [{
    path: '/get-started',
    name: 'GetStarted',
    component: GetStarted,
    meta: {
      auth: true,
      title: 'Get Started',
      gtm: 'GetStarted'
    }
  },
  {
    path: '/my-events',
    name: 'MyEvents',
    component: MyEvents,
    meta: {
      auth: true,
      title: 'My Events',
      gtm: 'MyEvents'
    }
  }
  ]
}

let appPages = {
  path: '/app',
  component: DashboardLayout,
  name: 'App',
  children: [{
    path: '/me',
    name: 'Me',
    component: Me,
    meta: {
      gtm: 'Me'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Profile,
    meta: {
      gtm: 'Settings'
    }
  },

  {
    path: '/company',
    name: 'CompanyDashboard',
    component: CompanyDashboard,
    meta: {
      title: 'Company Dashboard',
      gtm: 'CompanyDashboard'
    }
  },
  {
    path: '/old-company',
    name: 'MyCompany',
    component: MyCompanyNew,
    meta: {
      title: 'My Company',
      gtm: 'MyCompany'
    }
  },
  {
    path: '/team',
    name: 'Team',
    component: Members,
    meta: {
      gtm: 'Team'
    }
  },
  {
    path: '/yearly-plan',
    name: 'YearlyPlan',
    component: YearlyPlan,
    meta: {
      title: 'Yearly Plan'
    }
  },
  {
    path: '/planner/:year/:month',
    name: 'AnnualPlannerYearMonth',
    component: AnnualPlanner,
    meta: {
      title: 'Planner',
      gtm: 'Planner'
    }
  },
  {
    path: '/planner/:year',
    name: 'AnnualPlannerYear',
    component: AnnualPlanner,
    meta: {
      title: 'Planner',
      gtm: 'Planner'
    }
  },
  {
    path: '/planner',
    name: 'AnnualPlanner',
    component: AnnualPlanner,
    meta: {
      title: 'Planner',
      gtm: 'Planner'
    }
  },
  {
    path: '/vendors',
    name: 'Vendors',
    component: Vendors,
    meta: {
      gtm: 'Vendors'
    }
  },
  {
    path: '/vendors/:id/detail',
    name: 'VendorDetails',
    component: CurrentVendors,
    meta: {
      title: 'Vendor Page',
      gtm: 'Vendor Details',
      opaque: false
    }
  },
  {
    path: '/vendors/create',
    name: 'CreateVendor',
    component: AddEditVendor,
    meta: {
      title: 'Add New Vendor',
      gtm: 'Add New Vendor'
    }
  },
  {
    path: '/vendors/:id/edit',
    name: 'EditVendor',
    component: AddEditVendor,
    meta: {
      title: 'Edit Vendor Details',
      gtm: 'Edit Vendor Details'
    }
  },
  {
    path: '/vendors-pool',
    name: 'VendorsPool',
    component: VendorsPool,
    meta: {
      gtm: 'VendorsPool'
    }
  },
  {
    path: '/import-vendors',
    name: 'ImportVendors',
    component: ImportVendors
  },
  {
    path: '/proposals',
    name: 'Proposals',
    component: Proposals
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes
  },
  {
    path: '/events/:id/edit',
    name: 'EventDetails',
    component: EventDetails,
    meta: {
      title: 'Event Page',
      gtm: 'Event Details',
      opaque: false
    }
  }
  ]
}
let EventPages = {
  path: '/app2',
  component: EventLayout,
  name: 'App2',
  children: [{
    path: '/events',
    name: 'Events',
    component: Events,
    meta: {
      title: 'Our Events',
      gtm: 'Events'
    }
  },
  {
    path: '/events/proposal',
    name: 'EventProposal',
    component: EventProposal,
    meta: {
      title: 'Event Proposal'
    }
  },
  {
    path: '/events/new',
    name: 'NewEvent',
    component: NewEvent,
    meta: {
      title: 'Create New Event'
    }
  },
  {
    path: '/events/:id/edit/details',
    name: 'EditEvent',
    component: CurrentEvents,
    meta: {
      title: 'Event Details',
      gtm: 'Event Edit',
      opaque: false
    }
  },
  {
    path: '/events/:id/edit/building-blocks',
    name: 'EditBuildingBlocks',
    component: CurrentEvents,
    meta: {
      title: 'Building Blocks',
      gtm: 'Building Blocks',
      opaque: false
    }
  },
  {
    path: '/events/:id/edit/timeline/current',
    name: 'EditTimeLine',
    component: CurrentEvents,
    meta: {
      title: 'Timeline',
      gtm: 'Event Timeline',
      opaque: false
    }
  },
  {
    path: '/events/:id/edit/invitees-management',
    name: 'InviteesManagement',
    component: CurrentEvents,
    meta: {
      title: 'Automated Interactions',
      gtm: 'Event Edit',
      opaque: false
    }
  },
  {
    path: '/events/:id/edit/event-invitees',
    name: 'EventInvitees',
    component: CurrentEvents,
    meta: {
      title: 'Event Invitees',
      gtm: 'Event Invitees',
      opaque: false
    }
  },

  // Event Wizard
  {
    path: '/event-steps/:id',
    name: 'EventSteps',
    component: EventSteps,
    meta: {
      title: 'Event Wizard',
      gtm: 'Event Wizard'
    }
  },
  {
    path: '/event/create',
    name: 'EventSteps',
    component: EventSteps,
    meta: {
      title: 'Event Wizard',
      gtm: 'Event Wizard'
    }
  },
  {
    path: '/event/:id/edit',
    name: 'EventSteps',
    component: EventSteps,
    meta: {
      title: 'Event Wizard',
      gtm: 'Event Wizard'
    }
  }
  ]
}

let NewEventPages = {
  path: '/app2',
  component: NewEventLayout,
  name: 'App2',
  children: [{
    path: '/events',
    name: 'Events',
    component: Events,
    meta: {
      title: 'Our Events',
      gtm: 'Events'
    }
  },
  {
    path: '/events/proposal',
    name: 'EventProposal',
    component: EventProposal,
    meta: {
      title: 'Event Proposal'
    }
  },
  {
    path: '/events/new',
    name: 'NewEvent',
    component: NewEvent,
    meta: {
      title: 'Create New Event'
    }
  },
  {
    path: '/events/:id/edit/budget',
    name: 'EditEventNew',
    component: EventDetailsBudget,
    meta: {
      title: 'Event Details',
      gtm: 'Event Edit',
      opaque: false
    }
  },
  {
    path: '/events/:id/edit/event',
    name: 'EventDetailsOverView',
    component: EventDetailsOverView,
    meta: {
      title: 'Event Details',
      gtm: 'Event Edit',
      opaque: false
    }
  },
  {
    path: '/events/:id/edit/building-blocks',
    name: 'EditBuildingBlocks',
    component: CurrentEvents,
    meta: {
      title: 'Building Blocks',
      gtm: 'Building Blocks',
      opaque: false
    }
  },
  {
    path: '/events/:id/edit/timeline',
    name: 'EditTimeLine',
    component: EventDetailsTimeline,
    meta: {
      title: 'Timeline',
      gtm: 'Event Timeline',
      opaque: false
    }
  },
  {
      path: '/events/:id/edit/timeline/export',
      name: 'EditTimeLine',
      component: ExportTimeLine,
      meta: {
          title: 'Timeline',
          gtm: 'Event Timeline',
          opaque: false
      }
  },
  {
    path: '/events/:id/booking/:blockId',
    name: 'BookingEvent',
    component: BookingEvent,
    meta: {
      title: 'BookingEvent',
      gtm: 'Booking Event',
      opaque: false
    }
  },
  {
      path: '/events/:id/choose-concept',
      name: 'ChooseEventConcept',
      component: ChooseEventConcept,
      meta: {
          title: 'Choose Concept',
          gtm: 'Choose Concept',
          opaque: false
      }
  },
  {
      path: '/events/:id/proposal-details/:vendorId/:proposalId',
      name: 'EventProposalDetails',
      component : EventProposalDetails,
      meta: {
          title: 'EventProposalDetails',
          gtm: 'Event Proposal Details',
          opaque: false
      },
  },
  {
    path: '/events/:id/edit/invitees-management',
    name: 'InviteesManagement',
    component: CurrentEvents,
    meta: {
      title: 'Automated Interactions',
      gtm: 'Event Edit',
      opaque: false
    }
  },
  {
    path: '/events/:id/edit/event-invitees',
    name: 'EventInvitees',
    component: CurrentEvents,
    meta: {
      title: 'Event Invitees',
      gtm: 'Event Invitees',
      opaque: false
    }
  },

  // Event Wizard
  {
    path: '/event-steps/:id',
    name: 'EventSteps',
    component: EventSteps,
    meta: {
      title: 'Event Wizard',
      gtm: 'Event Wizard'
    }
  },
  {
    path: '/event/create',
    name: 'EventSteps',
    component: EventSteps,
    meta: {
      title: 'Event Wizard',
      gtm: 'Event Wizard'
    }
  },
  {
    path: '/event/:id/edit',
    name: 'EventSteps',
    component: EventSteps,
    meta: {
      title: 'Event Wizard',
      gtm: 'Event Wizard'
    }
  }
  ]
}


let SigninSignupPage = {
  path: '/register',
  component: SigninSignupLayout,
  name: 'SigninSignupLayout',
  meta: {
    auth: false
  },
  children: [
    {
      path: '/register',
      name: 'publicRegister',
      component: publicRegister,
      meta: {
        title: 'Public Register',
        gtm: 'Public Register',
        auth: false
      }
    }
  ]
}
let PublicCreateEvent = {
  path: '/app-public',
  component: CreateEvent,
  name: 'CreateEvent',
  meta: {
    auth: false
  },
  children: [
    {
      path: '/create-event-wizard',
      name: 'EventWizard',
      component: EventWizard,
      meta: {
        title: 'Event Wizard',
        gtm: 'Event Wizard',
        auth: false
      }
    },
    {
      path: '/about-invited',
      name: 'About',
      component: EventInfo,
      meta: {
        title: 'Event Info',
        gtm: 'Event Info',
        auth: false
      }
    },
    {
      path: '/event-budget',
      name: 'Event Budget',
      component: EventBudget,
      meta: {
        title: 'Event Budget',
        gmt: 'Event Budget',
        auth: false
      }
    },
    {
      path: '/event-vibe',
      name: 'Event Vibe',
      component: EventVibe,
      meta: {
        title: 'Event Vibe',
        gmt: 'Event Vibe',
        auth: false
      }

    },
    {
      path: '/event-movies',
      name: 'Event Movies',
      component: EventMovies,
      meta: {
        title: 'Event Movies',
        gmt: 'Event Movies',
        auth: false
      }
    },
    {
      path: '/event-scales',
      name: 'Event Scales',
      component: EventScales,
      meta: {
        title: 'Event Scales',
        gmt: 'Event Scales',
        auth: false
      }
    }, // EventStartWorking.vue
    {
      path: '/event-start-working',
      name: 'Event Start Working',
      component: EventStartWorking,
      meta: {
        title: 'Event Start Working',
        gmt: 'Event Start Working',
        auth: false
      }
    }, // EventCreated
    {
      path: '/event-created',
      name: 'Event Created',
      component: EventCreated,
      meta: {
        title: 'Event Created',
        gmt: 'Event Created',
        auth: false
      }
    },
    {
      path: '/event-summery',
      name: 'Event Summery',
      component: EventSummery,
      meta: {
        title: 'Event Summery',
        gmt: 'Event Summery',
        auth: false
      }
    }
  ]
}

let HomePages = {
  path: '/app2',
  component: HomeLayout,
  name: 'HomePage',
  children: [
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage,
      meta: {
        title: 'HomePage',
        gtm: 'HomePage'
      }
    }
  ]
}

const appCurrentInfo = {
  path: '/additional-form',
  name: 'CommonInfoProfile',
  component: CommonInfoProfile,
  children: [{
    path: '/employee-form',
    name: 'EmployeeMain',
    component: EmployeeMain
  },
  {
    path: '/officeManager-form',
    name: 'OfficeMenageMain',
    component: OfficeMenageMain
  },
  {
    path: '/events-data',
    name: 'EventForm',
    component: EventForm
  },
  {
    path: '/dietary',
    name: 'Dietary',
    component: Dietary
  },
  {
    path: '/company-form',
    name: 'Company',
    component: Company
  },
  {
    path: '/me-form',
    name: 'MeForm',
    component: Step2
  },
  {
    path: '/invite',
    name: 'InviteEmployee',
    component: Invite
  }
  ]
}

const routes = [
  {
    path: '/',
    redirect: '/events',
    name: 'Root',
    meta: {
      gtm: 'Root'
    }
  },
  appCurrentInfo,
  authPages,
  appPages,
  publicPages,
  emptyLayoutPages,
  EventPages,
  marketPlacePages,
  PublicCreateEvent,
  HomePages,
  SigninSignupPage,
  forVendors,
  forProposals,
  NewEventPages
]

export default routes
