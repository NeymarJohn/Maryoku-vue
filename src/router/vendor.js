const VendorSignupLayout = () => import("@/pages/Dashboard/Layout/VendorSignupLayout.vue");
const VendorMainLayout = () => import("@/pages/app/Vendors/VendorMainLayout.vue");

const VendorProfileOverview = () => import("@/pages/app/Vendors/Profile");
const VendorSignup = () => import("@/pages/app/Vendors/Signup");
const VendorSignin = () => import("@/pages/app/Vendors/VendorSignin.vue");
const VendorSignedin = () => import("@/pages/app/Vendors/VendorSignedin.vue");

// New Vendor Pages
const ForVendorLayout = () => import("@/pages/Dashboard/Layout/ForVendorLayout.vue");
const ForProposalsLayout = () => import("@/pages/Dashboard/Layout/ForProposalsLayout.vue");
const ForVendors = () => import("@/pages/app/Vendors/ForVendors.vue");
const ForProposals = () => import("@/pages/app/Vendors/ForProposals.vue");

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
                    auth: false,
                    title: "Vendor Signup",
                    gtm: "VendorSignup",
                },
            },
            {
                path: "edit/:id",
                name: "VendorSignup",
                component: VendorSignup,
                meta: {
                    auth: false,
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
    },
    {
        path: "/vendor/signedin",
        name: "Vendor Signed In",
        component: VendorSignedin,
    },
    {
        path: "/vendor",
        component: VendorMainLayout,
        name: "Vendor Profile",
        children: [
            {
                path: "profile/:pageName",
                name: "overview",
                component: VendorProfileOverview,
                meta: {
                    auth: false,
                    title: "Profile",
                    gtm: "Profile",
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
                    auth: false,
                    title: "For Vendors",
                    gtm: "ForVendors",
                },
            },
        ],
    },
    {
        path: "/",
        component: ForProposalsLayout,
        name: "ForProposalsLayout",
        children: [
            {
                path: "/vendors/:vendorId/proposal-request/:id/form",
                name: "ForProposals",
                component: ForProposals,
                meta: {
                    auth: false,
                    title: "For Proposals",
                    gtm: "ForProposals",
                },
            },
            {
                path: "/proposal-request/:id/form",
                name: "ForProposals",
                component: ForProposals,
                meta: {
                    auth: false,
                    title: "For Proposals",
                    gtm: "ForProposals",
                },
            },
            {
                path: "/vendors/:vendorId/events/:eventId/proposal-request/:id/form",
                name: "ForProposals",
                component: ForProposals,
                meta: {
                    auth: false,
                    title: "For Proposals",
                    gtm: "ForProposals",
                },
            },
        ],
    },
];
