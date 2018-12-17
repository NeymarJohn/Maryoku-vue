export default {
  namespaced: true,
  state() {
    return {
      vendorsMemberData: {
        vendorDisplayName: null,
        productsCategory: null,
        vendorWebsite: null,
        vendorAddressLine1: null,
        vendorMainEmail: null,
        vendorMainPhoneNumber: null,
        vendorCategory: 'test',
        vendorAvailabilityOptions: 'test',
        vendorCancellationPolicy: 'test',
        vendorCity: 'test',
        vendorRefundPolicy: 'test'
      }
    };
  },

  mutations: {
    setMemberProperty(state, {key, actualValue}) {
      state.vendorsMemberData[key] = actualValue;
    },

  },

  actions: {}
};
