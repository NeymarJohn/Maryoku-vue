import { postReq, getReq } from "@/utils/token";
const state = {
    serviceCategories: [],
    companies: []
};
const mutations = {
    setCategories: (state, categories) => {
        state.serviceCategories = categories;
    },
    setCampanies: (state, companies) => {
        state.companies = companies
    }
};
const actions = {
    fetchAllCategories: ({ commit, state }) => {
        return new Promise((resolve, reject) => {
            // getting from API
            getReq(`/1/components`, true)
                .then(res => {
                    commit("setCategories", res.data);
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    getAllCompanies: ({ commit, state }) => {
        return new Promise((resolve, reject) => {
            getReq(`/1/companies`, true)
                .then(res => {
                    commit('setCompanies', res.data);
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
};
export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
