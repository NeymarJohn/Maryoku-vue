import DashboardLayout from '@/pages/Dashboard/Layout/DashboardLayout.vue'
const EventLayout = () => import('@/pages/Dashboard/Layout/EventLayout.vue')
const AuthLayout = () => import('@/pages/Dashboard/Pages/AuthLayout.vue')
const PublicLayout = () => import('@/pages/Dashboard/Pages/PublicLayout.vue')
const CreateEvent = () => import('@/pages/Dashboard/Layout/CreateEvent.vue')
const HomeLayout = () => import('@/pages/Dashboard/Layout/HomeLayout.vue')
const SigninSignupLayout = () => import('@/pages/Dashboard/Layout/SigninSignupLayout.vue')
const NewEventLayout = () => import('@/pages/Dashboard/Layout/NewEventLayout.vue')
const EmptyLayout = () => import('@/pages/Dashboard/Pages/EmptyLayout')
const MarketPlaceLayout = () => import('@/pages/Dashboard/Pages/MarketPlaceLayout')

const Me = () => import('@/pages/app/Me.vue')
const Profile = () => import('@/pages/app/Profile/index.vue')
const MyCompany = () => import('@/pages/app/MyCompany/MyCompany.vue')
const MyCompanyNew = () => import('@/pages/app/MyCompany/MyCompanyNew.vue')
const CompanyDashboard = () => import('@/pages/app/CompanyDashboard/CompanyDashboard.vue')

const Team = () => import('@/pages/app/Team/Team.vue')
const Members = () => import('@/pages/app/Members/Members.vue')

const Events = () => import('@/pages/app/Events/Events.vue')
const CurrentEvents = () => import('@/pages/app/Events/CurrentEvents.vue')
const EventGroups = () => import('@/pages/app/Events/components/EventInvitees.vue')
const NewEvent = () => import('@/pages/app/Events/NewEvent.vue')
const EditEvent = () => import('@/pages/app/Events/EditEvent.vue')
const EventDetails = () => import('@/pages/app/Events/EventDetails.vue')

const EventDetailsOverView = () => import('@/pages/app/Events/EventDetailsOverview.vue')
const ShowEvent = () => import('@/pages/app/Events/ShowEvent.vue')
const VendorProposals = () => import('@/pages/app/Events/VendorProposals.vue')
const EventProposal = () => import('@/pages/app/Events/EventProposal.vue')
const EventSteps = () => import('@/pages/app/Events/Steps')
const Notes = () => import('@/pages/app/Notes.vue')
const Proposals = () => import('@/pages/app/Proposals.vue')
const Vendors = () => import('@/pages/app/Vendors/Vendors.vue')
const CurrentVendors = () => import('@/pages/app/Vendors/CurrentVendors.vue')
const AddEditVendor = () => import('@/pages/app/Vendors/AddEditVendor.vue')
const EditVendor = () => import('@/pages/app/Vendors/EditVendor.vue')
const VendorsPool = () => import('@/pages/app/Vendors/VendorsPool.vue')
const VendorsPoolNew = () => import('@/pages/app/Vendors/VendorsPoolNew.vue')
const ImportVendors = () => import('@/pages/app/Vendors/ImportVendors.vue')
const YearlyPlan = () => import('@/pages/app/YearlyPlan/index.vue')
const AnnualPlanner = () => import('@/pages/app/AnnualPlanner/index.vue')
const EventWizard = () => import('@/pages/app/CreateEvent/EventWizard.vue')
const EventInfo = () => import('@/pages/app/CreateEvent/EventInfo.vue')
const EventBudget = () => import('@/pages/app/CreateEvent/EventBudget.vue')
const EventVibe = () => import('@/pages/app/CreateEvent/EventVibe.vue')
const EventMovies = () => import('@/pages/app/CreateEvent/EventMovies.vue')
const EventScales = () => import('@/pages/app/CreateEvent/EventScales.vue')
const EventStartWorking = () => import('@/pages/app/CreateEvent/EventStartWorking.vue')
const EventCreated = () => import('@/pages/app/CreateEvent/EventCreated.vue')
const EventSummery = () => import('@/pages/app/CreateEvent/EventSummery.vue')
const HomePage = () => import('@/pages/app/HomePage/Home.vue')
const publicRegister = () => import('@/pages/app/SinginSingup/publicRegister.vue')

// Event Pages
const EventDetailsBudget = () => import('@/pages/app/Events/EventDetailsBudget.vue')
const EventDetailsTimeline = () => import('@/pages/app/Events/EventDetailsTimeline.vue')
const BookingEvent = () => import('@/pages/app/Events/components/BookingEvent.vue')
const EventPlan = () => import('@/pages/app/Events/EventPlan.vue')
const EventConceptChoose = () => import('@/pages/app/Events/components/EventConceptChoose.vue')
const EventProposalDetails = () => import('@/pages/app/Events/components/EventProposalDetails.vue')
const ExportTimeLine = () => import('@/pages/app/Events/components/ExportTimeLine.vue')

// Dashboard pages
const EmployeeMain = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/Employee.vue')
const OfficeMenageMain = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/OfficeMenage.vue')
const CommonInfoProfile = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/index.vue')
const EventForm = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/EventForm.vue')
const Dietary = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/Dietary.vue')
const Step2 = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/Step2.vue')
const Company = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/Company.vue')
const Invite = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/Invite.vue')

const CreateWorkspace = () => import('@/pages/Dashboard/Pages/CreateWorkspace')
const ChooseWorkspace = () => import('@/pages/Dashboard/Pages/ChooseWorkspace')


const GetStarted = () => import('@/pages/app/GetStarted')
const MyEvents = () => import('@/pages/app/Guest/MyEvents.vue')
const MarketPlace = () => import('@/pages/app/MarketPlace/MarketPlace.vue')

// New Vendor Pages
const ForVendorLayout = () => import('@/pages/Dashboard/Layout/ForVendorLayout.vue')
const ForProposalsLayout = () => import('@/pages/Dashboard/Layout/ForProposalsLayout.vue')
const VendorSignupLayout = () => import('@/pages/Dashboard/Layout/VendorSignupLayout.vue')
const ForVendors = () => import('@/pages/app/Vendors/ForVendors.vue')
const ForProposals = () => import('@/pages/app/Vendors/ForProposals.vue')
const VendorSignup = () => import('@/pages/app/Vendors/VendorSignup.vue')

// OnBoardingPages
const EventWizardStart = () => import('@/pages/app/CreateEvent/EventWizardStart.vue')
const EventWizardDay = () => import('@/pages/app/CreateEvent/EventWizardDay.vue')
const EventWizardDateFlexibility = () => import('@/pages/app/CreateEvent/EventWizardDateFlexibility.vue')
const EventWizardGuests = () => import('@/pages/app/CreateEvent/EventWizardGuests.vue')
const EventWizardGuestsType = () => import('@/pages/app/CreateEvent/EventWizardGuestsType.vue')
const EventWizardLocation = () => import('@/pages/app/CreateEvent/EventWizardLocation.vue')
const EventWizardBuilding = () => import('@/pages/app/CreateEvent/EventWizardBuilding.vue')
const EventWizardType = () => import('@/pages/app/CreateEvent/EventWizardType.vue')
const EventWizardCelebrating = () => import('@/pages/app/CreateEvent/EventWizardCelebrating.vue')
const EventWizardVibes = () => import('@/pages/app/CreateEvent/EventWizardVibes.vue')
const EventWizardReligion = () => import('@/pages/app/CreateEvent/EventWizardReligion.vue')

// User authentication pages
const SignInSignUp = () =>
  import('@/pages/Dashboard/Pages/SignInSignUp.vue')
const SignUp = () =>
  import('@/pages/Dashboard/Pages/SignUp.vue')
const ForgotPassword = () =>
  import('@/pages/Dashboard/Pages/ForgotPassword.vue')
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
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      auth: false,
      gtm: 'SignUp'
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      auth: false,
      gtm: 'ForgotPassword'
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
  path: "/",
  component: ForVendorLayout,
  name: "ForVendors",
  children: [
    {
      path: '/vendors/:vendorId/proposal-request/:id',
      name: 'ForVendors',
      component: ForVendors,
      meta: {
        auth: false,
        title: 'For Vendors',
        gtm: 'ForVendors'
      },
    }
  ]
  // path: '/',
  // component: PublicLayout,
  // name: 'Public',
  // children: [
  // {
  //   path: '/events/:id/public',
  //   name: 'ShowEvent',
  //   component: ShowEvent,
  //   meta: {
  //     auth: false,
  //     title: 'Event',
  //     gtm: 'Event'
  //   }
  // },
  // {
  //   path: '/proposal-request/:id',
  //   name: 'VendorProposals2',
  //   component: VendorProposals,
  //   meta: {
  //     auth: false,
  //     title: 'Vendor Proposals',
  //     gtm: 'VendorProposals'
  //   }
  // },
  // {
  //   path: '/vendors/:vendorId/proposal-request/:id',
  //   name: 'VendorProposals',
  //   component: VendorProposals,
  //   meta: {
  //     auth: false,
  //     title: 'Vendor Proposals',
  //     gtm: 'VendorProposals'
  //   }
  // }
  // {
  //   path: "/get-started",
  //   name: "GetStarted",
  //   component: Onboarding,
  //   meta: {auth: false, title: 'Get Started', gtm: "GetStarted"}
  // }, // ]
}

// let forVendors = {
//   path: "/",
//   component: ForVendorLayout,
//   name: "ForVendors",
//   children: [
//     {
//       path: "/for-vendors",
//       name: "ForVendors",
//       component: ForVendors,
//       meta: {
//         auth: false,
//         title: 'For Vendors',
//         gtm: 'ForVendors'
//       },
//     },
//   ]
// }

let forProposals = {
  path: "/",
  component: ForProposalsLayout,
  name: "ForProposals",
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
  ]
}

let vendorSignup = {
  path: "/",
  component: VendorSignupLayout,
  name: "VendorSignup",
  children: [
    {
      path: "/vendor-signup",
      name: "VendorSignup",
      component: VendorSignup,
      meta: {
        auth: false,
        title: 'Vendor Signup',
        gtm: 'VendorSignup'
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
  }]
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
    path: '/events/:id/overview',
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
    path: '/events/:id/booking',
    redirect: '/events/:id/booking/timeline',
    name: 'Root',
    meta: {
      gtm: 'Root'
    }
  },
  {
    path: '/events/:id/booking/:blockId',
    name: 'BookingEvent',
    component: EventPlan,
    meta: {
      title: 'BookingEvent',
      gtm: 'Booking Event',
      opaque: false
    }
  },
  {
    path: '/events/:id/choose-concept',
    name: 'EventConceptChoose',
    component: EventConceptChoose,
    meta: {
      title: 'Choose Concept',
      gtm: 'Choose Concept',
      opaque: false
    }
  },
  {
    path: '/events/:id/proposal-details/:vendorId/:proposalId',
    name: 'EventProposalDetails',
    component: EventProposalDetails,
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
  },
  {
    path: '/vendors-pool-new',
    name: 'VendorsPoolNew',
    component: VendorsPoolNew,
    meta: {
      gtm: 'VendorsPoolNew'
    }
  },
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
      name: 'EventWizardStart',
      component: EventWizardStart,
      meta: {
        title: 'Event Wizard',
        gtm: 'Event Wizard',
        auth: false
      }
    },
    {
      path: '/event-wizard-day',
      name: 'EventWizardDay',
      component: EventWizardDay,
      meta: {
        title: 'Event Day',
        gtm: 'Event Day',
        auth: false
      }
    },
    {
      path: '/event-wizard-flexibility',
      name: 'EventWizardDateFlexibility',
      component: EventWizardDateFlexibility,
      meta: {
        title: 'Event Day Flexibility',
        gtm: 'Event Day Flexibility',
        auth: false
      }
    },
    {
      path: '/event-wizard-guests',
      name: 'EventWizardGuests',
      component: EventWizardGuests,
      meta: {
        title: 'Event Guests',
        gtm: 'Event Guests',
        auth: false
      }
    },
    {
      path: '/event-wizard-guests-type',
      name: 'EventWizardGuestsType',
      component: EventWizardGuestsType,
      meta: {
        title: 'Event Guests Type',
        gtm: 'Event Guests',
        auth: false
      }
    },
    {
      path: '/event-wizard-location',
      name: 'EventWizardLocation',
      component: EventWizardLocation,
      meta: {
        title: 'Event  Location',
        gtm: 'Event Location',
        auth: false
      }
    },
    {
      path: '/event-wizard-building',
      name: 'EventWizardBuilding',
      component: EventWizardBuilding,
      meta: {
        title: 'Event Building',
        gtm: 'Event Building',
        auth: false
      }
    },
    {
      path: '/event-wizard-type',
      name: 'EventWizardType',
      component: EventWizardType,
      meta: {
        title: 'Event  Type',
        gtm: 'Event Type',
        auth: false
      }
    },
    {
      path: '/event-wizard-celebrating',
      name: 'EventWizardCelebrating',
      component: EventWizardCelebrating,
      meta: {
        title: 'Event celebrating',
        gtm: 'Event celebrating',
        auth: false
      }
    },
    {
      path: '/event-wizard-religion',
      name: 'EventWizardReligion',
      component: EventWizardReligion,
      meta: {
        title: 'Event Guests Religion',
        gtm: 'Event Religion',
        auth: false
      }
    },
    {
      path: '/event-wizard-vibes',
      name: 'EventWizardVibes',
      component: EventWizardVibes,
      meta: {
        title: 'Event Guests Religion',
        gtm: 'Event Religion',
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
  // forVendors,
  forProposals,
  vendorSignup,
  NewEventPages
]

export default routes
