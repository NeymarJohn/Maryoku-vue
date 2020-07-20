import DashboardLayout from '@/pages/Dashboard/Layout/DashboardLayout.vue'
import AuthLayout from '@/pages/Dashboard/Pages/AuthLayout.vue'
import CreateEvent from '@/pages/Dashboard/Layout/CreateEvent.vue'
import HomeLayout from '@/pages/Dashboard/Layout/HomeLayout.vue'
import NewEventLayout from '@/pages/Dashboard/Layout/NewEventLayout.vue'
import WorkspaceLayout from '@/pages/Dashboard/Layout/WorkspaceLayout.vue'

const Events = () => import('@/pages/app/Events/Events.vue')
const EventDetailsOverView = () => import('@/pages/app/Events/EventDetailsOverview.vue')

const EventProposal = () => import('@/pages/app/Events/EventProposal.vue')
const Notes = () => import('@/pages/app/Notes.vue')
const Proposals = () => import('@/pages/app/Proposals.vue')
const CurrentVendors = () => import('@/pages/app/Vendors/CurrentVendors.vue')
const AddEditVendor = () => import('@/pages/app/Vendors/AddEditVendor.vue')
const VendorsPoolNew = () => import('@/pages/app/Vendors/VendorsPoolNew.vue')
const ImportVendors = () => import('@/pages/app/Vendors/ImportVendors.vue')

// const EventSteps = () => import('@/pages/app/Events/Steps')
// const EventDetails = () => import('@/pages/app/Events/EventDetails.vue')
// import EmptyLayout from '@/pages/Dashboard/Pages/EmptyLayout'
// import MarketPlaceLayout from '@/pages/Dashboard/Pages/MarketPlaceLayout'
// import EventLayout from '@/pages/Dashboard/Layout/EventLayout.vue'
// import PublicLayout from '@/pages/Dashboard/Pages/PublicLayout.vue'
// import SigninSignupLayout from '@/pages/Dashboard/Layout/SigninSignupLayout.vue'
// const CurrentEvents = () => import('@/pages/app/Events/CurrentEvents.vue')
// const NewEvent = () => import('@/pages/app/Events/NewEvent.vue')
// const YearlyPlan = () => import('@/pages/app/YearlyPlan/index.vue')
// const AnnualPlanner = () => import('@/pages/app/AnnualPlanner/index.vue')
// const EditEvent = () => import('@/pages/app/Events/EditEvent.vue')
// const EventGroups = () => import('@/pages/app/Events/components/EventInvitees.vue')
// const Vendors = () => import('@/pages/app/Vendors/Vendors.vue')
// const ShowEvent = () => import('@/pages/app/Events/ShowEvent.vue')
// const VendorProposals = () => import('@/pages/app/Events/VendorProposals.vue')
// const EditVendor = () => import('@/pages/app/Vendors/EditVendor.vue')
// const VendorsPool = () => import('@/pages/app/Vendors/VendorsPool.vue')

// const Me = () => import('@/pages/app/Me.vue')
// const Profile = () => import('@/pages/app/Profile/index.vue')
// const MyCompany = () => import('@/pages/app/MyCompany/MyCompany.vue')
// const MyCompanyNew = () => import('@/pages/app/MyCompany/MyCompanyNew.vue')
// const CompanyDashboard = () => import('@/pages/app/CompanyDashboard/CompanyDashboard.vue')

// const Team = () => import('@/pages/app/Team/Team.vue')
// const Members = () => import('@/pages/app/Members/Members.vue')
// const publicRegister = () => import('@/pages/app/SinginSingup/publicRegister.vue')

// import EventConceptChoose from '@/pages/app/Events/components/EventConceptChoose.vue'
// import BookingEvent from '@/pages/app/Events/components/BookingEvent.vue'

// Dashboard pages
// const EmployeeMain = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/Employee.vue')
// const OfficeMenageMain = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/OfficeMenage.vue')
// const CommonInfoProfile = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/index.vue')
// const EventForm = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/EventForm.vue')
// const Dietary = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/Dietary.vue')
// const Step2 = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/Step2.vue')
// const Company = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/Company.vue')
// const Invite = () => import('@/pages/Dashboard/Pages/CommonInfoProfile/Invite.vue')
// const GetStarted = () => import('@/pages/app/GetStarted')
// const MyEvents = () => import('@/pages/app/Guest/MyEvents.vue')
// const MarketPlace = () => import('@/pages/app/MarketPlace/MarketPlace.vue')

const HomePage = () => import('@/pages/app/HomePage/Home.vue')

// Event Pages
import EventDetailsBudget from '@/pages/app/Events/EventDetailsBudget.vue'
import EventDetailsTimeline from '@/pages/app/Events/EventDetailsTimeline.vue'
import EventPlan from '@/pages/app/Events/EventPlan.vue'
import EventProposalDetails from '@/pages/app/Events/components/EventProposalDetails.vue'
import ExportTimeLine from '@/pages/app/Events/components/ExportTimeLine.vue'

const CreateWorkspace = () => import('@/pages/Dashboard/Pages/CreateWorkspace')
const ChooseWorkspace = () => import('@/pages/Dashboard/Pages/ChooseWorkspace')

// New Vendor Pages
const ForVendorLayout = () => import('@/pages/Dashboard/Layout/ForVendorLayout.vue')
const ForProposalsLayout = () => import('@/pages/Dashboard/Layout/ForProposalsLayout.vue')
const VendorSignupLayout = () => import('@/pages/Dashboard/Layout/VendorSignupLayout.vue')
const ForVendors = () => import('@/pages/app/Vendors/ForVendors.vue')
const ForProposals = () => import('@/pages/app/Vendors/ForProposals.vue')
const VendorSignup = () => import('@/pages/app/Vendors/VendorSignup.vue')

// OnBoardingPages
import EventWizardStart from '@/pages/app/CreateEvent/EventWizardStart.vue'
import EventWizardDay from '@/pages/app/CreateEvent/EventWizardDay.vue'
import EventWizardDateFlexibility from '@/pages/app/CreateEvent/EventWizardDateFlexibility.vue'
import EventWizardGuests from '@/pages/app/CreateEvent/EventWizardGuests.vue'
import EventWizardGuestsType from '@/pages/app/CreateEvent/EventWizardGuestsType.vue'
import EventWizardLocation from '@/pages/app/CreateEvent/EventWizardLocation.vue'
import EventWizardBuilding from '@/pages/app/CreateEvent/EventWizardBuilding.vue'
import EventWizardType from '@/pages/app/CreateEvent/EventWizardType.vue'
import EventWizardCelebrating from '@/pages/app/CreateEvent/EventWizardCelebrating.vue'
import EventWizardVibes from '@/pages/app/CreateEvent/EventWizardVibes.vue'
import EventWizardReligion from '@/pages/app/CreateEvent/EventWizardReligion.vue'

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
const Invited = () =>
  import('@/pages/Dashboard/Pages/Invited.vue')




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
    path: '/invited',
    name: 'Invited',
    component: Invited,
    meta: {
      auth: false,
      title: 'Invited',
      gtm: 'Invited'
    }
  },
  
  ]
}

let workspacePages = {
  path: '/',
  component: WorkspaceLayout,
  name: 'Authentication',
  children: [{
      path: '/create-workspace',
      name: 'CreateWorkspace',
      component: CreateWorkspace,
      meta: {
        auth: false,
        title: 'Create Workspace',
        gtm: 'CreateWorkspace'
      }
    },{
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
      name: 'VendorProposal',
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
        title: 'Vendor Signup',
        gtm: 'VendorSignup'
      },
    },
  ]
}


// let marketPlacePages = {
//   path: '/',
//   component: MarketPlaceLayout,
//   name: 'Market',
//   children: [{
//     path: '/market-place',
//     name: 'MarketPlace',
//     component: MarketPlace,
//     meta: {
//       auth: false,
//       title: 'Choose Workspace',
//       gtm: 'MarketPlace'
//     }
//   }]
// }

// let emptyLayoutPages = {
//   path: '/',
//   component: EmptyLayout,
//   name: 'Empty',
//   children: [{
//     path: '/get-started',
//     name: 'GetStarted',
//     component: GetStarted,
//     meta: {
//       auth: true,
//       title: 'Get Started',
//       gtm: 'GetStarted'
//     }
//   }
//   ]
// }

let appPages = {
  path: '/app',
  component: DashboardLayout,
  name: 'App',
  children: [
  // {
  //   path: '/me',
  //   name: 'Me',
  //   component: Me,
  //   meta: {
  //     gtm: 'Me'
  //   }
  // },
  // {
  //   path: '/settings',
  //   name: 'Settings',
  //   component: Profile,
  //   meta: {
  //     gtm: 'Settings'
  //   }
  // },

  // {
  //   path: '/company',
  //   name: 'CompanyDashboard',
  //   component: CompanyDashboard,
  //   meta: {
  //     title: 'Company Dashboard',
  //     gtm: 'CompanyDashboard'
  //   }
  // },
  // {
  //   path: '/old-company',
  //   name: 'MyCompany',
  //   component: MyCompanyNew,
  //   meta: {
  //     title: 'My Company',
  //     gtm: 'MyCompany'
  //   }
  // },
  // {
  //   path: '/team',
  //   name: 'Team',
  //   component: Members,
  //   meta: {
  //     gtm: 'Team'
  //   }
  // },
  // {
  //   path: '/yearly-plan',
  //   name: 'YearlyPlan',
  //   component: YearlyPlan,
  //   meta: {
  //     title: 'Yearly Plan'
  //   }
  // },
  // {
  //   path: '/planner/:year/:month',
  //   name: 'AnnualPlannerYearMonth',
  //   component: AnnualPlanner,
  //   meta: {
  //     title: 'Planner',
  //     gtm: 'Planner'
  //   }
  // },
  // {
  //   path: '/planner/:year',
  //   name: 'AnnualPlannerYear',
  //   component: AnnualPlanner,
  //   meta: {
  //     title: 'Planner',
  //     gtm: 'Planner'
  //   }
  // },
  // {
  //   path: '/planner',
  //   name: 'AnnualPlanner',
  //   component: AnnualPlanner,
  //   meta: {
  //     title: 'Planner',
  //     gtm: 'Planner'
  //   }
  // },
  // {
  //   path: '/vendors',
  //   name: 'Vendors',
  //   component: Vendors,
  //   meta: {
  //     gtm: 'Vendors'
  //   }
  // },
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
  // {
  //   path: '/vendors-pool',
  //   name: 'VendorsPool',
  //   component: VendorsPool,
  //   meta: {
  //     gtm: 'VendorsPool'
  //   }
  // },
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
  // {
  //   path: '/events/:id/edit',
  //   name: 'EventDetails',
  //   component: EventDetails,
  //   meta: {
  //     title: 'Event Page',
  //     gtm: 'Event Details',
  //     opaque: false
  //   }
  // }
  ]
}
// let EventPages = {
//   path: '/app2',
//   component: EventLayout,
//   name: 'App2',
//   children: [{
//     path: '/events',
//     name: 'Events',
//     component: Events,
//     meta: {
//       title: 'Our Events',
//       gtm: 'Events'
//     }
//   },
//   {
//     path: '/events/proposal',
//     name: 'EventProposal',
//     component: EventProposal,
//     meta: {
//       title: 'Event Proposal'
//     }
//   },
//   {
//     path: '/events/new',
//     name: 'NewEvent',
//     component: NewEvent,
//     meta: {
//       title: 'Create New Event'
//     }
//   },
//   {
//     path: '/events/:id/edit/details',
//     name: 'EditEvent',
//     component: CurrentEvents,
//     meta: {
//       title: 'Event Details',
//       gtm: 'Event Edit',
//       opaque: false
//     }
//   },
//   {
//     path: '/events/:id/edit/building-blocks',
//     name: 'EditBuildingBlocks',
//     component: CurrentEvents,
//     meta: {
//       title: 'Building Blocks',
//       gtm: 'Building Blocks',
//       opaque: false
//     }
//   },
//   {
//     path: '/events/:id/edit/timeline/current',
//     name: 'EditTimeLine',
//     component: CurrentEvents,
//     meta: {
//       title: 'Timeline',
//       gtm: 'Event Timeline',
//       opaque: false
//     }
//   },
//   {
//     path: '/events/:id/edit/invitees-management',
//     name: 'InviteesManagement',
//     component: CurrentEvents,
//     meta: {
//       title: 'Automated Interactions',
//       gtm: 'Event Edit',
//       opaque: false
//     }
//   },
//   {
//     path: '/events/:id/edit/event-invitees',
//     name: 'EventInvitees',
//     component: CurrentEvents,
//     meta: {
//       title: 'Event Invitees',
//       gtm: 'Event Invitees',
//       opaque: false
//     }
//   },

//   // Event Wizard
//   {
//     path: '/event-steps/:id',
//     name: 'EventSteps',
//     component: EventSteps,
//     meta: {
//       title: 'Event Wizard',
//       gtm: 'Event Wizard'
//     }
//   },
//   {
//     path: '/event/create',
//     name: 'EventCreate',
//     component: EventSteps,
//     meta: {
//       title: 'Event Wizard',
//       gtm: 'Event Wizard'
//     }
//   },
//   {
//     path: '/event/:id/edit',
//     name: 'EventEdit',
//     component: EventSteps,
//     meta: {
//       title: 'Event Wizard',
//       gtm: 'Event Wizard'
//     }
//   }
//   ]
// }

let NewEventPages = {
  path: '/app2',
  component: NewEventLayout,
  name: 'App2',
  children: [
  {
    path: '/events/proposal',
    name: 'EventProposal',
    component: EventProposal,
    meta: {
      title: 'Event Proposal'
    }
  },
  // {
  //   path: '/events/new',
  //   name: 'NewEvent',
  //   component: NewEvent,
  //   meta: {
  //     title: 'Create New Event'
  //   }
  // },
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
  // {
  //   path: '/events/:id/edit/building-blocks',
  //   name: 'EditBuildingBlocks',
  //   component: CurrentEvents,
  //   meta: {
  //     title: 'Building Blocks',
  //     gtm: 'Building Blocks',
  //     opaque: false
  //   }
  // },
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
    name: 'EditTimeLineExport',
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
    name: 'Timeline',
    meta: {
      gtm: 'Timeline'
    }
  },
  {
    path: '/events/:id/booking/:blockId',
    name: 'EventPlan',
    component: EventPlan,
    meta: {
      title: 'Plan Event',
      gtm: 'Plan Event',
      opaque: false
    }
  },
  // {
  //   path: '/events/:id/choose-concept',
  //   name: 'EventConceptChoose',
  //   component: EventConceptChoose,
  //   meta: {
  //     title: 'Choose Concept',
  //     gtm: 'Choose Concept',
  //     opaque: false
  //   }
  // },
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
  // {
  //   path: '/events/:id/edit/invitees-management',
  //   name: 'InviteesManagement',
  //   component: CurrentEvents,
  //   meta: {
  //     title: 'Automated Interactions',
  //     gtm: 'Event Edit',
  //     opaque: false
  //   }
  // },
  // {
  //   path: '/events/:id/edit/event-invitees',
  //   name: 'EventInvitees',
  //   component: CurrentEvents,
  //   meta: {
  //     title: 'Event Invitees',
  //     gtm: 'Event Invitees',
  //     opaque: false
  //   }
  // },

  // Event Wizard
  // {
  //   path: '/event-steps/:id',
  //   name: 'EventSteps',
  //   component: EventSteps,
  //   meta: {
  //     title: 'Event Wizard',
  //     gtm: 'Event Wizard'
  //   }
  // },
  // {
  //   path: '/event/create',
  //   name: 'EventCreate',
  //   component: EventSteps,
  //   meta: {
  //     title: 'Event Wizard',
  //     gtm: 'Event Wizard'
  //   }
  // },
  // {
  //   path: '/event/:id/edit',
  //   name: 'EventEdit',
  //   component: EventSteps,
  //   meta: {
  //     title: 'Event Wizard',
  //     gtm: 'Event Wizard'
  //   }
  // },
  {
    path: '/vendors-pool',
    name: 'VendorsPoolNew',
    component: VendorsPoolNew,
    meta: {
      gtm: 'VendorsPoolNew'
    }
  },
  ]
}


// let SigninSignupPage = {
//   path: '/register',
//   component: SigninSignupLayout,
//   name: 'SigninSignupLayout',
//   meta: {
//     auth: false
//   },
//   children: [
//     {
//       path: '/register',
//       name: 'publicRegister',
//       component: publicRegister,
//       meta: {
//         title: 'Public Register',
//         gtm: 'Public Register',
//         auth: false
//       }
//     }
//   ]
// }
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
    // {
    //   path: '/about-invited',
    //   name: 'About',
    //   component: EventInfo,
    //   meta: {
    //     title: 'Event Info',
    //     gtm: 'Event Info',
    //     auth: false
    //   }
    // },
    // {
    //   path: '/event-budget',
    //   name: 'Event Budget',
    //   component: EventBudget,
    //   meta: {
    //     title: 'Event Budget',
    //     gmt: 'Event Budget',
    //     auth: false
    //   }
    // },
    // {
    //   path: '/event-vibe',
    //   name: 'Event Vibe',
    //   component: EventVibe,
    //   meta: {
    //     title: 'Event Vibe',
    //     gmt: 'Event Vibe',
    //     auth: false
    //   }

    // },
    // {
    //   path: '/event-movies',
    //   name: 'Event Movies',
    //   component: EventMovies,
    //   meta: {
    //     title: 'Event Movies',
    //     gmt: 'Event Movies',
    //     auth: false
    //   }
    // },
    // {
    //   path: '/event-scales',
    //   name: 'Event Scales',
    //   component: EventScales,
    //   meta: {
    //     title: 'Event Scales',
    //     gmt: 'Event Scales',
    //     auth: false
    //   }
    // }, // EventStartWorking.vue
    // {
    //   path: '/event-start-working',
    //   name: 'Event Start Working',
    //   component: EventStartWorking,
    //   meta: {
    //     title: 'Event Start Working',
    //     gmt: 'Event Start Working',
    //     auth: false
    //   }
    // }, // EventCreated
    // {
    //   path: '/event-created',
    //   name: 'Event Created',
    //   component: EventCreated,
    //   meta: {
    //     title: 'Event Created',
    //     gmt: 'Event Created',
    //     auth: false
    //   }
    // },
    // {
    //   path: '/event-summery',
    //   name: 'Event Summery',
    //   component: EventSummery,
    //   meta: {
    //     title: 'Event Summery',
    //     gmt: 'Event Summery',
    //     auth: false
    //   }
    // }
  ]
}

let HomePages = {
  path: '/app2',
  component: HomeLayout,
  name: 'HomePageLayout',
  children: [
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage,
      meta: {
        title: 'HomePage',
        gtm: 'HomePage'
      }
    },{
      path: '/events',
      name: 'Events',
      component: Events,
      meta: {
        title: 'Our Events',
        gtm: 'Events'
      }
    },
  ]
}

// const appCurrentInfo = {
//   path: '/additional-form',
//   name: 'CommonInfoProfile',
//   component: CommonInfoProfile,
//   children: [{
//     path: '/employee-form',
//     name: 'EmployeeMain',
//     component: EmployeeMain
//   },
//   {
//     path: '/officeManager-form',
//     name: 'OfficeMenageMain',
//     component: OfficeMenageMain
//   },
//   {
//     path: '/events-data',
//     name: 'EventForm',
//     component: EventForm
//   },
//   {
//     path: '/dietary',
//     name: 'Dietary',
//     component: Dietary
//   },
//   {
//     path: '/company-form',
//     name: 'Company',
//     component: Company
//   },
//   {
//     path: '/me-form',
//     name: 'MeForm',
//     component: Step2
//   },
//   {
//     path: '/invite',
//     name: 'InviteEmployee',
//     component: Invite
//   }
//   ]
// }

const routes = [
  {
    path: '/',
    redirect: '/events',
    name: 'Root',
    meta: {
      gtm: 'Root'
    }
  },
  authPages,
  workspacePages,
  appPages,
  publicPages,
  PublicCreateEvent,
  HomePages,
  forProposals,
  vendorSignup,
  NewEventPages

  // appCurrentInfo,
  // SigninSignupPage,
  // marketPlacePages,
  // forVendors,
  // emptyLayoutPages,
  // EventPages,

]

export default routes
