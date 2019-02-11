import axios from 'axios'

function getReq(){
    return axios({
        method:'get',
        url:`${process.env.SERVER_URL}/1/industries`,
        headers:{'Authorization': `Bearer ${window.localStorage.getItem("manage_id_token")}`}
    })
}
function postReq(endpoint,data){
    return axios({
        method:'post',
        url:`${process.env.SERVER_URL}${endpoint}`,
        headers:{'Authorization': `Bearer ${window.localStorage.getItem("manage_id_token")}`},
        data
    })
}
/*
company part - should post to `/1/onboarding/customer`
employee part - should post to `/1/onboarding/me`
List of industries get from: `/1/industries`
 */
//state
const state={
    user:null,
    industry:[]    
}

//getters
const getters={
    getUser:(state, user,rootState)=>{
    return state.user
    },
    getIndustryList:(state)=>{
        return state.industry.map(item=>item.title)
    }
}

//actions
const actions={
    getUserFromApi({commit,state}, data){        
         commit("setUser" , data)
    },
    async getIndustry({commit,state}){
           try{
            const res= await getReq()
            commit("setIndustries" , res.data)
           }catch(e){               
            commit("setIndustries" , [])
           }       
    },
    async sendCompanyInfo({commit,state}, info){
        try{          
           const res=await postReq('/1/onboarding/me',info)           
        }catch(e){

        }
    },
    async sendOMInfo({commit,state}, om){
        try{          
           const res=await postReq('/1/onboarding/customer',om)           
        }catch(e){

        }
    },
    async sendEvent({commit,state}, event){
        try{          
           const res=await postReq('/1/onboarding/me',event)           
        }catch(e){

        }
    },
    async sendDietary({commit,state}, dietary){
        try{         
           const res=await postReq('/1/onboarding/me',dietary)           
        }catch(e){

        }
    },
    async sendInvitation({commit,state}, email){
        try{          
           const res=await postReq('/1/onboarding/me',email)
           
        }catch(e){

        }
    },
}

//mutations
const mutations= {
    setUser(state,data){
        state.user=data
    },
    setIndustries(state,industry){
        state.industry=industry
    }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}
