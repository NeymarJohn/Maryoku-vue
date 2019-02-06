//state
const state={
    user:null    
}

//getters
const getters={
    getUser:(state, user,rootState)=>{
    return state.user
    }
}

//actions
const actions={
    getUserFromApi({commit,state}, data){
         commit("setUser" , data)
    }
}

//mutations
const mutations= {
    setUser(state,data){
        state.user=data
    }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}
