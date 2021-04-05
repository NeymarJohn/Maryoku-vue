const VendorSignupLayout = () => import("@/pages/app/Vendors/Signup/Layout.vue");
const VendorMainLayout = () => import("@/pages/app/Vendors/VendorMainLayout.vue");

const VendorProfileOverview = () => import("@/pages/app/Vendors/Profile");
const VendorProposalBoard = () => import("@/pages/app/Vendors/ProposalBoard");
const VendorSignup = () => import("@/pages/app/Vendors/Signup");
const VendorSignin = () => import("@/pages/app/Vendors/VendorSignin.vue");
const VendorSignedin = () => import("@/pages/app/Vendors/VendorSignedin.vue");

// New Vendor Pages
const ForVendorLayout = () => import("@/pages/Dashboard/Layout/ForVendorLayout.vue");
const ProposalLayout = () => import("@/pages/app/Vendors/Proposal/ProposalLayout.vue");
const ForVendors = () => import("@/pages/app/Vendors/ForVendors.vue");
const ProposalContent = () => import("@/pages/app/Vendors/Proposal");

export default [
    {
        path: "/vendor",
        name: "Vendor",
        component: VendorSignupLayout,
        children: [
            {
                path: "signup",
                name: "VendorSignup",
                component: VendorSignup,
                meta: {
                    requiresAuth: false,
                    title: "Vendor Signup",
                    gtm: "VendorSignup",
                },
            },
            {
                path: "edit/:id",
                name: "VendorSignup",
                component: VendorSignup,
                meta: {
                    requiresAuth: false,
                    title: "Vendor Signup",
                    gtm: "VendorSignup",
                },
            },
        ],
    },
    {
        path: "/",
        name: "Vendor",
        component: VendorSignupLayout,
        children: [
            {
                path: "/vendor-signup",
                name: "VendorSignup",
                component: VendorSignup,
                meta: {
                    requiresAuth: false,
                    title: "Vendor Signup",
                    gtm: "VendorSignup",
                },
            },
            {
                path: "/vendor-signup/edit/:id",
                name: "VendorSignup",
                component: VendorSignup,
                meta: {
                    requiresAuth: false,
                    title: "Vendor Signup",
                    gtm: "VendorSignup",
                },
            },
        ],
    },
    {
        path: "/vendor/signin",
        name: "Vendor Signin",
        component: VendorSignin,
        meta: {
            requiresAuth: false,
            title: "Vendor Signin",
            gtm: "Vendor Signin",
        },
    },
    {
        path: "/vendor/signedin",
        name: "Vendor Signed In",
        component: VendorSignedin,
        meta: {
            requiresAuth: true,
            title: "Vendor Signed in",
            gtm: "Vendor Signed in",
        },
    },
    {
        path: "/vendor",
        component: VendorMainLayout,
        name: "Vendor",
        children: [
            {
                path: "profile/:pageName",
                name: "overview",
                component: VendorProfileOverview,
                meta: {
                    requiresAuth: true,
                    title: "Profile",
                    gtm: "Profile",
                },
            },
            {
                path: "proposals",
                name: "proposals",
                component: VendorProposalBoard,
                meta: {
                    requiresAuth: true,
                    title: "Proposal Board",
                    gtm: "Proposal Board",
                },
            },
        ],
    },
    {
        path: "/",
        component: ForVendorLayout,
        name: "ForVendors",
        children: [
            {
                path: "/vendors/:vendorId/proposal-request/:rfpId",
                name: "VendorProposal",
                component: ForVendors,
                meta: {
                    requiresAuth: false,
                    title: "For Vendors",
                    gtm: "ForVendors",
                },
            },
        ],
    },

    {
        path: "/",
        component: ProposalLayout,
        name: "ProposalLayout",
        children: [
            {
                path: "/vendors/:vendorId/proposal-request/:id/form",
                name: "ForProposals",
                component: ProposalContent,
                meta: {
                    requiresAuth: false,
                    title: "For Proposals",
                    gtm: "ForProposals",
                },
            },
            {
                path: "/proposal-request/:id/form",
                name: "ForProposals",
                component: ProposalContent,
                meta: {
                    requiresAuth: false,
                    title: "For Proposals",
                    gtm: "ForProposals",
                },
            },
            {
                path: "/vendors/:vendorId/events/:eventId/proposal-request/:id/form",
                name: "ForProposals",
                component: ProposalContent,
                meta: {
                    requiresAuth: false,
                    title: "For Proposals",
                    gtm: "ForProposals",
                },
            },
        ],
    },
];
