const VendorSignupLayout = () => import("@/pages/Dashboard/Layout/VendorSignupLayout.vue");
const VendorMainLayout = () => import("@/pages/app/Vendors/VendorMainLayout.vue")

const VendorProfileOverview = () => import("@/pages/app/Vendors/VendorProfileOverview.vue")
const VendorSignup = () => import("@/pages/app/Vendors/VendorSignup.vue");
const VendorSignin = () => import("@/pages/app/Vendors/VendorSignin.vue")
export default [{
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
}, {
  path: "/vendor/signin",
  name: "Vendor Signin",
  component: VendorSignin,
}, {
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
}];
